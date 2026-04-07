"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { COMPANY_INFO } from "@/constants/company";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      {/* LEFT SECTION: Full Media Panel */}
      <div className="w-full lg:w-3/5 h-[40vh] lg:h-screen relative overflow-hidden bg-slate-900 group">
        <Image
          src="/images/2bab8143-64a1-4ed5-ab59-238f7f1b7d87.png"
          alt="404 Error - Not Found"
          fill
          className="object-cover lg:object-contain p-0 lg:p-12 transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          priority
        />

        {/* Dynamic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

        {/* Animated Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(36,232,125,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20 animate-pulse" />

        {/* Brand Branding */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-30">
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden bg-white shadow-2xl transition-all duration-500 group-hover/logo:scale-110">
              <Image src="/images/logo.jpg" alt="VILA SANMYSHI" fill className="object-contain p-2" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-black tracking-tighter text-lg leading-none uppercase">VILA</p>
              <p className="text-primary font-black tracking-tighter text-lg leading-none uppercase">SANMYSHI</p>
            </div>
          </Link>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--md-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* RIGHT SECTION: Info Panel */}
      <div className="w-full lg:w-2/5 min-h-[60vh] lg:h-screen overflow-y-auto flex items-center justify-center p-6 lg:p-12 relative z-30 bg-slate-950/90 backdrop-blur-3xl border-l border-white/5">
        <div className="max-w-md w-full py-12 lg:py-0">
          <div className="space-y-10 animate-fade-up">
            {/* Status Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-md">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em]">{t('error_404')}</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                404
              </h1>

              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                {t('title')}
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {t('description')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="group relative flex items-center justify-center gap-3 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[0.98] transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">home</span>
                {t('back_home')}
              </Link>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-primary/50 transition-all group/item"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-xl">phone_iphone</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t('contact_support')}</p>
                      <p className="text-white font-black group-hover/item:text-primary transition-colors">{COMPANY_INFO.hotline}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover/item:translate-x-1 group-hover/item:text-primary transition-all">chevron_right</span>
                </a>
              </div>
            </div>

            {/* Footer Details */}
            <div className="pt-10 flex items-center justify-between border-t border-white/5">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                {locale.toUpperCase()} / SESSION_CLOSED
              </span>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                VILA SANMYSHI © 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
