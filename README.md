# Qatar Airways Flight Tracker

Automatically monitors Qatar Airways flight availability and sends email alerts the moment anything changes — new availability, sold out, price movements, or seat count changes.

## How it works

- Polls the Qatar Airways API every **10 minutes**
- Compares each result against the last known state
- Sends an email **immediately** when anything changes
- Manages session cookies automatically via a headless browser (Playwright)

## Email triggers

| Event | Subject |
|-------|---------|
| Flight becomes available | `🟢 QR DOH→ISB 2026-03-29: Now Available` |
| Flight sells out | `🔴 QR DOH→ISB 2026-03-29: Sold Out / Removed` |
| Price changes | `💰 QR DOH→ISB 2026-03-29: Price Changed` |
| Seat count changes | `💺 QR DOH→ISB 2026-03-29: Seats Changed` |

## Setup

### 1. Install dependencies

```bash
npm install
npx playwright install chromium
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
EMAIL_HOST=your.smtp.server.com
EMAIL_PORT=587
EMAIL_USER=you@yourdomain.com
EMAIL_PASS=your_password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=you@yourdomain.com
PORT=3000
```

### 3. Run

```bash
npm run start:dev      # development (watch mode)
npm run build && npm run start:prod   # production
```

On startup, a headless browser automatically captures a valid Qatar Airways session. No manual cookie management needed.

---

## API

### Flights

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/flights` | List all tracked flights |
| `POST` | `/flights` | Track a single date |
| `POST` | `/flights/range` | Track every day in a date range |
| `POST` | `/flights/check-now` | Trigger a manual check immediately |
| `PATCH` | `/flights/:id/active` | Pause or resume a tracked flight |
| `DELETE` | `/flights/:id` | Remove a tracked flight |

#### Track a single date

```bash
curl -X POST http://localhost:3000/flights \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "DOH",
    "destination": "ISB",
    "departureDate": "2026-03-29",
    "cabinClass": "ECONOMY",
    "adults": 1
  }'
```

#### Track a date range

```bash
curl -X POST http://localhost:3000/flights/range \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "DOH",
    "destination": "ISB",
    "from": "2026-03-15",
    "to": "2026-04-04",
    "cabinClass": "ECONOMY"
  }'
```

#### Pause tracking

```bash
curl -X PATCH http://localhost:3000/flights/1/active \
  -H "Content-Type: application/json" \
  -d '{"isActive": false}'
```

### Session

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/session` | View current session metadata |
| `POST` | `/session/refresh` | Force a cookie refresh via Playwright |

### Notifier

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/notifier/test` | Send a test email to verify SMTP |

---

## Docker

```bash
cp .env.example .env
# fill in .env

docker compose up -d
```

The SQLite database is persisted in a Docker volume (`tracker-data`) so it survives container restarts and rebuilds.

To view logs:

```bash
docker compose logs -f
```

To rebuild after code changes:

```bash
docker compose up -d --build
```

---

## Database

SQLite — stored as `tracker.db` in the project root. No separate database server needed. Tables are auto-created on first run.

## Session management

Qatar Airways uses Akamai bot protection. The tracker handles this automatically:

1. On startup — launches headless Chrome, visits the QR homepage, captures cookies
2. Sessions are stored in the DB with a 2-hour TTL
3. Proactively refreshes 15 minutes before expiry
4. On any `400`/`401`/`403` response — immediately refreshes and retries
