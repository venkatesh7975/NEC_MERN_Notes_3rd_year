/* ==========================================================================
   MERN Stack Learning Portal - Expanded JS App & Data Store (120h Curriculum)
   ========================================================================== */

const DATA = {
  // 10 Official Curriculum Modules (120 Contact Hours)
  modules: [
    {
      id: 'mod-1',
      moduleNum: 1,
      title: 'Module 1: Foundations of Web Development',
      hours: '6 Hours',
      badge: 'Module 01',
      category: 'foundations',
      icon: '🌐',
      desc: 'Web evolution, client-server architecture, static vs dynamic web apps, roles in web development, development environment setup.',
      subtopics: ['Web Evolution', 'Static vs Dynamic', 'Client-Server Cycle', 'Developer Setup'],
      notesPath: 'notes/git.md',
      readmePath: '01-foundations/README.md',
      assignmentPath: 'tasks/course-foundations/README.md',
      interviewPath: 'interview-preparation/foundations.md',
      details: `
        <h3>Module 1: Foundations of Web Development (6 Contact Hours)</h3>
        <p>Comprehensive overview of how the modern web operates, HTTP request-response lifecycle, DNS resolution, client vs server responsibilities, and developer tool setup.</p>
        <ul>
          <li><strong>Web Evolution:</strong> Web 1.0 static pages → Web 2.0 dynamic applications → Modern SPA/MERN architecture.</li>
          <li><strong>Client-Server Cycle:</strong> Browsers, HTTP protocol, requests/responses, status codes, server side vs client side rendering.</li>
          <li><strong>Tooling:</strong> VS Code, Git CLI, Node.js environment, terminal scripting, GitHub.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/git.md</code> | <strong>Module Specs:</strong> <code>01-foundations/README.md</code></p>
      `
    },
    {
      id: 'mod-2',
      moduleNum: 2,
      title: 'Module 2: HTML Essentials & Semantics',
      hours: '10 Hours',
      badge: 'Module 02',
      category: 'frontend',
      icon: '📄',
      desc: 'HTML5 semantic elements, text formatting, hyperlinks, lists, tables, dynamic forms, validation attributes, media embedding, accessibility (A11y).',
      subtopics: ['Semantic Tags', 'Forms & Inputs', 'Tables & Lists', 'Media & Canvas', 'Accessibility'],
      notesPath: 'notes/html.md',
      readmePath: '02-html/README.md',
      assignmentPath: 'tasks/course-html/README.md',
      interviewPath: 'interview-preparation/html.md',
      details: `
        <h3>Module 2: HTML Essentials & Semantics (10 Contact Hours)</h3>
        <p>Master HTML5 document structure, semantic tag semantics, user input form validation, accessible DOM structure, and embedded media.</p>
        <ul>
          <li><strong>Semantic Layout:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>.</li>
          <li><strong>Forms & Validation:</strong> Input types (text, email, password, radio, checkbox, date, range, color), select options, fieldsets, required/pattern validation.</li>
          <li><strong>Accessibility (ARIA):</strong> Screen reader support, aria-labels, alt text, focus management, semantic landmarks.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/html.md</code> | <strong>Module Specs:</strong> <code>02-html/README.md</code></p>
      `
    },
    {
      id: 'mod-3',
      moduleNum: 3,
      title: 'Module 3: CSS Styling & Responsive Layouts',
      hours: '14 Hours',
      badge: 'Module 03',
      category: 'frontend',
      icon: '🎨',
      desc: 'CSS selectors, box model, Flexbox layout, CSS Grid, media queries, CSS custom properties (variables), glassmorphic UI, animations, mobile-first design.',
      subtopics: ['Box Model', 'Flexbox Layout', 'CSS Grid', 'Media Queries', 'CSS Variables'],
      notesPath: 'notes/css.md',
      readmePath: '03-css/README.md',
      assignmentPath: 'tasks/course-css/README.md',
      interviewPath: 'interview-preparation/css.md',
      details: `
        <h3>Module 3: CSS Styling & Responsive Layouts (14 Contact Hours)</h3>
        <p>Deep dive into CSS styling architecture, modern layout engines (Flexbox & Grid), fluid responsive design systems, transitions, animations, and dark/light themes.</p>
        <ul>
          <li><strong>Box Model:</strong> Margin collapse, padding, border, content sizing, <code>box-sizing: border-box</code>.</li>
          <li><strong>Flexbox Engine:</strong> Main/cross axes, <code>justify-content</code>, <code>align-items</code>, <code>flex-wrap</code>, grow/shrink calculations.</li>
          <li><strong>CSS Grid:</strong> Explicit vs implicit grids, <code>grid-template-columns</code>, <code>repeat(auto-fit, minmax())</code>, fractional units.</li>
          <li><strong>Responsive Design:</strong> Mobile-first media queries, breakpoints, fluid typography (vw, rem, clamp).</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/css.md</code> | <strong>Module Specs:</strong> <code>03-css/README.md</code></p>
      `
    },
    {
      id: 'mod-4',
      moduleNum: 4,
      title: 'Module 4: JavaScript Core & Async Programming',
      hours: '26 Hours',
      badge: 'Module 04',
      category: 'frontend',
      icon: '⚡',
      desc: 'Variables, data types, operators, control flow, functions, ES6+ features, DOM manipulation, event handling, Promises, Async/Await, Fetch API, array methods.',
      subtopics: ['ES6+ Syntax', 'DOM Manipulation', 'Event Listeners', 'Promises & Async/Await', 'Array Methods'],
      notesPath: 'notes/javascript.md',
      readmePath: '04-javascript/README.md',
      assignmentPath: 'tasks/course-javascript/README.md',
      interviewPath: 'interview-preparation/javascript.md',
      details: `
        <h3>Module 4: JavaScript Core & Async Programming (26 Contact Hours)</h3>
        <p>The foundational JavaScript module covering core language mechanics, DOM manipulation, asynchronous programming, and functional array techniques.</p>
        <ul>
          <li><strong>ES6+ Standards:</strong> <code>let</code>/<code>const</code> scoping, arrow functions, template literals, destructuring, spread/rest operators.</li>
          <li><strong>DOM & Events:</strong> Element selection, event delegation, dynamic node creation, event bubbling vs capturing.</li>
          <li><strong>Asynchronous JS:</strong> Callbacks, Promises, <code>async/await</code>, error handling with <code>try...catch</code>, Fetch API HTTP calls.</li>
          <li><strong>Array Methods:</strong> <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>find</code>, <code>some</code>, <code>every</code>.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/javascript.md</code> | <strong>Module Specs:</strong> <code>04-javascript/README.md</code></p>
      `
    },
    {
      id: 'mod-5',
      moduleNum: 5,
      title: 'Module 5: React 19 Frontend Development',
      hours: '21 Hours',
      badge: 'Module 05',
      category: 'frontend',
      icon: '⚛️',
      desc: 'Component architecture, JSX, props, state management, React 19 Hooks (useState, useEffect, useContext, useReducer, useRef), forms, React Router DOM v6.',
      subtopics: ['JSX & Components', 'Props & State', 'React Hooks', 'Context API', 'React Router'],
      notesPath: 'notes/react.md',
      readmePath: '05-react/README.md',
      assignmentPath: 'tasks/course-react/README.md',
      interviewPath: 'interview-preparation/react.md',
      details: `
        <h3>Module 5: React 19 Frontend Development (21 Contact Hours)</h3>
        <p>Build dynamic single-page web applications using React 19 component trees, declarative state management, custom hooks, and route navigation.</p>
        <ul>
          <li><strong>JSX & Virtual DOM:</strong> Declarative UI rendering, reconciliation, key props, conditional rendering.</li>
          <li><strong>React Hooks:</strong> <code>useState</code> for state, <code>useEffect</code> for side effects/API calls, <code>useContext</code> for global state, <code>useRef</code> for DOM references.</li>
          <li><strong>State Architecture:</strong> Controlled components, lifting state up, immutable state updates.</li>
          <li><strong>Routing:</strong> React Router DOM v6, nested routes, route params, dynamic navigation.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/react.md</code> | <strong>Module Specs:</strong> <code>05-react/README.md</code></p>
      `
    },
    {
      id: 'mod-6',
      moduleNum: 6,
      title: 'Module 6: Node.js Backend Runtime',
      hours: '12 Hours',
      badge: 'Module 06',
      category: 'backend',
      icon: '🟢',
      desc: 'Node.js architecture, single-threaded event loop, CommonJS vs ES Modules, core modules (fs, path, http, os), NPM dependencies, streams, event emitters.',
      subtopics: ['Event Loop', 'FS & Path Modules', 'HTTP Server', 'NPM Package Mgr', 'Async I/O'],
      notesPath: 'notes/node.md',
      readmePath: '06-nodejs/README.md',
      assignmentPath: 'tasks/course-nodejs/README.md',
      interviewPath: 'interview-preparation/nodejs.md',
      details: `
        <h3>Module 6: Node.js Backend Runtime (12 Contact Hours)</h3>
        <p>Master server-side JavaScript execution, non-blocking asynchronous event loop, file system management, and native HTTP server creation.</p>
        <ul>
          <li><strong>Event Loop Architecture:</strong> Single-threaded non-blocking I/O model, libuv thread pool, call stack vs task queue.</li>
          <li><strong>Core Modules:</strong> File System (<code>fs/promises</code>), Path normalization (<code>path</code>), HTTP server (<code>http</code>), Operating system (<code>os</code>).</li>
          <li><strong>NPM & Modules:</strong> Package management, <code>package.json</code> configuration, CommonJS vs ES Module imports.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/node.md</code> | <strong>Module Specs:</strong> <code>06-nodejs/README.md</code></p>
      `
    },
    {
      id: 'mod-7',
      moduleNum: 7,
      title: 'Module 7: Express.js & REST API Architecture',
      hours: '10 Hours',
      badge: 'Module 07',
      category: 'backend',
      icon: '🚂',
      desc: 'Express routing, custom middleware pipelines, RESTful HTTP verbs (GET, POST, PUT, DELETE), status codes, body parsing, static files, central error handling.',
      subtopics: ['Express Router', 'Middleware Chain', 'REST Principles', 'HTTP Status Codes', 'Error Handlers'],
      notesPath: 'notes/express.md',
      readmePath: '07-express-rest/README.md',
      assignmentPath: 'tasks/course-express/README.md',
      interviewPath: 'interview-preparation/express.md',
      details: `
        <h3>Module 7: Express.js & REST API Architecture (10 Contact Hours)</h3>
        <p>Design scalable server-side web applications and REST APIs using Express.js middleware pipelines and HTTP verb conventions.</p>
        <ul>
          <li><strong>RESTful Design:</strong> Resource-oriented URIs, HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes (200, 201, 400, 401, 404, 500).</li>
          <li><strong>Middleware Pipeline:</strong> Built-in middleware (<code>express.json()</code>, <code>express.urlencoded()</code>), custom logging middleware, auth guards.</li>
          <li><strong>Routing:</strong> Modular routing with <code>express.Router()</code>, URL parameters (<code>req.params</code>), query strings (<code>req.query</code>).</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/express.md</code> & <code>notes/rest-api.md</code> | <strong>Module Specs:</strong> <code>07-express-rest/README.md</code></p>
      `
    },
    {
      id: 'mod-8',
      moduleNum: 8,
      title: 'Module 8: Databases (SQL + MongoDB)',
      hours: '8 Hours',
      badge: 'Module 08',
      category: 'database',
      icon: '🗄️',
      desc: 'Relational vs NoSQL databases, MySQL DDL/DML, primary/foreign keys, SQL JOINs, MongoDB document store, BSON format, Mongoose schemas, CRUD queries.',
      subtopics: ['SQL vs NoSQL', 'MySQL Joins & Keys', 'MongoDB Collections', 'Mongoose Schemas', 'CRUD Queries'],
      notesPath: 'notes/mongodb.md',
      readmePath: '08-databases/README.md',
      assignmentPath: 'tasks/course-mongodb/README.md',
      interviewPath: 'interview-preparation/mongodb.md',
      details: `
        <h3>Module 8: Databases - SQL & MongoDB (8 Contact Hours)</h3>
        <p>Compare relational SQL and NoSQL document databases. Implement structured schemas, foreign key constraints, joins, and MongoDB document aggregations.</p>
        <ul>
          <li><strong>MySQL Database:</strong> SQL syntax, table creation, primary/foreign key constraints, <code>INNER JOIN</code>, <code>LEFT JOIN</code>, aggregations.</li>
          <li><strong>MongoDB & Mongoose:</strong> BSON document model, collections, ObjectIds, Mongoose schema validation, model querying, indexes.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/mongodb.md</code> & <code>notes/mysql.md</code> | <strong>Module Specs:</strong> <code>08-databases/README.md</code></p>
      `
    },
    {
      id: 'mod-9',
      moduleNum: 9,
      title: 'Module 9: DevOps & Cloud Deployment',
      hours: '8 Hours',
      badge: 'Module 09',
      category: 'devops',
      icon: '☁️',
      desc: 'Git version control workflows, GitHub pull requests, Docker containerization, writing Dockerfiles, Docker Compose, deployment on Vercel, Render, & MongoDB Atlas.',
      subtopics: ['Git & GitHub', 'Docker Containers', 'Docker Compose', 'Vercel Deployment', 'Render & Atlas'],
      notesPath: 'notes/deployment.md',
      readmePath: '09-devops/README.md',
      assignmentPath: 'tasks/course-devops/README.md',
      interviewPath: 'interview-preparation/devops.md',
      details: `
        <h3>Module 9: DevOps & Cloud Deployment (8 Contact Hours)</h3>
        <p>Containerize full-stack applications with Docker and deploy client/server systems to modern cloud infrastructure.</p>
        <ul>
          <li><strong>Git Workflows:</strong> Branching strategies, staging, commits, remote origins, pull requests, merge conflict resolution.</li>
          <li><strong>Docker Containers:</strong> Dockerfile build stages, image optimization, exposed ports, Docker Compose multi-service orchestration.</li>
          <li><strong>Cloud Platforms:</strong> Vercel SPA deployment, Render backend service hosting, MongoDB Atlas cluster provisioning.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/deployment.md</code> & <code>notes/docker.md</code> | <strong>Module Specs:</strong> <code>09-devops/README.md</code></p>
      `
    },
    {
      id: 'mod-10',
      moduleNum: 10,
      title: 'Module 10: Web Security & Best Practices',
      hours: '5 Hours',
      badge: 'Module 10',
      category: 'security',
      icon: '🔒',
      desc: 'OWASP Top 10 vulnerabilities, SQL Injection prevention, Cross-Site Scripting (XSS), CSRF tokens, JWT authentication, bcrypt password hashing, CORS policies.',
      subtopics: ['OWASP Top 10', 'SQL Injection & XSS', 'JWT Token Auth', 'Bcrypt Hashing', 'CORS Policies'],
      notesPath: 'notes/authentication.md',
      readmePath: '10-security/README.md',
      assignmentPath: 'tasks/course-security/README.md',
      interviewPath: 'interview-preparation/security.md',
      details: `
        <h3>Module 10: Web Security & Best Practices (5 Contact Hours)</h3>
        <p>Implement essential web security safeguards, sanitize user inputs, secure API endpoints with JWT tokens, and prevent common web attack vectors.</p>
        <ul>
          <li><strong>OWASP Vulnerabilities:</strong> Preventing SQL Injection via parameterized queries, XSS sanitization, CSRF protections.</li>
          <li><strong>Authentication & Passwords:</strong> Password hashing using <code>bcryptjs</code>, JWT payload signing, token verification middleware.</li>
          <li><strong>CORS & Headers:</strong> Configuring Cross-Origin Resource Sharing (CORS), security headers, environment variables.</li>
        </ul>
        <p><strong>Primary Notes:</strong> <code>notes/authentication.md</code> | <strong>Module Specs:</strong> <code>10-security/README.md</code></p>
      `
    }
  ],

  // Comprehensive Notes Guides (13 Markdown Notes Files)
  notes: [
    { id: 'n-html', title: 'HTML5 & Web Semantics', category: 'frontend', icon: '📄', path: 'notes/html.md', desc: 'Complete HTML5 reference guide covering tags, forms, media, canvas, SVG, and A11y.' },
    { id: 'n-css', title: 'CSS3 Flexbox & Grid', category: 'frontend', icon: '🎨', path: 'notes/css.md', desc: 'Comprehensive CSS styling guide covering box model, Flexbox, Grid, media queries, and animations.' },
    { id: 'n-js', title: 'JavaScript ES6+ & DOM', category: 'frontend', icon: '⚡', path: 'notes/javascript.md', desc: 'Modern ES6+ syntax, closure, Promises, Async/Await, DOM events, and functional array methods.' },
    { id: 'n-react', title: 'React 19 & Hooks', category: 'frontend', icon: '⚛️', path: 'notes/react.md', desc: 'React 19 component design, JSX, Hooks (useState, useEffect, useContext), and Router.' },
    { id: 'n-node', title: 'Node.js Core Runtime', category: 'backend', icon: '🟢', path: 'notes/node.md', desc: 'Node.js event loop, asynchronous non-blocking I/O, FS module, streams, and NPM management.' },
    { id: 'n-express', title: 'Express.js Routing', category: 'backend', icon: '🚂', path: 'notes/express.md', desc: 'Express routing, middleware pipeline, request parsing, and error handling.' },
    { id: 'n-rest', title: 'REST API Principles', category: 'backend', icon: '🌐', path: 'notes/rest-api.md', desc: 'REST architectural constraints, HTTP verbs, status codes, and URI design.' },
    { id: 'n-mongodb', title: 'MongoDB & Mongoose', category: 'database', icon: '🍃', path: 'notes/mongodb.md', desc: 'NoSQL document database, Mongoose ODM schemas, validations, and aggregations.' },
    { id: 'n-mysql', title: 'MySQL & Relational SQL', category: 'database', icon: '🐬', path: 'notes/mysql.md', desc: 'SQL DDL/DML, primary/foreign keys, INNER/LEFT joins, and query optimization.' },
    { id: 'n-git', title: 'Git & Version Control', category: 'devops', icon: '🔀', path: 'notes/git.md', desc: 'Git repository management, staging, commits, remote tracking, and branching.' },
    { id: 'n-auth', title: 'Authentication & JWT', category: 'security', icon: '🔒', path: 'notes/authentication.md', desc: 'JWT token workflow, bcrypt password security, CORS headers, and auth middleware.' },
    { id: 'n-deploy', title: 'Cloud Deployment', category: 'devops', icon: '☁️', path: 'notes/deployment.md', desc: 'Deploying client & server apps to Vercel, Render, and MongoDB Atlas.' },
    { id: 'n-docker', title: 'Docker Containerization', category: 'devops', icon: '🐳', path: 'notes/docker.md', desc: 'Dockerfiles, container builds, port forwarding, and Docker Compose.' }
  ],

  // Course Task Suites & Assigned Tasks
  tasks: [
    { id: 't-course-html', title: 'Course Assignment: HTML Tag Portfolio', status: 'completed', desc: 'Build a multi-page website showcasing HTML5 semantic markup, tables, forms, and embedded media.', path: 'tasks/course-html/README.md', tags: ['HTML5', 'Semantics', 'Forms'] },
    { id: 't-course-css', title: 'Course Assignment: Responsive Layout Suite', status: 'completed', desc: 'Create a responsive layout system using Flexbox, CSS Grid, media queries, and glassmorphism styling.', path: 'tasks/course-css/README.md', tags: ['CSS3', 'Responsive', 'Flexbox', 'Grid'] },
    { id: 't-course-js', title: 'Course Assignment: JavaScript Interactive App', status: 'completed', desc: 'Develop an interactive JavaScript application using DOM manipulation, event listeners, and array methods.', path: 'tasks/course-javascript/README.md', tags: ['JavaScript', 'DOM', 'Events'] },
    { id: 't-course-react', title: 'Course Assignment: React 19 SPA Suite', status: 'completed', desc: 'Build a React 19 web application using functional components, state hooks, and custom API integration.', path: 'tasks/course-react/README.md', tags: ['React 19', 'Hooks', 'SPA'] },
    { id: 't-course-node', title: 'Course Assignment: Node.js CLI & Utilities', status: 'completed', desc: 'Build command line utility scripts and file management tools using Node.js core modules.', path: 'tasks/course-nodejs/README.md', tags: ['Node.js', 'FS', 'CLI'] },
    { id: 't-course-express', title: 'Course Assignment: Express REST Microservice', status: 'completed', desc: 'Construct a RESTful backend microservice with Express routing, middleware, and request validation.', path: 'tasks/course-express/README.md', tags: ['Express', 'REST API', 'Backend'] },
    { id: 't-course-db', title: 'Course Assignment: MongoDB Data Store', status: 'completed', desc: 'Design Mongoose schemas, model relationships, and build CRUD API endpoints with MongoDB.', path: 'tasks/course-mongodb/README.md', tags: ['MongoDB', 'Mongoose', 'CRUD'] },
    { id: 't-course-sql', title: 'Course Assignment: SQL Relational Reporting', status: 'completed', desc: 'Construct relational database tables, foreign key constraints, and multi-table JOIN queries.', path: 'tasks/course-sql/README.md', tags: ['SQL', 'MySQL', 'Joins'] },
    { id: 't-course-sec', title: 'Course Assignment: Security & JWT Auth System', status: 'completed', desc: 'Implement JWT token authentication, bcrypt password hashing, and endpoint security guards.', path: 'tasks/course-security/README.md', tags: ['JWT', 'Security', 'Bcrypt'] },
    { id: 't-task-07', title: 'Task 7: Interactive Counter Application', status: 'completed', desc: 'Dynamic counter application with increment/decrement state and automated text color switching.', path: 'tasks/task-07/README.md', tags: ['JavaScript', 'DOM', 'State'] },
    { id: 't-task-08', title: 'Task 8: Background Color Toggle App', status: 'completed', desc: 'Background color toggle application utilizing modulo arithmetic array indexing.', path: 'tasks/task-08/README.md', tags: ['JavaScript', 'DOM', 'Modulo'] }
  ],

  // Official Documentation Resources & Tools
  resources: [
    { id: 'mdn', title: 'MDN Web Docs', category: 'official', icon: '📚', desc: 'Official authoritative reference for HTML, CSS, JavaScript APIs, and Web Standards.', link: 'https://developer.mozilla.org/' },
    { id: 'react-docs', title: 'React 19 Documentation', category: 'official', icon: '⚛️', desc: 'Interactive guides, hooks API reference, and component design patterns.', link: 'https://react.dev/' },
    { id: 'node-docs', title: 'Node.js API Guides', category: 'official', icon: '🟢', desc: 'Official Node.js documentation for core modules, async I/O, and server APIs.', link: 'https://nodejs.org/docs' },
    { id: 'express-docs', title: 'Express.js Guide', category: 'official', icon: '🚂', desc: 'Routing guides, middleware documentation, and REST server API references.', link: 'https://expressjs.com/' },
    { id: 'mongodb-univ', title: 'MongoDB University', category: 'official', icon: '🍃', desc: 'Free courses on MongoDB NoSQL schema modeling, aggregations, and Atlas cloud.', link: 'https://learn.mongodb.com/' },
    { id: 'tools-dev', title: 'Web Developer Tooling', category: 'tools', icon: '🛠️', desc: 'VS Code editor, Postman API client, Hoppscotch, Bruno, and Lucide icons.', link: 'https://code.visualstudio.com/' }
  ],

  // Cheatsheets
  cheatsheets: [
    { id: 'git-docker-cs', title: 'Git & Docker Reference Cheatsheet', path: 'cheatsheets/git-docker-cheatsheet.md', tags: ['Git', 'Docker', 'CLI'] },
    { id: 'html-css-cs', title: 'HTML5 & CSS3 Layout Cheatsheet', path: 'cheatsheets/html-css-cheatsheet.md', tags: ['HTML', 'CSS', 'Flexbox', 'Grid'] },
    { id: 'js-cs', title: 'JavaScript ES6+ Syntax Cheatsheet', path: 'cheatsheets/javascript-cheatsheet.md', tags: ['JS', 'ES6', 'Promises'] },
    { id: 'react-cs', title: 'React 19 Hooks Cheatsheet', path: 'cheatsheets/react-cheatsheet.md', tags: ['React', 'Hooks', 'State'] },
    { id: 'node-express-cs', title: 'Node & Express Server Cheatsheet', path: 'cheatsheets/node-express-cheatsheet.md', tags: ['Node', 'Express', 'API'] },
    { id: 'mongodb-cs', title: 'MongoDB & Mongoose Query Cheatsheet', path: 'cheatsheets/mongodb-cheatsheet.md', tags: ['MongoDB', 'NoSQL', 'Queries'] }
  ],

  // Interview Questions & Technical Q&A Sets
  interview: [
    { id: 'iq-foundations', title: 'Web Foundations Technical Q&A', path: 'interview-preparation/foundations.md', category: 'foundations', tags: ['HTTP', 'DNS', 'Web'] },
    { id: 'iq-html', title: 'HTML5 & Semantics Interview Questions', path: 'interview-preparation/html.md', category: 'frontend', tags: ['HTML5', 'Semantics', 'A11y'] },
    { id: 'iq-css', title: 'CSS3, Flexbox & Grid Interview Q&A', path: 'interview-preparation/css.md', category: 'frontend', tags: ['CSS3', 'Flexbox', 'Grid'] },
    { id: 'iq-js', title: 'JavaScript Core & Async Interview Q&A', path: 'interview-preparation/javascript.md', category: 'frontend', tags: ['JS', 'Promises', 'Closure'] },
    { id: 'iq-react', title: 'React 19 & Hooks Interview Questions', path: 'interview-preparation/react.md', category: 'frontend', tags: ['React', 'Hooks', 'VDOM'] },
    { id: 'iq-node', title: 'Node.js Event Loop & Backend Q&A', path: 'interview-preparation/nodejs.md', category: 'backend', tags: ['Node.js', 'Event Loop', 'FS'] },
    { id: 'iq-express', title: 'Express.js & REST API Interview Q&A', path: 'interview-preparation/express.md', category: 'backend', tags: ['Express', 'REST', 'Middleware'] },
    { id: 'iq-sql', title: 'SQL & Relational DB Interview Q&A', path: 'interview-preparation/sql.md', category: 'database', tags: ['SQL', 'Joins', 'Keys'] },
    { id: 'iq-mongo', title: 'MongoDB & NoSQL Interview Q&A', path: 'interview-preparation/mongodb.md', category: 'database', tags: ['MongoDB', 'NoSQL', 'Aggregations'] },
    { id: 'iq-devops', title: 'DevOps, Git & Docker Interview Q&A', path: 'interview-preparation/devops.md', category: 'devops', tags: ['Git', 'Docker', 'DevOps'] },
    { id: 'iq-security', title: 'Web Security & OWASP Interview Q&A', path: 'interview-preparation/security.md', category: 'security', tags: ['Security', 'OWASP', 'JWT'] }
  ]
};

