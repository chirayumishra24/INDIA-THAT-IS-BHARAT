'use client';

import React, { useState } from 'react';
import { SortCategory, SortItem } from '@/types';
import { Layers, CheckCircle2, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';

interface SortActivityProps {
  instruction: string;
  categories: SortCategory[];
  items: SortItem[];
}

export const SortActivity: React.FC<SortActivityProps> = ({
  instruction,
  categories,
  items
}) => {
  // State: mapping of itemId -> categoryId
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const unassignedItems = items.filter(item => !placements[item.id]);

  const handleSelectCategory = (catId: string) => {
    if (!selectedItemId) return;
    setPlacements(prev => ({
      ...prev,
      [selectedItemId]: catId
    }));
    setSelectedItemId(null);
    setIsSubmitted(false);
  };

  const handleRemoveFromCategory = (itemId: string) => {
    setPlacements(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setIsSubmitted(false);
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedItemId(null);
    setIsSubmitted(false);
  };

  // Check results
  const isAllAssigned = items.every(item => placements[item.id]);
  const correctCount = items.filter(item => placements[item.id] === item.categoryId).length;

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D]">
              Sort & Classify Activity
            </h4>
            <p className="text-xs text-gray-600">
              {instruction}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-amber-800 flex items-center gap-1 font-medium p-1 rounded hover:bg-amber-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Unassigned Items Pool */}
      {unassignedItems.length > 0 && (
        <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#DACBBB] space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-600 flex items-center justify-between">
            <span>Items to classify ({unassignedItems.length} remaining):</span>
            <span className="text-amber-800 text-[10px]">Tap an item, then tap a category box below</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {unassignedItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
                className={`p-3 rounded-xl border text-xs text-left transition-all font-medium ${
                  selectedItemId === item.id
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                    : 'bg-white border-[#DACBBB] text-gray-800 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Target Category Bins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => {
          const categoryItems = items.filter(item => placements[item.id] === category.id);

          return (
            <div
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[180px] ${
                selectedItemId
                  ? 'border-amber-400 bg-amber-50/40 hover:bg-amber-100/50 cursor-pointer ring-2 ring-amber-200'
                  : 'border-[#EAE0CF] bg-[#FAF6EE]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="font-serif font-bold text-sm text-[#1B2A4A]">
                    {category.title}
                  </h5>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-[#DACBBB] text-gray-600">
                    {categoryItems.length} items
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {category.description}
                </p>

                {/* Placed items */}
                <div className="mt-3 space-y-2">
                  {categoryItems.length === 0 ? (
                    <div className="text-center py-6 text-xs text-gray-400 border border-dashed border-[#DACBBB] rounded-xl">
                      {selectedItemId ? 'Tap here to place selected item' : 'No items placed here yet'}
                    </div>
                  ) : (
                    categoryItems.map(item => {
                      const isCorrect = item.categoryId === category.id;

                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                            isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                                : 'bg-red-50 border-red-300 text-red-950'
                              : 'bg-white border-[#DACBBB] text-gray-800'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="font-medium">{item.text}</span>
                            {isSubmitted && (
                              <p className="text-[11px] mt-1 pt-1 border-t border-gray-200 text-gray-600 font-sans">
                                <strong>Why:</strong> {item.explanation}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromCategory(item.id);
                            }}
                            className="text-gray-400 hover:text-red-600 text-xs font-bold px-1.5 py-0.5 rounded hover:bg-red-50 transition-colors"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {selectedItemId && (
                <div className="mt-3 text-center text-[11px] font-bold text-amber-800 bg-amber-100 py-1.5 rounded-lg">
                  Click to drop here ↵
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission & Feedback Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-gray-600">
          {isSubmitted ? (
            <span className="font-bold text-[#1B2A4A]">
              Score: {correctCount} / {items.length} items placed correctly!
            </span>
          ) : isAllAssigned ? (
            <span className="text-amber-800 font-semibold">
              All items sorted! Click "Check My Placement" to verify.
            </span>
          ) : (
            `Place all ${items.length} items into categories.`
          )}
        </div>

        <button
          disabled={!isAllAssigned}
          onClick={() => setIsSubmitted(true)}
          className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          Check My Placement
        </button>
      </div>

    </div>
  );
};
