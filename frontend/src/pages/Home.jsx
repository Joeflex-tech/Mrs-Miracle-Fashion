import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Heart, Truck, Shield, Rotate, Headphones } from "../components/Icons";
import { api } from "../lib/api";
import { categories, demoProducts, formatNaira } from "../lib/store";
import { useCart } from "../lib/cartContext";

const categoryArt = {
  bags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
  footwear: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  nightwear: "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?auto=format&fit=crop&w=900&q=85",
  underwear: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85",
};

export default function Home() {
  const [products, setProducts] = useState(demoProducts);
  useEffect(() => {
    api("/products?featured=true")
      .then((r) => r.products?.length && setProducts(r.products))
      .catch(() => {});
  }, []);

  return (
    <main className="home-redesign">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">THE MRS MIRACLE EDIT · NEW SEASON</p>
          <h1>Step Into <span>Your Confident Era.</span></h1>
          <p className="hero-sub">Beautiful bags. Standout footwear. Little luxuries made for every version of you.</p>
          <div className="hero-buttons">
            <Link className="btn btn-primary" to="/shop">Discover the Collection <Arrow /></Link>
            <Link className="text-btn" to="/shop?category=bags">Explore Bags <Arrow /></Link>
          </div>
          <div className="hero-trust">
            <span><Truck /> Nationwide Delivery</span>
            <span><Shield /> Secure Checkout</span>
            <span><Rotate /> Easy Order Support</span>
          </div>
          <div className="hero-note"><span>01</span><i /> Curated pieces. Confident you.</div>
        </div>
        <div className="hero-image">
          <img src="/hero-mrs-miracle.png" alt="Mrs Miracle fashion campaign featuring an elegant woman with a structured handbag" fetchPriority="high" />
          <div className="hero-image-overlay"><span>More</span><span>Than</span><em>Fashion</em><b>♡</b></div>
          <div className="hero-stamp">MADE FOR<br /><strong>YOUR MOMENTS</strong></div>
        </div>
      </section>

      <section className="category-showcase section-shell" aria-labelledby="category-title">
        <div className="section-intro centered-intro">
          <p className="eyebrow">FIND YOUR FEEL</p>
          <h2 id="category-title">A little something for every you.</h2>
          <p>From everyday essentials to the pieces that make an entrance.</p>
        </div>
        <div className="category-row">
          {categories.map((c, i) => (
            <Link to={`/shop?category=${c.slug}`} className={`category-tile category-tile-${i + 1}`} key={c.slug}>
              <div className="circle-art"><img src={categoryArt[c.slug]} alt={`${c.name} collection`} loading="lazy" /></div>
              <div className="category-tile-copy"><span className="category-index">0{i + 1}</span><strong>{c.name}</strong><span className="category-description">{c.copy}</span><span className="category-link">Shop collection <Arrow /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section featured-section section-shell">
        <div className="heading section-heading-redesign">
          <div><p className="eyebrow">THE PIECES YOU CAME FOR</p><h2>Featured favourites</h2><p className="section-subtitle">A considered edit of pieces worth making room for.</p></div>
          <Link to="/shop">Shop all products <Arrow /></Link>
        </div>
        <div className="products-grid">{products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="campaign-grid section-shell" aria-label="Shop the edits">
        <article className="campaign-card campaign-bags">
          <img src={categoryArt.bags} alt="A statement handbag from the Mrs Miracle bags edit" loading="lazy" />
          <div className="campaign-shade" />
          <div className="campaign-copy"><p className="eyebrow">THE BAG EDIT</p><h2>Carry a little<br />confidence.</h2><p>Everyday favourites and statement-making finds.</p><Link className="campaign-link" to="/shop?category=bags">Shop bags <Arrow /></Link></div>
          <span className="campaign-number">01 / ACCESSORIES</span>
        </article>
        <article className="campaign-card campaign-footwear">
          <img src={categoryArt.footwear} alt="Elegant footwear from the Mrs Miracle collection" loading="lazy" />
          <div className="campaign-shade" />
          <div className="campaign-copy"><p className="eyebrow">THE SHOE EDIT</p><h2>Make every<br />step count.</h2><p>Finishing touches that take you places.</p><Link className="campaign-link" to="/shop?category=footwear">Shop footwear <Arrow /></Link></div>
          <span className="campaign-number">02 / FOOTWEAR</span>
        </article>
      </section>

      <section className="mini-edit section-shell">
        <div className="mini-edit-copy"><p className="eyebrow">YOUR OFF-DUTY MOMENT</p><h2>Soft nights.<br /><em>Beautiful essentials.</em></h2><p>Find the pieces that make staying in feel just as special.</p><div className="mini-edit-links"><Link to="/shop?category=nightwear">Explore Nightwear <Arrow /></Link><Link to="/shop?category=underwear">Shop Underwear <Arrow /></Link></div></div>
        <div className="mini-edit-image"><img src={categoryArt.nightwear} alt="Soft nightwear collection" loading="lazy" /><span>THE COMFORT EDIT</span></div>
      </section>

      <section className="brand-note">
        <span className="brand-note-mark">M.</span><p className="eyebrow">FASHION FOR EVERY YOU</p><h2>Style is personal.<br /><em>Make it yours.</em></h2><p>From the everyday to the extraordinary, Mrs Miracle is here for all the ways you show up.</p><Link className="btn btn-primary" to="/shop">Find your next favourite <Arrow /></Link>
      </section>

      <section className="service-strip">
        <div><Truck /><b>Nationwide Delivery</b><span>Across Nigeria</span></div>
        <div><Shield /><b>Secure Checkout</b><span>Shop with confidence</span></div>
        <div><Rotate /><b>Order Assistance</b><span>Here when you need us</span></div>
        <div><Headphones /><b>WhatsApp Support</b><span>Real help, just a message away</span></div>
      </section>
      <a className="whatsapp-float" href="https://wa.me/2349121924994?text=Hello%20Mrs%20Miracle%2C%20I%27d%20like%20some%20help%20with%20an%20order." target="_blank" rel="noreferrer">◉ <span>Chat with us</span></a>
    </main>
  );
}

function ProductCard({ product }) {
  const { toggleWish, wishlist, add } = useCart();
  const wished = wishlist.some((x) => x.id === product.id);
  return (
    <article className="product-card">
      <div className="product-media"><img src={product.image} alt={product.name} loading="lazy" />
        <button className={`heart ${wished ? "active" : ""}`} onClick={() => toggleWish(product)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}><Heart fill={wished} /></button>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className="quick-add" onClick={() => add(product)} aria-label={`Add ${product.name} to cart`}>Add <span>+</span></button>
      </div>
      <Link to={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
      <div className="price">{formatNaira(product.price)} {product.oldPrice && <del>{formatNaira(product.oldPrice)}</del>}</div>
      <div className="rating"><span>★★★★★</span> <small>({product.reviews})</small></div>
    </article>
  );
}
