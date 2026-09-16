/**
 * Comprehensive Multi-Dimensional English Sentence Classifier
 *
 * Classifies English sentences across 6 linguistic dimensions + Modals:
 * 1. Structure (Simple, Compound, Complex, Compound-Complex)
 * 2. Function / Purpose (Declarative, Interrogative, Imperative, Exclamatory)
 * 3. Voice (Active, Passive)
 * 4. Tense (All 12 English Tenses + General)
 * 5. Modal Verbs (Can, Could, Should, Would, May, Might, Must, Shall, Ought to, Have to / Need to)
 * 6. Speech (Direct vs Indirect/Reported)
 * 7. Mood (Indicative, Imperative, Subjunctive, Conditional)
 */

export type SentenceStructure =
  | "Simple"
  | "Compound"
  | "Complex"
  | "Compound-Complex";

export type SentenceFunction =
  | "Declarative"
  | "Interrogative"
  | "Imperative"
  | "Exclamatory";

export type SentenceVoice = "Active" | "Passive";

export type SentenceTense =
  // Present (4)
  | "Present Simple"
  | "Present Continuous"
  | "Present Perfect"
  | "Present Perfect Continuous"
  // Past (4)
  | "Past Simple"
  | "Past Continuous"
  | "Past Perfect"
  | "Past Perfect Continuous"
  // Future (4)
  | "Future Simple"
  | "Future Continuous"
  | "Future Perfect"
  | "Future Perfect Continuous"
  // Modals & General
  | "Modal Verb"
  | "General";

export type ModalVerb =
  | "Can"
  | "Could"
  | "May"
  | "Might"
  | "Will"
  | "Would"
  | "Shall"
  | "Should"
  | "Must"
  | "Ought to"
  | "Have to / Need to"
  | "Used to"
  | "Had better"
  | "Dare";

export type SentenceSpeech = "Direct" | "Indirect";

export type SentenceMood =
  | "Indicative"
  | "Imperative"
  | "Subjunctive"
  | "Conditional";

export interface ComprehensiveClassification {
  structure: SentenceStructure;
  function: SentenceFunction;
  voice: SentenceVoice;
  tense: SentenceTense;
  modal?: ModalVerb | null;
  speech: SentenceSpeech;
  mood: SentenceMood;
  primaryBadge: string;
  badgeColorClass: string;
  structureExplanation: string;
  functionExplanation: string;
  voiceExplanation: string;
  tenseExplanation: string;
  modalExplanation?: string;
  moodExplanation: string;
  speechExplanation: string;
}

/**
 * Classifies an English sentence across all linguistic dimensions
 */
