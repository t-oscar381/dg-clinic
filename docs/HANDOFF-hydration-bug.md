# RETRACTED — there was no hydration bug

An earlier version of this file reported that React never hydrated and the site
rendered blank below the hero. **That was a misdiagnosis. Do not act on it.**

Re-verified on `http://localhost:3000/`:

- `.nav-dropdown` gets `is-open` on click — React hydrates correctly
- `.reveal[data-shown="true"]` count climbs as you scroll
- All four service panels render with their images

The blank void was a **cold dev-server compile**: Next was mid-rebuild and
served the HTML shell before the client bundle was ready. Warm, it behaves
normally.

Nothing here needs fixing.

---

## One optional robustness idea (not a bug)

`.reveal` defaults to `opacity: 0` and depends on client JS to reveal content.
That works, but it means any future JS failure hides everything below the fold
rather than degrading gracefully.

Inverting it to progressive enhancement — `.reveal` visible by default, JS adds
the hidden-then-animate class on mount — would make the site fail soft. Same
animation when JS works; plain content when it doesn't.

Worth considering for a medical site, but it is **a nice-to-have, not a defect**.
Do not prioritise it over the outstanding work in:

- `docs/HANDOFF-showcase.md` — image weight (`public/images/dokden/` is 9.7 MB
  of PNGs and should be WebP ≤250 KB). This one is real and still worth doing.
- `docs/HANDOFF-inner-pages.md` — inner pages still on the old light theme.
