import { LessonSection, SummativeQuestion, SectionId } from '@/types';

export const CHAPTER_METADATA = {
  classLevel: 'Class VI',
  subject: 'Social Science',
  theme: 'Theme B — Tapestry of the Past',
  chapterNumber: 5,
  title: 'India, That Is Bharat',
  subtitle: 'Explore the ideas, sources and stories behind the name of our nation.',
  estimatedTime: '25–35 minutes',
  textbook: 'Exploring Society: India and Beyond (NCERT)',
  learningObjectives: [
    'Understand why the Indian Constitution uses both "India" and "Bharat" (Article 1).',
    'Trace the origins of "Bharat" and "Bharatavarsha" from the Rigveda, Epics, Puranas, and King Kharavela’s Hathigumpha Inscription.',
    'Discover the ancient term "Jambudvipa" used in literature and Emperor Ashoka’s Rock Edicts.',
    'Follow the linguistic journey from River Sindhu to Hindu, Hindustan, Indos, and India.',
    'Examine how global travelers (Chinese pilgrims like Xuanzang, Greek historians) recorded India.',
    'Analyze the Vishnu Purana definition of India’s geographical boundaries from the Himalayas to the ocean.',
    'Appreciate the cultural unity woven through ancient trade routes (Uttarapatha, Dakshinapatha) and sacred geography.'
  ]
};

