'use client';

import React from 'react';
import { SectionId, StudentState } from '@/types';
import { CHAPTER_METADATA, LESSON_SECTIONS } from '@/data/chapterContent';
import { BookOpen, Compass, CheckCircle2, Clock, Award, ArrowRight, Sparkles, ScrollText, Landmark, MapPin } from 'lucide-react';

interface ChapterCoverProps {
  studentState: StudentState;
  onStartLearning: () => void;
  onNavigate: (sectionId: SectionId) => void;
}

export const ChapterCover: React.FC<ChapterCoverProps> = ({
  studentState,
  onStartLearning,
  onNavigate,
}) => {
  const completedCount = studentState.completedSections.filter(id =>
    LESSON_SECTIONS.some(sec => sec.id === id)
  ).length;
  const progressPct = Math.round((completedCount / LESSON_SECTIONS.length) * 100);

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Card / Book Cover Presentation */}
      <div className="relative bg-white rounded-3xl border border-[#EAE0CF] shadow-academic-lg p-6 sm:p-10 lg:p-14 overflow-hidden">
        
        {/* Subtle decorative background motif */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
          
          {/* Badge & Subject Metadata */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE] border border-[#DACBBB] text-[#1B2A4A] text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span>{CHAPTER_METADATA.classLevel} • {CHAPTER_METADATA.subject}</span>
            <span className="text-gray-300">|</span>
            <span className="text-amber-800">{CHAPTER_METADATA.theme}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-semibold tracking-widest text-amber-800 uppercase">
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
          <div className="relative rounded-2xl overflow-hidden border border-[#DACBBB] shadow-md group">
            <img
              src="/images/tapestry_comic.jpg"
              alt="The Tapestry of the Past: Civilizational Continuity for Bharat"
              className="w-full h-auto object-cover max-h-[360px] transform group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 bg-[#FAF6EE]/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-[#DACBBB] shadow-lg flex items-center justify-between gap-2 text-xs">
              <div className="text-[#1B2A4A] font-semibold text-left text-[11px] sm:text-xs">
                <span className="font-bold text-amber-800 uppercase block sm:inline sm:mr-1">Civilizational Continuity:</span>
                “From Ashoka's Edicts & Nalanda to the Constitution — One Unbroken Tapestry.”
              </div>
              <span className="text-[10px] bg-[#1B2A4A] text-amber-300 font-bold px-2 py-1 rounded-md shrink-0">
                NCERT Theme B
              </span>
            </div>
          </div>

          {/* Central Visual Artifact Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EAE0CF] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <ScrollText className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#1B2A4A]">Ancient Sources</div>
              <div className="text-[11px] text-gray-600 mt-0.5">Rigveda, Hathigumpha Inscription & Vishnu Purana</div>
            </div>

            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EAE0CF] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-2">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#1B2A4A]">Natural Frontiers</div>
              <div className="text-[11px] text-gray-600 mt-0.5">From the snowy Himalayas to the Indian Ocean</div>
            </div>

            <div className="bg-[#FAF6EE] p-4 rounded-2xl border border-[#EAE0CF] shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                <Landmark className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-[#1B2A4A]">Article 1(1)</div>
              <div className="text-[11px] text-gray-600 mt-0.5">Uniting ancient roots with modern democracy</div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-2xl font-bold text-base shadow-academic hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>{completedCount > 0 ? 'CONTINUE LEARNING' : 'BEGIN LEARNING'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('roadmap')}
              className="w-full sm:w-auto px-6 py-4 bg-[#FAF6EE] hover:bg-[#F4ECE0] text-[#1B2A4A] border border-[#DACBBB] rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              <span>View Learning Roadmap</span>
            </button>
          </div>

          {/* Meta Information Footer */}
          <div className="pt-4 border-t border-[#EAE0CF] flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Estimated time: <strong>{CHAPTER_METADATA.estimatedTime}</strong></span>
            </div>

            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{LESSON_SECTIONS.length} Interactive Lessons</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Progress: <strong>{progressPct}%</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Overview of Learning Goals */}
      <div className="bg-[#FAF6EE] rounded-2xl border border-[#DACBBB] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-serif font-bold text-[#14213D] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          What You Will Learn In This Chapter:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHAPTER_METADATA.learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#EAE0CF] text-xs text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
