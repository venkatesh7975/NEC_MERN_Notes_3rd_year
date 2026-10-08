# 🎓 NEC 3rd Year Full Stack Web Development (MERN Stack)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Curriculum Pass](https://img.shields.io/badge/Curriculum-100%25%20Validated-brightgreen.svg)](scripts/validate-curriculum.cjs)

A syllabus-aligned, production-ready educational repository for Full Stack Web Development (MERN Stack). Designed for classroom teaching, independent study, practical assignments, subtopic project briefs, and technical interview preparation.

> **📊 Curriculum Overview**: 10 Official Modules · 120 Contact Hours · 15 Technology Tracks · 755 Markdown Notes Files · 150 Subtopic Mini-Projects · 45 Daily Practice Days · Interactive Web Portal.

---

## 🌐 Interactive Web Application Portal

Launch the built-in **MERN Stack Learning Portal** static website directly in your browser or run it locally:

```bash
# Open index.html directly or serve locally via Python
python -m http.server 8000
# Access: http://localhost:8000
```
- **Features**: Global live search across 755+ files, dark/light glassmorphic theme toggle, overall task completion stats, module breakdowns, and pop-up modal notes readers.

---

## 📁 Technology-First Folder Architecture

The repository is strictly organized into **One Folder per Technology** with dedicated **Subfolders for each Subtopic/Project/Lab**:

```
NEC_MERN_Notes_3rd_year/
├── index.html                        # Interactive Web Application Portal
├── CURRICULUM.md                     # Official Syllabus & Learning Objectives
├── ROADMAP.md                        # Recommended Student Learning Pathway
├── PROJECT_INDEX.md                  # Master Index of 150 Subtopic Mini-Projects
├── TASK_INDEX.md                     # Master Index of Task Assignments
│
├── 01-foundations/                   # Tech 01: Web Foundations & HTTP (6 Hours)
├── 02-html/                          # Tech 02: HTML5 Essentials & Semantics (10 Hours)
├── 03-css/                           # Tech 03: CSS3, Flexbox, Grid & Responsive (14 Hours)
├── 04-javascript/                    # Tech 04: JavaScript ES6+, DOM & Async (26 Hours)
├── 05-react/                         # Tech 05: React 19 Frontend Framework (21 Hours)
├── 06-nodejs/                        # Tech 06: Node.js Backend Runtime (12 Hours)
├── 07-express-rest/                  # Tech 07: Express.js & REST API Architecture (10 Hours)
├── 08-databases/                     # Tech 08: Databases — SQL + MongoDB (8 Hours)
├── 09-devops/                        # Tech 09: DevOps, Docker & Cloud Deploy (8 Hours)
├── 10-security/                      # Tech 10: Web Security & OWASP Standards (5 Hours)
├── 11-supplementary/                 # Tech 11: Mongoose, Auth & Fullstack Integration
│
├── notes/                            # Technology Notes Guides
│   ├── html.md                       # HTML5 Notes
│   ├── css.md                        # CSS3 Notes
│   ├── javascript.md                 # JavaScript ES6+ Notes
│   ├── react.md                      # React 19 Notes
│   ├── node.md                       # Node.js Notes
│   ├── express.md                    # Express.js Notes
│   ├── mongodb.md                    # MongoDB & Mongoose Notes
│   ├── mysql.md                      # MySQL & Relational Notes
│   ├── git.md                        # Git Version Control Notes
│   ├── rest-api.md                   # REST API Principles Notes
│   ├── authentication.md             # Security & JWT Notes
│   ├── deployment.md                 # Cloud Deployment Notes
│   └── docker.md                     # Docker Container Notes
│
├── mini-projects/                    # Technology -> Subtopic Projects (150 Briefs)
│   ├── html/                         # 10 Subtopic Projects (Semantic tags, forms, tables...)
│   ├── css/                          # 10 Subtopic Projects (Flexbox, Grid, Responsive...)
│   ├── javascript/                   # 10 Subtopic Projects (DOM, Async, Calculators...)
│   ├── react/                        # 10 Subtopic Projects (Hooks, Router, State...)
│   ├── nodejs/                       # 10 Subtopic Projects (FS, HTTP, CLI...)
│   ├── express/                      # 10 Subtopic Projects (Routing, Middleware...)
│   ├── rest-api/                     # 10 Subtopic Projects (REST CRUD, Endpoints...)
│   ├── sql/                          # 10 Subtopic Projects (Queries, Joins, Keys...)
│   ├── mongodb/                      # 10 Subtopic Projects (Schemas, Aggregations...)
│   ├── devops/                       # 10 Subtopic Projects (Docker, CI/CD...)
│   ├── security/                     # 10 Subtopic Projects (XSS, SQLi, Auth...)
│   ├── mongoose/                     # 10 Subtopic Projects (Validations, Models...)
│   ├── authentication/               # 10 Subtopic Projects (JWT, Bcrypt...)
│   └── fullstack/                    # 10 Subtopic Projects (MERN Integration...)
│
├── daily-practice/                   # Technology -> Daily Subtopic Labs (45 Days)
│   ├── html/                         # day-01, day-02, day-03
│   ├── css/                          # day-01, day-02, day-03
│   ├── javascript/                   # day-01, day-02, day-03
│   └── ...                           # Technology-wise day subfolders
│
├── tasks/                            # Course Assignment Suites & Submissions
├── interview-preparation/            # Technology Technical Q&A Guides
├── cheatsheets/                      # One-Page Command & Syntax Reference
└── dailycodes/                       # Classroom Application Solutions
```

