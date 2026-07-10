"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, Route } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BRAND_NAME, COMPANY_INFO, SOCIAL_LINKS } from "@/constants/company";

export default function Footer() {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");
  const year = new Date().getFullYear();

  const navLinks = [
    { name: navT("home"), href: "/" },
    { name: navT("about"), href: "/about" },
    { name: navT("services"), href: "/services" },
    { name: navT("branches"), href: "/branches" },
    { name: navT("news"), href: "/news" },
    { name: navT("contact"), href: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden bg-brand-900 text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-14 border-b border-white/15 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:pb-20">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4">
              <span className="grid h-20 w-28 place-items-center rounded-2xl bg-white px-2">
                <Image src={COMPANY_INFO.logo} alt={BRAND_NAME} width={106} height={68} className="h-auto w-full object-contain" />
              </span>
              <span>
                <strong className="block text-2xl font-bold leading-none tracking-tight">
                  VILA SANMYSHI
                </strong>
                <small className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-200">
                  Border logistics · EWEC
                </small>
              </span>
            </Link>

            <p className="mt-7 max-w-xl text-sm font-medium leading-7 text-white/62 lg:text-[15px]">{t("about_text")}</p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-brand-100"
                >
                  {social.name}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h2 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-200">{t("nav_title")}</h2>
            <nav className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-1">
              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="text-sm font-semibold text-white/72 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-200">{t("contact_title")}</h2>
            <address className="space-y-5 not-italic">
              <div className="flex gap-3 text-sm leading-6 text-white/72">
                <MapPin className="mt-0.5 shrink-0 text-brand-300" size={18} aria-hidden="true" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-3 text-sm font-bold transition-colors hover:text-brand-100">
                <Phone className="shrink-0 text-brand-300" size={18} aria-hidden="true" />
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-3 text-sm font-bold transition-colors hover:text-brand-100">
                <Mail className="shrink-0 text-brand-300" size={18} aria-hidden="true" />
                {COMPANY_INFO.email}
              </a>
            </address>
          </div>
        </div>

        <div className="grid gap-8 border-b border-white/15 py-9 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/50">
            <Route size={18} className="text-brand-300" aria-hidden="true" />
            Hành lang kinh tế Đông – Tây
          </div>
          <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3 font-headline text-sm font-semibold uppercase tracking-[0.08em] sm:text-base">
            <span>Việt Nam</span>
            <i className="h-px bg-white/20" />
            <span>Lào</span>
            <i className="h-px bg-white/20" />
            <span>Thái Lan</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[9px] font-bold uppercase tracking-[0.11em] text-white/42 md:flex-row md:items-center md:justify-between">
          <p>{t("copyright", { year, company: COMPANY_INFO.shortName })}</p>
          <div className="flex items-center gap-6">
            <span>MST {COMPANY_INFO.mst}</span>
            <a href="#top" className="transition-colors hover:text-white">
              {t("back_to_top")} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
