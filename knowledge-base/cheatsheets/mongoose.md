# Mongoose quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/mongoose.md) · [All quick references](README.md)

## Common contract

```text
schema.index({owner:1,url:1},{unique:true});
// Verify the database index.
const rows = await Model.find({owner}).lean();
// Lean returns plain values; check hydration needs.
```

## Remember

unique is an index declaration. Update validators and hooks depend on the method used.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
