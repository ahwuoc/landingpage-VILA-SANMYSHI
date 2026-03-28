import NewsDetailView from "@/views/News/NewsDetailView";
import { getNewsById } from "@/lib/data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const newsItem = await getNewsById(id);
  return {
    title: newsItem?.title || "Tin tức",
    description: newsItem?.excerpt || "Chi tiết tin tức từ Vila Sanmyshi.",
    openGraph: {
      title: newsItem?.title || "Tin tức | Vila Sanmyshi",
      description: newsItem?.excerpt,
      url: `/news/${id}`,
      images: [newsItem?.image || "/images/logo.jpg"],
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NewsDetailView id={id} />;
}
