import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Bag, Heart, Menu, Search, User, X, Sun, Moon } from "./Icons";
import { useCart } from "../lib/cartContext";
export default function Header({ onMenu }) {
  const { count } = useCart();
  const nav = useNavigate();
  const [search, setSearch] = React.useState("");
  const [theme, setTheme] = React.useState(
    localStorage.getItem("mrs_theme") || "system",
  );
  function apply(v) {
    setTheme(v);
    localStorage.setItem("mrs_theme", v);
    document.documentElement.dataset.theme = v;
  }
  return (
    <>
      <div className="announcement">
        <span>FREE DELIVERY ON ORDERS OVER ₦50,000</span>
        <div>
          <button
            onClick={() => apply(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>
          <span>Nigeria (₦)⌄</span>
          <Link to="/track-order">Track Order</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
      <header className="site-header">
        <button
          className="mobile-only icon-btn"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu />
        </button>
        <Logo />
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim())
              nav("/shop?search=" + encodeURIComponent(search.trim()));
          }}
        >
          <Search />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for bags, shoes, nightwear and more..."
          />
          <kbd>⌘ K</kbd>
        </form>
        <div className="header-links">
          <Link to="/account">
            <User />
            <span>Account</span>
          </Link>
          <Link to="/wishlist">
            <Heart />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="cart-link">
            <Bag />
            <span>Cart</span>
            {count > 0 && <b>{count}</b>}
          </Link>
        </div>
      </header>
    </>
  );
}
