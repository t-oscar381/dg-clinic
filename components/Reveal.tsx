"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Scroll-triggered fade-up. Fires once, then unobserves — content never
 * re-hides on scroll-up. Under prefers-reduced-motion it shows
 * immediately and skips observing. No dependencies.
 *
 * Stagger a group by passing an increasing delay:
 *   {items.map((it, i) => <Reveal key={it.id} delay={i * 90}>…</Reveal>)}
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Fallback for jumps the observer can't see: an instant scroll from
    // below the viewport to above it never produces an intersection
    // change, and content must never stay hidden behind the reader.
    const showIfPassed = () => {
      if (el.getBoundingClientRect().top < 0) {
        setShown(true);
        observer.disconnect();
        window.removeEventListener("scroll", showIfPassed);
      }
    };
    window.addEventListener("scroll", showIfPassed, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", showIfPassed);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
