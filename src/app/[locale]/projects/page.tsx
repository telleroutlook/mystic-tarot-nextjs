'use client';

// Add Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Breadcrumb from '@/components/Breadcrumb';

const projects = [
  {
    id: 'idphoto',
    url: 'https://idphotographic.com/',
    icon: '📸',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'byteslim',
    url: 'https://byteslim.com/',
    icon: '🗜️',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    id: 'mdeditor',
    url: 'https://mdeditor.uk/',
    icon: '📝',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'mvking',
    url: 'https://mvking.com/',
    icon: '🎬',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'calculator',
    url: 'https://calculatetoday.com/',
    icon: '🧮',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'trustavo',
    url: 'https://trustavo.com/',
    icon: '📧',
    gradient: 'from-emerald-500 to-cyan-500'
  },
  {
    id: '3we',
    url: 'https://3we.org/',
    icon: '🔧',
    gradient: 'from-yellow-500 to-orange-500'
  }
];

export default function ProjectsPage() {
  const t = useTranslations('projects');
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
    { name: nav('projects'), href: `/${locale}/projects` }
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
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-300 crystal-text">
              {t('subtitle')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-card backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${project.gradient} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-purple-300">
                    {t(`items.${project.id}.name`)}
                  </h2>
                </div>
                
                <p className="text-slate-200 leading-relaxed text-lg mb-6">
                  {t(`items.${project.id}.description`)}
                </p>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium group-hover:scale-105"
                >
                  {t('visitSite')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
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
            <Link href={`/${locale}/contact`} className="hover:text-purple-400 transition-colors">
              {nav('contact')}
            </Link>
            <Link href={`/${locale}/projects`} className="hover:text-purple-400 transition-colors text-purple-400">
              {nav('projects')}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-purple-400 transition-colors">
              {nav('privacy')}
            </Link>
            <Link href={`/${locale}/faq`} className="hover:text-purple-400 transition-colors">
              {nav('faq')}
            </Link>
          </div>
          <p className="text-sm">© 2023 Mystic Tarot. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
} 