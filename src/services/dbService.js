const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "power_metter_api",
  password: "power_metter_123",
  database: "power_metter",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = db;
