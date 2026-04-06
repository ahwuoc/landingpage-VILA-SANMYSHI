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

export default function ContactPage() {
  return <ContactView />;
}
