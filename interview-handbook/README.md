# MERN interview and project handbook

Build the skills to explain, implement, debug, and defend a web application. This handbook prioritizes product companies and startups, from first frontend roles through engineers taking ownership of full-stack features. The original NEC curriculum remains available alongside this preparation track.

## Choose your next step

| Need | Start here | Evidence of learning |
| --- | --- | --- |
| Learn from the beginning | [12-week roadmap](roadmaps/README.md) | Complete one exercise and explain it without notes |
| Prepare for interviews | [100 questions with answers](questions/index.md) | Answer and defend the follow-up, difficulty by difficulty |
| Diagnose real failures | [24 scenario walkthroughs](scenarios/README.md) | Name evidence, cause, fix, and regression check |
| Practice timed builds | [16 machine coding specifications](machine-coding/README.md) | Runnable core flow and scored acceptance evidence |
| Target a company | [Company preparation playbooks](companies/README.md) | Role-specific practice plus recruiter-confirmed format |
| Build a portfolio | [Runnable source projects](../projects/interview-ready/README.md) | Tested behavior, setup instructions, and a project deep dive |
| Revise visually | [Six mind maps](mindmaps/README.md) | Reconstruct a map from memory and explain its edges |
| Track progress | [Downloads and Google Sheets](downloads/README.md) | Review weak answers and record timed attempts |
| Find outside courses | [Curated resource catalog](resources/README.md) | Pick one primary course and build independently |
| Search and self-test | [Study explorer](study.html) | Filter questions and save local progress |

## Structured notes

1. [Web foundations and semantic HTML](notes/01-web-html.md)
2. [CSS layout and responsive interfaces](notes/02-css.md)
3. [JavaScript values, closures, and asynchronous work](notes/03-javascript.md)
4. [React state, effects, and resilient UI](notes/04-react.md)
5. [Node and Express request architecture](notes/05-node-express.md)
6. [MongoDB modeling, indexes, and concurrency](notes/06-mongodb.md)
7. [Sessions, API security, and ownership](notes/07-security.md)
8. [Testing, debugging, and delivery](notes/08-testing.md)
9. [System design for product engineers](notes/09-design.md)
10. [TypeScript and explicit domain states](notes/10-typescript.md)

Supplement these revision notes with the detailed classroom [technology guides](../notes) and [official curriculum](../CURRICULUM.md). For algorithms and communication, use [coding patterns](dsa/README.md) and the [project defense worksheet](companies/project-defense.md).

## Practice loop

Read one concept, close the guide, explain it aloud, implement a small example, and test a boundary case. Score your answer from 0 to 3 and revisit weak answers after 1, 3, 7, and 14 days. A memorized definition earns less evidence than a correct example and a justified tradeoff.

No repository can guarantee selection at every company. The company playbooks distinguish official process references from original practice recommendations. The projects are educational references with explicit limitations, not audited production systems.

## Run and verify

```bash
npm test
npm run test:interview
npm run check:handbook
python -m http.server 8000
# Open http://localhost:8000/interview-handbook/study.html
```

Project dependencies and database setup are documented in the [source project index](../projects/interview-ready/README.md). Downloads are generated from [structured source](data/study-data.json); see [maintenance](MAINTENANCE.md) for regeneration and actual verification evidence.
