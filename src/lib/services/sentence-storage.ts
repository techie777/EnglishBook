"use client";

import { DailySentence } from "@/lib/types";
import { DAILY_SENTENCES } from "@/data/sentences-data";
import * as XLSX from "xlsx";

const STORAGE_CUSTOM_KEY = "speakeasy_custom_sentences";
const STORAGE_DELETED_KEY = "speakeasy_deleted_sentence_ids";
const STORAGE_EDITED_KEY = "speakeasy_edited_sentences";
export const SENTENCES_UPDATED_EVENT = "speakeasy_sentences_updated";

/**
 * Dispatches a window event so all active pages (/sentences, /play/sentence-jumble)
 * immediately re-render with updated sentence data without a full page reload.
 */
export function notifySentencesUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SENTENCES_UPDATED_EVENT));
  }
}

/**
 * Returns all custom sentences stored in localStorage
 */
function getStoredCustomSentences(): DailySentence[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading custom sentences from storage:", e);
    return [];
  }
}

/**
 * Returns a set of deleted sentence IDs
 */
function getDeletedSentenceIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    console.error("Error reading deleted sentences from storage:", e);
    return new Set();
  }
}

/**
 * Returns a dictionary of edited sentence overrides { [id]: Partial<DailySentence> }
 */
function getEditedSentenceOverrides(): Record<string, Partial<DailySentence>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_EDITED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Error reading edited sentences from storage:", e);
    return {};
  }
}

/**
 * Generates clean jumble words array from an English sentence string
 */
export function generateJumbleTokens(english: string): string[] {
  return english
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Retrieves the complete active collection of sentences:
 * Merges default seed DAILY_SENTENCES + custom added sentences,
 * applies edits, and filters out deleted IDs.
 */
export function getAllSentences(): DailySentence[] {
  if (typeof window === "undefined") return DAILY_SENTENCES;

  const custom = getStoredCustomSentences();
  const deletedIds = getDeletedSentenceIds();
  const editedOverrides = getEditedSentenceOverrides();

  // Combine built-in + custom
  const combined = [...DAILY_SENTENCES, ...custom];

  // Apply edits and exclude deleted
  return combined
    .filter((s) => !deletedIds.has(s.id))
    .map((s) => {
      if (editedOverrides[s.id]) {
        return {
          ...s,
          ...editedOverrides[s.id],
        };
      }
      return s;
    });
}

/**
 * Adds a single sentence to the system
 */
export function addSentence(
  data: Omit<DailySentence, "id"> & { id?: string; level?: string }
): DailySentence {
  const custom = getStoredCustomSentences();
  const english = data.english.trim();
  const hindi = data.hindi.trim();

  const newSentence: DailySentence = {
    id: data.id || `custom-s-${Date.now().toString(36)}-${Math.random().toString(36).substring(4, 8)}`,
    day: data.day || 1,
    dayTitle: data.dayTitle || data.category || "General",
    hindi,
    english,
    category: data.category?.trim() || "General",
    level: (data.level?.trim() || "Beginner") as "Beginner" | "Intermediate" | "Expert",
    audioText: data.audioText || english,
    jumbleWords: data.jumbleWords && data.jumbleWords.length > 0
      ? data.jumbleWords
      : generateJumbleTokens(english),
  };

  custom.unshift(newSentence);
  localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(custom));
  notifySentencesUpdated();
  return newSentence;
}

/**
 * Bulk adds multiple sentences with progress callback
 */
