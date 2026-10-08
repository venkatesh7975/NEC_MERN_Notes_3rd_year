"""Original, reviewed lesson content. Build scripts format this data; they do not invent lessons."""
DATE='2026-10-08'
AREAS={}
def area(id,title,priority,prerequisites,related,official,article,concepts,why,model,example,output,internals,usage,mistakes,practice,project,questions,language='javascript'):
    AREAS[id]=dict(id=id,title=title,priority=priority,prerequisites=prerequisites.split(),related=related.split(),official=official,article=article,concepts=concepts,why=why,model=model,example=example.strip(),output=output,internals=internals,usage=usage,mistakes=mistakes,practice=practice,project=project,questions=questions,language=language)

area('typescript','TypeScript and validated application boundaries','P1','javascript','react express engineering',
'https://www.typescriptlang.org/docs/handbook/intro.html','https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
'''Fundamentals|1|TypeScript checks relationships between values before execution; the emitted JavaScript still needs runtime validation.
Types|1|Types describe permitted values and operations. Prefer precise domain types to pervasive any.
Interfaces|1|Interfaces describe structural shapes and can support declaration merging.
Type aliases|1|Aliases name type expressions such as unions, tuples, and mapped types.
Unions|1|A union permits one of several alternatives; discriminate valid application states with a stable field.
Intersections|2|An intersection requires the combined constraints of multiple types; incompatible members can produce impossible types.
Generics|1|Generics preserve a relationship between inputs and outputs rather than discarding information through any.
Utility types|2|Utilities such as Pick, Omit, Partial, and Record transform type structure; they do not validate data.
Narrowing|1|Control-flow analysis refines a type after checks such as typeof or a discriminant test.
Type guards|1|A guard claims a runtime check establishes a type; an incorrect guard can create false confidence.
Enums|2|Enums can emit runtime objects; literal unions are often enough when only a compile-time set is required.
Modules|1|Explicit imports and exports coordinate types and values; type-only imports avoid unnecessary runtime dependencies.
Classes|2|Access modifiers and implements help model intent; static type constraints are not a substitute for runtime authority.
Advanced types|3|Conditional, mapped, indexed-access, and template-literal types express complex relationships at a readability cost.
TypeScript with React|1|Type props, events, and state according to their actual roles; unions can prevent conflicting request states.
TypeScript with Node|1|Match compiler module settings to Node's runtime package and import rules.
TypeScript with Express|1|Type checked service inputs after validating the request; request generics alone do not authenticate a payload.
Full-stack TypeScript|1|Share domain contracts while preserving server-owned fields and independent runtime boundary validation.''',
'A loading boolean, optional data, and optional error permit combinations that the application cannot meaningfully display. Explicit types make these states visible before the browser runs.',
'Treat unknown network data as unknown until checked. Narrow a discriminated union before accessing variant fields. Use strict checking and prefer a small understandable model over a clever generic that hides the contract. Generated API types can reduce drift, but they describe expected data rather than prove what arrived.',
'''type Load<T> =
  | {status:'loading'}
  | {status:'success'; data:T}
  | {status:'error'; message:string};
function size(state: Load<string[]>): number {
  if (state.status === 'success') return state.data.length;
  return 0;
}
console.log(size({status:'success', data:['mern']}));''',
'Compiled with a TypeScript compiler, the log is 1. Accessing data before narrowing is a type error. This snippet is a type-design example, not a claim that the JavaScript workspace has already been migrated.',
'The type checker tracks structural compatibility and control flow. Most type annotations disappear in emitted JavaScript; an as assertion does not insert a runtime check. Type complexity can also increase editor and build cost.',
'Migrate one task response and one React request state first. Keep validation at the HTTP edge and return typed domain results to services.',
['Casting response.json() to a trusted domain object.','Using Partial<User> as a writable API payload, including privileged fields.','Sharing server secrets or server-only modules through a client import.'],
['Beginner: distinguish a literal union from a string.','Intermediate: narrow the example and add an empty result state.','Advanced: implement an exhaustiveness check when a variant changes.','Challenge: compile and run a small boundary parser with invalid JSON inputs.'],
'Create a strict TypeScript slice for bookmark validation and its UI state; acceptance includes compile checks and runtime rejection of malformed input.',
[('Beginner: Does TypeScript validate an API response?','No. Validate the received runtime value at the boundary.'),('Intermediate: Why prefer unknown over any at an input edge?','Unknown requires a check before use, while any disables useful constraints.'),('Advanced: Can an assertion prove authorization?','No. Authorization depends on trusted runtime identity and resource scope.'),('Scenario: A field is missing despite successful compilation.','Reproduce the received payload and add a runtime validator; inspect contract drift.'),('Debugging: Two request-state booleans disagree.','Replace invalid combinations with a discriminated union and explicit transitions.')],language='typescript')

