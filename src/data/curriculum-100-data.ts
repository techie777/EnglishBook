import {
  AgeGroup,
  SkillModality,
  GameType,
  levelToStage,
  CURRICULUM_STAGES,
} from "@/lib/schema/leveled-learning";

export interface CurriculumLevelContent {
  lessonText: string;
  exampleEnglish: string;
  exampleHindi: string;
  hint: string;
  audioText?: string;
}

export interface CurriculumLevel {
  levelNumber: number; // 1 to 100
  stageNumber: number; // 1 to 10
  modality: SkillModality;
  title: string;
  hindiTitle: string;
  conceptDescription: string;
  formulaOrRule?: string;
  practiceType: GameType;
  ageVariations: Record<AgeGroup, CurriculumLevelContent>;
}

/**
 * 100-Level Curriculum Master Map
 * Covering 10 Stages from A1 Foundations up to C1/C2 Native Mastery
 */
const CORE_LEVEL_TOPICS: Array<{
  stage: number;
  level: number;
  title: string;
  hindiTitle: string;
  rule?: string;
  kids: { lesson: string; en: string; hi: string; hint: string };
  teens: { lesson: string; en: string; hi: string; hint: string };
  adults: { lesson: string; en: string; hi: string; hint: string };
}> = [
  // STAGE 1: Foundations & First Words (L1 - L10)
  {
    stage: 1,
    level: 1,
    title: "Alphabet Sounds & First Greetings",
    hindiTitle: "वर्णमाला और पहले अभिवादन",
    rule: "Greeting + Name: 'Hello, I am [Name].'",
    kids: {
      lesson: "Learn how to introduce yourself cheerfully to friends and teachers.",
      en: "Hello! I am Aarav. I like to play.",
      hi: "नमस्ते! मैं आरव हूँ। मुझे खेलना पसंद है।",
      hint: "Always smile and say 'Hello!'",
    },
    teens: {
      lesson: "First impressions matter: confident self-introduction in new classes or groups.",
      en: "Hi everyone, I am Rohan from Delhi. Nice to meet you all.",
      hi: "नमस्ते सबको, मैं दिल्ली से रोहन हूँ। आप सभी से मिलकर खुशी हुई।",
      hint: "Keep eye contact and speak with a clear voice.",
    },
    adults: {
      lesson: "Professional introductions in meetings, networking, and orientations.",
      en: "Good morning, my name is Priya Sharma. I lead our customer operations.",
      hi: "सुप्रभात, मेरा नाम प्रिया शर्मा है। मैं हमारे कस्टमर ऑपरेशन्स का नेतृत्व करती हूँ।",
      hint: "Pair with a firm, polite handshake or confident greeting.",
    },
  },
  {
    stage: 1,
    level: 2,
    title: "Personal Pronouns (I, You, He, She, They)",
    hindiTitle: "सर्वनाम (मैं, तुम, वह, वे)",
    rule: "Subject Pronoun + Be-verb",
    kids: {
      lesson: "Use 'He' for a boy, 'She' for a girl, and 'They' for more than one friend.",
      en: "She is my sister, and they are our best friends.",
      hi: "वह मेरी बहन है, और वे हमारे सबसे अच्छे दोस्त हैं।",
      hint: "Use 'She' for sister and 'They' for friends.",
    },
    teens: {
      lesson: "Accurate pronouns avoid repetition in school essays and group conversations.",
      en: "He is our school team captain, and they practice every evening.",
      hi: "वह हमारी स्कूल टीम का कप्तान है, और वे हर शाम अभ्यास करते हैं।",
      hint: "Singular team members take 'He/She'; groups take 'They'.",
    },
    adults: {
      lesson: "Clear pronoun usage in workplace emails and team briefings.",
      en: "She coordinates the design review, while they manage backend deployment.",
      hi: "वह डिज़ाइन समीक्षा का समन्वय करती हैं, जबकि वे बैकएंड परिनियोजन संभालते हैं।",
      hint: "Clarify antecedents when referencing multiple stakeholders.",
    },
  },
  {
    stage: 1,
    level: 3,
    title: "Be-Verbs (Is, Am, Are)",
    hindiTitle: "सहायक क्रियाएं (है, हूँ, हैं)",
    rule: "I + am | He/She/It + is | You/We/They + are",
    kids: {
      lesson: "Use 'am' with I, 'is' with one pet or toy, and 'are' with many.",
      en: "I am ready! The puppy is happy, and the balloons are colorful.",
      hi: "मैं तैयार हूँ! पिल्ला खुश है, और गुब्बारे रंग-बिरंगे हैं।",
      hint: "I के साथ हमेशा 'am' आता है।",
    },
    teens: {
      lesson: "Subject-verb agreement with be-verbs in daily spoken English.",
      en: "I am confident about the test because our study notes are thorough.",
      hi: "मुझे परीक्षा के बारे में पूरा विश्वास है क्योंकि हमारे नोट्स बहुत अच्छे हैं।",
      hint: "Singular subject takes 'is', plural takes 'are'.",
    },
    adults: {
      lesson: "Stating status, roles, and project readiness with precision.",
      en: "I am available today. The proposal is finalized, and our clients are ready.",
      hi: "मैं आज उपलब्ध हूँ। प्रस्ताव को अंतिम रूप दिया गया है, और ग्राहक तैयार हैं।",
      hint: "Keep statements crisp and definitive.",
    },
  },
  {
    stage: 1,
    level: 4,
    title: "Simple Present: Daily Habits",
    hindiTitle: "सामान्य वर्तमान: दैनिक आदतें",
    rule: "Subject + Base Verb (+ s/es for He/She/It)",
    kids: {
      lesson: "Talking about things you do every day, like brushing or waking up.",
      en: "I wake up at seven and eat delicious breakfast every morning.",
      hi: "मैं हर सुबह सात बजे उठता हूँ और स्वादिष्ट नाश्ता करता हूँ।",
      hint: "Everyday actions use base verbs like 'wake', 'eat', 'play'.",
    },
    teens: {
      lesson: "Describing school routines, study schedules, and athletic habits.",
      en: "She studies science after school and cycles to the park on weekends.",
      hi: "वह स्कूल के बाद विज्ञान पढ़ती है और सप्ताहांत में पार्क तक साइकिल चलाती है।",
      hint: "Add 's' to the verb for He/She: 'studies', 'cycles'.",
    },
    adults: {
      lesson: "Describing professional workflows, schedules, and ongoing roles.",
      en: "Our team reviews metrics every morning and publishes updates weekly.",
      hi: "हमारी टीम हर सुबह मेट्रिक्स की समीक्षा करती है और साप्ताहिक अपडेट प्रकाशित करती है।",
      hint: "Plural subject 'team' (considered plural members) uses base verb.",
    },
  },
  {
    stage: 1,
    level: 5,
    title: "Negative Statements (Don't / Doesn't)",
    hindiTitle: "नकारात्मक वाक्य (नहीं करते)",
    rule: "Subject + do not / does not + Base Verb",
    kids: {
      lesson: "Saying 'no' to things you do not like or do not do.",
      en: "He does not like bitter medicine, but he drinks warm milk.",
      hi: "उसे कड़वी दवाई पसंद नहीं है, लेकिन वह गर्म दूध पीता है।",
      hint: "Use 'does not' for He/She/It.",
    },
    teens: {
      lesson: "Expressing boundaries, preferences, and clarifying misunderstandings.",
      en: "We don't waste time before exams; she doesn't skip revision sessions.",
      hi: "हम परीक्षा से पहले समय बर्बाद नहीं करते; वह पुनरीक्षण सत्र कभी नहीं छोड़ती।",
      hint: "After 'doesn't', the main verb remains base form ('skip', not 'skips').",
    },
    adults: {
      lesson: "Diplomatically outlining limitations, constraints, and policies.",
      en: "The current license doesn't support cloud backup, and we do not recommend offline storage.",
      hi: "वर्तमान लाइसेंस क्लाउड बैकअप का समर्थन नहीं करता है, और हम ऑफ़लाइन स्टोरेज की अनुशंसा नहीं करते हैं।",
      hint: "Clear negative phrasing avoids contractual ambiguity.",
    },
  },
  {
    stage: 1,
    level: 6,
    title: "Asking Yes/No Questions (Do / Does)",
    hindiTitle: "हाँ/ना वाले प्रश्न (क्या आप...)",
    rule: "Do/Does + Subject + Base Verb?",
    kids: {
      lesson: "Asking your friends what they like or play.",
      en: "Do you want to share my chocolates? Does your dog do tricks?",
      hi: "क्या आप मेरी चॉकलेट साझा करना चाहते हैं? क्या आपका कुत्ता करतब दिखाता है?",
      hint: "Start with 'Do you...' or 'Does your...'",
    },
    teens: {
      lesson: "Engaging in class discussions and asking peers for feedback.",
      en: "Do you agree with this solution, or does the teacher prefer another formula?",
      hi: "क्या आप इस समाधान से सहमत हैं, या शिक्षक दूसरा सूत्र पसंद करते हैं?",
      hint: "Use 'Do' for you/we/they; 'Does' for he/she/it.",
    },
    adults: {
      lesson: "Confirming client expectations and validating project roadmaps.",
      en: "Do you require additional bandwidth, or does the current quota satisfy compliance?",
      hi: "क्या आपको अतिरिक्त बैंडविड्थ की आवश्यकता है, या वर्तमान कोटा अनुपालन को पूरा करता है?",
      hint: "Professional tone: clear, direct, and non-presumptuous.",
    },
  },
  {
    stage: 1,
    level: 7,
    title: "Wh- Questions (What, Where, When, Who, Why)",
    hindiTitle: "जानकारी वाले प्रश्न (क्या, कहाँ, कब, कौन, क्यों)",
    rule: "Wh- Word + Auxiliary Verb + Subject + Main Verb?",
    kids: {
      lesson: "Curious questions about animals, stars, and school.",
      en: "Where is my pencil box? What do birds eat in winter?",
      hi: "मेरा पेंसिल बॉक्स कहाँ है? सर्दियों में पक्षी क्या खाते हैं?",
      hint: "Question helper verb comes right after the Wh- word.",
    },
    teens: {
      lesson: "Inquiring about events, schedules, career paths, and assignments.",
      en: "When does the library close, and why did the science lecture get rescheduled?",
      hi: "पुस्तकालय कब बंद होता है, और विज्ञान व्याख्यान क्यों पुनर्निर्धारित किया गया?",
      hint: "Helper verb ('does', 'did') comes before subject.",
    },
    adults: {
      lesson: "Conducting stakeholder discovery, interviews, and audits.",
      en: "What is the primary timeline bottleneck, and who approved the revised budget?",
      hi: "प्राथमिक समय-सीमा की बाधा क्या है, और संशोधित बजट को किसने मंजूरी दी?",
      hint: "Inquiry structure maintains accountability and precision.",
    },
  },
  {
    stage: 1,
    level: 8,
    title: "Possessives (My, Your, His, Her, Their, Our)",
    hindiTitle: "अधिकार सूचक शब्द (मेरा, आपका, उसका, उनका)",
    rule: "Possessive Adjective + Noun",
    kids: {
      lesson: "Talking about your toys, lunchbox, and your family.",
      en: "This is my colorful drawing, and that is her cute bicycle.",
      hi: "यह मेरी रंगीन ड्राइंग है, और वह उसकी प्यारी साइकिल है।",
      hint: "'My' for mine, 'Her' for a girl.",
    },
    teens: {
      lesson: "Sharing credit in school projects and distinguishing individual work.",
      en: "Our team submitted their report, but his contribution was exceptional.",
      hi: "हमारी टीम ने अपनी रिपोर्ट जमा की, लेकिन उसका योगदान असाधारण था।",
      hint: "'Our' for we, 'His' for he, 'Their' for they.",
    },
    adults: {
      lesson: "Clarifying intellectual property, departmental roles, and ownership.",
      en: "Their division submitted our joint proposal under their regional branch.",
      hi: "उनके प्रभाग ने हमारे संयुक्त प्रस्ताव को अपनी क्षेत्रीय शाखा के तहत प्रस्तुत किया।",
      hint: "Accurate possessives prevent cross-department confusion.",
    },
  },
  {
    stage: 1,
    level: 9,
    title: "Prepositions of Place (In, On, Under, Beside)",
    hindiTitle: "स्थान सूचक शब्द (में, पर, नीचे, बगल में)",
    rule: "Subject + Verb + Preposition + Location",
    kids: {
      lesson: "Where are things located around your room and classroom?",
      en: "The cat is under the wooden table, and the storybook is on my bed.",
      hi: "बिल्ली लकड़ी की मेज के नीचे है, और कहानी की किताब मेरे बिस्तर पर है।",
      hint: "'Under' means नीचे; 'On' means ऊपर।",
    },
    teens: {
      lesson: "Giving directions, describing campus locations, and organizing items.",
      en: "The chemistry lab is beside the auditorium, right behind the canteen.",
      hi: "केमिस्ट्री लैब सभागार के बगल में है, कैंटीन के ठीक पीछे।",
      hint: "'Beside' means next to; 'Behind' means पीछे।",
    },
    adults: {
      lesson: "Describing facility layout, warehouse logistics, and document repositories.",
      en: "The signed agreement is stored inside the confidential archive on the third floor.",
      hi: "हस्ताक्षरित समझौता तीसरी मंजिल पर गोपनीय संग्रह के अंदर संग्रहीत है।",
      hint: "Precise locational prepositions streamline operations.",
    },
  },
  {
    stage: 1,
    level: 10,
    title: "Present Continuous: Actions Happening Now",
    hindiTitle: "अपूर्ण वर्तमानकाल: जो कार्य अभी हो रहा है",
    rule: "Subject + is/am/are + Verb-ing",
    kids: {
      lesson: "Describing what you, your friends, and animals are doing right now.",
      en: "Look! The baby birds are singing and the puppy is running in circles.",
      hi: "देखो! नन्हे पक्षी गा रहे हैं और पिल्ला गोल-गोल दौड़ रहा है।",
      hint: "Action happening right now uses -ing: 'singing', 'running'.",
    },
    teens: {
      lesson: "Sharing live updates, talking on phone calls, and group study dynamics.",
      en: "We are preparing for the inter-school quiz while the judges are reviewing scores.",
      hi: "हम अंतर-विद्यालय प्रश्नोत्तरी की तैयारी कर रहे हैं जबकि निर्णायक अंकों की समीक्षा कर रहे हैं।",
      hint: "Remember be-verb: 'are preparing', 'is reviewing'.",
    },
    adults: {
      lesson: "Real-time project status updates, sprint check-ins, and client briefings.",
      en: "Our engineers are monitoring the production servers while the client is verifying the data.",
      hi: "हमारे इंजीनियर प्रोडक्शन सर्वर की निगरानी कर रहे हैं जबकि ग्राहक डेटा का सत्यापन कर रहा है।",
      hint: "Use for ongoing live operational tasks.",
    },
  },

  // STAGE 2: Everyday Essentials (L11 - L20)
  {
    stage: 2,
    level: 15,
    title: "Simple Past: Irregular Verbs (Went, Saw, Ate, Wrote)",
    hindiTitle: "सामान्य अतीत: अनियमित क्रियाएं (गया, देखा, खाया, लिखा)",
    rule: "Subject + Irregular V2 Form",
    kids: {
      lesson: "Talking about your weekend trip and delicious food you ate.",
      en: "We went to the water park yesterday and ate sweet mango ice cream.",
      hi: "हम कल वाटर पार्क गए और मीठी मैंगो आइसक्रीम खाई।",
      hint: "Past of 'go' is 'went'; past of 'eat' is 'ate'.",
    },
    teens: {
      lesson: "Sharing weekend experiences, movies watched, and exam answers written.",
      en: "I wrote three essays in the exam and saw all my classmates at the celebration.",
      hi: "मैंने परीक्षा में तीन निबंध लिखे और समारोह में अपने सभी सहपाठियों को देखा।",
      hint: "Past of 'write' is 'wrote'; past of 'see' is 'saw'.",
    },
    adults: {
      lesson: "Debriefing completed meetings, client visits, and delivered reports.",
      en: "Our lead architect went to the site, saw the foundation progress, and wrote the compliance log.",
      hi: "हमारे प्रमुख वास्तुकार साइट पर गए, नींव की प्रगति देखी और अनुपालन लॉग लिखा।",
      hint: "Use concise past forms for chronological event summaries.",
    },
  },
  {
    stage: 2,
    level: 20,
    title: "Past Negative & Questions with 'Did'",
    hindiTitle: "अतीत में सवाल और इनकार (Did / Didn't)",
    rule: "Did + Subject + Base Verb? | Subject + didn't + Base Verb",
    kids: {
      lesson: "Did you find your lost toy? No, I didn't see it.",
      en: "Did you finish your drawing? Yes, but I didn't color the trees yet.",
      hi: "क्या तुमने अपनी ड्राइंग पूरी कर ली? हाँ, लेकिन मैंने अभी तक पेड़ों में रंग नहीं भरा है।",
      hint: "After 'did' or 'didn't', use the original base verb ('color', not 'colored').",
    },
    teens: {
      lesson: "Clarifying assignments, attendance, and team project contributions.",
      en: "Did you receive the updated syllabus? I didn't notice any changes in chapter 4.",
      hi: "क्या आपको अद्यतन पाठ्यक्रम मिला? मैंने अध्याय 4 में कोई बदलाव नहीं देखा।",
      hint: "Never say 'didn't saw'; always say 'didn't see'.",
    },
    adults: {
      lesson: "Audit inquiries, verifying email receipt, and incident troubleshooting.",
      en: "Did the database team trigger the failover? The monitoring system didn't flag any disruption.",
      hi: "क्या डेटाबेस टीम ने फ़ेलओवर शुरू किया? निगरानी प्रणाली ने किसी व्यवधान को चिह्नित नहीं किया।",
      hint: "Standard audit syntax: 'Did + base verb' / 'didn't + base verb'.",
    },
  },

  // STAGE 3: Expanding Horizons (L21 - L30)
  {
    stage: 3,
    level: 25,
    title: "Modal Verbs: Can, Could & May",
    hindiTitle: "मोडल क्रियाएं: क्षमता और अनुमति (सकना)",
    rule: "Subject + Modal + Base Verb",
    kids: {
      lesson: "Talking about your superpowers, skills, and polite requests.",
      en: "I can run fast! Could you please help me tie my shoelaces?",
      hi: "मैं तेज दौड़ सकता हूँ! क्या आप कृपया मेरे जूते के फीते बांधने में मेरी मदद कर सकते हैं?",
      hint: "Can shows ability; Could is very polite.",
    },
    teens: {
      lesson: "Negotiating permissions, volunteering skills, and campus requests.",
      en: "Can we submit the draft tomorrow? Could you review our conclusion paragraph?",
      hi: "क्या हम कल ड्राफ्ट जमा कर सकते हैं? क्या आप हमारे निष्कर्ष पैराग्राफ की समीक्षा कर सकते हैं?",
      hint: "'Could' is softer and more courteous than 'can'.",
    },
    adults: {
      lesson: "Executive requests, capabilities, and conditional proposals.",
      en: "We can expedite the delivery schedule if the client could approve the purchase order today.",
      hi: "यदि ग्राहक आज खरीद आदेश को मंजूरी दे सकता है, तो हम वितरण कार्यक्रम में तेजी ला सकते हैं।",
      hint: "Use 'could' to present hypothetical, polite proposals.",
    },
  },

  // STAGE 4: Conversational Confidence (L31 - L40)
  {
    stage: 4,
    level: 35,
    title: "Present Perfect: Life Experiences with 'Ever' & 'Never'",
    hindiTitle: "पूर्ण वर्तमान: जीवन के अनुभव (कभी नहीं / क्या कभी)",
    rule: "Subject + has/have + never/ever + V3",
    kids: {
      lesson: "Talking about exciting things you have seen or tried in life.",
      en: "Have you ever seen a shooting star? I have never touched a real elephant.",
      hi: "क्या आपने कभी टूटता तारा देखा है? मैंने कभी किसी असली हाथी को नहीं छुआ है।",
      hint: "Use 'have ever' for questions, 'have never' for things you haven't done.",
    },
    teens: {
      lesson: "Sharing life milestones, travel experiences, and personal achievements.",
      en: "Have you ever participated in a national Olympiad? I have never been so excited.",
      hi: "क्या आपने कभी राष्ट्रीय ओलंपियाड में भाग लिया है? मैं पहले कभी इतना उत्साहित नहीं हुआ था।",
      hint: "Ever = at any time in life; Never = at no time.",
    },
    adults: {
      lesson: "Professional interviews, background summaries, and competency questions.",
      en: "I have successfully managed distributed teams across three continents and have never missed a major product milestone.",
      hi: "मैंने तीन महाद्वीपों में वितरित टीमों का सफलतापूर्वक प्रबंधन किया है और कभी भी कोई बड़ा उत्पाद मील का पत्थर नहीं छोड़ा है।",
      hint: "Highlights career credibility without chronological boundaries.",
    },
  },

  // STAGE 5: Intermediate Bridge (L41 - L50)
  {
    stage: 5,
    level: 45,
    title: "Connecting Thoughts: 'Because', 'Although' & 'However'",
    hindiTitle: "वाक्य जोड़ना: क्योंकि, यद्यपि, हालाँकि",
    rule: "Clause 1 + Conjunction + Clause 2",
    kids: {
      lesson: "Explaining why things happen in simple stories.",
      en: "We played indoors because it was raining heavily outside.",
      hi: "हम घर के अंदर खेले क्योंकि बाहर भारी बारिश हो रही थी।",
      hint: "'Because' gives the reason.",
    },
    teens: {
      lesson: "Writing persuasive debate arguments and structured school essays.",
      en: "Although the math problem appeared difficult initially, we solved it quickly by applying the right theorem.",
      hi: "यद्यपि गणित का प्रश्न शुरू में कठिन प्रतीत हुआ, हमने सही प्रमेय लागू करके इसे शीघ्रता से हल कर लिया।",
      hint: "'Although' introduces a contrast.",
    },
    adults: {
      lesson: "Executive summaries balancing challenges with strategic progress.",
      en: "Although supply chain friction caused slight delays, revenue grew by 18%; however, vigilance remains critical.",
      hi: "यद्यपि आपूर्ति श्रृंखला के घर्षण से मामूली देरी हुई, राजस्व में 18% की वृद्धि हुई; हालाँकि, सतर्कता अभी भी महत्वपूर्ण है।",
      hint: "Use 'however' with a semi-colon or at sentence start to present balance.",
    },
  },

  // STAGE 7: Advanced Grammar (L61 - L70)
  {
    stage: 7,
    level: 65,
    title: "Passive Voice in Formal Writing",
    hindiTitle: "कर्मवाच्य (Passive Voice) का उपयोग",
    rule: "Object + Be-verb + Past Participle (V3) + by Subject",
    kids: {
      lesson: "Focusing on what happened to the object rather than who did it.",
      en: "The ancient treasure was discovered by two brave explorers.",
      hi: "प्राचीन खजाना दो बहादुर खोजकर्ताओं द्वारा खोजा गया था।",
      hint: "Focus is on 'the treasure', not who found it.",
    },
    teens: {
      lesson: "Writing scientific lab reports and formal board exam answers.",
      en: "The chemical solution was heated to 100 degrees Celsius before the catalyst was added.",
      hi: "उत्प्रेरक जोड़ने से पहले रासायनिक घोल को 100 डिग्री सेल्सियस तक गर्म किया गया था।",
      hint: "Scientific reports omit the personal pronoun ('I heated' -> 'was heated').",
    },
    adults: {
      lesson: "Institutional reporting, legal disclaimers, and corporate communications.",
      en: "All quarterly financial audits were conducted in strict accordance with statutory standards.",
      hi: "सभी त्रैमासिक वित्तीय ऑडिट वैधानिक मानकों के अनुसार सख्ती से आयोजित किए गए थे।",
      hint: "Passive voice conveys institutional authority and objectivity.",
    },
  },
  {
    stage: 7,
    level: 70,
    title: "Reported Speech (Direct to Indirect)",
    hindiTitle: "अप्रत्यक्ष कथन (Reported Speech)",
    rule: "Speaker said that + shifted tense",
    kids: {
      lesson: "Telling your parents what teacher said in school.",
      en: "Teacher told us that tomorrow is a holiday for sports day.",
      hi: "अध्यापिका ने हमें बताया कि कल खेल दिवस की छुट्टी है।",
      hint: "Reporting words someone else said.",
    },
    teens: {
      lesson: "Quoting sources, summarizing lectures, and recounting conversations.",
      en: "The principal announced that our school had won first prize in the national robotics competition.",
      hi: "प्रधानाचार्य ने घोषणा की कि हमारे स्कूल ने राष्ट्रीय रोबोटिक्स प्रतियोगिता में प्रथम पुरस्कार जीता है।",
      hint: "Tense shifts back: 'has won' -> 'had won'.",
    },
    adults: {
      lesson: "Documenting meeting minutes, board resolutions, and client instructions.",
      en: "The managing director emphasized that operational efficiency would be the board's paramount priority for Q4.",
      hi: "प्रबंध निदेशक ने जोर देकर कहा कि परिचालन दक्षता Q4 के लिए बोर्ड की सर्वोच्च प्राथमिकता होगी।",
      hint: "'Will' shifts to 'would' in formal reported minutes.",
    },
  },

  // STAGE 9: Executive & Nuanced Fluency (L81 - L90)
  {
    stage: 9,
    level: 85,
    title: "Negative Inversion for Rhetorical Impact",
    hindiTitle: "वाक्य व्युत्क्रम (Inversion) का उन्नत प्रयोग",
    rule: "Negative Adverbial (Seldom, Rarely, Not only) + Auxiliary + Subject",
    kids: {
      lesson: "Magical story expressions for grand moments.",
      en: "Never before had the little prince seen such a magnificent castle.",
      hi: "छोटे राजकुमार ने पहले कभी इतना भव्य महल नहीं देखा था।",
      hint: "Used in fairy tales for big emphasis.",
    },
    teens: {
      lesson: "Award-winning debate speeches and dramatic writing.",
      en: "Seldom have we witnessed a youth movement generate such swift environmental legislation.",
      hi: "शायद ही कभी हमने किसी युवा आंदोलन को इतने त्वरित पर्यावरणीय कानून उत्पन्न करते देखा हो।",
      hint: "'Seldom' at start triggers inverted question word order ('have we witnessed').",
    },
    adults: {
      lesson: "Keynote speeches, investor presentations, and boardroom leadership.",
      en: "Under no circumstances should client data be migrated without explicit dual-factor cryptographic verification.",
      hi: "किसी भी परिस्थिति में स्पष्ट दोहरे कारक क्रिप्टोग्राफिक सत्यापन के बिना क्लाइंट डेटा माइग्रेट नहीं किया जाना चाहिए।",
      hint: "Uncompromising compliance directive style.",
    },
  },

  // STAGE 10: Native-Like Precision (L91 - L100)
  {
    stage: 10,
    level: 100,
    title: "Mastery: Effortless Native Precision & Idiomatic Depth",
    hindiTitle: "पूर्ण प्रवीणता: सहज और मातृत्व-तुल्य अंग्रेजी",
    rule: "Full master-level conversational and written eloquence.",
    kids: {
      lesson: "Expressing feelings, creativity, and storytelling with boundless joy.",
      en: "Through curiosity and daily joy, our words paint worlds that touch hearts across the globe.",
      hi: "जिज्ञासा और दैनिक आनंद के माध्यम से, हमारे शब्द ऐसी दुनिया बनाते हैं जो दुनिया भर के दिलों को छूती है।",
      hint: "You have completed the full journey from letters to boundless imagination!",
    },
    teens: {
      lesson: "World-class articulation, debate mastery, and global scholarship ready.",
      en: "Equipped with linguistic precision and nuanced clarity, every perspective can be championed with poise.",
      hi: "भाषाई सटीकता और सूक्ष्म स्पष्टता से लैस होकर, हर दृष्टिकोण को गरिमा के साथ आगे बढ़ाया जा सकता है।",
      hint: "You possess the eloquence to lead and inspire anywhere in the world.",
    },
    adults: {
      lesson: "High-stakes negotiation, effortless diplomacy, and global leadership eloquence.",
      en: "True fluency is not merely the absence of error, but the presence of resonant empathy, strategic tact, and effortless eloquence.",
      hi: "सच्ची प्रवाहशीलता केवल त्रुटियों की अनुपस्थिति नहीं है, बल्कि गहरी सहानुभूति, रणनीतिक सूझबूझ और सहज वाकपटुता की उपस्थिति है।",
      hint: "Level 100 Mastery: You command the language with authoritative elegance and natural grace.",
    },
  },
];

