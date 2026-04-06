"use client";

import Image from "next/image";
import { BRAND_NAME } from "@/constants/company";
import { INITIAL_PARTNERS } from "@/constants/partners";
import { useTranslations } from "next-intl";

export default function PartnerSection() {
  const t = useTranslations("Home.partners");

  return (
    <section className="py-24 lg:py-48 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-label-md">{t('badge')}</span>
          </div>
          <h2 className="text-heading-xl text-default">
            {t('title_prefix')} <span className="text-primary">{t('title_highlight')}</span>
          </h2>
          <p className="mt-6 text-body-lg text-muted max-w-2xl">
            {t('description')}
          </p>
        </div>

        <div className="relative overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap py-10 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused] select-none">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 lg:gap-24 items-center px-12 lg:px-20">
                {INITIAL_PARTNERS.map((partner, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center gap-6 group/item cursor-pointer">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-surface-container-lowest rounded-2xl lg:rounded-[2rem] shadow-xl border border-on-surface/5 flex items-center justify-center p-4 lg:p-6 group-hover/item:scale-110 group-hover/item:border-primary transition-all duration-500 relative overflow-hidden group-hover/item:shadow-primary/10">
                      <div className="relative w-full h-full">
                        <Image src={partner.logo} alt={partner.name} fill className="object-contain transition-all duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/item:opacity-5 transition-opacity" />
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
