export interface NameTrailItem {
  id: string;
  name: string;
  periodOrLanguage: string;
  significance: string;
  orderIndex: number;
}

export interface NameTrailChain {
  id: string;
  title: string;
  description: string;
  items: NameTrailItem[];
}

export interface SourceTugQuestion {
  id: string;
  claim: string;
  isTrue: boolean;
  correctSource: string;
  sourceOptions: string[];
  explanation: string;
  points: number;
}

export interface MapPuzzlePiece {
  id: string;
  title: string;
  category: 'landmark' | 'route' | 'waterway' | 'region' | 'decoy';
  hint: string;
  correctSlotId?: string;
  isDecoy?: boolean;
  historicalDetail: string;
}

export interface TravelerDossier {
  id: string;
  name: string;
  origin: string;
  century: string;
  avatarIcon: string;
  baseCost: number;
  description: string;
  factsLearned: string[];
  unlockedQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    points: number;
  }[];
}

export interface CivElement {
  id: string;
  title: string;
  type: 'sacred-river' | 'mountain-frontier' | 'sea-coast' | 'trade-hub' | 'royal-inscription';
  xPercent: number; // 0-100 on ancient map canvas
  yPercent: number; // 0-100 on ancient map canvas
  historicalSignificance: string;
  zoneHint: string;
}

export interface EtymologyDuelChain {
  id: string;
  title: string;
  lineage: 'India' | 'Bharat';
  steps: {
    word: string;
    culture: string;
    approxYear: string;
    phoneticShift: string;
  }[];
}

export interface InscriptionTablet {
  id: string;
  title: string;
  era: string;
  location: string;
  ruler: string;
  fullTextFormatted: string; // contains spans or markers
  errors: {
    id: string;
    distortedText: string;
    correctHistoricalTruth: string;
    explanation: string;
  }[];
}

export interface MemoryCardItem {
  id: string;
  pairKey: string;
  type: 'term' | 'meaning';
  content: string;
  subContent?: string;
  badge: string;
}

export interface RiverFlowConnection {
  id: string;
  originName: string;
  originType: 'river' | 'mountain' | 'sea' | 'monarch';
  targetTerm: string;
  targetCulture: string;
  context: string;
}

export interface FactSniperItem {
  id: string;
  statement: string;
  isHistoricalFact: boolean; // true = SHOOT, false = LET PASS
  difficulty: 'fast' | 'medium' | 'boss';
  sourceCitation: string;
  correctionIfMyth?: string;
}

// ----------------------------------------------------
// 1. NAME TRAIL CHAINS DATA
// ----------------------------------------------------
export const NAME_TRAIL_CHAINS: NameTrailChain[] = [
  {
    id: 'bharat-chain',
    title: 'The Sacred Lineage of Bharat',
    description: 'Arrange ancient references to the name Bharat in chronological sequence.',
    items: [
      {
        id: 'b1',
        name: 'Bharata Clan of Rigveda',
        periodOrLanguage: 'c. 1500 BCE (Vedic Sanskrit)',
        significance: 'Prominent clan praised in the Rigvedic hymns in northwestern India.',
        orderIndex: 1
      },
      {
        id: 'b2',
        name: 'Mahābhārata & Epics',
        periodOrLanguage: 'Ancient Epic Era',
        significance: 'Celebrated descendants of King Bharata inhabiting the vast subcontinent.',
        orderIndex: 2
      },
      {
        id: 'b3',
        name: 'Hathigumpha Inscription (Kharavela)',
        periodOrLanguage: '1st Century BCE (Prakrit)',
        significance: 'First epigraphical (stone) occurrence of the name "Bharatavarsha".',
        orderIndex: 3
      },
      {
        id: 'b4',
        name: 'Vishnu Purana Definition',
        periodOrLanguage: 'c. 4th Century CE',
        significance: '"The country north of the ocean and south of snowy mountains is Bharata."',
        orderIndex: 4
      },
      {
        id: 'b5',
        name: 'Constitution of India (Article 1)',
        periodOrLanguage: '26 Nov 1949 (Constituent Assembly)',
        significance: '"India, that is Bharat, shall be a Union of States."',
        orderIndex: 5
      }
    ]
  },
  {
    id: 'india-chain',
    title: 'The Global Journey from River Sindhu to India',
    description: 'Trace the linguistic evolution across Persia, Greece, Rome, and English.',
    items: [
      {
        id: 'i1',
        name: 'River Sindhu (Sanskrit)',
        periodOrLanguage: 'c. 2000–1500 BCE',
        significance: 'The mighty northern river, the Indus, known to ancient Indians.',
        orderIndex: 1
      },
      {
        id: 'i2',
        name: 'Hindu / Hindush (Old Persian)',
        periodOrLanguage: '6th Century BCE (Achaemenid Empire)',
        significance: 'Initial "S" pronounced as "H", recorded in King Darius I inscriptions.',
        orderIndex: 2
      },
      {
        id: 'i3',
        name: 'Indos / Indikē (Ancient Greek)',
        periodOrLanguage: '4th Century BCE (Megasthenes / Alexander)',
        significance: 'Greeks dropped the aspirate "H", calling the land "Indikē" or "Indos".',
        orderIndex: 3
      },
      {
        id: 'i4',
        name: 'India (Latin & Renaissance Europe)',
        periodOrLanguage: 'Classical Roman & Medieval Trade',
        significance: 'Latinized form adopted in European maps, journals, and navigation charts.',
        orderIndex: 4
      },
      {
        id: 'i5',
        name: 'Modern Sovereign India (Article 1)',
        periodOrLanguage: '1949–Present',
        significance: 'Global identity harmonized alongside Bharat in the national constitution.',
        orderIndex: 5
      }
    ]
  }
];

