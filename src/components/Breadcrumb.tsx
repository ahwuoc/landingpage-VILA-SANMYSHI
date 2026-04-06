"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  isDark?: boolean;
}

export default function Breadcrumb({ items, isDark = false }: BreadcrumbProps) {
  const t = useTranslations("Navbar");

  return (
    <nav
      className={`flex items-center gap-2 mb-8 text-[10px] uppercase font-bold tracking-[0.2em] animate-fade-up ${isDark ? "text-slate-400" : "text-slate-400"
        }`}
    >
      <Link href="/" className="hover:text-primary transition-colors">
        {t('home')}
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="opacity-40">/</span>
          {item.href ? (
            <Link
              href={item.href as any}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={`${isDark ? "text-white" : "text-slate-900"} font-black`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
