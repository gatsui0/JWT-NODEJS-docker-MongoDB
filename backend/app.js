const express = require("express");

const cors = require("cors");
const mongooseConnection = require("./src/config/mongooseConnection.config");
const morgan = require("morgan");

const app = express();

//Rotas da API: >

const userRoutes = require("./src/routes/user.routes");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.unsubscribe(morgan("dev"));
app.use(userRoutes);

module.exports = app;
