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

type SaveStatus = "idle" | "saving" | "saved" | "error";

function TableRow({ row }: { row: ContentRow }) {
  const router = useRouter();
  // savedValue only updates after a successful save, so the "Previous
  // Content" column stays a true before/after comparison while editing.
  const [savedValue, setSavedValue] = useState(row.value);
  const [value, setValue] = useState(row.value);
  const [expanded, setExpanded] = useState(false);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<SaveStatus>("idle");
  const dirty = value !== savedValue;
  const isRichtext = row.content_type === "richtext";

  const save = () => {
    setStatus("saving");
    startTransition(async () => {
      const result = await updateContentBlock({
        id: row.id,
        page: row.page,
        value,
      });
      if ("success" in result) {
        setSavedValue(value);
        setStatus("saved");
        setExpanded(false);
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        setStatus("error");
      }
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
    <tr className="content-table__row">
      <td className="content-table__label">
        <span className="content-table__label-text">{row.label}</span>
        <span className="content-table__key">{row.section_key}</span>
      </td>
      <td className="content-table__prev">{savedValue || "—"}</td>
      <td className="content-table__new">
        {isRichtext ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setExpanded(true)}
            onBlur={() => {
              if (!dirty) setExpanded(false);
            }}
            rows={expanded ? 6 : 2}
          />
        ) : (
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        )}
      </td>
      <td className="content-table__save">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={save}
          disabled={!dirty || pending}
        >
          {status === "saving"
            ? "Loading…"
            : status === "saved"
              ? "Updated!"
              : "Save"}
        </button>
        {status === "error" && (
          <span className="content-table__error">Failed</span>
        )}
        <button
          type="button"
          className="content-table__delete"
          onClick={remove}
          disabled={pending}
          aria-label={`Delete ${row.label}`}
          title="Delete"
        >
          ×
        </button>
      </td>
    </tr>
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

      {visibleRows.length === 0 ? (
        <p className="sim-cart__empty">
          No content blocks yet for &ldquo;{activePage}&rdquo;.
        </p>
      ) : (
        <div className="content-table-wrap">
          <table className="content-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Previous Content</th>
                <th>New Content</th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <TableRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <NewBlockForm page={activePage} />
      </div>
    </div>
  );
}
