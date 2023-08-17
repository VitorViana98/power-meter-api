const { requiredField } = require("../helpers/http_response_helper");

const db = require("../services/dbService").promise();

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

    const [results] = await db.query(query, [
      circuitName,
      circuitDescription,
      usuario.user_id,
    ]);

    res.status(201).json({ message: "Circuit created with success" });
  } catch (error) {
    console.error("Error creating circuit:", error);
    res.status(500).json({ error: "Error creating circuit:", msg: error });
  }
};

module.exports = {
  createCircuit,
};
