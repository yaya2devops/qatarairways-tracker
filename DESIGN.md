# Qatar Airways Flight Tracker - Design & UI Documentation

## Overview
A premium, production-grade flight tracking dashboard that monitors Qatar Airways flight availability, pricing, and seat availability in real-time with instant email alerts.

## Design System

### Color Palette
The interface uses a sophisticated dark theme inspired by Qatar Airways' premium brand identity:

- **Background**: Deep black (`oklch(0.08 0 0)`)
- **Primary Brand**: Maroon/Wine (`oklch(0.45 0.28 10)`) - Qatar Airways signature color
- **Secondary**: Deep blue (`oklch(0.32 0.03 200)`) - Trust & aviation
- **Accent**: Warm maroon (`oklch(0.55 0.25 10)`) - Highlights & interactive elements
- **Muted**: Subtle grays for secondary content
- **Chart Colors**: Multi-color palette for data visualization
  - Chart 1: Primary maroon
  - Chart 2: Positive green (price drops)
  - Chart 3: Gold/Yellow
  - Chart 4: Professional blue
  - Chart 5: Warm accent

### Typography
- **Font Family**: Geist (modern, clean, professional)
- **Headlines**: Bold weights for hierarchy
- **Body**: Regular weight for readability (14px+)
- **Line Height**: 1.6 for comfortable reading

### Spacing & Radius
- **Base Radius**: 0.625rem (10px) for consistent roundness
- **Spacing Scale**: 4px increments
- **Border Style**: Subtle gray borders with transparency

## Component Architecture

### 1. **Header** (`components/header.tsx`)
Sticky navigation bar with:
- Mobile menu toggle
- Live monitoring indicator (green dot animation)
- Polling status ("Every 10 min")
- Notification bell with unread indicator
- Settings access
- User avatar with QR initials

**Features:**
- Responsive design (hidden on mobile)
- Backdrop blur effect for premium feel
- Status indicators for system health

### 2. **Sidebar** (`components/sidebar.tsx`)
Left navigation panel featuring:
- Branded logo with plane icon
- Main navigation menu (Dashboard, Tracked Flights, Alerts, Analytics, History)
- Secondary menu (Help & Support, Settings)
- **Service Status Widget**:
  - Real-time API status
  - Email service health
  - Animated pulse indicators

**Mobile Behavior:**
- Slides in from left on mobile
- Overlay backdrop for context
- Easy dismiss with X button

### 3. **Flight Card** (`components/flight-card.tsx`)
Individual flight tracking card displaying:
- Route information (e.g., DOH → ISB)
- Departure date & cabin class
- **Status Badge**: Color-coded (Available/Sold Out)
- **Price Display**:
  - Large, bold primary price
  - Trend indicator (↓ down, ↑ up, = neutral)
  - Percentage change with color coding
- **Metrics**:
  - Available seats count
  - Last update timestamp
- **Actions**:
  - View Details button
  - Pause tracking
  - Delete tracking

**Visual Features:**
- Accent line at top (gradient)
- Hover state with border highlight
- Responsive grid layout
- Smooth transitions

### 4. **Alert Panel** (`components/alert-panel.tsx`)
Real-time notification display with:
- **Alert Types**:
  - Price drops (success/green)
  - Availability updates (info/blue)
  - Sold out notifications (warning/yellow)
  - System alerts (error/red)
- **Components**:
  - Animated pulse dot
  - Icon representation
  - Title & detailed message
  - Timestamp
  - Animated hover state
  - Close button

**Features:**
- Severity-based color coding
- Contextual icons matching alert type
- Responsive text truncation
- Dismissible with close button

### 5. **Add Flight Modal** (`components/add-flight-modal.tsx`)
Modal dialog for adding tracked flights with:

**Two Tracking Modes:**
1. **Single Date** - Track specific departure date
2. **Date Range** - Track multiple consecutive dates

**Input Fields:**
- Departure airport (dropdown)
- Destination airport (dropdown)
- Departure date (date picker)
- End date (date picker, range mode only)
- Cabin class (Economy/Business/First)
- Number of adults (1-5)

