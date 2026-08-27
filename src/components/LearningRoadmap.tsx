'use client';

import React from 'react';
import { SectionId, StudentState } from '@/types';
import { LESSON_SECTIONS } from '@/data/chapterContent';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  RotateCcw, 
  GraduationCap, 
  Layers, 
  Sparkles,
  Scroll,
  Trees,
  Waves,
  Globe,
  Mountain,
  Milestone
} from 'lucide-react';

interface LearningRoadmapProps {
  studentState: StudentState;
  onNavigateSection: (sectionId: SectionId) => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  'dual-name': <Layers className="w-5 h-5" />,
  'bharat-origin': <Scroll className="w-5 h-5" />,
  'jambudvipa': <Trees className="w-5 h-5" />,
  'sindhu-to-india': <Waves className="w-5 h-5" />,
  'foreign-travelers': <Globe className="w-5 h-5" />,
  'geographical-unity': <Mountain className="w-5 h-5" />,
  'cultural-tapestry': <Milestone className="w-5 h-5" />
};

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  studentState,
  onNavigateSection
}) => {
  const completedCount = studentState.completedSections.filter(id =>
    LESSON_SECTIONS.some(sec => sec.id === id)
  ).length;

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-8 shadow-academic">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Self-Guided Learning Path</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14213D]">
            Today We Will Explore
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Follow this structured sequence to understand the historical, cultural, and geographical origins of the name of our nation.
          </p>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#EAE0CF] text-xs text-gray-700">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Ideas</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Important Terms</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Historical Evidence</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Connections & Analysis</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Summative Assessment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Roadmap Steps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Lesson Sequence ({completedCount} / {LESSON_SECTIONS.length} Completed)
          </h3>
          <span className="text-xs text-amber-800 font-semibold">
            {Math.round((completedCount / LESSON_SECTIONS.length) * 100)}% Finished
          </span>
        </div>

        <div className="space-y-3">
          {LESSON_SECTIONS.map((sec, index) => {
            const isCompleted = studentState.completedSections.includes(sec.id);
            const isCurrent = studentState.currentSectionId === sec.id;
            const confidence = studentState.confidenceRatings[sec.id];

            return (
              <div
                key={sec.id}
                onClick={() => onNavigateSection(sec.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                  isCurrent
                    ? 'bg-amber-50/70 border-amber-400 shadow-md ring-2 ring-amber-200'
                    : isCompleted
                    ? 'bg-white border-emerald-200 hover:border-emerald-400 shadow-xs'
                    : 'bg-white border-[#EAE0CF] hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                {/* Left info */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#FAF6EE] text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-800'
                  }`}>
                    {SECTION_ICONS[sec.id] || <span>{sec.number}</span>}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        PART {sec.number}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {sec.durationMinutes} mins
                      </span>
                      {confidence && (
                        <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          Confidence: {confidence.replace('-', ' ')}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-serif font-bold text-[#14213D] group-hover:text-amber-800 transition-colors">
                      {sec.title}
                    </h4>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Status */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF6EE] text-gray-700 text-xs font-medium border border-[#DACBBB] group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-colors">
                      <span>Start Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revision & Assessment Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        
        {/* Revision Desk Card */}
        <div
          onClick={() => onNavigateSection('revision')}
          className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#DACBBB] hover:border-amber-400 transition-all cursor-pointer group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-amber-700 border border-[#DACBBB] flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                Revision & Glossary
              </div>
              <h4 className="text-base font-serif font-bold text-[#14213D]">
                Revision Desk & Flash Cards
              </h4>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Revisit key takeaways, vocabulary flashcards, and ancient source archives before the test.
          </p>
        </div>

        {/* Summative Assessment Card */}
        <div
          onClick={() => onNavigateSection('assessment')}
          className="p-5 rounded-2xl bg-[#1B2A4A] text-white border border-[#0F1829] hover:bg-[#14213D] transition-all cursor-pointer group shadow-academic hover:shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-[#1B2A4A] flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                Summative Assessment
              </div>
              <h4 className="text-base font-serif font-bold text-white">
                Chapter Test & Learning Report
              </h4>
            </div>
          </div>
          <p className="text-xs text-gray-300 mt-2">
            100-point comprehensive assessment covering terminology, source interpretation, and historical reasoning.
          </p>
        </div>

      </div>

    </div>
  );
};
