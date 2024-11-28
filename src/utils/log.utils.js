import config from "../config/config.js";
import { devLog, prodLog } from "../config/customLogger.js";

const getLogger = () => {
  return config.environment.env === "production" ? prodLog : devLog;
};

export default getLogger;
