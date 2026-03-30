import NewsDetailView from "@/views/News/NewsDetailView";
import { getNewsList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const newsList = await getNewsList();
  return newsList.map((n) => ({ slug: n.slug || String(n.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: newsItem } = await supabase.from("news").select("*").eq("slug", slug).single();
  if (!newsItem) return { title: "Tin tức không tồn tại | VILA SANMYSHI" };
  return {
    title: newsItem.title,
    description: newsItem.excerpt,
    openGraph: {
      title: newsItem.title,
      description: newsItem.excerpt,
      url: `/news/${slug}`,
      images: [newsItem.image || "/images/logo.jpg"],
      type: "article",
      publishedTime: newsItem.date,
    },
    alternates: { canonical: `/news/${slug}` },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: newsItem } = await supabase.from("news").select("*").eq("slug", slug).single();
  if (!newsItem) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": newsItem.title,
    "description": newsItem.excerpt,
    "image": newsItem.image,
    "datePublished": newsItem.date,
    "author": { "@type": "Person", "name": newsItem.author || "VILA SANMYSHI" },
    "publisher": {
      "@type": "Organization",
      "name": "VILA SANMYSHI",
      "logo": { "@type": "ImageObject", "url": "https://vila-sanmyshi.com/images/logo.jpg" }
    },
    "url": `https://vila-sanmyshi.com/news/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://vila-sanmyshi.com" },
      { "@type": "ListItem", "position": 2, "name": "Tin tức", "item": "https://vila-sanmyshi.com/news" },
      { "@type": "ListItem", "position": 3, "name": newsItem.title, "item": `https://vila-sanmyshi.com/news/${slug}` },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NewsDetailView id={String(newsItem.id)} />
    </>
  );
}
