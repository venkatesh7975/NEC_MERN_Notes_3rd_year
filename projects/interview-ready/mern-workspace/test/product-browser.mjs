import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import fs from "node:fs/promises";
import { MongoClient } from "mongodb";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { createApp } from "../server/app.js";
import { MongoStore } from "../server/store.js";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url),
  { chromium } = require(process.env.PLAYWRIGHT_MODULE ?? "playwright");
let mongo, client, server, browser;
try {
  mongo = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
  });
  client = new MongoClient(mongo.getUri());
  await client.connect();
  const store = new MongoStore(client.db("product_browser"));
  await store.initialize();
  server = createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const origin = `http://127.0.0.1:${server.address().port}`;
  server.on(
    "request",
    createApp({
      store,
      origin,
      staticDir: fileURLToPath(new URL("../dist/", import.meta.url)),
      allowPaymentSimulator: true,
    }),
  );
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  });
  const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    }),
    page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", async (response) => {
    if (response.status() >= 400 && response.url().includes("/api/lab"))
      console.error(
        "Product HTTP failure",
        response.status(),
        await response.text(),
      );
  });
  await page.goto(origin);
  await page
    .getByRole("button", { name: "Create an account", exact: true })
    .click();
  await page
    .getByLabel("Email", { exact: true })
    .fill("browserowner@example.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill("correct horse battery");
  await page.getByRole("button", { name: "Register", exact: true }).click();
  await page
    .getByRole("heading", { name: "Task board", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Product engineering lab", exact: true })
    .click();
  const api = async (path, body) => {
    const response = await context.request.post(origin + "/api/lab" + path, {
      headers: { Origin: origin },
      data: body,
    });
    assert.ok(response.ok(), await response.text());
    return response.json();
  };
  const view = async (name) => {
    console.log("Verify product view:", name);
    await page.getByRole("button", { name, exact: true }).click();
    await page.getByRole("heading", { name, exact: true }).waitFor();
  };
  await page.getByText("Workspaces and roles", { exact: true }).click();
  await page.getByLabel("Workspace name", { exact: true }).fill("Browser team");
  await page
    .getByRole("button", { name: "Create workspace", exact: true })
    .click();
  await page
    .getByLabel("Selected workspace", { exact: true })
    .getByRole("option", { name: "Browser team (owner)" })
    .waitFor({ state: "attached" })
    .catch(async (e) => {
      console.error(await page.locator(".product-lab").innerText());
      console.error(
        "Tenant read",
        await (await context.request.get(origin + "/api/lab/tenants")).text(),
      );
      throw e;
    });
  const tenant = await page
    .getByLabel("Selected workspace", { exact: true })
    .inputValue();
  await page
    .getByLabel("Article title", { exact: true })
    .fill("A browser article");
  await page
    .getByLabel("Article body", { exact: true })
    .fill("An original article body.");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await page
    .getByRole("heading", { name: "A browser article", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Publish", exact: true }).click();
  await page.waitForFunction(() =>
    document.body.textContent.includes("published · version 1"),
  );
  await view("Movie catalog");
  await page
    .getByRole("button", { name: "Load more records", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Night Journey", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Save favorite", exact: true })
    .first()
    .click();
  await page.locator(".product-card").filter({ hasText: "signal" }).waitFor();
  await view("Video catalog");
  await page.locator("video").waitFor();
  await page.locator("video").evaluate(async (v) => {
    v.preload = "auto";
    v.muted = true;
    v.load();
    let timer;
    try {
      await Promise.race([
        v.play(),
        new Promise((_, reject) => {
          timer = setTimeout(
            () =>
              reject(
                new Error(
                  "Playback timed out: ready=" +
                    v.readyState +
                    " network=" +
                    v.networkState +
                    " error=" +
                    v.error?.code,
                ),
              ),
            10000,
          );
        }),
      ]);
      v.pause();
    } finally {
      clearTimeout(timer);
    }
  });
  assert.equal(await page.locator("video track").count(), 1);
  await page
    .getByRole("button", { name: "Add to playlist", exact: true })
    .first()
    .click();
  await page.waitForFunction(() =>
    document.body.textContent.includes("Remove playlist item"),
  );
  await view("Commerce");
  await page
    .getByLabel("Product title", { exact: true })
    .fill("Browser product");
  await page.getByLabel("Unit price INR", { exact: true }).fill("12.34");
  await page.getByLabel("Initial stock", { exact: true }).fill("2");
  await page
    .getByRole("button", { name: "Create product", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Browser product", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page
    .getByRole("button", { name: "Reserve Browser product", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Simulate test payment", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Simulate test payment", exact: true })
    .click();
  await page.waitForFunction(() =>
    document.body.textContent.includes("paid ·"),
  );
  await view("LMS");
  await page.getByLabel("Course title", { exact: true }).fill("Browser course");
  await page
    .getByLabel("Lesson texts one per line", { exact: true })
    .fill("One original lesson");
  await page
    .getByRole("button", { name: "Create course", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Browser course", exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Enroll", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector("[role=status]")?.textContent === "Saved",
  );
  await page.getByRole("button", { name: "Open lessons", exact: true }).click();
  await page
    .getByRole("button", { name: "Mark lesson complete", exact: true })
    .click();
  await page.getByRole("button", { name: "Completed", exact: true }).waitFor();
  await view("Job portal");
  await page.getByLabel("Job title", { exact: true }).fill("Browser engineer");
  await page
    .getByLabel("Job description", { exact: true })
    .fill("An original job fixture");
  await page.getByRole("button", { name: "Publish job", exact: true }).click();
  await page
    .getByRole("heading", { name: "Browser engineer", exact: true })
    .waitFor();
  await page
    .getByRole("button", { name: "Apply or review applications", exact: true })
    .click();
  await page
    .getByLabel("Cover letter", { exact: true })
    .fill("My browser application");
  await page.getByLabel("Optional test PDF, maximum 8 KiB",{exact:true}).setInputFiles({name:'fixture.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4\n% disposable upload fixture')});
  await page
    .getByRole("button", { name: "Submit application", exact: true })
    .click();
  await page
    .getByLabel("Review application", { exact: true })
    .selectOption("reviewing");
  await page.waitForFunction(() =>
    document.body.textContent.includes("reviewing"),
  );
  const resumeLink=page.locator('a[href*="/resume"]');await resumeLink.waitFor();
  const resumeResponse=await page.request.get(new URL(await resumeLink.getAttribute('href'),origin).href);
  assert.equal(resumeResponse.status(),200);assert.match((await resumeResponse.body()).toString(),/^%PDF-/);
  await view("Social network");
  await page
    .getByLabel("Post text", { exact: true })
    .fill("<img src=x onerror=alert(1)>");
  await page.getByRole("button", { name: "Create post", exact: true }).click();
  await page.getByLabel("Change post visibility", { exact: true }).waitFor();
  assert.equal(await page.locator(".product-card img").count(), 0);
  await page
    .getByLabel("Change post visibility", { exact: true })
    .selectOption("private");
  await view("Project platform");
  await page
    .getByLabel("Project title", { exact: true })
    .fill("Browser release");
  await page
    .getByLabel("Project description", { exact: true })
    .fill("A release checklist");
  await page
    .getByRole("button", { name: "Create project", exact: true })
    .click();
  await page.getByRole("button", { name: "Open project", exact: true }).click();
  await page
    .getByLabel("Team task title", { exact: true })
    .fill("Team implementation");
  await page
    .getByRole("button", { name: "Create team task", exact: true })
    .click();
  await page
    .getByLabel("Team task status", { exact: true })
    .selectOption("doing");
  await page
    .getByLabel("Comment on Team implementation", { exact: true })
    .fill("Checked the boundary");
  await page.getByRole("button", { name: "Add comment", exact: true }).click();
  await page.getByText("Checked the boundary", { exact: true }).waitFor();
  await view("Recoverable chat");
  await page.getByLabel("Room title", { exact: true }).fill("Browser channel");
  await page.getByRole("button", { name: "Create room", exact: true }).click();
  await page
    .getByRole("button", { name: "Join room view", exact: true })
    .click();
  await page
    .getByLabel("Message text", { exact: true })
    .fill("Durable browser message");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.getByText(/Durable browser message ·/).waitFor();
  await view("Expense approvals");
  await page
    .getByLabel("Team expense title", { exact: true })
    .fill("Own expense");
  await page.getByLabel("Team amount INR", { exact: true }).fill("0.30");
  await page.getByLabel("Expense date", { exact: true }).fill("2026-10-09");
  await page
    .getByRole("button", { name: "Submit team expense", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Own expense", exact: true })
    .waitFor();
  assert.equal(
    await page
      .getByRole("button", { name: "Approve expense", exact: true })
      .count(),
    0,
  );
  await view("Admin dashboard");
  await page
    .getByRole("button", { name: "Load dashboard", exact: true })
    .click();
  await page.locator("dl").waitFor();
  assert.match(await page.locator("dl").innerText(), /products/);
  const folder = new URL("../../../../tmp/product-browser/", import.meta.url);
  await fs.mkdir(folder, { recursive: true });
  await page.screenshot({
    path: fileURLToPath(new URL("desktop.png", folder)),
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  for (const name of [
    "Commerce",
    "Project platform",
    "Recoverable chat",
    "Expense approvals",
  ]) {
    await view(name);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Mobile overflow " + name,
    );
  }
  await page.screenshot({
    path: fileURLToPath(new URL("mobile.png", folder)),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log(
    "PASS: eleven product workflows, generated video/captions, safe posts, server-backed persistence, mobile layout and no browser errors.",
  );
} finally {
  await browser?.close();
  server?.closeAllConnections();
  if (server) await new Promise((r) => server.close(r));
  await client?.close();
  await mongo?.stop();
}
