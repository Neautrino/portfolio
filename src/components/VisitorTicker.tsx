import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const DIGIT_COUNT = 5;

/**
 * Floating Frameless Split-Flap Ticker:
 * - Fetches the real, shared unique-visitor count from /api/visitors
 *   (same-origin Worker route backed by Cloudflare KV — no CORS issue,
 *   see src/worker.ts). The Worker dedupes via a 24h cookie, so this is
 *   a genuine cross-visitor count, not a per-browser local one.
 * - Rolls up smoothly from zeros on mount (900ms cubic-bezier)
 * - Padded to 5 digits: [ 0 ][ 0 ][ 1 ][ 0 ][ 7 ]
 * - Zero outer container box — sits directly on the background
 * - Respects prefers-reduced-motion (snaps immediately to real count)
 * - /api/visitors only exists once deployed as a Worker; in plain
 *   `vite dev` it 404s and the ticker just stays hidden (rendering
 *   nothing rather than a fake number).
 */
export function VisitorTicker() {
  const reduced = useReducedMotion();
  const [targetCount, setTargetCount] = useState<number | null>(null);
  const [displayDigits, setDisplayDigits] = useState<string[]>(() =>
    Array(DIGIT_COUNT).fill('0'),
  );

  useEffect(() => {
    let cancelled = false;

    fetch('/api/visitors')
      .then((res) => {
        if (!res.ok) throw new Error(`unexpected status ${res.status}`);
        return res.json() as Promise<{ count: number }>;
      })
      .then(({ count }) => {
        if (!cancelled && Number.isFinite(count)) {
          setTargetCount(count);
        }
      })
      .catch(() => {
        // /api/visitors unavailable (e.g. local `vite dev`, network
        // error) — stay hidden rather than show a fake number.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Animate roll-up to the real target count (skipped under reduced motion —
  // that case is derived directly at render time below instead)
  useEffect(() => {
    if (targetCount === null || reduced) return;

    const finalPadded = String(targetCount).padStart(DIGIT_COUNT, '0').slice(-DIGIT_COUNT);
    const startTime = performance.now();
    const duration = 900;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(targetCount * eased);
      const padded = String(currentVal).padStart(DIGIT_COUNT, '0').slice(-DIGIT_COUNT);
      setDisplayDigits(padded.split(''));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplayDigits(finalPadded.split(''));
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetCount, reduced]);

  if (targetCount === null) return null;

  const finalPadded = String(targetCount).padStart(DIGIT_COUNT, '0').slice(-DIGIT_COUNT).split('');
  const digits = reduced ? finalPadded : displayDigits;

  return (
    <div aria-label={`${targetCount} minds stopped by`} className="mt-8 inline-flex items-center gap-3 select-none">
      {/* 5 Frameless Split-Flap Tiles */}
      <div className="flex gap-1" aria-hidden="true">
        {digits.map((digit, i) => (
          <span
            key={i}
            className="relative flex h-7 w-5 items-center justify-center rounded-[2px] border border-border-strong bg-surface font-mono text-[13.5px] font-bold text-text shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            {digit}
            {/* Center horizontal split seam */}
            <span
              className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/55 shadow-[0_0.5px_0_rgba(255,255,255,0.06)]"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>

      {/* Simple Green Dot + Label */}
      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
        <span className="size-1.5 flex-none rounded-full bg-emerald-400" aria-hidden="true" />
        <span>
          <strong className="font-medium text-text">minds</strong> stopped by
        </span>
      </span>
    </div>
  );
}
