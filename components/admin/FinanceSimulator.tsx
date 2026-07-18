"use client";

import { useMemo, useState } from "react";
import {
  formatIdr,
  INFUSION_PRODUCTS,
  INFUSION_TIERS,
} from "@/lib/pricing";
import { LOGO_SRC, SITE_NAME } from "@/lib/site";

/*
 * Speed-bump only, not real security: a shared passcode gates this
 * page from casual visitors. Nothing behind it touches real money or
 * real patient data, so this is intentionally lightweight.
 */
const PASSCODE =
  process.env.NEXT_PUBLIC_ADMIN_SIM_PASSCODE || "dgclinic-demo";
const SESSION_KEY = "dgc-sim-unlocked";

type ReceiptLine = {
  name: string;
  unitPriceIdr: number;
  qty: number;
  lineTotalIdr: number;
};

type Receipt = {
  receiptNo: string;
  provider: string;
  status: string;
  customerName: string;
  issuedAt: string;
  lines: ReceiptLine[];
  totalIdr: number;
  totalDisplay: string;
};

function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <form className="sim-gate" onSubmit={submit}>
      <h1>Finance Simulator</h1>
      <p>Enter the internal passcode to continue.</p>
      <input
        type="password"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        placeholder="Passcode…"
        autoComplete="off"
        autoFocus
      />
      {error && <p className="sim-gate__error">Incorrect passcode.</p>}
      <button type="submit" className="btn btn-primary">
        Enter
      </button>
    </form>
  );
}

function ReceiptView({
  receipt,
  onNewSale,
}: {
  receipt: Receipt;
  onNewSale: () => void;
}) {
  return (
    <div className="sim-receipt-wrap reveal" data-shown="true">
      <div className="sim-receipt" id="sim-receipt-print">
        <div className="sim-receipt__head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt={SITE_NAME} height={48} />
          <div>
            <p className="sim-receipt__title">Official Receipt</p>
            <p className="sim-receipt__meta">{receipt.receiptNo}</p>
          </div>
        </div>

        <div className="sim-receipt__badge">SIMULATED — no real charge</div>

        <div className="sim-receipt__rows">
          <div>
            <span>Billed to</span>
            <strong>{receipt.customerName}</strong>
          </div>
          <div>
            <span>Issued</span>
            <strong>
              {new Date(receipt.issuedAt).toLocaleString("en-ID", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </strong>
          </div>
          <div>
            <span>Paid via</span>
            <strong>{receipt.provider}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className="sim-receipt__status">{receipt.status}</strong>
          </div>
        </div>

        <table className="sim-receipt__table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {receipt.lines.map((line) => (
              <tr key={line.name}>
                <td>{line.name}</td>
                <td>{line.qty}</td>
                <td>{formatIdr(line.unitPriceIdr)}</td>
                <td>{formatIdr(line.lineTotalIdr)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total</td>
              <td>{receipt.totalDisplay}</td>
            </tr>
          </tfoot>
        </table>

        <p className="sim-receipt__footnote">
          {SITE_NAME} · This is a simulated receipt generated for internal
          testing. No payment was actually processed.
        </p>
      </div>

      <div className="sim-receipt__actions">
        <button className="btn btn-ghost" onClick={() => window.print()}>
          Print / Save PDF
        </button>
        <button className="btn btn-primary" onClick={onNewSale}>
          Start New Sale
        </button>
      </div>
    </div>
  );
}

export default function FinanceSimulator() {
  const [unlocked, setUnlocked] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [cart, setCart] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState("");
  const [activeTier, setActiveTier] = useState(INFUSION_TIERS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([productId, qty]) => {
          const product = INFUSION_PRODUCTS.find((p) => p.id === productId)!;
          return { product, qty, lineTotal: product.nowIdr * qty };
        }),
    [cart]
  );

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  const setQty = (productId: string, qty: number) => {
    setCart((prev) => ({ ...prev, [productId]: Math.max(0, qty) }));
  };

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/simulate-payment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          cart: lines.map((l) => ({ productId: l.product.id, qty: l.qty })),
          customerName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Simulation failed");
      setReceipt(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const newSale = () => {
    setReceipt(null);
    setCart({});
    setCustomerName("");
  };

  if (!unlocked) {
    return <PasscodeGate onUnlock={() => setUnlocked(true)} />;
  }

  if (receipt) {
    return <ReceiptView receipt={receipt} onNewSale={newSale} />;
  }

  const products = INFUSION_PRODUCTS.filter((p) => p.tierId === activeTier);

  return (
    <div className="sim-layout">
      <div className="sim-catalogue">
        <div className="tabs" role="tablist" aria-label="Product tiers">
          {INFUSION_TIERS.map((t) => (
            <button
              key={t.id}
              className={`tab ${t.id === activeTier ? "is-active" : ""}`}
              onClick={() => setActiveTier(t.id)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="sim-product-grid">
          {products.map((p) => (
            <div className="sim-product-card" key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="sim-product-card__price">
                {formatIdr(p.nowIdr)}
              </div>
              <div className="sim-qty">
                <button
                  type="button"
                  onClick={() => setQty(p.id, (cart[p.id] || 0) - 1)}
                  aria-label={`Decrease ${p.name} quantity`}
                >
                  −
                </button>
                <span>{cart[p.id] || 0}</span>
                <button
                  type="button"
                  onClick={() => setQty(p.id, (cart[p.id] || 0) + 1)}
                  aria-label={`Increase ${p.name} quantity`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="sim-cart">
        <h2>Cart</h2>
        {lines.length === 0 && <p className="sim-cart__empty">No items yet.</p>}
        {lines.map((l) => (
          <div className="sim-cart__line" key={l.product.id}>
            <span>
              {l.product.name} × {l.qty}
            </span>
            <span>{formatIdr(l.lineTotal)}</span>
          </div>
        ))}
        <div className="sim-cart__total">
          <span>Total</span>
          <span>{formatIdr(total)}</span>
        </div>

        <label className="sim-cart__label" htmlFor="customerName">
          Patient name
        </label>
        <input
          id="customerName"
          className="sim-cart__input"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Walk-in patient"
          autoComplete="off"
        />

        {error && <p className="sim-gate__error">{error}</p>}

        <button
          className="btn btn-primary sim-cart__submit"
          disabled={lines.length === 0 || loading}
          onClick={submit}
        >
          {loading ? "Processing…" : "Simulate Payment via Paper.id"}
        </button>
      </aside>
    </div>
  );
}
