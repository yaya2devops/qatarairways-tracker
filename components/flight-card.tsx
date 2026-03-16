'use client';

import { TrendingUp, TrendingDown, Pause, Trash2, AlertCircle, CheckCircle2, Users } from 'lucide-react';

interface FlightCardProps {
  flight: {
    id: number;
    route: string;
    date: string;
    cabin: string;
    status: 'available' | 'sold-out';
    price: string;
    seats: number;
    lastUpdate: string;
    priceChange: string;
    trend: 'up' | 'down' | 'neutral';
  };
}

export default function FlightCard({ flight }: FlightCardProps) {
  const statusConfig = {
    available: {
      bg: 'bg-chart-2/10',
      border: 'border-chart-2/20',
      icon: CheckCircle2,
      text: 'Available',
      color: 'text-chart-2'
    },
    'sold-out': {
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      icon: AlertCircle,
      text: 'Sold Out',
      color: 'text-destructive'
    }
  };

  const config = statusConfig[flight.status];
  const StatusIcon = config.icon;

  return (
    <div className="relative group rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-transparent" />

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">{flight.route}</h3>
              <p className="text-sm text-muted-foreground">{flight.date} • {flight.cabin}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${config.bg} ${config.color}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{config.text}</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="py-3 border-y border-border space-y-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Price</p>
              <p className="text-2xl font-bold text-primary">{flight.price}</p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              flight.trend === 'down' ? 'text-chart-2' : flight.trend === 'up' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {flight.trend === 'down' && <TrendingDown className="w-4 h-4" />}
              {flight.trend === 'up' && <TrendingUp className="w-4 h-4" />}
              <span>{flight.priceChange}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Available Seats</p>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{flight.seats}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">Last Update</p>
            <p className="font-semibold text-foreground text-sm">{flight.lastUpdate}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors">
            View Details
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Pause className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
