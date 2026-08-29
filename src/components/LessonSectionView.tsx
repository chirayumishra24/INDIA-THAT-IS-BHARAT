'use client';

import React, { useState } from 'react';
import { LessonSection, SectionId, StudentState, ConfidenceRating } from '@/types';
import { LESSON_SECTIONS } from '@/data/chapterContent';
import { SourceExplorer } from './interactive/SourceExplorer';
import { EtymologyFlow } from './interactive/EtymologyFlow';
import { PuranaShlokaViewer } from './interactive/PuranaShlokaViewer';
import { SortActivity } from './interactive/SortActivity';
import { BuildTheIdea } from './interactive/BuildTheIdea';
import { MisconceptionCheck } from './interactive/MisconceptionCheck';
import { ThinkAndConnect } from './interactive/ThinkAndConnect';
import { KeyTermsLab } from './interactive/KeyTermsLab';
import { ConfidenceCheck } from './interactive/ConfidenceCheck';
import { VisionaryComicCard } from './interactive/VisionaryComicCard';
import { CivilizationalTimelineRibbon } from './ui/CivilizationalTimelineRibbon';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  Edit3, 
  Sparkles, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  KeyRound,
  AlertCircle
} from 'lucide-react';

interface LessonSectionViewProps {
  section: LessonSection;
  studentState: StudentState;
  onNavigateSection: (sectionId: SectionId) => void;
  onRecordConfidence: (sectionId: string, rating: ConfidenceRating) => void;
  onToggleBookmark: (id: string) => void;
  onOpenNotes: () => void;
  onMarkCompleted: (sectionId: string) => void;
}

