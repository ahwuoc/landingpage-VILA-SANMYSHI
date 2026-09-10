import Image from "next/image";
import Link from "next/link";
import Countdown from "./Countdown";

export const metadata = {
  title: "Sắp Ra Mắt | VILA SANMYSHI",
  description: "Trang web chính thức của VILA SANMYSHI đang trong giai đoạn hoàn thiện. Giải pháp Logistics & Khai báo Hải quan chuyên nghiệp tại Cửa khẩu Lao Bảo.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white font-sans selection:bg-primary/20 selection:text-primary lg:flex-row">
      {/* LEFT SECTION: Immersive Media Panel */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen relative overflow-hidden bg-slate-900 group">
        <Image
          src="/images/coming-soon-bg.png"
          alt="Future of Logistics"
          fill
          className="object-cover"
          preload
        />

        <div className="absolute inset-0 z-10 bg-brand-950/20" />

        {/* Animated Brand Logo */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-30">
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-brand-200 bg-white shadow-[var(--shadow-card)] lg:h-16 lg:w-16">
              <Image src="/images/logo.jpg" alt="VILA SANMYSHI" fill className="object-contain p-2" />
            </div>
            <div className="hidden sm:block">
              <p className="text-on-surface font-black tracking-tighter text-xl leading-none uppercase">VILA</p>
              <p className="text-primary font-black tracking-tighter text-xl leading-none uppercase">SANMYSHI</p>
            </div>
          </Link>
        </div>

        {/* Feature Tags (Floating) */}
        <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4 z-20">
          {["Hiệu Suất", "Chính Xác", "Toàn Cầu"].map((tag, i) => (
            <div
              key={tag}
              className="animate-fade-in rounded-lg border border-brand-200 bg-white/95 px-4 py-2 shadow-[var(--shadow-card)]"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION: Content / Launch Control */}
      <div className="relative z-30 flex w-full items-center justify-center border-brand-200 bg-white p-6 lg:w-1/2 lg:border-l lg:p-20">
        <div className="max-w-xl w-full py-12 lg:py-0">
          <div className="space-y-12 animate-fade-up">
            {/* Launch Status */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Hệ thống đang được chuẩn bị hoàn tất</span>
              </div>

              <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-on-surface lg:text-7xl">
                Giải Pháp<br />
                <span className="text-primary">Logistics</span> <br />
                Đỉnh Cao
              </h1>

              <p className="max-w-lg text-base font-normal leading-8 text-on-surface-variant lg:text-lg">
                VILA SANMYSHI đang thiết lập một tiêu chuẩn mới cho dịch vụ giao nhận và thông quan hàng hóa. <span className="text-primary font-bold">Chúng tôi sẽ trở lại trong thời gian ngắn nhất.</span>
              </p>
            </div>

            {/* Countdown Component */}
            <div className="py-6 border-y border-primary/10">
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.4em] mb-6 block text-center lg:text-left">Thời gian chờ dự kiến</p>
              <div className="flex justify-center lg:justify-start">
                <Countdown />
              </div>
            </div>

            {/* Notify Form */}
            <div className="space-y-6">
              <p className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] pl-1">Nhận thông báo khi chúng tôi ra mắt</p>

              <form className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <input
                    type="email"
                    placeholder="Địa chỉ email của bạn"
                    className="relative z-10 h-16 w-full rounded-xl border border-brand-200 bg-brand-50 px-6 text-on-surface placeholder-on-surface-variant/40 transition-colors focus:border-primary focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="h-16 rounded-xl bg-primary px-10 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-700"
                >
                  Kết Nối
                </button>
              </form>
            </div>

            {/* Footer / Social Quick Links */}
            <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-primary/10">
              <div className="flex items-center gap-6">
                {[
                  { icon: 'phone_in_talk', label: '0913 497 246', href: 'tel:0913497246' },
                  { icon: 'share', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61580846237727' }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 group/social"
                  >
                    <span className="material-symbols-outlined text-primary/40 text-lg group-hover/social:text-primary transition-colors">{item.icon}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest group-hover/social:text-primary transition-colors">{item.label}</span>
                  </a>
                ))}
              </div>

              <div className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">
                VILA SANMYSHI &copy; 2026
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
