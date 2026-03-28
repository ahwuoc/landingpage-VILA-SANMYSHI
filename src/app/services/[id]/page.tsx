import ServicesView from "@/views/Services/ServicesView";
import { getServicesList, getServiceById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const services = await getServicesList();
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) return { title: "Dịch vụ không tồn tại | VILA SANMYSHI" };
  return {
    title: `${service.title} | VILA SANMYSHI LOGISTICS`,
    description: `Giải pháp ${service.title.toLowerCase()} chuyên nghiệp tại Cửa khẩu Lao Bảo.`,
    openGraph: {
      title: `${service.title} | VILA SANMYSHI`,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const services = await getServicesList();
  const service = services.find(s => s.id === id);
  if (!service) notFound();
  return <ServicesView services={services} id={id} />;
}
