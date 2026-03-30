import Image from "next/image";
import Link from "next/link";
import { getNewsById, getNewsList } from "@/lib/data";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumb from "@/components/Breadcrumb";

export default async function NewsDetailView({ id }: { id: string }) {
  const [newsItem, allNews] = await Promise.all([
    getNewsById(id),
    getNewsList(),
  ]);

  if (!newsItem) notFound();

  const otherNews = allNews.filter(item => item.id.toString() !== id).slice(0, 3);

  return (
    <article className="bg-surface">
      {/* Article Header */}
      <header className="relative pt-48 pb-20 overflow-hidden bg-page-dark">
        <div className="absolute inset-0 opacity-20">
          <Image src={newsItem.image} alt={newsItem.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <Breadcrumb items={[{ label: "Tin tức", href: "/news" }, { label: "Chi tiết" }]} isDark={true} />
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary mb-6">
            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full border border-primary/20">{newsItem.category}</span>
            <span className="text-on-dark-faint">{newsItem.date ? new Date(newsItem.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) : ""}</span>
          </div>
          <h1 className="text-display-md text-on-dark mb-8">{newsItem.title}</h1>
          <div className="flex items-center gap-4 text-body-sm text-on-dark-muted">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-on-dark/10">
              <span className="material-symbols-outlined text-sm text-primary">person</span>
            </div>
            <div>
              <div className="text-label-sm text-on-dark-faint mb-1">Tác giả</div>
              <div>{newsItem.author}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row gap-20">
        {/* Post Content */}
        <div className="lg:w-2/3">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl mb-16 border-8 border-surface-container-lowest">
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          <div
            className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed font-medium 
              prose-headings:text-on-surface prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase
              prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12
              prose-p:mb-8
              prose-ul:mb-12 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface-container-low prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-black prose-blockquote:text-on-surface"
            dangerouslySetInnerHTML={{ __html: newsItem.content || "" }}
          />

          <ShareButtons title={newsItem.title} />
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-40 space-y-12">
            <div className="p-10 bg-card rounded-[3rem] shadow-xl border border-on-surface/5">
              <h4 className="text-xl font-black tracking-tight uppercase mb-8 pb-4 border-b border-on-surface/5">Bài viết khác</h4>
              <div className="space-y-10">
                {otherNews.map(item => (
                  <Link key={item.id} href={`/news/${item.slug || item.id}`} className="group block">
                    <div className="flex gap-6 items-center">
                      <div className="w-20 h-20 relative rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{item.category}</div>
                        <h5 className="text-sm font-black tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-10 bg-primary text-on-primary rounded-[3rem] shadow-glow-primary overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -translate-x-1/2 -translate-y-1/2" />
              <h4 className="text-xl font-black tracking-tight uppercase mb-4 relative z-10">Cần tư vấn ngay?</h4>
              <p className="text-base opacity-80 mb-8 font-medium relative z-10">Đừng ngần ngại liên hệ với chuyên gia của Vila Sanmyshi.</p>
              <Link href="/contact" className="block w-full bg-on-primary text-primary py-4 rounded-xl font-black text-xs text-center uppercase tracking-widest hover:scale-[0.98] transition-all relative z-10">
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
