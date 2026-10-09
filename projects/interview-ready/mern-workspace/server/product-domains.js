import { ObjectId } from "mongodb";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { fail } from "./validation.js";

const oid = (value) => {
  if (typeof value !== "string" || !/^[a-f0-9]{24}$/.test(value))
    fail(404, "NOT_FOUND", "Record not found");
  return new ObjectId(value);
};
const text = (value, label, max = 160) => {
  if (typeof value !== "string" || !value.trim() || value.trim().length > max)
    fail(400, "INPUT", `Invalid ${label}`);
  return value.trim();
};
const integer = (value, label, max = 100000000) => {
  if (!Number.isSafeInteger(value) || value < 1 || value > max)
    fail(400, "INPUT", `Invalid ${label}`);
  return value;
};
const fields = (body, allowed) => {
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).some((k) => !allowed.includes(k))
  )
    fail(400, "INPUT", "Unexpected fields");
  return body;
};
const choice = (value, allowed) => {
  if (!allowed.includes(value)) fail(400, "INPUT", "Unsupported value");
  return value;
};
const version = (value) => {
  if (!Number.isSafeInteger(value) || value < 0)
    fail(400, "INPUT", "A stored version is required");
  return value;
};
const publicRow = (row) => {
  if (!row) return null;
  const { _id, ...rest } = row;
  return { id: _id.toHexString(), ...rest };
};
const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const key = (value) => {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_-]{8,80}$/.test(value))
    fail(400, "INPUT", "Invalid operation id");
  return value;
};
const safeDate = (value) => {
  const parsed =
    typeof value === "string" ? new Date(value + "T00:00:00Z") : null;
  if (
    !parsed ||
    !Number.isFinite(parsed.getTime()) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    value < "1900-01-01" ||
    parsed.toISOString().slice(0, 10) !== value
  )
    fail(400, "INPUT", "Invalid calendar date");
  return value;
};
export const MOVIES = [
  {
    id: "signal",
    title: "The Last Signal",
    genre: "science-fiction",
    year: 2025,
    synopsis:
      "An original fictional catalog fixture about a missing transmission.",
  },
  {
    id: "garden",
    title: "Small Garden",
    genre: "documentary",
    year: 2024,
    synopsis: "An original fictional catalog fixture about urban gardening.",
  },
  {
    id: "journey",
    title: "Night Journey",
    genre: "drama",
    year: 2023,
    synopsis: "An original fictional catalog fixture about a train journey.",
  },
];
export const VIDEOS = [
  {
    id: "web-basics",
    title: "Web request walkthrough",
    description:
      "An original captioned clip demonstrating a web request boundary.",
    captions: "/media/web-basics.vtt",
    source: "/media/web-basics.webm",
  },
  {
    id: "state",
    title: "State and identity",
    description: "An original text lesson with optional licensed media.",
    captions: null,
    source: null,
  },
];

export async function initializeProducts(db) {
  for (const [name, index, unique] of [
    ["members", { tenant: 1, user: 1 }, true],
    ["enrollments", { course: 1, owner: 1 }, true],
    ["progress", { course: 1, owner: 1, lesson: 1 }, true],
    ["applications", { job: 1, owner: 1 }, true],
    ["follows", { owner: 1, target: 1 }, true],
    ["favorites", { owner: 1, movie: 1 }, true],
    ["playlists", { owner: 1, video: 1 }, true],
    ["orders", { owner: 1, operation: 1 }, true],
    ["messages", { room: 1, owner: 1, operation: 1 }, true],
    ["audit", { tenant: 1, _id: -1 }, false],
    ["teamExpenses", { tenant: 1, status: 1, _id: -1 }, false],
    ["articles", { status: 1, _id: -1 }, false],
    ["projectTasks", { project: 1, _id: -1 }, false],
    ["notifications", { owner: 1, _id: -1 }, false],
  ])
    await db.collection("lab_" + name).createIndex(index, { unique });
}

