import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import CookieBanner from '@/components/CookieBanner';
import { ToastProvider } from '@/components/Toast';
import { SITE } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Air Cargo & Logistics`, template: `%s | ${SITE.shortName}` },
  description: SITE.description,
  openGraph: { type: 'website', siteName: SITE.name, title: SITE.name, description: SITE.description, url: SITE.url },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.description },
  alternates: { canonical: '/' },
};

export const viewport = { themeColor: '#05070B' };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-accent focus:p-3 focus:text-bg">Skip to content</a>
        <ToastProvider>
          <SmoothScroll />
          <Cursor />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CookieBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
