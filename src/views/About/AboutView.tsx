"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Handshake,
  MapPin,
  PackageCheck,
  Route,
  SearchCheck,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BRAND_NAME, COMPANY_INFO } from "@/constants/company";
import styles from "./About.module.css";

const pageCopy = {
  vi: {
    headline: "Niềm tin bắt đầu từ",
    accent: "sự thấu hiểu.",
    profile: "Hiểu chúng tôi",
    services: "Khám phá dịch vụ",
    network: "Mạng lưới kết nối",
    countries: "Việt Nam · Lào · Thái Lan",
    since: "Đồng hành từ",
    place: "Từ Lao Bảo, kết nối những hành trình.",
    photo: "Không gian logistics · Ảnh minh họa",
    company: "Một đối tác rõ ràng.",
    companyAccent: "Một hành trình an tâm.",
    founded: "Ngày thành lập",
    scroll: "Khám phá câu chuyện của chúng tôi",
    inquiry: "Trao đổi về lô hàng của bạn",
    viewNetwork: "Khám phá mạng lưới",
    principle: "Uy tín được xây dựng từ từng chi tiết.",
    fields: "12 lĩnh vực, một tinh thần đồng hành.",
  },
  en: {
    headline: "Trust begins with",
    accent: "understanding.",
    profile: "Get to know us",
    services: "Explore our services",
    network: "Our connections",
    countries: "Vietnam · Laos · Thailand",
    since: "Working alongside you since",
    place: "From Lao Bao, connecting every journey.",
    photo: "Logistics space · Illustrative image",
    company: "A transparent partner.",
    companyAccent: "A confident journey.",
    founded: "Established",
    scroll: "Discover our story",
    inquiry: "Tell us about your shipment",
    viewNetwork: "Explore our network",
    principle: "Trust is built in every detail.",
    fields: "12 business areas, one shared commitment.",
  },
  th: {
    headline: "ความไว้วางใจเริ่มจาก",
    accent: "ความเข้าใจ",
    profile: "รู้จักเราให้มากขึ้น",
    services: "สำรวจบริการของเรา",
    network: "เครือข่ายของเรา",
    countries: "เวียดนาม · ลาว · ไทย",
    since: "เคียงข้างคุณตั้งแต่",
    place: "จากลาวบาว เชื่อมต่อทุกเส้นทาง",
    photo: "พื้นที่โลจิสติกส์ · ภาพประกอบ",
    company: "พันธมิตรที่โปร่งใส",
    companyAccent: "ทุกเส้นทางที่มั่นใจ",
    founded: "ก่อตั้ง",
    scroll: "ค้นพบเรื่องราวของเรา",
    inquiry: "ปรึกษาเรื่องการขนส่งของคุณ",
    viewNetwork: "สำรวจเครือข่ายของเรา",
    principle: "ความไว้วางใจสร้างขึ้นจากทุกรายละเอียด",
    fields: "12 ธุรกิจ ด้วยความมุ่งมั่นเดียวกัน",
  },
};

