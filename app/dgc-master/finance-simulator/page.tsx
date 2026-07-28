import type { Metadata } from "next";
import FinanceSimulator from "@/components/admin/FinanceSimulator";

export const metadata: Metadata = {
  title: "Finance Simulator — Internal Tool",
  robots: { index: false, follow: false },
};

export default function FinanceSimulatorPage() {
  return (
    <section className="section-tight container sim-page">
      <div className="sim-banner">
        <strong>Internal tool — not part of the public site.</strong>{" "}
        Simulates the cart → Paper.id payment → receipt flow with no real
        charges. Not linked to Paper.id yet — see{" "}
        <code>lib/paperid.ts</code> for the integration point.
      </div>
      <FinanceSimulator />
    </section>
  );
}
