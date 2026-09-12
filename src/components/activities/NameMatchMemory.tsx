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
    <div className="w-full text-[#14213D] space-y-2 sm:space-y-3">
      <OneOnOneScoreboard
        player1Score={scores.p1}
        player2Score={scores.p2}
        activePlayer={activePlayer}
      />

      {/* Header Info */}
      <div className="bg-amber-50/80 backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-amber-200 mb-2 sm:mb-3 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-200 text-amber-950 text-[10px] sm:text-xs font-black rounded-full border border-amber-300 uppercase">
              Activity 8 • 1v1 Memory Flip
            </span>
            <span className="text-[11px] sm:text-xs text-gray-600 font-semibold">Match Ancient Terms with Sources</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <h2 className="text-sm sm:text-base 2xl:text-lg font-black text-amber-950">
              Ancient Scroll Memory Duel
            </h2>
            <span className="text-xs text-gray-600 hidden sm:inline">•</span>
            <p className="text-[11px] sm:text-xs text-gray-700 font-medium">
              Turn: <strong className={activePlayer === 1 ? 'text-indigo-800' : 'text-rose-800'}>Player {activePlayer}</strong> • Matches grant an extra turn!
            </p>
          </div>
        </div>

        <div className="px-2.5 py-1 bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-900">
          Pairs Matched: {matchedPairKeys.length} / 8
        </div>
      </div>

      {/* 8x2 Grid of Cards (Fits on screen without scrolling) */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5 mb-3">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedPairKeys.includes(card.pairKey);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-24 sm:h-28 lg:h-32 2xl:h-40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border-2 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between text-center relative ${
                isMatched
                  ? 'bg-emerald-100 border-emerald-600 opacity-90 cursor-default scale-95 shadow-sm'
                  : isFlipped
                  ? 'bg-indigo-50 border-indigo-600 shadow-xl scale-105'
                  : 'bg-white border-amber-400 hover:border-amber-600 hover:scale-[1.03] shadow-md'
              }`}
            >
              {isFlipped || isMatched ? (
                <div className="flex flex-col justify-between h-full animate-fade-in overflow-hidden">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-900 truncate block">
                    {card.badge}
                  </span>
                  <p className="text-[11px] sm:text-xs lg:text-sm font-black text-black leading-tight my-auto line-clamp-3">
                    {card.label}
                  </p>
                  <span className="text-[8px] sm:text-[9px] 2xl:text-[10px] text-gray-700 font-bold truncate block">
                    {card.type === 'term' ? '📜 Term' : '💡 Source'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-9 2xl:h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-1">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-black uppercase tracking-widest font-mono">
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
        <div className="bg-white border-4 border-indigo-500 rounded-3xl p-8 text-center shadow-2xl animate-fade-in text-black">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-black mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Claims Memory Triumph!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Claims Memory Triumph!'
              : 'Perfect Memory Parity! Outstanding Game!'}
          </h2>
          <p className="text-base font-bold text-gray-700 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={initGame}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
