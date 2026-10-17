export interface CourseSentence {
  hindi: string;
  english: string;
  phonetic: string;
  hint?: string;
}

export interface DayReadingMaterial {
  title: string;
  hindiTitle: string;
  storyEn: string;
  storyHi: string;
  vocabWords: { word: string; meaning: string; phonetic: string }[];
}

export interface DayGame {
  type: "jumble" | "fill-blanks" | "quiz";
  questionHindi: string;
  promptEnglish: string;
  options?: string[];
  correctAnswer: string;
  scrambled?: string[];
  ruleHint?: string;
}

export interface DayCourseData {
  day: number;
  phaseId: number;
  phaseName: string;
  phaseHindi: string;
  title: string;
  hindiTitle: string;
  icon: string;
  summary: string;
  sentences: {
    easy: CourseSentence[];
    medium: CourseSentence[];
    hard: CourseSentence[];
  };
  reading: DayReadingMaterial;
  game: DayGame;
  targetStars: number;
}

export const COURSE_PHASES = [
  { id: 1, name: "Foundation & Phonics", hindi: "बुनियाद, ध्वनि और पहली मुलाकात", days: "Day 1–7", color: "from-amber-400 to-orange-500", icon: "🌱" },
  { id: 2, name: "Daily Routine & Actions", hindi: "दैनिक दिनचर्या और क्रिया शब्द", days: "Day 8–15", color: "from-emerald-400 to-teal-500", icon: "☀️" },
  { id: 3, name: "Questions & Curiosities", hindi: "सवाल पूछना और जिज्ञासाएं", days: "Day 16–22", color: "from-sky-400 to-blue-500", icon: "❓" },
  { id: 4, name: "Around Town & Nature", hindi: "आस-पास की दुनिया और प्रकृति", days: "Day 23–30", color: "from-indigo-400 to-purple-500", icon: "🌳" },
  { id: 5, name: "Fluency & Storytelling", hindi: "कहानियां और धाराप्रवाह बातचीत", days: "Day 31–38", color: "from-fuchsia-400 to-pink-500", icon: "✨" },
  { id: 6, name: "Master Speaker & Real World", hindi: "मास्टर स्पीकर और आत्मविश्वास", days: "Day 39–45", color: "from-rose-400 to-red-500", icon: "🎓" },
];

