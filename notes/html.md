# Comprehensive HTML5 Guide & Reference

## Introduction
HyperText Markup Language (HTML) is the standard markup language used to structure and present content on the World Wide Web. HTML5 is the latest major revision of the HTML standard, introducing semantic elements, media tags, native form validation, and APIs for rich client-side applications.

## Why We Need It
HTML forms the skeleton of every website and web application. Without HTML, web browsers would not know how to display text, render images, structure headings, or create links between pages. HTML ensures content is accessible, indexable by search engines (SEO), and structured logically for screen readers and styling engines (CSS).

## Syntax
HTML elements consist of tags wrapped in angle brackets `< >`, attributes, and content:
```html
<tagname attribute="value">Content goes here</tagname>
```
Self-closing elements do not require a closing tag:
```html
<img src="logo.png" alt="Company Logo" />
```

## Explanation
- **Doctype (`<!DOCTYPE html>`)**: Declares the document as HTML5 to the browser.
- **Root Element (`<html>`)**: Wraps all HTML content on the page.
- **Head (`<head>`)**: Contains metadata, character encoding (`<meta charset="UTF-8">`), title, and linked stylesheets.
- **Body (`<body>`)**: Contains all visible content displayed on the webpage.
- **Semantic Elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)**: Provide meaningful context to the document structure for accessibility and SEO.

## Example 1: Basic HTML5 Starter Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A comprehensive guide to HTML5 starter template">
  <title>HTML5 Starter Page</title>
</head>
<body>
  <header>
    <h1>Welcome to Full Stack Web Development</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About Our LMS</h2>
      <p>Our platform empowers students to master modern web technologies through hands-on practice.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 MERN LMS. All rights reserved.</p>
  </footer>
</body>
</html>
```

## Example 2: Interactive HTML5 Form with Native Validation
```html
<form action="/api/register" method="POST">
  <div class="form-group">
    <label for="fullname">Full Name:</label>
    <input type="text" id="fullname" name="fullname" required minlength="3" placeholder="John Doe">
  </div>

  <div class="form-group">
    <label for="email">Email Address:</label>
    <input type="email" id="email" name="email" required placeholder="john@example.com">
  </div>

  <div class="form-group">
    <label for="role">Select Role:</label>
    <select id="role" name="role" required>
      <option value="">-- Choose a Role --</option>
      <option value="student">Student</option>
      <option value="instructor">Instructor</option>
    </select>
  </div>

  <button type="submit">Register Account</button>
</form>
```

## Real World Example
Modern e-commerce product pages use HTML semantic tags (`<article>`, `<section>`, `<aside>`) to present product images, descriptions, pricing tables, and user reviews. Search engine crawlers (Google, Bing) rely on `<meta>` description, OpenGraph tags (`<meta property="og:title">`), and `<h1>`-`<h6>` hierarchy to index products accurately in search results.

## Best Practices
1. **Always Use Semantic Tags**: Replace generic `<div>` tags with `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
2. **Provide Accessibility (a11y) Attributes**: Always include descriptive `alt` attributes on `<img>` tags and `for` attributes matching `id` on form labels.
3. **Use Lowercase Tags & Proper Nesting**: Ensure HTML tags are written in lowercase and properly closed in nesting order.
4. **Optimize for Mobile**: Always include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

## Common Mistakes
- Using multiple `<h1>` tags on a single page (there should ideally be only one main `<h1>` per document).
- Omitting `alt` text on images, breaking accessibility for screen readers.
- Nesting block-level elements (like `<div>` or `<p>`) inside inline elements (like `<a>` or `<span>`).
- Forgetting `label` elements for form inputs, creating poor mobile touch targets and accessibility errors.

## Interview Questions
1. **What is the difference between HTML semantic elements and non-semantic elements?**
   *Answer*: Semantic elements (like `<article>`, `<nav>`) clearly describe their meaning to both the browser and the developer, improving accessibility and SEO. Non-semantic elements (like `<div>`, `<span>`) tell nothing about their content.
2. **What are data attributes (`data-*`) in HTML5?**
   *Answer*: Data attributes allow storing custom extra information on standard HTML elements without using non-standard attributes. They can be accessed easily via JavaScript `element.dataset`.
3. **What is the difference between `<script>`, `<script async>`, and `<script defer>`?**
   *Answer*: Standard `<script>` blocks HTML parsing while fetching and executing. `async` fetches script asynchronously while parsing HTML and executes it immediately when loaded. `defer` fetches asynchronously and delays execution until HTML parsing completes.

## Practice Problems
1. Create a registration page with fields for Full Name, Email, Password, Age (number input), and Terms acceptance checkbox with HTML5 validations.
2. Build an accessible navigation bar containing logo, menu links, and search input with proper ARIA labels.

## Assignment
Construct a semantic HTML5 single-page resume featuring a Header (Name, Title, Contact), Profile Summary, Work Experience list, Skills section, Education table, and Contact Form.

## Summary
HTML5 forms the core foundation of web development. Writing clean, semantic, accessible, and structured HTML ensures high search engine visibility, fast performance, and a seamless user experience across all devices.
