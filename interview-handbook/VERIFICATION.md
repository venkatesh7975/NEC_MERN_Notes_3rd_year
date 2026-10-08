# Verification evidence

Prepared on 2026-10-08. This report records checks actually run for the interview-resource upgrade. It does not certify an application for production or guarantee interview outcomes.

| Check | Result and scope |
| --- | --- |
| JavaScript toolkit | Seven behavioral tests passed: latest debounce call, cancellation and flush, LRU eviction, emitter snapshot and reentrant once, bounded promise concurrency, failures, and algorithm boundaries |
| MERN API | Ten tests passed against a real disposable MongoDB process, including persisted version conflicts, a real uniqueness index, two-user isolation, session revocation, validation, bounded lists, full expense summary, and exact money parsing |
| Production client | Vite production build completed successfully |
| Browser smoke | Passed in headless Microsoft Edge: registration, task movement and version, reading-list creation, exact expense total, reload, logout, keyboard accordion, Escape and modal focus return, undo, 375px overflow, question filtering, and progress persistence |
| Spreadsheet | Five sheets exported; changing a recall input updated dependent summary counts, then input was restored; formula and visual checks performed |
| Google Sheets | Native import completed; five tabs, formulas, date formats, score/status validation, question ids, and summary results read back; timezone set to Asia/Kolkata |
| Visual exports | All 40 PDF pages rendered and reviewed in contact sheets; a full-size code page inspected; all six DOCX pages rendered with LibreOffice and visually reviewed; all six SVG maps rendered in Edge; all five workbook previews and native Sheets tabs inspected |
| Original API regression | Existing course API test passed with its Express dependencies installed |
| Repository checks | Curriculum links, interview data, original reference examples, and nine new utility/UI tests passed; whitespace checks passed |
| External resources | 28 catalog entries reviewed through publisher pages; freeCodeCamp content extraction was unavailable and Chrome DevTools retrieval failed; those statuses are recorded in catalog.json |

The GitHub change is delivered on `codex/interview-resource-upgrade` for review. Original example coverage remains documented in the root verification report.

## Environment limits

Docker Desktop's engine was not running, so the Compose launch was not exercised here. The API checks used mongodb-memory-server with a real MongoDB process instead. LibreOffice was temporarily extracted from an official checksum-verified package for the Word visual check; its renderer produced the PDF and all six PNG pages, then reported a temporary-profile cleanup error. No rendering dependency is needed to read the committed downloads. API tests required local networking outside the restricted sandbox. Native browser inspection confirmed all five Google Sheets tabs after API readback. Hosted CI is configured separately from these local results.
