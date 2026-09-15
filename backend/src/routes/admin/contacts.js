const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  getMessageById,
  replyToMessage,
  archiveMessage,
  deleteMessage,
} = require("../../controllers/admin/contactController");

router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.post("/:id/reply", replyToMessage);
router.patch("/:id/archive", archiveMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
