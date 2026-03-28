import { MetadataRoute } from 'next';
import { NEWS_LIST } from '@/constants/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vila-sanmyshi.com';

  const staticRoutes = [
    { route: '', priority: 1, changeFrequency: 'weekly' as const },
    { route: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/news', priority: 0.6, changeFrequency: 'daily' as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const newsRoutes = NEWS_LIST.map((news) => ({
    url: `${baseUrl}/news/${news.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsRoutes];
}
