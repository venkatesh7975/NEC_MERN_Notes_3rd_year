# Accessible UI machine coding lab

Runnable HTML, CSS, and JavaScript source for an independently expanded accordion, a native modal with focus return, and a task list with completion filters and one-level delete undo. User titles are rendered as text, not HTML. A pure reducer owns the task state.

From the repository root run `python -m http.server 8000`, then open `http://localhost:8000/projects/interview-ready/ui-lab/`. No npm install is needed. Run `node --test projects/interview-ready/ui-lab/state.test.js` for reducer checks.

Try the full interaction with a keyboard. Open and close the dialog with Escape and confirm focus returns. Add two tasks, complete one, delete it under a filter, and undo. This reference keeps data only in the current page session. Extensions: persist with a versioned storage schema, multi-level undo, or synchronized server state. Modern browsers supporting dialog and crypto.randomUUID are required.
