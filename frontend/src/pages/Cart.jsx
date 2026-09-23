import React from "react";
import { Link } from "react-router-dom";
import { Heart, Minus, Plus, Arrow, Truck } from "../components/Icons";
import { formatNaira, waLink } from "../lib/store";
import { useCart } from "../lib/cartContext";
export default function Cart() {
  const { items, subtotal, update, remove } = useCart();
  const delivery = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + delivery;
  const msg = `Hello Mrs Miracle, I would like to order:\n${items.map((i) => `${i.qty} × ${i.product.name} — ${formatNaira(i.product.price * i.qty)}`).join("\n")}\nTotal: ${formatNaira(total)}`;
  if (!items.length)
    return (
      <main className="empty">
        <div>
          <p className="eyebrow">YOUR BAG</p>
          <h1>Your bag is waiting.</h1>
          <p>Add something beautiful to your collection.</p>
          <Link className="btn btn-primary" to="/shop">
            Continue Shopping <Arrow />
          </Link>
        </div>
      </main>
    );
  return (
    <main className="cart-page">
      <div className="page-title">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-layout">
        <section>
          {items.map((i) => (
            <article className="cart-item" key={i.key}>
              <img src={i.product.image} alt="" />
              <div className="cart-meta">
                <Link to={"/product/" + i.product.slug}>
                  <h3>{i.product.name}</h3>
                </Link>
                <p>{i.size && `Size ${i.size}`}</p>
                <div className="cart-controls">
                  <div className="qty">
                    <button onClick={() => update(i.key, i.qty - 1)}>
                      <Minus />
                    </button>
                    <b>{i.qty}</b>
                    <button onClick={() => update(i.key, i.qty + 1)}>
                      <Plus />
                    </button>
                  </div>
                  <button className="remove" onClick={() => remove(i.key)}>
                    Remove
                  </button>
                </div>
              </div>
              <strong>{formatNaira(i.product.price * i.qty)}</strong>
            </article>
          ))}
        </section>
        <aside className="summary">
          <h2>Order Summary</h2>
          <div>
            <span>Subtotal</span>
            <b>{formatNaira(subtotal)}</b>
          </div>
          <div>
            <span>Delivery</span>
            <b>{delivery === 0 ? "FREE" : formatNaira(delivery)}</b>
          </div>
          <hr />
          <div className="total">
            <span>Total</span>
            <b>{formatNaira(total)}</b>
          </div>
          <Link className="btn btn-primary full" to="/checkout">
            Checkout <Arrow />
          </Link>
          <a
            className="wa-checkout"
            href={waLink(msg)}
            target="_blank"
            rel="noreferrer"
          >
            Continue on WhatsApp
          </a>
          <small>
            <Truck /> Free delivery on orders over ₦50,000
          </small>
        </aside>
      </div>
    </main>
  );
}
