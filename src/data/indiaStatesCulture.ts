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
  {
    id: 'jk-ladakh',
    name: 'Jammu & Kashmir & Ladakh',
    hindiName: 'जम्मू-कश्मीर एवं लद्दाख',
    region: 'North',
    capital: 'Srinagar / Jammu / Leh',
    monuments: ['Shankaracharya Temple', 'Martand Sun Temple ruins', 'Hemis Monastery', 'Hari Parbat Fort', 'Pari Mahal'],
    danceAndMusic: ['Rouf Dance', 'Bhand Pather', 'Ladakhi Cham Dance', 'Sufiana Kalam'],
    artAndHandicrafts: ['Pashmina & Shahtoosh Shawls', 'Walnut Wood Carving', 'Papier-mâché', 'Kani Shawls', 'Thangka Paintings'],
    festivals: ['Hemis Festival', 'Tulip Festival', 'Losar', 'Eid-ul-Fitr', 'Shikara Festival'],
    cuisine: ['Wazwan (Rogan Josh, Gustaba)', 'Kahwa Green Tea with Saffron & Almonds', 'Thukpa', 'Skyu', 'Dum Aloo'],
    civilizationalSignificance: 'Ancient center of Sanskrit scholarship (Sharada Peeth), Buddhist councils, Kashmiri Shaivism, and high Himalayan trade routes.',
    popularHighlights: ['Saffron of Pampore', 'Dal Lake Shikaras', 'Pashmina Wool', 'High Altitude Passes (Khardung La)']
  },
  {
    id: 'punjab',
    name: 'Punjab',
    hindiName: 'पंजाब (Land of 5 Rivers)',
    region: 'North',
    capital: 'Chandigarh',
    monuments: ['Sri Harmandir Sahib (Golden Temple)', 'Jallianwala Bagh', 'Qila Mubarak Bathinda', 'Wagah Border'],
    danceAndMusic: ['Bhangra', 'Giddha', 'Jhumar', 'Tappa and Sufi Qawwali'],
    artAndHandicrafts: ['Phulkari Embroidery', 'Punjabi Jutti', 'Woodwork & Inlay art'],
    festivals: ['Baisakhi', 'Lohri', 'Hola Mohalla', 'Gurpurab'],
    cuisine: ['Sarson da Saag & Makki di Roti', 'Amritsari Kulcha', 'Butter Chicken', 'Lassi', 'Dal Makhani'],
    civilizationalSignificance: 'Cradle of Vedic hymns along the Sapta Sindhu rivers, Harappan sites (Ropar), and the sacred traditions of the Sikh Gurus.',
    popularHighlights: ['Golden Temple Amritsar', 'Phulkari Floral Shawls', 'Baisakhi Harvest Celebrations', 'Rich Agricultural Breadbasket']
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    hindiName: 'हिमाचल प्रदेश (Devbhoomi)',
    region: 'North',
    capital: 'Shimla / Dharamshala',
    monuments: ['Hadimba Temple Manali', 'Tabo Monastery (Spiti)', 'Kangra Fort', 'Viceregal Lodge Shimla'],
    danceAndMusic: ['Nati Dance (Guinness Record Holder)', 'Dangi', 'Chham Dance'],
    artAndHandicrafts: ['Kullu Shawls', 'Kangra Miniature Paintings', 'Chamba Rumaal Embroidery', 'Thangka Art'],
    festivals: ['Kullu Dussehra', 'Minjar Fair', 'Mandi Shivratri', 'Losar'],
    cuisine: ['Dham (Traditional feast)', 'Siddu', 'Madra', 'Babru', 'Chha Gosht'],
    civilizationalSignificance: 'Sacred Himalayan valleys revered in the Mahabharata and Puranas, sheltering millennium-old wooden architecture and monasteries.',
    popularHighlights: ['Apple Orchards of Kinnaur', 'Kullu Handwoven Shawls', 'Spiti Ancient Monasteries', 'Kangra Valley Tea']
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    hindiName: 'उत्तराखंड (Land of the Gods)',
    region: 'North',
    capital: 'Dehradun / Gairsain',
    monuments: ['Badrinath & Kedarnath Temples', 'Jageshwar Dham Temples', 'Gangotri & Yamunotri', 'Har Ki Pauri Haridwar'],
    danceAndMusic: ['Chholiya (Sword dance)', 'Jhora', 'Chhapeli', 'Pandav Nritya'],
    artAndHandicrafts: ['Aipan Folk Art (Floor painting)', 'Ringaal (Bamboo Craft)', 'Wood Carving of Kumaon'],
    festivals: ['Kumbh Mela (Haridwar)', 'Nanda Devi Raj Jat', 'Ganga Dussehra', 'Phool Dei'],
    cuisine: ['Kafuli (Spinach & fenugreek)', 'Chainsoo', 'Bal Mithai of Almora', 'Singori', 'Gahat Ki Dal'],
    civilizationalSignificance: 'Origin of Mother Ganga and Yamuna; the northern frontier praised in the Vishnu Purana (Himavat).',
    popularHighlights: ['Char Dham Pilgrimage', 'Ganga Aarti at Haridwar & Rishikesh', 'Valley of Flowers', 'Yoga Capital of the World']
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    hindiName: 'राजस्थान (Land of Kings)',
    region: 'West',
    capital: 'Jaipur',
    monuments: ['Amer Fort', 'Mehrangarh Fort Jodhpur', 'Hawa Mahal & City Palace', 'Chittorgarh Fort', 'Jaisalmer Golden Fort', 'Dilwara Jain Temples'],
    danceAndMusic: ['Ghoomar', 'Kalbelia (UNESCO Intangible Heritage)', 'Bhavai', 'Chari Dance', 'Manganiyar & Langa folk singing'],
    artAndHandicrafts: ['Jaipur Blue Pottery', 'Bandhani / Bandhej Tie-Dye', 'Miniature Paintings', 'Kathputli Puppetry', 'Block Printing (Bagru, Sanganer)'],
    festivals: ['Pushkar Camel Fair', 'Desert Festival Jaisalmer', 'Teej', 'Gangaur', 'Jaipur Literature Festival'],
    cuisine: ['Dal Baati Churma', 'Gatte Ki Sabzi', 'Ker Sangri', 'Laal Maas', 'Ghevar & Mawa Kachori'],
    civilizationalSignificance: 'Ancient Saraswati river civilization sites (Kalibangan), valorous Rajput kingdoms, and living architectural wonders in stone and sandstone.',
    popularHighlights: ['Royal Palaces & Desert Forts', 'Thar Desert Camel Safaris', 'Jaipur Gemstones & Kundan Jewelry', 'Vibrant Folk Music']
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    hindiName: 'गुजरात (Land of Legends & Trade)',
    region: 'West',
    capital: 'Gandhinagar',
    monuments: ['Statue of Unity (Tallest in World)', 'Somnath Temple', 'Sun Temple Modhera', 'Rani ki Vav (UNESCO)', 'Lothal & Dholavira (Harappan UNESCO)', 'Dwarkadhish Temple'],
    danceAndMusic: ['Garba (UNESCO Intangible Heritage)', 'Dandiya Raas', 'Bhavai Theatre', 'Tippani Dance'],
    artAndHandicrafts: ['Patola Double-Ikat Silk of Patan', 'Rogan Art of Kutch', 'Bandhani', 'Kutch Mirror & Bead Embroidery', 'Sankheda Lacquered Furniture'],
    festivals: ['Rann Utsav (White Desert)', 'International Kite Festival (Uttarayan)', 'Navratri (9 Nights of Garba)', 'Janmashtami at Dwarka'],
    cuisine: ['Dhokla & Khandvi', 'Gujarati Thali (Dal, Kadhi, Rotli, Shaak)', 'Thepla', 'Undhiyu', 'Fafda Jalebi'],
    civilizationalSignificance: 'Harappan maritime port Lothal, Lord Krishna’s ancient kingdom Dwarka, Jain sacred mountain Girnar, and the birthplace of Mahatma Gandhi and Sardar Patel.',
    popularHighlights: ['Asiatic Lions in Gir National Park', 'Great Rann of Kutch White Salt Desert', 'Navratri Mega Garba', 'Dholavira Water Reservoirs']
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    hindiName: 'महाराष्ट्र (Land of Saints & Forts)',
    region: 'West',
    capital: 'Mumbai',
    monuments: ['Ajanta & Ellora Rock-Cut Caves (UNESCO)', 'Gateway of India', 'Chhatrapati Shivaji Maharaj Terminus', 'Raigad & Shivneri Forts', 'Shirdi Sai Baba Temple'],
    danceAndMusic: ['Lavani', 'Koli Dance', 'Dhangari Gaja', 'Powada (Heroic ballads)', 'Natya Sangeet'],
    artAndHandicrafts: ['Warli Tribal Art', 'Paithani Silk Sarees', 'Kolhapuri Chappals', 'Bidriware of Nanded', 'Silver Filigree'],
    festivals: ['Ganesh Chaturthi (Grand Mumbai Processions)', 'Gudi Padwa', 'Shivaji Maharaj Jayanti', 'Pandharpur Wari Yatra'],
    cuisine: ['Puran Poli', 'Vada Pav & Pav Bhaji', 'Misal Pav', 'Pithla Bhakri', 'Modak', 'Alphonso Mango (Hapus)'],
    civilizationalSignificance: 'Ajanta/Ellora architectural pinnacles, the rise of the Maratha Empire under Shivaji, Bhakti movement saints (Tukaram, Dnyaneshwar), and financial capital of modern India.',
    popularHighlights: ['Ajanta-Ellora Cave Frescoes', 'Ganeshotsav Vibrance', 'Alphonso Mangoes of Ratnagiri', 'Sahyadri Hill Forts']
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    hindiName: 'उत्तर प्रदेश (Heartland of Ancient Wisdom)',
    region: 'North',
    capital: 'Lucknow',
    monuments: ['Varanasi Ghats & Kashi Vishwanath', 'Taj Mahal Agra (UNESCO)', 'Sarnath Lion Capital & Stupa', 'Ayodhya Ram Janmabhoomi', 'Fatehpur Sikri', 'Bara Imambara Lucknow'],
    danceAndMusic: ['Kathak (Classical Dance)', 'Raslila of Braj', 'Kajari', 'Thumri & Dadra (Banaras Gharana)', 'Charkula Dance'],
    artAndHandicrafts: ['Chikankari Embroidery of Lucknow', 'Banarasi Silk & Zari Sarees', 'Brassware of Moradabad', 'Glassware of Firozabad', 'Carpet Weaving of Bhadohi'],
    festivals: ['Maha Kumbh Mela (Prayagraj)', 'Dev Deepawali Varanasi', 'Lathmar Holi of Barsana', 'Ganga Mahotsav'],
    cuisine: ['Awadhi Biryani & Kebabs', 'Banarasi Paan & Kachori Sabzi', 'Peda of Mathura', 'Petha of Agra', 'Malaiyo'],
    civilizationalSignificance: 'Sacred confluence (Triveni Sangam), Buddha’s first sermon at Sarnath (source of Ashoka Lion Emblem), and epics of Ramayana and Mahabharata.',
    popularHighlights: ['Kashi (Oldest living city)', 'Taj Mahal', 'Banarasi Pure Silk', 'Ashoka Pillar Lion Capital at Sarnath']
  },
  {
    id: 'bihar',
    name: 'Bihar',
    hindiName: 'बिहार (Land of Viharas & Enlightenment)',
    region: 'East',
    capital: 'Patna',
    monuments: ['Nalanda Ancient Mahavihara (UNESCO)', 'Mahabodhi Temple Bodh Gaya (UNESCO)', 'Vikramshila University ruins', 'Barabar Rock-Cut Caves', 'Golghar Patna'],
    danceAndMusic: ['Jat-Jatin', 'Bhojpuri Bidesiya', 'Jhijhiya', 'Kajari'],
    artAndHandicrafts: ['Madhubani / Mithila Folk Painting (GI)', 'Sikki Grass Craft', 'Manjusha Art', 'Bhagalpuri Tussar Silk'],
    festivals: ['Chhath Puja (Sacred Sun Worship)', 'Sonepur Cattle Fair', 'Sama Chakeva', 'Buddha Jayanti'],
    cuisine: ['Litti Chokha with Ghee', 'Sattu Paratha & Sharbat', 'Khaja of Silao', 'Tilkut of Gaya', 'Thekua'],
    civilizationalSignificance: 'Ancient Magadha Empire (Maurya & Gupta dynasties), birthplace of Buddhism & Jainism, world’s earliest residential university at Nalanda.',
    popularHighlights: ['Bodh Gaya Bodhi Tree', 'Ancient Nalanda University', 'Madhubani Canvas Paintings', 'Chhath Mahaparva']
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    hindiName: 'पश्चिम बंगाल (Land of Culture & Renaissance)',
    region: 'East',
    capital: 'Kolkata',
    monuments: ['Victoria Memorial', 'Howrah Bridge', 'Terracotta Temples of Bishnupur', 'Hazarduari Palace Murshidabad', 'Dakshineswar Kali Temple'],
    danceAndMusic: ['Rabindra Sangeet', 'Baul Folk Songs (UNESCO)', 'Chhau Dance of Purulia', 'Brita Dance'],
    artAndHandicrafts: ['Terracotta Bankura Horses', 'Baluchari & Jamdani Sarees', 'Kantha Embroidery', 'Dokra Brass Casting', 'Sholapith Crafts'],
    festivals: ['Durga Puja (UNESCO Intangible Cultural Heritage)', 'Poila Boishakh (Bengali New Year)', 'Poush Mela (Santiniketan)', 'Kali Puja'],
    cuisine: ['Rosogolla & Sandesh', 'Shorshe Ilish (Hilsa in mustard)', 'Kosha Mangsho with Luchi', 'Mishti Doi', 'Macher Jhol'],
    civilizationalSignificance: 'Bengal Renaissance, intellectual epicenter of Swami Vivekananda, Rabindranath Tagore, Netaji Subhash Chandra Bose, and ancient Gauda kingdom.',
    popularHighlights: ['Durga Puja Grand Carnivals', 'Darjeeling Himalayan Tea', 'Sundarbans Royal Bengal Tigers', 'Bishnupur Terracotta Tiles']
  },
  {
    id: 'odisha',
    name: 'Odisha',
    hindiName: 'ओडिशा (Land of Jagannath & Utkala Arts)',
    region: 'East',
    capital: 'Bhubaneswar',
    monuments: ['Konark Sun Temple (UNESCO)', 'Puri Jagannath Temple', 'Lingaraj Temple', 'Udayagiri & Khandagiri Caves', 'Hathigumpha of King Kharavela'],
    danceAndMusic: ['Odissi (Classical Dance)', 'Chhau Dance of Mayurbhanj', 'Gotipua', 'Sambalpuri Folk Dance'],
    artAndHandicrafts: ['Pattachitra Paintings of Raghurajpur', 'Silver Filigree (Tarakasi) of Cuttack', 'Sambalpuri Ikat Silk', 'Pipili Appliqué work', 'Stone Carving'],
    festivals: ['Ratha Yatra of Puri (Chariot Festival)', 'Konark Dance Festival', 'Raja Parba', 'Bali Jatra (Ancient Maritime Trade Trade)'],
    cuisine: ['Chhena Poda (Caramelized cottage cheese dessert)', 'Pakhala Bhata', 'Dalma', 'Rasagola of Pahala', 'Macha Ghanta'],
    civilizationalSignificance: 'Ancient Kalinga, Hathigumpha inscription naming "Bharadhavasa" in 1st century BCE, Ashoka’s transformation, and maritime spice trade across Southeast Asia.',
    popularHighlights: ['Konark Sun Temple Giant Stone Wheels', 'Puri Grand Rath Yatra', 'Odissi Classical Dance', 'Raghurajpur Heritage Craft Village']
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    hindiName: 'कर्नाटक (Land of Hoysalas & Silicon Plateau)',
    region: 'South',
    capital: 'Bengaluru',
    monuments: ['Hampi Vijayanagara Ruins (UNESCO)', 'Mysore Palace', 'Hoysala Sacred Ensembles (Belur, Halebidu - UNESCO)', 'Gol Gumbaz Bijapur', 'Badami Cave Temples'],
    danceAndMusic: ['Yakshagana (Mythological Folk Theatre)', 'Carnatic Music Traditions', 'Dollu Kunitha', 'Suggi Kunitha'],
    artAndHandicrafts: ['Mysore Silk Sarees', 'Sandalwood Carvings', 'Bidriware Inlay Metalcraft', 'Channapatna Wooden Toys (GI)', 'Kinnal Toys'],
    festivals: ['Mysuru Dasara (Jumbo Savari)', 'Karaga Festival (Bengaluru)', 'Kambala (Buffalo race)', 'Ugadi', 'Hampi Utsav'],
    cuisine: ['Bisi Bele Bath', 'Mysore Pak (Ghee dessert)', 'Neer Dosa & Mangalore Buns', 'Ragi Mudde', 'Dharwad Peda', 'Filter Coffee'],
    civilizationalSignificance: 'Epicenters of Badami Chalukyas, Rashtrakutas, Hoysalas, and Vijayanagara Empire, fostering architecture, sculpture, and philosophy.',
    popularHighlights: ['Mysore Grand Royal Palace', 'Hampi Stone Chariot', 'Channapatna Eco Wooden Toys', 'Coorg Coffee Plantations']
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    hindiName: 'तमिलनाडु (Land of Dravidian Gopurams & Sangam Literature)',
    region: 'South',
    capital: 'Chennai',
    monuments: ['Brihadeeswarar Great Living Chola Temple (UNESCO)', 'Meenakshi Amman Temple Madurai', 'Group of Monuments at Mahabalipuram (UNESCO)', 'Rameswaram Ramanathaswamy Temple', 'Thiruvalluvar Statue Kanyakumari'],
    danceAndMusic: ['Bharatanatyam (Ancient Classical Dance)', 'Carnatic Vocal & Nadaswaram', 'Karakattam', 'Villu Pattu'],
    artAndHandicrafts: ['Tanjore Gold Foil Paintings', 'Kanchipuram Pure Silk Sarees', 'Swamimalai Bronze Idols (Chola Bronze)', 'Pattamadai Mats', 'Chettinad Terracotta'],
    festivals: ['Pongal (Harvest Thanksgiving)', 'Margazhi Music Festival', 'Tamil New Year (Puthandu)', 'Chithirai Festival Madurai', 'Jallikattu'],
    cuisine: ['Masala Dosa & Idli Sambar', 'Chettinad Pepper Chicken', 'Filter Filter Coffee', 'Pongal & Vada', 'Tirunelveli Halwa'],
    civilizationalSignificance: 'Ancient Sangam literature dating over 2,000 years, maritime Chola Empire reaching Java/Sumatra, Dravidian stone temple engineering marvels.',
    popularHighlights: ['Sky-high Temple Gopurams', 'Bharatanatyam Dance Form', 'Kanchipuram Silk Weaving', 'Cape Comorin Triveni Sangam of Oceans']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    hindiName: 'केरल (God’s Own Country)',
    region: 'South',
    capital: 'Thiruvananthapuram',
    monuments: ['Padmanabhaswamy Temple (Wealthiest Temple)', 'Bekal Fort', 'Mattancherry Dutch Palace Kochi', 'Vadakkunnathan Temple Thrissur'],
    danceAndMusic: ['Kathakali (Classical Dance-Drama)', 'Mohiniyattam', 'Theyyam (Divine ritual dance)', 'Kalaripayattu (Oldest Martial Art)', 'Chenda Melam'],
    artAndHandicrafts: ['Aranmula Kannadi (Metal Mirror)', 'Kasavu Gold-bordered Sarees', 'Coir Crafts', 'Nettur Petti (Jewelry box)', 'Coconut Shell Carvings'],
    festivals: ['Onam (Grand floral carpet - Pookkalam)', 'Thrissur Pooram (Elephant & Percussion spectacle)', 'Vishu', 'Nehru Trophy Snake Boat Race'],
    cuisine: ['Sadhya (26-dish feast on banana leaf)', 'Appam with Stew', 'Puttu & Kadala Curry', 'Malabar Biryani', 'Banana Chips in Coconut Oil'],
    civilizationalSignificance: 'Ancient spice port of Muziris connecting to Greeks, Romans and Arabs; birthplace of Adi Shankaracharya; pioneer in Ayurveda medicine.',
    popularHighlights: ['Serene Palm-fringed Backwaters', 'Kathakali Vibrant Green Masks', 'Ayurveda Wellness Therapies', 'Onam Snake Boat Races']
  },
  {
    id: 'andhra-pradesh-telangana',
    name: 'Andhra Pradesh & Telangana',
    hindiName: 'आंध्र प्रदेश एवं तेलंगाना (Land of Koh-i-Noor & Pearls)',
    region: 'South',
    capital: 'Amaravati / Hyderabad',
    monuments: ['Charminar Hyderabad', 'Golconda Fort', 'Tirumala Venkateswara Temple', 'Lepakshi Veerabhadra Hanging Pillar', 'Warangal Thousand Pillar Temple (UNESCO Ramappa)'],
    danceAndMusic: ['Kuchipudi (Classical Dance)', 'Perini Sivatandavam', 'Oggu Katha', 'Burra Katha', 'Carnatic Tyagaraja Kritis'],
    artAndHandicrafts: ['Pochampally Ikat & Gadwal Sarees', 'Kalamkari Hand-printed Fabric of Srikalahasti', 'Bidri Metalware', 'Kondapalli & Nirmal Wooden Toys', 'Hyderabadi Pearls'],
    festivals: ['Bathukamma (Floral festival)', 'Bonalu', 'Brahmotsavam at Tirumala', 'Ugadi', 'Deccan Festival'],
    cuisine: ['Hyderabadi Dum Biryani', 'Andhra Gongura Pachadi', 'Pesarattu Upma', 'Pootharekulu (Paper sweet)', 'Double Ka Meetha'],
    civilizationalSignificance: 'Amaravati Buddhist stupas, Satavahana & Kakatiya dynasties, Kakatiya Ramappa Temple stonecraft, and historic diamond trading center of the world.',
    popularHighlights: ['Hyderabadi Authentic Dum Biryani', 'Kuchipudi Expressive Footwork', 'Kalamkari Natural Dye Art', 'Charminar Minarets']
  },
  {
    id: 'madhya-pradesh-chhattisgarh',
    name: 'Madhya Pradesh & Chhattisgarh',
    hindiName: 'मध्य प्रदेश एवं छत्तीसगढ़ (Heart of India & Tribal Bastar)',
    region: 'Central',
    capital: 'Bhopal / Raipur',
    monuments: ['Sanchi Great Stupa (UNESCO)', 'Khajuraho Temples (UNESCO)', 'Bhimbetka Prehistoric Rock Shelters (UNESCO)', 'Gwalior Fort', 'Chitrakote Waterfalls'],
    danceAndMusic: ['Matki Dance', 'Gaur Maria Dance of Bastar', 'Pandwani Folk Ballad (Teejan Bai)', 'Saila Dance', 'Karma Dance'],
    artAndHandicrafts: ['Gond & Bhil Tribal Paintings', 'Chanderi & Maheshwari Silk Sarees', 'Bastar Dhokra Bell Metal', 'Bagh Hand Block Print', 'Bastar Wooden Crafts'],
    festivals: ['Khajuraho Dance Festival', 'Bastar Dussehra (75-day festival)', 'Tansen Music Festival Gwalior', 'Lokrang Bhopal', 'Bhagoria Festival'],
    cuisine: ['Poha Jalebi', 'Bhopali Gosht Korma', 'Dal Bafla', 'Bhutte Ka Kees', 'Chila & Fara of Chhattisgarh'],
    civilizationalSignificance: 'Prehistoric human origins at Bhimbetka (30,000 BCE), Ashoka’s Buddhist masterpiece at Sanchi, and timeless temple sculptures at Khajuraho.',
    popularHighlights: ['Sanchi Ashoka Gateway Toranas', 'Khajuraho Intricate Sculptures', 'Bastar Lost-Wax Dhokra Crafts', 'Tiger Reserves of Kanha & Bandhavgarh']
  },
  {
    id: 'assam-northeast',
    name: 'Assam & The North-East Seven Sisters',
    hindiName: 'असम एवं पूर्वोत्तर के सात राज्य (Land of the Rising Sun & Living Bridges)',
    region: 'North-East',
    capital: 'Guwahati/Dispur, Shillong, Imphal, Kohima, Aizawl, Agartala, Itanagar, Gangtok',
    monuments: ['Kamakhya Temple Guwahati', 'Rang Ghar & Kareng Ghar (Ahom Dynasty)', 'Living Root Bridges of Meghalaya', 'Tawang Buddhist Monastery', 'Ujjayanta Palace Tripura'],
    danceAndMusic: ['Bihu Dance of Assam', 'Sattriya (Classical Dance of Assam)', 'Manipuri Classical Raas Leela', 'Cheraw Bamboo Dance of Mizoram', 'Naga Warrior Dances'],
    artAndHandicrafts: ['Golden Muga & Eri Silk', 'Assamese Jaapi (Conical bamboo hat)', 'Naga Shawls with Clan motifs', 'Cane and Bamboo Furnishings', 'Manipur Black Pottery'],
    festivals: ['Rongali & Bhogali Bihu', 'Hornbill Festival (Nagaland)', 'Wangala Hundred Drums (Meghalaya)', 'Chapchar Kut (Mizoram)', 'Yaoshang (Manipur)', 'Ambubachi Mela'],
    cuisine: ['Khaar & Masor Tenga (Sour fish curry)', 'Smoked Pork with Bamboo Shoots (Nagaland)', 'Jadoh (Meghalaya)', 'Momos & Thukpa (Sikkim/Arunachal)', 'Black Rice Kheer (Chak-hao)'],
    civilizationalSignificance: 'Pragjyotisha & Kamarupa kingdoms mentioned in the Mahabharata, Srimanta Sankardev’s Neo-Vaishnavite renaissance (Sattras & Sattriya), and unbroken tribal environmental wisdom.',
    popularHighlights: ['Kaziranga One-Horned Rhinoceros', 'Assam Lush Emerald Tea Estates', 'Living Root Bridges', 'Hornbill Cultural Festival']
  }
];
