const express = require("express");
const router = express.Router();
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  processRefund,
  getRevenueSummary,
} = require("../../controllers/admin/paymentController");

router.get("/", getAllPayments);
router.get("/revenue", getRevenueSummary);
router.get("/:id", getPaymentById);
router.post("/", createPayment);
router.post("/:id/refund", processRefund);

module.exports = router;
