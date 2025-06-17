'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TarotCard as TarotCardType } from '@/lib/tarot';

interface TarotCardProps {
  card: TarotCardType;
  index: number;
  rotation?: number;
  onFlip?: (index: number) => void;
}

export default function TarotCard({ card, index, rotation = 0, onFlip }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const t = useTranslations('tarot');
  const cards = useTranslations('cards');

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onFlip?.(index);
  };

  return (
    <div 
      className="tarot-card cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg)`;
      }}
    >
      <div className={`tarot-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Card Back */}
        <div className="tarot-card-back flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center mb-4">
            <i className="fas fa-star text-purple-300 text-2xl"></i>
          </div>
          <span className="text-purple-300 text-sm">{t('title')}</span>
        </div>
        
        {/* Card Front */}
        <div className="tarot-card-front flex flex-col items-center justify-center p-4 text-center">
          <div className="text-5xl mb-4">{card.symbol}</div>
          <h3 className="font-bold text-lg">{cards(card.name)}</h3>
          <div className="absolute bottom-2 right-2 text-xs">
            {card.isReversed ? t('reversed') : t('upright')}
          </div>
        </div>
      </div>
    </div>
  );
} 