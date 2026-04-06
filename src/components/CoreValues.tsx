"use client";

import { BRAND_NAME } from "@/constants/company";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CoreValues() {
  const t = useTranslations("Home.core_values");

  const BENEFITS_ICONS = [
    {
      id: "01",
      icon: "verified_user",
      gradient: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-600"
    },
    {
      id: "02",
      icon: "bolt",
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-600"
    },
    {
      id: "03",
      icon: "groups",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-primary"
    },
    {
      id: "04",
      icon: "hub",
      gradient: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-600"
    },
    {
      id: "05",
      icon: "account_balance_wallet",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-600"
    },
    {
      id: "06",
      icon: "shield_with_heart",
      gradient: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-600"
    }
  ];

  // Map benefits with explicit indices to be safer
  const benefits = BENEFITS_ICONS.map((item, index) => ({
    ...item,
    title: t(`benefits.${index}.title`),
    desc: t(`benefits.${index}.desc`)
  }));

  return (
    <section className="py-24 lg:py-40 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('badge')}
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-on-surface mb-6 md:mb-10 leading-tight text-balance uppercase">
              {t('title_prefix')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">
                {BRAND_NAME.split(" ")[0]}
              </span>
              <span className="text-slate-900"> {BRAND_NAME.split(" ").slice(1).join(" ")}</span>?
            </h2>
          </div>
          <div className="lg:w-1/2 lg:pt-20">
            <p className="text-2xl lg:text-3xl text-slate-800 font-bold leading-relaxed border-l-4 border-primary/40 pl-8">
              {t('quote')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 text-9xl font-black text-slate-100 group-hover:text-primary/5 transition-colors duration-700 pointer-events-none select-none">
                {benefit.id}
              </div>

              <div className="relative mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ring-4 ring-white shadow-inner`}>
                  <span className={`material-symbols-outlined text-3xl ${benefit.iconColor}`}>
                    {benefit.icon}
                  </span>
                </div>
                {/* Decorative dots */}
                <div className="absolute -bottom-2 -left-2 flex gap-1 items-center">
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight uppercase group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                {benefit.desc}
              </p>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-primary to-emerald-400 group-hover:w-full transition-all duration-700 ease-in-out" />
            </div>
          ))}
        </div>

        <div className="mt-40 bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">{t('cta_question')}</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                {t('cta_desc')}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 shrink-0">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 shadow-2xl relative">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${i + 20}`}
                      alt="Expert Avatar"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
              <Link href="/contact" className="bg-primary text-on-primary px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[1.02] transition-all active:scale-95">
                {t('cta_btn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
