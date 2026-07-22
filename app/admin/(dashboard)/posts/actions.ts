"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string;
  category: string;
  status: "draft" | "published";
};

async function currentUserEmail(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}

function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPost(
  input: PostInput
): Promise<{ error: string } | { success: true; id: string }> {
  const email = await currentUserEmail();
  if (!email) return { error: "Not signed in" };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title.trim(),
      slug: input.slug.trim(),
      excerpt: input.excerpt.trim() || null,
      body: input.body,
      cover_image_url: input.coverImageUrl.trim() || null,
      category: input.category.trim() || "news",
      status: input.status,
      published_at: input.status === "published" ? new Date().toISOString() : null,
      updated_by: email,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };
  revalidateBlog(input.slug);
  return { success: true, id: data.id };
}

export async function updatePost(
  id: string,
  input: PostInput
): Promise<{ error: string } | { success: true }> {
  const email = await currentUserEmail();
  if (!email) return { error: "Not signed in" };

  const supabase = await createClient();

  // Only stamp published_at the first time a post goes live.
  const { data: existing } = await supabase
    .from("posts")
    .select("status, published_at")
    .eq("id", id)
    .single();

  const publishedAt =
    input.status === "published"
      ? existing?.published_at ?? new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("posts")
    .update({
      title: input.title.trim(),
      slug: input.slug.trim(),
      excerpt: input.excerpt.trim() || null,
      body: input.body,
      cover_image_url: input.coverImageUrl.trim() || null,
      category: input.category.trim() || "news",
      status: input.status,
      published_at: publishedAt,
      updated_by: email,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidateBlog(input.slug);
  return { success: true };
}

export async function deletePost(id: string, slug: string) {
  const email = await currentUserEmail();
  if (!email) return { error: "Not signed in" };

  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateBlog(slug);
  redirect("/admin/posts");
}
