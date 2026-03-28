"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft, User, Mail,
  Phone, FileText, Camera,
  Save, ShieldCheck, Loader2
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    avatar: "",
    bio: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const resp = await fetch("/api/admin/me");
      if (!resp.ok) throw new Error("Unauthorized");
      const data = await resp.json();
      setUser(data);
      setFormData({
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        avatar: data.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2000&auto=format&fit=crop",
        bio: data.bio || ""
      });
    } catch (e) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          avatar: formData.avatar,
          bio: formData.bio,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

      if (error) throw error;
      alert("Cập nhật hồ sơ thành công!");
      router.refresh();
    } catch (error: any) {
      alert("Lỗi khi lưu: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 text-on-surface">
      <div className="flex items-center gap-4 mb-10 text-on-surface">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white rounded-2xl border border-on-surface/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-1">Hồ sơ cá nhân</h2>
          <p className="text-sm text-on-surface-variant/60 font-medium italic">Quản lý thông tin quản trị viên và thông tin hiển thị tác giả.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Left column - Avatar & basic info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border border-on-surface/5 shadow-2xl shadow-primary/5 flex flex-col items-center text-center">
            <div className="relative group mb-8">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden ring-8 ring-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
                {formData.avatar ? (
                  <Image
                    src={formData.avatar}
                    alt="Avatar"
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                ) : (
                  <User size={64} className="text-slate-300" />
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-1 right-1 w-12 h-12 bg-primary text-white rounded-2xl border-4 border-white flex items-center justify-center shadow-lg hover:brightness-110 active:scale-90 transition-all cursor-pointer"
              >
                <Camera size={20} />
              </button>
            </div>

            <h3 className="text-2xl font-black tracking-tight text-on-surface mb-1">{formData.full_name || "Quản trị viên"}</h3>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck size={14} /> Administrator
            </p>

            <div className="w-full h-[1px] bg-slate-100 mb-8" />

            <div className="w-full space-y-4">
              <div className="flex items-center gap-4 text-left p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-on-surface-variant/40">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-on-surface-variant/30 leading-none mb-1">Email</p>
                  <p className="text-xs font-bold text-on-surface leading-none">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-on-surface-variant/40">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-on-surface-variant/30 leading-none mb-1">Số điện thoại</p>
                  <p className="text-xs font-bold text-on-surface leading-none">{formData.phone || "Chưa cập nhật"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Edit form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-12 border border-on-surface/5 shadow-2xl shadow-primary/5 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <User size={14} /> Chỉnh sửa thông tin cơ bản
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Họ và tên</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full bg-slate-50 border border-transparent rounded-2xl p-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Số điện thoại</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className="w-full bg-slate-50 border border-transparent rounded-2xl p-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1">Đường dẫn ảnh đại diện (Avatar URL)</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-transparent rounded-2xl p-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 ml-1 flex items-center justify-between">
                <span>Giới thiệu bản thân (Bio)</span>
                <span className="capitalize text-primary">Thông tin bổ sung</span>
              </label>
              <textarea
                rows={5}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Giới thiệu ngắn gọn về bản thân hoặc kinh nghiệm của bạn..."
                className="w-full bg-slate-50 border border-transparent rounded-[2rem] p-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary focus:outline-none transition-all"
              />
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-4 bg-primary text-white px-12 py-5 rounded-3xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                {saving ? "Đang lưu..." : "Lưu thay đổi hồ sơ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
