"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeroSlide } from "@/lib/data";
import ConsultationModal from "@/components/ConsultationModal";
import { useLocale } from "next-intl";

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>();
  const router = useRouter();
  const locale = useLocale();

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

  if (!slides || !slides.length) return null;

  return (
    <section className="relative h-[85vh] min-h-[800px] lg:min-h-[900px] w-full overflow-hidden flex items-center bg-slate-900 pt-40 md:pt-56 lg:pt-64 pb-32 md:pb-40 lg:pb-48">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.tag[locale] || slide.tag['vi']}
            fill
            priority={index === 0}
            className={`object-cover ${index === current ? 'scale-105' : 'scale-100'} transition-transform duration-[7s] ease-linear`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
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
                } max-w-3xl`}
            >
              <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md text-primary-fixed px-4 py-2 rounded-full text-xs lg:text-sm font-black tracking-[0.3em] uppercase mb-8 border border-primary/30">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                {tag}
              </span>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-on-dark mb-6 md:mb-10 leading-[0.9] text-balance uppercase [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.8))]"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p className="text-lg md:text-xl lg:text-2xl text-on-dark leading-relaxed mb-8 md:mb-12 max-w-xl font-medium [text-shadow:0_2px_20px_rgba(0,0,0,0.9),0_4px_40px_rgba(0,0,0,0.7)]">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <button
                  onClick={() => handleCta(slide.cta_primary_action, slide.cta_primary_href, slide.cta_primary_service)}
                  className="bg-primary text-on-primary px-6 py-4 md:px-10 md:py-6 rounded-xl md:rounded-2xl font-black text-sm md:text-base lg:text-lg uppercase tracking-wider hover:shadow-glow-primary transition-all active:scale-[0.98] duration-300 shadow-xl">
                  {cta_primary}
                </button>
                {cta_secondary && (
                  <button
                    onClick={() => handleCta(slide.cta_secondary_action, slide.cta_secondary_href, slide.cta_secondary_service)}
                    className="bg-on-dark/10 backdrop-blur-xl border border-on-dark/20 text-on-dark px-6 py-4 md:px-10 md:py-6 rounded-xl md:rounded-2xl font-black text-sm md:text-base lg:text-lg uppercase tracking-wider hover:bg-on-dark/20 transition-all duration-300">
                    {cta_secondary}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-30 scale-90 md:scale-100">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-on-dark/10 backdrop-blur-md border border-on-dark/20 text-on-dark hover:bg-primary hover:text-on-primary transition-all group active:scale-90"
        >
          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-[-2px] transition-transform">west</span>
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => i !== current && setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-primary shadow-glow-primary' : 'w-4 bg-on-dark/30 hover:bg-on-dark/50'}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-on-dark/10 backdrop-blur-md border border-on-dark/20 text-on-dark hover:bg-primary hover:text-on-primary transition-all group active:scale-90"
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
