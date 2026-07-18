import './globals.css'

export const metadata = {
  metadataBase: new URL('https://dineflow-website.vercel.app'),
  title: {
    default: 'Dineflow — Order food before you arrive. Your table is waiting.',
    template: '%s | Dineflow'
  },
  description: "Ethiopia's smartest food ordering platform. Order ahead, pay with Chapa, track in real time. Built for restaurants, hotels, cafes, and food lovers across Ethiopia.",
  keywords: ['food ordering Ethiopia', 'restaurant app Ethiopia', 'hotel food app Ethiopia', 'cafe app Ethiopia', 'Dineflow', 'Hawassa food', 'Addis Ababa restaurant', 'Chapa payment', 'order food online Ethiopia'],
  authors: [{ name: 'Dineflow', url: 'https://dineflow-website.vercel.app' }],
  creator: 'Dineflow',
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    url: 'https://dineflow-website.vercel.app',
    siteName: 'Dineflow',
    title: 'Dineflow — Order food before you arrive.',
    description: "Ethiopia's smartest food ordering platform. Browse restaurants, hotels, and cafes, order ahead, pay with Chapa.",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Dineflow — Order food before you arrive',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dineflow — Order food before you arrive.',
    description: "Ethiopia's smartest food ordering platform.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
