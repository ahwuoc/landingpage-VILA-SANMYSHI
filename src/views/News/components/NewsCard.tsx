import Image from "next/image";
import Link from "next/link";

import { NewsItem } from "../types";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Link href={`/news/${item.id}`} className="group cursor-pointer">
      <div className="aspect-[4/3] relative rounded-[2.5rem] overflow-hidden mb-8 shadow-lg">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] text-on-surface shadow-sm">
          {item.category}
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant opacity-60 uppercase mb-4 tracking-widest">
          <span>{item.date ? new Date(item.date).toLocaleDateString("vi-VN") : ""}</span>
          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span>{item.author}</span>
        </div>
        <h3 className="text-2xl font-black tracking-tight mb-6 group-hover:text-primary transition-colors leading-tight">
          {item.title}
        </h3>
        <p className="text-on-surface-variant leading-relaxed font-medium opacity-80 line-clamp-2">
          {item.excerpt}
        </p>
        <div className="mt-8 flex items-center gap-2 text-primary overflow-hidden">
          <span className="text-xs font-black uppercase tracking-widest translate-x-0 group-hover:translate-x-2 transition-transform">
            Xem thêm
          </span>
          <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}
