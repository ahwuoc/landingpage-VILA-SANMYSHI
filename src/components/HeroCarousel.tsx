"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/constants/home";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative h-[85vh] min-h-[800px] lg:min-h-[900px] w-full overflow-hidden flex items-center bg-primary pt-40 md:pt-56 lg:pt-64 pb-32 md:pb-40 lg:pb-48">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.tag}
            fill
            priority={index === 0}
            className={`object-cover ${index === current ? 'scale-105' : 'scale-100'} transition-transform duration-[7s] ease-linear`}
            sizes="100vw"
          />
          {/* Overlay tối nhẹ nhất có thể */}
          <div className="absolute inset-0 bg-black/25" />
        </div>
      ))}

      {/* Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`${index === current ? 'block animate-fade-in' : 'hidden'
              } max-w-3xl`}
          >
            <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md text-primary-fixed px-4 py-2 rounded-full text-xs lg:text-sm font-black tracking-[0.3em] uppercase mb-8 border border-primary/30">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              {slide.tag}
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-on-dark mb-6 md:mb-10 leading-[0.9] text-balance uppercase [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
              dangerouslySetInnerHTML={{ __html: slide.title }}
            />
            <p className="text-lg md:text-xl lg:text-2xl text-on-dark leading-relaxed mb-8 md:mb-12 max-w-xl font-medium [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <button className="bg-primary text-on-primary px-6 py-4 md:px-10 md:py-6 rounded-xl md:rounded-2xl font-black text-sm md:text-base lg:text-lg uppercase tracking-wider hover:shadow-glow-primary transition-all active:scale-95 duration-300">
                {slide.ctaPrimary}
              </button>
              <button className="bg-on-dark/10 backdrop-blur-xl border border-on-dark/20 text-on-dark px-6 py-4 md:px-10 md:py-6 rounded-xl md:rounded-2xl font-black text-sm md:text-base lg:text-lg uppercase tracking-wider hover:bg-on-dark/20 transition-all duration-300">
                {slide.ctaSecondary}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-30 scale-90 md:scale-100">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-on-dark/10 backdrop-blur-md border border-on-dark/20 text-on-dark hover:bg-primary hover:text-on-primary transition-all"
        >
          <span className="material-symbols-outlined text-sm font-bold">west</span>
        </button>

        <div className="flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => i !== current && setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-primary' : 'w-4 bg-on-dark/30 hover:bg-on-dark/50'}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-on-dark/10 backdrop-blur-md border border-on-dark/20 text-on-dark hover:bg-primary hover:text-on-primary transition-all"
        >
          <span className="material-symbols-outlined text-sm font-bold">east</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s forwards ease-out;
        }
      `}</style>
    </section>
  );
}
