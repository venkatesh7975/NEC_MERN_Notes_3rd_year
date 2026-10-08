# Sessions API security and ownership

[Handbook](../README.md) | [Practice questions](../questions/security-api.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Establish trusted identity

Use a password-specific hash and unique salt. With server sessions, store a digest of a high-entropy session token and expire it. Set HttpOnly, Secure in HTTPS production, and an appropriate SameSite cookie policy.

Logout should revoke the server session as well as clear the browser cookie. Changing password or account status may require broader session revocation.

## Authorize every operation

Use the authenticated user id in queries for listing, reading, updating, and deleting. Reject client-owned ownership fields. A public resource id is not permission.

Return a safe missing-resource response to another user instead of revealing whether their id exists. Test cross-user access for every endpoint, not only the UI.

## Constrain input and side effects

Validate scalar types and allowed values. Build explicit writes rather than spreading untrusted input. Restrict URL schemes and avoid fetching user-supplied URLs unless necessary.

Cookie-authenticated writes need CSRF defenses. The reference workspace uses same-origin deployment, a strict Origin check on writes, JSON bodies, and SameSite cookies. If deployment becomes cross-origin, revisit the whole contract.

## Worked example

```js
const task = await tasks.findOne({_id: requestedId, owner: req.user.id});
if (!task) return res.status(404).json({error: "NOT_FOUND"});
// Never take owner from req.body or a user-controlled header.
```

## Demonstrate understanding

Use two accounts and verify that lists, updates, and deletes do not cross ownership boundaries.

## Reference

[Primary learning reference](https://cheatsheetseries.owasp.org/). Prefer the documentation matching the version you install.
