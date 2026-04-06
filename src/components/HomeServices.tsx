"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function HomeServices() {
  const t = useTranslations("Home.services");
  const locale = useLocale();
  const [services, setServices] = useState<{ id: string; title: Record<string, string>; image: string; category?: string }[]>([]);
  const [catSlugMap, setCatSlugMap] = useState<Record<string, string>>({});
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("service_categories")
      .select("name, slug, name_json")
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach(c => {
            const name = typeof c.name === 'object' ? (c.name[locale] || c.name['vi']) : c.name;
            map[name] = c.slug;
          });
          setCatSlugMap(map);
        }
      });
    supabase
      .from("services")
      .select("id, title, image, category")
      .order("created_at", { ascending: true })
      .then(({ data }) => setServices(data || []));
  }, [locale]);

  return (
    <section className="py-24 lg:py-48 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight leading-tight uppercase mb-6">
              {t('title')}
            </h2>
            <p className="text-on-surface-variant font-medium text-lg lg:text-xl leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl">west</span>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-2xl lg:text-3xl">east</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={1.2}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="rounded-[2.5rem]"
        >
          {services.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto flex">
              <Link
                href={`/services/${catSlugMap[item.category || ""] || "all"}/${item.id}`}
                className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 w-full"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                  <Image
                    src={item.image || "/images/services/sea-freight-premium.png"}
                    alt={(item.title[locale] || item.title['vi']) || "VILA SANMYSHI service"}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] md:min-h-[4rem]">
                    {item.title[locale] || item.title['vi']}
                  </h3>
                  <p className="text-slate-500 text-sm lg:text-base font-medium line-clamp-2 mb-8 leading-relaxed">
                    {t('item_default_desc')}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                      {t('view_details')}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-[0.98] transition-all shadow-lg"
        >
          {t('view_all')}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
