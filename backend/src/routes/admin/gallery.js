const express = require("express");
const router = express.Router();
const {
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
  reorderImages,
  getCategories,
} = require("../../controllers/admin/galleryController");

router.get("/", getAllImages);
router.get("/categories", getCategories);
router.post("/", createImage);
router.post("/reorder", reorderImages);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

module.exports = router;
