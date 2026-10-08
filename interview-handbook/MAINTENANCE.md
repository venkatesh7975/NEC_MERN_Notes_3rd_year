# Handbook maintenance

Original source content lives in `scripts/build-handbook.py` and handwritten companion guides. Run `python scripts/build-handbook.py` to regenerate notes, question banks, scenarios, machine coding specifications, resource data, and CSV trackers. Run `python scripts/build-study-artifacts.py` for PDF and DOCX exports after installing `requirements-artifacts.txt`. Run `node scripts/build-study-workbook.mjs` using the documented artifact tool runtime for the workbook.

The PDF contains the notes, questions, scenarios, and machine coding approaches. The six-page Word document is an editable preparation plan and evidence worksheet. CSV and workbook exports preserve question and exercise ids so progress can be reconciled across formats. Downloads are committed so learners can use them directly.

The workbook generator uses `@oai/artifact-tool`, available in the Codex bundled Node runtime. Resolve that package in your local runtime before running it; workbook regeneration is optional for learners. PDF, DOCX, JSON, and CSV regeneration use ordinary Python dependencies listed in `scripts/requirements-artifacts.txt`. Run `pip install -r scripts/requirements-artifacts.txt` for document exports.

## Editorial contract

Prefer useful explanations and runnable evidence over inflated counts. Do not label briefs as completed apps. Mark company recommendations as recommendations; cite an official process source before claiming a company requirement. Do not redistribute paid courses or external ebooks. Retain external source licenses when incorporating any permitted material.

For a question, include a correct answer and an extension or failure case. For a scenario, include evidence, likely cause, fix, verification, and a common mistake. For a machine coding prompt, state required behavior, boundaries, and deliverables. For a project, document actual setup, tests, architectural decisions, and limitations.

## Verification

Run `npm test`, `npm run test:interview`, and `npm run check:handbook`. Install and build the MERN workspace separately, then run its API tests and browser smoke tests. Real MongoDB checks must run separately; an in-memory repository is not evidence of database behavior. Review the current [verification report](VERIFICATION.md) for the environment used and checks actually completed.

Review external URLs at least quarterly or after a reported failure. A successful HTTP response proves availability, not content accuracy or unchanged pricing. Record partial or inaccessible checks instead of claiming all links were verified.
