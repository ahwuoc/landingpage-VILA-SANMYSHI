"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ArrowUpRight, MapPin, Navigation, Globe2 } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";
import { GRATICULE, KM_PER_UNIT, LABEL_ANCHORS, LANDS, MAP_SIZE, MEKONG, POINTS } from "./indochinaGeo";
import styles from "./VietnamMap.module.css";

const geoCopy = {
  vi: { vn: "VIỆT NAM", la: "LÀO", th: "THÁI LAN", kh: "CAMPUCHIA", mm: "MYANMAR", cn: "TRUNG QUỐC", sea: "Biển Đông", gulf: "Vịnh Thái Lan", hoangSa: "Q.Đ. Hoàng Sa", truongSa: "Q.Đ. Trường Sa", owner: "(Việt Nam)", province: "QUẢNG TRỊ", laoBao: "Lao Bảo", bangkok: "Bangkok", mukdahan: "Mukdahan · Savannakhet", daNang: "Đà Nẵng", hanoi: "Hà Nội", hcmc: "TP. Hồ Chí Minh", vientiane: "Viêng Chăn", route: "Tuyến kết nối minh họa", office: "Khu vực văn phòng", mekong: "Sông Mekong" },
  en: { vn: "VIETNAM", la: "LAOS", th: "THAILAND", kh: "CAMBODIA", mm: "MYANMAR", cn: "CHINA", sea: "East Sea", gulf: "Gulf of Thailand", hoangSa: "Hoang Sa Islands", truongSa: "Truong Sa Islands", owner: "(Vietnam)", province: "QUANG TRI", laoBao: "Lao Bao", bangkok: "Bangkok", mukdahan: "Mukdahan · Savannakhet", daNang: "Da Nang", hanoi: "Hanoi", hcmc: "Ho Chi Minh City", vientiane: "Vientiane", route: "Illustrative connection", office: "Office area", mekong: "Mekong River" },
  th: { vn: "เวียดนาม", la: "ลาว", th: "ไทย", kh: "กัมพูชา", mm: "เมียนมา", cn: "จีน", sea: "ทะเลตะวันออก", gulf: "อ่าวไทย", hoangSa: "หมู่เกาะหว่างซา", truongSa: "หมู่เกาะเจื่องซา", owner: "(เวียดนาม)", province: "กวางจิ", laoBao: "ลาวบาว", bangkok: "กรุงเทพฯ", mukdahan: "มุกดาหาร · สะหวันนะเขต", daNang: "ดานัง", hanoi: "ฮานอย", hcmc: "โฮจิมินห์", vientiane: "เวียงจันทน์", route: "เส้นทางเชื่อมต่อ (ภาพประกอบ)", office: "พื้นที่สำนักงาน", mekong: "แม่น้ำโขง" },
};

const [bx, by] = POINTS.bangkok;
const [mx, my] = POINTS.mukdahan;
const [lx, ly] = POINTS.laoBao;
const [ex, ey] = POINTS.dongHa;
const [dx, dy] = POINTS.daNang;
/* Schematic link between real city positions — it does not trace actual roads. */
const ROUTE = `M${bx} ${by}Q${bx + 62} ${my + 44} ${mx} ${my}T${lx} ${ly}L${ex} ${ey}Q${ex + 26} ${ey + 4} ${dx} ${dy}`;
const SCALE_KM = 300;
const scaleUnits = SCALE_KM / KM_PER_UNIT;
const islets = { hoangSa: [[0, 0], [-9, 5], [7, -6], [12, 6], [-4, -8]], truongSa: [[0, 0], [-12, -8], [9, 7], [15, -10], [-6, 11], [22, 3]] };

