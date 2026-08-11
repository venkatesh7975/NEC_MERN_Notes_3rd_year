# HTML & CSS Interview Questions & Answers

### Q1: What is semantic HTML and why is it important for modern web applications?
**Answer**: Semantic HTML uses tags that convey the structural meaning of the content (e.g. `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`). It improves accessibility for screen reader users, optimizes SEO ranking for search crawlers, and ensures cleaner, maintainable codebases.

### Q2: What is the CSS Box Model and how does `box-sizing: border-box` work?
**Answer**: The Box Model consists of Content, Padding, Border, and Margin. Under default `content-box`, an element's total width is `width + padding + border`. Under `border-box`, padding and border are included within the specified width, preventing layout breakage.

### Q3: Explain CSS Flexbox vs. CSS Grid.
**Answer**: Flexbox is a 1-dimensional layout system optimized for aligning elements in either a single row or column. CSS Grid is a 2-dimensional layout system designed for managing rows and columns simultaneously.

### Q4: What is CSS Specificity and how is it calculated?
**Answer**: Specificity determines which CSS rule applies when multiple rules target the same element. It is calculated by weight: Inline Styles (1000) > IDs (100) > Classes/Attributes/Pseudo-classes (10) > Elements/Pseudo-elements (1).
