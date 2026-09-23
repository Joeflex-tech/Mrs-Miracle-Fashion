import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
export default function PaymentComplete() {
  const [params] = useSearchParams();
  const [state, setState] = useState("checking");
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const ref = params.get("reference") || params.get("trxref");
    if (!ref) {
      setState("missing");
      return;
    }
    api("/payments/verify/" + encodeURIComponent(ref))
      .then((r) => {
        setOrder(r);
        setState(r.status === "success" ? "success" : "failed");
      })
      .catch(() => setState("failed"));
  }, []);
  return (
    <main className="empty">
      <div>
        <p className="eyebrow">PAYMENT</p>
        <h1>
          {state === "checking"
            ? "Confirming your payment…"
            : state === "success"
              ? "Payment confirmed."
              : "Payment could not be confirmed."}
        </h1>
        {order?.reference && <p>Reference: {order.reference}</p>}
        <Link className="btn btn-primary" to="/">
          Return to store
        </Link>
      </div>
    </main>
  );
}
