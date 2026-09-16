# Repository audit and migration decisions

Baseline: `c93be57` (91 tracked files). Audit precedes curriculum authoring. Scope: all tracked Markdown, HTML, CSS, JavaScript, JSX, SQL, configuration and license files, plus the supplied syllabus.

## Findings

| Area | Evidence | Educational action |
| --- | --- | --- |
| Syllabus | 10 modules, 120 hours; no unit-level outcomes | Preserve module order and hours; distinguish designed activities from official wording |
| Notes | 13 broad guides; examples often assume unavailable models or services | Preserve reference guides; add progressive topic lessons and clear runtime labels |
| Projects | Seven short project ideas across four indexes; one counter/color implementation | Separate specification status from implementation; build indexed practice bank |
| Tasks | Eight task files; index also references missing task9/task10 and repeats paths for 11/12 | Preserve historical requirements; supply clarified packets and restore navigation |
| Fundamentals | JavaScript basic code starts with filter/map/reduce rather than conditions/loops | Add earlier data-type and loop practice |
| Database | MongoDB examples use Mongoose, with no direct shell CRUD path | Separate MongoDB and supplementary Mongoose; retain SQL in official module 8 |
| Execution | React snippets lack a host app; Express lacks dependencies; SQL advanced references absent tables | Add honest run prerequisites and repair broken examples |
| Duplicates | ClassProjects and javascript/p3 parity/theme copies have identical hashes | Preserve classroom URLs; mark canonical path and maintain parity of fixes |
| Incomplete code | Both theme scripts end in an unterminated string | Complete the toggle and verify syntax |
| Security | Header-based admin simulation; CORS and HttpOnly described as broad protection | Label simulations and correct trust-boundary explanations |
| Portal | Static 100% progress and completed badges without student evidence | Replace completion claims with neutral course navigation |
| Contribution guide | Refers to missing code/, frontend/ and backend/ trees | Align contributions with real curriculum paths |
| Roadmap | Mixes extra libraries with official coverage; enormous LMS scope | Preserve core hours and make supplementary extension workload explicit |

## Architecture and preservation

Numbered module landing pages follow the source. Express and REST share module 7 but have distinct practice tracks; SQL and MongoDB share module 8. Existing notes/, dailycodes/, projects/, cheatsheets/ and interview-questions/ remain addressable. New canonical practice and specification banks are linked from modules; do not duplicate implementations across new module folders. Existing examples are examples, not student submissions. Student work belongs in student forks, not shared example paths.

The complete topic-to-artifact map is [learning-map.json](resources/learning-map.json); the human-readable path is [CURRICULUM.md](CURRICULUM.md). Mongoose, authentication workflows and full stack integration are supplementary tracks. The project bank is a choice bank, not 150 mandatory classroom projects. No project is marked implemented merely because a brief exists.

## Verification policy

Check internal file links, required document sections, unique project IDs, ten projects per track, source hour totals and JavaScript syntax. Execute dependency-free examples where safe. A syntax check is not a browser, database or deployment test. Record external-service and example runtime limitations in [example status](resources/example-status.md).

