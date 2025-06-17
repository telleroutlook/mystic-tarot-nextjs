'use client';

// Add Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Breadcrumb from '@/components/Breadcrumb';

export default function ContactPage() {
  const t = useTranslations('contact');
  const nav = useTranslations('navigation');
  const common = useTranslations('common');
  const locale = useLocale();

  // Apply language-specific styling
  useEffect(() => {
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    document.body.classList.add(`lang-${locale}`);
    
    if (locale === 'ar') {
      document.body.classList.add('dir-rtl');
      document.body.classList.remove('dir-ltr');
    } else {
      document.body.classList.add('dir-ltr');
      document.body.classList.remove('dir-rtl');
    }
  }, [locale]);

  const breadcrumbItems = [
    { name: nav('contact'), href: `/${locale}/contact` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href={`/${locale}`} className="text-2xl font-bold text-purple-300 hover:text-purple-200 transition-colors">
            ✨ Mystic Tarot
          </Link>
          <LanguageSwitcher />
        </div>

        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-300 crystal-text">
              {t('subtitle')}
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            {/* Crystal Ball Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full crystal-ball flex items-center justify-center text-4xl pulse">
                💌
              </div>
            </div>

            {/* Description */}
            <div className="text-center mb-8">
              <p className="text-slate-200 leading-relaxed text-lg">
                {t('description')}
              </p>
            </div>

            {/* Email Section */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 backdrop-blur-sm border border-purple-400/30">
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                  <span className="text-xl">📧</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-300">
                  {t('email')}
                </h3>
              </div>
              
              <div className="text-center">
                <a 
                  href={`mailto:${t('emailAddress')}`}
                  className="inline-block text-2xl font-mono text-blue-300 hover:text-blue-200 transition-colors duration-300 bg-slate-800/50 px-6 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400/50"
                >
                  {t('emailAddress')}
                </a>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center space-x-8 mt-8 text-4xl opacity-60">
              <span className="animate-pulse">✨</span>
              <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>🔮</span>
              <span className="animate-pulse" style={{ animationDelay: '1s' }}>🌟</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">🎴</span>
              {common('backToReading')}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-400">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href={`/${locale}`} className="hover:text-purple-400 transition-colors">
              {nav('home')}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-purple-400 transition-colors">
              {nav('about')}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-purple-400 transition-colors text-purple-400">
              {nav('contact')}
            </Link>
          </div>
          <p className="text-sm">© 2023 Mystic Tarot. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 