area('git','Git history, collaboration, and code review','P0','','engineering devops',
'https://git-scm.com/book/en/v2','https://docs.github.com/en/actions',
'''Git fundamentals|0|Commits identify snapshots and parent relationships; the working tree and staging area represent different states.
Branching|0|A branch is a movable name pointing to a commit, not a separate copy of every file.
Merging|0|A merge combines histories, potentially creating a commit with multiple parents.
Rebasing|2|Rebase replays commits onto a new base and changes their identities; coordinate before rewriting shared history.
Stashing|2|Stash stores selected work temporarily; understand whether untracked files are included and verify restoration.
Cherry-pick|2|Cherry-pick applies a commit's change on another history and normally creates a new commit identity.
Reset|2|Reset moves a reference and can alter the index or working tree depending on mode; inspect before using destructive modes.
Revert|1|Revert creates a new commit that reverses an earlier change while retaining shared history.
Git workflows|1|A workflow defines branches, review, checks, and release decisions; choose it for the team rather than fashion.
Pull requests|0|A pull request proposes a branch difference for review and collaboration.
Code review|0|Review checks behavior, maintainability, evidence, security boundaries, and scope rather than only formatting.
GitHub Actions|1|Workflows run configured jobs on events; least-privilege permissions and untrusted-input handling matter.
Open-source contribution|1|Read contribution rules, preserve provenance, describe the change, and supply reproducible verification.''',
'Version history lets a team explain, review, and recover a change. A good diff and honest checks are as useful to maintainers as a polished final screen.',
'Inspect status first, stage intended changes, inspect the staged diff, and commit one coherent behavior. Fetch updates before comparing with the remote. A conflict asks you to reconcile intent: choosing every incoming line mechanically can discard necessary behavior. Prefer a revert for a published mistake when the team needs shared history preserved.',
'''git status --short
git switch -c feature/request-validation
git diff
git add server/validation.js
git diff --cached
git commit -m "Validate task titles at the API boundary"''',
'Run in a disposable repository with that file; the staged diff includes the selected file, and the commit records that snapshot. These commands do not push or merge anything.',
'Git objects are content-addressed and commits connect snapshots through parents. A branch name and a remote-tracking name can diverge. Line-ending normalization is controlled by attributes; binary artifacts must not be transformed as text.',
'Contribute one debugging challenge with a focused PR, expected behavior, reproduction, regression evidence, and source verification.',
['Resetting a shared branch to hide an error without coordination.','Committing .env or private progress data.','Assuming a clean working tree means the code was tested.'],
['Beginner: explain working, staged, and committed versions of one file.','Intermediate: merge two edits to a small function and verify intent.','Advanced: compare a merge and a rebase in a disposable repository.','Challenge: revert a behavioral change and keep unrelated later work.'],
'Create a contribution rehearsal repository with two branches, one conflict, one regression check, and a reviewed change description.',
[('Beginner: What is a branch?','A movable reference to a commit.'),('Intermediate: How does revert differ from reset?','Revert adds a compensating commit; reset moves a reference and may alter local states.'),('Advanced: Why are rebased commit hashes different?','Their parents and often metadata change, yielding new commit objects.'),('Scenario: A secret was committed.','Revoke or rotate it first, then coordinate history and log cleanup through the security process.'),('Debugging: A file is absent from a commit.','Inspect status and the staged diff; an unstaged change is not part of the new commit.')],language='bash')

area('react','React identity, state, effects, and resilient interfaces','P0','html javascript async browser','state-management typescript nextjs testing',
'https://react.dev/learn','https://react.dev/learn/you-might-not-need-an-effect',
'''Fundamentals|0|React describes interfaces as components whose output depends on inputs and state.
JSX|0|JSX describes element structure and is transformed before execution; it is not an HTML string.
Components|0|Components encapsulate presentation and behavior; keep rendering pure so repeated evaluation remains safe.
Props|0|Props are inputs from a parent and should not be mutated by the receiving component.
State|0|State records facts the component owns. Derive values that can be computed from existing facts.
Events|0|Event handlers express user intent and can trigger state changes or commands.
Forms|0|Form state, validation, submission, and recovery need distinct behavior; preserve drafts when requests fail.
Conditional rendering|0|Render a clear representation for each valid state, including loading, empty, error, and success.
Lists|0|Transform data into elements without changing item identity as order changes.
Keys|0|Stable keys let React identify siblings across updates; random or index-based keys can lose the correct local state.
Hooks|0|Hooks connect React capabilities to function components under ordering rules.
useState|0|useState provides a state snapshot and update function; functional updates compose against previous state.
useEffect|0|Effects synchronize with external systems and need correct dependencies and cleanup.
useRef|1|A ref persists a mutable value without scheduling rendering; do not use it to conceal missing UI state.
useMemo|2|Memoization can avoid recomputation when dependencies are equal; measure benefit and avoid relying on cache for correctness.
useCallback|2|A cached function identity can help specific memoized boundaries; it is not a general speed switch.
useContext|1|Context passes a value through a subtree; changing that value can affect consuming components.
Custom hooks|1|A custom hook reuses stateful logic while each caller has its own hook state unless an external store is used.
Component architecture|1|Separate reusable presentation, domain state, and external communication where this simplifies change.
Routing|1|Routing maps location to views and defines navigation, parameters, and loading boundaries.
React Router|1|React Router offers modes with different routing and data behavior; choose a mode deliberately and consult its matching docs.
Data fetching|0|Associate responses with request identity and model caching, invalidation, cancellation, and errors.
Error handling|0|Distinguish render errors, rejected asynchronous work, validation failures, and conflict recovery.
Performance|1|Profile actual interaction; list size, expensive work, and network waterfalls often matter more than blanket memoization.
Lazy loading|2|Load code for a boundary when needed, then provide loading and failure behavior for that boundary.
Suspense|2|Suspense coordinates supported pending resources; arbitrary effect-based fetching does not automatically integrate with it.
Server/client concepts|2|Server and client components have different capabilities and bundle boundaries supplied by a compatible framework.
Testing|0|Test visible behavior and accessible interaction, then run important workflows in a real browser.
Accessibility|0|Use native roles, labels, focus management, and keyboard behavior through state transitions.
Production architecture|1|Define data ownership, request contracts, error recovery, bundle boundaries, and operating evidence before multiplying abstractions.''',
'A changing interface needs a consistent relationship between facts, displayed values, and commands. React makes this relationship explicit when components remain pure and state has a clear owner.',
'A render sees a snapshot. Updating state schedules later rendering; it does not change an old closure in place. Derive totals during render and put a submit command in the submit handler. An effect connects to something outside rendering; its cleanup undoes that connection. Keep item drafts associated with stable ids rather than array positions.',
'''function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => {
    setCount(c => c + 1);
    setCount(c => c + 1);
  }}>Count {count}</button>;
}''',
'In a React application importing useState, each click adds two. Replacing both updates with setCount(count + 1) computes the same next value from the current snapshot and adds one.',
'React evaluates components, reconciles identity, and commits host changes. Rendering can happen more than once; side effects during rendering can therefore duplicate external work. Development Strict Mode can expose missing cleanup by exercising additional setup/cleanup behavior.',
'Inspect the MERN workspace form drafts and conflict refresh. Extend it with search that rejects stale results and a loading representation that does not erase unsent input.',
['Using an effect to copy a computable total into another state variable.','Initiating payment or creation merely because a component rendered.','Using the sorted row index as an editable row key.'],
['Beginner: explain the counter output using snapshots.','Intermediate: move a derived value out of state and preserve a draft after a failed request.','Advanced: demonstrate effect cleanup under remounting and changed dependencies.','Challenge: reproduce an async race and prove the latest-query invariant in a browser test.'],
'Build the timed search and table exercises in the interview handbook. Acceptance includes out-of-order responses, empty and failure states, stable row identity, and keyboard operation.',
[('Beginner: How do props differ from state?','Props come from a parent; state records facts owned by the relevant component or model.'),('Intermediate: When is an effect appropriate?','When synchronizing with an external system, with cleanup and dependencies that describe the connection.'),('Advanced: Does memoization establish correctness?','No. The application must remain correct when computation is repeated or a cache is unavailable.'),('Scenario: Sorting moves the wrong draft.','Use stable domain keys and decide whether drafts are row-local or held in a keyed parent model.'),('Debugging: A request loops forever.','Inspect unstable dependencies and state changes in the effect; simplify the state model before suppressing warnings.')],language='jsx')

