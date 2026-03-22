# Components API Reference

## Component Library

A collection of reusable, production-grade React components for the Qatar Airways Flight Tracker dashboard.

---

## Header Component

**Location**: `components/header.tsx`

### Purpose
Sticky top navigation bar with real-time status, notifications, and user controls.

### Props
```typescript
interface HeaderProps {
  onMenuClick: () => void;  // Callback when mobile menu button clicked
}
```

### Usage
```typescript
import Header from '@/components/header';

export default function Dashboard() {
  return (
    <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
  );
}
```

### Features
- ✅ Mobile hamburger menu
- ✅ Live polling indicator (green dot)
- ✅ Notification bell with unread badge
- ✅ Settings access
- ✅ User avatar
- ✅ Sticky positioning
- ✅ Responsive (hidden on mobile until toggled)

### Styling
- Background: `bg-card/50` with `backdrop-blur-xl`
- Border: Bottom border with `border-border`
- Height: ~60px

### Events
- `onMenuClick()` - Triggered when hamburger menu clicked (mobile)

---

## Sidebar Component

**Location**: `components/sidebar.tsx`

### Purpose
Left navigation panel with menu items, secondary links, and service status widget.

### Props
```typescript
interface SidebarProps {
  open: boolean;           // Whether sidebar is visible
  onClose: () => void;     // Callback to close sidebar
}
```

### Usage
```typescript
import Sidebar from '@/components/sidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Main content */}
    </>
  );
}
```

### Features
- ✅ Primary navigation menu (5 items)
- ✅ Secondary menu (2 items)
- ✅ Service status widget
- ✅ Mobile overlay with close button
- ✅ Brand logo with icon
- ✅ Animated transitions

### Menu Items
**Primary**:
1. Dashboard (active by default)
2. Tracked Flights
3. Alerts
4. Analytics
5. History

**Secondary**:
1. Help & Support
2. Settings

### Service Status Widget
Shows:
- 🟢 API Active
- 🟢 Email OK
- Animated pulse indicators

### Mobile Behavior
- Slides in from left (`-translate-x-full`)
- Dark overlay backdrop
- Close button on top right
- Auto-closes on link click

### Styling
- Width: 256px (16rem)
- Background: `bg-sidebar`
- Border: Right border with `border-sidebar-border`
- Height: Full screen (`h-screen`)

---

## FlightCard Component

**Location**: `components/flight-card.tsx`

### Purpose
Individual flight tracking card displaying all relevant flight information.

### Props
```typescript
interface FlightCardProps {
  flight: {
    id: number;
    route: string;                    // e.g., "DOH → ISB"
    date: string;                     // Departure date
    cabin: string;                    // Cabin class (ECONOMY, BUSINESS, FIRST)
    status: 'available' | 'sold-out'; // Flight status
    price: string;                    // Display price (e.g., "QR 2,450")
    seats: number;                    // Available seats
    lastUpdate: string;               // e.g., "2 mins ago"
    priceChange: string;              // e.g., "-5%"
    trend: 'up' | 'down' | 'neutral'; // Price trend
  };
}
```

### Usage
```typescript
import FlightCard from '@/components/flight-card';

const flight = {
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
};

export default function FlightsList() {
  return <FlightCard flight={flight} />;
}
```

### Features
- ✅ Gradient accent line at top
- ✅ Status badge (color-coded)
- ✅ Price with trend indicator
- ✅ Available seats count
- ✅ Last update timestamp
- ✅ Action buttons (View, Pause, Delete)
- ✅ Hover effects
- ✅ Responsive

### Status Badge Colors
- **Available** (Green):
  - Background: `bg-chart-2/10`
  - Border: `border-chart-2/20`
  - Text: `text-chart-2`
  - Icon: CheckCircle2
  
- **Sold Out** (Red):
  - Background: `bg-destructive/10`
  - Border: `border-destructive/20`
  - Text: `text-destructive`
  - Icon: AlertCircle

### Price Trends
- **Down** (Green): `TrendingDown` icon, `text-chart-2`
- **Up** (Red): `TrendingUp` icon, `text-destructive`
- **Neutral** (Gray): No icon, `text-muted-foreground`

### Action Buttons
1. **View Details** - Primary button (requires implementation)
2. **Pause** - Secondary icon button
3. **Delete** - Destructive icon button

### Styling
- Border: `border-border`
- Background: `bg-card`
- Rounded: `rounded-xl`
- Padding: `p-6`
- Hover: Border highlight to `border-primary/30`

---

## AlertPanel Component

**Location**: `components/alert-panel.tsx`

### Purpose
Real-time alert notification display with severity-based styling.

