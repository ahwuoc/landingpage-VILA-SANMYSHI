"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";

import "swiper/css";
import "swiper/css/navigation";

interface NewsItem {
  id: number;
  title: Record<string, string>;
  date: string;
  category_id: number;
  news_categories: { name: Record<string, string> };
  image: string;
  author: string;
  slug?: string;
}

export default function NewsSlider() {
  const t = useTranslations("Home.news");
  const locale = useLocale();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("news")
      .select("id, title, date, category_id, news_categories(name), image, author, slug")
      .eq("status", "Published")
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => setNewsList(data as any || []));
  }, []);

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
    <section className="py-24 lg:py-48 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 lg:mb-32 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">{t('badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              {t('title_prefix')} <span className="text-primary">{t('title_highlight')}</span>
            </h2>
            <p className="mt-6 text-slate-500 font-medium text-lg lg:text-2xl max-w-2xl leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="w-20 h-20 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-3xl">west</span>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="w-20 h-20 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-3xl">east</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-0">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          spaceBetween={40}
          slidesPerView={1.1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 1.5, spaceBetween: 40 },
            1280: { slidesPerView: 2, spaceBetween: 60 },
          }}
          className="rounded-[4rem] lg:rounded-[5rem]"
        >
          {newsList.map((news) => (
            <SwiperSlide key={news.id} className="h-auto">
              <Link href={`/news/${news.slug || news.id}`} className="group relative block aspect-[16/10] lg:aspect-[16/9] rounded-[4rem] lg:rounded-[5rem] overflow-hidden bg-slate-900 shadow-2xl h-full">
                <Image
                  src={news.image}
                  alt={news.title[locale] || news.title['vi']}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-1000 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 90vw, (max-width: 1280px) 70vw, 50vw"
                />

                {/* Refined gradient overlay - lighter */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                {/* Tag / Category overlay */}
                <div className="absolute top-6 left-6 lg:top-12 lg:left-12">
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className="h-[2px] w-4 lg:w-6 bg-primary" />
                    <span className="bg-white/10 backdrop-blur-2xl border border-white/20 text-white px-4 py-2 lg:px-8 lg:py-3 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]">
                      {news.news_categories?.name[locale] || news.news_categories?.name['vi'] || ""}
                    </span>
                  </div>
                </div>

                {/* Date Column */}
                <div className="absolute top-6 right-6 lg:top-12 lg:right-12 text-right">
                  <div className="flex flex-col items-end gap-1">
                    {(() => {
                      const d = formatDate(news.date); return (<>
                        <span className="text-white/40 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em]">{d.year}</span>
                        <span className="text-white text-lg md:text-5xl font-black leading-none tracking-tighter">{d.day} . {d.month}</span>
                      </>);
                    })()}
                  </div>
                </div>

                {/* Large Immersive Content Overlay */}
                <div className="absolute bottom-6 lg:bottom-20 left-6 lg:left-20 right-6 lg:right-20">
                  <h3 className="text-base md:text-4xl lg:text-5xl font-black text-white leading-tight lg:leading-[1.1] tracking-tighter uppercase mb-4 lg:mb-8 group-hover:-translate-y-2 transition-transform duration-700 pr-16 md:pr-0">
                    {news.title[locale] || news.title['vi']}
                  </h3>

                  <div className="flex flex-row items-center justify-between gap-4 lg:gap-8 lg:translate-y-8 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-1000">
                    <div className="flex items-center gap-2 lg:gap-4">
                      <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-white/20 p-0.5 lg:p-1">
                        <div className="w-full h-full rounded-full overflow-hidden relative border border-white/10 bg-white p-1">
                          <Image
                            src="/images/logo.jpg"
                            alt="VILA SANMYSHI"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] lg:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5 lg:mb-1">{t('author_label')}</span>
                        <span className="text-white text-[9px] lg:text-xs font-black uppercase tracking-[0.1em] lg:tracking-[0.2em]">{news.author}</span>
                      </div>
                    </div>

                    <div className="group/btn flex items-center gap-3 lg:gap-6 cursor-pointer">
                      <span className="hidden sm:inline text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.4em]">{t('read_more')}</span>
                      <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-primary text-white flex items-center justify-center group-hover/btn:scale-110 transition-transform shadow-glow-primary">
                        <span className="material-symbols-outlined text-xl lg:text-3xl">arrow_outward</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[6px] bg-primary group-hover:w-full transition-all duration-[5000ms] linear" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
