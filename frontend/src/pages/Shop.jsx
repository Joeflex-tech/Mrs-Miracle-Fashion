import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Search, Arrow } from "../components/Icons";
import { api } from "../lib/api";
import { categories, demoProducts, formatNaira } from "../lib/store";
import { useCart } from "../lib/cartContext";
export default function Shop() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState(demoProducts);
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [search, setSearch] = useState(params.get("search") || "");
  useEffect(() => {
    api("/products")
      .then((r) => r.products?.length && setProducts(r.products))
      .catch(() => {});
  }, []);
  const shown = useMemo(() => {
    let x = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "price-low") x.sort((a, b) => a.price - b.price);
    if (sort === "price-high") x.sort((a, b) => b.price - a.price);
    return x;
  }, [products, category, search, sort]);
  return (
    <main className="shop-page">
      <div className="shop-hero">
        <p className="eyebrow">THE COLLECTION</p>
        <h1>
          Shop <span>Mrs Miracle</span>
        </h1>
        <p>Find your next favourite piece.</p>
      </div>
      <div className="shop-toolbar">
        <div className="category-tabs">
          <button
            className={category === "all" ? "active" : ""}
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              className={category === c.slug ? "active" : ""}
              onClick={() => setCategory(c.slug)}
              key={c.slug}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <label>
            <Search />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collection"
            />
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="shop-count">
        {shown.length} {shown.length === 1 ? "piece" : "pieces"}
      </div>
      <div className="products-grid shop-grid">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
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
