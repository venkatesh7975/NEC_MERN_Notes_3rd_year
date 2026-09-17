# Mongoose interview preparation

## Explain the core idea

Question: Explain how Mongoose contributes to a web application.

Answer guide: Mongoose schemas provide application casting and validation. unique declares an index, not a validator. Save hooks and query updates are different paths; enable update validation deliberately. References do not automatically impose relational foreign key constraints. Distinguish validation failure from duplicate-key errors.

## Predict an output

Question: Trace the [worked example](../11-supplementary/mongoose/notes.md) without running it.

Expected result: Install Mongoose; run as .cjs. Prints min without a database connection. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy validate lesson titles and a maximum array length?

Answer criteria: cite the source implementation, demonstrate maximum plus one lesson fails, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
