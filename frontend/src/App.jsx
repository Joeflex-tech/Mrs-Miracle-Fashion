import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Instagram, Facebook } from "./components/Icons";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import TrackOrder from "./pages/TrackOrder";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import { CartProvider } from "./lib/cartContext";
import Info from "./pages/Info";
import PaymentComplete from "./pages/PaymentComplete";
function Layout() {
  const [menu, setMenu] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loc.pathname, loc.search]);
  return (
    <>
      <Header onMenu={() => setMenu(true)} />
      {menu && (
        <div className="mobile-drawer" onClick={() => setMenu(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setMenu(false)}>
              ×
            </button>
            <h3>Shop</h3>
            <a href="/shop?category=bags">Bags</a>
            <a href="/shop?category=footwear">Footwear</a>
            <a href="/shop?category=nightwear">Nightwear</a>
            <a href="/shop?category=underwear">Underwear</a>
            <hr />
            <a href="/track-order">Track Order</a>
            <a href="/account">Account</a>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/about" element={<Info type="about" />} />
        <Route path="/contact" element={<Info type="contact" />} />
        <Route path="/help" element={<Info type="help" />} />
        <Route path="/privacy" element={<Info type="privacy" />} />
        <Route path="/terms" element={<Info type="terms" />} />
        <Route path="/payment/complete" element={<PaymentComplete />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}
function Footer() {
  return (
    <>
      <section className="newsletter">
        <div>
          <p className="eyebrow">THE MRS MIRACLE EDIT</p>
          <h2>Be the First to Know</h2>
          <p>Get exclusive deals, new arrivals and style inspiration.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing!");
          }}
        >
          <input type="email" required placeholder="Enter your email address" />
          <button>Subscribe</button>
        </form>
      </section>
      <footer>
        <div className="footer-main">
          <div>
            <div className="footer-logo">
              ♡<br />
              <strong>MRS MIRACLE</strong>
            </div>
            <p>Fashion for every you.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="/shop?category=bags">Bags</a>
            <a href="/shop?category=footwear">Footwear</a>
            <a href="/shop?category=nightwear">Nightwear</a>
            <a href="/shop?category=underwear">Underwear</a>
          </div>
          <div>
            <h4>Help</h4>
            <a href="/track-order">Track Order</a>
            <a href="/help">Delivery</a>
            <a href="/help">Returns</a>
            <a href="/help">FAQs</a>
          </div>
          <div>
            <h4>About</h4>
            <a href="/about">Our Story</a>
            <a href="/contact">Contact Us</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="socials">
              <Instagram />
              <Facebook />
              <span>♪</span>
              <span>▶</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Mrs Miracle. All rights reserved.
          </span>
          <span>Fashion for Every You ♡</span>
        </div>
      </footer>
    </>
  );
}
export default function App() {
  return (
    <CartProvider>
      <Layout />
    </CartProvider>
  );
}
