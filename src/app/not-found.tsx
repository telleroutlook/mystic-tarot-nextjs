import type { Metadata } from 'next';
import Link from 'next/link';

// Add Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Page Not Found | Mystic Tarot Reading',
  description: 'The page you are looking for could not be found. Return to our tarot reading platform and explore the mystical world of tarot cards.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Visual */}
          <div className="text-8xl md:text-9xl font-bold text-purple-300 opacity-50 mb-4">
            404
          </div>
          
          {/* Crystal Ball Icon */}
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full border-4 border-purple-300 bg-gradient-to-br from-purple-400 to-blue-500 opacity-70 flex items-center justify-center">
            <span className="text-2xl md:text-3xl">🔮</span>
          </div>
          
          {/* Error Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-purple-200 mb-8 text-sm md:text-base">
            The mystical energies have led you astray. The page you seek does not exist in this realm.
          </p>
          
          {/* Navigation Links */}
          <div className="space-y-4">
            <Link
              href="/en"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 shadow-lg"
            >
              Return to Tarot Reading
            </Link>
            
            <div className="text-sm text-purple-300">
              <p>Or explore other languages:</p>
              <div className="flex justify-center space-x-4 mt-2">
                <Link href="/zh" className="hover:text-white transition-colors">中文</Link>
                <Link href="/fr" className="hover:text-white transition-colors">Français</Link>
                <Link href="/ar" className="hover:text-white transition-colors">العربية</Link>
                <Link href="/hi" className="hover:text-white transition-colors">हिन्दी</Link>
              </div>
            </div>
          </div>
          
          {/* Additional SEO Content */}
          <div className="mt-12 text-xs text-purple-400 max-w-sm mx-auto">
            <p>
              If you believe this page should exist, please check the URL for typos or 
              return to our homepage to start your tarot journey.
            </p>
          </div>
        </div>
        
        {/* Structured Data for 404 Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: '404 - Page Not Found',
              description: 'The requested page could not be found.',
              url: typeof window !== 'undefined' ? window.location.href : '',
              isPartOf: {
                '@type': 'WebSite',
                name: 'Mystic Tarot Reading',
                url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
              }
            })
          }}
        />
      </body>
    </html>
  );
} 