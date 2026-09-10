"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";
import { useResponsive } from "@/hooks/useResponsive";
import { NewsItem } from "@/lib/data";

import "swiper/css";
import "swiper/css/navigation";

export default function NewsSlider({ 
  newsList = [] 
}: { 
  newsList?: NewsItem[] 
}) {
  const t = useTranslations("Home.news");
  const locale = useLocale();
  const [swiper, setSwiper] = useState<any>(null);
  const { isLandscape, isMobile } = useResponsive();

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return {
        day: String(d.getDate()).padStart(2, "0"),
        month: String(d.getMonth() + 1).padStart(2, "0"),
        year: String(d.getFullYear()),
      };
    } catch {
      return { day: "--", month: "--", year: "----" };
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 landscape:py-10 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="text-label-lg">{t('badge')}</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.03em] text-on-surface landscape:text-2xl md:text-5xl">
              {t('title_prefix')} <span className="text-primary">{t('title_highlight')}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-on-surface-variant landscape:hidden md:text-lg md:leading-8">
              {t('description')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200 text-on-surface transition-colors hover:border-primary hover:text-primary landscape:h-10 landscape:w-10"
            >
              <span className="material-symbols-outlined text-xl md:text-3xl landscape:text-lg">west</span>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200 text-on-surface transition-colors hover:border-primary hover:text-primary landscape:h-10 landscape:w-10"
            >
              <span className="material-symbols-outlined text-xl md:text-3xl landscape:text-lg">east</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-0">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          spaceBetween={isMobile ? 20 : 40}
          slidesPerView={isLandscape ? 2.2 : (isMobile ? 1.2 : 1.1)}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: isLandscape ? 2.2 : 1.5, spaceBetween: 40 },
            1280: { slidesPerView: 2.2, spaceBetween: 60 },
          }}
          className="overflow-visible"
        >
          {newsList.map((news) => (
            <SwiperSlide key={news.id} className="!h-auto flex">
              <Link
                href={`/news/${news.slug || news.id}`}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-[var(--shadow-card)] transition duration-300 hover:border-brand-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[16/10] landscape:aspect-[21/9] overflow-hidden shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title[locale] || news.title['vi']}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                  {/* Category Tag Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary shadow-[var(--shadow-card)] landscape:text-[8px]">
                      {news.news_categories?.name[locale] || news.news_categories?.name['vi'] || ""}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-10 landscape:p-4 md:landscape:p-5 flex flex-col">
                  {/* Date & Author */}
                  <div className="flex items-center gap-4 mb-4 landscape:mb-2">
                    <div className="flex flex-col">
                      <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 landscape:text-[8px]">
                        {t('author_label')}
                      </span>
                      <span className="text-xs font-semibold text-on-surface landscape:text-[10px]">
                        {news.author}
                      </span>
                    </div>
                    <div className="w-[1px] h-8 landscape:h-6 bg-slate-100" />
                    <div className="flex flex-col">
                      {(() => {
                        const d = formatDate(news.date);
                        return (
                          <>
                            <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 landscape:text-[8px]">
                              {d.year}
                            </span>
                            <span className="text-xs font-semibold text-primary landscape:text-[10px]">
                              {d.day} . {d.month}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-6 line-clamp-2 text-xl font-bold leading-tight tracking-[-0.02em] text-on-surface transition-colors duration-300 group-hover:text-primary landscape:mb-3 landscape:text-sm md:text-2xl md:landscape:text-base">
                    {news.title[locale] || news.title['vi']}
                  </h3>

                  {/* Footer - "Read More" button */}
                  <div className="mt-auto pt-6 landscape:pt-3 border-t border-slate-50 flex items-center justify-between group/footer">
                    <span className="text-[10px] landscape:text-[8px] font-black text-primary uppercase tracking-[0.2em]">
                      {t('read_more')}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-on-surface transition-colors duration-300 group-hover/footer:bg-primary group-hover/footer:text-white landscape:h-8 landscape:w-8">
                      <span className="material-symbols-outlined text-xl landscape:text-lg">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
