const express = require("express");
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  seedServices,
} = require("../../controllers/admin/serviceController");

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", createService);
router.post("/seed", seedServices);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
