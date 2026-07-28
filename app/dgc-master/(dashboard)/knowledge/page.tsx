import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import KnowledgeTable, { type KnowledgeNote } from "@/components/admin/KnowledgeTable";

export const metadata: Metadata = {
  title: "Knowledge Bank — Admin",
  robots: { index: false, follow: false },
};

export default async function KnowledgeBankPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; from?: string; to?: string }>;
}) {
  const { q = "", from = "", to = "" } = await searchParams;

  const supabase = await createClient();
  let query = supabase
    .from("knowledge_notes")
    .select(
      "id, created_at, revised_at, source, topic, knowledge, key_message, raw_text"
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (q.trim()) {
    const term = q.trim().replace(/[%_]/g, "");
    query = query.or(
      `topic.ilike.%${term}%,knowledge.ilike.%${term}%,key_message.ilike.%${term}%,raw_text.ilike.%${term}%`
    );
  }
  if (from) query = query.gte("created_at", `${from}T00:00:00`);
  if (to) query = query.lte("created_at", `${to}T23:59:59`);

  const { data: notes, error } = await query;

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

      <KnowledgeTable
        notes={(notes ?? []) as KnowledgeNote[]}
        q={q}
        from={from}
        to={to}
      />
    </div>
  );
}
