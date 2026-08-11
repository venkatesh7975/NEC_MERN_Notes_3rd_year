# ⚡ Node.js & Express Quick Reference Cheat Sheet

## Express Routing & Status Codes
```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/resource', (req, res) => res.status(200).json(data));
app.post('/api/resource', (req, res) => res.status(201).json(newItem));
app.put('/api/resource/:id', (req, res) => res.status(200).json(updated));
app.delete('/api/resource/:id', (req, res) => res.status(200).json({ success: true }));
```
