export interface NewsItem {
  id: number;
  title: Record<string, string>;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  date: string;
  category: string;
  image: string;
  author: string;
  slug?: string;
  created_at?: string;
}
