# Content and future website architecture

## Current boundaries

```text
knowledge-base/
  topics/             canonical authored guides
  data/catalog.json   stable concept, guide, resource, priority, and graph records
  data/legacy-inventory.json  immutable baseline audit
  paths/              role and goal routes with exit evidence
  projects/           project ladder and implementation-status registry
  debugging/          broken code, expected/actual behavior, hints, fixes
  cheatsheets/        concise references linked to explanations
  diagrams/           Mermaid mental models and text descriptions
  resources/          evaluated publisher links and verification limitations
  templates/          contribution contracts
  explorer.html       search, priority/difficulty/depth filters, local progress
projects/knowledge-base/learning-lab/  six small runnable beginner apps
```

The existing classroom and interview trees are linked views. They are not the canonical boundary of technology coverage. Do not copy source implementations into multiple learning paths.

## Programmatic contract

Catalog schema version 1 has guides, concepts, resources, priority labels, and depth definitions. A concept has a stable id, title, area, priority, difficulty, importance, definition, depth, source path/anchor, prerequisites, related ids, resource ids, and lastVerified. A guide has prerequisite and related guide ids, estimatedMinutes, concept ids, status, and legacy paths. The validator checks graph references and prerequisite cycles, file and anchor evidence, priorities, template sections, and coverage consistency.

Author source is in `scripts/kb_content.py`, `kb_backend.py`, and `kb_engineering.py`. The build formats that reviewed data; it does not infer correctness or completeness. Regeneration is deterministic and uses standard-library Python. Legacy inventory pins a revision and reads Git blobs so later edits do not rewrite history.

## Website evolution

The shipped static explorer loads the catalog and safely renders known Markdown guides without interpreting arbitrary HTML. Its storage keys use stable concept ids. It needs only a local HTTP server, and can be hosted as static files after review.

A future documentation generator can compile these paths into accessible pages and a search index. Interactive examples should have explicit runtimes and isolated execution. Quizzes and coding challenges need independently authored expected outcomes. Project tracking needs implementation and verification status separate from learner completion. Analytics should be opt-in and avoid uploading private answers or progress by default. An AI tutor would consume source ids and verified excerpts, show provenance and uncertainty, and never mutate learner or repository state without an authorized action.

## Adding a technology

Add a guide id and concepts, assign priorities individually, declare prerequisites, write original examples and assessments, review publisher sources, update role paths when relevant, and regenerate. A new technology does not require another numbered classroom module. See [topic template](templates/topic.md) and [remaining work](REMAINING_WORK.md).

## Quality gates

`npm test` checks the preserved curriculum and the current knowledge graph. `npm run build:knowledge` regenerates content. `npm run check:knowledge` validates metadata, edges, sections, coverage, source references, and old-file preservation. `npm run test:learning-lab` exercises the beginner app models. Existing MERN API and browser tests remain separate because they have real runtime requirements.
