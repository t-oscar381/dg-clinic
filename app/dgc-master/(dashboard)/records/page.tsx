import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { VISIT_SELECT, type VisitRow } from "@/lib/records";
import RecordsTable from "@/components/admin/RecordsTable";
import { purgeExpired } from "./actions";

export const metadata: Metadata = {
  title: "Patient Records — Admin",
  robots: { index: false, follow: false },
};

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; bin?: string }>;
}) {
  const { from, to, bin } = await searchParams;
  const inBin = bin === "1";

  // Opening the recycle bin also clears anything past its 30-day retention.
  if (inBin) await purgeExpired();

  const supabase = await createClient();
  let query = supabase
    .from("treatment_logs")
    .select(VISIT_SELECT)
    .order("date", { ascending: false });

  if (inBin) {
    query = query.not("deleted_at", "is", null);
  } else {
    query = query.is("deleted_at", null);
    if (from) query = query.gte("date", from);
    if (to) query = query.lte("date", to);
  }

  const { data, error } = await query;
  const rows = (data ?? []) as unknown as VisitRow[];

  return (
    <div>
      <div className="admin-posts__header">
        <div>
          <h1>Patient Records</h1>
          <p style={{ opacity: 0.7 }}>
            Visits logged by the doctors through Robby. Export to the clinic
            intake format, import new rows (add-only), and manage the 30-day
            recycle bin.
          </p>
        </div>
      </div>

      {error && (
        <p className="sim-gate__error">Failed to load records: {error.message}</p>
      )}

      <RecordsTable
        rows={rows}
        inBin={inBin}
        from={from ?? ""}
        to={to ?? ""}
      />
    </div>
  );
}
