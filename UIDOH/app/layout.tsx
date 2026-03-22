import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: 'Qatar Airways Flight Tracker - Real-Time Monitoring',
  description: 'Monitor Qatar Airways flight availability, track prices, and get instant email alerts on availability changes, price drops, and seat count updates.',
  keywords: 'Qatar Airways, flight tracker, price monitoring, availability alerts, aviation',
  generator: 'v0.app',
  icons: {
    icon: '/qatrack-logo.png',
    apple: '/qatrack-logo.png',
  },
  other: {
    'theme-color': '#662046',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={_outfit.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
