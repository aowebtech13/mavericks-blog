'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

/** Sheridan, WY — aligns with site footer / business locale */
const DEFAULT_CENTER: [number, number] = [44.7972, -106.9511];

const OSM_TILES = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function ContactMap() {
  return (
    /* Let Leaflet handle wheel zoom — Lenis otherwise captures vertical wheel on the page */
    <div className="h-full min-h-[300px] w-full lg:min-h-[527px]" data-lenis-prevent-wheel>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={13}
        scrollWheelZoom
        className="z-0 h-full min-h-[300px] w-full rounded-2xl lg:min-h-[527px]"
        id="map"
      >
        <TileLayer attribution={OSM_ATTRIBUTION} url={OSM_TILES} />
      </MapContainer>
    </div>
  );
}
