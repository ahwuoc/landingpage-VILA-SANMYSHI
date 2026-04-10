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
    <section className="relative h-[85vh] min-h-[700px] lg:min-h-[850px] landscape:h-screen landscape:min-h-0 w-full overflow-hidden flex items-center bg-slate-900 pt-32 md:pt-48 lg:pt-64 pb-24 md:pb-32 lg:pb-48 landscape:pt-20 landscape:pb-8">
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
                } max-w-6xl md:max-w-5xl lg:max-w-6xl`}
            >
              <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md text-primary-fixed px-6 py-2.5 rounded-full text-[10px] md:text-sm lg:text-base font-black tracking-[0.2em] md:tracking-[0.4em] uppercase mb-6 md:mb-10 border border-primary/30">
                <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse-glow" />
                {tag}
              </span>
              {index === 0 ? (
                <h1
                  className="text-[clamp(2rem,7vw,4rem)] md:text-[clamp(4.5rem,9vw,7rem)] lg:text-[clamp(6.5rem,11vw,10rem)] landscape:text-2xl md:landscape:text-3xl font-black tracking-tighter text-on-dark mb-6 md:mb-12 landscape:mb-3 leading-[0.95] text-balance uppercase [filter:drop-shadow(0_4px_16px_rgba(0,0,0,0.6))]"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              ) : (
                <div
                  className="text-[clamp(2rem,7vw,4rem)] md:text-[clamp(4.5rem,9vw,7rem)] lg:text-[clamp(6.5rem,11vw,10rem)] landscape:text-2xl md:landscape:text-3xl font-black tracking-tighter text-on-dark mb-6 md:mb-12 landscape:mb-3 leading-[0.95] text-balance uppercase [filter:drop-shadow(0_4px_16px_rgba(0,0,0,0.6))]"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              <p className="text-base md:text-2xl lg:text-4xl landscape:text-sm md:landscape:text-base text-on-dark leading-relaxed mb-8 md:mb-16 landscape:mb-4 max-w-4xl font-medium [text-shadow:0_2px_20px_rgba(0,0,0,0.9),0_4px_40px_rgba(0,0,0,0.7)] opacity-100">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4 md:gap-8">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-primary text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-xs md:text-base uppercase tracking-widest shadow-glow-primary hover:scale-[1.05] transition-all active:scale-95 duration-300"
                >
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
      <div className="absolute bottom-6 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-30 scale-75 md:scale-100">
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