area('state-management','Local state, shared state, and server-state ownership','P1','react','api engineering',
'https://redux-toolkit.js.org/introduction/getting-started','https://tanstack.com/query/latest/docs/framework/react/overview',
'''Local state|0|Keep a fact near its users until a real sharing requirement appears.
Context|1|Context transports a shared value through a subtree; it does not automatically manage remote caching or normalize entities.
Redux|2|Redux centralizes predictable transitions through actions and reducers; it has an ecosystem for complex shared application state.
Redux Toolkit|1|Redux Toolkit provides the recommended Redux setup and utilities, reducing hand-written store boilerplate.
Zustand|2|Zustand provides an external store with selectors; subscriptions and ownership still need intentional design.
Server state|0|Server state has remote authority, freshness, invalidation, and concurrent-writer concerns beyond local component state.
TanStack Query|1|TanStack Query coordinates asynchronous server-state caching and lifecycle; query keys and invalidation define correctness.
When to use which approach|0|Choose local state, context, an external store, or a query cache according to ownership and coordination needs.''',
'Copying every API response into several stores creates drift. A draft and a saved server record have different owners and different conflict rules.',
'Classify each fact before selecting a library: a temporary form draft is local; theme is shared UI configuration; a server list is cached remote state. A query key must include relevant parameters and scope. Invalidate or update cache after a mutation according to the authoritative response. Separate users and clear sensitive cache on session changes.',
'''const queryKey = ['bookmarks', userId, {search, page}];
// Example contract for a query library: every changing read parameter is keyed.
const draft = {title: '', url: ''};
// Draft belongs to the form. Saved bookmarks belong to the server.''',
'These values illustrate ownership; no query library is invoked. Changing userId, search, or page must select a distinct read identity, and a failed write must not silently discard draft.',
'Reducers describe transitions; external-store selectors determine subscriptions; query caches schedule freshness and refetching. A shared cache can deduplicate reads but cannot replace a server uniqueness index or version predicate.',
'Introduce a query cache into the workspace only after writing the read and invalidation contract. Compare network traces and retained form behavior before and after.',
['Choosing Redux for every small component by default.','Omitting the account id from a shared query key.','Letting an optimistic cache update overwrite a later authoritative result.'],
['Beginner: classify ten UI facts by owner.','Intermediate: include all filter parameters in query identity.','Advanced: design rollback or refetch after a 409 conflict.','Challenge: switch between two accounts and prove old private data is not reused.'],
'Implement a server-state adapter for reading-list CRUD. Acceptance includes session changes, invalidation after deletion, failed mutation recovery, and one documented tradeoff between libraries.',
[('Beginner: Is a query cache the database?','No. It is a client-side representation with freshness and invalidation behavior.'),('Intermediate: What belongs in a query key?','Every input that changes the represented read, including relevant account scope.'),('Advanced: Can a client store prevent two-device writes?','No. Persisted server concurrency rules must establish that invariant.'),('Scenario: One user sees cached data from another.','Separate account-scoped keys and clear or partition sensitive caches during session changes.'),('Debugging: A saved item never appears.','Check query identity, mutation result handling, invalidation, and server response before forcing arbitrary rerenders.')])