function RegionMap({ label, locale }: { label: string; locale: string }) {
  const geo = geoCopy[locale as keyof typeof geoCopy] || geoCopy.vi;
  const at = (key: string) => ({ x: LABEL_ANCHORS[key][0], y: LABEL_ANCHORS[key][1] });
  const cities: { key: "bangkok" | "mukdahan" | "daNang" | "hanoi" | "hcmc" | "vientiane"; dx: number; dy: number; anchor: "start" | "middle" | "end"; major?: boolean }[] = [
    { key: "hanoi", dx: 9, dy: 4, anchor: "start" },
    { key: "hcmc", dx: 9, dy: 4, anchor: "start" },
    { key: "vientiane", dx: -9, dy: 4, anchor: "end" },
    { key: "bangkok", dx: -10, dy: 4, anchor: "end", major: true },
    { key: "mukdahan", dx: 0, dy: 20, anchor: "middle", major: true },
    { key: "daNang", dx: 10, dy: 5, anchor: "start", major: true },
  ];

  return (
    <svg className={styles.geo} viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vm-sea" cx="62%" cy="48%" r="75%">
          <stop offset="0" stopColor="#e3efe9" />
          <stop offset="1" stopColor="#f0f4ea" />
        </radialGradient>
        <filter id="vm-lift" x="-20%" y="-10%" width="140%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1b5e26" floodOpacity=".28" />
        </filter>
      </defs>
      <rect width={MAP_SIZE.width} height={MAP_SIZE.height} fill="url(#vm-sea)" />
      <path className={styles.graticule} d={GRATICULE} />

      <g className={styles.lands}>
        {LANDS.filter((land) => land.kind !== "vn").map((land) => <path key={land.code} className={styles[land.kind]} d={land.d} />)}
      </g>
      <path className={styles.river} d={MEKONG} />
      <g filter="url(#vm-lift)">
        {LANDS.filter((land) => land.kind === "vn").map((land) => <path key={land.code} className={styles.vn} d={land.d} />)}
      </g>

      {(["hoangSa", "truongSa"] as const).map((key) => (
        <g key={key} transform={`translate(${POINTS[key][0]} ${POINTS[key][1]})`}>
          <circle className={styles.isletRing} r="27" />
          {islets[key].map(([ix, iy]) => <circle key={`${ix}-${iy}`} className={styles.islet} cx={ix} cy={iy} r="2.3" />)}
          <text className={styles.isletLabel} y="43" textAnchor="middle">{geo[key]}</text>
          <text className={styles.isletOwner} y="56" textAnchor="middle">{geo.owner}</text>
        </g>
      ))}

      <g className={styles.countryLabels} textAnchor="middle">
        <text {...at("th")}>{geo.th}</text>
        <text {...at("la")} transform={`rotate(-38 ${LABEL_ANCHORS.la[0]} ${LABEL_ANCHORS.la[1]})`}>{geo.la}</text>
        <text {...at("kh")} className={styles.minorLabel}>{geo.kh}</text>
        <text {...at("mm")} className={styles.minorLabel}>{geo.mm}</text>
        <text {...at("cn")} className={styles.minorLabel}>{geo.cn}</text>
        <text {...at("vn")} className={styles.vnLabel} transform={`rotate(-68 ${LABEL_ANCHORS.vn[0]} ${LABEL_ANCHORS.vn[1]})`}>{geo.vn}</text>
        <text {...at("sea")} className={styles.seaLabel}>{geo.sea}</text>
        <text {...at("gulf")} className={`${styles.seaLabel} ${styles.seaLabelSmall}`}>{geo.gulf}</text>
      </g>

      <path className={styles.routeHalo} d={ROUTE} />
      <path id="vm-route" className={styles.route} d={ROUTE} />
      <g className={styles.mover}>
        <rect x="-8" y="-5" width="16" height="10" rx="2" />
        <animateMotion dur="12s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1;0;0" keyTimes="0;0.45;0.5;0.95;1" calcMode="linear"><mpath href="#vm-route" /></animateMotion>
      </g>

      {cities.map((city) => (
        <g key={city.key} transform={`translate(${POINTS[city.key][0]} ${POINTS[city.key][1]})`}>
          <circle className={city.major ? styles.stop : styles.city} r={city.major ? 4.6 : 3} />
          <text className={city.major ? styles.stopLabel : styles.cityLabel} x={city.dx} y={city.dy} textAnchor={city.anchor}>{geo[city.key]}</text>
        </g>
      ))}
      <circle className={styles.stop} cx={ex} cy={ey} r="3.2" />

      <g transform={`translate(${lx} ${ly})`}>
        <circle className={styles.pulse} r="9" />
        <circle className={`${styles.pulse} ${styles.pulseLate}`} r="9" />
        <path className={styles.leader} d="M6 -7 64 -62H150" />
        <circle className={styles.pin} r="7.5" />
        <circle className={styles.pinCore} r="2.6" />
        <text className={styles.pinLabel} x="70" y="-70">{geo.laoBao}</text>
        <text className={styles.pinNote} x="70" y="-46">{geo.province} · {geo.office.toUpperCase()}</text>
      </g>

      <g className={styles.furniture} transform={`translate(262 ${MAP_SIZE.height - 30})`}>
        <path d={`M0 0V6H${scaleUnits}V0M${scaleUnits / 2} 2V6`} />
        <text y="-6">0</text>
        <text x={scaleUnits} y="-6" textAnchor="end">{SCALE_KM} km</text>
      </g>
      <g className={styles.furniture} transform={`translate(660 ${MAP_SIZE.height - 34})`}>
        <path className={styles.legendRoute} d="M0 3H34" />
        <text x="44" y="7">{geo.route}</text>
      </g>
    </svg>
  );
}

