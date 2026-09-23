# Mrs Miracle Architecture

```text
React/Vite customer storefront
        |
        | REST JSON
        v
Node/Express API ---------------- Paystack
        |
        +------------------------ WhatsApp
        |
        v
PostgreSQL
        ^
        |
Admin dashboard (same React app, protected routes)
```

## Product flow
Admin creates product -> PostgreSQL -> storefront fetches product -> customer adds to cart -> checkout creates order -> online payment is verified by API/webhook OR WhatsApp handoff lets the owner confirm payment manually -> one order record moves through pending, confirmed, processing, shipped, delivered.
