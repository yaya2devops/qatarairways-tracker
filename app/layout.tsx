import type { Metadata } from 'next'
import { Geist, Geist_Mono, Jotia } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _jotia = Jotia({ subsets: ["latin"], variable: "--font-jotia", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: 'Qatar Airways Flight Tracker - Real-Time Monitoring',
  description: 'Monitor Qatar Airways flight availability, track prices, and get instant email alerts on availability changes, price drops, and seat count updates.',
  keywords: 'Qatar Airways, flight tracker, price monitoring, availability alerts, aviation',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
    <html lang="en" className={_jotia.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