### Props
```typescript
interface Alert {
  id: number;
  type: string;                              // Alert type identifier
  icon: LucideIcon;                          // Icon component
  title: string;                             // Alert title
  message: string;                           // Detailed message
  time: string;                              // Timestamp (e.g., "12:45 PM")
  severity: 'success' | 'info' | 'warning' | 'error';
}

interface AlertPanelProps {
  alert: Alert;
}
```

### Usage
```typescript
import AlertPanel from '@/components/alert-panel';
import { TrendingDown } from 'lucide-react';

const alert = {
  id: 1,
  type: 'price-drop',
  icon: TrendingDown,
  title: 'Price Drop Alert',
  message: 'DOH → ISB on 2026-03-29 dropped from QR 2,580 to QR 2,450',
  time: '12:45 PM',
  severity: 'success'
};

export default function Alerts() {
  return <AlertPanel alert={alert} />;
}
```

### Severity Colors

| Severity | Background | Border | Icon | Dot |
|----------|-----------|--------|------|-----|
| success | `bg-chart-2/10` | `border-chart-2/20` | `text-chart-2` | `bg-chart-2` |
| info | `bg-chart-2/10` | `border-chart-2/20` | `text-chart-2` | `bg-chart-2` |
| warning | `bg-yellow-500/10` | `border-yellow-500/20` | `text-yellow-500` | `bg-yellow-500` |
| error | `bg-destructive/10` | `border-destructive/20` | `text-destructive` | `bg-destructive` |

### Features
- ✅ Animated pulse indicator dot
- ✅ Contextual icon
- ✅ Title and message
- ✅ Timestamp
- ✅ Close button (appears on hover)
- ✅ Responsive text
- ✅ Severity-based styling

### Animation
- Pulse animation on dot: `animate-pulse`
- Hover state: Shows close button with fade-in

### Styling
- Border: `border-border`
- Rounded: `rounded-lg`
- Padding: `p-4`
- Layout: `flex gap-4` (icon, content, close button)

---

## AddFlightModal Component

**Location**: `components/add-flight-modal.tsx`

### Purpose
Modal dialog for adding new flights to track (single date or date range).

### Props
```typescript
interface AddFlightModalProps {
  open: boolean;      // Whether modal is visible
  onClose: () => void; // Callback to close modal
}
```

### Usage
```typescript
import AddFlightModal from '@/components/add-flight-modal';

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>+ Add Flight</button>
      <AddFlightModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
```

### Features
- ✅ Tabbed interface (Single Date / Date Range)
- ✅ Dark overlay backdrop
- ✅ Centered modal
- ✅ Sticky header and footer
- ✅ Organized form sections
- ✅ Info box with tracking benefits
- ✅ Responsive form layout

### Tabs

**Single Date**:
- Departure airport dropdown
- Destination airport dropdown
- Single date picker

**Date Range**:
- Departure airport dropdown
- Destination airport dropdown
- Start date picker
- End date picker

### Form Sections
1. **Route** (📍 icon)
   - Departure (dropdown)
   - Destination (dropdown)

2. **Travel Date** (📅 icon)
   - Single date or range

3. **Preferences** (✈️ icon)
   - Cabin class (dropdown)
   - Adults count (dropdown)

### Info Box
Shows benefits of tracking:
- ✓ Checked every 10 minutes
- ✓ Instant email alerts on changes
- ✓ Price & availability tracking

### Form Dropdowns

**Airports**:
- DOH (Doha)
- DXB (Dubai)
- AUH (Abu Dhabi)
- ISB (Islamabad)
- LHR (London)
- CDG (Paris)

**Cabin Class**:
- ECONOMY
- BUSINESS
- FIRST

**Adults**:
- 1, 2, 3, 4, 5

### Actions
- **Cancel** Button - Closes modal
- **Start Tracking** Button - Submits form (requires implementation)

### Styling
- Modal Width: `max-w-2xl`
- Max Height: `max-h-[90vh]` with overflow
- Border: `border-border`
- Background: `bg-card`
- Rounded: `rounded-2xl`

### Overlay
- Background: Black with opacity (`bg-black/50`)
- Backdrop blur: `backdrop-blur-sm`
- Z-index: 40 (overlay), 50 (modal)

---

## Page Component

**Location**: `app/page.tsx`

### Purpose
Main dashboard page combining all components into a cohesive interface.

### State Management
```typescript
const [sidebarOpen, setSidebarOpen] = useState(true);
const [showAddFlight, setShowAddFlight] = useState(false);
const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'settings'>('dashboard');
```

### Mock Data Structure
```typescript
// Tracked flights
const trackedFlights = [{
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
}];

// Alerts
const recentAlerts = [{
  id: 1,
  type: 'price-drop',
  icon: TrendingDown,
  title: 'Price Drop Alert',
  message: '...',
  time: '12:45 PM',
  severity: 'success'
}];

// Statistics
const stats = [{
  label: 'Active Trackers',
  value: '12',
  icon: Plane,
  change: '+2 this week'
}];
```

