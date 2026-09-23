import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { auth } from "../middleware/auth.js";
const r = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) =>
    cb(null, /^image\/(jpeg|png|webp|avif)$/.test(file.mimetype)),
});
r.post("/image", auth, upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "A valid image is required" });
  res.json({
    url: `${process.env.API_PUBLIC_URL || `http://${req.get("host")}`}/uploads/${req.file.filename}`,
    filename: req.file.filename,
  });
});
export default r;
