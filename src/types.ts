export type CardType = 'cation' | 'anion' | 'modifier';

export interface Card {
  id: string;
  type: CardType;
  symbol: string;
  charge: number;
  name: string;
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  score: number;
  isAI: boolean;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  deck: Card[];
  discardPile: Card[];
  selectedCards: Card[];
  gameStatus: 'playing' | 'gameOver' | 'setup';
  message: string;
  incorrectAttempts: number;
}

export interface Compound {
  cation: Card;
  anion: Card;
  modifier?: Card;
}
