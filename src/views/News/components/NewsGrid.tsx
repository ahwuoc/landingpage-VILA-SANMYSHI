"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { NewsItem } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

interface NewsGridProps {
  newsList: NewsItem[];
  categories: { id: number; name: Record<string, string>; slug: string }[];
}

export default function NewsGrid({ newsList, categories }: NewsGridProps) {
  const t = useTranslations("NewsPage");
  const locale = useLocale();
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? newsList
    : newsList.filter(n => {
      const cat = categories.find(c => c.slug === active);
      return cat && n.category_id === cat.id;
    });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-label-md">{t('latest_badge')}</span>
          </div>
          <h2 className="text-heading-lg" dangerouslySetInnerHTML={{ __html: t.raw('grid_title') }} />
        </div>
        <div className="flex flex-wrap gap-2 text-on-surface">
          <button
            onClick={() => setActive("all")}
            className={`rounded-xl border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${active === "all"
              ? "border-primary bg-primary text-on-primary"
              : "border-brand-200 bg-white hover:border-brand-400"
              }`}
          >
            {t('filter_all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.slug)}
              className={`rounded-xl border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${active === cat.slug
                ? "border-primary bg-primary text-on-primary"
                : "border-brand-200 bg-white hover:border-brand-400"
                }`}
            >
              {cat.name[locale] || cat.name['vi']}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-brand-200">
        {filtered.length === 0 && (
          <p className="text-muted text-center py-16 text-body-md italic">{t('no_posts')}</p>
        )}
        {filtered.map((item) => {
          const title = item.title[locale] || item.title['vi'];
          const content = item.content[locale] || item.content['vi'];
          const excerpt = content
            ?.replace(/<[^>]*>/g, "")
            ?.split(".")
            ?.slice(0, 2)
            ?.join(".") + "." || "";
          return (
            <Link
              key={item.id}
              href={`/news/${item.slug || item.id}`}
              className="group -mx-4 flex items-center gap-6 rounded-xl px-4 py-6 transition-colors hover:bg-brand-50"
            >
              {/* Thumbnail */}
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-brand-200 lg:h-32 lg:w-48">
                <Image
                  src={item.image}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="200px"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <span className="inline-flex items-center whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {item.news_categories?.name[locale] || item.news_categories?.name['vi'] || ""}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug tracking-[-0.02em] transition-colors group-hover:text-primary lg:text-lg">
                    {title}
                  </h3>
                  <p className="text-body-sm text-slate-500 font-medium line-clamp-2 hidden sm:block">
                    {excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-sm flex-shrink-0">person</span>
                    <span className="truncate">{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 opacity-60">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    <span>{item.date ? new Date(item.date).toLocaleDateString(locale === 'vi' ? "vi-VN" : "en-US", { day: '2-digit', month: '2-digit' }) : ""}</span>
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                    <span className="hidden xs:inline">{t('read_more')}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