// ----------------------------------------------------
// 2. SOURCE TUG-OF-WAR QUESTIONS
// ----------------------------------------------------
export const SOURCE_TUG_QUESTIONS: SourceTugQuestion[] = [
  {
    id: 't1',
    claim: 'The stone inscription at Hathigumpha, Odisha by King Kharavela is the earliest epigraphical record using the word "Bharatavarsha".',
    isTrue: true,
    correctSource: 'Hathigumpha Inscription (1st Century BCE)',
    sourceOptions: ['Hathigumpha Inscription (1st Century BCE)', 'Ashoka Rock Edict XIII', 'Rigveda Hymns', 'Megasthenes Indica'],
    explanation: 'King Kharavela of Kalinga inscribed the term "Bharatavarsha" on the Udayagiri caves near Bhubaneswar.',
    points: 100
  },
  {
    id: 't2',
    claim: 'Emperor Ashoka used the Sanskrit term "Hindustan" in his Major Rock Edicts.',
    isTrue: false,
    correctSource: 'Ashoka Rock Edicts (Used "Jambudvipa")',
    sourceOptions: ['Ashoka Rock Edicts (Used "Jambudvipa")', 'Vishnu Purana', 'Darius Inscription at Persepolis', 'Baburnama'],
    explanation: 'Ashoka used the term "Jambudvipa" (the island of the Jambu tree), not Hindustan!',
    points: 100
  },
  {
    id: 't3',
    claim: 'The Vishnu Purana explicitly bounds Bharat as the land "north of the ocean and south of the snowy mountains (Himalayas)".',
    isTrue: true,
    correctSource: 'Vishnu Purana (Book II, Chapter 3)',
    sourceOptions: ['Vishnu Purana (Book II, Chapter 3)', 'Arthashastra by Chanakya', 'Rigveda Mandala X', 'Xuanzang Records'],
    explanation: 'The famous verse "Uttaram yat samudrasya himadreschaiva dakshinam..." defines Bharat’s precise geography.',
    points: 100
  },
  {
    id: 't4',
    claim: 'Old Persian inscriptions under Emperor Darius I transformed the Sanskrit "Sindhu" into "Hindu" due to phonetic sound shift (S to H).',
    isTrue: true,
    correctSource: 'Achaemenid Inscriptions (Persepolis/Naqsh-e Rustam)',
    sourceOptions: ['Achaemenid Inscriptions (Persepolis/Naqsh-e Rustam)', 'Greek Maps of Ptolemy', 'Roman Senate Records', 'Tamil Sangam Poetry'],
    explanation: 'Old Persian lacked the initial "S" sound in this context, changing Sindhu into Hindu/Hindush.',
    points: 100
  },
  {
    id: 't5',
    claim: 'The Constituent Assembly of India rejected the name "Bharat" and only accepted "Republic of India" in 1949.',
    isTrue: false,
    correctSource: 'Article 1(1) of the Indian Constitution',
    sourceOptions: ['Article 1(1) of the Indian Constitution', 'Indian Independence Act 1947', 'Government of India Act 1935', 'Preamble Draft 1948'],
    explanation: 'Dr. B.R. Ambedkar and the Assembly adopted: "India, that is Bharat, shall be a Union of States."',
    points: 100
  },
  {
    id: 't6',
    claim: 'Megasthenes, the Greek ambassador to the court of Chandragupta Maurya, titled his monumental work "Indica".',
    isTrue: true,
    correctSource: 'Megasthenes Indica (c. 300 BCE)',
    sourceOptions: ['Megasthenes Indica (c. 300 BCE)', 'Herodotus Histories', 'Periplus of the Erythraean Sea', 'Ptolemy Geographia'],
    explanation: 'Megasthenes documented the Mauryan administration, geography, and rivers under the title Indica.',
    points: 100
  },
  {
    id: 't7',
    claim: 'Chinese Buddhist pilgrim Xuanzang referred to India as "Tianzhu" or "Yintu" (derived from Sindhu/Indu).',
    isTrue: true,
    correctSource: 'Great Tang Records on the Western Regions (Xuanzang)',
    sourceOptions: ['Great Tang Records on the Western Regions (Xuanzang)', 'Al-Biruni Tarikh al-Hind', 'Fa-Hien Travel Records', 'I-Tsing Records'],
    explanation: 'Xuanzang spent 17 years in India, studying at Nalanda, and phonetically transcribed the name as Yintu.',
    points: 100
  },
  {
    id: 't8',
    claim: 'The ancient high-altitude northern highway connecting Taxila to Pataliputra and Tamralipti was called "Dakshinapatha".',
    isTrue: false,
    correctSource: 'Uttarapatha (Northern Trade Highway)',
    sourceOptions: ['Uttarapatha (Northern Trade Highway)', 'Silk Road Central Branch', 'Dakshinapatha', 'Grand Trunk British Line'],
    explanation: 'The northern grand route was Uttarapatha; Dakshinapatha was the southern trade highway crossing the Vindhyas!',
    points: 100
  }
];

