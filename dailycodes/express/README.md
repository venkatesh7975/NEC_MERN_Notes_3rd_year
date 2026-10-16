# Express classroom examples

- [Basic](001-basic/app.js): GET course listing and validated POST creation.
- [Intermediate](002-intermediate/app.js): router mounting, request logging and fixture search response; it does not query a live database.
- [Advanced](003-advanced/app.js): centralized error handling and an explicitly insecure role-header simulation. This is not JWT authentication.

Run npm ci in this directory, then node 001-basic/app.js (port 5051), node 002-intermediate/app.js (5052), or node 003-advanced/app.js (5053). Stop with Ctrl+C. The committed lockfile keeps dependency installation reproducible.

[Curriculum track](../../07-express-rest/express/README.md). Never use a caller-supplied role header for production authorization.