// State Management
let currentTab = 'all';
let searchQuery = '';
let currentTheme = localStorage.getItem('portal_theme') || 'dark';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  setupEventListeners();
  renderAllSections();
});

// Theme Management
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portal_theme', theme);
  
  const themeLabel = document.getElementById('theme-label');
  const themeIcon = document.getElementById('theme-icon');
  
  if (themeLabel && themeIcon) {
    if (theme === 'dark') {
      themeLabel.textContent = 'Dark Mode';
      themeIcon.textContent = '🌙';
    } else {
      themeLabel.textContent = 'Light Mode';
      themeIcon.textContent = '☀️';
    }
  }
}

function toggleTheme() {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

// Event Listeners
function setupEventListeners() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderAllSections();
    });
  }

  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      renderAllSections();
    });
  });

  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
}

// Rendering Logic
function renderAllSections() {
  const modulesContainer = document.getElementById('modules-grid');
  const notesContainer = document.getElementById('notes-grid');
  const tasksContainer = document.getElementById('tasks-grid');
  const resourcesContainer = document.getElementById('resources-grid');
  const cheatsheetsContainer = document.getElementById('cheatsheets-grid');
  const interviewContainer = document.getElementById('interview-grid');

  const modulesSection = document.getElementById('modules-section');
  const notesSection = document.getElementById('notes-section');
  const tasksSection = document.getElementById('tasks-section');
  const resourcesSection = document.getElementById('resources-section');
  const cheatsheetsSection = document.getElementById('cheatsheets-section');
  const interviewSection = document.getElementById('interview-section');

  const filteredModules = DATA.modules.filter(item => matchFilter(item));
  const filteredNotes = DATA.notes.filter(item => matchFilter(item));
  const filteredTasks = DATA.tasks.filter(item => matchFilter(item));
  const filteredResources = DATA.resources.filter(item => matchFilter(item));
  const filteredCheatsheets = DATA.cheatsheets.filter(item => matchFilter(item));
  const filteredInterview = DATA.interview.filter(item => matchFilter(item));

  if (modulesSection) modulesSection.style.display = (currentTab === 'all' || currentTab === 'modules') ? 'block' : 'none';
  if (notesSection) notesSection.style.display = (currentTab === 'all' || currentTab === 'notes') ? 'block' : 'none';
  if (tasksSection) tasksSection.style.display = (currentTab === 'all' || currentTab === 'tasks') ? 'block' : 'none';
  if (resourcesSection) resourcesSection.style.display = (currentTab === 'all' || currentTab === 'resources') ? 'block' : 'none';
  if (cheatsheetsSection) cheatsheetsSection.style.display = (currentTab === 'all' || currentTab === 'cheatsheets') ? 'block' : 'none';
  if (interviewSection) interviewSection.style.display = (currentTab === 'all' || currentTab === 'interview') ? 'block' : 'none';

  if (modulesContainer) modulesContainer.innerHTML = filteredModules.map(createModuleCard).join('');
  if (notesContainer) notesContainer.innerHTML = filteredNotes.map(createNoteCard).join('');
  if (tasksContainer) tasksContainer.innerHTML = filteredTasks.map(createTaskCard).join('');
  if (resourcesContainer) resourcesContainer.innerHTML = filteredResources.map(createResourceCard).join('');
  if (cheatsheetsContainer) cheatsheetsContainer.innerHTML = filteredCheatsheets.map(createCheatsheetCard).join('');
  if (interviewContainer) interviewContainer.innerHTML = filteredInterview.map(createInterviewCard).join('');
}

