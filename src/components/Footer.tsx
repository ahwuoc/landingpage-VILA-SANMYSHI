"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BRAND_NAME, COMPANY_INFO, SOCIAL_LINKS } from "@/constants/company";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const copy = locale === "vi"
    ? { line: "Kết nối bằng sự", emphasis: "tận tâm.", corridor: "Hành lang kinh tế Đông – Tây", countries: ["Việt Nam", "Lào", "Thái Lan"], tax: "Mã số thuế" }
    : locale === "th"
      ? { line: "เชื่อมต่อด้วย", emphasis: "ความใส่ใจ", corridor: "ระเบียงเศรษฐกิจตะวันออก–ตะวันตก", countries: ["เวียดนาม", "ลาว", "ไทย"], tax: "เลขประจำตัวผู้เสียภาษี" }
      : { line: "Connected through", emphasis: "care.", corridor: "East–West Economic Corridor", countries: ["Vietnam", "Laos", "Thailand"], tax: "Tax ID" };
  const navLinks = [
    { name: navT("home"), href: "/" },
    { name: navT("about"), href: "/about" },
    { name: navT("services"), href: "/services" },
    { name: navT("tracking"), href: "/tracking" },
    { name: navT("branches"), href: "/branches" },
    { name: navT("news"), href: "/news" },
    { name: navT("contact"), href: "/contact" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.introduction}>
            <Link href="/" className={styles.brand} aria-label={BRAND_NAME}>
              <span className={styles.logo}><Image src={COMPANY_INFO.logo} alt="" width={92} height={60} /></span>
              <span><strong>{BRAND_NAME}</strong><small>IMPORT – EXPORT & LOGISTICS</small></span>
            </Link>
            <p className={styles.statement}>{copy.line}<br /><em>{copy.emphasis}</em></p>
            <p className={styles.description}>{t("about_text")}</p>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((social) => <a key={social.name} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}>{social.name}<ArrowUpRight size={12} aria-hidden="true" /></a>)}
            </div>
          </div>
          <div className={styles.navigation}>
            <h2>{t("nav_title")}</h2>
            <nav aria-label={t("nav_title")}>
              {navLinks.map((link) => <Link href={link.href} key={link.href}>{link.name}</Link>)}
            </nav>
          </div>
          <div className={styles.contact}>
            <h2>{t("contact_title")}</h2>
            <address>
              <div className={styles.address}><MapPin size={17} aria-hidden="true" /><span>{COMPANY_INFO.address}</span></div>
              <a href={`tel:${COMPANY_INFO.phone}`} className={styles.phone}><Phone size={16} aria-hidden="true" /><span>{COMPANY_INFO.phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</span></a>
              <a href={`mailto:${COMPANY_INFO.email}`} className={styles.email}><Mail size={16} aria-hidden="true" /><span>{COMPANY_INFO.email}</span></a>
            </address>
            <Link href="/contact" className={styles.contactLink}>{navT("consult")}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className={styles.corridor}>
          <p><span className={styles.corridorDot} />EWEC<span className={styles.corridorLabel}>{copy.corridor}</span></p>
          <div className={styles.route}>
            {copy.countries.map((country, index) => <span key={country} className={styles.country}><i aria-hidden="true" /><span>{country}</span>{index < 2 && <span className={styles.routeLine} aria-hidden="true" />}</span>)}
          </div>
        </div>
        <div className={styles.wordmark} aria-hidden="true">VILA SANMYSHI</div>
        <div className={styles.bottom}>
          <p>{t("copyright", { year, company: COMPANY_INFO.shortName })}</p>
          <span>{copy.tax}: {COMPANY_INFO.mst}</span>
          <a href="#top">{t("back_to_top")}<ArrowUp size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
