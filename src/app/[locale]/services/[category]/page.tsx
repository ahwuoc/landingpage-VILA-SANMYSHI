import ServiceCategoryView from "@/views/Services/ServiceCategoryView";
import { getServicesList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const { data } = await supabase.from("service_categories").select("slug");
  return (data || []).map(c => ({ category: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; category: string }>
}): Promise<Metadata> {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const { data: cat } = await supabase.from("service_categories").select("name").eq("slug", category).single();
  if (!cat) return { title: t("category_not_found") };
  
  const nameObj = cat.name as Record<string, string>;
  const catName = nameObj[locale] || nameObj['vi'];
  
  return {
    title: `${catName} | VILA SANMYSHI`,
    description: t("category_desc_template", { name: catName }),
    alternates: { canonical: `/${locale}/services/${category}` },
  };
}

export default async function ServiceCategoryPage({
  params
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const { data: cat } = await supabase.from("service_categories").select("*").eq("slug", category).single();
  if (!cat) notFound();

  const nameObj = cat.name as Record<string, string>;
  const catShortName = nameObj['vi'] || nameObj[Object.keys(nameObj)[0]];
  const catLocalizedName = nameObj[locale] || nameObj['vi'];

  const services = await getServicesList();
  const filtered = services.filter(s => s.category === catShortName);

  return (
    <ServiceCategoryView 
      services={filtered} 
      categorySlug={category} 
      categoryName={catLocalizedName} 
    />
  );
}
