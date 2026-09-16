"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { DailySentence } from "@/lib/types";
import {
  getAllSentences,
  addSentence,
  bulkAddSentences,
  updateSentence,
  deleteSentence,
  bulkDeleteSentences,
  resetToDefaults,
  parseExcelFile,
  downloadSampleExcelTemplate,
  exportSentencesToExcel,
  generateJumbleTokens,
  SENTENCES_UPDATED_EVENT,
} from "@/lib/services/sentence-storage";
import {
  SEED_100_EXCEL_ROWS,
  convertExcelRowsToDailySentences,
} from "@/data/seed-100-sentences";
import { getSentenceDifficulty } from "@/lib/sentence-classifier";
import { useReader } from "@/context/ReaderContext";
import {
  ShieldCheck,
  Upload,
  Download,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Sparkles,
  RotateCcw,
  LogOut,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Gamepad2,
  BookOpen,
  LayoutDashboard,
  Database,
  Sun,
  Moon,
  Menu,
  Home,
  CheckCheck,
} from "lucide-react";

const ADMIN_STORAGE_KEY = "speakeasy_admin_session";
const DEFAULT_ADMIN_USER = "admin";
const DEFAULT_ADMIN_PASS = "admin123";

type AdminTab = "overview" | "sentences" | "upload";

