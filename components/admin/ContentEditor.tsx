"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createContentBlock,
  deleteContentBlock,
  updateContentBlock,
} from "@/app/dgc-master/(dashboard)/content/actions";

export type ContentRow = {
  id: string;
  page: string;
  section_key: string;
  label: string;
  content_type: string;
  value: string;
  updated_at: string;
};

const KNOWN_PAGES = [
  "home",
  "infusion-therapy",
  "regenerative-therapy",
  "metabolic-wellness",
  "aesthetics-hair-growth",
  "our-story",
  "service-area",
];

function EditableRow({ row }: { row: ContentRow }) {
  const router = useRouter();
  const [value, setValue] = useState(row.value);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const dirty = value !== row.value;

  const save = () => {
    startTransition(async () => {
      const result = await updateContentBlock({
        id: row.id,
        page: row.page,
        value,
      });
      setStatus("success" in result ? "saved" : "error");
      setTimeout(() => setStatus("idle"), 2000);
      router.refresh();
    });
  };

  const remove = () => {
    if (!confirm(`Delete "${row.label}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteContentBlock({ id: row.id, page: row.page });
      router.refresh();
    });
  };

  return (
    <div className="content-row">
      <div className="content-row__head">
        <label>{row.label}</label>
        <span className="content-row__key">{row.section_key}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={row.content_type === "richtext" ? 5 : 2}
      />
      <div className="content-row__actions">
        {status === "saved" && (
          <span className="content-row__status is-saved">Saved</span>
        )}
        {status === "error" && (
          <span className="content-row__status is-error">Failed to save</span>
        )}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={remove}
          disabled={pending}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={save}
          disabled={!dirty || pending}
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

function NewBlockForm({ page }: { page: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sectionKey, setSectionKey] = useState("");
  const [label, setLabel] = useState("");
  const [contentType, setContentType] = useState("text");
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => setOpen(true)}
      >
        + Add Content Block
      </button>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createContentBlock({
        page,
        sectionKey,
        label,
        contentType,
        value,
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setSectionKey("");
      setLabel("");
      setValue("");
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <form className="content-new" onSubmit={submit}>
      <div className="content-new__grid">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label (e.g. Hero Subtitle)"
          required
        />
        <input
          value={sectionKey}
          onChange={(e) =>
            setSectionKey(
              e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_")
            )
          }
          placeholder="key_like_this"
          required
        />
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="richtext">Rich text</option>
          <option value="image_url">Image URL</option>
        </select>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value…"
        rows={3}
      />
      {error && <p className="sim-gate__error">{error}</p>}
      <div className="content-row__actions">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={pending}
        >
          {pending ? "Creating…" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default function ContentEditor({ rows }: { rows: ContentRow[] }) {
  const pages = useMemo(() => {
    const found = new Set(rows.map((r) => r.page));
    KNOWN_PAGES.forEach((p) => found.add(p));
    return Array.from(found);
  }, [rows]);

  const [activePage, setActivePage] = useState(pages[0]);
  const visibleRows = rows.filter((r) => r.page === activePage);

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Content pages">
        {pages.map((page) => (
          <button
            key={page}
            className={`tab ${page === activePage ? "is-active" : ""}`}
            onClick={() => setActivePage(page)}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>

      <div className="content-list">
        {visibleRows.length === 0 && (
          <p className="sim-cart__empty">
            No content blocks yet for &ldquo;{activePage}&rdquo;.
          </p>
        )}
        {visibleRows.map((row) => (
          <EditableRow key={row.id} row={row} />
        ))}
      </div>

      <NewBlockForm page={activePage} />
    </div>
  );
}
