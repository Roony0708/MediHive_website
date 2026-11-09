import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const tileProviders = {
  openStreetMap: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
};

type TileProvider = keyof typeof tileProviders;

interface LocationMapProps {
  location: string;
  latitude: number;
  longitude: number;
  zoom?: number;
  tileProvider?: TileProvider;
  className?: string;
  height?: number;
  zoomControls?: boolean;
  attributionControl?: boolean;
  dragging?: boolean;
  scrollWheelZoom?: boolean;
  doubleClickZoom?: boolean;
  touchZoom?: boolean;
  popupText?: string;
}

const markerIcon = L.divIcon({
  className: 'lm-marker',
  html: `
    <span class="lm-marker-pin"></span>
  `,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
});

export function LocationMap({
  location,
  latitude,
  longitude,
  zoom = 10,
  tileProvider = 'openStreetMap',
  className = '',
  height = 320,
  zoomControls = true,
  attributionControl = true,
  dragging = true,
  scrollWheelZoom = false,
  doubleClickZoom = false,
  touchZoom = true,
  popupText,
}: LocationMapProps) {
  const center = useMemo(() => L.latLng(latitude, longitude), [latitude, longitude]);
  const tile = tileProviders[tileProvider];

  return (
    <div className={`lm-wrap ${className}`} style={{ height }}>
      <style>{mapStyles}</style>
      <MapContainer
        center={center}
        zoom={zoom}
        className="lm-container"
        zoomControl={zoomControls}
        attributionControl={attributionControl}
        dragging={dragging}
        scrollWheelZoom={scrollWheelZoom}
        doubleClickZoom={doubleClickZoom}
        touchZoom={touchZoom}
      >
        <TileLayer url={tile.url} attribution={tile.attribution} />
        <Marker position={center} icon={markerIcon}>
          <Popup>
            <strong>{location}</strong>
            {popupText && (
              <>
                <br />
                <span>{popupText}</span>
              </>
            )}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

const mapStyles = `
.lm-wrap {
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-rule);
  box-shadow: var(--shadow-sm);
}
.lm-container {
  width: 100%;
  height: 100%;
  background: var(--color-paper-2);
}
.lm-marker-pin {
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  background: var(--color-accent);
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.leaflet-control-attribution, .leaflet-control-attribution a { background: var(--color-paper); color: var(--color-ink-2); }
.leaflet-control-attribution { padding: 2px 6px; }
.lm-marker-pin::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  transform: translate(-50%, -50%) rotate(45deg);
}
`;
