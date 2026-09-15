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

export interface HeritageMapItem {
  id: string;
  name: string;
  emoji: string;
  category: 'dance' | 'food' | 'monument' | 'craft' | 'festival' | 'wildlife' | 'landmark';
  correctStateId: string;
  hint: string;
  funFact: string;
}

export interface HeritageDropZone {
  id: string;
  name: string;
  top: string;
  left: string;
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
  },
  {
    id: 'jambudvipa-chain',
    title: 'Jambudvipa: Continent of the Sacred Jambu Tree',
    description: 'Sequence the historical evolution of the continent name Jambudvipa across ancient records.',
    items: [
      {
        id: 'j1',
        name: 'Bronze Age Meluhha (Sumerian Records)',
        periodOrLanguage: 'c. 2300–1800 BCE (Cuneiform)',
        significance: 'Ancient Mesopotamian trade records referencing the seafaring Indus civilization.',
        orderIndex: 1
      },
      {
        id: 'j2',
        name: 'Ashokan Rock Edict ("Jambudvipe")',
        periodOrLanguage: 'c. 250 BCE (Brahmi Inscriptions)',
        significance: 'Emperor Ashoka declares his moral dharma spanning the entirety of Jambudvipa.',
        orderIndex: 2
      },
      {
        id: 'j3',
        name: 'Buddhist Jatakas & Mahavamsa',
        periodOrLanguage: '3rd–1st Century BCE (Pali Canon)',
        significance: 'Described Jambudvipa as the sacred southern continent where Buddhas appear.',
        orderIndex: 3
      },
      {
        id: 'j4',
        name: 'Tiloyapannatti (Jain Cosmography)',
        periodOrLanguage: 'c. 5th–6th Century CE (Prakrit)',
        significance: 'Exact cosmological mapping of the central ring continent surrounded by the Lavana ocean.',
        orderIndex: 4
      },
      {
        id: 'j5',
        name: 'Maritime Southeast Asian Epigraphy',
        periodOrLanguage: 'c. 7th–11th Century CE',
        significance: 'Inscriptions across Java, Sumatra, and Cambodia acknowledging cultural descent from Jambudvipa.',
        orderIndex: 5
      }
    ]
  },
  {
    id: 'aryavarta-chain',
    title: 'Aryavarta & Sacred Geography of the Rivers',
    description: 'Arrange historical definitions of Aryavarta across ancient legal and grammatical treatises.',
    items: [
      {
        id: 'a1',
        name: 'Rigvedic Sapta Sindhu',
        periodOrLanguage: 'c. 1500 BCE (Early Vedic)',
        significance: 'The original homeland of the seven sacred northwestern rivers praised in the hymns.',
        orderIndex: 1
      },
      {
        id: 'a2',
        name: 'Baudhayana Dharmasutra',
        periodOrLanguage: 'c. 6th–5th Century BCE',
        significance: 'Geographically bounds the sacred cultural territory east of where the river Sarasvati vanishes.',
        orderIndex: 2
      },
      {
        id: 'a3',
        name: 'Manusmriti: Land of the Noble',
        periodOrLanguage: 'c. 2nd Century BCE – 2nd Century CE',
        significance: 'Defines Aryavarta bounded by the Himalayas in the north and the Vindhyas in the south.',
        orderIndex: 3
      },
      {
        id: 'a4',
        name: 'Patanjali’s Mahabhashya',
        periodOrLanguage: 'c. 150 BCE (Classical Sanskrit)',
        significance: 'Grammatical treatise outlining Aryavarta stretching between the eastern and western seas.',
        orderIndex: 4
      },
      {
        id: 'a5',
        name: 'Prayag Prashasti (Samudragupta)',
        periodOrLanguage: 'c. 350 CE (Gupta Epigraphy)',
        significance: 'Celebrated Allahabad Pillar inscription recording royal unifications across Aryavarta.',
        orderIndex: 5
      }
    ]
  },
  {
    id: 'hindustan-chain',
    title: 'The Journey of Hindustan & Al-Hind',
    description: 'Chronologically trace how Persian, Arab, and Indian records evolved the term Hindustan.',
    items: [
      {
        id: 'h1',
        name: 'Achaemenid Naqsh-e Rustam Inscription',
        periodOrLanguage: '515 BCE (Old Persian)',
        significance: 'Emperor Darius I lists the eastern satrapy province as "Hindush" on the river basin.',
        orderIndex: 1
      },
      {
        id: 'h2',
        name: 'Ka’ba-ye Zartosht Inscription (Shapur I)',
        periodOrLanguage: 'c. 262 CE (Middle Persian Sasanian)',
        significance: 'Earliest known epigraphical stone inscription recording the compound name "Hindustan".',
        orderIndex: 2
      },
      {
        id: 'h3',
        name: 'Al-Biruni: Kitab Tarikh al-Hind',
        periodOrLanguage: 'c. 1030 CE (Classical Arabic)',
        significance: 'Monumental cultural and scientific study documenting the civilization, sciences, and people of Hind.',
        orderIndex: 3
      },
      {
        id: 'h4',
        name: 'Baburnama & Ain-i-Akbari',
        periodOrLanguage: '16th Century CE (Chagatai & Persian)',
        significance: 'Imperial chronicles defining Hindustan as a distinctive subcontinent with unique climate and fauna.',
        orderIndex: 4
      },
      {
        id: 'h5',
        name: 'The Sovereign Salute: "Jai Hind"',
        periodOrLanguage: '1941–1947 CE (Freedom Movement)',
        significance: 'Coinage by Chempakaraman Pillai and popularized by Netaji Subhas Chandra Bose as the national greeting.',
        orderIndex: 5
      }
    ]
  },
  {
    id: 'travelers-chain',
    title: 'Ancient Global Observers of Bharat',
    description: 'Place foreign ambassadors and pilgrim scholars who documented India into chronological order.',
    items: [
      {
        id: 'tr1',
        name: 'Megasthenes (Seleucid Ambassador)',
        periodOrLanguage: 'c. 300 BCE (Mauryan Pataliputra)',
        significance: 'Author of "Indica", describing Chandragupta Maurya’s capital, palace administration, and fertile lands.',
        orderIndex: 1
      },
      {
        id: 'tr2',
        name: 'Faxian (Chinese Buddhist Pilgrim)',
        periodOrLanguage: 'c. 405 CE (Gupta Empire)',
        significance: 'Walked thousands of miles recording northern Indian hospitals, peaceful rule, and Buddhist shrines.',
        orderIndex: 2
      },
      {
        id: 'tr3',
        name: 'Xuanzang (Master Pilgrim & Scholar)',
        periodOrLanguage: 'c. 637 CE (Nalanda University)',
        significance: 'Master monk who studied 17 years in India, transcribing the name "Yintu" and translating Sanskrit texts.',
        orderIndex: 3
      },
      {
        id: 'tr4',
        name: 'Yijing / I-Tsing (Maritime Pilgrim)',
        periodOrLanguage: 'c. 673 CE (Tang Dynasty)',
        significance: 'Arrived by sea at Tamralipti, documenting Nalanda monastic codes and translating hundreds of texts.',
        orderIndex: 4
      },
      {
        id: 'tr5',
        name: 'Al-Biruni (Polymath & Indologist)',
        periodOrLanguage: 'c. 1020 CE (Punjab & Multan)',
        significance: 'Learned Sanskrit to read the Bhagavad Gita and astronomical treatises, compiling the Tarikh al-Hind.',
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

// ----------------------------------------------------
// 9. HERITAGE MAP CHALLENGE DATA
// ----------------------------------------------------
export const HERITAGE_DROP_ZONES: HeritageDropZone[] = [
  // North
  { id: 'jammu-kashmir', name: 'Jammu & Kashmir', top: '13%', left: '37%' },
  { id: 'ladakh', name: 'Ladakh', top: '11%', left: '43%' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', top: '18%', left: '42%' },
  { id: 'punjab', name: 'Punjab', top: '22%', left: '36%' },
  { id: 'haryana', name: 'Haryana', top: '25%', left: '39%' },
  { id: 'delhi', name: 'Delhi (NCT)', top: '28%', left: '41%' },
  { id: 'uttarakhand', name: 'Uttarakhand', top: '23%', left: '46%' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', top: '34%', left: '48%' },
  // West
  { id: 'rajasthan', name: 'Rajasthan', top: '35%', left: '32%' },
  { id: 'gujarat', name: 'Gujarat', top: '46%', left: '28%' },
  { id: 'maharashtra', name: 'Maharashtra', top: '58%', left: '36%' },
  { id: 'goa', name: 'Goa', top: '68%', left: '33%' },
  // East & Central
  { id: 'bihar', name: 'Bihar', top: '38%', left: '60%' },
  { id: 'jharkhand', name: 'Jharkhand', top: '46%', left: '60%' },
  { id: 'west-bengal', name: 'West Bengal', top: '48%', left: '66%' },
  { id: 'odisha', name: 'Odisha', top: '56%', left: '60%' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', top: '46%', left: '45%' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', top: '53%', left: '52%' },
  // South
  { id: 'karnataka', name: 'Karnataka', top: '74%', left: '40%' },
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', top: '68%', left: '50%' },
  { id: 'telangana', name: 'Telangana', top: '62%', left: '46%' },
  { id: 'tamil-nadu', name: 'Tamil Nadu', top: '82%', left: '48%' },
  { id: 'kerala', name: 'Kerala', top: '84%', left: '40%' },
  // North-East
  { id: 'sikkim', name: 'Sikkim', top: '31%', left: '65%' },
  { id: 'assam', name: 'Assam', top: '34%', left: '77%' },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', top: '26%', left: '82%' },
  { id: 'meghalaya', name: 'Meghalaya', top: '39%', left: '74%' },
  { id: 'nagaland', name: 'Nagaland', top: '35%', left: '86%' },
  { id: 'manipur', name: 'Manipur', top: '42%', left: '85%' },
  { id: 'mizoram', name: 'Mizoram', top: '47%', left: '81%' },
  { id: 'tripura', name: 'Tripura', top: '45%', left: '76%' }
];

export const HERITAGE_MAP_ITEMS: HeritageMapItem[] = [
  // Jammu & Kashmir
  { id: 'hm-jk1', name: 'Pashmina Shawl', emoji: '🧣', category: 'craft', correctStateId: 'jammu-kashmir', hint: 'Valley of Saffron', funFact: 'Authentic Pashmina comes from the Changthangi goat at altitudes above 14,000 ft in Ladakh & Kashmir.' },
  { id: 'hm-jk2', name: 'Wazwan Feast', emoji: '🍖', category: 'food', correctStateId: 'jammu-kashmir', hint: 'Land of Shikaras', funFact: 'Wazwan is a grand 36-course Kashmiri feast traditionally served at weddings and celebrations.' },
  // Ladakh
  { id: 'hm-la1', name: 'Hemis Monastery', emoji: '🏔️', category: 'monument', correctStateId: 'ladakh', hint: 'Land of High Passes', funFact: 'Hemis is the largest Buddhist monastery in Ladakh, famous for its annual Cham masked dance festival.' },
  { id: 'hm-la2', name: 'Pangong Tso Lake', emoji: '💧', category: 'landmark', correctStateId: 'ladakh', hint: 'High altitude desert', funFact: 'Pangong Tso stretches 134 km across India and China, changing colors from azure to turquoise through the day.' },
  // Punjab
  { id: 'hm-pb1', name: 'Bhangra Dance', emoji: '💃', category: 'dance', correctStateId: 'punjab', hint: 'Land of Five Rivers', funFact: 'Bhangra originated as a harvest celebration dance performed by Punjabi farmers during Baisakhi.' },
  { id: 'hm-pb2', name: 'Golden Temple', emoji: '🏛️', category: 'monument', correctStateId: 'punjab', hint: 'Amritsar', funFact: 'Sri Harmandir Sahib serves free meals (langar) to over 100,000 visitors daily — world\'s largest community kitchen.' },
  // Haryana
  { id: 'hm-hr1', name: 'Kurukshetra Battlefield', emoji: '⚔️', category: 'landmark', correctStateId: 'haryana', hint: 'Bhagavad Gita birthplace', funFact: 'The Bhagavad Gita was delivered by Lord Krishna to Arjuna at Jyotisar, Kurukshetra before the Mahabharata war.' },
  { id: 'hm-hr2', name: 'Surajkund Crafts Fair', emoji: '🎨', category: 'festival', correctStateId: 'haryana', hint: 'Near Delhi', funFact: 'Surajkund International Crafts Mela is the largest crafts fair in the world, attracting artisans from 20+ nations.' },
  // Himachal Pradesh
  { id: 'hm-hp1', name: 'Kullu Shawl', emoji: '🧶', category: 'craft', correctStateId: 'himachal-pradesh', hint: 'Devbhoomi', funFact: 'Kullu handwoven shawls are a GI-tagged craft with geometric patterns unique to the Kullu Valley.' },
  { id: 'hm-hp2', name: 'Nati Dance', emoji: '💃', category: 'dance', correctStateId: 'himachal-pradesh', hint: 'Apple orchards', funFact: 'The Nati dance holds the Guinness World Record for the largest folk dance — performed by over 9,000 dancers.' },
  // Uttarakhand
  { id: 'hm-uk1', name: 'Char Dham Pilgrimage', emoji: '🕉️', category: 'landmark', correctStateId: 'uttarakhand', hint: 'Land of the Gods', funFact: 'Char Dham covers Badrinath, Kedarnath, Gangotri, and Yamunotri — four sacred Himalayan shrines.' },
  { id: 'hm-uk2', name: 'Ganga Aarti at Rishikesh', emoji: '🔥', category: 'festival', correctStateId: 'uttarakhand', hint: 'Yoga Capital', funFact: 'The Triveni Ghat Ganga Aarti at Rishikesh is performed every evening with fire, bells, and Sanskrit chants.' },
  // Uttar Pradesh
  { id: 'hm-up1', name: 'Taj Mahal', emoji: '🕌', category: 'monument', correctStateId: 'uttar-pradesh', hint: 'Heartland of ancient wisdom', funFact: 'The Taj Mahal was built by Shah Jahan in memory of Mumtaz Mahal, using 22,000 workers over 22 years.' },
  { id: 'hm-up2', name: 'Banarasi Silk Saree', emoji: '👘', category: 'craft', correctStateId: 'uttar-pradesh', hint: 'World\'s oldest living city', funFact: 'Banarasi silk sarees use real gold and silver zari threads — a tradition dating back to the Mughal era.' },
  // Delhi
  { id: 'hm-dl1', name: 'Red Fort', emoji: '🏰', category: 'monument', correctStateId: 'delhi', hint: 'Heart of the Nation', funFact: 'The Prime Minister hoists the national flag at Red Fort every Independence Day since 1947.' },
  { id: 'hm-dl2', name: 'Chandni Chowk Chaat', emoji: '🍽️', category: 'food', correctStateId: 'delhi', hint: 'National Capital', funFact: 'Chandni Chowk, built in the 17th century by Jahanara Begum, is one of Asia\'s oldest and busiest markets.' },
  // Rajasthan
  { id: 'hm-rj1', name: 'Ghoomar Dance', emoji: '💃', category: 'dance', correctStateId: 'rajasthan', hint: 'Land of Kings', funFact: 'Ghoomar is a traditional Rajput dance performed by women in swirling ghaghra skirts during festivals.' },
  { id: 'hm-rj2', name: 'Dal Baati Churma', emoji: '🍲', category: 'food', correctStateId: 'rajasthan', hint: 'Desert forts', funFact: 'Dal Baati Churma is Rajasthan\'s signature dish — baked wheat balls drenched in ghee, served with spiced lentils.' },
  // Gujarat
  { id: 'hm-gj1', name: 'Garba Dance', emoji: '💃', category: 'dance', correctStateId: 'gujarat', hint: 'Navratri celebrations', funFact: 'Gujarat\'s Garba was inscribed on UNESCO\'s Intangible Cultural Heritage list — world\'s longest dance festival during Navratri.' },
  { id: 'hm-gj2', name: 'Rann of Kutch', emoji: '🏜️', category: 'landmark', correctStateId: 'gujarat', hint: 'White salt desert', funFact: 'The Great Rann of Kutch is the world\'s largest salt desert, stretching over 7,500 sq km of dazzling white salt flats.' },
  // Maharashtra
  { id: 'hm-mh1', name: 'Warli Art', emoji: '🎨', category: 'craft', correctStateId: 'maharashtra', hint: 'Ajanta & Ellora', funFact: 'Warli tribal art uses geometric shapes (triangles, circles) depicting daily life — practiced for over 2,500 years.' },
  { id: 'hm-mh2', name: 'Vada Pav', emoji: '🍔', category: 'food', correctStateId: 'maharashtra', hint: 'Mumbai megacity', funFact: 'Vada Pav is Mumbai\'s iconic street food — a spiced potato fritter in a bun, invented by Ashok Vaidya in 1966.' },
  // Goa
  { id: 'hm-go1', name: 'Basilica of Bom Jesus', emoji: '⛪', category: 'monument', correctStateId: 'goa', hint: 'Pearl of the Arabian Sea', funFact: 'This UNESCO World Heritage Basilica holds the mortal remains of St. Francis Xavier in a silver casket since 1613.' },
  { id: 'hm-go2', name: 'Goa Carnival', emoji: '🎭', category: 'festival', correctStateId: 'goa', hint: 'Beaches & churches', funFact: 'The Goa Carnival is a 3-day festival of parades, music, and revelry — a 500-year-old Portuguese tradition.' },
  // Bihar
  { id: 'hm-br1', name: 'Nalanda University Ruins', emoji: '🏛️', category: 'monument', correctStateId: 'bihar', hint: 'Land of enlightenment', funFact: 'Nalanda was the world\'s first residential university (5th century CE), hosting 10,000+ scholars from across Asia.' },
  { id: 'hm-br2', name: 'Madhubani Painting', emoji: '🎨', category: 'craft', correctStateId: 'bihar', hint: 'Mithila region', funFact: 'Madhubani art uses natural dyes from turmeric, indigo, and flower extracts — traditionally painted by women on mud walls.' },
  // Jharkhand
  { id: 'hm-jh1', name: 'Chhau Dance', emoji: '🎭', category: 'dance', correctStateId: 'jharkhand', hint: 'Land of forests', funFact: 'Seraikela Chhau is a UNESCO-recognized masked dance depicting epic battles from the Mahabharata and Ramayana.' },
  { id: 'hm-jh2', name: 'Sohrai Mural Art', emoji: '🎨', category: 'craft', correctStateId: 'jharkhand', hint: 'Tribal heritage', funFact: 'Sohrai-Khovar GI-tagged murals are created by tribal women during harvest using fingers and twigs on mud walls.' },
  // West Bengal
  { id: 'hm-wb1', name: 'Durga Puja', emoji: '🎊', category: 'festival', correctStateId: 'west-bengal', hint: 'Bengal Renaissance', funFact: 'Kolkata\'s Durga Puja was inscribed as UNESCO Intangible Cultural Heritage of Humanity in 2021.' },
  { id: 'hm-wb2', name: 'Rosogolla', emoji: '🍬', category: 'food', correctStateId: 'west-bengal', hint: 'Land of Tagore', funFact: 'Banglar Rosogolla received GI tag in 2017 — soft cottage cheese balls soaked in sugar syrup, invented in Kolkata.' },
  // Odisha
  { id: 'hm-od1', name: 'Konark Sun Temple', emoji: '☀️', category: 'monument', correctStateId: 'odisha', hint: 'Land of Jagannath', funFact: 'Konark\'s 13th-century temple is shaped as a giant chariot with 24 intricately carved stone wheels and 7 horses.' },
  { id: 'hm-od2', name: 'Odissi Dance', emoji: '💃', category: 'dance', correctStateId: 'odisha', hint: 'Kalinga coast', funFact: 'Odissi is one of India\'s oldest classical dance forms, originating in temples of Bhubaneswar over 2,000 years ago.' },
  // Madhya Pradesh
  { id: 'hm-mp1', name: 'Sanchi Stupa', emoji: '🏛️', category: 'monument', correctStateId: 'madhya-pradesh', hint: 'Heart of India', funFact: 'The Great Stupa at Sanchi was commissioned by Emperor Ashoka in the 3rd century BCE to house Buddha\'s relics.' },
  { id: 'hm-mp2', name: 'Bhimbetka Cave Paintings', emoji: '🎨', category: 'landmark', correctStateId: 'madhya-pradesh', hint: 'Prehistoric caves', funFact: 'Bhimbetka rock shelters contain paintings dating back 30,000 years — among the oldest known human art on Earth.' },
  // Chhattisgarh
  { id: 'hm-cg1', name: 'Bastar Dhokra Craft', emoji: '🔔', category: 'craft', correctStateId: 'chhattisgarh', hint: 'Rice Bowl of India', funFact: 'Dhokra is a 4,500-year-old lost-wax bell metal casting technique — the famous "Dancing Girl" of Mohenjo-daro used this method.' },
  { id: 'hm-cg2', name: 'Chitrakote Falls', emoji: '💧', category: 'landmark', correctStateId: 'chhattisgarh', hint: 'Tribal Bastar', funFact: 'Chitrakote Falls on the Indravati River is India\'s widest waterfall, nicknamed the "Niagara of India".' },
  // Karnataka
  { id: 'hm-ka1', name: 'Hampi Ruins', emoji: '🏛️', category: 'monument', correctStateId: 'karnataka', hint: 'Vijayanagara Empire', funFact: 'Hampi was the capital of the Vijayanagara Empire — once the world\'s second largest city after Beijing.' },
  { id: 'hm-ka2', name: 'Mysore Silk Saree', emoji: '👘', category: 'craft', correctStateId: 'karnataka', hint: 'City of palaces', funFact: 'Mysore Silk is a GI-tagged pure mulberry silk product woven with real gold zari in the city\'s government-owned factory.' },
  // Andhra Pradesh
  { id: 'hm-ap1', name: 'Tirupati Balaji Temple', emoji: '🕉️', category: 'monument', correctStateId: 'andhra-pradesh', hint: 'Sacred hills', funFact: 'Tirumala Venkateswara Temple is the world\'s most visited religious place — receiving 50,000-100,000 pilgrims daily.' },
  { id: 'hm-ap2', name: 'Kalamkari Fabric', emoji: '🎨', category: 'craft', correctStateId: 'andhra-pradesh', hint: 'Kuchipudi homeland', funFact: 'Kalamkari is hand-painted cotton using a bamboo pen (kalam) with natural vegetable dyes — a 3,000-year-old art.' },
  // Telangana
  { id: 'hm-tg1', name: 'Charminar', emoji: '🕌', category: 'monument', correctStateId: 'telangana', hint: 'City of Pearls', funFact: 'Charminar was built in 1591 by Sultan Muhammad Quli Qutb Shah to celebrate the end of a deadly plague.' },
  { id: 'hm-tg2', name: 'Hyderabadi Biryani', emoji: '🍚', category: 'food', correctStateId: 'telangana', hint: 'Golconda diamonds', funFact: 'Hyderabadi Dum Biryani is a GI-tagged delicacy — rice and meat slow-cooked in a sealed pot (dum) since the Nizam era.' },
  // Tamil Nadu
  { id: 'hm-tn1', name: 'Bharatanatyam Dance', emoji: '💃', category: 'dance', correctStateId: 'tamil-nadu', hint: 'Land of temples', funFact: 'Bharatanatyam is one of the oldest classical dance forms, originating over 2,000 years ago in Tamil temple traditions.' },
  { id: 'hm-tn2', name: 'Kanchipuram Silk Saree', emoji: '👘', category: 'craft', correctStateId: 'tamil-nadu', hint: 'Dravidian gopurams', funFact: 'Kanchipuram silk sarees are woven with pure mulberry silk and 24-karat gold zari — a single saree takes 15-20 days.' },
  // Kerala
  { id: 'hm-kl1', name: 'Kathakali Dance', emoji: '🎭', category: 'dance', correctStateId: 'kerala', hint: 'God\'s Own Country', funFact: 'Kathakali performers spend 3-4 hours on elaborate green facial makeup (paccha) using natural pigments and rice paste.' },
  { id: 'hm-kl2', name: 'Onam Sadhya Feast', emoji: '🍽️', category: 'food', correctStateId: 'kerala', hint: 'Backwater paradise', funFact: 'Onam Sadhya is a grand vegetarian feast of 26 dishes served on a fresh banana leaf — celebrating King Mahabali\'s return.' },
  // Assam
  { id: 'hm-as1', name: 'Kaziranga Rhino', emoji: '🦏', category: 'wildlife', correctStateId: 'assam', hint: 'Red River & Blue Hills', funFact: 'Kaziranga National Park hosts two-thirds of the world\'s one-horned rhinoceros — a UNESCO World Heritage Site.' },
  { id: 'hm-as2', name: 'Muga Golden Silk', emoji: '✨', category: 'craft', correctStateId: 'assam', hint: 'Land of Bihu', funFact: 'Muga silk is the golden-hued silk exclusive to Assam — it becomes more lustrous with each wash and is naturally UV resistant.' },
  // Arunachal Pradesh
  { id: 'hm-ar1', name: 'Tawang Monastery', emoji: '🏔️', category: 'monument', correctStateId: 'arunachal-pradesh', hint: 'Dawn-lit mountains', funFact: 'Tawang Monastery is the 2nd largest Buddhist monastery in the world after Potala Palace in Lhasa, Tibet.' },
  { id: 'hm-ar2', name: 'Ziro Valley', emoji: '🌿', category: 'landmark', correctStateId: 'arunachal-pradesh', hint: 'First sunrise in India', funFact: 'Ziro Valley is a UNESCO World Heritage tentative site, home to the Apatani tribe\'s unique sustainable rice-fish farming.' },
  // Meghalaya
  { id: 'hm-mg1', name: 'Living Root Bridges', emoji: '🌳', category: 'landmark', correctStateId: 'meghalaya', hint: 'Abode of the Clouds', funFact: 'Living root bridges are grown over 15-30 years by training the roots of Ficus elastica trees — some are 500 years old.' },
  { id: 'hm-mg2', name: 'Wangala 100-Drum Festival', emoji: '🥁', category: 'festival', correctStateId: 'meghalaya', hint: 'Rainiest place on Earth', funFact: 'The Wangala festival celebrates the harvest season with 100 drums played simultaneously by the Garo tribe.' },
  // Nagaland
  { id: 'hm-nl1', name: 'Hornbill Festival', emoji: '🦅', category: 'festival', correctStateId: 'nagaland', hint: 'Land of brave warriors', funFact: 'The Hornbill Festival showcases 16 Naga tribes\' cultures — warrior dances, indigenous food, and clan shawls every December.' },
  { id: 'hm-nl2', name: 'Naga Clan Shawl', emoji: '🧣', category: 'craft', correctStateId: 'nagaland', hint: 'Festival capital of India', funFact: 'Each Naga tribe has a distinct shawl pattern — the Tsungkotepsu shawl\'s design indicates the wearer\'s social status.' },
  // Manipur
  { id: 'hm-mn1', name: 'Loktak Floating Lake', emoji: '🏞️', category: 'landmark', correctStateId: 'manipur', hint: 'Jewel of India', funFact: 'Loktak Lake has Keibul Lamjao — the world\'s only floating national park, home to the endangered Sangai deer.' },
  { id: 'hm-mn2', name: 'Manipuri Raas Leela', emoji: '💃', category: 'dance', correctStateId: 'manipur', hint: 'Land of polo', funFact: 'Manipuri classical dance is known for its graceful, slow circular movements depicting Krishna\'s Raas Leela.' },
  // Mizoram
  { id: 'hm-mz1', name: 'Cheraw Bamboo Dance', emoji: '🎋', category: 'dance', correctStateId: 'mizoram', hint: 'Land of Highlanders', funFact: 'In Cheraw, dancers step between bamboo poles struck rhythmically on the ground — one misstep and you\'re out!' },
  { id: 'hm-mz2', name: 'Chapchar Kut Festival', emoji: '🎉', category: 'festival', correctStateId: 'mizoram', hint: 'Blue Mountain peak', funFact: 'Chapchar Kut is Mizoram\'s biggest spring festival marking the clearing of forests for jhum cultivation.' },
  // Tripura
  { id: 'hm-tr1', name: 'Unakoti Rock Carvings', emoji: '🗿', category: 'monument', correctStateId: 'tripura', hint: 'Land of Fourteen Gods', funFact: 'Unakoti has colossal 8th-century rock carvings of Shiva heads — "Unakoti" means "one less than a crore" (9,999,999).' },
  { id: 'hm-tr2', name: 'Neermahal Water Palace', emoji: '🏰', category: 'monument', correctStateId: 'tripura', hint: 'Royal palaces', funFact: 'Neermahal is India\'s only water palace, built in 1930 by King Bir Bikram on Rudrasagar Lake, blending Hindu and Mughal styles.' },
  // Sikkim
  { id: 'hm-sk1', name: 'Kanchenjunga Peak', emoji: '🏔️', category: 'landmark', correctStateId: 'sikkim', hint: '100% organic state', funFact: 'Kanchenjunga is the world\'s 3rd highest peak at 8,586m — worshipped as a guardian deity by the Sikkimese people.' },
  { id: 'hm-sk2', name: 'Momos', emoji: '🥟', category: 'food', correctStateId: 'sikkim', hint: 'Valley of sacred peaks', funFact: 'Sikkim\'s momos are steamed dumplings with spiced fillings served with fiery tomato-chili achaar — a Himalayan comfort food.' }
];

