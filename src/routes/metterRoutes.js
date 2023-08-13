const express = require("express");
const router = express.Router();
const metterController = require("../controllers/metterController");

router.post("/", metterController.addNewMeasurement);

module.exports = router;
