import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import type { NewsItem } from '@/lib/data';
import { articleDate, articleImage, articleText, newsCopy, newsLanguage } from '../newsPresentation';
import styles from '../News.module.css';

export default function NewsCard({ item }: { item: NewsItem }) {
  const locale = useLocale();
  const copy = newsCopy[newsLanguage(locale)];
  const title = item.title[locale] || item.title.vi;
  const content = articleText(item.content[locale] || item.content.vi);
  const date = articleDate(item.date || item.created_at, locale);
  const preview = <><div className={styles.cardImage}><Image src={articleImage(item.image)} alt={title} fill className={styles.cover} sizes="(max-width: 480px) 100vw, (max-width: 1050px) 50vw, 33vw" />{item.slug && <span className={styles.imageArrow}><ArrowUpRight size={18} aria-hidden="true" /></span>}</div><div className={styles.meta}><span>{item.news_categories?.name[locale] || item.news_categories?.name.vi || copy.category}</span>{date && <time dateTime={item.date || item.created_at}>{date}</time>}</div><h3>{title}</h3><p className={styles.excerpt}>{content}</p></>;

  return <article className={styles.card}>{item.slug ? <Link href={`/news/${item.slug}`}>{preview}<span className={styles.readLink}>{copy.read}<ArrowRight size={17} aria-hidden="true" /></span></Link> : <>{preview}<details className={styles.localArticle}><summary>{copy.read}<ArrowRight size={17} aria-hidden="true" /></summary><p>{content}</p></details></>}</article>;
}