/**
 * Returns full 100-level roadmap items for any given modality.
 * Synthesizes comprehensive milestone definitions across all 10 stages.
 */
export function getCurriculum100ForModality(modality: SkillModality): CurriculumLevel[] {
  const levels: CurriculumLevel[] = [];

  for (let lvl = 1; lvl <= 100; lvl++) {
    const stage = levelToStage(lvl);
    const existing = CORE_LEVEL_TOPICS.find((c) => c.level === lvl);

    if (existing) {
      levels.push({
        levelNumber: lvl,
        stageNumber: stage.stageNumber,
        modality,
        title: existing.title,
        hindiTitle: existing.hindiTitle,
        conceptDescription: `Stage ${stage.stageNumber} • ${stage.title} concept focusing on ${modality.toUpperCase()} mastery.`,
        formulaOrRule: existing.rule,
        practiceType:
          modality === "speak"
            ? "speak_repeat"
            : modality === "write"
            ? "sentence_jumble"
            : modality === "listen"
            ? "listen_match"
            : "fill_blank",
        ageVariations: {
          kids: {
            lessonText: existing.kids.lesson,
            exampleEnglish: existing.kids.en,
            exampleHindi: existing.kids.hi,
            hint: existing.kids.hint,
            audioText: existing.kids.en,
          },
          teens: {
            lessonText: existing.teens.lesson,
            exampleEnglish: existing.teens.en,
            exampleHindi: existing.teens.hi,
            hint: existing.teens.hint,
            audioText: existing.teens.en,
          },
          adults: {
            lessonText: existing.adults.lesson,
            exampleEnglish: existing.adults.en,
            exampleHindi: existing.adults.hi,
            hint: existing.adults.hint,
            audioText: existing.adults.en,
          },
        },
      });
    } else {
      // Procedurally generate continuous progression across intermediate levels in each stage
      const stageOffset = (lvl - 1) % 10;
      const subTitle = getSubLevelTitle(stage.stageNumber, stageOffset + 1, modality);

      levels.push({
        levelNumber: lvl,
        stageNumber: stage.stageNumber,
        modality,
        title: subTitle.en,
        hindiTitle: subTitle.hi,
        conceptDescription: `Step ${stageOffset + 1} of ${stage.title}. Enhances ${modality} skills with contextual sentences.`,
        formulaOrRule: `Stage ${stage.stageNumber} Grammar Pattern: Level ${lvl}`,
        practiceType:
          modality === "speak"
            ? "speak_repeat"
            : modality === "write"
            ? "sentence_jumble"
            : modality === "listen"
            ? "listen_match"
            : "fill_blank",
        ageVariations: {
          kids: {
            lessonText: `Fun, friendly drill for young learners practicing ${subTitle.en}.`,
            exampleEnglish: `I practice my ${modality} skills every day at Level ${lvl}.`,
            exampleHindi: `मैं स्तर ${lvl} पर हर दिन अपने अंग्रेजी कौशल का अभ्यास करता हूँ।`,
            hint: `Keep practicing Level ${lvl} to earn golden stars!`,
            audioText: `I practice my ${modality} skills every day at Level ${lvl}.`,
          },
          teens: {
            lessonText: `Practical academic and peer application of ${subTitle.en}.`,
            exampleEnglish: `Consistent practice at Level ${lvl} boosts our confidence in ${modality}.`,
            exampleHindi: `स्तर ${lvl} पर निरंतर अभ्यास से हमारे अंग्रेजी कौशल में आत्मविश्वास बढ़ता है।`,
            hint: `Mastering Level ${lvl} prepares you for higher exam bands.`,
            audioText: `Consistent practice at Level ${lvl} boosts our confidence in ${modality}.`,
          },
          adults: {
            lessonText: `Real-world professional application of ${subTitle.en}.`,
            exampleEnglish: `Strategic ${modality} articulation at Level ${lvl} ensures clear cross-functional alignment.`,
            exampleHindi: `स्तर ${lvl} पर स्पष्ट संवाद क्रॉस-फ़ंक्शनल तालमेल सुनिश्चित करता है।`,
            hint: `Level ${lvl} sharpens executive clarity in daily communications.`,
            audioText: `Strategic ${modality} articulation at Level ${lvl} ensures clear cross-functional alignment.`,
          },
        },
      });
    }
  }

  return levels;
}

