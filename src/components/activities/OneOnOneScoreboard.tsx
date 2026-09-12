'use client';

import React from 'react';
import { Swords, Flame, Trophy, Clock, Zap } from 'lucide-react';

interface OneOnOneScoreboardProps {
  player1Score: number;
  player2Score: number;
  player1Name?: string;
  player2Name?: string;
  activePlayer?: 1 | 2 | 'both';
  timeLeft?: number;
  streakP1?: number;
  streakP2?: number;
}

export const OneOnOneScoreboard: React.FC<OneOnOneScoreboardProps> = ({
  player1Score,
  player2Score,
  player1Name = 'Player 1',
  player2Name = 'Player 2',
  activePlayer = 'both',
  timeLeft,
  streakP1 = 0,
  streakP2 = 0,
}) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl border border-indigo-500/40 p-2.5 sm:p-3.5 2xl:p-5 shadow-lg text-[#14213D] mb-3 sm:mb-4 select-none touch-manipulation">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-indigo-200/60 pb-1.5 mb-2.5">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 2xl:w-5 2xl:h-5 text-indigo-700 animate-pulse" />
          <span className="text-xs sm:text-sm 2xl:text-base font-black uppercase tracking-widest text-indigo-950">
            1v1 Head-to-Head Duel
          </span>
        </div>

        {timeLeft !== undefined && (
          <div className="flex items-center gap-1.5 px-3 py-1 2xl:px-4 2xl:py-1.5 bg-rose-100 border border-rose-300 rounded-full text-xs 2xl:text-sm font-black text-rose-800">
            <Clock className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>{timeLeft}s remaining</span>
          </div>
        )}
      </div>

      {/* Duel Combatants */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {/* PLAYER 1 */}
        <div
          className={`rounded-xl 2xl:rounded-2xl p-2.5 sm:p-3 2xl:p-4 border transition-all duration-300 ${
            activePlayer === 1 || activePlayer === 'both'
              ? 'bg-gradient-to-br from-indigo-50/90 to-blue-100/70 border-indigo-500/60 ring-2 ring-indigo-400/30 shadow-md'
              : 'bg-gray-50/50 border-gray-200 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 2xl:gap-3">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg 2xl:rounded-xl bg-indigo-600 border border-indigo-400 flex items-center justify-center font-black text-white 2xl:text-lg shadow-sm">
                P1
              </div>
              <div>
                <span className="font-bold text-sm 2xl:text-lg text-indigo-950">{player1Name}</span>
                {streakP1 > 1 && (
                  <span className="flex items-center gap-1 text-[11px] 2xl:text-xs text-amber-700 font-bold">
                    <Flame className="w-3 h-3 2xl:w-4 2xl:h-4 fill-amber-500 text-amber-600" /> {streakP1}x Streak
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl 2xl:text-4xl font-black text-indigo-700">
                {player1Score}
              </span>
              <span className="text-[10px] 2xl:text-xs text-gray-500 block -mt-1 uppercase font-bold">pts</span>
            </div>
          </div>
        </div>

        {/* PLAYER 2 */}
        <div
          className={`rounded-xl 2xl:rounded-2xl p-2.5 sm:p-3 2xl:p-4 border transition-all duration-300 ${
            activePlayer === 2 || activePlayer === 'both'
              ? 'bg-gradient-to-br from-rose-50/90 to-purple-100/70 border-rose-500/60 ring-2 ring-rose-400/30 shadow-md'
              : 'bg-gray-50/50 border-gray-200 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 2xl:gap-3">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg 2xl:rounded-xl bg-rose-600 border border-rose-400 flex items-center justify-center font-black text-white 2xl:text-lg shadow-sm">
                P2
              </div>
              <div>
                <span className="font-bold text-sm 2xl:text-lg text-rose-950">{player2Name}</span>
                {streakP2 > 1 && (
                  <span className="flex items-center gap-1 text-[11px] 2xl:text-xs text-amber-700 font-bold">
                    <Flame className="w-3 h-3 2xl:w-4 2xl:h-4 fill-amber-500 text-amber-600" /> {streakP2}x Streak
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl 2xl:text-4xl font-black text-rose-700">
                {player2Score}
              </span>
              <span className="text-[10px] 2xl:text-xs text-gray-500 block -mt-1 uppercase font-bold">pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
