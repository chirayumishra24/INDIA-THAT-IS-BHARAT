'use client';

import React, { useState } from 'react';
import { KeyTerm } from '@/types';
import { BookOpen, Sparkles, CheckCircle2, AlertCircle, Edit3, Volume2 } from 'lucide-react';

interface KeyTermsLabProps {
  terms: KeyTerm[];
}

export const KeyTermsLab: React.FC<KeyTermsLabProps> = ({ terms }) => {
  const [selectedTermId, setSelectedTermId] = useState<string>(terms[0]?.id || '');
  const [userSentences, setUserSentences] = useState<Record<string, string>>({});
  const [sentenceEvaluations, setSentenceEvaluations] = useState<Record<string, {
    matched: string[];
    isGood: boolean;
    feedback: string;
  }>>({});

  const activeTerm = terms.find(t => t.id === selectedTermId) || terms[0];
  if (!activeTerm) return null;

  const currentSentence = userSentences[activeTerm.id] || '';
  const currentEval = sentenceEvaluations[activeTerm.id];

  const handleEvaluateSentence = () => {
    if (!currentSentence.trim()) return;

    const lowerSentence = currentSentence.toLowerCase();
    const matched = activeTerm.keywordsExpected.filter(kw =>
      lowerSentence.includes(kw.toLowerCase())
    );

    const isGood = matched.length >= 2 || (currentSentence.length > 25 && matched.length >= 1);

    setSentenceEvaluations(prev => ({
      ...prev,
      [activeTerm.id]: {
        matched,
        isGood,
        feedback: isGood
          ? `Great usage! You accurately incorporated key concepts (${matched.join(', ')}).`
          : `Good effort! To make your sentence stronger, try including words like: ${activeTerm.keywordsExpected.slice(0, 3).join(', ')}.`
      }
    }));
  };

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D] uppercase tracking-wider text-amber-900">
              Key Terms Laboratory
            </h4>
            <p className="text-xs text-gray-600">
              Master essential vocabulary and practice using historical terms in context.
            </p>
          </div>
        </div>

        {/* Term Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {terms.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTermId(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedTermId === t.id
                  ? 'bg-[#1B2A4A] text-white shadow-xs'
                  : 'bg-[#FAF6EE] border border-[#DACBBB] text-gray-700 hover:bg-amber-100'
              }`}
            >
              {t.term}
            </button>
          ))}
        </div>
      </div>

      {/* Term Card */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#DACBBB] p-5 sm:p-7 space-y-5">
        
        {/* Title & Pronunciation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#EAE0CF] shadow-xs">
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-amber-800 font-bold">
              ESSENTIAL CHAPTER VOCABULARY
            </span>
            <div className="flex items-baseline gap-3 mt-0.5">
              <h3 className="text-2xl font-serif font-bold text-[#14213D]">
                {activeTerm.term}
              </h3>
              {activeTerm.devanagari && (
                <span className="text-base font-serif text-amber-900 font-bold sanskrit-font">
                  ({activeTerm.devanagari})
                </span>
              )}
            </div>
            {activeTerm.iast && (
              <div className="text-xs font-mono text-gray-500 italic">
                IAST: {activeTerm.iast}
              </div>
            )}
          </div>
        </div>

        {/* Definition & Context Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-[#EAE0CF] space-y-1.5">
            <div className="font-bold text-[#1B2A4A] uppercase tracking-wider text-[11px]">
              Concise Definition:
            </div>
            <p className="text-gray-800 text-sm leading-relaxed font-sans">
              {activeTerm.shortDefinition}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#EAE0CF] space-y-1.5">
            <div className="font-bold text-[#1B2A4A] uppercase tracking-wider text-[11px]">
              Chapter Context:
            </div>
            <p className="text-gray-700 leading-relaxed font-sans">
              {activeTerm.chapterContext}
            </p>
          </div>
        </div>

        {/* Textbook Example */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950">
          <strong className="text-amber-900 font-serif">Textbook Example:</strong> “{activeTerm.textbookExample}”
        </div>

        {/* "Use It" Student Challenge */}
        <div className="bg-white p-5 rounded-xl border border-[#EAE0CF] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-amber-700" />
              Practice Using It In A Sentence:
            </label>
            <span className="text-[10px] text-gray-500">
              {activeTerm.usagePrompt}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={currentSentence}
              onChange={(e) => setUserSentences(prev => ({ ...prev, [activeTerm.id]: e.target.value }))}
              placeholder={`Write a sentence containing "${activeTerm.term}"...`}
              className="flex-1 p-3 rounded-xl border border-[#DACBBB] text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEvaluateSentence();
              }}
            />
            <button
              onClick={handleEvaluateSentence}
              disabled={!currentSentence.trim()}
              className="px-5 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
            >
              Test Sentence
            </button>
          </div>

          {currentEval && (
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              currentEval.isGood
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                {currentEval.isGood ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
                Feedback
              </div>
              <p className="leading-relaxed">{currentEval.feedback}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
