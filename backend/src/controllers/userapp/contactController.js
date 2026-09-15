const Contact = require("../../models/Contact");
const { sendWhatsAppMessage } = require("../../services/whatsappService");

const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone: phone || "",
      subject,
      message,
    });

    console.log(`New contact message from ${name} (${email}): ${subject}`);

    const whatsappLink = sendWhatsAppMessage({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you within 24 hours.",
      whatsappLink,
    });
  } catch (err) {
    console.error("Contact message error:", err);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
};

module.exports = { sendMessage };
