"use client";

import { useTranslations } from "next-intl";

export default function FloatingContact() {
  const t = useTranslations("FloatingContact");

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[150] flex flex-col gap-4 items-end animate-fade-in delay-1000 floating-contact-container transition-all duration-300">
      <a
        href="https://zalo.me/0913497246"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 lg:w-16 lg:h-16 bg-[#0068ff]/50 backdrop-blur-xl text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group relative border border-white/20"
        aria-label="Contact via Zalo"
      >
        <img
          src="https://img.icons8.com/?size=100&id=0m71tmRjlxEe&format=png&color=FFFFFF"
          alt="Zalo Icon"
          className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
        />
        <span className="absolute right-full mr-4 bg-slate-900/40 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap border border-white/10">
          {t('zalo')}
        </span>
      </a>

      <a
        href="tel:0913497246"
        className="w-12 h-12 lg:w-16 lg:h-16 bg-emerald-500/50 backdrop-blur-xl text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group relative border border-white/20"
        aria-label="Call Now"
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
        <span className="material-symbols-outlined text-2xl lg:text-3xl">call</span>
        <span className="absolute right-full mr-4 bg-slate-900/40 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap border border-white/10">
          {t('call')}
        </span>
      </a>
    </div>
  );
}
