"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { BRAND_NAME, COMPANY_INFO } from "@/constants/company";
import { useTranslations, useLocale } from "next-intl";
import PageHero from "@/components/PageHero";

export default function AboutView() {
  const t = useTranslations("About");
  const locale = useLocale();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const businessFields = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => t(`business_fields.${i}`));
  const timeline = [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({
    year: t(`timeline.${i}.year`),
    highlight: t(`timeline.${i}.highlight`),
    desc: t(`timeline.${i}.desc`)
  }));
  const stats = [0, 1, 2, 3].map(i => ({
    label: t(`capacity.${i}.label`),
    value: t(`capacity.${i}.value`)
  }));

  return (
    <div className="bg-page text-default pb-20">
      <PageHero
        image="/images/about/office-video-thumb.jpg"
        imageAlt={t('page_title')}
        imageOpacity="opacity-40"
        customOverlay={<>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </>}
        breadcrumb={[{ label: t('hero.title_small') }]}
        title={BRAND_NAME}
        description={t('hero.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
        {/* Video Placeholder (Simple centered) */}
        <div className="text-center space-y-8">
          <h3 className="text-sm lg:text-base font-bold italic text-slate-600 uppercase tracking-widest underline decoration-primary/30 decoration-2 underline-offset-8">
            {t('video_title')}
          </h3>
          <div className="max-w-4xl mx-auto aspect-video bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative group cursor-pointer shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-slate-200 group-hover:bg-primary group-hover:border-primary transition-all">
                <span className="material-symbols-outlined text-slate-900 group-hover:text-white text-3xl">play_arrow</span>
              </div>
            </div>
            <Image
              src="/images/about/office-video-thumb.jpg"
              alt="Highlight Video"
              fill
              className="object-cover opacity-50 group-hover:opacity-70 transition-opacity"
            />
          </div>
        </div>

        {/* Company Profile (List Style) */}
        <div className="max-w-4xl">
          <h2 className="text-heading-lg mb-12 border-l-4 border-primary pl-6 uppercase">
            {t('profile_title')} {BRAND_NAME}:
          </h2>
          <div className="space-y-4 text-body-md">
            {[
              { label: t('info.company_name'), value: COMPANY_INFO.name },
              { label: t('info.main_office'), value: locale === 'en' ? "73 Nguyen Du, Lao Bao, Huong Hoa, Quang Tri" : COMPANY_INFO.address },
              { label: t('info.tax_office'), value: locale === 'en' ? "95 Nguyen Hue, Lao Bao, Huong Hoa, Quang Tri" : COMPANY_INFO.registrationAddress },
              { label: t('info.tax_id'), value: COMPANY_INFO.mst },
              { label: t('info.representative'), value: "Ngo Van Toan (Director)" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-1">
                <span className="text-primary mt-1 font-bold">♦</span>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold whitespace-nowrap">{item.label}:</span>
                  <span className="text-slate-600">{item.value}</span>
                </div>
              </div>
            ))}
            {/* Hardcoded or from constants for licenses */}
            <div className="flex items-start gap-4 py-1">
              <span className="text-primary mt-1 font-bold">♦</span>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-bold whitespace-nowrap">{locale === 'en' ? "Customs Agent License" : "Quyết định công nhận đại lý làm thủ tục Hải quan"}:</span>
                <span className="text-slate-600">Số 1391/QĐ-TCHQ ngày 13/05/2019</span>
              </div>
            </div>
            {[
              { label: t('info.website'), value: COMPANY_INFO.website },
              { label: t('info.phone'), value: COMPANY_INFO.phone },
              { label: t('info.hotline'), value: COMPANY_INFO.hotline },
              { label: t('info.email'), value: COMPANY_INFO.email },
            ].map((item, i) => (
              <div key={`c-${i}`} className="flex items-start gap-4 py-1">
                <span className="text-primary mt-1 font-bold">♦</span>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold whitespace-nowrap">{item.label}:</span>
                  <span className="text-slate-600">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Fields (Simple Grid) */}
        <div>
          <h2 className="text-heading-lg mb-12 border-l-4 border-primary pl-6 uppercase">
            {t('business_fields_title')}:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-12 lg:gap-y-6">
            {businessFields.map((field, i) => (
              <div key={i} className="flex items-start gap-4 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all group">
                <span className="text-primary font-bold text-xl group-hover:scale-110 transition-transform">➡</span>
                <span className="text-body-sm font-bold text-on-surface leading-snug">{field}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Timeline Section */}
      <section className="relative py-24 lg:py-40 mt-24 overflow-hidden group/section bg-slate-50">
        <div className="absolute inset-0 z-0">
          <Image src="/images/about/history-timeline-bg.jpg" alt="Port Background" fill className="object-cover opacity-30 grayscale-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-primary/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-7xl font-black text-slate-900 text-center mb-24 uppercase tracking-tighter">
            {t('timeline_title')}
          </h2>

          <div className="relative">
            {/* Timeline Carousel Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 lg:gap-16 overflow-x-auto pb-12 scroll-smooth no-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Timeline Line */}
              <div
                className="absolute top-[124px] h-[4px] bg-slate-200 z-0 rounded-full"
                style={{ width: `${timeline.length * 400}px` }}
              />

              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-[300px] md:w-[420px] snap-start group animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className="text-8xl lg:text-[12rem] font-black mb-8 tracking-tighter transition-all duration-700 select-none opacity-20 group-hover:opacity-40 group-hover:scale-105 origin-left"
                    style={{
                      WebkitTextStroke: '2px #10b981',
                      color: 'transparent'
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Dot */}
                  <div className="absolute top-[118px] left-0 w-8 h-8 rounded-full bg-white shadow-xl z-20 border-[6px] border-primary flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                  </div>

                  {/* Content Card */}
                  <div className="mt-24 p-8 lg:p-10 rounded-[3rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 group-hover:border-primary/20 group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden z-10 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)]">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />

                    <div className="space-y-4">
                      <div className="text-primary font-black text-2xl lg:text-3xl tracking-tight">
                        {item.year}
                      </div>
                      <h4 className="text-xl lg:text-2xl font-black text-slate-900 leading-tight">
                        {item.highlight}
                      </h4>
                      <p className="text-sm lg:text-base font-medium text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scroll('left')}
              className="absolute top-[110px] -left-4 md:-left-8 z-20 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 hover:bg-primary hover:text-white transition-all cursor-pointer opacity-0 group-hover/section:opacity-100 text-slate-600"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute top-[110px] -right-4 md:-right-8 z-20 flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 hover:bg-primary hover:text-white transition-all cursor-pointer opacity-0 group-hover/section:opacity-100 text-slate-600"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 mt-24">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl lg:text-5xl font-black text-on-surface tracking-tighter mb-2">{stat.value}</div>
              <div className="text-label-md text-faint">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-6">
            <h3 className="text-heading-sm">{t('vision.title')}</h3>
            <p className="text-body-md text-muted">{t('vision.content')}</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-heading-sm">{t('mission.title')}</h3>
            <p className="text-body-md text-muted">{t('mission.content')}</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-page-dark rounded-[2rem] lg:rounded-[4rem] p-12 lg:p-24 text-center">
          <h2 className="text-heading-xl text-on-dark mb-8">
            {t('cta.title')}
          </h2>
          <p className="text-body-lg text-on-dark-muted mb-12 max-w-2xl mx-auto">
            {t('cta.desc')}
          </p>
          <Link href="/contact" className="inline-block bg-primary text-on-primary px-12 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-glow-primary">
            {t('cta.btn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
