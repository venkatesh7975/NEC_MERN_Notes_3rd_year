# API routes return HTML

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/express.md).

## Broken code

```javascript
app.use(express.static('dist'));
app.get('/{*splat}',(req,res)=>res.sendFile(appShell));
app.get('/api/tasks',listTasks);
```

## Expected behavior

API paths return JSON or a safe API error.

## Actual behavior

GET /api/tasks receives the app shell.

## Hints

Which matching handler responds first?

## Solution

<details>
<summary>Reveal the correction</summary>

```javascript
app.get('/api/tasks',listTasks);
app.use('/api',(req,res)=>res.status(404).json({error:{code:'NOT_FOUND'}}));
app.use(express.static('dist'));
app.get('/{*splat}',(req,res)=>res.sendFile(appShell));
```

</details>

## Explanation and root cause

The catch-all handler terminated the request before the API route. Express 5 route syntax is shown.

## How to prevent it

Keep the API boundary before the SPA fallback and test an unknown API path.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
