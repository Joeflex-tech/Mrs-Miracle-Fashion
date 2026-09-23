import bcrypt from "bcryptjs";
import { q, pool } from "../db.js";
const passwordHash = await bcrypt.hash("Admin@12345", 10);
await q(
  "INSERT INTO admins(email,password_hash) VALUES($1,$2) ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash",
  ["admin@mrsmiracle.com", passwordHash],
);
await q(`INSERT INTO products(name,slug,category,price,old_price,stock,image,description,featured) VALUES
('Classic Chain Handbag','classic-chain-handbag','bags',45000,52000,18,'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85','A polished chain handbag for everyday confidence.',true),
('Luxury Heeled Sandals','luxury-heeled-sandals','footwear',38500,NULL,12,'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85','Elegant heels designed for statement moments.',true),
('Elegant Tote Bag','elegant-tote-bag','bags',52000,NULL,18,'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85','A structured tote with room for the day.',true),
('Premium Slide Sandals','premium-slide-sandals','footwear',28000,NULL,31,'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1000&q=85','Clean, comfortable slides for easy styling.',true)
ON CONFLICT(slug) DO NOTHING`);
console.log("Seed complete. Admin: admin@mrsmiracle.com / Admin@12345");
await pool.end();
