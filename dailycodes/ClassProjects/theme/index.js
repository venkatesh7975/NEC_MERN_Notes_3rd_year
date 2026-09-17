const root = document.getElementById("root");
const button = document.createElement("button");
button.type = "button";
button.textContent = "Use dark theme";
button.setAttribute("aria-pressed", "false");
root.appendChild(button);
root.style.minHeight = "100vh";
let isDark = false;
button.addEventListener("click", () => {
  isDark = !isDark;
  root.style.backgroundColor = isDark ? "black" : "green";
  root.style.color = "white";
  button.textContent = isDark ? "Use green theme" : "Use dark theme";
  button.setAttribute("aria-pressed", String(isDark));
});
