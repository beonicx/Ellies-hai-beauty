const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/userapp/contactController");
const { validateContact } = require("../../middleware/validation");

router.post("/", validateContact, contactController.sendMessage);

module.exports = router;
