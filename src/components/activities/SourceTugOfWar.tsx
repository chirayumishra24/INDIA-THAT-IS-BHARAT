'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SOURCE_TUG_QUESTIONS, SourceTugQuestion } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { Zap, CheckCircle, XCircle, Shield, Award, HelpCircle } from 'lucide-react';

interface SourceTugOfWarProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const SourceTugOfWar: React.FC<SourceTugOfWarProps> = ({ onGameComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [ropePosition, setRopePosition] = useState(50); // 50 is center (0 = full Lion, 100 = full Peacock)
  const [buzzedTeam, setBuzzedTeam] = useState<'lion' | 'peacock' | null>(null);
  const [selectedTruth, setSelectedTruth] = useState<boolean | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ: SourceTugQuestion = SOURCE_TUG_QUESTIONS[currentQIndex];

  const handleBuzzer = (team: 'lion' | 'peacock') => {
    if (buzzedTeam !== null || showFeedback || isGameOver) return;
    setBuzzedTeam(team);
  };

  const handleVerifyAnswer = () => {
    if (selectedTruth === null || selectedSource === null || !buzzedTeam) return;

    const truthCorrect = selectedTruth === currentQ.isTrue;
    const sourceCorrect = selectedSource === currentQ.correctSource;
    const allCorrect = truthCorrect && sourceCorrect;

    setIsCorrect(allCorrect);
    setShowFeedback(true);

    if (allCorrect) {
      // Award points & pull rope
      const deltaPull = buzzedTeam === 'lion' ? -12 : 12;
      const newPos = Math.max(5, Math.min(95, ropePosition + deltaPull));
      setRopePosition(newPos);

      setScores(prev => ({
        ...prev,
        [buzzedTeam]: prev[buzzedTeam] + currentQ.points
      }));

      // Check win condition
      if (newPos <= 10 || newPos >= 90) {
        handleGameFinish(newPos <= 10 ? 'lion' : 'peacock');
      }
    } else {
      // Penalty: Slip rope toward opponent
      const deltaSlip = buzzedTeam === 'lion' ? 8 : -8;
      const newPos = Math.max(5, Math.min(95, ropePosition + deltaSlip));
      setRopePosition(newPos);

      const otherTeam = buzzedTeam === 'lion' ? 'peacock' : 'lion';
      setScores(prev => ({
        ...prev,
        [otherTeam]: prev[otherTeam] + 30
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < SOURCE_TUG_QUESTIONS.length && !isGameOver) {
      setCurrentQIndex(prev => prev + 1);
      setBuzzedTeam(null);
      setSelectedTruth(null);
      setSelectedSource(null);
      setShowFeedback(false);
    } else {
      const winner =
        ropePosition < 50
          ? 'lion'
          : ropePosition > 50
          ? 'peacock'
          : scores.lion > scores.peacock
          ? 'lion'
          : scores.peacock > scores.lion
          ? 'peacock'
          : 'tie';
      handleGameFinish(winner);
    }
  };

  const handleGameFinish = (winner: 'lion' | 'peacock' | 'tie') => {
    setIsGameOver(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    onGameComplete?.(winner, scores);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white/85 backdrop-blur-xl rounded-3xl border border-amber-500/40 text-[#14213D] shadow-2xl">
      {/* Persistent Team Scoreboard with Buzzers */}
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        roundNumber={currentQIndex + 1}
        totalRounds={SOURCE_TUG_QUESTIONS.length}
        showBuzzers={!showFeedback && !isGameOver}
        onBuzzer={handleBuzzer}
        buzzedTeam={buzzedTeam}
      />

      {/* Visual Rope Tug-of-War Arena */}
      <div className="bg-amber-50/80 backdrop-blur-md p-5 rounded-2xl border border-amber-200 mb-6 shadow-inner relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-black text-gray-700 mb-2">
          <span className="text-amber-800 flex items-center gap-1 font-black">
            🦁 Lion Goal Zone
          </span>
          <span className="text-gray-500 uppercase tracking-widest text-[10px]">
            Dynamic Rope Physics
          </span>
          <span className="text-teal-800 flex items-center gap-1 font-black">
            Peacock Goal Zone 🦚
          </span>
        </div>

        {/* Rope Track */}
        <div className="relative h-12 w-full bg-white/90 rounded-full border border-amber-300 flex items-center px-4 overflow-hidden shadow-inner">
          {/* Center Marker Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 -translate-x-1/2 z-0 border-l border-dashed border-gray-400"></div>

          {/* Rope Texture */}
          <div className="w-full h-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-teal-600 rounded-full relative shadow-inner">
            {/* The Moving Tug Flag */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 border-2 border-white shadow-xl flex items-center justify-center text-xs font-black text-black transition-all duration-700 ease-out z-10"
              style={{ left: `${ropePosition}%` }}
            >
              🚩
            </div>
          </div>
        </div>

        {/* Distance percentages */}
        <div className="flex justify-between text-[11px] font-mono text-gray-600 font-bold mt-2">
          <span className="text-amber-800">{Math.round(100 - ropePosition)}% Pull</span>
          <span className="text-gray-500">Center: 50%</span>
          <span className="text-teal-800">{Math.round(ropePosition)}% Pull</span>
        </div>
      </div>

      {/* Buzzer instruction when nobody has buzzed yet */}
      {buzzedTeam === null && !isGameOver && (
        <div className="text-center py-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-6 animate-pulse">
          <Zap className="w-6 h-6 text-amber-400 mx-auto mb-1" />
          <span className="text-sm font-bold text-amber-200">
            Read the claim below and HIT YOUR TEAM BUZZER above to answer!
          </span>
        </div>
      )}

      {/* Claim & Question Card */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-full">
            Historical Claim #{currentQIndex + 1}
          </span>
          <span className="text-xs text-gray-400">{currentQ.points} Points at Stake</span>
        </div>

        <h3 className="text-base sm:text-xl font-bold text-gray-100 leading-relaxed mb-6">
          "{currentQ.claim}"
        </h3>

        {/* Buzzed Team Prompt */}
        {buzzedTeam !== null && !showFeedback && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              {buzzedTeam === 'lion' ? 'Team Lion 🦁' : 'Team Peacock 🦚'} has control of the floor!
            </div>

            {/* Step 1: True or False */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-gray-400 block mb-2">
                Step 1: Is this Historical Statement True or False?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedTruth(true)}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 ${
                    selectedTruth === true
                      ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> TRUE
                </button>
                <button
                  onClick={() => setSelectedTruth(false)}
                  className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 ${
                    selectedTruth === false
                      ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-950'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750'
                  }`}
                >
                  <XCircle className="w-4 h-4" /> FALSE
                </button>
              </div>
            </div>

            {/* Step 2: Select Correct Source */}
            <div>
              <label className="text-xs uppercase tracking-wider font-bold text-gray-400 block mb-2">
                Step 2: Cite the Authoritative Primary Source / Fact:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.sourceOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSource(opt)}
                    className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      selectedSource === opt
                        ? 'bg-indigo-600/40 border-indigo-400 text-indigo-100 ring-2 ring-indigo-400/40'
                        : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Verification Button */}
            <button
              onClick={handleVerifyAnswer}
              disabled={selectedTruth === null || selectedSource === null}
              className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-xl ${
                selectedTruth !== null && selectedSource !== null
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black active:scale-95'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Lock in Answer & Pull Rope! ➔
            </button>
          </div>
        )}

        {/* Feedback Section */}
        {showFeedback && (
          <div
            className={`p-5 rounded-2xl border-2 animate-fade-in ${
              isCorrect
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                : 'bg-rose-950/60 border-rose-500 text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400" />
              )}
              <h4 className="font-bold text-base">
                {isCorrect ? 'Decisive Pull! Full Points Awarded!' : 'Faulty Citation! Rope Slipped to Opponent!'}
              </h4>
            </div>

            <p className="text-xs sm:text-sm mb-4 leading-relaxed opacity-90">
              {currentQ.explanation}
            </p>

            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-md"
            >
              Next Round ➔
            </button>
          </div>
        )}
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
            The ancient sources have spoken — superior mastery of primary epigraphy and literature!
          </p>
          <button
            onClick={() => {
              setCurrentQIndex(0);
              setScores({ lion: 0, peacock: 0 });
              setRopePosition(50);
              setBuzzedTeam(null);
              setSelectedTruth(null);
              setSelectedSource(null);
              setShowFeedback(false);
              setIsGameOver(false);
            }}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Play Rematch ↺
          </button>
        </div>
      )}
    </div>
  );
};
