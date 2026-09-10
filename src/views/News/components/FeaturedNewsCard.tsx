import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { NewsItem } from "@/lib/data";

interface FeaturedNewsCardProps {
  news: NewsItem;
}

export default function FeaturedNewsCard({ news }: FeaturedNewsCardProps) {
  const locale = useLocale();
  const t = useTranslations("News");

  const title = news.title[locale] || news.title['vi'];
  const content = news.content[locale] || news.content['vi'] || "";
  const excerpt = content.replace(/<[^>]*>/g, "").split(".").slice(0, 2).join(".") + ".";

  return (
    <section className="relative z-20 mx-auto -mt-20 max-w-7xl px-6 sm:px-8">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-200 bg-card shadow-[var(--shadow-card)] lg:flex-row">
        <div className="lg:w-3/5 relative min-h-[400px]">
          <Image src={news.image} alt={title} fill className="object-cover" preload sizes="(max-width: 768px) 100vw, 60vw" />
        </div>
        <div className="flex flex-col justify-center p-10 md:p-14 lg:w-2/5">
          <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {news.news_categories?.name[locale] || news.news_categories?.name['vi'] || ""} | {news.date ? new Date(news.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US') : ""}
          </span>
          <h2 className="mb-7 cursor-pointer text-4xl font-bold leading-tight tracking-[-0.03em] transition-colors hover:text-primary">
            {title}
          </h2>
          <p className="mb-9 text-base font-normal leading-7 text-on-surface-variant lg:text-lg lg:leading-8">
            {excerpt}
          </p>
          <Link
            href={`/news/${news.slug || news.id}`}
            className="flex items-center gap-4 group"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-200 transition-colors group-hover:border-primary group-hover:bg-primary">
              <span className="material-symbols-outlined text-on-surface group-hover:text-on-primary">
                east
              </span>
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.12em]">
              {t('read_article')}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
