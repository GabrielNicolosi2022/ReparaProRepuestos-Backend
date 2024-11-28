import "dotenv/config";
import config from "./config/config.js";
import express, { json, urlencoded } from "express";
import __dirname from "./utils.js";
import cors from "cors";

import cookieParser from "cookie-parser";

import indexRouter from "./router/index.routes.js";

import getLogger from "./utils/log.utils.js";
import morgan from "morgan";
import db from "./config/dbConnection.js";

/* CONFIGURATIONS */
const app = express();
const PORT = config.server.port;
const MONGO_DB = config.db.cs;

// Express
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(cors());

// Logger
const log = getLogger();
// Morgan
app.use(morgan("dev"));

// Routes
app.use(indexRouter);

// Server HTTP
const server = app.listen(PORT, (err) => {
  db;
  if (err) {
    log.fatal("Connection Error: ", err.message);
    return;
  }
  log.info(`Running on PORT ${PORT}, in ${config.environment.env} environment`);
});
