import Image from "next/image";
import Link from "next/link";

import { NewsItem } from "../types";

interface FeaturedNewsCardProps {
  news: NewsItem;
}

export default function FeaturedNewsCard({ news }: FeaturedNewsCardProps) {
  return (
    <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-8">
      <div className="bg-card rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-on-surface/5">
        <div className="lg:w-3/5 relative min-h-[400px]">
          <Image src={news.image} alt={news.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 60vw" />
        </div>
        <div className="lg:w-2/5 p-12 md:p-20 flex flex-col justify-center">
          <span className="text-primary text-xs font-black uppercase tracking-widest mb-6 block">
            {news.category} | {news.date ? new Date(news.date).toLocaleDateString("vi-VN") : ""}
          </span>
          <h2 className="text-4xl font-black tracking-tight mb-8 leading-tight hover:text-primary transition-colors cursor-pointer">
            {news.title}
          </h2>
          <p className="text-on-surface-variant text-xl lg:text-2xl leading-relaxed mb-10 font-medium opacity-80">
            {news.excerpt}
          </p>
          <Link
            href={`/news/${news.slug || news.id}`}
            className="flex items-center gap-4 group"
          >
            <span className="w-12 h-12 rounded-full border border-on-surface/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
              <span className="material-symbols-outlined text-on-surface group-hover:text-on-primary">
                east
              </span>
            </span>
            <span className="text-sm font-black uppercase tracking-widest">
              Đọc bài viết
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
