import React, { useState } from 'react';
import { CivicUpdate, User, Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';
import { X, Clock, CheckCircle2, AlertCircle, RefreshCw, FileText, Search } from 'lucide-react';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  updates: CivicUpdate[];
  user: User | null;
  initialFilter?: 'all' | 'resolved';
  language?: Language;
}

export const SubmissionsDrawer: React.FC<SubmissionsDrawerProps> = ({
  isOpen,
  onClose,
  updates,
  user,
  initialFilter = 'all',
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'resolved'>(
    initialFilter === 'resolved' ? 'resolved' : 'all'
  );
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = updates.filter((u) => {
    if (filter !== 'all' && u.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.description.toLowerCase().includes(q) ||
        u.ward.toLowerCase().includes(q) ||
        u.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: CivicUpdate['status']) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> {t.statuses.resolved}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <RefreshCw className="w-3 h-3 animate-spin" /> {t.statuses.in_progress}
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
            <Clock className="w-3 h-3" /> {t.statuses.reviewing}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <AlertCircle className="w-3 h-3" /> {t.statuses.pending}
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: string) => {
    return t.categories[cat] || cat;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in"
    >
      <div className="relative w-full max-w-2xl bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text)]">
                {user ? `${user.name} - ${t.submissionsDrawer.title}` : t.submissionsDrawer.title}
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                {t.submissionsDrawer.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full hover:bg-[var(--item-bg)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.submissionsDrawer.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] outline-none focus:border-sky-400"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-[var(--item-bg)] p-1 rounded-xl border border-[var(--border-color)]">
            {(['all', 'pending', 'in_progress', 'resolved'] as const).map((key) => {
              const label =
                key === 'all'
                  ? t.common.filterAll
                  : key === 'pending'
                  ? t.statuses.pending
                  : key === 'in_progress'
                  ? t.statuses.in_progress
                  : t.statuses.resolved;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 rounded-lg font-semibold uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                    filter === key
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-muted)] text-xs">
              {t.submissionsDrawer.noSubmissions}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] hover:border-sky-400/40 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-sky-400 font-mono">
                      #{item.id}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text)]">
                      {item.ward} &bull; {getCategoryLabel(item.category)}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <p className="text-xs sm:text-sm text-blue-800/90 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.imageUrl && (
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 mt-1">
                    <img src={item.imageUrl} alt="Attached" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {t.submissionsDrawer.submitted} {item.timestamp}
                  </span>
                  <span>{t.submissionsDrawer.citizenIdPrefix}: {item.authorName || t.submissionsDrawer.verifiedCitizen}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
