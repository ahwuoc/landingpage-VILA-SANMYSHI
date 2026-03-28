export const CONTACT_MESSAGES = [
  {
    id: "MSG001",
    name: "Nguyễn Văn Hùng",
    email: "hung.nguyen@example.com",
    phone: "0987-654-321",
    subject: "Yêu cầu báo giá vận chuyển đường biển",
    message: "Tôi cần báo giá cho lô hàng 2 container 40HC đi từ cảng Đà Nẵng đến Savannakhet.",
    status: "new",
    date: "2026-03-25 10:30",
  },
  {
    id: "MSG002",
    name: "Trần Thị Lan",
    email: "lan.tran@logistics-pro.vn",
    phone: "0912-345-678",
    subject: "Hỏi về dịch vụ kho bãi Lao Bảo",
    message: "Bên mình còn trống diện tích kho ngoại quan tại Lao Bảo không ạ? Dự kiến tôi gửi hàng vải may mặc.",
    status: "read",
    date: "2026-03-24 15:45",
  },
  {
    id: "MSG003",
    name: "Somsak P.",
    email: "somsak.p@thaitrade.com",
    phone: "+66 81234 5678",
    subject: "International transport query",
    message: "We are looking for a reliable partner for transit from Thailand to Vietnam via Lao Bao border.",
    status: "replied",
    date: "2026-03-23 09:12",
  },
  {
    id: "MSG004",
    name: "Lê Minh Tuấn",
    email: "tuan.le@fmcg-distributor.com",
    phone: "0905-112-233",
    subject: "Tư vấn thủ tục Hải quan",
    message: "Tôi muốn nhờ tư vấn áp mã HS cho mặt hàng linh kiện máy móc nông nghiệp từ Thái Lan.",
    status: "new",
    date: "2026-03-25 08:05",
  }
];

export const CONTACT_STATUS_COLORS: Record<string, string> = {
  new: "bg-rose-500",
  read: "bg-amber-500",
  replied: "bg-emerald-500",
};

export const CONTACT_STATUS_LABELS: Record<string, string> = {
  new: "Chưa đọc",
  read: "Đã đọc",
  replied: "Đã phản hồi",
};
