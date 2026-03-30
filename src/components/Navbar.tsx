"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useResponsive } from "@/hooks/useResponsive";
import { BRAND_NAME } from "@/constants/company";
import ConsultationModal from "./ConsultationModal";

interface NavService { name: string; href: string; category?: string; categorySlug?: string; }

export default function Navbar({ navServices = [] }: { navServices?: NavService[] }) {
  const pathname = usePathname();
  const { isDesktop } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesByCategory = navServices.reduce((acc, s) => {
    const cat = s.category || "Dịch vụ";
    if (!acc[cat]) acc[cat] = { slug: s.categorySlug || "", items: [] };
    acc[cat].items.push(s);
    return acc;
  }, {} as Record<string, { slug: string; items: NavService[] }>);

  const navLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dịch vụ", href: "/services", dropdown: navServices },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact" },
  ];

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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <nav className={`fixed top-0 w-full z-[120] transition-all duration-300 ${isOpen ? 'bg-transparent shadow-none border-none' : 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-100/50'}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20 md:h-28 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 lg:gap-6 group shrink-0 relative z-[110]">
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl shadow-xl group-hover:shadow-glow-primary transition-all duration-700">
              <Image
                src="/images/logo.jpg"
                alt="Logo VILA SANMYSHI"
                fill
                className="object-contain"
                priority
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <h2 className={`text-lg md:text-xl lg:text-2xl font-black tracking-tight text-primary leading-none mb-1`}>{BRAND_NAME.split(' ')[0]} <span className={`transition-colors duration-300 ${isOpen ? 'text-on-dark' : 'text-default'}`}>{BRAND_NAME.split(' ').slice(1).join(' ')}</span></h2>
              <span className="text-label-sm text-faint opacity-80">IMPORT-EXPORT</span>
            </div>
          </Link>

          {/* Desktop Links */}
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
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 px-3 mb-3">Danh mục dịch vụ</p>
                      <div className="grid grid-cols-1 gap-1">
                        {Object.entries(servicesByCategory).map(([cat, { slug, items }]) => (
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
                              ? <span className="text-[10px] text-on-surface-variant/40 font-bold">{items.filter(i => i.name).length} dịch vụ</span>
                              : <span className="text-[10px] text-amber-500 font-bold italic">Sắp ra mắt</span>
                            }
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-on-surface/5">
                        <Link href="/services" className="flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                          Xem tất cả <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`hidden sm:block bg-primary text-white px-5 py-2.5 lg:px-6 lg:py-3 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-glow-primary hover:scale-[0.98] transition-all active:scale-95 duration-200 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Tư vấn ngay
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110] relative focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`w-7 h-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[8px] bg-on-dark' : 'bg-default'}`}
              />
              <span
                className={`w-7 h-[2px] rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0 bg-on-dark' : 'opacity-100 bg-default'}`}
              />
              <span
                className={`w-7 h-[2px] rounded-full transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[8px] bg-on-dark' : 'bg-default'}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Fixed to cover everything */}
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
                  <div className="flex flex-col gap-4 mt-6 ml-4 border-l-2 border-primary/20 pl-6 animate-fade-in">
                    {link.dropdown?.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="text-lg md:text-xl font-black text-on-dark-muted hover:text-on-dark transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`mt-auto pt-10 border-t border-white/10 space-y-8 transition-all duration-700 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-label-md text-on-dark-faint">Hotline 24/7</span>
              <a href="tel:0913497246" className="text-2xl font-black text-on-dark hover:text-primary transition-colors">0913 497 246</a>
            </div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="bg-primary text-white p-6 rounded-full font-black text-xs uppercase tracking-widest shadow-glow-primary"
            >
              Tư vấn
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
