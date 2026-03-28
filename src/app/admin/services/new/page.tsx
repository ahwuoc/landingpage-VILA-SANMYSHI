"use client";

import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase mb-2">Thêm dịch vụ mới</h2>
        <p className="text-sm text-on-surface-variant/60 font-medium">Tạo dịch vụ vận tải và logistics mới cho hệ thống VILA SANMYSHI.</p>
      </div>

      <ServiceForm />
    </div>
  );
}
