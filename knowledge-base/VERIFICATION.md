# Verification evidence

Reviewed 2026-10-08. The catalog's lastVerified records source review, not execution of every snippet. Worked-example depth identifies an example in a guide; runtime assumptions and expected scope are stated there.

## Executed checks

- `npm test` passed: all documentation/graph/handbook checks and 20 behavioral tests (five preserved reference examples, nine interview utility/UI tests, six learning-model tests).
- The graph validator passed for 25 guides, 375 concepts, 51 resource entries, ten learning paths, and 20 project packets; it checked metadata, required sections, graph references/cycles, anchors, coverage consistency, and preservation of all 920 baseline file paths.
- The optional headless Edge browser integration check passed: filters, safe guide rendering, progress persistence and CSV export, storage-unavailable feedback, all six learning apps, keyboard focus, 375px mobile overflow checks, and no page errors.
- Weather browser checks used controlled responses to verify stale-response protection and malformed-response recovery. The adapter checks also cover HTTP 429, response shape, and cancellation signals.
- Six learning-model behavioral tests passed: calculator validation, exact money/category totals, quiz identity, coordinates, stored-note schema/limits, and weather contracts.
- The catalog covers all 371 concept requirements extracted from the user master prompt, with four additional bridging/reference concepts.
- Desktop screenshots for the explorer and learning lab were visually inspected. Mobile overflow was measured; the long mobile guide screenshot is supplementary evidence rather than a complete screen-reader audit.

## Reproduction

Run `npm test` for documentation, graph, preserved curriculum, handbook, reference examples, interview utilities and learning-model checks. Run `npm run build:knowledge` and review the resulting diff for deterministic generation.

The optional browser check is `node scripts/verify-knowledge-browser.cjs`. It needs Playwright installed locally (`npm install --no-save playwright`) and its Chromium browser (`npx playwright install chromium`), or set BROWSER_CHANNEL=msedge to use installed Edge. Those dependencies are not required for the static apps. It serves the repository on a disposable loopback port and saves screenshots under ignored tmp/knowledge-browser. It uses a fresh browser context rather than an existing personal profile.

Prior interview artifacts and real MongoDB checks have [separate evidence](../interview-handbook/VERIFICATION.md).

Historical guides with navigation adapters retain their original content and do not receive a blanket execution claim. Docker operating and hosted deployment remain unverified. Weather browser tests use deterministic provider-shaped fixtures; they do not certify live provider availability. [Remaining work](REMAINING_WORK.md) records these gaps.