export default function AboutView() {
  const t = useTranslations("About");
  const locale = useLocale();
  const copy = pageCopy[locale as keyof typeof pageCopy] ?? pageCopy.vi;
  const timelineRef = useRef<HTMLDivElement>(null);
  const businessFields = Array.from({ length: 12 }, (_, index) => t(`business_fields.${index}`));
  const timeline = Array.from({ length: 8 }, (_, index) => ({
    year: t(`timeline.${index}.year`),
    highlight: t(`timeline.${index}.highlight`),
    description: t(`timeline.${index}.desc`),
  }));
  const values = Array.from({ length: 4 }, (_, index) => ({
    title: t(`values.${index}.title`),
    description: t(`values.${index}.desc`),
  }));
  const processSteps = Array.from({ length: 4 }, (_, index) => ({
    title: t(`process.steps.${index}.title`),
    description: t(`process.steps.${index}.desc`),
  }));
  const commitments = Array.from({ length: 4 }, (_, index) => t(`process.commitments.${index}`));
  const purposeCards = [
    { icon: Target, title: t("mission.title"), description: t("mission.content") },
    { icon: Globe2, title: t("vision.title"), description: t("vision.content") },
    { icon: Handshake, title: t("purpose.promise_title"), description: t("purpose.promise_content") },
  ];
  const valueIcons = [ShieldCheck, FileCheck2, BadgeCheck, UsersRound];
  const processIcons = [ClipboardCheck, SearchCheck, Route, PackageCheck];
  const address = locale === "vi" ? COMPANY_INFO.address : "13B Ong Ich Khiem, Lao Bao, Quang Tri, Vietnam";
  const profileItems = [
    { label: t("info.company_name"), value: locale === "vi" ? COMPANY_INFO.name : COMPANY_INFO.internationalName },
    { label: t("info.main_office"), value: address },
    { label: t("info.tax_id"), value: COMPANY_INFO.mst },
    { label: t("info.representative"), value: COMPANY_INFO.representative },
    { label: copy.founded, value: "02 · 05 · 2018" },
    { label: t("info.website"), value: COMPANY_INFO.website, href: `https://${COMPANY_INFO.website}` },
    { label: t("info.hotline"), value: COMPANY_INFO.hotline, href: `tel:${COMPANY_INFO.hotline}` },
    { label: t("info.email"), value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
  ];

  function scrollTimeline(direction: "left" | "right") {
    const container = timelineRef.current;
    if (!container) return;
    container.scrollBy({
      left: (direction === "left" ? -1 : 1) * container.clientWidth * 0.75,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.dot} />{t("page_title")} · {BRAND_NAME}</p>
            <h1>{copy.headline}<em>{copy.accent}</em></h1>
            <p className={styles.intro}>{t("hero.subtitle")}</p>
            <div className={styles.actions}>
              <a href="#company-profile" className={styles.button}>{copy.profile}<ArrowDown size={16} aria-hidden="true" /></a>
              <Link href="/services" className={styles.textLink}>{copy.services}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className={styles.heroSignature}><ShieldCheck size={21} aria-hidden="true" /><span>{t("profile_tagline")}</span></div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroPhoto}>
              <Image src="/images/editorial/warehouse.jpg" alt={copy.photo} fill preload sizes="(max-width: 760px) 100vw, 50vw" className={styles.cover} />
              <div className={styles.photoShade} />
              <p className={styles.photoCaption}>{copy.photo}</p>
            </div>
            <div className={styles.foundedSeal}><span>{copy.since}</span><strong>2018</strong><span>VILA SANMYSHI</span></div>
            <div className={styles.gateCard}>
              <div className={styles.gateImage}><Image src="/images/about/hero.png" alt="Lao Bao" fill sizes="210px" className={styles.cover} /></div>
              <p><MapPin size={13} aria-hidden="true" />Lao Bảo, Quảng Trị</p>
            </div>
          </div>
        </div>
        <div className={`${styles.container} ${styles.heroFoot}`}><span>{copy.place}</span><a href="#company-profile">{copy.scroll}<ArrowDown size={14} aria-hidden="true" /></a></div>
      </header>

      <div className={styles.proofBar}>
        <div className={`${styles.container} ${styles.proofGrid}`}>
          <div><span>{copy.founded}</span><strong>02.05.2018</strong></div>
          <div><span>{copy.network}</span><strong>{copy.countries}</strong></div>
          <div><span>{t("info.tax_id")}</span><strong>{COMPANY_INFO.mst}</strong></div>
          <Link href="/branches">{copy.viewNetwork}<ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
      </div>

      <section id="company-profile" className={`${styles.container} ${styles.profile}`}>
        <div className={styles.profileIntro}>
          <p className={styles.eyebrow}><span className={styles.sectionNumber}>01 /</span>{t("profile_title")}</p>
          <h2 className={styles.sectionTitle}>{copy.company}<em>{copy.companyAccent}</em></h2>
          <p>{t("capacity_intro")}</p>
          <div className={styles.profileNote}><MapPin size={23} aria-hidden="true" /><div><strong>Lao Bảo · Quảng Trị</strong><span>{t("process.route_label")}</span></div></div>
          <Link href="/contact" className={styles.textLink}>{copy.inquiry}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <dl className={styles.profileDetails}>
          {profileItems.map((item, index) => <div key={item.label}><dt><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</dt><dd>{item.href ? <a href={item.href}>{item.value}<ArrowUpRight size={13} aria-hidden="true" /></a> : item.value}</dd></div>)}
        </dl>
      </section>

      <section className={styles.purpose}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}><span className={styles.sectionNumber}>02 /</span>{t("purpose.eyebrow")}</p><h2 className={styles.sectionTitle}>{t("purpose.title")}</h2></div>
            <p>{t("purpose.intro")}</p>
          </div>
          <div className={styles.purposeGrid}>
            {purposeCards.map(({ icon: Icon, title, description }, index) => <article key={title} className={styles.purposeCard}><div className={styles.cardTop}><Icon size={25} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}
          </div>
          <div className={styles.valuesHeader}><span>{t("purpose.values_title")}</span><p>{copy.principle}</p></div>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => { const Icon = valueIcons[index]; return <article key={value.title}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><h3>{value.title}</h3><p>{value.description}</p></article>; })}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.process}`}>
        <div className={styles.processIntro}>
          <p className={styles.eyebrow}><span className={styles.sectionNumber}>03 /</span>{t("process.eyebrow")}</p>
          <h2 className={styles.sectionTitle}>{t("process.title")}</h2>
          <p>{t("process.intro")}</p>
          <div className={styles.processPhoto}><Image src="/images/editorial/container-port.jpg" alt={copy.photo} fill sizes="(max-width: 760px) 100vw, 40vw" className={styles.cover} /><span>{copy.countries}</span></div>
        </div>
        <div>
          <ol className={styles.processSteps}>
            {processSteps.map((step, index) => { const Icon = processIcons[index]; return <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><Icon size={22} strokeWidth={1.4} aria-hidden="true" /></li>; })}
          </ol>
          <details className={styles.commitments} open>
            <summary>{t("process.commitment_title")}<span aria-hidden="true">+</span></summary>
            <ul>{commitments.map(item => <li key={item}><CheckCircle2 size={16} aria-hidden="true" />{item}</li>)}</ul>
          </details>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.timelineHeading}><div><p className={styles.eyebrow}><span className={styles.sectionNumber}>04 /</span>{t("timeline_period")}</p><h2 className={styles.sectionTitle}>{t("timeline_title")}</h2></div><div className={styles.timelineControls}><button type="button" onClick={() => scrollTimeline("left")} aria-label={t("timeline_prev")}><ArrowLeft size={19} aria-hidden="true" /></button><button type="button" onClick={() => scrollTimeline("right")} aria-label={t("timeline_next")}><ArrowRight size={19} aria-hidden="true" /></button></div></div>
          <div ref={timelineRef} className={styles.timeline} tabIndex={0} role="region" aria-label={t("timeline_title")}>
            {timeline.map((item, index) => <article key={`${item.year}-${index}`}><div className={styles.timelineYear}><strong>{item.year}</strong><span>0{index + 1}</span></div><span className={styles.timelinePoint} /><h3>{item.highlight}</h3><p>{item.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.fields}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><span className={styles.sectionNumber}>05 /</span>{t("business_fields_eyebrow")}</p><h2 className={styles.sectionTitle}>{t("business_fields_title")}</h2></div><p>{t("business_fields_intro")}</p></div>
        <div className={styles.fieldsGrid}>{businessFields.map((field, index) => <div key={field}><span>{String(index + 1).padStart(2, "0")}</span><h3>{field}</h3></div>)}</div>
        <div className={styles.fieldsFoot}><p>{copy.fields}</p><Link href="/services" className={styles.textLink}>{copy.services}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </section>

      <section className={styles.cta}>
        <div className={`${styles.container} ${styles.ctaInner}`}><div><p className={styles.eyebrow}>{BRAND_NAME} · EWEC</p><h2>{t("cta.title")}</h2></div><div><p>{t("cta.desc")}</p><Link href="/contact" className={styles.button}>{t("cta.btn")}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
      </section>
    </div>
  );
}
