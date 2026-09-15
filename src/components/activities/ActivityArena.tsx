'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Swords, 
  Sparkles, 
  Trophy, 
  Play, 
  ChevronRight, 
  Flame, 
  Zap, 
  RotateCcw,
  Compass,
  Scroll,
  Target,
  Gavel,
  Shield,
  Layers
} from 'lucide-react';

import { ActivityTutorialModal } from './ActivityTutorialModal';

import { NameTrailRelay } from './NameTrailRelay';
import { SourceTugOfWar } from './SourceTugOfWar';
import { TravelerAuction } from './TravelerAuction';
import { EtymologyDuel } from './EtymologyDuel';
import { InscriptionDetective } from './InscriptionDetective';
import { NameMatchMemory } from './NameMatchMemory';
import { RiverToNameFlow } from './RiverToNameFlow';
import { FactSniper } from './FactSniper';
import { HeritageMapChallenge } from './HeritageMapChallenge';

export type ActivityMode = 'team-battles' | 'one-on-one' | 'all-games';

interface ActivityMeta {
  id: string;
  number: number;
  title: string;
  category: 'team' | '1v1' | 'both';
  type: string;
  players: string;
  duration: string;
  icon: string;
  description: string;
  tags: string[];
}

export const ACTIVITIES_CATALOG: ActivityMeta[] = [
  // Team Activities
  {
    id: 'act-name-trail',
    number: 1,
    title: 'Name Trail Relay',
    category: 'team',
    type: 'Team Chronology Relay',
    players: '2 Teams (Lion vs Peacock)',
    duration: '3-4 min',
    icon: '📜',
    description: 'Race collaboratively to arrange ancient historical names in true chronological sequence while overcoming surprise penalty traps.',
    tags: ['Chronology', 'Fast-Paced', 'Primary Traps']
  },
  {
    id: 'act-source-tug',
    number: 2,
    title: 'Source vs Source — Tug of War',
    category: 'team',
    type: 'Team Evidence Battle',
    players: '2 Teams (Sanskrit vs Persian Scholars)',
    duration: '4-5 min',
    icon: '⚔️',
    description: 'Two teams pull the historical rope toward their side by verifying texts, coins, and pillar inscriptions against myths.',
    tags: ['Epigraphy', 'Evidence Battle', 'Dynamic Physics']
  },
  {
    id: 'act-traveler-auction',
    number: 3,
    title: 'Foreign Travelers Auction',
    category: 'team',
    type: 'Strategic Resource Bidding',
    players: '2 Teams (Megasthenes vs Xuanzang Guilds)',
    duration: '4-5 min',
    icon: '🏛️',
    description: 'Use ancient gold coins to bid on real quotes from Megasthenes, Faxian, Xuanzang, and Al-Biruni to reconstruct historical boundaries.',
    tags: ['Auction', 'Primary Quotes', 'Resource Management']
  },
  {
    id: 'act-heritage-map',
    number: 9,
    title: 'Bharat Heritage Map Challenge',
    category: 'team',
    type: 'Cultural Geography Drag & Drop',
    players: '2 Teams (Lion vs Peacock)',
    duration: '4-5 min',
    icon: '🗺️',
    description: 'Drag famous cultural treasures — dances, food, crafts, monuments — onto the correct state on the India map before time runs out.',
    tags: ['Geography', 'Drag & Drop', 'Cultural Heritage']
  },

  // 1v1 Duel Activities
  {
    id: 'act-etymology-duel',
    number: 4,
    title: 'Etymology Duel: Sindhu to India',
    category: '1v1',
    type: 'Head-to-Head Speed Matcher',
    players: '1v1 (Player 1 vs Player 2)',
    duration: '2-3 min',
    icon: '🔤',
    description: 'Connect language shifts across Sanskrit, Old Persian, Greek, and Latin before your opponent snatches the match.',
    tags: ['Linguistics', 'Sound Shifts', 'Head-to-Head']
  },
  {
    id: 'act-inscription-detective',
    number: 5,
    title: 'Inscription Detective 3D',
    category: '1v1',
    type: 'Interactive Pillar Investigation',
    players: '1v1 or Solo vs Clock',
    duration: '3-4 min',
    icon: '🔍',
    description: 'Inspect 3D stone surfaces with flashlight and magnifying tools to find the earliest recorded mention of Bharatavarsha.',
    tags: ['3D Artifact', 'Hathigumpha', 'Epigraphy']
  },
  {
    id: 'act-memory-flip',
    number: 6,
    title: 'Ancient Names Memory Duel',
    category: '1v1',
    type: 'Rapid Cognitive Recall',
    players: '1v1 (Alternating Turns)',
    duration: '2-3 min',
    icon: '🃏',
    description: 'Flip pairs of ancient territorial names and their historical meanings or sources before your opponent builds a winning streak.',
    tags: ['Memory Grid', 'Ancient Terms', 'Turn-Based']
  },
  {
    id: 'act-river-flow',
    number: 7,
    title: 'River of Names: Sapta Sindhava',
    category: '1v1',
    type: 'Geographic Flow Puzzle',
    players: '1v1 (Head-to-Head)',
    duration: '3 min',
    icon: '🌊',
    description: 'Reconstruct the 7 sacred rivers of Vedic geography and their evolution into the root name of India.',
    tags: ['Geography', 'Vedic Rivers', 'Fluid Logic']
  },
  {
    id: 'act-fact-sniper',
    number: 8,
    title: 'Fact vs Myth Sniper',
    category: '1v1',
    type: 'Precision Reflex Challenge',
    players: '1v1 (P1 vs P2)',
    duration: '3 min',
    icon: '🎯',
    description: 'Shoot authentic historical facts flying across the screen with arrows while letting misleading myths pass safely.',
    tags: ['Misconceptions', 'High Speed', 'Discernment']
  }
];

