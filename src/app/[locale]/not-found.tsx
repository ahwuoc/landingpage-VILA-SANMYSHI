import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative w-24 h-24 mx-auto mb-8 rounded-3xl overflow-hidden shadow-xl">
          <Image src="/images/logo.jpg" alt="VILA SANMYSHI" fill className="object-contain" />
        </div>

        <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4">Lỗi 404</p>

        <h1 className="text-7xl md:text-9xl font-black text-on-surface tracking-tighter leading-none mb-6">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black text-on-surface uppercase tracking-tight mb-4">
          Trang không tồn tại
        </h2>

        <p className="text-on-surface-variant/60 font-medium mb-12 max-w-md mx-auto leading-relaxed">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-on-primary px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-glow-primary hover:scale-[0.98] transition-all duration-300"
          >
            Về trang chủ
          </Link>
          <Link
            href="/contact"
            className="bg-surface-container-high text-on-surface px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-on-surface hover:text-white transition-all duration-300 border border-on-surface/5"
          >
            Liên hệ hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  );
}
