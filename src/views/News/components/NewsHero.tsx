import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function NewsHero() {
  return (
    <header className="relative pt-48 pb-32 overflow-hidden bg-page-dark text-on-dark">
      <div className="absolute inset-0">
        <Image src="/images/news/hero.png" alt="News Hero" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <Breadcrumb items={[{ label: "Tin tức & Sự kiện" }]} isDark={true} />
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-primary rounded-full animate-fade-up" />
            <span className="text-primary text-label-md animate-fade-up">
              Cập nhật thị trường
            </span>
          </div>
          <h1 className="text-display-md text-on-dark mb-8 animate-fade-up [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
            Tin tức & <span className="text-primary">Sự kiện</span>
          </h1>
        </div>
        <p className="text-body-lg text-white max-w-2xl [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
          Cập nhật những biến động mới nhất về chính sách Hải quan, xu hướng
          logistics toàn cầu và các tin tức từ Vila Sanmyshi.
        </p>
      </div>
    </header>
  );
}
