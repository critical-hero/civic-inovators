import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  X,
  Crosshair,
  CheckCircle2,
  Globe,
  MapPin,
} from 'lucide-react';
import { WARD_COORDINATES } from './OpenFreeCivicMap';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWard: string;
  onSelectLocation: (coords: { lat: number; lng: number }, detectedWard: string) => void;
}

// Find closest ward from coordinates
function getClosestWard(lat: number, lng: number): string {
  let closestWard = 'Ward 1';
  let minDist = Infinity;
  for (const [ward, coord] of Object.entries(WARD_COORDINATES)) {
    const dist = Math.hypot(lat - coord[0], lng - coord[1]);
    if (dist < minDist) {
      minDist = dist;
      closestWard = ward;
    }
  }
  return closestWard;
}

export const GoogleLocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  selectedWard,
  onSelectLocation,
}) => {
  const initialCoord = WARD_COORDINATES[selectedWard]
    ? { lat: WARD_COORDINATES[selectedWard][0], lng: WARD_COORDINATES[selectedWard][1] }
    : { lat: 20.2961, lng: 85.8245 };

  const [pinPosition, setPinPosition] = useState<{ lat: number; lng: number }>(initialCoord);
  const [currentWard, setCurrentWard] = useState<string>(selectedWard);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Sync ward and initial coordinates when opened
  useEffect(() => {
    if (isOpen) {
      const coord = WARD_COORDINATES[selectedWard]
        ? { lat: WARD_COORDINATES[selectedWard][0], lng: WARD_COORDINATES[selectedWard][1] }
        : { lat: 20.2961, lng: 85.8245 };
      setPinPosition(coord);
      setCurrentWard(selectedWard);
    }
  }, [isOpen, selectedWard]);

  // Initialize Leaflet Map with OpenStreetMap
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    // Destroy existing instance if any
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    try {
      const map = L.map(containerRef.current, {
        center: [pinPosition.lat, pinPosition.lng],
        zoom: 14,
        zoomControl: true,
        attributionControl: true,
      });

      // Exclusive OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-picker-pin',
        html: `<div style="transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center;">
          <div style="background-color: #0284c7; color: white; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); white-space: nowrap;">
            📍 Selected Pin
          </div>
          <div style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 6px solid #0284c7;"></div>
        </div>`,
        iconSize: [0, 0],
      });

      const marker = L.marker([pinPosition.lat, pinPosition.lng], {
        icon: customIcon,
      }).addTo(map);
      markerRef.current = marker;

      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setPinPosition({ lat, lng });
        const ward = getClosestWard(lat, lng);
        setCurrentWard(ward);
      });

      mapRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    } catch (err) {
      console.error('OpenStreetMap picker error:', err);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen]);

  // Update marker position when pinPosition changes programmatically
  useEffect(() => {
    if (markerRef.current && mapRef.current) {
      markerRef.current.setLatLng([pinPosition.lat, pinPosition.lng]);
      mapRef.current.panTo([pinPosition.lat, pinPosition.lng]);
    }
  }, [pinPosition.lat, pinPosition.lng]);

  if (!isOpen) return null;

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPinPosition(coords);
        setCurrentWard(getClosestWard(coords.lat, coords.lng));
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleConfirm = () => {
    onSelectLocation(pinPosition, currentWard);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl flex flex-col space-y-4 p-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--text)]">
                Pick Location on OpenStreetMap
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Click anywhere on the map to pin the civic issue
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Map Modal"
            className="p-1.5 rounded-lg bg-[var(--item-bg)] text-[var(--text)] hover:opacity-80 transition-opacity cursor-pointer border border-[var(--border-color)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden border border-[var(--border-color)] bg-slate-900">
          <div ref={containerRef} className="w-full h-full z-0" />

          {/* Quick Locate Button */}
          <button
            onClick={handleLocateMe}
            title="Use My Current GPS Location"
            className={`absolute top-3 right-3 z-[400] p-2 rounded-lg bg-[var(--card-bg)] shadow-md border border-[var(--border-color)] text-[var(--text)] hover:bg-[var(--item-hover)] cursor-pointer ${
              isLocating ? 'text-sky-500 animate-spin' : ''
            }`}
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>

        {/* Coordinates and Ward Info */}
        <div className="p-3 rounded-xl bg-[var(--item-bg)] border border-[var(--border-color)] flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[var(--text-muted)] block">
              Detected Municipal Ward
            </span>
            <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">
              {currentWard}
            </span>
          </div>
          <div className="text-right text-[11px] text-[var(--text-muted)] font-mono">
            <div>Lat: {pinPosition.lat.toFixed(5)}</div>
            <div>Lng: {pinPosition.lng.toFixed(5)}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-[var(--item-bg)] text-[var(--text)] text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer border border-[var(--border-color)]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const OpenStreetMapLocationPickerModal = GoogleLocationPickerModal;
