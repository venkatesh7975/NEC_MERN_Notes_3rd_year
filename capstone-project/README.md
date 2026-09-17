# Capstone: course companion

Supplementary synthesis project, proposed after the official 120-hour course. Estimated independent work: 24–40 hours. Status: build specification; no completed capstone implementation is supplied.

## Problem and scope

Build a small MERN course companion for fictional learners and faculty. It needs a public course catalog, learner enrollment and lesson progress, and faculty course editing. Keep live video, payments, code execution and certificate verification outside the required scope; the older LMS idea remains an optional expansion.

## Requirements

- Course: ID, title (1–120 trimmed characters), description (up to 2000 characters), ordered lessons with unique IDs.
- User: verified server identity and learner/faculty role; use fictional seeded accounts during development.
- Enrollment: unique user/course pair. Repeating enrollment must not create a duplicate.
- Progress: completed lesson IDs must belong to the course; repeated completion does not increase the count.
- Learners see and modify their own progress only. Faculty edit courses only after server authorization.
- UI shows loading, empty, validation, network failure and success states; support keyboard access and narrow screens.

## API and database contract

| Method and path | Behavior |
| --- | --- |
| GET /api/courses | Public bounded collection |
| GET /api/courses/:id | Course or 404 |
| POST /api/courses | Faculty only; validate fields; return 201 |
| PATCH /api/courses/:id | Faculty only; validate allowlisted fields |
| POST /api/enrollments | Learner enrolls self; unique pair enforced |
| GET /api/me/progress | Only authenticated learner's progress |
| PUT /api/me/progress/:courseId/:lessonId | Idempotent completion of a valid lesson |

Use 400 invalid data, 401 absent/invalid identity, 403 insufficient permission and 404 missing resource. Do not accept owner/role claims from request bodies. Keep MongoDB connection data server-side. Mongoose is optional; document the chosen validation layer and unique indexes.

## Milestones and module traceability

| Milestone | Official modules | Evidence |
| --- | --- | --- |
| Requirements and page prototype | 1, 2, 3 | Request diagram, semantic layout, responsive screenshots |
| Interaction and component state | 4, 5 | Filtering and progress tests |
| API and persistence | 6, 7, 8 | HTTP transcripts, seed scripts, SQL comparison exercise |
| Release and security review | 9, 10 | Build instructions, rollback plan, ownership/XSS/CSRF review |

Authentication and integration are supplementary. Show a SQL enrollment join as a separate comparison exercise; do not force two databases into the app without a requirement.

## Acceptance scenario

Seed one course with four lessons and two learners A/B. A enrolls once and completes two lessons: A sees 50% after reload. Repeating a completion keeps 50%. B cannot access or mutate A's progress by changing IDs. An unknown lesson returns an error with no mutation. A failed API request leaves a visible retry path instead of claiming success.

## Deliverables and how to run

Submit client/ and server/ source, manifests and lockfiles, .env.example placeholders, deterministic seed/reset scripts, API contract, evidence.md and a deployment runbook. README must specify node version, install/start/build/test commands and ports. Run from a fresh checkout; database setup must precede server startup. No real student data, secrets or credentials belong in Git.

## Assessment

Functional behavior 30, persistence/invariants 20, authorization/validation 20, UI/accessibility 10, reproducibility/tests 10, viva/design explanation 10. Passing the central scenario is a recommended prerequisite for portfolio inclusion. Faculty controls official grades.

## Extension challenges and interview defense

Add feedback review history, safe retry for interrupted writes or an operational health check after core behavior passes. Explain why a repeated completion is idempotent, where uniqueness is enforced, and what happens when the database becomes unavailable mid-request.
