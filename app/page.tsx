'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronRight, Code2, Zap, BarChart3, Github, Plane, Cpu, Cloud, Terminal, Sparkles, GitBranch, Database, Mail, Clock, Zap as ZapIcon, Activity } from 'lucide-react'
import Image from 'next/image'

export default function DocsHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/95 h-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold">Qatar Airways</p>
              <p className="text-[10px] text-muted-foreground">Flight Tracker</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#overview" className="text-xs text-muted-foreground hover:text-foreground transition">Overview</a>
            <a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#architecture" className="text-xs text-muted-foreground hover:text-foreground transition">Architecture</a>
            <a href="#quick-start" className="text-xs text-muted-foreground hover:text-foreground transition">Getting Started</a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 border-b border-border bg-card p-3 space-y-2 z-40">
          <a href="#overview" className="block text-xs text-muted-foreground hover:text-foreground p-2">Overview</a>
          <a href="#features" className="block text-xs text-muted-foreground hover:text-foreground p-2">Features</a>
          <a href="#quick-start" className="block text-xs text-muted-foreground hover:text-foreground p-2">Getting Started</a>
          <a href="https://github.com/msamoeed/qatarairways-tracker" className="block text-xs text-muted-foreground hover:text-primary p-2">GitHub</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/40 text-[11px] font-semibold text-accent tracking-wide">
            MIT License • Open Source Project
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-balance leading-tight">
            Essential information to support <br className="hidden sm:inline" />
            <span className="text-primary font-normal">your travel plans</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Qatar Airways Flight Tracker is a comprehensive full-stack application that monitors flight availability, tracks prices in real-time, and delivers instant email notifications when conditions match your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quick-start" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition">
              Start Building <ChevronRight className="w-4 h-4" />
            </a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:border-primary/50 hover:bg-card/50 transition">
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-4xl font-light mb-8 text-balance">Real-time flight monitoring made simple</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary mb-2">What It Does</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Continuously monitors Qatar Airways flights for you, tracking real-time availability and price changes across multiple routes and cabin classes. Get instant notifications when prices drop, flights become available, or seat counts shift.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary mb-2">Core Capabilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5 text-lg">→</span>
                    <span className="text-sm text-muted-foreground"><strong>Real-Time Monitoring:</strong> Automatic flight checks every minute with live data updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5 text-lg">→</span>
                    <span className="text-sm text-muted-foreground"><strong>Price Tracking:</strong> Historical pricing with trend analysis and alert thresholds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5 text-lg">→</span>
                    <span className="text-sm text-muted-foreground"><strong>Email Alerts:</strong> Instant notifications with configurable conditions and filters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5 text-lg">→</span>
                    <span className="text-sm text-muted-foreground"><strong>Seat Management:</strong> Track available seats by cabin class (Economy, Business, First)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-card border border-border/50 rounded-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/30">
                <span className="text-xs font-bold text-muted-foreground">LIVE EXAMPLE</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  <Activity className="w-3 h-3 animate-pulse" /> Available
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">ROUTE</p>
                  <p className="font-semibold text-sm">Doha → London</p>
                  <p className="text-xs text-muted-foreground">DOH → LHR</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">PRICE (Economy)</p>
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold text-lg text-primary">QR 2,450</p>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">↓ 8%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">AVAILABLE SEATS</p>
                  <p className="font-semibold text-sm">12 seats</p>
                </div>
                <div className="pt-3 border-t border-border/30">
                  <p className="text-[10px] text-muted-foreground">Last updated 2 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="font-serif text-4xl font-light mb-12 text-balance">Powerful Features for Travelers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<ZapIcon className="w-5 h-5" />} 
            title="Real-Time Updates" 
            description="Flight data refreshes every minute with live availability and pricing"
          />
          <FeatureCard 
            icon={<BarChart3 className="w-5 h-5" />} 
            title="Price Analytics" 
            description="Historical data tracking with trend analysis and price drop detection"
          />
          <FeatureCard 
            icon={<Mail className="w-5 h-5" />} 
            title="Email Alerts" 
            description="Configurable notifications delivered instantly when conditions match"
          />
          <FeatureCard 
            icon={<Database className="w-5 h-5" />} 
            title="Data Persistence" 
            description="Complete flight history stored in PostgreSQL for analysis and reporting"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="font-serif text-4xl font-light mb-12 text-balance">Built with Modern Technology</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <TechCard 
            icon={<Cpu className="w-6 h-6" />}
            title="Backend"
            stack={['NestJS', 'TypeScript', 'PostgreSQL', 'REST API', 'GraphQL', 'WebSocket realtime']}
          />
          <TechCard 
            icon={<Cloud className="w-6 h-6" />}
            title="Frontend"
            stack={['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'Dark Mode']}
          />
          <TechCard 
            icon={<Zap className="w-6 h-6" />}
            title="Infrastructure"
            stack={['Node.js Runtime', 'Email Service', 'Automated Scheduling', 'Error Tracking', 'Analytics', 'Open Source']}
          />
        </div>
      </section>

      {/* Project Details Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="font-serif text-4xl font-light mb-12 text-balance">Project Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-primary mb-2">Repository Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Owner:</span> <code className="text-xs bg-card px-2 py-1 rounded border border-border/50">msamoeed</code></p>
                <p><span className="text-muted-foreground">Repository:</span> <code className="text-xs bg-card px-2 py-1 rounded border border-border/50">qatarairways-tracker</code></p>
                <p><span className="text-muted-foreground">License:</span> <code className="text-xs bg-card px-2 py-1 rounded border border-border/50">MIT</code></p>
                <p><span className="text-muted-foreground">Language:</span> <code className="text-xs bg-card px-2 py-1 rounded border border-border/50">TypeScript</code></p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary mb-2">Key Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><GitBranch className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> Full-stack TypeScript application</li>
                <li className="flex items-start gap-2"><Database className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> PostgreSQL database with migrations</li>
                <li className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> Automated background job scheduling</li>
                <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /> Email notification service integration</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-primary mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/50 hover:bg-card/80 transition">
                <Github className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold">GitHub Repository</p>
                  <p className="text-xs text-muted-foreground">View source code and contribute</p>
                </div>
              </a>
              <a href="https://github.com/msamoeed/qatarairways-tracker/issues" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/50 hover:bg-card/80 transition">
                <Sparkles className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold">Issues & Features</p>
                  <p className="text-xs text-muted-foreground">Report bugs or suggest improvements</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="font-serif text-4xl font-light mb-12 text-balance">Getting Started in Minutes</h2>
        <div className="space-y-4">
          <CodeBlock 
            step={1}
            title="Clone the Repository"
            code="git clone https://github.com/msamoeed/qatarairways-tracker.git && cd qatarairways-tracker"
          />
          <CodeBlock 
            step={2}
            title="Install Dependencies"
            code="npm install && cd apps/frontend && npm install && cd ../backend && npm install"
          />
          <CodeBlock 
            step={3}
            title="Set Up Environment Variables"
            code="cp .env.example .env.local # Then update with your configuration"
          />
          <CodeBlock 
            step={4}
            title="Start Development Server"
            code="npm run dev:backend &  # Terminal 1: Backend\nnpm run dev:frontend    # Terminal 2: Frontend"
          />
          <CodeBlock 
            step={5}
            title="Access the Application"
            code="Open http://localhost:3000 in your browser"
          />
        </div>
      </section>

      {/* API Documentation Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50">
        <h2 className="font-serif text-4xl font-light mb-12 text-balance">API Endpoints</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <APIEndpoint 
            method="GET"
            endpoint="/api/flights"
            description="List all tracked flights with real-time data"
          />
          <APIEndpoint 
            method="POST"
            endpoint="/api/flights"
            description="Add a new flight to track"
          />
          <APIEndpoint 
            method="GET"
            endpoint="/api/flights/:id/history"
            description="Get price history for a flight"
          />
          <APIEndpoint 
            method="POST"
            endpoint="/api/alerts"
            description="Create email alerts with conditions"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/50 text-center">
        <h2 className="font-serif text-4xl font-light mb-6 text-balance">Ready to Monitor Qatar Airways?</h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
          Get started with the complete source code, comprehensive documentation, and community support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#quick-start" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition">
            View Setup Guide <ChevronRight className="w-4 h-4" />
          </a>
          <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border text-sm font-medium hover:border-primary/50 hover:bg-card/50 transition">
            <Github className="w-4 h-4" /> Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold mb-4">Documentation</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Installation</a></li>
                <li><a href="#" className="hover:text-foreground transition">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition">Architecture</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="https://github.com/msamoeed/qatarairways-tracker" className="hover:text-foreground transition">GitHub</a></li>
                <li><a href="https://github.com/msamoeed/qatarairways-tracker/issues" className="hover:text-foreground transition">Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contributing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4">Project</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Changelog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Roadmap</a></li>
                <li><a href="#" className="hover:text-foreground transition">License (MIT)</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8">
            <p className="text-xs text-muted-foreground text-center">
              Qatar Airways Flight Tracker • Built with TypeScript, NestJS & Next.js • <a href="https://github.com/msamoeed/qatarairways-tracker" className="text-accent hover:text-primary transition">github.com/msamoeed</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-accent/50 hover:bg-card/80 transition">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
        {icon}
      </div>
      <h3 className="text-sm font-bold mb-2">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function TechCard({ icon, title, stack }) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {stack.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="text-accent">→</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CodeBlock({ step, title, code }) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          {step}
        </div>
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <div className="bg-background rounded p-4 font-mono text-xs text-muted-foreground overflow-x-auto">
        <code>{code}</code>
      </div>
    </div>
  )
}

function APIEndpoint({ method, endpoint, description }) {
  const methodColor = method === 'GET' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
  
  return (
    <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-accent/50 transition">
      <div className="flex items-center gap-3 mb-3">
        <code className={`text-sm font-bold ${methodColor}`}>{method}</code>
        <code className="text-sm text-muted-foreground font-mono">{endpoint}</code>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
