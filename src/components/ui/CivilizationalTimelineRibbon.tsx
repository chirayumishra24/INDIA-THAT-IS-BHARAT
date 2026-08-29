'use client';

import React from 'react';
import { SectionId } from '@/types';
import { Clock, Landmark, ScrollText, Sparkles, Flag, ArrowRight } from 'lucide-react';

interface TimelineNode {
  id: SectionId;
  era: string;
  label: string;
  source: string;
  description: string;
  icon: React.ReactNode;
}

const TIMELINE_NODES: TimelineNode[] = [
  { 
    id: 'dual-name', 
    era: '1949 CE', 
    label: 'Article 1(1)', 
    source: 'Constitution of India',
    description: '“India, that is Bharat, shall be a Union of States”',
    icon: <Flag className="w-3.5 h-3.5" /> 
  },
  { 
    id: 'bharat-origin', 
    era: '1500 BCE', 
    label: 'Bharata & Inscriptions', 
    source: 'Rigveda & Hathigumpha',
    description: 'Vedic community & Prakrit epigraphs',
    icon: <ScrollText className="w-3.5 h-3.5" /> 
  },
  { 
    id: 'jambudvipa', 
    era: '3rd C. BCE', 
    label: 'Jambudvipa & Ashoka', 
    source: 'Edicts of Ashoka',
    description: 'Continent of the Rose-Apple Tree',
    icon: <Landmark className="w-3.5 h-3.5" /> 
  },
  { 
    id: 'sindhu-to-india', 
    era: '6th C. BCE - Modern', 
    label: 'Sindhu → India', 
    source: 'Persian & Greek Chronicles',
    description: 'Sindhu → Hindu → Indos → India etymological flow',
    icon: <Clock className="w-3.5 h-3.5" /> 
  },
  { 
    id: 'foreign-travelers', 
    era: '300 BCE - 11th C. CE', 
    label: 'Global Chroniclers', 
    source: 'Megasthenes & Xuanzang',
    description: 'Accounts of the land and its culture',
    icon: <Sparkles className="w-3.5 h-3.5" /> 
  },
];

export const CivilizationalTimelineRibbon: React.FC<{
  currentSection: SectionId;
  onNavigate: (id: SectionId) => void;
}> = ({ currentSection, onNavigate }) => {
  return (
    <div className="bg-white/85 backdrop-blur-xl border border-[#DACBBB] rounded-3xl p-4 sm:p-5 shadow-academic-sm max-w-5xl mx-auto my-4 transition-all">
      <div className="flex items-center justify-between mb-3 border-b border-[#EAE0CF] pb-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
          <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Civilizational Timeline Continuum</span>
        </div>
        <span className="text-[11px] text-gray-500 font-medium hidden sm:inline-block">
          Click any epoch to jump to its historical evidence
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {TIMELINE_NODES.map((node) => {
          const isActive = currentSection === node.id;
          return (
            <button
              key={node.id}
              onClick={() => onNavigate(node.id)}
              className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-gradient-to-br from-[#1B2A4A] to-[#121E36] text-white border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-[#FAF7F2] text-[#14213D] border-[#EAE0CF] hover:border-amber-400/70 hover:bg-amber-50/60 hover:shadow-xs'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 m-2 shadow-xs" />
              )}
              
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={`font-bold px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-[#EFE6D8] text-[#8C4A1D]'
                }`}>
                  {node.era}
                </span>
                <span className={isActive ? 'text-amber-300' : 'text-gray-400 group-hover:text-amber-600'}>
                  {node.icon}
                </span>
              </div>

              <div className="text-xs font-bold truncate mt-1">
                {node.label}
              </div>

              <div className={`text-[10px] font-serif truncate mt-0.5 ${
                isActive ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {node.source}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
