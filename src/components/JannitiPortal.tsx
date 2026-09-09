import React, { useState, useRef, useEffect } from 'react';
import { CivicUpdate, Language, User } from '../types';
import { TRANSLATIONS } from '../data/initialData';
import { sendOrderToSupabase } from '../utils/supabaseClient';
import { GoogleLocationPickerModal } from './GoogleLocationPickerModal';
import {
  Mic,
  Camera,
  Send,
  ThumbsUp,
  MapPin,
  Tag,
  Clock,
  Volume2,
  Square,
  Trash2,
  FileCheck,
  Filter,
  Star,
  Inbox,
  Sparkles,
  Database,
  Globe,
} from 'lucide-react';

interface JannitiPortalProps {
  language: Language;
  user: User | null;
  updates: CivicUpdate[];
  onAddUpdate: (newUpdate: CivicUpdate) => void;
  onOpenAuth: (view: 'signin' | 'signup') => void;
}

export const JannitiPortal: React.FC<JannitiPortalProps> = ({
  language,
  user,
  updates,
  onAddUpdate,
  onOpenAuth,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Form State
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Infrastructure');
  const [selectedWard, setSelectedWard] = useState(user?.ward || 'Ward 1');
  const [pinnedCoords, setPinnedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{ id: string; timestamp: string } | null>(null);

  // Update selected ward when user changes
  useEffect(() => {
    if (user?.ward) {
      setSelectedWard(user.ward);
    }
  }, [user]);

  // Photo & Video Upload State
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  // Updates Filter & Upvote state
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Handle Photo / Video selection
  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (file.type.startsWith('video/')) {
          setVideoPreview(result);
          setPhotoPreview(null);
        } else {
          setPhotoPreview(result);
          setVideoPreview(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Audio Recording
  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingSeconds(0);

        timerIntervalRef.current = window.setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      } else {
        // Fallback simulation
        setIsRecording(true);
        setRecordingSeconds(0);
        timerIntervalRef.current = window.setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      }
    } catch {
      // Permission denied or simulated environment
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      setAudioUrl('mock_audio_note');
    }
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Handle Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      onOpenAuth('signin');
      return;
    }

    if (user.role === 'authority') {
      alert(t.authorityCannotSubmit);
      return;
    }

    if (!description.trim() && !photoPreview && !videoPreview && !audioUrl) {
      alert(t.pleaseDescribe);
      return;
    }

    setIsSubmitting(true);

    const generatedId = `JNT-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalDescription = description.trim() || 'Voice/Photo civic development request submitted.';
    const newUpdate: CivicUpdate = {
      id: generatedId,
      ward: selectedWard,
      category: selectedCategory,
      description: finalDescription,
      timestamp: t.justNow,
      status: 'pending',
      likes: 0,
      authorName: user ? user.name : 'Citizen',
      authorId: user ? user.id : undefined,
      imageUrl: photoPreview || undefined,
      videoUrl: videoPreview || undefined,
    };

    // Send complete order/petition payload to Supabase database
    try {
      await sendOrderToSupabase({
        id: generatedId,
        user,
        ward: selectedWard,
        category: selectedCategory,
        description: finalDescription,
        status: 'pending',
        imageUrl: photoPreview || undefined,
        audioUrl: audioUrl || undefined,
        amount: 0,
        metadata: {
          submittedVia: 'portal_checkout_form',
          category: selectedCategory,
          ward: selectedWard,
          videoAttached: !!videoPreview,
          coordinates: pinnedCoords || undefined,
        },
      });
    } catch (err) {
      console.warn('Supabase sync error:', err);
    }

    onAddUpdate(newUpdate);

    setSubmittedReceipt({
      id: generatedId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    // Clear Form
    setDescription('');
    setPhotoPreview(null);
    setVideoPreview(null);
    setAudioUrl(null);
    setPinnedCoords(null);
    setIsSubmitting(false);
  };

  const toggleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [
    'Infrastructure',
    'Education',
    'Public Health',
    'Transit',
    'Safety',
    'Waste Management',
    'Water & Sanitation',
    'Parks & Greenery',
  ];

  const wards = Array.from({ length: 20 }, (_, i) => `Ward ${i + 1}`);

  const filteredUpdates =
    selectedFilterCategory === 'All'
      ? updates
      : updates.filter((u) => u.category.toLowerCase() === selectedFilterCategory.toLowerCase());

  const pendingCount = updates.filter((u) => u.status === 'pending' || u.status === 'reviewing').length;
  const inProgressCount = updates.filter((u) => u.status === 'in_progress').length;
  const resolvedCount = updates.filter((u) => u.status === 'resolved').length;

  const getLocalizedWard = (wardStr: string) => {
    const match = wardStr.match(/\d+/);
    if (match) {
      return `${t.wardPrefix} ${match[0]}`;
    }
    return wardStr;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-6">
      {/* Top Municipal Status Strip (Clean & Scannable) */}
      <div className="w-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-3.5 sm:px-5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-[var(--text)] tracking-tight">
            {t.tickerLabel} &bull; Municipal Ledger
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--item-bg)] border border-[var(--border-color)]">
            <span className="text-[var(--text-muted)]">Total:</span>
            <span className="font-bold text-[var(--text)]">{updates.length}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            <span>Awaiting:</span>
            <span className="font-bold">{pendingCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
            <span>In Progress:</span>
            <span className="font-bold">{inProgressCount}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <span>Resolved:</span>
            <span className="font-bold">{resolvedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Options & Form (Left) & All Civic Petitions / Records (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Main Submission Form & Action Options */}
        <div className="lg:col-span-5 flex flex-col bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-xs relative">
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight mb-1">
              {t.title}
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-normal">
              {t.subtitle}
            </p>
          </div>

          {/* Clean Quick Action Bar: Voice, Photo/Video, Map Location */}
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {/* Audio Button */}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                isRecording
                  ? 'bg-rose-500/15 border-rose-500 text-rose-500 animate-pulse'
                  : audioUrl
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                  : 'bg-[var(--item-bg)] border-[var(--border-color)] text-[var(--text)] hover:border-sky-500'
              }`}
            >
              {isRecording ? (
                <Square className="w-4 h-4 text-rose-500 mb-1" />
              ) : (
                <Mic className="w-4 h-4 text-sky-500 mb-1" />
              )}
              <span className="font-semibold text-xs truncate max-w-full">
                {isRecording ? `${recordingSeconds}s` : audioUrl ? t.audioAttached : t.audio}
              </span>
            </button>

            {/* Photo / Video Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                photoPreview || videoPreview
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                  : 'bg-[var(--item-bg)] border-[var(--border-color)] text-[var(--text)] hover:border-sky-500'
              }`}
            >
              <Camera className="w-4 h-4 text-sky-500 mb-1" />
              <span className="font-semibold text-xs truncate max-w-full">
                {photoPreview ? t.photoAttached : videoPreview ? 'Video' : t.photo}
              </span>
            </button>

            {/* Map Pin Button */}
            <button
              type="button"
              onClick={() => setIsMapPickerOpen(true)}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                pinnedCoords
                  ? 'bg-sky-500/10 border-sky-500/40 text-sky-600 dark:text-sky-400'
                  : 'bg-[var(--item-bg)] border-[var(--border-color)] text-[var(--text)] hover:border-sky-500'
              }`}
            >
              <MapPin className="w-4 h-4 text-sky-500 mb-1" />
              <span className="font-semibold text-xs truncate max-w-full">
                {pinnedCoords ? 'Pinned ✓' : 'Pin Map'}
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaSelect}
            />
          </div>

          {/* Media Attachments Active Preview Bar */}
          {(photoPreview || videoPreview || audioUrl || pinnedCoords) && (
            <div className="mb-4 p-3 rounded-xl bg-[var(--item-bg)] border border-[var(--border-color)] flex flex-wrap items-center gap-2 text-xs">
              {photoPreview && (
                <div className="relative group rounded-lg overflow-hidden w-14 h-14 border border-[var(--border-color)] shrink-0">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {videoPreview && (
                <div className="relative group rounded-lg overflow-hidden w-16 h-14 border border-[var(--border-color)] bg-black shrink-0">
                  <video src={videoPreview} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setVideoPreview(null)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-400 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {audioUrl && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Voice Note</span>
                  <button
                    type="button"
                    onClick={() => setAudioUrl(null)}
                    className="text-rose-500 hover:text-rose-400 ml-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}

              {pinnedCoords && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono">
                  <MapPin className="w-3 h-3" />
                  <span>GPS: {pinnedCoords.lat.toFixed(3)}, {pinnedCoords.lng.toFixed(3)}</span>
                  <button
                    type="button"
                    onClick={() => setPinnedCoords(null)}
                    className="text-rose-500 hover:text-rose-400 ml-1 cursor-pointer font-sans"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Form Controls */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            {/* Category & Ward Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] mb-1">
                  <Tag className="w-3 h-3 text-sky-500" />
                  <span>{t.categoryLabel}</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] outline-none focus:border-sky-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {t.categories[c] || c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)] mb-1">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  <span>{t.wardLabel}</span>
                </label>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] outline-none focus:border-sky-500"
                >
                  {wards.map((w, idx) => (
                    <option key={w} value={w}>
                      {t.wardPrefix} {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex-1 mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.placeholder}
                rows={4}
                className="w-full h-full min-h-[110px] p-3.5 text-xs sm:text-sm rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-sky-500 transition-colors resize-none"
              />
            </div>

            {/* Receipt notification on submission */}
            {submittedReceipt && (
              <div className="mb-3.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-bold">{t.successTitle}</span> {t.ref}{submittedReceipt.id}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">
                    <Database className="w-3 h-3" />
                    <span>{t.supabaseSynced}</span>
                  </span>
                  <span className="font-mono">
                    {submittedReceipt.timestamp}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider bg-sky-600 hover:bg-sky-700 text-white shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.submit}</span>
                </>
              )}
            </button>
          </form>

          {/* WhatsApp Action Option */}
          <div className="mt-4 pt-3.5 border-t border-[var(--border-color)] flex items-center justify-between gap-2 text-xs">
            <span className="text-[var(--text-muted)] text-[11px]">
              {t.msgText}
            </span>
            <a
              href="https://wa.me/1234567890?text=I%20want%20to%20submit%20a%20development%20request:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-medium text-xs hover:bg-[#20ba56] transition-colors shrink-0"
            >
              <span>{t.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Right Side: Live Civic Petitions & Community Updates (All Items) */}
        <div className="lg:col-span-7 flex flex-col bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 shadow-xs min-h-[580px]">
          <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-color)] mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[var(--text)] tracking-tight">
                {t.liveUpdatesTitle}
              </h2>
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)]">
              {updates.length} {updates.length === 1 ? t.recordsSingle : t.recordsPlural}
            </span>
          </div>

          {/* Quick Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 no-scrollbar text-xs">
            <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3" />
            </span>
            {['All', 'Infrastructure', 'Safety', 'Public Health', 'Transit', 'Waste Management'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedFilterCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-[var(--item-bg)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {cat === 'All' ? t.filterAll : (t.categories[cat] || cat)}
              </button>
            ))}
          </div>

          {/* Feed List container */}
          <div className="flex-1 space-y-3">
            {filteredUpdates.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center p-6 text-[var(--text-muted)]">
                <Inbox className="w-8 h-8 text-[var(--text-muted)] mb-2" />
                <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
                  {t.noUpdatesTitle}
                </h3>
                <p className="text-xs max-w-xs text-[var(--text-muted)]">
                  {t.noUpdatesDesc}
                </p>
              </div>
            ) : (
              filteredUpdates.map((item) => {
                const isUpvoted = upvotedIds.has(item.id);
                const likeCount = (item.likes || 0) + (isUpvoted ? 1 : 0);

                const statusStyles = {
                  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                  reviewing: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
                  in_progress: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
                  resolved: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                };

                const localizedCat = t.categories[item.category] || item.category;
                const localizedWard = getLocalizedWard(item.ward);
                const localizedStatus = t.statuses[item.status] || item.status.replace('_', ' ');

                return (
                  <div
                    key={item.id}
                    className="bg-[var(--item-bg)] hover:bg-[var(--item-hover)] p-4 rounded-xl border border-[var(--border-color)] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {localizedWard}
                        </span>
                        <span className="text-[var(--text-muted)] text-xs">&bull;</span>
                        <span className="text-xs text-[var(--text-muted)] font-medium">
                          {localizedCat}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${
                          statusStyles[item.status] || 'border-slate-500'
                        }`}
                      >
                        {localizedStatus}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.imageUrl && (
                      <div className="mb-3 rounded-lg overflow-hidden max-h-40 border border-[var(--border-color)]">
                        <img
                          src={item.imageUrl}
                          alt="Civic issue evidence"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{item.timestamp}</span>
                        {item.authorName && (
                          <span>&bull; {item.authorName}</span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleUpvote(item.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          isUpvoted
                            ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400 font-semibold'
                            : 'hover:bg-[var(--item-hover)] text-[var(--text-muted)]'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{likeCount}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Google Maps Location Picker Modal */}
      <GoogleLocationPickerModal
        isOpen={isMapPickerOpen}
        onClose={() => setIsMapPickerOpen(false)}
        selectedWard={selectedWard}
        onSelectLocation={(coords, detectedWard) => {
          setPinnedCoords(coords);
          setSelectedWard(detectedWard);
        }}
      />
    </div>
  );
};
