# CSS layout and responsive interfaces

[Handbook](../README.md) | [Practice questions](../questions/html-css.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Reason about the layout

Use the box model and normal flow before adding positioning. A fixed width can overflow when padding is added under content-box sizing. Apply border-box deliberately, constrain images, and let long text wrap.

Choose flex for distribution along an axis and grid for track alignment. min-width:0 on flex or grid children and minmax(0,1fr) on grid tracks often matter when content would otherwise force overflow.

## Debug styles with evidence

Inspect computed styles and the winning declaration. Stacking contexts constrain z-index comparisons. Increasing a number does not allow a descendant to escape its ancestor context.

Avoid unexplained overrides. Use a small spacing and typography system, visible focus outlines, and a layout that survives 200 percent zoom. Respect reduced-motion preferences.

## Design responsive behavior

Start with the smallest useful layout and add columns when content has room. Breakpoints should follow the content requirements. Use fluid widths and sensible max-widths rather than targeting a specific device brand.

Reserve media space to reduce shifts. Test unusually long labels and empty states as well as ideal sample data.

## Worked example

```css
* { box-sizing: border-box; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit,minmax(min(100%,16rem),1fr)); }
img { max-width: 100%; height: auto; }
:focus-visible { outline: 3px solid #174bc9; outline-offset: 3px; }
```

## Demonstrate understanding

Build a responsive card grid and toolbar. Verify at 320px, 768px, and 200 percent zoom with long content.

## Reference

[Primary learning reference](https://web.dev/learn/css). Prefer the documentation matching the version you install.