---

## 📚 Official Course Modules (120 Contact Hours)

| Module | Module Title | Contact Hours | Primary Tech Stack | Documentation Link |
| :---: | :--- | :---: | :---: | :---: |
| **01** | [Foundations of Web Development](01-foundations/README.md) | 6 Hours | HTTP, Git, Web | [`notes/git.md`](notes/git.md) |
| **02** | [HTML Essentials & Semantics](02-html/README.md) | 10 Hours | HTML5, A11y, Forms | [`notes/html.md`](notes/html.md) |
| **03** | [CSS Styling & Responsive Layouts](03-css/README.md) | 14 Hours | Flexbox, Grid, CSS3 | [`notes/css.md`](notes/css.md) |
| **04** | [JavaScript Core & Async Programming](04-javascript/README.md) | 26 Hours | ES6+, DOM, Async | [`notes/javascript.md`](notes/javascript.md) |
| **05** | [React 19 Frontend Development](05-react/README.md) | 21 Hours | React 19, Hooks | [`notes/react.md`](notes/react.md) |
| **06** | [Node.js Backend Runtime](06-nodejs/README.md) | 12 Hours | Node v24, Event Loop | [`notes/node.md`](notes/node.md) |
| **07** | [Express.js & REST API Architecture](07-express-rest/README.md) | 10 Hours | Express 4.x, REST | [`notes/express.md`](notes/express.md) |
| **08** | [Databases (SQL + MongoDB)](08-databases/README.md) | 8 Hours | MySQL, MongoDB | [`notes/mongodb.md`](notes/mongodb.md) |
| **09** | [DevOps, Docker & Cloud Deployment](09-devops/README.md) | 8 Hours | Docker, Vercel, Render | [`notes/deployment.md`](notes/deployment.md) |
| **10** | [Web Security & OWASP Best Practices](10-security/README.md) | 5 Hours | JWT, Bcrypt, OWASP | [`notes/authentication.md`](notes/authentication.md) |

---

## 🗺️ Technology Tracks Navigation Matrix

Each technology track connects its primary notes, daily practice days, assignment, subtopic mini-projects, and interview questions:

