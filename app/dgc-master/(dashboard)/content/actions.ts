"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { error: string } | { success: true };

async function currentUserEmail(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}

/** Best-effort revalidation: known pages map to routes, others just
 * refresh the whole site since content blocks are small and cheap. */
function revalidateForPage(page: string) {
  const known: Record<string, string> = {
    home: "/",
    "infusion-therapy": "/infusion-therapy",
    "regenerative-therapy": "/regenerative-therapy",
    "metabolic-wellness": "/metabolic-wellness",
    "aesthetics-hair-growth": "/aesthetics-hair-growth",
    "our-story": "/our-story",
    "service-area": "/service-area",
  };
  revalidatePath(known[page] ?? "/", "layout");
}

export async function createContentBlock(input: {
  page: string;
  sectionKey: string;
  label: string;
  contentType: string;
  value: string;
}): Promise<ActionResult> {
  const email = await currentUserEmail();
  if (!email) return { error: "Not signed in" };

  const supabase = await createClient();
  const { error } = await supabase.from("site_content").insert({
    page: input.page.trim(),
    section_key: input.sectionKey.trim(),
    label: input.label.trim(),
    content_type: input.contentType,
    value: input.value,
    updated_by: email,
  });

  if (error) return { error: error.message };
  revalidateForPage(input.page);
  return { success: true };
}

export async function updateContentBlock(input: {
  id: string;
  page: string;
  value: string;
}): Promise<ActionResult> {
  const email = await currentUserEmail();
  if (!email) return { error: "Not signed in" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .update({ value: input.value, updated_by: email })
    .eq("id", input.id);

  if (error) return { error: error.message };
  revalidateForPage(input.page);
  return { success: true };
}

export async function deleteContentBlock(input: {
  id: string;
  page: string;
}): Promise<ActionResult> {
  const email = await currentUserEmail();
  if (!email) return { error: "Not signed in" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .delete()
    .eq("id", input.id);

  if (error) return { error: error.message };
  revalidateForPage(input.page);
  return { success: true };
}
