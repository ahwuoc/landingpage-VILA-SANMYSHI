import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getNewsById, getNewsList } from "@/lib/data";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumb from "@/components/Breadcrumb";
import { ArticleProvider, ArticleBody, ArticleToc } from "@/components/NewsContent";
import { getTranslations, getLocale } from "next-intl/server";

export default async function NewsDetailView({ id }: { id: string }) {
  const t = await getTranslations("NewsDetail");
  const locale = await getLocale();

  const [newsItem, allNews] = await Promise.all([
    getNewsById(id),
    getNewsList(),
  ]);

  if (!newsItem) notFound();

  const title = newsItem.title[locale] || newsItem.title['vi'];
  const content = newsItem.content[locale] || newsItem.content['vi'];

  const otherNews = allNews.filter(item => item.id.toString() !== id).slice(0, 3);

  return (
    <article className="bg-surface">
      {/* Article Header */}
      <header className="relative overflow-hidden bg-brand-900 pb-20 pt-48">
        <div className="absolute inset-0 opacity-15">
          <Image src={newsItem.image} alt={title} fill className="object-cover" preload sizes="100vw" />
          <div className="absolute inset-0 bg-brand-950/55" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
          <Breadcrumb
            items={[
              { label: t('breadcrumb_news'), href: "/news" },
              { label: t('breadcrumb_detail') }
            ]}
            isDark={true}
          />
          <div className="mb-6 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
            <span className="text-white/80">
              {newsItem.news_categories?.name[locale] || newsItem.news_categories?.name['vi'] || ""}
            </span>
            <span className="text-on-dark-faint">{newsItem.date ? new Date(newsItem.date).toLocaleDateString(locale === 'vi' ? "vi-VN" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" }) : ""}</span>
          </div>
          <h1 className="mb-8 text-display-md leading-tight text-on-dark">{title}</h1>
          <div className="flex items-center gap-4 text-body-sm text-on-dark-muted">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10">
              <span className="material-symbols-outlined text-sm text-white">person</span>
            </div>
            <div>
              <div className="text-label-sm text-on-dark-faint mb-1 opacity-60 uppercase font-black tracking-widest text-[9px]">{t('author_label')}</div>
              <div className="font-bold text-white">{newsItem.author}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar */}
      <ArticleProvider content={content || ""}>
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 sm:px-8 lg:flex-row lg:py-24">
          {/* Post Content */}
          <div className="lg:w-2/3">
            <div className="relative mb-14 aspect-video overflow-hidden rounded-2xl border border-brand-200 shadow-[var(--shadow-card)]">
              <Image
                src={newsItem.image}
                alt={title}
                fill
                className="object-cover"
                preload
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
            {/* Mobile TOC */}
            <div className="lg:hidden mb-12">
              <ArticleToc />
            </div>
            <ArticleBody />
            <ShareButtons title={title} />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-40 space-y-12">
              <div className="hidden lg:block">
                <ArticleToc />
              </div>
              <div className="rounded-2xl border border-brand-200 bg-card p-8 shadow-[var(--shadow-card)] lg:p-10">
                <h4 className="mb-8 border-b border-brand-200 pb-4 text-xl font-bold tracking-[-0.02em]">{t('other_news')}</h4>
                <div className="space-y-10">
                  {otherNews.map(item => {
                    const otherTitle = item.title[locale] || item.title['vi'];
                    return (
                      <Link key={item.id} href={`/news/${item.slug || item.id}`} className="group block">
                        <div className="flex gap-6 items-center">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-brand-200">
                            <Image
                              src={item.image}
                              alt={otherTitle}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="80px"
                            />
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 line-clamp-1">
                              {item.news_categories?.name[locale] || item.news_categories?.name['vi'] || ""}
                            </div>
                            <h5 className="line-clamp-2 text-sm font-bold leading-tight tracking-[-0.01em] transition-colors group-hover:text-primary">
                              {otherTitle}
                            </h5>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 text-white lg:p-10">
                <h4 className="relative z-10 mb-4 text-xl font-bold tracking-[-0.02em]">{t('cta_title')}</h4>
                <p className="relative z-10 mb-8 text-sm font-normal leading-7 text-white/70">{t('cta_desc')}</p>
                <Link href="/contact" className="relative z-10 block w-full rounded-xl bg-white py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-brand-900 transition-colors hover:bg-brand-100">
                  {t('cta_btn')}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </ArticleProvider>
    </article>
  );
}
