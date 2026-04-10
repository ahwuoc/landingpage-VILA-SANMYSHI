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
    metadataBase: new URL("https://vilasanmyshi.com"),
    title: {
      default: t("title"),
      template: "%s | VILA SANMYSHI",
    },
    description: t("description"),
    keywords: t("keywords"),
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
      url: "https://vilasanmyshi.com",
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
      canonical: `https://vilasanmyshi.com/${locale}`,
      languages: {
        'vi-VN': `https://vilasanmyshi.vn/vi`,
        'en-US': `https://vilasanmyshi.com/en`,
        'th-TH': `https://vilasanmyshi.com/th`,
      },
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
  const { data: cats } = await supabase.from("service_categories").select("id, name, slug");

  const getLocalizedName = (nameObj: any) => {
    if (!nameObj) return "";
    const obj = nameObj as Record<string, string>;
    return obj[locale] || obj['vi'] || "";
  };

  const serviceNavItems = services.map(s => {
    const categoryName = getLocalizedName(s.service_categories?.name);
    const serviceTitle = s.title[locale] || s.title['vi'] || "";

    return {
      name: serviceTitle,
      href: `/services/${s.service_categories?.slug || "all"}/${s.id}`,
      category: categoryName || getLocalizedName({ vi: "Dịch vụ khác", en: "Other Services", th: "บริการอื่น" }),
      categorySlug: s.service_categories?.slug || "all",
    };
  });

  const existingCatIds = new Set(services.filter(s => s.category_id).map(s => s.category_id));
  const emptyCatItems = (cats || [])
    .filter(c => !existingCatIds.has(c.id))
    .map(c => ({
      name: "",
      href: `/services/${c.slug}`,
      category: getLocalizedName(c.name),
      categorySlug: c.slug
    }));
  const navServices = [...serviceNavItems, ...emptyCatItems];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VILA SANMYSHI",
    "url": "https://vilasanmyshi.com",
    "logo": "https://vilasanmyshi.com/images/logo.jpg",
    "sameAs": [
      "https://www.facebook.com/vilasanmyshi",
      "https://zalo.me/your-zalo-id"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-xxx-xxx-xxx",
      "contactType": "customer service",
      "areaServed": ["VN", "LA", "TH"],
      "availableLanguage": ["Vietnamese", "English", "Thai"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LogisticsCenter",
    "name": "VILA SANMYSHI Logistics",
    "image": "https://vilasanmyshi.com/images/logo.jpg",
    "@id": "https://vilasanmyshi.com",
    "url": "https://vilasanmyshi.com",
    "telephone": "+84-xxx-xxx-xxx",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cửa khẩu Quốc tế Lao Bảo",
      "addressLocality": "Hướng Hóa",
      "addressRegion": "Quảng Trị",
      "postalCode": "520000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 16.6167,
      "longitude": 106.5667
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ClientLayout navServices={navServices}>
        {children}
      </ClientLayout>
    </NextIntlClientProvider>
  );
}
