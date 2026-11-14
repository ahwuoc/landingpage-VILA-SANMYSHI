import styles from "./HeroScene.module.css";

/* Scene geometry, in viewBox units (1600 × 900). */
const DECK_Y = 740;
const WATER_Y = 778;
const WATERLINE_Y = 852;
const PYLON_X = 1080;
const PYLON_TOP = 428;
const PIERS = [120, 400, 680, 1400];
const SUN = { x: 1262, y: 522 };

const palette = {
  red: "#e04818",
  amber: "#f2ad4e",
  lime: "#d8e8a3",
  green: "#3a9a42",
  cream: "#f1ecd9",
  teal: "#3d7f73",
  rust: "#c9703d",
};

/** Seamless wave: repeats every `period` units so it can loop with a translate. */
function wavePath(y: number, amplitude: number, period: number, closed: boolean) {
  const start = -period * 2;
  const repeats = Math.ceil((1600 + period * 4) / period);
  const half = period / 2;
  let d = `M${start} ${y} q${half / 2} ${-amplitude} ${half} 0`;
  for (let i = 1; i < repeats * 2; i += 1) d += ` t${half} 0`;
  return closed ? `${d} V900 H${start} Z` : d;
}

function Wheel({ x, r = 10 }: { x: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${-r})`}>
      <g className={styles.wheel}>
        <circle r={r} fill="#0c2a11" />
        <circle r={r * 0.52} fill="#c8d3bd" />
        <path d={`M${-r * 0.5} 0H${r * 0.5}M0 ${-r * 0.5}V${r * 0.5}`} stroke="#0c2a11" strokeWidth="1.6" />
        <circle r={r * 0.16} fill="#0c2a11" />
      </g>
    </g>
  );
}

/**
 * Container truck, drawn facing right with the road surface at y = 0.
 * Roughly 226 units long and 82 units tall.
 */
export function TruckArt({ color = palette.red, label = "VILA", mirrored = false }: { color?: string; label?: string; mirrored?: boolean }) {
  const ribs = Array.from({ length: 21 }, (_, i) => 9 + i * 7);
  return (
    <g>
      <ellipse cx="112" cy="1.5" rx="118" ry="3" fill="#0a2019" opacity=".28" />
      <g className={styles.truckBody}>
        {/* exhaust */}
        <g className={styles.exhaust} fill="#f7f8f2">
          <circle cx="169" cy="-86" r="4" />
          <circle cx="169" cy="-86" r="5" />
          <circle cx="169" cy="-86" r="3.5" />
        </g>
        <rect x="167.5" y="-84" width="3" height="20" rx="1" fill="#113a17" />

        {/* trailer */}
        <rect x="0" y="-22" width="162" height="6" rx="1" fill="#113a17" />
        <rect x="58" y="-16" width="3" height="12" fill="#113a17" />
        <rect x="2" y="-72" width="156" height="50" rx="2" fill={color} />
        <rect x="2" y="-72" width="156" height="4" rx="2" fill="#000" opacity=".16" />
        <rect x="2" y="-26" width="156" height="4" fill="#000" opacity=".2" />
        <g stroke="#000" strokeWidth="1" opacity=".13">
          {ribs.map((x) => <path key={x} d={`M${x} -67V-27`} />)}
        </g>
        <rect x="2" y="-72" width="5" height="50" rx="1" fill="#000" opacity=".2" />
        <rect x="50" y="-58" width="62" height="22" fill={color} />
        <text x="81" y="-41" textAnchor="middle" transform={mirrored ? "translate(162 0) scale(-1 1)" : undefined} className={styles.containerLabel} fill={color === palette.red ? "#fff8ec" : "#1b5e26"}>{label}</text>

        {/* tractor */}
        <rect x="138" y="-22" width="80" height="7" rx="1.5" fill="#113a17" />
        <path d="M168-22V-62a5 5 0 0 1 5-5h23c3 0 5 1 7 3l11 14c2 3 3 6 3 9v19Z" fill="#236b2b" />
        <path d="M187-61h9c2 0 3 1 4 2l8 11h-21Z" fill="#d3ebdc" />
        <path d="M168-40h49" stroke="#f7f8f2" strokeWidth="1.5" opacity=".35" />
        <rect x="172" y="-60" width="9" height="12" rx="1.5" fill="#174f20" />
        <rect x="210" y="-29" width="12" height="9" rx="2" fill="#113a17" />
        <path className={styles.headBeam} d="M220-33 300-48V-8Z" fill="url(#hs-beam)" />
        <rect x="215" y="-36" width="4" height="6" rx="1.5" fill="#ffe7b0" />
        <rect x="-1" y="-32" width="3" height="7" rx="1" fill="#e2573d" />
      </g>
      <Wheel x={22} />
      <Wheel x={45} />
      <Wheel x={150} />
      <Wheel x={199} />
    </g>
  );
}

const shipStacks: { tiers: (keyof typeof palette)[] }[] = [
  { tiers: ["green", "red"] },
  { tiers: ["cream", "teal", "amber"] },
  { tiers: ["red", "lime", "green"] },
  { tiers: ["teal", "cream", "rust"] },
  { tiers: ["lime", "red"] },
  { tiers: ["rust", "green", "cream"] },
  { tiers: ["amber", "teal", "lime"] },
  { tiers: ["green", "cream"] },
];

/** Container ship, bow to the left, waterline at y = 0. About 540 units long. */
function ShipArt() {
  return (
    <g>
      {/* bow wave + wake */}
      <g className={styles.foam} fill="none" stroke="#f7f8f2" strokeLinecap="round" strokeWidth="2.2">
        <path d="M10 2q-14-10-30-3" />
        <path d="M2 8q-18-6-36 2" opacity=".6" />
        <path d="M540 4h46M556 10h64M600 3h52" opacity=".55" />
      </g>

      {/* superstructure */}
      <rect x="490" y="-98" width="22" height="64" fill="#174f20" />
      <rect x="490" y="-86" width="22" height="9" fill={palette.amber} />
      <g className={styles.smoke} fill="#f7f8f2">
        <circle cx="501" cy="-104" r="6" />
        <circle cx="501" cy="-104" r="8" />
        <circle cx="501" cy="-104" r="5" />
      </g>
      <rect x="430" y="-106" width="52" height="72" rx="2" fill="#f4f1e4" />
      <rect x="424" y="-112" width="64" height="9" rx="2" fill="#f4f1e4" />
      <rect x="424" y="-103" width="64" height="2.5" fill="#174f20" opacity=".25" />
      <g fill="#2a5f52">
        {[-96, -82, -68, -54].map((y) => <rect key={y} x="436" y={y} width="40" height="5" rx="1" opacity={y === -96 ? 0.95 : 0.55} />)}
      </g>
      <path d="M456-112V-132M448-126h16" stroke="#174f20" strokeWidth="2" />
      <circle className={styles.beacon} cx="456" cy="-134" r="2.6" fill="#e2573d" />
      <path d="M34-36V-58M28-52h12" stroke="#174f20" strokeWidth="2" />

      {/* cargo */}
      {shipStacks.map((stack, column) => stack.tiers.map((tone, tier) => {
        const x = 62 + column * 45;
        const y = -36 - (tier + 1) * 18;
        return (
          <g key={`${column}-${tier}`}>
            <rect x={x} y={y} width="43" height="17" rx="1" fill={palette[tone]} />
            <path d={`M${x + 7} ${y + 2}v13m7-13v13m7-13v13m7-13v13m7-13v13`} stroke="#000" strokeWidth="1" opacity=".12" />
            <rect x={x} y={y + 14} width="43" height="3" fill="#000" opacity=".12" />
          </g>
        );
      }))}

      {/* hull */}
      <path d="M-14-38H536l-6 34c-1 8-6 12-14 12H58C40 8 26 0 14-12Z" fill="#113a17" />
      <path d="M-14-38H536l-1 6H-8Z" fill="#f7f8f2" opacity=".2" />
      <path d="M9-16 14-12C26 0 40 8 58 8H516c8 0 13-4 14-12l1-6Z" fill="#b5532f" />
      <path d="M2-17H532" stroke="#f7f8f2" strokeWidth="1.6" opacity=".75" />
      <text x="44" y="-22" className={styles.hullName}>VILA SANMYSHI</text>
      <circle cx="18" cy="-27" r="2.4" fill="#f7f8f2" opacity=".7" />
    </g>
  );
}

function Cloud({ x, y, scale = 1, className }: { x: number; y: number; scale?: number; className: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={className} fill="#fff">
        <rect x="0" y="14" width="210" height="16" rx="8" opacity=".75" />
        <rect x="42" y="0" width="120" height="16" rx="8" opacity=".6" />
        <rect x="96" y="28" width="150" height="14" rx="7" opacity=".5" />
      </g>
    </g>
  );
}

export default function HeroScene() {
  const cableOffsets = [52, 98, 144, 190, 236, 282, 328, 374];
  const glints = [
    [0, 792, 92], [-26, 804, 60], [22, 815, 74], [-8, 827, 108], [30, 840, 52], [-34, 853, 84], [6, 867, 120], [-18, 882, 66],
  ];

  return (
    <svg className={styles.scene} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd98f" stopOpacity=".95" />
          <stop offset=".38" stopColor="#f8c574" stopOpacity=".42" />
          <stop offset="1" stopColor="#f8c574" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe3a6" />
          <stop offset="1" stopColor="#f2a23d" />
        </linearGradient>
        <linearGradient id="hs-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bccfb6" />
          <stop offset="1" stopColor="#e9e6cd" />
        </linearGradient>
        <linearGradient id="hs-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fa387" />
          <stop offset="1" stopColor="#c5d2b3" />
        </linearGradient>
        <linearGradient id="hs-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f6a4c" />
          <stop offset="1" stopColor="#4d8463" />
        </linearGradient>
        <linearGradient id="hs-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a8f5e" />
          <stop offset=".35" stopColor="#256a35" />
          <stop offset="1" stopColor="#1b5e26" />
        </linearGradient>
        <linearGradient id="hs-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe7b0" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffe7b0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b5e26" stopOpacity="0" />
          <stop offset="1" stopColor="#1b5e26" />
        </linearGradient>
      </defs>

      {/* sky */}
      <g className={`${styles.parallaxSlow} ${styles.sunShift}`}>
        <g className={styles.sunRise}>
          <circle className={styles.sunGlow} cx={SUN.x} cy={SUN.y} r="360" fill="url(#hs-glow)" />
          <circle cx={SUN.x} cy={SUN.y} r="112" fill="url(#hs-sun)" />
        </g>
      </g>
      <Cloud x={850} y={330} className={styles.cloudA} />
      <Cloud x={690} y={505} scale={0.7} className={styles.cloudB} />
      <Cloud x={1380} y={452} scale={0.62} className={styles.cloudC} />
      <g className={styles.birds} fill="none" stroke="#236b2b" strokeWidth="2" strokeLinecap="round">
        <path d="M0 0q7-7 13 0 6-7 13 0" />
        <path d="M34 16q6-6 11 0 5-6 11 0" />
        <path d="M-22 22q5-5 9 0 4-5 9 0" />
      </g>

      {/* ridgelines */}
      <g className={styles.parallaxFar}>
        <path className={styles.ridge} fill="url(#hs-far)" d="M-50 690C80 680 240 672 420 660S700 640 820 600 1000 552 1120 548s180 6 280-48 170-30 250-10V900H-50Z" />
      </g>
      <g className={styles.parallaxMid}>
        <path className={`${styles.ridge} ${styles.ridgeMid}`} fill="url(#hs-mid)" d="M-50 722C100 716 300 716 460 708S700 690 800 670s120-34 200-30 140 28 220 8 150-52 250-18 110 14 180-6V900H-50Z" />
      </g>
      <path className={`${styles.ridge} ${styles.ridgeNear}`} fill="url(#hs-near)" d="M-50 742C100 722 200 700 320 716s200 10 320-2 220 17 340 4 260-32 400-8 180 16 270-8V900H-50Z" />

      {/* quay cranes on the far shore */}
      <g className={styles.cranes} transform="translate(1392 762)" fill="none" stroke="#1d5440" strokeWidth="4" strokeLinejoin="round">
        <path d="M0 0V-104M34 0V-104M-6-104H40M0-66H34M0-104 34-66M-70-110H96M17-104V-142M17-142-66-110M17-142 92-110" />
        <path d="M110 0V-86M138 0V-86M104-86H144M110-56H138M62-92H196M124-86V-118M124-118 66-92M124-118 192-92" opacity=".7" />
        <g className={styles.hoist}>
          <path d="M-44-110V-62" strokeWidth="1.5" />
          <rect x="-60" y="-62" width="32" height="14" rx="1" fill={palette.amber} stroke="none" />
        </g>
      </g>

      {/* water */}
      <rect x="-50" y={WATER_Y} width="1700" height={900 - WATER_Y} fill="url(#hs-water)" />
      <g className={`${styles.glints} ${styles.sunShift}`} fill="#ffd591">
        {glints.map(([dx, y, width], i) => (
          <rect key={y} x={SUN.x + dx - width / 2} y={y} width={width} height="3.4" rx="1.7" style={{ animationDelay: `${i * -0.45}s` }} />
        ))}
      </g>
      <path className={styles.waveBack} d={wavePath(WATER_Y + 16, 5, 160, false)} fill="none" stroke="#9cc5ad" strokeWidth="1.6" opacity=".4" />
      <path className={styles.waveMid} d={wavePath(WATER_Y + 40, 6, 220, false)} fill="none" stroke="#9cc5ad" strokeWidth="1.6" opacity=".28" />

      {/* bridge */}
      <g className={styles.bridge}>
        <g fill="#174f20">
          {PIERS.map((x) => <path key={x} d={`M${x - 9} ${DECK_Y + 10}h18l4 ${WATER_Y - DECK_Y + 6}h-26Z`} />)}
          <path d={`M${PYLON_X - 4} ${PYLON_TOP}h8l9 ${WATER_Y + 16 - PYLON_TOP}h-26Z`} />
          <rect x={PYLON_X - 24} y={WATER_Y + 4} width="48" height="16" rx="3" />
          <circle className={styles.beacon} cx={PYLON_X} cy={PYLON_TOP - 7} r="4" fill="#e2573d" />
        </g>
        <g className={styles.cables} stroke="#174f20" strokeWidth="1.5" opacity=".62">
          {cableOffsets.map((offset, i) => {
            const anchor = PYLON_TOP + 16 + (cableOffsets.length - 1 - i) * 14;
            return <path key={offset} pathLength={1} d={`M${PYLON_X} ${anchor}L${PYLON_X - offset} ${DECK_Y}M${PYLON_X} ${anchor}L${PYLON_X + offset} ${DECK_Y}`} />;
          })}
        </g>
        <rect x="-50" y={DECK_Y} width="1700" height="9" fill="#174f20" />
        <rect x="-50" y={DECK_Y + 9} width="1700" height="4" fill="#2c7038" />
        <path d={`M-50 ${DECK_Y - 9}H1650`} stroke="#174f20" strokeWidth="1.6" opacity=".7" />
        <path d={`M-50 ${DECK_Y - 4.5}H1650`} stroke="#174f20" strokeWidth="9" strokeDasharray="1.6 26.4" opacity=".7" />
      </g>

      {/* traffic */}
      <g transform={`translate(0 ${DECK_Y}) scale(.84)`} opacity=".9">
        <g className={styles.truckBack}>
          <g transform="scale(-1 1)"><TruckArt color={palette.lime} label="EWEC" mirrored /></g>
        </g>
      </g>
      <g transform={`translate(0 ${DECK_Y})`}>
        <g className={styles.truckRun}><TruckArt /></g>
      </g>

      {/* ship */}
      <g transform={`translate(0 ${WATERLINE_Y})`}>
        <g className={styles.shipRun}>
          <g className={styles.shipBob}><ShipArt /></g>
        </g>
      </g>

      {/* foreground swell, blending into the forest band below the hero */}
      <path className={styles.waveFront} d={wavePath(WATERLINE_Y + 2, 7, 260, true)} fill="#1a5625" />
      <path className={styles.waveFront2} d={wavePath(WATERLINE_Y + 20, 6, 200, true)} fill="#1b5e26" opacity=".85" />
      <rect x="-50" y="850" width="1700" height="52" fill="url(#hs-fade)" />
    </svg>
  );
}