// ----------------------------------------------------
// 3. MAP PUZZLE PIECES
// ----------------------------------------------------
export const MAP_PUZZLE_PIECES: MapPuzzlePiece[] = [
  {
    id: 'mp-him',
    title: 'Himavat / Himalayas',
    category: 'landmark',
    hint: 'Northern snowy wall protecting the subcontinent',
    correctSlotId: 'slot-north',
    isDecoy: false,
    historicalDetail: 'Marked in Vishnu Purana as the northern boundary of Bharatavarsha.'
  },
  {
    id: 'mp-sin',
    title: 'River Sindhu (Indus)',
    category: 'waterway',
    hint: 'Northwestern river system giving rise to Hindu and India',
    correctSlotId: 'slot-northwest',
    isDecoy: false,
    historicalDetail: 'The cradle of the Vedic hymns and first Persian/Greek naming interactions.'
  },
  {
    id: 'mp-gan',
    title: 'Ganga & Yamuna Basin',
    category: 'waterway',
    hint: 'Heartland of ancient Janapadas and Magadha',
    correctSlotId: 'slot-gangetic',
    isDecoy: false,
    historicalDetail: 'Flows eastwards through ancient capitals like Pataliputra and Varanasi.'
  },
  {
    id: 'mp-utt',
    title: 'Uttarapatha (Grand Northern Route)',
    category: 'route',
    hint: 'Traders connecting Gandhara in NW to Bay of Bengal ports',
    correctSlotId: 'slot-uttarapatha',
    isDecoy: false,
    historicalDetail: 'Ancient artery of commerce, diplomacy, and pilgrim exchange.'
  },
  {
    id: 'mp-dak',
    title: 'Dakshinapatha (Southern Highway)',
    category: 'route',
    hint: 'Traders crossing the Vindhyas into Deccan and southern ports',
    correctSlotId: 'slot-dakshinapatha',
    isDecoy: false,
    historicalDetail: 'Connected northern cities to Pratishthana, Amaravati, and southern coasts.'
  },
  {
    id: 'mp-kal',
    title: 'Kalinga (Hathigumpha Caves)',
    category: 'region',
    hint: 'Eastern coastal kingdom where Kharavela carved Bharatavarsha',
    correctSlotId: 'slot-east-coast',
    isDecoy: false,
    historicalDetail: 'Location of the Udayagiri inscription in modern Odisha.'
  },
  {
    id: 'mp-ocn',
    title: 'Mahasagara / Indian Ocean',
    category: 'waterway',
    hint: 'Southern maritime frontier bounding the continent',
    correctSlotId: 'slot-south-sea',
    isDecoy: false,
    historicalDetail: 'Vishnu Purana states Bharat lies north of this great southern expanse.'
  },
  // DECOYS
  {
    id: 'mp-decoy1',
    title: 'Panama Isthmus Route',
    category: 'decoy',
    hint: 'Modern American trade canal — DO NOT PLACE!',
    isDecoy: true,
    historicalDetail: 'Decoy! Located in Central America, completely unrelated to ancient Bharat.'
  },
  {
    id: 'mp-decoy2',
    title: 'Thames Estuary',
    category: 'decoy',
    hint: 'British riverway — DO NOT PLACE!',
    isDecoy: true,
    historicalDetail: 'Decoy! European river unrelated to ancient Indian geography.'
  },
  {
    id: 'mp-decoy3',
    title: 'Trans-Siberian Railroad',
    category: 'decoy',
    hint: '19th century Russian train route — DO NOT PLACE!',
    isDecoy: true,
    historicalDetail: 'Decoy! Modern rail line across Northern Asia.'
  }
];

