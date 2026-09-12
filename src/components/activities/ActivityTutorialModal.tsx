'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  MousePointer, 
  Zap, 
  Gavel, 
  Compass, 
  Layers, 
  Target, 
  Flame,
  HelpCircle,
  Volume2
} from 'lucide-react';

interface ActivityTutorialModalProps {
  activityId: string;
  activityTitle: string;
  activityIcon: string;
  isOpen: boolean;
  onClose: () => void;
}

// Data for 1-2-3 steps and summary for all 10 activities
const TUTORIAL_DATA: Record<string, {
  headline: string;
  steps: { step: number; title: string; desc: string; icon: string }[];
  proTip: string;
}> = {
  'act-source-tug': {
    headline: 'Pull the rope by verifying historical claims & citing primary sources!',
    steps: [
      { step: 1, title: 'Read the Claim', desc: 'Teams take turns! Read the historical statement on your side.', icon: '📜' },
      { step: 2, title: 'Judge & Cite Source', desc: 'Select True or False, then pick the authentic ancient text (e.g. Vishnu Purana, Indica).', icon: '🏛️' },
      { step: 3, title: 'Auto Rope Tug', desc: 'Correct answers pull the rope to your side. Wrong answers keep rope in center!', icon: '⚔️' },
    ],
    proTip: 'Citing the exact primary text earns bonus tug power and locks in the round victory!',
  },
  'act-name-trail': {
    headline: 'Place ancient names of Bharat into exact chronological order!',
    steps: [
      { step: 1, title: 'Analyze Historical Eras', desc: 'Examine timestamps from 2500 BCE (Bronze Age) to 1950 CE (Constitution).', icon: '⏳' },
      { step: 2, title: 'Sequence the Names', desc: 'Select Meluha, Sapta Sindhu, Bharatavarsha, and India in sequence.', icon: '🔗' },
      { step: 3, title: 'Complete the Chain', desc: 'Build uninterrupted relay chains to multiply your team score.', icon: '🏆' },
    ],
    proTip: 'Think from the earliest Indus Valley texts down to Article 1 of modern India!',
  },
  'act-traveler-auction': {
    headline: 'Bid coins to acquire traveler logs and dominate historical trivia showdowns!',
    steps: [
      { step: 1, title: 'Inspect the Relic', desc: 'A mystery traveler artifact (Xuanzang, Megasthenes, Al-Biruni) appears on stage.', icon: '🏺' },
      { step: 2, title: 'Place Smart Bids', desc: 'Raise the bid against the rival team before the auction gavel strikes!', icon: '🔨' },
      { step: 3, title: 'Answer Relic Trivia', desc: 'The winning bidder answers the traveler inquiry to claim massive bonus coins.', icon: '💡' },
    ],
    proTip: 'Do not exhaust all your coins on one relic—save gold for high-value later rounds!',
  },
  'act-etymology-duel': {
    headline: 'Speed-buzz and trace the linguistic transmutation of "Sindhu" across languages!',
    steps: [
      { step: 1, title: 'Hit the Buzzer', desc: 'React fastest when the sound shift or linguistic question appears.', icon: '⚡' },
      { step: 2, title: 'Pick the Phonetic Root', desc: 'Trace "Sindhu" (Sanskrit) to "Hindu" (Old Persian) and "Indos" (Greek).', icon: '🗣️' },
      { step: 3, title: 'Maintain Speed Streaks', desc: 'Consecutive fast answers activate fire combo multipliers for maximum score.', icon: '🔥' },
    ],
    proTip: 'Old Persian lacked the initial "S" sound and replaced it with "H", creating "Hindu" from "Sindhu"!',
  },
  'act-inscription-detective': {
    headline: 'Inspect ancient stone edicts with a magnifying lens to spot distorted text!',
    steps: [
      { step: 1, title: 'Scan the Inscription', desc: 'Study the translated royal edict of King Kharavela or Emperor Ashoka.', icon: '🔎' },
      { step: 2, title: 'Spot the Distortion', desc: 'Find the fabricated or anachronistic word hidden among genuine text.', icon: '🎯' },
      { step: 3, title: 'Restore the Truth', desc: 'Tap the falsified word to restore historical reality and earn detective points.', icon: '📜' },
    ],
    proTip: 'Watch out for modern geographic names inserted into 2,000-year-old edicts!',
  },
  'act-memory-flip': {
    headline: 'Flip ancient palm leaf cards to pair historical sources with civilizational names!',
    steps: [
      { step: 1, title: 'Flip First Card', desc: 'Click a card on the grid to reveal an ancient scripture or inscription.', icon: '🃏' },
      { step: 2, title: 'Find Its Companion', desc: 'Flip another card to match it with its defining term (e.g. Vishnu Purana ↔ Bharata).', icon: '✨' },
      { step: 3, title: 'Clear the Board', desc: 'Pair all cards in fewest turns to dominate the 1v1 memory championship.', icon: '🧠' },
    ],
    proTip: 'Remember card positions even when they flip back—memory is your greatest weapon!',
  },
  'act-river-flow': {
    headline: 'Connect sacred river channels from Himalayan glaciers to the Indian Ocean!',
    steps: [
      { step: 1, title: 'Inspect Canal Grid', desc: 'Locate the mountain glacier source and the southern ocean terminus.', icon: '🏔️' },
      { step: 2, title: 'Rotate Water Channels', desc: 'Click river nodes to align channels through ancient port cities.', icon: '🔄' },
      { step: 3, title: 'Release Sacred Waters', desc: 'Complete the uninterrupted flow to unlock maritime trade routes and earn points.', icon: '🌊' },
    ],
    proTip: 'Sindhu and Saraswati formed the primary arterial waterways of ancient Indian commerce.',
  },
  'act-fact-sniper': {
    headline: 'Lock your crosshairs on authentic historical facts and snipe misleading myths!',
    steps: [
      { step: 1, title: 'Track Moving Claims', desc: 'Historical claim bubbles float across the target range.', icon: '🎯' },
      { step: 2, title: 'Lock Scope on Truth', desc: 'Align your sniper reticle over verified historical facts from textbook sources.', icon: '👁️' },
      { step: 3, title: 'Fire & Snipe', desc: 'Click to fire! Sniping facts earns points; shooting false myths deducts points.', icon: '💥' },
    ],
    proTip: 'Verify before pulling the trigger: not every common myth is grounded in authentic archaeology!',
  }
};

