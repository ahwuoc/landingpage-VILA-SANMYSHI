"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { COMPANY_INFO } from "@/constants/company";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const locale = useLocale();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-brand-950 font-sans selection:bg-primary/30 selection:text-white lg:flex-row">
      {/* LEFT SECTION: Full Media Panel */}
      <div className="w-full lg:w-3/5 h-[40vh] lg:h-screen relative overflow-hidden bg-slate-900 group">
        <Image
          src="/images/2bab8143-64a1-4ed5-ab59-238f7f1b7d87.png"
          alt="404 Error - Not Found"
          fill
          className="object-cover p-0 lg:object-contain lg:p-12"
          preload
        />

        <div className="absolute inset-0 z-10 bg-brand-950/35" />

        {/* Brand Branding */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-30">
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-white shadow-[var(--shadow-card)] lg:h-16 lg:w-16">
              <Image src="/images/logo.jpg" alt="VILA SANMYSHI" fill className="object-contain p-2" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-black tracking-tighter text-lg leading-none uppercase">VILA</p>
              <p className="text-primary font-black tracking-tighter text-lg leading-none uppercase">SANMYSHI</p>
            </div>
          </Link>
        </div>

      </div>

      {/* RIGHT SECTION: Info Panel */}
      <div className="relative z-30 flex min-h-[60vh] w-full items-center justify-center overflow-y-auto border-l border-white/10 bg-brand-950 p-6 lg:h-screen lg:w-2/5 lg:p-12">
        <div className="max-w-md w-full py-12 lg:py-0">
          <div className="space-y-10 animate-fade-up">
            {/* Status Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{t('error_404')}</span>
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
                className="group relative flex items-center justify-center gap-3 rounded-xl bg-primary py-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700"
              >
                <span className="material-symbols-outlined text-base">home</span>
                {t('back_home')}
              </Link>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="group/item flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
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