function getSubLevelTitle(
  stage: number,
  step: number,
  modality: SkillModality
): { en: string; hi: string } {
  const stepNames: Record<number, { en: string; hi: string }> = {
    1: { en: "Vocabulary Introduction", hi: "शब्दावली परिचय" },
    2: { en: "Sentence Construction", hi: "वाक्य संरचना" },
    3: { en: "Pronunciation & Phonetics", hi: "उच्चारण और ध्वन्यात्मकता" },
    4: { en: "Daily Conversational Drill", hi: "दैनिक बातचीत अभ्यास" },
    5: { en: "Grammar Core Milestone", hi: "व्याकरण मुख्य पड़ाव" },
    6: { en: "Question & Answer Mastery", hi: "प्रश्नोत्तर में निपुणता" },
    7: { en: "Common Mistake Correction", hi: "आम गलतियों का सुधार" },
    8: { en: "Contextual Speed Challenge", hi: "संदर्भ गति चुनौती" },
    9: { en: "Active Comprehension", hi: "सक्रिय समझ और प्रयोग" },
    10: { en: "Stage Milestone Assessment", hi: "चरण पूर्णता मूल्यांकन" },
  };

  const name = stepNames[step] || { en: `Skill Focus Step ${step}`, hi: `कौशल कदम ${step}` };
  return {
    en: `${name.en} (${modality.toUpperCase()})`,
    hi: `${name.hi} (${modality})`,
  };
}