area('nextjs','Next.js routing, rendering, and server boundaries','P2','react api security','state-management cloud devops',
'https://nextjs.org/docs','https://nextjs.org/docs/app/getting-started/caching-and-revalidating',
'''Fundamentals|2|Next.js supplies routing, rendering, and server integration around React; match documentation to the installed version and router.
Routing|2|File conventions map URLs to pages, layouts, loading states, and handlers; parameters still need validation.
Layouts|2|Layouts wrap route segments and can persist across navigation; do not assume every navigation remounts them.
Server Components|2|Server Components can read server resources without sending their implementation to the client bundle.
Client Components|2|Client boundaries enable interactive hooks and browser capabilities; their imported client dependency graph affects the bundle.
Data fetching|2|Choose server or client fetching according to authority, latency, and interaction; define freshness explicitly.
Server Actions|2|Server Actions execute server functions through framework transport and still require input validation and authorization.
API routes|2|App Router Route Handlers expose HTTP methods; Pages Router API routes use a different convention.
Middleware|3|In Next.js 16, the middleware file convention is deprecated in favor of proxy; it is distinct from Express middleware.
Authentication|1|Resolve trusted identity and enforce resource authorization at the data or operation boundary, including actions and handlers.
Caching|2|Caching behavior is version-sensitive; use explicit cache and revalidation choices rather than historical default assumptions.
Rendering strategies|2|Choose when and where content is rendered based on personalized data, freshness, and distribution needs.
Static rendering|2|Precomputed content can be distributed cheaply when its inputs and invalidation rules permit it.
Dynamic rendering|2|Request-dependent content must preserve per-request identity and avoid unsafe shared caching.
Streaming|3|Streaming sends ready portions before the whole response finishes; boundaries affect loading and error behavior.
Deployment|2|Hosting must support the selected server features; a static export cannot provide arbitrary dynamic server behavior.
Performance|2|Measure bundle size, waterfalls, caching, and useful rendered content before changing rendering strategy.''',
'Server rendering can reduce client work and keep some dependencies on the server. It also introduces new data, cache, and authorization boundaries that a client-only application did not have.',
'Use the App Router terminology consistently. Keep read-only server access behind server modules, pass only intended serializable values across client boundaries, and validate route parameters. A route visibility check is not sufficient for authorization: direct calls to the protected operation still need scope checks. A shared cache must never mix personalized responses from different users.',
'''// app/api/ping/route.ts -- Next.js App Router file convention
export async function GET() {
  return Response.json({status:'ok'}, {
    headers:{'Cache-Control':'no-store'}
  });
}''',
'In an App Router project, GET /api/ping returns a JSON object. The explicit response header avoids browser/intermediary reuse; separately examine framework data/render caching for real reads.',
'The framework coordinates server rendering, React payloads, client hydration, and route navigation. A use client directive creates a module boundary, not a claim that every part is rendered exclusively in a browser. Next.js 16 names the pre-route convention proxy; inspect the versioned migration guide before adapting older tutorials.',
'Build a public reading page with a small interactive bookmark control. Explain which reads can be public and which writes require a session and resource ownership.',
['Assuming a Server Action is inherently authorized.','Putting secret-bearing values into props delivered to the client.','Following an older cache-default or middleware tutorial without checking the installed version.'],
['Beginner: compare page, layout, and Route Handler responsibilities.','Intermediate: mark one client boundary and inspect its dependency graph.','Advanced: design cache keys and revalidation for public versus account-specific reads.','Challenge: test a direct unauthorized server operation and an authenticated operation for another owner.'],
'Create an optional Next.js adapter for the reading-list domain. Preserve the existing API contract; verify authorization, loading, hydration, cache separation, and deployment requirements.',
[('Beginner: Is Next.js required for MERN?','No. It is an optional React framework with additional rendering and server capabilities.'),('Intermediate: Does hiding a page protect an action?','No. The operation itself must validate identity, input, and permissions.'),('Advanced: What is unsafe personalized caching?','A reusable response may expose one user\'s data to another if identity and private policy are omitted.'),('Scenario: An old tutorial uses middleware.ts.','Check the installed version; Next.js 16 deprecates that convention in favor of proxy.'),('Debugging: A static deployment loses an API feature.','Inspect whether the feature requires a server runtime instead of static export.')],language='typescript')

