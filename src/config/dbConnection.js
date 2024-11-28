import mongoose from "mongoose";
import config from "./config.js";
import getLogger from "../utils/log.utils.js";

const log = getLogger();

const connection = mongoose
  .connect(config.db.cs, { dbName: config.db.dbName })
  .catch((err) => log.fatal(err.message));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error to connectMongoDB:"));
db.once("open", () => {
  log.info("Connection successfully to MongoDB");
});

export default db;
