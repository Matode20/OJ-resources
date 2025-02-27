import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like SendGrid, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // App password (not your normal password)
  },
});

/**
 * Send Email
 * @param {string} to - Recipient's email
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 */
export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"AgriStore" <${process.env.EMAIL_USER}>`, // Sender name & email
      to,
      subject,
      text,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
};
