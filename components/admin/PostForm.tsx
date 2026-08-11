"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPost, deletePost, updatePost, type PostInput } from "@/app/dgc-master/(dashboard)/posts/actions";
import { REVIEW_CATEGORY } from "@/lib/site";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// The four safe question themes from docs/FEEDBACK-LOG.md §Reviews.
// Service experience only — never treatment results, symptoms,
// conditions, or named treatments. Answers are joined into `body` with
// blank lines between them; a reviewer can leave any of them blank.
const REVIEW_PROMPTS = [
  {
    key: "booking",
    label: "Booking experience",
    question: "How did the booking process compare to visiting a clinic?",
  },
  {
    key: "manner",
    label: "Doctor's manner",
    question: "How did you find the doctor's manner during the visit?",
  },
  {
    key: "comfort",
    label: "Home comfort & privacy",
    question:
      "What did having care at home mean for your schedule or privacy?",
  },
  {
    key: "punctuality",
    label: "Punctuality & professionalism",
    question: "Would you describe the visit as punctual and professional?",
  },
] as const;

function splitReviewBody(body: string): Record<string, string> {
  // Reconstructs the guided fields from a previously-saved review body —
  // each answer was stored as its own paragraph, in prompt order, with
  // blank paragraphs skipped on save (see joinReviewAnswers below), so
  // this can only recover position, not which prompt was left blank.
  // Good enough for editing: worst case an admin re-types one field.
  const paragraphs = body.split("\n\n").filter((p) => p.trim());
  const result: Record<string, string> = {};
  REVIEW_PROMPTS.forEach((p, i) => {
    result[p.key] = paragraphs[i] ?? "";
  });
  return result;
}

function joinReviewAnswers(answers: Record<string, string>): string {
  return REVIEW_PROMPTS.map((p) => answers[p.key]?.trim())
    .filter(Boolean)
    .join("\n\n");
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

  const isReview = category.trim() === REVIEW_CATEGORY;
  const [reviewAnswers, setReviewAnswers] = useState<Record<string, string>>(
    () => (initial?.category === REVIEW_CATEGORY && initial?.body
      ? splitReviewBody(initial.body)
      : {})
  );
  const [complianceChecked, setComplianceChecked] = useState(
    Boolean(postId) && initial?.category === REVIEW_CATEGORY
  );

  const toggleReviewMode = (next: boolean) => {
    setCategory(next ? REVIEW_CATEGORY : "news");
    if (!next) setComplianceChecked(false);
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isReview && !complianceChecked) {
      setError(
        "Confirm the compliance checkbox before saving a review — it's " +
          "there so this can't be skipped by accident."
      );
      return;
    }

    const input: PostInput = {
      title,
      slug,
      excerpt,
      body: isReview ? joinReviewAnswers(reviewAnswers) : body,
      coverImageUrl,
      category,
      status,
    };

    if (isReview && !input.body.trim()) {
      setError("Fill in at least one of the review questions below.");
      return;
    }

    startTransition(async () => {
      const result = postId
        ? await updatePost(postId, input)
        : await createPost(input);

      if ("error" in result) {
        setError(result.error);
        return;
      }
      router.push("/dgc-master/posts");
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
      <div className="post-form__row post-form__review-toggle">
        <label>
          <input
            type="checkbox"
            checked={isReview}
            onChange={(e) => toggleReviewMode(e.target.checked)}
          />
          This is a customer review, not a blog post
        </label>
        <span className="post-form__hint">
          Switches to guided fields for service-experience testimonials —
          see docs/FEEDBACK-LOG.md §Reviews. Reviews are excluded from the
          main /blog listing and shown on /reviews instead.
        </span>
      </div>

      <div className="post-form__row">
        <label htmlFor="title">
          {isReview ? "Reviewer name (first name or initial only)" : "Title"}
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={isReview ? "e.g. Sarah T." : undefined}
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
        <label htmlFor="excerpt">
          {isReview ? "Short summary (optional, not shown on /reviews yet)" : "Excerpt"}
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder={
            isReview
              ? "A short, service-experience line — not a results claim…"
              : "Short summary shown on the blog listing…"
          }
        />
        <span
          className={`post-form__hint ${excerpt.length > 140 ? "is-over" : ""}`}
        >
          {excerpt.length}/140 — keep it short so blog cards stay a
          consistent height
        </span>
      </div>

      {isReview ? (
        <div className="post-form__review-fields">
          <p className="post-form__hint">
            Answer any of these — service experience only. Never write about
            treatment results, symptoms, conditions, or name a specific
            treatment; that turns a testimonial into an outcome claim, which
            Indonesian medical-advertising rules don&rsquo;t allow.
          </p>
          {REVIEW_PROMPTS.map((prompt) => (
            <div className="post-form__row" key={prompt.key}>
              <label htmlFor={`review-${prompt.key}`}>{prompt.label}</label>
              <textarea
                id={`review-${prompt.key}`}
                value={reviewAnswers[prompt.key] ?? ""}
                onChange={(e) =>
                  setReviewAnswers((prev) => ({
                    ...prev,
                    [prompt.key]: e.target.value,
                  }))
                }
                rows={3}
                placeholder={prompt.question}
              />
            </div>
          ))}
          <div className="post-form__row post-form__review-toggle">
            <label>
              <input
                type="checkbox"
                checked={complianceChecked}
                onChange={(e) => setComplianceChecked(e.target.checked)}
                required
              />
              I confirm this describes service experience only — no
              treatment results, symptoms, conditions, or named treatments.
            </label>
          </div>
        </div>
      ) : (
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
      )}

      <div className="post-form__grid">
        <div className="post-form__row">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isReview}
          />
          {isReview && (
            <span className="post-form__hint">
              Set automatically to &ldquo;{REVIEW_CATEGORY}&rdquo; while the
              toggle above is on.
            </span>
          )}
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
