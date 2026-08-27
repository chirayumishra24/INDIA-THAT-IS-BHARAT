'use client';

import React, { useState } from 'react';
import { KEY_TERMS_GLOSSARY, LESSON_SECTIONS } from '@/data/chapterContent';
import { RotateCcw, Check, Sparkles, Eye, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export const FlashReview: React.FC = () => {
  const flashcards = [
    {
      id: 'f1',
      title: 'Article 1(1)',
      front: 'What are the two official names of our country established in Article 1(1)?',
      back: '"India, that is Bharat, shall be a Union of States." — Uniting ancient civilizational roots with modern global standing.',
      tag: 'Constitution'
    },
    {
      id: 'f2',
      title: 'The Bharatas',
      front: 'Who were the "Bharatas" in the Rigveda?',
      back: 'An early prominent Vedic clan living in the Sapta Sindhava (Land of Seven Rivers) whose leaders were celebrated in Vedic hymns.',
      tag: 'Ancient Clan'
    },
    {
      id: 'f3',
      title: 'Hathigumpha Inscription',
      front: 'Which stone inscription provides archaeological proof of the name "Bharatavarsha"?',
      back: 'King Kharavela of Kalinga (Odisha, 1st c. BCE) carved the Prakrit term "Bharadhavasa" on Udayagiri hills.',
      tag: 'Epigraphy'
    },
    {
      id: 'f4',
      title: 'Jambudvipa',
      front: 'What does "Jambudvipa" mean, and who used it in rock edicts?',
      back: 'Literally "The Island of the Jamun Tree" (Syzygium cumini). Emperor Ashoka used it in his 3rd c. BCE Minor Rock Edicts.',
      tag: 'Flora & Ashoka'
    },
    {
      id: 'f5',
      title: 'Sindhu to Hindu & India',
      front: 'How did River Sindhu give rise to "Hindu" and "India"?',
      back: 'Old Persian shifted initial "S" to "H" (Sindhu → Hindu); Greeks dropped the "H" (Hindu → Indos → India); Persians added "-stan" (Hindustan).',
      tag: 'Linguistics'
    },
    {
      id: 'f6',
      title: 'Xuanzang’s "In-tu"',
      front: 'Why did Chinese pilgrim Xuanzang compare India to the Moon (In-tu / Indu)?',
      back: 'Because just as the moon illuminates the darkness of night, India illuminated humanity through wisdom, philosophy, and spiritual teachings.',
      tag: 'Traveler Records'
    },
    {
      id: 'f7',
      title: 'Vishnu Purana Shloka',
      front: 'How did the Vishnu Purana define the boundaries of Bharat?',
      back: '"North of the ocean and south of the snowy mountains (Himalayas) is the country called Bhārata, where dwell the children of Bharata."',
      tag: 'Geographical Unity'
    },
    {
      id: 'f8',
      title: 'Uttarapatha & Dakshinapatha',
      front: 'What were Uttarapatha and Dakshinapatha?',
      back: 'The two great arterial trade highways connecting the northwest, Gangetic plains, eastern ports, Deccan, and southern kingdoms.',
      tag: 'Trade Highways'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCards, setKnownCards] = useState<Record<string, boolean>>({});

  const activeCard = flashcards[currentIndex];
  const knownCount = Object.values(knownCards).filter(Boolean).length;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const markKnown = (known: boolean) => {
    setKnownCards(prev => ({ ...prev, [activeCard.id]: known }));
    handleNext();
  };

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D] uppercase tracking-wider text-amber-900">
              Flash Review Desk
            </h4>
            <p className="text-xs text-gray-600">
              Rapid flashcard review to test recall before the chapter assessment.
            </p>
          </div>
        </div>

        <div className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
          Mastered: {knownCount} / {flashcards.length}
        </div>
      </div>

      {/* Flashcard Area */}
      <div className="max-w-xl mx-auto space-y-4">
        
        {/* Flashcard Component */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`min-h-[220px] p-6 sm:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-academic ${
            isFlipped
              ? 'bg-[#1B2A4A] text-white border-[#1B2A4A]'
              : 'bg-[#FAF6EE] text-[#14213D] border-[#DACBBB] hover:border-amber-400'
          }`}
        >
          {/* Card Top Tag */}
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              isFlipped ? 'bg-white/20 text-amber-300' : 'bg-white border border-[#DACBBB] text-amber-800'
            }`}>
              {activeCard.tag}
            </span>
            <span className={`text-xs ${isFlipped ? 'text-gray-300' : 'text-gray-500'}`}>
              Card {currentIndex + 1} of {flashcards.length} • (Tap to flip)
            </span>
          </div>

          {/* Card Content */}
          <div className="py-4 text-center space-y-2">
            <div className={`text-xs uppercase font-bold tracking-widest ${
              isFlipped ? 'text-amber-400' : 'text-gray-500'
            }`}>
              {isFlipped ? 'EXPLANATION & ANSWER' : 'QUESTION / PROMPT'}
            </div>
            <p className={`font-serif text-base sm:text-lg leading-relaxed ${
              isFlipped ? 'text-white' : 'text-[#14213D] font-bold'
            }`}>
              {isFlipped ? activeCard.back : activeCard.front}
            </p>
          </div>

          {/* Card Bottom Hint */}
          <div className={`text-center text-[11px] font-medium ${
            isFlipped ? 'text-gray-300' : 'text-amber-800'
          }`}>
            {isFlipped ? 'Tap card again to see prompt' : 'Tap anywhere to reveal answer ↵'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => markKnown(false)}
            className="flex-1 py-3 px-4 bg-[#FAF6EE] hover:bg-amber-100 text-gray-800 border border-[#DACBBB] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Need Review
          </button>

          <button
            onClick={() => markKnown(true)}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Check className="w-3.5 h-3.5" /> I Know This!
          </button>
        </div>

        {/* Step Arrows */}
        <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 hover:text-amber-800 font-medium p-1"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <span>Progress: {Math.round(((currentIndex + 1) / flashcards.length) * 100)}%</span>
          <button
            onClick={handleNext}
            className="flex items-center gap-1 hover:text-amber-800 font-medium p-1"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
