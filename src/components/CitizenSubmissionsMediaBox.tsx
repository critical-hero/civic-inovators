import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  Video,
  FileText,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ThumbsUp,
  MapPin,
  Maximize2,
  X,
  Volume2,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { CivicUpdate, Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';

interface CitizenSubmissionsMediaBoxProps {
  updates: CivicUpdate[];
  language?: Language;
  onUpdateStatus?: (id: string, newStatus: CivicUpdate['status'], note?: string) => void;
  onSelectWard?: (ward: string) => void;
}

type MediaTypeFilter = 'all' | 'photos' | 'videos' | 'text';

export const CitizenSubmissionsMediaBox: React.FC<CitizenSubmissionsMediaBoxProps> = ({
  updates,
  language = 'en',
  onUpdateStatus,
  onSelectWard,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [mediaFilter, setMediaFilter] = useState<MediaTypeFilter>('all');
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<CivicUpdate | null>(null);
  const [resolutionNoteInput, setResolutionNoteInput] = useState<string>('');
  const [statusSuccessMsg, setStatusSuccessMsg] = useState<string>('');

  // Extract unique wards and categories
  const wardsList = useMemo(() => {
    const set = new Set<string>();
    updates.forEach((u) => {
      if (u.ward) set.add(u.ward);
    });
    return ['All', ...Array.from(set).sort()];
  }, [updates]);

  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    updates.forEach((u) => {
      if (u.category) set.add(u.category);
    });
    return ['All', ...Array.from(set).sort()];
  }, [updates]);

  // Counts for media types
  const mediaCounts = useMemo(() => {
    let photos = 0;
    let videos = 0;
    let textOnly = 0;

    updates.forEach((u) => {
      if (u.imageUrl) photos++;
      if (u.videoUrl) videos++;
      if (!u.imageUrl && !u.videoUrl) textOnly++;
    });

    return {
      total: updates.length,
      photos,
      videos,
      textOnly,
    };
  }, [updates]);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return updates.filter((u) => {
      // Media Type
      if (mediaFilter === 'photos' && !u.imageUrl) return false;
      if (mediaFilter === 'videos' && !u.videoUrl) return false;
      if (mediaFilter === 'text' && (u.imageUrl || u.videoUrl)) return false;

      // Ward
      if (selectedWard !== 'All' && u.ward !== selectedWard) return false;

      // Category
      if (selectedCategory !== 'All' && u.category !== selectedCategory) return false;

      // Status
      if (statusFilter !== 'All' && u.status !== statusFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const descMatch = u.description?.toLowerCase().includes(query);
        const wardMatch = u.ward?.toLowerCase().includes(query);
        const catMatch = u.category?.toLowerCase().includes(query);
        const authorMatch = u.authorName?.toLowerCase().includes(query);
        if (!descMatch && !wardMatch && !catMatch && !authorMatch) return false;
      }

      return true;
    });
  }, [updates, mediaFilter, selectedWard, selectedCategory, statusFilter, searchQuery]);

  const handleUpdateStatus = (id: string, newStatus: CivicUpdate['status']) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatus, resolutionNoteInput || undefined);
      setStatusSuccessMsg(`Status updated to ${newStatus.replace('_', ' ')}!`);
      setTimeout(() => setStatusSuccessMsg(''), 3000);
      if (activeModalItem && activeModalItem.id === id) {
        setActiveModalItem({ ...activeModalItem, status: newStatus });
      }
    }
  };

  return (
    <div
      id="citizen-fusion-media-dossier"
      className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-5 sm:p-7 shadow-[0_10px_30px_var(--shadow-color)] relative overflow-hidden space-y-6"
    >
      {/* Decorative Accent Header Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-sky-500 to-purple-600" />


      {/* Interactive Controls & Filters Bar */}
      <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] space-y-3">
        {/* Row 1: Media Type Pills + Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Media Pills */}
          <div className="flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-[var(--border-color)] text-xs font-semibold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setMediaFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                mediaFilter === 'all'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <span>All Media</span>
              <span className="text-[10px] opacity-80">({mediaCounts.total})</span>
            </button>
            <button
              onClick={() => setMediaFilter('photos')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                mediaFilter === 'photos'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos</span>
              <span className="text-[10px] opacity-80">({mediaCounts.photos})</span>
            </button>
            <button
              onClick={() => setMediaFilter('videos')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                mediaFilter === 'videos'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos</span>
              <span className="text-[10px] opacity-80">({mediaCounts.videos})</span>
            </button>
            <button
              onClick={() => setMediaFilter('text')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                mediaFilter === 'text'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Text Reports</span>
              <span className="text-[10px] opacity-80">({mediaCounts.textOnly})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search text, ward, or citizen..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-[var(--border-color)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns (Ward, Category, Status) */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1 text-[var(--text-muted)] font-medium">
            <Filter className="w-3 h-3" />
            <span>Refine By:</span>
          </div>

          {/* Ward Select */}
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            aria-label="Filter by Ward"
            className="py-1 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border-color)] text-[var(--text)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-400 font-medium"
          >
            <option value="All">All Wards ({wardsList.length - 1})</option>
            {wardsList
              .filter((w) => w !== 'All')
              .map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
          </select>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by Category"
            className="py-1 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border-color)] text-[var(--text)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-400 font-medium"
          >
            <option value="All">All Categories</option>
            {categoriesList
              .filter((c) => c !== 'All')
              .map((c) => (
                <option key={c} value={c}>
                  {t.categories[c] || c}
                </option>
              ))}
          </select>

          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Status"
            className="py-1 px-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border-color)] text-[var(--text)] cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-400 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          {(selectedWard !== 'All' || selectedCategory !== 'All' || statusFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedWard('All');
                setSelectedCategory('All');
                setStatusFilter('All');
                setSearchQuery('');
                setMediaFilter('all');
              }}
              className="text-rose-500 hover:text-rose-600 underline font-semibold ml-auto cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {statusSuccessMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusSuccessMsg}</span>
        </div>
      )}

      {/* Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const hasPhoto = !!item.imageUrl;
            const hasVideo = !!item.videoUrl;
            const isResolved = item.status === 'resolved';
            const isInProgress = item.status === 'in_progress';
            const isReviewing = item.status === 'reviewing';

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] overflow-hidden shadow-sm hover:shadow-lg hover:border-sky-400/50 transition-all flex flex-col justify-between"
              >
                {/* Media Container or Banner */}
                {hasPhoto ? (
                  <div className="relative w-full h-48 bg-slate-900 overflow-hidden cursor-pointer">
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onClick={() => setActiveModalItem(item)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges Overlay */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                        {item.ward}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/90 text-white text-[10px] font-bold shadow-xs">
                        {t.categories[item.category] || item.category}
                      </span>
                    </div>

                    {/* Bottom Media Icon & Expand Button */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 text-emerald-400 text-[10px] font-semibold">
                        <ImageIcon className="w-3 h-3" /> Citizen Photo Attached
                      </span>
                      <button
                        onClick={() => setActiveModalItem(item)}
                        title="Expand Media"
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : hasVideo ? (
                  <div className="relative w-full h-48 bg-slate-950 overflow-hidden flex flex-col justify-between p-3">
                    {/* Embedded HTML5 Video */}
                    <video
                      src={item.videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                        {item.ward}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <Video className="w-2.5 h-2.5" /> Video Footage
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Text-Only Dispatch Blueprint Banner */
                  <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border-b border-[var(--border-color)]">
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-white dark:bg-black/40 border border-slate-300 dark:border-white/10 text-[10px] font-bold text-[var(--text)]">
                        {item.ward}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-[10px] font-bold">
                        {t.categories[item.category] || item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text)]">
                      <FileText className="w-4 h-4 text-sky-500" />
                      <span>Citizen Field Problem Statement</span>
                    </div>
                  </div>
                )}

                {/* Card Body: Text and Author Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  {/* Citizen Text Statement */}
                  <div>
                    <p className="text-xs sm:text-sm text-[var(--text)] font-normal leading-relaxed italic">
                      &ldquo;{item.description}&rdquo;
                    </p>

                    {item.statusNote && (
                      <div className="mt-2.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-[var(--border-color)] text-[11px] text-[var(--text-muted)]">
                        <strong className="text-[var(--text)] font-semibold">Municipal Note:</strong> {item.statusNote}
                      </div>
                    )}
                  </div>

                  {/* Metadata and Context */}
                  <div className="pt-2.5 border-t border-[var(--border-color)] space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                      <span className="font-medium text-[var(--text)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        {item.authorName || 'Verified Citizen'}
                      </span>
                      <span>{item.timestamp}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      {/* Likes/Endorsements */}
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{item.likes || 0} Endorsements</span>
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isResolved
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                            : isInProgress
                            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                            : isReviewing
                            ? 'bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-500/30'
                            : 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Quick Action Bar for Authority */}
                    <div className="flex items-center gap-1 pt-1">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="flex-1 py-1 px-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-[var(--item-hover)] border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text)] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-sky-500" />
                        <span>Inspect Dossier</span>
                      </button>

                      {onSelectWard && (
                        <button
                          onClick={() => onSelectWard(item.ward)}
                          title={`Focus ${item.ward} on GIS Map`}
                          className="p-1 px-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-[11px] font-bold text-sky-600 dark:text-sky-300 transition-colors cursor-pointer"
                        >
                          Map Ward
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-10 text-center rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] space-y-2">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[var(--text)]">No Submissions Found</h4>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
            No citizen reports match the selected media type or filters. Try choosing &ldquo;All Media&rdquo; or clearing the search keyword.
          </p>
          <button
            onClick={() => {
              setMediaFilter('all');
              setSelectedWard('All');
              setSelectedCategory('All');
              setStatusFilter('All');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Show All Submissions
          </button>
        </div>
      )}

      {/* Full Resolution Modal / Lightbox */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 relative space-y-4">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              aria-label="Close Dossier Modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-[var(--text)] hover:opacity-80 transition-opacity cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold text-xs">
                  {activeModalItem.ward}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold text-xs">
                  {t.categories[activeModalItem.category] || activeModalItem.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-[var(--text)]">
                Field Evidence Report #{activeModalItem.id}
              </h4>
            </div>

            {/* Media Display */}
            {activeModalItem.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-[var(--border-color)] max-h-80 bg-slate-950">
                <img
                  src={activeModalItem.imageUrl}
                  alt={activeModalItem.description}
                  className="w-full h-full object-contain max-h-80 mx-auto"
                />
              </div>
            )}

            {activeModalItem.videoUrl && (
              <div className="rounded-2xl overflow-hidden border border-[var(--border-color)] bg-black">
                <video
                  src={activeModalItem.videoUrl}
                  controls
                  autoPlay
                  className="w-full max-h-80 object-contain mx-auto"
                />
              </div>
            )}

            {/* Full Citizen Description */}
            <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                Citizen Submitted Problem Statement
              </span>
              <p className="text-sm text-[var(--text)] leading-relaxed italic">
                &ldquo;{activeModalItem.description}&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                <span>Submitted by: <strong>{activeModalItem.authorName || 'Citizen'}</strong></span>
                <span>Timestamp: {activeModalItem.timestamp}</span>
              </div>
            </div>

            {/* Officer Action: Update Status directly */}
            {onUpdateStatus && (
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Officer Administrative Action
                  </span>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-800 dark:text-sky-300">
                    Current: {activeModalItem.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(activeModalItem.id, 'reviewing')}
                    className="py-1.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Mark Reviewing
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(activeModalItem.id, 'in_progress')}
                    className="py-1.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Set In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(activeModalItem.id, 'resolved')}
                    className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
