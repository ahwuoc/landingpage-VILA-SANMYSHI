import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Đang bảo trì | VILA SANMYSHI",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
      {/* Immersive Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 mesh-gradient" />
      </div>

      {/* LEFT SECTION: Full Media Panel */}
      <div className="w-full lg:w-3/5 h-[50vh] lg:h-screen relative overflow-hidden bg-slate-900 group">
        <Image
          src="/images/2bab8143-64a1-4ed5-ab59-238f7f1b7d87.png"
          alt="System Maintenance"
          fill
          className="object-cover lg:object-contain p-0 lg:p-12 transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          priority
        />

        {/* Dynamic Overlays to make it "Beautiful" */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

        {/* Animated Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(36,232,125,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20 animate-pulse" />

        {/* Floating ID Tag / Brand Branding */}
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-30">
          <Link href="/" className="flex items-center gap-4 group/logo">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden bg-white shadow-2xl transition-all duration-500 group-hover/logo:scale-110">
              <Image src="/images/logo.jpg" alt="VILA SANMYSHI" fill className="object-contain p-2" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-black tracking-tighter text-lg leading-none">VILA</p>
              <p className="text-primary font-black tracking-tighter text-lg leading-none">SANMYSHI</p>
            </div>
          </Link>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--md-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* RIGHT SECTION: Control Center / Info Panel */}
      <div className="w-full lg:w-2/5 h-screen overflow-y-auto lg:overflow-visible flex items-center justify-center p-6 lg:p-12 relative z-30 bg-slate-950/90 backdrop-blur-3xl border-l border-white/5">
        <div className="max-w-md w-full py-12 lg:py-0">
          <div className="space-y-10 animate-fade-up">
            {/* Status Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-md">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Operational Status: Optimizing</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight uppercase">
                Hệ thống đang <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Được tối ưu</span>
              </h1>

              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Chúng tôi đang thực hiện bảo trì định kỳ để đảm bảo tính ổn định và tốc độ xử lý hàng hóa nhanh nhất tại cửa khẩu.
              </p>
            </div>

            {/* Advanced Progress Card */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-6 relative overflow-hidden group/progress">
              <div className="flex justify-between items-end relative z-10">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Efficiency Load</span>
                <span className="text-3xl font-black text-white tabular-nums">65%</span>
              </div>

              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden relative z-10">
                <div
                  className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full relative transition-all duration-[3000ms] shadow-[0_0_15px_rgba(36,232,125,0.3)]"
                  style={{ width: '65%' }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-marquee w-[200%]" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-xs animate-spin">sync</span>
                Đang nạp cơ sở dữ liệu mới...
              </div>
            </div>

            {/* Quick Contact - Simplified & Elegant */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] pl-2">Support Channels</p>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href="tel:0913497246"
                  className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-primary/50 transition-all group/item"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary text-xl">phone_iphone</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Hotline 24/7</p>
                      <p className="text-white font-black group-hover/item:text-primary transition-colors">0913 497 246</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover/item:translate-x-1 group-hover/item:text-primary transition-all">chevron_right</span>
                </a>

                <a
                  href="mailto:contact@vila-sanmyshi.com"
                  className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-emerald-500/50 transition-all group/item"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover/item:bg-emerald-500/20 transition-colors">
                      <span className="material-symbols-outlined text-emerald-400 text-xl">alternate_email</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Email Support</p>
                      <p className="text-white font-black group-hover/item:text-emerald-400 transition-colors">contact@vila-sanmyshi.com</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover/item:translate-x-1 group-hover/item:text-emerald-400 transition-all">chevron_right</span>
                </a>
              </div>
            </div>

            {/* Footer Details */}
            <div className="pt-10 flex items-center justify-between">
              <Link
                href="/admin"
                className="text-[10px] font-black text-slate-600 hover:text-primary uppercase tracking-[0.2em] transition-colors"
              >
                Access Portal
              </Link>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                Est. 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
