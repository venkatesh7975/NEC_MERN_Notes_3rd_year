# Course Overview

NEC third-year Full Stack Web Development: **120 official contact hours across 10 modules**. This curriculum follows the [visually checked syllabus transcription](resources/syllabus-transcription.md). The PDF gives modules, topic names, visible subtopics and hours; outcomes, exercises, assessment rubrics and sequencing below are teaching design. It does not prescribe named units, exam weights or project counts.

# Prerequisites

Basic computer use, file management and willingness to practice programming. Review [prerequisites](00-course-overview/prerequisites.md) and [development setup](00-course-overview/development-setup.md). Functions, arrays, DOM and promises are explicit teaching bridges; they are not silently added to the printed topic list.

# Learning Outcomes

By completing core learning gates, students can structure and style accessible pages; explain and implement JavaScript control flow; build stateful React components; organize asynchronous Node programs; implement Express resource routes; compare SQL and document models; demonstrate CRUD and joins; reproduce builds and releases; and recognize injection, XSS and CSRF with appropriate defenses.

# Technology Stack

HTML, CSS, JavaScript, React, Node.js, Express, SQL (MySQL examples), MongoDB, Git, GitHub and Docker. Framework version numbers are teaching environment choices, not syllabus requirements. Mongoose and authentication flows are supplementary.

# Official module map

| Module | Hours | Learning path |
| --- | --- | --- |
| 1. Foundations of Web Development | 6 | [Open](01-foundations/README.md) |
| 2. HTML | 10 | [Open](02-html/README.md) |
| 3. CSS | 14 | [Open](03-css/README.md) |
| 4. JavaScript | 26 | [Open](04-javascript/README.md) |
| 5. React | 21 | [Open](05-react/README.md) |
| 6. Node.js | 12 | [Open](06-nodejs/README.md) |
| 7. Express.js & REST API | 10 | [Open](07-express-rest/README.md) |
| 8. Databases (SQL + MongoDB) | 8 | [Open](08-databases/README.md) |
| 9. DevOps & Deployment | 8 | [Open](09-devops/README.md) |
| 10. Web Security & Best Practices | 5 | [Open](10-security/README.md) |
| Total | 120 | |

# Module 1: Foundations of Web Development

## Topic: Web Basics

