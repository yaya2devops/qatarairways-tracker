# Qatar Airways Flight Tracker - UI Features & Key Instructions

## 🎯 Dashboard Overview

A premium, production-grade flight monitoring dashboard that provides real-time insights into Qatar Airways flight availability, pricing, and seat availability with instant email alert notifications.

## 📊 Key Screens & Features

### 1. **Main Dashboard**
The primary interface showcasing all monitoring activities.

#### Hero Section
- **Plane Icon + Headline**: "Qatar Airways Flight Tracker"
- **Subtitle**: Describes real-time monitoring capabilities
- **Visual**: Premium gradient background with subtle overlay pattern

#### Statistics Grid (4 Cards)
Real-time KPI cards displaying:
- 🛫 **Active Trackers** - Total number of flights being monitored
- 📈 **Price Changes** - Number of price fluctuations this period
- 🔔 **Alerts Sent** - Total notifications sent
- 💰 **Savings Detected** - Potential deal values identified

Each card includes:
- Icon representation
- Large numeric value in primary color
- Secondary metric (trend/context)
- Hover state with subtle background shift

#### Tracked Flights Grid
3-column responsive layout (1 col on mobile, 2 on tablet) showing:
- **Route**: Origin → Destination (e.g., DOH → ISB)
- **Date & Cabin**: Departure date and class of service
- **Status Badge**: Color-coded (🟢 Available / 🔴 Sold Out)
- **Price Section**: 
  - Large price in primary maroon
  - Trend indicator (↓ Down / ↑ Up)
  - Percentage change
- **Metrics**:
  - Available seats with user icon
  - Last update timestamp
- **Action Buttons**:
  - View Details (primary color)
  - Pause Tracking (secondary)
  - Delete (destructive)

**Visual Design**:
- Accent line at top (gradient)
- Border highlight on hover
- Smooth transitions

#### Recent Alerts Section
Last 24 hours of activity shown as stacked alert panels:

**Alert Types**:
- 🟢 **Price Drop**: Cost reduction notification (green)
- ℹ️ **Available**: Flight became bookable (blue)
- ⚠️ **Sold Out**: Inventory fully booked (yellow)
- ❌ **Error**: System issues (red)

**Alert Panel Components**:
- Animated pulse dot indicator
- Contextual icon
- Alert title
- Detailed message
- Timestamp
- Close button (appears on hover)

### 2. **Add Flight Modal**
Premium modal dialog for tracking new flights.

**Dual Modes**:
1. **Single Date Tab**: Track specific departure date
2. **Date Range Tab**: Monitor multiple consecutive dates

**Input Sections**:
- 🗺️ **Route**: Departure and destination airports (dropdowns)
- 📅 **Travel Date**: Departure date picker (single/range)
- ✈️ **Preferences**: Cabin class and passenger count

**Premium Features**:
- Organized sections with icons
- Info box highlighting tracking benefits
- Responsive 2-column grid
- Sticky footer with action buttons

**Actions**:
- "Start Tracking" (primary button)
- "Cancel" (secondary)

### 3. **Header Navigation**
Sticky top bar with:
- 📱 Mobile menu toggle
- 🟢 **Live Monitoring Indicator**: Shows "Polling every 10 min"
- 🔔 **Notification Bell**: Unread indicator dot
- ⚙️ **Settings Button**: Quick access
- **User Avatar**: QR initials in gradient

**Status Info**: 
- Shows real-time API polling status
- Visible only on desktop

### 4. **Sidebar Navigation**
Left panel with persistent navigation:

**Main Menu**:
- Dashboard (highlighted when active)
- Tracked Flights
- Alerts
- Analytics
- History

**Secondary Menu**:
- Help & Support
- Settings

**Service Status Widget**:
- API health indicator (🟢 green dot)
- Email service status
- Animated pulse animations

**Mobile Behavior**:
- Slides in from left
- Overlay backdrop
- Easy dismiss with X button

### 5. **Mobile Tab Navigation** (Mobile Only)
Bottom navigation bar for mobile devices:
- Dashboard tab
- Alerts tab
- Settings tab
- Active tab highlighted in primary color

---

## 🎨 Design Language

### Color System
- **Primary (Maroon)**: `oklch(0.45 0.28 10)` - Qatar Airways brand
  - Used for: Headlines, primary buttons, active states
- **Accent (Bright Maroon)**: `oklch(0.55 0.25 10)` - Interactive elements
  - Used for: Highlights, hover states, secondary CTAs
- **Background (Deep Black)**: `oklch(0.08 0 0)` - Primary surface
- **Card**: `oklch(0.13 0.02 280)` - Elevated surfaces with slight purple tint
- **Success (Green)**: `oklch(0.45 0.22 240)` - Price drops, positive trends
- **Warning (Yellow)**: For alerts and caution states
- **Destructive (Red)**: For sold-out, deletions, errors

