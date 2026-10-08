# MERN learning and interview preparation

Learn HTML, CSS, JavaScript, React, Node, Express, and MongoDB through structured notes, explained questions, debugging scenarios, timed builds, and runnable projects. The interview track prioritizes product companies and startups while preserving the original NEC third-year curriculum.

[Start the handbook](interview-handbook/README.md) · [Learning roadmap](interview-handbook/roadmaps/README.md) · [Runnable projects](projects/interview-ready/README.md) · [Downloads](interview-handbook/downloads/README.md) · [Classroom curriculum](CLASSROOM_GUIDE.md)

![MERN learning mind map](interview-handbook/mindmaps/mern-overview.svg)

## Find what you need

| Goal | Resource |
| --- | --- |
| Learn fundamentals | [Web and HTML](interview-handbook/notes/01-web-html.md), [CSS](interview-handbook/notes/02-css.md), [JavaScript](interview-handbook/notes/03-javascript.md) |
| Understand MERN | [React](interview-handbook/notes/04-react.md), [Node and Express](interview-handbook/notes/05-node-express.md), [MongoDB](interview-handbook/notes/06-mongodb.md) |
| Build reliable apps | [Security](interview-handbook/notes/07-security.md), [testing](interview-handbook/notes/08-testing.md), [design](interview-handbook/notes/09-design.md), [TypeScript](interview-handbook/notes/10-typescript.md) |
| Technical interviews | [100 answered questions](interview-handbook/questions/index.md): 30 Easy, 40 Medium, 30 Hard |
| Debugging interviews | [24 scenario questions with diagnosis and verification](interview-handbook/scenarios/README.md) |
| Machine coding | [16 timed exercises](interview-handbook/machine-coding/README.md), [rubric](interview-handbook/machine-coding/rubric.md), [source implementations](projects/interview-ready/README.md) |
| Company preparation | [Company and startup playbooks](interview-handbook/companies/README.md), [project defense](interview-handbook/companies/project-defense.md) |
| Coding patterns | [DSA patterns](interview-handbook/dsa/README.md), [tested JavaScript utilities](projects/interview-ready/js-toolkit/README.md) |
| Visual revision | [Six SVG and editable Mermaid mind maps](interview-handbook/mindmaps/README.md) |
| Offline study | [PDF handbook, Word plan, Excel and CSV trackers](interview-handbook/downloads/README.md) |
| Online progress | [Native Google Sheets tracker](https://docs.google.com/spreadsheets/d/1qv2QV0GggbD07a_JYlhir__9PxiIjKEQEbz103HR0H0/edit) |
| External courses | [28 curated resources](interview-handbook/resources/README.md) with level, access, and suggested use |

Company playbooks link official guidance and label original practice recommendations. They do not predict questions or guarantee selection. External resources retain their own licenses and include free documentation plus clearly labeled optional paid practice.

## Runnable source projects

| Application | Setup and source | Learning focus |
| --- | --- | --- |
| MERN task board | [MERN workspace](projects/interview-ready/mern-workspace/README.md) | Sessions, ownership, status workflow, atomic version conflicts |
| MERN reading list | [MERN workspace](projects/interview-ready/mern-workspace/README.md) | URL validation, per-user uniqueness, persistent CRUD |
| MERN expense tracker | [MERN workspace](projects/interview-ready/mern-workspace/README.md) | Exact amounts, valid dates, account aggregates |
| Accessible UI lab | [HTML CSS JS source](projects/interview-ready/ui-lab/README.md) | Accordion, modal, filters, undo, keyboard focus |
| JavaScript toolkit | [Source and tests](projects/interview-ready/js-toolkit/README.md) | Debounce, LRU, emitter, promise pool, algorithms |

The three MERN apps share one runnable package and authentication foundation, with distinct domain behavior. Setup, tests, and limitations are documented. The original [150 mini-project briefs](PROJECT_INDEX.md) remain practice specifications rather than a claim of 150 finished apps.

## Study in the browser

```bash
git clone https://github.com/venkatesh7975/NEC_MERN_Notes_3rd_year.git
cd NEC_MERN_Notes_3rd_year
python -m http.server 8000
```

Open `http://localhost:8000/interview-handbook/study.html` for search, answer reveals, difficulty and topic filters, local recall scores, and CSV export. Open `http://localhost:8000/` for the original classroom portal. Serving over HTTP allows JSON data to load consistently.

For MERN apps, follow the [workspace setup](projects/interview-ready/mern-workspace/README.md). It requires Node 22.12 or newer and MongoDB. The explorer and UI lab need no npm installation.

## Learning paths

New to development: use the [12-week route](interview-handbook/roadmaps/README.md) and [120-hour course](CURRICULUM.md). Already building apps: use the 30-day route and begin with a diagnostic. Interview next week: use the seven-day route and review weaknesses shown by mocks.

Read, explain without notes, implement, test a boundary, and defend a tradeoff. Record evidence and extend source projects yourself before claiming portfolio ownership.

## Quality checks

```bash
npm test
npm run check:handbook
cd projects/interview-ready/mern-workspace
npm ci
npm test
npm run build
```

API checks use real disposable MongoDB. Browser checks cover workflows, focus, mobile overflow, and study progress. [Verification evidence](interview-handbook/VERIFICATION.md) records what actually ran. [Maintenance](interview-handbook/MAINTENANCE.md) explains regeneration.

## Original classroom materials

[Classroom guide](CLASSROOM_GUIDE.md) · [Curriculum](CURRICULUM.md) · [Notes](notes) · [Daily practice](daily-practice) · [Assignments](TASK_INDEX.md) · [Project briefs](PROJECT_INDEX.md) · [Example execution status](resources/example-status.md)

Contributions should add correct explanations, clear acceptance criteria, runnable source when promised, and meaningful checks. See [contributing](CONTRIBUTING.md). Repository content uses the [MIT license](LICENSE); linked resources keep their own licenses.
