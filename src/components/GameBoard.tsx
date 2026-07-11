import React, { useState, useEffect } from 'react';
import { GameState, Card, Compound } from '../types';
import { isNeutralCompound, calculateScore, getCompoundFormula } from '../gameLogic';
import Hand from './Hand';
import Table from './Table';
import ScoreBoard from './ScoreBoard';

interface GameBoardProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  onReset: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, setGameState, onReset }) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const toggleCard = (card: Card) => {
    setSelectedCards(prev =>
      prev.find(c => c.id === card.id)
        ? prev.filter(c => c.id !== card.id)
        : [...prev, card]
    );
  };

  const submitCompound = () => {
    const cation = selectedCards.find(c => c.type === 'cation');
    const anion = selectedCards.find(c => c.type === 'anion');
    const modifier = selectedCards.find(c => c.type === 'modifier');

    if (!cation || !anion) {
      setGameState({
        ...gameState,
        message: 'Select at least one cation and one anion!',
      });
      return;
    }

    const compound: Compound = { cation, anion, modifier };

    if (!isNeutralCompound(compound)) {
      setGameState({
        ...gameState,
        incorrectAttempts: gameState.incorrectAttempts + 1,
        message: `Wrong! Total charge: ${compound.cation.charge + compound.anion.charge}. Try again!`,
      });

      if (gameState.incorrectAttempts + 1 >= 3) {
        setGameState({
          ...gameState,
          gameStatus: 'gameOver',
          incorrectAttempts: gameState.incorrectAttempts + 1,
          message: 'Game Over! You reached 3 incorrect attempts.',
        });
      }

      setSelectedCards([]);
      return;
    }

    const points = calculateScore(compound);
    const newPlayers = [...gameState.players];
    newPlayers[gameState.currentPlayerIndex].score += points;

    newPlayers[gameState.currentPlayerIndex].hand = newPlayers[
      gameState.currentPlayerIndex
    ].hand.filter(c => !selectedCards.find(sc => sc.id === c.id));

    const cardsToDrawCount = selectedCards.length;
    const newDeck = [...gameState.deck];
    for (let i = 0; i < cardsToDrawCount; i++) {
      if (newDeck.length > 0) {
        newPlayers[gameState.currentPlayerIndex].hand.push(newDeck.pop()!);
      }
    }

    const formula = getCompoundFormula(compound);
    const winnerIndex = newPlayers.findIndex(p => p.score >= 100);

    if (winnerIndex !== -1) {
      setGameState({
        ...gameState,
        players: newPlayers,
        deck: newDeck,
        gameStatus: 'gameOver',
        message: `${newPlayers[winnerIndex].name} wins with ${newPlayers[winnerIndex].score} points! 🎉`,
      });
    } else {
      setGameState({
        ...gameState,
        players: newPlayers,
        deck: newDeck,
        currentPlayerIndex: 1 - gameState.currentPlayerIndex,
        message: `Correct! Formed ${formula}. +${points} points!`,
        discardPile: [...gameState.discardPile, ...selectedCards],
      });
    }

    setSelectedCards([]);
  };

  const skipTurn = () => {
    setGameState({
      ...gameState,
      currentPlayerIndex: 1 - gameState.currentPlayerIndex,
      message: `${currentPlayer.name} skipped their turn.`,
    });
    setSelectedCards([]);
  };

  const isPlayerTurn = !currentPlayer.isAI;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-400">⚛️ Ion Poker</h1>
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Back to Menu
        </button>
      </div>

      <ScoreBoard players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} />

      <div className="bg-slate-700 p-4 rounded-lg text-center">
        <p className="text-xl font-semibold">{gameState.message}</p>
        <p className="text-sm text-slate-400 mt-2">
          Incorrect attempts: {gameState.incorrectAttempts}/3
        </p>
      </div>

      <Table selectedCards={selectedCards} />

      {isPlayerTurn && gameState.gameStatus === 'playing' && (
        <Hand
          hand={currentPlayer.hand}
          selectedCards={selectedCards}
          onSelectCard={toggleCard}
          onSubmit={submitCompound}
          onSkip={skipTurn}
        />
      )}

      {gameState.gameStatus === 'gameOver' && (
        <div className="text-center">
          <button
            onClick={onReset}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition"
          >
            Play Again
          </button>
        </div>
      )}

      {!isPlayerTurn && gameState.gameStatus === 'playing' && (
        <div className="text-center text-slate-400 animate-pulse">
          <p>AI is thinking...</p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
