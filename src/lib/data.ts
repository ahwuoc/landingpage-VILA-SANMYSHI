export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  date: string;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  content: string;
  created_at: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"
  : "http://localhost:3000";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error: ${path}`);
  return res.json();
}

export async function getNewsList(): Promise<NewsItem[]> {
  return apiFetch<NewsItem[]>("/api/news");
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    return await apiFetch<NewsItem>(`/api/news/${id}`);
  } catch {
    return null;
  }
}

export async function getNewsCategories(): Promise<string[]> {
  const news = await getNewsList();
  const cats = [...new Set(news.map(n => n.category))];
  return ["Tất cả", ...cats];
}

export async function getServicesList(): Promise<ServiceItem[]> {
  return apiFetch<ServiceItem[]>("/api/services");
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  try {
    return await apiFetch<ServiceItem>(`/api/services/${id}`);
  } catch {
    return null;
  }
}
