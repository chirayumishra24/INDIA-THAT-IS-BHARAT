'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MEMORY_MATCH_PAIRS } from '@/data/activityGamesData';
import { OneOnOneScoreboard } from './OneOnOneScoreboard';
import { Sparkles, Trophy, RotateCcw, HelpCircle, CheckCircle2 } from 'lucide-react';

interface CardItem {
  id: string;
  pairKey: string;
  label: string;
  badge: string;
  type: 'term' | 'meaning';
}

interface NameMatchMemoryProps {
  onGameComplete?: (winner: 'p1' | 'p2' | 'tie', scores: { p1: number; p2: number }) => void;
}

export const NameMatchMemory: React.FC<NameMatchMemoryProps> = ({ onGameComplete }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairKeys, setMatchedPairKeys] = useState<string[]>([]);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize deck
  const initGame = () => {
    const deck: CardItem[] = [];
    MEMORY_MATCH_PAIRS.slice(0, 8).forEach((pair, idx) => {
      deck.push({
        id: `card-${pair.pairKey}-term`,
        pairKey: pair.pairKey,
        label: pair.term,
        badge: 'Ancient Term',
        type: 'term'
      });
      deck.push({
        id: `card-${pair.pairKey}-meaning`,
        pairKey: pair.pairKey,
        label: pair.meaning,
        badge: pair.badge,
        type: 'meaning'
      });
    });

    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairKeys([]);
    setActivePlayer(1);
    setScores({ p1: 0, p2: 0 });
    setIsProcessing(false);
    setIsGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      isProcessing ||
      flippedIndices.includes(index) ||
      matchedPairKeys.includes(cards[index].pairKey) ||
      isGameOver
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.pairKey === card2.pairKey) {
        // MATCH!
        setTimeout(() => {
          setMatchedPairKeys(prev => {
            const updated = [...prev, card1.pairKey];
            if (updated.length === 8) {
              // All pairs matched!
              setIsGameOver(true);
              confetti({ particleCount: 90, spread: 70 });
              const winner = scores.p1 > scores.p2 ? 'p1' : scores.p2 > scores.p1 ? 'p2' : 'tie';
              onGameComplete?.(winner, scores);
            }
            return updated;
          });

          setScores(prev => ({
            ...prev,
            [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + 50
          }));

          setFlippedIndices([]);
          setIsProcessing(false);
          // Player retains turn on successful match!
        }, 800);
      } else {
        // MISMATCH! Flip back and pass turn
        setTimeout(() => {
          setFlippedIndices([]);
          setActivePlayer(prev => (prev === 1 ? 2 : 1));
          setIsProcessing(false);
        }, 1200);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white/85 backdrop-blur-xl rounded-3xl border border-indigo-500/40 text-[#14213D] shadow-2xl">
      <OneOnOneScoreboard
        player1Score={scores.p1}
        player2Score={scores.p2}
        activePlayer={activePlayer}
      />

      {/* Header Info */}
      <div className="bg-amber-50/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-amber-200 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 text-xs font-black rounded-full border border-amber-300 uppercase">
              Activity 8 • 1v1 Memory Flip
            </span>
            <span className="text-xs text-gray-600 font-semibold">Match Ancient Terms with Sources</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            Ancient Scroll Memory Duel
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            Turn: <strong className={activePlayer === 1 ? 'text-indigo-800' : 'text-rose-800'}>Player {activePlayer}</strong> • Flip 2 cards to discover matching pairs. Matches grant an extra turn!
          </p>
        </div>

        <div className="px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900">
          Pairs Matched: {matchedPairKeys.length} / 8
        </div>
      </div>

      {/* 4x4 Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedPairKeys.includes(card.pairKey);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`aspect-[4/3] sm:aspect-square rounded-2xl p-3 sm:p-4 border-2 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between text-center relative ${
                isMatched
                  ? 'bg-emerald-950/40 border-emerald-500/60 opacity-50 cursor-default scale-95'
                  : isFlipped
                  ? 'bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-900 border-indigo-400 shadow-xl shadow-indigo-950 scale-105'
                  : 'bg-gradient-to-br from-gray-900 via-gray-850 to-black border-amber-500/30 hover:border-amber-400 hover:scale-[1.03] shadow-lg'
              }`}
            >
              {isFlipped || isMatched ? (
                <div className="flex flex-col justify-between h-full animate-fade-in">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 truncate block">
                    {card.badge}
                  </span>
                  <p className="text-xs sm:text-sm font-black text-white leading-snug my-auto">
                    {card.label}
                  </p>
                  <span className="text-[10px] text-gray-400">
                    {card.type === 'term' ? '📜 Ancient Term' : '💡 Historical Source'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    #{idx + 1}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-indigo-950/90 via-black to-rose-950/90 border-2 border-indigo-500/60 rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
          <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-white mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Claims Memory Triumph!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Claims Memory Triumph!'
              : 'Perfect Memory Parity! Outstanding Game!'}
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={initGame}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
