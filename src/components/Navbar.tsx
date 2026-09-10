"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { COMPANY_INFO } from "@/constants/company";
import { ADMIN_LANGS as LANGUAGES } from "@/constants/languages";
import ConsultationModal from "./ConsultationModal";

const consultationOfferKey = "vila-consultation-offer-seen";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", isOpen);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (pathname !== "/" || isOpen || isModalOpen || sessionStorage.getItem(consultationOfferKey)) return;

    const timer = window.setTimeout(() => setIsModalOpen(true), 3800);
    return () => window.clearTimeout(timer);
  }, [isModalOpen, isOpen, pathname]);

  const closeConsultationModal = () => {
    sessionStorage.setItem(consultationOfferKey, "1");
    setIsModalOpen(false);
  };

  const changeLanguage = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale as "vi" | "en" | "th" });
  };

  return (
    <>
      <ConsultationModal isOpen={isModalOpen} onClose={closeConsultationModal} />

      <header className="absolute inset-x-0 top-0 z-[120]">
        <div className="hidden h-8 bg-brand-900 text-white lg:block">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 text-[10px] font-semibold tracking-[0.08em]">
            <div className="flex items-center gap-6">
              <a href={`tel:${COMPANY_INFO.hotline}`} className="flex items-center gap-2 transition-opacity hover:opacity-70">
                <Phone size={13} aria-hidden="true" />
                {t("hotline")}: {COMPANY_INFO.hotline.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 transition-opacity hover:opacity-70">
                <Mail size={13} aria-hidden="true" />
                {COMPANY_INFO.email}
              </a>
            </div>
            <span className="text-white/65">VIỆT NAM · LÀO · THÁI LAN / EWEC</span>
          </div>
        </div>

        <nav className="border-b border-brand-200 bg-white/85 shadow-[var(--shadow-nav)] backdrop-blur-lg">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[82px]">
            <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="VILA SANMYSHI">
              <Image
                src="/images/logo.jpg"
                alt="VILA SANMYSHI"
                width={92}
                height={60}
                loading="eager"
                className="h-12 w-auto object-contain lg:h-14"
              />
              <span className="hidden border-l border-brand-200 pl-3 sm:block">
                <strong className="block text-base font-bold leading-none tracking-[-0.02em] text-on-surface">
                  VILA SANMYSHI
                </strong>
                <small className="mt-1.5 block text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-600">
                  Hậu cần biên giới
                </small>
              </span>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {navLinks.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`border-b-2 px-1 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-brand-600 text-brand-600"
                        : "border-transparent text-on-surface-variant hover:border-brand-200 hover:text-on-surface"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <label className="relative hidden lg:block">
                <span className="sr-only">Language</span>
                <select
                  value={locale}
                  onChange={(event) => changeLanguage(event.target.value)}
                  className="h-11 cursor-pointer appearance-none rounded-xl border border-brand-200 bg-white px-3 pr-8 text-[10px] font-semibold uppercase tracking-[0.08em] text-on-surface outline-none focus:border-brand-600"
                  aria-label="Language"
                >
                  {LANGUAGES.map((language) => (
                    <option value={language.id} key={language.id}>
                      {language.id.toUpperCase()}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px]">▼</span>
              </label>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="hidden h-11 items-center gap-2 rounded-xl bg-brand-600 px-5 text-xs font-semibold text-white transition-colors hover:bg-brand-700 sm:flex"
              >
                {t("consult")}
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-xl border border-brand-200 text-on-surface xl:hidden"
                aria-label="Open navigation"
                aria-expanded={isOpen}
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[160] flex flex-col bg-brand-900 px-5 py-5 text-white transition-[opacity,visibility] duration-300 xl:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <Image src="/images/logo.jpg" alt="VILA SANMYSHI" width={82} height={54} className="h-14 w-auto object-contain" />
            <span className="text-lg font-bold tracking-tight">VILA SANMYSHI</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="grid h-12 w-12 place-items-center border border-white/20"
            aria-label="Close navigation"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between border-b border-white/12 py-4 text-[clamp(1.7rem,7vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] transition-colors hover:text-brand-200"
            >
              {link.name}
              <span className="font-sans text-[10px] font-bold tracking-[0.15em] text-white/35">0{index + 1}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/15 pt-5">
          <div className="mb-5 flex gap-2">
            {LANGUAGES.map((language) => (
              <button
                type="button"
                key={language.id}
                onClick={() => changeLanguage(language.id)}
                className={`min-w-16 border px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider ${
                  locale === language.id ? "border-brand-300 bg-brand-100 text-brand-900" : "border-white/20 text-white/65"
                } rounded-lg`}
              >
                {language.id}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}
            className="flex w-full items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-semibold text-brand-900"
          >
            {t("consult")}
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
