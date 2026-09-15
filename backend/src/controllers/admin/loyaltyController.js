const LoyaltyTransaction = require("../../models/LoyaltyTransaction");
const User = require("../../models/User");
const Notification = require("../../models/Notification");

async function getTransactions(req, res) {
  try {
    const { page = 1, limit = 20, userId, type, source } = req.query;
    const filter = {};

    if (userId) filter.user = userId;
    if (type) filter.type = type;
    if (source) filter.source = source;

    const skip = (Number(page) - 1) * Number(limit);

    const [transactions, total] = await Promise.all([
      LoyaltyTransaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate("user", "name email phone loyaltyPoints"),
      LoyaltyTransaction.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error("Get loyalty transactions error:", err);
    res.status(500).json({ error: "Failed to fetch loyalty transactions" });
  }
}

async function getUserPoints(req, res) {
  try {
    const user = await User.findById(req.params.userId).select("name email loyaltyPoints");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const history = await LoyaltyTransaction.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    const stats = await LoyaltyTransaction.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$points" },
        },
      },
    ]);

    const totalEarned = stats.find((s) => s._id === "earned")?.total || 0;
    const totalRedeemed = stats.find((s) => s._id === "redeemed")?.total || 0;

    res.json({
      success: true,
      data: {
        user,
        currentBalance: user.loyaltyPoints,
        totalEarned,
        totalRedeemed,
        history,
      },
    });
  } catch (err) {
    console.error("Get user points error:", err);
    res.status(500).json({ error: "Failed to fetch user points" });
  }
}

async function addPoints(req, res) {
  try {
    const { userId, points, source = "manual", description } = req.body;

    if (!userId || !points || points <= 0) {
      return res.status(400).json({ error: "Valid userId and positive points are required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { loyaltyPoints: points } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await LoyaltyTransaction.create({
      user: userId,
      points,
      type: "earned",
      source,
      description: description || `Manually added ${points} points`,
      balanceAfter: user.loyaltyPoints,
    });

    await Notification.create({
      user: userId,
      title: "Points Earned",
      message: `You earned ${points} loyalty points! Current balance: ${user.loyaltyPoints}`,
      type: "loyalty",
    });

    res.json({ success: true, data: { loyaltyPoints: user.loyaltyPoints } });
  } catch (err) {
    console.error("Add points error:", err);
    res.status(500).json({ error: "Failed to add points" });
  }
}

async function redeemPoints(req, res) {
  try {
    const { userId, points, description } = req.body;

    if (!userId || !points || points <= 0) {
      return res.status(400).json({ error: "Valid userId and positive points are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.loyaltyPoints < points) {
      return res.status(400).json({ error: "Insufficient loyalty points" });
    }

    user.loyaltyPoints -= points;
    await user.save();

    await LoyaltyTransaction.create({
      user: userId,
      points,
      type: "redeemed",
      source: "redemption",
      description: description || `Redeemed ${points} points`,
      balanceAfter: user.loyaltyPoints,
    });

    await Notification.create({
      user: userId,
      title: "Points Redeemed",
      message: `You redeemed ${points} loyalty points. Remaining balance: ${user.loyaltyPoints}`,
      type: "loyalty",
    });

    res.json({ success: true, data: { loyaltyPoints: user.loyaltyPoints } });
  } catch (err) {
    console.error("Redeem points error:", err);
    res.status(500).json({ error: "Failed to redeem points" });
  }
}

async function getLeaderboard(req, res) {
  try {
    const { limit = 20 } = req.query;

    const topCustomers = await User.find({ role: "user", isActive: true })
      .sort({ loyaltyPoints: -1 })
      .limit(Number(limit))
      .select("name email phone loyaltyPoints totalSpent visitCount");

    res.json({ success: true, data: topCustomers });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
}

module.exports = {
  getTransactions,
  getUserPoints,
  addPoints,
  redeemPoints,
  getLeaderboard,
};
