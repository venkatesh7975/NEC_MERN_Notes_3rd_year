# Docker quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/devops.md) · [All quick references](README.md)

## Common contract

```text
docker compose ps
docker compose logs --tail=30
docker image ls
docker volume ls
```

## Remember

Run within the intended environment. Containers, images, and data volumes have different lifetimes.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