export const MAP_PUZZLE_SLOTS = [
  { id: 'slot-north', name: 'Northern Mountain Wall', expectedId: 'mp-him', coords: { x: 50, y: 15 } },
  { id: 'slot-northwest', name: 'Northwest River Cradle', expectedId: 'mp-sin', coords: { x: 25, y: 28 } },
  { id: 'slot-gangetic', name: 'Sacred Gangetic Valley', expectedId: 'mp-gan', coords: { x: 55, y: 35 } },
  { id: 'slot-uttarapatha', name: 'Trans-Subcontinental Highway (North)', expectedId: 'mp-utt', coords: { x: 42, y: 25 } },
  { id: 'slot-east-coast', name: 'Eastern Inscription Coast', expectedId: 'mp-kal', coords: { x: 68, y: 55 } },
  { id: 'slot-dakshinapatha', name: 'Deccan Southway Highway', expectedId: 'mp-dak', coords: { x: 45, y: 62 } },
  { id: 'slot-south-sea', name: 'Southern Ocean Bound', expectedId: 'mp-ocn', coords: { x: 50, y: 88 } }
];

// ----------------------------------------------------
// 4. TRAVELER AUCTION DOSSIERS
// ----------------------------------------------------
export const TRAVELER_DOSSIERS: TravelerDossier[] = [
  {
    id: 'tr-xuanzang',
    name: 'Xuanzang (Hsüan-tsang)',
    origin: 'Tang Dynasty China',
    century: '7th Century CE (629–645 CE)',
    avatarIcon: '🧘‍♂️',
    baseCost: 150,
    description: 'Master monk who traveled over 10,000 miles across the Silk Road to study Buddhist philosophy at Nalanda University.',
    factsLearned: [
      'Recorded the country as "Yintu" / "Tianzhu".',
      'Described King Harsha of Kannauj and the grand assemblies.',
      'Documented the high moral character, honesty, and scholarly culture of Indian society.'
    ],
    unlockedQuestions: [
      {
        question: 'Which renowned ancient university did Xuanzang spend years studying and lecturing at?',
        options: ['Nalanda University', 'Oxford University', 'Alexandria Library', 'Taxila Medical Academy only'],
        correctIndex: 0,
        explanation: 'Xuanzang studied Yogachara philosophy at Nalanda Mahavihara under Abbot Silabhadra.',
        points: 50
      },
      {
        question: 'How did Xuanzang phonetically spell the name of India in his Chinese chronicles?',
        options: ['Yintu (Yin-du)', 'Nippon', 'Siam', 'Persia'],
        correctIndex: 0,
        explanation: 'He clarified earlier translations and standardized the pronunciation as "Yintu", linked to the moon (Indu) and Sindhu.',
        points: 50
      }
    ]
  },
  {
    id: 'tr-megasthenes',
    name: 'Megasthenes',
    origin: 'Ancient Greece / Seleucid Empire',
    century: 'c. 300 BCE',
    avatarIcon: '🏛️',
    baseCost: 140,
    description: 'Greek ambassador sent by Seleucus I Nicator to the royal court of Emperor Chandragupta Maurya in Pataliputra.',
    factsLearned: [
      'Wrote "Indica", the earliest extensive Western account of Indian society.',
      'Described Pataliputra as a grand fortified city with 570 towers and 64 gates.',
      'Documented that famine was extremely rare due to fertile soil and multiple annual harvests.'
    ],
    unlockedQuestions: [
      {
        question: 'What was the title of Megasthenes’ book describing Mauryan society and governance?',
        options: ['Indica', 'Geographia', 'Arthashastra', 'Anabasis'],
        correctIndex: 0,
        explanation: 'Megasthenes wrote "Indica", which survived through quotations by later Greek and Roman authors.',
        points: 50
      },
      {
        question: 'Which imperial capital city did Megasthenes witness and describe in detail?',
        options: ['Pataliputra (modern Patna)', 'Athens', 'Rome', 'Alexandria'],
        correctIndex: 0,
        explanation: 'He lived at Pataliputra on the confluence of the Ganga and Son rivers.',
        points: 50
      }
    ]
  },
  {
    id: 'tr-albiruni',
    name: 'Al-Biruni',
    origin: 'Khwarazm / Persia (Islamic Golden Age)',
    century: '11th Century CE (c. 1017–1030 CE)',
    avatarIcon: '📜',
    baseCost: 160,
    description: 'Polymath, astronomer, and linguist who learned Sanskrit to master Hindu astronomy, mathematics, and philosophy.',
    factsLearned: [
      'Authored "Kitab Tarikh al-Hind" (Chronicles of India).',
      'Praised Indian decimal place-value system and trigonometry.',
      'Translated Patanjali’s Yoga Sutras and the Bhagavad Gita into Arabic.'
    ],
    unlockedQuestions: [
      {
        question: 'Which ancient language did Al-Biruni master so he could read Indian scientific treatises directly?',
        options: ['Sanskrit', 'Latin', 'Greek', 'Pali only'],
        correctIndex: 0,
        explanation: 'Al-Biruni studied Sanskrit for years with Indian scholars (pandits) to understand primary texts.',
        points: 50
      },
      {
        question: 'What is the title of Al-Biruni’s masterwork on Indian science, religion, and geography?',
        options: ['Tarikh al-Hind (Kitab al-Hind)', 'Baburnama', 'Travels of Marco Polo', 'Ain-i-Akbari'],
        correctIndex: 0,
        explanation: 'Tarikh al-Hind is considered one of the finest objective ethnographic studies of medieval India.',
        points: 50
      }
    ]
  },
  {
    id: 'tr-fahien',
    name: 'Faxian (Fa-Hien)',
    origin: 'Jin Dynasty China',
    century: '5th Century CE (Gupta Empire)',
    avatarIcon: '🏮',
    baseCost: 120,
    description: 'Early Chinese pilgrim who walked overland across the Gobi desert and Himalayas to acquire authentic Sanskrit Vinaya texts.',
    factsLearned: [
      'Traveled during the prosperous reign of Chandragupta II (Vikramaditya).',
      'Described peaceful society, free charitable hospitals (Punya-salas), and zero corporal punishment.',
      'Sailed back via Sri Lanka and Java with hundreds of Buddhist manuscripts.'
    ],
    unlockedQuestions: [
      {
        question: 'During which flourishing empire did Faxian visit northern India?',
        options: ['Gupta Empire', 'Mughal Empire', 'British Raj', 'Chola Empire in North'],
        correctIndex: 0,
        explanation: 'Faxian visited during the peak of the Gupta Golden Age.',
        points: 50
      }
    ]
  }
];

