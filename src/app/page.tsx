'use client';

import React, { useState, useEffect } from 'react';
import { SectionId, StudentState, ConfidenceRating } from '@/types';
import { LESSON_SECTIONS } from '@/data/chapterContent';
import { Header } from '@/components/Header';
import { ChapterCover } from '@/components/ChapterCover';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { LessonSectionView } from '@/components/LessonSectionView';
import { RevisionDesk } from '@/components/RevisionDesk';
import { AssessmentEngine } from '@/components/AssessmentEngine';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { NotesAndBookmarksModal } from '@/components/interactive/NotesAndBookmarksModal';
import { IndiaCulturalMapModal } from '@/components/interactive/IndiaCulturalMapModal';
import { CivilizationalEntryPortal } from '@/components/ui/CivilizationalEntryPortal';

const STORAGE_KEY = 'bharat_learning_studio_state_v1';
const PORTAL_SEEN_KEY = 'bharat_portal_seen_session_v1';

const INITIAL_STATE: StudentState = {
  currentSectionId: 'intro',
  completedSections: [],
  confidenceRatings: {},
  bookmarks: ['src-hathigumpha'],
  notes: {},
  formativeAnswers: {},
  summativeAnswers: {},
  assessmentSubmitted: false
};

export default function Home() {
  const [studentState, setStudentState] = useState<StudentState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEntryPortal, setShowEntryPortal] = useState(true);

  // Modal states
  const [activeModal, setActiveModal] = useState<'notes' | 'bookmarks' | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Check portal session state on mount
  useEffect(() => {
    try {
      const portalSeen = sessionStorage.getItem(PORTAL_SEEN_KEY);
      if (portalSeen === 'true') {
        setShowEntryPortal(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDismissPortal = () => {
    setShowEntryPortal(false);
    try {
      sessionStorage.setItem(PORTAL_SEEN_KEY, 'true');
    } catch (e) {
      console.error(e);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setStudentState(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading state from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentState));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }, [studentState, isLoaded]);

  const navigateTo = (sectionId: SectionId) => {
    setStudentState(prev => ({
      ...prev,
      currentSectionId: sectionId
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string) => {
    setStudentState(prev => {
      const exists = prev.bookmarks.includes(id);
      const nextBookmarks = exists
        ? prev.bookmarks.filter(b => b !== id)
        : [...prev.bookmarks, id];
      return { ...prev, bookmarks: nextBookmarks };
    });
  };

  const handleUpdateNote = (key: string, note: string) => {
    setStudentState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [key]: note
      }
    }));
  };

  const handleRecordConfidence = (secId: string, rating: ConfidenceRating) => {
    setStudentState(prev => ({
      ...prev,
      confidenceRatings: {
        ...prev.confidenceRatings,
        [secId]: rating
      }
    }));
  };

  const handleMarkCompleted = (secId: string) => {
    setStudentState(prev => {
      if (prev.completedSections.includes(secId)) return prev;
      return {
        ...prev,
        completedSections: [...prev.completedSections, secId]
      };
    });
  };

  const handleSaveAssessmentScore = (
    scoreData: NonNullable<StudentState['scoreBreakdown']>,
    answers: Record<string, any>
  ) => {
    setStudentState(prev => ({
      ...prev,
      summativeAnswers: answers,
      assessmentSubmitted: true,
      scoreBreakdown: scoreData
    }));
  };

  // Find active lesson section if current view is a lesson
  const activeLesson = LESSON_SECTIONS.find(s => s.id === studentState.currentSectionId);

  return (
    <div className="min-h-screen flex flex-col text-[#14213D]">
      
      {/* Civilizational Prologue Entry Animation */}
      {showEntryPortal && (
        <CivilizationalEntryPortal onEnter={handleDismissPortal} />
      )}

      {/* Persistent Navigation Header */}
      <Header
        currentSection={studentState.currentSectionId}
        studentState={studentState}
        onNavigate={navigateTo}
        onOpenNotes={() => setActiveModal('notes')}
        onOpenBookmarks={() => setActiveModal('bookmarks')}
        onOpenCulturalMap={() => setIsMapModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {studentState.currentSectionId === 'intro' && (
          <ChapterCover
            studentState={studentState}
            onStartLearning={() => {
              const firstIncomplete = LESSON_SECTIONS.find(
                s => !studentState.completedSections.includes(s.id)
              );
              navigateTo(firstIncomplete ? firstIncomplete.id : 'dual-name');
            }}
            onNavigate={navigateTo}
            onOpenCulturalMap={() => setIsMapModalOpen(true)}
          />
        )}

        {studentState.currentSectionId === 'roadmap' && (
          <LearningRoadmap
            studentState={studentState}
            onNavigateSection={navigateTo}
          />
        )}

        {activeLesson && (
          <LessonSectionView
            section={activeLesson}
            studentState={studentState}
            onNavigateSection={navigateTo}
            onRecordConfidence={handleRecordConfidence}
            onToggleBookmark={handleToggleBookmark}
            onOpenNotes={() => setActiveModal('notes')}
            onMarkCompleted={handleMarkCompleted}
          />
        )}

        {studentState.currentSectionId === 'revision' && (
          <RevisionDesk
            studentState={studentState}
            onNavigateSection={navigateTo}
            onStartAssessment={() => navigateTo('assessment')}
          />
        )}

        {studentState.currentSectionId === 'assessment' && (
          <AssessmentEngine
            studentState={studentState}
            onSaveAssessmentScore={handleSaveAssessmentScore}
            onNavigateSection={navigateTo}
          />
        )}

        {studentState.currentSectionId === 'teacher-dashboard' && (
          <TeacherDashboard
            onNavigateSection={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#FAF6EE] border-t border-[#EAE0CF] py-6 px-4 text-center text-xs text-gray-500 space-y-1">
        <div>
          <strong>Bharat Learning Studio</strong> • Class VI Social Science (Theme B: Tapestry of the Past)
        </div>
        <div>
          Based directly on NCERT <em>Exploring Society: India and Beyond</em> • Chapter 5: "India, That Is Bharat"
        </div>
      </footer>

      {/* Study Notebook & Bookmarks Modal */}
      <NotesAndBookmarksModal
        isOpen={activeModal !== null}
        type={activeModal || 'notes'}
        onClose={() => setActiveModal(null)}
        bookmarks={studentState.bookmarks}
        notes={studentState.notes}
        onUpdateNote={handleUpdateNote}
        onRemoveBookmark={handleToggleBookmark}
        onNavigateSection={navigateTo}
      />

      {/* Interactive Cultural Map & State Heritage Explorer Modal */}
      <IndiaCulturalMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

    </div>
  );
}
