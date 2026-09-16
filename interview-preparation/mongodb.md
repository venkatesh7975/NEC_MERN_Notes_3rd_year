# MongoDB interview preparation

## Explain the core idea

Question: Explain how MongoDB contributes to a web application.

Answer guide: MongoDB stores BSON documents in collections. Flexible shape still requires a data contract. Use precise filters, projections and targeted updates. Embed bounded data with a shared lifecycle; reference independent or growing data. Mongoose is an optional separate modeling layer, not MongoDB itself.

## Predict an output

Question: Trace the [worked example](../08-databases/mongodb/notes.md) without running it.

Expected result: Use mongosh in a fresh sandbox: CSS remains 14, HTML becomes 11. Repeated seeding needs a documented cleanup/upsert policy. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy aggregate hours by category?

Answer criteria: cite the source implementation, demonstrate 10 and 14 frontend hours aggregate to 24, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
