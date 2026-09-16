/**
 * Spoken English Grammar Structure Classifier
 * Identifies grammatical form and sentence type to enrich language learner intuition.
 */

import { DailySentence } from "@/lib/types";

export interface GrammarTag {
  label: string;
  category: "tense" | "structure" | "mood";
  colorClass: string;
}

export function getSentenceGrammarTag(sentence: DailySentence): GrammarTag {
  const eng = sentence.english.trim();
  const lower = eng.toLowerCase();

  // 1. Interrogative Questions with Modals (Could you, Can I, Would you)
  if (
    lower.startsWith("could you") ||
    lower.startsWith("would you") ||
    lower.startsWith("can you") ||
    lower.startsWith("may i") ||
    lower.startsWith("can i")
  ) {
    return {
      label: "Modal Request",
      category: "mood",
      colorClass: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    };
  }

  // 2. Questions (Interrogative)
  if (
    eng.endsWith("?") ||
    lower.startsWith("what") ||
    lower.startsWith("where") ||
    lower.startsWith("when") ||
    lower.startsWith("why") ||
    lower.startsWith("how") ||
    lower.startsWith("who") ||
    lower.startsWith("which") ||
    lower.startsWith("is it") ||
    lower.startsWith("are you") ||
    lower.startsWith("do you") ||
    lower.startsWith("did you")
  ) {
    if (lower.includes("have you") || lower.includes("has he") || lower.includes("has she")) {
      return {
        label: "Present Perfect (Q)",
        category: "tense",
        colorClass: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      };
    }
    if (lower.startsWith("did") || lower.includes("were you") || lower.includes("was it")) {
      return {
        label: "Simple Past (Q)",
        category: "tense",
        colorClass: "bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      };
    }
    return {
      label: "Interrogative",
      category: "structure",
      colorClass: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    };
  }

  // 3. Imperatives & Polite Commands
  if (
    lower.startsWith("please") ||
    lower.startsWith("don't") ||
    lower.startsWith("do not") ||
    lower.startsWith("let's") ||
    lower.startsWith("take ") ||
    lower.startsWith("listen") ||
    lower.startsWith("wait ") ||
    lower.startsWith("come ") ||
    lower.startsWith("stop ") ||
    lower.startsWith("keep ") ||
    lower.startsWith("be careful")
  ) {
    return {
      label: "Imperative (Command)",
      category: "mood",
      colorClass: "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    };
  }

  // 4. Modal Verbs in Statements (can, could, should, must, might, would)
  if (
    /\b(should|must|can|could|might|ought to|have to|has to)\b/i.test(lower)
  ) {
    return {
      label: "Modal Verb",
      category: "mood",
      colorClass: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    };
  }

  // 5. Present Continuous (is/am/are + ing)
  if (
    /\b(am|is|are|getting|doing|going|coming|waiting|raining|leaving|cooking)\b.*ing\b/i.test(lower) ||
    lower.includes("it is raining") ||
    lower.includes("i am going") ||
    lower.includes("he is coming")
  ) {
    return {
      label: "Present Continuous",
      category: "tense",
      colorClass: "bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    };
  }

  // 6. Present Perfect (has/have + 3rd form)
  if (
    /\b(have|has)\s+(done|been|eaten|seen|gone|finished|arrived|forgotten|lost|met)\b/i.test(lower) ||
    lower.includes("have finished") ||
    lower.includes("has already") ||
    lower.includes("i have heard")
  ) {
    return {
      label: "Present Perfect",
      category: "tense",
      colorClass: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    };
  }

  // 7. Simple Future (will / shall / going to)
  if (
    /\b(will|shall|'ll|going to)\b/i.test(lower)
  ) {
    return {
      label: "Simple Future",
      category: "tense",
      colorClass: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    };
  }

  // 8. Simple Past (was, were, past verbs)
  if (
    /\b(was|were|went|did|saw|told|said|called|yesterday|ago|bought|felt|forgot)\b/i.test(lower)
  ) {
    return {
      label: "Simple Past",
      category: "tense",
      colorClass: "bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    };
  }

  // 9. Everyday Greetings & Expressions
  if (
    lower.startsWith("hello") ||
    lower.startsWith("hi") ||
    lower.startsWith("good morning") ||
    lower.startsWith("good night") ||
    lower.startsWith("have a") ||
    lower.startsWith("nice to") ||
    lower.startsWith("thank you") ||
    lower.startsWith("congratulations")
  ) {
    return {
      label: "Daily Expression",
      category: "mood",
      colorClass: "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    };
  }

  // 10. Default: Simple Present
  return {
    label: "Simple Present",
    category: "tense",
    colorClass: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  };
}
