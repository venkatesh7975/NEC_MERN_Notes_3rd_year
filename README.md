# 🎓 MERN LMS — Full Stack Web Development Platform & Notes Repository

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

An all-in-one production-grade **Learning Management System (LMS)** and comprehensive **Web Development Educational Repository**. Designed for students, instructors, and developers learning Full Stack Web Development from HTML/CSS to Node.js, Express, MongoDB, MySQL, and Docker.

---

## ✨ Features

### 💻 LMS Application (`frontend/` & `backend/`)
- 🔒 **Role-Based Access Control**: Student, Instructor, and Admin dashboards with customized statistics and capabilities.
- 🔑 **Complete Auth Flow**: JWT registration, login, password reset, role assignment.
- 📚 **Interactive Course Catalog**: Filter courses by category (HTML, CSS, JS, React, Node, Express, MongoDB, MySQL), search, wishlist, and track progress.
- 📝 **Markdown & Code Viewer**: Markdown renderer with Table of Contents, dark/light syntax highlighting, and copy snippet buttons.
- ⚡ **Embedded Monaco Code Editor**: Interactive code playground embedded directly into course lessons.
- 🎯 **Quizzes & Graded Assignments**: Take topic-specific quizzes, submit assignments, and track grades.
- 📜 **Automated Certificate Generator**: Earn downloadable certificates upon course completion.
- 💬 **Discussion Forum & Announcements**: Course comments, student Q&A, and instructor announcements.
- 🏆 **Global Leaderboard**: Gamified student ranking based on quizzes passed and courses completed.
- 🎨 **Dark / Light Theme Support**: Modern Apple-inspired UI design built with React 19, Tailwind CSS, Framer Motion, and Lucide icons.

---

## 📌 Curriculum Tracking: Topics Covered & Assigned Tasks

### 📚 Topics Covered So Far
- **Full Stack Fundamentals & Architecture**:
  - Working of fullstack web applications.
  - Client-Server Request-Response Cycle.
  - Technologies used in the MERN Stack and their respective roles.
- **HTML5 & Web Content Structure**:
  - Creating structured webpage content using HTML.
  - Standard elements: Headings (`<h1>`-`<h6>`), Paragraphs (`<p>`), Links (`<a>`), Images (`<img>`), Tables (`<table>`), Forms (`<form>`), and input controls.
- **CSS3 & Styling Systems**:
  - Adding styles to websites (Inline, Internal, External styling).
  - Selectors & Rules: Tag, ID, Class selectors, Types of Styling, and Cascading specificity.
  - CSS Box Model properties (margin, border, padding, content).
  - Responsive Web Design: Media queries (`@media`), responsive layout breakpoints, and dynamic screen-size adaptive colors and typography.
- **JavaScript (JS) Core Programming**:
  - Data storage: Variables (`var`, `let`, `const`) and Operators.
  - Control Flow: Conditional statements (`if`, `else if`, `else`) and nested conditionals.
  - Iteration: Types of loops (`for`, `while`, `do-while`).
  - Logic & Reusability: Functions and Recursion fundamentals.

---

### 📝 Assigned Tasks
- `[x]` **Task 1**: Create a website that contains all types of HTML tags.
- `[x]` **Task 2**: Create a resume using HTML and CSS.
- `[x]` **Task 3**: Create a responsive website that adapts its content width and styles according to screen sizes.
- `[x]` **Task 4**: Solve basic problems on GeeksforGeeks using JavaScript.
- `[x]` **Task 5**: Start freeCodeCamp certification on Full Stack Web Development.
- `[x]` **Task 6**: Maintain an Excel track sheet of tasks that you have completed.
- ## Task 1: Counter Application

### Objective

Create a **Counter Application** using HTML, CSS, and JavaScript.

### Requirements

1. Display a heading:
   **Counter**

2. Display the current counter value.

   * Initial value should be `0`.

3. Create three buttons:

   * **Increment**
   * **Decrement**
   * **Reset**

4. Button functionality:

   * **Increment** → Increase the counter by `1`.
   * **Decrement** → Decrease the counter by `1`.
   * **Reset** → Set the counter back to `0`.

5. The **counter value color** should change based on its value:

   * Positive value → **Green**
   * Negative value → **Red**
   * Zero → **Black**

### Example

```text
             Counter

                3
              GREEN

       [ Increment ] [ Decrement ] [ Reset ]
```

If the user clicks **Decrement**:

```text
             Counter

               -1
               RED
```

If the user clicks **Reset**:

```text
             Counter

                0
              BLACK
```

### Important Requirement

The color must change **dynamically whenever the counter value changes**.

For example:

```text
0 → Black
1 → Green
2 → Green
3 → Green
2 → Green
1 → Green
0 → Black
-1 → Red
-2 → Red
```

### Concepts to Use

* Variables
* Functions
* DOM selection
* `textContent`
* `addEventListener()`
* Conditional statements (`if`, `else if`, `else`)
* DOM styling
* Click events

---

## Task 2: Background Color Toggle

### Objective

Create a webpage where the **background color changes every time the user clicks a button**.

### Requirements

