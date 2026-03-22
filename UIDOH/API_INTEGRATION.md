# Qatar Airways Flight Tracker - API Integration Guide

## Overview
This guide explains how to connect the React frontend dashboard to the NestJS backend API.

## Backend API Endpoints Reference

### Flights Management

#### List All Tracked Flights
```bash
GET /flights
```

**Response:**
```json
[
  {
    "id": 1,
    "origin": "DOH",
    "destination": "ISB",
    "departureDate": "2026-03-29",
    "cabinClass": "ECONOMY",
    "adults": 1,
    "isActive": true,
    "currentPrice": "QR 2450",
    "availableSeats": 8,
    "status": "available",
    "lastUpdate": "2026-03-16T12:45:00Z",
    "priceHistory": [
      { "date": "2026-03-16T12:00:00Z", "price": 2580 },
      { "date": "2026-03-16T12:45:00Z", "price": 2450 }
    ]
  }
]
```

#### Track a Single Flight Date
```bash
POST /flights
Content-Type: application/json

{
  "origin": "DOH",
  "destination": "ISB",
  "departureDate": "2026-03-29",
  "cabinClass": "ECONOMY",
  "adults": 1
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "origin": "DOH",
  "destination": "ISB",
  "departureDate": "2026-03-29",
  "cabinClass": "ECONOMY",
  "adults": 1,
  "isActive": true,
  "createdAt": "2026-03-16T12:45:00Z"
}
```

#### Track a Date Range
```bash
POST /flights/range
Content-Type: application/json

{
  "origin": "DOH",
  "destination": "ISB",
  "from": "2026-03-15",
  "to": "2026-04-04",
  "cabinClass": "ECONOMY",
  "adults": 1
}
```

**Response:** `201 Created`
```json
[
  { "id": 1, "departureDate": "2026-03-15", ... },
  { "id": 2, "departureDate": "2026-03-16", ... },
  // ... more dates
]
```

#### Pause/Resume Tracking
```bash
PATCH /flights/:id/active
Content-Type: application/json

{
  "isActive": false
}
```

#### Delete Tracked Flight
```bash
DELETE /flights/:id
```

**Response:** `204 No Content`

#### Trigger Manual Check
```bash
POST /flights/check-now
```

**Response:** `200 OK`
```json
{
  "checkedFlights": 12,
  "updatesFound": 3,
  "timestamp": "2026-03-16T12:50:00Z"
}
```

### Session Management

#### Get Session Info
```bash
GET /session
```

**Response:**
```json
{
  "isValid": true,
  "expiresAt": "2026-03-16T14:50:00Z",
  "sessionAge": "2h 5m",
  "cookieValid": true
}
```

#### Refresh Session
```bash
POST /session/refresh
```

**Response:**
```json
{
  "success": true,
  "newExpiresAt": "2026-03-16T16:50:00Z",
  "message": "Session refreshed successfully"
}
```

### Notifications

#### Send Test Email
```bash
POST /notifier/test
```

**Response:**
```json
{
  "success": true,
  "emailSent": "user@example.com",
  "timestamp": "2026-03-16T12:50:00Z"
}
```

---

## Frontend Integration Examples

### 1. Fetching Tracked Flights

#### Using SWR (Recommended)
```typescript
// components/tracked-flights.tsx
'use client';

import useSWR from 'swr';
import FlightCard from './flight-card';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TrackedFlights() {
  const { data: flights, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/flights`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 60000 // Refresh every 60 seconds
    }
  );

  if (isLoading) return <div>Loading flights...</div>;
  if (error) return <div>Error loading flights: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {flights?.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
```

#### Using Fetch Hook
```typescript
'use client';

import { useEffect, useState } from 'react';

interface Flight {
  id: number;
  origin: string;
  destination: string;
  departureDate: string;
  currentPrice: string;
  availableSeats: number;
  status: 'available' | 'sold-out';
}

export default function Dashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/flights`
        );
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error('Failed to fetch flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();

    // Set up polling every 10 minutes
    const interval = setInterval(fetchFlights, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    // ... render flights
  );
}
```

### 2. Adding a New Flight

#### Single Date
```typescript
// components/add-flight-modal.tsx
const handleSubmitSingleDate = async (formData: {
  origin: string;
  destination: string;
  departureDate: string;
  cabinClass: string;
  adults: number;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/flights`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: formData.origin,
          destination: formData.destination,
          departureDate: formData.departureDate,
          cabinClass: formData.cabinClass,
          adults: formData.adults
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to add flight');
    }

    const newFlight = await response.json();
    console.log('Flight added:', newFlight);
    
    // Refresh flights list
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/flights`);
    
    // Close modal
    onClose();
  } catch (error) {
    console.error('Error adding flight:', error);
    // Show error message to user
  }
};
```

#### Date Range
```typescript
const handleSubmitDateRange = async (formData: {
  origin: string;
  destination: string;
  from: string;
  to: string;
  cabinClass: string;
  adults: number;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/flights/range`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: formData.origin,
          destination: formData.destination,
          from: formData.from,
          to: formData.to,
          cabinClass: formData.cabinClass,
          adults: formData.adults
        })
      }
    );

    const newFlights = await response.json();
    console.log(`Added ${newFlights.length} flights for tracking`);
    
    // Refresh flights list
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/flights`);
    onClose();
  } catch (error) {
    console.error('Error adding flights:', error);
  }
};
```

### 3. Managing Flight Tracking

#### Pause/Resume
```typescript
const handleTogglePause = async (flightId: number, currentStatus: boolean) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/flights/${flightId}/active`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update flight status');
    }

    // Refresh the flight data
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/flights`);
  } catch (error) {
    console.error('Error updating flight:', error);
  }
};
```

