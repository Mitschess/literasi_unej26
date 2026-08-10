"use client";

import React, { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const GEO_URL = "/geo/indonesia-provinces.geojson";

interface ProvinceFeatureProperties {
  PROVINSI: string;
  KODE_PROV?: string;
}

interface IndonesiaMapProps {
  selectedProvince?: string | null;
  provinceCounts: Record<string, number>;
  onProvinceSelect: (province: string | null) => void;
  className?: string;
}

function getProvinceFill(
  province: string,
  count: number,
  maxCount: number,
  selectedProvince?: string | null,
  hoveredProvince?: string | null,
): string {
  if (selectedProvince === province) return "#2A9D8F";
  if (hoveredProvince === province) return "#3DB8A8";

  if (count <= 0) return "#E8EDF3";

  if (maxCount <= 0) return "#D0D8E4";

  const intensity = Math.min(count / maxCount, 1);
  const mix = 0.35 + intensity * 0.55;
  const r = Math.round(168 + (42 - 168) * mix);
  const g = Math.round(181 + (157 - 181) * mix);
  const b = Math.round(200 + (143 - 200) * mix);
  return `rgb(${r}, ${g}, ${b})`;
}

export const IndonesiaMap: React.FC<IndonesiaMapProps> = ({
  selectedProvince = null,
  provinceCounts,
  onProvinceSelect,
  className = "",
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const maxCount = useMemo(
    () => Math.max(0, ...Object.values(provinceCounts)),
    [provinceCounts],
  );

  const activeProvince = hoveredProvince ?? selectedProvince;
  const activeCount = activeProvince ? (provinceCounts[activeProvince] ?? 0) : 0;

  return (
    <div className={`relative ${className}`.trim()}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [118, -1.5],
          scale: 850,
        }}
        width={800}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const props = geo.properties as unknown as ProvinceFeatureProperties;
              const province = props.PROVINSI;
              const count = provinceCounts[province] ?? 0;
              const fill = getProvinceFill(
                province,
                count,
                maxCount,
                selectedProvince,
                hoveredProvince,
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#FFFFFF"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => setHoveredProvince(province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  onClick={() => {
                    onProvinceSelect(
                      selectedProvince === province ? null : province,
                    );
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-56 rounded-xl border border-line bg-white/95 backdrop-blur-sm px-3 py-2.5 shadow-soft pointer-events-none">
        {activeProvince ? (
          <>
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-muted">
              Provinsi
            </p>
            <p className="text-sm font-bold text-ink leading-tight">
              {activeProvince}
            </p>
            <p className="text-xs text-ink-soft mt-0.5">
              {activeCount > 0
                ? `${activeCount} kandidat tersedia`
                : "Belum ada data kandidat"}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-bold text-ink">Peta Indonesia</p>
            <p className="text-xs text-ink-soft mt-0.5">
              Klik provinsi untuk melihat kandidat di wilayah tersebut
            </p>
          </>
        )}
      </div>

      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line px-2 py-1 text-[10px] font-semibold text-ink-soft">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#E8EDF3] border border-line" />
          Belum ada data
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 border border-line px-2 py-1 text-[10px] font-semibold text-ink-soft">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#2A9D8F]" />
          Ada kandidat
        </span>
      </div>
    </div>
  );
};

export default IndonesiaMap;
