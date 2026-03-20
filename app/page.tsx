'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronRight, Copy, Check, Github, Clock, Zap, Mail, AlertCircle, Database, Cloud, Terminal, Cpu } from 'lucide-react'
import Image from 'next/image'

export default function DocsHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/95 h-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-8 rounded-lg bg-gradient-to-r from-primary via-primary to-primary/80 flex items-center justify-center shadow-md overflow-hidden">
              <Image src="/qa-wave-logo.svg" alt="Qatar Airways Tracker" width={28} height={28} className="opacity-90" loading="eager" priority />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-medium block leading-4 text-foreground">Qatar Airways</span>
              <span className="text-xs text-accent">Flight Tracker</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">How it works</a>
            <a href="#setup" className="text-muted-foreground hover:text-foreground transition">Setup</a>
            <a href="#api" className="text-muted-foreground hover:text-foreground transition">API</a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 border-b border-border/50 bg-card p-3 space-y-2">
          <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground p-2">How it works</a>
          <a href="#setup" className="block text-sm text-muted-foreground hover:text-foreground p-2">Setup</a>
          <a href="#api" className="block text-sm text-muted-foreground hover:text-foreground p-2">API</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-accent/10 pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block px-4 py-2 rounded-full border border-primary/40 bg-primary/10">
              <span className="text-xs font-semibold text-primary tracking-wider">Open Source • MIT License</span>
            </div>
            
            <h1 className="font-[family-name:var(--font-outfit)] text-5xl sm:text-7xl font-medium tracking-tight text-balance mb-6 leading-tight text-foreground">
              Essential information to monitor your flights
            </h1>
            <p className="text-lg text-muted-foreground text-balance mb-10 max-w-2xl leading-relaxed">
              Automatically monitors Qatar Airways flight availability and sends email alerts the moment anything changes — new availability, sold out, price movements, or seat count changes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#setup" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/30 transition">
                Get Started <ChevronRight className="w-4 h-4" />
              </a>
              <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-accent/40 text-foreground font-medium hover:bg-accent/10 transition">
                <Github className="w-4 h-4" /> View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-12">How it works</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="space-y-6">
                <FlowStep
                  number={1}
                  title="Polls Qatar Airways API"
                  description="Automatically checks for flight availability every 10 minutes using headless browser (Playwright) to maintain valid session cookies and bypass Akamai bot protection."
                  icon={<Clock className="w-6 h-6" />}
                />
                <FlowStep
                  number={2}
                  title="Compares against previous state"
                  description="Detects exactly what changed: availability status, prices, seat counts. Only triggers alerts on actual changes, not on every poll."
                  icon={<Zap className="w-6 h-6" />}
                />
                <FlowStep
                  number={3}
                  title="Sends email alerts immediately"
                  description="Notifies you via email the moment anything changes. Includes flight details, what changed, and new availability info."
                  icon={<Mail className="w-6 h-6" />}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border/50 bg-card p-6">
                <h3 className="font-bold text-sm text-primary mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Email Alert Events
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

      {/* Setup Section */}
      <section id="setup" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-12">Ready to get started?</h2>

          {/* Local Setup */}
          <div className="mb-20">
            <h3 className="text-2xl font-serif font-light mb-8">Local Development</h3>
            
            <SetupStep 
              step={1}
              title="Install dependencies"
              commands={[
                'npm install',
                'npx playwright install chromium'
              ]}
            />

            <SetupStep 
              step={2}
              title="Configure environment"
              description="Copy the example environment file and fill in your SMTP details:"
              commands={[
                'cp .env.example .env',
                'nano .env   # Edit with your SMTP configuration'
              ]}
            />

            <div className="mb-8 p-6 bg-card border border-border/50 rounded-lg">
              <p className="text-sm font-mono text-muted-foreground mb-4">Required environment variables:</p>
              <div className="space-y-2 font-mono text-xs text-muted-foreground">
                <div><span className="text-accent">EMAIL_HOST=</span>smtp.yourserver.com</div>
                <div><span className="text-accent">EMAIL_PORT=</span>587</div>
                <div><span className="text-accent">EMAIL_USER=</span>you@yourdomain.com</div>
                <div><span className="text-accent">EMAIL_PASS=</span>your_password</div>
                <div><span className="text-accent">EMAIL_FROM=</span>noreply@yourdomain.com</div>
                <div><span className="text-accent">EMAIL_TO=</span>recipient1@example.com,recipient2@example.com</div>
                <div><span className="text-accent">PORT=</span>3000</div>
              </div>
            </div>

            <SetupStep 
              step={3}
              title="Run the application"
              commands={[
                'npm run start:dev          # Development with watch mode',
                'npm run build && npm run start:prod  # Production'
              ]}
            />
          </div>

          {/* Docker Setup */}
          <div className="mb-20">
            <h3 className="text-2xl font-serif font-light mb-8">Docker Deployment</h3>
            <p className="text-muted-foreground mb-8">You only need two files on the server — no need to clone the full repo.</p>

            <SetupStep 
              step={1}
              title="Create a directory"
              commands={['mkdir qatarairways-tracker && cd qatarairways-tracker']}
            />

            <SetupStep 
              step={2}
              title="Download compose and env files"
              commands={[
                'curl -O https://raw.githubusercontent.com/msamoeed/qatarairways-tracker/main/docker-compose.yml',
                'curl -O https://raw.githubusercontent.com/msamoeed/qatarairways-tracker/main/.env.example'
              ]}
            />

            <SetupStep 
              step={3}
              title="Create and configure env file"
              commands={[
                'cp .env.example .env',
                'nano .env   # Fill in your SMTP details'
              ]}
            />

            <SetupStep 
              step={4}
              title="Pull the Docker image"
              description="The image is public on GitHub Container Registry — no login required."
              commands={['docker compose pull']}
            />

            <SetupStep 
              step={5}
              title="Start the container"
              commands={['docker compose up -d']}
            />

            <SetupStep 
              step={6}
              title="Verify it's running"
              commands={[
                'docker compose ps',
                'docker compose logs -f'
              ]}
              description="You should see the session service starting and the application running on port 3000."
            />

            <SetupStep 
              step={7}
              title="Test your email"
              commands={['curl -X POST http://your-server:3000/notifier/test']}
              description="Check your inbox for the test email to verify SMTP is working."
            />

            <SetupStep 
              step={8}
              title="Add flights to track"
              commands={[
                'curl -X POST http://your-server:3000/flights \\',
                '  -H "Content-Type: application/json" \\',
                '  -d \'{',
                '    "origin":"DOH",',
                '    "destination":"ISB",',
                '    "departureDate":"2026-03-29",',
                '    "cabinClass":"ECONOMY"',
                '  }\''
              ]}
              description="The tracker will now poll every 10 minutes and email you on any changes."
            />
          </div>

          {/* Update */}
          <div className="p-6 bg-card border border-border/50 rounded-lg">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-accent" />
              Update to latest version
            </h4>
            <CodeBlock 
              code="docker compose pull && docker compose up -d"
              id="update"
              onCopy={copyToClipboard}
              isCopied={copied === 'update'}
            />
          </div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-12">REST API</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Flights</h3>
              <div className="space-y-3">
                <ApiEndpoint method="GET" path="/flights" description="List all tracked flights" />
                <ApiEndpoint method="POST" path="/flights" description="Track a single date" />
                <ApiEndpoint method="POST" path="/flights/range" description="Track every day in a date range" />
                <ApiEndpoint method="POST" path="/flights/check-now" description="Trigger a manual check immediately" />
                <ApiEndpoint method="PATCH" path="/flights/:id/active" description="Pause or resume tracking" />
                <ApiEndpoint method="DELETE" path="/flights/:id" description="Remove a tracked flight" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Other</h3>
              <div className="space-y-3">
                <ApiEndpoint method="GET" path="/session" description="View current session metadata" />
                <ApiEndpoint method="POST" path="/session/refresh" description="Force a cookie refresh via Playwright" />
                <ApiEndpoint method="POST" path="/notifier/test" description="Send a test email" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Track a single date</h3>
              <CodeBlock 
                id="single-date"
                code={`curl -X POST http://localhost:3000/flights \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": "DOH",
    "destination": "ISB",
    "departureDate": "2026-03-29",
    "cabinClass": "ECONOMY",
    "adults": 1
  }'`}
                onCopy={copyToClipboard}
                isCopied={copied === 'single-date'}
              />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Track a date range</h3>
              <CodeBlock 
                id="date-range"
                code={`curl -X POST http://localhost:3000/flights/range \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": "DOH",
    "destination": "ISB",
    "from": "2026-03-15",
    "to": "2026-04-04",
    "cabinClass": "ECONOMY"
  }'`}
                onCopy={copyToClipboard}
                isCopied={copied === 'date-range'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-12">Architecture</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ArchCard
              icon={<Terminal className="w-6 h-6" />}
              title="Backend (NestJS)"
              features={[
                'REST API endpoints',
                'Email notification service',
                'Session management',
                'Automated flight polling',
                'Cron-based scheduling',
                'SQLite persistence'
              ]}
            />
            <ArchCard
              icon={<Database className="w-6 h-6" />}
              title="Database (SQLite)"
              features={[
                'Auto-created tables',
                'Persistent storage',
                'Session cookies cached',
                'Flight state tracking',
                'Docker volume persistence',
                '2-hour session TTL'
              ]}
            />
            <ArchCard
              icon={<Cloud className="w-6 h-6" />}
              title="CI/CD (GitHub Actions)"
              features={[
                'Auto Docker builds',
                'Push to GHCR',
                'Triggers on every commit',
                'Public image (no auth)',
                'Semantic versioning',
                'Full automation'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Session Management Section */}
      <section className="py-20 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-8">Session Management</h2>
          <div className="bg-card border border-border/50 rounded-lg p-8">
            <p className="text-muted-foreground mb-6">
              Qatar Airways uses Akamai bot protection. The tracker handles this automatically:
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>On startup:</strong> Launches headless Chrome, visits the QR homepage, captures cookies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>Session TTL:</strong> Sessions stored in DB with 2-hour expiration</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>Proactive refresh:</strong> Refreshes 15 minutes before expiry</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                <span><strong>Error handling:</strong> On any 400/401/403 response, immediately refreshes and retries</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Repository Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-border/50 rounded-lg p-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl font-serif font-light mb-3">Open Source</h3>
                <p className="text-muted-foreground mb-4">
                  Qatar Airways Flight Tracker is fully open source and publicly available on GitHub. All contributions welcome.
                </p>
          <div className="space-y-2 text-sm font-mono text-foreground">
                <div><span className="text-primary font-bold">Repository:</span> <span className="text-foreground">github.com/msamoeed/qatarairways-tracker</span></div>
                <div><span className="text-primary font-bold">License:</span> <span className="text-foreground">MIT</span></div>
                <div><span className="text-primary font-bold">Latest:</span> <span className="text-foreground">Automated Docker builds on every push</span></div>
              </div>
              </div>
              <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/20 transition whitespace-nowrap">
                <Github className="w-5 h-5" /> Visit GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-sm mb-3">Documentation</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#how-it-works" className="hover:text-foreground transition">How it works</a></li>
                <li><a href="#setup" className="hover:text-foreground transition">Setup & Deploy</a></li>
                <li><a href="#api" className="hover:text-foreground transition">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Resources</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="https://github.com/msamoeed/qatarairways-tracker" className="hover:text-foreground transition">GitHub Repository</a></li>
                <li><a href="https://github.com/msamoeed/qatarairways-tracker/issues" className="hover:text-foreground transition">Report Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contributing Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Project</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Changelog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Roadmap</a></li>
                <li><a href="#" className="hover:text-foreground transition">MIT License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Qatar Airways Flight Tracker • Open Source • <a href="https://github.com/msamoeed/qatarairways-tracker" className="text-primary hover:text-primary/80 transition font-medium">github.com/msamoeed</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FlowStep({ number, title, description, icon }) {
  const colors = [
  'from-primary to-primary/70',
  'from-blue-600 to-blue-500',
  'from-purple-600 to-purple-500'
  ]
  const bgColor = colors[number - 1] || colors[0]
  
  return (
    <div className="flex gap-4 group">
      <div className="flex-shrink-0">
        <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${bgColor} text-white shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium font-[family-name:var(--font-outfit)] mb-1 text-accent">{number}. {title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function AlertEvent({ emoji, event, subject }) {
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

function SetupStep({ step, title, description, commands }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-accent font-bold text-lg">Step {step}</span>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>
      {description && <p className="text-muted-foreground text-sm mb-4">{description}</p>}
      <div className="space-y-2">
        {commands.map((cmd, i) => (
          <CodeBlock 
            key={i}
            code={cmd}
            id={`step-${step}-${i}`}
            onCopy={() => {}}
            isCopied={false}
          />
        ))}
      </div>
    </div>
  )
}

function CodeBlock({ code, id, onCopy, isCopied }) {
  const [localCopied, setLocalCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setLocalCopied(true)
    setTimeout(() => setLocalCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border/30 shadow-sm hover:shadow-lg transition-shadow duration-300">
  <div className="px-4 py-3 bg-card border-b border-border/30 flex justify-between items-center">
  <span className="text-xs font-medium font-mono text-primary">bash</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/15"
          title="Copy to clipboard"
        >
          {localCopied ? (
            <Check className="w-4 h-4 text-primary animate-pulse" />
          ) : (
            <Copy className="w-4 h-4 text-accent hover:text-primary transition" />
          )}
        </button>
      </div>
      <div className="p-4 font-mono text-sm overflow-x-auto bg-gradient-to-br from-slate-950 via-slate-900 to-primary/10">
        <div className="text-foreground whitespace-pre-wrap break-words tracking-tight">
          <span className="text-accent font-bold">$ </span>
          <span className="text-white/90 selection:bg-primary/30">{code}</span>
        </div>
      </div>
    </div>
  )
}

function ApiEndpoint({ method, path, description }) {
  const methodColors = {
    GET: 'text-blue-400',
    POST: 'text-green-400',
    PATCH: 'text-yellow-400',
    DELETE: 'text-red-400'
  }

  return (
    <div className="p-3 bg-card border border-border/50 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <span className={`font-bold text-sm ${methodColors[method]}`}>{method}</span>
        <span className="font-mono text-sm text-muted-foreground">{path}</span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function ArchCard({ icon, title, features }) {
  return (
    <div className="p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h3 className="font-bold text-primary">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {features.map((feature, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
            <span className="text-accent font-bold mt-0.5">→</span> 
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
