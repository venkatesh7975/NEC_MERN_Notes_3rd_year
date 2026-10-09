# MERN practice workspace

Fourteen full-stack interfaces share a React client and an Express API: the three base apps below and the [eleven product lab workflows](PRODUCT_LAB.md).

| Application | Implemented behavior | Interview discussion |
| --- | --- | --- |
| Task board | Create, move status, delete, reload; atomic expected-version updates | Lost updates, stale tabs, conflict recovery, stable identity |
| Reading list | Save title and URL, open, delete; per-user URL uniqueness | Input allowlists, URL schemes, duplicate writes, ownership |
| Expense tracker | Add and delete dated expenses; exact integer-cent amounts; full-account aggregate | Numeric validation, calendar dates, aggregate versus bounded display |

All three base apps and the product workflows persist in MongoDB and enforce authenticated ownership. Login uses salted scrypt password verifiers and revocable server sessions. A shared implementation avoids repeating security boilerplate; each domain has distinct validation, persistence behavior, and UI.

## Run the built app

Requires Node 22.12 or newer (Node 24 used for verification) and a MongoDB replica set. The [disposable demo](PRODUCT_LAB.md#run-without-docker) runs without Docker; the commands below provide persistent local data with Compose. Commands below run from this directory.

```bash
npm ci
docker compose up -d
docker compose wait mongo-init
cp .env.example .env
npm run build
npm start
# Open http://localhost:3000
```

On PowerShell use `Copy-Item .env.example .env`. The Docker database binds only to localhost and has no authentication: use it only for local learning. For Atlas or another database, supply an authorized test URI in `.env`; keep credentials out of Git.

Register a test account using a password of 12 to 128 characters. Add a task, move it to Doing, save a reference, and add an expense. Restart the API and verify that data persists. Use a second account to verify isolation.

## Develop with Vite

Change `.env` to `APP_ORIGIN=http://localhost:5173` and `NODE_ENV=development`. In one terminal run `npm run server`; in another run `npm run dev`. Open `http://localhost:5173` consistently. Vite proxies `/api` to the API server. Mixing `127.0.0.1` and `localhost` produces a different Origin and is intentionally rejected for writes.

## Verify

```bash
npm test
npm run build
```

The API suites start real disposable MongoDB processes (a replica set for product transactions) with mongodb-memory-server, creates a unique test database, and drops it afterward. Its first run downloads a MongoDB binary. Alternatively, set `TEST_MONGODB_URI` to a disposable local/test MongoDB deployment; never point this setting at production. The suite checks concurrent version updates and duplicate registration against real MongoDB indexes, plus route validation, session revocation, money parsing, and two-user isolation.

The browser smoke script uses Playwright. Install it separately with `npm install --no-save playwright` or set `PLAYWRIGHT_MODULE` to the absolute path of an installed Playwright module, then run `npm run test:browser`. It serves the built client against a disposable MongoDB and tests registration, all three app flows, keyboard access, and mobile overflow. Keep the lockfile unchanged if installing a temporary browser-test dependency.

## API contract

All write requests require the configured exact Origin. POST and PATCH require JSON. Responses use JSON; errors expose a safe code and message. The three base-domain lists return at most the newest 50 records. Product lists add bounded cursor continuation; see the [product contracts](PRODUCT_LAB.md#http-contracts). Expense summary includes all owned records and uses INR only.

| Method and path | Input | Result |
| --- | --- | --- |
| POST /api/auth/register | email, password | 201 public user plus session cookie |
| POST /api/auth/login | email, password | Public user plus new session cookie |
| POST /api/auth/logout | empty JSON object | 204 and server session revocation |
| GET /api/auth/me | session cookie | Public user |
| GET /api/tasks | session cookie | Newest 50 owned tasks |
| POST /api/tasks | title | Task with status todo and version 0 |
| PATCH /api/tasks/:id | title, status, version | Updated task or 409 owned conflict |
| DELETE /api/tasks/:id | session cookie | 204 or safe 404 |
| GET or POST /api/bookmarks | POST: title, url | Owned list or new unique URL |
| DELETE /api/bookmarks/:id | session cookie | 204 or safe 404 |
| GET or POST /api/expenses | POST: title, category, cents, date | Owned list or validated expense |
| DELETE /api/expenses/:id | session cookie | 204 or safe 404 |
| GET /api/expenses-summary | session cookie | totalCents, count, currency |

Allowed task statuses: todo, doing, done. Categories: food, travel, learning, other. A date is a real ISO calendar date from year 1900 onward. Expense cents are positive safe integers up to 100000000. Titles are trimmed, nonempty, and at most 160 characters. Unknown fields are rejected.

## Architecture and limitations

`src/main.jsx` owns the UI; `server/validation.js` defines boundary contracts; `server/app.js` defines HTTP, sessions, and authorization; `server/store.js` owns MongoDB operations and indexes. Data queries include the authenticated owner. The task update predicate includes id, owner, and expected version in one database write.

This is an educational reference. It has no email verification, password reset, MFA, distributed rate limiter or scheduled backup automation. The product lab adds workspace roles, persistent audit and a documented recovery drill. Authentication limits are per-process. The server uses same-origin browser deployment and strict Origin checks for cookie-authenticated writes; cross-origin deployment requires a revised CSRF and cookie policy. Secure cookies activate for HTTPS origins, so terminate HTTPS correctly before public use. Server-side session expiration is checked directly; TTL deletion is only cleanup.

There is no optimistic UI claim: mutations wait for the server, preserve form drafts on failure, and refresh after conflicts. Status movement uses accessible selects instead of mouse-only drag and drop. Base-domain lists are bounded; product lists have cursor continuation. Neither supplies advanced large-data browsing or performance guarantees. These deliberate limits give clear extension tasks.

## Portfolio extensions

Implement cursor pagination with a tie-breaker, editable task titles, category reports, or a searchable reading list. Add tests before claiming the new behavior. For a larger security extension, design reset-token expiry and revocation without leaking account existence. Explain which requirement justifies each feature.
