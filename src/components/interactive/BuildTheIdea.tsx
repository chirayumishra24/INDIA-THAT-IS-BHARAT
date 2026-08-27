'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ArrowDown, MoveUp, MoveDown } from 'lucide-react';

interface BuildTheIdeaProps {
  instruction: string;
  pieces: { id: string; role: string; text: string }[];
  correctOrder: string[];
  completeNarrative: string;
}

export const BuildTheIdea: React.FC<BuildTheIdeaProps> = ({
  instruction,
  pieces,
  correctOrder,
  completeNarrative
}) => {
  // Start with shuffled pieces
  const [currentOrder, setCurrentOrder] = useState<string[]>(() => {
    // Initial order: scrambled [p3, p1, p4, p2]
    return [...pieces.map(p => p.id)].reverse();
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setCurrentOrder(newOrder);
    setIsSubmitted(false);
  };

  const isCorrect = currentOrder.every((id, idx) => id === correctOrder[idx]);

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D]">
              Build the Historical Narrative
            </h4>
            <p className="text-xs text-gray-600">
              {instruction}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentOrder([...pieces.map(p => p.id)].reverse());
            setIsSubmitted(false);
          }}
          className="text-xs text-gray-500 hover:text-amber-800 flex items-center gap-1 font-medium p-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Shuffle
        </button>
      </div>

      {/* Reorderable List */}
      <div className="space-y-3">
        {currentOrder.map((pieceId, index) => {
          const piece = pieces.find(p => p.id === pieceId);
          if (!piece) return null;

          const isPlacedCorrectly = pieceId === correctOrder[index];

          return (
            <div
              key={piece.id}
              className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                isSubmitted
                  ? isPlacedCorrectly
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-red-50 border-red-300'
                  : 'bg-[#FAF6EE] border-[#DACBBB] hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-white border border-[#DACBBB] font-bold text-xs flex items-center justify-center text-[#1B2A4A] shrink-0">
                  {index + 1}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-white px-2 py-0.5 rounded border border-[#EAE0CF]">
                    {piece.role}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 mt-1">
                    {piece.text}
                  </p>
                </div>
              </div>

              {/* Up / Down Controls */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  disabled={index === 0}
                  onClick={() => moveItem(index, 'up')}
                  className="p-1 rounded bg-white border border-[#DACBBB] hover:bg-amber-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move up"
                >
                  <MoveUp className="w-3.5 h-3.5 text-gray-700" />
                </button>
                <button
                  disabled={index === currentOrder.length - 1}
                  onClick={() => moveItem(index, 'down')}
                  className="p-1 rounded bg-white border border-[#DACBBB] hover:bg-amber-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move down"
                >
                  <MoveDown className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Narrative Synthesis & Check Button */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">
            Use the arrows to place the timeline in proper chronological order.
          </span>
          <button
            onClick={() => setIsSubmitted(true)}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Check Sequence
          </button>
        </div>

        {isSubmitted && (
          <div className={`p-4 rounded-xl border ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="font-serif font-bold text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              {isCorrect ? 'Outstanding! You built the complete historical narrative:' : 'Almost there! Here is the complete historical sequence:'}
            </div>
            <p className="text-xs leading-relaxed text-gray-800">
              {completeNarrative}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
