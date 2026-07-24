"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { VisitRow } from "@/lib/records";
import {
  softDeleteVisit,
  restoreVisit,
  purgeVisit,
  importCsv,
} from "@/app/dgc-master/(dashboard)/records/actions";

function fmt(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function rupiah(n: number | null): string {
  if (n == null) return "—";
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export default function RecordsTable({
  rows,
  inBin,
  from,
  to,
}: {
  rows: VisitRow[];
  inBin: boolean;
  from: string;
  to: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function applyRange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const f = String(fd.get("from") || "");
    const t = String(fd.get("to") || "");
    if (f) params.set("from", f);
    if (t) params.set("to", t);
    router.push(`/dgc-master/records${params.toString() ? `?${params}` : ""}`);
  }

  function act(fn: () => Promise<{ error?: string }>) {
    startTransition(async () => {
      const res = await fn();
      if (res?.error) window.alert(res.error);
      else router.refresh();
    });
  }

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportMsg("Importing…");
    file.text().then((text) => {
      startTransition(async () => {
        const res = await importCsv(text);
        if (res.error) setImportMsg(`Import failed: ${res.error}`);
        else setImportMsg(`Imported ${res.inserted} row(s), skipped ${res.skipped}.`);
        if (fileRef.current) fileRef.current.value = "";
        router.refresh();
      });
    });
  }

  const exportHref = `/api/admin/records-export${
    [from && `from=${from}`, to && `to=${to}`].filter(Boolean).length
      ? `?${[from && `from=${from}`, to && `to=${to}`].filter(Boolean).join("&")}`
      : ""
  }`;

  return (
    <div>
      <div className="rec-toolbar">
        {!inBin && (
          <form className="rec-range" onSubmit={applyRange}>
            <label>
              From <input type="date" name="from" defaultValue={from} />
            </label>
            <label>
              To <input type="date" name="to" defaultValue={to} />
            </label>
            <button type="submit" className="btn btn-light btn-sm">
              Filter
            </button>
          </form>
        )}

        <div className="rec-actions">
          {!inBin && (
            <>
              <a className="btn btn-primary btn-sm" href={exportHref}>
                Export CSV
              </a>
              <button
                className="btn btn-light btn-sm"
                onClick={() => fileRef.current?.click()}
                disabled={pending}
              >
                Import CSV
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,text/csv"
                hidden
                onChange={onImportFile}
              />
            </>
          )}
          <a
            className="btn btn-ghost btn-sm"
            href={inBin ? "/dgc-master/records" : "/dgc-master/records?bin=1"}
          >
            {inBin ? "← Back to records" : "Recycle bin"}
          </a>
        </div>
      </div>

      {importMsg && <p className="rec-import-msg">{importMsg}</p>}

      {inBin && (
        <p className="rec-bin-note">
          Deleted visits are kept here for 30 days, then permanently removed.
        </p>
      )}

      {rows.length === 0 ? (
        <p className="sim-cart__empty">
          {inBin ? "Recycle bin is empty." : "No visits in this range."}
        </p>
      ) : (
        <div className="kb-table-wrap">
          <table className="kb-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Nama Pasien</th>
                <th>No WA</th>
                <th>Treatment</th>
                <th>Nominal</th>
                <th>Follow up</th>
                <th>Dokter</th>
                <th className="kb-table__actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="kb-row">
                  <td className="kb-cell--date">{fmt(r.date)}</td>
                  <td className="kb-cell--topic">{r.patients?.full_name ?? "—"}</td>
                  <td className="kb-cell--date">{r.patients?.phone ?? "—"}</td>
                  <td className="kb-cell--knowledge">
                    {[r.protocol, r.dosage, r.route].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="kb-cell--date">{rupiah(r.amount_total)}</td>
                  <td className="kb-cell--date">{fmt(r.next_visit_date)}</td>
                  <td className="kb-cell--date">{r.logged_by ?? "—"}</td>
                  <td className="kb-table__actions">
                    {inBin ? (
                      <>
                        <button
                          className="btn btn-light btn-sm"
                          disabled={pending}
                          onClick={() => act(() => restoreVisit(r.id))}
                        >
                          Restore
                        </button>
                        <button
                          className="btn btn-ghost btn-sm kb-delete"
                          disabled={pending}
                          onClick={() =>
                            window.confirm("Permanently delete this visit? This cannot be undone.") &&
                            act(() => purgeVisit(r.id))
                          }
                        >
                          Delete forever
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-ghost btn-sm kb-delete"
                        disabled={pending}
                        onClick={() => act(() => softDeleteVisit(r.id))}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
