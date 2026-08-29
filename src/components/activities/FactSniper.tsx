'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FACT_SNIPER_TARGETS, FactSniperItem } from '@/data/activityGamesData';
import { OneOnOneScoreboard } from './OneOnOneScoreboard';
import { Crosshair, Shield, CheckCircle2, XCircle, Trophy, Sparkles, AlertTriangle } from 'lucide-react';

interface FactSniperProps {
  onGameComplete?: (winner: 'p1' | 'p2' | 'tie', scores: { p1: number; p2: number }) => void;
}

export const FactSniper: React.FC<FactSniperProps> = ({ onGameComplete }) => {
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [streaks, setStreaks] = useState({ p1: 0, p2: 0 });
  const [feedback, setFeedback] = useState<{
    status: 'bullseye' | 'misfire' | 'spared-myth' | 'missed-fact';
    message: string;
    citation: string;
  } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentTarget: FactSniperItem = FACT_SNIPER_TARGETS[currentTargetIndex];

  const handleShoot = () => {
    if (feedback !== null || isGameOver) return;

    if (currentTarget.isHistoricalFact) {
      // Correct Shoot!
      const currentStreak = streaks[activePlayer === 1 ? 'p1' : 'p2'] + 1;
      const pts = 50 + currentStreak * 10;

      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + pts
      }));

      setStreaks(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: currentStreak
      }));

      setFeedback({
        status: 'bullseye',
        message: `🎯 Bullseye! Authentic Historical Fact Verified! (+${pts} pts)`,
        citation: currentTarget.sourceCitation
      });
    } else {
      // Shot a Myth! Penalty
      setStreaks(prev => ({ ...prev, [activePlayer === 1 ? 'p1' : 'p2']: 0 }));
      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: Math.max(0, prev[activePlayer === 1 ? 'p1' : 'p2'] - 25)
      }));

      setFeedback({
        status: 'misfire',
        message: `⚠️ Misfire! You shot a historical myth! (-25 pts). ${currentTarget.correctionIfMyth || ''}`,
        citation: currentTarget.sourceCitation
      });
    }
  };

  const handleLetPass = () => {
    if (feedback !== null || isGameOver) return;

    if (!currentTarget.isHistoricalFact) {
      // Correctly spared myth!
      const pts = 30;
      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + pts
      }));

      setFeedback({
        status: 'spared-myth',
        message: `🛡️ Wise Restraint! You recognized the myth and let it pass! (+${pts} pts). ${currentTarget.correctionIfMyth || ''}`,
        citation: currentTarget.sourceCitation
      });
    } else {
      // Let an authentic fact pass by mistake!
      setFeedback({
        status: 'missed-fact',
        message: `❌ Missed Opportunity! That statement was 100% genuine historical fact.`,
        citation: currentTarget.sourceCitation
      });
    }
  };

  const handleNextTarget = () => {
    setFeedback(null);
    setActivePlayer(prev => (prev === 1 ? 2 : 1));

    if (currentTargetIndex + 1 < FACT_SNIPER_TARGETS.length) {
      setCurrentTargetIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
      confetti({ particleCount: 100, spread: 80 });
      const winner = scores.p1 > scores.p2 ? 'p1' : scores.p2 > scores.p1 ? 'p2' : 'tie';
      onGameComplete?.(winner, scores);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-[#0e121e] rounded-3xl border border-indigo-500/30 text-white shadow-2xl">
      <OneOnOneScoreboard
        player1Score={scores.p1}
        player2Score={scores.p2}
        activePlayer={activePlayer}
        streakP1={streaks.p1}
        streakP2={streaks.p2}
      />

      {/* Header */}
      <div className="bg-gray-900/90 p-4 sm:p-5 rounded-2xl border border-gray-800 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-xs font-bold rounded-full border border-rose-500/40 uppercase">
              Activity 10 • Fact Sniper
            </span>
            <span className="text-xs text-gray-400">Target Gallery (Fact vs Myth)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Historical Fact Sniper Gallery
          </h2>
          <p className="text-xs text-gray-400">
            Turn: <strong className={activePlayer === 1 ? 'text-indigo-300' : 'text-rose-300'}>Player {activePlayer}</strong> • Shoot only TRUE facts. Let false myths pass safely!
          </p>
        </div>

        <div className="px-3 py-1.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs font-bold text-rose-300">
          Target {currentTargetIndex + 1} of {FACT_SNIPER_TARGETS.length}
        </div>
      </div>

      {/* TARGET SHIELD DISPLAY */}
      {!isGameOver && (
        <div className="relative bg-gradient-to-b from-gray-900 via-[#131722] to-black border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl overflow-hidden text-center">
          {/* Target Reticle Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-indigo-500/10 rounded-full pointer-events-none"></div>

          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-black rounded-full uppercase tracking-wider mb-4 border border-indigo-500/30">
            Incoming Statement Target
          </span>

          <h3 className="text-lg sm:text-2xl font-extrabold text-white leading-relaxed max-w-2xl mx-auto mb-6">
            "{currentTarget?.statement}"
          </h3>

          {/* Action Dual Buttons: SHOOT vs LET PASS */}
          {feedback === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <button
                onClick={handleShoot}
                className="py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-2xl text-sm uppercase tracking-wider transition-all shadow-xl shadow-emerald-950/60 active:scale-95 flex items-center justify-center gap-2"
              >
                <Crosshair className="w-5 h-5 text-emerald-200" />
                🎯 SHOOT (TRUE FACT)
              </button>

              <button
                onClick={handleLetPass}
                className="py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-200 font-black rounded-2xl text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5 text-gray-300" />
                🛡️ LET PASS (FALSE MYTH)
              </button>
            </div>
          ) : (
            <div className="animate-fade-in max-w-xl mx-auto">
              <div
                className={`p-5 rounded-2xl border-2 mb-4 text-left ${
                  feedback.status === 'bullseye' || feedback.status === 'spared-myth'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500 text-rose-200'
                }`}
              >
                <div className="font-bold text-sm sm:text-base mb-1">{feedback.message}</div>
                <div className="text-xs text-amber-300 font-semibold">
                  Source: {feedback.citation}
                </div>
              </div>

              <button
                onClick={handleNextTarget}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95"
              >
                Next Target ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-indigo-950/90 via-black to-rose-950/90 border-2 border-indigo-500/60 rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
          <Trophy className="w-14 h-14 text-amber-400 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-white mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Crowned Top Fact Sniper!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Crowned Top Fact Sniper!'
              : 'Sharpshooter Tie! Both Possess Impeccable Historical Accuracy!'}
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={() => {
              setCurrentTargetIndex(0);
              setActivePlayer(1);
              setScores({ p1: 0, p2: 0 });
              setStreaks({ p1: 0, p2: 0 });
              setFeedback(null);
              setIsGameOver(false);
            }}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Reload Sniper Range ↺
          </button>
        </div>
      )}
    </div>
  );
};