// ----------------------------------------------------
// 5. CIVILIZATION BUILDER CANVAS DATA
// ----------------------------------------------------
export const CIV_ELEMENTS: CivElement[] = [
  {
    id: 'civ-himalayas',
    title: 'Himalayan Ridge (Himavat)',
    type: 'mountain-frontier',
    xPercent: 50,
    yPercent: 12,
    historicalSignificance: 'The northern natural fortress and crown described in Vishnu Purana.',
    zoneHint: 'Top Center (North)'
  },
  {
    id: 'civ-sindhu',
    title: 'River Sindhu & Tributaries',
    type: 'sacred-river',
    xPercent: 22,
    yPercent: 30,
    historicalSignificance: 'Source of the terms Sindhu, Hindu, Indos, and India.',
    zoneHint: 'Upper Left (North-West)'
  },
  {
    id: 'civ-ganga',
    title: 'River Ganga & Pataliputra',
    type: 'sacred-river',
    xPercent: 58,
    yPercent: 38,
    historicalSignificance: 'Fertile river basin and political nucleus of Mauryas and Guptas.',
    zoneHint: 'Center Right (Gangetic Plains)'
  },
  {
    id: 'civ-hathigumpha',
    title: 'Hathigumpha Inscription (Kalinga)',
    type: 'royal-inscription',
    xPercent: 68,
    yPercent: 54,
    historicalSignificance: 'King Kharavela’s stone record citing Bharatavarsha in 1st Century BCE.',
    zoneHint: 'Mid-East Coast (Odisha)'
  },
  {
    id: 'civ-uttarapatha',
    title: 'Uttarapatha Highway',
    type: 'trade-hub',
    xPercent: 38,
    yPercent: 26,
    historicalSignificance: 'Pan-Asian overland artery connecting Taxila to Tamralipti.',
    zoneHint: 'Northern Diagonal Belt'
  },
  {
    id: 'civ-dakshinapatha',
    title: 'Dakshinapatha Highway',
    type: 'trade-hub',
    xPercent: 44,
    yPercent: 62,
    historicalSignificance: 'Commercial trunk line crossing Vindhyas to Deccan kingdoms.',
    zoneHint: 'Central-South Corridor'
  },
  {
    id: 'civ-ocean',
    title: 'Southern Ocean (Mahasagara)',
    type: 'sea-coast',
    xPercent: 50,
    yPercent: 90,
    historicalSignificance: 'The maritime frontier bounding Bharat on the south.',
    zoneHint: 'Bottom Center (South)'
  }
];

