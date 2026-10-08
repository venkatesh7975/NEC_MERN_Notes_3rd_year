# Typescript Career interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q091 Easy - What does TypeScript guarantee at runtime?

<details>
<summary>Answer and follow-up</summary>

Type annotations are erased and do not validate network responses at runtime. TypeScript catches many static mistakes when types are accurate. Parse unknown external values with runtime checks before trusting them. Avoid asserting a type merely to silence a compiler error.

**Follow-up:** Why is unknown safer than any?

</details>

## Q092 Easy - Compare an interface and a type alias.

<details>
<summary>Answer and follow-up</summary>

Both can describe object shapes. Interfaces support declaration merging and extension; aliases also represent unions, primitives, and other type expressions. Use a consistent convention and choose the feature required by the design. Neither creates runtime data or validation.

**Follow-up:** How would you represent loading, success, and error?

</details>

## Q093 Easy - How should you explain a portfolio project?

<details>
<summary>Answer and follow-up</summary>

State the user problem, your contribution, the key design choice, and a demonstrable result. Distinguish measurements from assumptions. Point to working source, tests, and setup instructions. Do not claim users, revenue, or latency numbers that you did not measure.

**Follow-up:** Which part would you redesign?

</details>

## Q094 Medium - What is a discriminated union useful for?

<details>
<summary>Answer and follow-up</summary>

A shared literal field lets the compiler narrow a value to a particular variant. A request state can have idle, loading, success with data, or error with a message. This prevents combinations such as success without data that arise from independent booleans.

**Follow-up:** How do you check exhaustiveness with never?

</details>

## Q095 Medium - How do generics improve reusable functions?

<details>
<summary>Answer and follow-up</summary>

A generic expresses a relationship between input and output types, such as identity<T>(value:T):T. Constraints limit allowed inputs without discarding their specific types. A generic parameter used only once may not add a useful relationship.

**Follow-up:** How would you type a key-based lookup?

</details>

## Q096 Medium - How should you answer a behavioral failure question?

<details>
<summary>Answer and follow-up</summary>

Use a specific situation, your responsibility, the action you actually took, and the outcome or lesson. Own your contribution without blaming others or inventing a perfect ending. Describe what changed afterward and what evidence supports the result.

**Follow-up:** What would you do differently now?

</details>

## Q097 Medium - How should you prepare for an unfamiliar startup?

<details>
<summary>Answer and follow-up</summary>

Read its product and role description, identify the workflows users rely on, and practice a relevant small build. Confirm interview format with the recruiter. Prepare questions about ownership, quality, operations, and constraints rather than memorizing rumored company question lists.

**Follow-up:** What would you ask about on-call work?

</details>

## Q098 Hard - How do you evaluate a technical tradeoff?

<details>
<summary>Answer and follow-up</summary>

State the requirement, compare alternatives using correctness, complexity, delivery time, and operations, then explain what evidence would change your choice. Name the downside of your selected option and a migration path. An absolute rule usually hides an unstated assumption.

**Follow-up:** When does your chosen design stop working?

</details>

## Q099 Hard - How do you prepare for a project deep dive?

<details>
<summary>Answer and follow-up</summary>

Trace one request from UI to persistence, explain validation and authorization, and rehearse a failure path. Know the indexes, concurrency behavior, tests, and deployment requirements of your own code. Be able to change one feature during the discussion.

**Follow-up:** Can you show a failing test and its fix?

</details>

## Q100 Hard - How do you close knowledge gaps without delaying applications forever?

<details>
<summary>Answer and follow-up</summary>

Use a concrete diagnostic: solve a JS exercise, complete a timed UI, build a protected API, and defend a project. Track observed weaknesses and revisit them with retrieval practice. Apply when you can demonstrate the role's core skills while continuing targeted practice.

**Follow-up:** Which evidence shows improvement over the last two weeks?

</details>
