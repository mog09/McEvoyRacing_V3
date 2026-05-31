import type { Metadata } from 'next'
import { Barlow_Condensed, Raleway, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-title',
  display:  'swap',
})

const raleway = Raleway({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display:  'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '600'],
  variable: '--font-display',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'McEvoy Racing — Run With Us',
  description: 'Premium thoroughbred racing syndications. Group 1 winners. Adelaide and Melbourne.',
  openGraph: {
    title:       'McEvoy Racing',
    description: 'Run With Us — Premium thoroughbred racing syndications.',
    siteName:    'McEvoy Racing',
    locale:      'en_AU',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${raleway.variable} ${cormorantGaramond.variable}`}>
      <body className="bg-cream text-dark antialiased">
        {children}
      </body>
    </html>
  )
}
