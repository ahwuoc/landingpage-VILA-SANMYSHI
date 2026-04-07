"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceItem } from "@/lib/data";
import ConsultationModal from "@/components/ConsultationModal";
import PageHero from "@/components/PageHero";
import { useTranslations, useLocale } from "next-intl";

function ServicesViewInner({ services, id, categorySlug, categoryName, catSlugMap }: {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
  catSlugMap?: Record<string, string>;
}) {
  const t = useTranslations("Services");
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(() => searchParams.get("category") || "all");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const openModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  const categories = useMemo(() => {
    const unique = new Map<string, { name: string; slug: string }>();
    services.forEach(s => {
      if (s.service_categories) {
        const name = s.service_categories.name[locale] || s.service_categories.name['vi'];
        unique.set(name, { name, slug: s.service_categories.slug });
      }
    });
    return Array.from(unique.values());
  }, [services, locale]);

  const filtered = useMemo(() => {
    if (id) return services.filter(s => s.id === id);
    if (activeCategory === "all") return services;
    return services.filter(s => s.service_categories?.slug === activeCategory);
  }, [services, id, activeCategory]);

  const isSingle = !!id && filtered.length === 1;
  const singleService = isSingle ? filtered[0] : null;

  return (
    <div className="bg-surface selection:bg-primary/30 text-on-surface">
      <PageHero
        image={singleService?.image || "/images/services/sea-freight-premium.png"}
        imageAlt={(
          singleService?.title[locale] || singleService?.title['vi']
        ) || t('page_title')}
        overlay="bg-black/30"
        imageOpacity="opacity-60"
        breadcrumb={[
          { label: t('page_title'), href: "/services" },
          ...(categorySlug && categoryName ? [{ label: categoryName, href: `/services/${categorySlug}` }] : []),
          ...(isSingle && singleService ? [{ label: singleService.title[locale] || singleService.title['vi'] }] : [{ label: categoryName || t('breadcrumb_all') }]),
        ]}
        tag={t('hero_tag')}
        title={isSingle
          ? <span dangerouslySetInnerHTML={{ __html: t.raw('hero_title_detail') }} />
          : <span dangerouslySetInnerHTML={{ __html: t.raw('hero_title_list') }} />
        }
      />

      {!isSingle && categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 relative">
          <div className="lg:hidden absolute left-6 top-16 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="lg:hidden absolute right-6 top-16 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
          <div className="flex flex-nowrap lg:flex-wrap gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-scrollbar select-none scroll-smooth">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === "all" ? "bg-primary text-white shadow-glow-primary border-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary border-transparent"} border`}
            >
              {t('filter_all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.slug ? "bg-primary text-white shadow-glow-primary border-primary" : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary border-transparent"} border`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isSingle && singleService ? (
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-12">
                  <span className="inline-block px-5 py-2 bg-primary/10 rounded-full text-xs font-black uppercase tracking-widest text-primary mb-6">
                    {categoryName}
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase">
                    {singleService.title[locale] || singleService.title['vi']}
                  </h1>
                  
                  <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-2xl">
                    <Image
                      src={singleService.image}
                      alt={singleService.title[locale] || singleService.title['vi']}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div 
                    className="prose prose-lg prose-slate max-w-none 
                      prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                      prose-h2:text-3xl prose-h3:text-2xl
                      prose-p:text-slate-600 prose-p:leading-relaxed
                      prose-strong:text-slate-900 prose-strong:font-black
                      prose-li:text-slate-600
                      prose-img:rounded-[2rem] prose-img:shadow-xl
                      prose-table:border-collapse prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4 prose-td:border prose-td:border-slate-100"
                    dangerouslySetInnerHTML={{ __html: singleService.content[locale] || singleService.content['vi'] || "" }}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-96 flex-shrink-0">
                <div className="sticky top-32 space-y-8">
                  <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-glow-dark relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all" />
                    <h3 className="text-2xl font-black mb-4 relative z-10">{t('cta_expert')}</h3>
                    <p className="text-slate-400 mb-8 text-sm leading-relaxed relative z-10">
                      {t('cta_desc')}
                    </p>
                    <button
                      onClick={() => openModal(singleService.title[locale] || singleService.title['vi'])}
                      className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-glow-primary transition-all relative z-10"
                    >
                      {t('cta_expert')}
                    </button>
                    
                    <div className="mt-8 pt-8 border-t border-white/10 space-y-4 relative z-10">
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        {t('sidebar_cta_check1')}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        {t('sidebar_cta_check2')}
                      </div>
                    </div>
                  </div>

                  {/* Related Services Links or Other Info */}
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">{t('category_title')}</h4>
                    <div className="space-y-3">
                      <Link
                        href="/services"
                        className={`block w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === "all" ? "bg-primary text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"}`}
                      >
                        {t('filter_all')}
                      </Link>
                      {categories.map(cat => {
                        return (
                          <Link
                            key={cat.slug}
                            href={`/services/${cat.slug}`}
                            className={`block w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat.slug ? "bg-primary text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-100"}`}
                          >
                            {cat.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((service, index) => {
                    const title = service.title[locale] || service.title['vi'];
                    const content = service.content[locale] || service.content['vi'];

                    return (
                      <Link
                        key={service.id}
                        href={`/services/${categorySlug || service.service_categories?.slug || "all"}/${service.id}`}
                        className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 animate-fade-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Image Wrap */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={service.image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Category Tag */}
                          <div className="absolute top-6 left-6">
                            <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm border border-slate-100">
                              {service.service_categories?.name[locale] || service.service_categories?.name['vi'] || t('page_title')}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-10 flex flex-col flex-1">
                          <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors uppercase">
                            {title}
                          </h3>
                          <div
                            className="text-slate-500 text-sm lg:text-base font-medium line-clamp-3 mb-8 leading-relaxed flex-1"
                            dangerouslySetInnerHTML={{ __html: (content || "").replace(/<[^>]*>/g, "").substring(0, 120) + "..." }}
                          />

                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                              {t('view_solution')}
                            </span>
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                              <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-40 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <span className="material-symbols-outlined text-6xl text-slate-300 mb-6">inventory_2</span>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{t('not_found')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* Global Bottom CTA */}
      <section className="bg-page-dark py-32 lg:py-48 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary rounded-full blur-[200px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-display-md text-on-dark mb-12">
            <span dangerouslySetInnerHTML={{ __html: t.raw('cta_title') }} />
          </h2>
          <p className="text-body-xl text-on-dark-muted mb-12 max-w-2xl mx-auto">
            {t('cta_desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => openModal("General Logistics")}
              className="px-10 py-5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-glow-primary transition-all w-full sm:w-auto"
            >
              {t('cta_expert')}
            </button>
            <button className="px-10 py-5 bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto">
              {t('cta_process')}
            </button>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}

export default function ServicesView(props: {
  services: ServiceItem[];
  id?: string;
  categorySlug?: string;
  categoryName?: string;
  catSlugMap?: Record<string, string>;
}) {
  return (
    <Suspense fallback={null}>
      <ServicesViewInner {...props} />
    </Suspense>
  );
}
