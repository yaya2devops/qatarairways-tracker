'use client';

import {
  LayoutDashboard,
  Plane,
  AlertCircle,
  Settings,
  HelpCircle,
  ExternalLink,
  X,
  BarChart3,
  Bell,
  Database
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
    { icon: Plane, label: 'Tracked Flights', href: '#' },
    { icon: AlertCircle, label: 'Alerts', href: '#' },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Database, label: 'History', href: '#' }
  ];

  const secondaryItems = [
    { icon: HelpCircle, label: 'Help & Support', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-sidebar-foreground">QR Tracker</h1>
                <p className="text-xs text-sidebar-foreground/60">Flight Monitor</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-sidebar-foreground" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Status */}
          <div className="mx-2 my-4 p-3 rounded-lg bg-sidebar-primary/10 border border-sidebar-primary/20">
            <p className="text-xs font-medium text-sidebar-foreground mb-2">Service Status</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-chart-2 rounded-full" />
                <span className="text-xs text-sidebar-foreground/70">API Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-chart-2 rounded-full" />
                <span className="text-xs text-sidebar-foreground/70">Email OK</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
