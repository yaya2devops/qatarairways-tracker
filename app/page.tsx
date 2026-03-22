'use client'

import React, { useState } from 'react'
import {
  Menu,
  X,
  ChevronRight,
  Copy,
  Check,
  Github,
  Clock,
  Zap,
  Mail,
  AlertCircle,
  Database,
  Cloud,
  Terminal,
  Plane,
  Radio,
  Package,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'

const GH = 'https://github.com/msamoeed/qatarairways-tracker'
const GHCR_PACKAGE = 'https://github.com/msamoeed/qatarairways-tracker/pkgs/container/qatarairways-tracker'
const RAW = 'https://raw.githubusercontent.com/msamoeed/qatarairways-tracker/main'
const GHCR = 'ghcr.io/msamoeed/qatarairways-tracker:latest'

/** Qatar Airways digital palette */
const QR = {
  burgundy: '#662046',
  burgundySafe: '#660033',
  grey1: '#818A8F',
  grey2: '#5E6A71',
  grey3: '#8E8F8B',
} as const

const ENV_LINES = `EMAIL_HOST=smtp.yourserver.com
EMAIL_PORT=587
EMAIL_USER=you@yourdomain.com
EMAIL_PASS=your_password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=you@yourdomain.com,someone@else.com
PORT=3000`

const DOCKER_LOG_SAMPLE = `[SessionService] No valid session on startup — fetching one now…
[CookieRefresherService] Launching headless browser to capture fresh QR session…
[CookieRefresherService] Loading homepage…
[CookieRefresherService] Loading search results page…
[NestApplication] Nest application successfully started
Qatar Airways Tracker running on http://localhost:3000`

/** Fixed nav height — mobile menu `top` uses this; hero `pt-[calc(5.5rem+…)]` must match the rem value */
const NAV_H = '5.5rem'

const STEP8_FLIGHTS = `# Track a single date
curl -X POST http://your-server:7432/flights \\
  -H "Content-Type: application/json" \\
  -d '{"origin":"DOH","destination":"ISB","departureDate":"2026-03-29","cabinClass":"ECONOMY"}'

# Or track a full date range
curl -X POST http://your-server:7432/flights/range \\
  -H "Content-Type: application/json" \\
  -d '{"origin":"DOH","destination":"ISB","from":"2026-03-15","to":"2026-04-04","cabinClass":"ECONOMY"}'`

export default function DocsHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-[#818A8F]/18 dark:border-[#5E6A71]/35 bg-white/78 dark:bg-[#0a0610]/82 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_-1px_0_0_rgba(102,32,70,0.1)]"
        style={{ height: NAV_H }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex justify-between items-center">
          <a
            href="#"
            className="flex items-center justify-center shrink-0 outline-none rounded-full focus-visible:ring-2 focus-visible:ring-[#662046]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Qatar Airways Flight Tracker — home"
          >
            <div className="rounded-full bg-gradient-to-br from-white to-neutral-50/95 dark:from-[#1c1626] dark:to-[#120e18] p-1.5 sm:p-2 shadow-[0_6px_24px_-6px_rgba(102,32,70,0.28)] ring-1 ring-[#818A8F]/22 dark:ring-[#5E6A71]/45 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/qatrack-logo.png"
                alt=""
                width={96}
                height={96}
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
                loading="eager"
                priority
              />
            </div>
          </a>
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#how-it-works"
              className="text-sm font-medium px-3.5 py-2 rounded-full text-[#5E6A71] dark:text-[#818A8F] hover:text-[#662046] dark:hover:text-[#d4a8c0] hover:bg-[#662046]/[0.07] transition-colors"
            >
              How it works
            </a>
            <a
              href="#setup"
              className="text-sm font-medium px-3.5 py-2 rounded-full text-[#5E6A71] dark:text-[#818A8F] hover:text-[#662046] dark:hover:text-[#d4a8c0] hover:bg-[#662046]/[0.07] transition-colors"
            >
              Setup
            </a>
            <a
              href="#api"
              className="text-sm font-medium px-3.5 py-2 rounded-full text-[#5E6A71] dark:text-[#818A8F] hover:text-[#662046] dark:hover:text-[#d4a8c0] hover:bg-[#662046]/[0.07] transition-colors"
            >
              API
            </a>
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#818A8F]/35 dark:border-[#5E6A71]/55 text-[#5E6A71] dark:text-[#818A8F] hover:border-[#662046]/45 hover:text-[#662046] dark:hover:text-[#d4a8c0] hover:bg-[#662046]/[0.06] transition-all"
            >
              <Github className="w-4 h-4 opacity-80" /> GitHub
            </a>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-foreground hover:bg-[#662046]/10 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed left-0 right-0 z-40 border-b border-[#818A8F]/20 dark:border-[#5E6A71]/35 bg-white/95 dark:bg-[#0a0610]/95 backdrop-blur-lg p-2 space-y-0.5 shadow-lg shadow-[#662046]/5"
          style={{ top: NAV_H }}
        >
          <a
            href="#how-it-works"
            className="block text-sm font-medium text-[#5E6A71] dark:text-[#818A8F] hover:text-[#662046] hover:bg-[#662046]/8 rounded-xl px-3 py-3 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            How it works
          </a>
          <a
            href="#setup"
            className="block text-sm font-medium text-[#5E6A71] dark:text-[#818A8F] hover:text-[#662046] hover:bg-[#662046]/8 rounded-xl px-3 py-3 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Setup
          </a>
          <a
            href="#api"
            className="block text-sm font-medium text-[#5E6A71] dark:text-[#818A8F] hover:text-[#662046] hover:bg-[#662046]/8 rounded-xl px-3 py-3 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            API
          </a>
        </div>
      )}

      <section className="relative pt-[calc(5.5rem+1rem)] sm:pt-[calc(5.5rem+1.25rem)] pb-20 sm:pb-28 overflow-hidden border-b border-[#818A8F]/15 dark:border-[#5E6A71]/25">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.55] dark:opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(115deg, transparent 0%, rgba(102,32,70,0.04) 40%, transparent 65%),
                linear-gradient(to bottom, rgba(129,138,143,0.06), transparent 42%),
                repeating-linear-gradient(-12deg, transparent, transparent 48px, rgba(102,32,70,0.03) 48px, rgba(102,32,70,0.03) 49px)
              `,
            }}
          />
          <div
            className="absolute -right-[20%] -top-[30%] h-[min(90vw,640px)] w-[min(90vw,640px)] animate-hero-shimmer"
            style={{
              background: `radial-gradient(closest-side, rgba(102,32,70,0.11), transparent 72%)`,
              clipPath: 'polygon(40% 0, 100% 0, 100% 65%, 0% 100%)',
            }}
          />
          <div
            className="absolute -left-[10%] bottom-0 h-[45%] w-[55%] opacity-30 dark:opacity-25"
            style={{
              background: `linear-gradient(18deg, rgba(94,106,113,0.12) 0%, transparent 55%)`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative grid gap-12 lg:gap-16 lg:grid-cols-[1fr_minmax(0,320px)] items-center">
          <div className="min-w-0 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="mb-5 sm:mb-6">
              <div
                className="h-px w-16 sm:w-24 mb-3 bg-gradient-to-r from-[#662046] to-transparent animate-hero-line"
                aria-hidden
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <p
                  className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] max-w-[16rem] leading-relaxed"
                  style={{ color: QR.grey2 }}
                >
                  Self-hosted · SMTP alerts · Playwright sessions
                </p>
                <div className="flex items-baseline gap-3 sm:border-l sm:border-[#818A8F]/25 dark:sm:border-[#5E6A71]/35 sm:pl-8">
                  <Plane className="w-5 h-5 shrink-0 text-[#662046] opacity-90 hidden sm:block" aria-hidden />
                  <p className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">
                    <span style={{ color: QR.burgundy }}>Flight.</span>{' '}
                    <span style={{ color: QR.grey2 }} className="dark:text-[#818A8F] font-medium">
                      On time.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-balance mb-6 leading-[1.05] text-foreground">
              Essential information to{' '}
              <span className="text-[#662046] dark:text-[#c9a0b8]">monitor your flights</span>
            </h1>
            <p
              className="text-lg sm:text-xl text-balance mb-10 max-w-2xl leading-relaxed"
              style={{ color: QR.grey2 }}
            >
              Monitors Qatar Airways availability on a schedule, compares each poll to the last snapshot, and emails you
              when something changes — availability, sell-out, price, or seats. For operators who run their own stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#setup"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#662046] text-white font-semibold shadow-lg shadow-[#662046]/25 hover:bg-[#7a2854] hover:shadow-xl hover:shadow-[#662046]/30 transition-all active:scale-[0.98]"
              >
                Get started <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href={GH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[#818A8F]/35 dark:border-[#5E6A71]/50 font-semibold text-foreground hover:border-[#662046]/40 hover:bg-[#662046]/[0.06] transition-all"
              >
                <Github className="w-4 h-4" style={{ color: QR.grey2 }} /> View on GitHub
              </a>
            </div>
          </div>

          <aside className="hidden lg:block animate-in fade-in slide-in-from-right-4 duration-700 delay-150 fill-mode-both">
            <div className="relative rounded-2xl border border-[#818A8F]/25 dark:border-[#5E6A71]/40 bg-gradient-to-br from-white/90 via-white/70 to-[#662046]/[0.04] dark:from-[#16101c]/95 dark:via-[#120e18]/90 dark:to-[#662046]/[0.08] p-7 shadow-[0_24px_48px_-24px_rgba(102,32,70,0.25)] backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#662046]/10 to-transparent rounded-bl-[100%] pointer-events-none" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#662046] opacity-40" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#662046]" />
                  </span>
                  <span className="text-xs font-mono font-medium tracking-wide" style={{ color: QR.grey1 }}>
                    LIVE · polling pipeline
                  </span>
                </div>
                <div className="space-y-3 font-mono text-[11px] leading-relaxed" style={{ color: QR.grey3 }}>
                  <div className="flex justify-between gap-4 border-b border-[#818A8F]/15 dark:border-[#5E6A71]/25 pb-2">
                    <span style={{ color: QR.grey2 }}>Route</span>
                    <span className="text-foreground/90">ISB → DOH</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-[#818A8F]/15 dark:border-[#5E6A71]/25 pb-2">
                    <span style={{ color: QR.grey2 }}>Cabin</span>
                    <span className="text-foreground/90">Business</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: QR.grey2 }}>Session</span>
                    <span className="text-[#662046] dark:text-[#c9a0b8]">Akamai-ready</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <Radio className="w-4 h-4 shrink-0 mt-0.5 text-[#662046]" />
                  <p className="text-xs leading-relaxed" style={{ color: QR.grey2 }}>
                    NestJS · SQLite · Docker. Self-hosted; email the moment availability, price, or seats shift.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-12">How it works</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="space-y-6">
                <FlowStep
                  number={1}
                  title="Polls Qatar Airways API"
                  description="Scheduled checks (default every 10 minutes) use Playwright-backed sessions so requests carry real browser cookies and survive Akamai bot challenges."
                  icon={<Clock className="w-6 h-6" />}
                />
                <FlowStep
                  number={2}
                  title="Compares against previous state"
                  description="Diffs availability, pricing, and seat signals against the last stored snapshot. Alerts fire only when something actually changed."
                  icon={<Zap className="w-6 h-6" />}
                />
                <FlowStep
                  number={3}
                  title="Sends email alerts immediately"
                  description="SMTP notifications include route, date, cabin, and a concise summary of what moved — so you can act without opening the API."
                  icon={<Mail className="w-6 h-6" />}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 bg-card p-6">
                <h3 className="font-bold text-sm text-primary mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Email alert events
                </h3>
                <div className="space-y-3">
                  <AlertEvent emoji="🟢" event="Flight becomes available" subject="QR DOH→ISB 2026-03-29: Now Available" />
                  <AlertEvent emoji="🔴" event="Flight sells out" subject="QR DOH→ISB 2026-03-29: Sold Out / Removed" />
                  <AlertEvent emoji="💰" event="Price changes" subject="QR DOH→ISB 2026-03-29: Price Changed" />
                  <AlertEvent emoji="💺" event="Seat count changes" subject="QR DOH→ISB 2026-03-29: Seats Changed" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="setup" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-4">Setup</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Clone the repo for local development, or drop two files on a server and run the public container — no full git
            checkout required for Docker.
          </p>

          <div className="mb-16">
            <h3 className="text-2xl font-serif font-light mb-8 text-[#662046] dark:text-[#d4a5bc]">Run locally</h3>

            <DocHeading n={1} title="Install dependencies" />
            <CodeBlock code={'npm install\nnpx playwright install chromium'} id="local-install" label="bash" />

            <DocHeading n={2} title="Configure environment" className="mt-10" />
            <p className="text-muted-foreground text-sm mb-4">Copy the example env file, then edit values (any editor is fine).</p>
            <CodeBlock code="cp .env.example .env" id="local-cp-env" label="bash" />
            <p className="text-sm text-muted-foreground mt-4 mb-2">Edit <code className="font-mono text-xs">.env</code>:</p>
            <EnvBlock content={ENV_LINES} />

            <DocHeading n={3} title="Run locally" className="mt-10" />
            <CodeBlock
              code={
                'npm run start:dev                        # development (watch mode)\nnpm run build && npm run start:prod      # production'
              }
              id="local-run"
              label="bash"
            />
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              On startup, a headless browser automatically captures a valid Qatar Airways session. No manual cookie
              management needed.
            </p>
          </div>

          <div className="mb-16" id="docker">
            <h3 className="text-2xl font-serif font-light mb-2 text-[#662046] dark:text-[#d4a5bc]">Docker</h3>
            <h4 className="text-lg font-medium text-foreground mb-6">Server setup (step by step)</h4>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              You only need two files on the server — no need to clone the full repo.
            </p>

            <DockerStep
              step={1}
              title="Create a directory"
              code="mkdir qatarairways-tracker && cd qatarairways-tracker"
              id="d1"
            />
            <DockerStep
              step={2}
              title="Download the compose and env files"
              code={`curl -O ${RAW}/docker-compose.yml\ncurl -O ${RAW}/.env.example`}
              id="d2"
            />
            <DockerStep
              step={3}
              title="Create your env file"
              code="cp .env.example .env\nnano .env   # or vim .env / any editor you prefer"
              id="d3"
              after={
                <>
                  <p className="text-sm text-muted-foreground mt-4 mb-2">Fill in the following values:</p>
                  <EnvBlock content={ENV_LINES} />
                </>
              }
            />
            <DockerStep
              step={4}
              title="Pull the image"
              code="docker compose pull"
              id="d4"
              after={
                <p className="text-muted-foreground text-sm mt-4">
                  This pulls <code className="font-mono text-xs">{GHCR}</code> — no login required; the image is public.
                </p>
              }
            />
            <DockerStep step={5} title="Start the container" code="docker compose up -d" id="d5" />
            <DockerStep
              step={6}
              title="Verify it&apos;s running"
              code={'docker compose ps\ndocker compose logs -f'}
              id="d6"
              after={
                <>
                  <p className="text-sm text-muted-foreground mt-4 mb-2">You should see log lines similar to:</p>
                  <CodeBlock code={DOCKER_LOG_SAMPLE} id="d6-logs" label="log" />
                </>
              }
            />
            <DockerStep
              step={7}
              title="Test your email"
              code="curl -X POST http://your-server:7432/notifier/test"
              id="d7"
              after={<p className="text-muted-foreground text-sm mt-4">Check your inbox for the test email.</p>}
            />
            <DockerStep
              step={8}
              title="Add flights to track"
              code={STEP8_FLIGHTS}
              id="d8"
              after={
                <p className="text-muted-foreground text-sm mt-4">
                  The tracker will now poll every 10 minutes and email you the moment anything changes.
                </p>
              }
            />
          </div>

          <div className="mb-12 p-6 bg-card border border-border/50 rounded-lg">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-[#662046] dark:text-[#d4a5bc]">
              <Cloud className="w-5 h-5" />
              Updating to the latest version
            </h4>
            <CodeBlock code="docker compose pull && docker compose up -d" id="update" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 bg-card border border-border/50 rounded-lg">
              <h4 className="font-bold mb-3 text-foreground">Option A — Build locally</h4>
              <CodeBlock
                code={'cp .env.example .env   # fill in your values\n\ndocker compose up -d'}
                id="opt-a"
                label="bash"
              />
            </div>
            <div className="p-6 bg-card border border-border/50 rounded-lg">
              <h4 className="font-bold mb-3 text-foreground">Option B — Pull from GHCR (recommended for servers)</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Every push to <code className="font-mono text-xs">main</code> builds and pushes the image via GitHub Actions.
                No registry login needed for pulls.
              </p>
              <CodeBlock
                code={`# First-time on the server\ncp .env.example .env\n\n# Pull and start\ndocker compose pull\ndocker compose up -d`}
                id="opt-b-setup"
                label="bash"
              />
              <p className="text-sm font-medium text-foreground mt-6 mb-2">Update to the latest image</p>
              <CodeBlock code="docker compose pull && docker compose up -d" id="opt-b-update" label="bash" />
              <p className="text-sm font-medium text-foreground mt-6 mb-2">View logs</p>
              <CodeBlock code="docker compose logs -f" id="opt-b-logs" label="bash" />
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
            The app listens on port <strong className="text-foreground">7432</strong> in the default Docker setup (
            <code className="font-mono text-xs">http://your-server:7432</code>). SQLite lives in the{' '}
            <code className="font-mono text-xs">tracker-data</code> volume (or <code className="font-mono text-xs">tracker.db</code>{' '}
            locally) and survives restarts and image updates.
          </p>
        </div>
      </section>

      <section id="api" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-6">API</h2>
          <p className="text-muted-foreground text-sm mb-10 max-w-3xl">
            Examples use <code className="font-mono text-xs text-foreground">localhost:7432</code> — the port Docker Compose maps by default. If you run locally with{' '}
            <code className="font-mono text-xs text-foreground">PORT=3000</code> in <code className="font-mono text-xs text-foreground">.env</code>, use{' '}
            <code className="font-mono text-xs text-foreground">localhost:3000</code> instead.
          </p>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Flights</h3>
            <ApiTable
              rows={[
                { method: 'GET', path: '/flights', desc: 'List all tracked flights' },
                { method: 'POST', path: '/flights', desc: 'Track a single date' },
                { method: 'POST', path: '/flights/range', desc: 'Track every day in a date range' },
                { method: 'POST', path: '/flights/check-now', desc: 'Trigger a manual check immediately' },
                { method: 'PATCH', path: '/flights/:id/active', desc: 'Pause or resume tracking' },
                { method: 'DELETE', path: '/flights/:id', desc: 'Remove a tracked flight' },
              ]}
            />
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">Track a single date</h3>
              <CodeBlock
                id="single-date"
                code={`curl -X POST http://localhost:7432/flights \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": "DOH",
    "destination": "ISB",
    "departureDate": "2026-03-29",
    "cabinClass": "ECONOMY",
    "adults": 1
  }'`}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Track a date range</h3>
              <CodeBlock
                id="date-range"
                code={`curl -X POST http://localhost:7432/flights/range \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": "DOH",
    "destination": "ISB",
    "from": "2026-03-15",
    "to": "2026-04-04",
    "cabinClass": "ECONOMY"
  }'`}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Pause tracking</h3>
              <CodeBlock
                id="pause"
                code={`curl -X PATCH http://localhost:7432/flights/1/active \\
  -H "Content-Type: application/json" \\
  -d '{"isActive": false}'`}
              />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Session</h3>
            <ApiTable
              rows={[
                { method: 'GET', path: '/session', desc: 'View current session metadata' },
                { method: 'POST', path: '/session/refresh', desc: 'Force a cookie refresh via Playwright' },
              ]}
            />
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold mb-4">Notifier</h3>
            <ApiTable rows={[{ method: 'POST', path: '/notifier/test', desc: 'Send a test email to verify SMTP' }]} />
          </div>
        </div>
      </section>

      <section id="cicd" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-6">CI/CD</h2>
          <div className="bg-card border border-border/50 rounded-lg p-8 space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              The GitHub Actions workflow at <code className="font-mono text-xs text-foreground">.github/workflows/docker.yml</code>{' '}
              runs on every push to <code className="font-mono text-xs text-foreground">main</code>:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Builds the Docker image</li>
              <li>
                Pushes to GitHub Container Registry as{' '}
                <code className="font-mono text-xs text-foreground">{GHCR}</code> and tagged SHAs such as{' '}
                <code className="font-mono text-xs text-foreground">ghcr.io/msamoeed/qatarairways-tracker:sha-abc1234</code>
              </li>
            </ul>
            <p>
              No extra secrets are required — it uses the built-in <code className="font-mono text-xs text-foreground">GITHUB_TOKEN</code>.
              The image is public and can be pulled without authentication.
            </p>
          </div>
        </div>
      </section>

      <section id="database" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-6">Database</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            SQLite — stored as a file in the <code className="font-mono text-xs text-foreground">tracker-data</code> Docker volume (or{' '}
            <code className="font-mono text-xs text-foreground">tracker.db</code> locally). No separate database server. Tables are
            auto-created on first run.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-8">Architecture</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ArchCard
              icon={<Terminal className="w-6 h-6" />}
              title="Backend (NestJS)"
              features={[
                'REST API & schedulers',
                'SMTP notifier',
                'Playwright session refresh',
                'Cron-driven polling',
                'SQLite persistence',
              ]}
            />
            <ArchCard
              icon={<Database className="w-6 h-6" />}
              title="Persistence"
              features={[
                'SQLite file + Docker volume',
                'Flight snapshots & diffing',
                'Session cookies in DB',
                '2-hour session TTL',
              ]}
            />
            <ArchCard
              icon={<Cloud className="w-6 h-6" />}
              title="Delivery"
              features={['GHCR images on every push', 'Public pull — no auth', 'docker compose–first ops']}
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-8">Session management</h2>
          <div className="bg-card border border-border/50 rounded-lg p-8">
            <p className="text-muted-foreground mb-6">
              Qatar Airways uses Akamai bot protection. The tracker handles this automatically:
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-[#662046] dark:text-[#d4a5bc] font-bold">•</span>
                <span>
                  <strong className="text-foreground">On startup —</strong> launches headless Chrome, visits the QR site, captures
                  cookies
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#662046] dark:text-[#d4a5bc] font-bold">•</span>
                <span>
                  <strong className="text-foreground">Session TTL —</strong> sessions stored in the database with a 2-hour expiration
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#662046] dark:text-[#d4a5bc] font-bold">•</span>
                <span>
                  <strong className="text-foreground">Proactive refresh —</strong> refreshes about 15 minutes before expiry
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#662046] dark:text-[#d4a5bc] font-bold">•</span>
                <span>
                  <strong className="text-foreground">On 400 / 401 / 403 —</strong> refreshes the session and retries the request
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-border/50 rounded-lg p-8">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-serif font-light mb-3">Open source</h3>
                  <p className="text-muted-foreground mb-4">
                    Qatar Airways Flight Tracker is MIT-licensed on GitHub. Issues and PRs welcome.
                  </p>
                  <div className="space-y-2 text-sm font-mono text-foreground">
                    <div>
                      <span className="text-primary font-bold">Repository:</span>{' '}
                      <span className="text-foreground">github.com/msamoeed/qatarairways-tracker</span>
                    </div>
                    <div>
                      <span className="text-primary font-bold">License:</span> <span className="text-foreground">MIT</span>
                    </div>
                    <div>
                      <span className="text-primary font-bold">Images:</span>{' '}
                      <span className="text-foreground">GHCR on every push to main</span>
                    </div>
                  </div>
                </div>
                <a
                  href={GH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/20 transition whitespace-nowrap"
                >
                  <Github className="w-5 h-5" /> Visit GitHub
                </a>
              </div>

              <a
                href={GHCR_PACKAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="group/ghcr relative isolate block overflow-hidden rounded-2xl border border-[#662046]/20 bg-gradient-to-br from-[#662046]/[0.12] via-background/80 to-[#5E6A71]/[0.08] p-1 shadow-[0_12px_40px_-12px_rgba(102,32,70,0.35)] transition-all duration-500 hover:border-[#662046]/45 hover:shadow-[0_20px_48px_-16px_rgba(102,32,70,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#662046]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover/ghcr:translate-x-full group-hover/ghcr:opacity-100 dark:via-white/10"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#662046]/20 blur-2xl transition-all duration-500 group-hover/ghcr:bg-[#662046]/30 group-hover/ghcr:scale-150"
                  aria-hidden
                />
                <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#662046] text-white shadow-lg shadow-[#662046]/40 ring-2 ring-white/20 transition-transform duration-500 group-hover/ghcr:scale-105 group-hover/ghcr:shadow-[#662046]/55 dark:ring-white/10">
                      <Package className="h-7 w-7 transition-transform duration-500 group-hover/ghcr:-rotate-6 group-hover/ghcr:scale-110" aria-hidden />
                      <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-[#f8e8ef] opacity-90 animate-pulse" aria-hidden />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-[family-name:var(--font-outfit)] text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover/ghcr:text-[#662046] dark:group-hover/ghcr:text-[#d4a8c0]">
                        Get the package today
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        GitHub Container Registry — public image, <code className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-xs">docker pull</code> ready.{' '}
                        <span className="whitespace-nowrap text-[#5E6A71] dark:text-[#818A8F]">Latest builds on every push.</span>
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center justify-center gap-2 self-stretch rounded-xl bg-[#662046] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 group-hover/ghcr:gap-3 group-hover/ghcr:bg-[#7a2854] group-hover/ghcr:shadow-lg sm:self-center">
                    Open package
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/ghcr:translate-x-1" aria-hidden />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-sm mb-3">Documentation</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  <a href="#how-it-works" className="hover:text-foreground transition">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#setup" className="hover:text-foreground transition">
                    Setup & deploy
                  </a>
                </li>
                <li>
                  <a href="#api" className="hover:text-foreground transition">
                    API reference
                  </a>
                </li>
                <li>
                  <a href="#cicd" className="hover:text-foreground transition">
                    CI/CD
                  </a>
                </li>
                <li>
                  <a href="#database" className="hover:text-foreground transition">
                    Database
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Resources</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  <a href={GH} className="hover:text-foreground transition">
                    GitHub repository
                  </a>
                </li>
                <li>
                  <a href={`${GH}/issues`} className="hover:text-foreground transition">
                    Report issues
                  </a>
                </li>
                <li>
                  <a href={GH} className="hover:text-foreground transition">
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Project</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  <a href={`${GH}/commits/main/`} className="hover:text-foreground transition">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href={`${GH}/pkgs/container/qatarairways-tracker`} className="hover:text-foreground transition">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="https://opensource.org/license/mit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Qatar Airways Flight Tracker •{' '}
              <a href={GH} className="text-primary hover:text-primary/80 transition font-medium">
                github.com/msamoeed/qatarairways-tracker
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DocHeading({ n, title, className = '' }: { n: number; title: string; className?: string }) {
  return (
    <h4 className={`text-lg font-bold text-[#662046] dark:text-[#d4a5bc] mb-4 ${className}`}>
      <span className="font-bold">{n}.</span> {title}
    </h4>
  )
}

function DockerStep({
  step,
  title,
  code,
  id,
  after,
}: {
  step: number
  title: string
  code: string
  id: string
  after?: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <h4 className="text-lg font-bold text-[#662046] dark:text-[#d4a5bc] mb-4">
        Step {step} — {title}
      </h4>
      <CodeBlock code={code} id={id} label="bash" />
      {after}
    </div>
  )
}

function FlowStep({
  number,
  title,
  description,
  icon,
}: {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}) {
  const colors = ['from-primary to-primary/70', 'from-blue-600 to-blue-500', 'from-purple-600 to-purple-500']
  const bgColor = colors[number - 1] || colors[0]

  return (
    <div className="flex gap-4 group">
      <div className="flex-shrink-0">
        <div
          className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${bgColor} text-white shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium font-[family-name:var(--font-outfit)] mb-1 text-[#662046] dark:text-[#d4a5bc]">
          <span className="font-bold">{number}.</span> {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function AlertEvent({ emoji, event, subject }: { emoji: string; event: string; subject: string }) {
  return (
    <div className="border-b border-border/30 last:border-0 pb-3 last:pb-0">
      <div className="flex items-start gap-3">
        <span className="text-lg">{emoji}</span>
        <div>
          <p className="text-xs font-bold text-foreground">{event}</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">{subject}</p>
        </div>
      </div>
    </div>
  )
}

function EnvBlock({ content }: { content: string }) {
  return (
    <div className="p-4 bg-card border border-border/50 rounded-lg font-mono text-xs text-foreground whitespace-pre-wrap">
      {content}
    </div>
  )
}

function CodeBlock({ code, id, label = 'bash' }: { code: string; id: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isLog = label === 'log'

  return (
    <div
      data-code-id={id}
      className="relative group rounded-lg overflow-hidden border border-border/30 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="px-4 py-3 bg-card border-b border-border/30 flex justify-between items-center">
        <span className="text-xs font-medium font-mono text-primary capitalize">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 rounded opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/15"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary animate-pulse" />
          ) : (
            <Copy className="w-4 h-4 text-accent hover:text-primary transition" />
          )}
        </button>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto bg-gradient-to-br from-slate-950 via-slate-900 to-primary/10">
        <div className="text-foreground whitespace-pre-wrap break-words tracking-tight">
          {!isLog && <span className="text-accent font-bold">$ </span>}
          <span className="text-white/90 selection:bg-primary/30">{code}</span>
        </div>
      </div>
    </div>
  )
}

const methodClass: Record<string, string> = {
  GET: 'text-blue-400',
  POST: 'text-green-400',
  PATCH: 'text-yellow-400',
  DELETE: 'text-red-400',
}

function ApiTable({ rows }: { rows: { method: string; path: string; desc: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="text-left p-3 font-semibold text-foreground">Method</th>
            <th className="text-left p-3 font-semibold text-foreground">Endpoint</th>
            <th className="text-left p-3 font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/40 last:border-0">
              <td className={`p-3 font-mono font-bold text-xs ${methodClass[r.method] ?? 'text-foreground'}`}>{r.method}</td>
              <td className="p-3 font-mono text-xs text-muted-foreground">{r.path}</td>
              <td className="p-3 text-muted-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ArchCard({ icon, title, features }: { icon: React.ReactNode; title: string; features: string[] }) {
  return (
    <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">{icon}</div>
        <h3 className="font-bold text-primary">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {features.map((feature: string, i: number) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
            <span className="text-accent font-bold mt-0.5">→</span>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
