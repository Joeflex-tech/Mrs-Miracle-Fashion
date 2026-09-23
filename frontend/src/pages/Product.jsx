import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Plus, Minus, Arrow, Truck, Shield } from "../components/Icons";
import { api } from "../lib/api";
import { demoProducts, formatNaira, waLink } from "../lib/store";
import { useCart } from "../lib/cartContext";
export default function Product() {
  const { slug } = useParams();
  const [p, setP] = useState(
    demoProducts.find((x) => x.slug === slug) || demoProducts[0],
  );
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const { add, toggleWish, wishlist } = useCart();
  useEffect(() => {
    api("/products/slug/" + slug)
      .then((r) => r.product && setP(r.product))
      .catch(() => {});
  }, [slug]);
  const wished = wishlist.some((x) => x.id === p.id);
  const message = `Hello Mrs Miracle, I'm interested in ${p.name} — ${formatNaira(p.price)}. Is it available?`;
  return (
    <main className="product-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.name}
      </div>
      <section className="product-detail">
        <div className="product-gallery">
          <img src={p.image} alt={p.name} />
        </div>
        <div className="product-info">
          <p className="eyebrow">{p.category}</p>
          <h1>{p.name}</h1>
          <div className="detail-rating">
            ★★★★★{" "}
            <span>
              {p.rating} ({p.reviews} reviews)
            </span>
          </div>
          <div className="detail-price">
            {formatNaira(p.price)}{" "}
            {p.oldPrice && <del>{formatNaira(p.oldPrice)}</del>}
          </div>
          <p className="detail-copy">
            A refined Mrs Miracle piece selected for style, confidence and
            everyday wear. Product details, materials and exact sizing can be
            managed from the store dashboard.
          </p>
          {p.category !== "bags" && (
            <div className="option">
              <b>Size</b>
              <div>
                {["36", "37", "38", "39", "40", "41"].map((s) => (
                  <button
                    className={size === s ? "selected" : ""}
                    onClick={() => setSize(s)}
                    key={s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="purchase-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus />
              </button>
              <b>{qty}</b>
              <button onClick={() => setQty(qty + 1)}>
                <Plus />
              </button>
            </div>
            <button
              className="btn btn-primary grow"
              onClick={() => add(p, qty, { size })}
            >
              Add to Cart <BagIcon />
            </button>
            <button
              className={"wish-detail " + (wished ? "active" : "")}
              onClick={() => toggleWish(p)}
            >
              <Heart fill={wished} />
            </button>
          </div>
          <a
            className="wa-product"
            href={waLink(message)}
            target="_blank"
            rel="noreferrer"
          >
            Ask about this product on WhatsApp <Arrow />
          </a>
          <div className="product-perks">
            <span>
              <Truck /> Nationwide delivery
            </span>
            <span>
              <Shield /> Secure checkout
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
function BagIcon() {
  return <span>🛍</span>;
}
