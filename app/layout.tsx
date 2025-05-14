import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://breazy.stackblitz.io'),
  title: {
    default: 'Breazy - Breathwork & Breathing Exercise App',
    template: '%s | Breazy'
  },
  description: 'Breazy is a no-login breathwork web app guiding inhale, hold, exhale with a climbing visual. Practice guided breathing exercises for relaxation and mindfulness.',
  keywords: ['breathwork', 'breathing exercise', 'breathe work app', 'breath easy', 'meditation', 'mindfulness', 'relaxation'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://breazy.stackblitz.io',
    siteName: 'Breazy',
    title: 'Breazy - Breathwork & Breathing Exercise App',
    description: 'Breazy is a no-login breathwork web app guiding inhale, hold, exhale with a climbing visual. Practice guided breathing exercises for relaxation and mindfulness.',
    images: [
      {
        url: 'https://breazy.stackblitz.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Breazy - Breathwork & Breathing Exercise App'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breazy - Breathwork & Breathing Exercise App',
    description: 'Breazy is a no-login breathwork web app guiding inhale, hold, exhale with a climbing visual.',
    creator: '@AmlanDEV10'
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="canonical" href="https://breazy.stackblitz.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Breazy",
              "description": "A breathwork web app guiding inhale, hold, exhale with a climbing visual.",
              "url": "https://breazy.stackblitz.io",
              "applicationCategory": "HealthApplication",
              "author": {
                "@type": "Person",
                "name": "Amlan",
                "url": "https://x.com/AmlanDEV10"
              },
              "offers": {
                "@type": "Offer",
                "price": "0"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}