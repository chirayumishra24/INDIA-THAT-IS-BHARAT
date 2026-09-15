'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { NAME_TRAIL_CHAINS, NameTrailItem } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, Timer, ShieldAlert, Shuffle } from 'lucide-react';

interface NameTrailRelayProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const NameTrailRelay: React.FC<NameTrailRelayProps> = ({ onGameComplete }) => {
  const [chainIndex, setChainIndex] = useState(0);
  const [activeTeam, setActiveTeam] = useState<'lion' | 'peacock'>('lion');
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [isMatchComplete, setIsMatchComplete] = useState(false);
  const [teamQuestionIndices, setTeamQuestionIndices] = useState<{ lion: number; peacock: number }>({
    lion: 0,
    peacock: 1
  });

  const activeChain = NAME_TRAIL_CHAINS[chainIndex] || NAME_TRAIL_CHAINS[0];

  // Shuffled items for pool
  const [availableItems, setAvailableItems] = useState<NameTrailItem[]>([]);
  const [placedSlots, setPlacedSlots] = useState<(NameTrailItem | null)[]>([]);
  const [isFreeze, setIsFreeze] = useState(false);
  const [freezeCountdown, setFreezeCountdown] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [roundWinner, setRoundWinner] = useState<string | null>(null);

  // Initialize round with distinct questions for each team
  const startRoundForTeam = (team: 'lion' | 'peacock', qIndex: number) => {
    const chain = NAME_TRAIL_CHAINS[qIndex] || NAME_TRAIL_CHAINS[0];
    const shuffled = [...chain.items].sort(() => Math.random() - 0.5);
    setChainIndex(qIndex);
    setActiveTeam(team);
    setAvailableItems(shuffled);
    setPlacedSlots(new Array(chain.items.length).fill(null));
    setTimerSeconds(60);
    setIsRoundOver(false);
    setRoundWinner(null);
    setIsFreeze(false);
  };

  useEffect(() => {
    // Start with a randomized distinct question pair
    const total = NAME_TRAIL_CHAINS.length;
    const initialLion = Math.floor(Math.random() * total);
    const initialPeacock = (initialLion + 1 + Math.floor(Math.random() * (total - 1))) % total;
    setTeamQuestionIndices({ lion: initialLion, peacock: initialPeacock });
    startRoundForTeam('lion', initialLion);
  }, []);

  const handleSwitchQuestion = (specificIndex?: number) => {
    if (isRoundOver || isMatchComplete) return;
    const total = NAME_TRAIL_CHAINS.length;
    let nextIdx: number;

    if (specificIndex !== undefined) {
      nextIdx = specificIndex;
    } else {
      const rivalTeam = activeTeam === 'lion' ? 'peacock' : 'lion';
      const rivalIdx = teamQuestionIndices[rivalTeam];
      let candidate = (chainIndex + 1) % total;
      if (candidate === rivalIdx && total > 2) {
        candidate = (candidate + 1) % total;
      }
      nextIdx = candidate;
    }

    setTeamQuestionIndices(prev => ({
      ...prev,
      [activeTeam]: nextIdx
    }));
    startRoundForTeam(activeTeam, nextIdx);
  };

