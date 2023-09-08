const {
  ok,
  requiredField,
  serverError,
} = require("../helpers/http_response_helper");

const db = require("../services/dbService").promise();

const getCircuits = async (req, res) => {
  console.log("aqui antes", req.query);
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

const getDashboard = async (req, res) => {
  const circuitId = req.params.circuit_id;
  if (!circuitId) {
    return requiredField(res, "Invalid params");
  }

  const query = `
  SELECT currents.timestamp, currents.current_measurement, voltages.voltage_measurement,
         (currents.current_measurement * voltages.voltage_measurement) AS power,
         circuits.circuit_name, circuits.circuit_description
  FROM currents
  JOIN voltages ON currents.circuit_id = voltages.circuit_id AND currents.timestamp = voltages.timestamp
  JOIN tb_circuits AS circuits ON currents.circuit_id = circuits.circuit_id
  WHERE currents.circuit_id = ?
  ORDER BY currents.timestamp;
`;

  try {
    const [results] = await db.query(query, [circuitId]);

    return res.status(201).json({
      content: {
        results,
        circuit_name: results[0].circuit_name,
        circuit_description: results[0].circuit_description,
      },
    });
  } catch (error) {
    console.error("Error getting circuit dashboard:", error);
    return res
      .status(500)
      .json({ error: "Error getting circuit dashboard:", msg: error });
  }
};

module.exports = {
  createCircuit,
  getCircuits,
  getDashboard,
};
