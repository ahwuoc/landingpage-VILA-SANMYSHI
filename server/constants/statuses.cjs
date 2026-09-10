const STATUS_FLOW = [
  { key: "received", label: "Đã nhận hồ sơ", notify: true },
  { key: "reviewing_hs", label: "Đang tra mã HS / chính sách", notify: false },
  { key: "declared", label: "Đã mở tờ khai hải quan", notify: true },
  { key: "inspection", label: "Đang kiểm hoá / phân luồng", notify: false },
  { key: "tax_paid", label: "Đã nộp thuế / đặt bảo đảm", notify: false },
  { key: "cleared", label: "ĐÃ THÔNG QUAN", notify: true },
  { key: "in_transit", label: "Đang vận chuyển", notify: true },
  { key: "delivered", label: "Đã bàn giao", notify: true },
];

const DEFAULT_DOCUMENTS = [
  { name: "Commercial Invoice", uploaded: false, note: "" },
  { name: "Packing List", uploaded: false, note: "" },
  { name: "Hợp đồng ngoại thương", uploaded: false, note: "" },
  { name: "Vận đơn (B/L/CMR)", uploaded: false, note: "" },
  { name: "C/O (nếu áp dụng)", uploaded: false, note: "" },
  { name: "Giấy phép chuyên ngành (theo mặt hàng)", uploaded: false, note: "" },
];

function getStatus(status) {
  return STATUS_FLOW.find((item) => item.key === status);
}

module.exports = { STATUS_FLOW, DEFAULT_DOCUMENTS, getStatus };
