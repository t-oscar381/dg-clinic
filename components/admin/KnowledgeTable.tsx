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

export default function KnowledgeTable({ notes }: { notes: KnowledgeNote[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null); // raw-text row
  const [modal, setModal] = useState<KnowledgeNote | null>(null); // WhatsApp popup
  const [pending, startTransition] = useTransition();

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
    <div className="kb-table-wrap">
      <table className="kb-table">
        <thead>
          <tr>
            <th>Date Created</th>
            <th>Topic</th>
            <th>Knowledge</th>
            <th>Key message</th>
            <th>Revised</th>
            <th className="kb-table__actions-col">Raw / Actions</th>
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
                onOpenSummary={() => setModal(note)}
                onDelete={() => handleDelete(note)}
              />
            );
          })}
        </tbody>
      </table>

      {modal && (
        <div className="kb-modal" onClick={() => setModal(null)} role="dialog" aria-modal="true">
          <div className="kb-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="kb-modal__head">
              <span className="kb-modal__topic">{modal.topic ?? "Catatan"}</span>
              <button className="kb-modal__close" onClick={() => setModal(null)} aria-label="Close">
                ×
              </button>
            </div>
            <div className="kb-chat">
              <div className="kb-bubble">
                {modal.key_message && <p className="kb-bubble__key">{modal.key_message}</p>}
                <p className="kb-bubble__body">{modal.knowledge ?? modal.raw_text}</p>
                <span className="kb-bubble__time">
                  {modal.source === "voice" ? "🎤 " : ""}
                  {fmtDate(modal.created_at)}
                </span>
              </div>
            </div>
          </div>
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
  onOpenSummary,
  onDelete,
}: {
  note: KnowledgeNote;
  isOpen: boolean;
  pending: boolean;
  onToggleRaw: () => void;
  onOpenSummary: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <tr className="kb-row">
        <td className="kb-cell--date">{fmtDate(note.created_at)}</td>
        <td className="kb-cell--topic">{note.topic ?? "Catatan"}</td>
        <td className="kb-cell--knowledge">{note.knowledge ?? "—"}</td>
        <td>
          <button className="kb-summary-link" onClick={onOpenSummary} title="Show summary">
            {note.key_message ?? "view"}
          </button>
        </td>
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
