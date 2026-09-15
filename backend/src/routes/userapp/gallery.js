const express = require("express");
const router = express.Router();
const galleryController = require("../../controllers/userapp/galleryController");

router.get("/", galleryController.getAllImages);
router.get("/:category", galleryController.getImagesByCategory);

module.exports = router;