| Technology | Notes Guide | Daily Practice | Course Assignment | Subtopic Projects | Interview Q&A |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Web Foundations** | [`notes/git.md`](notes/git.md) | [`daily-practice/foundations`](daily-practice/foundations) | [`tasks/course-foundations`](tasks/course-foundations) | [`mini-projects/foundations`](mini-projects/foundations) | [`interview-preparation/foundations.md`](interview-preparation/foundations.md) |
| **HTML5** | [`notes/html.md`](notes/html.md) | [`daily-practice/html`](daily-practice/html) | [`tasks/course-html`](tasks/course-html) | [`mini-projects/html`](mini-projects/html) | [`interview-preparation/html.md`](interview-preparation/html.md) |
| **CSS3** | [`notes/css.md`](notes/css.md) | [`daily-practice/css`](daily-practice/css) | [`tasks/course-css`](tasks/course-css) | [`mini-projects/css`](mini-projects/css) | [`interview-preparation/css.md`](interview-preparation/css.md) |
| **JavaScript** | [`notes/javascript.md`](notes/javascript.md) | [`daily-practice/javascript`](daily-practice/javascript) | [`tasks/course-javascript`](tasks/course-javascript) | [`mini-projects/javascript`](mini-projects/javascript) | [`interview-preparation/javascript.md`](interview-preparation/javascript.md) |
| **React 19** | [`notes/react.md`](notes/react.md) | [`daily-practice/react`](daily-practice/react) | [`tasks/course-react`](tasks/course-react) | [`mini-projects/react`](mini-projects/react) | [`interview-preparation/react.md`](interview-preparation/react.md) |
| **Node.js** | [`notes/node.md`](notes/node.md) | [`daily-practice/nodejs`](daily-practice/nodejs) | [`tasks/course-nodejs`](tasks/course-nodejs) | [`mini-projects/nodejs`](mini-projects/nodejs) | [`interview-preparation/nodejs.md`](interview-preparation/nodejs.md) |
| **Express.js** | [`notes/express.md`](notes/express.md) | [`daily-practice/express`](daily-practice/express) | [`tasks/course-express`](tasks/course-express) | [`mini-projects/express`](mini-projects/express) | [`interview-preparation/express.md`](interview-preparation/express.md) |
| **REST API** | [`notes/rest-api.md`](notes/rest-api.md) | [`daily-practice/rest-api`](daily-practice/rest-api) | [`tasks/course-rest-api`](tasks/course-rest-api) | [`mini-projects/rest-api`](mini-projects/rest-api) | [`interview-preparation/rest-api.md`](interview-preparation/rest-api.md) |
| **SQL** | [`notes/mysql.md`](notes/mysql.md) | [`daily-practice/sql`](daily-practice/sql) | [`tasks/course-sql`](tasks/course-sql) | [`mini-projects/sql`](mini-projects/sql) | [`interview-preparation/sql.md`](interview-preparation/sql.md) |
| **MongoDB** | [`notes/mongodb.md`](notes/mongodb.md) | [`daily-practice/mongodb`](daily-practice/mongodb) | [`tasks/course-mongodb`](tasks/course-mongodb) | [`mini-projects/mongodb`](mini-projects/mongodb) | [`interview-preparation/mongodb.md`](interview-preparation/mongodb.md) |
| **DevOps** | [`notes/deployment.md`](notes/deployment.md) | [`daily-practice/devops`](daily-practice/devops) | [`tasks/course-devops`](tasks/course-devops) | [`mini-projects/devops`](mini-projects/devops) | [`interview-preparation/devops.md`](interview-preparation/devops.md) |
| **Web Security** | [`notes/authentication.md`](notes/authentication.md) | [`daily-practice/security`](daily-practice/security) | [`tasks/course-security`](tasks/course-security) | [`mini-projects/security`](mini-projects/security) | [`interview-preparation/security.md`](interview-preparation/security.md) |

---

## 🛠️ Verification & Test Suite

The repository includes an automated curriculum validator script ensuring all links, 150 project briefs, and 45 practice days remain intact:

```bash
# Run curriculum integrity validation and unit tests
npm test
```

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
