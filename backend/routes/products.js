import { Router } from "express";
import { q } from "../db.js";
import { auth } from "../middleware/auth.js";
const r = Router();
const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
r.get("/", async (req, res) => {
  const { category, search, featured } = req.query;
  let sql = "SELECT * FROM products WHERE available=true",
    p = [];
  if (req.query.all === "true" && req.headers.authorization)
    sql = "SELECT * FROM products";
  if (category) {
    p.push(category);
    sql += ` AND category=$${p.length}`;
  }
  if (search) {
    p.push("%" + search + "%");
    sql += ` AND name ILIKE $${p.length}`;
  }
  if (featured === "true") sql += " AND featured=true";
  sql += " ORDER BY created_at DESC";
  res.json({ products: await q(sql, p) });
});
r.get("/slug/:slug", async (req, res) => {
  const x = await q("SELECT * FROM products WHERE slug=$1", [req.params.slug]);
  if (!x[0]) return res.status(404).json({ message: "Product not found" });
  res.json({ product: x[0] });
});
r.post("/", auth, async (req, res) => {
  const {
    name,
    category,
    price,
    oldPrice,
    stock,
    image,
    description,
    featured = true,
    available = true,
    sizes = [],
    colors = [],
  } = req.body;
  if (!name || !category || price == null)
    return res
      .status(400)
      .json({ message: "Name, category and price are required" });
  const slug = slugify(name) + "-" + Date.now().toString().slice(-5);
  const x = await q(
    "INSERT INTO products(name,slug,category,price,old_price,stock,image,description,featured,available,sizes,colors) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
    [
      name,
      slug,
      category,
      price,
      oldPrice || null,
      stock || 0,
      image || "",
      description || "",
      featured,
      available,
      sizes,
      colors,
    ],
  );
  res.status(201).json({ product: x[0] });
});
r.put("/:id", auth, async (req, res) => {
  const {
    name,
    category,
    price,
    oldPrice,
    stock,
    image,
    description,
    featured = true,
    available = true,
    sizes = [],
    colors = [],
  } = req.body;
  const x = await q(
    "UPDATE products SET name=$1,category=$2,price=$3,old_price=$4,stock=$5,image=$6,description=$7,featured=$8,available=$9,sizes=$10,colors=$11,updated_at=now() WHERE id=$12 RETURNING *",
    [
      name,
      category,
      price,
      oldPrice || null,
      stock || 0,
      image || "",
      description || "",
      featured,
      available,
      sizes,
      colors,
      req.params.id,
    ],
  );
  if (!x[0]) return res.status(404).json({ message: "Product not found" });
  res.json({ product: x[0] });
});
r.delete("/:id", auth, async (req, res) => {
  await q("DELETE FROM products WHERE id=$1", [req.params.id]);
  res.json({ ok: true });
});
export default r;
