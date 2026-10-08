# Html Css interview questions

[Handbook](../README.md) | [All question ids](index.md)

Difficulty is an editorial learning classification. Questions are original practice, not a company question leak. Cover the answer before attempting recall.

## Q001 Easy - Why use a button instead of a clickable div?

<details>
<summary>Answer and follow-up</summary>

A button has keyboard activation, focus behavior, a role, and a disabled state built in. A div needs those behaviors implemented separately. Use type="button" inside a form when the action should not submit. Test with Tab, Enter, and Space.

**Follow-up:** How would you make a toggle announce its state?

</details>

## Q002 Easy - What is the difference between an id and a class?

<details>
<summary>Answer and follow-up</summary>

An id identifies one element in a document and can connect a label to a form control or a fragment link to a section. Classes group elements for styling and scripting. Duplicate ids make these relationships ambiguous. Prefer classes for reusable styles.

**Follow-up:** How does specificity differ?

</details>

## Q003 Easy - Explain the CSS box model.

<details>
<summary>Answer and follow-up</summary>

An element has content, padding, border, and margin. With content-box, the declared width covers content; padding and borders add to the rendered width. With border-box they are included. Margins remain outside in either case.

**Follow-up:** Why can two vertical margins collapse?

</details>

## Q004 Medium - When would you choose Grid over Flexbox?

<details>
<summary>Answer and follow-up</summary>

Grid manages tracks in two dimensions and is useful for page layouts or aligned card rows and columns. Flexbox distributes items along one main axis and works well for toolbars. A grid item can itself be a flex container; choose based on the alignment constraint.

**Follow-up:** How does minmax(0,1fr) prevent overflow?

</details>

## Q005 Medium - Why is z-index 999999 still behind a modal?

<details>
<summary>Answer and follow-up</summary>

z-index compares elements inside their stacking context. A descendant cannot escape an ancestor context merely by increasing its own value. Inspect positioned ancestors, transforms, opacity, and isolation. Native dialog top-layer behavior is a separate mechanism.

**Follow-up:** Which properties create a stacking context?

</details>

## Q006 Medium - How do you build an accessible form?

<details>
<summary>Answer and follow-up</summary>

Associate visible labels with controls, choose input types and autocomplete values, group related controls with fieldset and legend, and connect error text with aria-describedby. Preserve entered values after failure. Client validation improves feedback; the server validates independently.

**Follow-up:** Where should focus move after a failed submission?

</details>

## Q007 Medium - What does the cascade actually decide?

<details>
<summary>Answer and follow-up</summary>

For declarations that apply to an element, the cascade considers origin and importance, cascade layers, specificity, and ordering, with additional rules for scoped styles. Specificity alone cannot explain every result. Inspect computed styles before adding !important.

**Follow-up:** What changes for important declarations in layers?

</details>

## Q008 Hard - How do you debug layout shift?

<details>
<summary>Answer and follow-up</summary>

Record a browser performance trace and inspect layout-shift entries. Reserve space for media, avoid inserting late content above what users are reading, and review font loading. A shift caused by recent user interaction may be treated differently in the metric; measure the actual experience.

**Follow-up:** How do you reserve image space responsively?

</details>

## Q009 Hard - How should a modal manage focus?

<details>
<summary>Answer and follow-up</summary>

On opening, move focus into the dialog to a useful target; keep keyboard navigation within the active modal and provide an accessible name. On close, return focus to the trigger if it remains usable. Prefer the native dialog API and test Escape and background interaction.

**Follow-up:** What happens if the trigger is removed?

</details>

## Q010 Hard - How do you make a table usable on a phone?

<details>
<summary>Answer and follow-up</summary>

Keep header relationships and readable text. A horizontal scroll container can preserve a true data table; give users a clear scroll affordance. For a card view, repeat the labels and preserve reading order. Choose based on whether cross-row comparison is essential.

**Follow-up:** How would you test at 200 percent zoom?

</details>
