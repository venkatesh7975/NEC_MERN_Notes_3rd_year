// Injectable timers keep the contract testable without arbitrary real delays.
export function debounce(fn, delay, clock = globalThis) {
  if (typeof fn !== 'function' || !Number.isFinite(delay) || delay < 0) throw new TypeError('Invalid debounce arguments');
  let timer, receiver, args;
  function invoke() {
    const callArgs = args, callReceiver = receiver;
    timer = undefined; args = receiver = undefined;
    return fn.apply(callReceiver, callArgs);
  }
  function wrapped(...values) {
    if (timer !== undefined) clock.clearTimeout(timer);
    receiver = this; args = values;
    timer = clock.setTimeout(invoke, delay);
  }
  wrapped.cancel = () => {
    if (timer !== undefined) clock.clearTimeout(timer);
    timer = args = receiver = undefined;
  };
  wrapped.flush = () => {
    if (timer === undefined) return undefined;
    clock.clearTimeout(timer);
    return invoke();
  };
  return wrapped;
}

export class LRUCache {
  #entries = new Map();
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new RangeError('Capacity must be a positive integer');
    this.capacity = capacity;
  }
  has(key) { return this.#entries.has(key); }
  get size() { return this.#entries.size; }
  get(key) {
    if (!this.#entries.has(key)) return undefined;
    const value = this.#entries.get(key);
    this.#entries.delete(key); this.#entries.set(key, value);
    return value;
  }
  set(key, value) {
    this.#entries.delete(key); this.#entries.set(key, value);
    if (this.#entries.size > this.capacity) this.#entries.delete(this.#entries.keys().next().value);
    return this;
  }
}

export class EventEmitter {
  #events = new Map();
  on(event, listener) {
    if (typeof listener !== 'function') throw new TypeError('Listener must be a function');
    const listeners = this.#events.get(event) ?? new Set();
    listeners.add(listener); this.#events.set(event, listeners);
    return () => {
      listeners.delete(listener);
      if (!listeners.size) this.#events.delete(event);
    };
  }
  once(event, listener) {
    const unsubscribe = this.on(event, (...args) => { unsubscribe(); listener(...args); });
    return unsubscribe;
  }
  emit(event, ...args) {
    // Changes to listeners affect the next dispatch. A thrown error stops dispatch.
    for (const listener of [...(this.#events.get(event) ?? [])]) listener(...args);
  }
}

// Outcomes always retain input order. Rejections do not cancel peers.
export async function promisePool(tasks, limit) {
  if (!Array.isArray(tasks) || tasks.some(task => typeof task !== 'function')) throw new TypeError('Expected task factories');
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('Limit must be a positive integer');
  const outcomes = Array(tasks.length);
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const index = next++;
      try { outcomes[index] = {status: 'fulfilled', value: await tasks[index]()}; }
      catch (reason) { outcomes[index] = {status: 'rejected', reason}; }
    }
  }
  await Promise.all(Array.from({length: Math.min(limit, tasks.length)}, worker));
  return outcomes;
}

export function twoSum(numbers, target) {
  const seen = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const complement = target - numbers[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(numbers[i], i);
  }
  return null;
}

export function countTargetSubarrays(numbers, target) {
  const counts = new Map([[0, 1]]);
  let prefix = 0, result = 0;
  for (const number of numbers) {
    prefix += number;
    result += counts.get(prefix - target) ?? 0;
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
  }
  return result;
}
