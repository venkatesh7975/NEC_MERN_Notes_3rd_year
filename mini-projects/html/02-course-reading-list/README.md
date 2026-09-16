# Course reading list

ID: HTML-02. Status: specification ready; solution not supplied.

## Difficulty

🟢 Beginner. Estimated independent work: 1–2 hours. Industry means a handoff-oriented educational exercise, not a production certification.

## Technology

HTML

## Prerequisites

Web foundations. Read the [topic learning path](../../../02-html/README.md) first. Complete earlier projects or demonstrate equivalent skills.

## Learning Objectives

Represent content with meaningful elements and labeled forms. Apply this by building course reading list and explaining the acceptance example.

## Problem Statement

Build course reading list for a fictional college learning environment. The deliverable must demonstrate the specific behavior below using small reproducible fixtures. Use fictional records only.

## Features

- Build ordered study steps and an unordered reading list.
- include five working internal anchors.

## Functional Requirements

1. FR-1: Build ordered study steps and an unordered reading list. Provide an observation or test that proves this behavior.
2. FR-2: include five working internal anchors. Provide an observation or test that proves this behavior.

## Technical Requirements

Use HTML. Keep inputs, processing and presentation separable. Document dependency versions and runtime assumptions. Do not substitute screenshots for source code. Core alignment: HTML Essentials. Any advanced concepts introduced by this brief are extension practice.

## UI Requirements

Use semantic headings and labeled controls. Test at 360px and 1280px and with keyboard-only navigation. Show meaningful empty and error states where data is interactive.

## API Requirements

No additional public API is required beyond any route explicitly named in the features. Document any optional integration separately.

## Database Requirements

Persistent database storage is not required unless explicitly named above. Fixtures must be committed so a reviewer can reproduce the result.

## Validation Requirements

Check the bounds and constraints named in FR requirements. For user-entered data, distinguish missing, malformed and valid values. A rejected operation must not silently produce a success result or unwanted mutation. For static artifacts, validate markup, links and the specified observations.

## Expected Input

Prepare the fixture or interaction in this acceptance scenario: Selecting Week 2 moves to its matching section.

## Expected Output

Acceptance oracle: Selecting Week 2 moves to its matching section. Record the actual result next to the expected result in your test evidence.

## Edge Cases

Check long text, missing optional content and repeated interactions. Add the boundary condition implied by each FR rule and state the expected behavior before testing it. 

## Folder Structure

The supplied files are README.md, requirements.md and task.md. Student deliverables: solution/ containing source and its run README, evidence/ containing actual test records (screenshots only when useful), and references.md listing any reused assets or source material. No empty solution or screenshot directories are supplied.

## How to Run

Create index.html and any referenced local assets in solution/. Open index.html in a browser. Use developer tools to inspect elements and validate the behaviors below.

See [development setup](../../../00-course-overview/development-setup.md) for shared tooling. The commands above describe the student implementation contract; they are not executable until a solution is authored.

## Testing Checklist

- [ ] Each FR has a recorded pass/fail observation.
- [ ] The acceptance oracle matches actual output.
- [ ] Boundary and invalid cases have explicit expected outcomes.
- [ ] A peer can repeat the run from the submitted README.
- [ ] Source, dependencies and evidence agree; no simulated result is labeled live.

## Learning Outcomes

Demonstrate the project, trace input to result and explain one failed attempt and its correction. Represent content with meaningful elements and labeled forms.

## Extension Challenges

Add one contrasting fixture that stresses the main invariant: build ordered study steps and an unordered reading list. Compare the two results in a short design note. For Industry projects, include operational limits and recovery steps in the handoff.

## Interview Questions

1. How does build ordered study steps and an unordered reading list work in your solution?
2. Which input or state could violate this project's expected output, and how did you test it?
3. What would you change if a second user or a much larger dataset were introduced?

See [topic interview guide](../../../interview-preparation/html.md) for concept answer guidance.

## Resources

[Reference notes](../../../notes/html.md); [requirements and evidence table](requirements.md); [student work sequence](task.md).

