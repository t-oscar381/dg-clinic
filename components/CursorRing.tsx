"use client";

import { useEffect, useRef } from "react";

/*
 * A soft, breathing ring that trails the mouse. Pure CSS keyframes for
 * the pulse; JS only eases the ring toward the pointer (a "following
 * track" feel). Pointer devices only, and it never blocks clicks.
 */
export default function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!finePointer) return;

    const el = ref.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        el.classList.add("is-visible");
      }
    };
    const onLeave = () => {
      visible = false;
      el.classList.remove("is-visible");
    };

    const tick = () => {
      // Ease toward the cursor so the ring trails smoothly.
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      el.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-ring" aria-hidden="true">
      <span className="cursor-ring__core" />
      <span className="cursor-ring__ping" />
    </div>
  );
}
