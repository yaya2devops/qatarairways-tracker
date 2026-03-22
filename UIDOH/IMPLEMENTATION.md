# Qatar Airways Flight Tracker - Implementation Guide

## Quick Start

### Running the Dashboard Locally
```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000 in your browser
```

## Project Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout with theme
│   ├── globals.css             # Design tokens & theme colors
│   └── page.tsx                # Main dashboard page
├── components/
│   ├── header.tsx              # Top navigation bar
│   ├── sidebar.tsx             # Left navigation panel
│   ├── flight-card.tsx         # Individual flight tracker card
│   ├── alert-panel.tsx         # Alert notification display
│   └── add-flight-modal.tsx    # Modal for adding new flights
├── lib/
│   └── utils.ts                # Utility functions
├── hooks/
│   └── use-mobile.tsx          # Mobile detection hook
├── DESIGN.md                   # Design system documentation
└── IMPLEMENTATION.md           # This file
```

## Component Integration

### Adding Real Data from Backend

#### 1. Flight Card Component
Currently uses mock data. To integrate with API:

```typescript
// In app/page.tsx
import useSWR from 'swr';

const { data: flights, error, isLoading } = useSWR('/api/flights');

// Pass to FlightCard components
{flights?.map((flight) => (
  <FlightCard key={flight.id} flight={flight} />
))}
```

#### 2. Alert Panel Component
To connect real-time alerts:

```typescript
// Listen for webhook/server-sent events
useEffect(() => {
  const eventSource = new EventSource('/api/alerts/stream');
  
  eventSource.onmessage = (event) => {
    const alert = JSON.parse(event.data);
    setAlerts(prev => [alert, ...prev]);
  };
  
  return () => eventSource.close();
}, []);
```

#### 3. Add Flight Modal
To submit tracked flights:

```typescript
// In add-flight-modal.tsx
const handleSubmit = async () => {
  const response = await fetch('/api/flights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      origin: form.departure,
      destination: form.destination,
      departureDate: form.date,
      cabinClass: form.cabin,
      adults: form.adults
    })
  });
};
```

## Design Token Customization

### Color System
All colors defined in `app/globals.css` using CSS custom properties:

```css
.dark {
  --background: oklch(0.08 0 0);        /* Deep black */
  --primary: oklch(0.45 0.28 10);       /* Maroon */
  --accent: oklch(0.55 0.25 10);        /* Bright maroon */
  --chart-1: oklch(0.55 0.25 10);       /* Price down (green) */
  --chart-2: oklch(0.45 0.22 240);      /* Availability (blue) */
  /* ... more colors ... */
}
```

### Modifying Colors
1. Edit `/app/globals.css` - `.dark` section
2. Use OKLch color space (modern standard)
   - Format: `oklch(lightness saturation hue)`
   - Lightness: 0-1 (0=black, 1=white)
   - Saturation: 0-0.4 (higher = more vivid)
   - Hue: 0-360 (degrees)

### Theme Consistency
- Primary: `--primary` (maroon)
- Accent: `--accent` (bright maroon)
- Success: `--chart-2` (green, for positive trends)
- Warning: Use yellow/orange for alerts
- Error: `--destructive` (red for sold-out)

## Styling Best Practices

### Tailwind Classes
Use semantic Tailwind utilities:

```tsx
// ✓ Good
<div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">

// ✗ Avoid
<div className="p-[16px] rounded-[10px]" style={{background: '#800020'}}>
```

### Responsive Design
Always think mobile-first:

```tsx
// Mobile → Tablet → Desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Component Composition
Keep components focused and reusable:

```tsx
// ✓ Good - Separate concerns
<FlightCard flight={data} />
<AlertPanel alert={notification} />

// ✗ Avoid - Mixed responsibilities
<FlightAndAlertComponent flight={data} alert={notification} />
```

## Performance Optimization

### Data Fetching
Use SWR for client-side data fetching with caching:

```typescript
import useSWR from 'swr';

const { data, error, isLoading } = useSWR('/api/flights', fetch, {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 10000 // Refresh every 10 seconds
});
```

### Image Optimization
Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/qatar-logo.png" 
  alt="Qatar Airways" 
  width={100} 
  height={100}
  priority
