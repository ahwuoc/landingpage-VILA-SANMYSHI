import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Compass, UserRound } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getNewsById, getNewsList } from '@/lib/data';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { ArticleProvider, ArticleBody, ArticleToc } from '@/components/NewsContent';
import { getTranslations, getLocale } from 'next-intl/server';
import ArticleShare from './components/ArticleShare';
import { articleDate, articleImage, newsCopy, newsLanguage } from './newsPresentation';
import styles from './News.module.css';

export default async function NewsDetailView({ id }: { id: string }) {
  const [t, locale, newsItem, allNews] = await Promise.all([getTranslations('NewsDetail'), getLocale(), getNewsById(id), getNewsList()]);
  if (!newsItem) notFound();
  const copy = newsCopy[newsLanguage(locale)];
  const title = newsItem.title[locale] || newsItem.title.vi;
  const content = newsItem.content[locale] || newsItem.content.vi || '';
  const otherNews = allNews.filter((item) => item.id.toString() !== id && item.slug).slice(0, 3);
  const date = articleDate(newsItem.date || newsItem.created_at, locale);
  const shareUrl = 'https://vilasanmyshi.com/' + locale + '/news/' + (newsItem.slug || id);

  return (
    <article className={styles.page}>
      <header className={styles.articleHeader}>
        <div className={`${styles.container} ${styles.articleHeaderInner}`}>
          <Breadcrumb items={[{ label: t('breadcrumb_news'), href: '/news' }, { label: t('breadcrumb_detail') }]} />
          <div className={styles.meta}><span>{newsItem.news_categories?.name[locale] || newsItem.news_categories?.name.vi || copy.category}</span>{date && <time dateTime={newsItem.date || newsItem.created_at}>{date}</time>}</div>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.author}><span className={styles.authorIcon}><UserRound size={19} strokeWidth={1.5} aria-hidden="true" /></span><div><small>{t('author_label')}</small><span>{newsItem.author || 'VILA SANMYSHI'}</span></div></div>
        </div>
      </header>

      <ArticleProvider content={content}>
        <div className={`${styles.container} ${styles.articleLayout}`}>
          <div className={styles.articleMain}>
            <div className={styles.articleCover}><Image src={articleImage(newsItem.image)} alt={title} fill preload sizes="(max-width: 760px) 100vw, 70vw" className={styles.cover} /></div>
            <div className={`${styles.mobileToc} ${styles.toc}`}><ArticleToc /></div>
            <div className={styles.articleProse}><ArticleBody /></div>
            <ArticleShare title={title} url={shareUrl} />
            <Link href="/news" className={styles.backLink}><ArrowLeft size={15} aria-hidden="true" />{copy.back}</Link>
          </div>
          <aside className={styles.articleSidebar}>
            <div className={styles.sidebarSticky}>
              <div className={`${styles.desktopToc} ${styles.toc}`}><ArticleToc /></div>
              {otherNews.length > 0 && <section className={styles.related} aria-labelledby="related-news-title"><h2 id="related-news-title">{t('other_news')}</h2>{otherNews.map((item) => { const otherTitle = item.title[locale] || item.title.vi; return <Link key={item.id} href={`/news/${item.slug}`} className={styles.relatedLink}><span className={styles.relatedImage}><Image src={articleImage(item.image)} alt="" fill className={styles.cover} sizes="78px" /></span><h3>{otherTitle}</h3></Link>; })}</section>}
              <section className={styles.articleCta}><Compass size={28} strokeWidth={1.25} aria-hidden="true" /><h2>{t('cta_title')}</h2><p>{t('cta_desc')}</p><Link href="/contact">{t('cta_btn')}<ArrowUpRight size={16} aria-hidden="true" /></Link></section>
            </div>
          </aside>
        </div>
      </ArticleProvider>
    </article>
  );
}
