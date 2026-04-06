"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { COMPANY_INFO, SOCIAL_LINKS, BRAND_NAME } from "@/constants/company";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const nt = useTranslations("Navbar");

  const partners = [
    { name: "Thuế Quảng Trị", icon: "shield" },
    { name: "Lao Bảo Border", icon: "sailing" },
    { name: "VILA Group", icon: "corporate_fare" },
    { name: "MSC", icon: "directions_boat" },
    { name: "CMA CGM", icon: "package_2" },
  ];

  return (
    <footer className="relative bg-slate-950 text-white pt-24 lg:pt-32 pb-12 overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer_bg.jpg"
          alt="VILA SANMYSHI Logistics Background"
          fill
          className="object-cover opacity-70 brightness-50 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-12 xl:col-span-4 space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-1 bg-white/5 backdrop-blur-sm">
                <img src={COMPANY_INFO.logo} alt={`Logo ${COMPANY_INFO.name}`} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-black tracking-tighter leading-none uppercase text-white">
                  {BRAND_NAME.split(' ')[0]} <span className="text-primary italic">{BRAND_NAME.split(' ').slice(1).join(' ')}</span>
                </h3>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] leading-none mt-2">
                  {t('solution')}
                </p>
              </div>
            </div>
            <p className="text-white text-sm lg:text-base leading-relaxed max-w-sm font-medium">
              {t('about_text')}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href as any}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[18px] text-white group-hover:text-white group-hover:scale-110 transition-transform">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-12 xl:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-8 border-l-2 border-primary pl-4">{t('nav_title')}</h4>
            <ul className="space-y-4">
              {[
                { name: nt("home"), href: "/" },
                { name: nt("about"), href: "/about" },
                { name: nt("services"), href: "/services" },
                { name: nt("news"), href: "/news" },
                { name: nt("contact"), href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href as any} className="text-sm font-bold text-white hover:text-primary transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-12 xl:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-8 border-l-2 border-primary pl-4">{t('contact_title')}</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <span className="material-symbols-outlined text-primary text-xl shrink-0">location_on</span>
                <div className="text-sm font-bold text-white leading-snug">
                  {COMPANY_INFO.address.split(',').slice(0, 2).join(',')}, <br />
                  <span className="text-white font-medium text-xs opacity-80">{COMPANY_INFO.address.split(',').slice(2).join(',')}</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="material-symbols-outlined text-primary text-xl shrink-0">call</span>
                <div>
                  <span className="text-sm font-black text-white block mb-1">{COMPANY_INFO.phone}</span>
                  <span className="text-[10px] text-white font-bold uppercase tracking-widest opacity-60">{COMPANY_INFO.representative}</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <span className="material-symbols-outlined text-primary text-xl shrink-0">mail</span>
                <span className="text-sm font-bold text-white truncate hover:text-primary transition-colors cursor-pointer">{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Map/Facebook Embed Column */}
          <div className="lg:col-span-12 xl:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-8 border-l-2 border-primary pl-4">{t('community_title')}</h4>
            <div className="bg-white/5 rounded-[2rem] p-1.5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61580846237727&tabs=timeline&width=340&height=220&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="220"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="rounded-[1.75rem] brightness-90 contrast-110"
              />
            </div>
          </div>
        </div>

        {/* Partners Showcase */}
        <div className="py-12 border-y border-white/5 mb-12">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-10 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-2 group transition-all">
                <span className="material-symbols-outlined text-white text-base group-hover:text-primary transition-colors">{p.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover:text-primary transition-colors">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4 pb-8">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest text-center md:text-left opacity-60">
            {t('copyright', { year: new Date().getFullYear(), company: COMPANY_INFO.shortName })}
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] font-black text-white hover:text-primary transition-colors uppercase tracking-widest opacity-60">{t('privacy')}</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2.5 text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all shadow-glow-primary/10"
            >
              {t('back_to_top')}
              <span className="material-symbols-outlined text-xs group-hover:-translate-y-1 transition-transform">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
