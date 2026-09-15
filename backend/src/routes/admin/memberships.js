const express = require("express");
const router = express.Router();
const {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
  getAllMembers,
  assignMembership,
  cancelMembership,
} = require("../../controllers/admin/membershipController");

router.get("/plans", getAllPlans);
router.post("/plans", createPlan);
router.put("/plans/:id", updatePlan);
router.delete("/plans/:id", deletePlan);

router.get("/members", getAllMembers);
router.post("/assign", assignMembership);
router.patch("/:id/cancel", cancelMembership);

module.exports = router;
