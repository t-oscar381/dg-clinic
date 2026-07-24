import { createClient } from "@/lib/supabase/server";
import {
  VISIT_SELECT,
  EXPORT_HEADERS,
  toExportRow,
  toCsv,
  type VisitRow,
} from "@/lib/records";

export const runtime = "nodejs";

/*
 * CSV export of patient visits in the clinic intake / Dokumen-Hati-Gembira
 * format, filtered by date range (?from=YYYY-MM-DD&to=YYYY-MM-DD). Reads under
 * the admin's session (RLS admins-allowlist) — a non-admin gets an empty set.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  let query = supabase
    .from("treatment_logs")
    .select(VISIT_SELECT)
    .is("deleted_at", null)
    .order("date", { ascending: true });
  if (from) query = query.gte("date", from);
  if (to) query = query.lte("date", to);

  const { data, error } = await query;
  if (error) return new Response(`Export failed: ${error.message}`, { status: 500 });

  const rows = ((data ?? []) as unknown as VisitRow[]).map(toExportRow);
  const csv = toCsv(EXPORT_HEADERS, rows);
  const range = [from, to].filter(Boolean).join("_") || "all";

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dg-clinic-records_${range}.csv"`,
    },
  });
}
