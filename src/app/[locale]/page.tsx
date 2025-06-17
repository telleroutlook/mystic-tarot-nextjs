'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import TarotCard from '@/components/TarotCard';
import ReadingGenerator from '@/components/ReadingGenerator';
import CardMeanings from '@/components/CardMeanings';
import { TarotCard as TarotCardType, SpreadType, drawCards, getCardRotation } from '@/lib/tarot';

export default function HomePage() {
  const t = useTranslations('tarot');
  const spreadMessages = useTranslations('spreadMessages');
  const locale = useLocale();
  
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<TarotCardType[]>([]);
  const [ballMessage, setBallMessage] = useState('');
  const [showReading, setShowReading] = useState(false);
  const [showMeanings, setShowMeanings] = useState(false);

  // Update ball message when spread changes
  useEffect(() => {
    if (selectedSpread) {
      setBallMessage(spreadMessages(selectedSpread));
    } else {
      setBallMessage(t('ballMessage'));
    }
  }, [selectedSpread, spreadMessages, t]);

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

  const handleSpreadSelect = (spread: SpreadType) => {
    setSelectedSpread(spread);
    setShowReading(false);
    setShowMeanings(false);
    setDrawnCards([]);
  };

  const handleDrawCards = () => {
    if (!selectedSpread) {
      alert(t('noSpreadAlert'));
      return;
    }
    
    if (!question.trim()) {
      alert(t('noQuestionAlert'));
      return;
    }

    const cards = drawCards(selectedSpread);
    setDrawnCards(cards);
    setShowReading(true);
    setShowMeanings(true);
  };

  const spreadButtons = [
    { key: 'past-present-future', label: t('pastPresentFuture') },
    { key: 'celtic-cross', label: t('celticCross') },
    { key: 'three-cards', label: t('threeCards') },
    { key: 'single-card', label: t('singleCard') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-4 md:py-6 shadow-lg relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-high-contrast font-cinzel mb-2">
            {t('title')}
          </h1>
          <p className="text-medium-contrast italic text-sm md:text-base">
            {t('subtitle')}
          </p>
          
          <div className="absolute top-2 md:top-4 right-2 md:right-4">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          
          {/* Left Column - Crystal Ball & Controls */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            
            {/* Crystal Ball */}
            <div className="crystal-ball w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-purple-300 relative mb-6 md:mb-8 pulse">
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-white font-bold text-sm md:text-base crystal-text">
                {ballMessage || t('ballMessage')}
              </div>
            </div>
            
            {/* Controls */}
            <div className="bg-card p-4 md:p-6 rounded-lg w-full max-w-md border border-purple-700">
              
              {/* Question Input */}
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-high-contrast">
                {t('questionTitle')}
              </h3>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-purple-800 bg-opacity-50 border border-purple-600 rounded p-3 text-high-contrast placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base" 
                rows={4}
                placeholder={t('questionPlaceholder')}
              />
              
              {/* Spread Selection */}
              <div className="mt-4 md:mt-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-high-contrast">
                  {t('spreadTitle')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {spreadButtons.map((spread) => (
                    <button
                      key={spread.key}
                      onClick={() => handleSpreadSelect(spread.key as SpreadType)}
                      className={`btn-secondary py-2 px-3 md:px-4 rounded transition text-sm md:text-base ${
                        selectedSpread === spread.key ? 'selected ring-2 ring-purple-400' : ''
                      }`}
                    >
                      {spread.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Draw Cards Button */}
              <button 
                onClick={handleDrawCards}
                className="mt-6 md:mt-8 w-full btn-primary font-bold py-3 px-4 rounded-full shadow-lg transition transform hover:scale-105 glow text-sm md:text-base"
              >
                <span className="mr-2">✨</span> 
                {t('drawButton')}
              </button>
            </div>
          </div>
          
          {/* Right Column - Card Spread & Reading */}
          <div className="w-full lg:w-2/3">
            
            {/* Card Reading Area */}
            <div className="min-h-64 md:min-h-96 bg-card-light border-2 border-purple-800 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center">
              
              {/* Card Spread */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 card-spread">
                {drawnCards.length > 0 ? (
                  drawnCards.map((card, index) => (
                    <TarotCard
                      key={index}
                      card={card}
                      index={index}
                      rotation={getCardRotation()}
                    />
                  ))
                ) : (
                  <div className="text-center text-medium-contrast italic">
                    <div className="text-4xl md:text-5xl mb-2 opacity-50">🃏</div>
                    <p className="text-sm md:text-base">{t('selectSpreadMessage')}</p>
                  </div>
                )}
              </div>
              
              {/* Reading Result */}
              {showReading && drawnCards.length > 0 && selectedSpread && (
                <div className="mt-6 md:mt-8 w-full max-w-2xl">
                  <ReadingGenerator 
                    cards={drawnCards}
                    spreadType={selectedSpread}
                    question={question}
                  />
                </div>
              )}
            </div>
            
            {/* Card Meanings */}
            {showMeanings && drawnCards.length > 0 && (
              <div className="mt-6 md:mt-8">
                <CardMeanings cards={drawnCards} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-4 md:py-6 text-center text-medium-contrast border-t border-purple-800">
        <p className="text-sm md:text-base">{t('copyright')}</p>
        <p className="text-xs md:text-sm mt-2">{t('disclaimer')}</p>
      </footer>
    </div>
  );
} 