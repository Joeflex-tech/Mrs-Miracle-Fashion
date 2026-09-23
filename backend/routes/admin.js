import { Router } from "express";
import { q } from "../db.js";
import { auth } from "../middleware/auth.js";
const r = Router();
r.get("/customers", auth, async (_, res) => {
  res.json({
    customers: await q("SELECT * FROM customers ORDER BY created_at DESC"),
  });
});
r.get("/settings", auth, async (_, res) => {
  res.json({ settings: await q("SELECT * FROM store_settings ORDER BY key") });
});
r.put("/settings/:key", auth, async (req, res) => {
  const x = await q(
    "INSERT INTO store_settings(key,value) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,updated_at=now() RETURNING *",
    [req.params.key, JSON.stringify(req.body.value || {})],
  );
  res.json({ setting: x[0] });
});
r.get("/stats", auth, async (_, res) => {
  const p = await q("SELECT count(*)::int n FROM products");
  const o = await q("SELECT count(*)::int n FROM orders");
  const pend = await q(
    "SELECT count(*)::int n FROM orders WHERE status='pending'",
  );
  const rev = await q(
    "SELECT COALESCE(sum(total),0) n FROM orders WHERE payment_status='paid'",
  );
  res.json({
    products: p[0].n,
    orders: o[0].n,
    pending: pend[0].n,
    revenue: Number(rev[0].n),
  });
});
export default r;
