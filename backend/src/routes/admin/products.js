const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getCategories,
} = require("../../controllers/admin/productController");

router.get("/", getAllProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/stock", updateStock);

module.exports = router;
