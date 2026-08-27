'use client';

import React, { useState } from 'react';
import { ThinkConnectItem } from '@/types';
import { GitMerge, Lightbulb, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ThinkAndConnectProps {
  items: ThinkConnectItem[];
}

export const ThinkAndConnect: React.FC<ThinkAndConnectProps> = ({ items }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [studentText, setStudentText] = useState<Record<string, string>>({});

  const handleSelectOption = (itemId: string, optId: string) => {
    setSelectedOptions(prev => ({ ...prev, [itemId]: optId }));
  };

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[#EAE0CF] pb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
          <GitMerge className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-serif font-bold text-[#14213D] uppercase tracking-wider text-amber-900">
            Think & Connect
          </h4>
          <p className="text-xs text-gray-600">
            Connect historical concepts to discover the deeper patterns of our civilizational tapestry.
          </p>
        </div>
      </div>

      {items.map((item) => {
        const chosenOptId = selectedOptions[item.id];
        const chosenOpt = item.options.find(o => o.id === chosenOptId);

        return (
          <div key={item.id} className="space-y-5">
            
            {/* Two Ideas Connection Visual */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
              
              <div className="sm:col-span-5 bg-[#FAF6EE] p-4 rounded-xl border border-[#DACBBB] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Concept A
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#14213D] mt-0.5">
                  {item.ideaA}
                </p>
              </div>

              <div className="sm:col-span-1 text-center font-bold text-lg text-amber-600 flex justify-center">
                <span className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs">
                  +
                </span>
              </div>

              <div className="sm:col-span-5 bg-[#FAF6EE] p-4 rounded-xl border border-[#DACBBB] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Concept B
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#14213D] mt-0.5">
                  {item.ideaB}
                </p>
              </div>

            </div>

            {/* Prompt Question */}
            <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase">
                <Lightbulb className="w-4 h-4 text-amber-700" />
                What connection do you see?
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">
                {item.question}
              </p>
            </div>

            {/* Selectable Options */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase text-gray-500">
                Select your reasoning:
              </div>

              {item.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(item.id, opt.id)}
                  className={`w-full p-4 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-start gap-3 ${
                    chosenOptId === opt.id
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A] shadow-md ring-2 ring-blue-200'
                      : 'bg-[#FAF6EE] text-gray-800 border-[#EAE0CF] hover:bg-amber-50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    chosenOptId === opt.id
                      ? 'bg-amber-400 text-[#1B2A4A] border-amber-400'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}>
                    {chosenOptId === opt.id ? '✓' : ''}
                  </span>
                  <span className="font-medium leading-relaxed">{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Optional student short reflection */}
            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#DACBBB] space-y-2">
              <label className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider block">
                Can you explain this idea in your own words? (Optional)
              </label>
              <textarea
                value={studentText[item.id] || ''}
                onChange={(e) => setStudentText(prev => ({ ...prev, [item.id]: e.target.value }))}
                placeholder="Type a sentence or two explaining the connection..."
                rows={2}
                className="w-full p-3 rounded-lg border border-[#DACBBB] bg-white text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Feedback & Model Explanation */}
            {chosenOpt && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2 text-xs text-emerald-950 animate-in fade-in duration-200">
                <div className="font-bold flex items-center gap-1.5 uppercase text-[11px] text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {chosenOpt.feedback}
                </div>
                <div className="pt-2 border-t border-emerald-200/80">
                  <strong>Let's compare with the chapter analysis:</strong> {item.modelExplanation}
                </div>
              </div>
            )}

          </div>
        );
      })}

    </div>
  );
};
