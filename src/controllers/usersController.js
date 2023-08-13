const db = require("../services/dbService");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { login, user_name, email, password } = req.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const passwordHash = await bcrypt.hash(password, salt);
    console.log("aqui salt", salt, password, passwordHash);

    const query =
      "INSERT INTO tb_users (login, user_name, email, password_hash, salt) VALUES (?, ?, ?, ?, ?)";

    db.query(
      query,
      [login, user_name, email, passwordHash, salt],
      (err, results) => {
        if (err) {
          console.error("Error creating user:", err);
          res.status(500).json({ error: "Error creating user" });
        } else {
          res.status(201).json({ message: "User created with success" });
        }
      }
    );
  } catch (error) {
    console.error("Error creating user::", error);
    res.status(500).json({ error: "Error creating user:" });
  }
};

module.exports = {
  createUser,
};
