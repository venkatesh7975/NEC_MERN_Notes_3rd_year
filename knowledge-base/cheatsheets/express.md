# Express quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/express.md) · [All quick references](README.md)

## Common contract

```text
app.use(express.json({limit:'16kb'}));
app.patch('/api/items/:id', requireSession, async (req,res) => {
  const result = await service.update(req.user.id, req.params.id, validate(req.body));
  res.json(result);
});
```

## Remember

Fragment requires the named dependencies. Keep API routes before fallback; Express 5 rejected returned Promises reach error handling.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
