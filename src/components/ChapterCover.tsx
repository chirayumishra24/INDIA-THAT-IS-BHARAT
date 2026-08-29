'use client';

import React from 'react';
import { SectionId, StudentState } from '@/types';
import { CHAPTER_METADATA, LESSON_SECTIONS } from '@/data/chapterContent';
import { BookOpen, Compass, CheckCircle2, Clock, Award, ArrowRight, Sparkles, ScrollText } from 'lucide-react';
import { ZoomableImage } from '@/components/ui/ZoomableImage';
import { CivilizationalTimelineRibbon } from '@/components/ui/CivilizationalTimelineRibbon';

interface ChapterCoverProps {
  studentState: StudentState;
  onStartLearning: () => void;
  onNavigate: (sectionId: SectionId) => void;
  onOpenCulturalMap?: () => void;
}

export const ChapterCover: React.FC<ChapterCoverProps> = ({
  studentState,
  onStartLearning,
  onNavigate,
  onOpenCulturalMap
}) => {
  const completedCount = studentState.completedSections.filter(id =>
    LESSON_SECTIONS.some(sec => sec.id === id)
  ).length;
  const progressPct = Math.round((completedCount / LESSON_SECTIONS.length) * 100);

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Card / Book Cover Presentation */}
      <div className="relative gold-filigree-card rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden">
        
        {/* Subtle decorative background motif */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
          
          {/* Badge & Subject Metadata */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EE]/95 backdrop-blur-md border border-[#DACBBB] text-[#1B2A4A] text-xs font-semibold tracking-wide uppercase shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
            <span>{CHAPTER_METADATA.classLevel} • {CHAPTER_METADATA.subject}</span>
            <span className="text-gray-300">|</span>
            <span className="text-amber-800 font-bold">{CHAPTER_METADATA.theme}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold tracking-widest text-amber-800 uppercase">
              CHAPTER {CHAPTER_METADATA.chapterNumber}
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#14213D] tracking-tight leading-tight">
              INDIA, THAT IS BHARAT
            </h1>
            <p className="text-base sm:text-xl font-serif italic text-gray-700 max-w-2xl mx-auto leading-relaxed">
              “{CHAPTER_METADATA.subtitle}”
            </p>
          </div>

          {/* Panoramic Comic Banner: Tapestry of the Past */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4C3AC] shadow-academic-md group">
            <ZoomableImage
              src="/images/comic_tapestry_banner.png"
              alt="The Tapestry of the Past: Civilizational Continuity for Bharat (NCERT Theme B Illustration)"
              caption="From Ashoka's Edicts & Nalanda to the Constitution — One Unbroken Tapestry"
              className="w-full h-auto object-cover max-h-[380px]"
            />
            <div className="p-3.5 bg-[#FAF6EE]/95 border-t border-[#EAE0CF] text-xs text-gray-700 font-serif text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <strong className="text-amber-900 font-sans uppercase tracking-wide text-[11px] block">
                  CIVILIZATIONAL CONTINUITY:
                </strong>
                <span>“From Ashoka's Edicts & Nalanda to the Constitution — One Unbroken Tapestry of Values & Knowledge.”</span>
              </div>
              <span className="shrink-0 text-[10px] bg-[#1B2A4A] text-amber-300 px-2 py-0.5 rounded font-mono font-semibold">
                NCERT Theme B
              </span>
            </div>
          </div>

          {/* Quick Metrics & Reading Meta */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs text-gray-600 font-serif">
            <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-full border border-[#DACBBB]">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>{CHAPTER_METADATA.estimatedTime} full lesson</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-full border border-[#DACBBB]">
              <ScrollText className="w-3.5 h-3.5 text-amber-700" />
              <span>{LESSON_SECTIONS.length} Historical Sections</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-3 py-1.5 rounded-full border border-[#DACBBB]">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Interactive Inscription Lab</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {completedCount > 0 ? 'Continue Exploration' : 'Begin Chapter Study'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('roadmap')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#FAF6EE] hover:bg-[#F2E8D8] text-[#1B2A4A] rounded-2xl font-semibold text-sm border border-[#DACBBB] transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Chapter Roadmap</span>
            </button>
          </div>

          {/* Progress overview if started */}
          {completedCount > 0 && (
            <div className="pt-2 max-w-sm mx-auto space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span>Chapter Progress</span>
                <span className="text-amber-800">{progressPct}% Complete</span>
              </div>
              <div className="w-full h-2 bg-[#EAE0CF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Civilizational Timeline Continuum Ribbon */}
      <CivilizationalTimelineRibbon
        currentSection={studentState.currentSectionId}
        onNavigate={onNavigate}
      />

      {/* Featured Banner: Interactive Cultural Map */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1B2A4A] via-[#16223B] to-[#0F1829] border border-amber-500/40 p-6 sm:p-8 shadow-academic-lg text-white overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden border border-amber-400/30 shadow-md group">
            <ZoomableImage
              src="/images/india_cultural_map.jpg"
              alt="Illustrated Cultural Map of India"
              caption="Interactive Geographic & Cultural Atlas of India"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Geographic & Cultural Atlas
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              The Living Tapestry of Indian States & Heritage
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-serif">
              Discover how every state—from Kashmir's saffron & monasteries to Tamil Nadu's soaring temple gopurams and Assam's tea valleys—weaves the grand civilizational identity of Bharat.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCulturalMap}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-[#1B2A4A] rounded-xl font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>Launch Cultural Map Explorer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-gray-400">
                Covers monuments, dances, arts, cuisine & civilizational roots
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview of Learning Goals */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#DACBBB] p-6 sm:p-8 space-y-4 shadow-academic-sm">
        <h3 className="text-base font-serif font-bold text-[#14213D] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          What You Will Learn In This Chapter:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTER_METADATA.learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE0CF] text-xs text-gray-700 font-serif">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
