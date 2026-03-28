"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { NEWS_LIST } from "@/constants/news";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  content: string;
}

export default function NewsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 lg:py-48 bg-white overflow-hidden relative">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 lg:mb-32 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">Tin tức & Sự kiện</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
              Cập nhật <span className="text-primary">Thị trường</span>
            </h2>
            <p className="mt-6 text-slate-500 font-medium text-lg lg:text-2xl max-w-2xl leading-relaxed">
              Điểm tin quan trọng về biến động thị trường, chính sách xuất nhập khẩu và các chuyển động chiến lược của Vila Sanmyshi.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all ${canScrollLeft
                ? "border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                : "border-slate-100 text-slate-100 cursor-not-allowed opacity-50"
                }`}
            >
              <span className="material-symbols-outlined text-3xl">west</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all ${canScrollRight
                ? "border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                : "border-slate-100 text-slate-100 cursor-not-allowed opacity-50"
                }`}
            >
              <span className="material-symbols-outlined text-3xl">east</span>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-10 px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2))] no-scrollbar"
      >
        {NEWS_LIST.map((news) => (
          <div
            key={news.id}
            className="flex-none w-[90vw] md:w-[70vw] lg:w-[55vw] snap-center"
          >
            <Link href={`/news/${news.id}`} className="group relative block aspect-[16/10] lg:aspect-[16/9] rounded-[4rem] lg:rounded-[5rem] overflow-hidden bg-slate-900 shadow-2xl">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 70vw, 55vw"
              />

              {/* Complex gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

              {/* Tag / Category overlay */}
              <div className="absolute top-6 left-6 lg:top-12 lg:left-12">
                <div className="flex items-center gap-2 lg:gap-4">
                  <span className="h-[2px] w-4 lg:w-6 bg-primary" />
                  <span className="bg-white/10 backdrop-blur-2xl border border-white/20 text-white px-4 py-2 lg:px-8 lg:py-3 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Date Column */}
              <div className="absolute top-6 right-6 lg:top-12 lg:right-12 text-right">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-white/40 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em]">{news.date.split('/')[2]}</span>
                  <span className="text-white text-lg md:text-5xl font-black leading-none tracking-tighter">{news.date.split('/')[0]} . {news.date.split('/')[1]}</span>
                </div>
              </div>

              {/* Large Immersive Content Overlay */}
              <div className="absolute bottom-6 lg:bottom-20 left-6 lg:left-20 right-6 lg:right-20">
                <h3 className="text-base md:text-4xl lg:text-5xl font-black text-white leading-tight lg:leading-[1.1] tracking-tighter uppercase mb-4 lg:mb-8 group-hover:-translate-y-2 transition-transform duration-700 pr-16 md:pr-0">
                  {news.title}
                </h3>

                <div className="flex flex-row items-center justify-between gap-4 lg:gap-8 lg:translate-y-8 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-1000">
                  <div className="flex items-center gap-2 lg:gap-4">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-white/20 p-0.5 lg:p-1">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                          src={`https://i.pravatar.cc/100?u=${news.id}`}
                          alt={news.author}
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] lg:text-[10px] text-white/40 font-bold uppercase tracking-widest mb-0.5 lg:mb-1">Tác giả</span>
                      <span className="text-white text-[9px] lg:text-xs font-black uppercase tracking-[0.1em] lg:tracking-[0.2em]">{news.author}</span>
                    </div>
                  </div>

                  <div className="group/btn flex items-center gap-3 lg:gap-6 cursor-pointer">
                    <span className="hidden sm:inline text-primary text-[10px] lg:text-xs font-black uppercase tracking-[0.4em]">Đọc bài viết</span>
                    <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-primary text-white flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl lg:text-3xl">arrow_outward</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[6px] bg-primary group-hover:w-full transition-all duration-[3000ms] linear" />
            </Link>
          </div>
        ))}
        {/* Fillers for scroll padding */}
        <div className="flex-none w-32" />
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
