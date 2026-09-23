import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { q } from "../db.js";
const r = Router();
r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });
  const rows = await q(
    "SELECT id,email,password_hash FROM admins WHERE email=$1",
    [email.toLowerCase()],
  );
  if (!rows[0] || !(await bcrypt.compare(password, rows[0].password_hash)))
    return res.status(401).json({ message: "Invalid login details" });
  const token = jwt.sign(
    { id: rows[0].id, email: rows[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" },
  );
  res.json({ token, admin: { id: rows[0].id, email: rows[0].email } });
});
export default r;
