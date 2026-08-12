/* ==========================================================================
   MERN Stack Learning Portal - Dynamic JS App & Data Store
   ========================================================================== */

// 1. DATASETS
const DATA = {
  topics: [
    {
      id: 'html5',
      title: 'HTML5 & Web Semantics',
      category: 'frontend',
      icon: '🌐',
      badge: 'Frontend Core',
      desc: 'Semantic HTML5 structure, form validation, audio/video elements, canvas, SVG, and accessibility best practices.',
      tags: ['HTML5', 'Forms', 'Semantics', 'A11y'],
      details: `
        <h3>Key Topics Covered in HTML5</h3>
        <ul>
          <li><strong>Semantic Tags:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>.</li>
          <li><strong>Forms & Input Types:</strong> Text, email, password, radio, checkbox, date, range, color picker, validation attributes.</li>
          <li><strong>Media Elements:</strong> Audio/Video controls, source fallbacks, figure and figcaption.</li>
          <li><strong>Graphics & Embedding:</strong> SVG vector graphics, Canvas API, iframe sandboxing.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/html.md</code></p>
      `
    },
    {
      id: 'css3',
      title: 'CSS3 & Responsive Design',
      category: 'frontend',
      icon: '🎨',
      badge: 'Frontend Core',
      desc: 'Flexbox, CSS Grid, media queries, CSS variables, animations, glassmorphic UI, and mobile-first layout techniques.',
      tags: ['CSS3', 'Flexbox', 'Grid', 'Media Queries', 'Glassmorphism'],
      details: `
        <h3>Key Topics Covered in CSS3</h3>
        <ul>
          <li><strong>Box Model:</strong> Margin, border, padding, content, <code>box-sizing: border-box</code>.</li>
          <li><strong>Flexbox:</strong> <code>flex-direction</code>, <code>justify-content</code>, <code>align-items</code>, flex-grow/shrink.</li>
          <li><strong>CSS Grid:</strong> <code>grid-template-columns</code>, <code>gap</code>, auto-fit/auto-fill, responsive column spans.</li>
          <li><strong>Variables & Theme:</strong> CSS Custom Properties (<code>:root</code> variables) for dark/light themes.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/css.md</code></p>
      `
    },
    {
      id: 'javascript',
      title: 'JavaScript (ES6+)',
      category: 'frontend',
      icon: '⚡',
      badge: 'Core Language',
      desc: 'Modern ES6+ syntax, Promises, Async/Await, DOM manipulation, event listeners, array methods, and closures.',
      tags: ['JS', 'ES6+', 'DOM', 'Promises', 'Async/Await'],
      details: `
        <h3>Key Topics Covered in JavaScript</h3>
        <ul>
          <li><strong>ES6+ Features:</strong> <code>let</code>/<code>const</code>, arrow functions, destructuring, spread/rest operators.</li>
          <li><strong>Async Programming:</strong> Callbacks, Promises, <code>async/await</code>, Fetch API.</li>
          <li><strong>DOM Manipulation:</strong> <code>querySelector</code>, <code>addEventListener</code>, dynamic HTML rendering.</li>
          <li><strong>Array Methods:</strong> <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>, <code>find</code>.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/javascript.md</code></p>
      `
    },
    {
      id: 'react19',
      title: 'React 19 Framework',
      category: 'frontend',
      icon: '⚛️',
      badge: 'Frontend Framework',
      desc: 'Component architecture, JSX, Props, Hooks (useState, useEffect, useContext, useReducer), and React Router.',
      tags: ['React 19', 'Hooks', 'Components', 'Virtual DOM', 'JSX'],
      details: `
        <h3>Key Topics Covered in React 19</h3>
        <ul>
          <li><strong>Components & Props:</strong> Functional components, props passing, conditional rendering.</li>
          <li><strong>React Hooks:</strong> <code>useState</code> for state management, <code>useEffect</code> for side effects.</li>
          <li><strong>Context API:</strong> Global state management without prop drilling.</li>
          <li><strong>Routing:</strong> React Router DOM v6 navigation and URL params.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/react.md</code></p>
      `
    },
    {
      id: 'node',
      title: 'Node.js Runtime',
      category: 'backend',
      icon: '🟢',
      badge: 'Backend Runtime',
      desc: 'Non-blocking I/O event loop, CommonJS/ESM modules, File System (fs), path module, and HTTP server core.',
      tags: ['Node.js', 'Event Loop', 'FS Module', 'HTTP', 'Backend'],
      details: `
        <h3>Key Topics Covered in Node.js</h3>
        <ul>
          <li><strong>Architecture:</strong> Single-threaded non-blocking I/O event loop and libuv pool.</li>
          <li><strong>Modules:</strong> Core modules (<code>fs</code>, <code>path</code>, <code>http</code>, <code>os</code>) and NPM package manager.</li>
          <li><strong>Asynchronous Operations:</strong> Streams, buffers, and event emitters.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/node.md</code></p>
      `
    },
    {
      id: 'express',
      title: 'Express.js & REST APIs',
      category: 'backend',
      icon: '🚂',
      badge: 'Backend Framework',
      desc: 'Express routing, custom middleware, REST HTTP verbs (GET, POST, PUT, DELETE), status codes, and error handling.',
      tags: ['Express', 'REST API', 'Middleware', 'Routing'],
      details: `
        <h3>Key Topics Covered in Express.js</h3>
        <ul>
          <li><strong>REST Architecture:</strong> HTTP methods (GET, POST, PUT, PATCH, DELETE) and status codes (200, 201, 400, 404, 500).</li>
          <li><strong>Middleware:</strong> Built-in middleware (<code>express.json()</code>), custom logger, error handlers.</li>
          <li><strong>Routing:</strong> Modular router organization with Express Router.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/express.md</code> & <code>notes/rest-api.md</code></p>
      `
    },
    {
      id: 'mongodb',
      title: 'MongoDB & Mongoose',
      category: 'database',
      icon: '🍃',
      badge: 'NoSQL Database',
      desc: 'Document databases, BSON formats, Mongoose schema modeling, validations, relationships, and aggregations.',
      tags: ['MongoDB', 'Mongoose', 'NoSQL', 'CRUD', 'Schemas'],
      details: `
        <h3>Key Topics Covered in MongoDB</h3>
        <ul>
          <li><strong>Document Model:</strong> Collections, documents, object IDs, BSON data format.</li>
          <li><strong>Mongoose ODM:</strong> Schema creation, models, field validations, middleware hooks.</li>
          <li><strong>CRUD & Aggregations:</strong> <code>find</code>, <code>aggregate</code> pipelines, indexing performance.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/mongodb.md</code></p>
      `
    },
    {
      id: 'mysql',
      title: 'MySQL & Relational Databases',
      category: 'database',
      icon: '🐬',
      badge: 'SQL Database',
      desc: 'Relational database design, SQL syntax, primary/foreign keys, CRUD statements, and INNER/LEFT JOIN queries.',
      tags: ['MySQL', 'SQL', 'Relational DB', 'Joins', 'Keys'],
      details: `
        <h3>Key Topics Covered in MySQL</h3>
        <ul>
          <li><strong>SQL DDL & DML:</strong> <code>CREATE TABLE</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>SELECT</code>.</li>
          <li><strong>Relationships & Keys:</strong> Primary keys, foreign key constraints, 1:1, 1:N, N:M mappings.</li>
          <li><strong>SQL Joins:</strong> <code>INNER JOIN</code>, <code>LEFT JOIN</code>, <code>RIGHT JOIN</code>, GROUP BY aggregations.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/mysql.md</code></p>
      `
    },
    {
      id: 'git',
      title: 'Git & GitHub Version Control',
      category: 'devops',
      icon: '🔀',
      badge: 'DevOps & Tools',
      desc: 'Git repository management, staging, commits, remote origins, branching, merge conflict resolution, and PR workflows.',
      tags: ['Git', 'GitHub', 'Version Control', 'Branching'],
      details: `
        <h3>Key Topics Covered in Git</h3>
        <ul>
          <li><strong>Core Commands:</strong> <code>git init</code>, <code>add</code>, <code>commit</code>, <code>push</code>, <code>pull</code>, <code>status</code>, <code>log</code>.</li>
          <li><strong>Branching Strategy:</strong> Feature branches, checkout, merge, resolving conflicts.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/git.md</code></p>
      `
    },
    {
      id: 'auth',
      title: 'Authentication & Security',
      category: 'backend',
      icon: '🔒',
      badge: 'Security',
      desc: 'JSON Web Tokens (JWT), bcrypt password hashing, auth headers, protected route middleware, and CORS security.',
      tags: ['JWT', 'Bcrypt', 'Auth', 'Security', 'CORS'],
      details: `
        <h3>Key Topics Covered in Auth & Security</h3>
        <ul>
          <li><strong>JWT Auth:</strong> Token generation, payload signing, secret key verification.</li>
          <li><strong>Password Security:</strong> Hashing passwords using <code>bcryptjs</code> with salt rounds.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/authentication.md</code></p>
      `
    },
    {
      id: 'docker',
      title: 'Docker & Containerization',
      category: 'devops',
      icon: '🐳',
      badge: 'DevOps & Tools',
      desc: 'Docker container basics, writing Dockerfiles, containerizing Node/Express & React apps, and Docker Compose.',
      tags: ['Docker', 'Containers', 'Docker Compose', 'DevOps'],
      details: `
        <h3>Key Topics Covered in Docker</h3>
        <ul>
          <li><strong>Docker Basics:</strong> Images vs Containers, Docker Hub registry.</li>
          <li><strong>Dockerfile:</strong> Base images (<code>node:alpine</code>), <code>WORKDIR</code>, <code>COPY</code>, <code>RUN</code>, <code>EXPOSE</code>.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/docker.md</code></p>
      `
    },
    {
      id: 'deployment',
      title: 'Cloud Deployment',
      category: 'devops',
      icon: '☁️',
      badge: 'DevOps & Tools',
      desc: 'Deploying full stack applications to cloud services including Vercel, Render, and MongoDB Atlas database clusters.',
      tags: ['Vercel', 'Render', 'MongoDB Atlas', 'Cloud'],
      details: `
        <h3>Key Topics Covered in Deployment</h3>
        <ul>
          <li><strong>Frontend:</strong> Vercel & Netlify static/SPA hosting.</li>
          <li><strong>Backend:</strong> Render & Railway Node.js web services.</li>
          <li><strong>Database:</strong> MongoDB Atlas cloud connection strings and IP whitelisting.</li>
        </ul>
        <p><strong>Notes Location:</strong> <code>notes/deployment.md</code></p>
      `
    }
  ],

  tasks: [
    {
      id: 'task1',
      number: 1,
      title: 'Task 1: HTML Tags Master Website',
      status: 'completed',
      desc: 'Create a comprehensive website demonstrating all core HTML elements (headings, forms, tables, media, semantic tags).',
      tags: ['HTML5', 'Semantics', 'Forms', 'Media'],
      path: 'tasks/task1.md',
      details: `
        <h3>Task 1 Overview</h3>
        <p>Build a multi-page or structured web page showcasing HTML5 tags including text formatting, forms, input types, tables, images, audio, video, and semantic layout tags.</p>
        <p><strong>Location:</strong> <code>tasks/task1.md</code></p>
      `
    },
    {
      id: 'task2',
      number: 2,
      title: 'Task 2: Resume Webpage',
      status: 'completed',
      desc: 'Design a clean, professional online developer resume using HTML structure and custom CSS styling.',
      tags: ['HTML', 'CSS', 'Resume', 'Flexbox'],
      path: 'tasks/task2.md',
      details: `
        <h3>Task 2 Overview</h3>
        <p>Create a professional resume web page with contact information, work experience, technical skills grid, education, and project highlights.</p>
        <p><strong>Location:</strong> <code>tasks/task2.md</code></p>
      `
    },
    {
      id: 'task3',
      number: 3,
      title: 'Task 3: Responsive Web Application',
      status: 'completed',
      desc: 'Build a fully responsive web application that adapts layout seamlessly across mobile, tablet, and desktop viewports.',
      tags: ['CSS3', 'Responsive', 'Media Queries', 'Flexbox'],
      path: 'tasks/task3.md',
      details: `
        <h3>Task 3 Overview</h3>
        <p>Implement responsive layout strategies using CSS Media Queries, fluid Typography, dynamic column wrapping, and mobile navigation menus.</p>
        <p><strong>Location:</strong> <code>tasks/task3.md</code></p>
      `
    },
    {
      id: 'task4',
      number: 4,
      title: 'Task 4: GeeksforGeeks JavaScript Problems',
      status: 'completed',
      desc: 'Solve fundamental JavaScript algorithm and problem-solving exercises on GeeksforGeeks platform.',
      tags: ['JavaScript', 'Algorithms', 'GFG', 'Problem Solving'],
      path: 'tasks/task4.md',
      details: `
        <h3>Task 4 Overview</h3>
        <p>Complete assigned JavaScript problem sets focusing on loops, conditionals, array manipulations, string operations, and math functions.</p>
        <p><strong>Location:</strong> <code>tasks/task4.md</code></p>
      `
    },
    {
      id: 'task5',
      number: 5,
      title: 'Task 5: freeCodeCamp Certification Progress',
      status: 'completed',
      desc: 'Enroll and complete structured learning modules on freeCodeCamp Full Stack Web Development curriculum.',
      tags: ['freeCodeCamp', 'Full Stack', 'Certification'],
      path: 'tasks/task5.md',
      details: `
        <h3>Task 5 Overview</h3>
        <p>Track learning milestones and practice interactive code challenges on the freeCodeCamp JavaScript Algorithms & Web Development path.</p>
        <p><strong>Location:</strong> <code>tasks/task5.md</code></p>
      `
    },
    {
      id: 'task6',
      number: 6,
      title: 'Task 6: Excel Task Tracker',
      status: 'completed',
      desc: 'Maintain a detailed task tracking spreadsheet logging daily completion, topics covered, and submission dates.',
      tags: ['Excel', 'Tracker', 'Project Management'],
      path: 'tasks/task6.md',
      details: `
        <h3>Task 6 Overview</h3>
        <p>Log all assigned course tasks, submission timestamps, completion status, and self-assessment scores in a structured Excel tracking file.</p>
        <p><strong>Location:</strong> <code>tasks/task6.md</code></p>
      `
    },
    {
      id: 'task7',
      number: 7,
      title: 'Task 7: Counter Application',
      status: 'completed',
      desc: 'Interactive Counter web app with increment, decrement, reset functionality and dynamic color changes (Green > 0, Red < 0, Black = 0).',
      tags: ['JavaScript', 'DOM', 'State', 'Interactive App'],
      path: 'tasks/task7.md',
      details: `
        <h3>Task 7 Overview</h3>
        <p>Build a dynamic JavaScript counter web app. The count value changes text color automatically based on numeric value (positive: green, negative: red, zero: black).</p>
        <p><strong>Location:</strong> <code>tasks/task7.md</code> & <code>dailycodes/ClassProjects/</code></p>
      `
    },
    {
      id: 'task8',
      number: 8,
      title: 'Task 8: Background Color Toggle',
      status: 'completed',
      desc: 'Interactive background color toggle application cycling through color arrays using modulo operator math.',
      tags: ['JavaScript', 'DOM', 'Modulo Operator', 'UI Toggle'],
      path: 'tasks/task8.md',
      details: `
        <h3>Task 8 Overview</h3>
        <p>Develop a background color switcher web app. Uses JavaScript array indexing and modulo arithmetic (<code>colorIndex % colors.length</code>) to cycle smooth color themes on user clicks.</p>
        <p><strong>Location:</strong> <code>tasks/task8.md</code> & <code>dailycodes/ClassProjects/theme/</code></p>
      `
    }
  ],

  resources: [
    {
      id: 'mdn',
      title: 'MDN Web Docs',
      category: 'official',
      icon: '📚',
      desc: 'The gold standard documentation reference for HTML, CSS, JavaScript APIs, and Web Standards.',
      link: 'https://developer.mozilla.org/'
    },
    {
      id: 'react-docs',
      title: 'React 19 Official Documentation',
      category: 'official',
      icon: '⚛️',
      desc: 'Interactive tutorials, API guides, and best practices for modern React development.',
      link: 'https://react.dev/'
    },
    {
      id: 'node-docs',
      title: 'Node.js API Guides',
      category: 'official',
      icon: '🟢',
      desc: 'Official Node.js documentation for core modules, async I/O, and server APIs.',
      link: 'https://nodejs.org/docs'
    },
    {
      id: 'express-docs',
      title: 'Express.js Framework Guide',
      category: 'official',
      icon: '🚂',
      desc: 'Fast, unopinionated, minimalist web framework documentation for Node.js backend development.',
      link: 'https://expressjs.com/'
    },
    {
      id: 'mongodb-univ',
      title: 'MongoDB University',
      category: 'official',
      icon: '🍃',
      desc: 'Free courses on MongoDB database modeling, aggregation pipelines, and cloud cluster admin.',
      link: 'https://learn.mongodb.com/'
    },
    {
      id: 'tools',
      title: 'Developer Tools & Utilities',
      category: 'tools',
      icon: '🛠️',
      desc: 'VS Code, Postman API client, Hoppscotch, Bruno, and Lucide icons.',
      link: 'https://code.visualstudio.com/'
    }
  ],

  cheatsheets: [
    { id: 'git-cs', title: 'Git & Docker Quick Reference', path: 'cheatsheets/git-docker-cheatsheet.md', tags: ['Git', 'Docker', 'CLI'] },
    { id: 'html-css-cs', title: 'HTML & CSS Cheatsheet', path: 'cheatsheets/html-css-cheatsheet.md', tags: ['HTML', 'CSS', 'Flexbox'] },
    { id: 'js-cs', title: 'JavaScript ES6+ Cheatsheet', path: 'cheatsheets/javascript-cheatsheet.md', tags: ['JS', 'ES6', 'DOM'] },
    { id: 'react-cs', title: 'React 19 Hooks Cheatsheet', path: 'cheatsheets/react-cheatsheet.md', tags: ['React', 'Hooks', 'State'] },
    { id: 'node-cs', title: 'Node.js & Express Cheatsheet', path: 'cheatsheets/node-express-cheatsheet.md', tags: ['Node', 'Express', 'API'] },
    { id: 'mongo-cs', title: 'MongoDB CRUD Cheatsheet', path: 'cheatsheets/mongodb-cheatsheet.md', tags: ['MongoDB', 'NoSQL', 'Queries'] }
  ]
};

