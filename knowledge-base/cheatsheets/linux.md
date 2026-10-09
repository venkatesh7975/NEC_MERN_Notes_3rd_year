# Linux quick reference

Priority: P0/P1 for core use; specialized operations remain in the linked guide.

[Explanation and prerequisites](../topics/devops.md) · [All quick references](README.md)

## Common contract

```text
ps -ef
df -h
ls -l
# Inspect service logs using the deployment service manager.
```

## Remember

Understand owner/group/mode, process lifetime, mounts, and networking before changing permissions. Avoid broad recursive permission changes.

## Verify before applying

Check the installed runtime, required surrounding values, permitted input, expected outcome, and failure behavior. Practice one changed input rather than copying a fragment without its contract.

Last verified: 2026-10-08; see the guide for publisher sources and execution limits.
