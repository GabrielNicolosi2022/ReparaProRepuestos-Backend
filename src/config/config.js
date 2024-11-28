import dotenv from "dotenv";
let config = {};

const environment = "development"; // cambiar environment: 'production' / 'development' / 'testing'

dotenv.config({
  path:
    environment === "development"
      ? ".env.development"
      : environment === "testing"
      ? ".env.testing"
      : ".env.production",
});

config.environment = {
  env: process.env.NODE_ENV,
};

config.url = {
  baseUrl: process.env.BASE_URL,
};

config.server = {
  port: process.env.PORT,
};

config.db = {
  cs: process.env.MONGO_URI,
  dbUser: process.env.MONGO_USER,
  dbPass: process.env.MONGO_PASS,
  dbName: process.env.DB_NAME,
};

// console.log("config:", config);
export default config;
