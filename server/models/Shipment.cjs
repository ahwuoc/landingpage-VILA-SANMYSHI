const mongoose = require("mongoose");
const { DEFAULT_DOCUMENTS } = require("../constants/statuses.cjs");

const timelineSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    label: { type: String, required: true },
    at: { type: Date, default: Date.now },
    note: { type: String, default: "" },
    by: { type: String, default: "Hệ thống" },
  },
  { _id: false },
);

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    uploaded: { type: Boolean, default: false },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const shipmentSchema = new mongoose.Schema(
  {
    trackingCode: { type: String, required: true, unique: true, index: true, uppercase: true, trim: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      zalo: { type: String, default: "" },
    },
    goods: {
      description: { type: String, required: true },
      hsCode: { type: String, default: "" },
      origin: { type: String, default: "" },
      destination: { type: String, default: "" },
    },
    route: { type: String, default: "Việt Nam – Lào – Thái Lan (EWEC)" },
    type: { type: String, default: "Khai báo hải quan" },
    status: { type: String, required: true, default: "received" },
    statusLabel: { type: String, required: true, default: "Đã nhận hồ sơ" },
    owner: { type: String, default: "Chưa phân công" },
    timeline: { type: [timelineSchema], default: [] },
    documents: {
      type: [documentSchema],
      default: () => DEFAULT_DOCUMENTS.map((item) => ({ ...item })),
    },
    tariff: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    riskFlags: { type: [String], default: [] },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

shipmentSchema.index({ status: 1, updatedAt: -1 });

module.exports = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
