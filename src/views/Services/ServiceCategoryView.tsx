"use client";

import type { ServiceItem } from "@/lib/data";
import ServicesView from "./ServicesView";

export default function ServiceCategoryView({ services, categorySlug, categoryName }: {
  services: ServiceItem[];
  categorySlug: string;
  categoryName: string;
}) {
  return <ServicesView services={services} categorySlug={categorySlug} categoryName={categoryName} categoryPage />;
}