export const LessonSectionView: React.FC<LessonSectionViewProps> = ({
  section,
  studentState,
  onNavigateSection,
  onRecordConfidence,
  onToggleBookmark,
  onOpenNotes,
  onMarkCompleted
}) => {
  const currentIndex = LESSON_SECTIONS.findIndex(s => s.id === section.id);
  const prevSection = currentIndex > 0 ? LESSON_SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < LESSON_SECTIONS.length - 1 ? LESSON_SECTIONS[currentIndex + 1] : null;

  // Formative check local answer
  const [selectedOption, setSelectedOption] = useState<number | null>(
    studentState.formativeAnswers[section.id] ?? null
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(
    selectedOption !== null
  );

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === section.formativeCheck.correctIndex) {
      onMarkCompleted(section.id);
    }
  };

  const [activeConceptCardId, setActiveConceptCardId] = useState<string>(
    section.conceptCards?.[0]?.id || ''
  );

  const currentConfidence = studentState.confidenceRatings[section.id];
  const isSectionBookmarked = studentState.bookmarks.includes(section.id);

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Civilizational Timeline Ribbon */}
      <CivilizationalTimelineRibbon
        currentSection={section.id}
        onNavigate={onNavigateSection}
      />

      {/* Top Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE0CF] pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <span className="text-amber-800 uppercase tracking-wider font-bold">Part {section.number} of {LESSON_SECTIONS.length}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-gray-600">
            <Clock className="w-3.5 h-3.5" /> {section.durationMinutes} mins
          </span>
          <span>•</span>
          <span className="text-gray-400 hidden sm:inline">{section.sourceReference}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(section.id)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isSectionBookmarked
                ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                : 'bg-[#FAF6EE] border-[#DACBBB] text-gray-700 hover:bg-amber-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-700" />
            <span>{isSectionBookmarked ? 'Bookmarked' : 'Bookmark Section'}</span>
          </button>

          {/* Quick Note Button */}
          <button
            onClick={onOpenNotes}
            className="px-3 py-1.5 rounded-lg border border-[#DACBBB] bg-[#FAF6EE] hover:bg-blue-50 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-700" />
            <span>My Note</span>
          </button>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="gold-filigree-card rounded-3xl p-6 sm:p-10 shadow-academic space-y-4">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50/80 px-3 py-1 rounded-full border border-amber-300/60 shadow-xs">
            <span>LESSON PART {section.number}</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#14213D] tracking-tight">
            {section.title}
          </h2>

          <p className="text-base sm:text-lg font-serif italic text-gray-700 leading-relaxed">
            {section.subtitle}
          </p>
        </div>

        {/* Short explanation with illuminated drop cap */}
        <div className="pt-2 border-t border-[#EAE0CF]">
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-serif manuscript-lead">
            {section.shortExplanation}
          </p>

          {/* Highlighted Key Words */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-amber-600" />
              Focus Words:
            </span>
            {section.keyWords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#FAF6EE] border border-[#DACBBB] text-xs font-semibold text-[#1B2A4A]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Comic Visionary Dialogue Card (if present) */}
      {section.comicFeature && (
        <VisionaryComicCard
          imageSrc={section.comicFeature.imageSrc}
          imageAlt={section.comicFeature.imageAlt}
          title={section.comicFeature.title}
          subtitle={section.comicFeature.subtitle}
          eraBadge={section.comicFeature.eraBadge}
          dialogues={section.comicFeature.dialogues}
        />
      )}

      {/* 1. Key Concept Explorer Cards (if present) */}
      {section.conceptCards && section.conceptCards.length > 0 && (
        <div className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE0CF] shadow-academic">
          <div className="flex items-center justify-between border-b border-[#EAE0CF] pb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#14213D] uppercase tracking-wider text-amber-900">
                What Does This Idea Mean?
              </h3>
              <p className="text-xs text-gray-600">
                Click each card to reveal the definition, explanation, and chapter memory tip.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {section.conceptCards.map(card => {
              const isActive = activeConceptCardId === card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => setActiveConceptCardId(card.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-200'
                      : 'bg-[#FAF6EE] border-[#DACBBB] text-gray-800 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      KEY CONCEPT
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#14213D] mt-0.5">
                      {card.term}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 font-medium">
                      {card.title}
                    </p>
                  </div>

                  <div className="mt-3 text-[11px] font-bold text-amber-800 flex items-center justify-between pt-2 border-t border-[#EAE0CF]">
                    <span>{isActive ? 'Currently Inspecting' : 'Click to Inspect'}</span>
                    <span>{isActive ? '↓' : '→'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Card Detailed Reveal */}
          {(() => {
            const activeCard = section.conceptCards.find(c => c.id === activeConceptCardId) || section.conceptCards[0];
            if (!activeCard) return null;

            return (
              <div className="bg-[#FAF6EE] rounded-2xl border border-[#DACBBB] p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-serif font-bold text-[#14213D]">
                    {activeCard.term} — {activeCard.title}
                  </h4>
                  <button
                    onClick={() => onToggleBookmark(activeCard.id)}
                    className="text-xs text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> Bookmark this card
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#EAE0CF] text-xs sm:text-sm text-gray-800 space-y-2">
                  <div className="font-bold text-amber-900 uppercase text-[11px]">
                    Definition:
                  </div>
                  <p className="leading-relaxed">{activeCard.definition}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#EAE0CF] text-xs sm:text-sm text-gray-800 space-y-2">
                  <div className="font-bold text-[#1B2A4A] uppercase text-[11px]">
                    Explanation & Historical Context:
                  </div>
                  <p className="leading-relaxed">{activeCard.explanation}</p>
                </div>

                <div className="p-3.5 bg-amber-100/70 rounded-xl border border-amber-300 text-xs text-amber-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-800 shrink-0" />
                  <div>
                    <strong>Remember This:</strong> {activeCard.rememberNote}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 2. Specialized Interactive Features based on Section ID */}
      {section.sources && section.sources.length > 0 && (
        <SourceExplorer
          sources={section.sources}
          bookmarks={studentState.bookmarks}
          onToggleBookmark={onToggleBookmark}
        />
      )}

      {section.etymologySteps && section.etymologySteps.length > 0 && (
        <EtymologyFlow steps={section.etymologySteps} />
      )}

      {section.id === 'geographical-unity' && (
        <PuranaShlokaViewer />
      )}

      {section.sortActivity && (
        <SortActivity
          instruction={section.sortActivity.instruction}
          categories={section.sortActivity.categories}
          items={section.sortActivity.items}
        />
      )}

      {section.buildTheIdea && (
        <BuildTheIdea
          instruction={section.buildTheIdea.instruction}
          pieces={section.buildTheIdea.pieces}
          correctOrder={section.buildTheIdea.correctOrder}
          completeNarrative={section.buildTheIdea.completeNarrative}
        />
      )}

      {section.misconceptions && section.misconceptions.length > 0 && (
        <MisconceptionCheck items={section.misconceptions} />
      )}

      {section.thinkConnect && section.thinkConnect.length > 0 && (
        <ThinkAndConnect items={section.thinkConnect} />
      )}

      {section.keyTerms && section.keyTerms.length > 0 && (
        <KeyTermsLab terms={section.keyTerms} />
      )}

      {/* 3. Formative Check (Understanding Check) */}
      <div className="bg-white rounded-3xl border border-[#EAE0CF] p-6 sm:p-8 shadow-academic space-y-5">
        <div className="flex items-center gap-2 border-b border-[#EAE0CF] pb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Formative Understanding Check
            </h4>
            <p className="text-xs text-gray-500">
              Test your grasp of this lesson before continuing.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm sm:text-base font-serif font-bold text-[#14213D]">
            {section.formativeCheck.question}
          </p>

          <div className="space-y-2">
            {section.formativeCheck.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === section.formativeCheck.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-4 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-start gap-3 ${
                    showExplanation
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                        : isSelected
                        ? 'bg-red-50 border-red-300 text-red-950'
                        : 'bg-white border-[#EAE0CF] text-gray-600 opacity-60'
                      : isSelected
                      ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                      : 'bg-[#FAF6EE] text-gray-800 border-[#DACBBB] hover:bg-amber-50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    showExplanation && isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : showExplanation && isSelected
                      ? 'bg-red-600 text-white border-red-600'
                      : isSelected
                      ? 'bg-amber-400 text-[#1B2A4A] border-amber-400'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Formative Feedback */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
              selectedOption === section.formativeCheck.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5 uppercase text-[11px]">
                {selectedOption === section.formativeCheck.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Great — you've understood the key idea!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Let’s revisit the explanation:</span>
                  </>
                )}
              </div>
              <p className="text-gray-800 font-sans leading-relaxed text-xs sm:text-sm">
                {section.formativeCheck.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Confidence Check */}
      <ConfidenceCheck
        currentRating={currentConfidence}
        onSelectRating={(rating) => onRecordConfidence(section.id, rating)}
      />

      {/* 5. Key Takeaway Box */}
      <div className="bg-[#1B2A4A] text-white p-6 sm:p-8 rounded-3xl shadow-academic space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Key Lesson Takeaway
        </div>
        <p className="font-serif text-base sm:text-lg leading-relaxed text-gray-100">
          “{section.keyTakeaway}”
        </p>
      </div>

      {/* 6. Bottom Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#EAE0CF]">
        {prevSection ? (
          <button
            onClick={() => onNavigateSection(prevSection.id)}
            className="px-5 py-3 rounded-2xl border border-[#DACBBB] bg-white text-[#1B2A4A] hover:bg-[#FAF6EE] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Part {prevSection.number}:</span> {prevSection.title.split(' ')[0]}
          </button>
        ) : (
          <button
            onClick={() => onNavigateSection('intro')}
            className="px-5 py-3 rounded-2xl border border-[#DACBBB] bg-white text-gray-600 hover:bg-[#FAF6EE] text-xs font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Chapter Cover
          </button>
        )}

        <div className="text-xs font-bold text-gray-500">
          Part {section.number} / {LESSON_SECTIONS.length}
        </div>

        {nextSection ? (
          <button
            onClick={() => onNavigateSection(nextSection.id)}
            className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-academic"
          >
            <span>Next: {nextSection.title.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigateSection('revision')}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-academic"
          >
            <span>Go to Revision Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