**Features:**
- Tabbed interface for mode selection
- Organized sections with icons
- Informational box highlighting tracking benefits
- Responsive form layout
- Sticky footer with action buttons

## Dashboard Layout

### Hero Section
- Premium gradient background with overlay
- Plane icon + heading
- Descriptive subtitle about real-time monitoring

### Statistics Grid (4 Columns)
- **Active Trackers**: Total routes being monitored
- **Price Changes**: Recent price fluctuations
- **Alerts Sent**: Total notifications this month
- **Savings Detected**: Potential deal value
- Each stat includes icon, value, and trend info

### Tracked Flights Section
- Section header with "Add Flight" CTA button
- Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Individual flight cards with comprehensive data

### Recent Alerts Section
- Alert history from last 24 hours
- Stacked alert panels
- Color-coded by severity
- Timestamps for context

## Responsive Design

### Breakpoints
- **Mobile**: Base design (< 768px)
- **Tablet**: `md:` prefix (768px - 1024px)
- **Desktop**: `lg:` prefix (1024px+)
- **Large Desktop**: `xl:` prefix (1280px+)

### Mobile Optimizations
- Bottom tab navigation for main sections
- Hamburger menu for sidebar
- Single-column layouts
- Touch-friendly button sizes
- Full-width modals
- Simplified header

### Tablet & Desktop
- Full sidebar navigation
- Multi-column grids
- Expanded information displays
- Hover states enabled

## Interactive Features

### Animations
- **Pulse animations**: Live indicators, notification dots
- **Smooth transitions**: Hover states, color changes (300ms)
- **Slide transitions**: Sidebar mobile toggle (300ms)
- **Fade effects**: Overlay backdrop blur

### Hover States
- Cards: Border color shift to primary, background subtle change
- Buttons: Opacity/color changes
- Navigation: Background highlight with rounded styling
- Flight cards: Accent line glow effect

### State Management
- Active tab tracking (Dashboard/Alerts/Settings)
- Modal open/close state
- Sidebar mobile toggle
- Flight card action buttons

## Key Design Principles

### 1. **Premium & Professional**
- Sophisticated color scheme
- Clean typography hierarchy
- Minimal, purposeful design elements
- High-quality visual polish

### 2. **Real-Time Clarity**
- Live status indicators
- Color-coded alerts
- Clear pricing display
- Timestamp precision

### 3. **Accessibility**
- High contrast ratios (WCAG compliant)
- Semantic HTML structure
- Clear focus states
- Descriptive alt text for icons
- Proper ARIA labels

### 4. **Performance**
- Optimized component rendering
- CSS classes over inline styles
- Efficient animations (GPU-accelerated)
- Mobile-first approach

### 5. **User Guidance**
- Contextual information boxes
- Clear call-to-action buttons
- Informative empty states
- Status indicators

## Integration with Backend API

### Expected API Endpoints
```
GET  /flights              - List all tracked flights
POST /flights              - Add single date flight
POST /flights/range        - Add date range flight
PATCH /flights/:id/active  - Pause/resume tracking
DELETE /flights/:id        - Remove flight tracking
POST /notifier/test        - Send test email
```

### Real-Time Data Points
- Flight availability status
- Current pricing
- Seat count
- Last polling timestamp
- Price change percentage
- Historical trend data

## Future Enhancements

### Phase 2 Features
- [ ] Advanced filtering & sorting
- [ ] Custom notification preferences
- [ ] Price history charts
- [ ] Saved search templates
- [ ] Multi-user accounts with auth
- [ ] Booking integration
- [ ] Calendar view for multiple dates
- [ ] Email digest summaries

### Visual Improvements
- [ ] Dark/light theme toggle
- [ ] Custom color schemes
- [ ] Advanced charts & visualizations
- [ ] Animated route maps
- [ ] Seat map previews

## Brand Consistency

### Qatar Airways Integration
- **Colors**: Maroon primary (#800020 equivalent)
- **Typography**: Modern, premium aesthetic
- **Iconography**: Professional aviation-focused icons
- **Voice**: Clear, professional, real-time focused

### Visual Language
- Sharp corners with slight radius for tech feel
- Gradient accents for premium touch
- Consistent icon usage throughout
- Status-based color coding for quick scanning
