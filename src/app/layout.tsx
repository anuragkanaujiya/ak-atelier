import type { Metadata } from 'next';
import { Cormorant_Garamond, Playfair_Display, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
// import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { SmoothScrollProvider } from '@/components/common/SmoothScrollProvider';
import { AnimatedTextSelection } from '@/components/common/AnimatedTextSelection';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://akatelier.luxury'),
  title: 'AK ATELIER — Haute Couture & Western Tailoring · Milan & Paris',
  description:
    'Experience AK ATELIER Milano: Super 150s virgin wool suiting, double-faced Mongolian cashmere overcoats, liquid silk evening gowns, and bespoke formal tailoring.',
  keywords: [
    'AK ATELIER',
    'Milan luxury fashion',
    'Haute couture',
    'Tailored pant suits',
    'Cashmere overcoats',
    'Silk evening gowns',
    'Bespoke tuxedos',
    'Quiet luxury',
  ],
  openGraph: {
    title: 'AK ATELIER — Haute Couture & Western Tailoring · Milan',
    description:
      'Super 150s virgin wool suiting, double-faced Mongolian cashmere, and liquid silk gowns from our Milan flagship atelier.',
    url: 'https://akatelier.luxury',
    siteName: 'AK ATELIER',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" href="/hero-frames/frame_001.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/hero-poster.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-surface-300 text-neutral-900 selection:bg-primary-300 selection:text-neutral-900"
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <LoadingProvider>
                  {/* <AnnouncementBar /> */}
                  <Header />
                  <SmoothScrollProvider>
                    <main className="flex-1">{children}</main>
                  </SmoothScrollProvider>
                  <Footer />
                  <AnimatedTextSelection />
                </LoadingProvider>
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
