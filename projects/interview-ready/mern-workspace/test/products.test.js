import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createServer } from "node:http";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { MongoClient, ObjectId } from "mongodb";
import request from "supertest";
import { createApp } from "../server/app.js";
import { MongoStore } from "../server/store.js";
const origin = "http://localhost:3000",
  secret = "test-fixture-only-not-a-deployment-secret";
let mongo,
  client,
  store,
  app,
  alice,
  bob,
  viewer,
  outside,
  tenant,
  users = {},
  cookies = {};
const api = (agent, method, path) =>
  agent[method]("/api/lab" + path).set("Origin", origin);
before(async () => {
  mongo = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
  });
  client = new MongoClient(mongo.getUri());
  await client.connect();
  store = new MongoStore(client.db("products_test"));
  await store.initialize();
  app = createApp({
    store,
    origin,
    paymentSecret: secret,
    allowPaymentSimulator: true,
  });
  for (const name of ["alice", "bob", "viewer", "outside"]) {
    const agent = request.agent(app),
      result = await agent
        .post("/api/auth/register")
        .set("Origin", origin)
        .send({
          email: name + "@example.test",
          password: "correct horse battery",
        })
        .expect(201);
    users[name] = { agent, id: result.body.id };
    cookies[name] = result.headers["set-cookie"][0].split(";")[0];
  }
  ({ agent: alice } = users.alice);
  ({ agent: bob } = users.bob);
  ({ agent: viewer } = users.viewer);
  ({ agent: outside } = users.outside);
  tenant = (
    await api(alice, "post", "/tenants")
      .send({ title: "Test team" })
      .expect(201)
  ).body.id;
  await api(alice, "post", `/tenants/${tenant}/members`)
    .send({ email: "bob@example.test", role: "editor" })
    .expect(201);
  await api(alice, "post", `/tenants/${tenant}/members`)
    .send({ email: "viewer@example.test", role: "viewer" })
    .expect(201);
});
after(async () => {
  await client?.close();
  await mongo?.stop();
});
test("role permissions and tenant isolation are enforced at API boundaries", async () => {
  await api(viewer, "post", `/tenants/${tenant}/projects`)
    .send({ title: "Forbidden", body: "No" })
    .expect(403);
  await api(outside, "get", `/tenants/${tenant}/projects`).expect(404);
  await api(bob, "get", `/tenants/${tenant}/dashboard`).expect(403);
  await api(bob, "post", `/tenants/${tenant}/members`)
    .send({ email: "outside@example.test", role: "editor" })
    .expect(403);
  await api(alice, "post", "/tenants")
    .send({ title: "Bad", role: "owner" })
    .expect(400);
});
test("articles enforce author ownership, publishing, safe search, cursor continuation and versions", async () => {
  const row = (
    await api(alice, "post", "/articles")
      .send({ title: "Literal .* title", body: "Original article" })
      .expect(201)
  ).body;
  assert.equal(
    (await api(bob, "get", "/articles").expect(200)).body.items.length,
    0,
  );
  await api(bob, "patch", "/articles/" + row.id)
    .send({ title: row.title, body: row.body, status: "published", version: 0 })
    .expect(404);
  await api(alice, "patch", "/articles/" + row.id)
    .send({ title: row.title, body: row.body, status: "published", version: 0 })
    .expect(200);
  await api(alice, "patch", "/articles/" + row.id)
    .send({ title: row.title, body: row.body, status: "draft", version: 0 })
    .expect(409);
  assert.equal(
    (
      await api(bob, "get", "/articles?q=" + encodeURIComponent(".*")).expect(
        200,
      )
    ).body.items.length,
    1,
  );
  assert.equal(
    (await api(bob, "get", "/articles?q=missing").expect(200)).body.items
      .length,
    0,
  );
  for (let n = 0; n < 3; n++)
    await api(alice, "post", "/articles")
      .send({ title: "Page " + n, body: "Body" })
      .expect(201);
  const first = (await api(alice, "get", "/articles?limit=2").expect(200)).body,
    second = (
      await api(
        alice,
        "get",
        "/articles?limit=2&cursor=" + first.nextCursor,
      ).expect(200)
    ).body;
  assert.equal(
    new Set([...first.items, ...second.items].map((r) => r.id)).size,
    4,
  );
  await api(alice, "get", "/articles?limit=100").expect(400);
  await api(alice, "get", "/articles?cursor=wrong").expect(404);
});
test("catalog details, pagination, favorites and playlists use stable identity", async () => {
  const first = (await api(alice, "get", "/catalog/movies").expect(200)).body;
  assert.equal(first.items.length, 2);
  assert.equal(
    (
      await api(
        alice,
        "get",
        "/catalog/movies?cursor=" + first.nextCursor,
      ).expect(200)
    ).body.items.length,
    1,
  );
  await api(alice, "get", "/catalog/movies/signal").expect(200);
  await api(alice, "post", "/favorites").send({ movie: "signal" }).expect(201);
  await api(alice, "post", "/favorites").send({ movie: "signal" }).expect(201);
  assert.equal(
    (await api(alice, "get", "/favorites").expect(200)).body.items.length,
    1,
  );
  assert.equal(
    (await api(bob, "get", "/favorites").expect(200)).body.items.length,
    0,
  );
  await api(alice, "post", "/playlists")
    .send({ video: "web-basics" })
    .expect(201);
  await api(alice, "post", "/playlists").send({ video: "unknown" }).expect(400);
});
test("LMS protects lessons before enrollment and records idempotent per-account progress", async () => {
  const course = (
    await api(alice, "post", `/tenants/${tenant}/courses`)
      .send({ title: "Course", lessons: ["First lesson", "Second lesson"] })
      .expect(201)
  ).body;
  await api(bob, "get", `/courses/${course.id}/lessons`).expect(403);
  assert.equal(
    (await api(viewer, "get", `/tenants/${tenant}/courses`).expect(200)).body
      .items[0].lessons,
    undefined,
  );
  await api(bob, "post", `/courses/${course.id}/enroll`).send({}).expect(201);
  for (let n = 0; n < 2; n++)
    await api(bob, "post", `/courses/${course.id}/progress`)
      .send({ lesson: 1 })
      .expect(200);
  assert.deepEqual(
    (await api(bob, "get", `/courses/${course.id}/lessons`).expect(200)).body
      .completed,
    [1],
  );
  await api(outside, "post", `/courses/${course.id}/enroll`)
    .send({})
    .expect(404);
  await api(bob, "post", `/courses/${course.id}/progress`)
    .send({ lesson: 3 })
    .expect(400);
});
test("job applications reject duplicates and constrain resume and recruiter access", async () => {
  const job = (
    await api(alice, "post", `/tenants/${tenant}/jobs`)
      .send({ title: "Engineer", body: "Test job" })
      .expect(201)
  ).body;
  const resume = Buffer.from("%PDF-1.4\n% fixture only").toString("base64");
  const application = (
    await api(outside, "post", `/jobs/${job.id}/apply`)
      .send({ coverLetter: "My test application", resume })
      .expect(201)
  ).body;
  await api(outside, "post", `/jobs/${job.id}/apply`)
    .send({ coverLetter: "Repeat" })
    .expect(409);
  await api(viewer, "get", `/jobs/${job.id}/applications`).expect(403);
  assert.equal(
    (await api(alice, "get", `/jobs/${job.id}/applications`).expect(200)).body
      .items[0].resume,
    undefined,
  );
  await api(bob, "get", `/applications/${application.id}/resume`)
    .expect(200)
    .expect("Content-Type", /application\/pdf/);
  await api(viewer, "get", `/applications/${application.id}/resume`).expect(
    403,
  );
  await api(alice, "patch", `/applications/${application.id}`)
    .send({ status: "accepted", version: 0 })
    .expect(200);
  await api(alice, "patch", `/applications/${application.id}`)
    .send({ status: "rejected", version: 0 })
    .expect(409);
});
test("project tasks use stored versions with atomic audit and recoverable notifications", async () => {
  const project = (
    await api(alice, "post", `/tenants/${tenant}/projects`)
      .send({ title: "Release", body: "Scope" })
      .expect(201)
  ).body;
  const task = (
    await api(bob, "post", `/projects/${project.id}/tasks`)
      .send({ title: "Implement" })
      .expect(201)
  ).body;
  const changes = await Promise.all(
    ["doing", "done"].map((status) =>
      api(bob, "patch", `/project-tasks/${task.id}`).send({
        title: task.title,
        status,
        version: 0,
      }),
    ),
  );
  assert.deepEqual(changes.map((r) => r.status).sort(), [200, 409]);
  await api(viewer, "post", `/project-tasks/${task.id}/comments`)
    .send({ body: "Forbidden" })
    .expect(403);
  await api(alice, "post", `/project-tasks/${task.id}/comments`)
    .send({ body: "Reviewed" })
    .expect(201);
  assert.equal(
    (await api(bob, "get", "/notifications").expect(200)).body.items.length,
    1,
  );
  const audit = (
    await api(alice, "get", `/tenants/${tenant}/audit?q=task.changed`).expect(
      200,
    )
  ).body.items;
  assert.equal(audit.length, 1);
});
test("approval versions prevent conflicting decisions and prohibit self-approval", async () => {
  const row = (
    await api(bob, "post", `/tenants/${tenant}/expenses`)
      .send({
        title: "Book",
        cents: 30,
        category: "learning",
        date: "2026-10-09",
      })
      .expect(201)
  ).body;
  await api(bob, "patch", `/team-expenses/${row.id}`)
    .send({ status: "approved", version: 0 })
    .expect(403);
  const results = await Promise.all(
    ["approved", "rejected"].map((status) =>
      api(alice, "patch", `/team-expenses/${row.id}`).send({
        status,
        version: 0,
      }),
    ),
  );
  assert.deepEqual(results.map((r) => r.status).sort(), [200, 409]);
  await api(bob, "post", `/tenants/${tenant}/expenses`)
    .send({ title: "Wrong", cents: 30, category: "food", date: "2026-99-99" })
    .expect(400);
  const self = (
    await api(alice, "post", `/tenants/${tenant}/expenses`)
      .send({ title: "Own", cents: 20, category: "food", date: "2026-10-09" })
      .expect(201)
  ).body;
  await api(alice, "patch", `/team-expenses/${self.id}`)
    .send({ status: "approved", version: 0 })
    .expect(403);
  const dash = (
    await api(alice, "get", `/tenants/${tenant}/dashboard`).expect(200)
  ).body;
  assert.equal(dash.counts.teamExpenses, 2);
});
test("social feeds honor privacy and invalidate access after visibility changes", async () => {
  const row = (
    await api(alice, "post", "/posts")
      .send({ body: "Followers only", visibility: "followers" })
      .expect(201)
  ).body;
  assert.equal(
    (await api(bob, "get", "/feed").expect(200)).body.items.length,
    0,
  );
  await api(bob, "post", "/follows")
    .send({ target: users.alice.id })
    .expect(201);
  assert.equal(
    (await api(bob, "get", "/feed").expect(200)).body.items.length,
    1,
  );
  await api(alice, "patch", "/posts/" + row.id)
    .send({ body: row.body, visibility: "private", version: 0 })
    .expect(200);
  assert.equal(
    (await api(bob, "get", "/feed").expect(200)).body.items.length,
    0,
  );
  await api(bob, "patch", "/posts/" + row.id)
    .send({ body: "Tampered", visibility: "public", version: 1 })
    .expect(404);
});
test("commerce reserves atomically, rejects overselling and makes replay/cancellation safe", async () => {
  const product = (
    await api(alice, "post", `/tenants/${tenant}/products`)
      .send({ title: "Last unit", cents: 1234, stock: 1 })
      .expect(201)
  ).body;
  const results = await Promise.all(
    [alice, bob].map((a, n) =>
      api(a, "post", "/orders").send({
        product: product.id,
        quantity: 1,
        operation: "checkout_" + n,
      }),
    ),
  );
  assert.deepEqual(results.map((r) => r.status).sort(), [201, 409]);
  const winner = results.findIndex((r) => r.status === 201),
    agent = [alice, bob][winner],
    row = results[winner].body;
  const replay = (
    await api(agent, "post", "/orders")
      .send({
        product: product.id,
        quantity: 1,
        operation: "checkout_" + winner,
      })
      .expect(201)
  ).body;
  assert.equal(replay.id, row.id);
  await api(agent, "post", "/orders")
    .send({ product: product.id, quantity: 2, operation: "checkout_" + winner })
    .expect(409);
  await api(agent, "post", `/orders/${row.id}/cancel`).send({}).expect(200);
  await api(agent, "post", `/orders/${row.id}/cancel`).send({}).expect(200);
  assert.equal(
    (
      await store.db
        .collection("lab_products")
        .findOne({ _id: productObject(product.id) })
    ).stock,
    1,
  );
  assert.equal(
    await store.db
      .collection("lab_orders")
      .countDocuments({ product: product.id }),
    1,
  );
});
function productObject(value) {
  return new ObjectId(value);
}
test("signed provider-shaped events reject tampering and duplicate business effects", async () => {
  const p = (
    await api(alice, "post", `/tenants/${tenant}/products`)
      .send({ title: "Paid sample", cents: 100, stock: 2 })
      .expect(201)
  ).body;
  const row = (
    await api(bob, "post", "/orders")
      .send({ product: p.id, quantity: 1, operation: "payment_order" })
      .expect(201)
  ).body;
  const body = { event: "provider_event_1", amount: 100 },
    signature = createHmac("sha256", secret)
      .update(JSON.stringify({ order: row.id, ...body }))
      .digest("hex");
  await api(bob, "post", `/orders/${row.id}/payment`).send(body).expect(403);
  const deliveries=await Promise.all(Array.from({length:3},()=>api(bob,"post",`/orders/${row.id}/payment`).set("x-payment-signature",signature).send(body).expect(200)));
  for (const delivery of deliveries) {
    const result = delivery.body;
    assert.equal(result.status, "paid");
    assert.equal(result.version, 1);
  }
  await api(bob, "post", `/orders/${row.id}/cancel`).send({}).expect(409);
});
test("chat persists stable message ids, rejects operation collisions and replays SSE after cursor", async () => {
  const room = (
    await api(alice, "post", `/tenants/${tenant}/rooms`)
      .send({ title: "Engineering" })
      .expect(201)
  ).body;
  const first = (
    await api(bob, "post", `/rooms/${room.id}/messages`)
      .send({ body: "First", operation: "message_first" })
      .expect(201)
  ).body;
  assert.equal(
    (
      await api(bob, "post", `/rooms/${room.id}/messages`)
        .send({ body: "First", operation: "message_first" })
        .expect(201)
    ).body.id,
    first.id,
  );
  await api(bob, "post", `/rooms/${room.id}/messages`)
    .send({ body: "Changed", operation: "message_first" })
    .expect(409);
  await api(outside, "get", `/rooms/${room.id}/messages`).expect(404);
  const second = (
    await api(alice, "post", `/rooms/${room.id}/messages`)
      .send({ body: "Second", operation: "message_second" })
      .expect(201)
  ).body;
  const server = createServer(app);
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const abort = new AbortController(),
    timeout = setTimeout(() => abort.abort(), 8000);
  try {
    const response = await fetch(
      `http://127.0.0.1:${server.address().port}/api/lab/rooms/${room.id}/events`,
      {
        headers: { Cookie: cookies.bob, "Last-Event-ID": first.id },
        signal: abort.signal,
      },
    );
    assert.equal(response.status, 200);
    const reader = response.body.getReader();
    let text = "";
    while (!text.includes("data:")) {
      const value = await reader.read();
      text += new TextDecoder().decode(value.value);
    }
    assert.match(text, new RegExp(second.id));
    assert.ok(!text.includes('"body":"First"'));
    await reader.cancel();
  } finally {
    clearTimeout(timeout);
    abort.abort();
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
  }
});