area('foundations','Internet, HTTP, and the browser','P0','','html api devops',
'https://developer.mozilla.org/en-US/docs/Web','https://developer.mozilla.org/en-US/docs/Web/HTTP',
'''Internet fundamentals|0|The Internet connects networks. The Web uses that infrastructure to exchange resources identified by URLs.
How the Web works|0|A browser requests resources, interprets HTML and CSS, runs scripts, and sends later application requests.
Browser architecture|2|Browser processes separate responsibilities such as rendering, networking, and isolation; their implementation varies by browser.
HTTP/HTTPS|0|HTTP defines request and response semantics. HTTPS carries HTTP over an authenticated, encrypted TLS connection.
DNS|1|DNS resolves names into records used to locate services. DNS resolution and HTTP caching have different lifetimes.
TCP/IP basics|2|IP routes packets; TCP provides a reliable ordered byte stream. HTTP/3 uses QUIC over UDP instead of TCP.
APIs|0|An API is a contract between software components. A web API exposes a network-accessible contract.
JSON|0|JSON encodes data values, not functions or every JavaScript type. Dates and domain types need explicit conventions.
Client-server architecture|0|The client presents interaction; the server validates requests and owns trusted business decisions.
Developer tools|0|Network, console, debugger, performance, and accessibility tools expose evidence about browser behavior.''',
'A page that looks correct can still submit the wrong request. Understanding each boundary tells you whether to debug rendering, networking, server rules, or persistence.',
'Separate lookup, transport, protocol, and application behavior. A URL supplies a scheme, host, path, and possibly query. Inspect the request method, status, headers, and body before interpreting an error. A resolved fetch Promise says the transport produced a response; a 404 is still a response. A browser can reuse cached resources and existing connections, so do not assume every navigation repeats every step.',
'''const response = await fetch('/api/tasks', {headers:{Accept:'application/json'}});
if (!response.ok) throw new Error(`HTTP ${response.status}`);
if (!response.headers.get('content-type')?.includes('application/json')) {
  throw new Error('API returned a non-JSON representation');
}
const tasks = await response.json();''',
'In a served browser application, a successful JSON response becomes a value; a 404 or HTML fallback is reported as a failure. The example requires an actual /api/tasks endpoint.',
'HTML parsing builds a document tree; CSS contributes style rules; layout computes geometry and painting produces pixels. Script and layout work can delay interaction. TLS authenticates the endpoint certificate, while application authorization still decides who may read a task.',
'Trace the MERN workspace login and task creation in Network tools. Compare a document request with a JSON request and identify where the session cookie travels.',
['Treating HTTPS as proof that an application is trustworthy or authorized.','Trying to fix a 500 response with CSS.','Calling response.json() on every response without inspecting status or content type.'],
['Beginner: identify scheme, host, path, method, status, and content type in three requests.','Intermediate: deliberately request a missing API path and explain the representation.','Advanced: compare a cold navigation with a repeat navigation and separate DNS, connection, and response caching.','Challenge: trace one failed write and establish whether it reached the database.'],
'Build a request diary containing five requests, their purpose, observed outcome, and one reproduced failure. Include screenshots with credentials redacted.',
[('Beginner: Is JSON the same thing as a JavaScript object?','No. JSON is a text representation with a restricted value model; parsing creates JavaScript values.'),('Intermediate: Does fetch reject on 404?','No. Check response.ok or status. Transport failure and an HTTP error response are different.'),('Advanced: Why does a warm page load skip connection work?','The browser may reuse existing connections or cached resources. Measure the actual request timing.'),('Scenario: API returns HTML with status 200.','Inspect proxy and SPA fallback routing. APIs should return their defined representation and safe errors.'),('Debugging: Is the failure DNS or authorization?','DNS failure prevents locating a service; a 401 or 403 is an application response after transport succeeds.')])

area('html','Semantic HTML, forms, and accessible documents','P0','foundations','css javascript react',
'https://developer.mozilla.org/en-US/docs/Web/HTML','https://www.w3.org/WAI/tutorials/',
'''Fundamentals|0|Elements express document structure; attributes refine meaning and behavior. A valid document has a declared language and useful title.
Semantic HTML|0|Use headings, landmarks, lists, links, and buttons for their meaning and built-in interaction.
Forms|0|Labels, names, input types, constraints, and submit behavior form a usable contract; the server validates again.
Tables|1|Tables express relationships in rows and columns. Captions and header associations help users interpret the data.
Multimedia|2|Images, audio, and video need alternatives appropriate to their purpose, including captions or transcripts when needed.
Accessibility|0|Accessibility includes keyboard interaction, names, focus, structure, contrast, and assistive-technology behavior.
SEO|1|Descriptive titles, useful content, crawlable links, and meaningful structure help discovery; metadata is not a ranking guarantee.
HTML APIs|2|Browser APIs such as dialog, history, and storage have specific lifecycle and permission contracts beyond markup.
Modern HTML|1|Native dialog, disclosure, responsive images, and newer platform features can reduce custom code; check support for your audience.''',
'A styled clickable div requires you to rebuild behavior that a button already has. Semantic markup keeps meaning and interaction aligned as visual design changes.',
'A form is a set of named controls submitted through a defined action or handled by code. The label identifies purpose, name identifies submitted data, and id establishes document relationships. A placeholder disappears while typing and is not a reliable label. Choose a link for navigation and a button for an action. Keep source order meaningful before applying visual layout.',
'''<html lang="en">
<head><title>Reading list</title></head>
<body><main>
  <h1>Add a reading-list item</h1>
  <form action="/api/bookmarks" method="post">
    <label for="title">Title</label>
    <input id="title" name="title" required maxlength="120">
    <button type="submit">Add item</button>
  </form>
</main></body></html>''',
'Typing and pressing Enter submits the named title field. This markup assumes a form-capable endpoint; the existing JSON API needs a JavaScript submit handler instead.',
'The browser derives an accessibility tree from elements, attributes, and state. ARIA can refine this tree, but does not add keyboard behavior to arbitrary elements. Native controls also participate in focus and form submission.',
'Use the UI lab to inspect an accordion and dialog. Build a table of expenses with a caption, row/column headers, and a small-screen scrolling container.',
['Using headings only for their default font sizes.','Removing visible focus outlines without an equivalent replacement.','Trusting required or pattern attributes as a server security boundary.'],
['Beginner: navigate the form using only the keyboard.','Intermediate: add an error linked with aria-describedby and preserve the input.','Advanced: add captions and responsive sources to educational media.','Challenge: test at 200 percent zoom and with a screen reader; record specific obstacles.'],
'Build a semantic profile and contact form. Acceptance: useful title and language, ordered headings, labeled controls, keyboard submission, and errors associated with the correct input.',
[('Beginner: When is a button better than a link?','For actions; a link navigates to a destination.'),('Intermediate: What does name do in a form?','It identifies a successful control in submitted form data; id serves document relationships.'),('Advanced: Why does ARIA not make a div a complete button?','ARIA changes exposed semantics but keyboard, focus, and activation still need implementation.'),('Scenario: A modal closes but focus disappears.','Remember the invoking element and return focus if it remains available; use a native dialog when suitable.'),('Debugging: A label focuses the wrong input.','Check its for value and the uniqueness of the matching input id.')],language='html')

