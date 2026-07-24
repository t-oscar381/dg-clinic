/**
 * Patient-record mapping — the single source of truth for how a Supabase
 * visit row (treatment_logs joined to patients) becomes the clinic's intake /
 * Dokumen-Hati-Gembira export format. Columns that the bot doesn't structure
 * yet are emitted as empty strings so the CSV already has the target shape;
 * they fill in once the schema/bot expansion lands.
 */

export type PatientEmbed = {
  full_name: string | null;
  phone: string | null;
  dob: string | null;
  allergies: string | null;
  medical_notes: string | null;
};

export type VisitRow = {
  id: string;
  date: string | null;
  protocol: string | null;
  dosage: string | null;
  route: string | null;
  notes: string | null;
  next_visit_date: string | null;
  logged_by: string | null;
  amount_total: number | null;
  extra: Record<string, unknown> | null;
  deleted_at: string | null;
  patients: PatientEmbed | null;
};

/** Columns selected from Supabase for both the table and the export. */
export const VISIT_SELECT =
  "id, date, protocol, dosage, route, notes, next_visit_date, logged_by, amount_total, extra, deleted_at, patients(full_name, phone, dob, allergies, medical_notes)";

function ex(row: VisitRow, key: string): string {
  const v = row.extra?.[key];
  return v == null ? "" : String(v);
}

function joinTruthy(parts: (string | null | undefined)[], sep = " "): string {
  return parts.filter((p) => p != null && String(p).trim() !== "").join(sep);
}

/** Intake/logbook export columns, in order. */
export const EXPORT_HEADERS = [
  "Tanggal",
  "Dokter",
  "HS/OTS/Online",
  "KM",
  "Nama WA",
  "No WA",
  "Nama Pasien",
  "DOB",
  "Alamat",
  "Keluhan saat ini",
  "TTV",
  "Alergi obat",
  "Riwayat penyakit",
  "Riwayat obat",
  "Diagnosis",
  "Treatment / Tindakan",
  "Keterangan",
  "Obat Minum",
  "Delivery",
  "Follow up",
  "Nominal",
] as const;

/** Map one visit row to the ordered export values. */
export function toExportRow(row: VisitRow): string[] {
  const p = row.patients;
  const visitType = ex(row, "visit_type") || (ex(row, "location") ? "HS" : "");
  const ttv = joinTruthy([ex(row, "vitals_bp"), ex(row, "vitals_weight"), ex(row, "vitals_assessment")], ", ");
  return [
    row.date ?? "",
    row.logged_by ?? "",
    visitType,
    ex(row, "travel_distance"),
    "", // Nama WA — not captured yet
    p?.phone ?? "",
    p?.full_name ?? "",
    p?.dob ?? "",
    ex(row, "location"),
    ex(row, "symptoms_noted"),
    ttv,
    p?.allergies ?? "",
    joinTruthy([p?.medical_notes, ex(row, "medical_history")], "; "),
    "", // Riwayat obat — not captured yet
    "", // Diagnosis — not captured yet
    joinTruthy([row.protocol, row.dosage, row.route]),
    row.notes ?? "",
    "", // Obat Minum — not captured yet
    "", // Delivery — not captured yet
    row.next_visit_date ?? "",
    row.amount_total != null ? String(row.amount_total) : "",
  ];
}

/** RFC-4180-ish CSV: quote fields containing comma/quote/newline. */
export function toCsv(headers: readonly string[], rows: string[][]): string {
  const esc = (s: string) =>
    /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  const lines = [headers.map(esc).join(","), ...rows.map((r) => r.map(esc).join(","))];
  return lines.join("\r\n");
}
