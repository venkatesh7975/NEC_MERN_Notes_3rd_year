# Development setup

The syllabus does not require exact tool versions. Use a maintained Node release compatible with the project's tooling; the teaching baseline is Node 24, React 19 and Express 4 for the preserved Express examples. Confirm the runtime with `node --version` and `npm --version`. Do not mix Express 4 and 5 examples without checking route/error-handling differences.

## Common tools

A browser with developer tools, an editor, Git, Node/npm. Install MongoDB/mongosh and MySQL only when reaching databases. Docker is required for the container exercises. Use official installation instructions in [references](../resources/teaching-references.md).

Clone the repository into a directory you control. Keep student submissions in your own fork. Never replace the shared examples with personal work.

## HTML, CSS and browser JavaScript

Open an example's index.html directly for static examples. For fetch/module examples, serve the folder over local HTTP using an editor's local server. Inspect console errors and the Network panel. A browser script that uses document or localStorage is not a Node CLI.

## Dependency-free Node examples

From the repository root:

```bash
node dailycodes/javascript/001-basic/app.js
node dailycodes/javascript/002-intermediate/app.js
node dailycodes/node/003-advanced/index.js
```

The basic Node HTTP example listens on 5050 and exits after two seconds by design. The file example writes and removes a temporary file in its own folder; do not place valuable content at that fixture filename.

## React host

The existing JSX files are components, not independent apps. In your student workspace create a React host:

```bash
npm create vite@latest classroom-react -- --template react
cd classroom-react
npm install
npm run dev
```

This initialization uses the current scaffold and requires network access. Record installed versions and commit the lockfile. Copy one example component into src/, import it in App.jsx and render it. For a custom hook, create a component calling it and bind query/results/loading to visible controls. On later checkouts use npm ci. Run npm run build before submitting. The optimistic quiz uses React 19 features and simulated delay, not a live backend.

## Express examples

```bash
cd dailycodes/express
npm install
node 001-basic/app.js
```

Basic, intermediate and advanced use ports 5051, 5052 and 5053. Stop with Ctrl+C. The advanced role-header example is explicitly an insecure simulation for middleware ordering, never a real access control implementation.

## SQL

Create a disposable database called nec_practice. In the MySQL client, select that database and use source with the file path to run schema.sql, seed.sql and queries.sql in the documented order. The advanced transaction example has a standalone setup script. Keep sandbox and institutional credentials separate.

## MongoDB and Mongoose

MongoDB core examples use mongosh in a disposable database. The preserved dailycodes/mongodb files are Mongoose fragments requiring a package, database connection and caller-supplied models. They are not complete command-line apps. Mongoose validation-only examples can run without a live database; persistence tests cannot.

## Configuration and troubleshooting

Use .env.example with placeholders; keep .env untracked. Never place server secrets in frontend build variables. A failed module import means a missing dependency or mismatched module system; a refused connection means the service/port needs checking. If a port is busy, stop your earlier process or document another port. Record exact commands and observed output in evidence.md.