function matchFilter(item) {
  if (!searchQuery) return true;
  const titleMatch = item.title && item.title.toLowerCase().includes(searchQuery);
  const descMatch = item.desc && item.desc.toLowerCase().includes(searchQuery);
  const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery));
  const subtopicsMatch = item.subtopics && item.subtopics.some(sub => sub.toLowerCase().includes(searchQuery));
  return titleMatch || descMatch || tagsMatch || subtopicsMatch;
}

// Card Render Creators
function createModuleCard(mod) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">${mod.icon}</div>
          <div>
            <span class="badge badge-module">${mod.badge}</span>
            <span class="badge badge-hours">${mod.hours}</span>
          </div>
        </div>
        <h3 class="card-title">${mod.title}</h3>
        <p class="card-desc">${mod.desc}</p>
        <div class="tag-list">
          ${mod.subtopics.map(s => `<span class="tag">#${s}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openModuleModal('${mod.id}')">
          <span>Module Overview</span> ➔
        </button>
      </div>
    </div>
  `;
}

function createNoteCard(note) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">${note.icon}</div>
          <span class="badge badge-topic">Notes Guide</span>
        </div>
        <h3 class="card-title">${note.title}</h3>
        <p class="card-desc">${note.desc}</p>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openModal('${note.title}', '<p><strong>Notes File Path:</strong> <code>${note.path}</code></p><p>${note.desc}</p>')">
          <span>View File</span> ➔
        </button>
      </div>
    </div>
  `;
}

function createTaskCard(task) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">📌</div>
          <span class="badge badge-completed">Assignment</span>
        </div>
        <h3 class="card-title">${task.title}</h3>
        <p class="card-desc">${task.desc}</p>
        <div class="tag-list">
          ${task.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openModal('${task.title}', '<p><strong>Task Requirement Spec:</strong> <code>${task.path}</code></p><p>${task.desc}</p>')">
          <span>View Spec</span> ➔
        </button>
      </div>
    </div>
  `;
}

