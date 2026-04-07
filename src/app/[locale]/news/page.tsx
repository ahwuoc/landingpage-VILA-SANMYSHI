import NewsView from "@/views/News/NewsView";
import { Metadata } from "next";
import { setRequestLocale, getTranslations } from 'next-intl/server';
export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }, { locale: 'th' }];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("news.title"),
    description: t("news.description"),
    openGraph: {
      title: t("news.title"),
      description: t("news.description"),
      url: `/${locale}/news`,
      images: ["/images/logo.jpg"],
    },
  };
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsView />;
}
