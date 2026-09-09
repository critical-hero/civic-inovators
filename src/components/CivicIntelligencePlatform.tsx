import React, { useState, useMemo } from 'react';
import { CivicUpdate, User, Language } from '../types';
import { TRANSLATIONS } from '../data/initialData';
import { OpenFreeCivicMap } from './OpenFreeCivicMap';
import { CitizenSubmissionsMediaBox } from './CitizenSubmissionsMediaBox';
import {
  Flame,
  Layers,
  ListOrdered,
  TrendingUp,
  Briefcase,
  Download,
  CheckCircle2,
  MapPin,
  DollarSign,
  BarChart3,
  Calendar,
  Search,
  Zap,
  ShieldCheck,
} from 'lucide-react';

interface CivicIntelligencePlatformProps {
  user: User | null;
  updates: CivicUpdate[];
  language?: Language;
  onUpdateStatus: (id: string, newStatus: CivicUpdate['status'], note?: string) => void;
  onOpenAuth: (view: 'signin' | 'signup') => void;
}

type TabType = 'hotspots' | 'fusion' | 'ranking' | 'impact' | 'portfolio';

interface RankedItem {
  id: string;
  title: string;
  category: string;
  ward: string;
  authorName: string;
  description: string;
  status: CivicUpdate['status'];
  likes: number;
  timestamp: string;
  demandWeight: number; // 0-100
  gapDeficit: number; // 0-100
  urgencyFactor: number; // 0-100
  finalScore: number;
  confidence: number;
  estimatedBudget: number;
  isAnomaly: boolean;
  demographicContext: string;
  infrastructureGap: string;
  perceptionVsReality: {
    perception: string;
    telemetry: string;
    action: string;
  };
}

