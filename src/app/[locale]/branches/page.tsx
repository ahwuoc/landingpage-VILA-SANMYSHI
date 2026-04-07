import { getTranslations } from "next-intl/server";
import { COMPANY_INFO } from "@/constants/company";
import { BranchesView } from "@/views/Branches/BranchesView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Branches" });
  return {
    title: t("metadata_title"),
  };
}

export default async function BranchesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const branches = [
    {
      id: "hq",
      type: "hq_label",
      name: COMPANY_INFO.name,
      address: COMPANY_INFO.address,
      phone: COMPANY_INFO.hotline,
      email: COMPANY_INFO.email,
      mapUrl: "https://www.google.com/maps?q=" + encodeURIComponent(COMPANY_INFO.address),
      image: "/images/2bab8143-64a1-4ed5-ab59-238f7f1b7d87.png"
    }
  ];

  return <BranchesView branches={branches} />;
}
