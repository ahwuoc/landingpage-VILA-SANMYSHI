"use client";

import { useTranslations } from "next-intl";

export default function FloatingContact() {
  const t = useTranslations("FloatingContact");

  return (
    <div className="floating-contact-container fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3 transition-all duration-300 lg:bottom-8 lg:right-8">
      <a
        href="https://zalo.me/0913497246"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-brand-900 text-white shadow-[var(--shadow-card)] transition-colors hover:bg-brand-950 lg:h-14 lg:w-14"
        aria-label="Contact via Zalo"
      >
        <img
          src="https://img.icons8.com/?size=100&id=0m71tmRjlxEe&format=png&color=FFFFFF"
          alt="Zalo Icon"
          className="h-7 w-7 object-contain lg:h-8 lg:w-8"
        />
        <span className="pointer-events-none absolute right-full mr-3 translate-x-2 whitespace-nowrap rounded-lg bg-brand-950 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 shadow-[var(--shadow-card)] transition-all group-hover:translate-x-0 group-hover:opacity-100">
          {t('zalo')}
        </span>
      </a>

      <a
        href="tel:0913497246"
        className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500 bg-brand-600 text-white shadow-[var(--shadow-card)] transition-colors hover:bg-brand-700 lg:h-14 lg:w-14"
        aria-label="Call Now"
      >
        <span className="material-symbols-outlined text-2xl">call</span>
        <span className="pointer-events-none absolute right-full mr-3 translate-x-2 whitespace-nowrap rounded-lg bg-brand-950 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 shadow-[var(--shadow-card)] transition-all group-hover:translate-x-0 group-hover:opacity-100">
          {t('call')}
        </span>
      </a>
    </div>
  );
}