- **Concepts covered:** Web evolution; Static vs Dynamic; Roles in Web.
- **Prerequisites:** No programming prerequisites.
- **Learning objectives:** Explain and demonstrate url, request, response, frontend, backend.
- **Theory:** A static resource is served as stored; a dynamic response depends on application state or input. A static frontend may call a dynamic API. The browser renders and collects interaction, the server applies rules, and the database persists records.
- **Practical skills:** Record five local page requests with method, path, status and content type; distinguish a cached response from a fresh one.
- **Daily practice:** [Web foundations](daily-practice/foundations/README.md).
- **Assignment:** [course-foundations](tasks/course-foundations/README.md).
- **Mini projects:** [Web foundations bank](mini-projects/foundations/README.md).
- **Interview preparation:** [Web foundations](interview-preparation/foundations.md).
- **Expected outcome:** Reload index.html; record document and stylesheet requests. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [Web foundations teaching notes](01-foundations/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 6 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 2: HTML

## Topic: HTML Essentials

- **Concepts covered:** Semantic tags; Text; Links; Lists; Tables; Forms.
- **Prerequisites:** Web foundations.
- **Learning objectives:** Explain and demonstrate semantics, text, links, lists, tables, forms.
- **Theory:** HTML expresses meaning and structure. Use headings for hierarchy, lists for groups, tables for related rows and columns, and forms for inputs. A label's for attribute refers to a control's id; name identifies submitted data. Native form validation helps users but server validation remains necessary.
- **Practical skills:** Use header, main and footer; include email and telephone links; give the page one descriptive h1.
- **Daily practice:** [HTML](daily-practice/html/README.md).
- **Assignment:** [course-html](tasks/course-html/README.md).
- **Mini projects:** [HTML bank](mini-projects/html/README.md).
- **Interview preparation:** [HTML](interview-preparation/html.md).
- **Expected outcome:** A keyboard user can activate both contact links. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [HTML teaching notes](02-html/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 10 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 3: CSS

## Topic: Styling Essentials

- **Concepts covered:** Selectors; Box-Model; Flexbox; Grid; Responsive.
- **Prerequisites:** HTML.
- **Learning objectives:** Explain and demonstrate selectors, box model, flexbox, grid, responsive layout.
- **Theory:** CSS controls presentation through the cascade and layout. Specificity compares tuples rather than decimal scores; origin, importance and layers also participate. Border-box includes padding and borders in width, but not margin. Flexbox lays out one dimension; Grid coordinates rows and columns. Use content needs to choose breakpoints.
- **Practical skills:** Style one notice with consistent padding and border-box; compare its measured width to content-box.
- **Daily practice:** [CSS](daily-practice/css/README.md).
- **Assignment:** [course-css](tasks/course-css/README.md).
- **Mini projects:** [CSS bank](mini-projects/css/README.md).
- **Interview preparation:** [CSS](interview-preparation/css.md).
- **Expected outcome:** A 240px border-box card stays 240px wide including padding. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [CSS teaching notes](03-css/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 14 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 4: JavaScript

## Topic: JavaScript Fundamentals

- **Concepts covered:** Data types; Operators; Conditions; Loops.
- **Prerequisites:** HTML and CSS.
- **Learning objectives:** Explain and demonstrate data types, operators, conditions, loops.
- **Theory:** Values have types; strict equality avoids implicit conversion during comparisons. Conditions select a path; loops repeat with explicit stopping rules. Convert input deliberately and reject invalid numbers. Functions, arrays and DOM events are teaching bridges needed before React, beyond the visible syllabus cell.
- **Practical skills:** Validate present and total counts; compute percentage; use a 75 percent practice threshold.
- **Daily practice:** [JavaScript](daily-practice/javascript/README.md).
- **Assignment:** [course-javascript](tasks/course-javascript/README.md).
- **Mini projects:** [JavaScript bank](mini-projects/javascript/README.md).
- **Interview preparation:** [JavaScript](interview-preparation/javascript.md).
- **Expected outcome:** 15 of 20 yields 75 percent and eligible; total 0 is rejected. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [JavaScript teaching notes](04-javascript/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 26 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 5: React

## Topic: React Development

- **Concepts covered:** JSX; Components; Props; State; Events.
- **Prerequisites:** JavaScript functions, arrays and events.
- **Learning objectives:** Explain and demonstrate jsx, components, props, state, events.
- **Theory:** A component describes an interface using JSX. Props arrive from its parent; state holds local memory. Event handlers request state changes. Render computes the interface and commit updates the DOM. Derive values such as filtered lists from source state rather than maintaining duplicate state. Effects synchronize external systems when needed; they are not required for every calculation.
- **Practical skills:** Render three components with title and level props; use stable IDs.
- **Daily practice:** [React](daily-practice/react/README.md).
- **Assignment:** [course-react](tasks/course-react/README.md).
- **Mini projects:** [React bank](mini-projects/react/README.md).
- **Interview preparation:** [React](interview-preparation/react.md).
- **Expected outcome:** Three input records produce three badges. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [React teaching notes](05-react/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 21 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 6: Node.js

## Topic: Backend with Node.js

- **Concepts covered:** Module system; NPM; Async programming; Event.
- **Prerequisites:** JavaScript functions and promises.
- **Learning objectives:** Explain and demonstrate module system, npm, asynchronous programming, events.
- **Theory:** Node executes JavaScript outside the browser. CommonJS and ES modules have different loading conventions. NPM manages packages and scripts. Await suspends its async function while other work can continue. Synchronous CPU-heavy work can still block the event loop. The printed syllabus ends at Event; event emitters are an explicit teaching interpretation.
- **Practical skills:** Export a pure calculation; validate arguments; import from CLI.
- **Daily practice:** [Node.js](daily-practice/nodejs/README.md).
- **Assignment:** [course-nodejs](tasks/course-nodejs/README.md).
- **Mini projects:** [Node.js bank](mini-projects/nodejs/README.md).
- **Interview preparation:** [Node.js](interview-preparation/nodejs.md).
- **Expected outcome:** 2 hours at 50 yields 100. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [Node.js teaching notes](06-nodejs/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 12 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 7: Express.js & REST API

## Topic: Server-side App

- **Concepts covered:** Routing; Middleware; Static files; REST principles.
- **Prerequisites:** Node and HTTP; Express routes.
- **Learning objectives:** Explain and demonstrate routing, middleware, static files, errors; Explain and demonstrate resources, methods, status codes, statelessness.
- **Theory:** Routes match method and path. Ordered middleware can modify context, respond or call next. Parse the body before handlers that need it. Four-argument error middleware follows routes. Validation and authorization are separate checks; trusting an arbitrary role header demonstrates routing, not authentication. Resources have representations and identifiers. GET reads, POST commonly creates, PUT replaces and PATCH applies a documented modification. Idempotence concerns intended state effects, not identical response bytes. Stateless requests carry sufficient context; resources can still persist. Specify failure responses and pagination bounds.
- **Practical skills:** Return three fixture courses; add a health route; Implement collection and item reads; document representations.
- **Daily practice:** [Express.js](daily-practice/express/README.md), [REST APIs](daily-practice/rest-api/README.md).
- **Assignment:** [course-express](tasks/course-express/README.md), [course-rest-api](tasks/course-rest-api/README.md).
- **Mini projects:** [Express.js bank](mini-projects/express/README.md), [REST APIs bank](mini-projects/rest-api/README.md).
- **Interview preparation:** [Express.js](interview-preparation/express.md), [REST APIs](interview-preparation/rest-api.md).
- **Expected outcome:** GET /courses returns 200 with three records; Missing item returns 404. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [Express.js teaching notes](07-express-rest/express/notes.md), [REST APIs teaching notes](07-express-rest/rest-api/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 10 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 8: Databases (SQL + MongoDB)

## Topic: Data Handling

- **Concepts covered:** SQL vs NoSQL; SQL CRUD + Joins; MongoDB.
- **Prerequisites:** Records and basic data types; Data records and SQL comparison.
- **Learning objectives:** Explain and demonstrate sql versus nosql, crud, keys, joins; Explain and demonstrate documents, collections, crud, modeling.
- **Theory:** A primary key identifies a row; a foreign key constrains a relationship. An inner join retains matches; a left join also keeps unmatched left records. COUNT(column) ignores NULL values, unlike COUNT(*). Parameter binding separates data values from SQL syntax. MySQL is the repository implementation; the syllabus says SQL generally. MongoDB stores BSON documents in collections. Flexible shape still requires a data contract. Use precise filters, projections and targeted updates. Embed bounded data with a shared lifecycle; reference independent or growing data. Mongoose is an optional separate modeling layer, not MongoDB itself.
- **Practical skills:** Define primary key; seed three fictional students; query by ID; Insert three course documents; find by code.
- **Daily practice:** [SQL](daily-practice/sql/README.md), [MongoDB](daily-practice/mongodb/README.md).
- **Assignment:** [course-sql](tasks/course-sql/README.md), [course-mongodb](tasks/course-mongodb/README.md).
- **Mini projects:** [SQL bank](mini-projects/sql/README.md), [MongoDB bank](mini-projects/mongodb/README.md).
- **Interview preparation:** [SQL](interview-preparation/sql.md), [MongoDB](interview-preparation/mongodb.md).
- **Expected outcome:** Three seeded rows appear in ID order; HTML code matches one document. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [SQL teaching notes](08-databases/sql/notes.md), [MongoDB teaching notes](08-databases/mongodb/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 8 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 9: DevOps & Deployment

## Topic: Application Deployment

- **Concepts covered:** Git; GitHub; CI/CD basics; Docker; Deploying React.
- **Prerequisites:** A working local application.
- **Learning objectives:** Explain and demonstrate git, github, ci/cd, docker, react deployment.
- **Theory:** Git tracks snapshots; GitHub hosts collaboration. CI checks a change; deployment releases a selected artifact. Docker packages a process and dependencies, while persistent data needs explicit storage. Browser configuration is public. Reproduce the build and verify nested route refreshes before release.
- **Practical skills:** Create three commits in scratch repo; explain stage and worktree.
- **Daily practice:** [DevOps and deployment](daily-practice/devops/README.md).
- **Assignment:** [course-devops](tasks/course-devops/README.md).
- **Mini projects:** [DevOps and deployment bank](mini-projects/devops/README.md).
- **Interview preparation:** [DevOps and deployment](interview-preparation/devops.md).
- **Expected outcome:** Log contains three distinct changes. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [DevOps and deployment teaching notes](09-devops/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 8 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# Module 10: Web Security & Best Practices

## Topic: Secure Development

- **Concepts covered:** OWASP basics; SQL Injection; XSS; CSRF.
- **Prerequisites:** Forms, HTTP and databases.
- **Learning objectives:** Explain and demonstrate owasp basics, sql injection, xss, csrf.
- **Theory:** Trust boundaries separate controlled code from untrusted inputs. Bind SQL parameters, use safe text sinks for plain content, and encode for the output context. CSRF exploits automatically attached credentials; choose suitable token and origin checks. HttpOnly restricts script access to cookies but does not prevent XSS. CORS is not authorization.
- **Practical skills:** Display text through textContent; test literal markup.
- **Daily practice:** [Web security](daily-practice/security/README.md).
- **Assignment:** [course-security](tasks/course-security/README.md).
- **Mini projects:** [Web security bank](mini-projects/security/README.md).
- **Interview preparation:** [Web security](interview-preparation/security.md).
- **Expected outcome:** <b>hello</b> appears literally. Demonstrate the selected module assessment and explain one boundary case.
- **Notes:** [Web security teaching notes](10-security/notes.md).
- **Capstone connection:** Apply this module in the [course companion capstone](capstone-project/README.md), using the module-to-milestone matrix there.

The 5 hours cover the module as a whole, not every project in its practice bank. See the roadmap for contact-time allocation.

# SUPPLEMENTARY / INDUSTRY SKILLS

[Supplementary overview](11-supplementary/README.md): Mongoose, authentication/authorization and full stack MERN integration. These have no additional official contact hours. Advanced features in the project banks (streaming, migrations, optimistic concurrency, upload controls and release rehearsal) are extension practice. The capstone is a proposed synthesis project, not a requirement stated in the PDF.

# Source limitations

The Node.js cell ends at “Event”; this curriculum uses events as a teaching interpretation. Several printed cells end with commas. No missing wording is invented. The final line of the user's instructions was truncated after the roadmap requirement; this revision implements the visible requirements.
