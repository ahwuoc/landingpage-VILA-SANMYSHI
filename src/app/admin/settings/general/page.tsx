"use client";

import { useState } from "react";

export default function GeneralSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
  );
  const [saving, setSaving] = useState(false);

  const handleToggle = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !maintenanceMode }),
      });

      if (response.ok) {
        setMaintenanceMode(!maintenanceMode);
        alert("Đã cập nhật chế độ bảo trì. Vui lòng reload trang để áp dụng.");
      } else {
        alert("Lỗi khi cập nhật. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-primary text-3xl">settings</span>
          <h1 className="text-4xl font-black text-on-surface tracking-tight">Cài đặt chung</h1>
        </div>
        <p className="text-on-surface-variant text-lg">Quản lý cài đặt hệ thống và chế độ bảo trì</p>
      </div>

      {/* Maintenance Mode Card */}
      <div className="bg-white rounded-3xl border border-on-surface/5 overflow-hidden shadow-lg">
        <div className="relative p-8 lg:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-start justify-between gap-8 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    maintenanceMode ? "bg-amber-100" : "bg-slate-100"
                  }`}>
                    <span className={`material-symbols-outlined text-4xl transition-colors ${
                      maintenanceMode ? "text-amber-600" : "text-slate-400"
                    }`}>
                      {maintenanceMode ? "construction" : "check_circle"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-on-surface mb-1">Chế độ bảo trì</h2>
                    <p className="text-sm text-on-surface-variant">
                      {maintenanceMode ? "Đang bật - Trang web hiển thị thông báo bảo trì" : "Đang tắt - Trang web hoạt động bình thường"}
                    </p>
                  </div>
                </div>
                
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Khi bật chế độ này, người dùng thường sẽ thấy trang thông báo bảo trì. 
                  Chỉ tài khoản admin mới có thể truy cập dashboard và quản lý nội dung.
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-primary text-xl">check</span>
                    <span className="text-on-surface-variant">Admin vẫn truy cập bình thường</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-primary text-xl">check</span>
                    <span className="text-on-surface-variant">Hiển thị thông tin liên hệ khẩn cấp</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-primary text-xl">check</span>
                    <span className="text-on-surface-variant">Tự động redirect người dùng</span>
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleToggle}
                  disabled={saving}
                  className={`relative inline-flex h-14 w-28 items-center rounded-full transition-all shadow-lg ${
                    maintenanceMode ? "bg-primary" : "bg-slate-300"
                  } ${saving ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
                >
                  <span
                    className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-md transition-transform ${
                      maintenanceMode ? "translate-x-16" : "translate-x-2"
                    }`}
                  />
                </button>
                <span className={`text-xs font-black uppercase tracking-widest ${
                  maintenanceMode ? "text-primary" : "text-slate-400"
                }`}>
                  {maintenanceMode ? "BẬT" : "TẮT"}
                </span>
              </div>
            </div>

            {/* Status Alert */}
            {maintenanceMode && (
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-amber-600 text-2xl animate-pulse">warning</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-amber-900 mb-2"> Chế độ bảo trì đang HOẠT ĐỘNG</p>
                    <p className="text-sm text-amber-800 leading-relaxed mb-3">
                      Người dùng thường đang thấy trang <code className="px-2 py-1 bg-amber-100 rounded text-xs font-mono">/maintenance</code>. 
                      Chỉ admin có thể truy cập dashboard.
                    </p>
                    <a
                      href="/maintenance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                      Xem trang bảo trì
                    </a>
                  </div>
                </div>
              </div>
            )}

            {!maintenanceMode && (
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-emerald-600 text-2xl">check_circle</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-emerald-900 mb-1">✓ Trang web đang hoạt động bình thường</p>
                    <p className="text-sm text-emerald-800">
                      Người dùng có thể truy cập tất cả các trang công khai.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-8 lg:px-12 py-6 bg-slate-50 border-t border-on-surface/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-base">info</span>
            <span>Thay đổi sẽ áp dụng ngay lập tức</span>
          </div>
          {saving && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-bold">Đang lưu...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
