const db = require("../services/dbService");

const addNewMeasurement = (req, res) => {
  const { userId, circuitId, voltage, current } = req.body;

  const query =
    "INSERT INTO medicoes (user_id, circuit_id, voltage, current) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, circuitId, voltage, current], (err, results) => {
    if (err) {
      console.error("Erro ao inserir medição no banco de dados:", err);
      res
        .status(500)
        .json({ error: "Erro ao inserir medição no banco de dados" });
    } else {
      res.status(201).json({ message: "Medição inserida com sucesso" });
    }
  });
};

module.exports = {
  addNewMeasurement,
};
