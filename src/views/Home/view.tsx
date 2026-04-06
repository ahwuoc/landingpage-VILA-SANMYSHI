import Counter from "@/components/Counter";
import Image from "next/image";
import {Link} from "@/i18n/routing";
import HeroCarousel from "@/components/HeroCarousel";
import CoreValues from "@/components/CoreValues";
import NewsSlider from "@/components/NewsSlider";
import HomeServices from "@/components/HomeServices";
import HomeStats from "@/components/HomeStats";
import PartnerSection from "@/components/PartnerSection";
import { HeroSlide } from "@/lib/data";
import {useTranslations} from 'next-intl';

export default function HomeView({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations('Index');

  return (
    <div className="bg-surface selection:bg-primary-container/30">
      <HeroCarousel slides={slides} />

      <HomeServices />
      <HomeStats />
      <CoreValues />
      <NewsSlider />
      <PartnerSection />

      {/* CTA Section */}
      <section className="py-24 lg:py-40 text-center max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-on-surface tracking-tight mb-8 lg:mb-12 uppercase leading-[1.1]">
          {t('cta_title')}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
          <Link href="/contact" className="bg-primary text-on-primary px-10 py-5 lg:px-12 lg:py-6 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[0.98] transition-all duration-300">
            {t('cta_button_contact')}
          </Link>
          <Link href="/services" className="bg-surface-container-high text-on-surface px-10 py-5 lg:px-12 lg:py-6 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] hover:bg-on-surface hover:text-white transition-all duration-300 border border-on-surface/5">
            {t('cta_button_services')}
          </Link>
        </div>
      </section>
    </div>
  );
}
