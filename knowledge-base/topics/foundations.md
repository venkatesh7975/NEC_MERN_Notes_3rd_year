<!-- kb-metadata: {"conceptIds": ["foundations--internet-fundamentals", "foundations--how-the-web-works", "foundations--browser-architecture", "foundations--http-https", "foundations--dns", "foundations--tcp-ip-basics", "foundations--apis", "foundations--json", "foundations--client-server-architecture", "foundations--developer-tools"], "difficulty": "Beginner", "estimatedMinutes": 180, "id": "foundations", "importance": 5, "lastVerified": "2026-10-08", "legacyPaths": ["01-foundations/notes.md"], "path": "knowledge-base/topics/foundations.md", "prerequisites": [], "priority": "P0", "related": ["html", "api", "devops"], "status": "authored-guide", "title": "Internet, HTTP, and the browser"} -->
# Internet, HTTP, and the browser

Priority: P0 — 🔥 Essential / Master

Difficulty: Beginner

Importance: 5/5

Prerequisites: No programming prerequisites; basic file and browser use.

Estimated learning time: 180 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

The Internet connects networks. The Web uses that infrastructure to exchange resources identified by URLs.

## Concept reference and priorities

<a id="internet-fundamentals"></a>
### Internet fundamentals

**P0 · 🔥 Essential / Master · reference**

The Internet connects networks. The Web uses that infrastructure to exchange resources identified by URLs.

<a id="how-the-web-works"></a>
### How the Web works

**P0 · 🔥 Essential / Master · reference**

A browser requests resources, interprets HTML and CSS, runs scripts, and sends later application requests.

<a id="browser-architecture"></a>
### Browser architecture

**P2 · 📚 Useful · reference**

Browser processes separate responsibilities such as rendering, networking, and isolation; their implementation varies by browser.

<a id="http-https"></a>
### HTTP/HTTPS

**P0 · 🔥 Essential / Master · worked-example**

HTTP defines request and response semantics. HTTPS carries HTTP over an authenticated, encrypted TLS connection.

<a id="dns"></a>
### DNS

**P1 · ⭐ Highly Important · reference**

DNS resolves names into records used to locate services. DNS resolution and HTTP caching have different lifetimes.

<a id="tcp-ip-basics"></a>
### TCP/IP basics

**P2 · 📚 Useful · reference**

IP routes packets; TCP provides a reliable ordered byte stream. HTTP/3 uses QUIC over UDP instead of TCP.

<a id="apis"></a>
### APIs

**P0 · 🔥 Essential / Master · worked-example**

An API is a contract between software components. A web API exposes a network-accessible contract.

<a id="json"></a>
### JSON

**P0 · 🔥 Essential / Master · worked-example**

JSON encodes data values, not functions or every JavaScript type. Dates and domain types need explicit conventions.

<a id="client-server-architecture"></a>
### Client-server architecture

**P0 · 🔥 Essential / Master · worked-example**

The client presents interaction; the server validates requests and owns trusted business decisions.

<a id="developer-tools"></a>
### Developer tools

**P0 · 🔥 Essential / Master · reference**

Network, console, debugger, performance, and accessibility tools expose evidence about browser behavior.

## ❓ Why Does It Exist?

A page that looks correct can still submit the wrong request. Understanding each boundary tells you whether to debug rendering, networking, server rules, or persistence.

## ⚙️ How Does It Work?

Separate lookup, transport, protocol, and application behavior. A URL supplies a scheme, host, path, and possibly query. Inspect the request method, status, headers, and body before interpreting an error. A resolved fetch Promise says the transport produced a response; a 404 is still a response. A browser can reuse cached resources and existing connections, so do not assume every navigation repeats every step.

## 💻 Examples

### 1. Trace the contract

```javascript
const response = await fetch('/api/tasks', {headers:{Accept:'application/json'}});
if (!response.ok) throw new Error(`HTTP ${response.status}`);
if (!response.headers.get('content-type')?.includes('application/json')) {
  throw new Error('API returned a non-JSON representation');
}
const tasks = await response.json();
```

Expected behavior and runtime: In a served browser application, a successful JSON response becomes a value; a 404 or HTML fallback is reported as a failure. The example requires an actual /api/tasks endpoint.

### 2. Extend and stress the contract

Intermediate: deliberately request a missing API path and explain the representation. Advanced: compare a cold navigation with a repeat navigation and separate DNS, connection, and response caching. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

HTML parsing builds a document tree; CSS contributes style rules; layout computes geometry and painting produces pixels. Script and layout work can delay interaction. TLS authenticates the endpoint certificate, while application authorization still decides who may read a task.

## 🌍 Real-World Usage

Trace the MERN workspace login and task creation in Network tools. Compare a document request with a JSON request and identify where the session cookie travels.

## ⚠️ Common Mistakes

- Treating HTTPS as proof that an application is trustworthy or authorized.
- Trying to fix a 500 response with CSS.
- Calling response.json() on every response without inspecting status or content type.

## ✅ Best Practices

Trace the MERN workspace login and task creation in Network tools. Compare a document request with a JSON request and identify where the session cookie travels. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: identify scheme, host, path, method, status, and content type in three requests.
- Intermediate: deliberately request a missing API path and explain the representation.
- Advanced: compare a cold navigation with a repeat navigation and separate DNS, connection, and response caching.
- Challenge: trace one failed write and establish whether it reached the database.

## 🏗️ Mini Project

Build a request diary containing five requests, their purpose, observed outcome, and one reproduced failure. Include screenshots with credentials redacted.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Is JSON the same thing as a JavaScript object?</summary>

No. JSON is a text representation with a restricted value model; parsing creates JavaScript values.

</details>

<details>
<summary>Intermediate: Does fetch reject on 404?</summary>

No. Check response.ok or status. Transport failure and an HTTP error response are different.

</details>

<details>
<summary>Advanced: Why does a warm page load skip connection work?</summary>

The browser may reuse existing connections or cached resources. Measure the actual request timing.

</details>

<details>
<summary>Scenario: API returns HTML with status 200.</summary>

Inspect proxy and SPA fallback routing. APIs should return their defined representation and safe errors.

</details>

<details>
<summary>Debugging: Is the failure DNS or authorization?</summary>

DNS failure prevents locating a service; a 401 or 403 is an application response after transport succeeds.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

In a served browser application, a successful JSON response becomes a value; a 404 or HTML fallback is reported as a failure. The example requires an actual /api/tasks endpoint.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build a request diary containing five requests, their purpose, observed outcome, and one reproduced failure. Include screenshots with credentials redacted.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

HTML parsing builds a document tree; CSS contributes style rules; layout computes geometry and painting produces pixels. Script and layout work can delay interaction. TLS authenticates the endpoint certificate, while application authorization still decides who may read a task.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Semantic HTML, forms, and accessible documents](html.md), [REST contracts, GraphQL, and API evolution](api.md), [Containers, CI/CD, and operating a web service](devops.md)

Next: [Semantic HTML, forms, and accessible documents](html.md)

Preserved lessons: [01-foundations/notes.md](../../01-foundations/notes.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://developer.mozilla.org/en-US/docs/Web) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://developer.mozilla.org/en-US/docs/Web/HTTP) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
