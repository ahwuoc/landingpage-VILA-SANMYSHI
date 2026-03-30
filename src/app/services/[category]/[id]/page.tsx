import ServicesView from "@/views/Services/ServicesView";
import { getServicesList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data: cats } = await supabase.from("service_categories").select("slug, name");
  const services = await getServicesList();
  const params = [];
  for (const cat of cats || []) {
    const catServices = services.filter(s => s.category === cat.name);
    for (const s of catServices) {
      params.push({ category: cat.slug, id: s.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const services = await getServicesList();
  const service = services.find(s => s.id === id);
  if (!service) return { title: "Dịch vụ không tồn tại" };
  return {
    title: `${service.title} | VILA SANMYSHI`,
    description: `Giải pháp ${service.title.toLowerCase()} chuyên nghiệp tại Cửa khẩu Lao Bảo.`,
    openGraph: { title: service.title, images: [service.image] },
    alternates: { canonical: `/services/${(await params).category}/${id}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { category, id } = await params;
  const { data: cat } = await supabase.from("service_categories").select("name").eq("slug", category).single();
  if (!cat) notFound();

  const services = await getServicesList();
  const service = services.find(s => s.id === id);
  if (!service) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://vila-sanmyshi.com" },
      { "@type": "ListItem", "position": 2, "name": "Dịch vụ", "item": "https://vila-sanmyshi.com/services" },
      { "@type": "ListItem", "position": 3, "name": cat.name, "item": `https://vila-sanmyshi.com/services/${category}` },
      { "@type": "ListItem", "position": 4, "name": service.title, "item": `https://vila-sanmyshi.com/services/${category}/${id}` },
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "url": `https://vila-sanmyshi.com/services/${category}/${id}`,
    "provider": { "@type": "LocalBusiness", "name": "VILA SANMYSHI", "url": "https://vila-sanmyshi.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ServicesView services={services} id={id} categorySlug={category} categoryName={cat.name} />
    </>
  );
}
