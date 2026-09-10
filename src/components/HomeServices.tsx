"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";
import { useResponsive } from "@/hooks/useResponsive";

import "swiper/css";
import "swiper/css/navigation";

interface Service {
  id: string;
  title: Record<string, string>;
  image: string;
  service_categories?: { name: Record<string, string>; slug: string };
}

export default function HomeServices({ 
  services = [] 
}: { 
  services?: Service[];
}) {
  const t = useTranslations("Home.services");
  const locale = useLocale();
  const [swiper, setSwiper] = useState<any>(null);
  const { isLandscape, isMobile } = useResponsive();

  return (
    <section className="overflow-hidden bg-white py-20 landscape:py-10 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-3xl">
            <h2 className="mb-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-on-surface landscape:text-2xl md:text-5xl md:landscape:text-3xl">
              {t('title')}
            </h2>
            <p className="text-base font-normal leading-7 text-on-surface-variant lg:text-lg lg:leading-8">
              {t('description')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200 text-on-surface transition-colors hover:border-primary hover:text-primary landscape:h-10 landscape:w-10"
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl landscape:text-lg">west</span>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200 text-on-surface transition-colors hover:border-primary hover:text-primary landscape:h-10 landscape:w-10"
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl landscape:text-lg">east</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={isLandscape ? 3.2 : 1.2}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: isLandscape ? 3.2 : 2 },
            1024: { slidesPerView: 4 },
          }}
          className="rounded-2xl"
        >
          {services.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto flex">
              <Link
                href={`/services/${item.service_categories?.slug || "all"}/${item.id}`}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)] transition duration-300 hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[21/10] md:aspect-[16/10] overflow-hidden shrink-0">
                  <Image
                    src={item.image || "/images/services/sea-freight-premium.png"}
                    alt={(item.title[locale] || item.title['vi']) || "VILA SANMYSHI service"}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 lg:p-10 landscape:p-5 flex flex-col flex-1">
                  <h3 className="mb-4 min-h-[3.5rem] line-clamp-2 text-xl font-bold leading-tight tracking-[-0.02em] text-on-surface transition-colors group-hover:text-primary landscape:mb-2 landscape:min-h-0 landscape:text-base lg:text-2xl">
                    {item.title[locale] || item.title['vi']}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm font-normal leading-7 text-on-surface-variant landscape:text-[10px] landscape:leading-tight lg:text-base">
                    {t('item_default_desc')}
                  </p>

                  {!isMobile && !isLandscape && (
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                      <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                        {t('view_details')}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-on-surface-variant transition-colors group-hover:bg-primary group-hover:text-white">
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700"
        >
          {t('view_all')}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
