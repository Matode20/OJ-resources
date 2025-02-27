import cron from "node-cron";
import Order from "../models/order.js";
import { sendEmail } from "../utils/emailService.js";
;

/**
 * Auto-send Order Status Updates (Runs every hour)
 */
cron.schedule("0 * * * *", async () => {
  console.log("📦 Running Order Status Update Job");

  const orders = await Order.find({ statusUpdated: true });

  orders.forEach(async (order) => {
    const message = `Hello ${order.customerName}, your order #${order._id} is now ${order.status}.`;

    if (order.customerEmail)
      await sendEmail(order.customerEmail, "Order Update", message);

    // Mark status as updated to prevent duplicate notifications
    order.statusUpdated = false;
    await order.save();
  });

  console.log(`📦 Sent updates for ${orders.length} orders.`);
});

/**
 * Auto-cancel Unpaid Orders (Runs every 30 minutes)
 */
cron.schedule("*/30 * * * *", async () => {
  console.log("🚫 Running Auto-Cancel Unpaid Orders Job");

  const timeLimit = new Date();
  timeLimit.setHours(timeLimit.getHours() - 24); // 24 hours ago

  const unpaidOrders = await Order.find({
    status: "Pending",
    createdAt: { $lte: timeLimit },
  });

  unpaidOrders.forEach(async (order) => {
    order.status = "Cancelled";
    await order.save();

    const message = `Hello ${order.customerName}, your order #${order._id} has been cancelled due to non-payment.`;
    if (order.customerEmail)
      await sendEmail(order.customerEmail, "Order Cancelled", message);
    if (order.customerPhone) await sendSMS(order.customerPhone, message);
  });

  console.log(`🚫 Cancelled ${unpaidOrders.length} unpaid orders.`);
});
