import multer from "multer";
import fs from "node:fs/promises";
import path from "path";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.resolve(__dirname, "..", "..", "..", "uploads");
    // Asegurarse de que el directorio de subidas exista
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log("File recived" + file.originalname);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
