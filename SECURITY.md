# Security reporting and example scope

Runnable applications are learning examples with documented limits. Review their README and [production gate](knowledge-base/projects/PRODUCTION_GATE.md) before using them with real users or sensitive data.

Report vulnerabilities privately through GitHub **Security → Report a vulnerability** if private reporting is enabled. Otherwise use a private contact method on [the maintainer's profile](https://github.com/venkatesh7975). If neither is available, ask for private reporting to be enabled without disclosing exploit details. This policy does not claim the GitHub option is already enabled.

Include the affected revision, minimal reproduction, expected/actual behavior, impact, and suggested fix if available. Exclude real credentials and other people's data. Do not open a public issue containing secrets or a working exploit. Maintainers should agree on disclosure and add regression checks when fixing issues; no response-time guarantee is implied.

Supported example behavior is the documented current runtime. Historical snippets do not promise ongoing security support. Never commit private keys, tokens, personal database dumps, or .env files. Revoke exposed credentials through their issuer: deleting a file from the latest commit does not revoke its contents.
