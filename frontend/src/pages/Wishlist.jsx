import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "../components/Icons";
import { formatNaira } from "../lib/store";
import { useCart } from "../lib/cartContext";
export default function Wishlist() {
  const { wishlist, toggleWish, add } = useCart();
  return (
    <main className="section simple-page">
      <p className="eyebrow">SAVED FOR LATER</p>
      <h1>Your Wishlist</h1>
      {!wishlist.length ? (
        <div className="empty-small">
          <Heart />
          <p>You haven't saved any pieces yet.</p>
          <Link to="/shop">Discover the collection →</Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="product-media">
                <img src={p.image} alt={p.name} />
                <button className="heart active" onClick={() => toggleWish(p)}>
                  <Heart fill />
                </button>
                <button className="quick-add" onClick={() => add(p)}>
                  Add <span>+</span>
                </button>
              </div>
              <h3>{p.name}</h3>
              <div className="price">{formatNaira(p.price)}</div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
