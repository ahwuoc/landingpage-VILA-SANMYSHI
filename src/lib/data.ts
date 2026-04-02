import { supabase } from "@/lib/supabase";

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
  slug?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  content: string;
  created_at: string;
  category?: string;
}

export interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  cta_primary: string;
  cta_primary_action: "modal" | "href";
  cta_primary_service?: string;
  cta_primary_href?: string;
  cta_secondary?: string;
  cta_secondary_action?: "modal" | "href";
  cta_secondary_service?: string;
  cta_secondary_href?: string;
  display_order: number;
  is_visible: boolean;
}

export async function getNewsList(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data } = await supabase.from("news").select("*").eq("id", id).single();
  return data || null;
}

export async function getNewsCategories(): Promise<string[]> {
  const news = await getNewsList();
  const cats = [...new Set(news.map(n => n.category))];
  return ["Tất cả", ...cats];
}

export async function getServicesList(): Promise<ServiceItem[]> {
  const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const { data } = await supabase.from("services").select("*").eq("id", id).single();
  return data || null;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}
