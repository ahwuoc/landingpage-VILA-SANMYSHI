"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewsNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email, source: "News Page" }]);

      if (error) {
        if (error.code === "23505") {
          setMessage("Email này đã đăng ký trước đó rồi ạ!");
        } else {
          throw error;
        }
        setStatus("error");
      } else {
        setStatus("success");
        setMessage("Cảm ơn bạn! Chúng tôi đã ghi nhận đăng ký thành công.");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Có lỗi xảy ra, vui lòng thử lại sau nhé!");
    }
  };

  return (
    <section className="py-12 md:py-24 bg-primary text-on-primary my-10 md:my-20 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-primary-dark/20 rounded-[2rem] md:rounded-[4rem] relative overflow-hidden py-12 md:py-24 border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 text-center">
            <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-8 tracking-tighter uppercase leading-tight">
              Không muốn bỏ lỡ <br className="block md:hidden" /> tin tức quan trọng?
            </h2>
            <p className="text-base md:text-xl lg:text-2xl opacity-80 mb-8 md:mb-12 font-medium max-w-2xl mx-auto">
              Đăng ký nhận bản tin định kỳ hàng tuần trực tiếp vào email của bạn.
            </p>

            {status === "success" ? (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 animate-fade-in">
                <span className="material-symbols-outlined text-4xl md:text-5xl mb-4 text-white">check_circle</span>
                <p className="text-lg md:text-xl font-bold">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="flex-1 relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Địa chỉ email của bạn"
                    disabled={status === "loading"}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 md:px-8 py-4 md:py-5 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all font-medium disabled:opacity-50"
                  />
                  {status === "error" && (
                    <span className="absolute -bottom-6 left-2 text-[10px] font-bold text-white/80 animate-shake">
                      {message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-white text-primary px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {status === "loading" ? "Đang xử lý..." : "Đăng ký ngay"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
