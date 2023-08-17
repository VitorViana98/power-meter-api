const db = require("../services/dbService");
const { ok, serverError } = require("../helpers/http_response_helper");

const live = (_, res) => ok(res, { message: "Our App is Up and Running." });

const ready = async (_, res) => {
  try {
    const statusQuery = "SELECT 'Live' AS status;";

    db.query(statusQuery, (err, results) => {
      if (err) {
        return serverError(
          res,
          "We had a Connection Problem. Our Database looks unreachable."
        );
      } else {
        console.debug("Reading Connection is: [", results[0].status, "]");

        return ok(res, `Reading Connection is: ${results[0].status}`);
      }
    });
  } catch (error) {
    return serverError(
      res,
      "We had a Connection Problem. Our Database looks unreachable."
    );
  }
};

module.exports = {
  live,
  ready,
};
