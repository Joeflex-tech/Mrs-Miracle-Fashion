import { Router } from "express";
import crypto from "crypto";
import { q } from "../db.js";
const r = Router();
r.post("/initialize", async (req, res) => {
  if (!process.env.PAYSTACK_SECRET_KEY)
    return res
      .status(503)
      .json({
        message:
          "Online payments are not configured yet. Use WhatsApp checkout for now.",
      });
  const { email, amount, orderId } = req.body;
  const orders = await q("SELECT * FROM orders WHERE id=$1", [orderId]);
  if (!orders[0]) return res.status(404).json({ message: "Order not found" });
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(Number(amount) * 100),
        reference: orders[0].reference,
        callback_url: `${process.env.CLIENT_URL}/payment/complete`,
      }),
    },
  );
  const data = await response.json();
  if (!data.status)
    return res
      .status(400)
      .json({ message: data.message || "Payment initialization failed" });
  res.json(data.data);
});
r.post("/webhook", async (req, res) => {
  const signature = req.headers["x-paystack-signature"];
  const expected = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (!signature || signature !== expected) return res.sendStatus(401);
  if (req.body.event === "charge.success") {
    const ref = req.body.data?.reference;
    if (ref)
      await q(
        "UPDATE orders SET payment_status='paid',status='confirmed',payment_reference=$1,updated_at=now() WHERE reference=$2",
        [ref, ref],
      );
  }
  res.sendStatus(200);
});
r.get("/verify/:reference", async (req, res) => {
  if (!process.env.PAYSTACK_SECRET_KEY)
    return res
      .status(503)
      .json({ message: "Online payments are not configured" });
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(req.params.reference)}`,
    { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } },
  );
  const data = await response.json();
  if (data.status && data.data?.status === "success") {
    await q(
      "UPDATE orders SET payment_status='paid',status='confirmed',payment_reference=$1,updated_at=now() WHERE reference=$2",
      [data.data.reference, req.params.reference],
    );
  }
  res.json(data.data);
});
export default r;
