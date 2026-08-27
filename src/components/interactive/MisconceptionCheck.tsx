'use client';

import React, { useState } from 'react';
import { MisconceptionItem } from '@/types';
import { HelpCircle, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

interface MisconceptionCheckProps {
  items: MisconceptionItem[];
}

export const MisconceptionCheck: React.FC<MisconceptionCheckProps> = ({ items }) => {
  const [userChoices, setUserChoices] = useState<Record<string, 'yes' | 'no' | 'not-sure'>>({});

  const handleChoice = (id: string, choice: 'yes' | 'no' | 'not-sure') => {
    setUserChoices(prev => ({ ...prev, [id]: choice }));
  };

  return (
    <div className="space-y-5 bg-[#FAF6EE] p-5 sm:p-7 rounded-2xl border border-[#DACBBB] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[#EAE0CF] pb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-serif font-bold text-[#14213D] uppercase tracking-wider text-amber-900">
            Wait — Is This Really True?
          </h4>
          <p className="text-xs text-gray-600">
            Test common assumptions and uncover the historical facts behind each statement.
          </p>
        </div>
      </div>

      {/* Statement Cards */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const choice = userChoices[item.id];
          const hasAnswered = !!choice;
          const isCorrect = (choice === 'yes' && item.isTrue) || (choice === 'no' && !item.isTrue);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EAE0CF] p-5 space-y-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-sm sm:text-base font-serif font-bold text-[#14213D]">
                  “{item.statement}”
                </p>
              </div>

              {/* Selection Buttons */}
              <div className="flex flex-wrap gap-2 pl-9">
                <button
                  onClick={() => handleChoice(item.id, 'yes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    choice === 'yes'
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-xs ring-2 ring-blue-200'
                      : 'bg-[#FAF6EE] text-gray-700 border-[#DACBBB] hover:bg-amber-50'
                  }`}
                >
                  YES, That’s True
                </button>

                <button
                  onClick={() => handleChoice(item.id, 'no')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    choice === 'no'
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-xs ring-2 ring-blue-200'
                      : 'bg-[#FAF6EE] text-gray-700 border-[#DACBBB] hover:bg-amber-50'
                  }`}
                >
                  NO, That’s False
                </button>

                <button
                  onClick={() => handleChoice(item.id, 'not-sure')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                    choice === 'not-sure'
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  I’m Not Sure
                </button>
              </div>

              {/* Nuanced Feedback Card */}
              {hasAnswered && (
                <div className={`mt-3 p-4 rounded-xl border pl-4 text-xs space-y-1.5 animate-in fade-in duration-200 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Great reasoning — here is what the chapter tells us:</span>
                      </>
                    ) : choice === 'not-sure' ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Let’s look closely at the chapter idea:</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Common misconception! Let’s examine the facts:</span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-800 leading-relaxed font-sans text-xs sm:text-sm">
                    {item.explanation}
                  </p>

                  <div className="text-[10px] text-gray-500 font-mono pt-1">
                    Reference: {item.chapterReference}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
