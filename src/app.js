const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const metterRoutes = require("./routes/metterRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: false,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("*", (req, _, next) => {
  console.log(`New request: ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/health", healthRoutes);
app.use("/power-metter/metter", metterRoutes);
app.use("/power-metter/user", userRoutes);

module.exports = app;
