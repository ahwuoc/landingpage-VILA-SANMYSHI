import styles from './RouteIllustration.module.css';

const copy = {
  vi: {
    label: 'Sơ đồ kết nối',
    description: 'Minh họa tuyến kết nối Bangkok, Mukdahan, Savannakhet, Lao Bảo và Đà Nẵng qua Thái Lan, Lào và Việt Nam.',
    scale: 'Minh họa không theo tỷ lệ',
    thailand: 'THÁI LAN',
    laos: 'LÀO',
    vietnam: 'VIỆT NAM',
    laoBao: 'Lao Bảo',
    daNang: 'Đà Nẵng',
  },
  en: {
    label: 'Connection diagram',
    description: 'Illustrated connection between Bangkok, Mukdahan, Savannakhet, Lao Bao and Da Nang across Thailand, Laos and Vietnam.',
    scale: 'Illustration · not to scale',
    thailand: 'THAILAND',
    laos: 'LAOS',
    vietnam: 'VIETNAM',
    laoBao: 'Lao Bao',
    daNang: 'Da Nang',
  },
  th: {
    label: 'แผนผังการเชื่อมต่อ',
    description: 'ภาพเส้นทางเชื่อมต่อกรุงเทพฯ มุกดาหาร สะหวันนะเขต ลาวบาว และดานัง ผ่านประเทศไทย ลาว และเวียดนาม',
    scale: 'ภาพประกอบไม่ตรงตามมาตราส่วน',
    thailand: 'ประเทศไทย',
    laos: 'ลาว',
    vietnam: 'เวียดนาม',
    laoBao: 'ลาวบาว',
    daNang: 'ดานัง',
  },
};

const contours = [
  'M-80 158C7 40 109 76 167 21S312-21 359 33s63 68 132 29S644 47 746 114',
  'M-80 191C7 73 110 106 174 49S307 12 346 60s69 71 151 33S648 78 746 146',
  'M-80 224C11 104 107 139 183 77S298 44 334 88s74 69 169 33S652 109 746 178',
  'M-80 257C15 135 106 174 191 105S288 76 322 116s81 68 187 34S656 140 746 210',
  'M-80 290C19 166 103 207 199 133S278 107 310 144s87 68 205 36S660 171 746 242',
  'M-80 323C23 197 100 240 207 161S268 139 298 172s93 68 223 37S664 202 746 274',
  'M-80 356C27 228 98 273 215 189S258 171 286 200s100 68 241 39S668 233 746 306',
  'M-80 389C31 259 95 306 223 217S248 203 274 228s106 68 259 40S672 264 746 338',
  'M-80 422C35 290 93 339 231 245S238 235 262 256s112 68 277 42S676 295 746 370',
  'M-80 455C39 321 90 372 239 273S228 267 250 284s119 68 295 43S680 326 746 402',
];

export default function RouteIllustration({ locale }: { locale: string }) {
  const text = copy[locale as keyof typeof copy] ?? copy.vi;

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <span className={styles.captionDot} aria-hidden="true" />
        {text.label}
        <span className={styles.coordinates} aria-hidden="true">TH / LA / VN</span>
      </figcaption>

      <svg
        className={styles.map}
        viewBox="0 0 680 430"
        role="img"
        aria-label={text.description}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{text.label}</title>
        <desc>{text.description} {text.scale}.</desc>

        <g className={styles.contours} fill="none" aria-hidden="true">
          {contours.map((path) => <path key={path} d={path} />)}
        </g>

        <g className={styles.countries} strokeLinejoin="round" aria-hidden="true">
          {/* The land shapes are deliberately schematic, rather than a political map. */}
          <path d="M170 65 193 61 211 80 236 73 253 97 256 118 278 133 278 161 296 181 283 204 281 228 301 247 294 271 269 281 260 305 236 301 222 283 203 283 194 307 195 336 216 358 209 377 196 365 180 343 174 318 161 297 160 270 146 252 151 229 141 211 151 183 140 162 149 136 139 116 155 98Z" />
          <path d="M252 58 269 48 286 66 304 65 316 85 339 88 348 109 367 126 370 147 389 163 391 183 414 203 403 223 414 246 398 263 381 249 360 248 347 230 330 230 321 208 306 199 296 181 278 161 278 133 256 118 253 97 267 84Z" />
          <path d="M314 57 331 42 350 50 368 42 386 57 410 58 425 74 413 91 394 103 380 123 387 144 405 161 415 181 435 197 446 220 465 232 481 248 487 270 502 289 507 314 498 339 485 358 465 372 441 388 421 383 418 368 442 352 455 334 460 312 455 293 445 278 424 266 414 246 403 223 414 203 391 183 389 163 370 147 367 126 348 109 339 88 316 85 325 72Z" />
        </g>

        <g className={styles.countryNames} textAnchor="middle" aria-hidden="true">
          <text x="196" y="150">{text.thailand}</text>
          <text x="320" y="130">{text.laos}</text>
          <text x="541" y="332">{text.vietnam}</text>
        </g>

        <path
          className={styles.routeHalo}
          d="M194 288C212 255 240 228 282 217S320 215 336 217 394 201 419 213 459 227 478 247"
          fill="none"
          aria-hidden="true"
        />
        <path
          className={styles.route}
          d="M194 288C212 255 240 228 282 217S320 215 336 217 394 201 419 213 459 227 478 247"
          fill="none"
          aria-hidden="true"
        />

        <g className={styles.leaders} fill="none" aria-hidden="true">
          <path d="M194 288 175 314 127 314" />
          <path d="M282 217 266 184 236 184" />
          <path d="M336 217 346 273 367 283" />
          <path d="M419 213 437 178 479 178" />
          <path d="M478 247 505 265 556 265" />
        </g>

        <g className={styles.nodes} aria-hidden="true">
          {[[194, 288], [282, 217], [336, 217], [419, 213], [478, 247]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle className={styles.nodeRing} cx={x} cy={y} r="12" />
              <circle className={styles.node} cx={x} cy={y} r="5" />
            </g>
          ))}
        </g>

        <g className={styles.cityNames} aria-hidden="true">
          <text x="122" y="339" textAnchor="middle">{locale === 'th' ? 'กรุงเทพฯ' : 'Bangkok'}</text>
          <text x="238" y="174" textAnchor="middle">{locale === 'th' ? 'มุกดาหาร' : 'Mukdahan'}</text>
          <text x="367" y="309" textAnchor="middle">{locale === 'th' ? 'สะหวันนะเขต' : 'Savannakhet'}</text>
          <text x="483" y="167" textAnchor="middle">{text.laoBao}</text>
          <text x="557" y="291" textAnchor="middle">{text.daNang}</text>
        </g>

        <g className={styles.compass} transform="translate(593 65)" aria-hidden="true">
          <circle r="28" fill="none" />
          <path d="M0-15 5 9 0 6-5 9Z" />
          <path d="M-35 0H-23M23 0H35M0 23V35" fill="none" />
          <text x="0" y="-38" textAnchor="middle">N</text>
        </g>

        <g className={styles.cornerMarks} fill="none" aria-hidden="true">
          <path d="M20 40V20H40M640 20H660V40M20 390V410H40M640 410H660V390" />
        </g>
      </svg>

      <div className={styles.footnote} aria-hidden="true">
        <span className={styles.routeKey}><i /> {text.label}</span>
        <span>{text.scale}</span>
      </div>
    </figure>
  );
}
