"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen, Compass, FileCheck2, Search } from "lucide-react";
import { logisticsResources, resourceCategories, type LogisticsResource, type ResourceLocale } from "./resources";
import styles from "./KnowledgeHub.module.css";

const copy = {
  vi: { eyebrow: "THƯ VIỆN LOGISTICS", title: "Hiểu đúng.", accent: "Đi xa hơn.", description: "Kiến thức cần thiết để chủ động trong giao thương. Tổng hợp từ ADB, ICC và Cổng Thông tin Thương mại Việt Nam.", all: "Tất cả", search: "Tìm chủ đề, mã HS, Incoterms…", count: "tài liệu tham khảo", source: "Đọc nguồn chính thức", empty: "Chưa có chủ đề phù hợp. Thử từ khóa khác hoặc xem tất cả.", reset: "Xem tất cả tài liệu", credit: "Ảnh minh họa logistics" },
  en: { eyebrow: "LOGISTICS LIBRARY", title: "Know more.", accent: "Go further.", description: "Practical knowledge for confident trade. Curated from ADB, ICC and the Vietnam Trade Information Portal.", all: "All resources", search: "Search topics, HS codes, Incoterms…", count: "reference resources", source: "Read the official source", empty: "No matching topics. Try another keyword or view all resources.", reset: "View all resources", credit: "Illustrative logistics photography" },
  th: { eyebrow: "คลังความรู้โลจิสติกส์", title: "เข้าใจมากขึ้น", accent: "ไปได้ไกลกว่า", description: "ความรู้เพื่อการค้าอย่างมั่นใจ รวบรวมจาก ADB, ICC และพอร์ทัลข้อมูลการค้าเวียดนาม", all: "ทั้งหมด", search: "ค้นหาหัวข้อ รหัส HS หรือ Incoterms…", count: "แหล่งข้อมูลอ้างอิง", source: "อ่านจากแหล่งทางการ", empty: "ไม่พบหัวข้อที่ตรงกัน ลองคำค้นอื่นหรือดูข้อมูลทั้งหมด", reset: "ดูข้อมูลทั้งหมด", credit: "ภาพประกอบด้านโลจิสติกส์" },
};
const icons = { corridor: Compass, customs: FileCheck2, trade: BookOpen };
const normalize = (value: string) => value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

export default function KnowledgeHub({ locale }: { locale: string }) {
  const lang: ResourceLocale = locale === "en" || locale === "th" ? locale : "vi";
  const t = copy[lang];
  const [category, setCategory] = useState<LogisticsResource["category"] | "all">("all");
  const [query, setQuery] = useState("");
  const filtered = logisticsResources.filter((resource) => (category === "all" || resource.category === category) && normalize(`${resource.title[lang]} ${resource.description[lang]} ${resource.source}`).includes(normalize(query.trim())));

  return (
    <section id="knowledge" className={styles.section} aria-labelledby="knowledge-heading">
      <div className={styles.container}>
        <div className={styles.heading}><div><p className={styles.eyebrow}>{t.eyebrow}</p><h2 id="knowledge-heading">{t.title} <em>{t.accent}</em></h2></div><p>{t.description}</p></div>
        <div className={styles.controls}>
          <div className={styles.filters} role="group" aria-label={t.eyebrow}>
            <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>{t.all}</button>
            {(Object.keys(resourceCategories) as LogisticsResource["category"][]).map((key) => <button type="button" key={key} aria-pressed={category === key} onClick={() => setCategory(key)}>{resourceCategories[key][lang]}</button>)}
          </div>
          <label className={styles.search}><Search size={16} aria-hidden="true" /><span className="sr-only">{t.search}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} /></label>
        </div>
        <p className={styles.resultCount} aria-live="polite">{String(filtered.length).padStart(2, "0")} {t.count}</p>
        <div className={styles.grid}>
          {filtered.map((resource) => { const Icon = icons[resource.category]; return <article className={styles.card} key={resource.id}><div className={styles.cardTop}><Icon size={23} strokeWidth={1.4} aria-hidden="true" /><span>{resourceCategories[resource.category][lang]}</span></div><h3>{resource.title[lang]}</h3><p>{resource.description[lang]}</p><a href={resource.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.source}: ${resource.title[lang]}`}><span>{resource.source}</span><ArrowUpRight size={18} aria-hidden="true" /></a></article>; })}
        </div>
        {filtered.length === 0 && <div className={styles.empty}><BookOpen size={28} aria-hidden="true" /><p>{t.empty}</p><button type="button" onClick={() => { setCategory("all"); setQuery(""); }}>{t.reset}<ArrowUpRight size={17} aria-hidden="true" /></button></div>}
        <p className={styles.photoCredit}>{t.credit}: <a href="https://unsplash.com/photos/aerial-view-of-intermodal-containers-xewrfLD8emE" target="_blank" rel="noopener noreferrer">CHUTTERSNAP</a> & <a href="https://unsplash.com/photos/a-forklift-driving-through-a-warehouse-filled-with-pallets-F2C_mSrb6iM" target="_blank" rel="noopener noreferrer">Bernd Dittrich</a> / Unsplash.</p>
      </div>
    </section>
  );
}
