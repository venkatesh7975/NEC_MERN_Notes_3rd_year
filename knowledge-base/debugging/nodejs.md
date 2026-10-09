# Async code blocks all requests

Priority: P0 for failure reasoning; technology prerequisites follow the [topic guide](../topics/nodejs.md).

## Broken code

```javascript
app.get('/report',async(req,res)=>{
  const result=expensiveSynchronousComputation();
  res.json(result);
});
```

## Expected behavior

Other requests remain responsive during a report.

## Actual behavior

Unrelated request latency rises while JavaScript computes.

## Hints

Profile CPU and event-loop delay. What does async actually change?

## Solution

<details>
<summary>Reveal the correction</summary>

```javascript
// Architecture fix: submit bounded work to a worker/job executor.
const job=await jobs.submit(validatedReportInput);
res.status(202).json({jobId:job.id});
```

</details>

## Explanation and root cause

async changes return/await behavior; it does not move synchronous computation off the executing thread.

## How to prevent it

Bound work and profile the actual bottleneck. This solution is pseudocode requiring a job system.

## Verification

Reproduce the actual behavior, apply the fix in the stated runtime, and assert the expected behavior with the relevant boundary: pure output, real database, browser, Git snapshot, or deployment topology. [Existing scenario bank](../../interview-handbook/scenarios/README.md) provides additional cases.

[All challenges](README.md)
