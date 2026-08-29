'use client';

import React, { useState } from 'react';
import { Sparkles, MessageSquare, Volume2, Quote, Eye } from 'lucide-react';
import { ZoomableImage } from '@/components/ui/ZoomableImage';

export interface ComicDialogue {
  speaker: string;
  role: string;
  quote: string;
  context: string;
  takeaway: string;
}

interface VisionaryComicCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  eraBadge: string;
  dialogues: ComicDialogue[];
}

export const VisionaryComicCard: React.FC<VisionaryComicCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  eraBadge,
  dialogues
}) => {
  const [activeDialogueIndex, setActiveDialogueIndex] = useState<number>(0);
  const activeDialogue = dialogues[activeDialogueIndex] || dialogues[0];

  return (
    <div className="bg-white rounded-3xl border border-[#EAE0CF] p-5 sm:p-7 shadow-academic space-y-5 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE0CF] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {eraBadge}
              </span>
              <span className="text-xs font-serif font-bold text-[#14213D]">
                Graphic Novel Vision & Dialogue
              </span>
            </div>
            <h4 className="text-base font-serif font-bold text-[#14213D] mt-0.5">
              {title}
            </h4>
          </div>
        </div>

        <p className="text-xs text-gray-500 italic max-w-xs text-right hidden sm:block">
          {subtitle}
        </p>
      </div>

      {/* Comic Illustration with Overlay Speech Nodes */}
      <div className="relative rounded-2xl overflow-hidden border border-[#DACBBB] shadow-md group">
        <ZoomableImage
          src={imageSrc}
          alt={imageAlt}
          caption={`${title} — ${activeDialogue.speaker}: “${activeDialogue.quote}”`}
          className="w-full h-auto object-cover max-h-[460px]"
          containerClassName="w-full block"
        />

        {/* Floating speech bubble prompt */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#FAF6EE]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#DACBBB] shadow-lg flex items-center justify-between gap-3 text-xs pointer-events-none">
          <div className="flex items-center gap-2 text-[#1B2A4A] font-semibold">
            <Quote className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="truncate">{activeDialogue.speaker}: “{activeDialogue.quote.slice(0, 65)}...”</span>
          </div>
          <span className="text-[10px] bg-amber-600 text-white font-bold px-2 py-1 rounded-md shrink-0">
            Interactive Panel
          </span>
        </div>
      </div>

      {/* Dialogue Selector Tabs */}
      {dialogues.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {dialogues.map((dlg, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDialogueIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeDialogueIndex === idx
                  ? 'bg-[#1B2A4A] text-white shadow-xs'
                  : 'bg-[#FAF6EE] border border-[#DACBBB] text-gray-700 hover:bg-amber-100'
              }`}
            >
              <span>{dlg.speaker}</span>
              <span className={`text-[10px] ${activeDialogueIndex === idx ? 'text-amber-300' : 'text-gray-500'}`}>
                ({dlg.role})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Expanded Voice & Vision Card */}
      <div className="bg-[#FAF6EE] p-5 sm:p-6 rounded-2xl border border-[#DACBBB] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Visionary Words • {activeDialogue.speaker} ({activeDialogue.role})
          </span>
          <span className="text-[10px] text-gray-500 font-mono">
            Historical Perspective
          </span>
        </div>

        <blockquote className="font-serif italic text-sm sm:text-base text-[#14213D] leading-relaxed pl-3 border-l-4 border-amber-600 bg-white p-3.5 rounded-r-xl border border-gray-100">
          “{activeDialogue.quote}”
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="bg-white p-3 rounded-xl border border-[#EAE0CF]">
            <strong className="text-[#1B2A4A] block mb-0.5">Historical Context:</strong>
            <p className="text-gray-700 leading-relaxed">{activeDialogue.context}</p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#EAE0CF]">
            <strong className="text-amber-900 block mb-0.5">Civilizational Takeaway:</strong>
            <p className="text-gray-700 leading-relaxed">{activeDialogue.takeaway}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
