const {
  ok,
  requiredField,
  serverError,
} = require("../helpers/http_response_helper");

const db = require("../services/dbService").promise();

const getCircuits = async (req, res) => {
  const { usuario } = req.query;

  try {
    const query = "SELECT * FROM tb_circuits where user_id = ?";

    const [results] = await db.query(query, [usuario.user_id]);

    return ok(res, results);
  } catch (error) {
    console.error("Error getting circuits:", error);
    return serverError(res, "Error getting circuits");
  }
};

const createCircuit = async (req, res) => {
  const { circuitName, circuitDescription, usuario } = req.body;

  if (
    !circuitName ||
    circuitName.length === 0 ||
    !usuario ||
    !usuario.user_id
  ) {
    return requiredField(res, "Invalid params");
  }

  try {
    const query =
      "INSERT INTO tb_circuits (circuit_name, circuit_description, user_id) VALUES (?, ?, ?)";

    const results = await db.query(query, [
      circuitName,
      circuitDescription,
      usuario.user_id,
    ]);

    res.status(201).json({
      message: "Circuit created with success",
      content: {
        circuit_name: circuitName,
        circuit_description: circuitDescription,
        circuit_id: results[0].insertId,
      },
    });
  } catch (error) {
    console.error("Error creating circuit:", error);
    res.status(500).json({ error: "Error creating circuit:", msg: error });
  }
};

module.exports = {
  createCircuit,
  getCircuits,
};