export const LESSON_SECTIONS: LessonSection[] = [
  {
    id: 'dual-name',
    number: 1,
    title: 'The Constitution & The Dual Name',
    subtitle: 'Why does our nation hold two official names?',
    sourceReference: 'NCERT Chapter 5 & The Constitution of India, Article 1(1)',
    durationMinutes: 4,
    shortExplanation: 'When India gained independence in 1947, the leaders of the Constituent Assembly faced an important question: what should our country officially be named? They chose to celebrate both our ancient heritage and our modern global presence.',
    keyWords: ['Article 1', 'Constituent Assembly', 'Union of States', 'Civilization', 'Heritage'],
    comicFeature: {
      imageSrc: '/images/ambedkar_assembly.jpg',
      imageAlt: 'Dr. B.R. Ambedkar presenting the Constitution Draft to the Constituent Assembly',
      title: '1949: The Great Constitutional Synthesis',
      subtitle: 'How Dr. B. R. Ambedkar and the Constituent Assembly united India and Bharat in Article 1',
      eraBadge: '1949 Constituent Assembly',
      dialogues: [
        {
          speaker: 'Dr. B. R. Ambedkar',
          role: 'Chairman, Drafting Committee',
          quote: 'I do hope our people will realise their dreams of justice, liberty, equality, and fraternity. In Article 1, we declare "India, that is Bharat" — keeping our ancient civilizational heart beating within our modern sovereign republic.',
          context: 'During the historic debates of November 1949 in the Central Hall of Parliament, New Delhi.',
          takeaway: 'Article 1 is not just legal text; it bridges thousands of years of civilizational memory (Bharat) with modern democratic equality (India).'
        },
        {
          speaker: 'Constituent Assembly',
          role: 'Founding Fathers & Mothers of India',
          quote: 'We, the People of India, adopt this Constitution to secure to all its citizens justice, liberty, equality and fraternity across every corner of Bharat.',
          context: 'Unanimously adopted on 26 November 1949.',
          takeaway: 'Both names stand together to represent unity in diversity.'
        }
      ]
    },
    conceptCards: [
      {
        id: 'c1',
        term: 'Article 1(1)',
        title: 'The Constitutional Bridge',
        definition: '"India, that is Bharat, shall be a Union of States."',
        explanation: 'Adopted in 1949, this opening line harmonizes modern democratic statehood ("India") with thousands of years of civilizational identity ("Bharat").',
        chapterReference: 'Exploring Society: Chapter 5 Opening Section',
        rememberNote: 'Neither name replaces the other; both stand together as the constitutional identity of our country.'
      },
      {
        id: 'c2',
        term: 'Bharat',
        title: 'Civilizational Heritage',
        definition: 'The indigenous name rooted in ancient literature, epics, and inscriptions.',
        explanation: 'Connects the modern republic to thousands of years of historical continuity, literature, and shared cultural memory.',
        chapterReference: 'NCERT Section: The Name Bharat',
        rememberNote: 'Bharat evokes unity rooted in cultural and historical roots.'
      },
      {
        id: 'c3',
        term: 'India',
        title: 'Global & International Identity',
        definition: 'The internationally recognized name with roots in the ancient River Sindhu.',
        explanation: 'Known to global traders, cartographers, and nations across thousands of years through Greek, Roman, and European accounts.',
        chapterReference: 'NCERT Section: Names from the Sindhu',
        rememberNote: 'India is not merely a modern British name; its roots go back to ancient Greek and Persian interactions.'
      }
    ],
    misconceptions: [
      {
        id: 'm1',
        statement: 'The name "India" was invented by the British East India Company in modern times.',
        isTrue: false,
        explanation: 'The name "India" comes from the ancient Greek word "Indos" (derived from the Persian "Hindu", from Sanskrit "Sindhu") used by historians like Megasthenes over 2,300 years ago!',
        chapterReference: 'NCERT Chapter 5: How Foreigners Named India'
      },
      {
        id: 'm2',
        statement: 'Article 1 of the Constitution gives equal recognition to both "India" and "Bharat".',
        isTrue: true,
        explanation: 'Yes, Article 1 states: "India, that is Bharat, shall be a Union of States," incorporating both names into constitutional law.',
        chapterReference: 'NCERT Chapter 5: The Opening Declaration'
      }
    ],
    thinkConnect: [
      {
        id: 'tc1',
        ideaA: 'Ancient Cultural Roots (Bharat)',
        ideaB: 'Modern Global Recognition (India)',
        question: 'Why did the makers of our Constitution decide to use BOTH names together instead of picking just one?',
        options: [
          {
            id: 'opt1',
            text: 'To bridge thousands of years of ancient cultural heritage with our modern global standing among nations.',
            isBest: true,
            feedback: 'Spot on! It honors our unbroken civilizational history while affirming our place in the modern international community.'
          },
          {
            id: 'opt2',
            text: 'Because they could not agree on any single language.',
            isBest: false,
            feedback: 'The debate was much deeper: it was about acknowledging both ancient civilizational memory and modern international diplomacy.'
          }
        ],
        modelExplanation: 'The framers of our Constitution recognized that India is both an ancient civilization with deep cultural continuity (Bharat) and a forward-looking democratic nation in the global world (India).'
      }
    ],
    formativeCheck: {
      id: 'fc1',
      question: 'Which constitutional article declares "India, that is Bharat, shall be a Union of States"?',
      options: ['Article 1', 'Article 14', 'Article 21', 'Article 370'],
      correctIndex: 0,
      explanation: 'Article 1(1) of the Indian Constitution officially establishes both "India" and "Bharat" as the dual names of our nation.',
      takeaway: 'Our nation holds a dual name in its Constitution to reflect ancient civilizational depth and modern global identity.'
    },
    keyTakeaway: 'Our Constitution begins with "India, that is Bharat" to unite thousands of years of cultural memory with our modern democratic republic.'
  },
  {
    id: 'bharat-origin',
    number: 2,
    title: 'The Name "Bharat" & Historical Evidence',
    subtitle: 'Where does the name Bharat come from in ancient texts and stones?',
    sourceReference: 'Rigveda, Mahabharata, Vishnu Purana, and Hathigumpha Inscription',
    durationMinutes: 5,
    shortExplanation: 'The name "Bharat" is rooted in our oldest texts and ancient stone inscriptions. It originally referred to a prominent community and king, and gradually expanded to mean the entire subcontinent.',
    keyWords: ['Bharatas', 'Rigveda', 'Bharatavarsha', 'Kharavela', 'Hathigumpha', 'Prakrit'],
    conceptCards: [
      {
        id: 'bo1',
        term: 'The Bharatas of the Rigveda',
        title: 'Ancient Vedic Community',
        definition: 'A prominent group mentioned in the Rigveda, living in the Sapta Sindhava (seven rivers) region.',
        explanation: 'In the Rigveda (the oldest known Indian text, composed over 3,500 years ago), the Bharatas were a prominent community whose deeds and leaders were celebrated in hymns.',
        chapterReference: 'NCERT Section: The Rigvedic Roots',
        rememberNote: 'The name started with a distinguished Vedic clan in northwestern India.'
      },
      {
        id: 'bo2',
        term: 'King Bharata & Epics',
        title: 'Legendary Ruler & Lineage',
        definition: 'In the Mahabharata and Puranas, the country is named after the noble King Bharata.',
        explanation: 'According to tradition, King Bharata, son of Dushyanta and Shakuntala, was a righteous and universal ruler (Chakravartin) after whom the land was called Bharatavarsha.',
        chapterReference: 'NCERT Section: Bharatavarsha in the Epics',
        rememberNote: 'Bharatavarsha translates to "the realm or country of the Bharatas".'
      },
      {
        id: 'bo3',
        term: 'Hathigumpha Inscription',
        title: 'Stone Inscription Proof (1st Century BCE)',
        definition: 'King Kharavela of Kalinga carved the Prakrit term "Bharadhavasa" on Udayagiri hills.',
        explanation: 'In Odisha, the famous Hathigumpha cave inscription of King Kharavela (1st century BCE) uses the Prakrit word "Bharadhavasa" (Bharatavarsha) to describe the territory of northern/central India.',
        chapterReference: 'NCERT Source: Hathigumpha Inscription of Kharavela',
        rememberNote: 'This provides direct physical epigraphical proof of the name Bharat on stone more than 2,100 years ago!'
      }
    ],
    sources: [
      {
        id: 'src-hathigumpha',
        title: 'The Hathigumpha Inscription of King Kharavela',
        era: '1st Century BCE',
        location: 'Udayagiri Hills, near Bhubaneswar, Odisha',
        languageScript: 'Prakrit language in Brahmi script',
        sourceType: 'inscription',
        originalSnippet: '... भरधवस (Bharadhavasa) ...',
        transliteration: 'Bharadhavasa / Bharata-vasa',
        translation: '"...marched with his army into the realm of Bharadhavasa (Bharatavarsha)..."',
        whatWeSee: 'Deeply etched Brahmi letters on the rock wall of the Hathigumpha (Elephant Cave).',
        whatItTellsUs: 'Kings living thousands of kilometers apart recognized a broad territorial region called Bharatavarsha / Bharadhavasa.',
        whatWeLearn: 'The term Bharat was not just a mythological concept, but a recognized geographical and political name used in official royal records.',
        importantTerm: 'Bharadhavasa (Prakrit for Bharatavarsha)',
        thinkPrompt: 'Why is an inscription carved on stone more reliable to historians than oral legends?'
      }
    ],
    buildTheIdea: {
      instruction: 'Arrange these four historical stages to show how the name "Bharat" evolved from an ancient clan to an entire subcontinent:',
      pieces: [
        { id: 'p1', role: 'Origin', text: '1. A prominent Vedic community called the "Bharatas" is celebrated in the hymns of the Rigveda.' },
        { id: 'p2', role: 'Tradition', text: '2. Epics like the Mahabharata record the noble King Bharata, giving rise to the name "Bharatavarsha".' },
        { id: 'p3', role: 'Epigraphy', text: '3. King Kharavela in Odisha carves "Bharadhavasa" on stone in the Hathigumpha cave (1st c. BCE).' },
        { id: 'p4', role: 'Constitution', text: '4. The Constituent Assembly formally adopts "Bharat" in Article 1 of modern India’s Constitution.' }
      ],
      correctOrder: ['p1', 'p2', 'p3', 'p4'],
      completeNarrative: 'The name Bharat started with a Vedic clan (Rigveda), expanded through epics to mean the entire realm of King Bharata (Bharatavarsha), was verified on stone inscriptions in Odisha (Hathigumpha), and became enshrined in our Constitution!'
    },
    formativeCheck: {
      id: 'fc2',
      question: 'Which ancient inscription in Odisha mentions the Prakrit word "Bharadhavasa" (Bharatavarsha)?',
      options: ['Hathigumpha Inscription of King Kharavela', 'Ashoka’s Pillar Edict at Sarnath', 'Iron Pillar of Delhi', 'Aihole Inscription of Pulakeshin II'],
      correctIndex: 0,
      explanation: 'The Hathigumpha inscription carved on Udayagiri hills by King Kharavela of Kalinga (1st century BCE) specifically records the term "Bharadhavasa".',
      takeaway: 'The name Bharat has solid archaeological and epigraphical proof dating back over 2,100 years.'
    },
    keyTakeaway: 'The name Bharat evolved from a Rigvedic clan to the epic realm of King Bharata, was inscribed on stone as "Bharadhavasa" by King Kharavela, and is celebrated today in our Constitution.'
  },
  {
    id: 'jambudvipa',
    number: 3,
    title: 'Jambudvipa — The Land of the Jamun Tree',
    subtitle: 'How ancient Indians named their continent after a native sacred tree.',
    sourceReference: 'Ancient Vedic & Buddhist texts, and Ashoka’s Minor Rock Edicts',
    durationMinutes: 4,
    shortExplanation: 'Before modern continental maps existed, ancient Indian thinkers looked at their lush environment and named their land "Jambudvipa" — the island or continent of the Jamun (Indian black plum) tree.',
    keyWords: ['Jambudvipa', 'Jambu Tree', 'Dvipa', 'Emperor Ashoka', 'Minor Rock Edicts', 'Syzygium cumini'],
    conceptCards: [
      {
        id: 'j1',
        term: 'Jambu + Dvipa',
        title: 'Botanical Name of a Land',
        definition: '"Jambu" means the Indian black plum (Jamun), and "Dvipa" means an island or landmass.',
        explanation: 'In ancient Indian cosmology and geography, the known world containing India was envisioned as Jambudvipa because the Jamun tree (Syzygium cumini) was native, widespread, and culturally cherished.',
        chapterReference: 'NCERT Section: The Concept of Jambudvipa',
        rememberNote: 'Ancient cultures often named lands after their distinctive flora, fauna, or rivers.'
      },
      {
        id: 'j2',
        term: 'Ashoka’s Inscriptions',
        title: 'Used by Emperor Ashoka (3rd Century BCE)',
        definition: 'Emperor Ashoka used "Jambudvipa" to address the people of his vast empire.',
        explanation: 'In his Minor Rock Edicts (such as those found at Brahmagiri and Maski), Emperor Ashoka proudly referred to his entire domain and its people as inhabiting Jambudvipa.',
        chapterReference: 'NCERT Source: Ashoka’s Rock Edicts',
        rememberNote: 'Jambudvipa was the standard geographical designation for the Indian landmass across Mauryan times.'
      },
      {
        id: 'j3',
        term: 'Buddhist & Jain Literature',
        title: 'Pan-Asian Recognition',
        definition: 'Texts that traveled to Sri Lanka, Tibet, China, and Southeast Asia referred to India as Jambudvipa.',
        explanation: 'As Buddhist and Jain teachings spread across Asia, foreign scholars learned of India as "Jambudvipa", the sacred land where the Buddha and Tirthankaras walked.',
        chapterReference: 'NCERT Section: Global spread of the term',
        rememberNote: 'The name Jambudvipa was recognized across ancient Asia.'
      }
    ],
    sources: [
      {
        id: 'src-ashoka',
        title: 'Ashoka’s Minor Rock Edict (Brahmagiri & Maski)',
        era: 'c. 250 BCE (3rd Century BCE)',
        location: 'Karnataka / Andhra Pradesh / Madhya Pradesh',
        languageScript: 'Prakrit in Brahmi script',
        sourceType: 'inscription',
        originalSnippet: '... जांबुदीपसि (Jambudīpasi) ...',
        transliteration: 'Imāya kālāya Jambudīpasi...',
        translation: '"During this time, the gods who were unmingled with men in Jambudvipa have now been made mingled with them through righteousness (Dhamma)..."',
        whatWeSee: 'Rock inscriptions engraved by royal scribes across India using Prakrit in Brahmi.',
        whatItTellsUs: 'Ashoka addressed his people across the entire subcontinent as the inhabitants of "Jambudvipa".',
        whatWeLearn: 'Jambudvipa was a commonly understood geographical name throughout the 3rd century BCE.',
        importantTerm: 'Jambudvipa (Island of the Jamun Tree)',
        thinkPrompt: 'Why do you think ancient people named their realm after a tree rather than a political boundary?'
      }
    ],
    sortActivity: {
      instruction: 'Classify each historical detail under its correct ancient name (Bharatavarsha vs Jambudvipa):',
      categories: [
        { id: 'cat-bharat', title: 'Bharat / Bharatavarsha', description: 'Names linked to the Rigvedic clan, King Bharata, and Hathigumpha' },
        { id: 'cat-jambu', title: 'Jambudvipa', description: 'Names linked to the native Jamun tree and Emperor Ashoka’s Edicts' }
      ],
      items: [
        { id: 'si1', text: 'Linked to the Rigvedic community living by the seven rivers', categoryId: 'cat-bharat', explanation: 'The Rigveda mentions the Bharatas clan.' },
        { id: 'si2', text: 'Means "The Continent or Island of the Indian Black Plum Tree"', categoryId: 'cat-jambu', explanation: 'Jambu means Jamun, dvipa means island/land.' },
        { id: 'si3', text: 'Used by Emperor Ashoka in his 3rd century BCE Minor Rock Edicts', categoryId: 'cat-jambu', explanation: 'Ashoka used Jambudvipa in his edicts across India.' },
        { id: 'si4', text: 'Mentioned as "Bharadhavasa" in the Hathigumpha inscription of King Kharavela', categoryId: 'cat-bharat', explanation: 'King Kharavela in Odisha used the Prakrit word Bharadhavasa.' },
        { id: 'si5', text: 'Associated with the noble King Bharata in the Mahabharata & Puranas', categoryId: 'cat-bharat', explanation: 'Legendary King Bharata gave his name to Bharatavarsha.' }
      ]
    },
    formativeCheck: {
      id: 'fc3',
      question: 'What does the ancient name "Jambudvipa" literally mean?',
      options: ['The Island of the Jamun Tree', 'The Land of the Seven Rivers', 'The Snowy Mountain Realm', 'The Ocean Continent'],
      correctIndex: 0,
      explanation: 'Jambudvipa is formed from "Jambu" (the Indian Jamun / black plum tree) and "Dvipa" (island or landmass).',
      takeaway: 'Jambudvipa was the ancient ecological and geographical name used by Emperor Ashoka and Buddhist/Jain texts.'
    },
    keyTakeaway: 'Ancient Indians celebrated their natural environment by calling the subcontinent "Jambudvipa" (the land of the Jamun tree), a name inscribed on rocks across India by Emperor Ashoka.'
  },
  {
    id: 'sindhu-to-india',
    number: 4,
    title: 'From Sindhu to Hindu, Hindustan, Indos & India',
    subtitle: 'The fascinating linguistic transformation that traveled across continents.',
    sourceReference: 'Achaemenid Inscriptions (Darius I), Megasthenes’ Indika, and Persian Records',
    durationMinutes: 5,
    shortExplanation: 'The colossal River Sindhu (Indus) in the northwest was the first natural landmark encountered by western travelers. As its name traveled across different languages, fascinating phonetic shifts gave rise to "Hindu", "Hindustan", "Indos", and "India".',
    keyWords: ['Sindhu', 'River Indus', 'Old Persian', 'King Darius I', 'Megasthenes', 'Hindustan'],
    etymologySteps: [
      {
        id: 'et1',
        stage: 1,
        name: 'Sindhu (सिन्धु)',
        languageOrPeople: 'Sanskrit / Vedic Inhabitants',
        approxDate: '1500 BCE onwards',
        phoneticRule: 'Root word meaning "great river" or "body of water"',
        meaningAndContext: 'Refers to the mighty Indus River and the lush region of the Sapta Sindhava (Land of Seven Rivers).',
        sourceOrDoc: 'Rigvedic River Hymns'
      },
      {
        id: 'et2',
        stage: 2,
        name: 'Hindu / Hiⁿduš (𐏃𐎡𐎯𐎢𐏁)',
        languageOrPeople: 'Ancient Persians (Achaemenid Empire)',
        approxDate: 'c. 515 BCE (King Darius I)',
        phoneticRule: 'Sanskrit "S" systematically shifted to Persian "H" (Sindhu → Hindu)',
        meaningAndContext: 'Persians referred to the land and people living beyond the Sindhu River as "Hindu" / "Hindush". This was a geographical term, not a religious label.',
        sourceOrDoc: 'Naqsh-e-Rustam & Behistun Inscriptions of Darius I'
      },
      {
        id: 'et3',
        stage: 3,
        name: 'Indos & Indikē / India (Ἰνδός / Ἰνδία)',
        languageOrPeople: 'Ancient Greeks (Megasthenes, Herodotus)',
        approxDate: 'c. 300 BCE',
        phoneticRule: 'Greeks lacked the initial "H" aspiration before vowels, dropping it: Hindu → Indos → India',
        meaningAndContext: 'Megasthenes, the Greek ambassador to the court of Chandragupta Maurya, wrote his famous book "Indika" describing the land and people.',
        sourceOrDoc: 'Megasthenes’ Indika & Greek Geographies'
      },
      {
        id: 'et4',
        stage: 4,
        name: 'Hindustan (ہندوستان)',
        languageOrPeople: 'Medieval Persian & Arabic Writers',
        approxDate: '10th Century CE onwards',
        phoneticRule: 'Persian word "Hindu" + suffix "-stān" (meaning "land of" or "place of")',
        meaningAndContext: 'Literally means "The Land of the Hindus (the people beyond River Sindhu)". Extensively used in medieval administrative records like the Baburnama and Ain-i-Akbari.',
        sourceOrDoc: 'Medieval Persian chronicles and Mughal records'
      }
    ],
    misconceptions: [
      {
        id: 'm3',
        statement: 'The term "Hindu" was originally a religious label created in ancient times.',
        isTrue: false,
        explanation: 'In ancient times, "Hindu" was strictly a GEOGRAPHICAL name used by Persians to describe people living beyond the Sindhu River. It only later evolved into a cultural and religious term.',
        chapterReference: 'NCERT Chapter 5: The Origin of Hindu and Hindustan'
      },
      {
        id: 'm4',
        statement: 'The words India, Hindu, and Hindustan all originate from the exact same river name: Sindhu.',
        isTrue: true,
        explanation: 'All three names trace back to the single Sanskrit word "Sindhu" through different linguistic adaptations (Persian sound-shift S→H, Greek dropping H, and Persian suffix -stan).',
        chapterReference: 'NCERT Chapter 5: Linguistic Evolution'
      }
    ],
    formativeCheck: {
      id: 'fc4',
      question: 'Why did the Sanskrit word "Sindhu" turn into "Hindu" in ancient Persian inscriptions of King Darius I?',
      options: [
        'Because Old Persian systematically changed the initial Sanskrit "S" sound into an "H" sound.',
        'Because Darius I conquered a new river with a different name.',
        'Because ancient Greeks forced the Persians to spell it differently.',
        'Because the river changed its course.'
      ],
      correctIndex: 0,
      explanation: 'In the Iranian/Old Persian language, initial "S" regularily turned into "H" (e.g. Sanskrit Soma became Haoma, Sapta became Hapta, and Sindhu became Hindu).',
      takeaway: 'The names Hindu, Hindustan, Indos, and India all stem from the River Sindhu through regular sound shifts in world languages.'
    },
    keyTakeaway: 'The single river "Sindhu" gave rise to "Hindu" (Persian), "Hindustan" (Persian suffix -stan), and "India" (Greek Indos) as travelers adapted the name to their own phonetics.'
  },
  {
    id: 'foreign-travelers',
    number: 5,
    title: 'Through the Eyes of Global Travelers',
    subtitle: 'How Chinese pilgrims, Greek ambassadors and Arab scholars recorded India.',
    sourceReference: 'Accounts of Xuanzang (Hiuen Tsang), Faxian, Yijing, and Megasthenes',
    durationMinutes: 5,
    shortExplanation: 'For millennia, travelers, scholars, and pilgrims journeyed thousands of perilous miles over snowy mountains and treacherous oceans to study in India. Their travelogues preserve vivid descriptions of our civilization.',
    keyWords: ['Xuanzang', 'Faxian', 'Tianzhu', 'Yindu', 'Indika', 'Megasthenes'],
    conceptCards: [
      {
        id: 'ft1',
        term: 'Xuanzang (Hiuen Tsang)',
        title: '7th Century Chinese Pilgrim & Scholar',
        definition: 'Journeyed across India for 16 years, studied at Nalanda University, and carried sacred manuscripts to China.',
        explanation: 'Xuanzang noted that India was called "Yindu" or "In-tu". He poetically explained that just as the Moon (Indu in Sanskrit) illuminates the darkness of night, India’s spiritual teachings and wisdom illuminate humanity.',
        chapterReference: 'NCERT Source: Xuanzang’s Records of the Western Regions',
        rememberNote: 'Xuanzang translated hundreds of Sanskrit texts into Chinese upon his return.'
      },
      {
        id: 'ft2',
        term: 'Tianzhu (天竺)',
        title: 'Chinese Name for "Heavenly India"',
        definition: 'Ancient Chinese characters meaning "Heavenly / Celestial India".',
        explanation: 'Chinese records also referred to India as Tianzhu or Shen-tu (phonetic rendering of Sindhu), reflecting the deep reverence Chinese scholars held for the land of Buddhist teachings.',
        chapterReference: 'NCERT Section: Chinese Names of India',
        rememberNote: 'Tianzhu signaled India’s status as a spiritual center across East Asia.'
      },
      {
        id: 'ft3',
        term: 'Megasthenes & "Indika"',
        title: 'Greek Ambassador to Pataliputra (c. 300 BCE)',
        definition: 'Greek envoy sent by Seleucus Nicator to the court of Chandragupta Maurya.',
        explanation: 'Megasthenes wrote "Indika", documenting the grandeur of the Mauryan capital Pataliputra, the fertility of India’s soil, the mighty rivers, and the peaceful daily life of Indian society.',
        chapterReference: 'NCERT Section: Greek Accounts of India',
        rememberNote: 'Indika was the primary source for Greek and Roman knowledge of India for centuries.'
      }
    ],
    sources: [
      {
        id: 'src-xuanzang',
        title: 'Xuanzang’s "Great Tang Records on the Western Regions" (Da Tang Xiyu Ji)',
        era: '7th Century CE (c. 646 CE)',
        location: 'Traveled across India from Gandhara, Nalanda, to Kanchipuram',
        languageScript: 'Classical Chinese',
        sourceType: 'travelogue',
        originalSnippet: '印度 (Yindu) — "Though India has diverse kingdoms, the name In-tu (Moon) is fitting..."',
        transliteration: 'Yindu / In-tu',
        translation: '"The name In-tu means the Moon. Just as the moon sheds its gentle, illuminating light across the nocturnal sky, so does India illuminate all living beings through wisdom and moral law."',
        whatWeSee: 'A detailed 12-volume travelogue recording geography, customs, royal courts, and Buddhist monasteries.',
        whatItTellsUs: 'India was viewed by foreign scholars as a great beacon of philosophical, spiritual, and educational excellence.',
        whatWeLearn: 'Foreign travelogues provide valuable third-party evidence confirming the unity and high cultural achievements of ancient India.',
        importantTerm: 'Yindu (Chinese name for India comparing it to the Moon)',
        thinkPrompt: 'Why did scholars like Xuanzang travel on foot for years just to collect and translate manuscripts from India?'
      }
    ],
    thinkConnect: [
      {
        id: 'tc2',
        ideaA: 'Ancient Indian universities like Nalanda and Taxila',
        ideaB: 'Travelogues of Chinese pilgrims like Xuanzang and Faxian',
        question: 'What do the journeys of Xuanzang and Faxian tell us about ancient India’s relationship with the rest of the world?',
        options: [
          {
            id: 'opt3',
            text: 'India was a major global center of higher learning and philosophy that attracted scholars from across Asia.',
            isBest: true,
            feedback: 'Excellent! India was not isolated; it was an intellectual magnet for the ancient world.'
          },
          {
            id: 'opt4',
            text: 'India was an isolated region with no contact with neighboring countries.',
            isBest: false,
            feedback: 'The evidence shows the opposite: thousands of scholars and merchants regularly traveled between India, China, Greece, Persia, and Southeast Asia.'
          }
        ],
        modelExplanation: 'Ancient India had world-renowned centers of learning (Nalanda, Taxila) that welcomed scholars from across Asia, making India a global hub of knowledge exchange.'
      }
    ],
    formativeCheck: {
      id: 'fc5',
      question: 'Which poetic metaphor did the Chinese pilgrim Xuanzang use to explain the name "In-tu" (Yindu) for India?',
      options: [
        'He compared India to the Moon (Indu), which sheds gentle light on humanity through wisdom.',
        'He compared India to a roaring lion in the jungle.',
        'He compared India to a golden mountain surrounded by oceans.',
        'He compared India to a banyan tree with deep roots.'
      ],
      correctIndex: 0,
      explanation: 'Xuanzang noted that just as the moon (Indu) shines brightly in the night sky, India illuminated the world through its profound teachings and learning.',
      takeaway: 'Foreign scholars held ancient India in high regard as a land of wisdom, spirituality, and advanced learning.'
    },
    keyTakeaway: 'Foreign scholars from Greece (Megasthenes) and China (Xuanzang, Faxian) documented India’s greatness, referring to it as "Indika", "Tianzhu", and "Yindu" (the Moon of Wisdom).'
  },
  {
    id: 'geographical-unity',
    number: 6,
    title: 'Geographical Unity — "North of the Ocean, South of the Mountains"',
    subtitle: 'How the Vishnu Purana defined India’s natural boundaries.',
    sourceReference: 'Vishnu Purana (Book 2, Chapter 3, Verse 1) & Sri Aurobindo’s Reflections',
    durationMinutes: 5,
    shortExplanation: 'Long before modern political boundaries were drawn, ancient Indian texts clearly recognized the subcontinent as a single, distinct geographical unit bounded by the mighty snowy Himalayas in the north and the expansive ocean in the south.',
    keyWords: ['Vishnu Purana', 'Himadri', 'Samudra', 'Bharati', 'Geographical Unity', 'Sri Aurobindo'],
    comicFeature: {
      imageSrc: '/images/sri_aurobindo.jpg',
      imageAlt: 'Sri Aurobindo contemplating the geographical and spiritual unity of Bharat',
      title: 'Sri Aurobindo: The Eternal Soul of Bharat',
      subtitle: 'From the high snows of the Himalayas to the deep seas, one living consciousness',
      eraBadge: 'Philosopher & Freedom Fighter',
      dialogues: [
        {
          speaker: 'Sri Aurobindo',
          role: 'Nationalist Leader & Sage of Pondicherry',
          quote: 'In every stone and stream, through countless ages, the soul of Bharat lives — a vast and eternal spiritual unity, woven in the diversity of land and heart. From the high snows to the deep seas, one geographic consciousness awakens.',
          context: 'Reflecting on the civilizational cradle of Indian unity in his writings on Indian culture.',
          takeaway: 'India’s geographic unity between the Himalayas and the oceans formed the sacred container for its enduring spiritual culture.'
        }
      ]
    },
    conceptCards: [
      {
        id: 'gu1',
        term: 'The Vishnu Purana Verse',
        title: 'Ancient Geographical Definition',
        definition: 'A famous Sanskrit shloka defining the exact frontiers of Bharatavarsha.',
        explanation: 'उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम्। वर्षं तद् भारतं नाम भारती यत्र संततिः॥ ("The country that lies north of the ocean and south of the snowy mountains is called Bhārata; there dwell the descendants of Bharata.")',
        chapterReference: 'NCERT Source Box: Vishnu Purana',
        rememberNote: 'This verse proves that ancient Indians had a clear map of the entire subcontinent in mind.'
      },
      {
        id: 'gu2',
        term: 'Natural Frontiers',
        title: 'Himalayas to the Three Seas',
        definition: 'Nature’s fortress creating a self-contained civilization.',
        explanation: 'The Himalayas (Himadri) protect and feed the great rivers in the north, while the Arabian Sea, Bay of Bengal, and Indian Ocean embrace the peninsula, fostering maritime trade.',
        chapterReference: 'NCERT Section: The Geography of Bharat',
        rememberNote: 'The mountains and seas shaped India into a distinct cultural haven.'
      },
      {
        id: 'gu3',
        term: 'Sri Aurobindo’s Insight',
        title: 'Civilizational & Spiritual Unity',
        definition: 'India’s unity is rooted in its shared geography and spiritual consciousness.',
        explanation: 'Philosopher Sri Aurobindo noted that India’s distinct geography between the Himalayas and the two seas naturally created a unified civilization that embraced diverse languages and customs.',
        chapterReference: 'NCERT Reflection Quote: Sri Aurobindo',
        rememberNote: 'Geographical unity formed the cradle for India’s cultural unity.'
      }
    ],
    sources: [
      {
        id: 'src-vishnu-purana',
        title: 'The Vishnu Purana (Book II, Chapter 3, Verse 1)',
        era: 'Ancient Puranic Literature (c. 1st millennium BCE – early 1st millennium CE)',
        location: 'Preserved in palm-leaf and birch-bark manuscripts across India',
        languageScript: 'Classical Sanskrit in Devanagari / Sharada / Grantha scripts',
        sourceType: 'text',
        originalSnippet: 'उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम्। वर्षं तद् भारतं नाम भारती यत्र संततिः॥',
        transliteration: 'Uttaraṃ yat samudrasya himādreścaiva dakṣiṇam | Varṣaṃ tad bhārataṃ nāma bhāratī yatra santatiḥ ||',
        translation: '"The country that lies north of the ocean (Samudra) and south of the snowy mountains (Himadri) is called Bhārata; there dwell the descendants of Bharata (Bharati)."',
        whatWeSee: 'A precise geographic formula: North boundary = Ocean, South boundary = Snowy Himalayas, Name = Bharata, People = Bharati.',
        whatItTellsUs: 'Ancient Indians did not view India as disconnected fragments; they saw it as one grand sacred homeland bounded by nature.',
        whatWeLearn: 'The concept of Bharat as a unified geographical entity was taught, remembered, and recited for thousands of years.',
        importantTerm: 'Bharati (The people / descendants inhabiting Bharatavarsha)',
        thinkPrompt: 'How does having natural boundaries like mountains and seas help people develop a shared sense of identity?'
      }
    ],
    misconceptions: [
      {
        id: 'm5',
        statement: 'Ancient Indians only cared about their local villages and had no concept of the wider subcontinent.',
        isTrue: false,
        explanation: 'False! The Vishnu Purana shloka and river hymns show that ancient Indians clearly conceptualized the entire land from the Himalayas to the Indian Ocean as one sacred realm.',
        chapterReference: 'NCERT Chapter 5: Conceptualizing the Land'
      }
    ],
    formativeCheck: {
      id: 'fc6',
      question: 'According to the famous verse in the Vishnu Purana, where is the country called "Bhārata" situated?',
      options: [
        'North of the ocean and south of the snowy mountains (Himalayas).',
        'East of the desert and west of the jungle.',
        'South of the ocean and north of the snowy mountains.',
        'Only between the Ganga and Yamuna rivers.'
      ],
      correctIndex: 0,
      explanation: '"Uttaraṃ yat samudrasya himādreścaiva dakṣiṇam" directly translates to "North of the ocean and south of the snowy mountains is called Bhārata."',
      takeaway: 'The Vishnu Purana defined the geographical extent of Bharat as the entire subcontinent between the Himalayas and the ocean.'
    },
    keyTakeaway: 'The Vishnu Purana gives us the timeless definition of our homeland: the vast territory situated north of the ocean and south of the snowy Himalayas, where the children of Bharata dwell.'
  },
  {
    id: 'cultural-tapestry',
    number: 7,
    title: 'Trade Routes, Pilgrimages & Cultural Weaving',
    subtitle: 'How roads, rivers and sacred journeys united our diverse land.',
    sourceReference: 'NCERT Section: Routes of Unity & River Invocations',
    durationMinutes: 5,
    shortExplanation: 'Thousands of years before railways, highways, or the internet, how did people in different corners of India stay connected? Ancient trade routes (Uttarapatha and Dakshinapatha), sacred river chants, and nationwide pilgrimage circuits woven our people into a single cultural tapestry.',
    keyWords: ['Uttarapatha', 'Dakshinapatha', 'Sacred Geography', 'River Hymn', 'Pilgrimage', 'Unity in Diversity'],
    comicFeature: {
      imageSrc: '/images/patel_bose_unity.jpg',
      imageAlt: 'Sardar Vallabhbhai Patel and Netaji Subhas Chandra Bose envisioning a unified Bharat',
      title: 'Architects of Unity: Patel & Netaji’s Vision',
      subtitle: 'Weaving geographical and cultural bonds into national resolve',
      eraBadge: 'Freedom Struggle & National Integration',
      dialogues: [
        {
          speaker: 'Sardar Vallabhbhai Patel',
          role: 'The Iron Man of India',
          quote: 'This map is the geography of our resolve! Every river, every mountain, every diverse culture must now sing the song of unbreakable unity.',
          context: 'Leading the integration of 565 princely states into the unified Republic of Bharat in 1947–1950.',
          takeaway: 'Ancient cultural roots provided the deep emotional foundation for modern political and national unity.'
        },
        {
          speaker: 'Netaji Subhas Chandra Bose',
          role: 'Supreme Commander, Azad Hind Fauj',
          quote: 'Jai Hind! The fight is won, but our greater challenge is to weave this unity into the very soul of our free nation. Unity is Bharat’s greatest power!',
          context: 'Inspiring people of all languages, religions, and regions across India to unite as one family.',
          takeaway: 'Diversity is not a barrier to unity; it is the rich fabric of Bharat’s strength.'
        }
      ]
    },
    conceptCards: [
      {
        id: 'ct1',
        term: 'Uttarapatha & Dakshinapatha',
        title: 'The Great Highways of Antiquity',
        definition: 'The two arterial trade networks connecting north, south, east, and west.',
        explanation: 'Uttarapatha (the Northern Highway) ran from Taxila in the northwest across the Gangetic plain to the Bay of Bengal port of Tamralipti. Dakshinapatha (the Southern Highway) linked the northern plains with the Deccan and southern seaports.',
        chapterReference: 'NCERT Section: Ancient Travel Routes',
        rememberNote: 'These highways facilitated trade, exchanged ideas, and moved artisans and scholars.'
      },
      {
        id: 'ct2',
        term: 'The River Invocation (Nadi Stuti)',
        title: 'Shared Sacred Waters',
        definition: 'A daily Sanskrit prayer honoring seven major rivers across the entire subcontinent.',
        explanation: 'गङ्गे च यमुने चैव गोदावरि सरस्वति। नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु॥ ("O Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu, and Kaveri, please be present in these waters.")',
        chapterReference: 'NCERT Section: Sacred Geography',
        rememberNote: 'A person bathing in a southern pond invokes northern rivers, keeping the whole subcontinent in mind.'
      },
      {
        id: 'ct3',
        term: 'Nationwide Pilgrimages',
        title: 'Connecting the Four Corners',
        definition: 'Sacred sites located in the far North (Badrinath), South (Rameshwaram), East (Puri), and West (Dwarka).',
        explanation: 'Encouraging pilgrims to travel across linguistic, regional, and climate zones, fostering deep mutual understanding and respect across communities.',
        chapterReference: 'NCERT Section: Pilgrimages & Cultural Ties',
        rememberNote: 'Pilgrimage networks united diverse kingdoms long before political centralization.'
      }
    ],
    sortActivity: {
      instruction: 'Match each feature with whether it connects to Trade Highways or Sacred Geography:',
      categories: [
        { id: 'cat-trade', title: 'Trade & Commerce Routes', description: 'Caravan highways for merchants, artisans, and messengers' },
        { id: 'cat-sacred', title: 'Sacred Geography & Culture', description: 'Prayers, river invocations, and pan-Indian pilgrimage journeys' }
      ],
      items: [
        { id: 't1', text: 'Uttarapatha connecting Taxila to Tamralipti in the east', categoryId: 'cat-trade', explanation: 'Uttarapatha was the great northern trading highway.' },
        { id: 't2', text: 'Dakshinapatha connecting northern cities to the Deccan and southern ports', categoryId: 'cat-trade', explanation: 'Dakshinapatha carried goods, spices, and textiles southwards.' },
        { id: 't3', text: 'Chanting the names of Ganga, Godavari, Narmada, and Kaveri together', categoryId: 'cat-sacred', explanation: 'The river prayer unites rivers from the north, central, and south of India.' },
        { id: 't4', text: 'Visiting the four corners: Badrinath, Rameshwaram, Puri, and Dwarka', categoryId: 'cat-sacred', explanation: 'Pilgrimage encouraged people to travel across linguistic and cultural regions.' }
      ]
    },
    formativeCheck: {
      id: 'fc7',
      question: 'Why did ancient Indians recite the names of rivers across the north, center, and south (like Ganga, Narmada, Godavari, Kaveri) in their daily prayers?',
      options: [
        'To maintain a shared civilizational memory of the entire subcontinent as one sacred homeland.',
        'Because they only had seven rivers in total.',
        'To memorize geographical maps for examinations.',
        'Because trading was forbidden by law.'
      ],
      correctIndex: 0,
      explanation: 'Invoking rivers from the Himalayas to Tamil Nadu created a mental map of unity, helping every citizen feel connected to the whole nation.',
      takeaway: 'Through highways, shared river invocations, and pilgrimages, India wove unity in diversity across thousands of miles.'
    },
    keyTakeaway: 'Ancient India was knit together by arterial trade routes (Uttarapatha & Dakshinapatha) and sacred geography (river hymns and pilgrimages) that connected all regions into one cultural tapestry.'
  }
];

