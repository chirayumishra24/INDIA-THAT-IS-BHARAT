'use client';

import React, { useState, useEffect } from 'react';
import { SectionId, StudentState, ConfidenceRating } from '@/types';
import { Header } from '@/components/Header';
import { IndiaCulturalMapModal } from '@/components/interactive/IndiaCulturalMapModal';
import { CivilizationalEntryPortal } from '@/components/ui/CivilizationalEntryPortal';
import { BackgroundVideo } from '@/components/ui/BackgroundVideo';
import { ActivityArena } from '@/components/activities/ActivityArena';

const STORAGE_KEY = 'bharat_learning_studio_state_v1';
const PORTAL_SEEN_KEY = 'bharat_portal_seen_session_v1';

const INITIAL_STATE: StudentState = {
  currentSectionId: 'activity-arena',
  completedSections: [],
  confidenceRatings: {},
  bookmarks: [],
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

  return (
    <div className="min-h-screen flex flex-col text-[#14213D] relative bg-[#07090e]">
      
      {/* Background Ambient Video Layer */}
      <BackgroundVideo />

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

      {/* Main Content Area: Pure Activity Arena */}
      <main className="flex-1 pb-16 relative z-10">
        <ActivityArena />
      </main>

      {/* Footer */}
      <footer className="bg-[#FAF6EE] border-t border-[#EAE0CF] py-6 px-4 text-center text-xs text-gray-500 space-y-1 relative z-10">
        <div>
          <strong>India, That Is Bharat • Activity & Game Arena</strong> • Class VI Social Science
        </div>
        <div>
          10 Interactive Team & 1v1 Battle Activities
        </div>
      </footer>

      {/* Interactive Cultural Map & State Heritage Explorer Modal */}
      <IndiaCulturalMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

    </div>
  );
}
