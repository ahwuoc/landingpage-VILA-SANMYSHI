import { MetadataRoute } from 'next';
import { getNewsList, getServicesList } from '@/lib/data';
import { routing } from '@/i18n/routing';
import { SITE_URL, alternatesFor } from '@/lib/seo';

type Entry = { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly'; lastModified: Date };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [newsResult, servicesResult] = await Promise.allSettled([getNewsList(), getServicesList()]);
  const newsList = newsResult.status === 'fulfilled' ? newsResult.value : [];
  const servicesList = servicesResult.status === 'fulfilled' ? servicesResult.value : [];
  const now = new Date();

  const entries: Entry[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly', lastModified: now },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly', lastModified: now },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly', lastModified: now },
    { path: '/tracking', priority: 0.8, changeFrequency: 'monthly', lastModified: now },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { path: '/branches', priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { path: '/news', priority: 0.6, changeFrequency: 'daily', lastModified: now },
    ...newsList.map((news): Entry => ({
      path: `/news/${news.slug || news.id}`,
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: new Date(news.created_at || now),
    })),
    ...servicesList.map((service): Entry => ({
      path: `/services/${service.service_categories?.slug || 'all'}/${service.id}`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date(service.created_at || now),
    })),
  ];

  return routing.locales.flatMap((locale) => entries.map((entry) => ({
    url: `${SITE_URL}/${locale}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages: alternatesFor(locale, entry.path).languages },
  })));
}
