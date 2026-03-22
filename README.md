# Qatar Airways Flight Tracker

## UIDOH 

I am working on the UI for this project to make it user-friendly for newcomers. For now, I am handling [this contribution](https://github.com/yaya2devops/qatarairways-tracker/blob/merge-UIDOH/README.md).

This project is the creation and co-authorship of Abul Moeed as per the following;

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

---

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
EMAIL_HOST=smtp.yourserver.com
EMAIL_PORT=587
EMAIL_USER=you@yourdomain.com
EMAIL_PASS=your_password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=you@yourdomain.com,someone@else.com
PORT=3000
```

### 3. Run locally

```bash
npm run start:dev                        # development (watch mode)
npm run build && npm run start:prod      # production
```

On startup, a headless browser automatically captures a valid Qatar Airways session. No manual cookie management needed.

---

## Docker

### Server setup (step by step)

You only need two files on the server — no need to clone the full repo.

#### Step 1 — Create a directory

```bash
mkdir qatarairways-tracker && cd qatarairways-tracker
```

#### Step 2 — Download the compose and env files

```bash
curl -O https://raw.githubusercontent.com/msamoeed/qatarairways-tracker/main/docker-compose.yml
curl -O https://raw.githubusercontent.com/msamoeed/qatarairways-tracker/main/.env.example
```

#### Step 3 — Create your env file

```bash
cp .env.example .env
nano .env   # or vim .env / any editor you prefer
```

Fill in the following values:

```env
EMAIL_HOST=smtp.yourserver.com
EMAIL_PORT=587
EMAIL_USER=you@yourdomain.com
EMAIL_PASS=your_password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=you@yourdomain.com,someone@else.com
PORT=3000
```

#### Step 4 — Pull the image

```bash
docker compose pull
```

This pulls `ghcr.io/msamoeed/qatarairways-tracker:latest` — no login required, the image is public.

#### Step 5 — Start the container

```bash
docker compose up -d
```

#### Step 6 — Verify it's running

```bash
docker compose ps
docker compose logs -f
```

You should see:

```text
[SessionService] No valid session on startup — fetching one now…
[CookieRefresherService] Launching headless browser to capture fresh QR session…
[CookieRefresherService] Loading homepage…
[CookieRefresherService] Loading search results page…
[NestApplication] Nest application successfully started
Qatar Airways Tracker running on http://localhost:3000
```

#### Step 7 — Test your email

```bash
curl -X POST http://your-server:7432/notifier/test
```

Check your inbox for the test email.

#### Step 8 — Add flights to track

```bash
# Track a single date
curl -X POST http://your-server:7432/flights \
  -H "Content-Type: application/json" \
  -d '{"origin":"DOH","destination":"ISB","departureDate":"2026-03-29","cabinClass":"ECONOMY"}'

# Or track a full date range
curl -X POST http://your-server:7432/flights/range \
  -H "Content-Type: application/json" \
  -d '{"origin":"DOH","destination":"ISB","from":"2026-03-15","to":"2026-04-04","cabinClass":"ECONOMY"}'
```

The tracker will now poll every 10 minutes and email you the moment anything changes.

---

#### Updating to the latest version

```bash
docker compose pull && docker compose up -d
```

---

### Option A — Build locally

```bash
cp .env.example .env   # fill in your values

docker compose up -d
```

### Option B — Pull from GitHub Container Registry (recommended for servers)

Every push to `main` automatically builds and pushes the image to GHCR via GitHub Actions.

**First-time setup on the server:**

```bash
# Copy and fill in your environment file
cp .env.example .env

# Pull and start (no login needed — public image)
docker compose pull
docker compose up -d
```

**Update to the latest image:**

```bash
docker compose pull && docker compose up -d
```

**View logs:**

```bash
docker compose logs -f
```

The app is exposed on port **7432** (`http://your-server:7432`).

The SQLite database is persisted in a Docker volume (`tracker-data`) and survives container restarts and image updates.

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
curl -X POST http://localhost:7432/flights \
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
curl -X POST http://localhost:7432/flights/range \
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
curl -X PATCH http://localhost:7432/flights/1/active \
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

## CI/CD

GitHub Actions workflow at [.github/workflows/docker.yml](.github/workflows/docker.yml) triggers on every push to `main`:

1. Builds the Docker image
2. Pushes to GitHub Container Registry as:
   - `ghcr.io/msamoeed/qatarairways-tracker:latest`
   - `ghcr.io/msamoeed/qatarairways-tracker:sha-abc1234`

No secrets needed — uses the built-in `GITHUB_TOKEN`. The image is public and can be pulled without authentication.

---

## Database

SQLite — stored as a file in the `tracker-data` Docker volume (or `tracker.db` locally). No separate database server needed. Tables are auto-created on first run.

---

## Session management

Qatar Airways uses Akamai bot protection. The tracker handles this automatically:

1. On startup — launches headless Chrome, visits the QR homepage, captures cookies
2. Sessions are stored in the DB with a 2-hour TTL
3. Proactively refreshes 15 minutes before expiry
4. On any `400`/`401`/`403` response — immediately refreshes and retries
