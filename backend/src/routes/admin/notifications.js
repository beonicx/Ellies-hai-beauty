const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  createNotification,
  sendBulkNotification,
  deleteNotification,
} = require("../../controllers/admin/notificationController");

router.get("/", getAllNotifications);
router.post("/", createNotification);
router.post("/bulk", sendBulkNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
