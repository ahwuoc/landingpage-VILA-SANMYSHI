"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft, Mail, Server,
  Lock, User, UserCheck,
  Save, AlertCircle, CheckCircle2
} from "lucide-react";

export default function EmailSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    host: "",
    port: 587,
    user_email: "",
    password: "",
    from_email: "",
    from_name: "",
    receive_notifications: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from("smtp_settings")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Lỗi khi tải cài đặt:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("smtp_settings")
        .update({
          ...settings,
          updated_at: new Date().toISOString()
        })
        .eq("id", 1);

      if (error) throw error;
      alert("Đã cập nhật cài đặt Email thành công!");
    } catch (error: any) {
      alert("Lỗi khi lưu: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 text-on-surface">
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white rounded-2xl border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-1">Cài đặt Email (SMTP)</h2>
          <p className="text-sm text-on-surface-variant/60 font-medium italic">Quản lý tài khoản gửi email cho hệ thống VILA SANMYSHI.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] border border-on-surface/5 shadow-2xl shadow-primary/5 p-12 space-y-12">

          {/* SMTP Server Info */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-3 bg-primary/5 w-fit px-4 py-2 rounded-full">
              <Server size={14} /> Thông tin máy chủ (SMTP)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">SMTP Host</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors">
                    <Server size={18} />
                  </div>
                  <input
                    type="text"
                    value={settings.host}
                    onChange={(e) => setSettings({ ...settings, host: e.target.value })}
                    placeholder="VD: smtp.gmail.com"
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">SMTP Port</label>
                <input
                  type="number"
                  value={settings.port}
                  onChange={(e) => setSettings({ ...settings, port: parseInt(e.target.value) })}
                  placeholder="587"
                  className="w-full bg-slate-50 border border-transparent rounded-2xl py-4 px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div className="space-y-8 pt-8 border-t border-dashed border-on-surface/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-3 bg-primary/5 w-fit px-4 py-2 rounded-full">
              <Lock size={14} /> Xác thực tài khoản
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Email / Tài khoản</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="email"
                    value={settings.user_email}
                    onChange={(e) => setSettings({ ...settings, user_email: e.target.value })}
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Mật khẩu (App Password)</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={settings.password}
                    onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* System Config */}
          <div className="space-y-8 pt-8 border-t border-dashed border-on-surface/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-secondary flex items-center gap-3 bg-secondary/5 w-fit px-4 py-2 rounded-full">
              <AlertCircle size={14} /> Cấu hình hệ thống
            </h3>

            <div className="bg-slate-50 p-6 rounded-[2rem] flex items-center justify-between group hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-on-surface uppercase tracking-tight">Nhận thông báo Mail</h4>
                  <p className="text-[10px] text-on-surface-variant/60 font-medium italic">Tự động gửi email thông báo cho bạn khi có khách hàng để lại yêu cầu tư vấn mới.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, receive_notifications: !settings.receive_notifications })}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings.receive_notifications ? 'bg-secondary' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${settings.receive_notifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          {/* Sender Info */}
          <div className="space-y-8 pt-8 border-t border-dashed border-on-surface/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-3 bg-primary/5 w-fit px-4 py-2 rounded-full">
              <Mail size={14} /> Thông tin người gửi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Email hiển thị người gửi</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={settings.from_email}
                    onChange={(e) => setSettings({ ...settings, from_email: e.target.value })}
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Tên hiển thị người gửi</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 group-focus-within:text-primary transition-colors">
                    <UserCheck size={18} />
                  </div>
                  <input
                    type="text"
                    value={settings.from_name}
                    onChange={(e) => setSettings({ ...settings, from_name: e.target.value })}
                    placeholder="VILA SANMYSHI"
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-4 bg-primary text-white px-12 py-5 rounded-3xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
              ) : (
                <Save size={18} />
              )}
              {saving ? "Đang lưu..." : "Lưu cài đặt Email"}
            </button>
          </div>
        </div>

        <div className="mt-12 bg-amber-50 rounded-3xl p-8 border border-amber-200 flex items-start gap-4">
          <AlertCircle className="text-amber-500 mt-1 shrink-0" size={24} />
          <div className="space-y-2">
            <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">Lưu ý quan trọng:</h4>
            <div className="text-[11px] text-amber-800 font-medium leading-relaxed italic">
              Nếu sử dụng Gmail, bạn cần tạo "Mật khẩu ứng dụng" (App Password) thay vì mật khẩu thông thường để có quyền gửi email. Kiểm tra lại thông tin Host và Port chính xác để việc phản hồi khách hàng không bị gián đoạn.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
