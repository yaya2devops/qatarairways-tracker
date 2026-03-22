'use client';

import { useState } from 'react';
import { X, Plus, Calendar, MapPin, Users } from 'lucide-react';

interface AddFlightModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddFlightModal({ open, onClose }: AddFlightModalProps) {
  const [tab, setTab] = useState<'single' | 'range'>('single');

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-card max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 border-b border-border bg-card/50 backdrop-blur px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Add Flight to Track</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-border px-6">
            <button
              onClick={() => setTab('single')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                tab === 'single'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Single Date
            </button>
            <button
              onClick={() => setTab('range')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                tab === 'range'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Date Range
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Route Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Route
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Departure
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>DOH (Doha)</option>
                    <option>DXB (Dubai)</option>
                    <option>AUH (Abu Dhabi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Destination
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>ISB (Islamabad)</option>
                    <option>LHR (London)</option>
                    <option>CDG (Paris)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Date Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Travel Date
              </h3>
              {tab === 'single' ? (
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passengers & Class */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Preferences
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Cabin Class
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>ECONOMY</option>
                    <option>BUSINESS</option>
                    <option>FIRST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Adults
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
              <p className="text-sm font-medium text-primary">Tracking Information</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Checked every 10 minutes</li>
                <li>✓ Instant email alerts on changes</li>
                <li>✓ Price & availability tracking</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-border bg-card/50 backdrop-blur px-6 py-4 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
            >
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Start Tracking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
