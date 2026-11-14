import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { COMPANY_INFO, SOCIAL_LINKS } from '@/constants/company';
import { SITE_URL, alternatesFor } from '@/lib/seo';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE_URL),
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
      url: `${SITE_URL}/${locale}`,
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
    alternates: alternatesFor(locale),
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

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const phone = `+84${COMPANY_INFO.hotline.replace(/^0/, "")}`;
  const sameAs = SOCIAL_LINKS.filter((link) => link.href.startsWith("http") && !link.href.includes("vilasanmyshi.com")).map((link) => link.href);
  const address = {
    "@type": "PostalAddress",
    "streetAddress": "13B Ông Ích Khiêm",
    "addressLocality": "Lao Bảo",
    "addressRegion": "Quảng Trị",
    "addressCountry": "VN",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": COMPANY_INFO.shortName,
    "legalName": COMPANY_INFO.name,
    "alternateName": COMPANY_INFO.internationalName,
    "url": SITE_URL,
    "logo": `${SITE_URL}${COMPANY_INFO.logo}`,
    "email": COMPANY_INFO.email,
    "telephone": phone,
    "taxID": COMPANY_INFO.mst,
    "foundingDate": COMPANY_INFO.founded,
    address,
    sameAs,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": phone,
      "email": COMPANY_INFO.email,
      "contactType": "customer service",
      "areaServed": ["VN", "LA", "TH"],
      "availableLanguage": ["Vietnamese", "English", "Thai"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#office`,
    "name": COMPANY_INFO.shortName,
    "image": `${SITE_URL}${COMPANY_INFO.logo}`,
    "url": `${SITE_URL}/${locale}`,
    "telephone": phone,
    "email": COMPANY_INFO.email,
    address,
    "areaServed": ["VN", "LA", "TH"],
    "parentOrganization": { "@id": `${SITE_URL}/#organization` },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": COMPANY_INFO.shortName,
    "url": SITE_URL,
    "inLanguage": locale,
    "publisher": { "@id": `${SITE_URL}/#organization` },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* The root layout is shared with /admin and cannot see the locale, so correct <html lang> here. */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(locale)}` }} />
      <ClientLayout>
        {children}
      </ClientLayout>
    </NextIntlClientProvider>
  );
}
