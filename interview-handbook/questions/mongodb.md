# Mongodb interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q041 Easy - When should you embed rather than reference?

<details>
<summary>Answer and follow-up</summary>

Embed bounded data that is read and updated with its parent. Reference independently owned entities or collections that grow without a useful bound. Model around access patterns and update invariants. MongoDB is flexible, but an application still needs schema and migration discipline.

**Follow-up:** How would you model comments on a popular post?

</details>

## Q042 Easy - What does an index do?

<details>
<summary>Answer and follow-up</summary>

An index maintains an ordered access structure so queries can locate matches without scanning every document. It consumes storage and adds write work. Inspect explain output on realistic data to see whether the index supports the actual filter and sort.

**Follow-up:** Why does indexing every field hurt?

</details>

## Q043 Easy - Is Mongoose unique a validator?

<details>
<summary>Answer and follow-up</summary>

unique declares an index intention. The database unique index enforces uniqueness and concurrent duplicate writes may produce E11000. Ensure the index exists and translate the conflict into an appropriate API response. An earlier findOne check alone is race-prone.

**Follow-up:** What about existing duplicates before adding the index?

</details>

## Q044 Medium - Explain a compound index.

<details>
<summary>Answer and follow-up</summary>

A compound index orders multiple fields. Its prefixes and key order affect which queries can use it efficiently. For a user-owned feed, {owner:1, createdAt:-1, _id:-1} can support a constrained ordered listing. Check filters, sort, and scanned keys rather than choosing an index from intuition alone.

**Follow-up:** How does a range predicate change your index choice?

</details>

## Q045 Medium - Compare offset and cursor pagination.

<details>
<summary>Answer and follow-up</summary>

Offset pagination is simple and allows page numbers, but large offsets do extra work and concurrent inserts can shift boundaries. Cursor pagination seeks after a stable sort tuple and is useful for feeds. Include a tie-breaker such as id and validate cursor format and scope.

**Follow-up:** Can users jump to page 50 with a cursor?

</details>

## Q046 Medium - When do you need a transaction?

<details>
<summary>Answer and follow-up</summary>

Single-document writes are atomic. A transaction is useful when a business invariant spans multiple documents and all changes must commit together. Transactions require a supported deployment, typically a replica set or sharded cluster. They add coordination cost and still need appropriate retry handling.

**Follow-up:** Can embedding remove the transaction requirement?

</details>

## Q047 Medium - What does lean do in Mongoose?

<details>
<summary>Answer and follow-up</summary>

lean returns plain objects instead of hydrated documents for a query. This can reduce memory and processing for read-only paths. Document methods and standard hydration behavior are absent, so check getters, virtuals, and serialization expectations before enabling it.

**Follow-up:** Would you use lean for a document you intend to save?

</details>

## Q048 Hard - How do you prevent selling the same last item twice?

<details>
<summary>Answer and follow-up</summary>

Use an atomic conditional update whose filter includes available stock, with an increment or decrement in the same operation. A read-then-write sequence races. If payment and reservation span services, design expiration, idempotency, and compensation rather than assuming one database transaction covers them.

**Follow-up:** How would you release an expired reservation?

</details>

## Q049 Hard - How do you detect and prevent lost updates?

<details>
<summary>Answer and follow-up</summary>

Include an expected version in the update predicate and increment it atomically. If no document matches, distinguish missing or unauthorized data from an owned version conflict without revealing another user's data. Tell the client to reload or resolve the conflict.

**Follow-up:** Can a timestamp be a reliable version token?

</details>

## Q050 Hard - What can make an aggregation slow?

<details>
<summary>Answer and follow-up</summary>

Large input cardinality, early fan-out, expensive sorts, broad lookups, and insufficiently selective predicates can cause work and memory pressure. Use explain, realistic sample data, suitable indexes, and early filters where semantically valid. Avoid returning unbounded results to the client.

**Follow-up:** When would you precompute a summary?

</details>
