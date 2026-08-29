'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RIVER_FLOW_CONNECTIONS, RiverFlowConnection } from '@/data/activityGamesData';
import { OneOnOneScoreboard } from './OneOnOneScoreboard';
import { Waves, Sparkles, CheckCircle2, ArrowRight, Trophy } from 'lucide-react';

interface RiverToNameFlowProps {
  onGameComplete?: (winner: 'p1' | 'p2' | 'tie', scores: { p1: number; p2: number }) => void;
}

export const RiverToNameFlow: React.FC<RiverToNameFlowProps> = ({ onGameComplete }) => {
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [selectedLeft, setSelectedLeft] = useState<RiverFlowConnection | null>(null);
  const [completedConnectionIds, setCompletedConnectionIds] = useState<string[]>([]);
  const [shuffledTargets, setShuffledTargets] = useState<RiverFlowConnection[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const initRound = () => {
    const shuffled = [...RIVER_FLOW_CONNECTIONS].sort(() => Math.random() - 0.5);
    setShuffledTargets(shuffled);
    setSelectedLeft(null);
    setCompletedConnectionIds([]);
    setLastFeedback(null);
  };

  useEffect(() => {
    initRound();
  }, []);

  const handleSelectLeft = (item: RiverFlowConnection) => {
    if (completedConnectionIds.includes(item.id) || isGameOver) return;
    setSelectedLeft(item);
  };

  const handleSelectRight = (item: RiverFlowConnection) => {
    if (!selectedLeft || completedConnectionIds.includes(item.id) || isGameOver) return;

    if (selectedLeft.id === item.id) {
      // MATCH!
      const newCompleted = [...completedConnectionIds, item.id];
      setCompletedConnectionIds(newCompleted);
      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + 60
      }));
      setLastFeedback(`✨ Connected! ${selectedLeft.originName} ➔ ${item.targetTerm} (${item.context})`);
      setSelectedLeft(null);

      // Check if all connected
      if (newCompleted.length === RIVER_FLOW_CONNECTIONS.length) {
        confetti({ particleCount: 80, spread: 70 });
        setIsGameOver(true);
        const winner = scores.p1 > scores.p2 ? 'p1' : scores.p2 > scores.p1 ? 'p2' : 'tie';
        onGameComplete?.(winner, scores);
      }
    } else {
      // MISMATCH
      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: Math.max(0, prev[activePlayer === 1 ? 'p1' : 'p2'] - 15)
      }));
      setLastFeedback(`❌ Incorrect match between "${selectedLeft.originName}" and "${item.targetTerm}".`);
      setSelectedLeft(null);
      // Switch turn
      setActivePlayer(prev => (prev === 1 ? 2 : 1));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#0e121e] rounded-3xl border border-indigo-500/30 text-white shadow-2xl">
      <OneOnOneScoreboard
        player1Score={scores.p1}
        player2Score={scores.p2}
        activePlayer={activePlayer}
      />

      {/* Header */}
      <div className="bg-gray-900/90 p-4 sm:p-5 rounded-2xl border border-gray-800 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/40 uppercase">
              Activity 9 • River to Name Flow
            </span>
            <span className="text-xs text-gray-400">Sacred Geography & Linguistic Offshoots</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Connect Ancient Geographic Origins to Civilizational Names
          </h2>
          <p className="text-xs text-gray-400">
            Turn: <strong className={activePlayer === 1 ? 'text-indigo-300' : 'text-rose-300'}>Player {activePlayer}</strong> • Click an Origin on the left, then click its corresponding Name/Outcome on the right.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs font-bold text-indigo-300">
          Connected: {completedConnectionIds.length} / {RIVER_FLOW_CONNECTIONS.length}
        </div>
      </div>

      {/* Feedback Banner */}
      {lastFeedback && (
        <div className="p-3.5 bg-gray-900 border border-indigo-500/40 rounded-xl mb-6 text-xs sm:text-sm text-indigo-200 animate-fade-in flex items-center gap-2">
          <Waves className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>{lastFeedback}</span>
        </div>
      )}

      {/* Dual Column Connection Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column: Origins */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 1. Ancient Origins & Landmarks
          </h4>

          {RIVER_FLOW_CONNECTIONS.map(item => {
            const isCompleted = completedConnectionIds.includes(item.id);
            const isSelected = selectedLeft?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectLeft(item)}
                disabled={isCompleted || isGameOver}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-300 text-white ring-4 ring-indigo-400/40 scale-[1.02] shadow-lg'
                    : 'bg-gray-900/90 border-gray-800 hover:border-indigo-400/60 text-gray-200 hover:bg-gray-850 shadow-md'
                }`}
              >
                <div>
                  <div className="text-xs uppercase tracking-wide font-bold text-amber-400/80">
                    {item.originType}
                  </div>
                  <div className="text-sm font-black mt-0.5">{item.originName}</div>
                </div>

                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Outcomes & Cultures */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-bold text-teal-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 2. Historical Terms & Traditions
          </h4>

          {shuffledTargets.map(item => {
            const isCompleted = completedConnectionIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSelectRight(item)}
                disabled={isCompleted || isGameOver || !selectedLeft}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-60'
                    : selectedLeft
                    ? 'bg-gray-900 border-teal-500/40 hover:border-teal-400 hover:bg-teal-950/30 text-gray-200 shadow-md'
                    : 'bg-gray-900/50 border-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="text-xs uppercase tracking-wide font-bold text-teal-400">
                    {item.targetCulture}
                  </div>
                  <div className="text-sm font-black text-white mt-0.5">{item.targetTerm}</div>
                </div>

                {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-indigo-950/90 via-black to-rose-950/90 border-2 border-indigo-500/60 rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
          <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-white mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Claims River Flow Victory!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Claims River Flow Victory!'
              : 'Flawless Geographic Harmony from Both!'}
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={() => {
              setScores({ p1: 0, p2: 0 });
              setActivePlayer(1);
              setIsGameOver(false);
              initRound();
            }}
            className="px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
