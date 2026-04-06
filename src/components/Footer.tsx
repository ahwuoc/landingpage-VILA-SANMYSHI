"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { COMPANY_INFO, SOCIAL_LINKS, BRAND_NAME } from "@/constants/company";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const nt = useTranslations("Navbar");

  const partners = [
    { name: "Thuế Quảng Trị", icon: "verified_user" },
    { name: "Lao Bảo Border", icon: "hub" },
    { name: "VILA Group", icon: "corporate_fare" },
    { name: "MSC", icon: "directions_boat" },
    { name: "CMA CGM", icon: "anchor" },
  ];

  return (
    <footer className="relative bg-slate-950 text-white pt-16 md:pt-24 lg:pt-32 pb-12 overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer_bg.jpg"
          alt="VILA SANMYSHI Logistics Background"
          fill
          className="object-cover opacity-60 brightness-[0.4] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 mb-12 md:mb-20">
          <div className="lg:col-span-12 xl:col-span-4 space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-1 bg-white/5 backdrop-blur-sm">
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
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href as any}
                  className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon === "facebook_svg" ? (
                    <svg className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ) : social.icon === "zalo_svg" ? (
                    <svg className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M22.107 11.233c-.02-.45-.09-.94-.21-1.37-.42-1.63-1.61-3.03-3.14-3.69-.64-.28-1.34-.45-2.05-.51-.15-.01-.31-.01-.46-.01H6.77c-.15 0-.31 0-.46.01-.7.06-1.4.23-2.05.51-1.53.66-2.72 2.06-3.14 3.69-.12.44-.19.92-.21 1.37-.01.12-.01.25-.01.37V12.1c0 .12 0 .25.01.37.02.45.09.93.21 1.37.23.9.72 1.72 1.38 2.37.21.21.31.28.31.28l-.48 1.63c-.11.38.27.71.6.5l2.09-1.31s.11-.08.28-.21c.21.05.43.1.65.13.15.02.3.02.46.02h8.99c.15 0 .31 0 .46-.02.71-.06 1.4-.23 2.05-.51 1.53-.66 2.72-2.06 3.14-3.69.12-.44.19-.92.21-1.37.01-.12.01-.25.01-.37V11.6c0-.12 0-.25-.01-.37zm-9.01 4.54c-1.4 0-2.43-.59-2.92-1.12l.6-.52c.41.4.1.98 2.08.98 1.57 0 2.22-.64 2.22-1.34 0-.85-.82-1.15-2.04-1.42s-2.47-.7-2.47-1.89c0-1.02.93-1.86 2.38-1.86 1.15 0 2.11.45 2.65.91l-.54.58c-.37-.3-.98-.79-2.02-.79-1.13 0-1.84.51-1.84 1.14 0 .7.81.99 2.15 1.3 1.34.31 2.36.75 2.36 2C15.65 14.83 14.65 15.77 13.1 15.77zM9.5 15.64v-5.2h4.5v.72H10.1v1.44h3.1v.72h-3.1v1.6H14.1v.72H9.5z" />
                    </svg>
                  ) : (
                    <span className="material-symbols-outlined text-[20px] text-white group-hover:text-white group-hover:scale-110 transition-transform">
                      {social.icon as any}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-12 xl:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-6 md:mb-8 border-l-2 border-primary pl-4">{t('nav_title')}</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-col md:space-y-4">
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
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-6 md:mb-8 border-l-2 border-primary pl-4">{t('contact_title')}</h4>
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
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-6 md:mb-8 border-l-2 border-primary pl-4">{t('community_title')}</h4>
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
        <div className="py-8 md:py-12 border-y border-white/5 mb-8 md:mb-12">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-8 gap-y-6 md:gap-10 opacity-70 hover:opacity-100 transition-opacity duration-500">
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
