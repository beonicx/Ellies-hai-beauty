const Booking = require("../../models/Booking");
const Payment = require("../../models/Payment");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Membership = require("../../models/Membership");

async function getStats(req, res) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);

    const [
      totalCustomers,
      newCustomersThisMonth,
      todayBookings,
      pendingBookings,
      monthRevenue,
      lastMonthRevenue,
      activeMembers,
      lowStockProducts,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "user", createdAt: { $gte: startOfMonth } }),
      Booking.countDocuments({ date: { $gte: today, $lt: tomorrow } }),
      Booking.countDocuments({ status: "pending" }),
      Payment.aggregate([
        { $match: { status: "completed", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Payment.aggregate([
        { $match: { status: "completed", createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Membership.countDocuments({ status: "active" }),
      Product.countDocuments({ $expr: { $lte: ["$stock", "$lowStockThreshold"] }, isActive: true }),
    ]);

    const currentRevenue = monthRevenue[0]?.total || 0;
    const previousRevenue = lastMonthRevenue[0]?.total || 0;
    const revenueGrowth = previousRevenue > 0
      ? (((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
      : 0;

    res.json({
      success: true,
      data: {
        totalCustomers,
        newCustomersThisMonth,
        todayBookings,
        pendingBookings,
        monthRevenue: currentRevenue,
        lastMonthRevenue: previousRevenue,
        revenueGrowth: Number(revenueGrowth),
        activeMembers,
        lowStockProducts,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}

async function getRecentBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email phone");

    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Recent bookings error:", err);
    res.status(500).json({ error: "Failed to fetch recent bookings" });
  }
}

async function getRevenueChart(req, res) {
  try {
    const { period = "monthly" } = req.query;
    const now = new Date();
    let startDate, groupFormat;

    if (period === "daily") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      groupFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    } else if (period === "weekly") {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 84);
      groupFormat = { $dateToString: { format: "%Y-W%V", date: "$createdAt" } };
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
      groupFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
    }

    const revenue = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: groupFormat,
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: revenue });
  } catch (err) {
    console.error("Revenue chart error:", err);
    res.status(500).json({ error: "Failed to fetch revenue data" });
  }
}

module.exports = { getStats, getRecentBookings, getRevenueChart };
