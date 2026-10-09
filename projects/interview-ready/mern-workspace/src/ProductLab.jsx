import React, { useEffect, useRef, useState } from "react";
import { parseMoney, formatMoney } from "./money.js";

async function request(path, { signal, ...options } = {}) {
  const response = await fetch("/api/lab" + path, {
    signal,
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = response.status === 204 ? null : await response.json();
  if (!response.ok) {
    const error = new Error(data?.message ?? "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}
const send = (path, body, method = "POST") =>
  request(path, { method, body: JSON.stringify(body) });
const values = (event) => Object.fromEntries(new FormData(event.currentTarget));
const Row = ({ children }) => <li className="product-card">{children}</li>;
function Field({
  label,
  name = "title",
  type = "text",
  max = 160,
  required = true,
}) {
  return (
    <label>
      {label}
      <input name={name} type={type} required={required} maxLength={max} />
    </label>
  );
}
function List({ path, refresh, render }) {
  const [rows, setRows] = useState([]),
    [cursor, setCursor] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(true);
  const epoch = useRef(0);
  useEffect(() => {
    const abort = new AbortController(),
      generation = ++epoch.current;
    setBusy(true);
    setError("");
    request(path, { signal: abort.signal })
      .then((data) => {
        if (generation === epoch.current) {
          setRows(Array.isArray(data) ? data : data.items);
          setCursor(data.nextCursor ?? null);
        }
      })
      .catch((e) => {
        if (e.name !== "AbortError" && generation === epoch.current)
          setError(e.message);
      })
      .finally(() => {
        if (generation === epoch.current) setBusy(false);
      });
    return () => {
      epoch.current++;
      abort.abort();
    };
  }, [path, refresh]);
  async function more() {
    const generation = epoch.current;
    setBusy(true);
    try {
      const data = await request(
        path +
          (path.includes("?") ? "&" : "?") +
          "cursor=" +
          encodeURIComponent(cursor),
      );
      if (generation === epoch.current) {
        setRows((old) => [
          ...new Map([...old, ...data.items].map((r) => [r.id, r])).values(),
        ]);
        setCursor(data.nextCursor);
      }
    } catch (e) {
      if (generation === epoch.current) setError(e.message);
    } finally {
      if (generation === epoch.current) setBusy(false);
    }
  }
  return (
    <>
      {error && <p role="alert">{error}</p>}
      <p role="status">{busy ? "Loading…" : `${rows.length} records`}</p>
      <ul className="product-grid">
        {rows.map((row) => (
          <Row key={row.id ?? row._id}>{render(row)}</Row>
        ))}
      </ul>
      {cursor && (
        <button disabled={busy} onClick={more}>
          Load more records
        </button>
      )}
    </>
  );
}
function Search({ onSearch, label = "Search records" }) {
  return (
    <form
      className="entry"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(new FormData(e.currentTarget).get("q").trim());
      }}
    >
      <Field label={label} name="q" required={false} max={100} />
      <button>Search</button>
    </form>
  );
}
const views = [
  ["blog", "Blog"],
  ["movies", "Movie catalog"],
  ["videos", "Video catalog"],
  ["store", "Commerce"],
  ["admin", "Admin dashboard"],
  ["courses", "LMS"],
  ["jobs", "Job portal"],
  ["social", "Social network"],
  ["projects", "Project platform"],
  ["chat", "Recoverable chat"],
  ["team-expenses", "Expense approvals"],
];

export default function ProductLab({ user, onExpired }) {
  const [view, setView] = useState("blog"),
    [tenants, setTenants] = useState([]),
    [tenant, setTenant] = useState(""),
    [refresh, setRefresh] = useState(0),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [status, setStatus] = useState(""),
    [q, setQ] = useState("");
  const [selected, setSelected] = useState(null),
    [cart, setCart] = useState([]),
    [lessons, setLessons] = useState(null),
    [dashboard, setDashboard] = useState(null),
    [messages, setMessages] = useState([]),
    [streamStatus, setStreamStatus] = useState("Choose a room"),
    [draftOperation, setDraftOperation] = useState(null);
  const role = tenants.find((t) => t.id === tenant)?.role,
    team = "/tenants/" + tenant;
  useEffect(() => {
    const abort = new AbortController();
    request("/tenants", { signal: abort.signal })
      .then(setTenants)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => abort.abort();
  }, [refresh]);
  useEffect(() => {
    setSelected(null);
    setLessons(null);
    setDashboard(null);
    setQ("");
    setError("");
    setStatus("");
  }, [view, tenant]);
  useEffect(() => {
    if (view !== "chat" || !selected) {
      setMessages([]);
      return;
    }
    let active = true;
    const id = selected.id;
    setMessages([]);
    setStreamStatus("Connecting…");
    request("/rooms/" + id + "/messages")
      .then((data) => {
        if (active)
          setMessages((old) =>
            [
              ...new Map(
                [...data.items.reverse(), ...old].map((m) => [m.id, m]),
              ).values(),
            ].sort((a, b) => a.id.localeCompare(b.id)),
          );
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    const stream = new EventSource("/api/lab/rooms/" + id + "/events");
    stream.onopen = () => {
      if (active) setStreamStatus("Connected; history replays after reconnect");
    };
    stream.onerror = () => {
      if (active)
        setStreamStatus(
          "Disconnected; retrying. Check session and room membership.",
        );
    };
    stream.addEventListener("message", (event) => {
      try {
        const row = JSON.parse(event.data);
        if (active)
          setMessages((old) =>
            [...new Map([...old, row].map((m) => [m.id, m])).values()]
              .sort((a, b) => a.id.localeCompare(b.id))
              .slice(-200),
          );
      } catch {
        if (active) setError("Malformed message event");
      }
    });
    return () => {
      active = false;
      stream.close();
    };
  }, [view, selected?.id]);
  async function mutate(action, message = "Saved") {
    if (busy) return false;
    setBusy(true);
    setError("");
    try {
      await action();
      setRefresh((n) => n + 1);
      setStatus(message);
      return true;
    } catch (e) {
      setError(e.message);
      if (e.status === 401) onExpired();
      return false;
    } finally {
      setBusy(false);
    }
  }
  async function submit(event, action) {
    event.preventDefault();
    const form = event.currentTarget,
      body = values(event);
    if (await mutate(() => action(body))) form.reset();
  }
  function switchView(id) {
    setView(id);
    setSelected(null);
    setQ("");
  }
  const search = "?q=" + encodeURIComponent(q);
  return (
    <section className="product-lab">
      <h2>Product engineering lab</h2>
      <p>
        Eleven domain workflows share authenticated persistence. Payment mode is
        a local simulation; no money is moved.
      </p>
      <nav aria-label="Product projects">
        {views.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={view === id}
            onClick={() => switchView(id)}
          >
            {label}
          </button>
        ))}
      </nav>
      <details>
        <summary>Workspaces and roles</summary>
        <p>
          Create a workspace, then add a registered test account as editor or
          viewer. Owner-only actions are checked by the API.
        </p>
        <form
          className="entry"
          onSubmit={(e) =>
            submit(e, async (body) => {
              const row = await send("/tenants", body);
              setTenant(row.id);
            })
          }
        >
          <Field label="Workspace name" />
          <button disabled={busy}>Create workspace</button>
        </form>
        <label>
          Selected workspace
          <select
            aria-label="Selected workspace"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
          >
            <option value="">Choose workspace</option>
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.role})
              </option>
            ))}
          </select>
        </label>
        {tenant && role === "owner" && (
          <form
            className="entry"
            onSubmit={(e) => submit(e, (body) => send(team + "/members", body))}
          >
            <Field
              label="Registered member email"
              name="email"
              type="email"
              max={254}
            />
            <label>
              Member role
              <select aria-label="Member role" name="role">
                <option>editor</option>
                <option>viewer</option>
              </select>
            </label>
            <button disabled={busy}>Add or update member</button>
          </form>
        )}
      </details>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <p role="status">{busy ? "Saving…" : status}</p>
      <h3>{views.find((v) => v[0] === view)[1]}</h3>
      <button
        disabled={busy}
        className="secondary"
        onClick={() => setRefresh((n) => n + 1)}
      >
        Refresh product records
      </button>
      {view === "blog" && (
        <>
          <Search onSearch={setQ} label="Search articles" />
          <form
            className="entry"
            onSubmit={(e) => submit(e, (body) => send("/articles", body))}
          >
            <Field label="Article title" />
            <label>
              Article body
              <textarea name="body" required maxLength={8000} />
            </label>
            <button disabled={busy}>Save draft</button>
          </form>
          <List
            path={"/articles" + search}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>{row.body}</p>
                <p>
                  {row.status} · version {row.version}
                </p>
                {row.owner === user.id && (
                  <>
                    <button disabled={busy} onClick={() => setSelected(row)}>
                      Edit article
                    </button>
                    <button
                      disabled={busy}
                      onClick={() =>
                        mutate(() =>
                          send(
                            "/articles/" + row.id,
                            {
                              ...pickArticle(row),
                              status:
                                row.status === "draft" ? "published" : "draft",
                            },
                            "PATCH",
                          ),
                        )
                      }
                    >
                      {row.status === "draft" ? "Publish" : "Unpublish"}
                    </button>
                    <button
                      disabled={busy}
                      onClick={() =>
                        mutate(() =>
                          request("/articles/" + row.id, { method: "DELETE" }),
                        )
                      }
                    >
                      Delete article
                    </button>
                  </>
                )}
              </>
            )}
          />
          {selected && (
            <form
              key={selected.id}
              className="entry"
              onSubmit={(e) =>
                submit(e, async (body) => {
                  await send(
                    "/articles/" + selected.id,
                    {
                      ...body,
                      status: selected.status,
                      version: selected.version,
                    },
                    "PATCH",
                  );
                  setSelected(null);
                })
              }
            >
              <label>
                Edit article title
                <input
                  name="title"
                  defaultValue={selected.title}
                  required
                  maxLength={160}
                />
              </label>
              <label>
                Edit article body
                <textarea
                  name="body"
                  defaultValue={selected.body}
                  required
                  maxLength={8000}
                />
              </label>
              <button disabled={busy}>Save article changes</button>
            </form>
          )}
        </>
      )}
      {view === "movies" && (
        <>
          <Search onSearch={setQ} label="Search movies" />
          <p>
            The catalog uses original fictional fixtures, allowing deterministic
            offline practice.
          </p>
          <List
            path={"/catalog/movies" + search}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>
                  {row.genre} · {row.year}
                </p>
                <button
                  onClick={() =>
                    mutate(async () =>
                      setSelected(await request("/catalog/movies/" + row.id)),
                    )
                  }
                >
                  Movie details
                </button>
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(() => send("/favorites", { movie: row.id }))
                  }
                >
                  Save favorite
                </button>
              </>
            )}
          />
          {selected && <p>{selected.synopsis}</p>}
          <h4>Saved favorites</h4>
          <List
            path="/favorites"
            refresh={refresh}
            render={(row) => (
              <>
                <p>{row.movie}</p>
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(() =>
                      request("/favorites/" + row.id, { method: "DELETE" }),
                    )
                  }
                >
                  Remove favorite
                </button>
              </>
            )}
          />
        </>
      )}
      {view === "videos" && (
        <>
          <p>
            Generated local sample media has captions. The second storyboard
            deliberately has no video; missing media is visible.
          </p>
          <List
            path="/catalog/videos"
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>{row.description}</p>
                {row.source ? (
                  <video
                    controls
                    preload="none"
                    onError={() =>
                      setError("Playback failed. Check the local media file.")
                    }
                  >
                    <source src={row.source} type="video/webm" />
                    <track
                      kind="captions"
                      src={row.captions}
                      srcLang="en"
                      label="English"
                      default
                    />
                  </video>
                ) : (
                  <p>No video attached; the text lesson is available.</p>
                )}
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(() => send("/playlists", { video: row.id }))
                  }
                >
                  Add to playlist
                </button>
              </>
            )}
          />
          <h4>Playlist</h4>
          <List
            path="/playlists"
            refresh={refresh}
            render={(row) => (
              <>
                <p>{row.video}</p>
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(() =>
                      request("/playlists/" + row.id, { method: "DELETE" }),
                    )
                  }
                >
                  Remove playlist item
                </button>
              </>
            )}
          />
        </>
      )}
      {view === "store" && (
        <>
          <Search onSearch={setQ} label="Search products" />
          {tenant && role !== "viewer" && (
            <form
              className="entry"
              onSubmit={(e) =>
                submit(e, (body) =>
                  send(team + "/products", {
                    title: body.title,
                    cents: parseMoney(body.amount),
                    stock: Number(body.stock),
                  }),
                )
              }
            >
              <Field label="Product title" />
              <Field label="Unit price INR" name="amount" />
              <Field label="Initial stock" name="stock" type="number" />
              <button disabled={busy}>Create product</button>
            </form>
          )}
          <List
            path={"/products" + search}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>
                  {formatMoney(row.cents)} · stock {row.stock}
                </p>
                <button
                  onClick={() =>
                    setCart((old) => {
                      const existing = old.find((p) => p.id === row.id);
                      return existing
                        ? old.map((p) =>
                            p.id === row.id
                              ? {
                                  ...p,
                                  quantity: Math.min(100, p.quantity + 1),
                                }
                              : p,
                          )
                        : [
                            ...old,
                            {
                              ...row,
                              quantity: 1,
                              operation: crypto.randomUUID(),
                            },
                          ];
                    })
                  }
                >
                  Add to cart
                </button>
              </>
            )}
          />
          <h4>Cart estimates</h4>
          <ul>
            {cart.map((p) => (
              <li key={p.id}>
                {p.title}
                <label>
                  Quantity for {p.title}
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={p.quantity}
                    onChange={(e) => {
                      const quantity = Number(e.target.value);
                      if (
                        Number.isInteger(quantity) &&
                        quantity >= 1 &&
                        quantity <= 100
                      )
                        setCart((old) =>
                          old.map((r) =>
                            r.id === p.id
                              ? {
                                  ...r,
                                  quantity,
                                  operation: crypto.randomUUID(),
                                }
                              : r,
                          ),
                        );
                    }}
                  />
                </label>
                <button
                  onClick={() =>
                    setCart((old) => old.filter((r) => r.id !== p.id))
                  }
                >
                  Remove cart item
                </button>
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(async () => {
                      await send("/orders", {
                        product: p.id,
                        quantity: p.quantity,
                        operation: p.operation,
                      });
                      setCart((old) => old.filter((r) => r.id !== p.id));
                    }, "Reserved at the authoritative server price")
                  }
                >
                  Reserve {p.title}
                </button>
              </li>
            ))}
          </ul>
          <p>
            Estimated total:{" "}
            {formatMoney(
              cart.reduce((sum, p) => sum + p.cents * p.quantity, 0),
            )}
            . Each reservation is one independent order; the server checks price
            and stock.
          </p>
          <h4>Orders</h4>
          <List
            path="/orders"
            refresh={refresh}
            render={(row) => (
              <>
                <p>
                  {row.id} · {row.status} · {formatMoney(row.cents)}
                </p>
                {row.status === "reserved" && (
                  <>
                    <button
                      disabled={busy}
                      onClick={() =>
                        mutate(() => send("/orders/" + row.id + "/cancel", {}))
                      }
                    >
                      Cancel reservation
                    </button>
                    <button
                      disabled={busy}
                      onClick={() =>
                        mutate(
                          () =>
                            send("/orders/" + row.id + "/simulate-payment", {}),
                          "Local payment simulation completed",
                        )
                      }
                    >
                      Simulate test payment
                    </button>
                  </>
                )}
              </>
            )}
          />
        </>
      )}
      {["admin", "projects", "courses", "chat", "team-expenses"].includes(
        view,
      ) &&
        !tenant && (
          <p>Select or create a workspace under Workspaces and roles.</p>
        )}
      {view === "admin" && tenant && (
        <>
          <p>
            Owner permission is required for aggregates and audit. Permission
            changes are checked on every API call.
          </p>
          <button
            disabled={busy}
            onClick={() =>
              mutate(
                async () => setDashboard(await request(team + "/dashboard")),
                "Dashboard loaded",
              )
            }
          >
            Load dashboard
          </button>
          {dashboard && (
            <>
              <dl>
                {Object.entries(dashboard.counts).map(([name, count]) => (
                  <React.Fragment key={name}>
                    <dt>{name}</dt>
                    <dd>{count}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <ul>
                {dashboard.expenses.map((row) => (
                  <li key={row._id}>
                    {row._id}: {formatMoney(row.cents)} ({row.count})
                  </li>
                ))}
              </ul>
            </>
          )}
          <Search onSearch={setQ} label="Search audit actions" />
          <List
            path={team + "/audit" + search}
            refresh={refresh}
            render={(row) => (
              <>
                <p>{row.action}</p>
                <p>
                  {row.record} · {row.createdAt}
                </p>
              </>
            )}
          />
        </>
      )}
      {view === "courses" && tenant && (
        <>
          {role !== "viewer" && (
            <form
              className="entry"
              onSubmit={(e) =>
                submit(e, (body) =>
                  send(team + "/courses", {
                    title: body.title,
                    lessons: body.lessons.split("\n").filter(Boolean),
                  }),
                )
              }
            >
              <Field label="Course title" />
              <label>
                Lesson texts one per line
                <textarea name="lessons" required maxLength={6000} />
              </label>
              <button disabled={busy}>Create course</button>
            </form>
          )}
          <List
            path="/courses"
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>{row.lessonCount} lessons</p>
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(() => send("/courses/" + row.id + "/enroll", {}))
                  }
                >
                  Enroll
                </button>
                <button
                  disabled={busy}
                  onClick={() =>
                    mutate(async () => {
                      setLessons(
                        await request("/courses/" + row.id + "/lessons"),
                      );
                      setSelected(row);
                    }, "Lessons loaded")
                  }
                >
                  Open lessons
                </button>
              </>
            )}
          />
          {lessons && (
            <ol>
              {lessons.lessons.map((body, index) => (
                <li key={index}>
                  <p>{body}</p>
                  <button
                    disabled={busy || lessons.completed.includes(index + 1)}
                    onClick={() =>
                      mutate(async () => {
                        await send("/courses/" + selected.id + "/progress", {
                          lesson: index + 1,
                        });
                        setLessons(
                          await request("/courses/" + selected.id + "/lessons"),
                        );
                      }, "Progress saved")
                    }
                  >
                    {lessons.completed.includes(index + 1)
                      ? "Completed"
                      : "Mark lesson complete"}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
      {view === "jobs" && (
        <>
          {tenant && role !== "viewer" && (
            <form
              className="entry"
              onSubmit={(e) => submit(e, (body) => send(team + "/jobs", body))}
            >
              <Field label="Job title" />
              <label>
                Job description
                <textarea name="body" required maxLength={2000} />
              </label>
              <button disabled={busy}>Publish job</button>
            </form>
          )}
          <Search onSearch={setQ} label="Search jobs" />
          <List
            path={"/jobs" + search}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>{row.body}</p>
                <button onClick={() => setSelected(row)}>
                  Apply or review applications
                </button>
              </>
            )}
          />
          {selected && (
            <>
              <form
                className="entry"
                onSubmit={(e) =>
                  submit(e, async ({resume,...body}) => {
                    if(resume?.size){
                      if(resume.size>8192)throw new Error('Test PDF must be at most 8 KiB');
                      const bytes=new Uint8Array(await resume.arrayBuffer());
                      body.resume=btoa(String.fromCharCode(...bytes));
                    }
                    return send("/jobs/" + selected.id + "/apply", body);
                  })
                }
              >
                <label>
                  Cover letter
                  <textarea name="coverLetter" required maxLength={4000} />
                </label>
                <label>Optional test PDF, maximum 8 KiB<input name="resume" type="file" accept="application/pdf" /></label>
                <button disabled={busy}>Submit application</button>
              </form>
              <p>
                Duplicate applications are rejected. Staff permissions are
                required below.
              </p>
              <List
                path={"/jobs/" + selected.id + "/applications"}
                refresh={refresh}
                render={(row) => (
                  <>
                    <p>
                      {row.coverLetter} · {row.status}
                    </p>
                    {row.hasResume && (
                      <a href={"/api/lab/applications/" + row.id + "/resume"}>
                        Download restricted test resume
                      </a>
                    )}
                    <label>
                      Review application
                      <select
                        aria-label="Review application"
                        value={row.status}
                        disabled={busy}
                        onChange={(e) =>
                          mutate(() =>
                            send(
                              "/applications/" + row.id,
                              { status: e.target.value, version: row.version },
                              "PATCH",
                            ),
                          )
                        }
                      >
                        {["submitted", "reviewing", "accepted", "rejected"].map(
                          (s) => (
                            <option key={s}>{s}</option>
                          ),
                        )}
                      </select>
                    </label>
                  </>
                )}
              />
            </>
          )}
        </>
      )}
      {view === "social" && (
        <>
          <p>Your profile id: {user.id}</p>
          <form
            className="entry"
            onSubmit={(e) => submit(e, (body) => send("/follows", body))}
          >
            <Field label="Follow profile id" name="target" max={24} />
            <button disabled={busy}>Follow profile</button>
          </form>
          <form
            className="entry"
            onSubmit={(e) => submit(e, (body) => send("/posts", body))}
          >
            <label>
              Post text
              <textarea name="body" required maxLength={2000} />
            </label>
            <label>
              Post visibility
              <select aria-label="Post visibility" name="visibility">
                <option>public</option>
                <option>followers</option>
                <option>private</option>
              </select>
            </label>
            <button disabled={busy}>Create post</button>
          </form>
          <List
            path="/feed"
            refresh={refresh}
            render={(row) => (
              <>
                <p>{row.body}</p>
                <p>
                  {row.visibility} · author {row.owner}
                </p>
                {row.owner === user.id && (
                  <label>
                    Change post visibility
                    <select
                      aria-label="Change post visibility"
                      value={row.visibility}
                      disabled={busy}
                      onChange={(e) =>
                        mutate(() =>
                          send(
                            "/posts/" + row.id,
                            {
                              body: row.body,
                              visibility: e.target.value,
                              version: row.version,
                            },
                            "PATCH",
                          ),
                        )
                      }
                    >
                      {["public", "followers", "private"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                )}
              </>
            )}
          />
        </>
      )}
      {view === "projects" && tenant && (
        <>
          {role !== "viewer" && (
            <form
              className="entry"
              onSubmit={(e) =>
                submit(e, (body) => send(team + "/projects", body))
              }
            >
              <Field label="Project title" />
              <label>
                Project description
                <textarea name="body" required maxLength={2000} />
              </label>
              <button disabled={busy}>Create project</button>
            </form>
          )}
          <List
            path={team + "/projects"}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <button onClick={() => setSelected(row)}>Open project</button>
              </>
            )}
          />
          {selected && (
            <>
              <h4>{selected.title}</h4>
              <form
                className="entry"
                onSubmit={(e) =>
                  submit(e, (body) =>
                    send("/projects/" + selected.id + "/tasks", body),
                  )
                }
              >
                <Field label="Team task title" />
                <button disabled={busy || role === "viewer"}>
                  Create team task
                </button>
              </form>
              <List
                path={"/projects/" + selected.id + "/tasks"}
                refresh={refresh}
                render={(row) => (
                  <>
                    <h4>{row.title}</h4>
                    <label>
                      Team task status
                      <select
                        aria-label="Team task status"
                        value={row.status}
                        disabled={busy || role === "viewer"}
                        onChange={(e) =>
                          mutate(() =>
                            send(
                              "/project-tasks/" + row.id,
                              {
                                title: row.title,
                                status: e.target.value,
                                version: row.version,
                              },
                              "PATCH",
                            ),
                          )
                        }
                      >
                        {["todo", "doing", "done"].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <form
                      onSubmit={(e) =>
                        submit(e, (body) =>
                          send("/project-tasks/" + row.id + "/comments", body),
                        )
                      }
                    >
                      <label>
                        Comment on {row.title}
                        <textarea name="body" required maxLength={2000} />
                      </label>
                      <button disabled={busy || role === "viewer"}>
                        Add comment
                      </button>
                    </form>
                    <List
                      path={"/project-tasks/" + row.id + "/comments"}
                      refresh={refresh}
                      render={(comment) => <p>{comment.body}</p>}
                    />
                  </>
                )}
              />
            </>
          )}
          <h4>Recoverable notifications</h4>
          <List
            path="/notifications"
            refresh={refresh}
            render={(row) => (
              <p>
                {row.body} · task {row.task}
              </p>
            )}
          />
        </>
      )}
      {view === "chat" && tenant && (
        <>
          {role !== "viewer" && (
            <form
              className="entry"
              onSubmit={(e) => submit(e, (body) => send(team + "/rooms", body))}
            >
              <Field label="Room title" />
              <button disabled={busy}>Create room</button>
            </form>
          )}
          <List
            path={team + "/rooms"}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <button onClick={() => setSelected(row)}>Join room view</button>
              </>
            )}
          />
          {selected && (
            <>
              <h4>{selected.title}</h4>
              <p role="status">{streamStatus}</p>
              <ul>
                {messages.map((row) => (
                  <li key={row.id}>
                    {row.body} · {row.owner}
                  </li>
                ))}
              </ul>
              <form
                className="entry"
                onSubmit={(e) =>
                  submit(e, async (body) => {
                    const operation = draftOperation ?? crypto.randomUUID();
                    setDraftOperation(operation);
                    await send("/rooms/" + selected.id + "/messages", {
                      body: body.body,
                      operation,
                    });
                    setDraftOperation(null);
                  })
                }
              >
                <label>
                  Message text
                  <textarea
                    name="body"
                    required
                    maxLength={2000}
                    onChange={() => setDraftOperation(null)}
                  />
                </label>
                <button disabled={busy}>Send message</button>
              </form>
            </>
          )}
        </>
      )}
      {view === "team-expenses" && tenant && (
        <>
          <form
            className="entry"
            onSubmit={(e) =>
              submit(e, (body) =>
                send(team + "/expenses", {
                  title: body.title,
                  cents: parseMoney(body.amount),
                  category: body.category,
                  date: body.date,
                }),
              )
            }
          >
            <Field label="Team expense title" />
            <Field label="Team amount INR" name="amount" />
            <Field label="Expense date" name="date" type="date" />
            <label>
              Team expense category
              <select aria-label="Team expense category" name="category">
                {["food", "travel", "learning", "other"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <button disabled={busy || role === "viewer"}>
              Submit team expense
            </button>
          </form>
          <Search onSearch={setQ} label="Search team expenses" />
          <List
            path={team + "/expenses" + search}
            refresh={refresh}
            render={(row) => (
              <>
                <h4>{row.title}</h4>
                <p>
                  {formatMoney(row.cents)} · {row.category} · {row.date} ·{" "}
                  {row.status}
                </p>
                {role === "owner" &&
                  row.owner !== user.id &&
                  row.status === "submitted" && (
                    <>
                      <button
                        disabled={busy}
                        onClick={() =>
                          mutate(() =>
                            send(
                              "/team-expenses/" + row.id,
                              { status: "approved", version: row.version },
                              "PATCH",
                            ),
                          )
                        }
                      >
                        Approve expense
                      </button>
                      <button
                        disabled={busy}
                        onClick={() =>
                          mutate(() =>
                            send(
                              "/team-expenses/" + row.id,
                              { status: "rejected", version: row.version },
                              "PATCH",
                            ),
                          )
                        }
                      >
                        Reject expense
                      </button>
                    </>
                  )}
              </>
            )}
          />
        </>
      )}
    </section>
  );
}
function pickArticle(row) {
  return { title: row.title, body: row.body, version: row.version };
}
