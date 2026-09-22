import { getNewsList, getNewsCategories } from "@/lib/data";
import NewsHero from "./components/NewsHero";
import NewsGrid from "./components/NewsGrid";
import NewsNewsletter from "./components/NewsNewsletter";
import FeaturedNewsCard from "./components/FeaturedNewsCard";
import styles from './News.module.css';

export default async function NewsView() {
  const [newsList, categories] = await Promise.all([
    getNewsList(),
    getNewsCategories(),
  ]);
  const featured = newsList.find((news) => news.slug);

  return (
    <div className={styles.page}>
      <NewsHero />
      {featured && <FeaturedNewsCard news={featured} />}
      <NewsGrid newsList={newsList} categories={categories} />
      <NewsNewsletter />
    </div>
  );
}
