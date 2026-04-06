"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useResponsive } from "@/hooks/useResponsive";
import { BRAND_NAME, COMPANY_INFO } from "@/constants/company";
import ConsultationModal from "./ConsultationModal";
import { useLocale, useTranslations } from "next-intl";
import { ADMIN_LANGS as LANGUAGES } from "@/constants/languages";

interface NavService { name: string; href: string; category?: string; categorySlug?: string; }

export default function Navbar({ navServices = [] }: { navServices?: NavService[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const servicesByCategory = navServices.reduce((acc, svc) => {
    const cat = svc.category || t('other_services');
    if (!acc[cat]) acc[cat] = { slug: svc.categorySlug || "", items: [] };
    acc[cat].items.push(svc);
    return acc;
  }, {} as Record<string, { slug: string; items: NavService[] }>);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services", dropdown: navServices },
    { name: t("news"), href: "/news" },
    { name: t("contact"), href: "/contact" },
  ];

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setIsLangOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname, isDesktop]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <nav className={`fixed top-0 w-full z-[120] transition-all duration-500 ${isOpen ? 'bg-transparent shadow-none border-none' : (isScrolled ? 'bg-white/95 backdrop-blur-2xl shadow-md border-b border-slate-100/50' : 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-100/50')}`}>
        {/* Top Bar - Hides on scroll for a focused experience */}
        <div className={`hidden sm:block bg-primary text-white border-b border-primary-variant/20 transition-all duration-500 ease-in-out ${isScrolled ? 'h-0 opacity-0 overflow-hidden border-none' : 'h-10 opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-6 h-10 flex justify-between items-center text-[10px] lg:text-xs font-black tracking-widest uppercase">
            <div className={`flex items-center gap-6 transition-transform duration-500 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
              <a href={`tel:${COMPANY_INFO.hotline}`} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <span className="material-symbols-outlined text-sm">call</span>
                {t('hotline')}: {COMPANY_INFO.hotline.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="hidden md:flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <span className="material-symbols-outlined text-sm">mail</span>
                {COMPANY_INFO.email}
              </a>
            </div>
            <div className={`flex items-center gap-6 transition-transform duration-500 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
              <span className="hidden xl:flex items-center gap-1.5 italic opacity-90">
                <span className="material-symbols-outlined text-sm animate-pulse">verified_user</span>
                {t('topbar_slogan')}
              </span>

              <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

              {/* Language Switcher Dropdown (Moved to Top Bar) */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all font-black text-[10px] tracking-widest uppercase"
                >
                  <span className="text-sm leading-none">{LANGUAGES.find(l => l.id === locale)?.icon}</span>
                  <span className="leading-none">{locale.toUpperCase()}</span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {isLangOpen && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-44 bg-card shadow-2xl rounded-2xl p-2 border border-on-surface/5 animate-fade-in origin-top-right z-[150]">
                    <div className="flex flex-col gap-1">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => changeLanguage(lang.id)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${locale === lang.id ? 'bg-primary/5 text-primary' : 'hover:bg-section text-on-surface-variant'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base grayscale-[0.2] group-hover:grayscale-0 font-normal">{lang.icon}</span>
                            <span className="text-[11px] font-black tracking-tight uppercase">{lang.label}</span>
                          </div>
                          {locale === lang.id && (
                            <span className="material-symbols-outlined text-base">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`flex justify-between items-center max-w-7xl mx-auto px-6 transition-all duration-500 ${isScrolled ? 'h-20 lg:h-24' : 'h-24 md:h-28 lg:h-32'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 lg:gap-6 group shrink-0 relative z-[110]">
            <div className={`relative transition-all duration-500 drop-shadow-md ${isScrolled ? 'w-20 h-20 lg:w-24 lg:h-24' : 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'}`}>
              <Image
                src="/images/logo.jpg"
                alt="Logo VILA SANMYSHI"
                fill
                className="object-contain"
                priority
                loading="eager"
              />
            </div>
            {/* <div className="flex flex-col">
              <h2 className={`text-lg md:text-xl lg:text-2xl font-black tracking-tight text-primary leading-none mb-1`}>{BRAND_NAME.split(' ')[0]} <span className={`transition-colors duration-300 ${isOpen ? 'text-on-dark' : 'text-default'}`}>{BRAND_NAME.split(' ').slice(1).join(' ')}</span></h2>
              <span className="text-label-sm text-faint opacity-80 uppercase">{t('brand_tag')}</span>
            </div> */}
          </Link>
          <div className="hidden lg:flex items-center space-x-8 font-black text-base tracking-tight h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const hasDropdown = !!link.dropdown;
              const isDropdownActive = activeDropdown === link.name;
              return (
                <div
                  key={link.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`transition-all duration-200 py-1.5 px-1 relative group flex items-center gap-1 ${isActive || isDropdownActive
                      ? "text-primary font-bold"
                      : "text-muted hover:text-primary"
                      }`}
                  >
                    {link.name}
                    {hasDropdown && (
                      <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isDropdownActive ? 'rotate-180' : ''}`}>expand_more</span>
                    )}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && isDropdownActive && (
                    <div className="absolute top-full left-0 w-72 bg-card shadow-2xl rounded-2xl p-4 border border-on-surface/5 animate-fade-in origin-top">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 px-3 mb-3">{t('category_title')}</p>
                      <div className="grid grid-cols-1 gap-1">
                        {Object.entries(servicesByCategory)
                          .filter(([cat]) => cat !== t('other_services'))
                          .sort(([a], [b]) => a.localeCompare(b))
                          .map(([cat, { slug, items }]) => (
                            <Link
                              key={cat}
                              href={`/services/${slug}`}
                              className="p-3 rounded-xl hover:bg-section transition-colors text-default hover:text-primary font-black text-sm flex items-center justify-between group/sub"
                            >
                              <span className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-primary/40 group-hover/sub:bg-primary transition-colors" />
                                {cat}
                              </span>
                              {items.filter(i => i.name).length > 0
                                ? <span className="text-[10px] text-on-surface-variant/40 font-bold">{items.filter(i => i.name).length} {t('services_count')}</span>
                                : <span className="text-[10px] text-amber-500 font-bold italic">{t('coming_soon')}</span>
                              }
                            </Link>
                          ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-on-surface/5">
                        <Link href="/services" className="flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                          {t('all_services')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`hidden sm:block bg-primary text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-glow-primary hover:scale-[0.98] transition-all active:scale-95 duration-200 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              {t('consult')}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110] relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`w-7 h-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[8px] bg-white' : 'bg-slate-800'}`} />
              <span className={`w-7 h-[2px] rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0 bg-white' : 'opacity-100 bg-slate-800'}`} />
              <span className={`w-7 h-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[8px] bg-white' : 'bg-slate-800'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 w-full h-full bg-inverse-surface/90 backdrop-blur-2xl z-[110] lg:hidden transition-all duration-500 ease-in-out px-8 pt-32 pb-12 overflow-y-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col gap-6 mt-8">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const hasDropdown = !!link.dropdown;
            const isSubOpen = activeDropdown === link.name;

            return (
              <div key={link.name} className="flex flex-col">
                <div className="flex items-center justify-between group">
                  <Link
                    href={link.href}
                    style={{ transitionDelay: isOpen ? `${i * 100}ms` : '0ms' }}
                    className={`text-3xl md:text-5xl font-black tracking-tight uppercase transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      } ${isActive ? "text-primary placeholder-pulse" : "text-white hover:text-primary"
                      }`}
                  >
                    {link.name}
                  </Link>
                  {hasDropdown && (
                    <button
                      onClick={() => setActiveDropdown(isSubOpen ? null : link.name)}
                      className="w-12 h-12 flex items-center justify-center text-white/50"
                    >
                      <span className={`material-symbols-outlined text-3xl transition-transform ${isSubOpen ? 'rotate-180 text-primary' : ''}`}>expand_more</span>
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {hasDropdown && isSubOpen && (
                  <div className="flex flex-col gap-6 mt-6 ml-4 border-l-2 border-primary/20 pl-6 animate-fade-in">
                    {Object.entries(servicesByCategory)
                      .filter(([cat]) => cat !== t('other_services'))
                      .map(([cat, { slug }]) => (
                        <Link
                          key={cat}
                          href={`/services/${slug}`}
                          className="text-xl md:text-2xl font-black text-on-dark-muted hover:text-primary transition-colors flex items-center justify-between group/sub"
                        >
                          {cat}
                        </Link>
                      ))}
                    <Link
                      href="/services"
                      className="text-lg font-black text-primary uppercase tracking-[0.2em] mt-2 flex items-center gap-2"
                    >
                      {t('all_services')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`mt-auto pt-10 border-t border-white/10 space-y-8 transition-all duration-700 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">Language</span>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    changeLanguage(lang.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${locale === lang.id
                    ? 'bg-primary border-primary text-white shadow-glow-primary'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                >
                  <span className="text-lg">{lang.icon}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-label-md text-on-dark-faint">{t('hotline')}</span>
              <a href="tel:0913497246" className="text-2xl font-black text-on-dark hover:text-primary transition-colors">0913 497 246</a>
            </div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="bg-primary text-white p-6 rounded-full font-black text-xs uppercase tracking-widest shadow-glow-primary"
            >
              {t('consult')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
