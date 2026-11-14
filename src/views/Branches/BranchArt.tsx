import styles from "./BranchArt.module.css";

const ROUTE = "M44 306C120 332 206 252 310 262S474 300 590 226";
const PIN = { x: 390, y: 268 };

/**
 * Abstract map for the Branches hero: three overlapping territories on one corridor,
 * with the office pinned where Laos and Vietnam meet. Canvas is 620 × 440.
 */
export default function BranchArt({ countries, place }: { countries: string[]; place: string }) {
  return (
    <svg className={styles.art} viewBox="0 0 620 440" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="ba-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="#287830" opacity=".45" />
        </pattern>
      </defs>

      <rect className={styles.pop} x="8" y="26" width="98" height="70" fill="url(#ba-dots)" />
      <g className={styles.orbit}>
        <circle cx="310" cy="226" r="212" fill="none" stroke="#1b5e26" strokeWidth="1.1" strokeDasharray="2 8" opacity=".5" />
        <circle cx="310" cy="14" r="8" fill="#1b5e26" />
        <circle cx="522" cy="226" r="5" fill="#287830" />
        <circle cx="160" cy="376" r="6" fill="#e04818" stroke="#1b5e26" strokeWidth="1.4" />
      </g>

      {/* territories */}
      <g className={styles.lands}>
        <circle className={styles.land} cx="150" cy="244" r="122" fill="#1b5e26" />
        <circle className={styles.land} cx="310" cy="208" r="122" fill="#d8e8a3" />
        <circle className={styles.land} cx="470" cy="244" r="122" fill="#e04818" />
      </g>
      <g className={styles.labels} textAnchor="middle">
        <text x="100" y="212" fill="#d8e8a3">TH</text>
        <text x="310" y="150" fill="#1b5e26">LA</text>
        <text x="524" y="212" fill="#fff8ec">VN</text>
      </g>
      <g className={styles.names} textAnchor="middle">
        <text x="100" y="232" fill="#b9cdb9">{countries[0]}</text>
        <text x="310" y="170" fill="#3c6650">{countries[1]}</text>
        <text x="524" y="232" fill="#ffe1d2">{countries[2]}</text>
      </g>

      {/* corridor */}
      <path d={ROUTE} fill="none" stroke="#f7f8f2" strokeWidth="9" strokeLinecap="round" opacity=".22" />
      <path id="ba-route" className={styles.route} d={ROUTE} fill="none" stroke="#f7f8f2" strokeWidth="2.4" strokeDasharray="6 6" strokeLinecap="round" />
      <g className={styles.mover}>
        <rect x="-11" y="-6.5" width="22" height="13" rx="2.5" fill="#f7f8f2" stroke="#1b5e26" strokeWidth="1.5" />
        <rect x="-6" y="-2.5" width="12" height="5" rx="1" fill="#287830" />
        <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear">
          <mpath href="#ba-route" />
        </animateMotion>
      </g>

      {/* office pin */}
      <g transform={`translate(${PIN.x} ${PIN.y})`}>
        <circle className={styles.pulse} r="16" fill="none" stroke="#1b5e26" strokeWidth="1.6" />
        <circle className={`${styles.pulse} ${styles.pulseLate}`} r="16" fill="none" stroke="#1b5e26" strokeWidth="1.6" />
        <circle r="12" fill="#1b5e26" stroke="#f7f8f2" strokeWidth="3" />
        <circle r="3.6" fill="#d8e8a3" />
        <g className={styles.flag}>
          <path d="M0-14V-44" stroke="#1b5e26" strokeWidth="1.6" />
          <rect x="-84" y="-76" width="168" height="32" rx="16" fill="#f7f8f2" stroke="#1b5e26" strokeWidth="1.4" />
          <text y="-55" textAnchor="middle" className={styles.place}>{place}</text>
        </g>
      </g>

      <g className={styles.marks} stroke="#1b5e26" strokeWidth="1.6" strokeLinecap="round">
        <path d="M566 74v16m-8-8h16" />
        <path d="M40 398v12m-6-6h12" opacity=".6" />
      </g>
    </svg>
  );
}
