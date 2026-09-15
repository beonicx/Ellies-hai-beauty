const Notification = require("../../models/Notification");
const User = require("../../models/User");

async function getAllNotifications(req, res) {
  try {
    const { page = 1, limit = 20, type, userId, isRead } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (userId) filter.user = userId;
    if (isRead !== undefined) filter.isRead = isRead === "true";

    const skip = (Number(page) - 1) * Number(limit);

    const [notifications, total] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("user", "name email"),
      Notification.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: notifications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}

async function createNotification(req, res) {
  try {
    const { userId, title, message, type, channel } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: "Title and message are required" });
    }

    const notification = await Notification.create({
      user: userId || undefined,
      title,
      message,
      type,
      channel,
    });

    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    console.error("Create notification error:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
}

async function sendBulkNotification(req, res) {
  try {
    const { title, message, type = "promotion", channel = "in-app", filter: userFilter } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: "Title and message are required" });
    }

    const query = { role: "user", isActive: true };
    if (userFilter?.tags) query.tags = { $in: userFilter.tags };
    if (userFilter?.hasActiveMembership) {
      const Membership = require("../../models/Membership");
      const activeMemberIds = await Membership.distinct("user", { status: "active" });
      query._id = { $in: activeMemberIds };
    }

    const users = await User.find(query).select("_id");
    const notifications = users.map((u) => ({
      user: u._id,
      title,
      message,
      type,
      channel,
      isBroadcast: true,
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    res.json({
      success: true,
      message: `Notification sent to ${notifications.length} users`,
      recipientCount: notifications.length,
    });
  } catch (err) {
    console.error("Bulk notification error:", err);
    res.status(500).json({ error: "Failed to send bulk notifications" });
  }
}

async function deleteNotification(req, res) {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error("Delete notification error:", err);
    res.status(500).json({ error: "Failed to delete notification" });
  }
}

module.exports = {
  getAllNotifications,
  createNotification,
  sendBulkNotification,
  deleteNotification,
};
