'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronRight, Code2, Zap, BarChart3, Github, Plane, Cpu, Cloud, Terminal, Sparkles, Copy, Check } from 'lucide-react'

export default function DocsHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(index)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 backdrop-blur-lg bg-background/98 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Qatar Airways</p>
              <p className="text-xs text-muted-foreground font-light">Flight Tracker</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition">Overview</a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#getting-started" className="text-sm text-muted-foreground hover:text-foreground transition">Getting Started</a>
            <a href="#architecture" className="text-sm text-muted-foreground hover:text-foreground transition">Architecture</a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary/80 transition flex items-center gap-2 font-medium">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 border-b border-border/30 bg-card/95 backdrop-blur-lg p-6 space-y-4 z-40">
          <a href="#overview" className="block text-sm text-muted-foreground hover:text-foreground">Overview</a>
          <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#getting-started" className="block text-sm text-muted-foreground hover:text-foreground">Getting Started</a>
          <a href="#architecture" className="block text-sm text-muted-foreground hover:text-foreground">Architecture</a>
          <a href="https://github.com/msamoeed/qatarairways-tracker" className="block text-sm text-primary">GitHub</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-xs font-semibold text-accent tracking-wide">Open Source • MIT License</span>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl font-light leading-tight tracking-tight mb-6">
            Essential information to monitor your flights
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mb-10 leading-relaxed">
            Qatar Airways Flight Tracker provides real-time monitoring, price tracking, and instant email alerts. Built with TypeScript, NestJS, Next.js, and PostgreSQL for seamless performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#getting-started" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/20 transition">
              Get Started <ChevronRight className="w-4 h-4 ml-2" />
            </a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border hover:border-primary/50 text-foreground font-medium transition">
              <Github className="w-4 h-4 mr-2" /> View Repository
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-4">What is Qatar Airways Tracker?</h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl">A comprehensive full-stack application designed to monitor Qatar Airways flight availability and prices in real-time with instant email notifications.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Key Capabilities</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent text-xl leading-none mt-1">→</span>
                    <div>
                      <p className="font-semibold">Real-Time Monitoring</p>
                      <p className="text-sm text-muted-foreground">Track Qatar Airways flights 24/7 with automatic updates every minute</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent text-xl leading-none mt-1">→</span>
                    <div>
                      <p className="font-semibold">Email Alerts</p>
                      <p className="text-sm text-muted-foreground">Instant notifications when prices drop or flights become available</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent text-xl leading-none mt-1">→</span>
                    <div>
                      <p className="font-semibold">Price Analytics</p>
                      <p className="text-sm text-muted-foreground">Track historical pricing trends and identify savings opportunities</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent text-xl leading-none mt-1">→</span>
                    <div>
                      <p className="font-semibold">Seat Tracking</p>
                      <p className="text-sm text-muted-foreground">Monitor available seats by cabin class across all tracked routes</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-xl p-8 sticky top-24">
              <div className="space-y-4">
                <div className="pb-4 border-b border-border/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Example Flight</p>
                      <p className="text-lg font-semibold mt-1">DOH → LHR</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">Available</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Price</p>
                    <p className="text-2xl font-semibold">QR 2,450</p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">↓ 8% from last week</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Seats</p>
                    <p className="text-2xl font-semibold">12</p>
                    <p className="text-xs text-muted-foreground mt-1">Economy available</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Live monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground font-light">Everything you need to track Qatar Airways flights with precision.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard 
              icon={<Zap className="w-5 h-5" />}
              title="Real-Time Updates"
              description="Live flight availability and pricing refreshed automatically every minute with instant notifications"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-5 h-5" />}
              title="Price Analytics"
              description="Track price trends with visual charts, historical data, and advanced statistics for better decisions"
            />
            <FeatureCard 
              icon={<Terminal className="w-5 h-5" />}
              title="REST & GraphQL APIs"
              description="Flexible API endpoints with comprehensive documentation for seamless integration with any platform"
            />
            <FeatureCard 
              icon={<Database className="w-5 h-5" />}
              title="Data Persistence"
              description="PostgreSQL database with historical tracking, retention policies, and data integrity assurance"
            />
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground font-light">Set up the Qatar Airways Flight Tracker in just a few minutes.</p>
          </div>

          <div className="space-y-10">
            {/* Step 1 */}
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold"><span className="text-accent font-light">Step 1:</span> Clone the repository</h3>
                <p className="text-muted-foreground text-sm mt-1">Download the source code from GitHub to your local machine</p>
              </div>
              <CodeBlock 
                code="git clone https://github.com/msamoeed/qatarairways-tracker.git"
                index={0}
                copied={copiedCode === 0}
                onCopy={() => copyToClipboard("git clone https://github.com/msamoeed/qatarairways-tracker.git", 0)}
              />
            </div>

            {/* Step 2 */}
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold"><span className="text-accent font-light">Step 2:</span> Install dependencies</h3>
                <p className="text-muted-foreground text-sm mt-1">Set up both backend and frontend dependencies</p>
              </div>
              <div className="space-y-3">
                <CodeBlock 
                  code="cd qatarairways-tracker && npm install"
                  index={1}
                  copied={copiedCode === 1}
                  onCopy={() => copyToClipboard("cd qatarairways-tracker && npm install", 1)}
                />
                <CodeBlock 
                  code="cd frontend && npm install"
                  index={2}
                  copied={copiedCode === 2}
                  onCopy={() => copyToClipboard("cd frontend && npm install", 2)}
                />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold"><span className="text-accent font-light">Step 3:</span> Configure environment</h3>
                <p className="text-muted-foreground text-sm mt-1">Create and update environment variable files</p>
              </div>
              <CodeBlock 
                code="cp .env.example .env && cp frontend/.env.example frontend/.env"
                index={3}
                copied={copiedCode === 3}
                onCopy={() => copyToClipboard("cp .env.example .env && cp frontend/.env.example frontend/.env", 3)}
              />
              <p className="text-xs text-muted-foreground mt-3">Update the .env files with your configuration. Check the documentation for required variables.</p>
            </div>

            {/* Step 4 */}
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold"><span className="text-accent font-light">Step 4:</span> Start the development servers</h3>
                <p className="text-muted-foreground text-sm mt-1">Run both backend and frontend in development mode</p>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-2">Terminal 1 (Backend):</p>
                  <CodeBlock 
                    code="npm run dev"
                    index={4}
                    copied={copiedCode === 4}
                    onCopy={() => copyToClipboard("npm run dev", 4)}
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold mb-2">Terminal 2 (Frontend):</p>
                  <CodeBlock 
                    code="cd frontend && npm run dev"
                    index={5}
                    copied={copiedCode === 5}
                    onCopy={() => copyToClipboard("cd frontend && npm run dev", 5)}
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold"><span className="text-accent font-light">Step 5:</span> Open in your browser</h3>
                <p className="text-muted-foreground text-sm mt-1">Access the application through your browser</p>
              </div>
              <CodeBlock 
                code="open http://localhost:3000"
                index={6}
                copied={copiedCode === 6}
                onCopy={() => copyToClipboard("open http://localhost:3000", 6)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-4">Architecture Overview</h2>
            <p className="text-lg text-muted-foreground font-light">Full-stack TypeScript application with modern tooling and best practices.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ArchitectureCard
              title="Backend Services"
              items={[
                { label: "Framework", value: "NestJS 10+" },
                { label: "Database", value: "PostgreSQL 15+" },
                { label: "ORM", value: "TypeORM / Prisma" },
                { label: "API", value: "REST + GraphQL" },
                { label: "Real-Time", value: "WebSockets" },
                { label: "Email", value: "SendGrid Integration" },
              ]}
            />
            <ArchitectureCard
              title="Frontend Application"
              items={[
                { label: "Framework", value: "Next.js 16" },
                { label: "Styling", value: "Tailwind CSS" },
                { label: "State", value: "React Query / SWR" },
                { label: "Charts", value: "Recharts" },
                { label: "Language", value: "TypeScript" },
                { label: "Deployment", value: "Vercel" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* API Preview Section */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl font-light mb-4">API Endpoints</h2>
            <p className="text-lg text-muted-foreground font-light">RESTful API with comprehensive documentation for integration.</p>
          </div>

          <div className="space-y-4">
            <APIEndpointCard 
              method="GET"
              endpoint="/api/flights"
              description="Retrieve all tracked flights with real-time data"
            />
            <APIEndpointCard 
              method="POST"
              endpoint="/api/flights"
              description="Create a new flight tracking entry"
            />
            <APIEndpointCard 
              method="GET"
              endpoint="/api/prices/{flightId}"
              description="Get historical price data for a specific flight"
            />
            <APIEndpointCard 
              method="GET"
              endpoint="/api/alerts"
              description="Fetch all alerts and notifications"
            />
          </div>
        </div>
      </section>

      {/* Repository Info Section */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border/50 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div>
                <h3 className="font-serif text-3xl font-light mb-3">Open Source on GitHub</h3>
                <p className="text-muted-foreground max-w-lg mb-4">Qatar Airways Flight Tracker is open source and welcomes contributions from developers worldwide.</p>
                <div className="space-y-2 text-sm font-mono text-muted-foreground">
                  <p><span className="text-accent font-bold">Repository:</span> github.com/msamoeed/qatarairways-tracker</p>
                  <p><span className="text-accent font-bold">License:</span> MIT Open Source</p>
                  <p><span className="text-accent font-bold">Language:</span> TypeScript</p>
                </div>
              </div>
              <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/20 transition whitespace-nowrap">
                <Github className="w-4 h-4" /> Visit GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border/30 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl font-light mb-4">Start monitoring flights today</h2>
          <p className="text-lg text-muted-foreground font-light mb-12 max-w-2xl mx-auto">Complete documentation, API reference, and examples included. Deploy in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#getting-started" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-xl hover:shadow-primary/20 transition">
              Get Started <ChevronRight className="w-4 h-4 ml-2" />
            </a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border hover:border-primary/50 font-medium transition">
              <Github className="w-4 h-4 mr-2" /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-border/30">
            <div>
              <p className="font-semibold text-sm mb-4">Documentation</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Installation</a></li>
                <li><a href="#" className="hover:text-foreground transition">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition">Configuration</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Community</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/msamoeed/qatarairways-tracker" className="hover:text-foreground transition">GitHub</a></li>
                <li><a href="https://github.com/msamoeed/qatarairways-tracker/issues" className="hover:text-foreground transition">Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contributing</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Project</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Changelog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Roadmap</a></li>
                <li><a href="#" className="hover:text-foreground transition">License</a></li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Qatar Airways Flight Tracker © 2026 • <a href="https://github.com/msamoeed/qatarairways-tracker" className="text-accent hover:text-primary transition">github.com/msamoeed</a> • MIT License
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="p-8 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition group">
      <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function CodeBlock({ code, index, copied, onCopy }: any) {
  return (
    <div className="relative group">
      <div className="bg-slate-900 rounded-lg p-6 border border-slate-800/50 overflow-x-auto">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-accent font-bold">$</span>
          <code className="text-slate-100">{code}</code>
        </div>
      </div>
      <button
        onClick={onCopy}
        className="absolute right-4 top-4 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </div>
  )
}

function ArchitectureCard({ title, items }: any) {
  return (
    <div className="p-8 rounded-xl bg-card border border-border/50">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <div className="space-y-4">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex justify-between items-start pb-4 border-b border-border/30 last:border-0 last:pb-0">
            <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
            <span className="text-sm font-semibold text-accent">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function APIEndpointCard({ method, endpoint, description }: any) {
  const methodColors = {
    GET: "bg-blue-500/20 text-blue-400",
    POST: "bg-green-500/20 text-green-400",
    PUT: "bg-yellow-500/20 text-yellow-400",
    DELETE: "bg-red-500/20 text-red-400"
  }
  
  return (
    <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-accent/50 transition flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-3 py-1 rounded font-mono text-xs font-bold ${methodColors[method as keyof typeof methodColors]}`}>
            {method}
          </span>
          <code className="font-mono text-sm text-accent">{endpoint}</code>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
