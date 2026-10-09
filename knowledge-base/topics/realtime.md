<!-- kb-metadata: {"conceptIds": ["realtime--websockets", "realtime--socket-io", "realtime--server-sent-events", "realtime--notifications", "realtime--chat-architecture", "realtime--presence", "realtime--real-time-dashboards"], "difficulty": "Intermediate", "estimatedMinutes": 120, "id": "realtime", "importance": 3, "lastVerified": "2026-10-08", "legacyPaths": [], "path": "knowledge-base/topics/realtime.md", "prerequisites": ["async", "api", "security"], "priority": "P2", "related": ["redis", "system-design"], "status": "authored-guide", "title": "WebSockets, SSE, and recoverable real-time delivery"} -->
# WebSockets, SSE, and recoverable real-time delivery

Priority: P2 — 📚 Useful

Difficulty: Intermediate

Importance: 3/5

Prerequisites: [Promises, event loops, and bounded concurrency](async.md), [REST contracts, GraphQL, and API evolution](api.md), [Authentication, authorization, and web security boundaries](security.md)

Estimated learning time: 120 minutes for explanation and initial practice; independent mastery takes repeated application.

[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)

## 🎯 Learning Objectives

Explain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.

## 🧠 What Is It?

WebSockets provide bidirectional messages over a long-lived connection; application protocols still define identity and delivery.

## Concept reference and priorities

<a id="websockets"></a>
### WebSockets

**P2 · 📚 Useful · reference**

WebSockets provide bidirectional messages over a long-lived connection; application protocols still define identity and delivery.

<a id="socket-io"></a>
### Socket.IO

**P2 · 📚 Useful · reference**

Socket.IO adds its own protocol, reconnection, rooms, and acknowledgements; it is not wire-compatible with plain WebSocket clients.

<a id="server-sent-events"></a>
### Server-Sent Events

**P2 · 📚 Useful · worked-example**

SSE streams server-to-client events over HTTP; EventSource handles connection behavior while replay needs application design.

<a id="notifications"></a>
### Notifications

**P2 · 📚 Useful · reference**

Notifications need ownership, stable event ids, read state, and a catch-up mechanism after disconnect.

<a id="chat-architecture"></a>
### Chat architecture

**P3 · 🧩 Advanced / Specialized · reference**

Chat combines durable messages, authorized rooms, delivery acknowledgements, ordering, and reconnect recovery.

<a id="presence"></a>
### Presence

**P3 · 🧩 Advanced / Specialized · reference**

Presence is typically an expiring observation of connectivity, not a durable statement that someone is actively reading.

<a id="real-time-dashboards"></a>
### Real-time dashboards

**P2 · 📚 Useful · reference**

Dashboards need bounded update frequency, backpressure, and a consistent initial snapshot or replay position.

## ❓ Why Does It Exist?

A live connection can disconnect at the exact moment an event is sent. Reliable product behavior needs durable state and recovery in addition to transport.

## ⚙️ How Does It Work?

Choose SSE for predominantly one-way updates and a bidirectional protocol when both directions need live messages. Authenticate the connection and authorize every room subscription. Persist business state before announcing it. Carry stable event ids and let a reconnecting client retrieve missed changes or refresh authoritative state. An acknowledgement is not proof that every downstream business effect is complete.

## 💻 Examples

### 1. Trace the contract

```javascript
const events = new EventSource('/api/events');
events.addEventListener('task-updated', event => {
  const update = JSON.parse(event.data);
  console.log(update.id, update.version);
});
// On view cleanup: events.close();
```

Expected behavior and runtime: In a browser with a matching authorized SSE endpoint, task-updated messages log the supplied id and version. This is a client fragment; the current workspace does not yet expose that endpoint.

### 2. Extend and stress the contract

Intermediate: close a subscription when the view unmounts. Advanced: disconnect between persistence and notification and recover the current state. Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.

## 🔍 Under the Hood

A transport connection and a durable event log are separate things. Network partitions, process restart, and multiple publishers can change observed ordering. A snapshot followed by subscription can lose intervening writes unless a replay position or reconciliation protocol closes the gap.

## 🌍 Real-World Usage

Extend the task board with notifications while retaining database versions. On reconnection, refresh current tasks before applying further changes.

## ⚠️ Common Mistakes

- Broadcasting every account's updates to every connection.
- Assuming automatic reconnect replays missed messages.
- Letting the message stream grow an unbounded UI list.

## ✅ Best Practices

Extend the task board with notifications while retaining database versions. On reconnection, refresh current tasks before applying further changes. State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.

## 🧪 Practice

- Beginner: compare polling, SSE, and bidirectional messaging.
- Intermediate: close a subscription when the view unmounts.
- Advanced: disconnect between persistence and notification and recover the current state.
- Challenge: coordinate a snapshot and replay cursor without dropping a concurrent event.

## 🏗️ Mini Project

Build a notification-center extension with authenticated streams, stable ids, pagination, duplicate handling, reconnect recovery, and explicit transport limitations.

[Project ladder and implementation status](../projects/README.md)

## 💼 Interview Questions

<details>
<summary>Beginner: Can SSE send arbitrary client-to-server messages?</summary>

SSE is server-to-client; use separate requests for writes.

</details>

<details>
<summary>Intermediate: Is Socket.IO a plain WebSocket protocol?</summary>

No. It adds its own protocol and transport behavior.

</details>

<details>
<summary>Advanced: What does presence prove?</summary>

Only a bounded observation under the chosen heartbeat and expiry rules.

</details>

<details>
<summary>Scenario: A client reconnects after five missed updates.</summary>

Replay from a known position or reconcile from authoritative state.

</details>

<details>
<summary>Debugging: A dashboard repeats an event.</summary>

Deduplicate stable event ids and inspect retries and replay boundaries.

</details>

<details>
<summary>Output-based: What does the worked example produce, and under which runtime?</summary>

In a browser with a matching authorized SSE endpoint, task-updated messages log the supplied id and version. This is a client fragment; the current workspace does not yet expose that endpoint.

</details>

<details>
<summary>Coding: What would you implement and verify next?</summary>

Build a notification-center extension with authenticated streams, stable ids, pagination, duplicate handling, reconnect recovery, and explicit transport limitations.

</details>

<details>
<summary>Architecture and production: Which internal boundary needs evidence?</summary>

A transport connection and a durable event log are separate things. Network partitions, process restart, and multiple publishers can change observed ordering. A snapshot followed by subscription can lose intervening writes unless a replay position or reconciliation protocol closes the gap.

</details>

[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)

## 🔗 Related Concepts

[Redis caching, messaging, and distributed coordination](redis.md), [System design, consistency, and failure tradeoffs](system-design.md)

Next: [Redis caching, messaging, and distributed coordination](redis.md)

# 📚 External Resources

## 🥇 Official Documentation

[Primary documentation](https://socket.io/docs/v4/) — authoritative reference; use the installed runtime/library version.

## 📘 Recommended Articles

[Focused guide](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) — deepen the mental model and compare its examples with this guide.

## 🎥 Recommended YouTube Videos

See the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.

## 🧪 Practice Resources

[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)

## 📚 Further Reading

[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.

## 🔄 Last Verified

2026-10-08 — documentation reviewed; example runtime and execution scope are stated above.
