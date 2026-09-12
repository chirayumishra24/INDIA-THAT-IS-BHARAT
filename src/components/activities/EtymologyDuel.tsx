'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ETYMOLOGY_DUEL_CHAINS, EtymologyDuelChain } from '@/data/activityGamesData';
import { OneOnOneScoreboard } from './OneOnOneScoreboard';
import { Zap, Sparkles, Trophy, ArrowRight, ShieldAlert } from 'lucide-react';

interface EtymologyDuelProps {
  onGameComplete?: (winner: 'p1' | 'p2' | 'tie', scores: { p1: number; p2: number }) => void;
}

export const EtymologyDuel: React.FC<EtymologyDuelProps> = ({ onGameComplete }) => {
  const [chainIndex, setChainIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [streaks, setStreaks] = useState({ p1: 0, p2: 0 });

  const activeChain: EtymologyDuelChain = ETYMOLOGY_DUEL_CHAINS[chainIndex];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [optionsPool, setOptionsPool] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<{ text: string; isGood: boolean } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Setup turn
  const setupStep = (chainIdx: number, stepIdx: number) => {
    const chain = ETYMOLOGY_DUEL_CHAINS[chainIdx];
    const targetWord = chain.steps[stepIdx].word;

    // Collect all unique words across chains to create decoys
    const allWords = ETYMOLOGY_DUEL_CHAINS.flatMap(c => c.steps.map(s => s.word));
    const decoys = allWords.filter(w => w !== targetWord).sort(() => Math.random() - 0.5).slice(0, 3);
    const pool = [targetWord, ...decoys].sort(() => Math.random() - 0.5);

    setOptionsPool(pool);
    setFeedback(null);
  };

  useEffect(() => {
    setupStep(chainIndex, currentStepIndex);
  }, [chainIndex, currentStepIndex]);

  // Timer
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activePlayer, isGameOver]);

  const handleTimeOut = () => {
    setFeedback({ text: `⏰ Time ran out for Player ${activePlayer}!`, isGood: false });
    setStreaks(prev => ({ ...prev, [activePlayer === 1 ? 'p1' : 'p2']: 0 }));
    handleNextTurn();
  };

  const handleSelectWord = (word: string) => {
    if (isGameOver) return;

    const expectedWord = activeChain.steps[currentStepIndex].word;
    const isCorrect = word === expectedWord;

    if (isCorrect) {
      const bonus = (streaks[activePlayer === 1 ? 'p1' : 'p2'] + 1) * 10;
      const pts = 50 + bonus + Math.floor(timeLeft);

      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + pts
      }));

      setStreaks(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + 1
      }));

      setFeedback({
        text: `⚡ Flawless! "${word}" matches step ${currentStepIndex + 1}! (+${pts} pts)`,
        isGood: true
      });

      if (currentStepIndex + 1 < activeChain.steps.length) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Chain completed!
        confetti({ particleCount: 70, spread: 60 });
        handleNextChainOrEnd();
      }
    } else {
      setStreaks(prev => ({ ...prev, [activePlayer === 1 ? 'p1' : 'p2']: 0 }));
      setFeedback({
        text: `❌ Phonetic mismatch! "${word}" is not the next evolutionary step. Turn passes to Player ${activePlayer === 1 ? 2 : 1}!`,
        isGood: false
      });
      setTimeout(() => {
        handleNextTurn();
      }, 1200);
    }
  };

  const handleNextTurn = () => {
    setActivePlayer(prev => (prev === 1 ? 2 : 1));
    setTimeLeft(30);
  };

  const handleNextChainOrEnd = () => {
    if (chainIndex + 1 < ETYMOLOGY_DUEL_CHAINS.length) {
      setChainIndex(prev => prev + 1);
      setCurrentStepIndex(0);
      setActivePlayer(prev => (prev === 1 ? 2 : 1));
      setTimeLeft(30);
    } else {
      setIsGameOver(true);
      confetti({ particleCount: 100, spread: 80 });
      const winner = scores.p1 > scores.p2 ? 'p1' : scores.p2 > scores.p1 ? 'p2' : 'tie';
      onGameComplete?.(winner, scores);
    }
  };

  return (
    <div className="w-full text-[#14213D] space-y-4">
      <OneOnOneScoreboard
        player1Score={scores.p1}
        player2Score={scores.p2}
        activePlayer={activePlayer}
        timeLeft={timeLeft}
        streakP1={streaks.p1}
        streakP2={streaks.p2}
      />

      {/* Header Info */}
      <div className="bg-indigo-50/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-indigo-200 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-indigo-200 text-indigo-950 text-xs font-black rounded-full border border-indigo-300 uppercase">
              Activity 6 • 1v1 Etymology Duel
            </span>
            <span className="text-xs text-amber-800 font-bold">{activeChain.lineage} Lineage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
            {activeChain.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            Current turn: <strong className={activePlayer === 1 ? 'text-indigo-800' : 'text-rose-800'}>Player {activePlayer}</strong> • Identify the next phonetic shift!
          </p>
        </div>

        <div className="px-3 py-1.5 bg-indigo-100 border border-indigo-300 rounded-xl text-xs font-bold text-indigo-900">
          Step {currentStepIndex + 1} of {activeChain.steps.length}
        </div>
      </div>

      {/* Chain Progress Visualization */}
      <div className="mb-6 bg-white p-4 rounded-2xl border-2 border-indigo-200 shadow-md">
        <div className="flex items-center justify-between text-xs text-gray-700 mb-3 font-bold">
          <span>Evolution Path</span>
          <span className="text-indigo-900 font-black">Target: {activeChain.steps[currentStepIndex]?.culture}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeChain.steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <React.Fragment key={idx}>
                <div
                  className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
                    isCompleted
                      ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 shadow-sm'
                      : isCurrent
                      ? 'bg-indigo-600 border-2 border-indigo-700 text-white animate-pulse shadow-md ring-2 ring-indigo-400/50'
                      : 'bg-gray-100 border border-gray-300 text-gray-700'
                  }`}
                >
                  {isCompleted ? step.word : isCurrent ? `❓ Stage ${idx + 1}` : `Locked`}
                </div>
                {idx < activeChain.steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl border-2 mb-6 text-xs sm:text-sm font-bold animate-fade-in ${
            feedback.isGood
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
              : 'bg-rose-50 border-rose-500 text-rose-950'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Clue Prompt */}
      {!isGameOver && (
        <div className="bg-white border-2 border-amber-400 p-5 rounded-2xl mb-6 shadow-md">
          <div className="text-xs uppercase font-black text-amber-900 tracking-wider mb-1">
            Historical Clue ({activeChain.steps[currentStepIndex]?.approxYear})
          </div>
          <p className="text-base sm:text-lg text-black font-extrabold leading-relaxed">
            "{activeChain.steps[currentStepIndex]?.phoneticShift}"
          </p>
        </div>
      )}

      {/* Multiple Choice Pool */}
      {!isGameOver && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {optionsPool.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectWord(word)}
              className="p-4 sm:p-5 bg-white hover:bg-indigo-50 border-2 border-gray-300 hover:border-indigo-600 rounded-2xl font-black text-base sm:text-lg text-black text-left transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-black font-black">{word}</span>
                <Zap className="w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-white border-4 border-indigo-500 rounded-3xl p-8 text-center shadow-2xl animate-fade-in text-black">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-black mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Claims Etymology Mastery!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Claims Etymology Mastery!'
              : 'Duel Tied! Linguistic Brilliance from Both!'}
          </h2>
          <p className="text-base font-bold text-gray-700 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={() => {
              setChainIndex(0);
              setCurrentStepIndex(0);
              setActivePlayer(1);
              setScores({ p1: 0, p2: 0 });
              setStreaks({ p1: 0, p2: 0 });
              setTimeLeft(30);
              setIsGameOver(false);
            }}
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Rematch Duel ↺
          </button>
        </div>
      )}
    </div>
  );
};
