import { MongoMemoryReplSet } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "node:url";
import { createApp } from "../server/app.js";
import { MongoStore } from "../server/store.js";
const replica = await MongoMemoryReplSet.create({
  replSet: { count: 1, storageEngine: "wiredTiger" },
});
const client = new MongoClient(replica.getUri());
await client.connect();
const store = new MongoStore(client.db("disposable_learning_demo"));
await store.initialize();
const port = Number(process.env.PORT ?? 3000),
  origin = `http://localhost:${port}`;
const app = createApp({
  store,
  origin,
  staticDir: fileURLToPath(new URL("../dist/", import.meta.url)),
  allowPaymentSimulator: true,
});
const server = app.listen(port, "127.0.0.1", () =>
  console.log(
    `Learning demo: ${origin}. Register test accounts. Data is deleted on stop; simulated payments move no money.`,
  ),
);
let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  await client.close();
  await replica.stop();
}
process.on("SIGINT", () => close());
process.on("SIGTERM", () => close());
