"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Globe2, Mail, Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { COMPANY_INFO } from "@/constants/company";
import { ADMIN_LANGS as LANGUAGES } from "@/constants/languages";
import ConsultationModal from "./ConsultationModal";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const copy = locale === "vi"
    ? { navigation: "Điều hướng chính", open: "Mở menu", close: "Đóng menu", language: "Ngôn ngữ", region: "VIỆT NAM · LÀO · THÁI LAN" }
    : locale === "th"
      ? { navigation: "เมนูหลัก", open: "เปิดเมนู", close: "ปิดเมนู", language: "ภาษา", region: "เวียดนาม · ลาว · ไทย" }
      : { navigation: "Main navigation", open: "Open menu", close: "Close menu", language: "Language", region: "VIETNAM · LAOS · THAILAND" };

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("tracking"), href: "/tracking" },
    { name: t("branches"), href: "/branches" },
    { name: t("news"), href: "/news" },
    { name: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    const focusable = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), select") ?? []);
    focusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
      menuButton?.focus();
    };
  }, [isOpen]);

  const changeLanguage = (nextLocale: string) => {
    setIsOpen(false);
    router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: nextLocale as "vi" | "en" | "th" });
  };

  return (
    <>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <header className={styles.header}>
        <div className={styles.utility}>
          <div className={styles.utilityInner}>
            <p className={styles.promise}><span />{t("topbar_slogan")}</p>
            <div className={styles.utilityContacts}>
              <a href={`mailto:${COMPANY_INFO.email}`}><Mail size={12} aria-hidden="true" />{COMPANY_INFO.email}</a>
              <a href={`tel:${COMPANY_INFO.hotline}`}><Phone size={12} aria-hidden="true" />{COMPANY_INFO.hotline.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}</a>
            </div>
          </div>
        </div>

        <nav className={styles.navigation} aria-label={copy.navigation}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.brand} aria-label="VILA SANMYSHI">
              <Image src={COMPANY_INFO.logo} alt="" width={92} height={60} loading="eager" className={styles.logo} />
              <span className={styles.brandName}>
                <strong>VILA SANMYSHI</strong>
                <small>{t("brand_tag")} & LOGISTICS</small>
              </span>
            </Link>

            <div className={styles.desktopLinks}>
              {navLinks.map((link) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={active ? styles.activeLink : undefined}>{link.name}</Link>;
              })}
            </div>

            <div className={styles.actions}>
              <label className={styles.language}>
                <Globe2 size={15} aria-hidden="true" />
                <select value={locale} onChange={(event) => changeLanguage(event.target.value)} aria-label={copy.language}>
                  {LANGUAGES.map((language) => <option value={language.id} key={language.id}>{language.id.toUpperCase()}</option>)}
                </select>
                <ChevronDown size={11} aria-hidden="true" />
              </label>
              <button type="button" onClick={() => setIsModalOpen(true)} className={styles.consult}>
                {t("consult")}<ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <button ref={menuButtonRef} type="button" onClick={() => setIsOpen(true)} className={styles.menuButton} aria-label={copy.open} aria-expanded={isOpen} aria-controls="mobile-navigation">
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal={isOpen ? true : undefined} aria-label={copy.navigation} aria-hidden={!isOpen} inert={!isOpen} className={`${styles.mobileMenu} ${isOpen ? styles.menuVisible : ""}`}>
        <div className={styles.mobileHeader}>
          <Link href="/" className={styles.mobileBrand} onClick={() => setIsOpen(false)}><span>VILA</span> SANMYSHI</Link>
          <button type="button" onClick={() => setIsOpen(false)} className={styles.closeMenu} aria-label={copy.close}><X size={23} aria-hidden="true" /></button>
        </div>
        <nav className={styles.mobileLinks} aria-label={copy.navigation}>
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              <span>{link.name}</span><small>0{index + 1}</small>
            </Link>
          ))}
        </nav>
        <div className={styles.mobileBottom}>
          <div className={styles.mobileLanguages}>
            {LANGUAGES.map((language) => <button type="button" key={language.id} onClick={() => changeLanguage(language.id)} aria-pressed={locale === language.id}>{language.label}</button>)}
          </div>
          <button type="button" onClick={() => { setIsOpen(false); setIsModalOpen(true); }} className={styles.mobileConsult}>{t("consult")}<ArrowUpRight size={19} aria-hidden="true" /></button>
          <p>{copy.region}</p>
        </div>
      </div>
    </>
  );
}
