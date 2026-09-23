import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/uploads.js";
import paymentRoutes from "./routes/payments.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/admin.js";
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/api/health", (_, res) =>
  res.json({ ok: true, service: "mrs-miracle-api" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});
app.listen(PORT, () =>
  console.log(`Mrs Miracle API running on http://localhost:${PORT}`),
);
