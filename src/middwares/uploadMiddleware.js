import multer from "multer";
import crypto from "crypto";
import { extname } from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const newFilename = crypto.randomBytes(32).toString("hex");
    const fileExtension = extname(file.originalname);
    cb(null, `${newFilename}${fileExtension}`);
  },
});

export const uploadMiddleware = multer({ storage });
