const express = require("express");
const bodyParser = require("body-parser");
const metterRoutes = require("./routes/metterRoutes");
const userRoutes = require("./routes/userRoutes"); // Importe a nova rota

const app = express();

app.use(bodyParser.json());

app.use("/metter", metterRoutes);
app.use("/user", userRoutes);

module.exports = app;
