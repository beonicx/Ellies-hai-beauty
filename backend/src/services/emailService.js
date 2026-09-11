const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendBookingNotification = async (booking) => {
  try {
    const info = await transporter.sendMail({
      from: `"Habib Salon and Academy" <${process.env.SMTP_USER}>`,
      to: process.env.SALON_EMAIL,
      subject: "📅 New Booking Received",
      html: `
        <h2>New Booking</h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Notes:</strong> ${booking.notes}</p>
      `,
    });

    console.log("📧 Booking email sent",info.messageId);
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = { sendBookingNotification };