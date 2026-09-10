const Notification = require("../models/Notification.cjs");

function createNotificationContent(shipment, status) {
  const greeting = `Kính gửi ${shipment.customer.name}, lô hàng ${shipment.trackingCode}`;

  if (status === "cleared") {
    return `${greeting} đã THÔNG QUAN hải quan (tuyến: ${shipment.route}). Đội ngũ VILA SANMYSHI tiếp tục theo dõi vận chuyển và sẽ cập nhật khi có mốc mới.`;
  }

  return `${greeting} vừa được cập nhật: ${shipment.statusLabel}. Tuyến: ${shipment.route}. VILA SANMYSHI đang tiếp tục theo sát lô hàng.`;
}

async function mockSend(notification) {
  console.log(`[notification:${notification.channel}] ${notification.recipient} — ${notification.content}`);
  notification.status = "sent";
  notification.sentAt = new Date();
  await notification.save();
  return notification;
}

async function triggerNotifications(shipment) {
  const channelRecipients = [
    { channel: "zalo", recipient: shipment.customer.zalo || shipment.customer.phone },
    { channel: "email", recipient: shipment.customer.email },
  ];
  const content = createNotificationContent(shipment, shipment.status);
  const sent = [];

  for (const target of channelRecipients) {
    if (!target.recipient) continue;

    const notification = await Notification.create({
      shipmentId: shipment._id,
      trackingCode: shipment.trackingCode,
      channel: target.channel,
      template: shipment.status === "cleared" ? "shipment-cleared" : "shipment-status-update",
      recipient: target.recipient,
      content,
      triggerStatus: shipment.status,
      status: "queued",
    });

    try {
      sent.push(await mockSend(notification));
    } catch (error) {
      notification.status = "failed";
      await notification.save();
      console.error(`[notification:${target.channel}] failed`, error);
    }
  }

  return sent;
}

module.exports = { createNotificationContent, triggerNotifications };
