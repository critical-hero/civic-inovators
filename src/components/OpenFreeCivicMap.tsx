import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Layers,
  RotateCcw,
  Maximize2,
  Minimize2,
  MapPin,
  ExternalLink,
  ThumbsUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Image as ImageIcon,
  Video,
  Filter,
} from 'lucide-react';
import { CivicUpdate, Language } from '../types';

interface OpenFreeCivicMapProps {
  updates: CivicUpdate[];
  wardStats: {
    ward: string;
    count: number;
    topCategory: string;
    categories?: Record<string, number>;
  }[];
  selectedWard?: string;
  onSelectWard?: (ward: string) => void;
  language?: Language;
}

// Coordinates in [latitude, longitude] for Bhubaneswar wards
export const WARD_COORDINATES: Record<string, [number, number]> = {
  'Ward 1': [20.3012, 85.8315], // Jayadev Vihar / Nayapalli
  'Ward 2': [20.2925, 85.818],  // Saheed Nagar
  'Ward 3': [20.32, 85.845],    // Patia / KIIT Corridor
  'Ward 4': [20.26, 85.824],    // Old Town / Lingaraj
  'Ward 5': [20.285, 85.86],    // Rasulgarh / Cuttack Road
  'Ward 6': [20.315, 85.805],   // Chandrasekharpur
  'Ward 7': [20.278, 85.795],   // Khandagiri / Jagamara
  'Ward 8': [20.272, 85.833],   // Bapuji Nagar
  'Ward 9': [20.305, 85.852],   // Mancheswar
  'Ward 10': [20.33, 85.78],    // Infocity / Sailashree Vihar
  'Ward 11': [20.286, 85.838],  // Vani Vihar
  'Ward 12': [20.305, 85.812],  // IRC Village
  'Ward 13': [20.288, 85.802],  // Baramunda Transit Hub
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; hex: string }> = {
  Infrastructure: { bg: 'bg-amber-500', border: 'border-amber-400', hex: '#f59e0b' },
  Safety: { bg: 'bg-rose-500', border: 'border-rose-400', hex: '#f43f5e' },
  'Public Health': { bg: 'bg-emerald-500', border: 'border-emerald-400', hex: '#10b981' },
  Transit: { bg: 'bg-sky-500', border: 'border-sky-400', hex: '#0284c7' },
  'Waste Management': { bg: 'bg-indigo-500', border: 'border-indigo-400', hex: '#6366f1' },
  'Water & Sanitation': { bg: 'bg-cyan-500', border: 'border-cyan-400', hex: '#06b6d4' },
  'Parks & Greenery': { bg: 'bg-teal-500', border: 'border-teal-400', hex: '#14b8a6' },
  Education: { bg: 'bg-violet-500', border: 'border-violet-400', hex: '#8b5cf6' },
  Default: { bg: 'bg-blue-500', border: 'border-blue-400', hex: '#3b82f6' },
};

