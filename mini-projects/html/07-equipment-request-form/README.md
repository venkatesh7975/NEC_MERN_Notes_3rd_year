# Equipment request form

ID: HTML-07. Status: specification ready; solution not supplied.

## Difficulty

🔴 Advanced. Estimated independent work: 5–8 hours. Industry means a handoff-oriented educational exercise, not a production certification.

## Technology

HTML

## Prerequisites

Web foundations. Read the [topic learning path](../../../02-html/README.md) first. Complete earlier projects or demonstrate equivalent skills.

## Learning Objectives

Represent content with meaningful elements and labeled forms. Apply this by building equipment request form and explaining the acceptance example.

## Problem Statement

Build equipment request form for a fictional college learning environment. The deliverable must demonstrate the specific behavior below using small reproducible fixtures. Use fictional records only.

## Features

- Group requester and equipment fields with fieldset/legend.
- set quantity bounds 1 to 5 and required return date.

## Functional Requirements

1. FR-1: Group requester and equipment fields with fieldset/legend. Provide an observation or test that proves this behavior.
2. FR-2: set quantity bounds 1 to 5 and required return date. Provide an observation or test that proves this behavior.

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

Prepare the fixture or interaction in this acceptance scenario: Quantity 0 fails browser validation.

## Expected Output

Acceptance oracle: Quantity 0 fails browser validation. Record the actual result next to the expected result in your test evidence.

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

Add one contrasting fixture that stresses the main invariant: group requester and equipment fields with fieldset/legend. Compare the two results in a short design note. For Industry projects, include operational limits and recovery steps in the handoff.

## Interview Questions

1. How does group requester and equipment fields with fieldset/legend work in your solution?
2. Which input or state could violate this project's expected output, and how did you test it?
3. What would you change if a second user or a much larger dataset were introduced?

See [topic interview guide](../../../interview-preparation/html.md) for concept answer guidance.

## Resources

[Reference notes](../../../notes/html.md); [requirements and evidence table](requirements.md); [student work sequence](task.md).

