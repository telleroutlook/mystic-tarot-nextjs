// Tarot card data and utilities

export interface TarotCard {
  name: string;
  symbol: string;
  isReversed?: boolean;
}

export type SpreadType = 'past-present-future' | 'celtic-cross' | 'three-cards' | 'single-card';

export const TAROT_DECK: TarotCard[] = [
  { name: "The Fool", symbol: "🃏" },
  { name: "The Magician", symbol: "🎩" },
  { name: "The High Priestess", symbol: "🌙" },
  { name: "The Empress", symbol: "👑" },
  { name: "The Emperor", symbol: "🏛" },
  { name: "The Hierophant", symbol: "⛪" },
  { name: "The Lovers", symbol: "💑" },
  { name: "The Chariot", symbol: "🏎" },
  { name: "Strength", symbol: "💪" },
  { name: "The Hermit", symbol: "🧙" },
  { name: "Wheel of Fortune", symbol: "🎡" },
  { name: "Justice", symbol: "⚖" },
  { name: "The Hanged Man", symbol: "🙃" },
  { name: "Death", symbol: "💀" },
  { name: "Temperance", symbol: "⚗" },
  { name: "The Devil", symbol: "😈" },
  { name: "The Tower", symbol: "🏰" },
  { name: "The Star", symbol: "🌟" },
  { name: "The Moon", symbol: "🌕" },
  { name: "The Sun", symbol: "☀" },
  { name: "Judgement", symbol: "📯" },
  { name: "The World", symbol: "🌍" }
];

export function shuffleDeck(): TarotCard[] {
  return [...TAROT_DECK].sort(() => 0.5 - Math.random());
}

export function drawCards(spreadType: SpreadType): TarotCard[] {
  const numCards = getNumCardsForSpread(spreadType);
  const shuffled = shuffleDeck();
  const drawn = shuffled.slice(0, numCards);
  
  // Add random reversed state
  return drawn.map(card => ({
    ...card,
    isReversed: Math.random() > 0.5
  }));
}

export function getNumCardsForSpread(spreadType: SpreadType): number {
  switch (spreadType) {
    case 'past-present-future':
    case 'three-cards':
      return 3;
    case 'celtic-cross':
      return 10;
    case 'single-card':
      return 1;
    default:
      return 3;
  }
}

export function getCardRotation(): number {
  return (Math.random() * 10) - 5; // Random rotation between -5 and 5 degrees
} 