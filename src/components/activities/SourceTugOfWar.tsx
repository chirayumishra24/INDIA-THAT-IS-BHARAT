'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SOURCE_TUG_QUESTIONS } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { CheckCircle, XCircle, Award, Sparkles, Zap } from 'lucide-react';

interface SourceTugOfWarProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const SourceTugOfWar: React.FC<SourceTugOfWarProps> = ({ onGameComplete }) => {
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [ropePosition, setRopePosition] = useState(50); // 50 is center (0 = full Lion, 100 = full Peacock)
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastPullNotice, setLastPullNotice] = useState<string | null>(null);

  // Separate non-overlapping questions for both teams:
  const [lionQIndex, setLionQIndex] = useState(0);
  const [lionSelectedTruth, setLionSelectedTruth] = useState<boolean | null>(null);
  const [lionSelectedSource, setLionSelectedSource] = useState<string | null>(null);
  const [lionFeedback, setLionFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const [peacockQIndex, setPeacockQIndex] = useState(4);
  const [peacockSelectedTruth, setPeacockSelectedTruth] = useState<boolean | null>(null);
  const [peacockSelectedSource, setPeacockSelectedSource] = useState<string | null>(null);
  const [peacockFeedback, setPeacockFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const currentLionQ = SOURCE_TUG_QUESTIONS[lionQIndex % SOURCE_TUG_QUESTIONS.length];
  const currentPeacockQ = SOURCE_TUG_QUESTIONS[peacockQIndex % SOURCE_TUG_QUESTIONS.length];

  // Team Lion Answer Handler
  const handleLionSubmit = (truthOverride?: boolean | null, sourceOverride?: string | null) => {
    const truth = truthOverride !== undefined ? truthOverride : lionSelectedTruth;
    const source = sourceOverride !== undefined ? sourceOverride : lionSelectedSource;
    if (truth === null || source === null || isGameOver || lionFeedback) return;
    const isCorrect = truth === currentLionQ.isTrue && source === currentLionQ.correctSource;

    setLionFeedback({ isCorrect, explanation: currentLionQ.explanation });

    if (isCorrect) {
      // Pull rope towards Lion side (Left: decreasing ropePosition toward 0%)
      const newPos = Math.max(5, ropePosition - 18);
      setRopePosition(newPos);
      setScores(prev => ({ ...prev, lion: prev.lion + currentLionQ.points }));
      setLastPullNotice('🦁 Lion Correct! Rope pulled Left to Lion Station!');
      if (newPos <= 15) {
        handleGameFinish('lion');
      }
    } else {
      setScores(prev => ({ ...prev, lion: Math.max(0, prev.lion - 15) }));
      setLastPullNotice('⚠️ Lion Error! Rope holds center at 50%.');
    }
  };

  const handleLionNext = () => {
    setLionFeedback(null);
    setLionSelectedTruth(null);
    setLionSelectedSource(null);
    setLionQIndex(prev => (prev + 1) % SOURCE_TUG_QUESTIONS.length);
  };

  // Team Peacock Answer Handler
  const handlePeacockSubmit = (truthOverride?: boolean | null, sourceOverride?: string | null) => {
    const truth = truthOverride !== undefined ? truthOverride : peacockSelectedTruth;
    const source = sourceOverride !== undefined ? sourceOverride : peacockSelectedSource;
    if (truth === null || source === null || isGameOver || peacockFeedback) return;
    const isCorrect = truth === currentPeacockQ.isTrue && source === currentPeacockQ.correctSource;

    setPeacockFeedback({ isCorrect, explanation: currentPeacockQ.explanation });

    if (isCorrect) {
      // Pull rope towards Peacock side (Right: increasing ropePosition toward 100%)
      const newPos = Math.min(95, ropePosition + 18);
      setRopePosition(newPos);
      setScores(prev => ({ ...prev, peacock: prev.peacock + currentPeacockQ.points }));
      setLastPullNotice('🦚 Peacock Correct! Rope pulled Right to Peacock Station!');
      if (newPos >= 85) {
        handleGameFinish('peacock');
      }
    } else {
      setScores(prev => ({ ...prev, peacock: Math.max(0, prev.peacock - 15) }));
      setLastPullNotice('⚠️ Peacock Error! Rope holds center at 50%.');
    }
  };

  const handlePeacockNext = () => {
    setPeacockFeedback(null);
    setPeacockSelectedTruth(null);
    setPeacockSelectedSource(null);
    setPeacockQIndex(prev => (prev + 1) % SOURCE_TUG_QUESTIONS.length);
  };

  const handleGameFinish = (winner: 'lion' | 'peacock' | 'tie') => {
    setIsGameOver(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    onGameComplete?.(winner, scores);
  };

  const handleRematch = () => {
    setScores({ lion: 0, peacock: 0 });
    setRopePosition(50);
    setIsGameOver(false);
    setLastPullNotice(null);
    setLionQIndex(0);
    setLionSelectedTruth(null);
    setLionSelectedSource(null);
    setLionFeedback(null);
    setPeacockQIndex(4);
    setPeacockSelectedTruth(null);
    setPeacockSelectedSource(null);
    setPeacockFeedback(null);
  };

  return (
    <div className="w-full text-[#14213D] space-y-6">
      {/* Persistent Team Scoreboard with Active Turn Indicator */}
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        activeTurn="both"
        roundNumber={Math.floor((lionQIndex + peacockQIndex) / 2) + 1}
        totalRounds={SOURCE_TUG_QUESTIONS.length}
        showBuzzers={false}
      />

      {/* Dynamic Tug of War Rope Tension Bar (Full Width Physics Indicator) */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-amber-400/90 p-4 sm:p-6 shadow-xl select-none">
        {/* Tension Header & Pull Alert */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-400 flex items-center justify-center text-lg shadow-sm">
              🦁
            </span>
            <div>
              <div className="text-sm font-black text-amber-950 uppercase tracking-wide">
                Team Lion
              </div>
              <div className="text-xs font-bold text-amber-700">
                {Math.round(100 - ropePosition)}% Rope Pull
              </div>
            </div>
          </div>

          {/* Center Notice / Pull Alert */}
          <div className="flex items-center gap-2">
            {lastPullNotice ? (
              <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-black text-xs sm:text-sm rounded-full shadow-md animate-bounce">
                {lastPullNotice}
              </div>
            ) : (
              <div className="px-3.5 py-1.5 bg-amber-100/90 border border-amber-300 text-amber-950 font-bold text-xs sm:text-sm rounded-full flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Verify claims & cite authentic sources to pull the rope!</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 text-right">
            <div>
              <div className="text-sm font-black text-teal-950 uppercase tracking-wide">
                Team Peacock
              </div>
              <div className="text-xs font-bold text-teal-700">
                {Math.round(ropePosition)}% Rope Pull
              </div>
            </div>
            <span className="w-9 h-9 rounded-xl bg-teal-100 border border-teal-400 flex items-center justify-center text-lg shadow-sm">
              🦚
            </span>
          </div>
        </div>

        {/* Rope Tension Track */}
        <div className="relative">
          <div className="relative h-8 sm:h-9 w-full bg-gradient-to-r from-amber-100 via-amber-50 to-teal-100 rounded-full border-2 border-amber-300 overflow-hidden shadow-inner flex items-center px-1">
            {/* Goal Line Zone: Lion Win (Left <= 15%) */}
            <div className={`absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-amber-500/30 to-amber-500/10 border-r-2 border-dashed border-amber-500 flex items-center justify-center text-[10px] sm:text-xs font-black text-amber-950 transition-opacity ${ropePosition <= 25 ? 'animate-pulse opacity-100' : 'opacity-70'}`}>
              <span className="hidden sm:inline">🦁 LION GOAL</span>
            </div>

            {/* Goal Line Zone: Peacock Win (Right >= 85%) */}
            <div className={`absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-teal-500/30 to-teal-500/10 border-l-2 border-dashed border-teal-500 flex items-center justify-center text-[10px] sm:text-xs font-black text-teal-950 transition-opacity ${ropePosition >= 75 ? 'animate-pulse opacity-100' : 'opacity-70'}`}>
              <span className="hidden sm:inline">PEACOCK GOAL 🦚</span>
            </div>

            {/* Center Deadlock Marker Line at 50% */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gray-400 z-0" />

            {/* Lion Pulled Bar (Left) */}
            {ropePosition < 50 && (
              <div
                className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700 ease-out opacity-80"
                style={{ left: `${ropePosition}%`, width: `${50 - ropePosition}%` }}
              />
            )}

            {/* Peacock Pulled Bar (Right) */}
            {ropePosition > 50 && (
              <div
                className="absolute top-0 bottom-0 bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-700 ease-out opacity-80"
                style={{ left: '50%', width: `${ropePosition - 50}%` }}
              />
            )}

            {/* Sliding Flag Marker 🚩 */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 border-2 border-white shadow-xl flex items-center justify-center text-lg font-black text-black transition-all duration-700 ease-out z-10"
              style={{ left: `${ropePosition}%` }}
              title={`Rope Position: ${Math.round(ropePosition)}%`}
            >
              🚩
            </div>
          </div>

          {/* Indicator Footnotes */}
          <div className="flex justify-between items-center text-xs font-mono font-bold mt-2 px-2">
            <span className="text-amber-900 font-extrabold text-xs sm:text-sm">
              🦁 {Math.round(100 - ropePosition)}% Lion
            </span>
            <span className="text-gray-700 uppercase font-black tracking-wide text-xs sm:text-sm">
              {ropePosition === 50
                ? '⚖️ Center Deadlock (50-50)'
                : ropePosition < 50
                ? '⬅️ Lion Advantage (Pulling Left)'
                : 'Peacock Advantage (Pulling Right) ➡️'}
            </span>
            <span className="text-teal-900 font-extrabold text-xs sm:text-sm">
              {Math.round(ropePosition)}% Peacock 🦚
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column High-Visibility Battle Arena: Team Lion (Left 50%) — Team Peacock (Right 50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        
        {/* LEFT COLUMN: TEAM LION 🦁 */}
        <div className="rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between min-h-[580px] bg-white/95 backdrop-blur-xl border-2 border-amber-500 ring-4 ring-amber-400/20">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-400 flex items-center justify-center text-xl shadow-sm">
                  🦁
                </span>
                <div>
                  <h3 className="font-black text-lg text-amber-950 tracking-tight">TEAM LION</h3>
                  <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">Left Pull Station</span>
                </div>
              </div>
              <span className="px-3.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-sm font-black text-amber-950 shadow-xs">
                {scores.lion} pts
              </span>
            </div>

            {/* High Visibility Question Claim Box */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-amber-500 text-black text-xs sm:text-sm font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Lion Claim #{lionQIndex + 1}
                </span>
                <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-black rounded-full">
                  +{currentLionQ.points} Points
                </span>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 border-2 border-amber-400 rounded-2xl p-4 sm:p-5 shadow-sm">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 block mb-2">
                  📜 Historical Claim to Verify:
                </span>
                <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 leading-snug">
                  "{currentLionQ.claim}"
                </p>
              </div>
            </div>

            {/* Step 1: True / False */}
            {!lionFeedback && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm uppercase tracking-wider font-black text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-black">
                      1
                    </span>
                    Is this Statement Historically True or False?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setLionSelectedTruth(true);
                        if (lionSelectedSource !== null) {
                          handleLionSubmit(true, lionSelectedSource);
                        }
                      }}
                      className={`py-3.5 px-4 rounded-xl font-black text-sm sm:text-base border-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        lionSelectedTruth === true
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg ring-3 ring-emerald-300 scale-[1.02]'
                          : 'bg-white hover:bg-emerald-50 border-gray-300 text-slate-900 hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>TRUE</span>
                    </button>
                    <button
                      onClick={() => {
                        setLionSelectedTruth(false);
                        if (lionSelectedSource !== null) {
                          handleLionSubmit(false, lionSelectedSource);
                        }
                      }}
                      className={`py-3.5 px-4 rounded-xl font-black text-sm sm:text-base border-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        lionSelectedTruth === false
                          ? 'bg-rose-600 border-rose-700 text-white shadow-lg ring-3 ring-rose-300 scale-[1.02]'
                          : 'bg-white hover:bg-rose-50 border-gray-300 text-slate-900 hover:border-rose-400'
                      }`}
                    >
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>FALSE</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Source */}
                <div>
                  <label className="text-xs sm:text-sm uppercase tracking-wider font-black text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-black">
                      2
                    </span>
                    Cite the Authentic Primary Historical Source:
                  </label>
                  <div className="space-y-2">
                    {currentLionQ.sourceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setLionSelectedSource(opt);
                          if (lionSelectedTruth !== null) {
                            handleLionSubmit(lionSelectedTruth, opt);
                          }
                        }}
                        className={`w-full text-left py-3 px-4 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between gap-2 shadow-xs ${
                          lionSelectedSource === opt
                            ? 'bg-amber-500 border-amber-600 text-black font-black ring-3 ring-amber-300 shadow-md scale-[1.01]'
                            : 'bg-white hover:bg-amber-50/80 border-gray-200 hover:border-amber-400 text-slate-900'
                        }`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {lionSelectedSource === opt && <span className="text-black font-black text-base shrink-0">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback when answered */}
            {lionFeedback && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 animate-fade-in shadow-lg mt-2 ${
                  lionFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {lionFeedback.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <h4 className="font-black text-sm sm:text-base">
                    {lionFeedback.isCorrect ? 'Decisive Pull! Rope Pulled to Lion Side 🦁' : 'Incorrect Citation! Tug Holds Center.'}
                  </h4>
                </div>
                <div className="bg-white/90 rounded-xl p-3 border border-emerald-200/60 my-2">
                  <p className="text-xs sm:text-sm leading-relaxed font-semibold text-slate-800">
                    <strong className="text-slate-900">Historical Explanation:</strong> {lionFeedback.explanation}
                  </p>
                </div>
                <button
                  onClick={handleLionNext}
                  className="w-full mt-3 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-manipulation active:scale-95"
                >
                  Next Question (Team Lion) 🦁 ➔
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!lionFeedback && (
            <button
              onClick={() => handleLionSubmit()}
              disabled={lionSelectedTruth === null || lionSelectedSource === null}
              className={`w-full mt-5 py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                lionSelectedTruth !== null && lionSelectedSource !== null
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black active:scale-95 shadow-amber-500/30'
                  : 'bg-amber-100 text-amber-900/60 border border-amber-300/60 cursor-not-allowed'
              }`}
            >
              {lionSelectedTruth === null || lionSelectedSource === null
                ? 'Select Step 1 & Step 2 to Pull ➔'
                : '🦁 Pull Rope for Lion! ➔'}
            </button>
          )}
        </div>

        {/* RIGHT COLUMN: TEAM PEACOCK 🦚 */}
        <div className="rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between min-h-[580px] bg-white/95 backdrop-blur-xl border-2 border-teal-500 ring-4 ring-teal-400/20">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-teal-200 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-400 flex items-center justify-center text-xl shadow-sm">
                  🦚
                </span>
                <div>
                  <h3 className="font-black text-lg text-teal-950 tracking-tight">TEAM PEACOCK</h3>
                  <span className="text-xs text-teal-800 font-bold uppercase tracking-wider">Right Pull Station</span>
                </div>
              </div>
              <span className="px-3.5 py-1 bg-teal-100 border border-teal-300 rounded-full text-sm font-black text-teal-950 shadow-xs">
                {scores.peacock} pts
              </span>
            </div>

            {/* High Visibility Question Claim Box */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-teal-600 text-white text-xs sm:text-sm font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Peacock Claim #{peacockQIndex + 1}
                </span>
                <span className="px-3 py-1 bg-teal-100 border border-teal-300 text-teal-950 text-xs sm:text-sm font-black rounded-full">
                  +{currentPeacockQ.points} Points
                </span>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-emerald-50/70 border-2 border-teal-400 rounded-2xl p-4 sm:p-5 shadow-sm">
                <span className="text-xs font-black uppercase tracking-wider text-teal-800 block mb-2">
                  📜 Historical Claim to Verify:
                </span>
                <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 leading-snug">
                  "{currentPeacockQ.claim}"
                </p>
              </div>
            </div>

            {/* Step 1: True / False */}
            {!peacockFeedback && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs sm:text-sm uppercase tracking-wider font-black text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-black">
                      1
                    </span>
                    Is this Statement Historically True or False?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setPeacockSelectedTruth(true);
                        if (peacockSelectedSource !== null) {
                          handlePeacockSubmit(true, peacockSelectedSource);
                        }
                      }}
                      className={`py-3.5 px-4 rounded-xl font-black text-sm sm:text-base border-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        peacockSelectedTruth === true
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg ring-3 ring-emerald-300 scale-[1.02]'
                          : 'bg-white hover:bg-emerald-50 border-gray-300 text-slate-900 hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>TRUE</span>
                    </button>
                    <button
                      onClick={() => {
                        setPeacockSelectedTruth(false);
                        if (peacockSelectedSource !== null) {
                          handlePeacockSubmit(false, peacockSelectedSource);
                        }
                      }}
                      className={`py-3.5 px-4 rounded-xl font-black text-sm sm:text-base border-2 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        peacockSelectedTruth === false
                          ? 'bg-rose-600 border-rose-700 text-white shadow-lg ring-3 ring-rose-300 scale-[1.02]'
                          : 'bg-white hover:bg-rose-50 border-gray-300 text-slate-900 hover:border-rose-400'
                      }`}
                    >
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>FALSE</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Source */}
                <div>
                  <label className="text-xs sm:text-sm uppercase tracking-wider font-black text-slate-800 flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-black">
                      2
                    </span>
                    Cite the Authentic Primary Historical Source:
                  </label>
                  <div className="space-y-2">
                    {currentPeacockQ.sourceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setPeacockSelectedSource(opt);
                          if (peacockSelectedTruth !== null) {
                            handlePeacockSubmit(peacockSelectedTruth, opt);
                          }
                        }}
                        className={`w-full text-left py-3 px-4 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between gap-2 shadow-xs ${
                          peacockSelectedSource === opt
                            ? 'bg-teal-600 border-teal-700 text-white font-black ring-3 ring-teal-300 shadow-md scale-[1.01]'
                            : 'bg-white hover:bg-teal-50/80 border-gray-200 hover:border-teal-400 text-slate-900'
                        }`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {peacockSelectedSource === opt && <span className="text-white font-black text-base shrink-0">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback when answered */}
            {peacockFeedback && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 animate-fade-in shadow-lg mt-2 ${
                  peacockFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {peacockFeedback.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                  <h4 className="font-black text-sm sm:text-base">
                    {peacockFeedback.isCorrect ? 'Decisive Pull! Rope Pulled to Peacock Side 🦚' : 'Incorrect Citation! Tug Holds Center.'}
                  </h4>
                </div>
                <div className="bg-white/90 rounded-xl p-3 border border-emerald-200/60 my-2">
                  <p className="text-xs sm:text-sm leading-relaxed font-semibold text-slate-800">
                    <strong className="text-slate-900">Historical Explanation:</strong> {peacockFeedback.explanation}
                  </p>
                </div>
                <button
                  onClick={handlePeacockNext}
                  className="w-full mt-3 py-3 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer touch-manipulation active:scale-95"
                >
                  Next Question (Team Peacock) 🦚 ➔
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!peacockFeedback && (
            <button
              onClick={() => handlePeacockSubmit()}
              disabled={peacockSelectedTruth === null || peacockSelectedSource === null}
              className={`w-full mt-5 py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                peacockSelectedTruth !== null && peacockSelectedSource !== null
                  ? 'bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white active:scale-95 shadow-teal-500/30'
                  : 'bg-teal-100 text-teal-900/60 border border-teal-300/60 cursor-not-allowed'
              }`}
            >
              {peacockSelectedTruth === null || peacockSelectedSource === null
                ? 'Select Step 1 & Step 2 to Pull ➔'
                : '🦚 Pull Rope for Peacock! ➔'}
            </button>
          )}
        </div>
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-amber-900/90 via-purple-950/95 to-teal-900/90 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl animate-fade-in text-white">
          <Award className="w-14 h-14 text-amber-400 mx-auto mb-3" />
          <h2 className="text-2xl sm:text-4xl font-black text-amber-200 mb-2">
            {ropePosition <= 20
              ? '🦁 Team Lion Triumphs!'
              : ropePosition >= 80
              ? '🦚 Team Peacock Triumphs!'
              : scores.lion > scores.peacock
              ? '🦁 Team Lion Wins on Points!'
              : '🦚 Team Peacock Wins on Points!'}
          </h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto mb-6 leading-relaxed">
            The ancient sources have spoken — superior mastery of primary epigraphy, rock edicts, and subcontinental history!
          </p>
          <button
            onClick={handleRematch}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