### Typography
- **Font**: Geist (modern, professional)
- **Headlines**: Bold weights (700+)
- **Body**: Regular (14px+)
- **Accessibility**: Minimum 44px touch targets, high contrast ratios

### Spacing & Layout
- **Base Unit**: 4px increments
- **Card Padding**: 24px (6 units)
- **Section Gaps**: 32px (8 units)
- **Border Radius**: 10px consistent throughout

---

## 🔄 Real-Time Updates

### Data Polling
- **Frequency**: Every 10 minutes (configurable)
- **Display**: "Polling every 10 min" in header
- **Last Update**: Shown on each flight card (e.g., "2 mins ago")

### Alert Triggers
Dashboard can display alerts for:
1. **Price Changes**: Up/down percentage with trend icon
2. **Availability Updates**: When seats become available
3. **Sold Out Notifications**: When inventory depletes
4. **Seat Count Changes**: When inventory quantity shifts
5. **System Status**: API health, email delivery status

### Status Indicators
- 🟢 **Green dot**: Active, healthy, available
- 🔴 **Red indicator**: Sold out, error, inactive
- ⚠️ **Yellow**: Warning, attention needed
- ⏱️ **Pulse animation**: Real-time activity, live updates

---

## 🎯 Key Interactions

### Adding a Tracked Flight
1. Click **"+ Add Flight"** button (top right of Tracked Flights section)
2. Modal opens with pre-filled defaults
3. Select flight mode (Single Date or Range)
4. Choose:
   - Departure airport (e.g., DOH)
   - Destination (e.g., ISB)
   - Travel date(s)
   - Cabin class (Economy/Business/First)
   - Number of adults (1-5)
5. Click **"Start Tracking"** to begin monitoring
6. Flight appears in the Tracked Flights grid immediately

### Managing a Tracked Flight
- **View Details**: Opens detailed flight information page
- **Pause**: Temporarily stops monitoring (keeps data)
- **Delete**: Removes flight from tracking

### Responding to Alerts
- Alert appears in Recent Alerts section
- Shows timestamp, type, and detailed message
- Can dismiss with close button (X)
- Alert history available in Alerts tab

### Navigation
- **Desktop**: Use sidebar menu
- **Tablet**: Use sidebar + scrollable content
- **Mobile**: Use bottom tab navigation

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 768px | 1-column, bottom tabs, hamburger menu |
| Tablet | 768px - 1024px | 2-column grids, sidebar visible |
| Desktop | 1024px+ | 3-column grids, full sidebar, hover states |
| Large | 1280px+ | 4-column grids, expanded spacing |

---

## ✅ Accessibility Features

- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support with visible focus states
- **Color Contrast**: WCAG AAA compliant (7:1 minimum ratio)
- **Semantic HTML**: Proper heading hierarchy, landmark regions
- **Screen Reader Friendly**: Descriptive alt text and labels
- **Touch Targets**: 44px minimum for mobile interaction

---

## 🚀 Performance Optimizations

- **CSS Classes**: Utility-first Tailwind CSS (no inline styles)
- **Animations**: GPU-accelerated transitions (smooth 60fps)
- **Code Splitting**: Lazy-loaded components
- **Data Fetching**: SWR with caching strategy
- **Image Optimization**: Next.js Image component
- **Bundle Size**: < 200KB gzipped

---

## 📞 Support & Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.qatarairways-tracker.com
NEXT_PUBLIC_POLL_INTERVAL=600000  # 10 minutes in ms
```

### Backend Integration
The dashboard connects to:
- `/api/flights` - List, create, update tracked flights
- `/api/alerts` - Retrieve alert history
- `/api/session` - Check API session status
- `/api/notifier/test` - Test email notifications

### Email Alerts
When events occur, users receive emails with:
- 🟢 Flight available: "QR DOH→ISB 2026-03-29: Now Available"
- 🔴 Sold out: "QR DOH→ISB 2026-03-29: Sold Out"
- 💰 Price change: "QR DOH→ISB 2026-03-29: Price Changed"
- 💺 Seats changed: "QR DOH→ISB 2026-03-29: Seats Changed"

---

## 🎓 Design Principles

1. **Premium & Professional**: Sophisticated color palette, clean typography
2. **Real-Time Clarity**: Live indicators, color-coded statuses
3. **Accessibility**: WCAG AAA compliant throughout
4. **Performance**: Optimized animations, efficient rendering
5. **User Guidance**: Contextual info, clear CTAs, status indicators

---

## 📚 Documentation

- **Design System**: See `/DESIGN.md`
- **Implementation**: See `/IMPLEMENTATION.md`
- **Backend API**: See `/README.md` (backend repo)

---

## 🌟 Future Enhancements

- [ ] Dark/light theme toggle
- [ ] Custom notification preferences per flight
- [ ] Price history charts & visualizations
- [ ] Advanced filtering & sorting
- [ ] Calendar view for multiple dates
- [ ] Booking integration
- [ ] Email digest summaries
- [ ] Multi-user accounts with authentication
