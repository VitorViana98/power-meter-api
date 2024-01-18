const {
  ok,
  requiredField,
  serverError,
} = require("../helpers/http_response_helper");

const db = require("../services/dbService");

const getCircuits = async (req, res) => {
  try {
    const query = "SELECT * FROM power_metter.tb_circuits;";
    const [results] = await db.query(query);

    return ok(res, results);
  } catch (error) {
    console.error("Error getting circuits:", error);
    return serverError(res, "Error getting circuits");
  }
};

const createCircuit = async (req, res) => {
  const { circuitName, circuitDescription } = req.body;

  if (!circuitName || circuitName.length === 0) {
    return requiredField(res, "Invalid params");
  }

  try {
    const query =
      "INSERT INTO tb_circuits (circuit_name, circuit_description) VALUES (?, ?)";

    const results = await db.query(query, [circuitName, circuitDescription]);

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

  const query = `SELECT * FROM (
    SELECT currents.timestamp, currents.current_measurement, circuits.circuit_name, circuits.circuit_description
    FROM power_metter.currents
    LEFT JOIN power_metter.tb_circuits AS circuits ON currents.circuit_id = circuits.circuit_id
    WHERE currents.circuit_id = ?
    ORDER BY currents.timestamp DESC
    LIMIT 2000
  ) AS subquery
  ORDER BY subquery.timestamp ASC;`;

  try {
    const [results] = await db.query(query, [circuitId]);

    if (!results || !results.length > 0 || !results[0]?.circuit_name) {
      return res.status(201).json({
        content: {
          message: "Circuit results not found",
        },
      });
    }

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