// 2. STATE MANAGEMENT
let currentTab = 'all';
let searchQuery = '';
let currentTheme = localStorage.getItem('portal_theme') || 'dark';

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  setupEventListeners();
  renderAllSections();
});

// 4. THEME TOGGLE
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

// 5. EVENT LISTENERS SETUP
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Live Search Input
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderAllSections();
    });
  }

  // Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      renderAllSections();
    });
  });

  // Modal Backdrop Click to Close
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
}

// 6. RENDER FUNCTIONS
function renderAllSections() {
  const topicsContainer = document.getElementById('topics-grid');
  const tasksContainer = document.getElementById('tasks-grid');
  const resourcesContainer = document.getElementById('resources-grid');
  const cheatsheetsContainer = document.getElementById('cheatsheets-grid');

  const topicsSection = document.getElementById('topics-section');
  const tasksSection = document.getElementById('tasks-section');
  const resourcesSection = document.getElementById('resources-section');
  const cheatsheetsSection = document.getElementById('cheatsheets-section');

  // Filter Topics
  const filteredTopics = DATA.topics.filter(item => matchFilter(item));
  const filteredTasks = DATA.tasks.filter(item => matchFilter(item));
  const filteredResources = DATA.resources.filter(item => matchFilter(item));
  const filteredCheatsheets = DATA.cheatsheets.filter(item => matchFilter(item));

  // Visibility based on Active Tab
  if (topicsSection) topicsSection.style.display = (currentTab === 'all' || currentTab === 'topics') ? 'block' : 'none';
  if (tasksSection) tasksSection.style.display = (currentTab === 'all' || currentTab === 'tasks') ? 'block' : 'none';
  if (resourcesSection) resourcesSection.style.display = (currentTab === 'all' || currentTab === 'resources') ? 'block' : 'none';
  if (cheatsheetsSection) cheatsheetsSection.style.display = (currentTab === 'all' || currentTab === 'cheatsheets') ? 'block' : 'none';

  // Render Grids
  if (topicsContainer) topicsContainer.innerHTML = filteredTopics.map(createTopicCard).join('');
  if (tasksContainer) tasksContainer.innerHTML = filteredTasks.map(createTaskCard).join('');
  if (resourcesContainer) resourcesContainer.innerHTML = filteredResources.map(createResourceCard).join('');
  if (cheatsheetsContainer) cheatsheetsContainer.innerHTML = filteredCheatsheets.map(createCheatsheetCard).join('');
}

