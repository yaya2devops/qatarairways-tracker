'use client';

import { useState } from 'react';
import {
  BarChart3,
  Plus,
  Bell,
  Settings,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Plane,
  DollarSign,
  Users,
  Menu,
  X
} from 'lucide-react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import FlightCard from '@/components/flight-card';
import AlertPanel from '@/components/alert-panel';
import AddFlightModal from '@/components/add-flight-modal';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddFlight, setShowAddFlight] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'settings'>('dashboard');

  // Mock tracked flights
  const trackedFlights = [
    {
      id: 1,
      route: 'DOH → ISB',
      date: '2026-03-29',
      cabin: 'ECONOMY',
      status: 'available',
      price: 'QR 2,450',
      seats: 8,
      lastUpdate: '2 mins ago',
      priceChange: '-5%',
      trend: 'down'
    },
    {
      id: 2,
      route: 'DOH → LHR',
      date: '2026-04-02',
      cabin: 'BUSINESS',
      status: 'sold-out',
      price: 'QR 8,900',
      seats: 0,
      lastUpdate: '5 mins ago',
      priceChange: '+2%',
      trend: 'up'
    },
    {
      id: 3,
      route: 'DOH → DXB',
      date: '2026-03-30',
      cabin: 'ECONOMY',
      status: 'available',
      price: 'QR 890',
      seats: 12,
      lastUpdate: '1 min ago',
      priceChange: 'No change',
      trend: 'neutral'
    }
  ];

  // Mock alerts
  const recentAlerts = [
    {
      id: 1,
      type: 'price-drop',
      icon: TrendingDown,
      title: 'Price Drop Alert',
      message: 'DOH → ISB on 2026-03-29 dropped from QR 2,580 to QR 2,450',
      time: '12:45 PM',
      severity: 'success'
    },
    {
      id: 2,
      type: 'availability',
      icon: CheckCircle2,
      title: 'Now Available',
      message: 'DOH → CDG on 2026-04-05 is now available (6 seats)',
      time: '11:20 AM',
      severity: 'info'
    },
    {
      id: 3,
      type: 'sold-out',
      icon: AlertCircle,
      title: 'Sold Out',
      message: 'DOH → LHR on 2026-04-02 Business Class is now fully booked',
      time: '10:15 AM',
      severity: 'warning'
    }
  ];

  const stats = [
    {
      label: 'Active Trackers',
      value: '12',
      icon: Plane,
      change: '+2 this week'
    },
    {
      label: 'Price Changes',
      value: '8',
      icon: TrendingUp,
      change: 'avg -4.2%'
    },
    {
      label: 'Alerts Sent',
      value: '24',
      icon: Bell,
      change: 'this month'
    },
    {
      label: 'Savings Detected',
      value: 'QR 3,420',
      icon: DollarSign,
      change: 'potential deals'
    }
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="p-6 space-y-8">
              {/* Hero Section */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card border border-border p-8">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,.1)_50%,transparent_100%)]" />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Plane className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-bold text-balance">Qatar Airways Flight Tracker</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl text-balance">
                    Real-time flight monitoring with instant alerts on price changes, availability updates, and seat count fluctuations.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="rounded-xl border border-border bg-card p-6 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                          <p className="text-3xl font-bold text-primary">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                        </div>
                        <Icon className="w-8 h-8 text-accent/60" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tracked Flights Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Tracked Flights</h2>
                    <p className="text-sm text-muted-foreground">Real-time monitoring of your saved routes</p>
                  </div>
                  <button
                    onClick={() => setShowAddFlight(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Flight
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {trackedFlights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Recent Alerts</h2>
                  <p className="text-sm text-muted-foreground">Last 24 hours of activity</p>
                </div>

                <div className="space-y-3">
                  {recentAlerts.map((alert) => (
                    <AlertPanel key={alert.id} alert={alert} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Alert History</h1>
                <p className="text-muted-foreground">All notifications and price tracking history</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Alert history coming soon</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Configure tracking preferences and notifications</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Settings className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Settings configuration coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Flight Modal */}
      <AddFlightModal open={showAddFlight} onClose={() => setShowAddFlight(false)} />

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card px-4 py-3 flex gap-4 justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'alerts'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="text-sm">Alerts</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'settings'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}
