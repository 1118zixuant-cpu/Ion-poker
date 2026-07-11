import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-blue-400">⚛️ Ion Poker</h1>
        
        <div className="max-w-2xl space-y-4 text-lg text-slate-300">
          <p>A strategic card game combining chemistry and poker!</p>
          <p>Form neutral ionic compounds to score points.</p>
        </div>

        <div className="bg-slate-700 p-8 rounded-lg max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">How to Play:</h2>
          <ul className="text-left space-y-2 text-slate-200">
            <li>• Select a <span className="text-red-400 font-bold">cation (positive)</span> and <span className="text-blue-400 font-bold">anion (negative)</span></li>
            <li>• Form a <span className="text-green-400 font-bold">neutral compound</span> (total charge = 0)</li>
            <li>• Score 10 points per compound (30 with 3x modifier)</li>
            <li>• First to 100 points wins!</li>
            <li>• 3 wrong attempts = game over</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-2xl transition"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
