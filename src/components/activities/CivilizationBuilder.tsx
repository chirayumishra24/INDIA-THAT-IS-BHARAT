'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CIV_ELEMENTS, CivElement } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { Castle, MapPin, Sparkles, Target, Award, CheckCircle } from 'lucide-react';

interface CivilizationBuilderProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const CivilizationBuilder: React.FC<CivilizationBuilderProps> = ({ onGameComplete }) => {
  const [currentElemIndex, setCurrentElemIndex] = useState(0);
  const [activeTeam, setActiveTeam] = useState<'lion' | 'peacock'>('lion');
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [placedMarkers, setPlacedMarkers] = useState<{
    id: string;
    team: 'lion' | 'peacock';
    placedX: number;
    placedY: number;
    targetX: number;
    targetY: number;
    accuracy: number;
    title: string;
  }[]>([]);
  const [lastPlacementResult, setLastPlacementResult] = useState<{
    accuracy: number;
    points: number;
    title: string;
    detail: string;
  } | null>(null);

  const [isGameOver, setIsGameOver] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const currentElement: CivElement = CIV_ELEMENTS[currentElemIndex];

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current || isGameOver || lastPlacementResult !== null) return;

    const rect = mapRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Calculate Euclidean distance error
    const dx = clickX - currentElement.xPercent;
    const dy = clickY - currentElement.yPercent;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Accuracy formula: 100 - (distance * 2) clamped to 0..100
    const accuracy = Math.max(0, Math.min(100, Math.round(100 - dist * 1.8)));
    const pointsAwarded = Math.round(accuracy * 1.5);

    setScores(prev => ({
      ...prev,
      [activeTeam]: prev[activeTeam] + pointsAwarded
    }));

    setPlacedMarkers(prev => [
      ...prev,
      {
        id: `${currentElement.id}-${activeTeam}`,
        team: activeTeam,
        placedX: clickX,
        placedY: clickY,
        targetX: currentElement.xPercent,
        targetY: currentElement.yPercent,
        accuracy,
        title: currentElement.title
      }
    ]);

    setLastPlacementResult({
      accuracy,
      points: pointsAwarded,
      title: currentElement.title,
      detail: currentElement.historicalSignificance
    });
  };

  const handleNextPlacement = () => {
    setLastPlacementResult(null);

    // Alternate teams
    const nextTeam = activeTeam === 'lion' ? 'peacock' : 'lion';
    setActiveTeam(nextTeam);

    if (activeTeam === 'peacock') {
      // Both teams finished current element, move to next
      if (currentElemIndex + 1 < CIV_ELEMENTS.length) {
        setCurrentElemIndex(prev => prev + 1);
      } else {
        // Game Finished
        setIsGameOver(true);
        confetti({ particleCount: 90, spread: 70 });
        const winner = scores.lion > scores.peacock ? 'lion' : scores.peacock > scores.lion ? 'peacock' : 'tie';
        onGameComplete?.(winner, scores);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-[#0f111a] rounded-3xl border border-amber-500/20 text-white shadow-2xl">
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        activeTurn={activeTeam}
        roundNumber={currentElemIndex + 1}
        totalRounds={CIV_ELEMENTS.length}
      />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-900/80 p-4 rounded-2xl border border-gray-800 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30 uppercase tracking-wide">
              Activity 5 • Civilization Builder
            </span>
            <span className="text-xs text-gray-400">Sacred Geography Accuracy Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-100 mt-1">
            Place Landmark: {currentElement?.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Hint: <strong className="text-amber-300">{currentElement?.zoneHint}</strong> • {currentElement?.historicalSignificance}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-gray-700 rounded-xl text-xs font-bold text-amber-300">
          <Target className="w-4 h-4 text-amber-400" />
          Turn: {activeTeam === 'lion' ? 'Team Lion 🦁' : 'Team Peacock 🦚'}
        </div>
      </div>

      {/* Interactive Map Canvas for Click Placement */}
      <div
        ref={mapRef}
        onClick={handleMapClick}
        className={`relative w-full aspect-[16/10] bg-gradient-to-b from-[#111624] via-[#0d101b] to-[#080a12] rounded-2xl border-2 transition-all duration-300 overflow-hidden shadow-2xl mb-6 select-none ${
          lastPlacementResult === null && !isGameOver
            ? 'cursor-crosshair border-amber-500/50 hover:border-amber-400'
            : 'border-gray-800 cursor-default'
        }`}
      >
        {/* Subtle Canvas Map Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px]"></div>

        {/* Ancient Geographical Outlines */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-amber-500/40 uppercase font-serif tracking-widest pointer-events-none">
          ▲ ▲ ▲ Himavat Range (Northern Wall) ▲ ▲ ▲
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-teal-400/40 uppercase font-serif tracking-widest pointer-events-none">
          ~ ~ ~ Mahasagara (Southern Ocean) ~ ~ ~
        </div>

        {/* Target Zone Indicator if Placed */}
        {lastPlacementResult !== null && (
          <div
            style={{
              left: `${currentElement.xPercent}%`,
              top: `${currentElement.yPercent}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-10 pointer-events-none animate-ping"
          >
            <div className="w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-400/30"></div>
          </div>
        )}

        {/* Render all placed pins */}
        {placedMarkers.map((marker, idx) => (
          <div
            key={idx}
            style={{
              left: `${marker.placedX}%`,
              top: `${marker.placedY}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-20 pointer-events-none animate-fade-in"
          >
            <div
              className={`px-2 py-1 rounded-lg text-[9px] font-black shadow-lg flex items-center gap-1 whitespace-nowrap ${
                marker.team === 'lion'
                  ? 'bg-amber-500 text-black border border-amber-300'
                  : 'bg-teal-400 text-black border border-teal-200'
              }`}
            >
              <span>{marker.team === 'lion' ? '🦁' : '🦚'}</span>
              <span>{marker.accuracy}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Result feedback after click */}
      {lastPlacementResult !== null && (
        <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-2 border-amber-500/50 rounded-2xl p-5 mb-6 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-base text-white">
                {activeTeam === 'lion' ? 'Team Lion 🦁' : 'Team Peacock 🦚'} Placement Registered!
              </h4>
            </div>
            <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full font-black text-emerald-300 text-sm">
              +{lastPlacementResult.points} pts ({lastPlacementResult.accuracy}% Accuracy)
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 mb-4">{lastPlacementResult.detail}</p>

          <button
            onClick={handleNextPlacement}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs uppercase tracking-wider rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-md active:scale-95"
          >
            Pass Turn / Next Marker ➔
          </button>
        </div>
      )}

      {/* Game Over Banner */}
      {isGameOver && (
        <div className="bg-gradient-to-r from-amber-950/90 via-black to-teal-950/90 border-2 border-amber-500/60 rounded-3xl p-8 text-center shadow-2xl animate-fade-in">
          <Award className="w-14 h-14 text-amber-400 mx-auto mb-2" />
          <h2 className="text-3xl font-black text-amber-200 mb-2">
            {scores.lion > scores.peacock
              ? '🦁 Team Lion Master Builders!'
              : scores.peacock > scores.lion
              ? '🦚 Team Peacock Master Builders!'
              : 'Architectural Parity! Outstanding Both Teams!'}
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Both teams have mapped the sacred boundaries, rivers, and highways of ancient Bharat with supreme precision.
          </p>
          <button
            onClick={() => {
              setCurrentElemIndex(0);
              setActiveTeam('lion');
              setScores({ lion: 0, peacock: 0 });
              setPlacedMarkers([]);
              setLastPlacementResult(null);
              setIsGameOver(false);
            }}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl"
          >
            Rebuild Civilization ↺
          </button>
        </div>
      )}
    </div>
  );
};
