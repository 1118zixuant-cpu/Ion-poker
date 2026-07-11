import React, { useState, useEffect } from 'react'
import { GameState, Player, Card } from './types'
import { createDeck, shuffleDeck } from './gameLogic'
import GameBoard from './components/GameBoard'
import StartScreen from './components/StartScreen'

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startGame = () => {
    const deck = createDeck();
    
    const player: Player = {
      id: 'player-1',
      name: 'You',
      hand: [],
      score: 0,
      isAI: false,
    };

    const ai: Player = {
      id: 'ai-1',
      name: 'AI Opponent',
      hand: [],
      score: 0,
      isAI: true,
    };

    const newDeck = [...deck];
    for (let i = 0; i < 5; i++) {
      player.hand.push(newDeck.pop()!);
      ai.hand.push(newDeck.pop()!);
    }

    const initialState: GameState = {
      players: [player, ai],
      currentPlayerIndex: 0,
      deck: newDeck,
      discardPile: [],
      selectedCards: [],
      gameStatus: 'playing',
      message: 'Your turn! Select cards to form a neutral compound.',
      incorrectAttempts: 0,
    };

    setGameState(initialState);
  };

  const resetGame = () => {
    setGameState(null);
  };

  if (!gameState) {
    return <StartScreen onStart={startGame} />;
  }

  return <GameBoard gameState={gameState} setGameState={setGameState} onReset={resetGame} />;
};

export default App;
