import ServiceCategoryView from "@/views/Services/ServiceCategoryView";
import { getServicesList } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data } = await supabase.from("service_categories").select("slug");
  return (data || []).map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const { data: cat } = await supabase.from("service_categories").select("name").eq("slug", category).single();
  if (!cat) return { title: "Danh mục không tồn tại" };
  return {
    title: `${cat.name} | VILA SANMYSHI`,
    description: `Các dịch vụ ${cat.name.toLowerCase()} chuyên nghiệp tại Cửa khẩu Lao Bảo.`,
    alternates: { canonical: `/services/${category}` },
  };
}

export default async function ServiceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const { data: cat } = await supabase.from("service_categories").select("*").eq("slug", category).single();
  if (!cat) notFound();

  const services = await getServicesList();
  const filtered = services.filter(s => s.category === cat.name);

  return <ServiceCategoryView services={filtered} categorySlug={category} categoryName={cat.name} />;
}