export const COURSE_45_DAYS: DayCourseData[] = [
  // ==========================================
  // PHASE 1: FOUNDATION & PHONICS (DAY 1 - 7)
  // ==========================================
  {
    day: 1,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "Hello & Self-Introduction",
    hindiTitle: "नमस्ते और मेरा परिचय",
    icon: "👋",
    summary: "Learn to say Hello, state your name, and ask someone how they are doing.",
    sentences: {
      easy: [
        { hindi: "नमस्ते! मेरा नाम रोहन है।", english: "Hello! My name is Rohan.", phonetic: "हेलो! माय नेम इज़ रोहन।" },
        { hindi: "आप कैसे हैं?", english: "How are you?", phonetic: "हाउ आर यू?" },
        { hindi: "मैं बहुत अच्छा हूँ।", english: "I am very good.", phonetic: "आई एम वेरी गुड।" },
      ],
      medium: [
        { hindi: "आपसे मिलकर बहुत खुशी हुई।", english: "It is very nice to meet you.", phonetic: "इट इज़ वेरी नाइस टू मीट यू।" },
        { hindi: "मैं सात साल का हूँ।", english: "I am seven years old.", phonetic: "आई एम सेवन इयर्स ओल्ड।" },
        { hindi: "मैं दिल्ली में रहता हूँ।", english: "I live in Delhi.", phonetic: "आई लिव इन दिल्ली।" },
      ],
      hard: [
        { hindi: "मुझे आपसे मिलकर बहुत खुशी हुई, आपका दिन शुभ हो!", english: "I am pleased to meet you, have a wonderful day!", phonetic: "आई एम प्लीज़्ड टू मीट यू, हैव अ वंडरफुल डे!" },
        { hindi: "मेरा पसंदीदा विषय चित्रकला और अंग्रेजी है।", english: "My favorite subjects are drawing and English.", phonetic: "माय फेवरिट सब्जेक्ट्स आर ड्रॉइंग एंड इंग्लिश।" },
      ],
    },
    reading: {
      title: "Rohan's First Day",
      hindiTitle: "रोहन का पहला दिन",
      storyEn: "Hello! My name is Rohan. I have a happy smile. Today I meet my new teacher. She says, 'Welcome Rohan!' I say, 'Thank you teacher!'",
      storyHi: "नमस्ते! मेरा नाम रोहन है। मेरे चेहरे पर एक प्यारी मुस्कान है। आज मैं अपनी नई शिक्षिका से मिला। उन्होंने कहा, 'स्वागत है रोहन!' मैंने कहा, 'धन्यवाद शिक्षिका!'",
      vocabWords: [
        { word: "Smile", meaning: "मुस्कान", phonetic: "स्माइल" },
        { word: "Teacher", meaning: "अध्यापक / शिक्षिका", phonetic: "टीचर" },
        { word: "Welcome", meaning: "स्वागत", phonetic: "वेलकम" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मेरा नाम रोहन है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["Rohan.", "name", "My", "is"],
      correctAnswer: "My name is Rohan.",
    },
    targetStars: 10,
  },
  {
    day: 2,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "My Family & Loved Ones",
    hindiTitle: "मेरा प्यारा परिवार",
    icon: "👨‍👩‍👧‍👦",
    summary: "Talk about your parents, brothers, sisters, and grandparents with love.",
    sentences: {
      easy: [
        { hindi: "यह मेरी माँ हैं।", english: "This is my mother.", phonetic: "दिस इज़ माय मदर।" },
        { hindi: "यह मेरे पिताजी हैं।", english: "This is my father.", phonetic: "दिस इज़ माय फादर।" },
        { hindi: "मुझे अपने परिवार से प्यार है।", english: "I love my family.", phonetic: "आई लव माय फैमिली।" },
      ],
      medium: [
        { hindi: "मेरी एक छोटी बहन है।", english: "I have a little sister.", phonetic: "आई हैव अ लिटिल सिस्टर।" },
        { hindi: "मेरे दादाजी मुझे कहानियां सुनाते हैं।", english: "My grandfather tells me stories.", phonetic: "माय ग्रैंडफादर टेल्स मी स्टोरीज़।" },
        { hindi: "हम सब साथ खाना खाते हैं।", english: "We all eat dinner together.", phonetic: "वी ऑल ईट डिनर टुगेदर।" },
      ],
      hard: [
        { hindi: "मेरे माता-पिता हमेशा मुझे अच्छी आदतें सिखाते हैं।", english: "My parents always teach me good habits.", phonetic: "माय पेरेंट्स ऑलवेज़ टीच मी गुड हैबिट्स।" },
        { hindi: "हमारा परिवार हर रविवार को पार्क में पिकनिक मनाता है।", english: "Our family enjoys a picnic in the park every Sunday.", phonetic: "आवर फैमिली एन्जॉयस अ पिकनिक इन द पार्क एव्री संडे।" },
      ],
    },
    reading: {
      title: "The Joyful House",
      hindiTitle: "खुशियों का घर",
      storyEn: "Simran lives in a cozy house. Her mother bakes tasty cookies. Her father reads colorful books. Her baby brother plays with a red toy truck.",
      storyHi: "सिमरन एक आरामदायक घर में रहती है। उसकी माँ स्वादिष्ट कुकीज बनाती हैं। उसके पिताजी रंगीन किताबें पढ़ते हैं। उसका छोटा भाई लाल खिलौने वाले ट्रक से खेलता है।",
      vocabWords: [
        { word: "Family", meaning: "परिवार", phonetic: "फैमिली" },
        { word: "Together", meaning: "एक साथ", phonetic: "टुगेदर" },
        { word: "Caring", meaning: "देखभाल करने वाला", phonetic: "केयरिंग" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मुझे अपने परिवार से प्यार है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["family.", "love", "my", "I"],
      correctAnswer: "I love my family.",
    },
    targetStars: 10,
  },
  {
    day: 3,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "Colors & Rainbow World",
    hindiTitle: "रंगों की सतरंगी दुनिया",
    icon: "🌈",
    summary: "Identify Red, Blue, Green, Yellow, and describe objects by color.",
    sentences: {
      easy: [
        { hindi: "सेब लाल है।", english: "The apple is red.", phonetic: "दि एप्पल इज़ रेड।" },
        { hindi: "आसमान नीला है।", english: "The sky is blue.", phonetic: "द स्काई इज़ ब्लू।" },
        { hindi: "घास हरी है।", english: "The grass is green.", phonetic: "द ग्रास इज़ ग्रीन।" },
      ],
      medium: [
        { hindi: "सूरज चमकता हुआ पीला है।", english: "The sun is bright yellow.", phonetic: "द सन इज़ ब्राइट येलो।" },
        { hindi: "मेरी पसंदीदा गेंद गुलाबी है।", english: "My favorite ball is pink.", phonetic: "माय फेवरिट बॉल इज़ पिंक।" },
        { hindi: "इंद्रधनुष में सात रंग होते हैं।", english: "A rainbow has seven colors.", phonetic: "अ रेनबो हैज़ सेवन कलर्स।" },
      ],
      hard: [
        { hindi: "मैंने आज बैंगनी तितली और नारंगी फूल देखे।", english: "I saw a purple butterfly and an orange flower today.", phonetic: "आई सॉ अ पर्पल बटरफ्लाई एंड एन ऑरेंज फ्लावर टुडे।" },
        { hindi: "क्या आप इस सुंदर सफेद कागज पर चित्र बना सकते हैं?", english: "Can you draw on this lovely white paper?", phonetic: "कैन यू ड्रॉ ऑन दिस लवली व्हाइट पेपर?" },
      ],
    },
    reading: {
      title: "The Magic Rainbow",
      hindiTitle: "जादुई इंद्रधनुष",
      storyEn: "After the rain stops, a big rainbow shines in the sky! It has red, orange, yellow, green, blue, indigo, and violet. Maya paints it with her brush.",
      storyHi: "बारिश रुकने के बाद आसमान में बड़ा सा इंद्रधनुष चमकता है! इसमें लाल, नारंगी, पीला, हरा, नीला, जामुनी और बैंगनी रंग हैं। माया इसे अपने ब्रश से रंगती है।",
      vocabWords: [
        { word: "Rainbow", meaning: "इंद्रधनुष", phonetic: "रेनबो" },
        { word: "Bright", meaning: "चमकीला", phonetic: "ब्राइट" },
        { word: "Paint", meaning: "रंगना / पेंट", phonetic: "पेंट" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "आसमान नीला है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["blue.", "sky", "The", "is"],
      correctAnswer: "The sky is blue.",
    },
    targetStars: 10,
  },
  {
    day: 4,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "Animals & Friendly Pets",
    hindiTitle: "प्यारे जानवर और पालतू",
    icon: "🐶",
    summary: "Recognize dogs, cats, lions, elephants, and their sounds.",
    sentences: {
      easy: [
        { hindi: "कुत्ता भौंकता है।", english: "The dog barks.", phonetic: "द डॉग बार्क्स।" },
        { hindi: "बिल्ली दूध पीती है।", english: "The cat drinks milk.", phonetic: "द कैट ड्रिंक्स मिल्क।" },
        { hindi: "हाथी बहुत बड़ा है।", english: "The elephant is big.", phonetic: "दि एलिफेंट इज़ बिग।" },
      ],
      medium: [
        { hindi: "शेर जंगल का राजा है।", english: "The lion is the king of the jungle.", phonetic: "द लायन इज़ द किंग ऑफ द जंगल।" },
        { hindi: "मेरे पास एक प्यारा सफेद खरगोश है।", english: "I have a cute white rabbit.", phonetic: "आई हैव अ क्यूट व्हाइट रैबिट।" },
        { hindi: "बंदर पेड़ पर कूदता है।", english: "The monkey jumps on the tree.", phonetic: "द मंकी जम्प्स ऑन द ट्री।" },
      ],
      hard: [
        { hindi: "डॉल्फिन समुद्र में खुशी से पानी में तैरती हैं।", english: "Dolphins swim gracefully in the ocean.", phonetic: "डॉल्फ़िन्स स्विम ग्रेसफुली इन दि ओशन।" },
        { hindi: "हमें सभी जानवरों के प्रति दयालु होना चाहिए।", english: "We should always be kind and gentle to animals.", phonetic: "वी शुड ऑलवेज़ बी काइंड एंड जेंटल टू एनिमल्स।" },
      ],
    },
    reading: {
      title: "Bruno The Puppy",
      hindiTitle: "ब्रूनो प्यारा पिल्ला",
      storyEn: "Bruno is a little brown puppy. He wags his tail when he is happy. He runs across the green garden to catch a yellow ball.",
      storyHi: "ब्रूनो एक छोटा भूरा पिल्ला है। जब वह खुश होता है तो अपनी पूंछ हिलाता है। वह पीली गेंद पकड़ने के लिए हरे बगीचे में दौड़ता है।",
      vocabWords: [
        { word: "Puppy", meaning: "पिल्ला", phonetic: "पपी" },
        { word: "Tail", meaning: "पूंछ", phonetic: "टेल" },
        { word: "Garden", meaning: "बगीचा", phonetic: "गार्डन" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कुत्ता भौंकता है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["barks.", "dog", "The"],
      correctAnswer: "The dog barks.",
    },
    targetStars: 10,
  },
  {
    day: 5,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "Numbers, Counting & Toys",
    hindiTitle: "गिनती और मेरे खिलौने",
    icon: "🔢",
    summary: "Count 1 to 20, count your toys, marbles, crayons, and blocks.",
    sentences: {
      easy: [
        { hindi: "मेरे पास एक गेंद है।", english: "I have one ball.", phonetic: "आई हैव वन बॉल।" },
        { hindi: "यहाँ तीन कारें हैं।", english: "There are three cars.", phonetic: "देयर आर थ्री कार्स।" },
        { hindi: "मेरे पास पांच पेंसिलें हैं।", english: "I have five pencils.", phonetic: "आई हैव फाइव पेंसिल्स।" },
      ],
      medium: [
        { hindi: "हम एक से दस तक गिन सकते हैं।", english: "We can count from one to ten.", phonetic: "वी कैन काउंट फ्रॉम वन टू टेन।" },
        { hindi: "मेरे डिब्बे में दस रंग-बिरंगे खिलौने हैं।", english: "There are ten colorful toys in my box.", phonetic: "देयर आर टेन कलरफुल टॉयज़ इन माय बॉक्स।" },
        { hindi: "मुझे बिल्डिंग ब्लॉक्स से खेलना पसंद है।", english: "I like to play with building blocks.", phonetic: "आई लाइक टू प्ले विथ बिल्डिंग ब्लॉक्स।" },
      ],
      hard: [
        { hindi: "मेरे दोस्त के पास बारह चमकती हुई कांच की गोलियां हैं।", english: "My friend has twelve shiny glass marbles.", phonetic: "माय फ्रेंड हैज़ ट्वेल्व शाइनी ग्लास मार्बल्स।" },
        { hindi: "यदि आप दो और तीन जोड़ते हैं, तो आपको पाँच मिलते हैं।", english: "If you add two and three, you get five.", phonetic: "इफ यू ऐड टू एंड थ्री, यू गेट फाइव।" },
      ],
    },
    reading: {
      title: "The Toy Kingdom",
      hindiTitle: "खिलौनों की नगरी",
      storyEn: "Karan opens his blue toy chest. He counts: one teddy bear, two fast cars, and three airplanes. He builds a tall castle with four wooden blocks.",
      storyHi: "करण अपना नीला खिलौने का संदूक खोलता है। वह गिनता है: एक टेडी बियर, दो तेज कारें और तीन हवाई जहाज। वह लकड़ी के चार ब्लॉकों से एक ऊंचा महल बनाता है।",
      vocabWords: [
        { word: "Count", meaning: "गिनना", phonetic: "काउंट" },
        { word: "Castle", meaning: "महल", phonetic: "कासल" },
        { word: "Blocks", meaning: "खिलौना ब्लॉक", phonetic: "ब्लॉक्स" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मेरे पास एक गेंद है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["one", "ball.", "have", "I"],
      correctAnswer: "I have one ball.",
    },
    targetStars: 10,
  },
  {
    day: 6,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "Yummy Food & Sweet Fruits",
    hindiTitle: "स्वादिष्ट फल और खाना",
    icon: "🍎",
    summary: "Express what you like to eat and drink: Mangoes, Apples, Milk, Bread.",
    sentences: {
      easy: [
        { hindi: "मुझे आम पसंद है।", english: "I like mangoes.", phonetic: "आई लाइक मैंगोज़।" },
        { hindi: "दूध मीठा है।", english: "Milk is sweet.", phonetic: "मिल्क इज़ स्वीट।" },
        { hindi: "केला पीला होता है।", english: "A banana is yellow.", phonetic: "अ बनाना इज़ येलो।" },
      ],
      medium: [
        { hindi: "रोज एक सेब खाना स्वास्थ्य के लिए अच्छा है।", english: "Eating an apple daily is good for health.", phonetic: "ईटिंग एन एप्पल डेली इज़ गुड फॉर हेल्थ।" },
        { hindi: "मेरी माँ स्वादिष्ट रोटियां बनाती हैं।", english: "My mother bakes delicious flatbreads.", phonetic: "माय मदर बेक्स डिलीशियस फ्लैटब्रेड्स।" },
        { hindi: "क्या मुझे थोड़ा पानी मिल सकता है?", english: "Can I please have some water?", phonetic: "कैन आई प्लीज हैव सम वाटर?" },
      ],
      hard: [
        { hindi: "ताजे फल और हरी सब्जियां हमें मजबूत और तेज बनाती हैं।", english: "Fresh fruits and leafy vegetables make us strong and sharp.", phonetic: "फ्रेश फ्रूट्स एंड लीफी वेजिटेबल्स मेक अस स्ट्रॉन्ग एंड शार्प।" },
        { hindi: "नाश्ते में मुझे गर्म दलिया और शहद खाना बहुत पसंद है।", english: "For breakfast, I truly enjoy warm porridge with honey.", phonetic: "फॉर ब्रेकफास्ट, आई ट्रूली एन्जॉय वॉर्म पॉरिज विथ हनी।" },
      ],
    },
    reading: {
      title: "The Mango Orchard",
      hindiTitle: "आम का बगीचा",
      storyEn: "Grandpa has a garden with ripe mango trees. The mangoes are sweet and juicy. Aryan plucks three mangoes and shares them with his sister.",
      storyHi: "दादाजी के पास पके आम के पेड़ों वाला एक बगीचा है। आम मीठे और रसीले हैं। आर्यन तीन आम तोड़ता है और अपनी बहन के साथ बांटता है।",
      vocabWords: [
        { word: "Juicy", meaning: "रसीला", phonetic: "जूसी" },
        { word: "Share", meaning: "बांटना", phonetic: "शेयर" },
        { word: "Healthy", meaning: "स्वस्थ", phonetic: "हेल्दी" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मुझे आम पसंद है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["mangoes.", "I", "like"],
      correctAnswer: "I like mangoes.",
    },
    targetStars: 10,
  },
  {
    day: 7,
    phaseId: 1,
    phaseName: "Foundation & Phonics",
    phaseHindi: "बुनियाद, ध्वनि और पहली मुलाकात",
    title: "Weekly Celebration & Star Quiz",
    hindiTitle: "सप्ताहिक उत्सव और स्टार क्विज",
    icon: "🌟",
    summary: "Celebrate completing Week 1! Revise greetings, colors, family, and pets.",
    sentences: {
      easy: [
        { hindi: "मैं अंग्रेजी सीख रहा हूँ।", english: "I am learning English.", phonetic: "आई एम लर्निंग इंग्लिश।" },
        { hindi: "यह बहुत मजेदार है!", english: "This is so much fun!", phonetic: "दिस इज़ सो मच फन!" },
        { hindi: "मेरे पास एक सोने का सितारा है।", english: "I have a gold star.", phonetic: "आई हैव अ गोल्ड स्टार।" },
      ],
      medium: [
        { hindi: "मैंने इस हफ्ते बहुत सारे नए शब्द सीखे।", english: "I learned many new words this week.", phonetic: "आई लर्न्ड मेनी न्यू वर्ड्स दिस वीक।" },
        { hindi: "मैं अपने दोस्तों के साथ अंग्रेजी बोल सकता हूँ।", english: "I can speak English with my friends.", phonetic: "आई कैन स्पीक इंग्लिश विथ माय फ्रेंड्स।" },
      ],
      hard: [
        { hindi: "सात दिन का अभ्यास करने के बाद मेरा आत्मविश्वास बहुत बढ़ गया है।", english: "After seven days of practice, my speaking confidence has grown.", phonetic: "आफ्टर सेवन डेज़ ऑफ प्रैक्टिस, माय स्पीकिंग कॉन्फिडेंस हैज़ ग्रोन।" },
      ],
    },
    reading: {
      title: "Chintu's Star Award",
      hindiTitle: "चिंटू का स्टार मेडल",
      storyEn: "Chintu the Wise Owl flaps his wings. 'Hooray!' he chirps. 'You finished your first 7 days! You earned the Bronze Star Badge. Keep shining!'",
      storyHi: "बुद्धिमान उल्लू चिंटू अपने पंख फड़फड़ाता है। 'हुर्रे!' वह चहकता है। 'आपने अपने पहले 7 दिन पूरे कर लिए! आपने ब्रॉन्ज स्टार बैज अर्जित किया है। चमकते रहो!'",
      vocabWords: [
        { word: "Confidence", meaning: "आत्मविश्वास", phonetic: "कॉन्फिडेंस" },
        { word: "Celebration", meaning: "उत्सव", phonetic: "सेलिब्रेशन" },
        { word: "Champion", meaning: "विजेता", phonetic: "चैंपियन" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "यह बहुत मजेदार है!",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["fun!", "is", "so", "much", "This"],
      correctAnswer: "This is so much fun!",
    },
    targetStars: 15,
  },

  // ==========================================
  // PHASE 2: DAILY ROUTINE & ACTIONS (DAY 8 - 15)
  // ==========================================
  {
    day: 8,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "Morning Routine & Sun Rise",
    hindiTitle: "सुबह उठना और तैयार होना",
    icon: "🌅",
    summary: "Talk about waking up early, brushing teeth, and taking a bath.",
    sentences: {
      easy: [
        { hindi: "सुप्रभात! मैं जाग गया हूँ।", english: "Good morning! I am awake.", phonetic: "गुड मॉर्निंग! आई एम अवेक।" },
        { hindi: "मैं अपने दांत साफ करता हूँ।", english: "I brush my teeth.", phonetic: "आई ब्रश माय टीथ।" },
        { hindi: "मैं नहाता हूँ।", english: "I take a bath.", phonetic: "आई टेक अ बाथ।" },
      ],
      medium: [
        { hindi: "मैं सुबह छह बजे उठता हूँ।", english: "I wake up at six in the morning.", phonetic: "आई वेक अप एट सिक्स इन द मॉर्निंग।" },
        { hindi: "मैं अपना साफ स्कूल यूनिफॉर्म पहनता हूँ।", english: "I wear my clean school uniform.", phonetic: "आई वेयर माय क्लीन स्कूल यूनिफॉर्म।" },
      ],
      hard: [
        { hindi: "सुबह की ताजी हवा में गहरी सांस लेना शरीर के लिए बहुत अच्छा होता है।", english: "Taking deep breaths in the fresh morning air refreshes my mind.", phonetic: "टेकिंग डीप ब्रेथ्स इन द फ्रेश मॉर्निंग एयर रिफ्रेशेस माय माइंड।" },
      ],
    },
    reading: {
      title: "Anu's Bright Morning",
      hindiTitle: "अनु की सुनहरी सुबह",
      storyEn: "The rooster crows, 'Cock-a-doodle-doo!' Anu jumps out of bed. She washes her face with cool water and combs her shiny hair.",
      storyHi: "मुर्गा बांग देता है! अनु बिस्तर से छलांग लगाती है। वह ठंडे पानी से अपना चेहरा धोती है और अपने चमकदार बालों में कंघी करती है।",
      vocabWords: [
        { word: "Awake", meaning: "जागा हुआ", phonetic: "अवेक" },
        { word: "Brush", meaning: "ब्रश करना", phonetic: "ब्रश" },
        { word: "Uniform", meaning: "वर्दी", phonetic: "यूनिफॉर्म" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मैं अपने दांत साफ करता हूँ।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["my", "I", "brush", "teeth."],
      correctAnswer: "I brush my teeth.",
    },
    targetStars: 10,
  },
  {
    day: 9,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "Action Verbs: Run, Jump, Play",
    hindiTitle: "खेल-कूद और क्रिया शब्द",
    icon: "🏃",
    summary: "Master action words: Walk, Run, Jump, Dance, Sing, Laugh.",
    sentences: {
      easy: [
        { hindi: "मैं तेज दौड़ता हूँ।", english: "I run fast.", phonetic: "आई रन फास्ट।" },
        { hindi: "हम खुशी से गाते हैं।", english: "We sing happily.", phonetic: "वी सिंग हैपिली।" },
        { hindi: "वह ऊंची छलांग लगाती है।", english: "She jumps high.", phonetic: "शी जम्प्स हाई।" },
      ],
      medium: [
        { hindi: "बच्चे मैदान में फुटबॉल खेल रहे हैं।", english: "Children are playing football in the field.", phonetic: "चिल्ड्रन आर प्लेइंग फुटबॉल इन द फील्ड।" },
        { hindi: "चलो सब मिलकर एक मजेदार गाना गाते हैं।", english: "Let us sing a joyful song together.", phonetic: "लेट अस सिंग अ जॉयफुल सॉन्ग टुगेदर।" },
      ],
      hard: [
        { hindi: "शाम को पार्क में दौड़ने और झूला झूलने से मैं तरोताजा महसूस करता हूँ।", english: "Running and swinging in the park makes me feel totally energized.", phonetic: "रनिंग एंड स्विंगिंग इन द पार्क मेक्स मी फील टोटली एनर्जाइज्ड।" },
      ],
    },
    reading: {
      title: "Playground Heroes",
      hindiTitle: "खेल के मैदान के हीरो",
      storyEn: "The school bell rings. Tinku runs to the playground. Ravi kicks the black and white football. Sonal skips rope with a happy cheer.",
      storyHi: "स्कूल की घंटी बजती है। टिंकू खेल के मैदान की ओर दौड़ता है। रवि काली और सफेद फुटबॉल को किक मारता है। सोनल खुशी से रस्सी कूदती है।",
      vocabWords: [
        { word: "Jump", meaning: "कूदना", phonetic: "जम्प" },
        { word: "Cheer", meaning: "उत्साह / जयकार", phonetic: "चीयर" },
        { word: "Playground", meaning: "खेल का मैदान", phonetic: "प्लेग्राउंड" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मैं तेज दौड़ता हूँ।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["fast.", "run", "I"],
      correctAnswer: "I run fast.",
    },
    targetStars: 10,
  },
  {
    day: 10,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "My School & Classmates",
    hindiTitle: "मेरा स्कूल और प्यारे दोस्त",
    icon: "🏫",
    summary: "Express your classroom experience, friends, teacher, and blackboard.",
    sentences: {
      easy: [
        { hindi: "यह मेरा स्कूल है।", english: "This is my school.", phonetic: "दिस इज़ माय स्कूल।" },
        { hindi: "मेरी कक्षा बड़ी है।", english: "My classroom is big.", phonetic: "माय क्लासरूम इज़ बिग।" },
        { hindi: "वह मेरा सबसे अच्छा दोस्त है।", english: "He is my best friend.", phonetic: "ही इज़ माय बेस्ट फ्रेंड।" },
      ],
      medium: [
        { hindi: "हमारी शिक्षिका श्यामपट्ट पर लिखती हैं।", english: "Our teacher writes on the blackboard.", phonetic: "आवर टीचर राइट्स ऑन द ब्लैकबोर्ड।" },
        { hindi: "हम लंच ब्रेक में अपना खाना बांटते हैं।", english: "We share our lunch during the break.", phonetic: "वी शेयर आवर लंच ड्यूरिंग द ब्रेक।" },
      ],
      hard: [
        { hindi: "स्कूल एक ऐसी जगह है जहाँ हम ज्ञान प्राप्त करते हैं और अच्छे नागरिक बनते हैं।", english: "School is a wonderful place where we gain wisdom and build friendships.", phonetic: "स्कूल इज़ अ वंडरफुल प्लेस वेयर वी गेन विजडम एंड बिल्ड फ्रेंडशिप्स।" },
      ],
    },
    reading: {
      title: "The Friendly Classroom",
      hindiTitle: "मित्रवत कक्षा",
      storyEn: "Room number 4 is full of laughter. Colorful drawings hang on the wall. Miss Sharma teaches everyone how to spell 'Butterfly'.",
      storyHi: "कमरा नंबर 4 हंसी से भरा है। दीवार पर रंग-बिरंगे चित्र लटके हैं। मिस शर्मा सभी को 'बटरफ्लाई' की स्पेलिंग सिखाती हैं।",
      vocabWords: [
        { word: "Classroom", meaning: "कक्षा", phonetic: "क्लासरूम" },
        { word: "Friendship", meaning: "दोस्ती", phonetic: "फ्रेंडशिप" },
        { word: "Learn", meaning: "सीखना", phonetic: "लर्न" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "यह मेरा स्कूल है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["school.", "my", "is", "This"],
      correctAnswer: "This is my school.",
    },
    targetStars: 10,
  },
  {
    day: 11,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "School Bag & Magic Stationery",
    hindiTitle: "मेरा बस्ता और जादुई सामान",
    icon: "🎒",
    summary: "Name your pencil, eraser, sharpener, ruler, water bottle, and books.",
    sentences: {
      easy: [
        { hindi: "यह मेरी पेंसिल है।", english: "This is my pencil.", phonetic: "दिस इज़ माय पेंसिल।" },
        { hindi: "कृपया मुझे रबड़ दें।", english: "Please give me the eraser.", phonetic: "प्लीज गिव मी दि इरेज़र।" },
        { hindi: "मेरी पानी की बोतल नीली है।", english: "My water bottle is blue.", phonetic: "माय वाटर बॉटल इज़ ब्लू।" },
      ],
      medium: [
        { hindi: "मैं अपनी पेंसिल को कटर से छील रहा हूँ।", english: "I am sharpening my pencil.", phonetic: "आई एम शार्पनिंग माय पेंसिल।" },
        { hindi: "मेरे बस्ते में चार नोटबुक हैं।", english: "I have four notebooks in my bag.", phonetic: "आई हैव फोर नोटबुक्स इन माय बैग।" },
      ],
      hard: [
        { hindi: "सीधी रेखा खींचने के लिए मैं हमेशा अपने प्लास्टिक स्केल का उपयोग करता हूँ।", english: "I always use my transparent ruler to draw neat straight lines.", phonetic: "आई ऑलवेज़ यूज़ माय ट्रांसपेरेंट रूलर टू ड्रॉ नीट स्ट्रेट लाइन्स।" },
      ],
    },
    reading: {
      title: "The Lost Pencil Case",
      hindiTitle: "खोया हुआ पेंसिल बॉक्स",
      storyEn: "Varun looked under his desk. 'Where is my pencil box?' he asked. Meera smiled and said, 'It is right here on the shelf!'",
      storyHi: "वरुण ने अपनी डेस्क के नीचे देखा। 'मेरा पेंसिल बॉक्स कहाँ है?' उसने पूछा। मीरा मुस्कुराई और बोली, 'यह यहीं शेल्फ पर है!'",
      vocabWords: [
        { word: "Pencil", meaning: "पेंसिल", phonetic: "पेंसिल" },
        { word: "Eraser", meaning: "रबड़", phonetic: "इरेज़र" },
        { word: "Sharpener", meaning: "कटर / शार्पनर", phonetic: "शार्पनर" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "यह मेरी पेंसिल है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["pencil.", "my", "is", "This"],
      correctAnswer: "This is my pencil.",
    },
    targetStars: 10,
  },
  {
    day: 12,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "Magic Words: Please, Thank You, Sorry",
    hindiTitle: "जादुई विनम्र शब्द",
    icon: "🪄",
    summary: "Polite manners: Please, Thank You, Excuse Me, You Are Welcome, Sorry.",
    sentences: {
      easy: [
        { hindi: "कृपया मेरी मदद करें।", english: "Please help me.", phonetic: "प्लीज हेल्प मी।" },
        { hindi: "आपका बहुत धन्यवाद।", english: "Thank you very much.", phonetic: "थैंक यू वेरी मच।" },
        { hindi: "मुझे माफ कर दीजिए।", english: "I am so sorry.", phonetic: "आई एम सो सॉरी।" },
      ],
      medium: [
        { hindi: "माफ कीजिए, क्या मैं अंदर आ सकता हूँ?", english: "Excuse me, may I come in?", phonetic: "एक्सक्यूज़ मी, मे आई कम इन?" },
        { hindi: "आपका स्वागत है, कोई बात नहीं।", english: "You are welcome, no problem at all.", phonetic: "यू आर वेलकम, नो प्रॉब्लम एट ऑल।" },
      ],
      hard: [
        { hindi: "जादुई शब्द बोलने से हर किसी का दिन खुशियों से भर जाता है।", english: "Using courteous words brightens everyone's mood instantly.", phonetic: "यूज़िंग कर्टियस वर्ड्स ब्राइटेन्स एव्रीवन्स मूड इंस्टेंटली।" },
      ],
    },
    reading: {
      title: "The Polite Squirrel",
      hindiTitle: "विनम्र गिलहरी",
      storyEn: "Nutty the squirrel drops an acorn. Bunny rabbit picks it up. Nutty says, 'Thank you, kind Bunny!' Bunny smiles, 'You are welcome!'",
      storyHi: "नटी गिलहरी का फल गिर जाता है। बन्नी खरगोश उसे उठाता है। नटी कहती है, 'धन्यवाद प्यारे बन्नी!' बन्नी मुस्कुराता है, 'आपका स्वागत है!'",
      vocabWords: [
        { word: "Polite", meaning: "विनम्र", phonetic: "पोलाइट" },
        { word: "Pardon", meaning: "माफ कीजिए", phonetic: "पार्डन" },
        { word: "Kindness", meaning: "दयालुता", phonetic: "काइंडनेस" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कृपया मेरी मदद करें।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["me.", "help", "Please"],
      correctAnswer: "Please help me.",
    },
    targetStars: 10,
  },
  {
    day: 13,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "Body Parts & Healthy Habits",
    hindiTitle: "शरीर के अंग और अच्छी आदतें",
    icon: "💪",
    summary: "Head, Eyes, Ears, Nose, Mouth, Hands, Legs, and washing hands cleanly.",
    sentences: {
      easy: [
        { hindi: "मैं अपनी आँखों से देखता हूँ।", english: "I see with my eyes.", phonetic: "आई सी विथ माय आइज़।" },
        { hindi: "मैं अपने कानों से सुनता हूँ।", english: "I hear with my ears.", phonetic: "आई हियर विथ माय इयर्स।" },
        { hindi: "अपने हाथ साबुन से धोएं।", english: "Wash your hands with soap.", phonetic: "वॉश योर हैंड्स विथ सोप।" },
      ],
      medium: [
        { hindi: "खाना खाने से पहले हाथ धोना एक अच्छी आदत है।", english: "Washing hands before meals is a healthy habit.", phonetic: "वॉशिंग हैंड्स बिफोर मील्स इज़ अ हेल्दी हैबिट।" },
        { hindi: "मैं अपने पैरों से तेज चल सकता हूँ।", english: "I can walk swiftly with my legs.", phonetic: "आई कैन वॉक स्विफ्टली विथ माय लेग्स।" },
      ],
      hard: [
        { hindi: "प्रतिदिन व्यायाम करने से हमारी मांसपेशियां और हड्डियां मजबूत बनती हैं।", english: "Exercising every morning keeps our bones and muscles energized.", phonetic: "एक्सरसाइजिंग एव्री मॉर्निंग कीप्स आवर बोन्स एंड मसल्स एनर्जाइज्ड।" },
      ],
    },
    reading: {
      title: "Healthy Little Leo",
      hindiTitle: "तंदुरुस्त लियो",
      storyEn: "Leo touches his toes, stretches his arms, and claps his hands. He drinks a glass of warm milk every evening to stay strong.",
      storyHi: "लियो अपने पंजों को छूता है, अपनी बाहें फैलाता है और ताली बजाता है। वह हर शाम गर्म दूध पीता है ताकि वह बलवान रहे।",
      vocabWords: [
        { word: "Hands", meaning: "हाथ", phonetic: "हैंड्स" },
        { word: "Bones", meaning: "हड्डियां", phonetic: "बोन्स" },
        { word: "Stretch", meaning: "खिंचाव करना", phonetic: "स्ट्रेच" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मैं अपनी आँखों से देखता हूँ।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["eyes.", "see", "with", "my", "I"],
      correctAnswer: "I see with my eyes.",
    },
    targetStars: 10,
  },
  {
    day: 14,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "Feelings & Emotions",
    hindiTitle: "भावनाएं और मिजाज",
    icon: "😊",
    summary: "Express Happy, Sad, Excited, Sleepy, Surprised, and Calm.",
    sentences: {
      easy: [
        { hindi: "मैं आज बहुत खुश हूँ।", english: "I am very happy today.", phonetic: "आई एम वेरी हैप्पी टुडे।" },
        { hindi: "वह थोड़ा उदास महसूस कर रहा है।", english: "He is feeling a little sad.", phonetic: "ही इज़ फीलिंग अ लिटिल सैड।" },
        { hindi: "मुझे नींद आ रही है।", english: "I am feeling sleepy.", phonetic: "आई एम फीलिंग स्लीपी।" },
      ],
      medium: [
        { hindi: "मैं चिड़ियाघर जाने के लिए बहुत उत्साहित हूँ!", english: "I am super excited to visit the zoo!", phonetic: "आई एम सुपर एक्साइटेड टू विज़िट द ज़ू!" },
        { hindi: "जब मेरा दोस्त मुस्कुराता है, तो मैं भी मुस्कुराता हूँ।", english: "When my friend smiles, it makes me smile too.", phonetic: "व्हेन माय फ्रेंड स्माइल्स, इट मेक्स मी स्माइल टू।" },
      ],
      hard: [
        { hindi: "जब भी आपको गुस्सा आए, तो दस तक गिनती गिनें और शांत हो जाएं।", english: "Whenever you feel angry, count slowly to ten and breathe deeply.", phonetic: "व्हेनएवर यू फील एंग्री, काउंट स्लोली टू टेन एंड ब्रीथ डीपली।" },
      ],
    },
    reading: {
      title: "The Golden Balloon",
      hindiTitle: "सुनहरा गुब्बारा",
      storyEn: "Maya lost her yellow balloon and felt sad. But her brother shared his purple kite. Maya clapped with joy and felt super happy again!",
      storyHi: "माया का पीला गुब्बारा छूट गया और वह उदास हो गई। लेकिन उसके भाई ने अपनी बैंगनी पतंग साझा की। माया खुशी से उछल पड़ी और फिर से खुश हो गई!",
      vocabWords: [
        { word: "Happy", meaning: "खुश", phonetic: "हैप्पी" },
        { word: "Excited", meaning: "उत्साहित", phonetic: "एक्साइटेड" },
        { word: "Gentle", meaning: "शांत व कोमल", phonetic: "जेंटल" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मैं आज बहुत खुश हूँ।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["happy", "today.", "am", "very", "I"],
      correctAnswer: "I am very happy today.",
    },
    targetStars: 10,
  },
  {
    day: 15,
    phaseId: 2,
    phaseName: "Daily Routine & Actions",
    phaseHindi: "दैनिक दिनचर्या और क्रिया शब्द",
    title: "15-Day Milestone Champion",
    hindiTitle: "15 दिन का मील का पत्थर और पदक",
    icon: "🏅",
    summary: "Grand review of Routines, Actions, Manners, and Feelings. Silver Star Medal!",
    sentences: {
      easy: [
        { hindi: "मैंने पंद्रह दिन पूरे कर लिए!", english: "I completed fifteen days!", phonetic: "आई कम्प्लीटेड फिफ्टीन डेज़!" },
        { hindi: "मैं अब अंग्रेजी बोल सकता हूँ।", english: "I can speak English now.", phonetic: "आई कैन स्पीक इंग्लिश नाउ।" },
        { hindi: "मुझ पर गर्व करो!", english: "Be proud of me!", phonetic: "बी प्राउड ऑफ मी!" },
      ],
      medium: [
        { hindi: "मैं हर दिन अभ्यास करता हूँ और बेहतर बनता हूँ।", english: "I practice daily and become better every single day.", phonetic: "आई प्रैक्टिस डेली एंड बिकम बेटर एव्री सिंगल डे।" },
      ],
      hard: [
        { hindi: "पंद्रह दिनों की निरंतर मेहनत से मैंने साबित कर दिया कि सीखना कितना आसान है।", english: "With fifteen days of consistency, I proved that learning English is exciting.", phonetic: "विथ फिफ्टीन डेज़ ऑफ कंसिस्टेंसी, आई प्रूव्ड दैट लर्निंग इंग्लिश इज़ एक्साइटिंग।" },
      ],
    },
    reading: {
      title: "Silver Medal for Chintu's Friend",
      hindiTitle: "चांदी का पदक",
      storyEn: "Chintu the Owl lands on the branch with a shiny Silver Medal. 'You reached Day 15! You can say so many full English sentences! Proud of you!'",
      storyHi: "चिंटू उल्लू एक चमकदार चांदी के पदक के साथ डाल पर उतरता है। 'आप 15वें दिन पहुंच गए! अब आप कई पूरे अंग्रेजी वाक्य बोल सकते हैं! गर्व है आप पर!'",
      vocabWords: [
        { word: "Milestone", meaning: "मील का पत्थर", phonetic: "माइलस्टोन" },
        { word: "Proud", meaning: "गर्व", phonetic: "प्राउड" },
        { word: "Achieve", meaning: "हासिल करना", phonetic: "अचीव" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मैं अब अंग्रेजी बोल सकता हूँ।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["English", "can", "speak", "now.", "I"],
      correctAnswer: "I can speak English now.",
    },
    targetStars: 20,
  },

  // ==========================================
  // PHASE 3: QUESTIONS & CURIOSITIES (DAY 16 - 22)
  // ==========================================
  {
    day: 16,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Asking 'What' & 'Who'",
    hindiTitle: "क्या और कौन पूछना",
    icon: "🔍",
    summary: "Ask 'What is this?', 'What is your name?', 'Who is at the door?'",
    sentences: {
      easy: [
        { hindi: "यह क्या है?", english: "What is this?", phonetic: "व्हाट इज़ दिस?" },
        { hindi: "वह कौन है?", english: "Who is that?", phonetic: "हू इज़ दैट?" },
        { hindi: "आपका नाम क्या है?", english: "What is your name?", phonetic: "व्हाट इज़ योर नेम?" },
      ],
      medium: [
        { hindi: "दरवाजे पर कौन खटखटा रहा है?", english: "Who is knocking at the door?", phonetic: "हू इज़ नॉकिंग एट द डोर?" },
        { hindi: "आपके बस्ते के अंदर क्या रखा है?", english: "What is kept inside your school bag?", phonetic: "व्हाट इज़ केप्ट इनसाइड योर स्कूल बैग?" },
      ],
      hard: [
        { hindi: "इस दिलचस्प कहानी का मुख्य नायक कौन है?", english: "Who is the main hero of this captivating adventure story?", phonetic: "हू इज़ द मेन हीरो ऑफ दिस कैप्टिवेटिंग एडवेंचर स्टोरी?" },
      ],
    },
    reading: {
      title: "Who Is Hiding in the Box?",
      hindiTitle: "डिब्बे में कौन छिपा है?",
      storyEn: "'What is that sound?' asks Priya. 'Meow!' comes a soft voice. Priya opens the basket. 'Oh! It is a tiny white kitten!'",
      storyHi: "'वह आवाज कैसी है?' प्रिया पूछती है। 'म्याऊं!' एक धीमी आवाज आती है। प्रिया टोकरी खोलती है। 'अरे! यह तो एक छोटी सफेद बिल्ली का बच्चा है!'",
      vocabWords: [
        { word: "Knock", meaning: "खटखटाना", phonetic: "नॉक" },
        { word: "Kitten", meaning: "बिल्ली का बच्चा", phonetic: "किटन" },
        { word: "Curious", meaning: "जिज्ञासु", phonetic: "क्यूरियस" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "यह क्या है?",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["this?", "is", "What"],
      correctAnswer: "What is this?",
    },
    targetStars: 10,
  },
  {
    day: 17,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Asking 'Where' & Locations",
    hindiTitle: "कहाँ और स्थान पूछना",
    icon: "🗺️",
    summary: "Where is my book? Where do you live? Where are you going?",
    sentences: {
      easy: [
        { hindi: "मेरी किताब कहाँ है?", english: "Where is my book?", phonetic: "वेयर इज़ माय बुक?" },
        { hindi: "आप कहाँ जा रहे हैं?", english: "Where are you going?", phonetic: "वेयर आर यू गोइंग?" },
        { hindi: "आप कहाँ रहते हैं?", english: "Where do you live?", phonetic: "वेयर डू यू लिव?" },
      ],
      medium: [
        { hindi: "मेरी गेंद सोफे के नीचे है।", english: "My ball is under the sofa.", phonetic: "माय बॉल इज़ अंडर द सोफा।" },
        { hindi: "किताबें मेज के ऊपर रखी हैं।", english: "The books are kept on the table.", phonetic: "द बुक्स आर केप्ट ऑन द टेबल।" },
      ],
      hard: [
        { hindi: "क्या आप मुझे बता सकते हैं कि निकटतम पुस्तकालय कहाँ स्थित है?", english: "Could you kindly guide me to where the children's library is?", phonetic: "कुड यू काइंडली गाइड मी टू वेयर द चिल्ड्रन्स लाइब्रेरी इज़?" },
      ],
    },
    reading: {
      title: "Where Did Tommy Go?",
      hindiTitle: "टॉमी कहाँ चला गया?",
      storyEn: "Sam looked under the bed. No Tommy. He checked behind the door. No Tommy. Suddenly, he looked into the sunny garden. Tommy was resting under the mango tree!",
      storyHi: "सैम ने बिस्तर के नीचे देखा। टॉमी नहीं था। उसने दरवाजे के पीछे देखा। टॉमी नहीं था। अचानक उसने धूप वाले बगीचे में देखा। टॉमी आम के पेड़ के नीचे आराम कर रहा था!",
      vocabWords: [
        { word: "Where", meaning: "कहाँ", phonetic: "वेयर" },
        { word: "Behind", meaning: "पीछे", phonetic: "बिहाइंड" },
        { word: "Under", meaning: "नीचे", phonetic: "अंडर" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मेरी किताब कहाँ है?",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["book?", "Where", "is", "my"],
      correctAnswer: "Where is my book?",
    },
    targetStars: 10,
  },
  {
    day: 18,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Asking 'Why' & Curiosity",
    hindiTitle: "क्यों और कारण पूछना",
    icon: "💡",
    summary: "Why is the sky blue? Why are you laughing? Because it is funny!",
    sentences: {
      easy: [
        { hindi: "आप क्यों हंस रहे हैं?", english: "Why are you laughing?", phonetic: "व्हाई आर यू लाफिंग?" },
        { hindi: "क्योंकि यह बहुत मजेदार है!", english: "Because it is very funny!", phonetic: "बिकॉज इट इज़ वेरी फनी!" },
        { hindi: "आप देर से क्यों आए?", english: "Why are you late?", phonetic: "व्हाई आर यू लेट?" },
      ],
      medium: [
        { hindi: "आसमान दिन में नीला क्यों दिखाई देता है?", english: "Why does the daytime sky appear so blue?", phonetic: "व्हाई डज़ द डे-टाइम स्काई अपीयर सो ब्लू?" },
        { hindi: "पौधों को बड़ा होने के लिए पानी की जरूरत क्यों होती है?", english: "Why do plants need clean water to grow tall?", phonetic: "व्हाई डू प्लांट्स नीड क्लीन वाटर टू ग्रो टॉल?" },
      ],
      hard: [
        { hindi: "जिज्ञासु बच्चे हमेशा सवाल पूछते हैं क्योंकि वे दुनिया को समझना चाहते हैं।", english: "Curious children ask 'Why' because they want to explore the universe.", phonetic: "क्यूरियस चिल्ड्रन आस्क 'व्हाई' बिकॉज दे वॉन्ट टू एक्सप्लोर द यूनिवर्स।" },
      ],
    },
    reading: {
      title: "The Curious Boy",
      hindiTitle: "जिज्ञासु बालक",
      storyEn: "'Why do birds sing?' asks Kabir. His grandmother smiles, 'Because they are greeting the bright morning sun!' Kabir laughs with joy.",
      storyHi: "'पक्षी क्यों गाते हैं?' कबीर पूछता है। उसकी दादी मुस्कुराती हैं, 'क्योंकि वे सुबह के चमकीले सूरज का स्वागत कर रहे हैं!' कबीर खुशी से हंसता है।",
      vocabWords: [
        { word: "Because", meaning: "क्योंकि", phonetic: "बिकॉज" },
        { word: "Reason", meaning: "कारण", phonetic: "रीजन" },
        { word: "Explore", meaning: "खोज करना", phonetic: "एक्सप्लोर" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "आप क्यों हंस रहे हैं?",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["laughing?", "Why", "are", "you"],
      correctAnswer: "Why are you laughing?",
    },
    targetStars: 10,
  },
  {
    day: 19,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Time, Clock & Days of the Week",
    hindiTitle: "समय, घड़ी और सप्ताह के दिन",
    icon: "⏰",
    summary: "Tell the time: What time is it? Monday to Sunday, morning, noon, evening.",
    sentences: {
      easy: [
        { hindi: "क्या समय हुआ है?", english: "What time is it?", phonetic: "व्हाट टाइम इज़ इट?" },
        { hindi: "अभी पांच बजे हैं।", english: "It is five o'clock.", phonetic: "इट इज़ फाइव ओ'क्लॉक।" },
        { hindi: "आज रविवार है।", english: "Today is Sunday.", phonetic: "टुडे इज़ संडे।" },
      ],
      medium: [
        { hindi: "सप्ताह में सात दिन होते हैं।", english: "There are seven days in a week.", phonetic: "देयर आर सेवन डेज़ इन अ वीक।" },
        { hindi: "मैं शाम को पांच बजे खेलने जाता हूँ।", english: "I go out to play at five in the evening.", phonetic: "आई गो आउट टू प्ले एट फाइव इन दि इवनिंग।" },
      ],
      hard: [
        { hindi: "समय बहुत कीमती है, इसलिए हमें अपना काम समय पर पूरा करना चाहिए।", english: "Time is extremely precious, so we should always be punctual and organized.", phonetic: "टाइम इज़ एक्सट्रीमली प्रेशियस, सो वी शुड ऑलवेज़ बी पंक्चुअल एंड ऑर्गनाइज्ड।" },
      ],
    },
    reading: {
      title: "Tick-Tock Clock",
      hindiTitle: "टिक-टिक घड़ी",
      storyEn: "The big wall clock goes tick-tock, tick-tock. The small hand points to seven. The long hand points to twelve. It is breakfast time!",
      storyHi: "दीवार की बड़ी घड़ी टिक-टिक, टिक-टिक करती है। छोटी सुई सात पर है। बड़ी सुई बारह पर है। यह नाश्ते का समय है!",
      vocabWords: [
        { word: "Clock", meaning: "घड़ी", phonetic: "क्लॉक" },
        { word: "Punctual", meaning: "समयनिष्ठ", phonetic: "पंक्चुअल" },
        { word: "Morning", meaning: "सुबह", phonetic: "मॉर्निंग" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "क्या समय हुआ है?",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["it?", "time", "What", "is"],
      correctAnswer: "What time is it?",
    },
    targetStars: 10,
  },
  {
    day: 20,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Weather & Seasons",
    hindiTitle: "मौसम और सुंदर ऋतुएँ",
    icon: "⛅",
    summary: "Sunny, Rainy, Cold, Windy. Summer, Winter, Monsoon, Spring.",
    sentences: {
      easy: [
        { hindi: "आज धूप खिली हुई है।", english: "It is sunny today.", phonetic: "इट इज़ सनी टुडे।" },
        { hindi: "बाहर बारिश हो रही है।", english: "It is raining outside.", phonetic: "इट इज़ रेनिंग आउटसाइड।" },
        { hindi: "आज बहुत ठंड है।", english: "It is very cold today.", phonetic: "इट इज़ वेरी कोल्ड टुडे।" },
      ],
      medium: [
        { hindi: "कृपया अपनी छतरी साथ ले जाएं।", english: "Please carry your umbrella with you.", phonetic: "प्लीज कैरी योर अम्ब्रेला विथ यू।" },
        { hindi: "वसंत ऋतु में चारों ओर सुंदर फूल खिलते हैं।", english: "Colorful flowers blossom everywhere during spring.", phonetic: "कलरफुल फ्लावर्स ब्लॉसम एव्रीव्हेयर ड्यूरिंग स्प्रिंग।" },
      ],
      hard: [
        { hindi: "काले बादलों की गड़गड़ाहट के बाद ठंडी हवाओं का चलना मौसम को सुहावना बनाता है।", english: "Gentle breezes following the thunder make the monsoon afternoon delightful.", phonetic: "जेंटल ब्रीज़ेस फॉलोइंग द थंडर मेक द मॉनसून आफ्टरनून डिलाइटफुल।" },
      ],
    },
    reading: {
      title: "Splashing in Puddles",
      hindiTitle: "पानी के गड्ढों में छप-छप",
      storyEn: "Pitter-patter falls the rain! Tina wears her bright yellow raincoat and red gumboots. She splashes gently in the clean puddle with a giggling laugh.",
      storyHi: "टिप-टिप बारिश गिरती है! टीना अपना पीला रेनकोट और लाल जूते पहनती है। वह खिलखिलाते हुए साफ पानी के गड्ढे में छप-छप करती है।",
      vocabWords: [
        { word: "Umbrella", meaning: "छतरी", phonetic: "अम्ब्रेला" },
        { word: "Breeze", meaning: "मंद हवा", phonetic: "ब्रीज़" },
        { word: "Monsoon", meaning: "बरसात", phonetic: "मॉनसून" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "आज धूप खिली हुई है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["sunny", "is", "today.", "It"],
      correctAnswer: "It is sunny today.",
    },
    targetStars: 10,
  },
  {
    day: 21,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Clothes & Dressing Up",
    hindiTitle: "पोशाक और कपड़े",
    icon: "👕",
    summary: "Shirt, Pants, Dress, Shoes, Socks, Hat, Scarf, Jacket.",
    sentences: {
      easy: [
        { hindi: "मेरी नई शर्ट नीली है।", english: "My new shirt is blue.", phonetic: "माय न्यू शर्ट इज़ ब्लू।" },
        { hindi: "अपने जूते पहनें।", english: "Put on your shoes.", phonetic: "पुट ऑन योर शूज़।" },
        { hindi: "मुझे यह टोपी पसंद है।", english: "I like this hat.", phonetic: "आई लाइक दिस हैट।" },
      ],
      medium: [
        { hindi: "मैं सर्दियों में गर्म ऊनी स्वेटर पहनता हूँ।", english: "I wear a warm woolen sweater in winter.", phonetic: "आई वेयर अ वॉर्म वूलन स्वेटर इन विंटर।" },
        { hindi: "स्कूल जाने से पहले अपने जूतों के फीते बांध लें।", english: "Tie your shoelaces properly before heading to school.", phonetic: "टाई योर शूलेसिस प्रॉपर्ली बिफोर हेडिंग टू स्कूल।" },
      ],
      hard: [
        { hindi: "साफ और इस्त्री किए हुए कपड़े पहनने से हमारा व्यक्तित्व आकर्षक दिखता है।", english: "Wearing neat and well-ironed clothes gives a smart impression everywhere.", phonetic: "वेयरिंग नीट एंड वेल-आयरन्ड क्लोथ्स गिव्स अ स्मार्ट इम्प्रेशन एव्रीव्हेयर।" },
      ],
    },
    reading: {
      title: "The Magic Party Cap",
      hindiTitle: "जादुई पार्टी टोपी",
      storyEn: "It is Sunny's birthday! He wears a shining blue jacket and a golden pointy party cap. His sister wears a pretty pink frock with silver stars.",
      storyHi: "यह सन्नी का जन्मदिन है! उसने चमकदार नीली जैकेट और सुनहरी नुकीली पार्टी टोपी पहनी है। उसकी बहन ने चांदी के सितारों वाली सुंदर गुलाबी फ्रॉक पहनी है।",
      vocabWords: [
        { word: "Clothes", meaning: "कपड़े", phonetic: "क्लोथ्स" },
        { word: "Jacket", meaning: "जैकेट", phonetic: "जैकेट" },
        { word: "Shoelaces", meaning: "जूते के फीते", phonetic: "शूलेसिस" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "अपने जूते पहनें।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["on", "shoes.", "Put", "your"],
      correctAnswer: "Put on your shoes.",
    },
    targetStars: 10,
  },
  {
    day: 22,
    phaseId: 3,
    phaseName: "Questions & Curiosities",
    phaseHindi: "सवाल पूछना और जिज्ञासाएं",
    title: "Adventure Story & Dialog Lab",
    hindiTitle: "रोमांचक कहानी और बातचीत लैब",
    icon: "🎭",
    summary: "Role-play dialogs with your partner: Asking questions and answering smoothly.",
    sentences: {
      easy: [
        { hindi: "क्या आप मेरे साथ खेलेंगे?", english: "Will you play with me?", phonetic: "विल यू प्ले विथ मी?" },
        { hindi: "हाँ, बिल्कुल! चलो चलें।", english: "Yes, of course! Let us go.", phonetic: "यस, ऑफ कोर्स! लेट अस गो।" },
        { hindi: "आपका पसंदीदा खेल क्या है?", english: "What is your favorite game?", phonetic: "व्हाट इज़ योर फेवरिट गेम?" },
      ],
      medium: [
        { hindi: "मुझे पार्क में क्रिकेट और फुटबॉल खेलना सबसे ज्यादा पसंद है।", english: "I enjoy playing cricket and football the most in the park.", phonetic: "आई एन्जॉय प्लेइंग क्रिकेट एंड फुटबॉल द मोस्ट इन द पार्क।" },
        { hindi: "क्या हम कल शाम को फिर से मिल सकते हैं?", english: "Can we meet again tomorrow evening for practice?", phonetic: "कैन वी मीट अगेन टुमारो इवनिंग फॉर प्रैक्टिस?" },
      ],
      hard: [
        { hindi: "जब हम दूसरों से विनम्रता से बात करते हैं, तो नए दोस्त बनाना बहुत आसान हो जाता है।", english: "Speaking cordially and listening patiently helps us build lifelong friendships.", phonetic: "स्पीकिंग कॉर्डियली एंड लिसनिंग पेशेंटली हेल्प्स अस बिल्ड लाइफ-लॉन्ग फ्रेंडशिप्स।" },
      ],
    },
    reading: {
      title: "The Treehouse Secret",
      hindiTitle: "पेड़ वाले घर का रहस्य",
      storyEn: "'Who built this wooden treehouse?' whispered Joy. 'My grandpa and I!' answered Ali. 'Climb the ladder and look at the green hills!'",
      storyHi: "'यह लकड़ी का पेड़ वाला घर किसने बनाया?' जॉय ने फुसफुसाया। 'मेरे दादाजी और मैंने!' अली ने उत्तर दिया। 'सीढ़ी चढ़ो और हरी पहाड़ियों को देखो!'",
      vocabWords: [
        { word: "Treehouse", meaning: "पेड़ पर बना घर", phonetic: "ट्रीहाउस" },
        { word: "Ladder", meaning: "सीढ़ी", phonetic: "लैडर" },
        { word: "Whisper", meaning: "फुसफुसाना", phonetic: "व्हिस्पर" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "क्या आप मेरे साथ खेलेंगे?",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["me?", "with", "play", "you", "Will"],
      correctAnswer: "Will you play with me?",
    },
    targetStars: 15,
  },

  // ==========================================
  // PHASE 4: AROUND TOWN & NATURE (DAY 23 - 30)
  // ==========================================
  {
    day: 23,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "The Beautiful Park & Green Trees",
    hindiTitle: "सुंदर पार्क और हरे पेड़",
    icon: "🌳",
    summary: "Trees, flowers, grass, butterflies, swings, slide, and bench.",
    sentences: {
      easy: [
        { hindi: "पेड़ हरे हैं।", english: "The trees are green.", phonetic: "द ट्रीज़ आर ग्रीन।" },
        { hindi: "फूल बहुत सुंदर हैं।", english: "The flowers are beautiful.", phonetic: "द फ्लावर्स आर ब्यूटीफुल।" },
        { hindi: "मुझे झूले पर झूलना पसंद है।", english: "I love the swings.", phonetic: "आई लव द स्विंग्स।" },
      ],
      medium: [
        { hindi: "तितलियाँ रंग-बिरंगे फूलों पर मंडरा रही हैं।", english: "Butterflies are fluttering over colorful blossoms.", phonetic: "बटरफ्लाइज़ आर फ्लटरिंग ओवर कलरफुल ब्लॉसम्स।" },
        { hindi: "बच्चे फिसलपट्टी पर खुशी से फिसल रहे हैं।", english: "Children are sliding down the shiny slide cheerfully.", phonetic: "चिल्ड्रन आर स्लाइडिंग डाउन द शाइनी स्लाइड चीयरफुली।" },
      ],
      hard: [
        { hindi: "पेड़ हमें शुद्ध ऑक्सीजन, मीठे फल और शीतल छाया प्रदान करते हैं।", english: "Trees provide us with fresh oxygen, delicious fruits, and cool shade.", phonetic: "ट्रीज़ प्रोवाइड अस विथ फ्रेश ऑक्सीजन, डिलीशियस फ्रूट्स, एंड कूल शेड।" },
      ],
    },
    reading: {
      title: "Afternoon in the Park",
      hindiTitle: "पार्क में दोपहर",
      storyEn: "Birds chirp in the tall banyan tree. Old grandpa sits on the wooden bench watching the squirrels. Little children laugh as they swing higher into the air.",
      storyHi: "ऊंचे बरगद के पेड़ पर पक्षी चहकते हैं। बूढ़े दादाजी लकड़ी के बेंच पर बैठकर गिलहरियों को देखते हैं। छोटे बच्चे हंसते हैं जब वे हवा में ऊपर झूलते हैं।",
      vocabWords: [
        { word: "Blossom", meaning: "फूल खिलना", phonetic: "ब्लॉसम" },
        { word: "Oxygen", meaning: "ऑक्सीजन", phonetic: "ऑक्सीजन" },
        { word: "Shade", meaning: "छाया", phonetic: "शेड" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "पेड़ हरे हैं।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["green.", "trees", "The", "are"],
      correctAnswer: "The trees are green.",
    },
    targetStars: 10,
  },
  {
    day: 24,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "Birds & Flying Wonders",
    hindiTitle: "आकाश के पक्षी और पंख",
    icon: "🦜",
    summary: "Parrot, Sparrow, Peacock, Pigeon, Eagle, Feathers, Nest.",
    sentences: {
      easy: [
        { hindi: "पक्षी आकाश में उड़ते हैं।", english: "Birds fly in the sky.", phonetic: "बर्ड्स फ्लाई इन द स्काई।" },
        { hindi: "तोता हरी मिर्च खाता है।", english: "The parrot eats green chili.", phonetic: "द पैरट ईट्स ग्रीन चिली।" },
        { hindi: "मोर हमारा राष्ट्रीय पक्षी है।", english: "The peacock is our national bird.", phonetic: "द पीकॉक इज़ आवर नेशनल बर्ड।" },
      ],
      medium: [
        { hindi: "चिड़िया पेड़ पर एक प्यारा सा घोंसला बनाती है।", english: "The sparrow builds a cozy nest on the branch.", phonetic: "द स्पैरो बिल्ड्स अ कोज़ी नेस्ट ऑन द ब्रांच।" },
        { hindi: "बारिश में मोर अपने सुंदर पंख फैलाकर नाचता है।", english: "The peacock dances gracefully spreading its feathers in the rain.", phonetic: "द पीकॉक डांसेस ग्रेसफुली स्प्रेडिंग इट्स फेदर्स इन द रेन।" },
      ],
      hard: [
        { hindi: "चील बहुत ऊंचाई पर उड़ती है और उसकी नजर बहुत तेज होती है।", english: "Eagles soar high into the clouds with extraordinarily sharp vision.", phonetic: "ईगल्स सोर हाई इन टू द क्लाउड्स विथ एक्स्ट्राऑर्डिनरिली शार्प विजन।" },
      ],
    },
    reading: {
      title: "Mithu the Parrot",
      hindiTitle: "मिठू तोता",
      storyEn: "Mithu is a green parrot with a bright red beak. He sits on the guava tree. When Sonu says 'Namaste', Mithu whistles and copies the sound!",
      storyHi: "मिठू एक हरा तोता है जिसकी चोंच चमकदार लाल है। वह अमरूद के पेड़ पर बैठता है। जब सोनू कहता है 'नमस्ते', मिठू सीटी बजाता है और आवाज की नकल करता है!",
      vocabWords: [
        { word: "Feather", meaning: "पंख", phonetic: "फेदर" },
        { word: "Beak", meaning: "चोंच", phonetic: "बीक" },
        { word: "Nest", meaning: "घोंसला", phonetic: "नेस्ट" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "पक्षी आकाश में उड़ते हैं।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["sky.", "fly", "Birds", "in", "the"],
      correctAnswer: "Birds fly in the sky.",
    },
    targetStars: 10,
  },
  {
    day: 25,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "Market & Shopping Fun",
    hindiTitle: "बाज़ार और खरीदारी",
    icon: "🛒",
    summary: "Shop, Buy, Sell, Price, Money, Bag, Vegetables, Toys.",
    sentences: {
      easy: [
        { hindi: "हम बाज़ार जा रहे हैं।", english: "We are going to the market.", phonetic: "वी आर गोइंग टू द मार्केट।" },
        { hindi: "इसकी कीमत क्या है?", english: "How much is this?", phonetic: "हाउ मच इज़ दिस?" },
        { hindi: "मुझे यह खिलौना चाहिए।", english: "I want this toy.", phonetic: "आई वॉन्ट दिस टॉय।" },
      ],
      medium: [
        { hindi: "कृपया मुझे दो किलो मीठे सेब दीजिए।", english: "Please give me two kilograms of sweet apples.", phonetic: "प्लीज गिव मी टू किलोग्राम्स ऑफ स्वीट एप्पल्स।" },
        { hindi: "हम खरीदारी के लिए कपड़े का थैला साथ ले जाते हैं।", english: "We carry reusable cloth bags for shopping.", phonetic: "वी कैरी रियूजेबल क्लॉथ बैग्स फॉर शॉपिंग।" },
      ],
      hard: [
        { hindi: "दुकानदार ने मुस्कुराते हुए बिल बनाया और मुझे शेष पैसे वापस दिए।", english: "The shopkeeper prepared the invoice and returned the remaining change.", phonetic: "द शॉपकीपर प्रिपेयर्ड दि इनवॉइस एंड रिटर्न्ड द रिमेनिंग चेंज।" },
      ],
    },
    reading: {
      title: "Sunday Market Trip",
      hindiTitle: "रविवार का बाज़ार",
      storyEn: "Mother and Rohit walk through the bustling market. They buy crunchy carrots, juicy oranges, and a wooden puzzle box. Rohit holds the shopping bag proudly.",
      storyHi: "माँ और रोहित हलचल भरे बाजार से गुजरते हैं। वे कुरकुरी गाजर, रसीले संतरे और लकड़ी का पजल बॉक्स खरीदते हैं। रोहित गर्व से खरीदारी का थैला पकड़ता है।",
      vocabWords: [
        { word: "Market", meaning: "बाज़ार", phonetic: "मार्केट" },
        { word: "Shopkeeper", meaning: "दुकानदार", phonetic: "शॉपकीपर" },
        { word: "Change", meaning: "बचे हुए पैसे / छुट्टे", phonetic: "चेंज" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "हम बाज़ार जा रहे हैं।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["market.", "going", "are", "to", "We", "the"],
      correctAnswer: "We are going to the market.",
    },
    targetStars: 10,
  },
  {
    day: 26,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "Vehicles & Transport",
    hindiTitle: "गाड़ियाँ और सफर",
    icon: "🚗",
    summary: "Car, Bus, Bicycle, Train, Aeroplane, Boat, Traffic Lights.",
    sentences: {
      easy: [
        { hindi: "कार तेज चलती है।", english: "The car moves fast.", phonetic: "द कार मूव्स फास्ट।" },
        { hindi: "रेलगाड़ी पटरी पर चलती है।", english: "The train runs on tracks.", phonetic: "द ट्रेन रन्स ऑन ट्रैक्स।" },
        { hindi: "हवाई जहाज बादलों में उड़ता है।", english: "The airplane flies in the clouds.", phonetic: "दि एरोप्लेन फ्लाइज़ इन द क्लाउड्स।" },
      ],
      medium: [
        { hindi: "लाल बत्ती का मतलब रुकना है, हरी बत्ती का मतलब चलना है।", english: "Red light means stop, green light means go.", phonetic: "रेड लाइट मीन्स स्टॉप, ग्रीन लाइट मीन्स गो।" },
        { hindi: "मैं हर शाम अपनी नई साइकिल चलाता हूँ।", english: "I ride my bicycle around the neighborhood every evening.", phonetic: "आई राइड माय बाइसिकल अराउंड द नेबरहुड एव्री इवनिंग।" },
      ],
      hard: [
        { hindi: "यातायात नियमों का पालन करने से हम और सड़क पर चलने वाले सभी लोग सुरक्षित रहते हैं।", english: "Following traffic safety rules ensures that everyone on the road stays secure.", phonetic: "फॉलोइंग ट्रैफिक सेफ्टी रूल्स एन्श्योर्स दैट एव्रीवन ऑन द रोड स्टेज़ सिक्योर।" },
      ],
    },
    reading: {
      title: "The Chugging Train",
      hindiTitle: "छुक-छुक रेलगाड़ी",
      storyEn: "'Chugga-chugga, choo-choo!' blow the whistle. The silver train rolls across green bridges and rivers. Amit looks out the window at waving farmers.",
      storyHi: "'छुक-छुक, छू-छू!' सीटी बजती है। चांदी की रेलगाड़ी हरे पुलों और नदियों के ऊपर से गुजरती है। अमित खिड़की से बाहर हाथ हिलाते किसानों को देखता है।",
      vocabWords: [
        { word: "Bicycle", meaning: "साइकिल", phonetic: "बाइसिकल" },
        { word: "Traffic", meaning: "यातायात", phonetic: "ट्रैफिक" },
        { word: "Whistle", meaning: "सीटी", phonetic: "व्हिसल" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कार तेज चलती है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["moves", "fast.", "car", "The"],
      correctAnswer: "The car moves fast.",
    },
    targetStars: 10,
  },
  {
    day: 27,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "Our Helpers: Doctor, Teacher, Police",
    hindiTitle: "हमारे मददगार और रक्षक",
    icon: "👩‍⚕️",
    summary: "Doctor, Nurse, Police Officer, Firefighter, Farmer, Postman.",
    sentences: {
      easy: [
        { hindi: "डॉक्टर बीमार लोगों का इलाज करते हैं।", english: "Doctors treat sick people.", phonetic: "डॉक्टर्स ट्रीट सिक पीपल।" },
        { hindi: "अध्यापक हमें नई चीजें सिखाते हैं।", english: "Teachers teach us new things.", phonetic: "टीचर्स टीच अस न्यू थिंग्स।" },
        { hindi: "किसान हमारे लिए अनाज उगाते हैं।", english: "Farmers grow food for us.", phonetic: "फार्मर्स ग्रो फूड फॉर अस।" },
      ],
      medium: [
        { hindi: "पुलिस अधिकारी हमारी सुरक्षा करते हैं।", english: "Police officers protect our neighborhood.", phonetic: "पुलिस ऑफिसर्स प्रोटेक्ट आवर नेबरहुड।" },
        { hindi: "दमकलकर्मी आग बुझाते हैं और लोगों की जान बचाते हैं।", english: "Firefighters extinguish fires and rescue lives bravely.", phonetic: "फायरफाइटर्स एक्सटिंग्विश फायर्स एंड रेस्क्यू लाइव्स ब्रेवली।" },
      ],
      hard: [
        { hindi: "समाज के सभी कर्मठ सहायकों का सम्मान करना एक अच्छे बच्चे का कर्तव्य है।", english: "Respecting all community helpers who serve us selflessly is our noble duty.", phonetic: "रिस्पेक्टिंग ऑल कम्युनिटी हेल्पर्स हू सर्व अस सेल्फलेसली इज़ आवर नोबल ड्यूटी।" },
      ],
    },
    reading: {
      title: "Hero of the Town",
      hindiTitle: "शहर के हीरो",
      storyEn: "Doctor Anita wears a white coat and listens with her stethoscope. She gives gentle medicine to little Bunty. 'Drink plenty of water and rest!' she advises kindly.",
      storyHi: "डॉक्टर अनीता सफेद कोट पहनती हैं और स्टेथोस्कोप से जांच करती हैं। वे नन्हे बंटी को दवाई देती हैं। 'खूब पानी पियो और आराम करो!' वे प्यार से समझाती हैं।",
      vocabWords: [
        { word: "Helper", meaning: "सहायक / मददगार", phonetic: "हेल्पर" },
        { word: "Stethoscope", meaning: "स्टेथोस्कोप", phonetic: "स्टेथोस्कोप" },
        { word: "Bravely", meaning: "बहादुरी से", phonetic: "ब्रेवली" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "डॉक्टर बीमार लोगों का इलाज करते हैं।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["treat", "people.", "Doctors", "sick"],
      correctAnswer: "Doctors treat sick people.",
    },
    targetStars: 10,
  },
  {
    day: 28,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "In the Kitchen & Cooking Magic",
    hindiTitle: "रसोईघर और स्वादिष्ट व्यंजन",
    icon: "🍳",
    summary: "Plate, Spoon, Fork, Pan, Boiling, Baking, Stirring, Smelling good.",
    sentences: {
      easy: [
        { hindi: "खाना बहुत स्वादिष्ट है।", english: "The food is delicious.", phonetic: "द फूड इज़ डिलीशियस।" },
        { hindi: "कृपया मुझे चम्मच दें।", english: "Please give me a spoon.", phonetic: "प्लीज गिव मी अ स्पून।" },
        { hindi: "दूध गर्म है।", english: "The milk is hot.", phonetic: "द मिल्क इज़ हॉट।" },
      ],
      medium: [
        { hindi: "रसोई से हलवे की बहुत अच्छी खुशबू आ रही है।", english: "A wonderful sweet aroma is coming from the kitchen.", phonetic: "अ वंडरफुल स्वीट अरोमा इज़ कमिंग फ्रॉम द किचन।" },
        { hindi: "मैं मेज पर प्लेट और गिलास सजाने में मदद करता हूँ।", english: "I help set the plates and glasses on the dining table.", phonetic: "आई हेल्प सेट द प्लेट्स एंड ग्लासेस ऑन द डाइनिंग टेबल।" },
      ],
      hard: [
        { hindi: "खाना खाने के बाद अपनी थाली खुद रसोई में रखना एक जिम्मेदार आदत है।", english: "Placing your own dinner plate in the sink is a sign of good upbringing.", phonetic: "प्लेसिंग योर ओन डिनर प्लेट इन द सिंक इज़ अ साइन ऑफ गुड अपब्रिंगिंग।" },
      ],
    },
    reading: {
      title: "Chef Kabir's Fruit Salad",
      hindiTitle: "शेफ कबीर का फ्रूट सलाद",
      storyEn: "Kabir puts on a white chef hat. In a glass bowl, he mixes sliced bananas, sweet strawberries, and golden honey. 'Taste my rainbow salad!' he says with a grin.",
      storyHi: "कबीर सफेद शेफ टोपी पहनता है। एक कांच के कटोरे में, वह कटे हुए केले, मीठी स्ट्रॉबेरी और सुनहरा शहद मिलाता है। 'मेरा सतरंगी सलाद चखो!' वह मुस्कान के साथ कहता है।",
      vocabWords: [
        { word: "Delicious", meaning: "स्वादिष्ट", phonetic: "डिलीशियस" },
        { word: "Aroma", meaning: "सुगंध / महक", phonetic: "अरोमा" },
        { word: "Kitchen", meaning: "रसोईघर", phonetic: "किचन" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "खाना बहुत स्वादिष्ट है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["delicious.", "food", "The", "is"],
      correctAnswer: "The food is delicious.",
    },
    targetStars: 10,
  },
  {
    day: 29,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "Birthday Parties & Celebrations",
    hindiTitle: "जन्मदिन की पार्टी और खुशियाँ",
    icon: "🎂",
    summary: "Cake, Candles, Balloons, Gifts, Singing 'Happy Birthday', Clapping.",
    sentences: {
      easy: [
        { hindi: "जन्मदिन मुबारक हो!", english: "Happy Birthday to you!", phonetic: "हैप्पी बर्थडे टू यू!" },
        { hindi: "मोमबत्तियाँ बुझाएं।", english: "Blow out the candles.", phonetic: "ब्लो आउट द कैंडल्स।" },
        { hindi: "यह आपका उपहार है।", english: "This is your gift.", phonetic: "दिस इज़ योर गिफ्ट।" },
      ],
      medium: [
        { hindi: "हम सबने मिलकर स्वादिष्ट चॉकलेट केक काटा।", english: "We all gathered to cut the delicious chocolate cake.", phonetic: "वी ऑल गैदर्ड टू कट द डिलीशियस चॉकलेट केक।" },
        { hindi: "पार्टी में हर बच्चा रंग-बिरंगी टोपी पहने हुए था।", english: "Every child wore a sparkling conical party hat at the gathering.", phonetic: "एव्री चाइल्ड वोर अ स्पार्कलिंग कोनिकल पार्टी हैट एट द गैदरिंग।" },
      ],
      hard: [
        { hindi: "सच्ची खुशी उपहार लेने में नहीं, बल्कि अपने दोस्तों के साथ खुशियां बांटने में है।", english: "True joy lies not merely in receiving gifts, but in celebrating togetherness.", phonetic: "ट्रू जॉय लाइज़ नॉट मियरली इन रिसीविंग गिफ्ट्स, बट इन सेलिब्रेटिंग टुगेदरनेस।" },
      ],
    },
    reading: {
      title: "The Surprise Box",
      hindiTitle: "सरप्राइज बॉक्स",
      storyEn: "'Three, two, one, blow!' cheered everyone. Meera blew all seven candles in one breath. Her parents gave her a big surprise box containing a silver telescope!",
      storyHi: "'तीन, दो, एक, फूंक मारो!' सबने उत्साह से कहा। मीरा ने एक ही सांस में सातों मोमबत्तियां बुझा दीं। उसके माता-पिता ने उसे एक बड़ा सरप्राइज बॉक्स दिया जिसमें एक चांदी का टेलीस्कोप था!",
      vocabWords: [
        { word: "Candles", meaning: "मोमबत्तियां", phonetic: "कैंडल्स" },
        { word: "Surprise", meaning: "अचंभित करने वाला उपहार", phonetic: "सरप्राइज" },
        { word: "Togetherness", meaning: "एकजुटता / साथ", phonetic: "टुगेदरनेस" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "जन्मदिन मुबारक हो!",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["to", "you!", "Birthday", "Happy"],
      correctAnswer: "Happy Birthday to you!",
    },
    targetStars: 10,
  },
  {
    day: 30,
    phaseId: 4,
    phaseName: "Around Town & Nature",
    phaseHindi: "आस-पास की दुनिया और प्रकृति",
    title: "1-Month Fluency Star Badge",
    hindiTitle: "1 माह का स्टार बैज और विजय",
    icon: "🌟",
    summary: "Celebrate 30 days of English mastery! Review Phase 1 to Phase 4.",
    sentences: {
      easy: [
        { hindi: "मैंने तीस दिन पूरे कर लिए!", english: "I completed thirty days!", phonetic: "आई कम्प्लीटेड थर्टी डेज़!" },
        { hindi: "मेरी अंग्रेजी बहुत अच्छी हो रही है।", english: "My English is getting so good.", phonetic: "माय इंग्लिश इज़ गेटिंग सो गुड।" },
        { hindi: "मैं बहुत खुश और आश्वस्त हूँ।", english: "I am super happy and confident.", phonetic: "आई एम सुपर हैप्पी एंड कॉन्फिडेंट।" },
      ],
      medium: [
        { hindi: "अब मैं रोजमर्रा के वाक्य बिना झिझक के बोल सकता हूँ।", english: "Now I can speak daily sentences without any hesitation.", phonetic: "नाउ आई कैन स्पीक डेली सेंटेंसेस विदाउट एनी हेसिटेशन।" },
      ],
      hard: [
        { hindi: "एक महीने के अटूट अभ्यास ने मुझे साबित कर दिया कि भाषा का डर सिर्फ अभ्यास से दूर होता है।", english: "A whole month of dedicated learning has completely banished my fear of speaking.", phonetic: "अ होल मंथ ऑफ डेडिकेटेड लर्निंग हैज़ कम्प्लीटली बैनिश्ड माय फियर ऑफ स्पीकिंग।" },
      ],
    },
    reading: {
      title: "Chintu's Gold Badge Ceremony",
      hindiTitle: "चिंटू का गोल्ड बैज समारोह",
      storyEn: "All the animals in the forest gathered around. Chintu the Owl pinned a shining Gold Badge on your chest. '30 Days of excellence! You are officially an English Star!'",
      storyHi: "जंगल के सभी जानवर इकट्ठे हो गए। उल्लू चिंटू ने आपके सीने पर एक चमकदार सोने का बैज लगाया। '30 दिनों की उत्कृष्टता! अब आप आधिकारिक रूप से एक इंग्लिश स्टार हैं!'",
      vocabWords: [
        { word: "Excellence", meaning: "उत्कृष्टता", phonetic: "एक्सीलेंस" },
        { word: "Hesitation", meaning: "झिझक", phonetic: "हेसिटेशन" },
        { word: "Dedication", meaning: "समर्पण", phonetic: "डेडिकेशन" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मेरी अंग्रेजी बहुत अच्छी हो रही है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["good.", "getting", "is", "English", "so", "My"],
      correctAnswer: "My English is getting so good.",
    },
    targetStars: 25,
  },

  // ==========================================
  // PHASE 5: FLUENCY & STORYTELLING (DAY 31 - 38)
  // ==========================================
  {
    day: 31,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Describing Things: Adjectives",
    hindiTitle: "चीजों की विशेषताएं बताना",
    icon: "💎",
    summary: "Big, Small, Soft, Hard, Heavy, Light, Sweet, Salty, Fast, Slow.",
    sentences: {
      easy: [
        { hindi: "खरगोश बहुत तेज है।", english: "The rabbit is very fast.", phonetic: "द रैबिट इज़ वेरी फास्ट।" },
        { hindi: "कछुआ धीमा चलता है।", english: "The turtle moves slowly.", phonetic: "द टर्टल मूव्स स्लोली।" },
        { hindi: "रूई बहुत मुलायम होती है।", english: "Cotton is very soft.", phonetic: "कॉटन इज़ वेरी सॉफ्ट।" },
      ],
      medium: [
        { hindi: "हाथी बहुत भारी और ताकतवर जानवर है।", english: "The elephant is a heavy and mighty creature.", phonetic: "दि एलिफेंट इज़ अ हेवी एंड माइटी क्रीचर।" },
        { hindi: "यह पत्थर कड़ा है, लेकिन यह तकिया बहुत कोमल है।", english: "This rock is hard, but the cushion is delightfully soft.", phonetic: "दिस रॉक इज़ हार्ड, बट द कुशन इज़ डिलाइटफुली सॉफ्ट।" },
      ],
      hard: [
        { hindi: "रंग-बिरंगे और खुशबूदार फूलों से भरा बगीचा मन को अपार शांति देता है।", english: "The lush garden filled with fragrant flowers brings immense tranquility.", phonetic: "द लश गार्डन फिल्ड विथ फ्रैग्रेंट फ्लावर्स ब्रिंग्स इमेन्स ट्रैंक्विलिटी।" },
      ],
    },
    reading: {
      title: "The Tortoise and the Hare",
      hindiTitle: "कछुआ और खरगोश",
      storyEn: "The speedy hare laughed at the slow turtle. 'Let's race!' they agreed. The hare took a nap under a shady oak, while the patient tortoise walked on and won the race!",
      storyHi: "तेज खरगोश धीमे कछुए पर हंसा। 'चलो दौड़ लगाते हैं!' वे सहमत हुए। खरगोश ओक के पेड़ के नीचे सो गया, जबकि धैर्यवान कछुआ चलता रहा और दौड़ जीत गया!",
      vocabWords: [
        { word: "Patient", meaning: "धैर्यवान", phonetic: "पेशेंट" },
        { word: "Speedy", meaning: "अत्यधिक तेज", phonetic: "स्पीडि" },
        { word: "Tranquility", meaning: "शांति", phonetic: "ट्रैंक्विलिटी" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "खरगोश बहुत तेज है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["fast.", "very", "is", "The", "rabbit"],
      correctAnswer: "The rabbit is very fast.",
    },
    targetStars: 10,
  },
  {
    day: 32,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Opposites & Word Pairs",
    hindiTitle: "उल्टे शब्द (विलोम शब्द)",
    icon: "↔️",
    summary: "Hot/Cold, Up/Down, In/Out, Tall/Short, Day/Night, Open/Close.",
    sentences: {
      easy: [
        { hindi: "चाय गर्म है, बर्फ ठंडी है।", english: "Tea is hot, ice is cold.", phonetic: "टी इज़ हॉट, आइस इज़ कोल्ड।" },
        { hindi: "सूरज ऊपर है, धरती नीचे है।", english: "The sun is up, the ground is down.", phonetic: "द सन इज़ अप, द ग्राउंड इज़ डाउन।" },
        { hindi: "दरवाजा खोलो और खिड़की बंद करो।", english: "Open the door and close the window.", phonetic: "ओपन द डोर एंड क्लोज़ द विंडो।" },
      ],
      medium: [
        { hindi: "जिराफ बहुत लंबा होता है, जबकि चूहा बहुत छोटा होता है।", english: "A giraffe is remarkably tall, whereas a mouse is tiny.", phonetic: "अ जिराफ इज़ रिमार्केबली टॉल, व्हेयरऐज़ अ माउस इज़ टाइनी।" },
        { hindi: "दिन में रोशनी होती है, रात में अंधेरा होता है।", english: "Day brings radiant light, while night brings peaceful darkness.", phonetic: "डे ब्रिंग्स रेडियंट लाइट, व्हाइल नाइट ब्रिंग्स पीसफुल डार्कनेस।" },
      ],
      hard: [
        { hindi: "जीवन में सुख और दुख दोनों आते हैं, हमें दोनों में मुस्कुराना चाहिए।", english: "Just as joy and sorrow alternate, we must keep smiling with resilience.", phonetic: "जस्ट ऐज़ जॉय एंड सॉरो अल्टरनेट, वी मस्ट कीप स्माइलिंग विथ रेजिलिएंस।" },
      ],
    },
    reading: {
      title: "The Land of Opposites",
      hindiTitle: "विलोम की दुनिया",
      storyEn: "In the funny upside-down city, birds walk and dogs fly! Giants are small and ants are huge. Little Gopi laughed, 'Opposites make everything so thrilling!'",
      storyHi: "उल्टे-पुल्टे शहर में पक्षी चलते हैं और कुत्ते उड़ते हैं! दैत्य छोटे हैं और चींटियां विशाल हैं। छोटे गोपी ने हंसकर कहा, 'उल्टे शब्दों से सब कुछ कितना रोमांचक हो जाता है!'",
      vocabWords: [
        { word: "Opposite", meaning: "उल्टा / विलोम", phonetic: "ऑपोजिट" },
        { word: "Resilience", meaning: "लचीलापन / धैर्य", phonetic: "रेजिलिएंस" },
        { word: "Radiant", meaning: "चमकदार", phonetic: "रेडियंट" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "चाय गर्म है, बर्फ ठंडी है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["cold.", "Tea", "ice", "hot,", "is", "is"],
      correctAnswer: "Tea is hot, ice is cold.",
    },
    targetStars: 10,
  },
  {
    day: 33,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Likes, Dislikes & Preferences",
    hindiTitle: "मुझे क्या पसंद है / क्या नहीं",
    icon: "👍",
    summary: "Express what you adore and what you do not enjoy: 'I love...', 'I prefer...'",
    sentences: {
      easy: [
        { hindi: "मुझे चित्रकारी करना बहुत पसंद है।", english: "I love painting pictures.", phonetic: "आई लव पेंटिंग पिक्चर्स।" },
        { hindi: "मुझे कड़वी दवा पसंद नहीं है।", english: "I do not like bitter medicine.", phonetic: "आई डू नॉट लाइक बिटर मेडिसिन।" },
        { hindi: "मुझे किताबें पढ़ना अच्छा लगता है।", english: "I enjoy reading books.", phonetic: "आई एन्जॉय रीडिंग बुक्स।" },
      ],
      medium: [
        { hindi: "मुझे वीडियो गेम के मुकाबले फुटबॉल खेलना ज्यादा पसंद है।", english: "I prefer playing football outdoors rather than playing video games.", phonetic: "आई प्रिफर प्लेइंग फुटबॉल आउटडोर्स रैदर दैन प्लेइंग वीडियो गेम्स।" },
        { hindi: "मेरी बहन को संगीत सुनना पसंद है, लेकिन मुझे नृत्य करना पसंद है।", english: "My sister likes listening to music, whereas I love dancing.", phonetic: "माय सिस्टर लाइक्स लिसनिंग टू म्यूजिक, व्हेयरऐज़ आई लव डांसिंग।" },
      ],
      hard: [
        { hindi: "हर किसी की अपनी अनूठी पसंद होती है, और हमें दूसरों की पसंद का आदर करना चाहिए।", english: "Each individual possesses unique interests, and we must honor individual choices.", phonetic: "ईच इंडिविजुअल पज़ेसेस यूनिक इंटरेस्ट्स, एंड वी मस्ट ऑनर इंडिविजुअल चॉइसेस।" },
      ],
    },
    reading: {
      title: "Ria's Favorite Hobby",
      hindiTitle: "रिया का पसंदीदा शौक",
      storyEn: "Some children like playing with clay. Ria prefers stargazing through her small telescope. She knows the names of Orion and the North Star!",
      storyHi: "कुछ बच्चों को मिट्टी से खेलना पसंद है। रिया अपने छोटे टेलीस्कोप से तारों को देखना पसंद करती है। वह ओरियन और ध्रुव तारे के नाम जानती है!",
      vocabWords: [
        { word: "Prefer", meaning: "अधिक पसंद करना", phonetic: "प्रिफर" },
        { word: "Unique", meaning: "अनोखा", phonetic: "यूनिक" },
        { word: "Stargazing", meaning: "तारों को देखना", phonetic: "स्टारगेजिंग" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मुझे चित्रकारी करना बहुत पसंद है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["pictures.", "painting", "love", "I"],
      correctAnswer: "I love painting pictures.",
    },
    targetStars: 10,
  },
  {
    day: 34,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "My Hobbies: Drawing, Sports, Music",
    hindiTitle: "मेरे शौक और रचनात्मकता",
    icon: "🎨",
    summary: "Singing, Swimming, Cycling, Gardening, Origami, Chess.",
    sentences: {
      easy: [
        { hindi: "मेरा शौक चित्रकला है।", english: "My hobby is drawing.", phonetic: "माय हॉबी इज़ ड्रॉइंग।" },
        { hindi: "मैं तैरना सीख रहा हूँ।", english: "I am learning to swim.", phonetic: "आई एम लर्निंग टू स्विम।" },
        { hindi: "हम शतरंज खेलते हैं।", english: "We play chess.", phonetic: "वी प्ले चेस।" },
      ],
      medium: [
        { hindi: "रविवार की सुबह मैं अपने बगीचे में पौधे लगाता हूँ।", english: "On Sunday mornings, I plant flowering saplings in our garden.", phonetic: "ऑन संडे मॉर्निंग्स, आई प्लांट फ्लावरिंग सैपलिंग्स इन आवर गार्डन।" },
        { hindi: "शतरंज खेलने से हमारे दिमाग की सोचने की क्षमता तेज होती है।", english: "Playing chess sharpens our strategic thinking and focus.", phonetic: "प्लेइंग चेस शार्पन्स आवर स्ट्रेटेजिक थिंकिंग एंड फोकस।" },
      ],
      hard: [
        { hindi: "रचनात्मक शौक हमें तनावमुक्त रखते हैं और हमारे व्यक्तित्व को निखारते हैं।", english: "Pursuing creative hobbies keeps us joyful and enhances our problem-solving skills.", phonetic: "परस्यूइंग क्रिएटिव हॉबीज़ कीप्स अस जॉयफुल एंड एनहांसेस आवर प्रॉब्लम-सॉल्विंग स्किल्स।" },
      ],
    },
    reading: {
      title: "The Origami Swan",
      hindiTitle: "कागज का हंस",
      storyEn: "With nimble fingers, Ananya folded a square sheet of white paper. Fold by fold, a graceful swan appeared! She placed it gently by her study lamp.",
      storyHi: "फुर्तीली उंगलियों से अनन्या ने चौकोर सफेद कागज को मोड़ा। एक-एक तह के बाद एक सुंदर हंस सामने आ गया! उसने इसे धीरे से अपनी स्टडी टेबल पर रख दिया।",
      vocabWords: [
        { word: "Hobby", meaning: "शौक", phonetic: "हॉबी" },
        { word: "Graceful", meaning: "सुंदर व मोहक", phonetic: "ग्रेसफुल" },
        { word: "Strategic", meaning: "रणनीतिक", phonetic: "स्ट्रेटेजिक" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मेरा शौक चित्रकला है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["drawing.", "hobby", "is", "My"],
      correctAnswer: "My hobby is drawing.",
    },
    targetStars: 10,
  },
  {
    day: 35,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Talking About Yesterday: Past Tense",
    hindiTitle: "बीती बातें (भूतकाल की शुरुआत)",
    icon: "⏮️",
    summary: "Yesterday I went, I played, I ate, I watched, I slept early.",
    sentences: {
      easy: [
        { hindi: "कल मैं पार्क गया था।", english: "Yesterday I went to the park.", phonetic: "यस्टरडे आई वेंट टू द पार्क।" },
        { hindi: "मैंने एक स्वादिष्ट सेब खाया।", english: "I ate a sweet apple.", phonetic: "आई एट अ स्वीट एप्पल।" },
        { hindi: "हम सबने मिलकर खेला।", english: "We played together.", phonetic: "वी प्लेड टुगेदर।" },
      ],
      medium: [
        { hindi: "कल शाम को हमने एक बहुत मजेदार कार्टून फिल्म देखी।", english: "Yesterday evening we watched an entertaining animated movie.", phonetic: "यस्टरडे इवनिंग वी वॉच्ड एन एंटरटेनिंग एनिमेटेड मूवी।" },
        { hindi: "मैंने कल रात सोने से पहले अपना सारा गृहकार्य पूरा कर लिया था।", english: "I finished all my homework before going to bed last night.", phonetic: "आई फिनिश्ड ऑल माय होमवर्क बिफोर गोइंग टू बेड लास्ट नाइट।" },
      ],
      hard: [
        { hindi: "कल मेरे दादाजी ने मुझे अपने बचपन की रोमांचक यात्राओं की कहानी सुनाई।", english: "Yesterday my grandfather narrated fascinating adventures from his youth.", phonetic: "यस्टरडे माय ग्रैंडफादर नैरेटेड फैसिनेटिंग एडवेंचर्स फ्रॉम हिज़ यूथ।" },
      ],
    },
    reading: {
      title: "Yesterday's Picnic",
      hindiTitle: "कल की पिकनिक",
      storyEn: "Yesterday, the sun shone warmly. Our whole family visited the lakeside. We spread a red mat, ate sandwiches, and fed breadcrumbs to the ducks.",
      storyHi: "कल धूप बड़ी सुहानी थी। हमारा पूरा परिवार झील के किनारे गया था। हमने लाल चटाई बिछाई, सैंडविच खाए और बत्तखों को ब्रेड के टुकड़े खिलाए।",
      vocabWords: [
        { word: "Yesterday", meaning: "बीता हुआ कल", phonetic: "यस्टरडे" },
        { word: "Narrated", meaning: "सुनाया", phonetic: "नैरेटेड" },
        { word: "Fascinating", meaning: "मनमोहक", phonetic: "फैसिनेटिंग" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कल मैं पार्क गया था।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["the", "went", "park.", "I", "Yesterday", "to"],
      correctAnswer: "Yesterday I went to the park.",
    },
    targetStars: 10,
  },
  {
    day: 36,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Dreams & Tomorrow: Future Tense",
    hindiTitle: "आने वाला कल और मेरे सपने",
    icon: "🚀",
    summary: "Tomorrow I will, When I grow up I want to be an Astronaut, Doctor, Pilot.",
    sentences: {
      easy: [
        { hindi: "कल मैं स्कूल जाऊंगा।", english: "Tomorrow I will go to school.", phonetic: "टुमारो आई विल गो टू स्कूल।" },
        { hindi: "हम कल मैच जीतेंगे।", english: "We will win the match.", phonetic: "वी विल विन द मैच।" },
        { hindi: "मैं बड़ा होकर पायलट बनूँगा।", english: "I will become a pilot.", phonetic: "आई विल बिकम अ पायलट।" },
      ],
      medium: [
        { hindi: "कल हमारी कक्षा में एक विशेष खेल प्रतियोगिता आयोजित होगी।", english: "Tomorrow a special sports tournament will take place at school.", phonetic: "टुमारो अ स्पेशल स्पोर्ट्स टूर्नामेंट विल टेक प्लेस एट स्कूल।" },
        { hindi: "मैं बड़े होकर वैज्ञानिक बनना चाहता हूँ ताकि नई खोजें कर सकूँ।", english: "When I grow up, I aspire to be a scientist to discover new inventions.", phonetic: "व्हेन आई ग्रो अप, आई एस्पायर टू बी अ साइंटिस्ट टू डिस्कवर न्यू इन्वेंशन्स।" },
      ],
      hard: [
        { hindi: "दृढ़ संकल्प और कठिन परिश्रम से हम अपने सभी सपनों को साकार कर सकते हैं।", english: "With relentless dedication and hard work, we shall turn our dreams into reality.", phonetic: "विथ रिलेंटलेस डेडिकेशन एंड हार्ड वर्क, वी शैल टर्न आवर ड्रीम्स इन टू रिएलिटी।" },
      ],
    },
    reading: {
      title: "Mission to Mars",
      hindiTitle: "मंगल ग्रह का मिशन",
      storyEn: "Nikhil looked up at the twinkling red planet. 'One day, I will wear a white spacesuit and land a rocket on Mars!' he whispered boldly to the stars.",
      storyHi: "निखिल ने टिमटिमाते लाल ग्रह की ओर देखा। 'एक दिन मैं सफेद स्पेससूट पहनूंगा और मंगल ग्रह पर रॉकेट उतारूंगा!' उसने तारों से आत्मविश्वास के साथ कहा।",
      vocabWords: [
        { word: "Tomorrow", meaning: "आने वाला कल", phonetic: "टुमारो" },
        { word: "Invention", meaning: "अविष्कार", phonetic: "इन्वेंशन" },
        { word: "Astronaut", meaning: "अंतरिक्ष यात्री", phonetic: "एस्ट्रोनॉट" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कल मैं स्कूल जाऊंगा।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["school.", "go", "to", "will", "Tomorrow", "I"],
      correctAnswer: "Tomorrow I will go to school.",
    },
    targetStars: 10,
  },
  {
    day: 37,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Telephone & Video Call English",
    hindiTitle: "फोन पर अंग्रेजी में बातचीत",
    icon: "📱",
    summary: "Hello, may I speak to?, Who is calling?, Hold on please, See you soon!",
    sentences: {
      easy: [
        { hindi: "नमस्ते, क्या मैं रोहन से बात कर सकता हूँ?", english: "Hello, may I speak to Rohan?", phonetic: "हेलो, मे आई स्पीक टू रोहन?" },
        { hindi: "कृपया एक मिनट रुकिए।", english: "Please hold on for a moment.", phonetic: "प्लीज होल्ड ऑन फॉर अ मोमेंट।" },
        { hindi: "जल्द ही फिर बात करेंगे!", english: "Talk to you soon!", phonetic: "टॉक टू यू सून!" },
      ],
      medium: [
        { hindi: "नमस्ते आंटी, मैं आयुष बोल रहा हूँ। क्या रोहन घर पर है?", english: "Hello aunty, this is Ayush speaking. Is Rohan at home?", phonetic: "हेलो आंटी, दिस इज़ आयुष स्पीकिंग। इज़ रोहन एट होम?" },
        { hindi: "आपकी आवाज बहुत साफ आ रही है।", english: "Your voice is coming through crystal clear.", phonetic: "योर वॉइस इज़ कमिंग थ्रू क्रिस्टल क्लियर।" },
      ],
      hard: [
        { hindi: "क्या आप कृपया उन्हें संदेश दे सकते हैं कि मैंने शाम के अभ्यास के लिए फोन किया था?", english: "Could you please pass the message that I called regarding our evening practice?", phonetic: "कुड यू प्लीज पास द मैसेज दैट आई कॉल्ड रिगार्डिंग आवर इवनिंग प्रैक्टिस?" },
      ],
    },
    reading: {
      title: "Calling Grandma in America",
      hindiTitle: "दादी माँ से वीडियो कॉल",
      storyEn: "The screen rings with a chime. Grandma's loving face appears. 'Hello my little champion!' she beams. Tarun waves his drawing of a rocket to the camera.",
      storyHi: "घंटी की आवाज के साथ स्क्रीन बजती है। दादी का प्यारा चेहरा सामने आता है। 'नमस्ते मेरे नन्हे चैंपियन!' वे मुस्कुराती हैं। तरुण कैमरे के सामने अपने रॉकेट का चित्र दिखाता है।",
      vocabWords: [
        { word: "Calling", meaning: "फोन करना", phonetic: "कॉलिंग" },
        { word: "Message", meaning: "संदेश", phonetic: "मैसेज" },
        { word: "Crystal Clear", meaning: "बिल्कुल साफ", phonetic: "क्रिस्टल क्लियर" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कृपया एक मिनट रुकिए।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["moment.", "hold", "on", "a", "for", "Please"],
      correctAnswer: "Please hold on for a moment.",
    },
    targetStars: 10,
  },
  {
    day: 38,
    phaseId: 5,
    phaseName: "Fluency & Storytelling",
    phaseHindi: "कहानियां और धाराप्रवाह बातचीत",
    title: "Bedtime Fairy Tales & Wisdom",
    hindiTitle: "रात की कहानियां और सीख",
    icon: "📖",
    summary: "Once upon a time, far away in a kingdom, moral of the story: honesty.",
    sentences: {
      easy: [
        { hindi: "एक समय की बात है।", english: "Once upon a time.", phonetic: "वन्स अपॉन अ टाइम।" },
        { hindi: "राजा बहुत दयालु था।", english: "The king was very kind.", phonetic: "द किंग वॉज़ वेरी काइंड।" },
        { hindi: "शुभ रात्रि और मीठे सपने!", english: "Good night and sweet dreams!", phonetic: "गुड नाइट एंड स्वीट ड्रीम्स!" },
      ],
      medium: [
        { hindi: "ईमानदारी हमेशा सबसे अच्छी नीति होती है।", english: "Honesty is always the best policy.", phonetic: "ऑनेस्टी इज़ ऑलवेज़ द बेस्ट पॉलिसी।" },
        { hindi: "वे सभी उस सुंदर राज्य में खुशी-खुशी रहने लगे।", english: "They all lived happily ever after in the peaceful kingdom.", phonetic: "दे ऑल लिव्ड हैपिली एवर आफ्टर इन द पीसफुल किंगडम।" },
      ],
      hard: [
        { hindi: "कहानियां हमें जीवन के कठिन समय में सही और गलत की पहचान सिखाती हैं।", english: "Classic moral tales enlighten young minds to choose righteousness always.", phonetic: "क्लासिक मोरल टेल्स एनलाइटेन यंग माइंड्स टू चूज़ राइटियसनेस ऑलवेज़।" },
      ],
    },
    reading: {
      title: "The Golden Goose",
      hindiTitle: "सोने का अंडा देने वाली हंसिनी",
      storyEn: "In a quiet village, a poor farmer found a goose that laid a golden egg every sunrise. He was grateful and learned that greed leads to sorrow, but contentment brings peace.",
      storyHi: "एक शांत गांव में, एक गरीब किसान को एक हंसिनी मिली जो हर सुबह सोने का अंडा देती थी। वह आभारी था और उसने सीखा कि लालच दुख लाता है, लेकिन संतोष शांति देता है।",
      vocabWords: [
        { word: "Honesty", meaning: "ईमानदारी", phonetic: "ऑनेस्टी" },
        { word: "Contentment", meaning: "संतोष", phonetic: "कंटेंटमेंट" },
        { word: "Kingdom", meaning: "राज्य", phonetic: "किंगडम" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "एक समय की बात है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["time.", "Once", "a", "upon"],
      correctAnswer: "Once upon a time.",
    },
    targetStars: 15,
  },

  // ==========================================
  // PHASE 6: MASTER SPEAKER & REAL WORLD (DAY 39 - 45)
  // ==========================================
  {
    day: 39,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "At the Restaurant: Ordering Snacks",
    hindiTitle: "रेस्तरां में स्नैक्स ऑर्डर करना",
    icon: "🍕",
    summary: "Menu, Order, Bill, Delicious, Water, Ice cream, Napkins.",
    sentences: {
      easy: [
        { hindi: "कृपया मेन्यू कार्ड दिखाइए।", english: "Please show the menu card.", phonetic: "प्लीज शो द मेन्यू कार्ड।" },
        { hindi: "मुझे पनीर पिज्जा चाहिए।", english: "I would like a cheese pizza.", phonetic: "आई वुड लाइक अ चीज़ पिज्जा।" },
        { hindi: "कृपया बिल लाइए।", english: "Please bring the bill.", phonetic: "प्लीज ब्रिंग द बिल।" },
      ],
      medium: [
        { hindi: "क्या हमें पीने के लिए सामान्य पानी मिल सकता है?", english: "Could we please get some regular drinking water?", phonetic: "कुड वी प्लीज गेट सम रेगुलर ड्रिंकिंग वाटर?" },
        { hindi: "यह खाना वाकई बहुत स्वादिष्ट और गर्म है।", english: "This meal is truly flavorful and piping hot.", phonetic: "दिस मील इज़ ट्रूली फ्लेवरफुल एंड पाइपिंग हॉट।" },
      ],
      hard: [
        { hindi: "उत्कृष्ट सेवा और स्वादिष्ट भोजन के लिए वेटर को धन्यवाद देना एक शिष्टाचार है।", english: "Tipping courteously and thanking the servers reflects thoughtful table etiquette.", phonetic: "टिपिंग कर्टियसली एंड थैंकिंग द सर्वर्स रिफ्लेक्ट्स थॉटफुल टेबल एटिकेट।" },
      ],
    },
    reading: {
      title: "Dinner with Uncle",
      hindiTitle: "चाचाजी के साथ रात का खाना",
      storyEn: "The waiter bowed with a warm smile. 'What would the young gentleman like today?' Samar ordered vegetable pasta and mango sorbet with great poise.",
      storyHi: "वेटर ने गर्मजोशी से सिर झुकाया। 'नन्हे साहब आज क्या लेना पसंद करेंगे?' समर ने आत्मविश्वास के साथ वेज पास्ता और आम का सॉर्बे ऑर्डर किया।",
      vocabWords: [
        { word: "Menu", meaning: "मेन्यू सूची", phonetic: "मेन्यू" },
        { word: "Etiquette", meaning: "शिष्टाचार", phonetic: "एटिकेट" },
        { word: "Gentleman", meaning: "सज्जन व्यक्ति", phonetic: "जेंटलमैन" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "कृपया मेन्यू कार्ड दिखाइए।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["the", "menu", "show", "card.", "Please"],
      correctAnswer: "Please show the menu card.",
    },
    targetStars: 10,
  },
  {
    day: 40,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "Travel & Airport / Station Adventure",
    hindiTitle: "रेलवे स्टेशन और सफर का रोमांच",
    icon: "✈️",
    summary: "Ticket, Luggage, Platform, Boarding, Window Seat, Journey.",
    sentences: {
      easy: [
        { hindi: "यहाँ मेरा टिकट है।", english: "Here is my ticket.", phonetic: "हियर इज़ माय टिकट।" },
        { hindi: "गाड़ी प्लेटफॉर्म नंबर दो पर आ रही है।", english: "The train arrives at platform two.", phonetic: "द ट्रेन अराइव्स एट प्लेटफॉर्म टू।" },
        { hindi: "आपकी यात्रा मंगलमय हो!", english: "Have a safe and happy journey!", phonetic: "हैव अ सेफ एंड हैप्पी जर्नी!" },
      ],
      medium: [
        { hindi: "कृपया मुझे खिड़की वाली सीट पर बैठने दीजिए।", english: "Could you please let me sit by the window seat?", phonetic: "कुड यू प्लीज लेट मी सिट बाय द विंडो सीट?" },
        { hindi: "हम अपना सामान ट्रॉली पर रखकर ले जा रहे हैं।", english: "We are transporting our suitcases on the luggage cart.", phonetic: "वी आर ट्रांसपोर्टिंग आवर सूटकेसेस ऑन द लगेज कार्ट।" },
      ],
      hard: [
        { hindi: "हवाई अड्डे पर सुरक्षा जांच के दौरान शांत रहना और निर्देशों का पालन करना जरूरी है।", english: "Remaining composed during airport security checks demonstrates mature awareness.", phonetic: "रिमेनिंग कम्पोज़्ड ड्यूरिंग एयरपोर्ट सिक्योरिटी चेक्स डिमॉन्स्ट्रेट्स मैच्योर अवेयरनेस।" },
      ],
    },
    reading: {
      title: "Boarding the Express",
      hindiTitle: "एक्सप्रेस में सवार",
      storyEn: "The loud speaker announced: 'The Blue Express is ready for boarding!' Tina gripped her mother's hand. She found seat number 24 and buckled her seatbelt.",
      storyHi: "लाउडस्पीकर पर घोषणा हुई: 'ब्लू एक्सप्रेस प्रस्थान के लिए तैयार है!' टीना ने अपनी माँ का हाथ थामा। उसने सीट नंबर 24 पाई और सीटबेल्ट बाँध ली।",
      vocabWords: [
        { word: "Platform", meaning: "प्लेटफॉर्म", phonetic: "प्लेटफॉर्म" },
        { word: "Journey", meaning: "यात्रा / सफर", phonetic: "जर्नी" },
        { word: "Luggage", meaning: "सामान", phonetic: "लगेज" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "यहाँ मेरा टिकट है।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["ticket.", "my", "is", "Here"],
      correctAnswer: "Here is my ticket.",
    },
    targetStars: 10,
  },
  {
    day: 41,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "Asking for Help & Safety Rules",
    hindiTitle: "मदद मांगना और सुरक्षा के नियम",
    icon: "🛡️",
    summary: "Can you help me?, I am lost, Emergency number, Zebra crossing.",
    sentences: {
      easy: [
        { hindi: "क्या आप मेरी मदद कर सकते हैं?", english: "Can you please help me?", phonetic: "कैन यू प्लीज हेल्प मी?" },
        { hindi: "सड़क हमेशा जेब्रा क्रॉसिंग से पार करें।", english: "Always cross at the zebra crossing.", phonetic: "ऑलवेज़ क्रॉस एट द जेब्रा क्रॉसिंग।" },
        { hindi: "मुझे अपने घर का फोन नंबर याद है।", english: "I remember my parent's phone number.", phonetic: "आई रिमेम्बर माय पेरेंट्स फोन नंबर।" },
      ],
      medium: [
        { hindi: "यदि आप कभी खो जाएं, तो तुरंत किसी पुलिसकर्मी या सुरक्षा गार्ड से संपर्क करें।", english: "If you ever get separated, seek assistance from a security officer immediately.", phonetic: "इफ यू एवर गेट सेपरेटेड, सीक असिस्टेंस फ्रॉम अ सिक्योरिटी ऑफिसर इमीडिएटली।" },
      ],
      hard: [
        { hindi: "आपातकालीन स्थिति में कभी घबराएं नहीं; शांत मन से सहायता मांगना ही सबसे बड़ी समझदारी है।", english: "Never panic during unexpected emergencies; calm composure solves critical challenges.", phonetic: "नेवर पैनिक ड्यूरिंग अनएक्सपेक्टेड इमरजेंसीज़; काम कम्पोज़र सॉल्व्स क्रिटिकल चैलेंजेस।" },
      ],
    },
    reading: {
      title: "The Brave Boy at the Fair",
      hindiTitle: "मेले में बहादुर बालक",
      storyEn: "Deepak lost sight of his father in the crowded Diwali fair. Instead of crying, he walked straight to the help desk. 'I am Deepak. Please page my father!' he said clearly.",
      storyHi: "दीपक ने दीवाली के भीड़भाड़ वाले मेले में अपने पिता का हाथ छोड़ दिया। रोने के बजाय, वह सीधे सहायता केंद्र गया। 'मैं दीपक हूँ। कृपया मेरे पिताजी को लाउडस्पीकर पर बुलाइए!' उसने साफ स्वर में कहा।",
      vocabWords: [
        { word: "Emergency", meaning: "आपातकाल", phonetic: "इमरजेंसी" },
        { word: "Separated", meaning: "बिछड़ जाना", phonetic: "सेपरेटेड" },
        { word: "Composure", meaning: "धैर्य व मानसिक संतुलन", phonetic: "कम्पोज़र" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "क्या आप मेरी मदद कर सकते हैं?",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["help", "me?", "Can", "please", "you"],
      correctAnswer: "Can you please help me?",
    },
    targetStars: 10,
  },
  {
    day: 42,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "Giving Directions: Left, Right, Straight",
    hindiTitle: "रास्ता बताना और दिशाएं",
    icon: "🧭",
    summary: "Go straight, Turn left, Turn right, Opposite to the post office, Near the bank.",
    sentences: {
      easy: [
        { hindi: "सीधे आगे जाइए।", english: "Go straight ahead.", phonetic: "गो स्ट्रेट अहेड।" },
        { hindi: "बाएं मुड़ें।", english: "Turn left.", phonetic: "टर्न लेफ्ट।" },
        { hindi: "दाएं मुड़ें।", english: "Turn right.", phonetic: "टर्न राइट।" },
      ],
      medium: [
        { hindi: "पार्क स्कूल के ठीक सामने स्थित है।", english: "The park is located right opposite to the school.", phonetic: "द पार्क इज़ लोकेटेड राइट ऑपोजिट टू द स्कूल।" },
        { hindi: "दो सौ मीटर चलने के बाद आपको एक बड़ा मंदिर दिखेगा।", english: "After walking two hundred meters, you will see a grand temple.", phonetic: "आफ्टर वॉकिंग टू हंड्रेड मीटर्स, यू विल सी अ ग्रैंड टेम्पल।" },
      ],
      hard: [
        { hindi: "जब आप चौराहे पर पहुंचें, तो गोल चक्कर से दूसरा निकास लें।", english: "When you arrive at the roundabout, carefully take the second exit.", phonetic: "व्हेन यू अराइव एट द राउंडअबाउट, केयरफुली टेक द सेकंड एग्जिट।" },
      ],
    },
    reading: {
      title: "Guiding the Traveler",
      hindiTitle: "यात्री को सही रास्ता बताना",
      storyEn: "A friendly tourist asked, 'Excuse me, where is the art museum?' Shreya pointed with her finger, 'Walk two blocks straight, then turn right at the bakery!'",
      storyHi: "एक पर्यटक ने पूछा, 'माफ कीजिए, कला संग्रहालय कहाँ है?' श्रेया ने उंगली से इशारा किया, 'दो ब्लॉक सीधे चलिए, फिर बेकरी से दाएं मुड़ जाइए!'",
      vocabWords: [
        { word: "Straight", meaning: "सीधा", phonetic: "स्ट्रेट" },
        { word: "Opposite", meaning: "के सामने", phonetic: "ऑपोजिट" },
        { word: "Roundabout", meaning: "गोल चक्कर", phonetic: "राउंडअबाउट" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "सीधे आगे जाइए।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["ahead.", "straight", "Go"],
      correctAnswer: "Go straight ahead.",
    },
    targetStars: 10,
  },
  {
    day: 43,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "Public Speaking: 1-Minute Talk",
    hindiTitle: "माइक पर 1 मिनट भाषण",
    icon: "🎤",
    summary: "Speech structure: Greeting, Topic statement, 3 points, Thank you audience.",
    sentences: {
      easy: [
        { hindi: "आदरणीय शिक्षकों और मेरे प्यारे दोस्तों!", english: "Respected teachers and dear friends!", phonetic: "रिस्पेक्टेड टीचर्स एंड डियर फ्रेंड्स!" },
        { hindi: "आज मैं पर्यावरण के बारे में बोलूँगा।", english: "Today I will speak about nature.", phonetic: "टुडे आई विल स्पीक अबाउट नेचर।" },
        { hindi: "ध्यानपूर्वक सुनने के लिए आपका धन्यवाद!", english: "Thank you all for listening attentively!", phonetic: "थैंक यू ऑल फॉर लिसनिंग अटेंटिवली!" },
      ],
      medium: [
        { hindi: "पेड़ हमारे सच्चे मित्र हैं जो धरती को हरा-भरा रखते हैं।", english: "Trees are our selfless companions that keep our planet thriving.", phonetic: "ट्रीज़ आर आवर सेल्फलेस कम्पेनियंस दैट कीप आवर प्लैनेट थ्राइविंग।" },
        { hindi: "यदि हम सब मिलकर एक-एक पौधा लगाएं, तो हमारा शहर स्वच्छ बनेगा।", english: "If each one of us plants a sapling, our town will turn lush green.", phonetic: "इफ ईच वन ऑफ अस प्लांट्स अ सैपलिंग, आवर टाउन विल टर्न लश ग्रीन।" },
      ],
      hard: [
        { hindi: "मंच पर आत्मविश्वास से बोलने का रहस्य अपनी आवाज की स्पष्टता और चेहरे की मुस्कान में है।", english: "The golden secret of public speaking is voice clarity and a radiant smile.", phonetic: "द गोल्डन सीक्रेट ऑफ पब्लिक स्पीकिंग इज़ वॉइस क्लैरिटी एंड अ रेडियंट स्माइल।" },
      ],
    },
    reading: {
      title: "Ravi's Stage Triumph",
      hindiTitle: "रवि का मंच पर जलवा",
      storyEn: "Ravi held the silver microphone. His heart went thump-thump. But he remembered Chintu's advice: 'Smile and breathe!' Ravi spoke with brilliance and won a thunderous applause!",
      storyHi: "रवि ने चांदी का माइक थामा। उसका दिल धक-धक कर रहा था। लेकिन उसे चिंटू की सलाह याद आई: 'मुस्कुराओ और गहरी सांस लो!' रवि ने अद्भुत भाषण दिया और तालियों की गड़गड़ाहट जीत ली!",
      vocabWords: [
        { word: "Respected", meaning: "आदरणीय", phonetic: "रिस्पेक्टेड" },
        { word: "Attentively", meaning: "ध्यानपूर्वक", phonetic: "अटेंटिवली" },
        { word: "Applause", meaning: "तालियों की गड़गड़ाहट", phonetic: "अप्लॉज" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "आदरणीय शिक्षकों और मेरे प्यारे दोस्तों!",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["friends!", "teachers", "and", "Respected", "dear"],
      correctAnswer: "Respected teachers and dear friends!",
    },
    targetStars: 15,
  },
  {
    day: 44,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "Grand Revision & All-Star Game Marathon",
    hindiTitle: "महा-रिवीजन और ऑल-स्टार गेम मैराथन",
    icon: "🏆",
    summary: "Complete review of vocabulary, grammar patterns, questions, stories, and games.",
    sentences: {
      easy: [
        { hindi: "मैं अब धाराप्रवाह अंग्रेजी बोल सकता हूँ।", english: "I can speak fluent English now.", phonetic: "आई कैन स्पीक फ्लूएंट इंग्लिश नाउ।" },
        { hindi: "सीखना सबसे बड़ा रोमांच है।", english: "Learning is the greatest adventure.", phonetic: "लर्निंग इज़ द ग्रेटेस्ट एडवेंचर।" },
        { hindi: "मैं कल अपना सर्टिफिकेट प्राप्त करूँगा!", english: "I will receive my certificate tomorrow!", phonetic: "आई विल रिसीव माय सर्टिफिकेट टुमारो!" },
      ],
      medium: [
        { hindi: "मैंने पिछले चौवालीस दिनों में 500 से अधिक नए शब्द और वाक्य सीखे।", english: "Over the past forty-four days, I mastered hundreds of useful sentences.", phonetic: "ओवर द पास्ट फोर्टी-फोर डेज़, आई मास्टर्ड हंड्रेड्स ऑफ यूज़फुल सेंटेंसेस।" },
      ],
      hard: [
        { hindi: "भाषा केवल परीक्षा पास करने के लिए नहीं, बल्कि दुनिया भर के लोगों के दिलों को जोड़ने के लिए है।", english: "Language is not merely for testing, but for connecting human hearts globally.", phonetic: "लैंग्वेज इज़ नॉट मियरली फॉर टेस्टिंग, बट फॉर कनेक्टिंग ह्यूमन हार्ट्स ग्लोबली।" },
      ],
    },
    reading: {
      title: "The Hall of Stars",
      hindiTitle: "सितारों का भव्य कक्ष",
      storyEn: "Chintu the Owl and all his friends set up glowing lanterns. 'Look how far you have journeyed from Day 1 to Day 44!' every voice echoed in cheer.",
      storyHi: "चिंटू उल्लू और उसके सभी दोस्तों ने चमकते लालटेन सजाए। 'देखो तुमने दिन 1 से दिन 44 तक कितना शानदार सफर तय किया है!' हर आवाज में खुशी गूंज रही थी।",
      vocabWords: [
        { word: "Fluent", meaning: "धाराप्रवाह", phonetic: "फ्लूएंट" },
        { word: "Adventure", meaning: "रोमांचक यात्रा", phonetic: "एडवेंचर" },
        { word: "Certificate", meaning: "प्रमाणपत्र", phonetic: "सर्टिफिकेट" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "मैं अब धाराप्रवाह अंग्रेजी बोल सकता हूँ।",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["now.", "speak", "fluent", "can", "I", "English"],
      correctAnswer: "I can speak fluent English now.",
    },
    targetStars: 20,
  },
  {
    day: 45,
    phaseId: 6,
    phaseName: "Master Speaker & Real World",
    phaseHindi: "मास्टर स्पीकर और आत्मविश्वास",
    title: "Graduation Day: 45-Day Master Certificate",
    hindiTitle: "दीक्षांत समारोह और मास्टर सर्टिफिकेट",
    icon: "🎓",
    summary: "Congratulations! You have successfully graduated from the 45-Day SpeakEasy English Course!",
    sentences: {
      easy: [
        { hindi: "बधाई हो! आप ग्रेजुएट हो गए!", english: "Congratulations! You graduated!", phonetic: "कांग्रेचुलेशन्स! यू ग्रेजुएटेड!" },
        { hindi: "मुझे अपने आप पर गर्व है।", english: "I am proud of myself.", phonetic: "आई एम प्राउड ऑफ मायसेल्फ।" },
        { hindi: "अंग्रेजी बोलना बहुत आसान है!", english: "Speaking English is so simple!", phonetic: "स्पीकिंग इंग्लिश इज़ सो सिंपल!" },
      ],
      medium: [
        { hindi: "मैंने SpeakEasy 45-दिवसीय अंग्रेजी कोर्स सफलतापूर्वक पूरा कर लिया है।", english: "I have successfully completed the SpeakEasy 45-Day English Course.", phonetic: "आई हैव सक्सेसफुली कम्प्लीटेड द स्पीकइज़ी फोर्टी-फाइव डे इंग्लिश कोर्स।" },
        { hindi: "मैं जीवन भर नई चीजें सीखता रहूँगा।", english: "I will continue learning and exploring new wisdom for life.", phonetic: "आई विल कंटिन्यू लर्निंग एंड एक्सप्लोरिंग न्यू विजडम फॉर लाइफ।" },
      ],
      hard: [
        { hindi: "आज मुझे यह प्रतिष्ठित मास्टर सर्टिफिकेट प्राप्त हुआ है, जो मेरे निरंतर अभ्यास और लगन का प्रतीक है।", english: "Today I hold this prestigious Master Certificate, representing my unwavering dedication.", phonetic: "टुडे आई होल्ड दिस प्रेस्टीजियस मास्टर सर्टिफिकेट, रिप्रेज़ेंटिंग माय अनवेवरिंग डेडिकेशन।" },
      ],
    },
    reading: {
      title: "The Grand Graduation Ceremony",
      hindiTitle: "भव्य दीक्षांत समारोह",
      storyEn: "With golden confetti falling from the sky, Chintu handed over the Master Certificate with your name written in shimmering letters. You took the microphone and said with a dazzling smile: 'Thank you! English is now my friend!'",
      storyHi: "आसमान से गिरते सुनहरे कंफेटी के बीच, चिंटू ने आपके नाम का मास्टर सर्टिफिकेट सौंपा। आपने माइक पकड़ा और चमकदार मुस्कान के साथ कहा: 'धन्यवाद! अंग्रेजी अब मेरी सच्ची दोस्त है!'",
      vocabWords: [
        { word: "Graduation", meaning: "दीक्षांत समारोह", phonetic: "ग्रेजुएशन" },
        { word: "Prestigious", meaning: "प्रतिष्ठित", phonetic: "प्रेस्टीजियस" },
        { word: "Unwavering", meaning: "अटूट / दृढ़", phonetic: "अनवेवरिंग" },
      ],
    },
    game: {
      type: "jumble",
      questionHindi: "बधाई हो! आप ग्रेजुएट हो गए!",
      promptEnglish: "Arrange the words in correct order:",
      scrambled: ["graduated!", "Congratulations!", "You"],
      correctAnswer: "Congratulations! You graduated!",
    },
    targetStars: 50,
  },
];
