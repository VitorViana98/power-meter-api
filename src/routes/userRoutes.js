const express = require("express");
const router = express.Router();
const userCircuitController = require("../controllers/userCircuitController");

router
  .route("/circuit")
  .get(userCircuitController.getCircuits)
  .post(userCircuitController.createCircuit);

  router
  .route("/circuit/:circuit_id/dashboard")
  .get(userCircuitController.getDashboard)

module.exports = router;
