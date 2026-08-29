'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MAP_PUZZLE_PIECES, MAP_PUZZLE_SLOTS, MapPuzzlePiece } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { Compass, CheckCircle, AlertTriangle, Sparkles, Trash2, Trophy } from 'lucide-react';

interface MapPuzzleRaceProps {
  onGameComplete?: (winner: 'lion' | 'peacock' | 'tie', scores: { lion: number; peacock: number }) => void;
}

export const MapPuzzleRace: React.FC<MapPuzzleRaceProps> = ({ onGameComplete }) => {
  const [activeTeam, setActiveTeam] = useState<'lion' | 'peacock'>('lion');
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [placedPieces, setPlacedPieces] = useState<Record<string, MapPuzzlePiece>>({});
  const [availablePieces, setAvailablePieces] = useState<MapPuzzlePiece[]>([]);
  const [discardedDecoys, setDiscardedDecoys] = useState<string[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<MapPuzzlePiece | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(75);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'good' | 'bad' } | null>(null);

  const initTeamRun = (team: 'lion' | 'peacock') => {
    setActiveTeam(team);
    setPlacedPieces({});
    setDiscardedDecoys([]);
    setSelectedPiece(null);
    setFeedbackMsg(null);
    setIsRoundOver(false);
    setTimerSeconds(75);
    // Shuffle pieces
    const shuffled = [...MAP_PUZZLE_PIECES].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
  };

  useEffect(() => {
    initTeamRun('lion');
  }, []);

  // Timer
  useEffect(() => {
    if (isRoundOver) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishRound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRoundOver, placedPieces, discardedDecoys]);

  const handleSelectPiece = (piece: MapPuzzlePiece) => {
    if (isRoundOver) return;
    setSelectedPiece(piece);
  };

  const handlePlaceInSlot = (slotId: string) => {
    if (!selectedPiece || isRoundOver) return;

    if (selectedPiece.isDecoy) {
      // Penalty for placing decoy on ancient Bharat map!
      setFeedbackMsg({
        text: `⚠️ Trap Alert! "${selectedPiece.title}" is a modern/foreign decoy, not ancient Bharat! (-20 pts)`,
        type: 'bad'
      });
      setScores(prev => ({ ...prev, [activeTeam]: Math.max(0, prev[activeTeam] - 20) }));
      return;
    }

    if (selectedPiece.correctSlotId === slotId) {
      // Correct!
      const newPlaced = { ...placedPieces, [slotId]: selectedPiece };
      setPlacedPieces(newPlaced);
      setAvailablePieces(prev => prev.filter(p => p.id !== selectedPiece.id));
      setSelectedPiece(null);
      setFeedbackMsg({
        text: `✨ Perfect! ${selectedPiece.title} mapped accurately! (+50 pts)`,
        type: 'good'
      });

      const ptsEarned = 50 + Math.floor(timerSeconds / 2);
      setScores(prev => ({ ...prev, [activeTeam]: prev[activeTeam] + ptsEarned }));

      // Check if all 7 slots placed
      if (Object.keys(newPlaced).length === MAP_PUZZLE_SLOTS.length) {
        confetti({ particleCount: 70, spread: 60 });
        finishRound();
      }
    } else {
      // Wrong slot
      setFeedbackMsg({
        text: `❌ Geographic Mismatch! "${selectedPiece.title}" does not belong to that landmark coordinate. Try another slot!`,
        type: 'bad'
      });
      setScores(prev => ({ ...prev, [activeTeam]: Math.max(0, prev[activeTeam] - 10) }));
    }
  };

  const handleDiscardDecoy = (piece: MapPuzzlePiece) => {
    if (isRoundOver) return;

    if (piece.isDecoy) {
      setDiscardedDecoys(prev => [...prev, piece.id]);
      setAvailablePieces(prev => prev.filter(p => p.id !== piece.id));
      if (selectedPiece?.id === piece.id) setSelectedPiece(null);
      setFeedbackMsg({
        text: `🎯 Eagle Eye! You spotted and discarded the decoy "${piece.title}"! (+30 pts)`,
        type: 'good'
      });
      setScores(prev => ({ ...prev, [activeTeam]: prev[activeTeam] + 30 }));
    } else {
      setFeedbackMsg({
        text: `⚠️ Caution! "${piece.title}" is a genuine ancient landmark of Bharat! Do not discard! (-15 pts)`,
        type: 'bad'
      });
      setScores(prev => ({ ...prev, [activeTeam]: Math.max(0, prev[activeTeam] - 15) }));
    }
  };

  const finishRound = () => {
    setIsRoundOver(true);
  };

  const handleNextTurnOrEnd = () => {
    if (activeTeam === 'lion') {
      initTeamRun('peacock');
    } else {
      const winner = scores.lion > scores.peacock ? 'lion' : scores.peacock > scores.lion ? 'peacock' : 'tie';
      onGameComplete?.(winner, scores);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white/85 backdrop-blur-xl rounded-3xl border border-amber-500/40 text-[#14213D] shadow-2xl">
      <TeamScoreboard
        teamLionScore={scores.lion}
        teamPeacockScore={scores.peacock}
        activeTurn={activeTeam}
        roundNumber={activeTeam === 'lion' ? 1 : 2}
        totalRounds={2}
      />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-amber-50/80 backdrop-blur-md p-4 rounded-2xl border border-amber-200 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-950 text-xs font-black rounded-full border border-amber-300 uppercase tracking-wide">
              Activity 3 • Map Puzzle Race
            </span>
            <span className="text-xs text-gray-600 font-semibold">Vishnu Purana Geography</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
            Reconstruct Ancient Bharatavarsha
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">
            Select a card from your deck below, then click its coordinate on the map. Discard fake decoys!
          </p>
        </div>

        <div className="px-4 py-2 bg-white/80 border border-amber-300 rounded-xl font-mono text-xl font-bold text-amber-800 shadow-xs">
          ⏱️ {timerSeconds}s
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border mb-5 text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-lg animate-fade-in ${
            feedbackMsg.type === 'good'
              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
              : 'bg-rose-950/70 border-rose-500 text-rose-200'
          }`}
        >
          {feedbackMsg.type === 'good' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* MAP CANVAS GRID */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#121624] via-[#10141f] to-[#0c0f18] rounded-2xl border-2 border-amber-500/30 p-4 sm:p-6 overflow-hidden shadow-2xl mb-6">
        {/* Ancient Contour & River Watermark Overlays */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Ancient Title Banner inside map */}
        <div className="absolute top-3 left-4 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-serif font-black tracking-widest text-amber-500/60 uppercase">
            उत्तरं यत् समुद्रस्य हिमाद्रेश्चैव दक्षिणम् • वर्षं तद् भारतं नाम
          </span>
        </div>

        {/* Geographic Target Slots */}
        <div className="relative w-full h-full">
          {MAP_PUZZLE_SLOTS.map(slot => {
            const placed = placedPieces[slot.id];
            return (
              <div
                key={slot.id}
                style={{
                  left: `${slot.coords.x}%`,
                  top: `${slot.coords.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-10"
              >
                {placed ? (
                  <div className="bg-emerald-900/90 border-2 border-emerald-400 rounded-xl px-3 py-2 text-center shadow-xl animate-fade-in max-w-[160px]">
                    <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-tight flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" /> {slot.name}
                    </div>
                    <div className="text-xs font-black text-white mt-0.5">{placed.title}</div>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlaceInSlot(slot.id)}
                    className={`px-3 py-2 rounded-xl text-center border-2 border-dashed transition-all duration-200 shadow-lg ${
                      selectedPiece
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 hover:bg-amber-500/40 hover:scale-105 animate-pulse'
                        : 'bg-black/60 border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-[9px] uppercase font-bold text-amber-400/80">Slot</div>
                    <div className="text-[11px] font-bold text-gray-200">{slot.name}</div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Piece Action Bar */}
      {selectedPiece && !isRoundOver && (
        <div className="mb-4 p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">Selected:</span>
            <span className="text-white font-black">{selectedPiece.title}</span>
            <span className="text-gray-400 text-xs italic">({selectedPiece.hint})</span>
          </div>
          <button
            onClick={() => handleDiscardDecoy(selectedPiece)}
            className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow"
          >
            <Trash2 className="w-3.5 h-3.5" /> Discard Decoy
          </button>
        </div>
      )}

      {/* Available Puzzle Pieces Deck */}
      {!isRoundOver && (
        <div>
          <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-3">
            Deck of Historical & Route Tiles (Click a tile to select, then place on map or discard if decoy)
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {availablePieces.map(piece => {
              const isSelected = selectedPiece?.id === piece.id;
              return (
                <div
                  key={piece.id}
                  onClick={() => handleSelectPiece(piece)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400 text-amber-100 scale-[1.02]'
                      : 'bg-gray-900/90 border-gray-800 hover:border-gray-600 text-gray-300 hover:bg-gray-850'
                  }`}
                >
                  <div>
                    <div className="text-xs font-black text-amber-200">{piece.title}</div>
                    <div className="text-[10px] text-gray-400 mt-1">{piece.hint}</div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-amber-400 font-semibold uppercase">{piece.category}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDiscardDecoy(piece);
                      }}
                      title="Discard Decoy"
                      className="text-rose-400 hover:text-rose-300 font-bold"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Round Completion Modal */}
      {isRoundOver && (
        <div className="mt-8 bg-gradient-to-r from-amber-950/80 via-black to-teal-950/80 border-2 border-amber-500/50 rounded-3xl p-6 text-center shadow-2xl animate-fade-in">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
          <h3 className="text-2xl font-black text-amber-300 mb-1">
            {activeTeam === 'lion' ? 'Team Lion 🦁 Complete!' : 'Team Peacock 🦚 Complete!'}
          </h3>
          <p className="text-sm text-gray-300 mb-6">
            Placed: {Object.keys(placedPieces).length} / {MAP_PUZZLE_SLOTS.length} landmarks.
          </p>

          <button
            onClick={handleNextTurnOrEnd}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
          >
            {activeTeam === 'lion' ? 'Pass Map to Team Peacock 🦚 ➔' : 'Complete Game & Crown Champion 👑'}
          </button>
        </div>
      )}
    </div>
  );
};
