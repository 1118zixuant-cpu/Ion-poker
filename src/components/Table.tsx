import React from 'react';
import { Card } from '../types';
import CardComponent from './Card';

interface TableProps {
  selectedCards: Card[];
}

const Table: React.FC<TableProps> = ({ selectedCards }) => {
  const cation = selectedCards.find(c => c.type === 'cation');
  const anion = selectedCards.find(c => c.type === 'anion');
  const modifier = selectedCards.find(c => c.type === 'modifier');

  const totalCharge = (cation?.charge || 0) + (anion?.charge || 0);
  const isNeutral = totalCharge === 0;
  const chargeColor = isNeutral ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-slate-700 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Compound Formation Area</h2>

      <div className="flex justify-center items-end gap-8 mb-6 min-h-40">
        {cation && <CardComponent card={cation} />}
        {anion && <CardComponent card={anion} />}
        {modifier && <CardComponent card={modifier} />}
      </div>

      {selectedCards.length > 0 && (
        <div className="text-center space-y-2">
          <p className={`text-2xl font-bold ${chargeColor}`}>
            Total Charge: {totalCharge > 0 ? '+' : ''}{totalCharge}
          </p>
          {isNeutral && (
            <p className="text-green-400 font-semibold">✓ Neutral compound - Valid!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
