'use client';

import React from 'react';
import { Shield, Zap, Award, Flame, Users } from 'lucide-react';

interface TeamScoreboardProps {
  teamLionScore: number;
  teamPeacockScore: number;
  activeTurn?: 'lion' | 'peacock' | 'both';
  roundNumber?: number;
  totalRounds?: number;
  teamLionName?: string;
  teamPeacockName?: string;
  onBuzzer?: (team: 'lion' | 'peacock') => void;
  showBuzzers?: boolean;
  buzzedTeam?: 'lion' | 'peacock' | null;
}

export const TeamScoreboard: React.FC<TeamScoreboardProps> = ({
  teamLionScore,
  teamPeacockScore,
  activeTurn = 'both',
  roundNumber = 1,
  totalRounds = 5,
  teamLionName = 'Team Lion 🦁',
  teamPeacockName = 'Team Peacock 🦚',
  onBuzzer,
  showBuzzers = false,
  buzzedTeam = null,
}) => {
  const isLionLeading = teamLionScore > teamPeacockScore;
  const isPeacockLeading = teamPeacockScore > teamLionScore;
  const isTied = teamLionScore === teamPeacockScore;

  return (
    <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl border border-amber-500/40 p-4 sm:p-5 shadow-xl text-[#14213D] mb-6">
      {/* Top Banner with Round counter */}
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
          </span>
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-900 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-700" />
            2-Team Battle Arena
          </span>
        </div>

        <div className="px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-bold text-amber-900">
          Round {roundNumber} of {totalRounds}
        </div>
      </div>

      {/* Duel Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 items-stretch">
        {/* TEAM LION */}
        <div
          className={`relative rounded-xl p-4 transition-all duration-300 border ${
            buzzedTeam === 'lion'
              ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-400/50 scale-[1.02]'
              : activeTurn === 'lion' || activeTurn === 'both'
              ? 'bg-gradient-to-br from-amber-50/90 to-amber-100/60 border-amber-400/80 shadow-md'
              : 'bg-gray-50/50 border-gray-200 opacity-70'
          }`}
        >
          {isLionLeading && (
            <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-amber-500 text-black text-[10px] font-black rounded-full uppercase tracking-wide flex items-center gap-1 shadow">
              <Award className="w-3 h-3" /> Leading
            </span>
          )}

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-amber-200/80 border border-amber-400 flex items-center justify-center text-xl shadow-inner">
                🦁
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-amber-950">{teamLionName}</h3>
                <p className="text-[11px] text-amber-800 font-semibold">Saffron Roar</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-4xl font-black text-amber-700 tracking-tight">
                {teamLionScore}
              </span>
              <span className="text-[10px] text-gray-500 block -mt-1 font-bold uppercase">pts</span>
            </div>
          </div>

          {showBuzzers && onBuzzer && (
            <button
              onClick={() => onBuzzer('lion')}
              disabled={buzzedTeam !== null}
              className={`w-full mt-2 py-2.5 px-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                buzzedTeam === 'lion'
                  ? 'bg-amber-500 text-black animate-pulse'
                  : buzzedTeam !== null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black active:scale-95'
              }`}
            >
              <Zap className="w-4 h-4" />
              {buzzedTeam === 'lion' ? 'BUZZED IN!' : 'BUZZ IN (Team 1)'}
            </button>
          )}
        </div>

        {/* TEAM PEACOCK */}
        <div
          className={`relative rounded-xl p-4 transition-all duration-300 border ${
            buzzedTeam === 'peacock'
              ? 'bg-teal-100 border-teal-500 ring-4 ring-teal-400/50 scale-[1.02]'
              : activeTurn === 'peacock' || activeTurn === 'both'
              ? 'bg-gradient-to-br from-teal-50/90 to-emerald-100/60 border-teal-400/80 shadow-md'
              : 'bg-gray-50/50 border-gray-200 opacity-70'
          }`}
        >
          {isPeacockLeading && (
            <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-teal-500 text-white text-[10px] font-black rounded-full uppercase tracking-wide flex items-center gap-1 shadow">
              <Award className="w-3 h-3" /> Leading
            </span>
          )}

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-teal-200/80 border border-teal-400 flex items-center justify-center text-xl shadow-inner">
                🦚
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-teal-950">{teamPeacockName}</h3>
                <p className="text-[11px] text-teal-800 font-semibold">Emerald Feather</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-4xl font-black text-teal-700 tracking-tight">
                {teamPeacockScore}
              </span>
              <span className="text-[10px] text-gray-500 block -mt-1 font-bold uppercase">pts</span>
            </div>
          </div>

          {showBuzzers && onBuzzer && (
            <button
              onClick={() => onBuzzer('peacock')}
              disabled={buzzedTeam !== null}
              className={`w-full mt-2 py-2.5 px-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                buzzedTeam === 'peacock'
                  ? 'bg-teal-500 text-white animate-pulse'
                  : buzzedTeam !== null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white active:scale-95'
              }`}
            >
              <Zap className="w-4 h-4" />
              {buzzedTeam === 'peacock' ? 'BUZZED IN!' : 'BUZZ IN (Team 2)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
