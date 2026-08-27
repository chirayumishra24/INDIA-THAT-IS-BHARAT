'use client';

import React from 'react';
import { SectionId, StudentState } from '@/types';
import { LESSON_SECTIONS, CHAPTER_METADATA } from '@/data/chapterContent';
import { BookOpen, Bookmark, Edit3, Compass, CheckCircle2, GraduationCap, School, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentSection: SectionId;
  studentState: StudentState;
  onNavigate: (sectionId: SectionId) => void;
  onOpenNotes: () => void;
  onOpenBookmarks: () => void;
  onOpenCulturalMap: () => void;
  onResetProgress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  studentState,
  onNavigate,
  onOpenNotes,
  onOpenBookmarks,
  onOpenCulturalMap,
  onResetProgress
}) => {
  // Calculate progress percentage
  const totalSteps = LESSON_SECTIONS.length; // 7 lessons
  const completedCount = studentState.completedSections.filter(id => 
    LESSON_SECTIONS.some(sec => sec.id === id)
  ).length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);

  const notesCount = Object.keys(studentState.notes).filter(k => studentState.notes[k]?.trim()).length;
  const bookmarksCount = studentState.bookmarks.length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#EAE0CF] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Branding & Chapter Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={() => onNavigate('intro')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
            title="Go to Chapter Cover"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B2A4A] text-amber-400 flex items-center justify-center font-serif font-bold text-lg shadow-md group-hover:bg-[#0F1829] transition-colors">
              भ
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold tracking-wider uppercase text-amber-800 flex items-center gap-1.5">
                <span>{CHAPTER_METADATA.classLevel}</span>
                <span className="text-gray-300">•</span>
                <span className="hidden sm:inline">{CHAPTER_METADATA.theme}</span>
              </div>
              <h1 className="text-sm sm:text-base font-serif font-bold text-[#14213D] truncate group-hover:text-amber-700 transition-colors">
                Chapter 5: {CHAPTER_METADATA.title}
              </h1>
            </div>
          </button>
        </div>

        {/* Center: Progress & Navigation Tabs */}
        <div className="hidden md:flex items-center gap-2 bg-[#F4ECE0] p-1 rounded-xl border border-[#DACBBB]">
          <button
            onClick={() => onNavigate('intro')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              currentSection === 'intro' ? 'bg-white text-[#1B2A4A] shadow-sm font-semibold' : 'text-gray-600 hover:text-[#1B2A4A]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Cover
          </button>

          <button
            onClick={() => onNavigate('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              currentSection === 'roadmap' ? 'bg-white text-[#1B2A4A] shadow-sm font-semibold' : 'text-gray-600 hover:text-[#1B2A4A]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Roadmap
          </button>

          <button
            onClick={onOpenCulturalMap}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm hover:from-amber-700 hover:to-orange-700"
            title="Explore Interactive Cultural Map of India"
          >
            <span>🗺️</span>
            <span>Cultural Map</span>
          </button>

          <button
            onClick={() => onNavigate('revision')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              currentSection === 'revision' ? 'bg-white text-[#1B2A4A] shadow-sm font-semibold' : 'text-gray-600 hover:text-[#1B2A4A]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Revision Desk
          </button>

          <button
            onClick={() => onNavigate('assessment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              currentSection === 'assessment' ? 'bg-amber-600 text-white shadow-sm font-semibold' : 'text-gray-700 hover:text-amber-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Assessment {studentState.assessmentSubmitted && '✓'}
          </button>
        </div>

        {/* Right: Progress Meter & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Bar Badge */}
          <div className="hidden lg:flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#EAE0CF] shadow-xs">
            <span className="text-xs text-gray-500 font-medium">Learning Progress:</span>
            <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#1B2A4A]">{progressPct}%</span>
          </div>

          {/* Bookmarks Toggle */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 rounded-lg bg-white border border-[#EAE0CF] hover:bg-amber-50 hover:border-amber-300 text-gray-700 relative transition-colors"
            title="View Bookmarked Concepts"
          >
            <Bookmark className="w-4 h-4 text-amber-700" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Notes Toggle */}
          <button
            onClick={onOpenNotes}
            className="p-2 rounded-lg bg-white border border-[#EAE0CF] hover:bg-amber-50 hover:border-amber-300 text-gray-700 relative transition-colors"
            title="Open My Notebook"
          >
            <Edit3 className="w-4 h-4 text-blue-700" />
            {notesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {notesCount}
              </span>
            )}
          </button>

          {/* Teacher Mode Button */}
          <button
            onClick={() => onNavigate('teacher-dashboard')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentSection === 'teacher-dashboard'
                ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
                : 'bg-white border-[#DACBBB] text-gray-700 hover:bg-gray-50'
            }`}
            title="Switch to Teacher Dashboard"
          >
            <School className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Teacher View</span>
          </button>
        </div>
      </div>

      {/* Mobile progress line */}
      <div className="w-full bg-[#EAE0CF] h-1 mt-2.5 md:hidden rounded-full overflow-hidden">
        <div 
          className="bg-amber-600 h-1 rounded-full transition-all duration-500" 
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </header>
  );
};
