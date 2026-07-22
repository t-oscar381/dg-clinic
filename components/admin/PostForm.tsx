"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPost, deletePost, updatePost, type PostInput } from "@/app/admin/(dashboard)/posts/actions";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostForm({
  postId,
  initial,
}: {
  postId?: string;
  initial?: Partial<PostInput>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initial?.coverImageUrl ?? ""
  );
  const [category, setCategory] = useState(initial?.category ?? "news");
  const [status, setStatus] = useState<"draft" | "published">(
    initial?.status ?? "draft"
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const input: PostInput = {
      title,
      slug,
      excerpt,
      body,
      coverImageUrl,
      category,
      status,
    };

    startTransition(async () => {
      const result = postId
        ? await updatePost(postId, input)
        : await createPost(input);

      if ("error" in result) {
        setError(result.error);
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    });
  };

  const remove = () => {
    if (!postId) return;
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deletePost(postId, slug);
    });
  };

  return (
    <form className="post-form" onSubmit={submit}>
      <div className="post-form__row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
      </div>

      <div className="post-form__row">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          required
        />
        <span className="post-form__hint">/blog/{slug || "…"}</span>
      </div>

      <div className="post-form__row">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short summary shown on the blog listing…"
        />
      </div>

      <div className="post-form__row">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          required
        />
      </div>

      <div className="post-form__grid">
        <div className="post-form__row">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="post-form__row">
          <label htmlFor="cover">Cover image URL</label>
          <input
            id="cover"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="/images/…"
          />
        </div>
      </div>

      <div className="post-form__row">
        <label>Status</label>
        <div className="post-form__status-toggle">
          <button
            type="button"
            className={`tab ${status === "draft" ? "is-active" : ""}`}
            onClick={() => setStatus("draft")}
          >
            Draft
          </button>
          <button
            type="button"
            className={`tab ${status === "published" ? "is-active" : ""}`}
            onClick={() => setStatus("published")}
          >
            Published
          </button>
        </div>
      </div>

      {error && <p className="sim-gate__error">{error}</p>}

      <div className="content-row__actions">
        {postId && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={remove}
            disabled={pending}
          >
            Delete Post
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : postId ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
