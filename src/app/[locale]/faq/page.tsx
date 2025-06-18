'use client';

// Add Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Breadcrumb from '@/components/Breadcrumb';

export default function FAQPage() {
  const t = useTranslations('faq');
  const nav = useTranslations('navigation');
  const common = useTranslations('common');
  const locale = useLocale();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
    { name: nav('faq'), href: `/${locale}/faq` }
  ];

  const faqItems = [
    {
      question: t('questions.howItWorks'),
      answer: t('answers.howItWorks'),
      icon: '🔮'
    },
    {
      question: t('questions.accuracy'),
      answer: t('answers.accuracy'),
      icon: '⚖️'
    },
    {
      question: t('questions.multiple'),
      answer: t('answers.multiple'),
      icon: '🔄'
    },
    {
      question: t('questions.languages'),
      answer: t('answers.languages'),
      icon: '🌐'
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-300 crystal-text">
              {t('subtitle')}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-card backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-800/20 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-4">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-purple-300">
                      {item.question}
                    </h3>
                  </div>
                  <div className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pl-18">
                    <p className="text-slate-200 leading-relaxed text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Section */}
          <div className="text-center mt-12 mb-8">
            <div className="flex justify-center space-x-8 text-4xl opacity-60 mb-6">
              <span className="animate-pulse">✨</span>
              <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>🔮</span>
              <span className="animate-pulse" style={{ animationDelay: '1s' }}>🌟</span>
              <span className="animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">🎴</span>
              {common('startReading')}
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
            <Link href={`/${locale}/contact`} className="hover:text-purple-400 transition-colors">
              {nav('contact')}
            </Link>
            <Link href={`/${locale}/projects`} className="hover:text-purple-400 transition-colors">
              {nav('projects')}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-purple-400 transition-colors">
              {nav('privacy')}
            </Link>
            <Link href={`/${locale}/faq`} className="hover:text-purple-400 transition-colors text-purple-400">
              {nav('faq')}
            </Link>
          </div>
          <p className="text-sm">© 2023 Mystic Tarot. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 