export const KEY_TERMS_GLOSSARY = [
  {
    id: 'term-sapta-sindhava',
    term: 'Sapta Sindhava',
    iast: 'Sapta Sindhava',
    devanagari: 'सप्त सिन्धवः',
    shortDefinition: 'The land of the seven rivers mentioned in the Rigveda.',
    chapterContext: 'The earliest geographic name in Indian literature, referring to the northwestern region where the Indus (Sindhu) and its tributaries flowed.',
    textbookExample: 'The Vedic poets praised the bountiful waters of the Sapta Sindhava.',
    usagePrompt: 'Write a sentence explaining what Sapta Sindhava meant to the early Vedic poets:',
    keywordsExpected: ['seven', 'rivers', 'rigveda', 'indus', 'sindhu', 'vedic', 'region']
  },
  {
    id: 'term-bharatavarsha',
    term: 'Bharatavarsha',
    iast: 'Bhāratavarṣa',
    devanagari: 'भारतवर्ष',
    shortDefinition: 'The realm or continent of Bharata.',
    chapterContext: 'Used in the Mahabharata, Puranas, and the Hathigumpha inscription to denote the subcontinent between the Himalayas and the ocean.',
    textbookExample: 'The Vishnu Purana describes Bharatavarsha as situated north of the ocean and south of the Himalayas.',
    usagePrompt: 'Use "Bharatavarsha" in a sentence describing ancient Indian geography:',
    keywordsExpected: ['realm', 'continent', 'bharata', 'himalayas', 'ocean', 'country', 'ancient']
  },
  {
    id: 'term-jambudvipa',
    term: 'Jambudvipa',
    iast: 'Jambudvīpa',
    devanagari: 'जम्बुद्वीप',
    shortDefinition: 'The island or continent of the Jamun (Indian black plum) tree.',
    chapterContext: 'Ancient ecological and cosmological name for the Indian landmass, used by Emperor Ashoka in his 3rd century BCE rock edicts.',
    textbookExample: 'Emperor Ashoka addressed his subjects across Jambudvipa in his rock edicts.',
    usagePrompt: 'Explain why ancient Indians named their land Jambudvipa:',
    keywordsExpected: ['jamun', 'tree', 'plum', 'ashoka', 'island', 'continent', 'edict']
  },
  {
    id: 'term-sindhu',
    term: 'Sindhu',
    iast: 'Sindhu',
    devanagari: 'सिन्धु',
    shortDefinition: 'The great Indus River; root of Hindu, Hindustan, and India.',
    chapterContext: 'The massive northwestern river that gave birth to Persian "Hindu", Greek "Indos", and modern "India".',
    textbookExample: 'Foreign travelers arriving at the northwestern border named the entire subcontinent after the River Sindhu.',
    usagePrompt: 'Explain how the River Sindhu influenced the modern name "India":',
    keywordsExpected: ['river', 'indus', 'hindu', 'indos', 'greeks', 'persians', 'india']
  },
  {
    id: 'term-uttarapatha',
    term: 'Uttarapatha',
    iast: 'Uttarāpatha',
    devanagari: 'उत्तरापथ',
    shortDefinition: 'The Great Northern Highway connecting the northwest to eastern ports.',
    chapterContext: 'Ancient arterial trade route from Taxila through the Gangetic plains to Tamralipti, facilitating commerce and culture.',
    textbookExample: 'Merchants and Buddhist monks traveled along the Uttarapatha across northern India.',
    usagePrompt: 'Describe the importance of Uttarapatha in ancient India:',
    keywordsExpected: ['northern', 'highway', 'trade', 'route', 'taxila', 'merchants', 'tamralipti']
  }
];

