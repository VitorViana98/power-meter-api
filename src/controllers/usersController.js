const db = require("../services/dbService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { login, user_name, email, password } = req.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const passwordHash = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO tb_users (login, user_name, email, password_hash, salt) VALUES (?, ?, ?, ?, ?)";

    const [results] = await db.query(query, [
      login,
      user_name,
      email,
      passwordHash,
      salt,
    ]);

    res.status(201).json({ message: "User created with success" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user:", msg: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email
    const query = "SELECT * FROM power_metter.tb_users WHERE email = ?";
    const [user] = await db.query(query, [email]);

    // Verifica se o usuário existe e a senha está correta
    if (
      !user ||
      user?.length === 0 ||
      !bcrypt.compareSync(password, user[0].password_hash)
    ) {
      return res.json({ success: false, message: "Credenciais inválidas" });
    }

    // Gera um token de autenticação
    const token = jwt.sign({ userId: user[0].user_id }, "PowerMetter", {
      expiresIn: "1h",
    });

    delete user[0].password_hash;
    delete user[0].salt;

    return res.json({ success: true, token, user });
  } catch (error) {
    console.error("Erro no login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro no servidor" });
  }
};

module.exports = {
  createUser,
  login,
};
