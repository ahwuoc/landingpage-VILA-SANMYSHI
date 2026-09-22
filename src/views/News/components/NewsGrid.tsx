'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Search } from 'lucide-react';
import { useLocale } from 'next-intl';
import type { NewsItem } from '@/lib/data';
import KnowledgeHub from '@/views/Home/KnowledgeHub';
import NewsCard from './NewsCard';
import { articleText, newsCopy, newsLanguage } from '../newsPresentation';
import styles from '../News.module.css';

const normalize = (value: string) => value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const pageSize = 9;

export default function NewsGrid({ newsList, categories }: { newsList: NewsItem[]; categories: { id: number; name: Record<string, string>; slug: string }[] }) {
  const locale = useLocale();
  const copy = newsCopy[newsLanguage(locale)];
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filtered = newsList.filter((item) => (active === 'all' || item.category_id === categories.find((category) => category.slug === active)?.id) && normalize(`${item.title[locale] || item.title.vi} ${articleText(item.content[locale] || item.content.vi)}`).includes(normalize(query.trim())));
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function changePage(next: number) {
    setPage(next);
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  if (!newsList.length) return <KnowledgeHub locale={locale} />;

  return (
    <section className={`${styles.container} ${styles.listing}`} aria-labelledby="news-list-heading">
      <div className={styles.listingHeader}><div><p className={styles.eyebrow}>{copy.latest}</p><h2 id="news-list-heading" ref={headingRef} tabIndex={-1} className={styles.title}>{copy.articles} <em>{copy.articlesAccent}</em></h2></div><label className={styles.search}><Search size={17} aria-hidden="true" /><span className="sr-only">{copy.search}</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={copy.search} /></label></div>
      <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label={copy.latest}><button type="button" aria-pressed={active === 'all'} onClick={() => { setActive('all'); setPage(1); }}>{copy.all}</button>{categories.map((category) => <button key={category.id} type="button" aria-pressed={active === category.slug} onClick={() => { setActive(category.slug); setPage(1); }}>{category.name[locale] || category.name.vi}</button>)}</div><p className={styles.resultCount} aria-live="polite">{String(filtered.length).padStart(2, '0')} {copy.results}</p></div>
      {visible.length ? <div className={styles.grid}>{visible.map((item) => <NewsCard key={item.id} item={item} />)}</div> : <div className={styles.empty}><BookOpen size={30} aria-hidden="true" /><p>{copy.empty}</p><button type="button" onClick={() => { setActive('all'); setQuery(''); setPage(1); }}>{copy.reset}</button></div>}
      {totalPages > 1 && <nav className={styles.pagination} aria-label={copy.pagination}><button type="button" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}><ArrowLeft size={15} aria-hidden="true" />{copy.previous}</button><span aria-live="polite">{copy.page} {currentPage} / {totalPages}</span><button type="button" disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)}>{copy.next}<ArrowRight size={15} aria-hidden="true" /></button></nav>}
    </section>
  );
}
