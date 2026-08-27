'use client';

import React, { useState } from 'react';
import { SectionId, StudentState } from '@/types';
import { LESSON_SECTIONS, KEY_TERMS_GLOSSARY } from '@/data/chapterContent';
import { FlashReview } from './interactive/FlashReview';
import { 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  Scroll, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap,
  Layers,
  HelpCircle
} from 'lucide-react';

interface RevisionDeskProps {
  studentState: StudentState;
  onNavigateSection: (sectionId: SectionId) => void;
  onStartAssessment: () => void;
}

export const RevisionDesk: React.FC<RevisionDeskProps> = ({
  studentState,
  onNavigateSection,
  onStartAssessment
}) => {
  const [activeTab, setActiveTab] = useState<'flash' | 'ideas' | 'terms' | 'sources' | 'mistakes'>('ideas');

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-8 shadow-academic flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revision Desk & Chapter Recap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14213D]">
            What Did We Learn?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Revisit key takeaways, definitions, and archaeological evidence before the final chapter assessment.
          </p>
        </div>

        <button
          onClick={onStartAssessment}
          className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-academic shrink-0 transition-all group"
        >
          <GraduationCap className="w-4 h-4" />
          <span>START ASSESSMENT</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setActiveTab('ideas')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'ideas'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-[#DACBBB] text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>7 Core Takeaways</span>
        </button>

        <button
          onClick={() => setActiveTab('flash')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'flash'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-[#DACBBB] text-gray-700 hover:bg-amber-50'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Flashcard Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'terms'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-[#DACBBB] text-gray-700 hover:bg-amber-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Master Glossary</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sources'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-[#DACBBB] text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Scroll className="w-3.5 h-3.5 text-amber-400" />
          <span>Ancient Sources</span>
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'mistakes'
              ? 'bg-[#1B2A4A] text-white shadow-xs'
              : 'bg-white border border-[#DACBBB] text-gray-700 hover:bg-amber-50'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Common Mistakes</span>
        </button>
      </div>

      {/* Tab 1: 7 Core Takeaways */}
      {activeTab === 'ideas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LESSON_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className="bg-white p-5 rounded-2xl border border-[#EAE0CF] shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      PART {sec.number}
                    </span>
                    <button
                      onClick={() => onNavigateSection(sec.id)}
                      className="text-[11px] text-amber-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      Revisit lesson <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-[#14213D]">
                    {sec.title}
                  </h4>

                  <p className="text-xs text-gray-700 mt-2 leading-relaxed font-sans">
                    “{sec.keyTakeaway}”
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EAE0CF] flex items-center gap-1 text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-700">Source:</span> {sec.sourceReference.split('&')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Flashcard Quiz */}
      {activeTab === 'flash' && (
        <FlashReview />
      )}

      {/* Tab 3: Master Glossary */}
      {activeTab === 'terms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KEY_TERMS_GLOSSARY.map((term) => (
            <div
              key={term.id}
              className="bg-white p-5 rounded-2xl border border-[#EAE0CF] shadow-xs space-y-2"
            >
              <div className="flex items-baseline gap-2">
                <h4 className="font-serif font-bold text-base text-[#14213D]">
                  {term.term}
                </h4>
                {term.devanagari && (
                  <span className="text-xs font-serif text-amber-800 font-bold sanskrit-font">
                    ({term.devanagari})
                  </span>
                )}
              </div>

              <div className="text-xs font-semibold text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                {term.shortDefinition}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {term.chapterContext}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Ancient Sources */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EAE0CF] space-y-4">
            <h4 className="font-serif font-bold text-base text-[#14213D]">
              Key Archaeological & Literary Evidence in Chapter 5
            </h4>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#DACBBB] space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800">1. Hathigumpha Inscription (1st c. BCE, Odisha)</span>
                <p className="text-xs text-gray-800 font-medium">
                  King Kharavela of Kalinga engraved the Prakrit word <strong>"Bharadhavasa"</strong> (Bharatavarsha) on stone, proving the geographical name existed in official records 2,100+ years ago.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#DACBBB] space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800">2. Ashoka’s Minor Rock Edicts (3rd c. BCE)</span>
                <p className="text-xs text-gray-800 font-medium">
                  Emperor Ashoka addressed his subjects across the subcontinent as the people of <strong>"Jambudvipa"</strong> (The Island of the Jamun tree).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#DACBBB] space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800">3. Persian Inscriptions of King Darius I (c. 515 BCE)</span>
                <p className="text-xs text-gray-800 font-medium">
                  At Naqsh-e-Rustam and Behistun, Darius I recorded <strong>"Hiⁿduš"</strong>, converting Sanskrit "Sindhu" (S to H sound shift).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#DACBBB] space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800">4. Megasthenes’ "Indika" (c. 300 BCE)</span>
                <p className="text-xs text-gray-800 font-medium">
                  The Greek ambassador wrote <strong>"Indika"</strong>, popularizing the name "India" across Greece and the Roman Empire.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#DACBBB] space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800">5. Xuanzang’s Da Tang Xiyu Ji (7th c. CE)</span>
                <p className="text-xs text-gray-800 font-medium">
                  The Chinese scholar recorded the name <strong>"Yindu"</strong> and compared India to the Moon (Indu) that illuminates humanity with spiritual light.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Common Mistakes */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" /> Mistake 1: "India is only a British name"
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Correction:</strong> The name "India" originated from ancient Greek "Indos" (from River Sindhu) used by Megasthenes in 300 BCE, more than 2,000 years before British rule!
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" /> Mistake 2: "Hindu was always a religious label"
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Correction:</strong> Ancient Persians used "Hindu" strictly as a <em>geographical term</em> to describe people living beyond the River Sindhu.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" /> Mistake 3: "Jambudvipa was just a myth"
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Correction:</strong> Jambudvipa was an official geographical term used by Emperor Ashoka on rock inscriptions across India in the 3rd century BCE.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-red-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" /> Mistake 4: "Ancient regions were isolated"
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Correction:</strong> Ancient trade routes (Uttarapatha, Dakshinapatha) and sacred river prayers connected all corners from the Himalayas to the Indian Ocean.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ready for Assessment Box */}
      <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl border border-[#DACBBB] text-center space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#14213D]">
          Ready to Test Your Mastery?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
          The summative assessment contains 12 comprehensive questions (100 points total) covering concept understanding, terminology, source interpretation, application, and reasoning.
        </p>
        <button
          onClick={onStartAssessment}
          className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-sm shadow-academic hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <GraduationCap className="w-5 h-5" />
          <span>START 100-POINT ASSESSMENT</span>
        </button>
      </div>

    </div>
  );
};