area('css','CSS layout, cascade, and responsive design','P0','html','react foundations',
'https://developer.mozilla.org/en-US/docs/Web/CSS','https://web.dev/learn/css',
'''Fundamentals|0|CSS maps selectors to declarations; browsers resolve competing declarations and compute values for elements.
Box model|0|Content, padding, border, and margin determine geometry. border-box includes padding and borders in the declared width.
Selectors|0|Selectors match document structure and states; prefer intentional classes over tightly coupled ancestor chains.
Cascade|0|Origin, importance, layers, specificity, scope proximity, and order resolve competing declarations.
Specificity|0|Specificity compares selector weight within the relevant cascade stage; it is not the first rule in every conflict.
Flexbox|0|Flexbox distributes items along an axis and manages wrapping, alignment, and available space.
Grid|0|Grid defines tracks in two dimensions and can coordinate row and column placement.
Responsive design|0|A responsive layout adapts to available space, input capabilities, text size, and content length.
Media queries|1|Media queries condition rules on viewport or device characteristics; choose breakpoints from content needs.
Animations|2|Keyframe animations interpolate properties over time; honor reduced-motion preferences and avoid unnecessary layout work.
Transitions|2|Transitions interpolate a changed property over a duration; they need distinct before and after values.
Positioning|1|Static, relative, absolute, fixed, and sticky positioning use different containing-block and scroll relationships.
Variables|1|Custom properties cascade and can be resolved at use time; they are useful for design tokens and themes.
Accessibility|0|Preserve readable contrast, focus, zoom, reduced motion, and logical source order.
Modern CSS|2|Container queries, cascade layers, subgrid, logical properties, and modern selectors solve specific layout problems; inspect compatibility.
CSS architecture|1|Small reusable patterns, consistent naming, and documented tokens reduce unintended cross-component effects.''',
'Layout failures often come from content constraints, not a missing breakpoint. CSS offers different tools for distribution, track alignment, overlap, and local component adaptation.',
'Start in normal flow, choose a layout model, and identify intrinsic size constraints. In a grid, a long word can impose a minimum track width; minmax(0, 1fr) lets a flexible track shrink when overflow handling is defined. In flex layouts, min-width: 0 often permits a child to shrink. Inspect which cascade rule wins before raising specificity. A large z-index cannot escape an ancestor stacking context.',
''':root { --space: 1rem; --accent: #214ea2; }
* { box-sizing: border-box; }
.cards { display: grid; gap: var(--space);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }
.card { min-width: 0; overflow-wrap: anywhere; }
button:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .animated { animation: none; transition: none; }
}''',
'Cards wrap into available columns and long text can wrap inside a shrinking card. Inspect 320px and desktop layouts with real content; this is a stylesheet fragment for a page containing these classes.',
'Browsers compute style, layout, paint, and compositing work. Some visual changes require geometry to be recalculated. Transform and opacity often avoid layout, but layer promotion and rendering costs still need measurement.',
'Use these rules in a dashboard with unequal titles and amounts. Give tabular data an intentional overflow container rather than hiding part of a row.',
['Using overflow:hidden to conceal an inaccessible control.','Adding !important before inspecting competing layers and selectors.','Designing only for one viewport or short English labels.'],
['Beginner: draw and measure one element with both box-sizing values.','Intermediate: fix a long URL that expands a grid.','Advanced: debug a modal behind a transformed ancestor using stacking-context evidence.','Challenge: produce a readable layout at 320px, 200 percent zoom, and reduced motion.'],
'Build a responsive reading-list dashboard with cards, a filter toolbar, visible focus, and a data table. Record why each section uses Grid, Flexbox, or normal flow.',
[('Beginner: What does border-box change?','The declared width includes content, padding, and border; margin remains outside.'),('Intermediate: Why can a less specific rule win?','Earlier cascade stages such as importance and layer order can take precedence over specificity.'),('Advanced: Why is z-index ineffective?','The element may participate in an ancestor stacking context that is ordered behind another context.'),('Scenario: A card expands the mobile page.','Inspect intrinsic minimum size and long content; allow shrinking and intentional wrapping.'),('Debugging: Sticky positioning does not appear to stick.','Check its inset, containing block, available scroll distance, and ancestor overflow behavior.')],language='css')

