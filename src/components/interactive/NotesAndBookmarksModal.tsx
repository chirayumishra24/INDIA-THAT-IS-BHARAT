'use client';

import React, { useState } from 'react';
import { SectionId } from '@/types';
import { LESSON_SECTIONS, KEY_TERMS_GLOSSARY } from '@/data/chapterContent';
import { Bookmark, Edit3, X, Trash2, ArrowRight, BookOpen, Check } from 'lucide-react';

interface NotesAndBookmarksModalProps {
  isOpen: boolean;
  type: 'notes' | 'bookmarks';
  onClose: () => void;
  bookmarks: string[];
  notes: Record<string, string>;
  onUpdateNote: (key: string, note: string) => void;
  onRemoveBookmark: (id: string) => void;
  onNavigateSection: (sectionId: SectionId) => void;
}

export const NotesAndBookmarksModal: React.FC<NotesAndBookmarksModalProps> = ({
  isOpen,
  type,
  onClose,
  bookmarks,
  notes,
  onUpdateNote,
  onRemoveBookmark,
  onNavigateSection,
}) => {
  const [selectedNoteSection, setSelectedNoteSection] = useState<string>(
    LESSON_SECTIONS[0]?.id || 'dual-name'
  );
  const [currentNoteText, setCurrentNoteText] = useState<string>(
    notes[selectedNoteSection] || ''
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveNote = () => {
    onUpdateNote(selectedNoteSection, currentNoteText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSectionSelect = (secId: string) => {
    setSelectedNoteSection(secId);
    setCurrentNoteText(notes[secId] || '');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF6EE] border border-[#DACBBB] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1B2A4A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'notes' ? (
              <>
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg">My Study Notebook</h3>
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg">Bookmarked Concepts & Sources</h3>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {type === 'notes' ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-600">
                Jot down key takeaways, reminders for homework, or questions to ask your teacher. All notes are saved automatically to your browser.
              </p>

              {/* Section selector tabs */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {LESSON_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleSectionSelect(sec.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedNoteSection === sec.id
                        ? 'bg-[#1B2A4A] text-white shadow-sm font-semibold'
                        : 'bg-white border border-[#EAE0CF] text-gray-700 hover:bg-amber-50'
                    }`}
                  >
                    <span>Part {sec.number}</span>
                    {notes[sec.id]?.trim() && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Section Title */}
              <div className="bg-white p-3 rounded-xl border border-[#EAE0CF] flex items-center justify-between">
                <div className="text-xs font-semibold text-[#1B2A4A]">
                  Section {LESSON_SECTIONS.find(s => s.id === selectedNoteSection)?.number}: {LESSON_SECTIONS.find(s => s.id === selectedNoteSection)?.title}
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateSection(selectedNoteSection as SectionId);
                  }}
                  className="text-xs text-amber-700 hover:underline flex items-center gap-1 font-medium"
                >
                  Jump to lesson <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Note Textarea */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Personal Note:
                </label>
                <textarea
                  value={currentNoteText}
                  onChange={(e) => setCurrentNoteText(e.target.value)}
                  placeholder="Type your notes here... e.g. Remember that Hathigumpha inscription is in Odisha and uses the Prakrit word Bharadhavasa!"
                  rows={6}
                  className="w-full p-3 rounded-xl border border-[#DACBBB] bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-sm text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">
                  {savedSuccess ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Note saved successfully!
                    </span>
                  ) : (
                    'Click save to record changes.'
                  )}
                </div>
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-gray-600">
                Cards and sources you marked with the bookmark icon for quick review before exams:
              </p>

              {bookmarks.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-[#DACBBB]">
                  <Bookmark className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-600">No bookmarks saved yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click the bookmark icon on any concept card or historical source card while learning.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookmarks.map((bmId) => {
                    // Search in concept cards
                    let title = 'Bookmarked Item';
                    let description = '';
                    let sectionId: SectionId = 'dual-name';

                    for (const sec of LESSON_SECTIONS) {
                      const foundConcept = sec.conceptCards?.find(c => c.id === bmId);
                      if (foundConcept) {
                        title = `${foundConcept.term}: ${foundConcept.title}`;
                        description = foundConcept.explanation;
                        sectionId = sec.id;
                        break;
                      }
                      const foundSource = sec.sources?.find(s => s.id === bmId);
                      if (foundSource) {
                        title = `Source: ${foundSource.title}`;
                        description = foundSource.whatItTellsUs;
                        sectionId = sec.id;
                        break;
                      }
                    }

                    return (
                      <div
                        key={bmId}
                        className="bg-white p-4 rounded-xl border border-[#EAE0CF] shadow-xs flex items-start justify-between gap-3 group hover:border-amber-400 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#1B2A4A] group-hover:text-amber-800 transition-colors">
                            {title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {description}
                          </p>
                          <button
                            onClick={() => {
                              onClose();
                              onNavigateSection(sectionId);
                            }}
                            className="mt-2 text-xs font-semibold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
                          >
                            <BookOpen className="w-3.5 h-3.5" /> Go to this topic
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveBookmark(bmId)}
                          className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F4ECE0] border-t border-[#DACBBB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1B2A4A] text-white hover:bg-[#0F1829] rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
