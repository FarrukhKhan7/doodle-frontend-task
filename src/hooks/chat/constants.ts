export const POLL_MS = (() => {
  const raw = import.meta.env.VITE_POLL_INTERVAL_MS;
  const n = raw != null && raw !== '' ? Number(raw) : NaN;
  return Number.isFinite(n) && n >= 2000 ? n : 15000;
})();

export const PAGE_SIZE = 100;
export const HIDDEN_TAB_MIN_POLL_MS = 20000;
export const AUTHOR_KEY = 'doodle-chat-author';
