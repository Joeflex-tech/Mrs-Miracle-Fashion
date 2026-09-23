import { Router } from "express";
import { q } from "../db.js";
import { auth } from "../middleware/auth.js";
const r = Router();
const ref = () =>
  `MM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
r.post("/", async (req, res) => {
  const {
    customer,
    items,
    channel = "whatsapp",
    paymentStatus = "pending",
  } = req.body;
  if (!customer?.name || !customer?.phone || !items?.length)
    return res
      .status(400)
      .json({ message: "Customer and order items are required" });
  const ids = items.map((x) => x.productId);
  const products = await q("SELECT * FROM products WHERE id=ANY($1::uuid[])", [
    ids,
  ]);
  if (!products.length)
    return res.status(400).json({ message: "No valid products in order" });
  let subtotal = 0;
  const normalized = items.map((i) => {
    const p = products.find((x) => x.id === i.productId);
    if (!p) throw new Error("Product not found");
    const quantity = Math.max(1, Number(i.quantity) || 1);
    subtotal += Number(p.price) * quantity;
    return { p, quantity, size: i.size || null, color: i.color || null };
  });
  const delivery = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + delivery;
  const c = await q(
    "INSERT INTO customers(name,phone,email,address,city) VALUES($1,$2,$3,$4,$5) RETURNING id",
    [
      customer.name,
      customer.phone,
      customer.email || null,
      customer.address || "",
      customer.city || "",
    ],
  );
  const o = await q(
    "INSERT INTO orders(reference,customer_id,channel,status,payment_status,subtotal,delivery_fee,total) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [
      ref(),
      c[0].id,
      channel,
      "pending",
      paymentStatus,
      subtotal,
      delivery,
      total,
    ],
  );
  for (const i of normalized)
    await q(
      "INSERT INTO order_items(order_id,product_id,product_name,quantity,unit_price,size,color) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [o[0].id, i.p.id, i.p.name, i.quantity, i.p.price, i.size, i.color],
    );
  res.status(201).json({ order: o[0] });
});
r.get("/track/:reference", async (req, res) => {
  const x = await q("SELECT * FROM orders WHERE reference=$1", [
    req.params.reference,
  ]);
  if (!x[0])
    return res.status(404).json({ message: "Order reference not found" });
  res.json({ order: x[0] });
});
r.get("/", auth, async (req, res) => {
  res.json({
    orders: await q(
      "SELECT o.*,c.name customer_name,c.phone customer_phone FROM orders o LEFT JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC",
    ),
  });
});
r.put("/:id", auth, async (req, res) => {
  const { status, paymentStatus } = req.body;
  const x = await q(
    "UPDATE orders SET status=COALESCE($1,status),payment_status=COALESCE($2,payment_status),updated_at=now() WHERE id=$3 RETURNING *",
    [status || null, paymentStatus || null, req.params.id],
  );
  res.json({ order: x[0] });
});
export default r;
