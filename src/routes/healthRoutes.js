const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.get("/liveness", healthController.live);
router.get("/readiness", healthController.ready);

module.exports = router;
