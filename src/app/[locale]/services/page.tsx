import ServicesView from "@/views/Services/ServicesView";
import { getServicesList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.services" });
  
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/services`,
      images: ["/images/logo.jpg"],
    },
  };
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = await getServicesList();
  const { data: cats } = await supabase.from("service_categories").select("name, slug");
  const catSlugMap = Object.fromEntries((cats || []).map(c => {
    const nameObj = c.name as Record<string, string>;
    return [nameObj['vi'] || nameObj[Object.keys(nameObj)[0]], c.slug];
  }));

  return <ServicesView services={services} catSlugMap={catSlugMap} />;
}
