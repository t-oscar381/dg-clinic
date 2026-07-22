import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Edit Post — Admin",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, body, cover_image_url, category, status"
    )
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm
        postId={post.id}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          body: post.body,
          coverImageUrl: post.cover_image_url ?? "",
          category: post.category ?? "news",
          status: post.status as "draft" | "published",
        }}
      />
    </div>
  );
}