// ----------------------------------------------------
// 6. ETYMOLOGY DUEL CHAINS
// ----------------------------------------------------
export const ETYMOLOGY_DUEL_CHAINS: EtymologyDuelChain[] = [
  {
    id: 'chain-india-lineage',
    title: 'The Sindhu-to-India Transmutation',
    lineage: 'India',
    steps: [
      {
        word: 'Sindhu (सिन्धु)',
        culture: 'Vedic Sanskrit',
        approxYear: 'c. 1500 BCE',
        phoneticShift: 'Original name for the mighty northwestern river and surrounding territory.'
      },
      {
        word: 'Hindush / Hindu',
        culture: 'Old Persian (Achaemenid)',
        approxYear: 'c. 515 BCE',
        phoneticShift: 'Linguistic rule: Initial Sanskrit "S" shifted to "H" in Old Persian.'
      },
      {
        word: 'Indos / Indikē',
        culture: 'Ancient Greek (Ionian)',
        approxYear: 'c. 300 BCE',
        phoneticShift: 'Greeks dropped the initial aspirate "H", rendering it "Indos".'
      },
      {
        word: 'India',
        culture: 'Latin & Renaissance Cartography',
        approxYear: '1st–16th Century CE',
        phoneticShift: 'Latinized spelling adopted across global maritime maps and encyclopedias.'
      },
      {
        word: 'Republic of India',
        culture: 'Constitutional Modernity',
        approxYear: '1950 CE',
        phoneticShift: 'Sovereign democratic state harmonized in Article 1 with Bharat.'
      }
    ]
  },
  {
    id: 'chain-bharat-lineage',
    title: 'The Bharata Civilizational Evolution',
    lineage: 'Bharat',
    steps: [
      {
        word: 'Bharata Tribe (भरताः)',
        culture: 'Rigveda Hymns',
        approxYear: 'c. 1500 BCE',
        phoneticShift: 'Vedic community known for righteousness, unity, and valor.'
      },
      {
        word: 'Bharatavarsha (वर्ष/Land)',
        culture: 'Epics & Puranas',
        approxYear: 'c. 500 BCE–300 CE',
        phoneticShift: 'Suffix "Varsha" added, designating the entire subcontinental territory.'
      },
      {
        word: 'Bharadhavasa (Prakrit)',
        culture: 'Hathigumpha Inscription',
        approxYear: '1st Century BCE',
        phoneticShift: 'Prakrit epigraphic recording by Emperor Kharavela on rock caves.'
      },
      {
        word: 'Bharat (Modern Statehood)',
        culture: 'Constituent Assembly',
        approxYear: '1949 CE',
        phoneticShift: 'Unified in Article 1(1): "India, that is Bharat, shall be a Union of States."'
      }
    ]
  }
];