export default function AdminPage() {
  const { readingTheme, setReadingTheme } = useReader();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sentences Data State
  const [sentences, setSentences] = useState<DailySentence[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Selection for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Excel Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState("");
  const [previewRows, setPreviewRows] = useState<
    Array<{
      rowNumber: number;
      hindi: string;
      english: string;
      category: string;
      level: string;
    }>
  >([]);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSentence, setEditingSentence] = useState<DailySentence | null>(null);
  const [sentenceToDelete, setSentenceToDelete] = useState<DailySentence | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isResetConfirmModalOpen, setIsResetConfirmModalOpen] = useState(false);

  // Form State (for Add / Edit)
  const [formEnglish, setFormEnglish] = useState("");
  const [formHindi, setFormHindi] = useState("");
  const [formCategory, setFormCategory] = useState("Present Simple");
  const [formLevel, setFormLevel] = useState<"Beginner" | "Intermediate" | "Expert">("Beginner");
  const [formDay, setFormDay] = useState(1);
  const [formError, setFormError] = useState("");

  // Check existing session
  useEffect(() => {
    const session = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (session === "true") {
      setIsAuthenticated(true);
    }
    setAuthChecking(false);
  }, []);

  // Load and subscribe to sentence updates
  const loadSentences = () => {
    const all = getAllSentences();
    setSentences(all);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadSentences();

      const handleUpdate = () => {
        loadSentences();
      };
      window.addEventListener(SENTENCES_UPDATED_EVENT, handleUpdate);
      return () => {
        window.removeEventListener(SENTENCES_UPDATED_EVENT, handleUpdate);
      };
    }
  }, [isAuthenticated]);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (loginUser.trim() === DEFAULT_ADMIN_USER && loginPass.trim() === DEFAULT_ADMIN_PASS) {
      localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid credentials. Try: admin / admin123");
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginUser("");
    setLoginPass("");
    setIsMobileSidebarOpen(false);
  };

  // Pre-configured list of categories (All 12 Tenses, All 14 Modals, plus conversational)
  const categoryOptions = [
    // 12 English Tenses
    "Present Simple",
    "Present Continuous",
    "Present Perfect",
    "Present Perfect Continuous",
    "Past Simple",
    "Past Continuous",
    "Past Perfect",
    "Past Perfect Continuous",
    "Future Simple",
    "Future Continuous",
    "Future Perfect",
    "Future Perfect Continuous",
    // Core & Semi-Modal Verbs
    "Modal - Can",
    "Modal - Could",
    "Modal - May",
    "Modal - Might",
    "Modal - Will",
    "Modal - Would",
    "Modal - Shall",
    "Modal - Should",
    "Modal - Must",
    "Modal - Ought to",
    "Modal - Have to / Need to",
    "Modal - Used to",
    "Modal - Had better",
    "Modal - Dare",
    // Common Functional Topics
    "Greetings",
    "Introductions",
    "Daily Routine",
    "Shopping & Market",
    "Travel & Transport",
    "Health & Wellness",
    "Workplace & Office",
    "Food & Dining",
    "Questions & Queries",
    "General",
  ];

  // Dynamically extract all categories currently present in sentences
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    sentences.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    categoryOptions.forEach((cat) => set.add(cat));
    return Array.from(set).sort();
  }, [sentences]);

  // Filtered sentences
  const filteredSentences = useMemo(() => {
    return sentences.filter((s) => {
      const matchesSearch =
        !searchQuery ||
        s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" ||
        s.category.toLowerCase() === selectedCategory.toLowerCase();

      const itemLevel = getSentenceDifficulty(s);
      const matchesLevel =
        selectedLevelFilter === "all" ||
        itemLevel.toLowerCase() === selectedLevelFilter.toLowerCase();

      return matchesSearch && matchesCat && matchesLevel;
    });
  }, [sentences, searchQuery, selectedCategory, selectedLevelFilter]);

  // Pagination slice
  const totalPages = Math.ceil(filteredSentences.length / itemsPerPage) || 1;
  const paginatedSentences = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSentences.slice(start, start + itemsPerPage);
  }, [filteredSentences, currentPage, itemsPerPage]);

  // Handle Excel File Selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadSuccessMessage("");
    setUploadProgress(10);
    setUploadStatusText("Reading Excel file...");

    try {
      const parsed = await parseExcelFile(file);
      setUploadProgress(40);
      setUploadStatusText(`Parsed ${parsed.length} rows successfully.`);

      if (parsed.length === 0) {
        setUploadError("No valid rows found in file. Ensure headers include 'English' and 'Hindi'.");
        setUploadProgress(0);
        return;
      }

      setPreviewRows(parsed);
      setUploadProgress(60);
      setUploadStatusText(`Ready to import ${parsed.length} sentences.`);
    } catch (err: unknown) {
      console.error(err);
      setUploadError("Could not parse file. Ensure it is a valid .xlsx, .xls, or .csv document.");
      setUploadProgress(0);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Commit Previewed Rows into Database
  const handleCommitUpload = async () => {
    if (previewRows.length === 0) return;

    setIsUploading(true);
    setUploadProgress(65);
    setUploadStatusText("Inserting questions into database...");

    try {
      await bulkAddSentences(previewRows, (percent, current, total) => {
        setUploadProgress(65 + Math.round((percent / 100) * 35));
        setUploadStatusText(`Saved ${current} of ${total} questions...`);
      });

      setUploadProgress(100);
      setUploadSuccessMessage(
        `Successfully imported ${previewRows.length} sentences into SpeakEasy! All sentences are now active in the Reader and Sentence Jumble game.`
      );
      setPreviewRows([]);
    } catch (err: unknown) {
      console.error(err);
      setUploadError("Failed to store sentences into persistent database.");
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
      }, 3500);
    }
  };

  // 1-Click Load 100 Questions Seed from User's Excel
  const handleLoadSeed100 = async () => {
    setIsUploading(true);
    setUploadProgress(15);
    setUploadStatusText("Loading 100 Present Simple questions from seed...");

    try {
      await bulkAddSentences(SEED_100_EXCEL_ROWS, (percent, current, total) => {
        setUploadProgress(15 + Math.round((percent / 100) * 85));
        setUploadStatusText(`Importing row ${current} of ${total}...`);
      });

      setUploadProgress(100);
      setUploadSuccessMessage("Successfully imported all 100 Present Simple questions! Ready for reading and playing.");
    } catch (err) {
      console.error(err);
      setUploadError("Failed to import 100 questions.");
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
      }, 3000);
    }
  };

  // Handle Add Sentence
  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formEnglish.trim() || !formHindi.trim()) {
      setFormError("Both English sentence and Hindi translation are required.");
      return;
    }

    addSentence({
      english: formEnglish.trim(),
      hindi: formHindi.trim(),
      category: formCategory.trim() || "General",
      level: formLevel,
      day: formDay || 1,
      dayTitle: formCategory.trim() || "General",
      audioText: formEnglish.trim(),
      jumbleWords: generateJumbleTokens(formEnglish),
    });

    setIsAddModalOpen(false);
    setFormEnglish("");
    setFormHindi("");
    setFormCategory("Present Simple");
    setFormLevel("Beginner");
    setFormDay(1);
  };

  // Handle Edit Sentence
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSentence) return;
    setFormError("");

    if (!formEnglish.trim() || !formHindi.trim()) {
      setFormError("Both English sentence and Hindi translation are required.");
      return;
    }

    updateSentence(editingSentence.id, {
      english: formEnglish.trim(),
      hindi: formHindi.trim(),
      category: formCategory.trim(),
      level: formLevel,
      day: formDay,
      dayTitle: formCategory.trim(),
      audioText: formEnglish.trim(),
      jumbleWords: generateJumbleTokens(formEnglish),
    });

    setEditingSentence(null);
  };

  // Open Edit Modal
  const openEditModal = (sentence: DailySentence) => {
    setEditingSentence(sentence);
    setFormEnglish(sentence.english);
    setFormHindi(sentence.hindi);
    setFormCategory(sentence.category || "Present Simple");
    const diff = getSentenceDifficulty(sentence);
    setFormLevel(diff);
    setFormDay(sentence.day || 1);
    setFormError("");
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = () => {
    if (sentenceToDelete) {
      deleteSentence(sentenceToDelete.id);
      setSentenceToDelete(null);
    }
  };

  // Handle Bulk Delete Confirmation
  const handleConfirmBulkDelete = () => {
    if (selectedIds.size > 0) {
      bulkDeleteSentences(Array.from(selectedIds));
      setSelectedIds(new Set());
      setIsBulkDeleteModalOpen(false);
    }
  };

  // Toggle selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAllPage = () => {
    const allPageIds = paginatedSentences.map((s) => s.id);
    const areAllSelected = allPageIds.every((id) => selectedIds.has(id));

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (areAllSelected) {
        allPageIds.forEach((id) => next.delete(id));
      } else {
        allPageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  // Toggle Dark/Light Theme
  const toggleTheme = () => {
    if (readingTheme === "dark") {
      setReadingTheme("day");
    } else {
      setReadingTheme("dark");
    }
  };

  // If loading auth state
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0b1120]">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If not authenticated, render Admin Login Card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0b1120]">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              SpeakEasy Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Sign in to manage sentences, upload Excel sheets, and configure game pools.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-700 dark:text-slate-200">Demo Credentials: </span>
              Username: <code className="font-mono text-blue-600">admin</code> • Password: <code className="font-mono text-blue-600">admin123</code>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // AUTHENTICATED ADMIN DASHBOARD WITH DEDICATED SIDE PANEL
  // ==========================================================================

  // Sidebar Component JSX
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      {/* Sidebar Top: Brand & Navigation */}
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-slate-900 dark:text-white">
                  SpeakEasy
                </span>
                <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Game Engine Synced
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 space-y-1">
          <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Console Views
          </span>

          <button
            type="button"
            onClick={() => {
              setActiveTab("overview");
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard size={16} />
              <span>Dashboard Overview</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("sentences");
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "sentences"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database size={16} />
              <span>Sentence Database</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeTab === "sentences"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {sentences.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("upload");
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "upload"
                ? "bg-blue-600 text-white shadow-sm font-black"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet size={16} />
              <span>Bulk Excel Upload</span>
            </div>
            <span className="text-[10px] text-amber-500 font-extrabold">100+</span>
          </button>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 font-black text-xs hover:bg-blue-100 transition-colors shadow-2xs"
            >
              <Plus size={15} />
              <span>+ Add New Sentence</span>
            </button>
          </div>
        </div>

        {/* Live App & Previews */}
        <div className="px-3 space-y-1">
          <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Live Learner Links
          </span>

          <Link
            href="/sentences"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen size={15} className="text-blue-500" />
              <span>Sentence Reader</span>
            </div>
            <ExternalLink size={12} className="opacity-60" />
          </Link>

          <Link
            href="/play/sentence-jumble"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Gamepad2 size={15} className="text-indigo-500" />
              <span>Sentence Jumble Game</span>
            </div>
            <ExternalLink size={12} className="opacity-60" />
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Home size={15} className="text-emerald-500" />
              <span>Learner Home</span>
            </div>
            <ExternalLink size={12} className="opacity-60" />
          </Link>
        </div>

        {/* Quick Tools */}
        <div className="px-3 space-y-1">
          <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Data Tools
          </span>

          <button
            type="button"
            onClick={handleLoadSeed100}
            disabled={isUploading}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors text-left"
          >
            <Sparkles size={14} />
            <span>⚡ Seed 100 Sentences</span>
          </button>

          <button
            type="button"
            onClick={downloadSampleExcelTemplate}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left"
          >
            <Download size={14} />
            <span>Excel Template (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() => exportSentencesToExcel(sentences)}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left"
          >
            <Download size={14} />
            <span>Export All (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsResetConfirmModalOpen(true)}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left"
          >
            <RotateCcw size={14} />
            <span>Reset Database</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer: Profile, Theme, Logout */}
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
        {/* Operator Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              AD
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                Administrator
              </p>
              <p className="text-[10px] text-slate-400 font-mono">admin@speakeasy</p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Day/Night Mode"
          >
            {readingTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-black text-xs hover:bg-rose-100 transition-all shadow-2xs"
        >
          <LogOut size={14} />
          <span>Sign Out of Portal</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100">
      {/* ===================================================================== */}
      {/* 1. DESKTOP DEDICATED SIDE PANEL (FIXED/STICKY)                        */}
      {/* ===================================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 sticky top-0 h-screen overflow-y-auto no-scrollbar z-30 shadow-xs flex-shrink-0">
        {renderSidebarContent()}
      </aside>

      {/* ===================================================================== */}
      {/* 2. MOBILE RESPONSIVE SIDE DRAWER (SLIDE-OVER)                         */}
      {/* ===================================================================== */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-72 max-w-[85vw] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full z-10 shadow-2xl overflow-y-auto">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. MAIN ADMIN CONTENT CANVAS                                          */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Admin Top Header Bar (Clean, no consumer clutter) */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              aria-label="Open Admin Menu"
            >
              <Menu size={18} />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <span>Admin Console</span>
                <span>/</span>
                <span className="capitalize text-slate-700 dark:text-slate-200 font-bold">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "sentences" && "Sentence Database (CRUD)"}
                  {activeTab === "upload" && "Bulk Excel Upload"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300">
              <CheckCheck size={13} />
              <span>{sentences.length} sentences synced to Game</span>
            </span>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs shadow-xs transition-all"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Sentence</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="md:hidden p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Quick Alert on Success / Error */}
          {uploadSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between gap-3 shadow-xs animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                <span>{uploadSuccessMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setUploadSuccessMessage("")}
                className="text-emerald-700 hover:text-emerald-900"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {uploadError && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center justify-between gap-3 shadow-xs animate-fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
              <button
                type="button"
                onClick={() => setUploadError("")}
                className="text-rose-700 hover:text-rose-900"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* 1. OVERVIEW STATS CARDS (Shown on Overview tab) */}
          {(activeTab === "overview" || activeTab === "sentences") && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Total Sentences
                </span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {sentences.length}
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCheck size={12} />
                  <span>100% Game Ready</span>
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Categories & Tenses
                </span>
                <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                  {availableCategories.length}
                </p>
                <span className="text-[10px] text-slate-400 font-medium">All 12 Tenses & Modals</span>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Active Filter Pool
                </span>
                <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {filteredSentences.length}
                </p>
                <span className="text-[10px] text-slate-400 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Quick Actions
                </span>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <Plus size={13} />
                    <span>Add</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadSampleExcelTemplate}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1"
                    title="Download Sample Template"
                  >
                    <Download size={13} />
                    <span>Template</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. BULK EXCEL UPLOAD SECTION (Shown on Overview or Upload tab) */}
          {(activeTab === "overview" || activeTab === "upload") && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="text-emerald-600" size={20} />
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      Bulk Excel / CSV Upload
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload spreadsheets formatted with <strong>#, Hindi, English, Category, Level</strong> columns.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleLoadSeed100}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-black text-xs shadow-xs transition-all disabled:opacity-50"
                    title="Click to instantly import the 100 Present Simple questions from Excel"
                  >
                    <Sparkles size={14} />
                    <span>⚡ Load 100 Present Simple Sentences</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadSampleExcelTemplate}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <Download size={14} />
                    <span>Download Excel Template (.xlsx)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => exportSentencesToExcel(sentences)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <Download size={14} />
                    <span>Export All (.xlsx)</span>
                  </button>
                </div>
              </div>

              {/* Drag & Drop File Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-6 text-center transition-all bg-slate-50/60 dark:bg-slate-850/40 space-y-2 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Upload size={22} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Drag and drop your Excel (.xlsx, .xls) or CSV file here, or{" "}
                    <span className="text-blue-600 underline">browse files</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports 100+ questions per file • Automatically generates Sentence Jumble tiles and difficulty level
                  </p>
                </div>
              </div>

              {/* Real-Time Animated Progress Bar */}
              {(isUploading || uploadProgress > 0) && (
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping inline-block" />
                      {uploadStatusText || "Processing file..."}
                    </span>
                    <span className="font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-blue-200/70 dark:bg-blue-900/60 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Pre-Import Preview Table */}
              {previewRows.length > 0 && (
                <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-amber-600" size={18} />
                      <h3 className="text-xs font-extrabold text-amber-900 dark:text-amber-300">
                        Pre-Upload Preview: {previewRows.length} Questions Ready to Import
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewRows([])}
                        className="px-3 py-1 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleCommitUpload}
                        disabled={isUploading}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs transition-all"
                      >
                        Confirm & Import to Game Pool
                      </button>
                    </div>
                  </div>

                  <div className="max-h-52 overflow-y-auto rounded-xl border border-amber-200/80 dark:border-amber-800/60">
                    <table className="w-full text-left text-xs bg-white dark:bg-slate-900">
                      <thead className="bg-amber-100/60 dark:bg-amber-950/60 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                        <tr>
                          <th className="p-2 w-12">#</th>
                          <th className="p-2">Hindi</th>
                          <th className="p-2">English</th>
                          <th className="p-2">Category</th>
                          <th className="p-2">Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                        {previewRows.slice(0, 8).map((row, i) => (
                          <tr key={i} className="hover:bg-amber-50/30">
                            <td className="p-2 font-bold text-slate-400">{row.rowNumber}</td>
                            <td className="p-2 font-hindi">{row.hindi}</td>
                            <td className="p-2 font-bold text-blue-600 dark:text-blue-400">{row.english}</td>
                            <td className="p-2 text-slate-500">{row.category}</td>
                            <td className="p-2 text-slate-500">{row.level}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {previewRows.length > 8 && (
                    <p className="text-[11px] text-slate-400 text-center font-medium">
                      + {previewRows.length - 8} more questions will be imported
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 3. SENTENCES MANAGEMENT (CRUD TABLE) (Shown on Overview or Sentences tab) */}
          {(activeTab === "overview" || activeTab === "sentences") && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
              {/* Header & Controls */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Database size={18} className="text-blue-600" />
                    <span>Sentence Database & Game Pool</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Showing {filteredSentences.length} of {sentences.length} total active sentences.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Search Bar */}
                  <div className="relative min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search sentences (English, Hindi, Category)..."
                      className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Categories ({sentences.length})</option>
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  {/* Difficulty Filter */}
                  <select
                    value={selectedLevelFilter}
                    onChange={(e) => {
                      setSelectedLevelFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>

                  {selectedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsBulkDeleteModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-100 transition-colors shadow-2xs"
                    >
                      <Trash2 size={13} />
                      <span>Delete Selected ({selectedIds.size})</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs transition-all"
                  >
                    <Plus size={14} />
                    <span>+ Add Sentence</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider font-bold text-[10px] border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3 w-10">
                        <input
                          type="checkbox"
                          checked={
                            paginatedSentences.length > 0 &&
                            paginatedSentences.every((s) => selectedIds.has(s.id))
                          }
                          onChange={toggleSelectAllPage}
                          className="rounded text-blue-600 cursor-pointer"
                        />
                      </th>
                      <th className="p-3 w-12">#</th>
                      <th className="p-3">English Sentence</th>
                      <th className="p-3">Hindi Translation</th>
                      <th className="p-3">Category / Tense</th>
                      <th className="p-3">Level</th>
                      <th className="p-3">Day</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {paginatedSentences.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400 font-medium">
                          No sentences found matching your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedSentences.map((sentence, index) => {
                        const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                        const isSelected = selectedIds.has(sentence.id);
                        const diff = getSentenceDifficulty(sentence);

                        return (
                          <tr
                            key={sentence.id}
                            className={`transition-colors ${
                              isSelected
                                ? "bg-blue-50/50 dark:bg-blue-950/30"
                                : "hover:bg-slate-50/60 dark:hover:bg-slate-850/40"
                            }`}
                          >
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelect(sentence.id)}
                                className="rounded text-blue-600 cursor-pointer"
                              />
                            </td>
                            <td className="p-3 text-slate-400 font-bold">{globalIndex}</td>
                            <td className="p-3">
                              <p className="font-extrabold text-slate-900 dark:text-white leading-snug">
                                {sentence.english}
                              </p>
                              <span className="text-[10px] text-slate-400">
                                {sentence.jumbleWords?.length || 0} Jumble Tiles
                              </span>
                            </td>
                            <td className="p-3 font-hindi text-slate-700 dark:text-slate-300">
                              {sentence.hindi}
                            </td>
                            <td className="p-3">
                              <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-black text-[10px]">
                                {sentence.category}
                              </span>
                            </td>
                            <td className="p-3">
                              {diff === "Beginner" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span>Beginner</span>
                                </span>
                              )}
                              {diff === "Intermediate" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span>Intermediate</span>
                                </span>
                              )}
                              {diff === "Expert" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                  <span>Expert</span>
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-slate-500 font-bold text-xs">
                              Day {sentence.day || 1}
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => openEditModal(sentence)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                                  title="Edit Sentence"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSentenceToDelete(sentence)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors"
                                  title="Delete Sentence"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 flex-wrap gap-2">
                <span>
                  Showing {paginatedSentences.length} of {filteredSentences.length} items
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <span className="font-bold text-slate-800 dark:text-slate-200 px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: ADD / EDIT SENTENCE                                            */}
      {/* ===================================================================== */}
      {(isAddModalOpen || editingSentence) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-blue-600" size={18} />
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  {editingSentence ? "Edit Sentence" : "Add New Sentence"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingSentence(null);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={editingSentence ? handleSaveEdit : handleSaveAdd} className="space-y-3.5 text-xs">
              {formError && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block font-black uppercase tracking-wider text-slate-400 mb-1 text-[10px]">
                  English Sentence *
                </label>
                <input
                  type="text"
                  value={formEnglish}
                  onChange={(e) => setFormEnglish(e.target.value)}
                  placeholder="e.g. He speaks English fluently."
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-black uppercase tracking-wider text-slate-400 mb-1 text-[10px]">
                  Hindi Translation *
                </label>
                <input
                  type="text"
                  value={formHindi}
                  onChange={(e) => setFormHindi(e.target.value)}
                  placeholder="e.g. वह धाराप्रवाह अंग्रेजी बोलता है।"
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-hindi text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block font-black uppercase tracking-wider text-slate-400 mb-1 text-[10px]">
                    Category / Tense
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs focus:outline-none cursor-pointer"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-black uppercase tracking-wider text-slate-400 mb-1 text-[10px]">
                    Difficulty Level
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) =>
                      setFormLevel(e.target.value as "Beginner" | "Intermediate" | "Expert")
                    }
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black uppercase tracking-wider text-slate-400 mb-1 text-[10px]">
                    Day (1 to 12)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formDay}
                    onChange={(e) => setFormDay(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Jumble Tile Preview */}
              {formEnglish.trim() && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Game Section Auto-Sync: Sentence Jumble Tiles
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {generateJumbleTokens(formEnglish).map((word, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs shadow-2xs"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingSentence(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xs transition-all"
                >
                  {editingSentence ? "Save Changes" : "Create Sentence"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: DELETE CONFIRMATION                                            */}
      {/* ===================================================================== */}
      {sentenceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Delete Sentence?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to delete &ldquo;{sentenceToDelete.english}&rdquo;? This will remove it from the reader and the Sentence Jumble game.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSentenceToDelete(null)}
                className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:text-slate-700 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: BULK DELETE CONFIRMATION                                       */}
      {/* ===================================================================== */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Delete {selectedIds.size} Selected Sentences?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                This bulk action cannot be undone. These questions will be unlinked from the Sentence Jumble game.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:text-slate-700 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBulkDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs transition-all"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: RESET CONFIRMATION                                             */}
      {/* ===================================================================== */}
      {isResetConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto">
              <RotateCcw size={24} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Reset Sentence Database?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to reset all custom and uploaded sentences back to the default dataset?
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:text-slate-700 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setIsResetConfirmModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-xs transition-all"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
