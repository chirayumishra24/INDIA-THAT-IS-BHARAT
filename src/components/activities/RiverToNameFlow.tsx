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
    <div className="w-full text-[#14213D] space-y-4">
      <OneOnOneScoreboard
        player1Score={scores.p1}
        player2Score={scores.p2}
        activePlayer={activePlayer}
      />

      {/* Header */}
      <div className="bg-indigo-50/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-indigo-200 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-200 text-indigo-950 text-xs font-black rounded-full border border-indigo-300 uppercase">
              Activity 9 • River to Name Flow
            </span>
            <span className="text-xs text-gray-600 font-semibold">Sacred Geography & Linguistic Offshoots</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
            Connect Ancient Geographic Origins to Civilizational Names
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            Turn: <strong className={activePlayer === 1 ? 'text-indigo-800' : 'text-rose-800'}>Player {activePlayer}</strong> • Click an Origin on the left, then click its corresponding Name/Outcome on the right.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-indigo-100 border border-indigo-300 rounded-xl text-xs font-bold text-indigo-900">
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
          <h4 className="text-xs uppercase font-black text-amber-950 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> 1. Ancient Origins & Landmarks
          </h4>

          {RIVER_FLOW_CONNECTIONS.map(item => {
            const isCompleted = completedConnectionIds.includes(item.id);
            const isSelected = selectedLeft?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectLeft(item)}
                disabled={isCompleted || isGameOver}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-950 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-indigo-600 border-indigo-700 text-white ring-4 ring-indigo-400/50 scale-[1.02] shadow-xl'
                    : 'bg-white border-gray-300 hover:border-indigo-500 text-black hover:bg-indigo-50/60 shadow-md'
                }`}
              >
                <div>
                  <div className={`text-xs uppercase tracking-wide font-black ${isSelected ? 'text-amber-300' : 'text-amber-900'}`}>
                    {item.originType}
                  </div>
                  <div className={`text-base font-black mt-0.5 ${isSelected ? 'text-white' : 'text-black'}`}>{item.originName}</div>
                </div>

                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Outcomes & Cultures */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-black text-teal-950 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" /> 2. Historical Terms & Traditions
          </h4>

          {shuffledTargets.map(item => {
            const isCompleted = completedConnectionIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSelectRight(item)}
                disabled={isCompleted || isGameOver || !selectedLeft}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-100 border-emerald-600 text-emerald-950 opacity-80 cursor-default'
                    : selectedLeft
                    ? 'bg-white border-teal-500 hover:border-teal-600 hover:bg-teal-50 text-black shadow-md'
                    : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="text-xs uppercase tracking-wide font-black text-teal-800">
                    {item.targetCulture}
                  </div>
                  <div className="text-base font-black text-black mt-0.5">{item.targetTerm}</div>
                </div>

                {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-white border-4 border-teal-500 rounded-3xl p-8 text-center shadow-2xl animate-fade-in text-black">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-black mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Claims River Flow Victory!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Claims River Flow Victory!'
              : 'Flawless Geographic Harmony from Both!'}
          </h2>
          <p className="text-base font-bold text-gray-700 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={() => {
              setScores({ p1: 0, p2: 0 });
              setActivePlayer(1);
              setIsGameOver(false);
              initRound();
            }}
            className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
