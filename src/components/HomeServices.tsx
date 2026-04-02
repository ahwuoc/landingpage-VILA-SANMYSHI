"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const GRADIENTS: Record<string, string> = {
  "sea-freight": "from-blue-500 to-indigo-600",
  "cross-border": "from-primary to-emerald-500",
  "logistics-fulfillment": "from-slate-700 to-slate-900",
};

export default function HomeServices() {
  const [services, setServices] = useState<{ id: string; title: string; image: string; category?: string }[]>([]);
  const [catSlugMap, setCatSlugMap] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    supabase
      .from("service_categories")
      .select("name, slug")
      .then(({ data }) => {
        if (data) setCatSlugMap(Object.fromEntries(data.map(c => [c.name, c.slug])));
      });

    supabase
      .from("services")
      .select("id, title, image, category")
      .order("created_at", { ascending: true })
      .then(({ data }) => setServices(data || []));
  }, []);

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
  }, [checkScroll, services]);

  const scrollFn = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (direction === "right" && scrollLeft >= scrollWidth - clientWidth - 20) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  }, []);

  const scroll = scrollFn;

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => scrollFn("right"), 4000);
  }, [scrollFn]);

  useEffect(() => {
    if (services.length === 0) return;
    startAutoScroll();
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, [services, startAutoScroll]);

  return (
    <section className="py-24 lg:py-48 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight leading-tight uppercase mb-6">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-on-surface-variant font-medium text-lg lg:text-xl leading-relaxed">
              Giải pháp vận tải và khai báo hải quan chuyên nghiệp, giúp tối ưu hóa thời gian và chi phí cho doanh nghiệp.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 flex items-center justify-center transition-all ${canScrollLeft
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-slate-200 text-slate-200 cursor-not-allowed"
                }`}
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl">west</span>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 flex items-center justify-center transition-all ${canScrollRight
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-slate-200 text-slate-200 cursor-not-allowed"
                }`}
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl">east</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={scrollRef}
          onMouseEnter={() => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); }}
          onMouseLeave={() => startAutoScroll()}
          onTouchStart={() => startAutoScroll()}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 lg:gap-10 py-10 px-4 -mx-4"
        >
          {services.map((item) => (
            <Link
              key={item.id}
              href={`/services/${catSlugMap[item.category || ""] || "all"}/${item.id}`}
              className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 block flex-none w-[85vw] md:w-[45vw] lg:w-[30vw] snap-center"
            >
              {/* Image Wrap */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image || "/images/services/sea-freight-premium.png"}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 30vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm lg:text-base font-medium line-clamp-2 mb-8 leading-relaxed">
                  Giải pháp logistics chuyên nghiệp, tối ưu hóa thời gian và chi phí cho mọi lô hàng.
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                    Chi tiết
                  </span>
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex-none w-32" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-[0.98] transition-all shadow-lg"
        >
          Xem tất cả dịch vụ
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
