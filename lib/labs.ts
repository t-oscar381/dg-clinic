// Whitelist for /go/lab?t=<key> redirects (docs/FEEDBACK-LOG.md Round 3,
// B2). This is a security control, not a convenience: the WhatsApp
// message text — and the key recorded for click tracking — are always
// looked up from here, never built from the raw query string. That's
// what stops the route being used for WhatsApp message injection or as
// an open redirect.
//
// Empty today — Tommy hasn't confirmed a specific lab-test menu yet.
// Add entries as tests are confirmed (key -> the label a visitor sees
// and that gets sent to WhatsApp). Any key that isn't listed here,
// including no key at all, falls back to a generic request.
const LAB_TESTS: Record<string, string> = {};

const FALLBACK_KEY = "general";
const FALLBACK_LABEL = "tes lab";

export function resolveLabTest(rawKey: string | null): {
  key: string;
  label: string;
} {
  if (rawKey && Object.prototype.hasOwnProperty.call(LAB_TESTS, rawKey)) {
    return { key: rawKey, label: LAB_TESTS[rawKey] };
  }
  return { key: FALLBACK_KEY, label: FALLBACK_LABEL };
}
