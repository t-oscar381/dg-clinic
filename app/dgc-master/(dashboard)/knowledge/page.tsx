import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import KnowledgeTable, { type KnowledgeNote } from "@/components/admin/KnowledgeTable";

export const metadata: Metadata = {
  title: "Knowledge Bank — Admin",
  robots: { index: false, follow: false },
};

export default async function KnowledgeBankPage() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase
    .from("knowledge_notes")
    .select(
      "id, created_at, revised_at, source, topic, knowledge, key_message, raw_text"
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="admin-posts__header">
        <div>
          <h1>Knowledge Bank</h1>
          <p style={{ opacity: 0.7 }}>
            Dr. Denish&apos;s notes, captured over WhatsApp. Each row keeps his
            exact words (Raw text) plus an AI-organized topic and summary.
          </p>
        </div>
      </div>

      {error && (
        <p className="sim-gate__error">
          Failed to load knowledge notes: {error.message}
        </p>
      )}

      {notes && notes.length === 0 && (
        <p className="sim-cart__empty">
          No knowledge notes yet. They appear here as Dr. Denish sends them.
        </p>
      )}

      {notes && notes.length > 0 && (
        <KnowledgeTable notes={notes as KnowledgeNote[]} />
      )}
    </div>
  );
}
