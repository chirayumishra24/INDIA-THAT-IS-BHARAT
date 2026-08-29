'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ArrowRight, Volume2, VolumeX, BookOpen, Shield } from 'lucide-react';

interface CivilizationalEntryPortalProps {
  onEnter: () => void;
}

export const CivilizationalEntryPortal: React.FC<CivilizationalEntryPortalProps> = ({ onEnter }) => {
  const [phase, setPhase] = useState<'shloka' | 'tapestry' | 'ready'>('shloka');
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('tapestry');
    }, 2200);

    const timer2 = setTimeout(() => {
      setPhase('ready');
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleStart = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100000] bg-[#0B132B]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 select-none transition-all duration-700 ${
        isDismissing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Animated Rings & Radial Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-radial from-amber-500/20 via-orange-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-amber-500/15 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-dashed border-amber-400/25 rounded-full animate-spin-slow [animation-direction:reverse]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center space-y-6">
        
        {/* Animated Central Emblem */}
        <div className="relative inline-flex items-center justify-center mx-auto">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#1B2A4A] via-[#2A3F6A] to-[#1B2A4A] border-2 border-amber-400 text-amber-300 flex items-center justify-center font-serif font-black text-4xl sm:text-5xl shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-bounce duration-1000">
            भ
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-amber-400/40 animate-ping pointer-events-none" />
        </div>

        {/* NCERT Metadata Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>NCERT Class VI • Theme B: Tapestry of the Past</span>
        </div>

        {/* Main Title Reveal */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
            INDIA, THAT IS BHARAT
          </h1>
          <p className="text-amber-200/90 font-serif italic text-sm sm:text-base">
            Exploring the Ideas, Sources, and Continuity of Our Nation
          </p>
        </div>

        {/* Phase 1: Sanskrit Shloka Inscription Presentation */}
        <div className="bg-[#162444]/80 border border-amber-400/30 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-3">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ancient Epigraphical Voice • Vishnu Purana (2.3.1)</span>
          </div>

          <div className="text-amber-100 font-serif text-sm sm:text-base leading-relaxed tracking-wide font-medium">
            “उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम् ।<br />
            वर्षं तद् भारतं नाम भारती यत्र संततिः ॥”
          </div>

          <div className="text-xs text-gray-300 font-serif italic border-t border-white/10 pt-2.5">
            “The country that lies north of the ocean and south of the snowy mountains is called <strong className="text-amber-300">Bhārata</strong>; there dwell the descendants of Bharata.”
          </div>
        </div>

        {/* Action Button & Skip */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-[#0B132B] font-black text-sm rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Enter Bharat Learning Studio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="text-[11px] text-gray-400 font-sans">
          Click above or press anywhere to begin your exploration
        </div>

      </div>
    </div>
  );
};
