const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const userCircuitController = require("../controllers/userCircuitController");

router.route("/register").post(usersController.createUser);

router.route("/login").post(usersController.login);

router
  .route("/circuit")
  // .get(usersController.login)
  .post(userCircuitController.createCircuit);

module.exports = router;
