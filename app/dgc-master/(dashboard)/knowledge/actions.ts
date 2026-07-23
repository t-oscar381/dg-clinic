"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Soft-delete a knowledge note (blabber / unclear entry). We set deleted_at
 * rather than hard-deleting so a mistaken removal is recoverable — consistent
 * with how the bot "undoes" a visit. RLS ("admins update knowledge") gates this
 * to signed-in admins.
 */
export async function softDeleteNote(
  id: string
): Promise<{ error: string } | { success: true }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("knowledge_notes")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/dgc-master/knowledge");
  return { success: true };
}
