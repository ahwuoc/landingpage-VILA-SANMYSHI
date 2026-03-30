"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "../types";

interface NewsGridProps {
  newsList: NewsItem[];
  categories: string[];
}

export default function NewsGrid({ newsList, categories }: NewsGridProps) {
  const [active, setActive] = useState("Tất cả");

  const filtered = active === "Tất cả"
    ? newsList
    : newsList.filter(n => n.category === active);

  return (
    <section className="py-20 max-w-7xl mx-auto px-8">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-label-md">Mới nhất</span>
          </div>
          <h2 className="text-heading-lg">
            Tin tức <span className="text-primary">thị trường</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                active === cat
                  ? "bg-primary text-on-primary border-primary"
                  : "border-on-surface/10 hover:bg-surface-container-high"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-on-surface/5">
        {filtered.length === 0 && (
          <p className="text-muted text-center py-16 text-body-md">Không có bài viết nào.</p>
        )}
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug || item.id}`}
            className="group flex gap-6 py-6 hover:bg-surface-container-low rounded-2xl px-4 -mx-4 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative w-32 h-24 lg:w-48 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="200px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-faint font-bold uppercase tracking-widest">
                    {item.date ? new Date(item.date).toLocaleDateString("vi-VN") : ""}
                  </span>
                </div>
                <h3 className="text-base lg:text-lg font-black tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-body-sm text-muted line-clamp-2 hidden sm:block">
                  {item.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs font-bold text-faint uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">person</span>
                <span>{item.author}</span>
                <span className="ml-auto flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Đọc thêm</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
