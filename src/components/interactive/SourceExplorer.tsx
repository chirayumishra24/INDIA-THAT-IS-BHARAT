'use client';

import React, { useState } from 'react';
import { SourceArtifact } from '@/types';
import { Scroll, Bookmark, Search, Eye, HelpCircle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface SourceExplorerProps {
  sources: SourceArtifact[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const SourceExplorer: React.FC<SourceExplorerProps> = ({
  sources,
  bookmarks,
  onToggleBookmark
}) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(sources[0]?.id || '');
  const [revealedAnalysis, setRevealedAnalysis] = useState<Record<string, boolean>>({});

  const activeSource = sources.find(s => s.id === selectedSourceId) || sources[0];
  if (!activeSource) return null;

  const isBookmarked = bookmarks.includes(activeSource.id);
  const isAnalysisRevealed = revealedAnalysis[activeSource.id] || false;

  const toggleRevealAnalysis = () => {
    setRevealedAnalysis(prev => ({
      ...prev,
      [activeSource.id]: !prev[activeSource.id]
    }));
  };

  return (
    <div className="space-y-4 bg-[#FAF6EE] p-5 sm:p-7 rounded-2xl border border-[#DACBBB] shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <Scroll className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D]">
              Historical Source Explorer
            </h4>
            <p className="text-xs text-gray-600">
              Inspect authentic archaeological inscriptions, manuscripts, and traveler accounts.
            </p>
          </div>
        </div>

        {/* Source selector if multiple */}
        {sources.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sources.map((src) => (
              <button
                key={src.id}
                onClick={() => setSelectedSourceId(src.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSourceId === src.id
                    ? 'bg-[#1B2A4A] text-white shadow-xs'
                    : 'bg-white border border-[#DACBBB] text-gray-700 hover:bg-amber-100'
                }`}
              >
                {src.title.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Artifact Dossier Card */}
      <div className="bg-white rounded-2xl border border-[#EAE0CF] shadow-sm overflow-hidden">
        
        {/* Artifact Top Bar */}
        <div className="bg-[#1B2A4A] text-white px-5 py-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300">
              PRIMARY SOURCE • {activeSource.sourceType.toUpperCase()}
            </span>
            <h5 className="text-base font-serif font-bold text-white">
              {activeSource.title}
            </h5>
          </div>

          <button
            onClick={() => onToggleBookmark(activeSource.id)}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
              isBookmarked
                ? 'bg-amber-500 text-[#1B2A4A] font-bold'
                : 'bg-white/10 hover:bg-white/20 text-gray-200'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark this source'}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>

        {/* Metadata Badges */}
        <div className="bg-[#F4ECE0] px-5 py-2.5 border-b border-[#DACBBB] flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-700 font-medium">
          <div><strong>Era:</strong> {activeSource.era}</div>
          <div><strong>Location:</strong> {activeSource.location}</div>
          <div><strong>Language / Script:</strong> {activeSource.languageScript}</div>
        </div>

        {/* Inscription / Text Display Box */}
        <div className="p-5 sm:p-6 space-y-6">
          
          <div className="bg-amber-50/70 rounded-xl border border-amber-200 p-4 sm:p-5 relative manuscript-border">
            <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-700" />
              Original Text / Epigraph
            </div>
            
            <div className="text-lg sm:text-xl font-serif text-[#14213D] font-bold py-1 sanskrit-font">
              {activeSource.originalSnippet}
            </div>

            {activeSource.transliteration && (
              <div className="text-xs font-mono text-gray-600 italic mt-1">
                IAST Transliteration: {activeSource.transliteration}
              </div>
            )}

            <div className="text-xs sm:text-sm text-gray-800 font-medium mt-2 pt-2 border-t border-amber-200/80">
              <strong className="text-amber-950">English Translation:</strong> {activeSource.translation}
            </div>
          </div>

          {/* Interactive Inspection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE0CF] space-y-1">
              <div className="font-bold text-[#1B2A4A] flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                1. What do we see?
              </div>
              <p className="text-gray-700 leading-relaxed">
                {activeSource.whatWeSee}
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE0CF] space-y-1">
              <div className="font-bold text-[#1B2A4A] flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                2. What does it tell us?
              </div>
              <p className="text-gray-700 leading-relaxed">
                {activeSource.whatItTellsUs}
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE0CF] space-y-1">
              <div className="font-bold text-[#1B2A4A] flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                3. What can we learn?
              </div>
              <p className="text-gray-700 leading-relaxed">
                {activeSource.whatWeLearn}
              </p>
            </div>
          </div>

          {/* Key Term Highlight */}
          <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-blue-900">
            <span className="font-bold uppercase text-[11px] text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
              Important Key Term
            </span>
            <span className="font-semibold">{activeSource.importantTerm}</span>
          </div>

          {/* Think About It Prompt */}
          <div className="bg-amber-100/60 p-4 rounded-xl border border-amber-300/80 space-y-2">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase">
              <HelpCircle className="w-4 h-4 text-amber-800" />
              Think About It
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-gray-800">
              “{activeSource.thinkPrompt}”
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