export const OpenFreeCivicMap: React.FC<OpenFreeCivicMapProps> = ({
  updates,
  wardStats,
  selectedWard = 'All',
  onSelectWard,
  language = 'en',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [activeLayerMode, setActiveLayerMode] = useState<'all' | 'wards' | 'petitions'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [activeItemPopup, setActiveItemPopup] = useState<CivicUpdate | null>(null);

  const defaultCenter: [number, number] = [20.2961, 85.8245]; // Center Bhubaneswar

  // Unique categories for filter bar
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    updates.forEach((u) => {
      if (u.category) set.add(u.category);
    });
    return ['All', ...Array.from(set)];
  }, [updates]);

  // Filtered updates based on selected ward and category
  const filteredUpdates = useMemo(() => {
    return updates.filter((u) => {
      const matchWard = selectedWard === 'All' || u.ward === selectedWard;
      const matchCat = selectedCategory === 'All' || u.category === selectedCategory;
      return matchWard && matchCat;
    });
  }, [updates, selectedWard, selectedCategory]);

  // 1. Initialize Leaflet Map with OpenStreetMap exclusively
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (leafletMapRef.current) return; // already initialized

    try {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 12,
        zoomControl: false,
        attributionControl: true,
      });

      // Custom Zoom Control at top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dedicated OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      // LayerGroup for markers
      const markerGroup = L.layerGroup().addTo(map);
      markersLayerGroupRef.current = markerGroup;

      leafletMapRef.current = map;
      setMapLoaded(true);

      // Invalidate size on next tick to ensure container dimensions are computed
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    } catch (err) {
      console.error('Leaflet initialization error:', err);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // 3. Render Ward & Petition Markers
  useEffect(() => {
    if (!leafletMapRef.current || !markersLayerGroupRef.current) return;
    const group = markersLayerGroupRef.current;
    group.clearLayers();

    // A. Render Ward Hotspot Rings if layer mode is 'all' or 'wards'
    if (activeLayerMode === 'all' || activeLayerMode === 'wards') {
      wardStats.forEach((ws) => {
        if (selectedWard !== 'All' && ws.ward !== selectedWard) return;
        const coords = WARD_COORDINATES[ws.ward];
        if (!coords) return;

        const isSelected = selectedWard === ws.ward;
        const wardCount = ws.count;
        const intensityClass =
          wardCount >= 4
            ? 'border-rose-500 bg-rose-500/30 text-rose-300'
            : wardCount >= 2
            ? 'border-amber-500 bg-amber-500/30 text-amber-300'
            : 'border-sky-500 bg-sky-500/30 text-sky-300';

        const wardHtml = `
          <div class="relative group cursor-pointer flex flex-col items-center">
            <div class="absolute -inset-2 rounded-full animate-ping opacity-40 ${intensityClass} pointer-events-none"></div>
            <div class="relative px-2.5 py-1 rounded-full shadow-lg border backdrop-blur-md font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-110 ${
              isSelected
                ? 'bg-purple-600 border-white text-white ring-4 ring-purple-400/40 shadow-purple-500/50'
                : 'bg-slate-900/90 border-slate-700 text-white'
            }">
              <span class="w-2 h-2 rounded-full ${intensityClass.split(' ')[0]}"></span>
              <span class="tracking-wide">${ws.ward}</span>
              <span class="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">${ws.count}</span>
            </div>
            <div class="text-[9px] font-semibold text-slate-200 bg-black/75 px-1.5 py-0.5 rounded-md mt-0.5 whitespace-nowrap shadow-sm">
              ${ws.topCategory}
            </div>
          </div>
        `;

        const wardIcon = L.divIcon({
          html: wardHtml,
          className: 'civic-ward-marker',
          iconSize: [80, 44],
          iconAnchor: [40, 22],
        });

        const marker = L.marker(coords, { icon: wardIcon });

        // Click popup
        const popupContent = `
          <div class="p-2 font-sans text-slate-800">
            <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-1.5">
              <span class="font-extrabold text-sm text-slate-900">${ws.ward}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">${ws.count} Petitions</span>
            </div>
            <div class="text-xs text-slate-600 mb-2">
              <strong>Dominant Sector:</strong> ${ws.topCategory}
            </div>
            <div class="text-[11px] text-slate-500 mb-2">
              Citizen reports verified with geo-spatial telemetry in this sector.
            </div>
            <button id="focus-ward-${ws.ward.replace(/\s+/g, '')}" class="w-full text-center py-1 px-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer">
              Focus ${ws.ward} in Dashboard
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 220 });

        marker.on('popupopen', () => {
          const btn = document.getElementById(`focus-ward-${ws.ward.replace(/\s+/g, '')}`);
          if (btn && onSelectWard) {
            btn.onclick = () => {
              onSelectWard(ws.ward);
              marker.closePopup();
            };
          }
        });

        marker.on('click', () => {
          if (onSelectWard) onSelectWard(ws.ward);
        });

        marker.addTo(group);
      });
    }

    // B. Render Individual Citizen Petition Markers if layer mode is 'all' or 'petitions'
    if (activeLayerMode === 'all' || activeLayerMode === 'petitions') {
      filteredUpdates.forEach((u, index) => {
        const baseCoords = WARD_COORDINATES[u.ward] || defaultCenter;
        // Deterministic pseudo-offset so petitions don't stack on top of each other
        const angle = (index * 72 * Math.PI) / 180;
        const radius = 0.0045 + (index % 3) * 0.0025;
        const lat = baseCoords[0] + radius * Math.cos(angle);
        const lng = baseCoords[1] + radius * Math.sin(angle);

        const catConfig = CATEGORY_COLORS[u.category] || CATEGORY_COLORS.Default;
        const isResolved = u.status === 'resolved';
        const isInProgress = u.status === 'in_progress';

        const statusColor = isResolved
          ? 'bg-emerald-500'
          : isInProgress
          ? 'bg-amber-500'
          : 'bg-rose-500';

        const hasMedia = !!u.imageUrl || !!u.videoUrl;

        const petitionHtml = `
          <div class="relative group cursor-pointer">
            <div class="w-7 h-7 rounded-full ${catConfig.bg} border-2 border-white shadow-md flex items-center justify-center text-white text-[11px] font-bold transition-transform hover:scale-125">
              ${hasMedia ? '📸' : '📍'}
            </div>
            <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${statusColor} border border-white"></span>
          </div>
        `;

        const petitionIcon = L.divIcon({
          html: petitionHtml,
          className: 'civic-petition-marker',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([lat, lng], { icon: petitionIcon });

        const mediaSnippet = u.imageUrl
          ? `<div class="w-full h-24 rounded-md overflow-hidden mb-2 bg-slate-100">
               <img src="${u.imageUrl}" alt="Citizen submission" class="w-full h-full object-cover" />
             </div>`
          : u.videoUrl
          ? `<div class="w-full py-1 px-2 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold flex items-center gap-1 mb-2">
               📹 Attached Situational Video Footage
             </div>`
          : '';

        const petitionPopup = `
          <div class="p-1 font-sans text-slate-800 max-w-[240px]">
            ${mediaSnippet}
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-sky-700">${u.category}</span>
              <span class="text-[9px] px-1.5 py-0.2 rounded-full ${
                isResolved
                  ? 'bg-emerald-100 text-emerald-800'
                  : isInProgress
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              } font-semibold uppercase">${u.status.replace('_', ' ')}</span>
            </div>
            <div class="text-xs font-semibold text-slate-900 line-clamp-2 mb-1">
              &ldquo;${u.description}&rdquo;
            </div>
            <div class="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-1 mt-1">
              <span>${u.ward} • ${u.authorName || 'Citizen'}</span>
              <span>👍 ${u.likes || 0}</span>
            </div>
          </div>
        `;

        marker.bindPopup(petitionPopup, { maxWidth: 260 });
        marker.on('click', () => {
          setActiveItemPopup(u);
        });

        marker.addTo(group);
      });
    }
  }, [wardStats, filteredUpdates, activeLayerMode, selectedWard]);

  // 4. Focus Ward or Bhubaneswar when selectedWard changes
  useEffect(() => {
    if (!leafletMapRef.current) return;
    if (selectedWard && selectedWard !== 'All' && WARD_COORDINATES[selectedWard]) {
      const coords = WARD_COORDINATES[selectedWard];
      leafletMapRef.current.flyTo(coords, 14, { duration: 1.2 });
    }
  }, [selectedWard]);

  // 5. Container Resize Watcher
  useEffect(() => {
    if (!mapContainerRef.current || !leafletMapRef.current) return;
    const observer = new ResizeObserver(() => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize();
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, [isExpanded]);

  // Reset View Handler
  const handleResetView = useCallback(() => {
    if (!leafletMapRef.current) return;
    if (onSelectWard) onSelectWard('All');
    setSelectedCategory('All');
    leafletMapRef.current.flyTo(defaultCenter, 12, { duration: 1.0 });
  }, [onSelectWard, defaultCenter]);

  return (
    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-[0_10px_30px_var(--shadow-color)] relative flex flex-col transition-all">
      {/* Top Map Control Bar */}
      <div className="p-3.5 sm:p-4 border-b border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2.5 bg-[var(--item-bg)]">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-sky-500 animate-spin-slow" />
            <span>OpenStreetMap GIS & Telemetry</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Bhubaneswar Municipal Corporation (BMC)</span>
            {selectedWard !== 'All' && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                Filtered: {selectedWard}
              </span>
            )}
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Layer Modes */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 border border-[var(--border-color)] text-[11px] font-semibold">
            <button
              onClick={() => setActiveLayerMode('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeLayerMode === 'all'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setActiveLayerMode('wards')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeLayerMode === 'wards'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Wards
            </button>
            <button
              onClick={() => setActiveLayerMode('petitions')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeLayerMode === 'petitions'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Petitions ({filteredUpdates.length})
            </button>
          </div>

          {/* OpenStreetMap Dedicated Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>OpenStreetMap</span>
          </div>

          {/* Recenter button */}
          <button
            onClick={handleResetView}
            title="Reset to City Overview"
            aria-label="Reset Map View"
            className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Expand height button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse Map' : 'Expand Fullscreen Height'}
            aria-label={isExpanded ? 'Collapse Map' : 'Expand Map'}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="px-3.5 py-2 border-b border-[var(--border-color)] bg-[var(--card-bg)] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
        <span className="text-[var(--text-muted)] font-bold uppercase tracking-wider text-[9px] mr-1 flex items-center gap-1">
          <Filter className="w-2.5 h-2.5" /> Sector:
        </span>
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-0.5 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sky-500 text-white font-bold shadow-xs'
                : 'bg-[var(--item-bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border-color)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Real Map Canvas Container */}
      <div className="relative w-full overflow-hidden bg-slate-950">
        <div
          ref={mapContainerRef}
          style={{ height: isExpanded ? '560px' : '390px' }}
          className="w-full transition-all duration-300 z-0"
        />

        {/* Floating Quick Legend */}
        <div className="absolute bottom-6 left-3.5 z-10 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-white text-[10px] space-y-1 shadow-lg pointer-events-auto max-w-[200px]">
          <div className="font-bold text-sky-400 uppercase tracking-wider text-[9px] mb-1">
            GIS Hotspot Legend
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>High Density Ward Hotspot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Active Citizen Field Report</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Engineering Work In Progress</span>
          </div>
        </div>
      </div>

      {/* Bottom Attribution and Status Bar */}
      <div className="px-4 py-2 border-t border-[var(--border-color)] bg-[var(--item-bg)] flex flex-wrap items-center justify-between text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium text-[var(--text)]">
            Active Pins: {filteredUpdates.length} Citizen Submissions
          </span>
          <span>•</span>
          <span>Wards Mapped: {wardStats.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Map Data &copy;</span>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:underline font-semibold inline-flex items-center gap-0.5"
          >
            OpenStreetMap contributors <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const OpenStreetMapCivicMap = OpenFreeCivicMap;
