export default function NewsNewsletter() {
  return (
    <section className="py-24 bg-primary text-on-primary mx-8 my-20 rounded-[4rem] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
          Không muốn bỏ lỡ tin tức quan trọng?
        </h2>
        <p className="text-xl lg:text-2xl opacity-80 mb-12 font-medium">
          Đăng ký nhận bản tin định kỳ hàng tuần trực tiếp vào email của bạn.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Địa chỉ email của bạn"
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all font-medium"
          />
          <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
            Đăng ký ngay
          </button>
        </div>
      </div>
    </section>
  );
}
