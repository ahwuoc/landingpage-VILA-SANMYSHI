import { MetadataRoute } from 'next';
import { getNewsList, getServicesList } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vila-sanmyshi.com';

  const [newsList, servicesList] = await Promise.all([
    getNewsList(),
    getServicesList(),
  ]);

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
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

  const newsRoutes = newsList.map((news) => ({
    url: `${baseUrl}/news/${news.slug || news.id}`,
    lastModified: new Date(news.created_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const serviceRoutes = servicesList.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(service.created_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...newsRoutes];
}