function matchFilter(item) {
  if (!searchQuery) return true;
  const titleMatch = item.title && item.title.toLowerCase().includes(searchQuery);
  const descMatch = item.desc && item.desc.toLowerCase().includes(searchQuery);
  const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery));
  return titleMatch || descMatch || tagsMatch;
}

// 7. CARD CREATORS
function createTopicCard(topic) {
  return `
    <div class="card">
      <div class="card-top">
        <div class="card-header-row">
          <div class="card-icon">${topic.icon}</div>
          <span class="badge badge-topic">${topic.badge}</span>
        </div>
        <h3 class="card-title">${topic.title}</h3>
        <p class="card-desc">${topic.desc}</p>
        <div class="tag-list">
          ${topic.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openTopicModal('${topic.id}')">
          <span>View Notes</span> ➔
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
          <span class="badge badge-completed">Completed</span>
        </div>
        <h3 class="card-title">${task.title}</h3>
        <p class="card-desc">${task.desc}</p>
        <div class="tag-list">
          ${task.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-btn" onclick="openTaskModal('${task.id}')">
          <span>Task Details</span> ➔
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
          <span>Visit Resource</span> ↗
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

// 8. MODAL CONTROLLER
function openTopicModal(id) {
  const topic = DATA.topics.find(t => t.id === id);
  if (topic) {
    openModal(topic.title, topic.details);
  }
}

function openTaskModal(id) {
  const task = DATA.tasks.find(t => t.id === id);
  if (task) {
    openModal(task.title, task.details);
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
