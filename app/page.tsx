'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronRight, Code2, Zap, BarChart3, Github, Plane, Cpu, Cloud, Terminal, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function DocsHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-sm bg-background/95 h-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm hidden sm:inline">QA Tracker</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#quick-start" className="text-xs text-muted-foreground hover:text-foreground transition">Docs</a>
            <a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> Source
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground text-sm">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 border-b border-border bg-card p-3 space-y-2 z-40">
          <a href="#quick-start" className="block text-xs text-muted-foreground hover:text-foreground p-2">Docs</a>
          <a href="#features" className="block text-xs text-muted-foreground hover:text-foreground p-2">Features</a>
          <a href="https://github.com/msamoeed/qatarairways-tracker" className="block text-xs text-muted-foreground hover:text-primary p-2">Source</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="text-center">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-[11px] font-semibold text-accent">MIT License • Open Source</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-balance">
            Qatar Airways <span className="text-primary">Flight Tracker</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6">
            Real-time flight monitoring with price tracking and instant email alerts. Built with NestJS, Next.js, and PostgreSQL.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a href="#quick-start" className="inline-flex items-center justify-center gap-1 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition">
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 px-5 py-2 rounded-lg border border-border text-sm font-medium hover:border-primary/50 transition">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">Monitor Qatar Airways flights</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span> Real-time flight availability and prices</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span> Instant email alerts on price drops</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span> Seat count tracking by cabin</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span> Full-stack TypeScript application</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-0.5">→</span> REST & GraphQL APIs included</li>
            </ul>
          </div>
          <div className="bg-card border border-border/50 rounded-lg p-4 text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-border/30">
              <span className="text-muted-foreground">DOH → LHR</span>
              <span className="inline-block px-2 py-0.5 rounded bg-green-500/20 text-green-600 dark:text-green-400 font-semibold">Available</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-muted-foreground text-[10px]">Price</p>
                <p className="font-bold text-primary">QR 2,450</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px]">Seats</p>
                <p className="font-bold">12 eco</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground text-[10px]">Updated</p>
                <p className="font-bold">2m ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <FeatureCard icon={<Zap className="w-4 h-4" />} title="Real-Time" description="1-min updates" />
          <FeatureCard icon={<BarChart3 className="w-4 h-4" />} title="Analytics" description="Price trends" />
          <FeatureCard icon={<Code2 className="w-4 h-4" />} title="APIs" description="REST & GraphQL" />
          <FeatureCard icon={<Terminal className="w-4 h-4" />} title="Docs" description="Full reference" />
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
        <div className="space-y-3">
          <CodeBlock label="1. Clone" code="git clone https://github.com/msamoeed/qatarairways-tracker" />
          <CodeBlock label="2. Install" code="npm install && cd frontend && npm install" />
          <CodeBlock label="3. Run" code="npm run dev  # Backend & frontend run simultaneously" />
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold mb-6">Architecture</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ArchitectureCard
            icon={<Cpu className="w-4 h-4" />}
            title="Backend"
            items={['NestJS REST API', 'GraphQL support', 'PostgreSQL DB', 'WebSocket realtime', 'Email service']}
          />
          <ArchitectureCard
            icon={<Cloud className="w-4 h-4" />}
            title="Frontend"
            items={['Next.js 16', 'Tailwind CSS', 'Charts & dashboards', 'TypeScript', 'Responsive UI']}
          />
        </div>
      </section>

      {/* Documentation Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50">
        <h2 className="text-2xl font-bold mb-6">Docs & Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <DocCard title="Installation" icon={<Terminal className="w-3.5 h-3.5" />} />
          <DocCard title="API Reference" icon={<Code2 className="w-3.5 h-3.5" />} />
          <DocCard title="Deployment" icon={<Cloud className="w-3.5 h-3.5" />} />
          <DocCard title="Contributing" icon={<Github className="w-3.5 h-3.5" />} />
          <DocCard title="FAQ" icon={<Sparkles className="w-3.5 h-3.5" />} />
          <DocCard title="Source Code" icon={<Github className="w-3.5 h-3.5" />} />
        </div>
      </section>

      {/* Repository Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50">
        <div className="bg-card border border-border/50 rounded-lg p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">Open Source on GitHub</h3>
            <p className="text-xs text-muted-foreground max-w-sm">github.com/msamoeed/qatarairways-tracker • MIT License</p>
          </div>
          <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition whitespace-nowrap">
            <Github className="w-3.5 h-3.5" /> View
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-border/50 text-center">
        <h2 className="text-2xl font-bold mb-2">Start monitoring flights today</h2>
        <p className="text-xs text-muted-foreground mb-6">Full documentation, examples, and live API included</p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a href="#quick-start" className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition">
            Get Started <ChevronRight className="w-3.5 h-3.5" />
          </a>
          <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-primary/50 transition">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6 pb-6 border-b border-border/30">
            <div>
              <p className="text-xs font-bold mb-2">Resources</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Docs</a></li>
                <li><a href="#" className="hover:text-foreground transition">API</a></li>
                <li><a href="#" className="hover:text-foreground transition">Deploy</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold mb-2">Community</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="https://github.com/msamoeed/qatarairways-tracker" className="hover:text-foreground transition">GitHub</a></li>
                <li><a href="https://github.com/msamoeed/qatarairways-tracker/issues" className="hover:text-foreground transition">Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contribute</a></li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Qatar Airways Tracker • MIT License • <a href="https://github.com/msamoeed/qatarairways-tracker" className="text-accent hover:text-primary transition">github.com/msamoeed</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-3 rounded-lg bg-card border border-border/50 hover:border-accent/50 transition">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent text-lg">{icon}</span>
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-tight">{description}</p>
    </div>
  )
}

function CodeBlock({ label, code }) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border/50">
      <p className="text-xs text-muted-foreground font-semibold mb-2">{label}</p>
      <div className="bg-background rounded p-3 font-mono text-xs text-muted-foreground overflow-x-auto">
        <code>{code}</code>
      </div>
    </div>
  )
}

function ArchitectureCard({ icon, title, items }) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border/50">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
        <span className="text-accent text-lg">{icon}</span> {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-accent mt-1">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DocCard({ title, icon }) {
  return (
    <a href="#" className="p-3 rounded-lg bg-card border border-border/50 hover:border-accent/50 transition group">
      <div className="flex items-center gap-2">
        <span className="text-accent">{icon}</span>
        <h3 className="text-xs font-bold group-hover:text-primary transition">{title}</h3>
        <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-accent transition ml-auto" />
      </div>
    </a>
  )
}
