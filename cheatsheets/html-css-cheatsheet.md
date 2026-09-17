# ⚡ HTML5 & CSS3 Quick Reference Cheat Sheet

## HTML5 Semantic Structure
```html
<header>Top Navigation & Logo</header>
<nav><a href="/">Home</a></nav>
<main>
  <article>Independent Content</article>
  <section>Grouped Theme Section</section>
  <aside>Sidebar / Related Links</aside>
</main>
<footer>Footer Copyright</footer>
```

## CSS Flexbox Cheat Sheet
```css
.container {
  display: flex;
  flex-direction: row; /* Alternative: column */
  justify-content: space-between; /* Alternatives: flex-start, center, space-around */
  align-items: center; /* Alternatives: stretch, flex-end */
  flex-wrap: wrap; /* Alternative: nowrap */
}
```

## CSS Grid Cheat Sheet
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
```
