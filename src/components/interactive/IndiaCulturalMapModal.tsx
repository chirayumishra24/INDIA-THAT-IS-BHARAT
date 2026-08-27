'use client';

import React, { useState } from 'react';
import { INDIA_STATES_CULTURE, INDIA_REGIONS, StateCultureData } from '@/data/indiaStatesCulture';
import { 
  MapPin, 
  Sparkles, 
  X, 
  Search, 
  Compass, 
  Music, 
  Landmark, 
  Palette, 
  Flame, 
  Utensils, 
  ScrollText, 
  Volume2, 
  ZoomIn,
  Eye,
  ChevronRight
} from 'lucide-react';

interface IndiaCulturalMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStateId?: string;
}

// Hotspot coordinates for visual pins on the map image (% based)
const MAP_HOTSPOTS: { id: string; name: string; top: string; left: string; tag: string }[] = [
  { id: 'jk-ladakh', name: 'Kashmir & Ladakh', top: '15%', left: '38%', tag: 'Saffron & Monasteries' },
  { id: 'punjab', name: 'Punjab', top: '22%', left: '37%', tag: 'Golden Temple & Bhangra' },
  { id: 'himachal-pradesh', name: 'Himachal & Devbhoomi', top: '19%', left: '42%', tag: 'Himalayas & Kangra Art' },
  { id: 'uttarakhand', name: 'Uttarakhand', top: '25%', left: '45%', tag: 'Char Dham & Ganga Source' },
  { id: 'rajasthan', name: 'Rajasthan', top: '34%', left: '33%', tag: 'Amer Fort & Ghoomar' },
  { id: 'gujarat', name: 'Gujarat', top: '48%', left: '29%', tag: 'Garba & Asiatic Lions' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', top: '33%', left: '49%', tag: 'Varanasi Ghats & Kathak' },
  { id: 'bihar', name: 'Bihar', top: '41%', left: '60%', tag: 'Nalanda & Madhubani' },
  { id: 'madhya-pradesh-chhattisgarh', name: 'Madhya Pradesh', top: '49%', left: '46%', tag: 'Sanchi Stupa & Gond Art' },
  { id: 'west-bengal', name: 'West Bengal', top: '49%', left: '65%', tag: 'Durga Puja & Terracotta' },
  { id: 'odisha', name: 'Odisha', top: '56%', left: '60%', tag: 'Konark Sun Wheel & Odissi' },
  { id: 'maharashtra', name: 'Maharashtra', top: '59%', left: '38%', tag: 'Ajanta Caves & Lavani' },
  { id: 'andhra-pradesh-telangana', name: 'Andhra & Telangana', top: '69%', left: '48%', tag: 'Kuchipudi & Charminar' },
  { id: 'karnataka', name: 'Karnataka', top: '75%', left: '41%', tag: 'Hampi Ruins & Mysore Palace' },
  { id: 'kerala', name: 'Kerala', top: '88%', left: '41%', tag: 'Kathakali & Backwaters' },
  { id: 'tamil-nadu', name: 'Tamil Nadu', top: '86%', left: '48%', tag: 'Meenakshi Temple & Bharatanatyam' },
  { id: 'assam-northeast', name: 'Assam & North-East', top: '34%', left: '76%', tag: 'Kaziranga & Bihu' }
];

export const IndiaCulturalMapModal: React.FC<IndiaCulturalMapModalProps> = ({
  isOpen,
  onClose,
  initialStateId
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateId, setSelectedStateId] = useState<string>(
    initialStateId || INDIA_STATES_CULTURE[0].id
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFullMapOnly, setShowFullMapOnly] = useState(false);

  if (!isOpen) return null;

  const filteredStates = INDIA_STATES_CULTURE.filter(state => {
    const matchesRegion = selectedRegion === 'All' || state.region === selectedRegion;
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      state.name.toLowerCase().includes(query) ||
      state.popularHighlights.some(h => h.toLowerCase().includes(query)) ||
      state.monuments.some(m => m.toLowerCase().includes(query)) ||
      state.danceAndMusic.some(d => d.toLowerCase().includes(query)) ||
      state.cuisine.some(c => c.toLowerCase().includes(query));
    return matchesRegion && matchesQuery;
  });

  const activeState = INDIA_STATES_CULTURE.find(s => s.id === selectedStateId) || INDIA_STATES_CULTURE[0];

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stateSpeechSummary = `${activeState.name}. Capital: ${activeState.capital}. Popular highlights include: ${activeState.popularHighlights.join(', ')}. Classical Dances: ${activeState.danceAndMusic.join(', ')}. Monuments: ${activeState.monuments.join(', ')}. Civilizational Significance: ${activeState.civilizationalSignificance}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#DACBBB] shadow-2xl w-full max-w-7xl max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#1B2A4A] text-white px-5 sm:px-8 py-4 flex items-center justify-between gap-4 border-b border-[#2C3E66] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-inner">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                <span>Bharat Cultural Cartography</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Theme B: Tapestry of the Past</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
                The Cultural Tapestry & State Map of India
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFullMapOnly(!showFullMapOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                showFullMapOnly
                  ? 'bg-amber-500 text-[#1B2A4A] border-amber-400'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="Toggle Large Artwork Map View"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showFullMapOnly ? 'Split View' : 'Full Map Art'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white border border-white/20 transition-colors"
              title="Close Map Explorer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="bg-[#F4ECE0] border-b border-[#DACBBB] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {INDIA_REGIONS.map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg
                    ? 'bg-[#1B2A4A] text-white shadow-sm'
                    : 'bg-white/80 hover:bg-white text-gray-700 border border-[#DACBBB]'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search state, monument, dance, food..."
              className="w-full pl-9 pr-3 py-1.5 bg-white rounded-xl border border-[#DACBBB] text-xs text-[#14213D] focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {showFullMapOnly ? (
            /* Dedicated High-Res Poster View */
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#DACBBB] shadow-academic-lg bg-[#FAF6EE] group">
                <img
                  src="/images/india_cultural_map.jpg"
                  alt="Detailed Illustrated Cultural Map of India"
                  className="w-full h-auto object-cover max-h-[75vh] mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 left-4 bg-[#1B2A4A]/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs border border-amber-500/40 shadow-lg">
                  <div className="text-amber-300 font-serif font-bold text-sm">Civilizational Tapestry of India</div>
                  <div className="text-[11px] text-gray-300">Each state adorned with historical monuments, folk arts & cultural icons</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Interactive Map with Hotspots (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#DACBBB] shadow-academic bg-[#FAF6EE]">
                  
                  {/* Base Map Image */}
                  <img
                    src="/images/india_cultural_map.jpg"
                    alt="Cultural Tapestry of India Map"
                    className="w-full h-auto object-cover select-none"
                  />

                  {/* Interactive Pins Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {MAP_HOTSPOTS.map(spot => {
                      const isSelected = spot.id === selectedStateId;
                      return (
                        <button
                          key={spot.id}
                          onClick={() => setSelectedStateId(spot.id)}
                          style={{ top: spot.top, left: spot.left }}
                          className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                          title={`${spot.name}: ${spot.tag}`}
                        >
                          <div className={`relative flex items-center justify-center transition-transform duration-300 ${
                            isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                          }`}>
                            <span className={`absolute w-6 h-6 rounded-full animate-ping opacity-60 ${
                              isSelected ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-lg ${
                              isSelected 
                                ? 'bg-amber-600 border-white text-white shadow-amber-600/50' 
                                : 'bg-[#1B2A4A] border-amber-300 text-amber-300'
                            }`}>
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* Hover Tooltip */}
                          <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-7 z-40 bg-[#1B2A4A] text-white px-2.5 py-1 rounded-lg text-[10px] whitespace-nowrap shadow-xl border border-amber-400/40 pointer-events-none">
                            <strong className="text-amber-300 block">{spot.name}</strong>
                            <span className="text-gray-300">{spot.tag}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#FAF6EE]/95 backdrop-blur-sm p-3 rounded-xl border border-[#DACBBB] shadow-md flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-gray-700 text-[11px] sm:text-xs">
                        <strong>Click any pin or state on the map</strong> to discover its unique popular culture, arts & heritage!
                      </span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                      17 Cultural Zones
                    </span>
                  </div>
                </div>

                {/* State Quick Selection Pills */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#EAE0CF] space-y-2">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Quick Select State / Region:</span>
                    <span className="text-amber-700 font-semibold">{filteredStates.length} Regions Available</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {filteredStates.map(state => (
                      <button
                        key={state.id}
                        onClick={() => setSelectedStateId(state.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          selectedStateId === state.id
                            ? 'bg-amber-600 text-white font-bold shadow-xs'
                            : 'bg-[#FAF6EE] text-[#14213D] hover:bg-amber-50 border border-[#EAE0CF]'
                        }`}
                      >
                        {state.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Selected State Cultural Deep Dive (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border-2 border-[#DACBBB] shadow-academic p-5 sm:p-6 space-y-5">
                  
                  {/* State Title & Region Header */}
                  <div className="border-b border-[#EAE0CF] pb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        <span>{activeState.region} India</span>
                        <span>•</span>
                        <span>Capital: {activeState.capital}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-[#14213D]">
                        {activeState.name}
                      </h3>
                      {activeState.hindiName && (
                        <p className="text-xs font-serif text-amber-800 font-medium">
                          {activeState.hindiName}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleSpeak(stateSpeechSummary)}
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isSpeaking
                          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                      title={isSpeaking ? 'Stop Reading' : 'Listen to State Highlights'}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Highlights Badges */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Popular Highlights & Identity:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeState.popularHighlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/70 text-[#1B2A4A] text-xs font-semibold"
                        >
                          ✨ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Cards Grid */}
                  <div className="space-y-3">
                    
                    {/* Dance & Music */}
                    <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#EAE0CF] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                        <Music className="w-4 h-4 text-purple-700" />
                        <span>Classical & Folk Dances, Music:</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed pl-6">
                        {activeState.danceAndMusic.join(' • ')}
                      </div>
                    </div>

                    {/* Monuments & Heritage */}
                    <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#EAE0CF] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                        <Landmark className="w-4 h-4 text-blue-700" />
                        <span>Iconic Monuments & UNESCO Sites:</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed pl-6">
                        {activeState.monuments.join(' • ')}
                      </div>
                    </div>

                    {/* Art, Silk & Handicrafts */}
                    <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#EAE0CF] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                        <Palette className="w-4 h-4 text-emerald-700" />
                        <span>Traditional Art, Silk & Crafts:</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed pl-6">
                        {activeState.artAndHandicrafts.join(' • ')}
                      </div>
                    </div>

                    {/* Traditional Cuisine */}
                    <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#EAE0CF] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                        <Utensils className="w-4 h-4 text-amber-700" />
                        <span>Famous Food & Culinary Specialties:</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed pl-6">
                        {activeState.cuisine.join(' • ')}
                      </div>
                    </div>

                    {/* Festivals */}
                    <div className="bg-[#FAF6EE] p-3.5 rounded-xl border border-[#EAE0CF] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#1B2A4A]">
                        <Flame className="w-4 h-4 text-orange-600" />
                        <span>Major Festivals & Celebrations:</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed pl-6">
                        {activeState.festivals.join(' • ')}
                      </div>
                    </div>

                    {/* Civilizational Context / NCERT Theme B Connection */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-xl border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                        <ScrollText className="w-4 h-4 text-amber-700" />
                        <span>Civilizational Continuity & Ancient Connection:</span>
                      </div>
                      <p className="text-xs text-amber-950 font-serif italic leading-relaxed pl-6">
                        “{activeState.civilizationalSignificance}”
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF6EE] border-t border-[#DACBBB] px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#14213D]">NCERT Class 6 Theme B:</span>
            <span>Unbroken cultural diversity united under one civilizational identity: <strong>Bharat</strong>.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1B2A4A] hover:bg-[#0F1829] text-white rounded-xl font-semibold transition-colors"
            >
              Continue Chapter Lessons
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
