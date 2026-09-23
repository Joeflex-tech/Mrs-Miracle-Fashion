import React from "react";
export default function Info({ type }) {
  const copy = {
    about: [
      "Our Story",
      "Mrs Miracle is a fashion destination built around confident everyday style — with bags and footwear at the heart of the collection.",
    ],
    contact: [
      "Contact Us",
      "We are here to help with sizing, product availability, orders and delivery. WhatsApp: +234 912 192 4994 • Email: Miracleogbonnaya32@gmail.com",
    ],
    help: [
      "Help Centre",
      "Need help with delivery, returns, sizing or your order? Contact us on WhatsApp and our team will assist you.",
    ],
    privacy: [
      "Privacy Policy",
      "We use customer information only to process orders, provide support and improve the store. Payment details are handled by the payment provider and are not stored by Mrs Miracle.",
    ],
    terms: [
      "Terms & Conditions",
      "Product availability, pricing and delivery estimates may change. Orders are confirmed after payment verification or manual confirmation through WhatsApp.",
    ],
  }[type] || ["Mrs Miracle", "Fashion for every you."];
  return (
    <main className="auth-page">
      <div className="auth-card wide-card">
        <p className="eyebrow">MRS MIRACLE</p>
        <h1>{copy[0]}</h1>
        <p>{copy[1]}</p>
      </div>
    </main>
  );
}
