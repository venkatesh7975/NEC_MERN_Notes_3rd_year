# Web foundations and semantic HTML

[Handbook](../README.md) | [Practice questions](../questions/html-css.md)

Read this guide, run the example, and demonstrate the exercise before moving on. These notes supplement the original classroom modules.

## Follow a request

A browser resolves a hostname, establishes a connection, and sends an HTTP request. HTTPS adds authenticated encryption. The server sends a status, headers, and a body; the browser parses HTML and discovers other resources. DNS, transport, TLS, and application errors have different diagnostic evidence.

Use the Network panel to distinguish a failed request from a response your code mishandled. Check status and content type before parsing JSON. A 200 response containing an HTML login page can still fail JSON parsing.

## Build meaningful documents

Use one clear page title, ordered headings, landmarks, and native links and buttons. A link navigates to a location; a button performs an action. Add alt text that serves the image purpose, and use empty alt for decorative images.

A label is persistent instruction; a placeholder disappears when typing. Connect validation errors to controls and retain the user's input. Browser validation does not replace server checks.

## Progressive enhancement

Start with useful content and navigation. Add richer interactions without making the core information impossible to reach if JavaScript fails. For an app requiring JavaScript, provide a clear loading and failure experience.

Test keyboard access, zoom, narrow widths, and slow connections. Accessibility is part of correctness, not a last-minute styling task.

## Worked example

```html
<form>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Join newsletter</button>
</form>
```

## Demonstrate understanding

Build a registration form. Demonstrate labels, error associations, keyboard submission, and preserved input after failure.

## Reference

[Primary learning reference](https://developer.mozilla.org/en-US/docs/Learn_web_development). Prefer the documentation matching the version you install.
