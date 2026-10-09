# Verification evidence

Updated 2026-10-09. The catalog's lastVerified records source review, not execution of every snippet. Worked-example depth identifies an example in a guide; runtime assumptions and expected scope are stated there.

## Executed checks

- `npm test` passed: all documentation/graph/handbook checks and 34 behavioral fixtures (five preserved reference examples, nine interview utility/UI tests, six learning-model tests, fourteen executable concept boundaries).
- The graph validator passed for 25 guides, 375 concepts, 51 resource entries, ten learning paths, and 20 project packets; it checked metadata, required sections, graph references/cycles, anchors, coverage consistency, and preservation of all 920 baseline file paths.
- The optional headless Edge browser integration check passed: filters, safe guide rendering, progress persistence and CSV export, storage-unavailable feedback, all six learning apps, keyboard focus, 375px mobile overflow checks, and no page errors.
- Weather browser checks used controlled responses to verify stale-response protection and malformed-response recovery. The adapter checks also cover HTTP 429, response shape, and cancellation signals.
- Six learning-model behavioral tests passed: calculator validation, exact money/category totals, quiz identity, coordinates, stored-note schema/limits, and weather contracts.
- The catalog covers all 371 concept requirements extracted from the user master prompt, with four additional bridging/reference concepts.
- Desktop screenshots for the explorer and learning lab were visually inspected. Mobile overflow was measured; the long mobile guide screenshot is supplementary evidence rather than a complete screen-reader audit.
- MERN workspace API suites passed 21 cases against real MongoDB, including a replica set for transactional products: ownership/roles, enrollment, restricted attachments, visibility, stored-version races, independent approval, inventory races, operation replay, concurrent signed payment deliveries and SSE replay.
- The original MERN browser check passed registration, all three base apps, reload/logout, UI keyboard/focus, mobile widths and study progress.
- The product browser check passed eleven workflows, real generated WebM/captions, tiny PDF upload/restricted download, safe posts, persistence, mobile overflow and no page errors. Desktop/mobile screenshots were inspected.
- All 20 ladder entries link runnable core learning source. The product scope matrix separates those cores from advanced extensions and external integrations.
- Full-guide PDF: 124 pages rendered; every page contains substantive text. Contact sheets were inspected; Unicode code fonts and grouped resource sections prevent lost symbols and isolated final review lines.
- Workbook: all four previews were inspected. Native Google Sheets has 375 concept rows, 20 project rows, 51 dated resource rows, native dropdown chips and a numeric recall column. Changing status/recall/project evidence produced summary counts 1/1/1; restoring the blank template produced 0/0/0. Every tab was inspected in Google Sheets. Sharing remains private.
- Bounded HTTP reachability check: all 48 unique URLs in the primary resource catalog returned successfully on 2026-10-09. This did not change content-review dates or establish video/caption quality. Six additional full-course selections have reviewed publisher outlines and YouTube destinations, with age/version caveats.

## Reproduction

Run `npm test` for documentation, graph, preserved curriculum, handbook, reference examples, interview utilities and learning-model checks. Run `npm run build:knowledge` and review the resulting diff for deterministic generation.

The optional browser check is `node scripts/verify-knowledge-browser.cjs`. It needs Playwright installed locally (`npm install --no-save playwright`) and its Chromium browser (`npx playwright install chromium`), or set BROWSER_CHANNEL=msedge to use installed Edge. Those dependencies are not required for the static apps. It serves the repository on a disposable loopback port and saves screenshots under ignored tmp/knowledge-browser. It uses a fresh browser context rather than an existing personal profile.

Prior interview artifacts and real MongoDB checks have [separate evidence](../interview-handbook/VERIFICATION.md).

Historical guides with navigation adapters retain their original content and do not receive a blanket execution claim. The local Windows Docker engine was unavailable; the separate GitHub container job supplies restart/restore evidence when green. Public hosting, TLS and real payment processing are not claimed. Weather browser tests use deterministic provider-shaped fixtures; they do not certify live provider availability. [Maintenance roadmap](REMAINING_WORK.md) records extension and depth opportunities.