export const CivicIntelligencePlatform: React.FC<CivicIntelligencePlatformProps> = ({
  user,
  updates,
  language = 'en',
  onUpdateStatus,
  onOpenAuth,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const suiteT = t.officerSuite;
  const viewsT = suiteT.views;

  const [activeTab, setActiveTab] = useState<TabType>('hotspots');
  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');
  const [budgetCap] = useState<number>(5000000); // $5.0M default
  const [exportedNotice, setExportedNotice] = useState<boolean>(false);

  // Categorical benchmarks to compute realistic telemetry & formulas dynamically
  const categoryBenchmarks: Record<
    string,
    {
      baseBudget: number;
      defaultGap: string;
      defaultDemographics: string;
      telemetryFact: string;
      actionDirective: string;
      avgDurationMonths: number;
    }
  > = {
    Infrastructure: {
      baseBudget: 1200000,
      defaultGap: 'Arterial road surface degradation index > 68%; structural bridge stress detected.',
      defaultDemographics: 'Corridor supports 24,000+ daily commuter transit trips.',
      telemetryFact: 'Mainline transit telemetry indicates 3.8x normal vibration on roadbed.',
      actionDirective: 'Prioritize deep mill-and-overlay resurfacing; sequence during non-peak hours.',
      avgDurationMonths: 4,
    },
    Education: {
      baseBudget: 850000,
      defaultGap: 'Classroom student-to-teacher ratio at 42:1 (regulatory threshold is 28:1).',
      defaultDemographics: 'Census indicates 34% population under 16 years old in this ward.',
      telemetryFact: 'School attendance log records travel distances exceeding 7.5km for secondary students.',
      actionDirective: 'Sanction classroom wing expansion and modern STEM vocational equipment.',
      avgDurationMonths: 6,
    },
    'Public Health': {
      baseBudget: 950000,
      defaultGap: 'Nearest primary healthcare clinic is over 6.2km away with 3.5hr average wait time.',
      defaultDemographics: 'Senior citizen concentration index is 22% above municipal average.',
      telemetryFact: 'Hospital dispatch reports average ambulance turnaround of 28 minutes.',
      actionDirective: 'Deploy 24/7 Ward Health Wellness Sub-Center and diagnostic lab.',
      avgDurationMonths: 5,
    },
    Transit: {
      baseBudget: 600000,
      defaultGap: 'Peak-hour bus frequency: 1 per 55 mins with 96% load factor.',
      defaultDemographics: 'High concentration of industrial and tech corridor workforce.',
      telemetryFact: 'GPS bus tracking shows 42% schedule variance due to bottleneck pinch points.',
      actionDirective: 'Introduce dedicated feeder electric bus route and smart transit priority signals.',
      avgDurationMonths: 3,
    },
    Safety: {
      baseBudget: 350000,
      defaultGap: 'Dark corridor length spans 3.4km with 28 non-functional streetlight fixtures.',
      defaultDemographics: 'High pedestrian evening traffic near university and market districts.',
      telemetryFact: 'Smart grid sensors confirm 14 circuit dropouts across sector poles.',
      actionDirective: 'Install solar LED high-mast smart poles with emergency SOS alert nodes.',
      avgDurationMonths: 2,
    },
    'Waste Management': {
      baseBudget: 450000,
      defaultGap: 'Daily solid waste generation is 18 tonnes vs collection capacity of 11 tonnes.',
      defaultDemographics: 'Rapid commercial market expansion and dense residential clusters.',
      telemetryFact: 'Smart bin fill-level sensors detect overflow occurrences 4 times weekly.',
      actionDirective: 'Deploy dual-shift compactor trucks and decentralized organic composting units.',
      avgDurationMonths: 2,
    },
    'Water & Sanitation': {
      baseBudget: 750000,
      defaultGap: 'Terminal tap pressure fluctuates below 0.4 bar during morning peak demand hours.',
      defaultDemographics: '12,500 households dependent on municipal pipeline network.',
      telemetryFact: 'Flow meters at supply pump show 88% reservoir head, indicating local branch leaks.',
      actionDirective: 'Execute acoustic leak detection and replace corroded branch distribution pipes.',
      avgDurationMonths: 4,
    },
    'Parks & Greenery': {
      baseBudget: 280000,
      defaultGap: 'Public green canopy index is under 8% in high-density residential zone.',
      defaultDemographics: '8,200 children and senior residents within 500m radius.',
      telemetryFact: 'Satellite thermal mapping shows localized heat island anomaly (+3.2C).',
      actionDirective: 'Construct urban micro-forest pocket park with drip irrigation.',
      avgDurationMonths: 2,
    },
  };

  // Aggregated Ward Hotspot Statistics
  const wardStats = useMemo(() => {
    const map: Record<string, { count: number; categories: Record<string, number> }> = {};
    updates.forEach((u) => {
      if (!map[u.ward]) {
        map[u.ward] = { count: 0, categories: {} };
      }
      map[u.ward].count += 1;
      map[u.ward].categories[u.category] = (map[u.ward].categories[u.category] || 0) + 1;
    });

    return Object.entries(map).map(([ward, data]) => {
      let topCategory = 'General';
      let maxCatCount = 0;
      Object.entries(data.categories).forEach(([cat, c]) => {
        if (c > maxCatCount) {
          maxCatCount = c;
          topCategory = cat;
        }
      });
      return {
        ward,
        count: data.count,
        topCategory: t.categories[topCategory] || topCategory,
      };
    });
  }, [updates, t]);

  // Aggregated Recurring Categories
  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    updates.forEach((u) => {
      map[u.category] = (map[u.category] || 0) + 1;
    });

    const total = updates.length || 1;
    return Object.entries(map)
      .map(([cat, count]) => ({
        categoryKey: cat,
        category: t.categories[cat] || cat,
        count,
        percentage: Math.round((count / total) * 100),
        isHighPriority: count >= 2 || count / total > 0.25,
      }))
      .sort((a, b) => b.count - a.count);
  }, [updates, t]);

  // Live Ranked Multi-Factor Evaluation Algorithm
  const rankedItems: RankedItem[] = useMemo(() => {
    return updates.map((u) => {
      const benchmark = categoryBenchmarks[u.category] || {
        baseBudget: 500000,
        defaultGap: 'Standard municipal municipal infrastructure inspection backlog.',
        defaultDemographics: 'Residential and commercial mix zone.',
        telemetryFact: 'Citizen reports logged with verified geo-tag coordinates.',
        actionDirective: 'Dispatch field inspection squad for structural survey.',
        avgDurationMonths: 3,
      };

      const categoryCount = updates.filter((x) => x.category === u.category).length;
      const wardCount = updates.filter((x) => x.ward === u.ward).length;
      const likesCount = u.likes || 0;

      // 1. Demand NLP Weight (0 - 100)
      const demandWeight = Math.min(
        100,
        Math.round(categoryCount * 18 + wardCount * 14 + likesCount * 6 + 25)
      );

      // 2. Objective Infrastructure Gap Deficit (0 - 100)
      const gapDeficit = Math.min(
        100,
        Math.round(45 + (categoryCount * 9) + ((u.id.charCodeAt(0) || 70) % 25))
      );

      // 3. Population / Urgency Factor (0 - 100)
      const urgencyFactor = Math.min(
        100,
        Math.round(50 + (wardCount * 12) + (u.status === 'pending' ? 15 : 0))
      );

      // Formula: Score = (Demand_NLP * 0.4) + (Infra_Gap * 0.4) + (Urgency * 0.2)
      const finalScore = Math.round(
        demandWeight * 0.4 + gapDeficit * 0.4 + urgencyFactor * 0.2
      );

      const isAnomaly = categoryCount === 1 && wardCount === 1 && likesCount === 0;

      return {
        id: u.id,
        title: `${t.categories[u.category] || u.category} - ${u.ward}`,
        category: u.category,
        ward: u.ward,
        authorName: u.authorName || t.submissionsDrawer.verifiedCitizen,
        description: u.description,
        status: u.status,
        likes: u.likes || 0,
        timestamp: u.timestamp,
        demandWeight,
        gapDeficit,
        urgencyFactor,
        finalScore,
        confidence: Math.min(95, Math.max(65, 70 + categoryCount * 4)),
        estimatedBudget: benchmark.baseBudget + (Math.floor(finalScore) % 7) * 25000,
        isAnomaly,
        demographicContext: `${benchmark.defaultDemographics} (${u.ward})`,
        infrastructureGap: benchmark.defaultGap,
        perceptionVsReality: {
          perception: `Citizen Request: "${u.description}"`,
          telemetry: benchmark.telemetryFact,
          action: benchmark.actionDirective,
        },
      };
    }).sort((a, b) => b.finalScore - a.finalScore);
  }, [updates, t]);

  // Filtered ranking list
  const filteredRankedItems = useMemo(() => {
    return rankedItems.filter((item) => {
      if (selectedWardFilter !== 'All' && item.ward !== selectedWardFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.ward.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rankedItems, selectedWardFilter, searchQuery]);

  // Set default selected scenario
  const currentScenario = useMemo(() => {
    if (!rankedItems.length) return null;
    if (selectedScenarioId) {
      return rankedItems.find((r) => r.id === selectedScenarioId) || rankedItems[0];
    }
    return rankedItems[0];
  }, [rankedItems, selectedScenarioId]);

  // Calculate Portfolio Macro Constraints
  const portfolioStats = useMemo(() => {
    const activeProjects = rankedItems.filter((r) => !r.isAnomaly);
    const totalFeasible = activeProjects.reduce((acc, curr) => acc + curr.estimatedBudget, 0);
    const cappedAllocation = Math.min(budgetCap, totalFeasible);
    const budgetPct = Math.min(100, Math.round((cappedAllocation / budgetCap) * 100));
    const concurrentProjects = Math.min(6, activeProjects.length);
    const bandwidthPct = Math.min(95, Math.max(30, concurrentProjects * 18));

    return {
      totalFeasible,
      budgetCap,
      budgetPct,
      concurrentProjects,
      bandwidthPct,
      phase1: activeProjects.slice(0, 2),
      phase2: activeProjects.slice(2, 4),
      phase3: activeProjects.slice(4, 7),
    };
  }, [rankedItems, budgetCap]);

  // Export Plan Handler
  const handleExportPlan = () => {
    const summary = {
      title: 'JANNITI Civic Intelligence - Municipal Capital Allocation Plan',
      timestamp: new Date().toISOString(),
      officer: user ? `${user.name} (${user.email})` : 'Authority Review Panel',
      department: user?.department || 'Municipal Public Works & Planning',
      budgetCap: `$${(budgetCap / 1000000).toFixed(2)}M`,
      allocatedBudget: `$${(portfolioStats.totalFeasible / 1000000).toFixed(2)}M`,
      totalCitizenPetitions: updates.length,
      prioritizedProjects: rankedItems.map((item, idx) => ({
        rank: idx + 1,
        id: item.id,
        ward: item.ward,
        category: item.category,
        score: item.finalScore,
        status: item.status,
        estimatedCost: `$${item.estimatedBudget.toLocaleString()}`,
        description: item.description,
      })),
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Municipal_Development_Plan_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportedNotice(true);
    setTimeout(() => setExportedNotice(false), 4000);
  };

  const allWards = useMemo(() => {
    const list = Array.from(new Set(updates.map((u) => u.ward)));
    return list.length > 0 ? list : ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5'];
  }, [updates]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-6">
      {/* 2-Column Grid: Options / Navigation Panel (Left) & Analytical Dashboards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Officer Options & View Selection Panel - Expanded Size */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-5 sm:p-6 shadow-[0_12px_32px_var(--shadow-color)] flex flex-col gap-3">
            {/* Navigation Tab Options */}
            <button
              id="tab-hotspots"
              onClick={() => setActiveTab('hotspots')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                activeTab === 'hotspots'
                  ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500 dark:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--item-hover)] border border-transparent'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${activeTab === 'hotspots' ? 'bg-sky-500 text-white' : 'bg-[var(--item-bg)] text-sky-400'}`}>
                <Flame className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate">{suiteT.tabs.hotspots}</span>
                <span className="text-xs font-normal normal-case text-[var(--text-muted)] truncate">GIS Heatmap & Clusters</span>
              </div>
            </button>

            <button
              id="tab-fusion"
              onClick={() => setActiveTab('fusion')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                activeTab === 'fusion'
                  ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500 dark:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--item-hover)] border border-transparent'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${activeTab === 'fusion' ? 'bg-sky-500 text-white' : 'bg-[var(--item-bg)] text-purple-400'}`}>
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate">{suiteT.tabs.fusion}</span>
                <span className="text-xs font-normal normal-case text-[var(--text-muted)] truncate">Citizen vs Survey vs 311</span>
              </div>
            </button>

            <button
              id="tab-ranking"
              onClick={() => setActiveTab('ranking')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                activeTab === 'ranking'
                  ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500 dark:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--item-hover)] border border-transparent'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${activeTab === 'ranking' ? 'bg-sky-500 text-white' : 'bg-[var(--item-bg)] text-emerald-400'}`}>
                <ListOrdered className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate">{suiteT.tabs.ranking}</span>
                <span className="text-xs font-normal normal-case text-[var(--text-muted)] truncate">Multi-Criteria Score</span>
              </div>
            </button>

            <button
              id="tab-impact"
              onClick={() => setActiveTab('impact')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                activeTab === 'impact'
                  ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500 dark:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--item-hover)] border border-transparent'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${activeTab === 'impact' ? 'bg-sky-500 text-white' : 'bg-[var(--item-bg)] text-amber-400'}`}>
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate">{suiteT.tabs.impact}</span>
                <span className="text-xs font-normal normal-case text-[var(--text-muted)] truncate">Counterfactual Policy ROI</span>
              </div>
            </button>

            <button
              id="tab-portfolio"
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                activeTab === 'portfolio'
                  ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500 dark:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--item-hover)] border border-transparent'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${activeTab === 'portfolio' ? 'bg-sky-500 text-white' : 'bg-[var(--item-bg)] text-pink-400'}`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate">{suiteT.tabs.portfolio}</span>
                <span className="text-xs font-normal normal-case text-[var(--text-muted)] truncate">Constrained Capital Budget</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side: Analytical Dashboards & Main Content */}
        <div className="lg:col-span-8 xl:col-span-8 w-full min-w-0">
        {/* ================= VIEW 1: DEMAND HOTSPOTS ================= */}
        {activeTab === 'hotspots' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-purple-700 dark:from-white dark:via-sky-400 dark:to-purple-500 bg-clip-text text-transparent">
                {viewsT.hotspots.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Geospatial Demand Heatmap */}
              <div className="lg:col-span-12 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />

                {/* Real Interactive OpenStreetMap GIS Section */}
                <OpenFreeCivicMap
                  updates={updates}
                  wardStats={wardStats}
                  selectedWard={selectedWardFilter}
                  onSelectWard={(w) => {
                    setSelectedWardFilter(w);
                  }}
                  language={language}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: DATA FUSION ================= */}
        {activeTab === 'fusion' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-purple-700 dark:from-white dark:via-sky-400 dark:to-purple-500 bg-clip-text text-transparent">
                {viewsT.fusion.title}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Dedicated Citizen Photos, Videos & Text Submissions Box */}
              <CitizenSubmissionsMediaBox
                updates={updates}
                language={language}
                onUpdateStatus={onUpdateStatus}
                onSelectWard={(w) => {
                  setSelectedWardFilter(w);
                  setActiveTab('hotspots');
                }}
              />

              {/* Multi-Source Data Fusion Engine Table */}
              <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-4">
                  {viewsT.fusion.engineTitle}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          {viewsT.fusion.colNeed}
                        </th>
                        <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          {viewsT.fusion.colDemographic}
                        </th>
                        <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                          {viewsT.fusion.colInfra}
                        </th>
                        <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 text-right">
                          {viewsT.fusion.colOutput}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)] text-xs">
                      {rankedItems.length > 0 ? (
                        rankedItems.slice(0, 6).map((item) => (
                          <tr key={item.id} className="hover:bg-[var(--item-hover)] transition-colors">
                            <td className="py-3.5 px-3 font-semibold text-[var(--text)]">
                              <div>{item.title}</div>
                              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono">
                                #{item.id} • {item.ward}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-[var(--text-muted)]">
                              {item.demographicContext}
                            </td>
                            <td className="py-3.5 px-3 text-[var(--text-muted)]">
                              {item.infrastructureGap}
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  item.finalScore >= 75
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                    : item.finalScore >= 50
                                    ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/30'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {item.finalScore >= 75
                                  ? viewsT.fusion.substantiatedHigh
                                  : item.finalScore >= 50
                                  ? viewsT.fusion.substantiatedMed
                                  : viewsT.fusion.substantiatedLow}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-xs text-[var(--text-muted)]">
                            {viewsT.hotspots.noData}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Perception vs. Objective Data Reconciler */}
              <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1">
                  {viewsT.fusion.reconcilerTitle}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  {viewsT.fusion.reconcilerDesc}
                </p>

                {currentScenario ? (
                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 border-l-4 border-l-amber-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">
                        {viewsT.fusion.caseEval}: {currentScenario.ward} - {t.categories[currentScenario.category] || currentScenario.category}
                      </h4>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                        {viewsT.fusion.activeReconcile}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="p-3.5 rounded-xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-xs">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                          {viewsT.fusion.citizenPerception}
                        </span>
                        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                          &ldquo;{currentScenario.description}&rdquo;
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/70 dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-xs">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                          {viewsT.fusion.objectiveTelemetry}
                        </span>
                        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                          {currentScenario.perceptionVsReality.telemetry}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-300/50 dark:border-white/10 text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed font-medium">
                      <strong className="text-emerald-800 dark:text-emerald-300">{viewsT.fusion.reconcileSynthesis}:</strong> {currentScenario.perceptionVsReality.action}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[var(--text-muted)] italic">
                    {viewsT.hotspots.noData}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: PRIORITY RANKING ================= */}
        {activeTab === 'ranking' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-purple-700 dark:from-white dark:via-sky-400 dark:to-purple-500 bg-clip-text text-transparent">
                {viewsT.ranking.title}
              </h2>
            </div>

            {/* Prioritization Output Table */}
            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">
                    {viewsT.ranking.outputTitle}
                  </h3>
                </div>

                {/* Filter and Search */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={suiteT.searchPlaceholder}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] outline-none focus:border-sky-400 w-40 sm:w-48"
                    />
                  </div>
                  <select
                    value={selectedWardFilter}
                    onChange={(e) => setSelectedWardFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] outline-none focus:border-sky-400"
                  >
                    <option value="All">{t.common.filterAll} ({viewsT.ranking.colWard})</option>
                    {allWards.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-color)]">
                      <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {viewsT.ranking.colRank}
                      </th>
                      <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {viewsT.ranking.colWard} &amp; {viewsT.ranking.colCategory}
                      </th>
                      <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {viewsT.ranking.colUrgency}
                      </th>
                      <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {viewsT.ranking.colScore}
                      </th>
                      <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {t.jannitiPortal.statusLabel}
                      </th>
                      <th className="py-3 px-3 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 text-right">
                        {viewsT.ranking.colAction}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)] text-xs">
                    {filteredRankedItems.length > 0 ? (
                      filteredRankedItems.map((item, idx) => {
                        const rankBadges = [
                          'bg-amber-500 text-slate-950 font-black',
                          'bg-slate-300 dark:bg-slate-200 text-slate-900 font-bold',
                          'bg-amber-700 text-white font-bold',
                        ];
                        const rankBadge =
                          rankBadges[idx] ||
                          'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold';

                        return (
                          <tr key={item.id} className="hover:bg-[var(--item-hover)] transition-colors">
                            <td className="py-3 px-3">
                              <span className={`inline-block px-2 py-0.5 rounded text-[11px] ${rankBadge}`}>
                                #{idx + 1}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-medium text-[var(--text)] max-w-xs">
                              <div className="font-bold text-xs truncate">{item.title}</div>
                              <div className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                                {item.description}
                              </div>
                              <div className="text-[10px] text-sky-600 dark:text-sky-400 font-mono mt-0.5">
                                #{item.id} • {item.ward} • {t.jannitiPortal.byAuthor} {item.authorName}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-[var(--text-muted)]">
                              <ul className="list-disc pl-3 text-[11px] space-y-0.5">
                                <li>{viewsT.hotspots.demandIndex}: {item.demandWeight}/100</li>
                                <li>{viewsT.fusion.colInfra}: {item.gapDeficit}/100</li>
                              </ul>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-sm font-extrabold text-purple-700 dark:text-purple-400">
                                {item.finalScore}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                  item.status === 'resolved'
                                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                    : item.status === 'in_progress'
                                    ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300'
                                    : item.status === 'reviewing'
                                    ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300'
                                    : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                                }`}
                              >
                                {t.statuses[item.status] || item.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {item.status === 'pending' && (
                                  <button
                                    onClick={() => onUpdateStatus(item.id, 'reviewing')}
                                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {viewsT.ranking.btnReview}
                                  </button>
                                )}
                                {item.status === 'reviewing' && (
                                  <button
                                    onClick={() => onUpdateStatus(item.id, 'in_progress')}
                                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-700 dark:text-purple-300 hover:bg-purple-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {viewsT.ranking.btnStartWork}
                                  </button>
                                )}
                                {item.status === 'in_progress' && (
                                  <button
                                    onClick={() => onUpdateStatus(item.id, 'resolved')}
                                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                                  >
                                    {viewsT.ranking.btnResolved}
                                  </button>
                                )}
                                {item.status === 'resolved' && (
                                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.statuses.resolved}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-xs text-[var(--text-muted)]">
                          {viewsT.hotspots.noData}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 4: PREDICTIVE IMPACT ================= */}
        {activeTab === 'impact' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-purple-700 dark:from-white dark:via-sky-400 dark:to-purple-500 bg-clip-text text-transparent">
                {viewsT.impact.title}
              </h2>
            </div>

            {/* Scenario Selector */}
            <div className="bg-sky-500/10 border border-sky-500/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <h3 className="text-sm font-bold text-sky-700 dark:text-sky-400">
                  {viewsT.impact.projectedTitle}:
                </h3>
              </div>
              <select
                value={selectedScenarioId || currentScenario?.id || ''}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text)] outline-none focus:border-sky-500"
              >
                {rankedItems.map((r, i) => (
                  <option key={r.id} value={r.id}>
                    #{i + 1}: {r.ward} - {t.categories[r.category] || r.category} ({r.description.slice(0, 36)}...)
                  </option>
                ))}
              </select>
            </div>

            {currentScenario ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Social Impact Card */}
                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-4">
                    {viewsT.impact.metricSocial}
                  </h3>

                  {/* Metric 1 */}
                  <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[var(--text)]">
                        {viewsT.impact.qolScore}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        -{Math.min(68, Math.max(28, Math.round(currentScenario.finalScore * 0.55)))}%
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] italic border-l-2 border-slate-400 dark:border-slate-600 pl-2.5 mb-3">
                      {viewsT.impact.projectedDesc} ({currentScenario.ward})
                    </p>

                    {/* Confidence Meter */}
                    <div className="flex justify-between text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">
                      <span>{viewsT.impact.costEff}</span>
                      <span>{currentScenario.confidence}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${currentScenario.confidence}%` }}
                      />
                    </div>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 text-right mt-1">
                      &plusmn;5% Empirical Variance Interval
                    </span>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[var(--text)]">
                        {viewsT.impact.beneficiaries}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400">
                        ~{Math.round(currentScenario.finalScore * 140)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      {viewsT.impact.chartDesc}
                    </p>
                  </div>
                </div>

                {/* Economic & Cost-Benefit Card */}
                <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-4">
                    {viewsT.impact.metricEconomic}
                  </h3>

                  <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)] mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[var(--text)]">
                        {viewsT.impact.roiEstimate}
                      </span>
                      <span className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        1 : {(2.8 + (currentScenario.finalScore % 10) * 0.1).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] italic border-l-2 border-slate-400 dark:border-slate-600 pl-2.5 mb-3">
                      {viewsT.impact.chartTitle}
                    </p>

                    <div className="flex justify-between text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">
                      <span>{viewsT.impact.metricHealth}</span>
                      <span>Moderate (72%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[72%]" />
                    </div>
                  </div>

                  {/* Identified Risk Box */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 border-l-4 border-l-amber-500">
                    <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                      {viewsT.portfolio.tradeOffTitle}
                    </h4>
                    <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
                      {viewsT.portfolio.tradeOffSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] italic">
                {viewsT.hotspots.noData}
              </p>
            )}
          </div>
        )}

        {/* ================= VIEW 5: PORTFOLIO OPTIMIZATION ================= */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-sky-600 to-purple-700 dark:from-white dark:via-sky-400 dark:to-purple-500 bg-clip-text text-transparent">
                {viewsT.portfolio.title}
              </h2>
            </div>

            {/* Macro Constraints Dashboard */}
            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
              <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{viewsT.portfolio.budgetTitle}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)]">
                  <div className="flex justify-between items-center text-xs font-semibold text-[var(--text)] mb-2">
                    <span>{viewsT.portfolio.allocated}</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">
                      ${(portfolioStats.totalFeasible / 1000000).toFixed(2)}M / ${(budgetCap / 1000000).toFixed(2)}M ({portfolioStats.budgetPct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${portfolioStats.budgetPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2">
                    {viewsT.portfolio.budgetDesc}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)]">
                  <div className="flex justify-between items-center text-xs font-semibold text-[var(--text)] mb-2">
                    <span>{viewsT.portfolio.remaining}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {portfolioStats.bandwidthPct}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${portfolioStats.bandwidthPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-2">
                    {viewsT.portfolio.optimizedListDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Sequenced Implementation Plan & Algorithmic Trade-offs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sequenced Implementation Timeline */}
              <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>{viewsT.portfolio.optimizedListTitle}</span>
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">
                  {viewsT.portfolio.optimizedListDesc}
                </p>

                <div className="relative pl-6 border-l-2 border-slate-300 dark:border-slate-700 space-y-6">
                  {/* Phase 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white dark:border-slate-900 shadow-md" />
                    <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                      Phase 1: {viewsT.portfolio.approved}
                    </span>
                    <div className="mt-2 p-3.5 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)]">
                      {portfolioStats.phase1.length > 0 ? (
                        portfolioStats.phase1.map((p) => (
                          <div key={p.id} className="mb-2 last:mb-0">
                            <h4 className="text-xs font-bold text-[var(--text)]">
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                              {p.description}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-700 dark:text-sky-300">
                              ${(p.estimatedBudget / 1000).toFixed(0)}k Allocated
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[var(--text-muted)]">{viewsT.hotspots.noData}</p>
                      )}
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900 shadow-md" />
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      Phase 2: {viewsT.portfolio.remaining}
                    </span>
                    <div className="mt-2 p-3.5 rounded-2xl bg-[var(--item-bg)] border border-[var(--border-color)]">
                      {portfolioStats.phase2.length > 0 ? (
                        portfolioStats.phase2.map((p) => (
                          <div key={p.id} className="mb-2 last:mb-0">
                            <h4 className="text-xs font-bold text-[var(--text)]">
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                              {p.description}
                            </p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300">
                              {viewsT.portfolio.budgetDesc}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[var(--text-muted)]">{viewsT.hotspots.noData}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Algorithmic Trade-off Analysis */}
              <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-6 shadow-[0_10px_30px_var(--shadow-color)] relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1">
                  {viewsT.portfolio.tradeOffTitle}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">
                  {viewsT.portfolio.tradeOffSubtitle}
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/30 border-l-4 border-l-pink-500">
                    <h4 className="text-xs font-bold text-pink-700 dark:text-pink-400 mb-1">
                      {viewsT.portfolio.totalBudget}
                    </h4>
                    <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
                      {viewsT.portfolio.budgetDesc}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 border-l-4 border-l-amber-500">
                    <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                      {viewsT.portfolio.optimizedListTitle}
                    </h4>
                    <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-medium">
                      {viewsT.portfolio.optimizedListDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
