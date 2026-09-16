# CSS interview preparation

## Explain the core idea

Question: Explain how CSS contributes to a web application.

Answer guide: CSS controls presentation through the cascade and layout. Specificity compares tuples rather than decimal scores; origin, importance and layers also participate. Border-box includes padding and borders in width, but not margin. Flexbox lays out one dimension; Grid coordinates rows and columns. Use content needs to choose breakpoints.

## Predict an output

Question: Trace the [worked example](../03-css/notes.md) without running it.

Expected result: Apply to three child cards: one column below 48rem, three above. Explain the input, operation and result, then introduce one boundary input and explain any required validation.

## Defend a project

Question: How did you satisfy use one, two and three columns at 360, 768 and 1280px?

Answer criteria: cite the source implementation, demonstrate nine cards remain readable at all three widths, then show a failing input and explain its handling. Discuss one tradeoff and one limitation.
