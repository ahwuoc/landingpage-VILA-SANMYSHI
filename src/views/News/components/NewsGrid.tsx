"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { NewsItem } from "../types";
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
        return cat && n.category === (cat.name['vi'] || cat.name[Object.keys(cat.name)[0]]);
      });

  return (
    <section className="py-20 max-w-7xl mx-auto px-8">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-label-md uppercase font-black tracking-widest">{t('latest_badge')}</span>
          </div>
          <h2 className="text-heading-lg uppercase" dangerouslySetInnerHTML={{ __html: t.raw('grid_title') }} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
              active === "all"
                ? "bg-primary text-on-primary border-primary shadow-glow-primary"
                : "border-on-surface/10 hover:bg-surface-container-high"
            }`}
          >
            {t('filter_all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.slug)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                active === cat.slug
                  ? "bg-primary text-on-primary border-primary shadow-glow-primary"
                  : "border-on-surface/10 hover:bg-surface-container-high"
              }`}
            >
              {cat.name[locale] || cat.name['vi']}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-on-surface/5">
        {filtered.length === 0 && (
          <p className="text-muted text-center py-16 text-body-md italic">{t('no_posts')}</p>
        )}
        {filtered.map((item) => {
          const title = item.title[locale] || item.title['vi'];
          const excerpt = item.excerpt[locale] || item.excerpt['vi'];
          return (
            <Link
              key={item.id}
              href={`/news/${item.slug || item.id}`}
              className="group flex gap-6 py-6 hover:bg-surface-container-low rounded-2xl px-4 -mx-4 transition-all"
            >
              {/* Thumbnail */}
              <div className="relative w-32 h-24 lg:w-48 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0">
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
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/10">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-faint font-bold uppercase tracking-widest">
                      {item.date ? new Date(item.date).toLocaleDateString(locale === 'vi' ? "vi-VN" : locale === 'th' ? "th-TH" : "en-US") : ""}
                    </span>
                  </div>
                  <h3 className="text-base lg:text-lg font-black tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2 uppercase">
                    {title}
                  </h3>
                  <p className="text-body-sm text-slate-500 font-medium line-clamp-2 hidden sm:block">
                    {excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>{item.author}</span>
                  <span className="ml-auto flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    <span>{t('read_more')}</span>
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
