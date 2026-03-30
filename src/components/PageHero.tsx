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
  overlay = "bg-black/20",
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
    <header className="relative pt-40 pb-28 lg:pt-56 lg:pb-40 overflow-hidden bg-page-dark text-on-dark">
      <div className="absolute inset-0">
        <Image src={image} alt={imageAlt} fill className={`object-cover ${imageOpacity}`} priority sizes="100vw" />
        {customOverlay ?? <div className={`absolute inset-0 ${overlay}`} />}
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-8 ${isCenter ? "text-center" : ""}`}>
        <div className={isCenter ? "flex justify-center" : ""}>
          <Breadcrumb items={breadcrumb} isDark={true} />
        </div>

        <div className={`max-w-4xl mt-6 ${isCenter ? "mx-auto" : ""}`}>
          {tag && (
            <div className={`flex items-center gap-3 mb-6 ${isCenter ? "justify-center" : ""}`}>
              <span className="w-10 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-label-md font-black uppercase tracking-widest">{tag}</span>
              {isCenter && <span className="w-10 h-[2px] bg-primary rounded-full" />}
            </div>
          )}

          <h1 className="text-display-lg text-on-dark mb-6 [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.8))]">
            {title}
          </h1>

          {description && (
            <p className={`text-body-lg text-white max-w-2xl [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] ${isCenter ? "mx-auto" : ""}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
