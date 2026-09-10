const express = require("express");
const mongoose = require("mongoose");
const Shipment = require("../models/Shipment.cjs");
const Notification = require("../models/Notification.cjs");
const { DEFAULT_DOCUMENTS, STATUS_FLOW, getStatus } = require("../constants/statuses.cjs");
const { triggerNotifications } = require("../services/notificationService.cjs");

const router = express.Router();

function serializePublicShipment(shipment) {
  return {
    id: String(shipment._id),
    trackingCode: shipment.trackingCode,
    goods: shipment.goods,
    route: shipment.route,
    type: shipment.type,
    status: shipment.status,
    statusLabel: shipment.statusLabel,
    owner: shipment.owner,
    timeline: shipment.timeline,
    documents: shipment.documents,
    updatedAt: shipment.updatedAt,
  };
}

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.get("/health", (_request, response) => {
  response.json({ ok: true, service: "vila-clearance-tracker", time: new Date().toISOString() });
});

router.get("/track/:code", async (request, response, next) => {
  try {
    const shipment = await Shipment.findOne({ trackingCode: request.params.code.trim().toUpperCase() }).lean();
    if (!shipment) return response.status(404).json({ message: "Không tìm thấy mã lô hàng." });
    return response.json(serializePublicShipment(shipment));
  } catch (error) {
    return next(error);
  }
});

router.get("/shipments", async (_request, response, next) => {
  try {
    const shipments = await Shipment.find().sort({ updatedAt: -1 }).lean();
    return response.json(shipments);
  } catch (error) {
    return next(error);
  }
});

router.post("/shipments", async (request, response, next) => {
  try {
    const trackingCode = String(request.body.trackingCode || "").trim().toUpperCase();
    if (!trackingCode || !request.body.customer?.name || !request.body.goods?.description) {
      return response.status(400).json({ message: "trackingCode, customer.name và goods.description là bắt buộc." });
    }

    const receivedStatus = getStatus("received");
    const shipment = await Shipment.create({
      ...request.body,
      trackingCode,
      status: "received",
      statusLabel: receivedStatus.label,
      documents: request.body.documents?.length ? request.body.documents : DEFAULT_DOCUMENTS,
      timeline: [
        {
          status: "received",
          label: receivedStatus.label,
          note: request.body.notes || "Hồ sơ đã được tiếp nhận trên hệ thống.",
          by: request.body.owner || "Hệ thống",
        },
      ],
    });

    const notifications = await triggerNotifications(shipment);
    return response.status(201).json({ shipment, notifications });
  } catch (error) {
    if (error?.code === 11000) return response.status(409).json({ message: "Mã tracking đã tồn tại." });
    return next(error);
  }
});

router.get("/shipments/:id", async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) return response.status(400).json({ message: "ID không hợp lệ." });
    const shipment = await Shipment.findById(request.params.id).lean();
    if (!shipment) return response.status(404).json({ message: "Không tìm thấy lô hàng." });
    return response.json(shipment);
  } catch (error) {
    return next(error);
  }
});

router.patch("/shipments/:id/status", async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) return response.status(400).json({ message: "ID không hợp lệ." });
    const statusDefinition = getStatus(request.body.status);
    if (!statusDefinition) {
      return response.status(400).json({ message: "Trạng thái không hợp lệ.", allowed: STATUS_FLOW.map((item) => item.key) });
    }

    const shipment = await Shipment.findById(request.params.id);
    if (!shipment) return response.status(404).json({ message: "Không tìm thấy lô hàng." });

    shipment.status = statusDefinition.key;
    shipment.statusLabel = statusDefinition.label;
    shipment.timeline.push({
      status: statusDefinition.key,
      label: statusDefinition.label,
      at: new Date(),
      note: String(request.body.note || "").trim(),
      by: String(request.body.by || "Admin VILA SANMYSHI").trim(),
    });
    await shipment.save();

    const notifications = statusDefinition.notify ? await triggerNotifications(shipment) : [];
    return response.json({ shipment, notifications });
  } catch (error) {
    return next(error);
  }
});

router.patch("/shipments/:id/documents", async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) return response.status(400).json({ message: "ID không hợp lệ." });
    const shipment = await Shipment.findById(request.params.id);
    if (!shipment) return response.status(404).json({ message: "Không tìm thấy lô hàng." });

    const index = Number.isInteger(request.body.index)
      ? request.body.index
      : shipment.documents.findIndex((item) => item.name === request.body.name);
    if (index < 0 || index >= shipment.documents.length) {
      return response.status(400).json({ message: "Không tìm thấy mục chứng từ cần cập nhật." });
    }

    shipment.documents[index].uploaded = Boolean(request.body.uploaded);
    if (typeof request.body.note === "string") shipment.documents[index].note = request.body.note.trim();
    await shipment.save();
    return response.json(shipment);
  } catch (error) {
    return next(error);
  }
});

router.get("/shipments/:id/notifications", async (request, response, next) => {
  try {
    if (!isValidId(request.params.id)) return response.status(400).json({ message: "ID không hợp lệ." });
    const notifications = await Notification.find({ shipmentId: request.params.id }).sort({ createdAt: -1 }).lean();
    return response.json(notifications);
  } catch (error) {
    return next(error);
  }
});

router.get("/dashboard", async (_request, response, next) => {
  try {
    const [total, cleared, missingDocuments, statusCounts] = await Promise.all([
      Shipment.countDocuments(),
      Shipment.countDocuments({ status: { $in: ["cleared", "in_transit", "delivered"] } }),
      Shipment.countDocuments({ documents: { $elemMatch: { uploaded: false } } }),
      Shipment.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    ]);

    return response.json({
      total,
      cleared,
      missingDocuments,
      byStatus: Object.fromEntries(statusCounts.map((item) => [item._id, item.count])),
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/alerts", async (_request, response) => {
  response.json([]);
});

module.exports = router;