function createResourceCard(res) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">${res.icon}</div>
          <span class="badge badge-resource">Official Doc</span>
        </div>
        <h3 class="card-title">${res.title}</h3>
        <p class="card-desc">${res.desc}</p>
      </div>
      <div class="card-footer">
        <a class="card-btn" href="${res.link}" target="_blank" rel="noopener noreferrer">
          <span>Open Link</span> ↗
        </a>
      </div>
    </div>
  `;
}

function createCheatsheetCard(cs) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">⚡</div>
          <span class="badge badge-topic">Cheatsheet</span>
        </div>
        <h3 class="card-title">${cs.title}</h3>
        <p class="card-desc">Quick reference code guide and command snippets.</p>
        <div class="tag-list">
          ${cs.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openModal('${cs.title}', '<p><strong>File Location:</strong> <code>${cs.path}</code></p><p>Contains key reference syntax and commands.</p>')">
          <span>Open Guide</span> ➔
        </button>
      </div>
    </div>
  `;
}

function createInterviewCard(iq) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">💡</div>
          <span class="badge badge-resource">Interview Q&A</span>
        </div>
        <h3 class="card-title">${iq.title}</h3>
        <p class="card-desc">Technical questions, answer rationales, and code challenges for job interviews.</p>
        <div class="tag-list">
          ${iq.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openModal('${iq.title}', '<p><strong>Interview Q&A File:</strong> <code>${iq.path}</code></p><p>Review technical questions and detailed solutions.</p>')">
          <span>Open Q&A</span> ➔
        </button>
      </div>
    </div>
  `;
}

// Modal Trigger Functions
function openModuleModal(id) {
  const mod = DATA.modules.find(m => m.id === id);
  if (mod) {
    openModal(mod.title, mod.details);
  }
}

function openModal(title, htmlContent) {
  const backdrop = document.getElementById('modal-backdrop');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');

  if (backdrop && titleEl && bodyEl) {
    titleEl.textContent = title;
    bodyEl.innerHTML = htmlContent;
    backdrop.classList.add('active');
  }
}

function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
  }
}
