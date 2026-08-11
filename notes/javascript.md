# Comprehensive JavaScript (ES6+) Guide

## Introduction
JavaScript is the high-level, single-threaded, dynamic programming language of the web. Modern JavaScript (ES6 and beyond) powers frontend user interfaces, backend servers (via Node.js), mobile applications, and interactive web tools.

## Why We Need It
While HTML defines content structure and CSS provides visual presentation, JavaScript provides **behavior, logic, state, and interactivity**. JavaScript handles DOM updates dynamically, processes API network requests, validates form inputs, and manages user events in real-time.

## Syntax
```javascript
// Variable declarations
const courseName = "Full Stack MERN";
let totalStudents = 1200;

// Arrow function syntax
const calculateProgress = (completed, total) => {
  return Math.round((completed / total) * 100);
};

// Async/Await promise handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}
```

## Explanation
- **Variables (`const`, `let`)**: `const` creates immutable references; `let` creates block-scoped mutable variables. Avoid `var`.
- **Functions & Arrow Functions**: First-class citizens in JS; arrow functions preserve lexical `this`.
- **Promises & Async/Await**: Asynchronous programming mechanism to handle non-blocking operations without callback hell.
- **Array Methods (`map`, `filter`, `reduce`)**: Declarative methods for transforming, filtering, and aggregating collection data.
- **Destructuring & Spread Operator (`...`)**: Elegant syntax for unpacking properties from objects or arrays.

## Example 1: Array Manipulation & Higher Order Functions
```javascript
const students = [
  { id: 1, name: "Alice", score: 85, passed: true },
  { id: 2, name: "Bob", score: 42, passed: false },
  { id: 3, name: "Charlie", score: 92, passed: true },
  { id: 4, name: "Diana", score: 78, passed: true }
];

// 1. Filter passed students
const honorRoll = students.filter(student => student.score >= 80);

// 2. Map student names
const studentNames = students.map(student => student.name.toUpperCase());

// 3. Calculate average score using reduce
const averageScore = students.reduce((acc, curr) => acc + curr.score, 0) / students.length;

console.log("Honor Roll:", honorRoll);
console.log("Student Names:", studentNames);
console.log("Average Score:", averageScore.toFixed(2));
```

## Example 2: Async Data Fetching & Event Loop Execution
```javascript
class LMSDataManager {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async fetchCourses(category = "all") {
    try {
      const res = await fetch(`${this.apiBaseUrl}/courses?category=${category}`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const courses = await res.json();
      return courses;
    } catch (err) {
      console.error("Error loading courses:", err.message);
      return [];
    }
  }
}

// Instantiate & Usage
const lmsManager = new LMSDataManager("https://api.lms.com/v1");
lmsManager.fetchCourses("react").then(courses => console.log("Fetched Courses:", courses));
```

## Real World Example
Single Page Applications (SPAs) use JavaScript to fetch JSON data from REST APIs, update the HTML DOM dynamically using Virtual DOM or reactive state, store tokens in `localStorage` or `sessionStorage`, and route pages without full page refreshes.

## Best Practices
1. **Use `const` by Default**: Use `let` only when variable reassignment is explicitly required.
2. **Handle Promises with `try...catch`**: Always wrap `await` calls in `try...catch` blocks to prevent uncaught promise rejections.
3. **Use Strict Equality (`===`)**: Avoid loose equality (`==`) to prevent unexpected type coercion bugs.
4. **Utilize Modular ES Modules (`import`/`export`)**: Keep code decoupled and maintainable across multiple files.

## Common Mistakes
- Modifying state directly without creating immutable copies.
- Forgetting to handle loading or error states during asynchronous operations.
- Mutating array parameters directly inside functions instead of returning new arrays.
- Memory leaks caused by uncleaned event listeners or interval timers.

## Interview Questions
1. **Explain the Event Loop in JavaScript (Call Stack, Web APIs, Task Queue, Microtask Queue).**
   *Answer*: JavaScript executes synchronous code in the Call Stack. Asynchronous tasks (like `fetch` or `setTimeout`) are handed off to Web APIs. Resolved Promises enter the Microtask Queue, while timer callbacks enter the Task Queue. When the Call Stack is empty, the Event Loop pushes microtasks first, then tasks into the stack.
2. **What is a Closure and give a real-world use case?**
   *Answer*: A closure is a function bundled together with references to its surrounding lexical environment. Closures allow inner functions to access variables from an outer function scope even after the outer function has closed (e.g., creating private counter functions or custom hook state).
3. **What is the difference between `null` and `undefined`?**
   *Answer*: `undefined` means a variable has been declared but not yet assigned a value. `null` is an intentional assignment representing "no value" or empty object reference.

## Practice Problems
1. Implement a custom polyfill for `Array.prototype.map`.
2. Write a debounced search function that waits 300ms after the last keystroke before executing an API search query.

## Assignment
Build an interactive JavaScript Quiz Engine that loads questions from a JSON object, tracks timer countdown, calculates final percentage score, and saves high scores to `localStorage`.

## Summary
JavaScript is the backbone of full stack web engineering. Mastering ES6+ syntax, asynchronous programming, closure scope, and array operations is essential for React and Node.js mastery.
