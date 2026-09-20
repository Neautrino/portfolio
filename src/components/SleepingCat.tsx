import { useState } from 'react';

/**
 * A cat asleep in the footer, in the same spirit as the running oneko cat
 * that chases the cursor in the page body — one character, two states.
 *
 * Reuses the vendored oneko sprite sheet (public/oneko.gif) at its
 * sleeping cell, so this adds no new asset. Breathing and drifting z's
 * are pure CSS (`.sleeping-cat*` classes in index.css) and are neutralised
 * for free under prefers-reduced-motion.
 *
 * Placement is the caller's job: pass `className` including a position
 * utility (e.g. `absolute right-6 bottom-full`).
 */

const DREAMS = [
  'a laptop fan, still warm',
  'the bird outside. finally.',
  'a box exactly one size too small',
  'a sunbeam that does not move',
  'the keyboard, unattended',
];

export function SleepingCat({ className }: { className?: string }) {
  // -1 means "nothing peeked yet"; each open advances, so repeat peeks
  // cycle through the list instead of replaying the same line.
  const [dream, setDream] = useState(-1);
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      className={['sleeping-cat', className].filter(Boolean).join(' ')}
      aria-expanded={open}
      aria-label={open ? 'stop peeking at the dream' : 'peek at what the cat is dreaming'}
      onClick={() => {
        if (open) {
          setOpen(false);
          return;
        }
        setDream((prev) => (prev + 1) % DREAMS.length);
        setOpen(true);
      }}
    >
      <span className="sleeping-cat-sprite" aria-hidden="true" />
      <span className="sleeping-cat-zee sleeping-cat-zee-1" aria-hidden="true">
        z
      </span>
      <span className="sleeping-cat-zee sleeping-cat-zee-2" aria-hidden="true">
        z
      </span>
      <span className="sleeping-cat-zee sleeping-cat-zee-3" aria-hidden="true">
        z
      </span>
      <span
        aria-live="polite"
        className={`sleeping-cat-dream absolute right-0 bottom-[calc(100%+6px)] z-2 w-max max-w-[200px] rounded-sm border border-border bg-surface p-2 text-left font-body text-[13px] leading-[1.35] text-text transition-[opacity,transform] duration-200 ease-fluid ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-1.5 scale-[0.94] opacity-0'
        }`}
      >
        <span className="mb-0.5 block font-mono text-[10px] tracking-[0.08em] text-dim uppercase">
          dreaming of
        </span>
        {DREAMS[Math.max(dream, 0)]}
      </span>
    </button>
  );
}
