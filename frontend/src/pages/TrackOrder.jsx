import React, { useState } from "react";
import { api } from "../lib/api";
export default function TrackOrder() {
  const [ref, setRef] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  async function go(e) {
    e.preventDefault();
    setError("");
    try {
      const r = await api("/orders/track/" + encodeURIComponent(ref));
      setOrder(r.order);
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-card wide-card">
        <p className="eyebrow">ORDER SUPPORT</p>
        <h1>Track your order</h1>
        <p>Enter the order reference sent to you after checkout.</p>
        <form onSubmit={go}>
          <label>
            Order reference
            <input
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="MM-XXXXXXXX"
              required
            />
          </label>
          <button className="btn btn-primary full">Track Order</button>
        </form>
        {error && <p className="error">{error}</p>}
        {order && (
          <div className="order-result">
            <b>{order.reference}</b>
            <span>Status: {order.status}</span>
            <span>Payment: {order.payment_status}</span>
          </div>
        )}
      </div>
    </main>
  );
}
