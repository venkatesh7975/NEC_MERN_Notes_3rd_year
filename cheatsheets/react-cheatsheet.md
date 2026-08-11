# ⚡ React 19 Quick Reference Cheat Sheet

## Common Hooks Syntax
```jsx
// useState
const [state, setState] = useState(initialValue);

// useEffect
useEffect(() => {
  // Side effect execution
  return () => { /* cleanup */ };
}, [dependencies]);

// useContext
const value = useContext(MyContext);

// useRef
const inputRef = useRef(null);
```
