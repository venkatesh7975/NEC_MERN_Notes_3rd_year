// 003 Advanced Custom Event Bus & Debounce Utility

// 1. Debounce Function Utility
function debounce(fn, delayMs) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

// 2. Custom Event Emitter Class
class LMSStore {
  constructor() {
    this.events = {};
    this.state = { cart: [], user: null };
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }

  setUser(user) {
    this.state.user = user;
    this.emit('userChanged', user);
  }
}

// Instantiate and test
const store = new LMSStore();

store.on('userChanged', (user) => {
  console.log('[STORE EVENT] User updated state:', user);
});

store.setUser({ name: 'Diana Prince', email: 'diana@hero.com' });

const handleSearch = debounce((query) => {
  console.log(`[DEBOUNCED SEARCH] Executing search for term: "${query}"`);
}, 300);

handleSearch('React');
handleSearch('React 19');
handleSearch('React 19 Masterclass');
