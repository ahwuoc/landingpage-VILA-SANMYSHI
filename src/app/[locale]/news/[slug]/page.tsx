import NewsDetailView from "@/views/News/NewsDetailView";
import { getNewsList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const newsList = await getNewsList();
  const locales = ['vi', 'en', 'th'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const n of newsList) {
      params.push({ locale, slug: n.slug || String(n.id) });
    }
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  
  const { data: newsItem } = await supabase.from("news").select("*").eq("slug", slug).single();
  if (!newsItem) return { title: t("not_found") };
  
  const title = newsItem.title[locale] || newsItem.title['vi'];
  const excerpt = newsItem.excerpt ? (newsItem.excerpt[locale] || newsItem.excerpt['vi']) : "";

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      url: `/${locale}/news/${slug}`,
      images: [newsItem.image || "/images/logo.jpg"],
      type: "article",
      publishedTime: newsItem.date,
    },
  };
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const { data: newsItem } = await supabase.from("news").select("*").eq("slug", slug).single();
  if (!newsItem) notFound();

  const title = newsItem.title[locale] || newsItem.title['vi'];
  const excerpt = newsItem.excerpt ? (newsItem.excerpt[locale] || newsItem.excerpt['vi']) : "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": excerpt,
    "image": newsItem.image,
    "datePublished": newsItem.date,
    "author": { "@type": "Person", "name": newsItem.author || "VILA SANMYSHI" },
    "publisher": {
      "@type": "Organization",
      "name": "VILA SANMYSHI",
      "logo": { "@type": "ImageObject", "url": "https://vilasanmyshi.com/images/logo.jpg" }
    },
    "url": `https://vilasanmyshi.com/${locale}/news/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t("home"), "item": `https://vilasanmyshi.com/${locale}` },
      { "@type": "ListItem", "position": 2, "name": t("news_label"), "item": `https://vilasanmyshi.com/${locale}/news` },
      { "@type": "ListItem", "position": 3, "name": title, "item": `https://vilasanmyshi.com/${locale}/news/${slug}` },
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
