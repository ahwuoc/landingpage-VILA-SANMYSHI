"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeroSlide } from "@/lib/data";
import ConsultationModal from "@/components/ConsultationModal";
import { useLocale } from "next-intl";
import { useResponsive } from "@/hooks/useResponsive";

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>();
  const router = useRouter();
  const locale = useLocale();
  const { mounted } = useResponsive();

  const openModal = (service?: string) => {
    setModalService(service);
    setModalOpen(true);
  };

  const handleCta = (action?: string, href?: string, service?: string) => {
    if (action === "modal") openModal(service);
    else if (href) router.push(href);
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning || !slides.length) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || !slides.length) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (!mounted || !slides || !slides.length) return <div className="h-[85vh] bg-slate-900" />;

  return (
    <section className="relative flex h-[85vh] min-h-[700px] w-full items-center overflow-hidden bg-brand-950 pb-24 pt-32 landscape:h-screen landscape:min-h-0 landscape:pb-8 landscape:pt-20 md:pb-32 md:pt-48 lg:min-h-[800px] lg:pb-36 lg:pt-56">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.tag[locale] || slide.tag['vi']}
            fill
            preload={index === 0}
            loading={index === 0 ? undefined : "lazy"}
            decoding="async"
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/45 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-8">
        {slides.map((slide, index) => {
          const title = slide.title[locale] || slide.title['vi'];
          const subtitle = slide.subtitle[locale] || slide.subtitle['vi'];
          const tag = slide.tag[locale] || slide.tag['vi'];
          const cta_primary = slide.cta_primary[locale] || slide.cta_primary['vi'];
          const cta_secondary = slide.cta_secondary ? (slide.cta_secondary[locale] || slide.cta_secondary['vi']) : null;

          return (
            <div
              key={slide.id}
              className={`${index === current ? 'block animate-fade-in' : 'hidden'
                } max-w-6xl md:max-w-5xl lg:max-w-6xl`}
            >
              <span className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/70 md:mb-8">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {tag}
              </span>
              {index === 0 ? (
                <h1
                  className="mb-7 max-w-5xl text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white landscape:mb-3 landscape:text-3xl"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              ) : (
                <div
                  className="mb-7 max-w-5xl text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white landscape:mb-3 landscape:text-3xl"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              <p className="mb-9 max-w-3xl text-base font-normal leading-7 text-white/75 landscape:mb-4 landscape:text-sm md:text-lg md:leading-8">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="rounded-xl bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700 md:px-9"
                >
                  {cta_primary}
                </button>
                {cta_secondary && (
                  <button
                    onClick={() => handleCta(slide.cta_secondary_action, slide.cta_secondary_href, slide.cta_secondary_service)}
                    className="rounded-xl border border-white/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 md:px-9">
                    {cta_secondary}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-30 scale-75 md:scale-100">
        <button
          onClick={prevSlide}
          className="group grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-[-2px] transition-transform">west</span>
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => i !== current && setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-primary' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="group grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-[2px] transition-transform">east</span>
        </button>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={modalService}
      />
    </section>
  );
}
