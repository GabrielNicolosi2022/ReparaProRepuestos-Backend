import multer from "multer";
import __dirname from "../utils.js";
import getLogger from "../utils/log.utils.js";

const log = getLogger();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = `${__dirname}/public/images`;

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    log.info(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({
  storage,
  onError: (err, next) => {
    log.info(err);
    next();
  },
});
