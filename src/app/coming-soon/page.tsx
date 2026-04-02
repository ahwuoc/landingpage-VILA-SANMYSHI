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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden font-sans selection:bg-primary/20 selection:text-primary">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-[0.03] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-primary/5" />
      </div>

      {/* LEFT SECTION: Immersive Media Panel */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-screen relative overflow-hidden bg-slate-900 group">
        <Image
          src="/images/coming-soon-bg.png"
          alt="Future of Logistics"
          fill
          className="object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110"
          priority
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white/20 z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply z-10" />

        {/* Animated Brand Logo */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-30">
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden bg-white shadow-xl transition-all duration-500 group-hover/logo:scale-110 ring-4 ring-primary/10">
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
              className="px-4 py-2 bg-white/80 border border-primary/20 rounded-full backdrop-blur-md shadow-sm animate-fade-in"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION: Content / Launch Control */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20 relative z-30 bg-white/40 backdrop-blur-sm lg:border-l lg:border-primary/5">
        <div className="max-w-xl w-full py-12 lg:py-0">
          <div className="space-y-12 animate-fade-up">
            {/* Launch Status */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 border border-primary/20 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--md-primary)]" />
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Hệ thống đang được chuẩn bị hoàn tất</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-on-surface leading-[0.95] tracking-tight uppercase">
                Giải Pháp<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-600 to-primary">Logistics</span> <br />
                Đỉnh Cao
              </h1>

              <p className="text-on-surface-variant text-lg leading-relaxed font-medium max-w-lg">
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
                    className="w-full h-16 bg-primary/5 border border-primary/10 rounded-2xl px-6 text-on-surface placeholder-on-surface-variant/40 focus:outline-none focus:border-primary focus:bg-white transition-all relative z-10 shadow-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="h-16 px-10 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
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

      {/* Decorative Orbs (Right Side) */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
