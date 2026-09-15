const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipPlan",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "suspended"],
      default: "active",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
    remainingFreeServices: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        name: String,
        remaining: Number,
      },
    ],
  },
  { timestamps: true }
);

membershipSchema.index({ user: 1, status: 1 });
membershipSchema.index({ endDate: 1, status: 1 });

module.exports = mongoose.model("Membership", membershipSchema);
