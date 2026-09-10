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
    },
    {
      id: "02",
      icon: "bolt",
    },
    {
      id: "03",
      icon: "groups",
    },
    {
      id: "04",
      icon: "hub",
    },
    {
      id: "05",
      icon: "account_balance_wallet",
    },
    {
      id: "06",
      icon: "shield_with_heart",
    }
  ];

  const benefits = BENEFITS_ICONS.map((item, index) => ({
    ...item,
    title: t(`benefits.${index}.title`),
    desc: t(`benefits.${index}.desc`)
  }));

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-14 flex flex-col items-start gap-10 lg:mb-16 lg:flex-row lg:gap-20">
          <div className="lg:w-1/2">
            <div className="text-label-lg mb-6 inline-flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t('badge')}
            </div>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.03em] text-on-surface md:text-5xl lg:text-6xl">
              {t('title_prefix')} <br />
              <span className="text-primary">
                {BRAND_NAME.split(" ")[0]}
              </span>
              <span className="text-slate-900"> {BRAND_NAME.split(" ").slice(1).join(" ")}</span>?
            </h2>
          </div>
          <div className="lg:w-1/2 lg:pt-14">
            <p className="border-l-2 border-primary pl-6 text-xl font-medium leading-8 text-on-surface-variant lg:text-2xl">
              {t('quote')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative overflow-hidden rounded-2xl border border-brand-200 bg-white p-8 shadow-[var(--shadow-card)] transition duration-300 hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="absolute right-7 top-7 text-xs font-semibold text-brand-400">
                {benefit.id}
              </div>

              <div className="relative mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <span className="material-symbols-outlined text-2xl">
                    {benefit.icon}
                  </span>
                </div>
              </div>

              <h3 className="mb-4 text-xl font-bold tracking-[-0.02em] text-on-surface transition-colors group-hover:text-primary">
                {benefit.title}
              </h3>
              <p className="text-sm font-normal leading-7 text-on-surface-variant">
                {benefit.desc}
              </p>

            </div>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-2xl bg-brand-900 p-10 lg:p-14">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="mb-5 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">{t('cta_question')}</h3>
              <p className="text-base font-normal leading-7 text-white/70 lg:text-lg">
                {t('cta_desc')}
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 shrink-0">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-900 bg-brand-800">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${i + 20}`}
                      alt="Expert Avatar"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
              <Link href="/contact" className="rounded-xl bg-primary px-10 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-on-primary transition-colors hover:bg-brand-700">
                {t('cta_btn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