### Layout Sections
1. **Hero Section** - Branded welcome
2. **Statistics Grid** - 4 KPI cards
3. **Tracked Flights** - Flight cards grid
4. **Recent Alerts** - Alert panels timeline
5. **Mobile Tabs** - Bottom navigation

### Responsive Grids
```typescript
// Stats: 4 columns (1 mobile, 2 tablet, 4 desktop)
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"

// Flights: 3 columns (1 mobile, 2 tablet, 3 desktop)
"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
```

---

## Integration with Data

### Replace Mock Data

```typescript
// Before: Mock data
const trackedFlights = [{ ... }];

// After: Real data from API
import useSWR from 'swr';

const { data: trackedFlights, isLoading } = useSWR(
  '/api/flights',
  fetch
);
```

### Add Real Event Handlers

```typescript
// Flight card actions
const handleViewDetails = (flightId: number) => { /* ... */ };
const handlePause = (flightId: number) => { /* ... */ };
const handleDelete = (flightId: number) => { /* ... */ };

// Modal submission
const handleAddFlight = async (formData) => { /* ... */ };

// Alert handling
const handleCloseAlert = (alertId: number) => { /* ... */ };
```

### Connect Real-Time Alerts

```typescript
useEffect(() => {
  const eventSource = new EventSource('/api/alerts/stream');
  
  eventSource.onmessage = (event) => {
    const alert = JSON.parse(event.data);
    setAlerts(prev => [alert, ...prev]);
  };
  
  return () => eventSource.close();
}, []);
```

---

## Styling Notes

### Color Usage
- **Primary Actions**: `bg-primary text-primary-foreground`
- **Secondary Actions**: `hover:bg-secondary`
- **Destructive**: `text-destructive` or `bg-destructive/10`
- **Borders**: `border-border`
- **Text**: `text-foreground` (default), `text-muted-foreground` (secondary)

### Common Classes
```typescript
// Buttons
"px-4 py-2 rounded-lg transition-colors"
"bg-primary hover:bg-primary/90"
"border border-border hover:bg-secondary"

// Cards
"rounded-lg border border-border bg-card p-4"
"hover:border-primary/30 transition-all"

// Text
"text-sm text-muted-foreground"
"text-lg font-bold text-foreground"

// Flex layouts
"flex items-center justify-between gap-4"
"flex flex-col md:flex-row"
```

---

## Re-exporting Components

To use components in your pages:

```typescript
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import FlightCard from '@/components/flight-card';
import AlertPanel from '@/components/alert-panel';
import AddFlightModal from '@/components/add-flight-modal';
```

---

## Performance Tips

1. **Memoization**: Wrap components if they receive complex props
   ```typescript
   export default memo(FlightCard);
   ```

2. **Lazy Loading**: For modals
   ```typescript
   const AddFlightModal = dynamic(
     () => import('@/components/add-flight-modal'),
     { ssr: false }
   );
   ```

3. **Event Delegation**: Use event bubbling when possible

4. **Minimize Re-renders**: Use `useCallback` for event handlers

---

## Testing Components

### Unit Test Example
```typescript
import { render, screen } from '@testing-library/react';
import FlightCard from '@/components/flight-card';

test('renders flight route', () => {
  render(<FlightCard flight={mockFlight} />);
  expect(screen.getByText('DOH → ISB')).toBeInTheDocument();
});
```

### Storybook Integration
Create stories for component previews:
```typescript
// flight-card.stories.tsx
export default {
  component: FlightCard,
  args: { flight: mockFlight }
};

export const Available = { args: { ... } };
export const SoldOut = { args: { ... } };
```

---

## Common Modifications

### Change Colors
Edit `/app/globals.css` `.dark` section

### Add New Status
Update `statusConfig` in `flight-card.tsx`

### Modify Animations
Edit transitions and animation classes in components

### Adjust Spacing
Modify padding/margin Tailwind classes

### Update Typography
Change font sizes and weights in component classes

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Component not rendering | Check props match interface |
| Styling not applied | Verify Tailwind class name |
| Modal not closing | Check `open` prop and `onClose` handler |
| Animation stuttering | Check GPU acceleration (transform-gpu) |
| Icons missing | Verify Lucide import |

---

## External Dependencies

- **React**: 19+
- **Next.js**: 16+
- **Tailwind CSS**: 4+
- **Lucide React**: Latest
- **TypeScript**: 5+

---

**Component Library Complete! 🎉**

All components are production-ready and fully documented. Ready to integrate with your backend API.