area('javascript','JavaScript values, scope, functions, and collections','P0','foundations','async browser typescript nodejs',
'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide','https://javascript.info/',
'''Fundamentals|0|JavaScript evaluates expressions and statements using a language-defined value model and host-provided APIs.
Variables|0|Bindings associate names with values; const prevents reassignment of a binding, not mutation of its object.
Data types|0|Primitives and objects have different identity behavior. undefined, null, numbers, strings, booleans, bigint, and symbols need explicit handling.
Operators|0|Operators combine or compare values; coercion, short-circuiting, and nullish behavior affect results.
Control flow|0|Conditions, loops, return, break, and continue select which work runs and when iteration ends.
Functions|0|Functions define callable behavior, parameters, return values, and closures over lexical bindings.
Scope|0|Lexical scope resolves names from where code is written, not from whichever function called it.
Closures|0|A function retains access to its lexical environment, including bindings whose values can change.
Hoisting|1|Declarations are instantiated before evaluation, but initialization timing differs; let and const have a temporal dead zone.
this|1|Ordinary function this depends on invocation; arrows capture the surrounding this and cannot be rebound with call.
Objects|0|Objects group properties and have identity; spreading creates a shallow copy of own enumerable properties.
Arrays|0|Arrays hold indexed collections; map transforms, filter selects, and reduce accumulates values.
Destructuring|1|Destructuring binds values from structured data; defaults apply to undefined rather than every falsy value.
Spread/rest|1|Spread expands values; rest collects remaining arguments or properties. Object spread does not deeply clone nested objects.
Prototypes|2|Property lookup can follow a prototype chain after own properties are checked.
Classes|2|Classes provide syntax around constructors and prototype-based methods, with additional class-specific semantics.
Inheritance|2|Inheritance reuses behavior through type or prototype relationships; composition can avoid rigid hierarchies.
Modules|0|Modules make dependencies and exports explicit; ESM and CommonJS have different loading and interoperability rules.
Error handling|0|Throw, try/catch, and Promise rejection represent failures; handle errors at a boundary that can act.
Memory|1|Retained references determine whether objects remain reachable; caches, listeners, and closures can retain large graphs.
Garbage collection|2|The engine reclaims unreachable objects; collection timing is not a portable application guarantee.
Iterators|2|An iterator returns successive value/done results; iterable protocols allow for-of and spread to consume sequences.
Generators|3|Generators suspend and resume function execution while yielding values, providing convenient iterator state.
Symbols|3|Symbols create distinct property keys and participate in protocols such as iteration.
Proxy|3|A Proxy intercepts operations on a target through traps; language invariants constrain permitted behavior.
Reflect|3|Reflect exposes operations corresponding to object internal behavior and can preserve forwarding semantics in traps.
Typed arrays|3|Typed arrays view fixed-format binary values in buffers; byte layout and bounds matter.
Internationalization|1|Intl formats numbers, dates, and text according to locale conventions; formatting is separate from domain storage.
Modern ECMAScript|2|Language additions vary by runtime support. Check the target runtime rather than assuming a proposal is standardized.
TC39 proposals|4|Proposals have explicit stages and can change or stop progressing; inspect proposal status and runtime support before relying on experimental behavior.
Performance|1|Measure workload, allocation, and blocking time before replacing readable code with an optimization.
Security|0|Treat untrusted values as data; validate at boundaries and avoid executing input or inserting it as HTML.''',
'Many application bugs are mistaken assumptions about identity, coercion, or captured values. A precise value model also makes React updates and backend validation easier to explain.',
'Start with a small input, trace each binding, and state the output. Object copies and immutable transitions are separate decisions: a new outer object can still share a nested array. Use Number.isFinite and explicit parsing rules for numeric inputs. Use a Map when key identity matters and plain records when the domain is fixed. Design functions with a documented input, result, and failure contract.',
'''const original = {tags:['mern']};
const copy = {...original};
copy.tags.push('interview');
console.log(original.tags.length); // 2: nested array is shared

function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
console.log(next(), next()); // 1 2''',
'The log values are 2, then 1 and 2. Replace tags with a new array to avoid mutating the original; each makeCounter call creates a distinct environment.',
'A closure retains an environment, not an automatic immutable copy of every captured value. A normal method can lose its receiver when passed as a bare callback. Prototype lookup does not imply that arbitrary input should be merged into privileged configuration.',
'Use pure collection transformations to derive a UI list. Use explicit allowlists to build an API update rather than spreading request.body. Compare the toolkit emitter and LRU choices with plain objects.',
['Using Boolean(value) to parse the string false.','Treating const or object spread as deep immutability.','Using loose coercion for dates, money, or authorization decisions.'],
['Beginner: write a loop that includes zero and explain its termination.','Intermediate: predict shallow-copy and equality outputs before running them.','Advanced: implement a generator over a bounded tree and show early termination.','Challenge: implement an LRU and explain eviction with stored undefined values.'],
'Build a pure quiz scoring model with explicit invalid-answer behavior, then connect it to a browser form. Add output examples for blank input, duplicate answers, and a changed question order.',
[('Beginner: Does const freeze an object?','No. It prevents rebinding the variable; object properties can still change.'),('Intermediate: Why does a copied object mutate the original array?','The copy preserves the nested reference. Replace or clone at the depth required by the domain.'),('Advanced: How does this differ in an arrow?','The arrow captures lexical this; an ordinary function derives this from invocation.'),('Scenario: Memory grows after every page visit.','Compare heap snapshots and retaining paths for unremoved listeners, unbounded caches, and captured objects.'),('Debugging: A default value replaces a valid zero.','Use a nullish check when only null and undefined are missing; || also treats zero and an empty string as falsy.')])

