import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Account() {
  const [mode, setMode] = useState("login");
  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">MRS MIRACLE</p>
        <h1>{mode === "login" ? "Welcome back." : "Create your account."}</h1>
        <p>
          {mode === "login"
            ? "Sign in to view orders and saved details."
            : "Create an account for faster checkout."}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Account authentication will connect to the production API in the next backend stage.",
            );
          }}
        >
          {mode === "signup" && (
            <label>
              Full name
              <input required />
            </label>
          )}
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Password
            <input type="password" required />
          </label>
          <button className="btn btn-primary full">
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <button
          className="switch"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Don't have an account? Create one"
            : "Already have an account? Sign in"}
        </button>
        <Link to="/track-order" className="track-link">
          Track an order without signing in →
        </Link>
      </div>
    </main>
  );
}