export async function bulkAddSentences(
  sentences: Array<{
    hindi: string;
    english: string;
    category?: string;
    level?: string;
    day?: number;
  }>,
  onProgress?: (percent: number, current: number, total: number) => void
): Promise<{ added: number; total: number }> {
  const custom = getStoredCustomSentences();
  const total = sentences.length;
  let added = 0;

  for (let i = 0; i < total; i++) {
    const item = sentences[i];
    const english = (item.english || "").trim();
    const hindi = (item.hindi || "").trim();

    if (!english || !hindi) continue;

    const newSentence: DailySentence = {
      id: `bulk-${Date.now().toString(36)}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      day: item.day || Math.min(12, Math.floor(i / 10) + 1),
      dayTitle: item.category || "Present Simple",
      hindi,
      english,
      category: (item.category || "Present Simple").trim(),
      level: (item.level?.trim() || "Beginner") as "Beginner" | "Intermediate" | "Expert",
      audioText: english,
      jumbleWords: generateJumbleTokens(english),
    };

    custom.unshift(newSentence);
    added++;

    if (onProgress && (i % 5 === 0 || i === total - 1)) {
      const pct = Math.round(((i + 1) / total) * 100);
      onProgress(pct, i + 1, total);
      // Brief yield so the UI progress animation renders smoothly
      await new Promise((res) => setTimeout(res, 8));
    }
  }

  localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(custom));
  notifySentencesUpdated();
  return { added, total };
}

/**
 * Updates an existing sentence by ID
 */
export function updateSentence(
  id: string,
  updates: Partial<DailySentence>
): DailySentence | null {
  const custom = getStoredCustomSentences();
  const customIndex = custom.findIndex((s) => s.id === id);

  if (updates.english && !updates.jumbleWords) {
    updates.jumbleWords = generateJumbleTokens(updates.english);
    updates.audioText = updates.english.trim();
  }

  if (customIndex !== -1) {
    custom[customIndex] = {
      ...custom[customIndex],
      ...updates,
    };
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(custom));
    notifySentencesUpdated();
    return custom[customIndex];
  } else {
    // It's a built-in seed sentence: store override
    const overrides = getEditedSentenceOverrides();
    overrides[id] = {
      ...(overrides[id] || {}),
      ...updates,
    };
    localStorage.setItem(STORAGE_EDITED_KEY, JSON.stringify(overrides));
    notifySentencesUpdated();
    const all = getAllSentences();
    return all.find((s) => s.id === id) || null;
  }
}

/**
 * Deletes a sentence by ID
 */
export function deleteSentence(id: string): boolean {
  let custom = getStoredCustomSentences();
  const existsInCustom = custom.some((s) => s.id === id);

  if (existsInCustom) {
    custom = custom.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(custom));
  } else {
    const deletedIds = getDeletedSentenceIds();
    deletedIds.add(id);
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(Array.from(deletedIds)));
  }

  notifySentencesUpdated();
  return true;
}

/**
 * Batch deletes multiple sentences
 */
export function bulkDeleteSentences(ids: string[]): number {
  let custom = getStoredCustomSentences();
  const deletedIds = getDeletedSentenceIds();
  const idSet = new Set(ids);

  custom = custom.filter((s) => !idSet.has(s.id));
  localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(custom));

  ids.forEach((id) => deletedIds.add(id));
  localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(Array.from(deletedIds)));

  notifySentencesUpdated();
  return ids.length;
}

/**
 * Resets all sentence customizations back to initial defaults
 */
export function resetToDefaults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_CUSTOM_KEY);
  localStorage.removeItem(STORAGE_DELETED_KEY);
  localStorage.removeItem(STORAGE_EDITED_KEY);
  notifySentencesUpdated();
}

/**
 * Parses an Excel (.xlsx, .xls) or CSV file into raw sentence rows
 */
export async function parseExcelFile(file: File): Promise<
  Array<{
    rowNumber: number;
    hindi: string;
    english: string;
    category: string;
    level: string;
  }>
> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert to JSON array of row objects
  const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  const parsed: Array<{
    rowNumber: number;
    hindi: string;
    english: string;
    category: string;
    level: string;
  }> = [];

  rawRows.forEach((row, index) => {
    // Flexible column resolution for English
    const english = String(
      row["English"] ||
      row["english"] ||
      row["Sentence"] ||
      row["sentence"] ||
      row["English Sentence"] ||
      row["en"] ||
      ""
    ).trim();

    // Flexible column resolution for Hindi
    const hindi = String(
      row["Hindi"] ||
      row["hindi"] ||
      row["Hindi Meaning"] ||
      row["Translation"] ||
      row["हिन्दी"] ||
      row["hi"] ||
      ""
    ).trim();

    // Flexible column resolution for Category
    const category = String(
      row["Category"] ||
      row["category"] ||
      row["Topic"] ||
      row["topic"] ||
      row["Tense"] ||
      "Present Simple"
    ).trim();

    // Flexible column resolution for Level
    const level = String(
      row["Level"] ||
      row["level"] ||
      row["Difficulty"] ||
      "Beginner"
    ).trim();

    const rowNum = Number(row["#"] || row["No"] || row["id"]) || index + 1;

    if (english && hindi) {
      parsed.push({
        rowNumber: rowNum,
        hindi,
        english,
        category: category || "Present Simple",
        level: level || "Beginner",
      });
    }
  });

  return parsed;
}

/**
 * Generates and triggers download of a standardized Excel template
 */
export function downloadSampleExcelTemplate(): void {
  const sampleData = [
    {
      "#": 1,
      "Hindi": "मैं रोज़ स्कूल जाता हूँ।",
      "English": "I go to school every day.",
      "Category": "Present Simple",
      "Level": "Beginner",
    },
    {
      "#": 2,
      "Hindi": "वह रोज़ सुबह उठता है।",
      "English": "He wakes up every morning.",
      "Category": "Present Simple",
      "Level": "Beginner",
    },
    {
      "#": 3,
      "Hindi": "वह चाय पीती है।",
      "English": "She drinks tea.",
      "Category": "Present Simple",
      "Level": "Beginner",
    },
    {
      "#": 4,
      "Hindi": "हम क्रिकेट खेलते हैं।",
      "English": "We play cricket.",
      "Category": "Present Simple",
      "Level": "Beginner",
    },
    {
      "#": 5,
      "Hindi": "क्या आप मेरी मदद कर सकते हैं?",
      "English": "Can you help me?",
      "Category": "Modal - Can",
      "Level": "Beginner",
    },
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  // Set clean column widths
  ws["!cols"] = [
    { wch: 6 },  // #
    { wch: 36 }, // Hindi
    { wch: 36 }, // English
    { wch: 22 }, // Category
    { wch: 16 }, // Level
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sentences");

  XLSX.writeFile(wb, "SpeakEasy_Sentences_Template.xlsx");
}

/**
 * Exports current database sentences to an Excel spreadsheet
 */
export function exportSentencesToExcel(sentences?: DailySentence[]): void {
  const list = sentences || getAllSentences();
  const rows = list.map((s, idx) => ({
    "#": idx + 1,
    "ID": s.id,
    "Day": s.day,
    "Hindi": s.hindi,
    "English": s.english,
    "Category": s.category,
    "Level": s.level || "Beginner",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 6 },
    { wch: 18 },
    { wch: 8 },
    { wch: 38 },
    { wch: 38 },
    { wch: 24 },
    { wch: 14 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SpeakEasy Sentences");
  XLSX.writeFile(wb, `SpeakEasy_Sentences_Export_${Date.now()}.xlsx`);
}