  // Timer countdown
  useEffect(() => {
    if (isRoundOver || isFreeze || isMatchComplete) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRoundEnd(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRoundOver, isFreeze, isMatchComplete]);

  // Freeze penalty countdown
  useEffect(() => {
    if (!isFreeze) return;
    const interval = setInterval(() => {
      setFreezeCountdown(prev => {
        if (prev <= 1) {
          setIsFreeze(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFreeze]);

  const handlePlaceItem = (item: NameTrailItem) => {
    if (isFreeze || isRoundOver || isMatchComplete) return;

    // Find next empty slot
    const nextSlotIndex = placedSlots.findIndex(s => s === null);
    if (nextSlotIndex === -1) return;

    const expectedOrder = nextSlotIndex + 1;

    if (item.orderIndex === expectedOrder) {
      // Correct placement!
      const newSlots = [...placedSlots];
      newSlots[nextSlotIndex] = item;
      setPlacedSlots(newSlots);
      setAvailableItems(prev => prev.filter(i => i.id !== item.id));

      const pointsEarned = 30 + Math.floor(timerSeconds / 2);
      setScores(prev => ({
        ...prev,
        [activeTeam]: prev[activeTeam] + pointsEarned
      }));

      // Check if chain is complete
      if (nextSlotIndex + 1 === activeChain.items.length) {
        handleRoundEnd(true);
      }
    } else {
      // Wrong placement penalty!
      setIsFreeze(true);
      setFreezeCountdown(3);
      setScores(prev => ({
        ...prev,
        [activeTeam]: Math.max(0, prev[activeTeam] - 10)
      }));
    }
  };

  const handleRoundEnd = (isSuccess: boolean) => {
    setIsRoundOver(true);
    if (isSuccess) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setRoundWinner(
        activeTeam === 'lion'
          ? `Team Lion 🦁 Solved "${activeChain.title.split(':')[0]}"!`
          : `Team Peacock 🦚 Solved "${activeChain.title.split(':')[0]}"!`
      );
    } else {
      setRoundWinner(
        activeTeam === 'lion'
          ? `Team Lion 🦁: Time Expired on "${activeChain.title.split(':')[0]}"!`
          : `Team Peacock 🦚: Time Expired on "${activeChain.title.split(':')[0]}"!`
      );
    }

    if (activeTeam === 'peacock') {
      setIsMatchComplete(true);
      const finalWinner = scores.lion > scores.peacock ? 'lion' : scores.peacock > scores.lion ? 'peacock' : 'tie';
      onGameComplete?.(finalWinner, scores);
    }
  };

  const handleNextTurnOrRound = () => {
    if (activeTeam === 'lion') {
      // Peacock gets a completely DIFFERENT question from pool
      startRoundForTeam('peacock', teamQuestionIndices.peacock);
    } else {
      // Pick a fresh pair of distinct questions from pool for rematch
      const total = NAME_TRAIL_CHAINS.length;
      const nextLion = (teamQuestionIndices.lion + 2) % total;
      const nextPeacock = (nextLion + 1) % total;
      setTeamQuestionIndices({ lion: nextLion, peacock: nextPeacock });
      setScores({ lion: 0, peacock: 0 });
      setIsMatchComplete(false);
      startRoundForTeam('lion', nextLion);
    }
  };

  return (
    <div className="w-full text-[#14213D] space-y-4">
      {/* Team Scoreboard */}
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        activeTurn={isMatchComplete ? 'both' : activeTeam}
        roundNumber={activeTeam === 'lion' ? 1 : 2}
        totalRounds={2}
      />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-amber-50/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 text-xs font-black rounded-full border border-amber-300 uppercase tracking-wide">
              Activity 1 • Relay Race
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              activeTeam === 'lion'
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-teal-100 text-teal-900 border-teal-300'
            }`}>
              Round {activeTeam === 'lion' ? '1: Team Lion 🦁' : '2: Team Peacock 🦚'}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-amber-300 text-amber-900">
              Chain {chainIndex + 1} of {NAME_TRAIL_CHAINS.length}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            {activeChain.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            {activeChain.description}{' '}
            <span className="font-bold text-amber-900 block mt-0.5">
              {activeTeam === 'lion'
                ? '🦁 Unique challenge assigned to Team Lion.'
                : '🦚 Separate, non-repeating question assigned to Team Peacock (anti-cheat enabled).'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isRoundOver && !isMatchComplete && (
            <button
              onClick={() => handleSwitchQuestion()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-400 rounded-xl text-xs font-black text-amber-950 shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Switch to a different historical question chain"
            >
              <Shuffle className="w-4 h-4 text-amber-700" />
              <span>Different Question</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-4 py-2 bg-amber-100/90 border-2 border-amber-400 rounded-xl shadow-sm">
            <Timer className={`w-5 h-5 ${timerSeconds < 15 ? 'text-rose-600 animate-spin' : 'text-amber-700'}`} />
            <span className="text-xl font-black tracking-wider text-amber-950 font-mono">
              {timerSeconds}s
            </span>
          </div>
        </div>
      </div>

      {/* Available Question Set Selector Pills */}
      <div className="mb-6 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Historical Question Chains ({NAME_TRAIL_CHAINS.length} Topics Available):
          </span>
          <span className="text-[11px] text-gray-500 font-semibold hidden sm:inline">
            Each team receives a distinct question
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {NAME_TRAIL_CHAINS.map((chain, idx) => {
            const isCurrent = chainIndex === idx;
            const rivalTeam = activeTeam === 'lion' ? 'peacock' : 'lion';
            const isAssignedToRival = teamQuestionIndices[rivalTeam] === idx;

            return (
              <button
                key={chain.id}
                onClick={() => handleSwitchQuestion(idx)}
                disabled={isRoundOver || isMatchComplete}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105'
                    : isAssignedToRival
                    ? 'bg-teal-50 text-teal-900 border-teal-300 hover:bg-teal-100'
                    : 'bg-white text-gray-800 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                <span>{idx + 1}. {chain.title.split(':')[0]}</span>
                {isCurrent && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-black">Active</span>}
                {isAssignedToRival && (
                  <span className="text-[10px] bg-teal-200/80 text-teal-950 px-1.5 py-0.5 rounded-full font-bold">
                    {rivalTeam === 'lion' ? '🦁 Lion' : '🦚 Peacock'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Freeze Warning if Penalized */}
      {isFreeze && (
        <div className="mb-6 p-4 bg-rose-100 border-2 border-rose-500 rounded-2xl flex items-center gap-3 animate-pulse text-rose-950 shadow-xl">
          <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0" />
          <div className="text-sm font-bold">
            <strong className="text-rose-900">Chronology Mismatch! 3s Penalty Freeze:</strong>{' '}
            Think carefully about ancient dates and sequence. Unfreezing in {freezeCountdown}s...
          </div>
        </div>
      )}

      {/* Chronological Relay Timeline (Target Slots) */}
      <div className="mb-8">
        <h4 className="text-xs uppercase font-black text-amber-950 tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Chronological Timeline Slots (Oldest to Modern)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {placedSlots.map((item, idx) => (
            <div
              key={idx}
              className={`min-h-[140px] rounded-2xl p-3.5 border-2 flex flex-col justify-between transition-all duration-300 ${
                item
                  ? 'bg-emerald-50 border-emerald-500 shadow-md'
                  : idx === placedSlots.findIndex(s => s === null)
                  ? 'bg-amber-100/80 border-amber-500 border-dashed animate-pulse shadow-sm'
                  : 'bg-white/90 border-gray-300 border-dashed opacity-80'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-black text-amber-900 border-b border-amber-200/80 pb-1">
                <span>Stage {idx + 1}</span>
                {item && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>

              {item ? (
                <div className="my-auto py-2">
                  <div className="font-black text-xs sm:text-sm text-emerald-950 leading-snug">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-amber-900 font-bold mt-1">
                    {item.periodOrLanguage}
                  </div>
                  <p className="text-xs text-gray-800 font-semibold mt-1 line-clamp-2 leading-relaxed">
                    {item.significance}
                  </p>
                </div>
              ) : (
                <div className="my-auto text-center py-4">
                  <span className="text-xs font-black block text-amber-950">
                    {idx === placedSlots.findIndex(s => s === null) ? '👉 Place Next Here' : 'Empty Slot'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Items Pool (Click to place in current active slot) */}
      {!isRoundOver && (
        <div>
          <h4 className="text-xs uppercase font-black text-amber-950 tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Available Historical Milestone Cards (Click the correct next card in sequence)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableItems.map(item => (
              <button
                key={item.id}
                onClick={() => handlePlaceItem(item)}
                disabled={isFreeze}
                className="text-left bg-white hover:bg-amber-50/90 border-2 border-amber-300/90 hover:border-amber-500 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] active:scale-95 group shadow-md hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-black text-sm sm:text-base text-gray-950 group-hover:text-amber-950">
                    {item.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-600 group-hover:text-amber-800 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                </div>
                <div className="inline-block px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-[11px] text-amber-950 font-bold mt-1.5">
                  {item.periodOrLanguage}
                </div>
                <p className="text-xs text-gray-800 font-semibold mt-2 line-clamp-2 leading-relaxed">
                  {item.significance}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Round End Modal / Banner */}
      {isRoundOver && (
        <div className="mt-8 bg-white border-4 border-amber-500/60 rounded-3xl p-6 sm:p-8 text-center shadow-2xl animate-fade-in text-black">
          <h3 className="text-2xl sm:text-3xl font-black text-black mb-1">
            {isMatchComplete
              ? scores.lion > scores.peacock
                ? '🏆 Team Lion 🦁 Wins the Relay Race!'
                : scores.peacock > scores.lion
                ? '🏆 Team Peacock 🦚 Wins the Relay Race!'
                : '🤝 Honorable Tie in the Relay Race!'
              : roundWinner}
          </h3>
          <p className="text-sm sm:text-base text-gray-800 font-bold mb-6 max-w-xl mx-auto">
            {isMatchComplete
              ? `Both teams completed their unique historical questions! Final Score: Team Lion ${scores.lion} pts — Team Peacock ${scores.peacock} pts.`
              : activeTeam === 'lion'
              ? `Team Lion completed their question! To ensure fairness and prevent copying, Team Peacock receives a completely distinct question sequence: "${NAME_TRAIL_CHAINS[teamQuestionIndices.peacock]?.title.split(':')[0]}".`
              : 'Match concluded! Check the final scoreboard.'}
          </p>

          <button
            onClick={handleNextTurnOrRound}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-black rounded-xl text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            {activeTeam === 'lion'
              ? `Pass Relay to Team Peacock 🦚 (New Question: ${NAME_TRAIL_CHAINS[teamQuestionIndices.peacock]?.title.split(':')[0]} ➔)`
              : 'Play Rematch with Fresh Questions ↺'}
          </button>
        </div>
      )}
    </div>
  );
};
