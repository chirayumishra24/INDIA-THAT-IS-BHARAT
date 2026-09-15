'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { HERITAGE_MAP_ITEMS, HERITAGE_DROP_ZONES, HeritageMapItem } from '@/data/activityGamesData';
import { TeamScoreboard } from './TeamScoreboard';
import { MapPin, CheckCircle, X, Sparkles, Trophy, Lightbulb, Clock, GripVertical, RotateCcw, XCircle } from 'lucide-react';

const ITEMS_PER_ROUND = 10;
const ROUND_SECONDS = 90;

interface PlacedItem {
  item: HeritageMapItem;
  correct: boolean;
}

export const HeritageMapChallenge: React.FC = () => {
  const [activeTeam, setActiveTeam] = useState<'lion' | 'peacock'>('lion');
  const [scores, setScores] = useState({ lion: 0, peacock: 0 });
  const [phase, setPhase] = useState<'playing' | 'switch' | 'results'>('playing');
  const [timerSeconds, setTimerSeconds] = useState(ROUND_SECONDS);

  // Items for each team (distinct sets)
  const [lionItems, setLionItems] = useState<HeritageMapItem[]>([]);
  const [peacockItems, setPeacockItems] = useState<HeritageMapItem[]>([]);

  // Current round state
  const [availableItems, setAvailableItems] = useState<HeritageMapItem[]>([]);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<HeritageMapItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<HeritageMapItem | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'good' | 'bad'; funFact?: string } | null>(null);
  const [zoneFeedback, setZoneFeedback] = useState<{ zoneId: string; type: 'correct' | 'wrong'; stateName: string } | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);

  // Touch drag state
  const [touchDragPos, setTouchDragPos] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Initialize game on mount
  useEffect(() => {
    const shuffled = [...HERITAGE_MAP_ITEMS].sort(() => Math.random() - 0.5);
    const lionSet = shuffled.slice(0, ITEMS_PER_ROUND);
    const peacockSet = shuffled.slice(ITEMS_PER_ROUND, ITEMS_PER_ROUND * 2);
    setLionItems(lionSet);
    setPeacockItems(peacockSet);
    setAvailableItems(lionSet);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRoundEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, activeTeam]);

  const handleRoundEnd = useCallback(() => {
    if (activeTeam === 'lion') {
      setPhase('switch');
    } else {
      setPhase('results');
    }
  }, [activeTeam]);

  // Check if all items placed
  useEffect(() => {
    if (availableItems.length === 0 && phase === 'playing' && (lionItems.length > 0 || peacockItems.length > 0)) {
      handleRoundEnd();
    }
  }, [availableItems, phase, lionItems, peacockItems, handleRoundEnd]);

  const startPeacockRound = () => {
    setActiveTeam('peacock');
    setPhase('playing');
    setTimerSeconds(ROUND_SECONDS);
    setAvailableItems(peacockItems);
    setPlacedItems([]);
    setDraggedItem(null);
    setSelectedItem(null);
    setFeedbackMsg(null);
    setShowHint(null);
  };

  // --- Drag & Drop Handlers (Mouse) ---
  const handleDragStart = (e: React.DragEvent, item: HeritageMapItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredZone(zoneId);
  };

  const handleDragLeave = () => {
    setHoveredZone(null);
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    setHoveredZone(null);
    if (!draggedItem) return;
    processPlacement(draggedItem, zoneId);
    setDraggedItem(null);
  };

  // --- Touch Handlers ---
  const handleTouchStart = (e: React.TouchEvent, item: HeritageMapItem) => {
    setDraggedItem(item);
    const touch = e.touches[0];
    setTouchDragPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedItem) return;
    const touch = e.touches[0];
    setTouchDragPos({ x: touch.clientX, y: touch.clientY });

    // Check which zone we're over
    const mapEl = mapRef.current;
    if (!mapEl) return;
    const zones = mapEl.querySelectorAll('[data-zone-id]');
    let foundZone: string | null = null;
    zones.forEach(zone => {
      const rect = zone.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        foundZone = zone.getAttribute('data-zone-id');
      }
    });
    setHoveredZone(foundZone);
  };

  const handleTouchEnd = () => {
    if (!draggedItem || !hoveredZone) {
      setDraggedItem(null);
      setTouchDragPos(null);
      setHoveredZone(null);
      return;
    }
    processPlacement(draggedItem, hoveredZone);
    setDraggedItem(null);
    setTouchDragPos(null);
    setHoveredZone(null);
  };

  // --- Core placement logic ---
  const processPlacement = (item: HeritageMapItem, zoneId: string) => {
    if (phase !== 'playing') return;
    const isCorrect = item.correctStateId === zoneId;
    const zone = HERITAGE_DROP_ZONES.find(z => z.id === zoneId);

    if (isCorrect) {
      setScores(prev => ({ ...prev, [activeTeam]: prev[activeTeam] + 50 }));
      setPlacedItems(prev => [...prev, { item, correct: true }]);
      setAvailableItems(prev => prev.filter(i => i.id !== item.id));
      setZoneFeedback({ zoneId, type: 'correct', stateName: zone?.name || zoneId });
      setFeedbackMsg({
        text: `✅ Correct! ${item.emoji} ${item.name} belongs to ${zone?.name || zoneId}`,
        type: 'good',
        funFact: item.funFact
      });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      setScores(prev => ({ ...prev, [activeTeam]: Math.max(0, prev[activeTeam] - 15) }));
      setZoneFeedback({ zoneId, type: 'wrong', stateName: zone?.name || zoneId });
      setFeedbackMsg({
        text: `❌ Incorrect! ${item.emoji} ${item.name} does NOT belong to ${zone?.name || zoneId}`,
        type: 'bad'
      });
    }

    setSelectedItem(null);
    setTimeout(() => setZoneFeedback(null), 2800);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const resetGame = () => {
    const shuffled = [...HERITAGE_MAP_ITEMS].sort(() => Math.random() - 0.5);
    const newLion = shuffled.slice(0, ITEMS_PER_ROUND);
    const newPeacock = shuffled.slice(ITEMS_PER_ROUND, ITEMS_PER_ROUND * 2);
    setLionItems(newLion);
    setPeacockItems(newPeacock);
    setAvailableItems(newLion);
    setActiveTeam('lion');
    setScores({ lion: 0, peacock: 0 });
    setPlacedItems([]);
    setPhase('playing');
    setTimerSeconds(ROUND_SECONDS);
    setFeedbackMsg(null);
    setZoneFeedback(null);
    setShowHint(null);
    setDraggedItem(null);
    setSelectedItem(null);
  };

  const winner = scores.lion > scores.peacock ? 'lion' : scores.peacock > scores.lion ? 'peacock' : 'tie';

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-black text-[#14213D]">
            🗺️ Bharat Heritage Map Challenge
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className={`px-3 py-1 rounded-full font-bold ${
            activeTeam === 'lion' 
              ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400' 
              : 'bg-blue-100 text-blue-800 ring-2 ring-blue-400'
          }`}>
            {activeTeam === 'lion' ? '🦁 Team Lion' : '🦚 Team Peacock'}
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded font-mono font-bold ${
            timerSeconds <= 15 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-gray-100 text-gray-700'
          }`}>
            <Clock className="w-4 h-4" />
            {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
          </div>
        </div>
      </div>

      <TeamScoreboard teamLionScore={scores.lion} teamPeacockScore={scores.peacock} activeTurn={activeTeam} />

      {/* Feedback toast */}
      {feedbackMsg && (
        <div className={`p-3 rounded-xl text-sm font-bold border-2 transition-all animate-bounce ${
          feedbackMsg.type === 'good'
            ? 'bg-green-50 border-green-300 text-green-800'
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          <div>{feedbackMsg.text}</div>
          {feedbackMsg.funFact && (
            <div className="mt-1 text-xs font-medium text-green-700 bg-green-100 rounded-lg p-2">
              💡 {feedbackMsg.funFact}
            </div>
          )}
        </div>
      )}

      {/* SWITCH SCREEN */}
      {phase === 'switch' && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center border-2 border-blue-200 shadow-lg">
          <div className="text-5xl mb-3">🦚</div>
          <h3 className="text-xl font-black text-blue-900 mb-2">Team Peacock's Turn!</h3>
          <p className="text-blue-700 text-sm mb-1">
            Team Lion scored <span className="font-bold text-amber-700">{scores.lion} pts</span>
          </p>
          <p className="text-blue-600 text-xs mb-4">
            Hand the device to Team Peacock — they'll get a different set of heritage items!
          </p>
          <button
            onClick={startPeacockRound}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            🏁 Start Peacock Round
          </button>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {phase === 'results' && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8 text-center border-2 border-amber-200 shadow-lg">
          <div className="text-5xl mb-3">
            {winner === 'lion' ? '🦁' : winner === 'peacock' ? '🦚' : '🤝'}
          </div>
          <h3 className="text-xl font-black text-[#14213D] mb-2">
            {winner === 'tie'
              ? 'It\'s a Tie!'
              : `Team ${winner === 'lion' ? 'Lion' : 'Peacock'} Wins!`}
          </h3>
          <div className="flex justify-center gap-8 my-4">
            <div className="text-center">
              <div className="text-3xl font-black text-amber-700">{scores.lion}</div>
              <div className="text-xs text-gray-500">🦁 Lion</div>
            </div>
            <div className="text-lg font-bold text-gray-400 self-center">vs</div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-700">{scores.peacock}</div>
              <div className="text-xs text-gray-500">🦚 Peacock</div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" /> Play Again
          </button>
        </div>
      )}

      {/* GAME AREA */}
      {phase === 'playing' && (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* LEFT: Map with drop zones */}
          <div
            ref={mapRef}
            className="relative flex-shrink-0 w-full lg:w-[54%] aspect-[896/1200] bg-[#FAF6EE] rounded-2xl border-2 border-amber-300/80 overflow-hidden shadow-academic select-none"
          >
            {/* Map background image */}
            <img
              src="/images/bharat_heritage_map.jpg"
              alt="Cultural & Educational Map of India"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              draggable={false}
            />

            {/* Real-time result banner directly on map */}
            {feedbackMsg && (
              <div
                className={`absolute top-3 left-3 right-3 z-40 p-3 rounded-xl shadow-2xl backdrop-blur-md border-2 flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                  feedbackMsg.type === 'good'
                    ? 'bg-[#0a2f1d]/95 border-emerald-400 text-white ring-2 ring-emerald-500/50'
                    : 'bg-[#400e0e]/95 border-rose-400 text-white ring-2 ring-rose-500/50'
                }`}
              >
                {feedbackMsg.type === 'good' ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5 animate-pulse" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm tracking-wide">
                    {feedbackMsg.text}
                  </div>
                  {feedbackMsg.funFact && (
                    <div className="text-xs text-emerald-200 mt-1 font-medium bg-black/30 rounded-lg p-2 border border-emerald-500/30">
                      💡 {feedbackMsg.funFact}
                    </div>
                  )}
                  {feedbackMsg.type === 'bad' && (
                    <div className="text-[11px] text-rose-200 mt-0.5 font-medium">
                      Try another state or click the 💡 hint button on the card!
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setFeedbackMsg(null)}
                  className="text-white/60 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Drop zones overlay */}
            {HERITAGE_DROP_ZONES.map(zone => {
              const isPlaced = placedItems.some(p => p.item.correctStateId === zone.id && p.correct);
              const isTargetForSelected = selectedItem?.correctStateId === zone.id;
              const feedbackOnThisZone = zoneFeedback?.zoneId === zone.id ? zoneFeedback : null;

              return (
                <div
                  key={zone.id}
                  data-zone-id={zone.id}
                  className={`group absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-10 ${
                    feedbackOnThisZone?.type === 'correct'
                      ? 'bg-emerald-500 ring-4 ring-emerald-300 scale-150 shadow-2xl z-30'
                      : feedbackOnThisZone?.type === 'wrong'
                      ? 'bg-rose-600 ring-4 ring-rose-300 scale-150 shadow-2xl z-30 animate-bounce'
                      : isPlaced
                      ? 'bg-green-600/85 ring-2 ring-green-400 scale-110 shadow-md'
                      : hoveredZone === zone.id
                      ? 'bg-amber-400/90 ring-4 ring-amber-500 scale-125 shadow-xl'
                      : isTargetForSelected
                      ? 'bg-amber-400/60 ring-2 ring-amber-400 animate-pulse scale-110'
                      : 'bg-orange-500/50 hover:bg-amber-400/80 ring-2 ring-white/90 shadow'
                  }`}
                  style={{ top: zone.top, left: zone.left }}
                  title={zone.name}
                  onClick={() => {
                    if (selectedItem) {
                      processPlacement(selectedItem, zone.id);
                    }
                  }}
                  onDragOver={e => handleDragOver(e, zone.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={e => handleDrop(e, zone.id)}
                >
                  {feedbackOnThisZone?.type === 'correct' ? (
                    <CheckCircle className="w-5 h-5 text-white animate-bounce" />
                  ) : feedbackOnThisZone?.type === 'wrong' ? (
                    <X className="w-5 h-5 text-white font-black animate-spin" />
                  ) : isPlaced ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                  )}

                  {/* Immediate Floating Feedback Pill on Zone */}
                  {feedbackOnThisZone && (
                    <div className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[11px] font-black shadow-xl whitespace-nowrap z-40 border animate-bounce ${
                      feedbackOnThisZone.type === 'correct'
                        ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-400'
                        : 'bg-rose-600 text-white border-rose-300 ring-2 ring-rose-400'
                    }`}>
                      {feedbackOnThisZone.type === 'correct' ? '+50 ✅ Correct!' : '-15 ❌ Not this state!'}
                    </div>
                  )}

                  {/* Hover tooltip */}
                  {!feedbackOnThisZone && (
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#14213D] text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30 transition-opacity border border-amber-400/30">
                      {zone.name}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Placed items labels */}
            {placedItems.filter(p => p.correct).map(p => {
              const zone = HERITAGE_DROP_ZONES.find(z => z.id === p.item.correctStateId);
              if (!zone) return null;
              return (
                <div
                  key={p.item.id}
                  className="absolute text-[9px] font-bold bg-green-100/95 text-green-900 px-1.5 py-0.5 rounded-full whitespace-nowrap pointer-events-none z-20 border border-green-400 shadow-sm"
                  style={{
                    top: `calc(${zone.top} + 14px)`,
                    left: zone.left,
                    transform: 'translateX(-50%)'
                  }}
                >
                  {p.item.emoji} {p.item.name}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Draggable heritage cards */}
          <div className="flex-1 min-w-0 bg-[#FAF6EE]/95 backdrop-blur-md p-4 rounded-2xl border-2 border-amber-300/80 shadow-academic">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-700">
                {selectedItem ? (
                  <span className="text-amber-700">🎯 Tap <b>{selectedItem.name}</b>'s state on the map!</span>
                ) : (
                  <span>🎯 Drag or tap an item to place ({availableItems.length} left)</span>
                )}
              </h3>
            </div>
            <div
              className="space-y-2 max-h-[65vh] overflow-y-auto pr-1"
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {availableItems.map(item => {
                const isSelected = selectedItem?.id === item.id;
                const isDragged = draggedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={e => handleDragStart(e, item)}
                    onTouchStart={e => handleTouchStart(e, item)}
                    onClick={() => setSelectedItem(isSelected ? null : item)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer active:cursor-grabbing transition-all select-none ${
                      isDragged
                        ? 'border-amber-500 bg-amber-50 shadow-lg scale-[1.02] opacity-70'
                        : isSelected
                        ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-400 scale-[1.01]'
                        : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex-shrink-0 text-gray-300">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="text-2xl flex-shrink-0">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-[#14213D] truncate">{item.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.category}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(showHint === item.id ? null : item.id);
                      }}
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-amber-100 text-amber-600 transition-colors"
                      title="Show hint"
                    >
                      <Lightbulb className="w-4 h-4" />
                    </button>
                    {showHint === item.id && (
                      <div className="absolute right-14 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-lg shadow-md border border-amber-200 z-30 whitespace-nowrap">
                        💡 {item.hint}
                      </div>
                    )}
                  </div>
                );
              })}

              {availableItems.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="font-bold text-green-600">All items placed!</p>
                  <p className="text-xs text-gray-500">Round ending...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Touch drag floating indicator */}
      {draggedItem && touchDragPos && (
        <div
          className="fixed z-50 pointer-events-none bg-amber-100 border-2 border-amber-500 rounded-xl px-3 py-2 shadow-xl flex items-center gap-2"
          style={{
            left: touchDragPos.x - 60,
            top: touchDragPos.y - 30,
          }}
        >
          <span className="text-lg">{draggedItem.emoji}</span>
          <span className="text-xs font-bold text-amber-800 truncate max-w-[100px]">{draggedItem.name}</span>
        </div>
      )}
    </div>
  );
};
