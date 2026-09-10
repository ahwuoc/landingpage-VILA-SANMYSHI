import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { NewsItem } from "@/lib/data";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const locale = useLocale();
  const t = useTranslations("News");

  const title = item.title[locale] || item.title['vi'];
  const content = item.content[locale] || item.content['vi'];

  const excerpt = content
    ?.replace(/<[^>]*>/g, "")
    ?.split(".")
    ?.slice(0, 2)
    ?.join(".") + "." || "";

  return (
    <Link href={`/news/${item.slug || item.id}`} className="group cursor-pointer">
      <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-2xl border border-brand-200 shadow-[var(--shadow-card)]">
        <Image
          src={item.image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-5 top-5 rounded-lg border border-brand-200 bg-white/95 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary shadow-[var(--shadow-card)]">
          {item.news_categories?.name[locale] || item.news_categories?.name['vi'] || ""}
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant opacity-60 uppercase mb-4 tracking-widest">
          <span>{item.date ? new Date(item.date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US') : ""}</span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span>{item.author}</span>
        </div>
        <h3 className="mb-5 text-2xl font-bold leading-tight tracking-[-0.025em] transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm font-normal leading-7 text-on-surface-variant">
          {excerpt}
        </p>
        <div className="mt-8 flex items-center gap-2 text-primary overflow-hidden">
          <span className="text-xs font-black uppercase tracking-widest translate-x-0 group-hover:translate-x-2 transition-transform">
            {t('read_more')}
          </span>
          <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}
