"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, FileText, User, Mail, Phone, Calendar, Info, ChevronDown, Check } from "lucide-react";
import TiptapEditor from "@/components/admin/TiptapEditor";
import { supabase } from "@/lib/supabase";

export default function ReplyConsultationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [consultation, setConsultation] = useState<any>(null);
  const [response, setResponse] = useState("");
  const [templates, setTemplates] = useState<any[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchConsultation();
    fetchTemplates();
  }, [id]);

  async function fetchTemplates() {
    const { data } = await supabase
      .from("templates")
      .select("*")
      .eq("type", "reply")
      .order("name");
    setTemplates(data || []);
  }

  async function fetchConsultation() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setConsultation(data);

      if (data && data.status === 'new') {
        await supabase
          .from("contacts")
          .update({ status: 'processing' })
          .eq("id", id);
      }
    } catch (error) {
      console.error("Lỗi khi tải thông tin tư vấn:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleApplyTemplate = (templateContent: string) => {
    let content = templateContent
      .replace(/{name}/g, consultation.name)
      .replace(/{subject}/g, consultation.subject);

    setResponse(content);
    setShowTemplates(false);
  };

  const handleSend = async () => {
    if (!response) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/admin/contacts/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: consultation.email,
          subject: `Phản hồi yêu cầu tư vấn: ${consultation.subject}`,
          html: response,
          consultationId: consultation.id,
        }),
      });

      if (res.ok) {
        await supabase
          .from("contacts")
          .update({ status: 'replied' })
          .eq("id", consultation.id);

        alert("Phản hồi đã được gửi thành công tới khách hàng!");
        router.push("/admin/contacts");
      } else {
        const error = await res.json();
        throw new Error(error.error || "Gửi email thất bại");
      }
    } catch (error: any) {
      alert(`Đã xảy ra lỗi: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!consultation) {
    return (
      <div className="p-20 text-center uppercase font-black text-on-surface-variant/40">
        Không tìm thấy yêu cầu tư vấn
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center gap-4 mb-10 text-on-surface">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white rounded-2xl border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-1">Trả lời tư vấn</h2>
          <p className="text-sm text-on-surface-variant/60 font-medium italic">Gửi giải pháp chuyên nghiệp tới khách hàng.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: INFO CARD */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-on-surface/5 shadow-sm p-8 sticky top-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
              <Info size={14} /> Thông tin yêu cầu
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Khách hàng</p>
                  <p className="font-black text-on-surface leading-snug">{consultation.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Email</p>
                  <p className="font-bold text-on-surface text-sm truncate">{consultation.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Số điện thoại</p>
                  <p className="font-bold text-on-surface font-mono">{consultation.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">Ngày nhận</p>
                  <p className="font-bold text-on-surface text-sm">{consultation.date ? new Date(consultation.date).toLocaleDateString('vi-VN') : "..."}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-on-surface/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-3">Nội dung khách viết:</p>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 italic text-sm text-rose-900 leading-relaxed font-medium">
                "{consultation.message}"
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: EDITOR */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-on-surface/5 shadow-sm p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-on-surface uppercase tracking-tight flex items-center gap-3">
                <FileText className="text-primary" /> Soạn bài tư vấn
              </h3>

              <div className="relative">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center gap-3 px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  Sử dụng Template mẫu <ChevronDown size={14} />
                </button>

                {showTemplates && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-on-surface/5 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-4 bg-slate-50 border-b border-on-surface/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chọn mẫu có sẵn</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {templates.length === 0 ? (
                        <p className="p-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Chưa có mẫu nào</p>
                      ) : (
                        templates.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => handleApplyTemplate(t.content)}
                            className="w-full text-left p-4 hover:bg-primary/5 transition-colors border-b border-on-surface/5 last:border-0 group flex items-center justify-between"
                          >
                            <span className="text-xs font-black text-on-surface group-hover:text-primary transition-colors">{t.name}</span>
                            <Check size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))
                      )}
                    </div>
                    <div className="p-3 bg-slate-900">
                      <button
                        onClick={() => router.push('/admin/templates/new')}
                        className="w-full py-2 text-[9px] font-black text-white uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2"
                      >
                        + Tạo mẫu mới
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <TiptapEditor
              value={response}
              onChange={setResponse}
              placeholder="Nhập nội dung tư vấn kỹ thuật hoặc giải pháp logistics tại đây..."
            />

            <div className="mt-10 flex justify-end gap-4">
              <button
                onClick={() => router.back()}
                className="px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60 hover:bg-slate-50 rounded-2xl transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSend}
                disabled={!response || isSending}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-glow-primary transition-all active:scale-95 ${!response || isSending ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:brightness-110'
                  }`}
              >
                {isSending ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                GỬI PHẢN HỒI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
