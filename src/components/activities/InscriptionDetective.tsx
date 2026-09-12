'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { INSCRIPTION_TABLETS, InscriptionTablet } from '@/data/activityGamesData';
import { OneOnOneScoreboard } from './OneOnOneScoreboard';
import { Search, CheckCircle2, AlertOctagon, Trophy, Sparkles, Scroll } from 'lucide-react';

interface InscriptionDetectiveProps {
  onGameComplete?: (winner: 'p1' | 'p2' | 'tie', scores: { p1: number; p2: number }) => void;
}

export const InscriptionDetective: React.FC<InscriptionDetectiveProps> = ({ onGameComplete }) => {
  const [tabletIndex, setTabletIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [foundErrors, setFoundErrors] = useState<string[]>([]);
  const [lastDiscovered, setLastDiscovered] = useState<{
    distortedText: string;
    truth: string;
    explanation: string;
  } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const activeTablet: InscriptionTablet = INSCRIPTION_TABLETS[tabletIndex];

  const handleSpotPhrase = (phrase: string) => {
    if (isGameOver) return;

    const matchedError = activeTablet.errors.find(e => e.distortedText.toLowerCase() === phrase.toLowerCase());

    if (matchedError) {
      if (foundErrors.includes(matchedError.id)) return; // Already found

      const newFound = [...foundErrors, matchedError.id];
      setFoundErrors(newFound);
      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: prev[activePlayer === 1 ? 'p1' : 'p2'] + 75
      }));

      setLastDiscovered({
        distortedText: matchedError.distortedText,
        truth: matchedError.correctHistoricalTruth,
        explanation: matchedError.explanation
      });

      // Check if all errors in this tablet are found
      if (newFound.length === activeTablet.errors.length) {
        confetti({ particleCount: 80, spread: 70 });
        handleNextTablet();
      }
    } else {
      // False alarm click penalty
      setScores(prev => ({
        ...prev,
        [activePlayer === 1 ? 'p1' : 'p2']: Math.max(0, prev[activePlayer === 1 ? 'p1' : 'p2'] - 20)
      }));
    }

    // Switch turn
    setActivePlayer(prev => (prev === 1 ? 2 : 1));
  };

  const handleNextTablet = () => {
    if (tabletIndex + 1 < INSCRIPTION_TABLETS.length) {
      setTabletIndex(prev => prev + 1);
      setFoundErrors([]);
      setLastDiscovered(null);
    } else {
      setIsGameOver(true);
      confetti({ particleCount: 100, spread: 80 });
      const winner = scores.p1 > scores.p2 ? 'p1' : scores.p2 > scores.p1 ? 'p2' : 'tie';
      onGameComplete?.(winner, scores);
    }
  };

  // Split text into clickable segments/tokens based on errors and surrounding text
  const renderInteractiveText = () => {
    let rawText = activeTablet.fullTextFormatted;
    return (
      <div className="leading-relaxed text-sm sm:text-base text-amber-100/90 font-serif selection:bg-amber-500 selection:text-black">
        {activeTablet.errors.map(err => {
          const isFound = foundErrors.includes(err.id);
          return (
            <div key={err.id} className="inline mr-1">
              <button
                onClick={() => handleSpotPhrase(err.distortedText)}
                className={`px-2 py-1 mx-1 rounded-lg font-bold border transition-all duration-200 ${
                  isFound
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 line-through'
                    : 'bg-amber-950/30 border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 text-amber-200'
                }`}
              >
                {err.distortedText}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full text-[#14213D] space-y-4">
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
              Activity 7 • Inscription Detective
            </span>
            <span className="text-xs text-gray-600 font-semibold">Spot Corrupted Historical Records</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            {activeTablet.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            {activeTablet.location} • Era: {activeTablet.era}
          </p>
        </div>

        <div className="px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900">
          Discovered: {foundErrors.length} / {activeTablet.errors.length} Anachronisms
        </div>
      </div>

      {/* Ancient Stone Inscription Slab */}
      <div className="relative bg-white border-4 border-amber-600/50 rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
          <span className="text-xs uppercase font-serif tracking-widest text-amber-900 font-black flex items-center gap-1.5">
            <Scroll className="w-4 h-4 text-amber-700" /> Chiseled Brahmi Epigraph • Translation
          </span>
          <span className="text-xs text-gray-600 font-bold">Click any suspect phrase below to debunk</span>
        </div>

        {/* The Corrupted Inscription Text */}
        <div className="p-5 bg-amber-50/90 border-2 border-amber-300 rounded-2xl mb-6 shadow-sm">
          <p className="text-base sm:text-lg text-black font-serif leading-loose font-bold">
            "{activeTablet.fullTextFormatted}"
          </p>
        </div>

        {/* Detective Clue Buttons */}
        <div>
          <h4 className="text-xs uppercase font-black text-amber-950 tracking-wider mb-2 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-700" /> Suspect Keywords & Historical Phrases
          </h4>

          <div className="flex flex-wrap gap-2">
            {activeTablet.errors.map(err => {
              const isFound = foundErrors.includes(err.id);
              return (
                <button
                  key={err.id}
                  onClick={() => handleSpotPhrase(err.distortedText)}
                  disabled={isFound || isGameOver}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-black border-2 transition-all ${
                    isFound
                      ? 'bg-emerald-100 border-emerald-600 text-emerald-950 line-through opacity-80 cursor-not-allowed'
                      : 'bg-white border-amber-400 text-black hover:bg-amber-100 hover:border-amber-600 hover:scale-105 active:scale-95 shadow-md'
                  }`}
                >
                  {isFound ? `✅ Debunked: ${err.distortedText}` : `🔍 Examine: "${err.distortedText}"`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Discovered Historical Fact Reveal */}
      {lastDiscovered && (
        <div className="p-5 bg-white border-2 border-emerald-500 rounded-2xl mb-6 shadow-xl animate-fade-in text-black">
          <div className="flex items-center gap-2 text-emerald-800 font-black text-sm sm:text-base mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Historical Error Unmasked: "{lastDiscovered.distortedText}" (+75 pts)
          </div>
          <div className="text-xs sm:text-sm text-amber-900 font-black mb-2">
            Authentic History: {lastDiscovered.truth}
          </div>
          <p className="text-xs sm:text-sm text-gray-800 font-bold">{lastDiscovered.explanation}</p>
        </div>
      )}

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-white border-4 border-amber-500 rounded-3xl p-8 text-center shadow-2xl animate-fade-in text-black">
          <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-black mb-2">
            {scores.p1 > scores.p2
              ? '👑 Player 1 Crowned Master Epigrapher!'
              : scores.p2 > scores.p1
              ? '👑 Player 2 Crowned Master Epigrapher!'
              : 'Scholarly Tie! Both Unlocked Ancient Secrets!'}
          </h2>
          <p className="text-base font-bold text-gray-700 mb-6">
            Player 1 ({scores.p1} pts) vs Player 2 ({scores.p2} pts)
          </p>
          <button
            onClick={() => {
              setTabletIndex(0);
              setActivePlayer(1);
              setScores({ p1: 0, p2: 0 });
              setFoundErrors([]);
              setLastDiscovered(null);
              setIsGameOver(false);
            }}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Inspect New Inscriptions ↺
          </button>
        </div>
      )}
    </div>
  );
};
