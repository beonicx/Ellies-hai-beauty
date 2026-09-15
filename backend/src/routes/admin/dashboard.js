const express = require("express");
const router = express.Router();
const { getStats, getRecentBookings, getRevenueChart } = require("../../controllers/admin/dashboardController");

router.get("/stats", getStats);
router.get("/recent-bookings", getRecentBookings);
router.get("/revenue-chart", getRevenueChart);

module.exports = router;
