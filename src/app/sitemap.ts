import { MetadataRoute } from 'next';
import { getNewsList, getServicesList } from '@/lib/data';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vilasanmyshi.com';
  const locales = routing.locales;

  const [newsList, servicesList] = await Promise.all([
    getNewsList(),
    getServicesList(),
  ]);

  const staticPaths = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/news', priority: 0.6, changeFrequency: 'daily' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static Routes
    staticPaths.forEach((item) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${item.route}`,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency,
        priority: item.priority,
      });
    });

    // News Routes
    newsList.forEach((news) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/news/${news.slug || news.id}`,
        lastModified: new Date(news.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });

    // Service Routes
    servicesList.forEach((service) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/services/${service.id}`,
        lastModified: new Date(service.created_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    });
  }

  return sitemapEntries;
}