export function mountProducts(
  app,
  { store, paymentSecret, allowPaymentSimulator = false },
) {
  const db = store.db,
    c = (name) => db.collection("lab_" + name);
  const now = () => new Date();
  const tx = (fn) =>
    db.client.withSession((session) =>
      session.withTransaction(() => fn(session), {
        readConcern: { level: "snapshot" },
        writeConcern: { w: "majority" },
      }),
    );
  const audit = async (session, tenant, actor, action, record) =>
    c("audit").insertOne(
      { tenant, actor, action, record, createdAt: now() },
      { session },
    );
  async function membership(tenant, user, write = false, admin = false) {
    oid(tenant);
    const m = await c("members").findOne({ tenant, user });
    if (!m) fail(404, "NOT_FOUND", "Workspace not found");
    if ((write && m.role === "viewer") || (admin && m.role !== "owner"))
      fail(403, "PERMISSION", "This role cannot perform that action");
    return m;
  }
  async function roomFor(roomId, user) {
    const room = await c("rooms").findOne({ _id: oid(roomId) });
    if (!room || !room.members.includes(user))
      fail(404, "NOT_FOUND", "Room not found");
    await membership(room.tenant, user);
    return room;
  }
  async function page(name, predicate, query, searchFields = ["title"]) {
    if (
      Object.keys(query).some(
        (k) => !["q", "cursor", "limit", "status", "genre"].includes(k),
      )
    )
      fail(400, "INPUT", "Unsupported query");
    const limit =
      query.limit === undefined
        ? 20
        : integer(Number(query.limit), "page size", 50);
    const filter = { ...predicate };
    if (query.cursor) filter._id = { $lt: oid(query.cursor) };
    if (query.q) {
      const q = text(query.q, "search", 100);
      filter.$and = [
        ...(filter.$and ?? []),
        {
          $or: searchFields.map((field) => ({
            [field]: { $regex: escaped(q), $options: "i" },
          })),
        },
      ];
    }
    const rows = await c(name)
      .find(filter)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .toArray();
    return {
      items: rows.slice(0, limit).map(publicRow),
      nextCursor:
        rows.length > limit ? rows[limit - 1]._id.toHexString() : null,
    };
  }
  async function update(name, predicate, expected, changes) {
    const row = await c(name).findOneAndUpdate(
      { ...predicate, version: version(expected) },
      { $set: changes, $inc: { version: 1 } },
      { returnDocument: "after" },
    );
    if (row) return publicRow(row);
    if (await c(name).findOne(predicate))
      fail(409, "CONFLICT", "Record changed. Reload before editing.");
    fail(404, "NOT_FOUND", "Record not found");
  }
  const route = "/api/lab";
  app.get(route + "/catalog/movies", (req, res) => {
    const q = String(req.query.q ?? "")
        .toLowerCase()
        .slice(0, 100),
      genre = req.query.genre,
      offset = Number(req.query.cursor ?? 0),
      limit =
        req.query.limit === undefined
          ? 2
          : integer(Number(req.query.limit), "page size", 50);
    if (!Number.isSafeInteger(offset) || offset < 0 || offset > 1000)
      fail(400, "INPUT", "Invalid catalog cursor");
    const rows = MOVIES.filter(
      (m) => m.title.toLowerCase().includes(q) && (!genre || m.genre === genre),
    );
    res.set("Cache-Control", "private, max-age=60");
    res.json({
      items: rows.slice(offset, offset + limit),
      nextCursor: offset + limit < rows.length ? String(offset + limit) : null,
    });
  });
  app.get(route + "/catalog/movies/:id", (req, res) => {
    const m = MOVIES.find((m) => m.id === req.params.id);
    if (!m) fail(404, "NOT_FOUND", "Movie not found");
    res.json(m);
  });
  app.get(route + "/catalog/videos", (req, res) =>
    res.json(
      VIDEOS.filter((v) =>
        v.title.toLowerCase().includes(
          String(req.query.q ?? "")
            .toLowerCase()
            .slice(0, 100),
        ),
      ),
    ),
  );
  for (const [name, field, fixtures] of [
    ["favorites", "movie", MOVIES],
    ["playlists", "video", VIDEOS],
  ]) {
    app.get(route + "/" + name, async (req, res) =>
      res.json(await page(name, { owner: req.user.id }, req.query, [field])),
    );
    app.post(route + "/" + name, async (req, res) => {
      fields(req.body, [field]);
      const value = text(req.body[field], field, 80);
      if (!fixtures.some((r) => r.id === value))
        fail(400, "INPUT", "Unknown catalog id");
      await c(name).updateOne(
        { owner: req.user.id, [field]: value },
        { $setOnInsert: { createdAt: now() } },
        { upsert: true },
      );
      res.status(201).json({ [field]: value });
    });
    app.delete(route + "/" + name + "/:id", async (req, res) => {
      await c(name).deleteOne({ _id: oid(req.params.id), owner: req.user.id });
      res.status(204).end();
    });
  }
  app.get(route + "/articles", async (req, res) =>
    res.json(
      await page(
        "articles",
        req.query.status === "draft"
          ? { owner: req.user.id, status: "draft" }
          : { $or: [{ status: "published" }, { owner: req.user.id }] },
        req.query,
        ["title", "body"],
      ),
    ),
  );
  app.post(route + "/articles", async (req, res) => {
    fields(req.body, ["title", "body"]);
    const row = {
      owner: req.user.id,
      title: text(req.body.title, "title"),
      body: text(req.body.body, "body", 8000),
      status: "draft",
      version: 0,
      createdAt: now(),
    };
    row._id = (await c("articles").insertOne(row)).insertedId;
    res.status(201).json(publicRow(row));
  });
  app.patch(route + "/articles/:id", async (req, res) => {
    fields(req.body, ["title", "body", "status", "version"]);
    res.json(
      await update(
        "articles",
        { _id: oid(req.params.id), owner: req.user.id },
        req.body.version,
        {
          title: text(req.body.title, "title"),
          body: text(req.body.body, "body", 8000),
          status: choice(req.body.status, ["draft", "published"]),
        },
      ),
    );
  });
  app.delete(route + "/articles/:id", async (req, res) => {
    if (
      !(
        await c("articles").deleteOne({
          _id: oid(req.params.id),
          owner: req.user.id,
        })
      ).deletedCount
    )
      fail(404, "NOT_FOUND", "Article not found");
    res.status(204).end();
  });
  app.get(route + "/tenants", async (req, res) => {
    const memberships = await c("members")
      .find({ user: req.user.id })
      .limit(100)
      .toArray();
    res.json(
      (
        await c("tenants")
          .find({ _id: { $in: memberships.map((m) => oid(m.tenant)) } })
          .toArray()
      ).map((row) => ({
        ...publicRow(row),
        role: memberships.find((m) => m.tenant === row._id.toHexString()).role,
      })),
    );
  });
  app.post(route + "/tenants", async (req, res) => {
    fields(req.body, ["title"]);
    const _id = new ObjectId(),
      tenant = _id.toHexString();
    await tx(async (session) => {
      await c("tenants").insertOne(
        { _id, title: text(req.body.title, "workspace"), createdAt: now() },
        { session },
      );
      await c("members").insertOne(
        { tenant, user: req.user.id, role: "owner" },
        { session },
      );
      await audit(session, tenant, req.user.id, "workspace.created", tenant);
    });
    res.status(201).json({ id: tenant, title: req.body.title, role: "owner" });
  });
  app.get(route + "/tenants/:tenant/members", async (req, res) => {
    await membership(req.params.tenant, req.user.id);
    res.json(
      (
        await c("members")
          .find({ tenant: req.params.tenant })
          .limit(100)
          .toArray()
      ).map(publicRow),
    );
  });
  app.post(route + "/tenants/:tenant/members", async (req, res) => {
    await membership(req.params.tenant, req.user.id, false, true);
    fields(req.body, ["email", "role"]);
    const user = await db
      .collection("users")
      .findOne({ email: text(req.body.email, "email", 254).toLowerCase() });
    if (!user)
      fail(404, "NOT_FOUND", "Register the test account before adding it");
    const role = choice(req.body.role, ["editor", "viewer"]);
    if (user._id.toHexString() === req.user.id)
      fail(400, "INPUT", "Owner role cannot be changed here");
    await tx(async (session) => {
      await c("members").updateOne(
        { tenant: req.params.tenant, user: user._id.toHexString() },
        { $set: { role } },
        { upsert: true, session },
      );
      await audit(
        session,
        req.params.tenant,
        req.user.id,
        "member.updated",
        user._id.toHexString(),
      );
    });
    res.status(201).json({ user: user._id.toHexString(), role });
  });
  app.get(route + "/tenants/:tenant/audit", async (req, res) => {
    await membership(req.params.tenant, req.user.id, false, true);
    res.json(
      await page("audit", { tenant: req.params.tenant }, req.query, ["action"]),
    );
  });
  app.get(route + "/tenants/:tenant/dashboard", async (req, res) => {
    await membership(req.params.tenant, req.user.id, false, true);
    const counts = {};
    for (const name of [
      "projects",
      "jobs",
      "courses",
      "products",
      "teamExpenses",
    ])
      counts[name] = await c(name).countDocuments({
        tenant: req.params.tenant,
      });
    const report = await c("teamExpenses")
      .aggregate([
        { $match: { tenant: req.params.tenant } },
        {
          $group: {
            _id: "$status",
            cents: { $sum: "$cents" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();
    res.json({ counts, expenses: report });
  });
  // Tenant-owned domains share permissions, but validation and workflows remain distinct.
  for (const name of ["projects", "jobs", "courses", "products"]) {
    app.get(route + "/tenants/:tenant/" + name, async (req, res) => {
      await membership(req.params.tenant, req.user.id);
      const result = await page(name, { tenant: req.params.tenant }, req.query);
      res.json(
        name === "courses"
          ? {
              ...result,
              items: result.items.map(({ lessons, ...row }) => ({
                ...row,
                lessonCount: lessons.length,
              })),
            }
          : result,
      );
    });
    app.post(route + "/tenants/:tenant/" + name, async (req, res) => {
      await membership(req.params.tenant, req.user.id, true);
      fields(
        req.body,
        name === "products"
          ? ["title", "cents", "stock"]
          : name === "courses"
            ? ["title", "lessons"]
            : ["title", "body"],
      );
      const row = {
        tenant: req.params.tenant,
        owner: req.user.id,
        title: text(req.body.title, "title"),
        version: 0,
        createdAt: now(),
      };
      if (name === "products")
        Object.assign(row, {
          cents: integer(req.body.cents, "price"),
          stock: integer(req.body.stock, "stock", 10000),
        });
      else if (name === "courses") {
        if (
          !Array.isArray(req.body.lessons) ||
          req.body.lessons.length < 1 ||
          req.body.lessons.length > 30
        )
          fail(400, "INPUT", "Supply 1 to 30 lesson texts");
        row.lessons = req.body.lessons.map((value) =>
          text(value, "lesson", 2000),
        );
      } else row.body = text(req.body.body, "description", 2000);
      row._id = new ObjectId();
      await tx(async (session) => {
        await c(name).insertOne(row, { session });
        await audit(
          session,
          row.tenant,
          req.user.id,
          name + ".created",
          row._id.toHexString(),
        );
      });
      res.status(201).json(publicRow(row));
    });
  }
  app.get(route + "/courses", async (req, res) => {
    const memberTenants = (
      await c("members").find({ user: req.user.id }).toArray()
    ).map((m) => m.tenant);
    const result = await page(
      "courses",
      { tenant: { $in: memberTenants } },
      req.query,
    );
    res.json({
      ...result,
      items: result.items.map(({ lessons, ...row }) => ({
        ...row,
        lessonCount: lessons.length,
      })),
    });
  });
  app.post(route + "/courses/:id/enroll", async (req, res) => {
    const course = await c("courses").findOne({ _id: oid(req.params.id) });
    if (!course) fail(404, "NOT_FOUND", "Course not found");
    await membership(course.tenant, req.user.id);
    await c("enrollments").updateOne(
      { course: req.params.id, owner: req.user.id },
      { $setOnInsert: { createdAt: now() } },
      { upsert: true },
    );
    res.status(201).json({ course: req.params.id });
  });
  app.get(route + "/courses/:id/lessons", async (req, res) => {
    const course = await c("courses").findOne({ _id: oid(req.params.id) });
    if (!course) fail(404, "NOT_FOUND", "Course not found");
    await membership(course.tenant, req.user.id);
    if (
      !(await c("enrollments").findOne({
        course: req.params.id,
        owner: req.user.id,
      }))
    )
      fail(403, "ENROLLMENT", "Enroll before reading lessons");
    res.json({
      lessons: course.lessons,
      completed: (
        await c("progress")
          .find({ course: req.params.id, owner: req.user.id })
          .toArray()
      ).map((p) => p.lesson),
    });
  });
  app.post(route + "/courses/:id/progress", async (req, res) => {
    fields(req.body, ["lesson"]);
    const course = await c("courses").findOne({ _id: oid(req.params.id) });
    if (!course) fail(404, "NOT_FOUND", "Course not found");
    await membership(course.tenant, req.user.id);
    if (
      !(await c("enrollments").findOne({
        course: req.params.id,
        owner: req.user.id,
      }))
    )
      fail(403, "ENROLLMENT", "Enrollment required");
    const lesson = integer(req.body.lesson, "lesson", course.lessons.length);
    await c("progress").updateOne(
      { course: req.params.id, owner: req.user.id, lesson },
      { $set: { completedAt: now() } },
      { upsert: true },
    );
    res.json({ lesson, complete: true });
  });
  app.get(route + "/jobs", async (req, res) =>
    res.json(await page("jobs", {}, req.query, ["title", "body"])),
  );
  app.post(route + "/jobs/:id/apply", async (req, res) => {
    fields(req.body, ["coverLetter", "resume"]);
    if (!(await c("jobs").findOne({ _id: oid(req.params.id) })))
      fail(404, "NOT_FOUND", "Job not found");
    const row = {
      job: req.params.id,
      owner: req.user.id,
      coverLetter: text(req.body.coverLetter, "cover letter", 4000),
      status: "submitted",
      version: 0,
      createdAt: now(),
    };
    if (req.body.resume !== undefined) {
      const encoded = text(req.body.resume, "resume", 11000);
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded))
        fail(400, "INPUT", "Invalid encoded PDF");
      const bytes = Buffer.from(encoded, "base64");
      if (
        bytes.length > 8192 ||
        !bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))
      )
        fail(400, "INPUT", "Only PDF test documents up to 8 KiB are accepted");
      row.resume = bytes;
    }
    row._id = (await c("applications").insertOne(row)).insertedId;
    res.status(201).json({ id: row._id.toHexString(), status: row.status });
  });
  app.get(route + "/jobs/:id/applications", async (req, res) => {
    const job = await c("jobs").findOne({ _id: oid(req.params.id) });
    if (!job) fail(404, "NOT_FOUND", "Job not found");
    await membership(job.tenant, req.user.id, true);
    const result = await page(
      "applications",
      { job: req.params.id },
      req.query,
      ["coverLetter"],
    );
    res.json({
      ...result,
      items: result.items.map(({ resume, ...row }) => ({
        ...row,
        hasResume: Boolean(resume),
      })),
    });
  });
  app.get(route + "/applications/:id/resume", async (req, res) => {
    const row = await c("applications").findOne({ _id: oid(req.params.id) });
    if (!row) fail(404, "NOT_FOUND", "Application not found");
    if (row.owner !== req.user.id) {
      const job = await c("jobs").findOne({ _id: oid(row.job) });
      await membership(job.tenant, req.user.id, true);
    }
    if (!row.resume) fail(404, "NOT_FOUND", "No resume");
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="test-resume.pdf"',
      "Content-Security-Policy": "sandbox; default-src 'none'",
    });
    res.send(row.resume.buffer);
  });
  app.patch(route + "/applications/:id", async (req, res) => {
    fields(req.body, ["status", "version"]);
    const row = await c("applications").findOne({ _id: oid(req.params.id) });
    if (!row) fail(404, "NOT_FOUND", "Application not found");
    const job = await c("jobs").findOne({ _id: oid(row.job) });
    await membership(job.tenant, req.user.id, true);
    res.json(
      await update("applications", { _id: row._id }, req.body.version, {
        status: choice(req.body.status, [
          "submitted",
          "reviewing",
          "accepted",
          "rejected",
        ]),
      }),
    );
  });
  app.get(route + "/projects/:id/tasks", async (req, res) => {
    const project = await c("projects").findOne({ _id: oid(req.params.id) });
    if (!project) fail(404, "NOT_FOUND", "Project not found");
    await membership(project.tenant, req.user.id);
    res.json(await page("projectTasks", { project: req.params.id }, req.query));
  });
  app.post(route + "/projects/:id/tasks", async (req, res) => {
    fields(req.body, ["title"]);
    const project = await c("projects").findOne({ _id: oid(req.params.id) });
    if (!project) fail(404, "NOT_FOUND", "Project not found");
    await membership(project.tenant, req.user.id, true);
    const row = {
      _id: new ObjectId(),
      project: req.params.id,
      tenant: project.tenant,
      title: text(req.body.title, "task"),
      status: "todo",
      version: 0,
      createdAt: now(),
    };
    await tx(async (session) => {
      await c("projectTasks").insertOne(row, { session });
      await audit(
        session,
        row.tenant,
        req.user.id,
        "task.created",
        row._id.toHexString(),
      );
    });
    res.status(201).json(publicRow(row));
  });
  app.patch(route + "/project-tasks/:id", async (req, res) => {
    fields(req.body, ["title", "status", "version"]);
    const row = await c("projectTasks").findOne({ _id: oid(req.params.id) });
    if (!row) fail(404, "NOT_FOUND", "Task not found");
    await membership(row.tenant, req.user.id, true);
    const result = await tx(async (session) => {
      const updated = await c("projectTasks").findOneAndUpdate(
        { _id: row._id, version: version(req.body.version) },
        {
          $set: {
            title: text(req.body.title, "task"),
            status: choice(req.body.status, ["todo", "doing", "done"]),
          },
          $inc: { version: 1 },
        },
        { session, returnDocument: "after" },
      );
      if (!updated) fail(409, "CONFLICT", "Task changed");
      await audit(
        session,
        row.tenant,
        req.user.id,
        "task.changed",
        req.params.id,
      );
      return publicRow(updated);
    });
    res.json(result);
  });
  app.get(route + "/project-tasks/:id/comments", async (req, res) => {
    const row = await c("projectTasks").findOne({ _id: oid(req.params.id) });
    if (!row) fail(404, "NOT_FOUND", "Task not found");
    await membership(row.tenant, req.user.id);
    res.json(
      await page("comments", { task: req.params.id }, req.query, ["body"]),
    );
  });
  app.post(route + "/project-tasks/:id/comments", async (req, res) => {
    fields(req.body, ["body"]);
    const row = await c("projectTasks").findOne({ _id: oid(req.params.id) });
    if (!row) fail(404, "NOT_FOUND", "Task not found");
    await membership(row.tenant, req.user.id, true);
    const comment = {
      _id: new ObjectId(),
      task: req.params.id,
      owner: req.user.id,
      body: text(req.body.body, "comment", 2000),
      createdAt: now(),
    };
    await tx(async (session) => {
      await c("comments").insertOne(comment, { session });
      await audit(
        session,
        row.tenant,
        req.user.id,
        "comment.created",
        comment._id.toHexString(),
      );
      const members = await c("members")
        .find({ tenant: row.tenant, user: { $ne: req.user.id } }, { session })
        .limit(100)
        .toArray();
      for (const m of members)
        await c("notifications").insertOne(
          {
            owner: m.user,
            tenant: row.tenant,
            task: req.params.id,
            body: "A task has a new comment",
            createdAt: now(),
          },
          { session },
        );
    });
    res.status(201).json(publicRow(comment));
  });
  app.get(route + "/notifications", async (req, res) =>
    res.json(
      await page("notifications", { owner: req.user.id }, req.query, ["body"]),
    ),
  );
  app.post(route + "/tenants/:tenant/expenses", async (req, res) => {
    await membership(req.params.tenant, req.user.id, true);
    fields(req.body, ["title", "cents", "category", "date"]);
    const row = {
      _id: new ObjectId(),
      tenant: req.params.tenant,
      owner: req.user.id,
      title: text(req.body.title, "title"),
      cents: integer(req.body.cents, "amount"),
      category: choice(req.body.category, [
        "food",
        "travel",
        "learning",
        "other",
      ]),
      date: safeDate(req.body.date),
      status: "submitted",
      version: 0,
      createdAt: now(),
    };
    await tx(async (session) => {
      await c("teamExpenses").insertOne(row, { session });
      await audit(
        session,
        row.tenant,
        req.user.id,
        "expense.submitted",
        row._id.toHexString(),
      );
    });
    res.status(201).json(publicRow(row));
  });
  app.get(route + "/tenants/:tenant/expenses", async (req, res) => {
    const m = await membership(req.params.tenant, req.user.id);
    const predicate = {
      tenant: req.params.tenant,
      ...(m.role === "owner" ? {} : { owner: req.user.id }),
    };
    if (req.query.status)
      predicate.status = choice(req.query.status, [
        "submitted",
        "approved",
        "rejected",
      ]);
    res.json(await page("teamExpenses", predicate, req.query));
  });
  app.patch(route + "/team-expenses/:id", async (req, res) => {
    fields(req.body, ["status", "version"]);
    const row = await c("teamExpenses").findOne({ _id: oid(req.params.id) });
    if (!row) fail(404, "NOT_FOUND", "Expense not found");
    await membership(row.tenant, req.user.id, false, true);
    if (row.owner === req.user.id)
      fail(
        403,
        "PERMISSION",
        "A separate account must approve its own expense",
      );
    const result = await tx(async (session) => {
      const updated = await c("teamExpenses").findOneAndUpdate(
        {
          _id: row._id,
          version: version(req.body.version),
          status: "submitted",
        },
        {
          $set: {
            status: choice(req.body.status, ["approved", "rejected"]),
            approver: req.user.id,
          },
          $inc: { version: 1 },
        },
        { session, returnDocument: "after" },
      );
      if (!updated)
        fail(409, "CONFLICT", "Expense already reviewed or changed");
      await audit(
        session,
        row.tenant,
        req.user.id,
        "expense.reviewed",
        req.params.id,
      );
      return publicRow(updated);
    });
    res.json(result);
  });
  app.post(route + "/follows", async (req, res) => {
    fields(req.body, ["target"]);
    const target = text(req.body.target, "profile id", 24);
    if (
      target === req.user.id ||
      !(await db.collection("users").findOne({ _id: oid(target) }))
    )
      fail(400, "INPUT", "Unknown or own profile");
    await c("follows").updateOne(
      { owner: req.user.id, target },
      { $setOnInsert: { createdAt: now() } },
      { upsert: true },
    );
    res.status(201).json({ target });
  });
  app.delete(route + "/follows/:target", async (req, res) => {
    oid(req.params.target);
    await c("follows").deleteOne({
      owner: req.user.id,
      target: req.params.target,
    });
    res.status(204).end();
  });
  app.post(route + "/posts", async (req, res) => {
    fields(req.body, ["body", "visibility"]);
    const row = {
      _id: new ObjectId(),
      owner: req.user.id,
      body: text(req.body.body, "post", 2000),
      visibility: choice(req.body.visibility, [
        "public",
        "followers",
        "private",
      ]),
      version: 0,
      createdAt: now(),
    };
    await c("posts").insertOne(row);
    res.status(201).json(publicRow(row));
  });
  app.patch(route + "/posts/:id", async (req, res) => {
    fields(req.body, ["body", "visibility", "version"]);
    res.json(
      await update(
        "posts",
        { _id: oid(req.params.id), owner: req.user.id },
        req.body.version,
        {
          body: text(req.body.body, "post", 2000),
          visibility: choice(req.body.visibility, [
            "public",
            "followers",
            "private",
          ]),
        },
      ),
    );
  });
  app.get(route + "/feed", async (req, res) => {
    const followed = (
      await c("follows").find({ owner: req.user.id }).limit(1000).toArray()
    ).map((f) => f.target);
    res.json(
      await page(
        "posts",
        {
          $or: [
            { owner: req.user.id },
            { visibility: "public" },
            { visibility: "followers", owner: { $in: followed } },
          ],
        },
        req.query,
        ["body"],
      ),
    );
  });
  app.post(route + "/tenants/:tenant/rooms", async (req, res) => {
    await membership(req.params.tenant, req.user.id, true);
    fields(req.body, ["title"]);
    const members = (
      await c("members")
        .find({ tenant: req.params.tenant })
        .limit(100)
        .toArray()
    ).map((m) => m.user);
    const row = {
      _id: new ObjectId(),
      tenant: req.params.tenant,
      title: text(req.body.title, "room"),
      members,
      createdAt: now(),
    };
    await c("rooms").insertOne(row);
    res.status(201).json(publicRow(row));
  });
  app.get(route + "/tenants/:tenant/rooms", async (req, res) => {
    await membership(req.params.tenant, req.user.id);
    res.json(
      await page(
        "rooms",
        { tenant: req.params.tenant, members: req.user.id },
        req.query,
      ),
    );
  });
  app.post(route + "/rooms/:id/join", async (req, res) => {
    const room = await c("rooms").findOne({ _id: oid(req.params.id) });
    if (!room) fail(404, "NOT_FOUND", "Room not found");
    await membership(room.tenant, req.user.id);
    await c("rooms").updateOne(
      { _id: room._id },
      { $addToSet: { members: req.user.id } },
    );
    res.json({ room: req.params.id, joined: true });
  });
  app.get(route + "/rooms/:id/messages", async (req, res) => {
    await roomFor(req.params.id, req.user.id);
    res.json(
      await page("messages", { room: req.params.id }, req.query, ["body"]),
    );
  });
  app.post(route + "/rooms/:id/messages", async (req, res) => {
    await roomFor(req.params.id, req.user.id);
    fields(req.body, ["body", "operation"]);
    const predicate = {
        room: req.params.id,
        owner: req.user.id,
        operation: key(req.body.operation),
      },
      body = text(req.body.body, "message", 2000);
    let row = await c("messages").findOne(predicate);
    if (row && row.body !== body)
      fail(409, "IDEMPOTENCY", "Operation id already has another message");
    if (!row) {
      try {
        await c("messages").insertOne({ ...predicate, body, createdAt: now() });
      } catch (error) {
        if (error.code !== 11000) throw error;
      }
      row = await c("messages").findOne(predicate);
      if (row.body !== body)
        fail(409, "IDEMPOTENCY", "Operation id already has another message");
    }
    res.status(201).json(publicRow(row));
  });
  let streams = 0;
  app.get(route + "/rooms/:id/events", async (req, res) => {
    await roomFor(req.params.id, req.user.id);
    let cursor = req.get("last-event-id") ?? req.query.after;
    if (cursor) oid(cursor);
    if (streams >= 100) fail(429, "LIMIT", "Too many streams");
    streams++;
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    });
    res.flushHeaders();
    let closed = false,
      timer;
    const close = () => {
      if (closed) return;
      closed = true;
      clearTimeout(timer);
      streams--;
      res.end();
    };
    req.on("close", close);
    async function poll() {
      try {
        if (closed) return;
        if (!(await store.session(req.sessionHash))) return close();
        await roomFor(req.params.id, req.user.id);
        const rows = await c("messages")
          .find({
            room: req.params.id,
            ...(cursor ? { _id: { $gt: oid(cursor) } } : {}),
          })
          .sort({ _id: 1 })
          .limit(50)
          .toArray();
        for (const row of rows) {
          cursor = row._id.toHexString();
          if (
            !res.write(
              `id: ${cursor}\nevent: message\ndata: ${JSON.stringify(publicRow(row))}\n\n`,
            )
          )
            return close();
        }
        if (!rows.length && !res.write(": heartbeat\n\n")) return close();
        timer = setTimeout(poll, rows.length === 50 ? 10 : 1000);
      } catch {
        close();
      }
    }
    poll();
  });
  app.get(route + "/products", async (req, res) =>
    res.json(await page("products", {}, req.query)),
  );
  app.get(route + "/orders", async (req, res) =>
    res.json(
      await page("orders", { owner: req.user.id }, req.query, ["operation"]),
    ),
  );
  app.post(route + "/orders", async (req, res) => {
    fields(req.body, ["product", "quantity", "operation"]);
    const product = oid(req.body.product),
      quantity = integer(req.body.quantity, "quantity", 100),
      operation = key(req.body.operation),
      owner = req.user.id;
    const fingerprint = createHash("sha256")
      .update(JSON.stringify({ product: product.toHexString(), quantity }))
      .digest("hex");
    async function reserve() {
      return tx(async (session) => {
        const existing = await c("orders").findOne(
          { owner, operation },
          { session },
        );
        if (existing) {
          if (existing.fingerprint !== fingerprint)
            fail(409, "IDEMPOTENCY", "Operation id reused for another order");
          return publicRow(existing);
        }
        const inventory = await c("products").findOneAndUpdate(
          { _id: product, stock: { $gte: quantity } },
          { $inc: { stock: -quantity, version: 1 } },
          { returnDocument: "after", session },
        );
        if (!inventory) fail(409, "STOCK", "Insufficient stock");
        const row = {
          _id: new ObjectId(),
          owner,
          operation,
          fingerprint,
          product: req.body.product,
          quantity,
          cents: inventory.cents * quantity,
          status: "reserved",
          version: 0,
          createdAt: now(),
        };
        await c("orders").insertOne(row, { session });
        await audit(
          session,
          inventory.tenant,
          owner,
          "order.reserved",
          row._id.toHexString(),
        );
        return publicRow(row);
      });
    }
    try {
      res.status(201).json(await reserve());
    } catch (error) {
      if (error.code !== 11000) throw error;
      const row = await c("orders").findOne({ owner, operation });
      if (!row || row.fingerprint !== fingerprint)
        fail(409, "IDEMPOTENCY", "Conflicting order operation");
      res.status(201).json(publicRow(row));
    }
  });
  app.post(route + "/orders/:id/cancel", async (req, res) => {
    const result = await tx(async (session) => {
      const row = await c("orders").findOne(
        { _id: oid(req.params.id), owner: req.user.id },
        { session },
      );
      if (!row) fail(404, "NOT_FOUND", "Order not found");
      if (row.status === "canceled") return publicRow(row);
      if (row.status !== "reserved")
        fail(409, "STATE", "Only reserved orders can be canceled");
      await c("products").updateOne(
        { _id: oid(row.product) },
        { $inc: { stock: row.quantity, version: 1 } },
        { session },
      );
      await c("orders").updateOne(
        { _id: row._id },
        { $set: { status: "canceled" }, $inc: { version: 1 } },
        { session },
      );
      return {
        ...publicRow(row),
        status: "canceled",
        version: row.version + 1,
      };
    });
    res.json(result);
  });
  // Explicit local provider contract simulation; no money is moved.
  app.post(route + "/orders/:id/payment", async (req, res) => {
    if (!paymentSecret)
      fail(503, "CONFIGURATION", "Payment adapter unavailable");
    fields(req.body, ["event", "amount"]);
    const event = key(req.body.event),
      amount = integer(req.body.amount, "amount"),
      payload = JSON.stringify({ order: req.params.id, event, amount }),
      provided = req.get("x-payment-signature");
    const expected = createHmac("sha256", paymentSecret)
      .update(payload)
      .digest();
    if (
      !provided ||
      !/^[a-f0-9]{64}$/.test(provided) ||
      !timingSafeEqual(Buffer.from(provided, "hex"), expected)
    )
      fail(403, "SIGNATURE", "Invalid provider event");
    const row = await c("orders").findOne({
      _id: oid(req.params.id),
      owner: req.user.id,
    });
    if (!row) fail(404, "NOT_FOUND", "Order not found");
    if (row.cents !== amount)
      fail(409, "AMOUNT", "Payment amount does not match");
    if (row.status === "paid") {
      if (row.paymentEvent !== event)
        fail(409, "STATE", "Another payment event already completed the order");
      return res.json(publicRow(row));
    }
    const result = await c("orders").findOneAndUpdate(
      { _id: row._id, status: "reserved" },
      { $set: { status: "paid", paymentEvent: event }, $inc: { version: 1 } },
      { returnDocument: "after" },
    );
    if (!result) {
      const completed = await c("orders").findOne({_id: row._id, owner:req.user.id});
      if (completed?.status === "paid" && completed.paymentEvent === event)
        return res.json(publicRow(completed));
      fail(409, "STATE", "Order cannot be paid");
    }
    res.json(publicRow(result));
  });
  app.post(route + "/orders/:id/simulate-payment", async (req, res) => {
    if (!allowPaymentSimulator) fail(404, "NOT_FOUND", "Simulator is disabled");
    const row = await c("orders").findOne({
      _id: oid(req.params.id),
      owner: req.user.id,
    });
    if (!row) fail(404, "NOT_FOUND", "Order not found");
    if (row.status === "paid") return res.json(publicRow(row));
    const result = await c("orders").findOneAndUpdate(
      { _id: row._id, status: "reserved" },
      {
        $set: { status: "paid", paymentEvent: "local_simulation" },
        $inc: { version: 1 },
      },
      { returnDocument: "after" },
    );
    if (!result) fail(409, "STATE", "Order cannot be paid");
    res.json({ ...publicRow(result), simulation: true });
  });
}
