import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { formatNaira } from "../lib/store";
export default function Admin() {
  const nav = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "bags",
    price: "",
    stock: "",
    description: "",
    image: "",
  });
  const [editing, setEditing] = useState(null);
  useEffect(() => {
    load();
  }, []);
  async function load() {
    try {
      const [s, p, o, c] = await Promise.all([
        api("/admin/stats"),
        api("/products?all=true"),
        api("/orders"),
        api("/admin/customers"),
      ]);
      setStats(s);
      setProducts(p.products || []);
      setOrders(o.orders || []);
      setCustomers(c.customers || []);
    } catch (e) {
      if (e.message.toLowerCase().includes("token")) {
        localStorage.removeItem("mrs_admin_token");
        nav("/admin/login");
      }
    }
  }
  function logout() {
    localStorage.removeItem("mrs_admin_token");
    nav("/admin/login");
  }
  async function save(e) {
    e.preventDefault();
    try {
      if (editing)
        await api("/products/" + editing, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      else
        await api("/products", { method: "POST", body: JSON.stringify(form) });
      setForm({
        name: "",
        category: "bags",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  }
  async function del(id) {
    if (confirm("Delete this product?")) {
      await api("/products/" + id, { method: "DELETE" });
      load();
    }
  }
  async function status(id, status) {
    await api("/orders/" + id, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    load();
  }
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          MRS MIRACLE<small>ADMIN</small>
        </div>
        {["dashboard", "products", "orders", "customers", "settings"].map(
          (x) => (
            <button
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
              key={x}
            >
              {x[0].toUpperCase() + x.slice(1)}
            </button>
          ),
        )}
        <button onClick={logout}>Sign out</button>
      </aside>
      <section className="admin-content">
        <div className="admin-top">
          <div>
            <p className="eyebrow">STORE CONTROL</p>
            <h1>{tab[0].toUpperCase() + tab.slice(1)}</h1>
          </div>
          <Link to="/" className="text-btn">
            View Store →
          </Link>
        </div>
        {tab === "dashboard" && <Dashboard stats={stats} orders={orders} />}{" "}
        {tab === "products" && (
          <Products
            products={products}
            form={form}
            setForm={setForm}
            editing={editing}
            setEditing={setEditing}
            save={save}
            del={del}
          />
        )}{" "}
        {tab === "orders" && <Orders orders={orders} status={status} />}{" "}
        {tab === "customers" && <Customers customers={customers} />}{" "}
        {tab === "settings" && <Settings />}
      </section>
    </div>
  );
}
function Dashboard({ stats, orders }) {
  return (
    <>
      <div className="stats">
        <div>
          <span>Products</span>
          <b>{stats.products ?? 0}</b>
        </div>
        <div>
          <span>Orders</span>
          <b>{stats.orders ?? 0}</b>
        </div>
        <div>
          <span>Pending</span>
          <b>{stats.pending ?? 0}</b>
        </div>
        <div>
          <span>Revenue</span>
          <b>{formatNaira(stats.revenue ?? 0)}</b>
        </div>
      </div>
      <div className="admin-panel">
        <h2>Recent orders</h2>
        {orders.slice(0, 6).map((o) => (
          <div className="admin-row" key={o.id}>
            <b>{o.reference}</b>
            <span>{o.customer_name}</span>
            <span>{formatNaira(o.total)}</span>
            <span className={"status " + o.status}>{o.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}
function Products({ products, form, setForm, editing, setEditing, save, del }) {
  return (
    <div className="admin-two">
      <div className="admin-panel">
        <div className="panel-head">
          <h2>{editing ? "Edit product" : "Add product"}</h2>
          {editing && (
            <button
              onClick={() => {
                setEditing(null);
                setForm({
                  name: "",
                  category: "bags",
                  price: "",
                  stock: "",
                  description: "",
                  image: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <form className="admin-form" onSubmit={save}>
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>bags</option>
              <option>footwear</option>
              <option>nightwear</option>
              <option>underwear</option>
            </select>
          </label>
          <label>
            Price
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>
          <label>
            Stock
            <input
              type="number"
              required
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </label>
          <label>
            Image URL
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Cloudinary/S3 URL or uploaded path"
            />
          </label>
          <label>
            Upload image
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const fd = new FormData();
                fd.append("image", file);
                try {
                  const r = await api("/uploads/image", {
                    method: "POST",
                    body: fd,
                  });
                  setForm({ ...form, image: r.url });
                } catch (err) {
                  alert(err.message);
                }
              }}
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
          <button className="btn btn-primary">
            {editing ? "Save changes" : "Add product"}
          </button>
        </form>
      </div>
      <div className="admin-panel">
        <h2>Products</h2>
        {products.map((p) => (
          <div className="admin-product" key={p.id}>
            <img src={p.image} alt="" />
            <div>
              <b>{p.name}</b>
              <span>
                {formatNaira(p.price)} • Stock {p.stock}
              </span>
            </div>
            <button
              onClick={() => {
                setEditing(p.id);
                setForm({
                  name: p.name,
                  category: p.category,
                  price: p.price,
                  stock: p.stock,
                  description: p.description || "",
                  image: p.image || "",
                });
              }}
            >
              Edit
            </button>
            <button onClick={() => del(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
function Orders({ orders, status }) {
  return (
    <div className="admin-panel">
      <h2>Orders</h2>
      {orders.map((o) => (
        <div className="admin-order" key={o.id}>
          <div>
            <b>{o.reference}</b>
            <span>
              {o.customer_name} • {o.channel}
            </span>
          </div>
          <strong>{formatNaira(o.total)}</strong>
          <select
            value={o.status}
            onChange={(e) => status(o.id, e.target.value)}
          >
            <option>pending</option>
            <option>confirmed</option>
            <option>processing</option>
            <option>shipped</option>
            <option>delivered</option>
            <option>cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
function Customers({ customers }) {
  return (
    <div className="admin-panel">
      <h2>Customers</h2>
      {customers.length ? (
        customers.map((c) => (
          <div className="admin-row" key={c.id}>
            <b>{c.name}</b>
            <span>{c.phone}</span>
            <span>{c.email || "—"}</span>
            <span>{c.city || "—"}</span>
          </div>
        ))
      ) : (
        <p className="muted">
          Customer records will populate automatically from checkout orders.
        </p>
      )}
    </div>
  );
}
function Settings() {
  return (
    <div className="admin-panel">
      <h2>Store Settings</h2>
      <p className="muted">
        Payment keys, WhatsApp number, delivery rules and brand settings are
        controlled securely through environment variables and the database. This
        keeps the owner away from code.
      </p>
    </div>
  );
}
