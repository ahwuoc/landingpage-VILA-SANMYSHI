import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactView from "@/views/Contact/ContactView";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/contact`,
      images: ["/images/logo.jpg"],
    },
  };
}

const inquiryLabels = {
  vi: { countries: { VN: "Việt Nam", LA: "Lào", TH: "Thái Lan" }, cargo: { general: "Hàng thông thường", pallet: "Hàng pallet", fragile: "Hàng dễ vỡ" }, services: { customs: "Khai báo hải quan", transport: "Vận tải xuyên biên giới", both: "Hải quan & vận chuyển" }, route: "Tuyến hàng", goods: "Loại hàng", service: "Dịch vụ cần tư vấn" },
  en: { countries: { VN: "Vietnam", LA: "Laos", TH: "Thailand" }, cargo: { general: "General cargo", pallet: "Palletized cargo", fragile: "Fragile cargo" }, services: { customs: "Customs clearance", transport: "Cross-border transport", both: "Customs & transport" }, route: "Route", goods: "Cargo", service: "Requested service" },
  th: { countries: { VN: "เวียดนาม", LA: "ลาว", TH: "ไทย" }, cargo: { general: "สินค้าทั่วไป", pallet: "สินค้าพาเลต", fragile: "สินค้าแตกหักง่าย" }, services: { customs: "พิธีการศุลกากร", transport: "ขนส่งข้ามพรมแดน", both: "ศุลกากรและขนส่ง" }, route: "เส้นทาง", goods: "ประเภทสินค้า", service: "บริการที่ต้องการ" },
};

export default async function ContactPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const labels = inquiryLabels[locale as keyof typeof inquiryLabels] || inquiryLabels.vi;
  const route = typeof query.route === "string" ? query.route.split("-") : [];
  const origin = Object.hasOwn(labels.countries, route[0]) ? labels.countries[route[0] as keyof typeof labels.countries] : undefined;
  const destination = Object.hasOwn(labels.countries, route[1]) ? labels.countries[route[1] as keyof typeof labels.countries] : undefined;
  const cargo = typeof query.cargo === "string" && Object.hasOwn(labels.cargo, query.cargo) ? labels.cargo[query.cargo as keyof typeof labels.cargo] : undefined;
  const service = typeof query.service === "string" && Object.hasOwn(labels.services, query.service) ? labels.services[query.service as keyof typeof labels.services] : undefined;
  const message = [
    origin && destination ? `${labels.route}: ${origin} → ${destination}` : "",
    cargo ? `${labels.goods}: ${cargo}` : "",
    service ? `${labels.service}: ${service}` : "",
  ].filter(Boolean).join("\n");

  return <ContactView key={message} initialMessage={message} initialService={service} />;
}