1. Create a button:
   **Change Background**

2. Create an array containing **5 different colors**.

```js
const colors = ["red", "blue", "green", "yellow", "purple"];
```

3. Every time the user clicks the button:

   * Change the background to the next color.

4. After the fifth color, start again from the first color.

### Expected Sequence

```text
Click 1 → Red
Click 2 → Blue
Click 3 → Green
Click 4 → Yellow
Click 5 → Purple
Click 6 → Red
Click 7 → Blue
...
```

### Important Requirement

Use an **array and index** to implement the color change instead of writing separate conditions for each color.

### Concepts to Use

* Arrays
* Variables
* Functions
* Array indexing
* `addEventListener()`
* `document.body.style.backgroundColor`
* Modulo operator `%`

### ⭐ Bonus

Combine both applications into **one webpage** and create a clean, attractive UI.


---

## 📁 Repository Structure

```
MERN-LMS/
├── README.md                 # Main Documentation
├── ROADMAP.md                # Full Stack Learning Pathway
├── CONTRIBUTING.md           # Contribution Guidelines
├── LICENSE                   # MIT License
├── backend/                  # Node.js + Express + MongoDB REST API
│   ├── config/               # Database Connection & Cloud Config
│   ├── controllers/          # Business Logic for Auth, Courses, Quizzes
│   ├── middleware/           # JWT Auth & Role Authorization Middleware
│   ├── models/               # Mongoose Schemas (User, Course, Quiz, Certificate)
│   ├── routes/               # Express API Routes
│   ├── seed.js               # Database Seeder with Rich Sample Data
│   └── server.js             # API Entry Point
├── frontend/                 # React 19 + Vite + Tailwind CSS App
│   ├── src/
│   │   ├── components/       # UI Components (Sidebar, Navbar, Cards, Monaco Editor)
│   │   ├── context/          # Auth & Theme Context Providers
│   │   ├── pages/            # Student, Instructor, Admin Pages & Course Viewers
│   │   ├── services/         # Axios API Services
│   │   └── App.jsx           # App Routing & Core State
├── notes/                    # Comprehensive Topic-Wise Markdown Notes
│   ├── html.md               # HTML5 Fundamentals, Forms & SEO
│   ├── css.md                # CSS Flexbox, Grid, Animations & Responsiveness
│   ├── javascript.md         # ES6+, Async/Await, DOM, Event Loop
│   ├── react.md              # React 19 Hooks, State, Router, Context
│   ├── node.md               # Node Core, Event Loop, FS, Streams
│   ├── express.md            # Express Middleware, REST API, Routing
│   ├── mongodb.md            # NoSQL, Mongoose Schemas, Aggregations
│   ├── mysql.md              # SQL Basics, CRUD, Joins, Relational Schemas
│   ├── git.md                # Git Workflows, Branching, Pull Requests
│   ├── rest-api.md           # REST Standards, HTTP Verbs, Status Codes
│   ├── authentication.md     # JWT, bcrypt, Session Security, OAuth
│   ├── deployment.md         # Cloud Deployment (Vercel, Render, Atlas)
│   └── docker.md             # Docker Containers, Dockerfile, Docker Compose
├── code/                     # Runnable Code Examples
│   ├── html/                 # 001-basic, 002-intermediate, 003-advanced
│   ├── css/                  # 001-basic, 002-intermediate, 003-advanced
│   ├── javascript/           # 001-basic, 002-intermediate, 003-advanced
│   ├── react/                # 001-basic, 002-intermediate, 003-advanced
│   ├── node/                 # 001-basic, 002-intermediate, 003-advanced
│   ├── express/              # 001-basic, 002-intermediate, 003-advanced
│   ├── mongodb/              # 001-basic, 002-intermediate, 003-advanced
│   └── mysql/                # 001-basic, 002-intermediate, 003-advanced
├── projects/                 # Hands-on Project Specs & Source Code
│   ├── html-css-projects/    # Portfolio, Landing Pages
│   ├── javascript-projects/  # Quiz App, Weather App
│   ├── react-projects/       # E-Commerce Front, Task Manager
│   └── fullstack-projects/   # Capstone MERN LMS App
├── assignments/              # Topic-Wise Graded Exercises
├── interview-questions/      # Topic QA & System Design Basics
├── cheatsheets/              # One-Page Quick Reference Guides
└── resources/                # Recommended Books, Tools, & External Links
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB service or MongoDB Atlas URI

### 1. Clone & Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_lms
JWT_SECRET=super_secret_jwt_key_2026
```
Seed the database with initial sample courses, quizzes, and users:
```bash
npm run seed
```
Start the Node.js API server:
```bash
npm run dev
```

### 2. Setup & Launch Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 🛠️ Tech Stack Details

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Monaco Editor (`@monaco-editor/react`), Lucide Icons, React Markdown, Prism.js, Axios, React Router v6.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT (`jsonwebtoken`), bcryptjs, Cors, Express Validator.
- **Documentation**: GitHub Flavored Markdown, Prism Syntax Highlighting, Mermaid Diagrams.

---

## 📄 License
This repository is licensed under the [MIT License](LICENSE).
