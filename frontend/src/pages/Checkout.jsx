import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Arrow, Truck } from "../components/Icons";
import { formatNaira, waLink } from "../lib/store";
import { api } from "../lib/api";
import { useCart } from "../lib/cartContext";
export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Lagos",
  });
  const [loading, setLoading] = useState(false);
  const delivery = subtotal >= 50000 ? 0 : 3000,
    total = subtotal + delivery;
  if (!items.length)
    return (
      <main className="empty">
        <div>
          <h1>Your cart is empty.</h1>
          <Link className="btn btn-primary" to="/shop">
            Shop Now
          </Link>
        </div>
      </main>
    );
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function createOrder(channel) {
    if (!form.email && channel === "online")
      return alert("Email is required for online payment.");
    setLoading(true);
    try {
      const r = await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.qty,
            size: i.size,
            color: i.color,
          })),
          channel,
          paymentStatus: "pending",
        }),
      });
      const order = r.order;
      if (channel === "whatsapp") {
        const text = `Hello Mrs Miracle, I want to complete order ${order.reference}.\n${items.map((i) => `${i.qty} × ${i.product.name}`).join("\n")}\nTotal: ${formatNaira(total)}\nName: ${form.name}\nPhone: ${form.phone}`;
        clear();
        window.location.href = waLink(text);
        return;
      }
      const payment = await api("/payments/initialize", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          amount: total,
          orderId: order.id,
        }),
      });
      window.location.href = payment.authorization_url;
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="checkout-page">
      <div className="checkout-title">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Complete your order</h1>
      </div>
      <div className="checkout-grid">
        <div className="checkout-form">
          <h2>Contact & delivery</h2>
          <div className="form-grid">
            <label>
              Full name
              <input name="name" required value={form.name} onChange={change} />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                required
                value={form.phone}
                onChange={change}
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={change}
              />
            </label>
            <label>
              City
              <input name="city" required value={form.city} onChange={change} />
            </label>
            <label className="wide">
              Delivery address
              <textarea
                name="address"
                required
                value={form.address}
                onChange={change}
              />
            </label>
          </div>
          <div className="payment-choice">
            <button
              type="button"
              onClick={() => createOrder("online")}
              disabled={loading}
            >
              <b>Pay Online</b>
              <span>Secure card, transfer or USSD via Paystack.</span>
            </button>
            <button
              type="button"
              onClick={() => createOrder("whatsapp")}
              disabled={loading}
            >
              <b>Continue on WhatsApp</b>
              <span>
                Send the order to Mrs Miracle for payment confirmation.
              </span>
            </button>
          </div>
          <p className="secure-note">
            <Truck />{" "}
            {loading
              ? "Creating your order…"
              : "Your order is recorded before payment or WhatsApp handoff."}
          </p>
        </div>
        <aside className="summary">
          <h2>Your order</h2>
          {items.map((i) => (
            <div className="mini-line" key={i.key}>
              <span>
                {i.qty} × {i.product.name}
              </span>
              <b>{formatNaira(i.product.price * i.qty)}</b>
            </div>
          ))}
          <hr />
          <div>
            <span>Subtotal</span>
            <b>{formatNaira(subtotal)}</b>
          </div>
          <div>
            <span>Delivery</span>
            <b>{delivery ? formatNaira(delivery) : "FREE"}</b>
          </div>
          <div className="total">
            <span>Total</span>
            <b>{formatNaira(total)}</b>
          </div>
        </aside>
      </div>
    </main>
  );
}