// ----------------------------------------------------
// 7. INSCRIPTION DETECTIVE TABLETS
// ----------------------------------------------------
export const INSCRIPTION_TABLETS: InscriptionTablet[] = [
  {
    id: 'tab-hathigumpha',
    title: 'Hathigumpha Cave Inscription of King Kharavela',
    era: '1st Century BCE',
    location: 'Udayagiri Hills, near Bhubaneswar, Odisha',
    ruler: 'King Kharavela of Kalinga',
    fullTextFormatted: 'Praise to the Arhats! In the 10th year of reign, King Kharavela of Rome marched his army across the snowy Andes mountains to conquer the territory known as Bharadhavasa (Bharatavarsha), recording his deeds in classical English on the rock wall.',
    errors: [
      {
        id: 'err-1',
        distortedText: 'King Kharavela of Rome',
        correctHistoricalTruth: 'King Kharavela of Kalinga (ancient Odisha, India)',
        explanation: 'Kharavela was the great monarch of the Mahameghavahana dynasty of Kalinga, not Rome!'
      },
      {
        id: 'err-2',
        distortedText: 'snowy Andes mountains',
        correctHistoricalTruth: 'Across Northern and Southern India (Bharatavarsha)',
        explanation: 'The Andes are in South America. Kharavela campaigned across the Indian subcontinent.'
      },
      {
        id: 'err-3',
        distortedText: 'in classical English',
        correctHistoricalTruth: 'In Prakrit language using Brahmi script',
        explanation: 'The Hathigumpha inscription is carved in ancient Prakrit with the historic Brahmi script.'
      }
    ]
  },
  {
    id: 'tab-ashoka-edicts',
    title: 'Major Rock Edict of Emperor Ashoka',
    era: '3rd Century BCE (c. 250 BCE)',
    location: 'Brahmagiri & Maski (Karnataka) / Girnar (Gujarat)',
    ruler: 'Devanampriya Priyadasi (Emperor Ashoka the Great)',
    fullTextFormatted: 'Beloved of the Gods, Emperor Ashoka commands all officials of his Cyberpunk Colony to spread Dhamma throughout the territory of Jambudvipa. All citizens using Bitcoin shall practice non-violence (Ahimsa) and compassion towards all living beings.',
    errors: [
      {
        id: 'err-4',
        distortedText: 'Cyberpunk Colony',
        correctHistoricalTruth: 'The Mauryan Empire',
        explanation: 'Ashoka ruled the vast Mauryan Empire across the Indian subcontinent.'
      },
      {
        id: 'err-5',
        distortedText: 'using Bitcoin',
        correctHistoricalTruth: 'all people and subjects across Janapadas',
        explanation: 'Bitcoin is a 21st-century cryptocurrency; ancient Maurya used silver punch-marked coins (Karshapanas).'
      }
    ]
  }
];

// ----------------------------------------------------
// 8. MEMORY MATCH CARDS (Ancient Name ↔ Source/Meaning)
// ----------------------------------------------------
export const MEMORY_MATCH_PAIRS: { pairKey: string; term: string; meaning: string; badge: string }[] = [
  {
    pairKey: 'p1',
    term: 'Jambudvipa',
    meaning: 'The Island/Land of the Rose-Apple (Jambu) Tree',
    badge: 'Ashokan Inscriptions'
  },
  {
    pairKey: 'p2',
    term: 'Bharatavarsha',
    meaning: 'The Realm of the Sons of Bharata (Himalayas to Sea)',
    badge: 'Vishnu Purana & Hathigumpha'
  },
  {
    pairKey: 'p3',
    term: 'Indos / Indikē',
    meaning: 'Greek pronunciation of River Sindhu without "H"',
    badge: 'Megasthenes'
  },
  {
    pairKey: 'p4',
    term: 'Hindush',
    meaning: 'Old Persian name for the land along the Indus',
    badge: 'Darius I Inscriptions'
  },
  {
    pairKey: 'p5',
    term: 'Uttarapatha',
    meaning: 'The Grand Northern Trade Artery (Taxila to Bengal)',
    badge: 'Ancient Trade Route'
  },
  {
    pairKey: 'p6',
    term: 'Article 1(1)',
    meaning: '"India, that is Bharat, shall be a Union of States"',
    badge: 'Constitution of India'
  },
  {
    pairKey: 'p7',
    term: 'Yintu (Tianzhu)',
    meaning: 'Chinese phonetic transcription of India meaning "Moon/Indu"',
    badge: 'Xuanzang Chronicles'
  },
  {
    pairKey: 'p8',
    term: 'Dakshinapatha',
    meaning: 'The Southern Route connecting Gangetic plains to Deccan',
    badge: 'Ancient Trade Route'
  }
];

