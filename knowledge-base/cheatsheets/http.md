# HTTP quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/foundations.md) · [All quick references](README.md)

## Common contract

```text
200 success representation
201 created resource
400 invalid request; 401 credentials required
403 forbidden; 404 missing/unavailable
409 conflict; 429 rate limited; 500 unexpected server failure
```

## Remember

Status, content type, body, and headers form one response contract. Fetch does not reject merely because status is 404.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
