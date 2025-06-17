'use client';

// Add Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import TarotCard from '@/components/TarotCard';
import ReadingGenerator from '@/components/ReadingGenerator';
import CardMeanings from '@/components/CardMeanings';
import Breadcrumb from '@/components/Breadcrumb';
import { TarotCard as TarotCardType, SpreadType, drawCards, getCardRotation } from '@/lib/tarot';

// 定义状态接口
interface ReadingState {
  selectedSpread: SpreadType | null;
  question: string;
  drawnCards: TarotCardType[];
  showReading: boolean;
  showMeanings: boolean;
}

// 定义持久化配置接口
interface PersistentConfig {
  locale: string;
  selectedSpread: SpreadType | null;
}

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
  const [isLoaded, setIsLoaded] = useState(false);

  // 从localStorage恢复状态
  useEffect(() => {
    try {
      // 检查是否为语言切换（通过检查时间戳标记）
      const languageSwitchTimestamp = localStorage.getItem('tarot-language-switch-timestamp');
      const now = Date.now();
      const isRecentLanguageSwitch = languageSwitchTimestamp && 
        (now - parseInt(languageSwitchTimestamp)) < 2000; // 2秒内的操作视为语言切换
      
      if (isRecentLanguageSwitch) {
        // 语言切换：恢复完整状态
        console.log('Language switch detected - loading full state');
        
        const savedState = localStorage.getItem('tarot-current-state');
        console.log(`Loading current state:`, savedState);
        if (savedState) {
          const state: ReadingState = JSON.parse(savedState);
          console.log(`Parsed state:`, state);
          setSelectedSpread(state.selectedSpread);
          setQuestion(state.question || '');
          setDrawnCards(state.drawnCards || []);
          setShowReading(state.showReading || false);
          setShowMeanings(state.showMeanings || false);
        }
      } else {
        // 页面刷新：只恢复语言设置和Spread Type
        console.log('Page refresh detected - loading minimal state');
        
        const savedConfig = localStorage.getItem('tarot-persistent-config');
        if (savedConfig) {
          const config: PersistentConfig = JSON.parse(savedConfig);
          if (config.selectedSpread) {
            setSelectedSpread(config.selectedSpread);
          }
        }
        
        // 清空其他状态
        setQuestion('');
        setDrawnCards([]);
        setShowReading(false);
        setShowMeanings(false);
      }
    } catch (error) {
      console.error('Error loading reading state:', error);
    }
    
    setIsLoaded(true);
  }, [locale]);

  // 保存持久化配置（语言和spread type）
  const savePersistentConfig = () => {
    try {
      const config: PersistentConfig = {
        locale,
        selectedSpread
      };
      localStorage.setItem('tarot-persistent-config', JSON.stringify(config));
    } catch (error) {
      console.error('Error saving persistent config:', error);
    }
  };

  // 保存当前完整状态
  const saveCurrentState = useCallback(() => {
    try {
      const state: ReadingState = {
        selectedSpread,
        question,
        drawnCards,
        showReading,
        showMeanings
      };
      console.log(`Saving current state:`, state);
      localStorage.setItem('tarot-current-state', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving current state:', error);
    }
  }, [selectedSpread, question, drawnCards, showReading, showMeanings]);

  // 在全局暴露保存函数，供语言切换时调用
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).saveTarotState = saveCurrentState;
    }
  }, [saveCurrentState]);

  // 监听状态变化，保存当前状态
  useEffect(() => {
    if (isLoaded) {
      saveCurrentState();
    }
  }, [selectedSpread, question, drawnCards, showReading, showMeanings, isLoaded]);

  // 监听spread变化，保存持久化配置
  useEffect(() => {
    if (isLoaded) {
      savePersistentConfig();
    }
  }, [selectedSpread, isLoaded]);

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

  const handleQuestionChange = (newQuestion: string) => {
    setQuestion(newQuestion);
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

  // 等待状态加载完成再渲染
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">{t('loading')}</div>
      </div>
    );
  }

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

      {/* Breadcrumb Navigation */}
      <nav className="bg-purple-800 bg-opacity-30 py-2">
        <div className="container mx-auto px-4">
          <Breadcrumb />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-2 md:px-4 py-4 md:py-8" role="main">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          
          {/* Left Column - Crystal Ball & Controls */}
          <aside className="w-full lg:w-1/3 flex flex-col items-center" role="complementary" aria-label="Tarot Reading Controls">
            
            {/* Crystal Ball */}
            <div 
              className="crystal-ball w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-purple-300 relative mb-6 md:mb-8 pulse"
              role="img"
              aria-label="Crystal ball displaying mystical message"
            >
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-white font-bold text-sm md:text-base crystal-text">
                {ballMessage || t('ballMessage')}
              </div>
            </div>
            
            {/* Controls */}
            <section className="bg-card p-4 md:p-6 rounded-lg w-full max-w-md border border-purple-700" aria-labelledby="tarot-controls">
              
              {/* Question Input */}
              <h2 id="tarot-controls" className="text-lg md:text-xl font-semibold mb-4 text-high-contrast">
                {t('questionTitle')}
              </h2>
              <label htmlFor="question-input" className="sr-only">
                Enter your question for the tarot reading
              </label>
              <textarea 
                id="question-input"
                value={question}
                onChange={(e) => handleQuestionChange(e.target.value)}
                className="w-full bg-purple-800 bg-opacity-50 border border-purple-600 rounded p-3 text-high-contrast placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base" 
                rows={4}
                placeholder={t('questionPlaceholder')}
                aria-describedby="question-help"
              />
              <div id="question-help" className="sr-only">
                Enter a specific question you would like the tarot cards to provide guidance on
              </div>
              
              {/* Spread Selection */}
              <fieldset className="mt-4 md:mt-6">
                <legend className="text-lg md:text-xl font-semibold mb-4 text-high-contrast">
                  {t('spreadTitle')}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" role="radiogroup" aria-labelledby="spread-selection">
                  {spreadButtons.map((spread) => (
                    <button
                      key={spread.key}
                      onClick={() => handleSpreadSelect(spread.key as SpreadType)}
                      className={`btn-secondary py-2 px-3 md:px-4 rounded transition text-sm md:text-base ${
                        selectedSpread === spread.key ? 'selected ring-2 ring-purple-400' : ''
                      }`}
                      role="radio"
                      aria-checked={selectedSpread === spread.key}
                      aria-describedby={`${spread.key}-description`}
                    >
                      {spread.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              
              {/* Draw Cards Button */}
              <button 
                onClick={handleDrawCards}
                className="mt-6 md:mt-8 w-full btn-primary font-bold py-3 px-4 rounded-full shadow-lg transition transform hover:scale-105 glow text-sm md:text-base"
                aria-describedby="draw-cards-help"
              >
                <span className="mr-2" aria-hidden="true">✨</span> 
                {t('drawButton')}
              </button>
              <div id="draw-cards-help" className="sr-only">
                Click to draw tarot cards based on your selected spread and question
              </div>
            </section>
          </aside>
          
          {/* Right Column - Card Spread & Reading */}
          <section className="w-full lg:w-2/3" aria-labelledby="reading-area">
            
            {/* Card Reading Area */}
            <div 
              className="min-h-64 md:min-h-96 bg-card-light border-2 border-purple-800 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center"
              role="region"
              aria-labelledby="card-spread-heading"
              aria-live="polite"
            >
              <h2 id="card-spread-heading" className="sr-only">
                {drawnCards.length > 0 ? 'Your Tarot Card Reading' : 'Tarot Card Reading Area'}
              </h2>
              
              {/* Card Spread */}
              <div 
                className="flex flex-wrap justify-center gap-3 md:gap-6 card-spread"
                role="group"
                aria-label={drawnCards.length > 0 ? `${drawnCards.length} tarot cards drawn` : 'No cards drawn yet'}
              >
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
                  <div className="text-center text-medium-contrast italic" role="status" aria-label="Waiting for card selection">
                    <div className="text-4xl md:text-5xl mb-2 opacity-50" aria-hidden="true">🃏</div>
                    <p className="text-sm md:text-base">{t('selectSpreadMessage')}</p>
                  </div>
                )}
              </div>
              
              {/* Reading Result */}
              {showReading && drawnCards.length > 0 && selectedSpread && (
                <section className="mt-6 md:mt-8 w-full max-w-2xl" aria-labelledby="reading-interpretation">
                  <h3 id="reading-interpretation" className="sr-only">
                    Tarot Card Reading Interpretation
                  </h3>
                  <ReadingGenerator 
                    cards={drawnCards}
                    spreadType={selectedSpread}
                    question={question}
                  />
                </section>
              )}
            </div>
            
            {/* Card Meanings */}
            {showMeanings && drawnCards.length > 0 && (
              <section className="mt-6 md:mt-8" aria-labelledby="card-meanings-heading">
                <h3 id="card-meanings-heading" className="sr-only">
                  Individual Card Meanings
                </h3>
                <CardMeanings cards={drawnCards} />
              </section>
            )}
          </section>
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