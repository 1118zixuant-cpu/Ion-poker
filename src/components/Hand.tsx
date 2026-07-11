import React from 'react';
import { Card } from '../types';
import CardComponent from './Card';

interface HandProps {
  hand: Card[];
  selectedCards: Card[];
  onSelectCard: (card: Card) => void;
  onSubmit: () => void;
  onSkip: () => void;
}

const Hand: React.FC<HandProps> = ({
  hand,
  selectedCards,
  onSelectCard,
  onSubmit,
  onSkip,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-700 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Your Hand ({hand.length} cards)</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {hand.map(card => (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="cursor-pointer"
            >
              <CardComponent
                card={card}
                selected={selectedCards.some(c => c.id === card.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onSubmit}
          disabled={selectedCards.length < 2}
          className="bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded transition"
        >
          Submit Compound ({selectedCards.length} cards)
        </button>
        <button
          onClick={onSkip}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition"
        >
          Skip Turn
        </button>
      </div>
    </div>
  );
};

export default Hand;