export interface ActivityArenaProps {
  activeTab?: ActivityMode;
  onTabChange?: (tab: ActivityMode) => void;
  selectedActivityId?: string | null;
  onSelectActivity?: (id: string | null) => void;
  isTutorialOpen?: boolean;
  onTutorialOpenChange?: (open: boolean) => void;
}

export const ActivityArena: React.FC<ActivityArenaProps> = ({
  activeTab: controlledActiveTab,
  onTabChange,
  selectedActivityId: controlledSelectedActivityId,
  onSelectActivity,
  isTutorialOpen: controlledTutorialOpen,
  onTutorialOpenChange
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<ActivityMode>('all-games');
  const [internalSelectedActivityId, setInternalSelectedActivityId] = useState<string | null>(null);
  const [internalTutorialOpen, setInternalTutorialOpen] = useState(false);

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const setActiveTab = (tab: ActivityMode) => {
    if (onTabChange) onTabChange(tab);
    setInternalActiveTab(tab);
  };

  const selectedActivityId = controlledSelectedActivityId !== undefined ? controlledSelectedActivityId : internalSelectedActivityId;
  const setSelectedActivityId = (id: string | null) => {
    if (onSelectActivity) onSelectActivity(id);
    setInternalSelectedActivityId(id);
  };

  const isTutorialOpen = controlledTutorialOpen !== undefined ? controlledTutorialOpen : internalTutorialOpen;
  const setIsTutorialOpen = (open: boolean) => {
    if (onTutorialOpenChange) onTutorialOpenChange(open);
    setInternalTutorialOpen(open);
  };

  const filteredActivities = ACTIVITIES_CATALOG.filter(act => {
    if (activeTab === 'team-battles') return act.category === 'team';
    if (activeTab === 'one-on-one') return act.category === '1v1';
    return true;
  });

  const activeActivity = ACTIVITIES_CATALOG.find(a => a.id === selectedActivityId);

  React.useEffect(() => {
    if (selectedActivityId) {
      const isMuted = localStorage.getItem(`hide_tutorial_${selectedActivityId}`) === 'true';
      if (!isMuted) {
        setIsTutorialOpen(true);
      }
    } else {
      setIsTutorialOpen(false);
    }
  }, [selectedActivityId]);

  return (
    <div className={`min-h-screen bg-transparent text-[#14213D] ${selectedActivityId === 'act-source-tug' ? 'py-4 px-2 sm:px-4' : 'py-6 px-4 sm:px-6 lg:px-8'}`}>
      {/* ARENA HERO BANNER - Show only in catalog, hide inside activities */}
      {!selectedActivityId && (
        <div className="max-w-6xl mx-auto mb-8">
        <div className="relative rounded-3xl bg-white/75 backdrop-blur-xl border-2 border-amber-500/50 p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Subtle Background Art / Glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-600/30 rounded-full text-amber-900 text-xs font-black uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Pure Activity Arena • Zero Passive Reading
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#14213D] tracking-tight">
                India, That Is Bharat • <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600">Game Arena</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-700 mt-2 max-w-2xl leading-relaxed font-medium">
                Step into high-energy competitive battles — challenge a rival team or duel head-to-head across 10 interactive historical challenges, ancient maps, primary inscriptions, and word evolutions!
              </p>

              {/* Mode Switcher Tabs */}
              <div className="flex flex-wrap gap-2 mt-6">
                <button
                  onClick={() => {
                    setActiveTab('team-battles');
                    setSelectedActivityId(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                    activeTab === 'team-battles'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black ring-2 ring-amber-400 scale-105'
                      : 'bg-white/70 border border-gray-300 text-gray-800 hover:border-amber-500 hover:bg-white/90'
                  }`}
                >
                  <Users className="w-4 h-4 text-amber-800" />
                  2-Team Battles (🦁 vs 🦚)
                </button>

                <button
                  onClick={() => {
                    setActiveTab('one-on-one');
                    setSelectedActivityId(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                    activeTab === 'one-on-one'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white ring-2 ring-indigo-300 scale-105'
                      : 'bg-white/70 border border-gray-300 text-gray-800 hover:border-indigo-500 hover:bg-white/90'
                  }`}
                >
                  <Swords className="w-4 h-4 text-indigo-700" />
                  1v1 Head-to-Head Duels
                </button>

                <button
                  onClick={() => {
                    setActiveTab('all-games');
                    setSelectedActivityId(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                    activeTab === 'all-games'
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white ring-2 ring-teal-300 scale-105'
                      : 'bg-white/70 border border-gray-300 text-gray-800 hover:border-teal-500 hover:bg-white/90'
                  }`}
                >
                  <Layers className="w-4 h-4 text-teal-700" />
                  All 10 Games Catalog
                </button>
              </div>
            </div>

            {/* Quick Badge / Stats */}
            <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
              <div className="p-3.5 bg-white/80 backdrop-blur-md border border-amber-500/40 rounded-2xl text-center min-w-[120px] shadow-md">
                <div className="text-2xl font-black text-amber-700">8</div>
                <div className="text-[10px] text-gray-600 uppercase font-bold">Games Ready</div>
              </div>
              <div className="p-3.5 bg-white/80 backdrop-blur-md border border-teal-500/40 rounded-2xl text-center min-w-[120px] shadow-md">
                <div className="text-2xl font-black text-teal-700">2 Teams</div>
                <div className="text-[10px] text-gray-600 uppercase font-bold">Live Battles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ACTIVE GAME CONTAINER OR GRID OF ACTIVITIES */}
      <div className={selectedActivityId === 'act-source-tug' ? "w-full" : "max-w-6xl mx-auto"}>
        {selectedActivityId ? (
          <div>
            {/* How to Play Animated Pop-up Modal */}
            {activeActivity && (
              <ActivityTutorialModal
                activityId={activeActivity.id}
                activityTitle={activeActivity.title}
                activityIcon={activeActivity.icon}
                isOpen={isTutorialOpen}
                onClose={() => setIsTutorialOpen(false)}
              />
            )}

            {/* Render Selected Activity Component */}
            {selectedActivityId === 'act-name-trail' && <NameTrailRelay />}
            {selectedActivityId === 'act-source-tug' && <SourceTugOfWar />}
            {selectedActivityId === 'act-traveler-auction' && <TravelerAuction />}
            {selectedActivityId === 'act-etymology-duel' && <EtymologyDuel />}
            {selectedActivityId === 'act-inscription-detective' && <InscriptionDetective />}
            {selectedActivityId === 'act-memory-flip' && <NameMatchMemory />}
            {selectedActivityId === 'act-river-flow' && <RiverToNameFlow />}
            {selectedActivityId === 'act-fact-sniper' && <FactSniper />}
            {selectedActivityId === 'act-heritage-map' && <HeritageMapChallenge />}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-[#14213D] flex items-center gap-2">
                {activeTab === 'team-battles' ? (
                  <>
                    <Users className="w-5 h-5 text-amber-700" />
                    2-Team Competitive Arena (4 Team Games)
                  </>
                ) : activeTab === 'one-on-one' ? (
                  <>
                    <Swords className="w-5 h-5 text-indigo-700" />
                    1v1 Head-to-Head Duels (5 Duel Games)
                  </>
                ) : (
                  <>
                    <Layers className="w-5 h-5 text-teal-700" />
                    Complete 8-Game Activity Roster
                  </>
                )}
              </h2>
              <span className="text-xs text-gray-600 font-semibold">
                Showing {filteredActivities.length} interactive games
              </span>
            </div>

            {/* Grid of Activity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredActivities.map(act => (
                <div
                  key={act.id}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#EAE0CF] hover:border-amber-500 p-6 transition-all duration-300 hover:scale-[1.02] shadow-xl flex flex-col justify-between group hover:bg-white/95"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                        {act.icon}
                      </div>

                      <div className="flex flex-col items-end">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            act.category === 'team'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                          }`}
                        >
                          {act.category === 'team' ? '2 Teams' : '1v1 Duel'}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium mt-1">{act.duration}</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">
                      Activity #{act.number} • {act.type}
                    </div>

                    <h3 className="text-lg font-black text-[#14213D] group-hover:text-amber-800 transition-colors mt-1">
                      {act.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                      {act.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {act.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-amber-50/80 border border-amber-200/80 rounded-md text-[10px] text-amber-900 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Launch Game Button */}
                  <button
                    onClick={() => setSelectedActivityId(act.id)}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-black rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 hover:shadow-amber-500/30"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    Launch Challenge ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
