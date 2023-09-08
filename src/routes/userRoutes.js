const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const userCircuitController = require("../controllers/userCircuitController");

router.route("/register").post(usersController.createUser);

router.route("/login").post(usersController.login);

router
  .route("/circuit")
  .get(userCircuitController.getCircuits)
  .post(userCircuitController.createCircuit);

  router
  .route("/circuit/:circuit_id/dashboard")
  .get(userCircuitController.getDashboard)

module.exports = router;
