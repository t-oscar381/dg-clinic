"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { softDeleteNote } from "@/app/dgc-master/(dashboard)/knowledge/actions";

export type KnowledgeNote = {
  id: string;
  created_at: string | null;
  revised_at: string | null;
  source: "text" | "voice";
  topic: string | null;
  knowledge: string | null;
  key_message: string | null;
  raw_text: string;
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function KnowledgeTable({
  notes,
  q,
  from,
  to,
}: {
  notes: KnowledgeNote[];
  q: string;
  from: string;
  to: string;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const filtered = Boolean(q || from || to);

  function applyFilters(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const qv = String(fd.get("q") || "").trim();
    const fv = String(fd.get("from") || "");
    const tv = String(fd.get("to") || "");
    if (qv) params.set("q", qv);
    if (fv) params.set("from", fv);
    if (tv) params.set("to", tv);
    router.push(`/dgc-master/knowledge${params.toString() ? `?${params}` : ""}`);
  }

  function handleDelete(note: KnowledgeNote) {
    if (
      !window.confirm(
        `Delete this note?\n\n"${note.topic ?? "Catatan"}"\n\nIt will be hidden (recoverable in the database).`
      )
    )
      return;
    startTransition(async () => {
      const res = await softDeleteNote(note.id);
      if ("error" in res) {
        window.alert(`Delete failed: ${res.error}`);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <form className="kb-filterbar" onSubmit={applyFilters}>
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search topic, knowledge, key message, or raw text…"
          className="kb-filterbar__search"
        />
        <label className="kb-filterbar__date">
          From
          <input type="date" name="from" defaultValue={from} />
        </label>
        <label className="kb-filterbar__date">
          To
          <input type="date" name="to" defaultValue={to} />
        </label>
        <button type="submit" className="btn btn-primary btn-sm">
          Search
        </button>
        {filtered && (
          <a href="/dgc-master/knowledge" className="btn btn-ghost btn-sm">
            Clear
          </a>
        )}
      </form>

      <p className="kb-count">
        {notes.length} note{notes.length === 1 ? "" : "s"}
        {filtered ? " matching your filter" : ""}
      </p>

      {notes.length === 0 ? (
        <p className="sim-cart__empty">
          {filtered
            ? "No notes match this search."
            : "No knowledge notes yet. They appear here as Dr. Denish sends them."}
        </p>
      ) : (
        <div className="kb-table-wrap">
          <table className="kb-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Topic</th>
                <th>Knowledge</th>
                <th>Key message</th>
                <th>Revised</th>
                <th className="kb-table__actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => {
                const isOpen = expanded === note.id;
                return (
                  <FragmentRow
                    key={note.id}
                    note={note}
                    isOpen={isOpen}
                    pending={pending}
                    onToggleRaw={() => setExpanded(isOpen ? null : note.id)}
                    onDelete={() => handleDelete(note)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FragmentRow({
  note,
  isOpen,
  pending,
  onToggleRaw,
  onDelete,
}: {
  note: KnowledgeNote;
  isOpen: boolean;
  pending: boolean;
  onToggleRaw: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <tr className="kb-row">
        <td className="kb-cell--date">{fmtDate(note.created_at)}</td>
        <td className="kb-cell--topic">{note.topic ?? "Catatan"}</td>
        <td className="kb-cell--knowledge">{note.knowledge ?? "—"}</td>
        <td className="kb-cell--knowledge">{note.key_message ?? "—"}</td>
        <td className="kb-cell--date">{fmtDate(note.revised_at)}</td>
        <td className="kb-table__actions">
          <button
            className="btn btn-light btn-sm"
            onClick={onToggleRaw}
            aria-expanded={isOpen}
            title="Show the original words"
          >
            Raw {isOpen ? "▲" : "▼"}
          </button>
          <button
            className="btn btn-ghost btn-sm kb-delete"
            onClick={onDelete}
            disabled={pending}
            title="Delete this note"
          >
            Delete
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr className="kb-raw-row">
          <td colSpan={6}>
            <div className="kb-raw">
              <span className="kb-raw__label">
                Raw {note.source === "voice" ? "(voice transcript)" : "(typed)"}:
              </span>
              <p className="kb-raw__text">{note.raw_text}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