area('async','Promises, event loops, and bounded concurrency','P0','javascript','browser nodejs testing',
'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises','https://javascript.info/async',
'''Callbacks|0|A callback is a function another operation invokes; it can run synchronously or asynchronously according to that contract.
Promises|0|A Promise represents an eventual outcome. Chaining transforms outcomes and propagates failures.
async/await|0|An async function returns a Promise; await suspends that function until the awaited outcome is available.
Event loop|0|A host coordinates execution and queued work. Browser rendering and Node phases have distinct scheduling models.
Microtasks|1|Promise reactions and queueMicrotask callbacks run at host-defined checkpoints after the current work.
Macrotasks|1|Task is the browser-standard term; timers and other task sources schedule later work with no exact execution-time guarantee.
Fetch|0|Fetch produces an HTTP response or transport failure; the application still checks status and parses the expected representation.
Async programming|0|Design ordering, cancellation, concurrency limits, timeouts, and partial-failure behavior explicitly.''',
'Parallel work can reduce waiting but overwhelm a database or remote service. Waiting for every request is different from limiting how many requests start at once.',
'A Promise executor runs immediately; its reactions run later. Promise.all waits on already-started inputs and rejects on the first rejection without canceling peers. allSettled retains each outcome. await does not make synchronous CPU work leave the current thread. For cancellation, pass a supported signal and define what happens to already-committed server work.',
'''console.log('A');
Promise.resolve().then(() => console.log('B'));
queueMicrotask(() => console.log('C'));
setTimeout(() => console.log('D'), 0);
console.log('E');''',
'For this ordinary top-level browser script: A, E, B, C, D. Do not extrapolate this small example to every Node phase, nested task source, or rendering opportunity.',
'The call stack must finish before these queued reactions execute. A chain that continually adds microtasks can postpone other work. Timer delay is a lower-bound scheduling condition, not a promise of an exact deadline.',
'Use the tested promisePool to process a batch with a concurrency cap and input-order results. Use an AbortController and a request generation to prevent older search results from replacing newer UI state.',
['Starting every fetch before passing the promises to a purported concurrency limiter.','Assuming Promise.all cancels the losing requests.','Blocking an API with expensive synchronous work inside an async function.'],
['Beginner: predict the five log lines before running the example.','Intermediate: compare fail-fast and all-settled batch contracts.','Advanced: test the maximum active count with an injected deferred task.','Challenge: design timeout and cancellation outcomes for already-running tasks without losing result order.'],
'Extend the toolkit promise pool with a documented abort policy. Acceptance: no new tasks after abort, existing tasks accounted for, bounded active work, and stable result ordering.',
[('Beginner: What does an async function return?','A Promise, including when the function returns a plain value.'),('Intermediate: Does await parallelize a loop?','No. Awaiting each iteration usually serializes starts; choose controlled concurrency explicitly.'),('Advanced: Can Promise.allSettled bound load?','No. It collects outcomes from inputs; a worker or scheduler must limit when tasks start.'),('Scenario: An old search response wins.','Associate data with the current query and discard stale results; cancellation alone is not an ordering proof.'),('Debugging: A timer runs late.','Inspect blocking JavaScript, microtask starvation, and host scheduling; a timer is not an exact real-time guarantee.')])

area('browser','DOM, events, and browser APIs','P0','html javascript async','react security',
'https://developer.mozilla.org/en-US/docs/Web/API','https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model',
'''DOM|0|The DOM exposes a document tree as objects that scripts can inspect and update.
Events|0|Events describe interaction or state changes; propagation and default actions follow distinct rules.
Browser APIs|1|Storage, history, observers, workers, and permissions have host-specific contracts and cleanup requirements.
Forms and events|0|A submit event captures keyboard and button submission; form controls should retain accessible names and feedback.''',
'Event-driven interaction lets the page change without reconstructing all document state. Correct event ownership avoids duplicate listeners, accidental navigation, and unsafe content insertion.',
'Separate propagation from default behavior. preventDefault affects the default action; stopPropagation affects propagation. Event delegation listens on a stable ancestor and identifies a meaningful target, including when the user clicks a nested child. Update user-supplied text with textContent. Keep storage as an optional convenience and handle quota, unavailable storage, and malformed values.',
'''const list = document.querySelector('#items');
list.addEventListener('click', event => {
  const button = event.target instanceof Element
    ? event.target.closest('button[data-id]') : null;
  if (!button || !list.contains(button)) return;
  console.log('Requested item', button.dataset.id);
});''',
'A click on text or an icon inside a matching button identifies that button. The containing list must exist before registering the listener; ids remain untrusted inputs at the server boundary.',
'Events can pass through capture, target, and bubble phases. Shadow DOM can retarget events. Registering listeners repeatedly can retain state and cause duplicate work. Most DOM updates do not automatically preserve focus after replacing an element.',
'Extend the UI lab to handle dynamically inserted todos, focus a useful control after deletion, and export progress without depending on localStorage always succeeding.',
['Using innerHTML with untrusted titles.','Listening only for button clicks and missing keyboard form submission.','Persisting session secrets in a progress store.'],
['Beginner: inspect target and currentTarget on a nested button click.','Intermediate: add a row without registering a new row listener.','Advanced: handle a storage write failure while preserving export.','Challenge: replace a list while preserving a sensible keyboard focus target.'],
'Build a local notes app with a plain-text editor, explicit save state, JSON export, and safe handling of corrupted saved data. Do not present browser storage as a multi-device database.',
[('Beginner: How do target and currentTarget differ?','Target identifies the dispatch target; currentTarget is the element whose listener is currently running.'),('Intermediate: Why use delegation?','A stable ancestor can handle matching descendants added later without per-row listeners.'),('Advanced: Does stopping propagation prevent navigation?','Not necessarily; default action and propagation are separate. Use preventDefault where appropriate.'),('Scenario: A list update loses keyboard focus.','Preserve stable elements or deliberately restore focus to a meaningful surviving control.'),('Debugging: The handler fires twice after navigation.','Inspect repeated registration and missing cleanup, including captured state that remains reachable.')])
