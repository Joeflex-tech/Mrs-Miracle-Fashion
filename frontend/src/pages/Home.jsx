import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Arrow,
  Heart,
  Truck,
  Shield,
  Rotate,
  Headphones,
  Search,
} from "../components/Icons";
import { api } from "../lib/api";
import { categories, demoProducts, formatNaira } from "../lib/store";
import { useCart } from "../lib/cartContext";

const categoryArt = {
  bags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
  footwear:
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
  nightwear:
    "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?auto=format&fit=crop&w=700&q=85",
  underwear:
    "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=700&q=85",
};
export default function Home() {
  const [products, setProducts] = useState(demoProducts);
  useEffect(() => {
    api("/products?featured=true")
      .then((r) => r.products?.length && setProducts(r.products))
      .catch(() => {});
  }, []);
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MRS MIRACLE COLLECTION</p>
          <h1>
            Step Into <span>Your Confident Era</span>
          </h1>
          <p className="hero-sub">
            Stylish Bags, Trendy Footwear,
            <br className="desktop" /> Chic Nightwear & More.
          </p>
          <div className="hero-buttons">
            <Link className="btn btn-primary" to="/shop">
              Shop New Arrivals <Arrow />
            </Link>
            <Link className="text-btn" to="/shop?category=bags">
              Explore Bags <Arrow />
            </Link>
          </div>
          <div className="hero-trust">
            <span>
              <Truck /> Fast Delivery
            </span>
            <span>
              <Shield /> Secure Payment
            </span>
            <span>
              <Rotate /> Easy Returns
            </span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/hero-mrs-miracle.png"
            alt="Mrs Miracle fashion campaign featuring an elegant woman with a structured handbag"
            fetchPriority="high"
          />
          <div className="hero-image-overlay" aria-hidden="true">
            <span>More</span>
            <span>Than</span>
            <em>Fashion</em>
            <b>♡</b>
          </div>
          <div className="hero-controls" aria-hidden="true">
            <button type="button">‹</button>
            <button type="button">›</button>
          </div>
          <div className="hero-pagination" aria-hidden="true">
            <b>01</b><span>02</span><span>03</span>
          </div>
        </div>
      </section>
      <section className="category-row">
        {categories.map((c, i) => (
          <Link
            to={"/shop?category=" + c.slug}
            className="category-circle"
            key={c.slug}
          >
            <div className="circle-art">
              <img src={categoryArt[c.slug]} alt="" loading="lazy" />
            </div>
            <strong>{c.name}</strong>
            <span>
              Shop Now <Arrow />
            </span>
          </Link>
        ))}
      </section>
      <section className="section">
        <div className="heading">
          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>Featured Products</h2>
          </div>
          <Link to="/shop">
            View All <Arrow />
          </Link>
        </div>
        <div className="products-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="editorials">
        <div className="editorial editorial-bags">
          <div className="editorial-copy">
            <p className="eyebrow">THE BAG EDIT</p>
            <h2>
              Bags
              <br />
              That Speak
              <br />
              You
            </h2>
            <p>
              From everyday essentials
              <br />
              to statement pieces.
            </p>
            <Link className="pill-light" to="/shop?category=bags">
              Shop Bags <Arrow />
            </Link>
          </div>
        </div>
        <div className="editorial editorial-shoes">
          <div className="shoe-art">
            <span></span>
            <span></span>
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">THE SHOE EDIT</p>
            <h2>
              Step Out
              <br />
              In Style
            </h2>
            <p>
              Trendy. Comfortable.
              <br />
              Unforgettable.
            </p>
            <Link className="pill" to="/shop?category=footwear">
              Shop Footwear <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="service-strip">
        <div>
          <Truck />
          <b>Quality Products</b>
          <span>Carefully selected for you</span>
        </div>
        <div>
          <Truck />
          <b>Nationwide Delivery</b>
          <span>Fast & reliable</span>
        </div>
        <div>
          <Shield />
          <b>Secure Payments</b>
          <span>Your data is safe with us</span>
        </div>
        <div>
          <Headphones />
          <b>WhatsApp Support</b>
          <span>Chat with us easily</span>
        </div>
      </section>
      <a
        className="whatsapp-float"
        href="https://wa.me/2349121924994?text=Hello%20Mrs%20Miracle%2C%20I%27d%20like%20some%20help%20with%20an%20order."
        target="_blank"
        rel="noreferrer"
      >
        ◉ <span>Chat with us</span>
      </a>
    </main>
  );
}
function ProductCard({ product }) {
  const { toggleWish, wishlist, add } = useCart();
  const wished = wishlist.some((x) => x.id === product.id);
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={"heart " + (wished ? "active" : "")}
          onClick={() => toggleWish(product)}
          aria-label="Wishlist"
        >
          <Heart fill={wished} />
        </button>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className="quick-add" onClick={() => add(product)}>
          Add <span>+</span>
        </button>
      </div>
      <Link to={"/product/" + product.slug}>
        <h3>{product.name}</h3>
      </Link>
      <div className="price">
        {formatNaira(product.price)}{" "}
        {product.oldPrice && <del>{formatNaira(product.oldPrice)}</del>}
      </div>
      <div className="rating">
        <span>★★★★★</span> <small>({product.reviews})</small>
      </div>
    </article>
  );
}
