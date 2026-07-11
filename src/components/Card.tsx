import React from 'react';
import { Card } from '../types';

interface CardComponentProps {
  card: Card;
  selected?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, selected = false }) => {
  const getCardColor = () => {
    switch (card.type) {
      case 'cation':
        return 'bg-red-500 border-red-600';
      case 'anion':
        return 'bg-blue-500 border-blue-600';
      case 'modifier':
        return 'bg-purple-500 border-purple-600';
    }
  };

  const getChargeColor = () => {
    if (card.charge > 0) return 'text-red-300';
    if (card.charge < 0) return 'text-blue-300';
    return 'text-purple-300';
  };

  return (
    <div
      className={`
        w-24 h-32 rounded-lg border-2 flex flex-col items-center justify-center
        transition transform
        ${getCardColor()}
        ${selected ? 'ring-4 ring-yellow-300 scale-110 shadow-lg' : 'shadow'}
        hover:scale-105 cursor-pointer
      `}
    >
      <div className="text-sm font-bold text-slate-700 uppercase">{card.type}</div>
      <div className="text-3xl font-bold text-white my-2">{card.symbol}</div>
      <div className={`text-sm font-semibold ${getChargeColor()}`}>
        {card.charge > 0 ? '+' : ''}{card.charge}
      </div>
      <div className="text-xs text-slate-100 mt-1 text-center px-1">{card.name}</div>
    </div>
  );
};

export default CardComponent;
