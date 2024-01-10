const { ok, badRequest } = require("../helpers/http_response_helper");
const db = require("../services/dbService");

const addNewMeasurement = async (req, res) => {
  try {
    const {
      circuitId = 8,
      current,
      millis,
      timestamp,
    } = req.body;

    if (!current || !millis || !timestamp) {
      return badRequest(res, { message: "Invalid measurement data" });
    }

    if (
      !(current.length === millis.length && millis.length === timestamp.length)
    ) {
      return badRequest(res, { message: "Arrays must have the same length" });
    }

    const query =
      "INSERT INTO power_metter.currents (circuit_id, current_measurement, timestamp, millis) VALUES ?;";

    const values = current.map((_, index) => [
      circuitId,
      current[index],
      timestamp[index],
      millis[index],
    ]);

    const [results] = await db.query(query, [values]);

    return ok(res, { message: "Values send to backend" });
  } catch (error) {
    return badRequest(res, { message: "Values send to backend", error });
  }
};

module.exports = {
  addNewMeasurement,
};
