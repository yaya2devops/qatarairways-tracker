'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronRight, BookOpen, Code2, Zap, BarChart3, ArrowRight, Github, ExternalLink, Plane, AlertCircle, Cpu, Cloud } from 'lucide-react'
import Link from 'next/link'

export default function DocsHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">Qatar Airways</span>
                <span className="text-xs text-muted-foreground">Flight Tracker</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition">Overview</a>
              <a href="#quick-start" className="text-sm text-muted-foreground hover:text-foreground transition">Quick Start</a>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
              <a href="#architecture" className="text-sm text-muted-foreground hover:text-foreground transition">Architecture</a>
              <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card p-4 space-y-3">
          <a href="#overview" className="block text-sm text-muted-foreground">Overview</a>
          <a href="#quick-start" className="block text-sm text-muted-foreground">Quick Start</a>
          <a href="#features" className="block text-sm text-muted-foreground">Features</a>
          <a href="#architecture" className="block text-sm text-muted-foreground">Architecture</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <span className="text-xs font-semibold text-accent">Open Source • MIT License</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-8 leading-tight">
            Qatar Airways <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Flight Tracker</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance mb-10">
            Monitor Qatar Airways flights in real-time, track prices, and receive instant email alerts. Full-stack application built with TypeScript, NestJS backend, and Next.js frontend for seamless performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quick-start" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 transition">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-card transition">
              <Github className="w-4 h-4" /> View Repository
            </a>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          <StatCard label="Repository" value="github.com/msamoeed" />
          <StatCard label="Version" value="v1.0.0" />
          <StatCard label="License" value="MIT" />
          <StatCard label="Language" value="TypeScript" />
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-balance mb-6">What is Qatar Airways Tracker?</h2>
            <p className="text-lg text-muted-foreground text-balance mb-6">
              A comprehensive full-stack application designed to monitor Qatar Airways flight availability and prices in real-time. Receive instant email notifications when prices drop, flights become available, or seat counts change.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Checkmark />
                <span><strong>Real-Time Monitoring</strong> - Track flights 24/7 with automatic updates</span>
              </li>
              <li className="flex items-start gap-3">
                <Checkmark />
                <span><strong>Email Alerts</strong> - Get notified instantly when conditions match</span>
              </li>
              <li className="flex items-start gap-3">
                <Checkmark />
                <span><strong>Price Tracking</strong> - Monitor historical pricing trends and patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <Checkmark />
                <span><strong>Seat Management</strong> - Track available seats by cabin class</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">Example Flight</p>
                <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-700 dark:text-green-400">Available</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Route</p>
                  <p className="font-bold">DOH → LHR</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-bold">QR 2,450 <span className="text-xs text-green-600 dark:text-green-400">↓ 8%</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Available Seats</p>
                  <p className="font-bold">12 Economy Seats</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="font-bold text-xs">2 minutes ago <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-2 animate-pulse"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-16">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Real-Time Updates"
            description="Live flight availability and pricing refreshed automatically every minute"
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Price Analytics"
            description="Track price trends and historical data with visual charts and statistics"
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="REST & GraphQL APIs"
            description="Flexible API endpoints for seamless integration with your systems"
          />
          <FeatureCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Complete Documentation"
            description="Comprehensive guides, tutorials, and full API reference included"
          />
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-16">Quick Start Guide</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <QuickStartStep
            number={1}
            title="Clone Repository"
            description="Download source code from GitHub"
            code="git clone https://github.com/msamoeed/qatarairways-tracker"
          />
          <QuickStartStep
            number={2}
            title="Install Dependencies"
            description="Set up both backend and frontend"
            code="# Backend & Frontend\ncd backend && npm install\ncd ../frontend && npm install"
          />
          <QuickStartStep
            number={3}
            title="Start Services"
            description="Run development servers"
            code="# Terminal 1: Backend\nnpm run dev:backend\n# Terminal 2: Frontend\nnpm run dev"
          />
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-16">Architecture Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ArchitectureCard
            icon={<Cpu className="w-6 h-6" />}
            title="Backend (NestJS)"
            items={[
              'REST API for CRUD operations',
              'GraphQL for complex queries',
              'PostgreSQL database',
              'Real-time WebSocket support',
              'Email notification service',
              'Automated flight tracking'
            ]}
          />
          <ArchitectureCard
            icon={<Cloud className="w-6 h-6" />}
            title="Frontend (Next.js)"
            items={[
              'Next.js 16 React application',
              'Tailwind CSS styling',
              'Real-time data visualization',
              'Responsive dashboard UI',
              'Production-ready components',
              'TypeScript type safety'
            ]}
          />
        </div>
      </section>

      {/* Documentation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold mb-16">Documentation & Guides</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DocCard
            title="Installation Guide"
            description="Complete setup instructions for development environment"
            icon={<BookOpen className="w-5 h-5" />}
          />
          <DocCard
            title="API Documentation"
            description="Full REST and GraphQL API reference with code examples"
            icon={<Code2 className="w-5 h-5" />}
          />
          <DocCard
            title="Frontend Components"
            description="Built-in UI components and usage patterns"
            icon={<BarChart3 className="w-5 h-5" />}
          />
          <DocCard
            title="Deployment Guide"
            description="Deploy to production on Vercel or other platforms"
            icon={<Cloud className="w-5 h-5" />}
          />
          <DocCard
            title="Configuration"
            description="Environment variables and system settings"
            icon={<Cpu className="w-5 h-5" />}
          />
          <DocCard
            title="Contributing"
            description="Guidelines for contributing to the project"
            icon={<Github className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* Repository Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="bg-card border border-border rounded-lg p-12">
          <div className="flex items-start justify-between flex-col sm:flex-row gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Source Repository</h3>
              <p className="text-muted-foreground mb-8 max-w-lg">
                This project is open source and available on GitHub. All contributions are welcome and encouraged.
              </p>
              <div className="space-y-3 text-sm font-mono text-muted-foreground">
                <p><span className="text-primary font-bold">Repository:</span> github.com/msamoeed/qatarairways-tracker</p>
                <p><span className="text-primary font-bold">Issues:</span> github.com/msamoeed/qatarairways-tracker/issues</p>
                <p><span className="text-primary font-bold">License:</span> MIT Open Source</p>
              </div>
            </div>
            <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 transition whitespace-nowrap">
              <Github className="w-5 h-5" /> Visit GitHub
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Begin monitoring Qatar Airways flights today. Complete documentation and examples included.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#quick-start" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 transition">
            Installation Guide <ChevronRight className="w-4 h-4" />
          </a>
          <a href="https://github.com/msamoeed/qatarairways-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-border font-medium hover:bg-card transition">
            <Github className="w-4 h-4" /> Star on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Installation</a></li>
                <li><a href="#" className="hover:text-foreground transition">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition">Components</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition">Troubleshooting</a></li>
                <li><a href="#" className="hover:text-foreground transition">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/msamoeed/qatarairways-tracker" className="hover:text-foreground transition">GitHub</a></li>
                <li><a href="https://github.com/msamoeed/qatarairways-tracker/issues" className="hover:text-foreground transition">Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contributing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Project</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Changelog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Roadmap</a></li>
                <li><a href="#" className="hover:text-foreground transition">License</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground text-center">
              Qatar Airways Flight Tracker • Open Source • <a href="https://github.com/msamoeed/qatarairways-tracker" className="text-accent hover:text-primary transition">github.com/msamoeed</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function CheckmarkIcon() {
  return <div className="w-5 h-5 rounded text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">✓</div>
}

function Checkmark() {
  return <span className="text-primary font-bold flex-shrink-0">→</span>
}

function StatCard({ label, value }) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-bold text-primary text-lg">{value}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition group">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function QuickStartStep({ number, title, description, code }) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="bg-background rounded p-3 font-mono text-xs text-muted-foreground overflow-x-auto">
        <code>{code}</code>
      </div>
    </div>
  )
}

function ArchitectureCard({ icon, title, items }) {
  return (
    <div className="p-8 rounded-lg bg-card border border-border">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-accent">{icon}</span> {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="text-accent font-bold mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DocCard({ title, description, icon }) {
  return (
    <a href="#" className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold">{title}</h3>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition" />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  )
}
