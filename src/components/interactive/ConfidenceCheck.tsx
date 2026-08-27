'use client';

import React from 'react';
import { ConfidenceRating } from '@/types';
import { HelpCircle, CheckCircle2, ThumbsUp, Sparkles } from 'lucide-react';

interface ConfidenceCheckProps {
  currentRating?: ConfidenceRating;
  onSelectRating: (rating: ConfidenceRating) => void;
}

const RATINGS: { id: ConfidenceRating; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'need-help',
    label: 'I Need More Help',
    description: 'The ideas are still confusing.',
    icon: <HelpCircle className="w-4 h-4 text-rose-600" />
  },
  {
    id: 'getting-it',
    label: "I'm Getting It",
    description: 'Starting to understand key points.',
    icon: <ThumbsUp className="w-4 h-4 text-amber-600" />
  },
  {
    id: 'understand',
    label: 'I Understand It',
    description: 'Clear on the concepts and evidence.',
    icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />
  },
  {
    id: 'can-explain',
    label: 'I Could Explain It',
    description: 'Ready to teach this to a classmate!',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />
  }
];

export const ConfidenceCheck: React.FC<ConfidenceCheckProps> = ({
  currentRating,
  onSelectRating
}) => {
  return (
    <div className="bg-[#FAF6EE] p-5 sm:p-6 rounded-2xl border border-[#DACBBB] space-y-3">
      <div className="flex items-center justify-between">
        <h5 className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider">
          How confident are you with this lesson?
        </h5>
        {currentRating && (
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Recorded in your learning report
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {RATINGS.map((item) => {
          const isSelected = currentRating === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectRating(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-md ring-2 ring-amber-300 scale-[1.02]'
                  : 'bg-white border-[#EAE0CF] text-gray-800 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-[#FAF6EE]'}`}>
                  {item.icon}
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-amber-400 text-[#1B2A4A] border-amber-400' : 'border-gray-300'
                }`}>
                  {isSelected ? '✓' : ''}
                </span>
              </div>

              <div>
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#14213D]'}`}>
                  {item.label}
                </div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
