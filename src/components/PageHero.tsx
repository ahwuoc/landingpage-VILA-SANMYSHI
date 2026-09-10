"use client";

import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imageAlt: string;
  overlay?: string;
  imageOpacity?: string;
  align?: "left" | "center";
  customOverlay?: React.ReactNode;
  breadcrumb: BreadcrumbItem[];
  tag?: string;
  title: React.ReactNode;
  description?: string;
}

export default function PageHero({
  image,
  imageAlt,
  overlay = "bg-brand-950/55",
  imageOpacity = "opacity-100",
  align = "left",
  customOverlay,
  breadcrumb,
  tag,
  title,
  description,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <header className="relative min-h-[560px] overflow-hidden bg-brand-900 pb-20 pt-36 text-white lg:min-h-[620px] lg:pb-24 lg:pt-48">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill className={`object-cover ${imageOpacity}`} preload sizes="100vw" />
        {customOverlay ?? <div className={`absolute inset-0 ${overlay}`} />}
      </div>

      <div className={`relative z-10 mx-auto max-w-7xl px-6 sm:px-8 ${isCenter ? "text-center" : ""}`}>
        <div className={isCenter ? "flex justify-center" : ""}>
          <Breadcrumb items={breadcrumb} isDark={true} />
        </div>

        <div className={`max-w-4xl mt-6 ${isCenter ? "mx-auto" : ""}`}>
          {tag && (
            <div className={`mb-6 flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{tag}</span>
            </div>
          )}

          <h1 className="text-display-lg mb-6 max-w-4xl text-white">
            {title}
          </h1>

          {description && (
            <p className={`max-w-2xl text-base font-normal leading-8 text-white/75 lg:text-lg ${isCenter ? "mx-auto" : ""}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
