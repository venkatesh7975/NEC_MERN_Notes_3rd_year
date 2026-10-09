import assert from "node:assert/strict";
const origin = "http://localhost:3000",
  mode = process.argv[2] ?? "seed";
let cookie;
async function request(path, body) {
  const response = await fetch(origin + "/api" + path, {
    method: body ? "POST" : "GET",
    headers: {
      Origin: origin,
      ...(cookie ? { Cookie: cookie } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(10000),
  });
  assert.ok(response.ok, `${path}: ${response.status}`);
  if (response.headers.get("set-cookie"))
    cookie = response.headers.get("set-cookie").split(";")[0];
  return response.json();
}
await request("/ready");
await request("/auth/" + (mode === "seed" ? "register" : "login"), {
  email: "container-fixture@example.test",
  password: "fixture-password-123",
});
if (mode === "seed") {
  const tenant = await request("/lab/tenants", {
    title: "Container recovery fixture",
  });
  await request(`/lab/tenants/${tenant.id}/projects`, {
    title: "Persistent project",
    body: "Recovery check",
  });
} else {
  const tenants = await request("/lab/tenants");
  assert.equal(tenants.length, 1);
  const projects = await request(`/lab/tenants/${tenants[0].id}/projects`);
  assert.equal(projects.items[0].title, "Persistent project");
}
console.log(
  `PASS container ${mode}: readiness, session, tenant and persisted project.`,
);
