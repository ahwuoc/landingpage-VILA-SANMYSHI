require("dotenv").config();
const { connectDatabase, disconnectDatabase } = require("../config/database.cjs");
const Shipment = require("../models/Shipment.cjs");
const Notification = require("../models/Notification.cjs");
const { DEFAULT_DOCUMENTS, STATUS_FLOW, getStatus } = require("../constants/statuses.cjs");
const { triggerNotifications } = require("../services/notificationService.cjs");

function timelineUntil(status, start, notes = {}) {
  const targetIndex = STATUS_FLOW.findIndex((item) => item.key === status);
  return STATUS_FLOW.slice(0, targetIndex + 1).map((item, index) => ({
    status: item.key,
    label: item.label,
    at: new Date(new Date(start).getTime() + index * 3 * 60 * 60 * 1000),
    note: notes[item.key] || (index === 0 ? "Hồ sơ đã được tiếp nhận trên hệ thống." : "Đã hoàn tất bước xử lý theo quy trình."),
    by: index % 2 === 0 ? "Nguyễn Minh Anh" : "Trần Quốc Huy",
  }));
}

function documentsWithMissing(missingNames = []) {
  return DEFAULT_DOCUMENTS.map((document) => ({
    ...document,
    uploaded: !missingNames.includes(document.name),
    note: missingNames.includes(document.name) ? "Đang chờ khách hàng bổ sung" : "Đã kiểm tra",
  }));
}

function shipment(input) {
  const status = getStatus(input.status);
  return {
    route: "Việt Nam – Lào – Thái Lan (EWEC)",
    type: "Khai báo hải quan & vận tải xuyên biên giới",
    tariff: 0,
    value: 0,
    riskFlags: [],
    notes: "Dữ liệu mẫu phục vụ vận hành MVP.",
    ...input,
    statusLabel: status.label,
  };
}

const samples = [
  shipment({
    trackingCode: "VILA-EWEC-001",
    customer: { name: "Công ty TNHH Nông sản Hưng Thịnh", phone: "0905123456", email: "logistics@hungthinh.example", zalo: "0905123456" },
    goods: { description: "Tinh bột sắn đóng bao", hsCode: "1108.14", origin: "Savannakhet, Lào", destination: "Đà Nẵng, Việt Nam" },
    owner: "Nguyễn Minh Anh",
    status: "delivered",
    timeline: timelineUntil("delivered", "2026-08-28T01:00:00.000Z", { cleared: "Tờ khai đã được thông quan tại Lao Bảo.", delivered: "Khách hàng đã xác nhận nhận đủ hàng." }),
    documents: documentsWithMissing(),
    value: 1280000000,
  }),
  shipment({
    trackingCode: "VILA-EWEC-002",
    customer: { name: "Công ty CP Thiết bị Mekong", phone: "0914123456", email: "xnk@mekong-equipment.example", zalo: "0914123456" },
    goods: { description: "Linh kiện máy nông nghiệp", hsCode: "8432.90", origin: "Mukdahan, Thái Lan", destination: "Quảng Trị, Việt Nam" },
    owner: "Trần Quốc Huy",
    status: "cleared",
    timeline: timelineUntil("cleared", "2026-09-02T02:30:00.000Z", { inspection: "Luồng vàng, kiểm tra chi tiết hồ sơ.", cleared: "Đã thông quan, chờ điều phối xe về kho." }),
    documents: documentsWithMissing(),
    value: 2360000000,
  }),
  shipment({
    trackingCode: "VILA-EWEC-003",
    customer: { name: "Công ty TNHH Green Foods Việt", phone: "0935123456", email: "supply@greenfoods.example", zalo: "0935123456" },
    goods: { description: "Nước ép trái cây đóng chai", hsCode: "2009.89", origin: "Quảng Trị, Việt Nam", destination: "Bangkok, Thái Lan" },
    owner: "Lê Thu Trang",
    status: "declared",
    timeline: timelineUntil("declared", "2026-09-05T00:30:00.000Z", { declared: "Tờ khai đã mở, sẵn sàng demo chuyển trạng thái thông quan." }),
    documents: documentsWithMissing(),
    value: 890000000,
  }),
  shipment({
    trackingCode: "VILA-EWEC-004",
    customer: { name: "Công ty CP Gỗ Đông Dương", phone: "0968123456", email: "customs@dongduongwood.example", zalo: "" },
    goods: { description: "Ván gỗ ghép thanh", hsCode: "4418.99", origin: "Pakse, Lào", destination: "Huế, Việt Nam" },
    owner: "Trần Quốc Huy",
    status: "inspection",
    timeline: timelineUntil("inspection", "2026-09-04T03:00:00.000Z", { inspection: "Đang phối hợp kiểm hóa thực tế tại cửa khẩu." }),
    documents: documentsWithMissing(["C/O (nếu áp dụng)"]),
    value: 1750000000,
  }),
  shipment({
    trackingCode: "VILA-EWEC-005",
    customer: { name: "Hợp tác xã Cà phê Khe Sanh", phone: "0977123456", email: "", zalo: "0977123456" },
    goods: { description: "Cà phê rang nguyên hạt", hsCode: "0901.21", origin: "Khe Sanh, Việt Nam", destination: "Savannakhet, Lào" },
    owner: "Nguyễn Minh Anh",
    status: "received",
    timeline: timelineUntil("received", "2026-09-07T01:15:00.000Z", { received: "Đã nhận thông tin sơ bộ; đang chờ bổ sung hồ sơ." }),
    documents: documentsWithMissing(["Hợp đồng ngoại thương", "C/O (nếu áp dụng)"]),
    value: 460000000,
  }),
  shipment({
    trackingCode: "VILA-EWEC-006",
    customer: { name: "Công ty TNHH Bao bì Trung Việt", phone: "0983123456", email: "delivery@trungviet-pack.example", zalo: "0983123456" },
    goods: { description: "Bao bì giấy carton", hsCode: "4819.10", origin: "Đà Nẵng, Việt Nam", destination: "Khon Kaen, Thái Lan" },
    owner: "Lê Thu Trang",
    status: "in_transit",
    timeline: timelineUntil("in_transit", "2026-09-01T04:00:00.000Z", { cleared: "Thông quan tại cặp cửa khẩu Lao Bảo – Dansavanh.", in_transit: "Xe đã rời Savannakhet, đang đi Mukdahan." }),
    documents: documentsWithMissing(),
    value: 720000000,
  }),
];

async function seed() {
  await connectDatabase();
  await Promise.all([Shipment.deleteMany({}), Notification.deleteMany({})]);
  const shipments = await Shipment.insertMany(samples);

  for (const item of shipments.filter((entry) => ["cleared", "in_transit", "delivered"].includes(entry.status))) {
    await triggerNotifications(item);
  }

  console.log(`Seeded ${shipments.length} shipments and ${await Notification.countDocuments()} notifications.`);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
