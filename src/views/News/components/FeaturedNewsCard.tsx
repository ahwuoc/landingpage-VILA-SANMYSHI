import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import type { NewsItem } from '@/lib/data';
import { articleDate, articleImage, articleText, newsCopy, newsLanguage } from '../newsPresentation';
import styles from '../News.module.css';

export default function FeaturedNewsCard({ news }: { news: NewsItem }) {
  const locale = useLocale();
  const copy = newsCopy[newsLanguage(locale)];
  if (!news.slug) return null;
  const title = news.title[locale] || news.title.vi;
  const date = articleDate(news.date || news.created_at, locale);
  return (
    <section className={styles.container} aria-label={copy.featured}>
      <div className={styles.feature}>
        <Link href={`/news/${news.slug}`} className={styles.featureImage} aria-label={title}><Image src={articleImage(news.image)} alt={title} fill sizes="(max-width: 760px) 100vw, 55vw" className={styles.cover} /></Link>
        <div className={styles.featureBody}>
          <p className={styles.eyebrow}>{copy.featured}</p>
          <div className={styles.meta}><span>{news.news_categories?.name[locale] || news.news_categories?.name.vi || copy.category}</span>{date && <time dateTime={news.date || news.created_at}>{date}</time>}</div>
          <h2><Link href={`/news/${news.slug}`}>{title}</Link></h2>
          <p>{articleText(news.content[locale] || news.content.vi).slice(0, 220)}</p>
          <Link href={`/news/${news.slug}`} className={styles.readLink}>{copy.read}<ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
