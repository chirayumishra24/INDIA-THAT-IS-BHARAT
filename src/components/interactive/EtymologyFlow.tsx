'use client';

import React, { useState } from 'react';
import { EtymologyStep } from '@/types';
import { Waves, ArrowRight, ArrowLeft, Volume2, Sparkles, Milestone, CheckCircle2 } from 'lucide-react';

interface EtymologyFlowProps {
  steps: EtymologyStep[];
}

export const EtymologyFlow: React.FC<EtymologyFlowProps> = ({ steps }) => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const currentStep = steps.find(s => s.stage === activeStage) || steps[0];

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Waves className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D]">
              Interactive Linguistic Journey: From Sindhu to India
            </h4>
            <p className="text-xs text-gray-600">
              Click through the stages to trace how world travelers adapted the name of the river Sindhu.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
          Stage {activeStage} of {steps.length}
        </div>
      </div>

      {/* Stage Timeline Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((step) => {
          const isActive = step.stage === activeStage;
          const isPassed = step.stage < activeStage;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStage(step.stage)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-200'
                  : isPassed
                  ? 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                  : 'bg-[#FAF6EE] text-gray-700 border-[#EAE0CF] hover:bg-amber-50'
              }`}
            >
              <div className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
                Stage {step.stage} • {step.approxDate.split(' ')[0]}
              </div>
              <div className="font-serif font-bold text-sm truncate mt-0.5">
                {step.name.split(' ')[0]}
              </div>
              <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-600'}`}>
                {step.languageOrPeople.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Focus Card for Active Stage */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#DACBBB] p-5 sm:p-7 space-y-5">
        
        {/* Term & Language Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#EAE0CF] shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              {currentStep.languageOrPeople} • ({currentStep.approxDate})
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#14213D]">
              {currentStep.name}
            </h3>
          </div>

          <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium shrink-0">
            Source: <strong>{currentStep.sourceOrDoc}</strong>
          </div>
        </div>

        {/* Phonetic Sound Rule Callout */}
        <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl space-y-1 text-xs">
          <div className="font-bold text-blue-900 flex items-center gap-1.5 uppercase text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            Linguistic Rule / Sound Shift
          </div>
          <p className="text-blue-950 font-medium text-sm leading-relaxed">
            {currentStep.phoneticRule}
          </p>
        </div>

        {/* Meaning & Historical Context */}
        <div className="bg-white p-4 rounded-xl border border-[#EAE0CF] space-y-1.5 text-xs text-gray-700">
          <div className="font-bold text-[#1B2A4A] uppercase text-[11px]">
            Historical Meaning & Context:
          </div>
          <p className="text-sm leading-relaxed text-gray-800 font-sans">
            {currentStep.meaningAndContext}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={activeStage === 1}
            onClick={() => setActiveStage(prev => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-[#DACBBB] bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Stage
          </button>

          <button
            disabled={activeStage === steps.length}
            onClick={() => setActiveStage(prev => Math.min(steps.length, prev + 1))}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors shadow-xs"
          >
            Next Stage <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Summary Formula Box */}
      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
        <div>
          <strong>Key Takeaway:</strong> Sindhu (River) $\to$ Hindu (Persian) $\to$ Indos $\to$ India (Greek) & Hindustan (Persian suffix -stan). One river gave birth to all these historic names!
        </div>
      </div>

    </div>
  );
};
