'use client';

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { SOURCE_TUG_QUESTIONS } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { CheckCircle, XCircle, Shield, Award, Volume2, VolumeX, Sparkles, Zap } from 'lucide-react';

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

  // Separate, non-overlapping questions for both teams:
  // Team Lion gets even questions (0, 2, 4, 6...)
  const [lionQIndex, setLionQIndex] = useState(0);
  const [lionSelectedTruth, setLionSelectedTruth] = useState<boolean | null>(null);
  const [lionSelectedSource, setLionSelectedSource] = useState<string | null>(null);
  const [lionFeedback, setLionFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  // Team Peacock gets odd questions (1, 3, 5, 7...)
  const [peacockQIndex, setPeacockQIndex] = useState(1);
  const [peacockSelectedTruth, setPeacockSelectedTruth] = useState<boolean | null>(null);
  const [peacockSelectedSource, setPeacockSelectedSource] = useState<string | null>(null);
  const [peacockFeedback, setPeacockFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const currentLionQ = SOURCE_TUG_QUESTIONS[lionQIndex % SOURCE_TUG_QUESTIONS.length];
  const currentPeacockQ = SOURCE_TUG_QUESTIONS[peacockQIndex % SOURCE_TUG_QUESTIONS.length];

  // Team Lion Answer Handler
  const handleLionSubmit = () => {
    if (lionSelectedTruth === null || lionSelectedSource === null || isGameOver || lionFeedback) return;
    const isCorrect = lionSelectedTruth === currentLionQ.isTrue && lionSelectedSource === currentLionQ.correctSource;

    setLionFeedback({ isCorrect, explanation: currentLionQ.explanation });

    if (isCorrect) {
      const newPos = Math.max(10, ropePosition - 10);
      setRopePosition(newPos);
      setScores(prev => ({ ...prev, lion: prev.lion + currentLionQ.points }));
      setLastPullNotice('🦁 Lion Pull! +10% toward Lion Goal!');
      if (newPos <= 15) {
        handleGameFinish('lion');
      }
    } else {
      // Wrong answer: Tug remains centered — opponent receives no free pull or free points!
      setRopePosition(50);
      setScores(prev => ({ ...prev, lion: Math.max(0, prev.lion - 15) }));
      setLastPullNotice('⚠️ Lion Error! Tug holds center — Peacock receives no free pull.');
    }
  };

  const handleLionNext = () => {
    setLionFeedback(null);
    setLionSelectedTruth(null);
    setLionSelectedSource(null);
    setLionQIndex(prev => (prev + 2) % SOURCE_TUG_QUESTIONS.length);
  };

  // Team Peacock Answer Handler
  const handlePeacockSubmit = () => {
    if (peacockSelectedTruth === null || peacockSelectedSource === null || isGameOver || peacockFeedback) return;
    const isCorrect = peacockSelectedTruth === currentPeacockQ.isTrue && peacockSelectedSource === currentPeacockQ.correctSource;

    setPeacockFeedback({ isCorrect, explanation: currentPeacockQ.explanation });

    if (isCorrect) {
      const newPos = Math.min(90, ropePosition + 10);
      setRopePosition(newPos);
      setScores(prev => ({ ...prev, peacock: prev.peacock + currentPeacockQ.points }));
      setLastPullNotice('🦚 Peacock Pull! +10% toward Peacock Goal!');
      if (newPos >= 85) {
        handleGameFinish('peacock');
      }
    } else {
      // Wrong answer: Tug remains centered — opponent receives no free pull or free points!
      setRopePosition(50);
      setScores(prev => ({ ...prev, peacock: Math.max(0, prev.peacock - 15) }));
      setLastPullNotice('⚠️ Peacock Error! Tug holds center — Lion receives no free pull.');
    }
  };

  const handlePeacockNext = () => {
    setPeacockFeedback(null);
    setPeacockSelectedTruth(null);
    setPeacockSelectedSource(null);
    setPeacockQIndex(prev => (prev + 2) % SOURCE_TUG_QUESTIONS.length);
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
    setPeacockQIndex(1);
    setPeacockSelectedTruth(null);
    setPeacockSelectedSource(null);
    setPeacockFeedback(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-amber-500/40 text-[#14213D] shadow-2xl">
      {/* Persistent Team Scoreboard */}
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        roundNumber={Math.floor((lionQIndex + peacockQIndex) / 2) + 1}
        totalRounds={SOURCE_TUG_QUESTIONS.length}
        showBuzzers={false}
      />

      {/* 3-Column Arena: Team Lion (Left) — Live Tug Video (Center) — Team Peacock (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start mb-6">
        
        {/* LEFT COLUMN: TEAM LION 🦁 */}
        <div className="lg:col-span-4 bg-white/95 border-2 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-400 flex items-center justify-center text-lg shadow-sm">
                  🦁
                </span>
                <div>
                  <h3 className="font-black text-base text-amber-950">TEAM LION</h3>
                  <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Left Pull Station</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-black text-amber-900">
                {scores.lion} pts
              </span>
            </div>

            {/* Question Claim Badge & Text */}
            <div className="mb-3">
              <span className="px-2.5 py-0.5 bg-amber-100 border border-amber-300 text-amber-950 text-[11px] font-black rounded-full inline-block mb-1.5 shadow-sm">
                Lion Claim #{lionQIndex + 1} • {currentLionQ.points} Pts
              </span>
              <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-3 shadow-inner">
                <p className="text-xs sm:text-sm font-black text-amber-950 leading-relaxed">
                  "{currentLionQ.claim}"
                </p>
              </div>
            </div>

            {/* Step 1: True / False */}
            {!lionFeedback && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-amber-950 block mb-1.5">
                    Step 1: Is this Statement True or False?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLionSelectedTruth(true)}
                      className={`py-2 px-3 rounded-xl font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 ${
                        lionSelectedTruth === true
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-md ring-2 ring-emerald-300'
                          : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100 shadow-sm'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> TRUE
                    </button>
                    <button
                      onClick={() => setLionSelectedTruth(false)}
                      className={`py-2 px-3 rounded-xl font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 ${
                        lionSelectedTruth === false
                          ? 'bg-rose-600 border-rose-700 text-white shadow-md ring-2 ring-rose-300'
                          : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100 shadow-sm'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" /> FALSE
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Source */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-amber-950 block mb-1.5">
                    Step 2: Cite Primary Source:
                  </label>
                  <div className="space-y-1.5">
                    {currentLionQ.sourceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setLionSelectedSource(opt)}
                        className={`w-full text-left p-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                          lionSelectedSource === opt
                            ? 'bg-amber-500 border-amber-600 text-black font-black ring-2 ring-amber-300 shadow-sm'
                            : 'bg-white hover:bg-amber-50 border-gray-200 hover:border-amber-300 text-gray-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback when answered */}
            {lionFeedback && (
              <div
                className={`p-3.5 rounded-2xl border-2 animate-fade-in shadow-md mt-2 ${
                  lionFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {lionFeedback.isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                  <h4 className="font-black text-xs sm:text-sm">
                    {lionFeedback.isCorrect ? 'Decisive Pull! +10% Left!' : 'Incorrect! Tug Holds Center.'}
                  </h4>
                </div>
                <p className="text-[11px] leading-relaxed font-semibold text-gray-800">
                  {lionFeedback.explanation}
                </p>
                <button
                  onClick={handleLionNext}
                  className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow"
                >
                  Next Lion Question ➔
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!lionFeedback && (
            <button
              onClick={handleLionSubmit}
              disabled={lionSelectedTruth === null || lionSelectedSource === null}
              className={`w-full mt-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                lionSelectedTruth !== null && lionSelectedSource !== null
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black active:scale-95'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              🦁 Pull Rope for Lion! ➔
            </button>
          )}
        </div>

        {/* CENTER COLUMN: LIVE TUG-OF-WAR ARENA VIDEO ⚔️ */}
        <div className="lg:col-span-4 bg-amber-50/95 backdrop-blur-md p-4 rounded-3xl border-2 border-amber-300 shadow-2xl flex flex-col justify-between">
          {/* Arena Control Header */}
          <div className="flex items-center justify-between text-xs font-black mb-2">
            <span className="text-amber-950 font-black flex items-center gap-1">
              🦁 {Math.round(100 - ropePosition)}% Control
            </span>

            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 bg-amber-200 border border-amber-400 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-950 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Live Tug Arena
              </span>
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                  }
                  setIsMuted(!isMuted);
                }}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="p-1 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors shadow-sm"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>

            <span className="text-teal-950 font-black flex items-center gap-1">
              {Math.round(ropePosition)}% Control 🦚
            </span>
          </div>

          {/* Animated Video Frame with Physics Shift */}
          <div className="relative w-full h-[220px] sm:h-[260px] bg-white rounded-2xl border-2 border-amber-200 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Goal Line Zone: Lion (Left) */}
            <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-500/30 to-transparent z-10 pointer-events-none flex items-center pl-1 transition-opacity duration-300 ${ropePosition <= 30 ? 'opacity-100 animate-pulse' : 'opacity-30'}`}>
              <div className="h-4/5 w-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] border border-amber-300" />
            </div>

            {/* Goal Line Zone: Peacock (Right) */}
            <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-teal-500/30 to-transparent z-10 pointer-events-none flex items-center justify-end pr-1 transition-opacity duration-300 ${ropePosition >= 70 ? 'opacity-100 animate-pulse' : 'opacity-30'}`}>
              <div className="h-4/5 w-1 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)] border border-teal-300" />
            </div>

            {/* Center Reference Mark */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-gray-300 z-10 pointer-events-none" />

            {/* Video Shifted by Tug Physics */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(${(ropePosition - 50) * 0.9}%)`
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

            {/* Dynamic Pull Action Overlay */}
            {lastPullNotice && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-black/85 backdrop-blur-md border border-amber-400 text-amber-300 text-[10px] font-black rounded-full shadow-lg text-center whitespace-nowrap animate-bounce">
                {lastPullNotice}
              </div>
            )}
          </div>

          {/* Precision Rope Tension Gauge */}
          <div className="mt-3">
            <div className="relative h-4 w-full bg-white rounded-full border border-amber-300 overflow-hidden shadow-inner flex items-center px-1">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 -translate-x-1/2 z-0" />
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 border border-white shadow-md flex items-center justify-center text-[10px] font-black text-black transition-all duration-700 ease-out z-10"
                style={{ left: `${ropePosition}%` }}
              >
                🚩
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono font-bold mt-1 px-1">
              <span className="text-amber-900">🦁 {Math.round(100 - ropePosition)}% Pull</span>
              <span className="text-gray-500 uppercase">Center: 50%</span>
              <span className="text-teal-900">{Math.round(ropePosition)}% Pull 🦚</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TEAM PEACOCK 🦚 */}
        <div className="lg:col-span-4 bg-white/95 border-2 border-teal-400 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-teal-200 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-teal-100 border border-teal-400 flex items-center justify-center text-lg shadow-sm">
                  🦚
                </span>
                <div>
                  <h3 className="font-black text-base text-teal-950">TEAM PEACOCK</h3>
                  <span className="text-[10px] text-teal-800 font-bold uppercase tracking-wider">Right Pull Station</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-teal-100 border border-teal-300 rounded-full text-xs font-black text-teal-900">
                {scores.peacock} pts
              </span>
            </div>

            {/* Question Claim Badge & Text */}
            <div className="mb-3">
              <span className="px-2.5 py-0.5 bg-teal-100 border border-teal-300 text-teal-950 text-[11px] font-black rounded-full inline-block mb-1.5 shadow-sm">
                Peacock Claim #{peacockQIndex + 1} • {currentPeacockQ.points} Pts
              </span>
              <div className="bg-teal-50/80 border border-teal-300/80 rounded-2xl p-3 shadow-inner">
                <p className="text-xs sm:text-sm font-black text-teal-950 leading-relaxed">
                  "{currentPeacockQ.claim}"
                </p>
              </div>
            </div>

            {/* Step 1: True / False */}
            {!peacockFeedback && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-teal-950 block mb-1.5">
                    Step 1: Is this Statement True or False?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPeacockSelectedTruth(true)}
                      className={`py-2 px-3 rounded-xl font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 ${
                        peacockSelectedTruth === true
                          ? 'bg-emerald-600 border-emerald-700 text-white shadow-md ring-2 ring-emerald-300'
                          : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100 shadow-sm'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> TRUE
                    </button>
                    <button
                      onClick={() => setPeacockSelectedTruth(false)}
                      className={`py-2 px-3 rounded-xl font-black text-xs border-2 transition-all flex items-center justify-center gap-1.5 ${
                        peacockSelectedTruth === false
                          ? 'bg-rose-600 border-rose-700 text-white shadow-md ring-2 ring-rose-300'
                          : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100 shadow-sm'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" /> FALSE
                    </button>
                  </div>
                </div>

                {/* Step 2: Select Source */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-black text-teal-950 block mb-1.5">
                    Step 2: Cite Primary Source:
                  </label>
                  <div className="space-y-1.5">
                    {currentPeacockQ.sourceOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setPeacockSelectedSource(opt)}
                        className={`w-full text-left p-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                          peacockSelectedSource === opt
                            ? 'bg-teal-600 border-teal-700 text-white font-black ring-2 ring-teal-300 shadow-sm'
                            : 'bg-white hover:bg-teal-50 border-gray-200 hover:border-teal-300 text-gray-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback when answered */}
            {peacockFeedback && (
              <div
                className={`p-3.5 rounded-2xl border-2 animate-fade-in shadow-md mt-2 ${
                  peacockFeedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                    : 'bg-rose-50 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {peacockFeedback.isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600" />
                  )}
                  <h4 className="font-black text-xs sm:text-sm">
                    {peacockFeedback.isCorrect ? 'Decisive Pull! +10% Right!' : 'Incorrect! Tug Holds Center.'}
                  </h4>
                </div>
                <p className="text-[11px] leading-relaxed font-semibold text-gray-800">
                  {peacockFeedback.explanation}
                </p>
                <button
                  onClick={handlePeacockNext}
                  className="w-full mt-3 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow"
                >
                  Next Peacock Question ➔
                </button>
              </div>
            )}
          </div>

          {/* Action Button */}
          {!peacockFeedback && (
            <button
              onClick={handlePeacockSubmit}
              disabled={peacockSelectedTruth === null || peacockSelectedSource === null}
              className={`w-full mt-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                peacockSelectedTruth !== null && peacockSelectedSource !== null
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white active:scale-95'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              🦚 Pull Rope for Peacock! ➔
            </button>
          )}
        </div>
      </div>

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-amber-900/60 via-purple-950/80 to-teal-900/60 border-2 border-amber-400 rounded-3xl p-6 text-center shadow-2xl animate-fade-in">
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
          <p className="text-sm text-gray-300 mb-6">
            The ancient sources have spoken — superior mastery of primary epigraphy and subcontinental history!
          </p>
          <button
            onClick={handleRematch}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
