export class ApiError extends Error {
  constructor(status, code, message) {super(message); this.status=status; this.code=code;}
}
export function fail(status, code, message) {throw new ApiError(status,code,message);}
export function object(body, allowed) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400,'VALIDATION','Expected an object');
  if (Object.keys(body).some(key => !allowed.includes(key))) fail(400,'VALIDATION','Unknown field');
}
export function text(value, name, max=160) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) fail(400,'VALIDATION',`${name} is required and must be at most ${max} characters`);
  return value.trim();
}
export function credentials(body) {
  object(body,['email','password']);
  const email=text(body.email,'Email',254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400,'VALIDATION','Enter a valid email');
  if (typeof body.password !== 'string' || body.password.length < 12 || body.password.length > 128) fail(400,'VALIDATION','Password must contain 12 to 128 characters');
  return {email,password:body.password};
}
export function task(body, update=false) {
  object(body,update?['title','status','version']:['title']);
  const result={title:text(body.title,'Title')};
  if (update) {
    if (!['todo','doing','done'].includes(body.status)) fail(400,'VALIDATION','Invalid task status');
    if (!Number.isSafeInteger(body.version) || body.version < 0) fail(400,'VALIDATION','Invalid version');
    result.status=body.status; result.version=body.version;
  }
  return result;
}
export function bookmark(body) {
  object(body,['title','url']);
  const title=text(body.title,'Title');
  const raw=text(body.url,'URL',2048); let url;
  try {url=new URL(raw);} catch {fail(400,'VALIDATION','Enter a complete HTTP or HTTPS URL');}
  if (!['http:','https:'].includes(url.protocol) || url.username || url.password) fail(400,'VALIDATION','Only HTTP or HTTPS URLs without credentials are allowed');
  // Store only; never fetch a user-provided URL on the server.
  return {title,url:url.href};
}
export function expense(body) {
  object(body,['title','category','cents','date']);
  const title=text(body.title,'Title');
  if (!['food','travel','learning','other'].includes(body.category)) fail(400,'VALIDATION','Invalid expense category');
  if (!Number.isSafeInteger(body.cents) || body.cents < 1 || body.cents > 100_000_000) fail(400,'VALIDATION','Amount must be positive integer cents, at most 100000000');
  if (typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date) || Number(body.date.slice(0,4)) < 1900) fail(400,'VALIDATION','Invalid date');
  const parsed=new Date(`${body.date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0,10)!==body.date) fail(400,'VALIDATION','Invalid calendar date');
  return {title,category:body.category,cents:body.cents,date:body.date};
}
