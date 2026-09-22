"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ArrowUpRight, MapPin, Navigation, Globe2 } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";
import styles from "./VietnamMap.module.css";

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
        <Image src="/maps/indochina.svg" alt={text.map} fill className={styles.geography} sizes="(max-width: 760px) 100vw, 65vw" />
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
