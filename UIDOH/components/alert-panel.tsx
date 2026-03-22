'use client';

import { LucideIcon, X } from 'lucide-react';

interface Alert {
  id: number;
  type: string;
  icon: LucideIcon;
  title: string;
  message: string;
  time: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

interface AlertPanelProps {
  alert: Alert;
}

const severityConfig = {
  success: {
    bg: 'bg-chart-2/10',
    border: 'border-chart-2/20',
    icon: 'text-chart-2',
    dot: 'bg-chart-2'
  },
  info: {
    bg: 'bg-chart-2/10',
    border: 'border-chart-2/20',
    icon: 'text-chart-2',
    dot: 'bg-chart-2'
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: 'text-yellow-500',
    dot: 'bg-yellow-500'
  },
  error: {
    bg: 'bg-destructive/10',
    border: 'border-destructive/20',
    icon: 'text-destructive',
    dot: 'bg-destructive'
  }
};

export default function AlertPanel({ alert }: AlertPanelProps) {
  const Icon = alert.icon;
  const config = severityConfig[alert.severity];

  return (
    <div className={`group relative rounded-lg border transition-all hover:border-primary/30 p-4 flex gap-4 ${config.bg} ${config.border}`}>
      {/* Animated dot */}
      <div className="flex-shrink-0 pt-1">
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      </div>

      {/* Icon */}
      <div className={`flex-shrink-0 ${config.icon}`}>
        <Icon className="w-5 h-5 mt-0.5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-foreground">{alert.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
      </div>

      {/* Close Button */}
      <button className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
