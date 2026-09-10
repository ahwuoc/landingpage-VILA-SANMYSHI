const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment", required: true, index: true },
    trackingCode: { type: String, required: true, index: true },
    channel: { type: String, enum: ["zalo", "email", "sms"], required: true },
    template: { type: String, required: true },
    recipient: { type: String, required: true },
    content: { type: String, required: true },
    triggerStatus: { type: String, required: true },
    status: { type: String, enum: ["queued", "sent", "failed"], default: "queued" },
    sentAt: { type: Date },
  },
  { timestamps: true },
);

notificationSchema.index({ trackingCode: 1, createdAt: -1 });

module.exports = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
