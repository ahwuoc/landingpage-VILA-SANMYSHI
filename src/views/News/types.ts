export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
  content: string;
  slug?: string;
  created_at?: string;
}
