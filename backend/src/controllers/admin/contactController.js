const Contact = require("../../models/Contact");

async function getAllMessages(req, res) {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [messages, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Contact.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: messages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}

async function getMessageById(req, res) {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.status === "new") {
      message.status = "read";
      await message.save();
    }

    res.json({ success: true, data: message });
  } catch (err) {
    console.error("Get message error:", err);
    res.status(500).json({ error: "Failed to fetch message" });
  }
}

async function replyToMessage(req, res) {
  try {
    const { reply } = req.body;
    if (!reply) {
      return res.status(400).json({ error: "Reply text is required" });
    }

    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        reply,
        status: "replied",
        repliedAt: new Date(),
        repliedBy: req.user.id,
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json({ success: true, data: message });
  } catch (err) {
    console.error("Reply error:", err);
    res.status(500).json({ error: "Failed to send reply" });
  }
}

async function archiveMessage(req, res) {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ success: true, data: message });
  } catch (err) {
    console.error("Archive error:", err);
    res.status(500).json({ error: "Failed to archive message" });
  }
}

async function deleteMessage(req, res) {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: "Failed to delete message" });
  }
}

module.exports = {
  getAllMessages,
  getMessageById,
  replyToMessage,
  archiveMessage,
  deleteMessage,
};
