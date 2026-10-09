# Container and recovery exercises

Requires a running Docker engine. This local Compose stack has a single-node replica set, a nonroot Node container, persistent MongoDB storage, and a localhost-only HTTP port. It has no public TLS, database authentication or production hosting. API request logs contain only random request ID, method, status and duration; they omit cookies, body, email and query strings.

```bash
docker compose -f compose.yaml -f compose.app.yaml up --build --wait
# Open http://localhost:3000
docker compose -f compose.yaml -f compose.app.yaml logs app
docker compose -f compose.yaml -f compose.app.yaml restart app
```

The one-shot Mongo initializer waits for a writable primary and is safe to rerun. `/api/health` is process liveness; `/api/ready` pings MongoDB with a two-second operation deadline and returns 503 on failure. App health uses readiness. SIGTERM stops accepting new HTTP work; a ten-second deadline bounds shutdown. Long-lived SSE clients reconnect and replay from persisted message IDs.

## Backup and restore drill

Run these commands from this directory in Bash on a disposable local environment. They copy data into a **different** database, `restore_drill`, and leave the original intact. Use an unused restore target; restoring into an existing database can collide with data. Mongo tools run inside the official database image.

```bash
docker compose exec -T mongo sh -c 'mongodump --db=mern_interview_workspace --archive | mongorestore --archive --nsFrom="mern_interview_workspace.*" --nsTo="restore_drill.*"'
docker compose exec -T mongo mongosh --quiet --eval 'printjson(db.getSiblingDB("restore_drill").getCollectionNames())'
```

Compare source/restored collection counts and a representative order, membership, audit entry and message. A successful dump alone does not establish recovery. In production, encrypted off-host backups, retention, access restrictions and a timed restore drill are required. Never copy real data into this demo. Stop a local stack with `docker compose -f compose.yaml -f compose.app.yaml down`; volumes persist. Removing volumes deliberately destroys its local learning data.

## Release and rollback

Build and tag an immutable image from the reviewed Git commit. Run API/browser checks before rollout. Keep the previous image available. Test the new app with the target configuration and database compatibility before switching traffic; deploy additive schema/index changes first. Roll back the application image only when old code can still read the written data. A database restore is a separate controlled recovery operation, not an automatic rollback command.

CI runs a disposable container stack, writes fixtures, restarts the app, verifies persistence, restores into a separate namespace and compares counts. The local Windows Docker engine was unavailable during authoring; CI results are the execution evidence for this container exercise. Authenticated multi-node MongoDB, HTTPS/proxy policy, secrets delivery, distributed authentication rate limits, reservation expiration, monitoring/alerts, migrations and load tests remain required for public deployment.
