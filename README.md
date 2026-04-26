# Doodle frontend Assessment — chat UI

React + TypeScript client for the [Doodle Frontend Challenge Chat API](https://github.com/DoodleScheduling/frontend-challenge-chat-api). Design references the [hiring challenge mockup](https://github.com/DoodleScheduling/hiring-challenges/tree/master/frontend-engineer) (`public/reference/chat.png`, background asset).

## Prerequisites

- Node.js 20+
- API running locally (Docker recommended): clone `DoodleScheduling/frontend-challenge-chat-api` and run `docker compose up`.

## Setup

```bash
cp .env.example .env   # Windows: copy .env.example .env
npm install
npm run dev
```

Open the URL printed by Vite (default `http://localhost:5173`).

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API origin, default `http://localhost:3000` |
| `VITE_API_TOKEN` | Bearer token, default `super-secret-doodle-token` |
| `VITE_POLL_INTERVAL_MS` | Base poll interval in ms (default `15000`, min `2000`) |

## Stack

- **React + TypeScript + Vite**
- **TanStack Query** for message loading, polling, and send mutation + cache updates
- **React Context** for session UI (welcome / author name) with `localStorage` persistence

## Behaviour

- Loads recent messages, keeps chronological order, scrolls on new items.
- Polls for newer messages (`after` cursor) with adaptive timing: normal while the tab is active, slower when the tab is in the background, and polling pauses while offline (TanStack Query refetch + query defaults).
- On first visit, a welcome dialog asks for **your name** once, stores it in `localStorage`, and uses it as `author` on send; messages from that author render on the right (yellow bubble) like the reference.
- Client-side validation matches API rules (author pattern, lengths).

## Scripts

- `npm run dev` — development server
- `npm run build` — typecheck + production bundle
- `npm run preview` — preview production build