export function classifySentence(
  englishSentence: string,
  hindiMeaning?: string
): ComprehensiveClassification {
  const eng = englishSentence.trim();
  const lower = eng.toLowerCase();

  // ----------------------------------------------------
  // 1. MODAL VERB DETECTION (Core & Semi-Modals)
  // ----------------------------------------------------
  let detectedModal: ModalVerb | null = null;
  let modalExpl = "";

  if (/\b(could|couldn't)\b/i.test(lower)) {
    detectedModal = "Could";
    modalExpl = "Expresses polite request, past capability, or tentative possibility ('Could you help me?').";
  } else if (/\b(should|shouldn't)\b/i.test(lower)) {
    detectedModal = "Should";
    modalExpl = "Expresses recommendation, moral advice, or expectation ('You should rest.').";
  } else if (/\b(would|wouldn't|'d like to)\b/i.test(lower)) {
    detectedModal = "Would";
    modalExpl = "Expresses polite offer, conditional outcome, or preference ('Would you like tea?').";
  } else if (/\b(can|can't|cannot)\b/i.test(lower)) {
    detectedModal = "Can";
    modalExpl = "Expresses present ability, capability, or informal permission ('I can do it.').";
  } else if (/\b(might|might not)\b/i.test(lower)) {
    detectedModal = "Might";
    modalExpl = "Expresses tentative or lower probability ('It might rain later.').";
  } else if (/\b(may|may not)\b/i.test(lower)) {
    detectedModal = "May";
    modalExpl = "Expresses formal polite permission or strong likelihood ('May I come in?').";
  } else if (/\b(must|mustn't)\b/i.test(lower)) {
    detectedModal = "Must";
    modalExpl = "Expresses strong obligation, necessity, or logical certainty ('You must be careful.').";
  } else if (/\b(shall)\b/i.test(lower)) {
    detectedModal = "Shall";
    modalExpl = "Expresses formal intention, suggestion, or rule ('Shall we leave?').";
  } else if (/\b(ought to)\b/i.test(lower)) {
    detectedModal = "Ought to";
    modalExpl = "Expresses moral duty or advisable social action ('We ought to respect elders.').";
  } else if (/\b(had better|'d better)\b/i.test(lower)) {
    detectedModal = "Had better";
    modalExpl = "Expresses strong urgent advice or caution with consequences ('You had better hurry.').";
  } else if (/\b(used to)\b/i.test(lower)) {
    detectedModal = "Used to";
    modalExpl = "Expresses a discontinued past habit or past state ('I used to live in Delhi.').";
  } else if (/\b(dare|daren't|dare not)\b/i.test(lower)) {
    detectedModal = "Dare";
    modalExpl = "Expresses courage, boldness, or challenge ('How dare you speak like that!').";
  } else if (/\b(have to|has to|had to|need to|needs to|needed to|needn't)\b/i.test(lower)) {
    detectedModal = "Have to / Need to";
    modalExpl = "Expresses practical necessity or external obligation ('I have to attend a meeting.').";
  } else if (/\b(will|won't|'ll)\b/i.test(lower)) {
    detectedModal = "Will";
    modalExpl = "Expresses future certainty, intention, promise, or willing commitment ('I will assist you.').";
  }

  // ----------------------------------------------------
  // 2. FUNCTION / PURPOSE
  // ----------------------------------------------------
  let func: SentenceFunction = "Declarative";
  let funcExpl = "Makes a statement of fact, thought, or opinion.";

  if (
    eng.endsWith("?") ||
    /^(is|are|am|was|were|do|does|did|have|has|had|can|could|would|should|may|might|will|shall|what|where|when|why|how|who|whom|whose|which)\b/i.test(
      eng
    )
  ) {
    func = "Interrogative";
    funcExpl = "Asks a direct question seeking information or confirmation.";
  } else if (
    (eng.endsWith("!") &&
      /^(what a|how |wow|oh|alas|hurray|thank god|great)/i.test(lower)) ||
    lower.startsWith("what a wonderful") ||
    lower.startsWith("how wonderful")
  ) {
    func = "Exclamatory";
    funcExpl = "Expresses intense emotion, surprise, or exclamation.";
  } else if (
    /^(please|don't|do not|let's|take |listen|wait |come |stop |keep |be careful|give me|tell me|open |close |remember |never )\b/i.test(
      lower
    ) ||
    (/^[A-Z][a-z]+\s+(the|your|this|that|me|us)\b/.test(eng) &&
      !/\b(am|is|are|was|were|will|have|has)\b/i.test(lower))
  ) {
    func = "Imperative";
    funcExpl = "Gives a command, instruction, advice, or polite request.";
  }

  // ----------------------------------------------------
  // 3. MOOD
  // ----------------------------------------------------
  let mood: SentenceMood = "Indicative";
  let moodExpl = "Expresses an objective fact, reality, or straightforward question.";

  if (
    /\b(if|provided that|as long as|unless)\b/i.test(lower) &&
    /\b(would|could|might|had|will)\b/i.test(lower)
  ) {
    mood = "Conditional";
    moodExpl = "Expresses a condition and its hypothetical outcome ('If... then...').";
  } else if (
    /\b(if i were|i wish|demanded that|insisted that|it is essential that|suggested that)\b/i.test(
      lower
    )
  ) {
    mood = "Subjunctive";
    moodExpl = "Expresses a wish, hypothetical unreality, or formal demand.";
  } else if (func === "Imperative") {
    mood = "Imperative";
    moodExpl = "Expresses a direct command, order, or request.";
  }

  // ----------------------------------------------------
  // 4. VOICE (Active vs Passive)
  // ----------------------------------------------------
  let voice: SentenceVoice = "Active";
  let voiceExpl = "The grammatical subject actively performs the action.";

  const passivePattern =
    /\b(am|is|are|was|were|been|being|be|got|get)\s+(done|made|seen|built|eaten|informed|told|given|taken|written|closed|opened|delayed|cancelled|finished|asked|helped|served|arrested|repaired|cleaned|baked|sold|bought|awarded|sent)\b/i;
  const byAgentPattern = /\bby\s+(the|a|an|him|her|them|us|me|my|our)\b/i;

  if (passivePattern.test(lower) || (byAgentPattern.test(lower) && /\b\w+ed\b/i.test(lower))) {
    voice = "Passive";
    voiceExpl = "The grammatical subject receives the action rather than performing it.";
  }

  // ----------------------------------------------------
  // 5. SPEECH (Direct vs Indirect)
  // ----------------------------------------------------
  let speech: SentenceSpeech = "Direct";
  let speechExpl = "Original spoken words or direct dialogue.";

  if (
    /\b(said that|told (me|him|her|us|them) that|asked (if|whether|why|where|how|what)|confirmed that|replied that|mentioned that)\b/i.test(
      lower
    ) &&
    !lower.includes('"') &&
    !lower.includes("'")
  ) {
    speech = "Indirect";
    speechExpl = "Reported speech conveying what someone else communicated.";
  } else if (eng.includes('"') || eng.includes("“") || eng.includes("”")) {
    speech = "Direct";
    speechExpl = "Exact words quoted inside speech marks.";
  }

  // ----------------------------------------------------
  // 6. ALL 12 ENGLISH TENSES
  // ----------------------------------------------------
  let tense: SentenceTense = "Present Simple";
  let tenseExpl = "Expresses a general fact, habit, regular occurrence, or universal truth.";

  // Future Perfect Continuous: will have been + ing
  if (/\b(will|shall)\s+have\s+been\s+\w+ing\b/i.test(lower)) {
    tense = "Future Perfect Continuous";
    tenseExpl = "Ongoing action that will continue up to a specific milestone in the future.";
  }
  // Future Perfect: will have + past participle
  else if (/\b(will|shall)\s+have\s+(done|been|eaten|seen|gone|finished|arrived|completed|\w+ed)\b/i.test(lower)) {
    tense = "Future Perfect";
    tenseExpl = "Action that will be accomplished or completed by a certain future time.";
  }
  // Future Continuous: will be + ing
  else if (/\b(will|shall)\s+be\s+\w+ing\b/i.test(lower)) {
    tense = "Future Continuous";
    tenseExpl = "Action that will be actively ongoing at a specific moment in the future.";
  }
  // Future Simple: will / shall / going to
  else if (/\b(will|shall|'ll)\b/i.test(lower) || /\b(going to\s+[a-z]+)\b/i.test(lower)) {
    tense = "Future Simple";
    tenseExpl = "Prediction, spontaneous decision, or plan about a future event.";
  }
  // Past Perfect Continuous: had been + ing
  else if (/\bhad\s+been\s+\w+ing\b/i.test(lower)) {
    tense = "Past Perfect Continuous";
    tenseExpl = "Action ongoing in the past before another past event took place.";
  }
  // Past Perfect: had + past participle
  else if (/\bhad\s+(done|been|eaten|seen|gone|finished|arrived|forgotten|lost|met|completed|\w+ed)\b/i.test(lower)) {
    tense = "Past Perfect";
    tenseExpl = "Action completed prior to another past milestone or occurrence.";
  }
  // Past Continuous: was / were + ing
  else if (/\b(was|were)\s+\w+ing\b/i.test(lower)) {
    tense = "Past Continuous";
    tenseExpl = "Action actively ongoing at a particular point in the past.";
  }
  // Present Perfect Continuous: have/has been + ing
  else if (/\b(have|has)\s+been\s+\w+ing\b/i.test(lower)) {
    tense = "Present Perfect Continuous";
    tenseExpl = "Action began in the past and is still continuing into the present moment.";
  }
  // Present Perfect: have/has + past participle
  else if (
    /\b(have|has)\s+(done|been|eaten|seen|gone|finished|arrived|forgotten|lost|met|completed|called|learned|written)\b/i.test(
      lower
    ) ||
    /\b(have|has)\s+\w+ed\b/i.test(lower)
  ) {
    tense = "Present Perfect";
    tenseExpl = "Completed action having direct relevance, impact, or news in the present.";
  }
  // Present Continuous: am / is / are + ing
  else if (
    /\b(am|is|are)\s+\w+ing\b/i.test(lower) ||
    lower.includes("it is raining") ||
    lower.includes("i am going")
  ) {
    tense = "Present Continuous";
    tenseExpl = "Action happening right now at the current moment of speaking.";
  }
  // Past Simple: past tense verbs
  else if (
    /\b(went|did|saw|told|said|called|yesterday|ago|bought|felt|forgot|drank|wrote|knew|thought|came|left|met)\b/i.test(
      lower
    ) ||
    (/\b\w+ed\b/i.test(lower) && !/\b(am|is|are|have|has|will)\b/i.test(lower))
  ) {
    tense = "Past Simple";
    tenseExpl = "Action that took place and concluded at a definite time in the past.";
  }
  // Modal Verb fallback
  else if (detectedModal) {
    tense = "Modal Verb";
    tenseExpl = `Action governed by the modal verb '${detectedModal}'.`;
  }

  // ----------------------------------------------------
  // 7. STRUCTURE (Simple, Compound, Complex, Compound-Complex)
  // ----------------------------------------------------
  let structure: SentenceStructure = "Simple";
  let structureExpl = "Contains a single independent clause with one complete idea.";

  const hasSubordinating =
    /\b(because|although|though|even though|since|while|whereas|as soon as|as long as|unless|until|before|after|if|provided that|that|who|which|whose|wherever|whenever)\b/i.test(
      lower
    );

  const hasCoordinating =
    /,\s*(and|but|or|so|yet|nor)\b/i.test(eng) ||
    /\b;\s*[A-Za-z]/.test(eng) ||
    /\s+(and|but|so)\s+[A-Za-z]+\s+(is|are|was|were|will|can|could|did|do|does|have|has)\b/i.test(
      lower
    );

  if (hasSubordinating && hasCoordinating) {
    structure = "Compound-Complex";
    structureExpl =
      "Contains two or more independent clauses combined with at least one dependent clause.";
  } else if (hasSubordinating) {
    structure = "Complex";
    structureExpl =
      "Contains one independent main clause and at least one dependent subordinate clause.";
  } else if (hasCoordinating) {
    structure = "Compound";
    structureExpl =
      "Contains two or more independent clauses joined by coordinating conjunctions (and, but, or, so).";
  }

  // ----------------------------------------------------
  // Primary Badge Formulation & Styling
  // ----------------------------------------------------
  let primaryBadge = `${structure} • ${func}`;
  let badgeColorClass =
    "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";

  if (detectedModal) {
    primaryBadge = `Modal (${detectedModal}) • ${structure}`;
    badgeColorClass =
      "bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800";
  } else if (voice === "Passive") {
    primaryBadge = `Passive • ${structure}`;
    badgeColorClass =
      "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  } else if (mood === "Conditional") {
    primaryBadge = `Conditional • ${structure}`;
    badgeColorClass =
      "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
  } else if (func === "Interrogative") {
    primaryBadge = `Interrogative • ${structure}`;
    badgeColorClass =
      "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
  } else if (func === "Imperative") {
    primaryBadge = `Imperative • Simple`;
    badgeColorClass =
      "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800";
  } else if (structure === "Complex" || structure === "Compound-Complex") {
    primaryBadge = `${structure} • ${tense}`;
    badgeColorClass =
      "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
  }

  return {
    structure,
    function: func,
    voice,
    tense,
    modal: detectedModal,
    speech,
    mood,
    primaryBadge,
    badgeColorClass,
    structureExplanation: structureExpl,
    functionExplanation: funcExpl,
    voiceExplanation: voiceExpl,
    tenseExplanation: tenseExpl,
    modalExplanation: modalExpl,
    moodExplanation: moodExpl,
    speechExplanation: speechExpl,
  };
}

/**
 * Filter and sort configuration for sentences
 */
export interface SentenceFilterOptions {
  category?: string; // e.g. "greetings", "work", "all"
  difficulty?: "all" | "Beginner" | "Intermediate" | "Expert";
  structure?: SentenceStructure | "all";
  function?: SentenceFunction | "all";
  voice?: SentenceVoice | "all";
  tense?: SentenceTense | "all";
  modal?: ModalVerb | "all";
  speech?: SentenceSpeech | "all";
  mood?: SentenceMood | "all";
  searchQuery?: string;
  showFavouritesOnly?: boolean;
  sortBy?: "default" | "structure" | "length-asc" | "length-desc" | "alphabetical";
  limit?: number; // User-defined study quantity (e.g. 10, 20, 50, or 0 for all)
}

/**
 * Complexity weight for sorting Simple -> Compound -> Complex -> Compound-Complex
 */
const STRUCTURE_WEIGHT: Record<SentenceStructure, number> = {
  Simple: 1,
  Compound: 2,
  Complex: 3,
  "Compound-Complex": 4,
};

/**
 * Accurately determines difficulty level (Beginner, Intermediate, Expert)
 */
export function getSentenceDifficulty(sentence: {
  english: string;
  level?: string;
  category?: string;
}): "Beginner" | "Intermediate" | "Expert" {
  if (sentence.level) {
    const l = sentence.level.toLowerCase();
    if (l.includes("exp") || l.includes("adv") || l.includes("hard")) return "Expert";
    if (l.includes("inter") || l.includes("med")) return "Intermediate";
    if (l.includes("beg") || l.includes("bas") || l.includes("easy")) return "Beginner";
  }

  const eng = sentence.english.trim();
  const words = eng.split(/\s+/).length;
  const lower = eng.toLowerCase();

  // Advanced / Expert markers
  if (
    words > 11 ||
    /\b(had been \w+ing|will have been|nevertheless|consequently|notwithstanding|ought to|had better|how dare|dare to)\b/i.test(
      lower
    )
  ) {
    return "Expert";
  }

  // Intermediate markers
  if (
    words >= 7 ||
    /\b(have been|has been|was \w+ing|were \w+ing|should|would|could|might|although|because|while|unless|neither|either)\b/i.test(
      lower
    )
  ) {
    return "Intermediate";
  }

  return "Beginner";
}

/**
 * Query and filter mixed sentences according to user criteria and study quantity
 */
export function queryMixedSentences<
  T extends { id: string; english: string; hindi: string; category: string; day: number; level?: string }
>(
  pool: T[],
  options: SentenceFilterOptions,
  favouriteChecker?: (id: string) => boolean
): { results: T[]; totalMatching: number } {
  let list = [...pool];

  // 1. Search Query (matches English, Hindi, or category)
  if (options.searchQuery?.trim()) {
    const q = options.searchQuery.toLowerCase().trim();
    list = list.filter(
      (s) =>
        s.english.toLowerCase().includes(q) ||
        s.hindi.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }

  // 2. Favourites
  if (options.showFavouritesOnly && favouriteChecker) {
    list = list.filter((s) => favouriteChecker(s.id));
  }

  // 3. Category Filter
  if (options.category && options.category !== "all") {
    list = list.filter(
      (s) => s.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  // 4. Difficulty Level Filter
  if (options.difficulty && options.difficulty !== "all") {
    list = list.filter((s) => getSentenceDifficulty(s) === options.difficulty);
  }

  // 5. Grammatical & Modal Filters
  const hasGrammarFilter =
    (options.structure && options.structure !== "all") ||
    (options.function && options.function !== "all") ||
    (options.voice && options.voice !== "all") ||
    (options.tense && options.tense !== "all") ||
    (options.modal && options.modal !== "all") ||
    (options.speech && options.speech !== "all") ||
    (options.mood && options.mood !== "all");

  if (hasGrammarFilter) {
    list = list.filter((s) => {
      const cls = classifySentence(s.english, s.hindi);
      if (options.structure && options.structure !== "all" && cls.structure !== options.structure) {
        return false;
      }
      if (options.function && options.function !== "all" && cls.function !== options.function) {
        return false;
      }
      if (options.voice && options.voice !== "all" && cls.voice !== options.voice) {
        return false;
      }
      if (options.tense && options.tense !== "all") {
        const matchesTense = cls.tense.toLowerCase() === options.tense.toLowerCase();
        const matchesCategory = s.category.toLowerCase().includes(options.tense.toLowerCase());
        if (!matchesTense && !matchesCategory) return false;
      }
      if (options.modal && options.modal !== "all") {
        const matchesModal = cls.modal?.toLowerCase() === options.modal.toLowerCase();
        const matchesCategory = s.category.toLowerCase().includes(options.modal.toLowerCase());
        if (!matchesModal && !matchesCategory) return false;
      }
      if (options.speech && options.speech !== "all" && cls.speech !== options.speech) {
        return false;
      }
      if (options.mood && options.mood !== "all" && cls.mood !== options.mood) {
        return false;
      }
      return true;
    });
  }

  // 5. Sorting
  const sortBy = options.sortBy || "default";
  if (sortBy === "structure") {
    list.sort((a, b) => {
      const aCls = classifySentence(a.english);
      const bCls = classifySentence(b.english);
      return STRUCTURE_WEIGHT[aCls.structure] - STRUCTURE_WEIGHT[bCls.structure];
    });
  } else if (sortBy === "length-asc") {
    list.sort((a, b) => a.english.length - b.english.length);
  } else if (sortBy === "length-desc") {
    list.sort((a, b) => b.english.length - a.english.length);
  } else if (sortBy === "alphabetical") {
    list.sort((a, b) => a.english.localeCompare(b.english));
  } else {
    // Default: Sort by Day then original index
    list.sort((a, b) => a.day - b.day);
  }

  const totalMatching = list.length;

  // 6. User-defined study quantity limit
  if (options.limit && options.limit > 0 && options.limit < list.length) {
    list = list.slice(0, options.limit);
  }

  return {
    results: list,
    totalMatching,
  };
}
