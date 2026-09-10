"use client";

import Image from "next/image";
import { BRAND_NAME } from "@/constants/company";
import { INITIAL_PARTNERS } from "@/constants/partners";
import { useTranslations } from "next-intl";

export default function PartnerSection() {
  const t = useTranslations("Home.partners");

  return (
    <section className="relative overflow-hidden bg-brand-50 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary text-label-md">{t('badge')}</span>
          </div>
          <h2 className="text-heading-xl text-default">
            {t('title_prefix')} <span className="text-primary">{t('title_highlight')}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-muted">
            {t('description')}
          </p>
        </div>

        <div className="relative overflow-hidden group">
          <div className="flex animate-marquee cursor-grab select-none whitespace-nowrap py-6 active:cursor-grabbing hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 lg:gap-24 items-center px-12 lg:px-20">
                {INITIAL_PARTNERS.map((partner, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-6 group/item cursor-pointer">
                    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-brand-200 bg-white p-4 shadow-[var(--shadow-card)] transition-colors duration-300 group-hover/item:border-brand-400 lg:h-28 lg:w-28 lg:p-5">
                      <div className="relative w-full h-full">
                        <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-body-sm text-faint italic">
            {t('footer_note', { count: 500, brand: BRAND_NAME })}
          </p>
        </div>
      </div>
    </section>
  );
}