/>
```

### Code Splitting
Components are automatically code-split by Next.js. For modals:

```typescript
const AddFlightModal = dynamic(
  () => import('@/components/add-flight-modal'),
  { ssr: false }
);
```

## Testing Strategy

### Component Testing
```typescript
// __tests__/flight-card.test.tsx
import { render, screen } from '@testing-library/react';
import FlightCard from '@/components/flight-card';

test('displays flight route correctly', () => {
  render(<FlightCard flight={mockFlight} />);
  expect(screen.getByText('DOH → ISB')).toBeInTheDocument();
});
```

### Integration Testing
```typescript
// __tests__/dashboard.integration.test.tsx
test('adds flight and displays in list', async () => {
  render(<Dashboard />);
  fireEvent.click(screen.getByText('Add Flight'));
  // ... fill form
  // ... verify flight appears in list
});
```

## Accessibility Improvements

### ARIA Labels
```tsx
// Add ARIA labels for complex interactive elements
<button 
  aria-label="Delete tracked flight DOH to ISB"
  onClick={handleDelete}
>
  <Trash2 className="w-4 h-4" />
</button>
```

### Semantic HTML
```tsx
// ✓ Use semantic elements
<nav>Navigation items</nav>
<main>Main content</main>
<aside>Sidebar</aside>

// ✗ Avoid generic divs
<div>Navigation items</div>
```

### Keyboard Navigation
```tsx
// Ensure all interactive elements are focusable
<button className="focus:ring-2 focus:ring-primary focus:outline-none">
  Click me
</button>
```

## Deployment Checklist

### Before Going Live
- [ ] All mock data replaced with real API calls
- [ ] Error handling implemented for failed API requests
- [ ] Loading states added to all data-fetching components
- [ ] Responsive design tested on multiple devices
- [ ] Performance metrics checked (Lighthouse > 90)
- [ ] SEO metadata updated in layout.tsx
- [ ] Error logging configured
- [ ] User authentication integrated
- [ ] Database credentials secured in environment variables
- [ ] Rate limiting configured on backend

### Environment Variables Required
```env
# Backend API
NEXT_PUBLIC_API_URL=https://api.qatarairways-tracker.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# Authentication (if using)
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

### Build & Deploy
```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to Vercel
vercel deploy --prod
```

## Key Integration Points

### Email Alerts Integration
The backend sends email alerts. The dashboard should:
1. Show when alerts were sent
2. Display alert history
3. Allow alert preferences configuration
4. Show email delivery status

### Session Management
Qatar Airways API requires session cookies (2-hour TTL):
- Backend automatically manages via Playwright
- Dashboard should show session status
- Display proactive refresh happening

### Docker Support
For production deployment:
```bash
# Build Docker image
docker build -t qatarairways-tracker .

# Run container
docker compose up -d

# Access at http://localhost:7432
```

## Monitoring & Observability

### Error Tracking
```typescript
// Log errors for debugging
console.error('[v0] Flight fetch failed:', error);

// Send to external service
Sentry.captureException(error);
```

### Performance Monitoring
```typescript
// Track component render times
performance.mark('flight-card-render-start');
// ... component logic
performance.mark('flight-card-render-end');
performance.measure('flight-card-render', 'flight-card-render-start', 'flight-card-render-end');
```

### Health Checks
Dashboard shows:
- API service status
- Email service status
- Last successful poll timestamp
- Session validity indicator

## Common Tasks

### Adding a New Status Type
1. Add to `statusConfig` in `flight-card.tsx`
2. Define colors in globals.css
3. Update FlightCard component logic
4. Test with mock data

### Creating a New Page
1. Create route in `app/` folder
2. Import reusable components
3. Follow same styling patterns
4. Add to sidebar navigation

### Modifying Color Scheme
1. Edit `app/globals.css` - `.dark` section
2. Update all related colors (primary, accent, chart colors)
3. Test with all components
4. Ensure contrast ratios remain WCAG compliant

## Support & Resources

- **Design System**: See `/DESIGN.md`
- **API Documentation**: See `/README.md` (backend)
- **Tailwind Docs**: https://tailwindcss.com
- **Next.js Docs**: https://nextjs.org
- **Lucide Icons**: https://lucide.dev

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Styling Issues
- Check that globals.css is imported in layout.tsx
- Verify tailwind.config.ts has correct paths
- Clear Tailwind cache: `rm -rf node_modules/.cache`

### Mobile Layout Issues
- Test with Chrome DevTools device emulation
- Check responsive breakpoints (md, lg, xl)
- Verify touch targets are 44px minimum
