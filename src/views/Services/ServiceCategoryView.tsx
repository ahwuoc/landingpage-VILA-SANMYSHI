"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { ServiceItem } from "@/lib/data";
import PageHero from "@/components/PageHero";
import { useTranslations, useLocale } from "next-intl";

export default function ServiceCategoryView({ services, categorySlug, categoryName }: {
  services: ServiceItem[];
  categorySlug: string;
  categoryName: string;
}) {
  const t = useTranslations("Services");
  const locale = useLocale();
  const [search, setSearch] = useState("");

  const filtered = services.filter(s => {
    const title = (s.title[locale] || s.title['vi'] || "").toLowerCase();
    const content = (s.content[locale] || s.content['vi'] || "").toLowerCase();
    const searchLower = search.toLowerCase();
    return title.includes(searchLower) || content.includes(searchLower);
  });

  return (
    <div className="bg-surface text-on-surface">
      <PageHero
        image={services[0]?.image || "/images/services/sea-freight-premium.png"}
        imageAlt={categoryName}
        overlay="bg-brand-950/60"
        imageOpacity="opacity-60"
        breadcrumb={[
          { label: t('page_title'), href: "/services" },
          { label: categoryName },
        ]}
        tag="VILA SANMYSHI LOGISTICS"
        title={<>{t('category_label')} <br /><span className="text-primary">{categoryName}</span></>}
        description={t('category_desc_template', { name: categoryName })}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-label-md">
              {filtered.length} {t('results_label')}{search && ` cho "${search}"`}
            </span>
          </div>
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-xl">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full rounded-xl border border-brand-200 bg-brand-50 py-3 pl-12 pr-4 text-sm font-normal transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="divide-y divide-on-surface/5">
          {filtered.length === 0 && (
            <p className="text-muted text-center py-16 text-body-md">{t('not_found')}</p>
          )}
          {filtered.map((service) => {
            const title = service.title[locale] || service.title['vi'];
            const content = service.content[locale] || service.content['vi'];
            
            return (
              <Link
                key={service.id}
                href={`/services/${categorySlug}/${service.id}`}
                className="group -mx-4 flex gap-6 rounded-xl px-4 py-6 transition-colors hover:bg-brand-50"
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-brand-200 lg:h-36 lg:w-48">
                  <Image
                    src={service.image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                        {categoryName}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-snug tracking-[-0.02em] transition-colors group-hover:text-primary lg:text-xl">
                      {title}
                    </h3>
                    <p className="text-body-sm text-muted line-clamp-2 hidden sm:block"
                      dangerouslySetInnerHTML={{ __html: (content || "").replace(/<[^>]*>/g, "").substring(0, 120) + "..." }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    {t('view_detail')}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
