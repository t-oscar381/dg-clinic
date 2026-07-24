"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const PATH = "/dgc-master/records";

/** Soft-delete a visit → recycle bin (recoverable for 30 days). */
export async function softDeleteVisit(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("treatment_logs")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(PATH);
  return {};
}

/** Restore a soft-deleted visit from the recycle bin. */
export async function restoreVisit(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("treatment_logs")
    .update({ deleted_at: null })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(PATH);
  return {};
}

/** Permanently delete one visit (from the recycle bin). */
export async function purgeVisit(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("treatment_logs").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(PATH);
  return {};
}

/**
 * Purge visits soft-deleted more than 30 days ago. Called when the recycle bin
 * is opened, so items don't linger past their retention window even without a
 * scheduled job.
 */
export async function purgeExpired(): Promise<void> {
  const supabase = await createClient();
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  await supabase
    .from("treatment_logs")
    .delete()
    .not("deleted_at", "is", null)
    .lt("deleted_at", cutoff);
}

/**
 * Add-only CSV import: each row inserts a NEW visit. A patient is matched by
 * exact phone, else exact full name, else created. Existing patient rows are
 * NEVER updated — this only ADDS data, per the requirement.
 * Expects columns (case-insensitive, extras ignored): Nama Pasien, No WA,
 * Tanggal, Treatment/Tindakan (or Protocol), Nominal, Follow up.
 */
export async function importCsv(
  csvText: string
): Promise<{ inserted: number; skipped: number; error?: string }> {
  const rows = parseCsv(csvText);
  if (rows.length < 2) return { inserted: 0, skipped: 0, error: "CSV has no data rows." };

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name.toLowerCase());
  const iName = col("nama pasien");
  const iPhone = col("no wa");
  const iDate = col("tanggal");
  const iTreat = col("treatment / tindakan") >= 0 ? col("treatment / tindakan") : col("protocol");
  const iAmount = col("nominal");
  const iFollow = col("follow up");
  if (iName < 0) return { inserted: 0, skipped: 0, error: "CSV must have a 'Nama Pasien' column." };

  const supabase = await createClient();
  let inserted = 0;
  let skipped = 0;

  for (const r of rows.slice(1)) {
    const name = (r[iName] ?? "").trim();
    if (!name) {
      skipped++;
      continue;
    }
    const phone = iPhone >= 0 ? (r[iPhone] ?? "").trim() : "";

    // Match existing patient (add-only: never update them), else create.
    let patientId: string | null = null;
    if (phone) {
      const { data } = await supabase.from("patients").select("id").eq("phone", phone).limit(1);
      patientId = data?.[0]?.id ?? null;
    }
    if (!patientId) {
      const { data } = await supabase.from("patients").select("id").eq("full_name", name).limit(1);
      patientId = data?.[0]?.id ?? null;
    }
    if (!patientId) {
      const { data, error } = await supabase
        .from("patients")
        .insert({ full_name: name, phone: phone || null, is_active: true })
        .select("id")
        .single();
      if (error || !data) {
        skipped++;
        continue;
      }
      patientId = data.id;
    }

    const amountRaw = iAmount >= 0 ? (r[iAmount] ?? "").replace(/[^\d.]/g, "") : "";
    const { error } = await supabase.from("treatment_logs").insert({
      patient_id: patientId,
      date: iDate >= 0 && r[iDate] ? r[iDate].trim() : new Date().toISOString().slice(0, 10),
      protocol: iTreat >= 0 ? (r[iTreat] ?? "").trim() || "Imported" : "Imported",
      next_visit_date: iFollow >= 0 && r[iFollow]?.trim() ? r[iFollow].trim() : null,
      amount_total: amountRaw ? Number(amountRaw) : null,
      logged_by: "import",
    });
    if (error) skipped++;
    else inserted++;
  }

  revalidatePath(PATH);
  return { inserted, skipped };
}

/** Minimal CSV parser (handles quoted fields, commas, CRLF). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}
