const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    categorySlug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    categoryDescription: {
      type: String,
      default: "",
    },
    categoryIcon: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ categorySlug: 1, isActive: 1 });
serviceSchema.index({ isActive: 1, sortOrder: 1 });

module.exports = mongoose.model("Service", serviceSchema);
