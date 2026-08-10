"use client";

import { useState, useTransition } from "react";
import { runInstagramSyncNow } from "@/app/dgc-master/(dashboard)/instagram/actions";
import type { SyncResult } from "@/lib/instagram";

export default function InstagramSyncPanel() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = () => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const outcome = await runInstagramSyncNow();
      if ("error" in outcome) {
        setError(outcome.error);
      } else {
        setResult(outcome.result);
      }
    });
  };

  return (
    <div className="admin-card">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={handleSync}
        disabled={isPending}
      >
        {isPending ? "Syncing…" : "Sync Now"}
      </button>
      <p className="admin-hint">
        Runs the same sync the daily cron does — use this to verify a new
        token or a new post without waiting until 2am.
      </p>

      {error && <p className="admin-error">{error}</p>}

      {result && (
        <dl className="admin-kv">
          <dt>Fetched</dt>
          <dd>{result.fetched}</dd>
          <dt>Upserted</dt>
          <dd>{result.upserted}</dd>
          <dt>Skipped</dt>
          <dd>{result.skipped}</dd>
          <dt>Pruned</dt>
          <dd>{result.pruned}</dd>
          <dt>Errors</dt>
          <dd>{result.errors.length === 0 ? "None" : result.errors.join("; ")}</dd>
        </dl>
      )}
    </div>
  );
}
