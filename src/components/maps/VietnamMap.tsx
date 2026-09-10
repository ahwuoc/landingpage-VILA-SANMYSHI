"use client";

import React from "react";
import Image from "next/image";

import { VIETNAM_COORDINATES } from "@/constants/vietnamCoordinates";

interface Marker {
  id: string;
  name: string;
  locationId: string;
  type: string;
}

interface VietnamMapProps {
  activeId?: string | null;
  onMarkerClick?: (id: string) => void;
}

const markers: Marker[] = [
  { id: "hq", name: "Quảng Trị", locationId: "VN25", type: "hq_label" },
];

const islands = [
  { id: "hoangsa", name: "Hoàng Sa", ...VIETNAM_COORDINATES.HOANGSA },
  { id: "truongsa", name: "Trường Sa", ...VIETNAM_COORDINATES.TRUONGSA },
];

export function VietnamMap({ activeId, onMarkerClick }: VietnamMapProps) {
  const getCoords = (marker: Marker) => {
    const coords = VIETNAM_COORDINATES[marker.locationId] || { cx: 0, cy: 0 };
    return coords;
  };

  return (
    <div className="group relative mx-auto aspect-[1/1.2] w-full max-w-[600px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* Map Background */}
      <div className="absolute inset-0 p-8">
        <div className="relative w-full h-full">
          <Image
            src="/maps/vietnam.svg"
            alt="Vietnam Map"
            fill
            preload
            className="object-fill opacity-40 transition-all duration-700 filter grayscale brightness-150 contrast-125"
          />

          {/* Decorative Connection Lines & Labels */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            {markers.map((marker, i) => {
              const { cx, cy } = getCoords(marker);
              const isActive = activeId === marker.id;
              const lineEndX = cx > 500 ? cx + (isActive ? 120 : 100) : cx - (isActive ? 120 : 100);
              const textAnchor = cx > 500 ? "start" : "end";

              return (
                <g
                  key={i}
                  className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
                >
                  <line
                    x1={cx} y1={cy} x2={lineEndX} y2={cy}
                    stroke={isActive ? "var(--color-primary-fixed)" : "white"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeDasharray={isActive ? "0" : "4 2"}
                    className="transition-all duration-500"
                  />
                  <circle cx={lineEndX} cy={cy} r={isActive ? 4 : 2} fill={isActive ? "var(--color-primary-fixed)" : "white"} />
                  <text
                    x={lineEndX + (cx > 500 ? 15 : -15)}
                    y={cy + 5}
                    fill={isActive ? "var(--color-primary-fixed)" : "white"}
                    fontSize={isActive ? "24" : "18"}
                    fontWeight="900"
                    textAnchor={textAnchor}
                    className="uppercase tracking-widest transition-all duration-500"
                  >
                    {marker.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Islands (Crucial for VN Map) */}
          {islands.map((island) => (
            <div
              key={island.id}
              className="absolute pointer-events-none"
              style={{
                left: `${(island.cx / 1000) * 100}%`,
                top: `${(island.cy / 1000) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-wrap w-8 h-8 items-center justify-center opacity-60">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="m-0.5 h-1.5 w-1.5 rounded-full bg-primary/40" />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] drop-shadow-md">{island.name}</span>
              </div>
            </div>
          ))}

          {/* Branch Markers */}
          {markers.map((marker) => {
            const { cx, cy } = getCoords(marker);
            const isActive = activeId === marker.id;
            return (
              <div
                key={marker.id}
                onClick={() => onMarkerClick?.(marker.id)}
                className={`absolute group/marker cursor-pointer transition-all duration-500 ${isActive ? 'z-30' : 'z-10'}`}
                style={{
                  left: `${(cx / 1000) * 100}%`,
                  top: `${(cy / 1000) * 100}%`,
                  transform: `translate(-50%, -50%) ${isActive ? 'scale(1.5)' : 'scale(1)'}`,
                }}
              >
                {/* Pin */}
                <div className={`relative h-3.5 w-3.5 rounded-full border-2 border-brand-950 bg-primary transition-all duration-300 ${isActive ? 'scale-125 ring-4 ring-primary/20' : ''}`} />

              </div>
            );
          })}
        </div>
      </div>

      {/* Territory label */}
      <div className="absolute bottom-8 left-8 origin-bottom-left -rotate-90 translate-x-3 translate-y-[-10px]">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] whitespace-nowrap">Vietnam Territory</p>
      </div>

    </div>
  );
}
