import React from 'react';
import { Player } from '../types';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`bg-slate-700 p-4 rounded-lg border-2 ${
            index === currentPlayerIndex ? 'border-yellow-400' : 'border-slate-600'
          }`}
        >
          <h3 className="text-lg font-bold mb-2">
            {player.name} {index === currentPlayerIndex && '(Your Turn)'}
          </h3>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-400">{player.score}</p>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((player.score / 100) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">{Math.max(0, 100 - player.score)} points to win</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