const copy = {
  vi: { region: "Khu vực Lao Bảo", office: "Địa chỉ văn phòng", title: "Lao Bảo, Quảng Trị", note: "Điểm đánh dấu thể hiện khu vực Lao Bảo. Mở Google Maps để xem đường đi chi tiết.", addressNote: "Liên hệ trước khi đến văn phòng để được hướng dẫn đường đi.", open: "Mở Google Maps", label: "Chế độ bản đồ", map: "Bản đồ khu vực Việt Nam, Lào, Thái Lan với vị trí Lao Bảo, Quảng Trị", directions: "Tìm đường đến văn phòng" },
  en: { region: "Lao Bao area", office: "Office address", title: "Lao Bao, Quang Tri", note: "The marker shows the Lao Bao area. Open Google Maps for detailed directions.", addressNote: "Please contact us before visiting for directions to our office.", open: "Open Google Maps", label: "Map view", map: "Regional map of Vietnam, Laos and Thailand showing Lao Bao, Quang Tri", directions: "Get office directions" },
  th: { region: "พื้นที่ลาวบาว", office: "ที่อยู่สำนักงาน", title: "ลาวบาว กวางจิ", note: "หมุดแสดงพื้นที่ลาวบาว เปิด Google Maps เพื่อดูเส้นทางโดยละเอียด", addressNote: "กรุณาติดต่อก่อนเดินทางเพื่อรับคำแนะนำเส้นทางไปสำนักงาน", open: "เปิด Google Maps", label: "มุมมองแผนที่", map: "แผนที่ภูมิภาคเวียดนาม ลาว และไทย แสดงตำแหน่งลาวบาว กวางจิ", directions: "เส้นทางไปสำนักงาน" },
};

export function VietnamMap({ address = COMPANY_INFO.address, officeView = false }: { address?: string; officeView?: boolean }) {
  const locale = useLocale();
  const text = copy[locale as keyof typeof copy] || copy.vi;
  const [view, setView] = useState<"region" | "office">(officeView ? "office" : "region");
  const query = view === "office" ? address : "Lao Bảo, Quảng Trị, Việt Nam";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.heading}><Globe2 size={17} /><span>{text.title}</span></div>
        <div className={styles.controls} role="group" aria-label={text.label}>
          <button type="button" aria-pressed={view === "region"} onClick={() => setView("region")}><Globe2 size={13} />{text.region}</button>
          <button type="button" aria-pressed={view === "office"} onClick={() => setView("office")}><MapPin size={13} />{text.office}</button>
        </div>
      </div>
      <div className={styles.canvas}>
        <RegionMap label={text.map} locale={locale} />
        {view === "office" && <div className={styles.addressCard}>
          <span><MapPin size={14} />{text.office}</span>
          <p>{address}</p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{text.directions}<ArrowUpRight size={14} /></a>
        </div>}
      </div>
      <div className={styles.caption}>
        <p><Navigation size={14} />{view === "office" ? text.addressNote : text.note}</p>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{text.open}<ArrowUpRight size={15} /></a>
      </div>
    </div>
  );
}
