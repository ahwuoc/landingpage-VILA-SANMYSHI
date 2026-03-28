import { getNewsList, getNewsCategories, NewsItem } from "@/lib/data";
import NewsHero from "./components/NewsHero";
import NewsGrid from "./components/NewsGrid";
import NewsNewsletter from "./components/NewsNewsletter";

export default async function NewsView() {
  const [newsList, categories] = await Promise.all([
    getNewsList(),
    getNewsCategories(),
  ]);

  return (
    <div className="bg-surface">
      <NewsHero />
      <NewsGrid newsList={newsList as NewsItem[]} categories={categories} />
      <NewsNewsletter />
    </div>
  );
}
