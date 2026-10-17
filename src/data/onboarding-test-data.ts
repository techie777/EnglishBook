export interface DiagnosticQuestion {
  id: string;
  questionHindi: string;
  questionEn: string;
  hint?: string;
  options: {
    id: string;
    text: string;
    hindi?: string;
    icon?: string;
  }[];
  correctIndex: number;
}

export interface PersonaTestData {
  persona: "kids" | "teen" | "adult";
  title: string;
  hindiTitle: string;
  mascot: string;
  mascotName: string;
  welcomeMessage: string;
  questions: DiagnosticQuestion[];
}

export const ONBOARDING_TESTS: Record<"kids" | "teen" | "adult", PersonaTestData> = {
  kids: {
    persona: "kids",
    title: "Kids Star Diagnostic Quiz",
    hindiTitle: "बच्चों के लिए मजेदार लेवल टेस्ट",
    mascot: "🦉",
    mascotName: "Chintu The Owl",
    welcomeMessage: "Hi friend! Answer 3 simple fun questions to unlock your special 45-day course!",
    questions: [
      {
        id: "k-q1",
        questionHindi: "इस प्यारे जानवर 🐶 को अंग्रेजी में क्या कहते हैं?",
        questionEn: "What is this cute pet animal called in English?",
        hint: "It barks and wags its tail!",
        options: [
          { id: "opt1", text: "Elephant", hindi: "हाथी", icon: "🐘" },
          { id: "opt2", text: "Dog", hindi: "कुत्ता", icon: "🐶" },
          { id: "opt3", text: "Cat", hindi: "बिल्ली", icon: "🐱" },
        ],
        correctIndex: 1,
      },
      {
        id: "k-q2",
        questionHindi: "'नमस्ते! आप कैसे हैं?' को अंग्रेजी में क्या कहते हैं?",
        questionEn: "How do you say 'नमस्ते! आप कैसे हैं?' in English?",
        hint: "Greeting a friend cheerfully!",
        options: [
          { id: "opt1", text: "Hello! How are you?", hindi: "हेलो! हाउ आर यू?" },
          { id: "opt2", text: "Good night, see you!", hindi: "गुड नाइट, सी यू!" },
          { id: "opt3", text: "I am eating cake.", hindi: "आई एम ईटिंग केक।" },
        ],
        correctIndex: 0,
      },
      {
        id: "k-q3",
        questionHindi: "खाली जगह भरें: 'I ___ to play cricket.'",
        questionEn: "Fill in the blank: 'I ___ to play cricket.'",
        hint: "जब हमें कोई खेल पसंद होता है (Like)",
        options: [
          { id: "opt1", text: "is", hindi: "इज़" },
          { id: "opt2", text: "like", hindi: "लाइक (पसंद करता हूँ)" },
          { id: "opt3", text: "are", hindi: "आर" },
        ],
        correctIndex: 1,
      },
    ],
  },
  teen: {
    persona: "teen",
    title: "Gen-Z Fluency Radar Test",
    hindiTitle: "टीन व यूथ अंग्रेजी लेवल टेस्ट",
    mascot: "🤖",
    mascotName: "Nova AI Coach",
    welcomeMessage: "Let's check your spoken cadence, grammar instinct, and campus conversational level in 60 seconds!",
    questions: [
      {
        id: "t-q1",
        questionHindi: "'आप कल क्या कर रहे हैं?' का सही अंग्रेजी अनुवाद क्या है?",
        questionEn: "What is the accurate English translation for: 'आप कल क्या कर रहे हैं?'",
        hint: "Present continuous used for future plans",
        options: [
          { id: "opt1", text: "Where did you go yesterday?", hindi: "कल आप कहाँ गए थे?" },
          { id: "opt2", text: "What are you doing tomorrow?", hindi: "आप कल क्या कर रहे हैं?" },
          { id: "opt3", text: "Who will come today?", hindi: "आज कौन आएगा?" },
        ],
        correctIndex: 1,
      },
      {
        id: "t-q2",
        questionHindi: "सही वाक्य चुनें: दोस्तों से मिलने के लिए कौन सा Phrasal Verb सही है?",
        questionEn: "Pick the correct phrasal verb: 'I need to catch ___ with my friends.'",
        hint: "Catch up means meeting friends to share updates",
        options: [
          { id: "opt1", text: "catch up", hindi: "मिलना व बातें करना" },
          { id: "opt2", text: "catch on", hindi: "लोकप्रिय होना" },
          { id: "opt3", text: "catch at", hindi: "पकड़ना" },
        ],
        correctIndex: 0,
      },
      {
        id: "t-q3",
        questionHindi: "इनमें से व्याकरण की दृष्टि से कौन सा वाक्य सही है?",
        questionEn: "Which sentence is grammatically correct in standard English?",
        hint: "Third person singular takes 'doesn't'",
        options: [
          { id: "opt1", text: "She don't know the answer.", hindi: "She don't know..." },
          { id: "opt2", text: "She doesn't know the answer.", hindi: "She doesn't know..." },
          { id: "opt3", text: "She not knowing the answer.", hindi: "She not knowing..." },
        ],
        correctIndex: 1,
      },
    ],
  },
  adult: {
    persona: "adult",
    title: "Executive & Daily Life English Assessment",
    hindiTitle: "कार्यस्थल व दैनिक जीवन अंग्रेजी टेस्ट",
    mascot: "👩‍🏫",
    mascotName: "Language Mentor",
    welcomeMessage: "Assess your practical English readiness for meetings, emails, official requests, and everyday conversations.",
    questions: [
      {
        id: "a-q1",
        questionHindi: "'कृपया मुझे फ़ाइल भेजें।' का सबसे विनम्र और आधिकारिक अनुवाद क्या है?",
        questionEn: "What is the polite, professional translation for: 'कृपया मुझे फ़ाइल भेजें।'?",
        hint: "Polite corporate request with please",
        options: [
          { id: "opt1", text: "Please send me the file.", hindi: "कृपया मुझे फ़ाइल भेजें।" },
          { id: "opt2", text: "Give file to me now.", hindi: "अभी मुझे फ़ाइल दो।" },
          { id: "opt3", text: "Where is my file?", hindi: "मेरी फ़ाइल कहाँ है?" },
        ],
        correctIndex: 0,
      },
      {
        id: "a-q2",
        questionHindi: "खाली स्थान भरें: 'I look forward to ___ you at the conference.'",
        questionEn: "Fill in the blank: 'I look forward to ___ you at the conference.'",
        hint: "Look forward to is followed by a gerund (-ing)",
        options: [
          { id: "opt1", text: "meeting", hindi: "meeting (मिलने की प्रतीक्षा)" },
          { id: "opt2", text: "meet", hindi: "meet" },
          { id: "opt3", text: "met", hindi: "met" },
        ],
        correctIndex: 0,
      },
      {
        id: "a-q3",
        questionHindi: "मीटिंग में किसी बात को दोबारा स्पष्ट करने के लिए क्या कहेंगे?",
        questionEn: "How do you politely ask for clarification during an important discussion?",
        hint: "Polite modal verb 'Could you please...'",
        options: [
          { id: "opt1", text: "Could you please clarify that point?", hindi: "क्या आप कृपया उस बिंदु को स्पष्ट कर सकते हैं?" },
          { id: "opt2", text: "I did not listen to you.", hindi: "मैंने आपको नहीं सुना।" },
          { id: "opt3", text: "Say it again loudly.", hindi: "इसे फिर से जोर से बोलो।" },
        ],
        correctIndex: 0,
      },
    ],
  },
};
