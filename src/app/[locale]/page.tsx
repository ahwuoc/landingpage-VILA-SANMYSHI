import HomeView from "@/views/Home/view";
import { Metadata } from "next";
import { getServicesList, getNewsList } from "@/lib/data";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      images: ["/images/logo.jpg"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/logo.jpg"],
    },
    alternates: {
      canonical: `/${locale}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
  };
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [servicesResult, newsResult] = await Promise.allSettled([
    getServicesList(6),
    getNewsList(6),
  ]);

  const services = servicesResult.status === "fulfilled" ? servicesResult.value : [];
  const newsList = newsResult.status === "fulfilled" ? newsResult.value : [];

  return <HomeView services={services} newsList={newsList} />;
}
