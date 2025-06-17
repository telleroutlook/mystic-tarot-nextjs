'use client';

import { useTranslations } from 'next-intl';
import { TarotCard } from '@/lib/tarot';

interface CardMeaningsProps {
  cards: TarotCard[];
}

export default function CardMeanings({ cards }: CardMeaningsProps) {
  const t = useTranslations('tarot');
  const cardTranslations = useTranslations('cards');
  const cardMeanings = useTranslations('cardMeanings');

  if (!cards.length) return null;

  return (
    <div className="bg-card p-4 md:p-6 rounded-lg fade-in border border-purple-700">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-high-contrast border-b border-purple-700 pb-2">
        {t('meaningsTitle')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-purple-800 bg-opacity-30 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-purple-200 mb-2">
              {cardTranslations(card.name)}
            </h4>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold text-purple-300">{t('upright')}:</span>{' '}
                {cardMeanings(`${card.name}.upright`)}
              </p>
              <p className="text-sm">
                <span className="font-semibold text-purple-300">{t('reversed')}:</span>{' '}
                {cardMeanings(`${card.name}.reversed`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 