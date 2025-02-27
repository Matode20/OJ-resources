import { sendEmail } from "./emailService.js";
import { sendSMS } from "./smsService.js";

/**
 * Send Order Confirmation Email & SMS
 */
export const sendOrderConfirmation = (customer, order) => {
  const subject = "Order Confirmation - Your order has been received!";
  const message = `Dear ${customer.name},\n\nYour order (ID: ${order._id}) has been received and is being processed.\n\nThank you for shopping with us!\n\n- AgriStore Team`;

  if (customer.email) sendEmail(customer.email, subject, message);
  if (customer.phone) sendSMS(customer.phone, message);
};

/**
 * Send Order Status Update Notification
 */
export const sendOrderStatusUpdate = (customer, order) => {
  const subject = `Order Update - Order ${order._id} is now ${order.status}`;
  const message = `Dear ${customer.name},\n\nYour order (ID: ${order._id}) status has been updated to "${order.status}".\n\nThank you for choosing AgriStore!\n\n- AgriStore Team`;

  if (customer.email) sendEmail(customer.email, subject, message);
  if (customer.phone) sendSMS(customer.phone, message);
};
