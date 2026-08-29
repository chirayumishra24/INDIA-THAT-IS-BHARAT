'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { NAME_TRAIL_CHAINS, NameTrailItem } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, Timer, ShieldAlert } from 'lucide-react';

interface NameTrailRelayProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const NameTrailRelay: React.FC<NameTrailRelayProps> = ({ onGameComplete }) => {
  const [chainIndex, setChainIndex] = useState(0);
  const [activeTeam, setActiveTeam] = useState<'lion' | 'peacock'>('lion');
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });

  const activeChain = NAME_TRAIL_CHAINS[chainIndex];

  // Shuffled items for pool
  const [availableItems, setAvailableItems] = useState<NameTrailItem[]>([]);
  const [placedSlots, setPlacedSlots] = useState<(NameTrailItem | null)[]>([]);
  const [isFreeze, setIsFreeze] = useState(false);
  const [freezeCountdown, setFreezeCountdown] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [roundWinner, setRoundWinner] = useState<string | null>(null);

  // Initialize round
  const initRound = (index: number, team: 'lion' | 'peacock') => {
    const chain = NAME_TRAIL_CHAINS[index];
    const shuffled = [...chain.items].sort(() => Math.random() - 0.5);
    setAvailableItems(shuffled);
    setPlacedSlots(new Array(chain.items.length).fill(null));
    setTimerSeconds(60);
    setIsRoundOver(false);
    setRoundWinner(null);
    setIsFreeze(false);
    setActiveTeam(team);
  };

  useEffect(() => {
    initRound(chainIndex, activeTeam);
  }, [chainIndex]);

  // Timer countdown
  useEffect(() => {
    if (isRoundOver || isFreeze) return;
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
  }, [isRoundOver, isFreeze]);

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
    if (isFreeze || isRoundOver) return;

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
      setRoundWinner(activeTeam === 'lion' ? 'Team Lion 🦁' : 'Team Peacock 🦚');
    } else {
      setRoundWinner('Time Expired!');
    }
  };

  const handleNextTurnOrRound = () => {
    if (activeTeam === 'lion') {
      // Peacock's turn on same or next chain
      initRound(chainIndex, 'peacock');
    } else {
      // Move to next chain or finish game
      if (chainIndex + 1 < NAME_TRAIL_CHAINS.length) {
        setChainIndex(prev => prev + 1);
        initRound(chainIndex + 1, 'lion');
      } else {
        const winner = scores.lion > scores.peacock ? 'lion' : scores.peacock > scores.lion ? 'peacock' : 'tie';
        onGameComplete?.(winner, scores);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white/85 backdrop-blur-xl rounded-3xl border border-amber-500/40 text-[#14213D] shadow-2xl">
      {/* Team Scoreboard */}
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        activeTurn={activeTeam}
        roundNumber={chainIndex * 2 + (activeTeam === 'lion' ? 1 : 2)}
        totalRounds={NAME_TRAIL_CHAINS.length * 2}
      />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-amber-50/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 text-xs font-black rounded-full border border-amber-300 uppercase tracking-wide">
              Activity 1 • Relay Race
            </span>
            <span className="text-xs text-gray-600 font-semibold">Chronological Trail</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            {activeChain.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">{activeChain.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-gray-700 rounded-xl">
            <Timer className={`w-5 h-5 ${timerSeconds < 15 ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
            <span className="text-xl font-black tracking-wider text-amber-300 font-mono">
              {timerSeconds}s
            </span>
          </div>
        </div>
      </div>

      {/* Freeze Warning if Penalized */}
      {isFreeze && (
        <div className="mb-6 p-4 bg-rose-950/80 border-2 border-rose-500 rounded-2xl flex items-center gap-3 animate-pulse text-rose-200 shadow-xl">
          <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0" />
          <div className="text-sm">
            <strong>Chronology Mismatch! 3s Penalty Freeze:</strong>{' '}
            Think carefully about ancient dates and sequence. Unfreezing in {freezeCountdown}s...
          </div>
        </div>
      )}

      {/* Chronological Relay Timeline (Target Slots) */}
      <div className="mb-8">
        <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Chronological Timeline Slots (Oldest to Modern)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {placedSlots.map((item, idx) => (
            <div
              key={idx}
              className={`min-h-[140px] rounded-2xl p-3.5 border-2 flex flex-col justify-between transition-all duration-300 ${
                item
                  ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-950/50'
                  : idx === placedSlots.findIndex(s => s === null)
                  ? 'bg-amber-950/20 border-amber-400/80 border-dashed animate-pulse'
                  : 'bg-black/40 border-gray-800 border-dashed opacity-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 border-b border-gray-800 pb-1">
                <span>Stage {idx + 1}</span>
                {item && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>

              {item ? (
                <div className="my-auto py-2">
                  <div className="font-bold text-xs sm:text-sm text-emerald-200 leading-snug">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-amber-400/80 font-medium mt-1">
                    {item.periodOrLanguage}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                    {item.significance}
                  </p>
                </div>
              ) : (
                <div className="my-auto text-center py-4">
                  <span className="text-xs text-gray-500 font-medium block">
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
          <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-3">
            Available Historical Milestone Cards (Click the correct next card in sequence)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableItems.map(item => (
              <button
                key={item.id}
                onClick={() => handlePlaceItem(item)}
                disabled={isFreeze}
                className="text-left bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-amber-950/60 hover:to-gray-900 border border-gray-700 hover:border-amber-500/80 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] active:scale-95 group shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-sm text-amber-100 group-hover:text-amber-300">
                    {item.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-400/60 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs text-amber-400/90 font-medium mt-1">
                  {item.periodOrLanguage}
                </div>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {item.significance}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Round End Modal / Banner */}
      {isRoundOver && (
        <div className="mt-8 bg-gradient-to-r from-amber-950/80 via-black to-teal-950/80 border-2 border-amber-500/50 rounded-3xl p-6 text-center shadow-2xl animate-fade-in">
          <h3 className="text-2xl font-black text-amber-300 mb-1">
            {roundWinner}
          </h3>
          <p className="text-sm text-gray-300 mb-6">
            {placedSlots.every(s => s !== null)
              ? 'Flawless historical chronological alignment achieved!'
              : 'Round concluded! Review the points on the scoreboard.'}
          </p>

          <button
            onClick={handleNextTurnOrRound}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-black rounded-xl text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            {activeTeam === 'lion' ? 'Pass Relay to Team Peacock 🦚' : 'Next Historical Challenge ➔'}
          </button>
        </div>
      )}
    </div>
  );
};
