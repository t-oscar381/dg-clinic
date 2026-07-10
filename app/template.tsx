/*
 * App Router re-mounts this on every navigation, so the enter animation
 * runs automatically between routes. Enter-only by design — calm, not
 * springy. Motion is disabled under prefers-reduced-motion in
 * globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
