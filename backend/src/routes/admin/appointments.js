const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  updateAppointmentStatus,
  getTodayAppointments,
} = require("../../controllers/admin/appointmentController");

router.get("/", getAllAppointments);
router.get("/today", getTodayAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;
