'use client';

import { useTranslations } from 'next-intl';
import { TarotCard, SpreadType } from '@/lib/tarot';

interface ReadingGeneratorProps {
  cards: TarotCard[];
  spreadType: SpreadType;
  question: string;
}

export default function ReadingGenerator({ cards, spreadType, question }: ReadingGeneratorProps) {
  const t = useTranslations('tarot');
  const cardTranslations = useTranslations('cards');
  const cardMeanings = useTranslations('cardMeanings');

  const getCardMeaning = (card: TarotCard): string => {
    const meaningKey = card.isReversed ? 'reversed' : 'upright';
    return cardMeanings(`${card.name}.${meaningKey}`);
  };

  const generateReading = () => {
    switch (spreadType) {
      case 'past-present-future':
        return (
          <div className="space-y-4">
            <p><strong>{t('past')}:</strong> {cardTranslations(cards[0].name)} - {getCardMeaning(cards[0])}</p>
            <p><strong>{t('present')}:</strong> {cardTranslations(cards[1].name)} - {getCardMeaning(cards[1])}</p>
            <p><strong>{t('future')}:</strong> {cardTranslations(cards[2].name)} - {getCardMeaning(cards[2])}</p>
            <p className="mt-4 italic">{t('connectionMessage')}</p>
          </div>
        );

      case 'celtic-cross':
        return (
          <div className="space-y-4">
            <p>{t('celticIntro')}</p>
            <p className="mt-2">{t('centralCard')} {cardTranslations(cards[0].name)} - {getCardMeaning(cards[0])}.</p>
            <p>{t('crossingCard')} {cardTranslations(cards[1].name)} - {getCardMeaning(cards[1])}.</p>
            <p className="mt-4 italic">{t('complexReading')}</p>
          </div>
        );

      case 'three-cards':
        return (
          <div className="space-y-4">
            <p>{t('threeAspects')}</p>
            <ol className="list-decimal pl-6 mt-2 space-y-2">
              {cards.map((card, index) => (
                <li key={index}>
                  <strong>{cardTranslations(card.name)}:</strong> {getCardMeaning(card)}
                </li>
              ))}
            </ol>
            <p className="mt-4 italic">{t('considerInteraction')}</p>
          </div>
        );

      case 'single-card':
        return (
          <div className="space-y-4">
            <p>{t('singleMessage')} {cardTranslations(cards[0].name)}.</p>
            <p className="mt-2">{getCardMeaning(cards[0])}</p>
            <p className="mt-4 italic">{t('meditate')}</p>
          </div>
        );

      default:
        return <p>Reading not available</p>;
    }
  };

  return (
    <div className="bg-card p-4 md:p-6 rounded-lg fade-in border border-purple-700">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 text-high-contrast border-b border-purple-700 pb-2">
        {t('readingTitle')}
      </h3>
      <div className="text-medium-contrast space-y-4 text-sm md:text-base">
        {generateReading()}
      </div>
    </div>
  );
} 