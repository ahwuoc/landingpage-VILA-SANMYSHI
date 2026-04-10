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
    <section className="py-16 md:py-24 lg:py-48 landscape:py-10 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 lg:mb-32 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-10 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">{t('badge')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl landscape:text-2xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              {t('title_prefix')} <span className="text-primary">{t('title_highlight')}</span>
            </h2>
            <p className="mt-4 md:mt-6 text-slate-500 font-medium text-base md:text-lg lg:text-2xl max-w-2xl leading-relaxed landscape:hidden">
              {t('description')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="w-12 h-12 md:w-20 md:h-20 landscape:w-10 landscape:h-10 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-xl md:text-3xl landscape:text-lg">west</span>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="w-12 h-12 md:w-20 md:h-20 landscape:w-10 landscape:h-10 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all"
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
                className="group relative flex flex-col h-full bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 w-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[16/10] landscape:aspect-[21/9] overflow-hidden shrink-0">
                  <Image
                    src={news.image}
                    alt={news.title[locale] || news.title['vi']}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                  {/* Category Tag Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] landscape:text-[8px] font-black uppercase tracking-widest border border-white/20">
                      {news.news_categories?.name[locale] || news.news_categories?.name['vi'] || ""}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-10 landscape:p-4 md:landscape:p-5 flex flex-col">
                  {/* Date & Author */}
                  <div className="flex items-center gap-4 mb-4 landscape:mb-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] landscape:text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                        {t('author_label')}
                      </span>
                      <span className="text-slate-900 text-xs landscape:text-[10px] font-black uppercase">
                        {news.author}
                      </span>
                    </div>
                    <div className="w-[1px] h-8 landscape:h-6 bg-slate-100" />
                    <div className="flex flex-col">
                      {(() => {
                        const d = formatDate(news.date);
                        return (
                          <>
                            <span className="text-[10px] landscape:text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                              {d.year}
                            </span>
                            <span className="text-primary text-xs landscape:text-[10px] font-black uppercase italic">
                              {d.day} . {d.month}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl landscape:text-sm md:landscape:text-base font-black text-slate-900 leading-tight tracking-tight uppercase mb-6 landscape:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {news.title[locale] || news.title['vi']}
                  </h3>

                  {/* Footer - "Read More" button */}
                  <div className="mt-auto pt-6 landscape:pt-3 border-t border-slate-50 flex items-center justify-between group/footer">
                    <span className="text-[10px] landscape:text-[8px] font-black text-primary uppercase tracking-[0.2em]">
                      {t('read_more')}
                    </span>
                    <div className="w-10 h-10 landscape:w-8 landscape:h-8 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center group-hover/footer:bg-primary group-hover/footer:text-white transition-all duration-300">
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