// ----------------------------------------------------
// 9. RIVER TO NAME CONNECTIONS
// ----------------------------------------------------
export const RIVER_FLOW_CONNECTIONS: RiverFlowConnection[] = [
  {
    id: 'rfc-1',
    originName: 'River Sindhu',
    originType: 'river',
    targetTerm: 'Hindu / Hindustan',
    targetCulture: 'Old Persian (Achaemenid Empire)',
    context: 'Initial S shifted to H sound in Persian phonetics.'
  },
  {
    id: 'rfc-2',
    originName: 'River Sindhu',
    originType: 'river',
    targetTerm: 'Indos / India',
    targetCulture: 'Greek & Roman Historians',
    context: 'Aspirate H was omitted, yielding Indos and Latin India.'
  },
  {
    id: 'rfc-3',
    originName: 'Himavat & Ocean',
    originType: 'mountain',
    targetTerm: 'Bharatavarsha Definition',
    targetCulture: 'Vishnu Purana & Puranic Literature',
    context: 'Geographical unity bounded by snowy peaks in north and sea in south.'
  },
  {
    id: 'rfc-4',
    originName: 'King Kharavela of Kalinga',
    originType: 'monarch',
    targetTerm: 'First Stone Inscription of Bharatavarsha',
    targetCulture: 'Hathigumpha Prakrit Epigraphy',
    context: 'Earliest archaeological proof of the subcontinental name.'
  },
  {
    id: 'rfc-5',
    originName: 'Sacred Jambu Tree',
    originType: 'mountain',
    targetTerm: 'Jambudvipa',
    targetCulture: 'Ashokan Rock Edicts & Buddhist Cosmography',
    context: 'Traditional cosmological name for the central habitable world.'
  }
];

// ----------------------------------------------------
// 10. FACT SNIPER TARGETS (True Facts vs Historical Myths)
// ----------------------------------------------------
export const FACT_SNIPER_TARGETS: FactSniperItem[] = [
  {
    id: 'fs-1',
    statement: 'Article 1 of the Indian Constitution declares: "India, that is Bharat, shall be a Union of States."',
    isHistoricalFact: true,
    difficulty: 'medium',
    sourceCitation: 'Constitution of India (1949)'
  },
  {
    id: 'fs-2',
    statement: 'The name "Bharat" was invented by the British East India Company in 1857.',
    isHistoricalFact: false,
    difficulty: 'fast',
    sourceCitation: 'Rigveda & Vishnu Purana',
    correctionIfMyth: 'Bharat has been used for thousands of years since the Rigveda and Epics!'
  },
  {
    id: 'fs-3',
    statement: 'The earliest epigraphical occurrence of "Bharatavarsha" is found in the Hathigumpha Inscription in Odisha.',
    isHistoricalFact: true,
    difficulty: 'medium',
    sourceCitation: 'Hathigumpha Cave Inscription (1st Century BCE)'
  },
  {
    id: 'fs-4',
    statement: 'The Greeks called India "Indos" because they preserved the Persian "H" sound perfectly.',
    isHistoricalFact: false,
    difficulty: 'fast',
    sourceCitation: 'Greek Linguistic Studies',
    correctionIfMyth: 'Greeks dropped the initial "H", turning Hindu into Indos!'
  },
  {
    id: 'fs-5',
    statement: 'Emperor Ashoka used the ancient civilizational name "Jambudvipa" in his stone rock edicts.',
    isHistoricalFact: true,
    difficulty: 'medium',
    sourceCitation: 'Ashokan Minor Rock Edict I'
  },
  {
    id: 'fs-6',
    statement: 'Xuanzang traveled across Central Asia to India and studied at Nalanda University for several years.',
    isHistoricalFact: true,
    difficulty: 'medium',
    sourceCitation: 'Great Tang Records on the Western Regions'
  },
  {
    id: 'fs-7',
    statement: 'The Vishnu Purana states that India is situated south of the ocean and north of the Himalayas.',
    isHistoricalFact: false,
    difficulty: 'boss',
    sourceCitation: 'Vishnu Purana Book II',
    correctionIfMyth: 'Careful! It states North of the ocean and South of the Himalayas!'
  },
  {
    id: 'fs-8',
    statement: 'The Uttarapatha and Dakshinapatha were ancient trade highways that unified the subcontinent commercially and culturally.',
    isHistoricalFact: true,
    difficulty: 'medium',
    sourceCitation: 'Ancient Indian Trade Routes History'
  },
  {
    id: 'fs-9',
    statement: 'Megasthenes was a Roman astronaut who visited India in 1969.',
    isHistoricalFact: false,
    difficulty: 'fast',
    sourceCitation: 'Megasthenes Indica (300 BCE)',
    correctionIfMyth: 'Megasthenes was an ancient Greek ambassador to the court of Chandragupta Maurya in 300 BCE!'
  },
  {
    id: 'fs-10',
    statement: 'Al-Biruni learned Sanskrit so he could translate and understand Hindu astronomy and mathematics directly.',
    isHistoricalFact: true,
    difficulty: 'medium',
    sourceCitation: 'Al-Biruni Tarikh al-Hind'
  }
];
