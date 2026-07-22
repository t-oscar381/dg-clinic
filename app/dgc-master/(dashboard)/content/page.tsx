import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata: Metadata = {
  title: "Site Content — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("id, page, section_key, label, content_type, value, updated_at")
    .order("page")
    .order("section_key");

  return (
    <div>
      <h1>Site Content</h1>
      <p style={{ opacity: 0.7, marginBottom: 24 }}>
        Edit copy blocks per page. Changes go live immediately — no
        redeploy needed.
      </p>
      {error ? (
        <p className="sim-gate__error">Failed to load content: {error.message}</p>
      ) : (
        <ContentEditor rows={data ?? []} />
      )}
    </div>
  );
}
