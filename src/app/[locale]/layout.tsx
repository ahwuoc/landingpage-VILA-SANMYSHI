import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import { getServicesList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://vila-sanmyshi.com"),
    title: {
      default: t("title"),
      template: "%s | VILA SANMYSHI",
    },
    description: t("description"),
    keywords: [
      "khai báo hải quan quảng trị",
      "logistics lao bảo",
      "vận tải quốc tế quảng trị",
      "xuất nhập khẩu lao bảo",
      "thông quan hàng hóa quảng trị",
      "vận chuyển hàng đi lào",
      "vila sanmyshi",
    ],
    authors: [{ name: "VILA SANMYSHI" }],
    creator: "VILA SANMYSHI",
    publisher: "VILA SANMYSHI",
    icons: {
      icon: '/images/logo.jpg',
      shortcut: '/images/logo.jpg',
      apple: '/images/logo.jpg',
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://vila-sanmyshi.com",
      siteName: "VILA SANMYSHI",
      images: [
        {
          url: '/images/logo.jpg',
          width: 1200,
          height: 630,
          alt: "VILA SANMYSHI Logistics",
        },
      ],
      locale: t("og_locale"),
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ['/images/logo.jpg'],
    },
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const services = await getServicesList();
  const { data: cats } = await supabase.from("service_categories").select("name, slug");

  const getLocalizedName = (nameObj: any) => {
    if (!nameObj) return "";
    const obj = nameObj as Record<string, string>;
    return obj[locale] || obj['vi'] || "";
  };

  const catSlugMap = Object.fromEntries((cats || []).map(c => {
    const viName = (c.name as Record<string, string>)['vi'] || "";
    return [viName, c.slug];
  }));

  const catIntlMap = Object.fromEntries((cats || []).map(c => {
    const viName = (c.name as Record<string, string>)['vi'] || "";
    return [viName, getLocalizedName(c.name)];
  }));

  const serviceNavItems = services.map(s => {
    const rawCat = s.category && s.category.trim() !== "" ? s.category : "Dịch vụ khác";
    const categoryName = catIntlMap[rawCat] || getLocalizedName({ vi: "Dịch vụ khác", en: "Other Services", th: "บริการอื่น" });
    const serviceTitle = s.title[locale] || s.title['vi'] || "";

    return {
      name: serviceTitle,
      href: `/services/${catSlugMap[rawCat] || "all"}/${s.id}`,
      category: categoryName,
      categorySlug: catSlugMap[rawCat] || "all",
    };
  });

  const existingCatsVi = new Set(services.map(s => s.category || ""));
  const emptyCatItems = (cats || [])
    .filter(c => {
      const viName = (c.name as Record<string, string>)['vi'] || "";
      return !existingCatsVi.has(viName);
    })
    .map(c => ({
      name: "",
      href: `/services/${c.slug}`,
      category: getLocalizedName(c.name),
      categorySlug: c.slug
    }));
  const navServices = [...serviceNavItems, ...emptyCatItems];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientLayout navServices={navServices}>
        {children}
      </ClientLayout>
    </NextIntlClientProvider>
  );
}
