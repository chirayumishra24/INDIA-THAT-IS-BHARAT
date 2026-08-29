export interface StateCultureData {
  id: string;
  name: string;
  hindiName?: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'Union Territory';
  capital: string;
  monuments: string[];
  danceAndMusic: string[];
  artAndHandicrafts: string[];
  festivals: string[];
  cuisine: string[];
  civilizationalSignificance: string;
  popularHighlights: string[];
}

export const INDIA_REGIONS = [
  'All',
  'North',
  'South',
  'East',
  'West',
  'Central',
  'North-East',
  'Union Territory'
] as const;

export const INDIA_STATES_CULTURE: StateCultureData[] = [
  // --- NORTH INDIA ---
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir',
    hindiName: 'जम्मू और कश्मीर',
    region: 'North',
    capital: 'Srinagar (Summer) / Jammu (Winter)',
    monuments: ['Shankaracharya Temple', 'Martand Sun Temple Ruins', 'Hari Parbat Fort', 'Pari Mahal', 'Raghunath Temple'],
    danceAndMusic: ['Rouf Dance', 'Bhand Pather folk theatre', 'Hafiza Dance', 'Sufiana Kalam'],
    artAndHandicrafts: ['Pashmina Shawls (GI)', 'Kani Shawls', 'Walnut Wood Carving', 'Papier-Mâché Art', 'Kashmiri Carpets (Kaleen)'],
    festivals: ['Tulip Festival', 'Shikara Festival', 'Eid-ul-Fitr', 'Baisakhi at Nagin Lake', 'Herath (Shivratri)'],
    cuisine: ['Wazwan (Rogan Josh, Gustaba, Rista)', 'Kahwa with Saffron & Almonds', 'Dum Aloo Kashmiri', 'Modur Pulao'],
    civilizationalSignificance: 'Epicenter of Sanskrit scholarship (Sharada Peeth), Buddhist Fourth Council, Kashmiri Shaivism (Abhinavagupta), and Himalayan silk route.',
    popularHighlights: ['Saffron of Pampore (Kesar)', 'Dal Lake Floating Houseboats & Shikaras', 'Pashmina Pure Wool', 'Gulmarg Snow Slopes']
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    hindiName: 'लद्दाख (Land of High Passes)',
    region: 'North',
    capital: 'Leh / Kargil',
    monuments: ['Hemis Monastery', 'Thiksey Monastery', 'Leh Royal Palace', 'Diskit Monastery & Giant Buddha', 'Alchi Choskor'],
    danceAndMusic: ['Cham Mask Dance (Monastic)', 'Jabro Dance', 'Shondol Dance (Royal dance of Ladakh)'],
    artAndHandicrafts: ['Thangka Buddhist Scroll Paintings', 'Ladakhi Wood Carving', 'Pashmina Yarns', 'Clay Statues & Prayer Wheels'],
    festivals: ['Hemis Festival (Guru Padmasambhava)', 'Losar (Ladakhi New Year)', 'Sindhu Darshan Festival', 'Dosmoche'],
    cuisine: ['Thukpa Noodle Soup', 'Skyu Pasta Stew', 'Butter Tea (Gur Gur Chai)', 'Tingmo (Steamed Tibetan bread)', 'Chhang'],
    civilizationalSignificance: 'Sacred Himalayan frontier preserving ancient Mahayana Buddhist monastic libraries, rock petroglyphs, and the high-altitude Silk Road trail.',
    popularHighlights: ['Hemis Cham Sacred Dances', 'Khardung La Pass', 'Pangong Tso Blue Lake', 'Zanskar Frozen River Chadar Trek']
  },
  {
    id: 'punjab',
    name: 'Punjab',
    hindiName: 'पंजाब (Land of the Five Rivers)',
    region: 'North',
    capital: 'Chandigarh',
    monuments: ['Sri Harmandir Sahib (Golden Temple)', 'Jallianwala Bagh', 'Qila Mubarak Bathinda', 'Sheesh Mahal Patiala', 'Wagah Border'],
    danceAndMusic: ['Bhangra (Harvest dance)', 'Giddha (Women’s folk dance)', 'Jhumar', 'Sammi', 'Sufi Qawwali & Tappa'],
    artAndHandicrafts: ['Phulkari Floral Embroidery (GI)', 'Punjabi Jutti Handcrafted Shoes', 'Wood Inlay Work of Hoshiarpur'],
    festivals: ['Baisakhi (Spring Harvest & Khalsa Sajna)', 'Lohri (Winter bonfire)', 'Hola Mohalla at Anandpur Sahib', 'Gurpurabs'],
    cuisine: ['Sarson da Saag & Makki di Roti with White Butter', 'Amritsari Stuffed Kulcha', 'Dal Makhani', 'Butter Chicken', 'Sweet Lassi'],
    civilizationalSignificance: 'Cradle of Vedic hymns composed on the Sapta Sindhu rivers, Harappan site of Ropar, and birthplace of the Sikh tradition promoting universal equality.',
    popularHighlights: ['Golden Temple Amritsar', 'Phulkari Embroidered Dupattas', 'Baisakhi Festivities', 'Agricultural Heartland']
  },
  {
    id: 'haryana',
    name: 'Haryana',
    hindiName: 'हरियाणा (Abode of God & Ancient Saraswati)',
    region: 'North',
    capital: 'Chandigarh',
    monuments: ['Kurukshetra Brahma Sarovar & Jyotisar', 'Rakhigarhi (Largest Indus Valley Site)', 'Pinjore Yadavindra Gardens', 'Sheikh Chilli Tomb Thanesar'],
    danceAndMusic: ['Phag Dance', 'Dhamal Dance (dating to Mahabharata era)', 'Saang Folk Theatre', 'Loor Dance', 'Raginis'],
    artAndHandicrafts: ['Panipat Handloom & Durries (City of Weavers)', 'Surajkund Craft Traditions', 'Terracotta Pottery of Jhajjar'],
    festivals: ['Surajkund International Crafts Mela', 'Gita Jayanti Samaroh (Kurukshetra)', 'Gugga Naumi', 'Baisakhi'],
    cuisine: ['Bajra Khichdi with Pure Ghee', 'Kadhi Pakora', 'Kachri ki Sabzi', 'Hara Dhania Cholia', 'Singri ki Sabzi', 'Sweet Ghevar'],
    civilizationalSignificance: 'Historic battleground of Mahabharata and the sermon of the Bhagavad Gita at Jyotisar; home to Rakhigarhi Harappan metropolis.',
    popularHighlights: ['Kurukshetra Battlefield & Bhagavad Gita birthplace', 'Rakhigarhi Indus Valley Discoveries', 'Surajkund Crafts Fair', 'Murrah Dairy Breed']
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    hindiName: 'हिमाचल प्रदेश (Devbhoomi)',
    region: 'North',
    capital: 'Shimla (Summer) / Dharamshala (Winter)',
    monuments: ['Hadimba Devi Temple Manali', 'Tabo Monastery Spiti (over 1000 yrs old)', 'Kangra Fort', 'Naggar Castle', 'Key Monastery'],
    danceAndMusic: ['Nati Dance (Guinness World Record Holder)', 'Dangi', 'Chhamb Dance', 'Jhori'],
    artAndHandicrafts: ['Kullu Handwoven Shawls (GI)', 'Kangra Miniature Paintings', 'Chamba Rumaal Needlework (GI)', 'Kinnauri Shawls'],
    festivals: ['Kullu Dussehra (Grand assembly of local deities)', 'Minjar Fair Chamba', 'Mandi International Shivratri', 'Losar'],
    cuisine: ['Himachali Dham (Satvik 7-course feast)', 'Siddu with Ghee', 'Babru', 'Chha Gosht', 'Kullu Trout'],
    civilizationalSignificance: 'Sacred Himalayan valleys described in the Vishnu Purana as the abode of sages, preserving timeless stone-and-timber Kathkuni architecture.',
    popularHighlights: ['Apple Orchards of Kinnaur & Kotgarh', 'Kullu & Kinnauri Pure Woolens', 'Spiti High Monasteries', 'Kangra Valley Tea']
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    hindiName: 'उत्तराखंड (Land of the Gods)',
    region: 'North',
    capital: 'Dehradun (Winter) / Gairsain (Summer)',
    monuments: ['Badrinath & Kedarnath Temples', 'Jageshwar Dham Temple Cluster', 'Gangotri & Yamunotri', 'Har Ki Pauri Haridwar', 'Baijnath Temple'],
    danceAndMusic: ['Chholiya (Valorous Sword Dance)', 'Jhora', 'Chhapeli', 'Pandav Nritya (Mahabharata enactment)'],
    artAndHandicrafts: ['Aipan Ritual Floor Folk Art (GI)', 'Ringaal Bamboo Weaving', 'Wood Carvings of Kumaon & Garhwal'],
    festivals: ['Kumbh Mela at Haridwar (UNESCO)', 'Nanda Devi Raj Jat Yatra', 'Phool Dei Spring Festival', 'Ganga Dussehra'],
    cuisine: ['Kafuli (Wild spinach & herbs)', 'Chainsoo (Roasted black gram)', 'Almora Bal Mithai (GI)', 'Singori sweet', 'Gahat ki Dal'],
    civilizationalSignificance: 'Origin of Mother Ganga and Yamuna rivers; northern natural frontier celebrated in Sanskrit literature as the crown of Bharat.',
    popularHighlights: ['Char Dham Himalayan Pilgrimage', 'Ganga Aarti at Rishikesh & Haridwar', 'Valley of Flowers (UNESCO)', 'Yoga Capital of the World']
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    hindiName: 'उत्तर प्रदेश (Heartland of Ancient Wisdom)',
    region: 'North',
    capital: 'Lucknow',
    monuments: ['Kashi Vishwanath & Varanasi Ghats', 'Sarnath Lion Capital & Dhamek Stupa', 'Taj Mahal Agra (UNESCO)', 'Ayodhya Ram Mandir', 'Fatehpur Sikri', 'Bara Imambara'],
    danceAndMusic: ['Kathak (Classical Dance Form)', 'Raslila of Mathura-Vrindavan', 'Nautanki', 'Thumri & Dadra (Banaras Gharana)', 'Kajari'],
    artAndHandicrafts: ['Chikankari Hand Embroidery of Lucknow (GI)', 'Banarasi Brocade & Silk Sarees (GI)', 'Moradabad Brass Art', 'Firozabad Glassware', 'Bhadohi Hand-Knotted Carpets'],
    festivals: ['Maha Kumbh Mela Prayagraj (UNESCO)', 'Dev Deepawali on Varanasi Ghats', 'Lathmar Holi of Barsana', 'Ganga Mahotsav'],
    cuisine: ['Awadhi Dum Biryani & Kebabs', 'Banarasi Paan & Kachori Jalebi', 'Mathura Peda', 'Agra Petha', 'Malaiyo dessert'],
    civilizationalSignificance: 'Birthplace of Lord Rama and Krishna, site of Buddha’s first sermon at Sarnath (source of India’s National Emblem), and holy Triveni Sangam.',
    popularHighlights: ['Kashi (World’s oldest living city)', 'Taj Mahal Monument of Love', 'Banarasi Pure Zari Silk', 'Sarnath Ashoka Pillar']
  },
  {
    id: 'delhi',
    name: 'Delhi (NCT)',
    hindiName: 'दिल्ली (Heart of the Nation)',
    region: 'Union Territory',
    capital: 'New Delhi',
    monuments: ['Red Fort (Lal Qila - UNESCO)', 'Qutub Minar Complex (UNESCO)', 'Humayun’s Tomb (UNESCO)', 'India Gate', 'Lotus Temple', 'Akshardham Temple'],
    danceAndMusic: ['Qawwali at Nizamuddin Dargah', 'Dilli Gharana Classical Music', 'Contemporary Fusion Arts'],
    artAndHandicrafts: ['Zardozi Gold Thread Embroidery', 'Meenakari Enamel Jewelry of Chandni Chowk', 'Handcrafted Ittar (Attar) Perfumes'],
    festivals: ['Republic Day Parade on Kartavya Path', 'Independence Day at Red Fort', 'Phool Walon Ki Sair', 'Delhi International Arts Festival'],
    cuisine: ['Old Delhi Mughlai (Butter Chicken, Nihari)', 'Chandni Chowk Chaat & Paranthe Wali Gali', 'Chole Bhature', 'Kulfi Falooda'],
    civilizationalSignificance: 'Ancient Indraprastha of the Mahabharata, capital of successive medieval empires, and constitutional epicenter of modern democratic India.',
    popularHighlights: ['Ancient Iron Pillar of Delhi (Rust-resistant metallurgy)', 'Kartavya Path & Rashtrapati Bhavan', 'Chandni Chowk Heritage Bazaars', 'Red Fort']
  },

  // --- WEST INDIA ---
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    hindiName: 'राजस्थान (Land of Kings & Fortresses)',
    region: 'West',
    capital: 'Jaipur',
    monuments: ['Amer Fort & Jaigarh', 'Mehrangarh Fort Jodhpur', 'Hawa Mahal & City Palace Jaipur', 'Chittorgarh Fort (UNESCO)', 'Jaisalmer Golden Fort', 'Dilwara Jain Temples Mount Abu'],
    danceAndMusic: ['Ghoomar (Traditional royal dance)', 'Kalbelia (UNESCO Intangible Cultural Heritage)', 'Bhavai balancing dance', 'Chari Dance', 'Langa & Manganiyar folk singing'],
    artAndHandicrafts: ['Jaipur Blue Pottery (GI)', 'Bandhani / Leheriya Tie & Dye (GI)', 'Miniature Painting of Kishangarh', 'Kathputli Puppetry', 'Sanganeri Block Print (GI)'],
    festivals: ['Pushkar Camel Fair', 'Desert Festival Jaisalmer', 'Teej Festival Jaipur', 'Gangaur', 'Jaipur Literature Festival'],
    cuisine: ['Dal Baati Churma with Ghee', 'Gatte ki Sabzi', 'Ker Sangri Desert Beans', 'Laal Maas', 'Ghevar & Mawa Kachori'],
    civilizationalSignificance: 'Indus Valley site of Kalibangan on the paleo-Saraswati river, valorous Rajput chivalric traditions, and living stone palaces.',
    popularHighlights: ['Royal Palaces & Desert Forts', 'Thar Desert Sand Dunes & Camels', 'Jaipur Kundan-Meena Jewelry', 'Vibrant Folk Music & Puppetry']
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    hindiName: 'गुजरात (Land of Legends & Ancient Ports)',
    region: 'West',
    capital: 'Gandhinagar',
    monuments: ['Statue of Unity (182m - Tallest in World)', 'Somnath Jyotirlinga Temple', 'Sun Temple Modhera', 'Rani ki Vav Stepwell (UNESCO)', 'Dholavira Harappan City (UNESCO)', 'Lothal Dockyard', 'Dwarkadhish Temple'],
    danceAndMusic: ['Garba (UNESCO Intangible Cultural Heritage)', 'Dandiya Raas', 'Tippani Folk Dance', 'Bhavai Folk Theatre', 'Sugam Sangeet'],
    artAndHandicrafts: ['Patan Patola Double-Ikat Silk (GI)', 'Rogan Painting of Nirona (GI)', 'Kutch Mirror & Bead Embroidery (GI)', 'Bandhani', 'Sankheda Wooden Furniture'],
    festivals: ['International Kite Festival (Uttarayan)', 'Navratri (World’s longest dance festival)', 'Rann Utsav at White Salt Desert', 'Janmashtami at Dwarka'],
    cuisine: ['Gujarati Thali (Kadhi, Rotli, Shaak, Dal)', 'Khaman Dhokla & Khandvi', 'Undhiyu seasonal winter delicacy', 'Thepla & Khakhra', 'Fafda Jalebi'],
    civilizationalSignificance: 'World’s earliest tidal dockyard at Lothal, water engineering at Dholavira, Lord Krishna’s capital Dwarka, and home of Mahatma Gandhi & Sardar Patel.',
    popularHighlights: ['Asiatic Lions in Gir National Park', 'Great Rann of Kutch White Salt Desert', 'Navratri Mega Garba Nights', 'Dholavira Harappan Civilization']
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    hindiName: 'महाराष्ट्र (Land of Saints, Forts & Caves)',
    region: 'West',
    capital: 'Mumbai',
    monuments: ['Ajanta & Ellora Rock-Cut Caves (UNESCO)', 'Gateway of India Mumbai', 'Chhatrapati Shivaji Terminus (UNESCO)', 'Raigad & Shivneri Forts', 'Shirdi Sai Temple', 'Kailasa Temple at Ellora'],
    danceAndMusic: ['Lavani (Energetic folk dance)', 'Koli Fisherman Dance', 'Dhangari Gaja', 'Powada (Heroic historical ballads)', 'Natya Sangeet'],
    artAndHandicrafts: ['Warli Tribal Wall Art (GI)', 'Paithani Gold Brocade Sarees (GI)', 'Kolhapuri Leather Chappals (GI)', 'Bidriware of Nanded', 'Silver Filigree of Hupari'],
    festivals: ['Ganesh Chaturthi (Grand Mumbai Processions)', 'Gudi Padwa (Maharashtrian New Year)', 'Shivaji Maharaj Jayanti', 'Pandharpur Wari Pilgrimage'],
    cuisine: ['Puran Poli with Ghee', 'Vada Pav & Pav Bhaji', 'Misal Pav Kolhapuri', 'Pithla Bhakri with Thecha', 'Modak sweets', 'Ratnagiri Alphonso Mango'],
    civilizationalSignificance: 'Monolithic rock architecture at Kailasa (Ellora), rise of the Maratha Empire under Shivaji, Bhakti movement of Sant Tukaram and Dnyaneshwar.',
    popularHighlights: ['Ajanta & Ellora Ancient Frescoes & Sculptures', 'Ganeshotsav Grand Vibrance', 'Alphonso Mangoes of Konkan', 'Sahyadri Mountain Fortresses']
  },
  {
    id: 'goa',
    name: 'Goa',
    hindiName: 'गोवा (Pearl of the Arabian Sea)',
    region: 'West',
    capital: 'Panaji',
    monuments: ['Basilica of Bom Jesus (UNESCO)', 'Se Cathedral', 'Fort Aguada', 'Mangueshi Temple', 'Chapora Fort'],
    danceAndMusic: ['Fugdi Folk Dance', 'Dhalo', 'Dekhni', 'Corridinho', 'Mando (Goan folk romance song)'],
    artAndHandicrafts: ['Azulejos Hand-Painted Ceramic Tiles', 'Seashell Crafts', 'Goan Brassware', 'Bamboo & Coconut Shell Crafts'],
    festivals: ['Goa Carnival', 'Shigmo (Goan Spring Festival)', 'Feast of St. Francis Xavier', 'Bonderam Flag Festival of Divar Island'],
    cuisine: ['Goan Fish Curry with Rice', 'Bebinca (Multi-layered coconut dessert)', 'Pork Vindaloo / Xacuti', 'Fonna Kadi (Kokum curry)', 'Cashew Feni'],
    civilizationalSignificance: 'Ancient Kadamba dynasty port of Govapuri, fusion of Konkani heritage with Portuguese maritime architecture over 450 years.',
    popularHighlights: ['Golden Sand Beaches & Coconut Groves', 'UNESCO Baroque Churches of Old Goa', 'Shigmo & Carnival Parades', 'Arvalem Ancient Rock Caves']
  },

  // --- EAST INDIA ---
  {
    id: 'bihar',
    name: 'Bihar',
    hindiName: 'बिहार (Land of Viharas & Enlightenment)',
    region: 'East',
    capital: 'Patna',
    monuments: ['Nalanda Ancient Mahavihara (UNESCO)', 'Mahabodhi Temple Complex Bodh Gaya (UNESCO)', 'Vikramshila University Ruins', 'Barabar Ancient Rock Caves', 'Golghar Patna', 'Ashoka Pillar Vaishali'],
    danceAndMusic: ['Jat-Jatin Folk Dance', 'Bhojpuri Bidesiya Folk Theatre', 'Jhijhiya', 'Kajari of Mithila'],
    artAndHandicrafts: ['Madhubani / Mithila Painting (GI)', 'Sikki Golden Grass Crafts (GI)', 'Manjusha Scroll Art (GI)', 'Bhagalpuri Tussar Silk (Silk City)'],
    festivals: ['Chhath Puja (Ancient Sacred Sun Worship)', 'Sonepur Cattle Fair', 'Sama-Chakeva', 'Buddha Jayanti at Bodh Gaya', 'Mahavir Jayanti at Vaishali'],
    cuisine: ['Litti Chokha with Sattu & Ghee', 'Sattu Paratha & Sharbat', 'Khaja of Silao (GI)', 'Gaya Tilkut', 'Thekua traditional prasad'],
    civilizationalSignificance: 'Ancient Magadha Empire (Maurya & Gupta Golden Age), world’s first republic at Vaishali, world’s oldest residential university at Nalanda, birthplace of Buddhism & Jainism.',
    popularHighlights: ['Bodh Gaya Bodhi Tree of Enlightenment', 'Ancient Nalanda University Ruins', 'Madhubani Hand-Painted Artwork', 'Chhath Mahaparva Sun Devotion']
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    hindiName: 'झारखंड (Land of Forests & Tribal Heritage)',
    region: 'East',
    capital: 'Ranchi',
    monuments: ['Baidyanath Dham Temple Deoghar (Jyotirlinga)', 'Parasnath Hill / Shikharji (Sacred Jain Mountain)', 'Maluti Terracotta Temples (Dumka)', 'Palamu Forts', 'Hundru & Jonha Falls'],
    danceAndMusic: ['Chhau Dance of Seraikela (UNESCO Intangible Heritage)', 'Jhumar', 'Paika Warrior Dance', 'Santhali Tribal Dance', 'Domkach'],
    artAndHandicrafts: ['Sohrai & Khovar Tribal Mural Painting (GI)', 'Dhokra Lost-Wax Bell Metal Craft', 'Jadopatia Tribal Scroll Art', 'Bamboo Crafts & Wooden Cutlery'],
    festivals: ['Sarhul (Worship of Sal Tree Blossom)', 'Karam Festival', 'Karam & Sohrai Cattle Festival', 'Tusu Parab', 'Manda Festival'],
    cuisine: ['Dhuska with Chana Curry', 'Rugra (Wild forest mushroom delicacy)', 'Arsa Roti', 'Pittha', 'Bamboo Shoot Stir Fry', 'Thekua'],
    civilizationalSignificance: 'Ancient tribal sanctuary preserving prehistoric rock art (Isko Caves dating to 10,000 BCE), Birsa Munda’s anti-colonial revolution (Ulgulan), and rich mineral foundation of Bharat.',
    popularHighlights: ['Sohrai & Khovar Ancient Wall Murals', 'Seraikela Masked Chhau Dance', 'Parasnath Sacred Jain Pilgrimage', 'Baidyanath Jyotirlinga Temple']
  },
  {
    id: 'odisha',
    name: 'Odisha',
    hindiName: 'ओडिशा (Land of Jagannath & Utkala Arts)',
    region: 'East',
    capital: 'Bhubaneswar',
    monuments: ['Konark Sun Temple (UNESCO)', 'Puri Jagannath Temple', 'Lingaraj Temple Bhubaneswar', 'Udayagiri & Khandagiri Caves', 'Hathigumpha Inscription of King Kharavela', 'Chilika Lake & Temple'],
    danceAndMusic: ['Odissi (Classical Dance Form)', 'Chhau Dance of Mayurbhanj', 'Gotipua Dance', 'Sambalpuri Folk Dance & Dalkhai', 'Odissi Classical Music'],
    artAndHandicrafts: ['Pattachitra Paintings of Raghurajpur (GI)', 'Tarakasi Silver Filigree of Cuttack (GI)', 'Sambalpuri & Bomkai Handloom Silk (GI)', 'Pipili Appliqué Work (GI)', 'Konark Stone Sculpting'],
    festivals: ['Ratha Yatra of Puri (Chariot Festival of Jagannath)', 'Konark Dance Festival', 'Raja Parba (Earth Celebration)', 'Bali Jatra (Ancient Maritime Trade Fair)', 'Nuakhai'],
    cuisine: ['Chhena Poda (Caramelized cottage cheese cake - GI)', 'Pakhala Bhata (Fermented rice)', 'Dalma (Lentil & vegetable stew)', 'Puri Khaja (GI)', 'Odisha Rasagola (GI)'],
    civilizationalSignificance: 'Ancient Kalinga; Hathigumpha inscription directly mentioning "Bharadhavasa" in 1st century BCE; transformation of Emperor Ashoka; millennial maritime trade with Southeast Asia.',
    popularHighlights: ['Konark Sun Temple Giant 24-Spoke Stone Wheels', 'Puri Jagannath Chariot Ratha Yatra', 'Odissi Classical Expressions', 'Raghurajpur Heritage Crafts Village']
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    hindiName: 'पश्चिम बंगाल (Land of Bengal Renaissance & Literature)',
    region: 'East',
    capital: 'Kolkata',
    monuments: ['Victoria Memorial Kolkata', 'Howrah Bridge', 'Terracotta Temples of Bishnupur', 'Hazarduari Palace Murshidabad', 'Dakshineswar Kali Temple', 'Santiniketan (UNESCO)'],
    danceAndMusic: ['Rabindra Sangeet', 'Baul Mystic Folk Music (UNESCO)', 'Chhau Dance of Purulia', 'Brita Dance', 'Nazrul Geeti'],
    artAndHandicrafts: ['Terracotta Bankura Horse (GI)', 'Baluchari & Jamdani Silk Sarees (GI)', 'Kantha Embroidery (GI)', 'Dokra Metal Casting of Dariapur', 'Sholapith Artwork'],
    festivals: ['Durga Puja (UNESCO Intangible Cultural Heritage of Humanity)', 'Poila Boishakh (Bengali New Year)', 'Poush Mela Santiniketan', 'Kali Puja & Diwali', 'Rathayatra of Mahesh'],
    cuisine: ['Rosogolla & Sandesh (GI)', 'Shorshe Ilish (Hilsa in mustard gravies)', 'Kosha Mangsho with Fluffy Luchi', 'Mishti Doi (Sweet curd)', 'Macher Jhol with Rice'],
    civilizationalSignificance: 'Bengal Renaissance, intellectual cradle of Swami Vivekananda, Rabindranath Tagore, Netaji Subhash Chandra Bose, Jagadish Chandra Bose, and ancient port of Tamralipta.',
    popularHighlights: ['Durga Puja Grand Carnivals', 'Darjeeling Himalayan Tea Gardens', 'Sundarbans Royal Bengal Tigers & Mangroves', 'Bishnupur Terracotta Temples']
  },

  // --- CENTRAL INDIA ---
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    hindiName: 'मध्य प्रदेश (The Heart of India)',
    region: 'Central',
    capital: 'Bhopal',
    monuments: ['Sanchi Great Stupa & Gateways (UNESCO)', 'Khajuraho Group of Temples (UNESCO)', 'Bhimbetka Prehistoric Rock Shelters (UNESCO)', 'Gwalior Fort', 'Mahakaleshwar Jyotirlinga Ujjain', 'Mandu Palaces'],
    danceAndMusic: ['Matki Dance', 'Jawara Dance of Bundelkhand', 'Grida Dance', 'Gwalior Gharana Classical Music (Tansen)', 'Gond Tribal Dance'],
    artAndHandicrafts: ['Gond & Bhil Tribal Paintings (GI)', 'Chanderi Handloom Silk & Cotton (GI)', 'Maheshwari Sarees (GI)', 'Bagh Hand-Block Print (GI)', 'Bell Metal Crafts of Tikamgarh'],
    festivals: ['Khajuraho International Dance Festival', 'Tansen Samaroh Gwalior', 'Lokrang Samaroh Bhopal', 'Simhastha Kumbh at Ujjain', 'Bhagoria Tribal Haat Festival'],
    cuisine: ['Poha Jalebi', 'Bhopali Gosht Korma', 'Dal Bafla with Ghee', 'Bhutte Ka Kees', 'Mawa Bati sweet', 'Sev of Ratlam (GI)'],
    civilizationalSignificance: 'Prehistoric human art at Bhimbetka (30,000 BCE), Emperor Ashoka’s Buddhist architecture at Sanchi, ancient astronomical center at Ujjain, and Chandela temple art.',
    popularHighlights: ['Sanchi Ashoka Toranas & Stupas', 'Khajuraho Erotic Stone Sculptures', 'Bhimbetka Stone Age Cave Paintings', 'Kanha & Bandhavgarh Tiger Sanctuaries']
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    hindiName: 'छत्तीसगढ़ (Rice Bowl & Tribal Bastar)',
    region: 'Central',
    capital: 'Raipur',
    monuments: ['Chitrakote Waterfalls (Niagara of India)', 'Sirpur Ancient Buddhist & Lakshmana Temples', 'Bhoramdeo Temple (Khajuraho of Chhattisgarh)', 'Ratanpur Mahamaya Temple', 'Giraudpuri Dham'],
    danceAndMusic: ['Pandwani Folk Ballad (Teejan Bai - Mahabharata)', 'Gaur Maria Dance of Bastar', 'Panthi Dance of Satnami community', 'Saila Dance', 'Karma & Raut Nacha'],
    artAndHandicrafts: ['Bastar Dhokra Bell Metal Castings (GI)', 'Bastar Wrought Iron Crafts (Loha Shilp - GI)', 'Kosa Silk of Champa', 'Bastar Wooden Mask Carving', 'Terracotta Art'],
    festivals: ['Bastar Dussehra (World’s longest 75-day tribal festival)', 'Madai Festival', 'Hareli (Agricultural festival)', 'Chakradhar Samaroh Raigarh', 'Rajim Kumbh'],
    cuisine: ['Chila & Fara (Rice flour rolls)', 'Muthia', 'Bafauri (Steamed chana snack)', 'Dubki Kadhi', 'Aamat forest stew', 'Dehrori sweet'],
    civilizationalSignificance: 'Ancient South Kosala kingdom mentioned in Ramayana; Dandakaranya forest where Rama spent exile; vibrant indigenous tribal democracy and iron casting heritage.',
    popularHighlights: ['Bastar 75-Day Unique Dussehra', 'Bastar Lost-Wax Dhokra Metal Art', 'Chitrakote Horseshoe Waterfalls', 'Sirpur 7th-Century Red Brick Temples']
  },

  // --- SOUTH INDIA ---
  {
    id: 'karnataka',
    name: 'Karnataka',
    hindiName: 'कर्नाटक (Land of Hoysalas & Vijayanagara)',
    region: 'South',
    capital: 'Bengaluru',
    monuments: ['Hampi Vijayanagara Capital (UNESCO)', 'Mysore Palace', 'Sacred Ensembles of Hoysalas - Belur & Halebidu (UNESCO)', 'Badami Cave Temples', 'Pattadakal (UNESCO)', 'Gol Gumbaz Bijapur'],
    danceAndMusic: ['Yakshagana (Classical-Folk Dance Drama)', 'Carnatic Music Traditions (Purandara Dasa)', 'Dollu Kunitha (Drum dance)', 'Suggi Kunitha', 'Veeragase'],
    artAndHandicrafts: ['Mysore Silk Sarees (GI)', 'Sandalwood Carvings & Oil (GI)', 'Channapatna Wooden Toys (GI)', 'Bidriware Inlay Metalcraft (GI)', 'Kinnal Wood Art (GI)'],
    festivals: ['Mysuru Dasara (Royal Jumbo Savari Procession)', 'Kambala Buffalo Races', 'Hampi Utsav', 'Karaga Festival Bengaluru', 'Ugadi (Kannada New Year)'],
    cuisine: ['Bisi Bele Bath', 'Mysore Pak (Pure ghee melt-in-mouth sweet)', 'Neer Dosa & Mangalore Buns', 'Ragi Mudde with Sambar', 'Dharwad Peda (GI)', 'Filter Coffee of Coorg'],
    civilizationalSignificance: 'Great empires of Badami Chalukyas, Rashtrakutas, Hoysalas, and Vijayanagara; pioneer in Kannada literature (Kavirajamarga), philosophy, and modern technological innovation.',
    popularHighlights: ['Mysore Royal Palace Illumination', 'Hampi Stone Chariot & Lotus Mahal', 'Channapatna Non-toxic Wooden Toys', 'Coorg Western Ghats Coffee Plantations']
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    hindiName: 'तमिलनाडु (Land of Dravidian Gopurams & Sangam Heritage)',
    region: 'South',
    capital: 'Chennai',
    monuments: ['Brihadeeswarar Temple Thanjavur (UNESCO Chola Temple)', 'Meenakshi Amman Temple Madurai', 'Shore Temple & Rathas of Mahabalipuram (UNESCO)', 'Ramanathaswamy Temple Rameswaram', 'Thiruvalluvar Statue Kanyakumari'],
    danceAndMusic: ['Bharatanatyam (Ancient Classical Dance)', 'Carnatic Vocal & Nadaswaram', 'Karakattam', 'Kavadi Chindu', 'Villu Pattu (Bow song)'],
    artAndHandicrafts: ['Tanjore Gold Leaf Paintings (GI)', 'Kanchipuram Pure Silk Sarees (GI)', 'Swamimalai Chola Bronze Idols (GI)', 'Nachiar Koil Brass Lamps (GI)', 'Chettinad Kottan Baskets'],
    festivals: ['Pongal (4-day Harvest Thanksgiving)', 'Margazhi Music & Dance Festival Chennai', 'Tamil New Year (Puthandu)', 'Chithirai Festival Madurai', 'Jallikattu'],
    cuisine: ['Idli Sambar & Crispy Medu Vada', 'Crispy Ghee Roast Masala Dosa', 'Chettinad Spicy Pepper Chicken', 'Tirunelveli Halwa (GI)', 'Madurai Jigarthanda', 'Filter Kaapi'],
    civilizationalSignificance: 'Over 2,500 years of Sangam Tamil literature; maritime Chola naval expeditions across the Bay of Bengal; soaring stone Dravidian temple engineering.',
    popularHighlights: ['Thanjavur Brihadeeswarar 216-ft Vimana', 'Bharatanatyam Classical Footwork & Mudras', 'Kanchipuram Handwoven Silk Sarees', 'Cape Comorin Triveni Confluence of 3 Oceans']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    hindiName: 'केरल (God’s Own Country)',
    region: 'South',
    capital: 'Thiruvananthapuram',
    monuments: ['Sree Padmanabhaswamy Temple', 'Bekal Fort Kasaragod', 'Mattancherry Dutch Palace Kochi', 'Vadakkunnathan Temple Thrissur', 'St. Angelo Fort Kannur'],
    danceAndMusic: ['Kathakali (Classical Dance-Drama)', 'Mohiniyattam (Dance of the Enchantress)', 'Theyyam (Sacred Divine Ritual Dance)', 'Kalaripayattu (World’s Oldest Martial Art)', 'Panchavadyam & Chenda Melam'],
    artAndHandicrafts: ['Aranmula Kannadi (Handcrafted Metal Mirror - GI)', 'Kasavu Gold-Zari Cotton Sarees (GI)', 'Coir & Coconut Shell Carvings', 'Nettur Petti Wooden Jewelry Box', 'Bell Metal Lamps'],
    festivals: ['Onam (Grand Floral Carpet Pookkalam & Feast)', 'Thrissur Pooram (Spectacular Elephant & Fireworks Pageant)', 'Vishu (Malayalam New Year)', 'Nehru Trophy Snake Boat Race'],
    cuisine: ['Kerala Sadhya (26-dish feast on fresh banana leaf)', 'Appam with Coconut Stew', 'Puttu with Kadala Curry', 'Malabar Dum Biryani', 'Crispy Banana Chips in Coconut Oil'],
    civilizationalSignificance: 'Ancient spice port of Muziris connecting India to Greeks, Romans and Phoenicians; birthplace of Adi Shankaracharya (Advaita Vedanta); global sanctuary of Ayurveda medicine.',
    popularHighlights: ['Palm-Fringed Backwaters of Alleppey & Kumarakom', 'Kathakali Vibrant Green Facial Makeup (Paccha)', 'Ayurvedic Rejuvenation Heritage', 'Onam Vallam Kali (Snake Boat Races)']
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    hindiName: 'आंध्र प्रदेश (Land of Kuchipudi & Sacred Hills)',
    region: 'South',
    capital: 'Amaravati',
    monuments: ['Tirumala Venkateswara Temple', 'Lepakshi Veerabhadra Hanging Pillar Temple', 'Amaravati Buddhist Stupa & Dhyana Buddha', 'Borra Caves & Araku Valley', 'Undavalli Rock-Cut Caves'],
    danceAndMusic: ['Kuchipudi (Classical Dance of Andhra)', 'Andhra Natyam', 'Kolattam', 'Burra Katha folk storytelling', 'Annamacharya Sankirtanas'],
    artAndHandicrafts: ['Kalamkari Hand-Block Painted Fabrics of Srikalahasti & Machilipatnam (GI)', 'Kondapalli Wooden Toys (GI)', 'Dharmavaram & Uppada Jamdani Sarees (GI)', 'Etikoppaka Lacquered Toys (GI)'],
    festivals: ['Brahmotsavam at Tirumala Tirupati', 'Ugadi (Telugu New Year)', 'Sankranti with Haridasu & Rangoli', 'Visakha Utsav', 'Flamingo Festival Pulicat'],
    cuisine: ['Andhra Gongura Pachadi & Avakaya Mango Pickle', 'Pesarattu with Ginger Chutney', 'Pootharekulu Paper Sweet of Atreyapuram (GI)', 'Hyderabadi style Andhra Biryani', 'Kakinada Kaja'],
    civilizationalSignificance: 'Satavahana dynasty maritime empire; ancient Buddhist learning hub of Amaravati; stone marvel of Lepakshi’s monolithic Nandi and hanging pillar.',
    popularHighlights: ['Tirumala Tirupati Pilgrimage', 'Kuchipudi Graceful Rhythmic Footwork', 'Kalamkari Organic Dye Fabric Paintings', 'Etikoppaka & Kondapalli Folk Toys']
  },
  {
    id: 'telangana',
    name: 'Telangana',
    hindiName: 'तेलंगाना (Land of Koh-i-Noor, Pearls & Kakatiyas)',
    region: 'South',
    capital: 'Hyderabad',
    monuments: ['Charminar Hyderabad (1591 CE)', 'Golconda Fort (Diamond capital)', 'Kakatiya Rudreshwara Ramappa Temple (UNESCO)', 'Warangal Thousand Pillar Temple & Fort Gateway', 'Qutb Shahi Tombs'],
    danceAndMusic: ['Perini Sivatandavam (Warrior Dance)', 'Oggu Katha', 'Chindu Bhagavatam', 'Bathukamma Songs', 'Deccani Ghazals'],
    artAndHandicrafts: ['Pochampally Ikat Silk Sarees (GI)', 'Bidri Metalware Inlay of Hyderabad (GI)', 'Nirmal Paintings & Wooden Craft (GI)', 'Cheriyal Scroll Paintings (GI)', 'Gollabhama Sarees'],
    festivals: ['Bathukamma (State Floral Festival celebrating Nature)', 'Bonalu (Goddess Mahakali Festival)', 'Medaram Sammakka Saralamma Jatara (Largest tribal gathering)', 'Deccan Festival'],
    cuisine: ['Hyderabadi Authentic Dum Biryani (GI)', 'Mirchi Ka Salan', 'Double Ka Meetha', 'Sarva Pindi (Crispy rice pancake)', 'Hyderabadi Haleem (GI)', 'Irani Chai with Osmania Biscuits'],
    civilizationalSignificance: 'Kakatiya dynasty stone engineering (Ramappa Temple built with floating bricks); historic diamond capital producing the Koh-i-Noor and Hope diamonds; fusion of Deccani and Telugu cultures.',
    popularHighlights: ['Charminar Four Minarets of Hyderabad', 'Ramappa Temple Floating Brick Marvel', 'Pochampally Geometric Ikat Weaves', 'Bathukamma Floral Stacks']
  },

  // --- NORTH-EAST INDIA (THE SEVEN SISTERS + SIKKIM) ---
  {
    id: 'assam',
    name: 'Assam',
    hindiName: 'असम (Land of the Red River & Blue Hills)',
    region: 'North-East',
    capital: 'Dispur / Guwahati',
    monuments: ['Kamakhya Shaktipeeth Temple Guwahati', 'Rang Ghar & Kareng Ghar Sivasagar (Ahom Dynasty)', 'Majuli (World’s largest river island)', 'Talatal Ghar', 'Navagraha Temple'],
    danceAndMusic: ['Bihu Dance (Rongali, Bhogali, Kongali)', 'Sattriya (Classical Dance of India)', 'Bagurumba of Bodo community', 'Jhumur Dance of Tea Tribes', 'Borgeet (Srimanta Sankardev)'],
    artAndHandicrafts: ['Muga Golden Silk (Exclusive to Assam - GI)', 'Eri & Paat Silk Sarees', 'Assamese Jaapi (Traditional bamboo hat - GI)', 'Bell Metal Craft of Sarthebari (GI)', 'Cane & Bamboo furniture'],
    festivals: ['Rongali Bihu (Assamese New Year & Spring)', 'Bhogali Bihu (Harvest feast)', 'Ambubachi Mela at Kamakhya', 'Majuli Raas Mahotsav', 'Dehing Patkai Festival'],
    cuisine: ['Khaar (Traditional alkaline dish)', 'Masor Tenga (Tangy sour fish curry)', 'Duck Curry with Ash Gourd', 'Pitha (Rice cakes with sesame & jaggery)', 'Assam CTC & Orthodox Black Tea'],
    civilizationalSignificance: 'Ancient Pragjyotisha and Kamarupa kingdoms mentioned in the Mahabharata; 600-year uninterrupted rule of the brave Ahom Dynasty; Neo-Vaishnavite renaissance initiated by Srimanta Sankardev.',
    popularHighlights: ['Kaziranga One-Horned Rhinoceros (UNESCO)', 'Assam Emerald Tea Plantations', 'Majuli River Island Vaishnavite Sattras', 'Golden Muga Silk of Sualkuchi']
  },
  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    hindiName: 'अरुणाचल प्रदेश (Land of the Dawn-Lit Mountains)',
    region: 'North-East',
    capital: 'Itanagar',
    monuments: ['Tawang Monastery (2nd Largest in World)', 'Ita Fort Itanagar', 'Jaswant Garh War Memorial', 'Urgelling Gompa (Birthplace of 6th Dalai Lama)', 'Malinithan Ruins'],
    danceAndMusic: ['Aji Lhamu Dance', 'Chalo Dance of Nocte Tribe', 'Ponung Dance of Adi Tribe', 'Buiya Dance', 'Wancho Mask Dance'],
    artAndHandicrafts: ['Thangka Tibetan Silk Paintings', 'Sherdukpen & Monpa Wooden Masks', 'Adi & Apatani Handwoven Shawls', 'Cane & Bamboo Baskets and Hats', 'Handmade Paper of Monpa'],
    festivals: ['Losar (Monpa New Year)', 'Nyokum Yullo (Nyishi tribe)', 'Siang River Festival', 'Ziro Music Festival', 'Dree Festival of Apatani', 'Mopin Festival of Galo'],
    cuisine: ['Pika Pila (Bamboo shoot pickle with pork fat)', 'Lukter (Dried beef with chili)', 'Dung Po (Steamed rice in leaves)', 'Apong (Traditional fermented rice brew)', 'Thukpa & Momos'],
    civilizationalSignificance: 'Easternmost frontier of Bharat where the morning sun first touches Indian soil; sacred Buddhist monasteries preserving ancient Sanskrit and Tibetan scrolls.',
    popularHighlights: ['Tawang High Altitude Snow Monastery', 'Ziro Valley Apatani Pine Landscapes', 'Sela Pass Frozen Lake', 'Rich Biodiversity of Namdapha National Park']
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    hindiName: 'मेघालय (Abode of the Clouds)',
    region: 'North-East',
    capital: 'Shillong (Scotland of the East)',
    monuments: ['Living Root Bridges of Nongriat (Double Decker)', 'Nohkalikai Waterfalls (Tallest plunge waterfall in India)', 'Mawsmai & Krem Liat Prah Caves', 'Don Bosco Centre for Indigenous Cultures', 'Umiam Lake'],
    danceAndMusic: ['Shad Suk Mynsiem (Khasi thanksgiving dance)', 'Wangala (100-Drums Garo Harvest Dance)', 'Nongkrem Dance', 'Laho Dance of Jaintia tribe'],
    artAndHandicrafts: ['Cane & Bamboo Mats (Tlieng)', 'Endi Silk Handloom Shawls', 'Knitted Khasi Hats & Umbrellas (Knup)', 'Woodcarving of Garo Hills'],
    festivals: ['Wangala Festival (100-Drums Festival)', 'Nongkrem Dance Festival at Smit', 'Shad Suk Mynsiem', 'Autumn Shillong Cherry Blossom Festival', 'Behdienkhlam'],
    cuisine: ['Jadoh (Rice cooked in meat stock)', 'Doh-Khlieh (Pork salad with onions & chilies)', 'Tungrymbai (Fermented soybean delicacy)', 'Nakham Bitchi (Dry fish soup of Garo)', 'Pukhlein (Rice jaggery snack)'],
    civilizationalSignificance: 'Ancient matrilineal society where lineage and heritage pass through daughters; bio-engineering marvel of Living Root Bridges woven from Ficus elastica trees over centuries.',
    popularHighlights: ['Cherrapunji & Mawsynram (Rainiest places on Earth)', 'Living Root Bridges of Nongriat', 'Shillong Rock Music & Cherry Blossoms', 'Dawki Crystal Clear Umngot River']
  },
  {
    id: 'manipur',
    name: 'Manipur',
    hindiName: 'मणिपुर (Jewel of India)',
    region: 'North-East',
    capital: 'Imphal',
    monuments: ['Kangla Fort Imphal', 'Ima Keithel (World’s only all-women run market)', 'Loktak Lake & Floating Islands (Phumdis)', 'INA Memorial Complex Moirang', 'Govindaji Temple'],
    danceAndMusic: ['Manipuri Classical Dance (Raas Leela)', 'Thang-Ta (Ancient Manipuri Martial Art)', 'Pung Cholom (Drum acrobatics)', 'Lai Haraoba ritual dance'],
    artAndHandicrafts: ['Longpi Black Stone Pottery (GI)', 'Shaphee Lanphee Embroidered Shawls (GI)', 'Moirang Phee Handloom (GI)', 'Kauna Reed Baskets & Mats', 'Wood & Bamboo Craft'],
    festivals: ['Sangai Festival (State Cultural Extravaganza)', 'Yaoshang (5-Day Manipuri Spring Festival & Sports)', 'Lai Haraoba (Pleasing of the Gods)', 'Ningol Chakouba (Sisterhood Feast)', 'Cheiraoba'],
    cuisine: ['Eromba (Mashed boiled veggies with fermented fish)', 'Kangshoi (Vegetable stew)', 'Singju (Fiery herb salad)', 'Chak-Hao Kheer (Nutrient-rich purple black rice pudding)', 'Chametki'],
    civilizationalSignificance: 'Birthplace of modern Polo (Sagol Kangjei played by Meitei kings); classical dance traditions rooted in Vaishnavite devotion; heroic stand of Subhash Chandra Bose’s INA at Moirang.',
    popularHighlights: ['Loktak Lake & Keibul Lamjao (Only floating national park in the world)', 'Manipuri Classical Graceful Raas Leela', 'Ima Keithel (500-Year-Old All-Women Market)', 'Longpi Natural Black Pottery']
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    hindiName: 'मिजोरम (Land of the Highlanders)',
    region: 'North-East',
    capital: 'Aizawl',
    monuments: ['Solomon’s Temple Aizawl', 'Reiek Tlang Heritage Peak', 'Sibuta Lung Stone Monolith', 'Phawngpui (Blue Mountain Peak)', 'Tam Dil Sacred Lake'],
    danceAndMusic: ['Cheraw (Famous Bamboo Dance)', 'Khuallam (Dance for guests)', 'Chheihlam (Community celebration dance)', 'Sarlamkai (Warrior dance)', 'Mizo Gospel and Folk Harmonies'],
    artAndHandicrafts: ['Puan Handwoven Traditional Textiles (Puanchei, Ngotekherh - GI)', 'Bamboo & Cane Furniture and Baskets', 'Traditional Mizo Smoking Pipes', 'Wood Carvings'],
    festivals: ['Chapchar Kut (Spring Harvest Carnival)', 'Mim Kut (Maize Festival)', 'Pawl Kut (Winter Harvest celebration)', 'Thalfavang Kut'],
    cuisine: ['Bai (Steamed vegetable stew with pork & bamboo shoots)', 'Vawksa Rep (Smoked pork with mustard greens)', 'Sanpiau (Mizo rice porridge with spices)', 'Panch Phoran Tarkari', 'Sawhchiar (Meat rice stew)'],
    civilizationalSignificance: 'Tlawmngaihna (selfless community code of duty and compassion); vibrant village traditions and sustainable bamboo ecosystem management.',
    popularHighlights: ['Cheraw Bamboo Dance Precision and Rhythm', 'Chapchar Kut Vibrant Costumes and Feasts', 'Phawngpui Blue Mountain', 'Vantawng Multi-Tiered Waterfalls']
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    hindiName: 'नागालैंड (Land of Festivals & Brave Warriors)',
    region: 'North-East',
    capital: 'Kohima',
    monuments: ['Kohima War Cemetery & Memorial', 'Kisama Heritage Village', 'Kachari Ruins Dimapur (Megalithic Stone Pillars)', 'Khonoma Green Village', 'Dzukou Valley Sanctuary'],
    danceAndMusic: ['Naga Warrior War Dance', 'Zeliang Folk Dance', 'Chakesang Bamboo Instrumental Music', 'Hornbill Indigenous Chants and Drums'],
    artAndHandicrafts: ['Naga Clan Shawls (Tsungkotepsu, Angami Shawls - GI)', 'Naga Wood Carvings & Spears', 'Bead & Brass Jewelry', 'Cane Baskets and Shields', 'Black Pottery of Longkhum'],
    festivals: ['Hornbill Festival (Festival of Festivals at Kisama in Dec)', 'Moatsu (Ao tribe)', 'Aoleang (Konyak tribe)', 'Sekrenyi (Angami purification festival)', 'Tokhu Emong (Lotha tribe)'],
    cuisine: ['Smoked Pork with Axone (Fermented soybean paste)', 'Anishi (Fermented yam leaves cooked with smoked meat)', 'Bhut Jolokia (Ghost Pepper - Hottest chili in the world)', 'Galho (Naga khichdi with herbs)', 'Zutho (Rice brew)'],
    civilizationalSignificance: '16 distinct indigenous tribes preserving unique democratic clan governance (Village Republics), rich oral epics, and India’s first certified eco-village at Khonoma.',
    popularHighlights: ['Hornbill Festival of Kisama', 'Dzukou Valley of Rare Lily Flowers', 'Konyak & Angami Handcrafted Shawls', 'Khonoma Asia’s First Green Village']
  },
  {
    id: 'tripura',
    name: 'Tripura',
    hindiName: 'त्रिपुरा (Land of Fourteen Gods & Royal Palaces)',
    region: 'North-East',
    capital: 'Agartala',
    monuments: ['Ujjayanta Royal Palace Agartala', 'Neermahal (Water Palace in Rudrasagar Lake)', 'Unakoti Rock-Cut Colossal Shiva Sculptures', 'Tripura Sundari Temple Udaipur (Shaktipeeth)', 'Pilak Buddhist Ruins'],
    danceAndMusic: ['Hojagiri (Balancing Dance of Reang Tribe on Earthen Pitchers)', 'Garia Dance', 'Bizhu Dance of Chakma tribe', 'Hai-Hak Dance', 'Lebang Boomani (Insect Catching Dance)'],
    artAndHandicrafts: ['Tripura Bamboo & Cane Screen Art (GI)', 'Rignai & Rikutu Handwoven Indigenous Textiles', 'Tripura Tribal Woodcarvings', 'Clay Idols & Mat Weaving'],
    festivals: ['Kharchi Puja (Worship of 14 Dynastic Deities)', 'Garia Puja', 'Neermahal Water Festival', 'Pous Sankranti Mela at Tirthamukh', 'Diwali at Tripura Sundari Temple'],
    cuisine: ['Mui Borok (Traditional cuisine with Berma fermented fish)', 'Chakhwi (Bamboo shoot & pork curry)', 'Gudok (Mashed boiled vegetables)', 'Mosdeng Serma (Spicy tomato chili chutney)', 'Bhangui (Rice rolls cooked in banana leaf)'],
    civilizationalSignificance: 'Ancient Manikya dynasty rule dating back hundreds of years; colossal 8th-century bas-relief rock carvings at Unakoti; syncretic fusion of tribal faiths and Vedic traditions.',
    popularHighlights: ['Unakoti Colossal Rock-Cut Shiva Bas-Reliefs', 'Neermahal Water Palace', 'Hojagiri Acrobatic Pitcher Dance', 'Tripura Bamboo Craftsmanship']
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    hindiName: 'सिक्किम (Valley of Rice & Sacred Kanchenjunga)',
    region: 'North-East',
    capital: 'Gangtok',
    monuments: ['Rumtek Monastery (Dharma Chakra Centre)', 'Pemayangtse Monastery', 'Buddha Park of Ravangla (130-ft Statue)', 'Kirateshwar Mahadev Temple', 'Dubdi Monastery (Oldest in Sikkim)', 'Nathula Pass Border'],
    danceAndMusic: ['Cham Monastic Mask Dance', 'Singhi Chham (Snow Lion Dance)', 'Yak Chham', 'Maruni (Nepalese Folk Dance)', 'Tamang Selo'],
    artAndHandicrafts: ['Thangka Buddhist Paintings (GI)', 'Choktse Foldable Wooden Carved Tables (GI)', 'Lepcha Handwoven Fabrics', 'Tibetan Wool Carpets', 'Handmade Bamboo Crafts'],
    festivals: ['Pang Lhabsol (Worship of Mount Kanchenjunga as Guardian Deity)', 'Losar (Tibetan New Year)', 'Saga Dawa (Buddha’s Enlightenment)', 'Losoong / Namsoong (Sikkimese Harvest)', 'Dasain'],
    cuisine: ['Momos (Steamed dumplings with chili dipping sauce)', 'Thukpa & Gyathuk', 'Gundruk Soup (Fermented leafy greens)', 'Phagshapa (Pork with radish and dried chilies)', 'Sinki Soup', 'Chhurpi (Himalayan Yak cheese)'],
    civilizationalSignificance: 'First 100% certified organic state in the world; sacred reverence for Mount Kanchenjunga (guardian deity); preservation of ancient Mahayana & Vajrayana Buddhist monasteries.',
    popularHighlights: ['Mount Kanchenjunga (3rd Highest Peak in the World)', 'World’s First 100% Organic State', 'Rumtek & Pemayangtse Monasteries', 'Gurudongmar High Altitude Sacred Lake']
  }
];
