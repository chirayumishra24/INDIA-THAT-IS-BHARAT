'use client';

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { SOURCE_TUG_QUESTIONS } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { CheckCircle, XCircle, Award, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface SourceTugOfWarProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const SourceTugOfWar: React.FC<SourceTugOfWarProps> = ({ onGameComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [ropePosition, setRopePosition] = useState(50); // 50 is center (0 = full Lion, 100 = full Peacock)
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
    <div className="w-full text-[#14213D] space-y-4">
      {/* Persistent Team Scoreboard with Active Turn Indicator */}
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        activeTurn="both"
        roundNumber={Math.floor((lionQIndex + peacockQIndex) / 2) + 1}
        totalRounds={SOURCE_TUG_QUESTIONS.length}
        showBuzzers={false}
      />

      {/* 3-Column Arena: Team Lion (Left) — Live Tug Video (Center) — Team Peacock (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch mb-6">
        
        {/* LEFT COLUMN: TEAM LION 🦁 (Smaller, High-Visibility Question Card) */}
        <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between bg-white/95 backdrop-blur-xl border-2 border-amber-500 ring-2 ring-amber-400/20">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-400 flex items-center justify-center text-base shadow-xs">
                  🦁
                </span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-amber-950 leading-tight">TEAM LION</h3>
                  <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Left Pull Station</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-black text-amber-950">
                {scores.lion} pts
              </span>
            </div>

            {/* High Visibility Question Claim Box */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2.5 py-0.5 bg-amber-500 text-black text-[11px] font-black rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Lion Claim #{lionQIndex + 1}
                </span>
                <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-950 text-[11px] font-black rounded-full">
                  +{currentLionQ.points} Pts
                </span>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50/80 border-2 border-amber-400 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-1">
                  📜 Historical Claim to Verify:
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                  "{currentLionQ.claim}"
                </p>
              </div>
            </div>

            {/* Step 1: True / False */}
            {!lionFeedback && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] flex items-center justify-center font-black">
                      1
                    </span>
                    Is this Statement True or False?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setLionSelectedTruth(true);
                        if (lionSelectedSource !== null) {
                          handleLionSubmit(true, lionSelectedSource);
                        }
                      }}
                      className={`py-2 px-3 rounded-lg font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        lionSelectedTruth === true
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-md ring-2 ring-emerald-300 scale-[1.02]'
                          : 'bg-white hover:bg-emerald-50 border-gray-300 text-slate-900 hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>TRUE</span>
                    </button>
                    <button
                      onClick={() => {
                        setLionSelectedTruth(false);
                        if (lionSelectedSource !== null) {
                          handleLionSubmit(false, lionSelectedSource);
                        }
                      }}
                      className={`py-2 px-3 rounded-lg font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        lionSelectedTruth === false
                          ? 'bg-rose-600 border-rose-700 text-white shadow-md ring-2 ring-rose-300 scale-[1.02]'
                          : 'bg-white hover:bg-rose-50 border-gray-300 text-slate-900 hover:border-rose-400'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>FALSE</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Source */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-xs flex items-center justify-center font-black">
                      2
                    </span>
                    Cite Primary Source:
                  </label>
                  <div className="space-y-1.5">
                    {currentLionQ.sourceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setLionSelectedSource(opt);
                          if (lionSelectedTruth !== null) {
                            handleLionSubmit(lionSelectedTruth, opt);
                          }
                        }}
                        className={`w-full text-left py-2 px-2.5 rounded-lg border-2 text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-1.5 shadow-xs ${
                          lionSelectedSource === opt
                            ? 'bg-amber-500 border-amber-600 text-black font-black ring-2 ring-amber-300 shadow-sm scale-[1.01]'
                            : 'bg-white hover:bg-amber-50/80 border-gray-200 hover:border-amber-400 text-slate-900'
                        }`}
                      >
                        <span className="leading-tight">{opt}</span>
                        {lionSelectedSource === opt && <span className="text-black font-black text-xs shrink-0">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback when answered */}
            {lionFeedback && (
              <div
                className={`p-3 rounded-xl border-2 animate-fade-in shadow-md mt-2 ${
                  lionFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {lionFeedback.isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <h4 className="font-black text-xs sm:text-sm">
                    {lionFeedback.isCorrect ? 'Decisive Pull! Pulled to Lion 🦁' : 'Incorrect Citation! Tug Holds Center.'}
                  </h4>
                </div>
                <div className="bg-white/90 rounded-lg p-2 border border-emerald-200/60 my-1.5">
                  <p className="text-[11px] sm:text-xs leading-relaxed font-semibold text-slate-800">
                    <strong className="text-slate-900">Explanation:</strong> {lionFeedback.explanation}
                  </p>
                </div>
                <button
                  onClick={handleLionNext}
                  className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-95"
                >
                  Next Question 🦁 ➔
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!lionFeedback && (
            <button
              onClick={() => handleLionSubmit()}
              disabled={lionSelectedTruth === null || lionSelectedSource === null}
              className={`w-full mt-3 py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                lionSelectedTruth !== null && lionSelectedSource !== null
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black active:scale-95 shadow-amber-500/30'
                  : 'bg-amber-100 text-amber-900/60 border border-amber-300/60 cursor-not-allowed'
              }`}
            >
              {lionSelectedTruth === null || lionSelectedSource === null
                ? 'Select Step 1 & 2 to Pull ➔'
                : '🦁 Pull Rope for Lion! ➔'}
            </button>
          )}
        </div>

        {/* CENTER COLUMN: LIVE TUG-OF-WAR ARENA VIDEO & PHYSICS ⚔️ */}
        <div className="lg:col-span-4 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-amber-400 p-3 sm:p-4 shadow-xl flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between text-xs font-black mb-2">
            <span className="text-amber-950 font-black flex items-center gap-1">
              🦁 {Math.round(100 - ropePosition)}% Lion
            </span>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 border rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs bg-amber-100 border-amber-300 text-amber-950">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Live Tug Battle ⚔️
              </span>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                  }
                  setIsMuted(!isMuted);
                }}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="p-1 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>

            <span className="text-teal-950 font-black flex items-center gap-1">
              {Math.round(ropePosition)}% Peacock 🦚
            </span>
          </div>

          {/* Animated Video Frame with Physics Shift */}
          <div className="relative w-full h-[220px] sm:h-[260px] bg-slate-900 rounded-2xl border-2 border-amber-200 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Goal Line Zone: Lion (Left) */}
            <div className={`absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-amber-500/30 to-transparent z-10 pointer-events-none flex items-center pl-1 transition-opacity duration-300 ${ropePosition <= 30 ? 'opacity-100 animate-pulse' : 'opacity-30'}`}>
              <div className="h-4/5 w-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] border border-amber-300" />
            </div>

            {/* Goal Line Zone: Peacock (Right) */}
            <div className={`absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-teal-500/30 to-transparent z-10 pointer-events-none flex items-center justify-end pr-1 transition-opacity duration-300 ${ropePosition >= 70 ? 'opacity-100 animate-pulse' : 'opacity-30'}`}>
              <div className="h-4/5 w-1 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)] border border-teal-300" />
            </div>

            {/* Center Reference Mark */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-gray-400 z-10 pointer-events-none" />

            {/* Video Shifted by Tug Physics (Left for Lion, Right for Peacock) */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(${(ropePosition - 50) * 1.5}%)`
              }}
            >
              <video
                ref={videoRef}
                src="https://chirag-gour.github.io/Audio_SkilliZee/Ai%20Assistant%202/main.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="max-h-full max-w-full object-contain pointer-events-none select-none"
              />
            </div>

            {/* Dynamic Pull Direction Banner */}
            {ropePosition < 50 && (
              <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 bg-amber-500 text-black text-[10px] font-black rounded-lg shadow animate-pulse">
                ⬅️ Pulled to Lion
              </div>
            )}
            {ropePosition > 50 && (
              <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 bg-teal-600 text-white text-[10px] font-black rounded-lg shadow animate-pulse">
                Pulled to Peacock ➡️
              </div>
            )}

            {/* Dynamic Pull Action Overlay */}
            {lastPullNotice && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-black/90 backdrop-blur-md border border-amber-400 text-amber-300 text-[10px] font-black rounded-full shadow-lg text-center whitespace-nowrap animate-bounce">
                {lastPullNotice}
              </div>
            )}
          </div>

          {/* Precision Rope Tension Gauge Below Video */}
          <div className="mt-3">
            <div className="relative h-6 w-full bg-gradient-to-r from-amber-100 via-amber-50 to-teal-100 rounded-full border-2 border-amber-300 overflow-hidden shadow-inner flex items-center px-1">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 -translate-x-1/2 z-0" />
              {/* Lion Pull Indicator Bar (Left) */}
              {ropePosition < 50 && (
                <div
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700 ease-out opacity-80"
                  style={{ left: `${ropePosition}%`, width: `${50 - ropePosition}%` }}
                />
              )}
              {/* Peacock Pull Indicator Bar (Right) */}
              {ropePosition > 50 && (
                <div
                  className="absolute top-0 bottom-0 bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-700 ease-out opacity-80"
                  style={{ left: '50%', width: `${ropePosition - 50}%` }}
                />
              )}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 border-2 border-white shadow-lg flex items-center justify-center text-xs font-black text-black transition-all duration-700 ease-out z-10"
                style={{ left: `${ropePosition}%` }}
              >
                🚩
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono font-bold mt-1 px-1">
              <span className="text-amber-900 font-extrabold">🦁 {Math.round(100 - ropePosition)}%</span>
              <span className="text-gray-700 uppercase font-black text-[10px]">
                {ropePosition === 50 ? '⚖️ Center (50-50)' : ropePosition < 50 ? '⬅️ Lion Lead' : 'Peacock Lead ➡️'}
              </span>
              <span className="text-teal-900 font-extrabold">{Math.round(ropePosition)}% 🦚</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TEAM PEACOCK 🦚 (Smaller, High-Visibility Question Card) */}
        <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between bg-white/95 backdrop-blur-xl border-2 border-teal-500 ring-2 ring-teal-400/20">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-teal-200 pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-teal-100 border border-teal-400 flex items-center justify-center text-base shadow-xs">
                  🦚
                </span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-teal-950 leading-tight">TEAM PEACOCK</h3>
                  <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider">Right Pull Station</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-teal-100 border border-teal-300 rounded-full text-xs font-black text-teal-950">
                {scores.peacock} pts
              </span>
            </div>

            {/* High Visibility Question Claim Box */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2.5 py-0.5 bg-teal-600 text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Peacock Claim #{peacockQIndex + 1}
                </span>
                <span className="px-2 py-0.5 bg-teal-100 border border-teal-300 text-teal-950 text-[11px] font-black rounded-full">
                  +{currentPeacockQ.points} Pts
                </span>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-emerald-50/80 border-2 border-teal-400 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 block mb-1">
                  📜 Historical Claim to Verify:
                </span>
                <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                  "{currentPeacockQ.claim}"
                </p>
              </div>
            </div>

            {/* Step 1: True / False */}
            {!peacockFeedback && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-black">
                      1
                    </span>
                    Is this Statement True or False?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setPeacockSelectedTruth(true);
                        if (peacockSelectedSource !== null) {
                          handlePeacockSubmit(true, peacockSelectedSource);
                        }
                      }}
                      className={`py-2 px-3 rounded-lg font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        peacockSelectedTruth === true
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-md ring-2 ring-emerald-300 scale-[1.02]'
                          : 'bg-white hover:bg-emerald-50 border-gray-300 text-slate-900 hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>TRUE</span>
                    </button>
                    <button
                      onClick={() => {
                        setPeacockSelectedTruth(false);
                        if (peacockSelectedSource !== null) {
                          handlePeacockSubmit(false, peacockSelectedSource);
                        }
                      }}
                      className={`py-2 px-3 rounded-lg font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        peacockSelectedTruth === false
                          ? 'bg-rose-600 border-rose-700 text-white shadow-md ring-2 ring-rose-300 scale-[1.02]'
                          : 'bg-white hover:bg-rose-50 border-gray-300 text-slate-900 hover:border-rose-400'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      <span>FALSE</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Source */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                    <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-black">
                      2
                    </span>
                    Cite Primary Source:
                  </label>
                  <div className="space-y-1.5">
                    {currentPeacockQ.sourceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setPeacockSelectedSource(opt);
                          if (peacockSelectedTruth !== null) {
                            handlePeacockSubmit(peacockSelectedTruth, opt);
                          }
                        }}
                        className={`w-full text-left py-2 px-2.5 rounded-lg border-2 text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-1.5 shadow-xs ${
                          peacockSelectedSource === opt
                            ? 'bg-teal-600 border-teal-700 text-white font-black ring-2 ring-teal-300 shadow-sm scale-[1.01]'
                            : 'bg-white hover:bg-teal-50/80 border-gray-200 hover:border-teal-400 text-slate-900'
                        }`}
                      >
                        <span className="leading-tight">{opt}</span>
                        {peacockSelectedSource === opt && <span className="text-white font-black text-xs shrink-0">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback when answered */}
            {peacockFeedback && (
              <div
                className={`p-3 rounded-xl border-2 animate-fade-in shadow-md mt-2 ${
                  peacockFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {peacockFeedback.isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <h4 className="font-black text-xs sm:text-sm">
                    {peacockFeedback.isCorrect ? 'Decisive Pull! Pulled to Peacock 🦚' : 'Incorrect Citation! Tug Holds Center.'}
                  </h4>
                </div>
                <div className="bg-white/90 rounded-lg p-2 border border-emerald-200/60 my-1.5">
                  <p className="text-[11px] sm:text-xs leading-relaxed font-semibold text-slate-800">
                    <strong className="text-slate-900">Explanation:</strong> {peacockFeedback.explanation}
                  </p>
                </div>
                <button
                  onClick={handlePeacockNext}
                  className="w-full mt-2 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation active:scale-95"
                >
                  Next Question 🦚 ➔
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!peacockFeedback && (
            <button
              onClick={() => handlePeacockSubmit()}
              disabled={peacockSelectedTruth === null || peacockSelectedSource === null}
              className={`w-full mt-3 py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                peacockSelectedTruth !== null && peacockSelectedSource !== null
                  ? 'bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white active:scale-95 shadow-teal-500/30'
                  : 'bg-teal-100 text-teal-900/60 border border-teal-300/60 cursor-not-allowed'
              }`}
            >
              {peacockSelectedTruth === null || peacockSelectedSource === null
                ? 'Select Step 1 & 2 to Pull ➔'
                : '🦚 Pull Rope for Peacock! ➔'}
            </button>
          )}
        </div>
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-amber-900/90 via-purple-950/95 to-teal-900/90 border-2 border-amber-400 rounded-3xl p-6 text-center shadow-2xl animate-fade-in text-white">
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-2" />
          <h2 className="text-2xl sm:text-3xl font-black text-amber-200 mb-2">
            {ropePosition <= 20
              ? '🦁 Team Lion Triumphs!'
              : ropePosition >= 80
              ? '🦚 Team Peacock Triumphs!'
              : scores.lion > scores.peacock
              ? '🦁 Team Lion Wins on Points!'
              : '🦚 Team Peacock Wins on Points!'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto mb-5 leading-relaxed">
            The ancient sources have spoken — superior mastery of primary epigraphy, rock edicts, and subcontinental history!
          </p>
          <button
            onClick={handleRematch}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
