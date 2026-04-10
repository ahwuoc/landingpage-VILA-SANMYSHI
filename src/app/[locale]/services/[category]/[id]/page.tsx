import ServicesView from "@/views/Services/ServicesView";
import { getServicesList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const { data: cats } = await supabase.from("service_categories").select("id, slug, name");
  const services = await getServicesList();
  const locales = ['vi', 'en', 'th'];
  const params = [];

  for (const locale of locales) {
    for (const cat of cats || []) {
      const catServices = services.filter(s => s.category_id === cat.id);
      for (const s of catServices) {
        params.push({ locale, category: cat.slug, id: s.id });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; category: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const services = await getServicesList();
  const service = services.find(s => s.id === id);
  if (!service) return { title: t("not_found") };

  const title = service.title[locale] || service.title['vi'];

  return {
    title: `${title} | VILA SANMYSHI`,
    description: t("service_desc_template", { title: title }),
    openGraph: {
      title: title,
      images: [service.image],
      url: `/${locale}/services/${(await params).category}/${id}`,
    },
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; category: string; id: string }>
}) {
  const { locale, category, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  let catName = "";
  if (category === "all") {
    const t_services = await getTranslations({ locale, namespace: "Services" });
    catName = t_services('all_services');
  } else {
    const { data: cat } = await supabase.from("service_categories").select("name").eq("slug", category).single();
    if (!cat) notFound();
    catName = (cat.name as Record<string, string>)[locale] || (cat.name as Record<string, string>)['vi'];
  }

  const services = await getServicesList();
  const service = services.find(s => s.id === id);
  if (!service) notFound();

  const title = service.title[locale] || service.title['vi'];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t("home"), "item": `https://vilasanmyshi.com/${locale}` },
      { "@type": "ListItem", "position": 2, "name": t("services_label"), "item": `https://vilasanmyshi.com/${locale}/services` },
      { "@type": "ListItem", "position": 3, "name": catName, "item": `https://vilasanmyshi.com/${locale}/services/${category}` },
      { "@type": "ListItem", "position": 4, "name": title, "item": `https://vilasanmyshi.com/${locale}/services/${category}/${id}` },
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "url": `https://vilasanmyshi.com/${locale}/services/${category}/${id}`,
    "provider": { "@type": "LocalBusiness", "name": "VILA SANMYSHI", "url": `https://vilasanmyshi.com/${locale}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ServicesView services={services} id={id} categorySlug={category} categoryName={catName} />
    </>
  );
}
