'use client';

import React from 'react';
import { SectionId, StudentState } from '@/types';
import { LESSON_SECTIONS, CHAPTER_METADATA } from '@/data/chapterContent';
import { BookOpen, Bookmark, Edit3, Compass, Map, GraduationCap, School, RotateCcw } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/85 backdrop-blur-xl border-b border-[#EAE0CF]/80 shadow-xs px-3 sm:px-6 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-6">
        
        {/* Left: Branding & Chapter Title */}
        <div className="flex items-center gap-2.5 min-w-0 shrink-0">
          <button 
            onClick={() => onNavigate('intro')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1 transition-all"
            title="Go to Chapter Cover"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1B2A4A] to-[#0D1527] border border-amber-400/50 text-amber-300 flex items-center justify-center font-serif font-bold text-base sm:text-lg shadow-md shadow-amber-950/10 group-hover:border-amber-400 group-hover:scale-105 transition-all shrink-0">
              भ
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-amber-800 flex items-center gap-1.5 whitespace-nowrap leading-none mb-1">
                <span className="bg-amber-100/80 px-1.5 py-0.5 rounded text-[10px] text-amber-900 border border-amber-300/40">{CHAPTER_METADATA.classLevel}</span>
                <span className="text-gray-400">•</span>
                <span>{CHAPTER_METADATA.theme}</span>
              </div>
              <h1 className="text-xs sm:text-sm lg:text-base font-serif font-bold text-[#14213D] truncate group-hover:text-amber-700 transition-colors leading-tight">
                Chapter 5: {CHAPTER_METADATA.title}
              </h1>
            </div>
          </button>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center gap-2 bg-[#F4ECE0]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#DACBBB]/80 shadow-inner">
          <button
            onClick={() => onNavigate('activity-arena')}
            className="px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black shadow-md shadow-amber-950/20 active:scale-95 cursor-pointer"
            title="View All 10 Competitive Activities"
          >
            <span className="text-base">🎮</span>
            <span>All 10 Competitive Activities</span>
            <span className="px-2 py-0.5 bg-black text-amber-300 text-[10px] rounded-full font-bold">Arena</span>
          </button>

          <button
            onClick={onOpenCulturalMap}
            className="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 bg-[#1B2A4A] hover:bg-[#23365d] text-amber-200 shadow-xs hover:shadow-md transition-all active:scale-95"
            title="Explore Interactive Cultural Map of India"
          >
            <Map className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Map</span>
          </button>
        </nav>

        {/* Right: Progress Meter & Utilities */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Progress Bar Badge */}
          <div className="hidden xl:flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-xl border border-[#EAE0CF] shadow-xs whitespace-nowrap">
            <span className="text-[11px] text-gray-500 font-medium">Learning Progress:</span>
            <div className="w-16 lg:w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
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
            className="w-9 h-9 rounded-xl bg-white border border-[#EAE0CF] hover:bg-amber-50 hover:border-amber-300 text-gray-700 relative transition-colors flex items-center justify-center"
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
            className="w-9 h-9 rounded-xl bg-white border border-[#EAE0CF] hover:bg-amber-50 hover:border-amber-300 text-gray-700 relative transition-colors flex items-center justify-center"
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
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
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
      <div className="w-full bg-[#EAE0CF] h-1 mt-2 md:hidden rounded-full overflow-hidden">
        <div 
          className="bg-amber-600 h-1 rounded-full transition-all duration-500" 
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </header>
  );
};