#### Delete Flight
```typescript
const handleDeleteFlight = async (flightId: number) => {
  if (!confirm('Are you sure you want to stop tracking this flight?')) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/flights/${flightId}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete flight');
    }

    // Remove from local state or refetch
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/flights`);
  } catch (error) {
    console.error('Error deleting flight:', error);
  }
};
```

### 4. Real-Time Alerts

#### Server-Sent Events (Recommended)
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function AlertListener() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/alerts/stream`
    );

    eventSource.onmessage = (event) => {
      const alert = JSON.parse(event.data);
      console.log('[v0] New alert received:', alert);
      
      setAlerts(prev => [alert, ...prev]);
    };

    eventSource.onerror = (error) => {
      console.error('[v0] Alert stream error:', error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="alerts-container">
      {alerts.map(alert => (
        <AlertPanel key={alert.id} alert={alert} />
      ))}
    </div>
  );
}
```

#### WebSocket Fallback
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function AlertListenerWebSocket() {
  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/alerts`
    );

    ws.onopen = () => {
      console.log('[v0] WebSocket connected');
    };

    ws.onmessage = (event) => {
      const alert = JSON.parse(event.data);
      console.log('[v0] Alert via WebSocket:', alert);
      // Handle alert
    };

    ws.onerror = (error) => {
      console.error('[v0] WebSocket error:', error);
    };

    return () => ws.close();
  }, []);
}
```

### 5. Session Status Display

```typescript
'use client';

import useSWR from 'swr';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SessionStatus() {
  const { data: session } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/session`,
    fetch,
    { refreshInterval: 60000 } // Check every 60 seconds
  );

  if (!session) return null;

  const isHealthy = session.isValid && session.cookieValid;

  return (
    <div className={`p-3 rounded-lg ${
      isHealthy ? 'bg-chart-2/10' : 'bg-destructive/10'
    }`}>
      <div className="flex items-center gap-2">
        {isHealthy ? (
          <CheckCircle2 className="w-4 h-4 text-chart-2" />
        ) : (
          <AlertCircle className="w-4 h-4 text-destructive" />
        )}
        <div className="text-sm">
          <p className="font-medium">
            {isHealthy ? 'Session Active' : 'Session Issue'}
          </p>
          <p className="text-xs text-muted-foreground">
            Expires at {new Date(session.expiresAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### 6. Error Handling & Retry Logic

```typescript
const fetcher = async (url: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Refresh session
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session/refresh`, {
            method: 'POST'
          });
          // Retry request
          continue;
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`[v0] Fetch attempt ${i + 1} failed:`, error);
      
      if (i < retries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
  }
  
  throw new Error('Max retries exceeded');
};
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:7432
NEXT_PUBLIC_WS_URL=ws://localhost:7432

# Feature Flags
NEXT_PUBLIC_ENABLE_REAL_TIME_ALERTS=true

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# Monitoring (optional)
NEXT_PUBLIC_SENTRY_DSN=
```

---

## Development Workflow

### 1. Start Backend API
```bash
# In backend repository
npm run start:dev
# API running at http://localhost:7432
```

### 2. Start Frontend
```bash
# In this repository
npm run dev
# Dashboard at http://localhost:3000
```

### 3. Test Integration
1. Open http://localhost:3000
2. Add a flight via modal
3. Check browser DevTools Network tab
4. Verify API calls are successful
5. Monitor for real-time alerts

### 4. Debug API Responses
```typescript
// Add logging to debug API calls
const fetcher = (url: string) => {
  console.log('[v0] Fetching:', url);
  return fetch(url)
    .then(res => {
      console.log('[v0] Response status:', res.status);
      return res.json();
    })
    .then(data => {
      console.log('[v0] Response data:', data);
      return data;
    })
    .catch(error => {
      console.error('[v0] Fetch error:', error);
      throw error;
    });
};
```

---

## Production Considerations

### CORS Configuration
Backend should allow requests from frontend domain:
```typescript
// Backend main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true
});
```

### Rate Limiting
Implement rate limiting on frontend:
```typescript
let lastFetchTime = 0;
const RATE_LIMIT = 1000; // 1 second

const rateLimitedFetch = async (url: string) => {
  const now = Date.now();
  if (now - lastFetchTime < RATE_LIMIT) {
    await new Promise(resolve => 
      setTimeout(resolve, RATE_LIMIT - (now - lastFetchTime))
    );
  }
  lastFetchTime = Date.now();
  return fetch(url);
};
```

### Error Reporting
Send errors to monitoring service:
```typescript
const handleApiError = (error: Error, context: string) => {
  console.error(`[v0] ${context}:`, error);
  
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, {
      tags: { context }
    });
  }
};
```

---

## Testing the Integration

### Unit Test Example
```typescript
// __tests__/flights.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import TrackedFlights from '@/components/tracked-flights';

jest.mock('swr', () => ({
  __esModule: true,
  default: () => ({
    data: [
      {
        id: 1,
        origin: 'DOH',
        destination: 'ISB',
        currentPrice: 'QR 2450'
      }
    ],
    isLoading: false
  })
}));

test('displays tracked flights', async () => {
  render(<TrackedFlights />);
  
  await waitFor(() => {
    expect(screen.getByText('DOH → ISB')).toBeInTheDocument();
  });
});
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Check backend CORS config and origin header |
| 401 Unauthorized | Session expired - implement auto-refresh |
| Empty data | Verify API is running and returning data |
| Slow performance | Implement request caching with SWR |
| Real-time not working | Check WebSocket/SSE connection and firewall |

---

## Support
For API documentation, see the backend repository `/README.md`
