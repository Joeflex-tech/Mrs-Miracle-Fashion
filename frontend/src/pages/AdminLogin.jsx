import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
export default function AdminLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "admin@mrsmiracle.com",
    password: "",
  });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const r = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("mrs_admin_token", r.token);
      nav("/admin");
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main className="admin-login">
      <div className="auth-card">
        <div className="admin-mark">M</div>
        <p className="eyebrow">MRS MIRACLE ADMIN</p>
        <h1>Store control.</h1>
        <p>Manage products, stock and orders without touching code.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary full">Sign in</button>
        </form>
      </div>
    </main>
  );
}
