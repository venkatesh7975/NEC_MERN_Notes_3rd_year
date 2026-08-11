# ⚡ JavaScript ES6+ Quick Reference Cheat Sheet

## Array Methods
```javascript
// Map (transform elements)
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]

// Filter (keep matching elements)
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]

// Reduce (accumulate total)
const sum = [10, 20, 30].reduce((acc, curr) => acc + curr, 0); // 60
```

## Promises & Async/Await
```javascript
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
```
