# Migration and compatibility map

No existing lesson or source path is deleted. The new entry point adds a canonical navigation layer and preserves the prior teaching and interview views.

| Existing path | Current canonical route | Treatment |
| --- | --- | --- |
| CURRICULUM.md, numbered modules | [Classroom guide](../CLASSROOM_GUIDE.md) | Optional institutional route; retain official transcription and hour evidence |
| notes/html.md, 02-html/notes.md | [HTML](topics/html.md) | Preserve examples and add priority/navigation metadata |
| notes/css.md, 03-css/notes.md | [CSS](topics/css.md) | Preserve; link current cascade and layout reasoning |
| notes/javascript.md, 04-javascript/notes.md | [JavaScript](topics/javascript.md), [async](topics/async.md), [browser](topics/browser.md) | Split canonical concepts by mental model while keeping old guide |
| notes/react.md, 05-react/notes.md | [React](topics/react.md), [state choices](topics/state-management.md) | Preserve; distinguish effects, local facts, and remote cache |
| notes/node.md, 06-nodejs/notes.md | [Node](topics/nodejs.md) | Preserve; document host and resource limits |
| notes/express.md, 07-express-rest | [Express](topics/express.md), [API](topics/api.md) | Preserve; identify Express-version behavior |
| notes/mongodb.md | [MongoDB](topics/mongodb.md), [Mongoose](topics/mongoose.md) | Separate database invariants from modeling-library behavior |
| notes/mysql.md | [SQL](topics/sql.md) | Preserve engine-specific examples; correct simplistic database comparisons |
| notes/authentication.md | [Security](topics/security.md) | Preserve; prioritize current trust boundaries and safe source guidance |
| notes/git.md, notes/docker.md, notes/deployment.md | [Git](topics/git.md), [DevOps](topics/devops.md), [Cloud](topics/cloud.md) | Preserve; mark deployment execution limits |
| dailycodes | [Implemented source](../projects/interview-ready/README.md) and guide links | Retain original provenance and duplicate compatibility paths |
| PROJECT_INDEX.md, mini-projects | [Project ladder](projects/README.md) | Retain brief status; select by requirements rather than mandatory count |
| interview-questions, interview-preparation | [Interview route](paths/interview-preparation.md) and [handbook](../interview-handbook/README.md) | Keep URLs; point to current answered practice |
| cheatsheets | [Current quick references](cheatsheets/README.md) | Preserve older sheets; add missing technology references |
| root index.html | [Knowledge explorer](explorer.html) plus classroom portal | Preserve portal while making the global route discoverable |

Metadata on older guides is an adapter, not a claim that all historical code has been updated or executed. See [legacy inventory](data/legacy-inventory.json), [earlier example status](../resources/example-status.md), and [coverage](COVERAGE.md).
