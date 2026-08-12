# Task 8: Background Color Toggle

## 📌 Objective
Create a webpage where the **background color changes every time the user clicks a button**.

## 🎯 Requirements

1. **Control Button**:
   - Create a button labeled **Change Background**.
2. **Color Array**:
   - Create an array containing 5 colors:
   ```javascript
   const colors = ["red", "blue", "green", "yellow", "purple"];
   ```
3. **Color Sequence**:
   - Every click changes the background to the next color in sequence.
   - After the 5th color, start again from the 1st color using array indexing and the modulo `%` operator.
   ```text
   Click 1 → Red
   Click 2 → Blue
   Click 3 → Green
   Click 4 → Yellow
   Click 5 → Purple
   Click 6 → Red ...
   ```
4. **Important Requirement**:
   - Use array indexing and modulo `%` operator instead of separate `if` conditions for each color.

## 💡 Concepts Used
- Arrays & Indexing
- Variables & Functions
- Modulo operator `%`
- `addEventListener()`
- `document.body.style.backgroundColor`

## ⭐ Bonus Requirement
Combine both Task 7 (Counter) and Task 8 (Color Toggle) into one clean, responsive webpage UI.

## 📁 Code Location
Upload code in: [`dailycodes/javascript/002-intermediate/color-toggle.html`](../dailycodes/javascript/002-intermediate/)
