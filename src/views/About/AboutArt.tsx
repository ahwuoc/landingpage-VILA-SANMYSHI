import styles from "./AboutArt.module.css";

const SUN = { x: 438, y: 172 };

const stack = [
  { x: 330, y: 494, tone: "#e04818" },
  { x: 456, y: 494, tone: "#3d7f73" },
  { x: 330, y: 444, tone: "#d8e8a3" },
  { x: 456, y: 444, tone: "#f2ad4e" },
  { x: 456, y: 394, tone: "#3a9a42" },
];

function Block({ x, y, tone }: { x: number; y: number; tone: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="122" height="46" rx="3" fill={tone} />
      <path d="M14 6v34m12-34v34m12-34v34m12-34v34m12-34v34m12-34v34m12-34v34m12-34v34m12-34v34" stroke="#000" strokeWidth="1.2" opacity=".12" />
      <rect y="38" width="122" height="8" rx="3" fill="#000" opacity=".12" />
    </g>
  );
}

/**
 * Abstract composition for the About hero: sun, orbits, a cargo stack and a route,
 * drawn on a 620 × 540 canvas that the arch photo is positioned against.
 */
export default function AboutArt() {
  return (
    <svg className={styles.art} viewBox="0 0 620 540" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="aa-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe0a0" />
          <stop offset="1" stopColor="#f2a23d" />
        </linearGradient>
        <radialGradient id="aa-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f8c574" stopOpacity=".5" />
          <stop offset="1" stopColor="#f8c574" stopOpacity="0" />
        </radialGradient>
        <pattern id="aa-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="#287830" opacity=".45" />
        </pattern>
      </defs>

      {/* ground shapes */}
      <circle className={styles.pop} cx="556" cy="398" r="60" fill="#d8e8a3" />
      <rect className={styles.pop} x="524" y="286" width="84" height="70" fill="url(#aa-dots)" />

      {/* sun and orbits */}
      <circle className={styles.glow} cx={SUN.x} cy={SUN.y} r="210" fill="url(#aa-glow)" />
      <circle className={styles.pop} cx={SUN.x} cy={SUN.y} r="104" fill="url(#aa-sun)" />
      <g className={styles.orbitA}>
        <circle cx={SUN.x} cy={SUN.y} r="148" fill="none" stroke="#1b5e26" strokeWidth="1.2" strokeDasharray="2 7" opacity=".55" />
        <circle cx={SUN.x + 148} cy={SUN.y} r="9" fill="#1b5e26" />
        <circle cx={SUN.x - 148} cy={SUN.y} r="4.5" fill="#287830" />
      </g>
      <g className={styles.orbitB}>
        <circle cx={SUN.x} cy={SUN.y} r="194" fill="none" stroke="#1b5e26" strokeWidth="1" opacity=".22" />
        <circle cx={SUN.x} cy={SUN.y - 194} r="7" fill="#d8e8a3" stroke="#1b5e26" strokeWidth="1.5" />
        <circle cx={SUN.x + 137} cy={SUN.y + 137} r="11" fill="#e04818" stroke="#1b5e26" strokeWidth="1.5" />
      </g>

      {/* sea */}
      <g className={styles.sea} fill="none" stroke="#287830" strokeWidth="2" strokeLinecap="round">
        <path d="M0 44q14-10 28 0t28 0 28 0 28 0 28 0 28 0" />
        <path d="M22 62q14-10 28 0t28 0 28 0 28 0 28 0" opacity=".6" />
        <path d="M0 80q14-10 28 0t28 0 28 0 28 0" opacity=".35" />
      </g>

      {/* route from the gate to the yard */}
      <path id="aa-route" className={styles.route} d="M172 100C196 26 300 8 352 74s20 190 40 262" fill="none" stroke="#1b5e26" strokeWidth="1.8" strokeDasharray="5 7" strokeLinecap="round" />
      <g className={styles.mover}>
        <rect x="-10" y="-6" width="20" height="12" rx="2.5" fill="#1b5e26" />
        <rect x="-6" y="-2.5" width="12" height="5" rx="1" fill="#d8e8a3" />
        <animateMotion dur="9s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;0.86;1" calcMode="linear">
          <mpath href="#aa-route" />
        </animateMotion>
      </g>
      <circle cx="172" cy="100" r="6" fill="#f7f8f2" stroke="#1b5e26" strokeWidth="2" />

      {/* cargo stack */}
      <g className={styles.stack}>
        {stack.map((block) => <g key={`${block.x}-${block.y}`} className={styles.rise}><Block {...block} /></g>)}
      </g>
      <g className={styles.hoist}>
        <path d="M391 322V348" stroke="#1b5e26" strokeWidth="1.6" />
        <circle cx="391" cy="317" r="5" fill="#f7f8f2" stroke="#1b5e26" strokeWidth="1.6" />
        <path d="M391 348l-34 14m34-14 34 14" stroke="#1b5e26" strokeWidth="1.6" fill="none" />
        <Block x={330} y={362} tone="#f1ecd9" />
      </g>

      {/* marks */}
      <g className={styles.marks} stroke="#1b5e26" strokeWidth="1.6" strokeLinecap="round">
        <path d="M302 64v16m-8-8h16" />
        <path d="M596 236v12m-6-6h12" opacity=".6" />
      </g>
      <circle className={styles.pop} cx="306" cy="136" r="9" fill="#287830" />
    </svg>
  );
}
