import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from 'next-intl/server';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mystic Tarot Reading - Unveil Your Destiny",
    template: "%s | Mystic Tarot Reading"
  },
  description: "Unveil your destiny with the ancient wisdom of the cards. Professional tarot card divination and fortune telling platform with multiple spreads and multilingual support.",
  keywords: ["tarot", "divination", "fortune telling", "mystic", "cards", "reading", "destiny", "spiritual"],
  authors: [{ name: "Mystic Tarot" }],
  creator: "Mystic Tarot",
  publisher: "Mystic Tarot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'zh': '/zh',
      'fr': '/fr',
      'ar': '/ar',
      'hi': '/hi',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Mystic Tarot Reading - Unveil Your Destiny",
    description: "Unveil your destiny with the ancient wisdom of the cards. Professional tarot card divination and fortune telling platform.",
    siteName: "Mystic Tarot Reading",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mystic Tarot Reading - Unveil Your Destiny",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystic Tarot Reading - Unveil Your Destiny",
    description: "Unveil your destiny with the ancient wisdom of the cards. Professional tarot card divination and fortune telling platform.",
    images: ["/images/twitter-card.png"],
    creator: "@mystictarot",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "lifestyle",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