export const SUMMATIVE_QUESTIONS: SummativeQuestion[] = [
  {
    id: 'q1',
    sectionId: 'dual-name',
    category: 'concept-understanding',
    type: 'mcq',
    points: 7,
    question: 'How does Article 1(1) of the Indian Constitution define the official name of our country?',
    options: [
      '"India, that is Bharat, shall be a Union of States."',
      '"Bharat, formerly known as Hindustan, shall be a Republic."',
      '"India shall be known solely as Jambudvipa."',
      '"The United States of Bharat and India."'
    ],
    correctAnswer: 0,
    explanation: 'Article 1(1) explicitly opens with: "India, that is Bharat, shall be a Union of States," incorporating both ancient civilizational heritage and modern global statehood.',
    keyIdea: 'Article 1 bridges ancient roots (Bharat) with international identity (India).',
    sourceReference: 'NCERT Chapter 5 & The Constitution of India',
    difficulty: 'Easy',
    learningObjective: 'Recall and understand the exact constitutional formulation of India’s dual name.'
  },
  {
    id: 'q2',
    sectionId: 'bharat-origin',
    category: 'key-terms',
    type: 'mcq',
    points: 7,
    question: 'In the oldest Indian text, the Rigveda, what did the word "Bharatas" originally refer to?',
    options: [
      'A prominent Vedic clan/community living in the Sapta Sindhava region.',
      'A specific species of tree found in the Himalayas.',
      'A mountain pass on the western border.',
      'A maritime trade ship sailing to Rome.'
    ],
    correctAnswer: 0,
    explanation: 'In the Rigveda, the Bharatas were an esteemed Vedic tribe/community celebrated for their leadership in the Land of Seven Rivers (Sapta Sindhava).',
    keyIdea: 'The name Bharat started with a distinguished Vedic clan in the Rigveda.',
    sourceReference: 'NCERT Chapter 5: The Name Bharat',
    difficulty: 'Medium',
    learningObjective: 'Identify the Rigvedic origin of the name Bharata.'
  },
  {
    id: 'q3',
    sectionId: 'bharat-origin',
    category: 'source-interpretation',
    type: 'source-analysis',
    points: 8,
    question: 'Read the source below: \n"In the 1st century BCE, King Kharavela of Kalinga engraved a royal record in Prakrit on the Udayagiri hills, using the word \'Bharadhavasa\'."\nWhat does this archaeological finding prove to historians?',
    sourceSnippet: 'Hathigumpha Inscription, Udayagiri Hills, Odisha: "...भरधवस (Bharadhavasa)..."',
    options: [
      'It provides tangible stone-inscription proof that the name Bharatavarsha was used in official royal records over 2,100 years ago.',
      'It proves that King Kharavela was the author of the Rigveda.',
      'It shows that stone carving had not yet been invented in eastern India.',
      'It demonstrates that ancient Indians only spoke Greek.'
    ],
    correctAnswer: 0,
    explanation: 'The Hathigumpha inscription is direct archaeological evidence showing that monarchs recognized a broad territorial region called "Bharadhavasa" (Bharatavarsha) in the 1st century BCE.',
    keyIdea: 'Stone inscriptions provide primary physical proof of ancient geographical terms.',
    sourceReference: 'NCERT Source: Hathigumpha Inscription',
    difficulty: 'Medium',
    learningObjective: 'Interpret primary epigraphical evidence from the Hathigumpha inscription.'
  },
  {
    id: 'q4',
    sectionId: 'jambudvipa',
    category: 'concept-understanding',
    type: 'mcq',
    points: 7,
    question: 'Which great Mauryan emperor addressed his subjects across the subcontinent as living in "Jambudvipa" in his 3rd century BCE Minor Rock Edicts?',
    options: [
      'Emperor Ashoka',
      'Emperor Chandragupta I',
      'King Kharavela',
      'King Harsha'
    ],
    correctAnswer: 0,
    explanation: 'Emperor Ashoka referred to the people of his vast empire as dwelling in "Jambudvipa" (the island/continent of the Jamun tree) in his Minor Rock Edicts.',
    keyIdea: 'Emperor Ashoka standardized Jambudvipa in official royal inscriptions.',
    sourceReference: 'NCERT Section: Jambudvipa in Ashoka’s Inscriptions',
    difficulty: 'Easy',
    learningObjective: 'Recognize Ashoka’s use of Jambudvipa in epigraphical sources.'
  },
  {
    id: 'q5',
    sectionId: 'sindhu-to-india',
    category: 'connections',
    type: 'mcq',
    points: 8,
    question: 'Trace the linguistic chain: How did the Sanskrit word "Sindhu" transform into "Hindu", "Hindustan", and "India"?',
    options: [
      'Sindhu (Sanskrit) → Hindu (Old Persian S→H sound shift) → Indos/India (Greek dropped H) & Hindustan (Persian suffix -stan).',
      'Sindhu was translated from an ancient Chinese word into Sanskrit by Xuanzang.',
      'India was the original word, which was later changed into Sindhu by Greek sailors.',
      'Hindustan was coined by Ashoka in his pillar edicts.'
    ],
    correctAnswer: 0,
    explanation: 'The Persian sound shift (S→H) turned Sindhu into Hindu; ancient Greeks dropped the initial H to create Indos/India; Persian/Arabic writers added "-stan" to create Hindustan.',
    keyIdea: 'Linguistic shifts transformed the single river name "Sindhu" into global names.',
    sourceReference: 'NCERT Chapter 5: How the Names Evolved',
    difficulty: 'Challenging',
    learningObjective: 'Trace the multi-lingual evolution of names derived from the River Sindhu.'
  },
  {
    id: 'q6',
    sectionId: 'foreign-travelers',
    category: 'source-interpretation',
    type: 'mcq',
    points: 7,
    question: 'Why did Chinese Buddhist pilgrim Xuanzang (7th c. CE) say the name "Yindu" / "In-tu" (meaning the Moon) was the most fitting name for India?',
    options: [
      'Because just as the moon sheds light in the darkness of night, India illuminated humanity through wisdom and spiritual teachings.',
      'Because India was shaped exactly like a crescent moon.',
      'Because ancient Indians only traveled during full moon nights.',
      'Because Indian kings claimed to be rulers of the moon.'
    ],
    correctAnswer: 0,
    explanation: 'Xuanzang poetically recorded that India’s wisdom, morality, and philosophies were like the luminous moon guiding travelers across the dark night.',
    keyIdea: 'Xuanzang celebrated India as a lighthouse of wisdom for Asia.',
    sourceReference: 'NCERT Source Box: Xuanzang’s Da Tang Xiyu Ji',
    difficulty: 'Medium',
    learningObjective: 'Understand Xuanzang’s philosophical perspective on India.'
  },
  {
    id: 'q7',
    sectionId: 'geographical-unity',
    category: 'concept-understanding',
    type: 'mcq',
    points: 6,
    question: 'Complete the meaning of the Vishnu Purana verse: "The country that lies NORTH of the ________ and SOUTH of the ________ is called Bhārata."',
    options: [
      'ocean (Samudra); snowy mountains (Himadri)',
      'desert; river Ganga',
      'Himalayas; Indian Ocean',
      'equator; Tropic of Cancer'
    ],
    correctAnswer: 0,
    explanation: '"उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम्" — North of the ocean (Samudra) and South of the snowy mountains (Himadri) is called Bhārata.',
    keyIdea: 'The Vishnu Purana defined the natural geographic perimeter of Bharat.',
    sourceReference: 'NCERT Source: Vishnu Purana Shloka',
    difficulty: 'Easy',
    learningObjective: 'Demonstrate comprehension of the classic Vishnu Purana geographical shloka.'
  },
  {
    id: 'q8',
    sectionId: 'cultural-tapestry',
    category: 'connections',
    type: 'mcq',
    points: 7,
    question: 'What was the ancient "Uttarapatha"?',
    options: [
      'The great northern trade highway extending from Taxila in the northwest across the Gangetic plains to Tamralipti in the east.',
      'A mountain trail reserved only for kings in Kashmir.',
      'A sea route connecting Gujarat to Africa.',
      'A religious book written by Megasthenes.'
    ],
    correctAnswer: 0,
    explanation: 'Uttarapatha was the arterial northern highway that connected trade, universities, and cities from the northwest frontier to the Bay of Bengal.',
    keyIdea: 'Uttarapatha was ancient India’s northern commercial and cultural superhighway.',
    sourceReference: 'NCERT Section: Routes of Unity',
    difficulty: 'Medium',
    learningObjective: 'Identify the geographical span and purpose of the Uttarapatha route.'
  },
  {
    id: 'q9',
    sectionId: 'cultural-tapestry',
    category: 'reasoning',
    type: 'mcq',
    points: 8,
    question: 'In traditional Indian prayers, rivers like the Ganga (North), Godavari (South), Narmada (Central), and Kaveri (South) are recited together. How did this practice build national unity?',
    options: [
      'It gave every person, no matter where they lived, a shared mental map of the entire subcontinent as one sacred homeland.',
      'It was a legal requirement imposed by taxation officers.',
      'It helped fishermen memorize weather forecast charts.',
      'It prevented disputes between river boat captains.'
    ],
    correctAnswer: 0,
    explanation: 'By invoking rivers from every corner of India in daily prayers, people developed a deep cultural attachment to the entire subcontinent as a unified homeland.',
    keyIdea: 'Sacred geography fostered civilizational unity across linguistic boundaries.',
    sourceReference: 'NCERT Section: Sacred Geography & Cultural Tapestry',
    difficulty: 'Medium',
    learningObjective: 'Analyze how sacred geography supported cultural integration.'
  },
  {
    id: 'q10',
    sectionId: 'sindhu-to-india',
    category: 'application',
    type: 'mcq',
    points: 10,
    isApplicationQuestion: true,
    question: '[APPLICATION QUESTION] Imagine a foreign trader in 300 BCE travels from Greece to the court of Chandragupta Maurya in Pataliputra. Which book would they most likely consult, and what name would they use for the country?',
    options: [
      'They would read Megasthenes’ "Indika" and refer to the land as "India" or "Indikē".',
      'They would read Xuanzang’s diary and call it "Tianzhu".',
      'They would read the Constitution of India and call it "Union of States".',
      'They would consult the Ain-i-Akbari and call it "Hindustan".'
    ],
    correctAnswer: 0,
    explanation: 'Megasthenes lived in Pataliputra around 300 BCE and wrote "Indika", which introduced the name "India" / "Indikē" to the Greco-Roman world.',
    keyIdea: 'Applying historical chronology to traveler accounts and country names.',
    sourceReference: 'NCERT Chapter 5: Greek Accounts of India',
    difficulty: 'Challenging',
    learningObjective: 'Apply historical chronology to match 300 BCE events with Megasthenes’ Indika.'
  },
  {
    id: 'q11',
    sectionId: 'dual-name',
    category: 'application',
    type: 'mcq',
    points: 10,
    isApplicationQuestion: true,
    question: '[APPLICATION QUESTION] A student argues: "Since India is a young democratic republic formed in 1947, our nation has no connection to ancient history." How would you correct this student using Chapter 5?',
    options: [
      'Explain that India is an ancient civilization whose cultural continuity, literature (Rigveda, Puranas), and name (Bharat) span thousands of years, now organized as a modern democratic republic.',
      'Agree with the student because no country existed before 1947.',
      'Tell the student that only the British established Indian society.',
      'State that only modern technology matters in history.'
    ],
    correctAnswer: 0,
    explanation: 'Chapter 5 demonstrates that modern India is the continuation of one of the world’s oldest living civilizations, harmonizing ancient roots with modern democracy.',
    keyIdea: 'India is both a timeless civilization and a modern democratic republic.',
    sourceReference: 'NCERT Chapter 5: Core Civilizational Theme',
    difficulty: 'Medium',
    learningObjective: 'Synthesize civilizational continuity with modern constitutional statehood.'
  },
  {
    id: 'q12',
    sectionId: 'bharat-origin',
    category: 'reasoning',
    type: 'short-answer',
    points: 15,
    question: 'In your own words (2–4 sentences), explain why our country has held multiple names throughout history (such as Sapta Sindhava, Bharatavarsha, Jambudvipa, Hindustan, and India).',
    correctAnswer: 'Different names arose because ancient inhabitants named the land after prominent clans (Bharatas), beloved native flora (Jambudvipa), and local rivers (Sapta Sindhava), while foreign travelers from Persia, Greece, and China adapted the name of River Sindhu or viewed India through their own languages and philosophical reverence.',
    explanation: 'Our diverse names reflect internal cultural heritage (clans, epics, native trees) and external global interactions (Persians, Greeks, Chinese pilgrims).',
    keyIdea: 'Multiple names capture the rich internal and external historical tapestry of India.',
    sourceReference: 'NCERT Chapter 5 Summary',
    difficulty: 'Challenging',
    learningObjective: 'Synthesize the multiple causes behind India’s diverse historical names.',
    keywordsForShortAnswer: ['clan', 'bharatas', 'tree', 'jamun', 'jambudvipa', 'sindhu', 'river', 'persian', 'greek', 'chinese', 'names', 'travelers']
  }
];

export const TEACHER_DATA_SUMMARY = {
  totalStudentsEnrolled: 38,
  studentsCompleted: 34,
  classAverageScore: 84.5,
  classAverageConfidence: '3.4 / 4.0',
  topicMastery: [
    { topic: 'Constitutional Dual Name (Article 1)', masteryPct: 94, status: 'Strong' },
    { topic: 'Origins of Bharat & Hathigumpha', masteryPct: 88, status: 'Strong' },
    { topic: 'Jambudvipa & Ashokan Inscriptions', masteryPct: 86, status: 'Strong' },
    { topic: 'Linguistic Evolution (Sindhu → India)', masteryPct: 76, status: 'Developing' },
    { topic: 'Foreign Travelers (Xuanzang & Megasthenes)', masteryPct: 82, status: 'Strong' },
    { topic: 'Vishnu Purana Geographical Definition', masteryPct: 91, status: 'Strong' },
    { topic: 'Trade Routes & Sacred Geography', masteryPct: 73, status: 'Needs Revision' }
  ],
  recommendedClassRevision: [
    'Review the Persian sound change (S to H) and the Greek dropping of aspiration.',
    'Revisit Uttarapatha and Dakshinapatha arterial routes on the ancient map.'
  ]
};