export const ActivityTutorialModal: React.FC<ActivityTutorialModalProps> = ({
  activityId,
  activityTitle,
  activityIcon,
  isOpen,
  onClose,
}) => {
  const [animCycle, setAnimCycle] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  // Load user preference
  useEffect(() => {
    const savedPref = localStorage.getItem(`hide_tutorial_${activityId}`);
    if (savedPref === 'true') {
      setDontShowAgain(true);
    }
  }, [activityId]);

  // Restart animation cycle every 7 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setAnimCycle((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(`hide_tutorial_${activityId}`, 'true');
    } else {
      localStorage.removeItem(`hide_tutorial_${activityId}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  const data = TUTORIAL_DATA[activityId] || TUTORIAL_DATA['act-source-tug'];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 2xl:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl 2xl:max-w-5xl 3xl:max-w-6xl bg-[#FAF6EE] border-2 border-amber-500/50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] select-none">
        
        {/* Header Bar */}
        <div className="shrink-0 bg-gradient-to-r from-[#14213D] via-[#1f3158] to-[#14213D] text-white px-4 py-3 sm:px-5 sm:py-3.5 2xl:px-8 2xl:py-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3 2xl:gap-4">
            <span className="w-10 h-10 2xl:w-14 2xl:h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl 2xl:text-3xl shadow-inner">
              {activityIcon}
            </span>
            <div>
              <div className="flex items-center gap-2 2xl:gap-3">
                <h3 className="font-black text-base sm:text-lg 2xl:text-2xl text-amber-300">
                  {activityTitle}
                </h3>
                <span className="px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] 2xl:text-xs font-bold uppercase border border-amber-400/40">
                  Interactive Demo
                </span>
              </div>
              <p className="text-xs 2xl:text-sm text-gray-300 mt-0.5">
                {data.headline}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer touch-manipulation"
            aria-label="Close tutorial"
          >
            <X className="w-5 h-5 2xl:w-7 2xl:h-7" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3 sm:p-5 2xl:p-7 space-y-3 sm:space-y-4 2xl:space-y-6 overflow-y-auto flex-1 min-h-0">
          
          {/* ANIMATED GAMEPLAY STAGE */}
          <div className="relative w-full h-40 sm:h-48 2xl:h-64 3xl:h-80 rounded-2xl 2xl:rounded-3xl bg-[#0e1626] border-2 border-amber-500/30 p-2.5 sm:p-3.5 2xl:p-6 overflow-hidden shadow-inner flex flex-col justify-between shrink-0">
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-[11px] 2xl:text-sm text-amber-300/80 font-bold z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 2xl:w-3 2xl:h-3 rounded-full bg-emerald-400 animate-ping"></span>
                SIMULATED GAMEPLAY ANIMATION
              </span>
              <button
                onClick={() => setAnimCycle((prev) => prev + 1)}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px] 2xl:text-xs bg-white/10 px-2.5 py-1 rounded-md touch-manipulation"
              >
                <RotateCcw className="w-3 h-3 2xl:w-4 2xl:h-4" /> Replay Demo
              </button>
            </div>

            {/* Dynamic Activity-Specific Animation Stage */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden my-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activityId}-${animCycle}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {renderActivityAnimation(activityId)}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stage Footer Bar with progress dots */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] 2xl:text-xs text-gray-400 z-10">
              <span>Watch how actions trigger points & win states</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-amber-400"></span>
                <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-amber-400/50"></span>
                <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-amber-400/20"></span>
              </div>
            </div>
          </div>

          {/* 3-STEP GAMEPLAY GUIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 2xl:gap-5">
            {data.steps.map((item) => (
              <div
                key={item.step}
                className="bg-white/90 border border-amber-200/80 rounded-2xl 2xl:rounded-3xl p-3.5 2xl:p-5 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 2xl:mb-3">
                    <span className="w-6 h-6 2xl:w-9 2xl:h-9 rounded-full bg-amber-500 text-black font-black text-xs 2xl:text-sm flex items-center justify-center shadow">
                      {item.step}
                    </span>
                    <span className="text-xl 2xl:text-3xl">{item.icon}</span>
                  </div>
                  <h4 className="font-extrabold text-sm 2xl:text-lg text-[#14213D]">
                    {item.title}
                  </h4>
                  <p className="text-xs 2xl:text-sm text-gray-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRO TIP BOX */}
          <div className="bg-amber-100/70 border border-amber-300 rounded-xl 2xl:rounded-2xl p-3 2xl:p-4 flex items-start gap-2.5 2xl:gap-3 text-xs 2xl:text-sm text-amber-950 font-medium">
            <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900">Expert Strategy: </span>
              {data.proTip}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="shrink-0 bg-[#f2ece1] px-4 py-3 sm:px-5 sm:py-3.5 2xl:px-8 2xl:py-4 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs 2xl:text-sm text-gray-700 font-semibold touch-manipulation">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 2xl:w-5 2xl:h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer accent-amber-600"
            />
            Don&apos;t show demo automatically next time
          </label>

          <button
            onClick={handleClose}
            className="px-6 py-2.5 2xl:px-8 2xl:py-4 rounded-xl 2xl:rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-black text-xs 2xl:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 active:scale-95 touch-manipulation"
          >
            <span>Got it! Start Playing</span>
            <span className="text-sm 2xl:text-lg">🚀</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// HELPER: Dynamic Activity Animations
// =========================================================================
function renderActivityAnimation(activityId: string) {
  switch (activityId) {
    case 'act-source-tug':
      return <SourceTugDemo />;
    case 'act-name-trail':
      return <NameTrailDemo />;
    case 'act-traveler-auction':
      return <TravelerAuctionDemo />;
    case 'act-etymology-duel':
      return <EtymologyDuelDemo />;
    case 'act-inscription-detective':
      return <InscriptionDetectiveDemo />;
    case 'act-memory-flip':
      return <MemoryFlipDemo />;
    case 'act-river-flow':
      return <RiverFlowDemo />;
    case 'act-fact-sniper':
      return <FactSniperDemo />;
    default:
      return <SourceTugDemo />;
  }
}

// 1. Source Tug of War Animation
const SourceTugDemo: React.FC = () => {
  return (
    <div className="w-full max-w-lg h-full flex flex-col justify-between py-1 relative">
      {/* 2 Teams on sides */}
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-black">
          🦁 Lion Team
          <motion.span 
            animate={{ scale: [1, 1.3, 1] }} 
            transition={{ delay: 3.2, duration: 0.5 }}
            className="text-emerald-400 font-extrabold"
          >
            +10 PTS
          </motion.span>
        </div>
        <div className="text-[10px] text-gray-400 font-mono">VS</div>
        <div className="flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/40 px-2.5 py-1 rounded-lg text-teal-300 text-xs font-black">
          Peacock Team 🦚
        </div>
      </div>

      {/* Central Rope with animated pull */}
      <div className="relative w-full my-2">
        <div className="h-3 bg-amber-900/60 rounded-full border border-amber-600/40 overflow-hidden relative">
          <motion.div
            initial={{ left: '50%' }}
            animate={{ left: ['50%', '50%', '50%', '30%', '30%'] }}
            transition={{ times: [0, 0.4, 0.5, 0.7, 1], duration: 6, repeat: Infinity }}
            className="absolute top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-red-500 via-amber-300 to-red-500 rounded-sm shadow-lg flex items-center justify-center"
          >
            <span className="w-1.5 h-full bg-white animate-pulse"></span>
          </motion.div>
        </div>
        <div className="flex justify-between text-[9px] text-gray-400 px-1 mt-0.5">
          <span>◄ LION GOAL</span>
          <span className="text-amber-400 font-bold">CENTER</span>
          <span>PEACOCK GOAL ►</span>
        </div>
      </div>

      {/* Simulated Question Card & Options */}
      <div className="bg-white/10 border border-white/20 rounded-xl p-2.5 text-center relative">
        <div className="text-xs font-bold text-white mb-2">
          &ldquo;Indica describes the royal court and society of ancient India.&rdquo;
        </div>
        <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
          <motion.div
            animate={{ 
              backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(34,197,94,0.4)', 'rgba(34,197,94,0.4)'],
              borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)', 'rgba(34,197,94,0.8)', 'rgba(34,197,94,0.8)']
            }}
            transition={{ times: [0, 0.3, 0.35, 1], duration: 6, repeat: Infinity }}
            className="p-1.5 rounded-lg border text-[11px] font-black text-white"
          >
            ✓ TRUE
          </motion.div>
          <div className="p-1.5 rounded-lg border border-white/20 bg-white/5 text-[11px] font-bold text-gray-400">
            ✗ FALSE
          </div>
        </div>

        {/* Animated Hand Cursor */}
        <motion.div
          animate={{
            x: [60, 20, 20, 20, -100],
            y: [50, 0, 0, 0, -20],
            scale: [1, 0.85, 1, 1, 1],
            opacity: [0, 1, 1, 0, 0]
          }}
          transition={{ times: [0, 0.25, 0.35, 0.6, 1], duration: 6, repeat: Infinity }}
          className="absolute z-30 pointer-events-none"
        >
          <div className="flex items-center gap-1 bg-amber-400 text-black px-2 py-0.5 rounded-md text-[10px] font-black shadow-lg">
            <MousePointer className="w-3 h-3 fill-black" />
            Click!
          </div>
        </motion.div>
      </div>
    </div>
  );
};


// 3. Name Trail Relay Animation
const NameTrailDemo: React.FC = () => {
  return (
    <div className="w-full max-w-lg h-full flex flex-col justify-between py-1 relative">
      <div className="text-center text-xs text-amber-300 font-bold mb-1">
        Chronological Relay Chain (Earliest ➔ Latest)
      </div>

      {/* Sequential slots */}
      <div className="grid grid-cols-4 gap-2">
        <motion.div
          animate={{ borderColor: ['#4b5563', '#10b981', '#10b981', '#10b981'] }}
          transition={{ times: [0, 0.25, 0.8, 1], duration: 6, repeat: Infinity }}
          className="p-2 rounded-xl bg-white/10 border-2 text-center"
        >
          <div className="text-[9px] text-gray-400 font-mono">1 • 2500 BCE</div>
          <div className="text-xs font-black text-amber-300 mt-1">Meluha</div>
        </motion.div>

        <motion.div
          animate={{ borderColor: ['#4b5563', '#4b5563', '#10b981', '#10b981'] }}
          transition={{ times: [0, 0.5, 0.6, 1], duration: 6, repeat: Infinity }}
          className="p-2 rounded-xl bg-white/10 border-2 text-center"
        >
          <div className="text-[9px] text-gray-400 font-mono">2 • 1500 BCE</div>
          <div className="text-xs font-black text-amber-300 mt-1">Sapta Sindhu</div>
        </motion.div>

        <motion.div
          animate={{ borderColor: ['#4b5563', '#4b5563', '#4b5563', '#10b981'] }}
          transition={{ times: [0, 0.75, 0.85, 1], duration: 6, repeat: Infinity }}
          className="p-2 rounded-xl bg-white/10 border-2 text-center"
        >
          <div className="text-[9px] text-gray-400 font-mono">3 • 1000 BCE</div>
          <div className="text-xs font-black text-amber-300 mt-1">Bharatavarsha</div>
        </motion.div>

        <div className="p-2 rounded-xl bg-white/10 border-2 border-dashed border-gray-600 text-center">
          <div className="text-[9px] text-gray-400 font-mono">4 • Modern</div>
          <div className="text-xs font-black text-gray-500 mt-1">Next Slot...</div>
        </div>
      </div>

      {/* Progress feedback */}
      <div className="bg-emerald-900/60 border border-emerald-500/50 rounded-xl p-2 text-center text-xs text-emerald-200 font-bold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
        Chronology Locked in Sequence! +50 Relay Points
      </div>
    </div>
  );
};

// 4. Ancient Traveler Auction Animation
const TravelerAuctionDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md h-full flex flex-col justify-between py-1 relative">
      <div className="flex items-center justify-between bg-amber-500/10 border border-amber-400/30 rounded-xl p-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📜</span>
          <div>
            <div className="text-xs font-black text-white">Xuanzang Buddhist Dossier</div>
            <div className="text-[10px] text-amber-400">Winning team answers traveler query</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block">CURRENT BID</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm font-black text-amber-300"
          >
            45 Coins 🪙
          </motion.span>
        </div>
      </div>

      {/* Animated Gavel Strike */}
      <div className="flex items-center justify-center gap-3 my-2">
        <motion.div
          animate={{ rotate: [0, -35, 15, 0] }}
          transition={{ times: [0, 0.3, 0.45, 1], duration: 3, repeat: Infinity }}
          className="text-3xl"
        >
          🔨
        </motion.div>
        <div className="text-xs font-black text-amber-300">
          GOING ONCE... TWICE... SOLD TO TEAM LION!
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-2 text-center text-xs text-gray-200">
        <span className="text-emerald-400 font-black">Bonus Question: </span>
        &ldquo;Which famous ancient university did Xuanzang attend?&rdquo; ➔ <strong className="text-white">Nalanda</strong>
      </div>
    </div>
  );
};


// 6. Etymology Duel Animation
const EtymologyDuelDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md h-full flex flex-col justify-between py-1 relative">
      {/* Linguistic sound shift track */}
      <div className="flex items-center justify-between text-xs font-black text-amber-300 bg-white/10 p-2 rounded-xl">
        <span>Sindhu</span>
        <span>➔</span>
        <span className="text-orange-400">Hindu</span>
        <span>➔</span>
        <span className="text-teal-300">Indos</span>
        <span>➔</span>
        <span className="text-emerald-300">India</span>
      </div>

      {/* Pulsing buzzer in center */}
      <div className="flex justify-center my-2">
        <motion.button
          animate={{ scale: [1, 1.12, 1], boxShadow: ['0 0 0px #f59e0b', '0 0 25px #f59e0b', '0 0 0px #f59e0b'] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          BUZZ IN FIRST!
        </motion.button>
      </div>

      <div className="text-center text-[11px] text-gray-300">
        React fast, decode the phonetic evolution, and build consecutive streak combos!
      </div>
    </div>
  );
};

// 7. Inscription Detective Animation
const InscriptionDetectiveDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md h-full flex flex-col justify-between py-1 relative">
      <div className="text-center text-xs text-amber-300 font-bold">
        Royal Rock Edict Translation Scanner
      </div>

      <div className="relative bg-stone-800 border-2 border-stone-600 rounded-xl p-3 text-stone-200 text-xs font-serif leading-relaxed">
        &ldquo;King Kharavela of Kalinga proclaims victory across the realm of{' '}
        <span className="bg-red-900/80 border border-red-500 text-red-200 px-1 py-0.5 rounded font-mono font-bold inline-block">
          Atlantic Coast (Distorted!)
        </span>{' '}
        and honors all sects.&rdquo;

        {/* Magnifying glass sweeping */}
        <motion.div
          animate={{ x: [-80, 40, -80] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 left-1/2 text-2xl pointer-events-none"
        >
          🔍
        </motion.div>
      </div>

      <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-2 text-center text-xs text-emerald-300 font-bold">
        ✓ Tap distorted text ➔ Restores to &ldquo;Bharatavarsha&rdquo; (+50 Detective PTS)
      </div>
    </div>
  );
};

// 8. Name Match Memory Flip Animation
const MemoryFlipDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md h-full flex flex-col justify-between py-1 relative">
      <div className="text-center text-xs text-amber-300 font-bold">
        Palm Leaf Memory Matching Grid
      </div>

      <div className="grid grid-cols-4 gap-2 my-1">
        {/* Card 1 - flips */}
        <motion.div
          animate={{ rotateY: [0, 180, 180, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="h-16 rounded-xl bg-amber-600 border border-amber-400 flex items-center justify-center text-center p-1 text-[10px] font-black text-white shadow"
        >
          Vishnu Purana
        </motion.div>

        {/* Card 2 - face down */}
        <div className="h-16 rounded-xl bg-stone-700 border border-stone-500 flex items-center justify-center text-base">
          ☸️
        </div>

        {/* Card 3 - flips to match */}
        <motion.div
          animate={{ rotateY: [0, 180, 180, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="h-16 rounded-xl bg-amber-600 border border-amber-400 flex items-center justify-center text-center p-1 text-[10px] font-black text-white shadow"
        >
          Bharata
        </motion.div>

        {/* Card 4 - face down */}
        <div className="h-16 rounded-xl bg-stone-700 border border-stone-500 flex items-center justify-center text-base">
          ☸️
        </div>
      </div>

      <div className="text-center text-xs text-emerald-400 font-bold">
        Match pairs of texts and their civilizational definitions in fewer turns!
      </div>
    </div>
  );
};

// 9. River to Name Flow Animation
const RiverFlowDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md h-full flex flex-col justify-between py-1 relative">
      <div className="flex items-center justify-between text-xs text-cyan-300 font-bold px-2">
        <span>🏔️ Himalayan Glaciers</span>
        <span>➔ ➔ ➔</span>
        <span>🌊 Indian Ocean</span>
      </div>

      {/* River channel tiles */}
      <div className="flex justify-center gap-3 my-2">
        <div className="w-14 h-14 rounded-xl bg-cyan-950 border-2 border-cyan-400/80 flex items-center justify-center text-cyan-300 text-xl font-bold">
          ≋
        </div>
        <motion.div
          animate={{ rotate: [0, 90, 90, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-14 h-14 rounded-xl bg-cyan-900 border-2 border-cyan-300 flex items-center justify-center text-cyan-200 text-xl font-bold cursor-pointer shadow-lg"
        >
          ↱
        </motion.div>
        <div className="w-14 h-14 rounded-xl bg-cyan-950 border-2 border-cyan-400/80 flex items-center justify-center text-cyan-300 text-xl font-bold">
          ≋
        </div>
      </div>

      <div className="text-center text-xs text-cyan-200">
        Click to rotate river channel nodes and connect unbroken water routes!
      </div>
    </div>
  );
};

// 10. Fact Sniper Animation
const FactSniperDemo: React.FC = () => {
  return (
    <div className="w-full max-w-md h-full flex flex-col justify-between py-1 relative">
      <div className="text-center text-xs text-amber-300 font-bold">
        Historical Truth Crosshair Target Gallery
      </div>

      {/* Floating Target Bubble with Scope */}
      <div className="relative h-24 rounded-xl bg-slate-900 border border-slate-700 p-2 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ x: [-100, 100] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="px-3 py-1.5 rounded-full bg-emerald-900/80 border-2 border-emerald-400 text-white text-xs font-black shadow-lg flex items-center gap-1.5"
        >
          🎯 &ldquo;Rigveda references Sapta Sindhu&rdquo;
        </motion.div>

        {/* Animated Scope Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], borderColor: ['#ef4444', '#22c55e', '#ef4444'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full border-2 border-red-500 relative flex items-center justify-center"
          >
            <div className="w-full h-0.5 bg-red-500/50 absolute"></div>
            <div className="h-full w-0.5 bg-red-500/50 absolute"></div>
          </motion.div>
        </div>
      </div>

      <div className="text-center text-xs text-emerald-300 font-bold">
        Snipe historically verified textbook facts. Let misleading myths pass!
      </div>
    </div>
  );
};
