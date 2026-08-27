'use client';

import React, { useState } from 'react';
import { Mountain, Compass, Eye, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const PuranaShlokaViewer: React.FC = () => {
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);

  const wordBreakdowns = [
    { word: 'उत्तरम् (Uttaram)', meaning: 'North of / situated to the north', highlight: 'direction-north' },
    { word: 'यत् समुद्रस्य (Yat Samudrasya)', meaning: 'The great ocean (Indian Ocean / southern seas)', highlight: 'sea-south' },
    { word: 'हिमाद्रेश्चैव (Himādreś caiva)', meaning: 'And the snowy mountains (Himalayas)', highlight: 'mountain-north' },
    { word: 'दक्षिणम् (Dakṣiṇam)', meaning: 'South of / situated to the south', highlight: 'direction-south' },
    { word: 'वर्षं तत् (Varṣaṃ tat)', meaning: 'That land / realm / continent', highlight: 'continent' },
    { word: 'भारतं नाम (Bhārataṃ nāma)', meaning: 'Is called by the name of Bhārata', highlight: 'name-bharat' },
    { word: 'भारती यत्र (Bhāratī yatra)', meaning: 'Where the descendants / people of Bharata', highlight: 'people-bharati' },
    { word: 'संततिः (Santatiḥ)', meaning: 'Dwell, flourish and have their lineage', highlight: 'children' }
  ];

  return (
    <div className="space-y-6 bg-white p-5 sm:p-7 rounded-2xl border border-[#EAE0CF] shadow-xs">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <Mountain className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#14213D]">
              The Vishnu Purana Definition of Bharat
            </h4>
            <p className="text-xs text-gray-600">
              Interactive Sanskrit shloka explorer with word-by-word geographical meaning.
            </p>
          </div>
        </div>

        <div className="text-xs font-serif font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
          Book 2, Chapter 3, Verse 1
        </div>
      </div>

      {/* Main Shloka Presentation */}
      <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl border border-[#DACBBB] text-center space-y-4 shadow-sm relative overflow-hidden">
        
        <div className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
          Ancient Sanskrit Verse
        </div>

        {/* Devanagari with interactive word tokens */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#14213D] leading-relaxed sanskrit-font py-2">
          उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम्।<br />
          वर्षं तद् भारतं नाम भारती यत्र संततिः॥
        </div>

        {/* Transliteration */}
        <div className="text-xs sm:text-sm font-serif italic text-gray-700 max-w-xl mx-auto">
          Uttaraṃ yat samudrasya himādreścaiva dakṣiṇam |<br />
          Varṣaṃ tad bhārataṃ nāma bhāratī yatra santatiḥ ||
        </div>

        {/* Full translation */}
        <div className="bg-white p-4 rounded-xl border border-[#EAE0CF] max-w-2xl mx-auto text-xs sm:text-sm text-gray-800 font-medium shadow-xs">
          <strong className="text-amber-900">Translation:</strong> “The country that lies north of the ocean and south of the snowy mountains is called <strong>Bhārata</strong>; there dwell the descendants of Bharata (Bharati).”
        </div>

      </div>

      {/* Word-by-Word Interactive Explorer */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-amber-600" />
          Click each word to inspect its meaning:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {wordBreakdowns.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedWordIndex(selectedWordIndex === idx ? null : idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedWordIndex === idx
                  ? 'bg-amber-600 text-white border-amber-700 shadow-sm ring-2 ring-amber-200'
                  : 'bg-[#FAF6EE] hover:bg-amber-50 border-[#EAE0CF] text-gray-800'
              }`}
            >
              <div className="font-serif font-bold text-xs sm:text-sm">
                {item.word}
              </div>
              <div className={`text-[11px] mt-1 ${selectedWordIndex === idx ? 'text-amber-100 font-medium' : 'text-gray-600'}`}>
                {item.meaning}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Geographical Boundary Diagram */}
      <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#DACBBB] space-y-3">
        <div className="text-xs font-bold text-[#1B2A4A] uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-blue-700" />
          Nature’s Fortress: The Four Frontiers
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold text-xs">
              N
            </div>
            <div>
              <div className="font-bold text-[#1B2A4A]">Northern Boundary (Himādri)</div>
              <div className="text-gray-600 mt-0.5">The towering snowy Himalayas that provide water to perennial rivers and protect from cold winds.</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold text-xs">
              S
            </div>
            <div>
              <div className="font-bold text-[#1B2A4A]">Southern Boundary (Samudra)</div>
              <div className="text-gray-600 mt-0.5">The vast Indian Ocean connecting India to global maritime trade routes to Africa, Arabia, and Southeast Asia.</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold text-xs">
              W
            </div>
            <div>
              <div className="font-bold text-[#1B2A4A]">Western Frontier (Sindhu & Sea)</div>
              <div className="text-gray-600 mt-0.5">The Arabian Sea and River Sindhu basin connecting trade with Mesopotamia, Persia, and Greece.</div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold text-xs">
              E
            </div>
            <div>
              <div className="font-bold text-[#1B2A4A]">Eastern Frontier (Ganga Delta & Sea)</div>
              <div className="text-gray-600 mt-0.5">The Bay of Bengal connecting maritime voyages to Sri Lanka, Myanmar, Java, and the Far East.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
