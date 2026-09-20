import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

const DIGIT_COUNT = 5;

/** Full sweep of one leaf through its 180deg arc. */
const FLIP_DURATION_MS = 220;
/** Gap between consecutive flips on the same tile. */
const FLIP_STEP_MS = FLIP_DURATION_MS + 25;
/** Left-to-right cascade offset between tiles. */
const TILE_STAGGER_MS = 130;
const MIN_RANDOM_FLIPS = 4;
const MAX_RANDOM_FLIPS = 6;
/** Fraction of the ticker that must be on screen before a run is triggered. */
const VISIBLE_RATIO = 0.4;

/**
 * Placeholder count used only by `vite dev`, where /api/visitors does not
 * exist (it is a Worker route). Lets the cards and the flip animation be
 * developed without `wrangler dev`. Never reachable in a built Worker:
 * `import.meta.env.DEV` is statically false there, so this branch is
 * dropped entirely by the bundler and production can only ever render a
 * real KV-backed count.
 */
const DEV_PLACEHOLDER_COUNT = 108;

const TILE_HEIGHT = 'h-9';
const TILE_WIDTH = 'w-6';
/** Half of TILE_HEIGHT (36px), i.e. the seam offset. */
const HALF_PX = 18;
const HALF_CLASS = 'h-[18px]';

const HALF_BASE = `absolute inset-x-0 flex ${HALF_CLASS} justify-center overflow-hidden border border-border-strong font-mono text-[18px] leading-none font-bold text-text`;
const TOP_SKIN =
  'top-0 rounded-t-[3px] border-b-0 bg-linear-to-b from-surface-2 to-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]';
const BOTTOM_SKIN =
  'bottom-0 rounded-b-[3px] border-t-0 bg-linear-to-b from-[#171622] to-[#111018] shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]';

/** Top half of a glyph: full-height line box, clipped by the half's overflow. */
function GlyphTop({ digit }: { digit: string }) {
  return <span className={`flex ${TILE_HEIGHT} items-center`}>{digit}</span>;
}

/** Bottom half of the same glyph: pulled up by exactly one half-height. */
function GlyphBottom({ digit }: { digit: string }) {
  return (
    <span
      className={`flex ${TILE_HEIGHT} items-center`}
      style={{ marginTop: `-${HALF_PX}px` }}
    >
      {digit}
    </span>
  );
}

/** Hairline at the seam plus the two side axle lugs the leaf pivots on. */
function Hinge() {
  return (
    <>
      <span
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-black/45 shadow-[0_1px_0_rgba(255,255,255,0.05)]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-1/2 -left-px z-20 h-[6px] w-[2.5px] -translate-y-1/2 rounded-l-[1px] bg-[#504e66]"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-1/2 -right-px z-20 h-[6px] w-[2.5px] -translate-y-1/2 rounded-r-[1px] bg-[#504e66]"
        aria-hidden="true"
      />
    </>
  );
}

type FlipState = {
  /** Digit shown on the static top half and the leaf's back face. */
  incoming: string;
  /** Digit shown on the static bottom half and the leaf's front face. */
  outgoing: string;
  /** Remount key; bumping it restarts the leaf animation. */
  key: string;
};

/**
 * One split-flap digit tile.
 *
 * Mechanically this is a static top half, a static bottom half, and a
 * single hinged leaf between them. The leaf carries the outgoing digit's
 * top half on its front and the incoming digit's bottom half on its back,
 * and sweeps one continuous 0deg -> -180deg arc about the seam — the same
 * model a physical Solari board uses.
 *
 * While the leaf is mid-arc the static top half already shows the incoming
 * digit (revealed as the leaf falls away) and the static bottom half still
 * shows the outgoing one (covered until the leaf lands).
 *
 * Re-animates whenever `runId` changes — the parent bumps it each time the
 * ticker re-enters the viewport — resuming from whatever digit is currently
 * showing rather than snapping back to zero first.
 *
 * Under prefers-reduced-motion the final digit renders directly, with no
 * timers and no leaf at all.
 */
function FlipTile({
  finalDigit,
  startDelay,
  runId,
  reduced,
}: {
  finalDigit: string;
  startDelay: number;
  /** Bumped by the parent to (re)start this tile's flip sequence; 0 = idle. */
  runId: number;
  reduced: boolean;
}) {
  const [settled, setSettled] = useState('0');
  const [flip, setFlip] = useState<FlipState | null>(null);
  /** Digit physically on the tile right now, readable without re-running the effect. */
  const settledRef = useRef('0');

  useEffect(() => {
    if (reduced || runId === 0) return;

    const randomCount =
      MIN_RANDOM_FLIPS + Math.floor(Math.random() * (MAX_RANDOM_FLIPS - MIN_RANDOM_FLIPS + 1));
    const sequence = Array.from({ length: randomCount }, () =>
      String(Math.floor(Math.random() * 10)),
    );
    sequence.push(finalDigit);

    const timers: number[] = [];
    let current = settledRef.current;

    sequence.forEach((next, index) => {
      const outgoing = current;
      current = next;

      timers.push(
        window.setTimeout(
          () => {
            setFlip({ incoming: next, outgoing, key: `${runId}:${index}` });
            // The leaf hides the bottom half for the whole arc; swap the
            // static bottom underneath only once it has landed.
            timers.push(
              window.setTimeout(() => {
                settledRef.current = next;
                setSettled(next);
                setFlip(null);
              }, FLIP_DURATION_MS),
            );
          },
          startDelay + index * FLIP_STEP_MS,
        ),
      );
    });

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [runId, finalDigit, startDelay, reduced]);

  if (reduced) {
    return (
      <span className={`relative ${TILE_HEIGHT} ${TILE_WIDTH}`} aria-hidden="true">
        <span className={`${HALF_BASE} ${TOP_SKIN}`}>
          <GlyphTop digit={finalDigit} />
        </span>
        <span className={`${HALF_BASE} ${BOTTOM_SKIN}`}>
          <GlyphBottom digit={finalDigit} />
        </span>
        <Hinge />
      </span>
    );
  }

  const topDigit = flip ? flip.incoming : settled;
  const bottomDigit = flip ? flip.outgoing : settled;

  return (
    <span
      className={`relative ${TILE_HEIGHT} ${TILE_WIDTH} rounded-[3px] shadow-[0_4px_10px_rgba(0,0,0,0.55)] [perspective:220px]`}
      aria-hidden="true"
    >
      <span className={`${HALF_BASE} ${TOP_SKIN}`}>
        <GlyphTop digit={topDigit} />
      </span>
      <span className={`${HALF_BASE} ${BOTTOM_SKIN}`}>
        <GlyphBottom digit={bottomDigit} />
      </span>

      {flip && (
        <span
          key={flip.key}
          className={`sf-leaf absolute inset-x-0 top-0 z-[5] ${HALF_CLASS}`}
          style={{ '--sf-dur': `${FLIP_DURATION_MS}ms` } as React.CSSProperties}
        >
          <span className={`sf-face sf-face-front ${HALF_BASE} ${TOP_SKIN}`}>
            <GlyphTop digit={flip.outgoing} />
          </span>
          <span className={`sf-face sf-face-back ${HALF_BASE} ${BOTTOM_SKIN}`}>
            <GlyphBottom digit={flip.incoming} />
          </span>
        </span>
      )}

      <Hinge />
    </span>
  );
}

/**
 * Split-flap unique-visitor ticker.
 *
 * Reads the shared count from /api/visitors — a same-origin Worker route
 * backed by Cloudflare KV (see src/worker.ts), deduped by a 24h cookie, so
 * this is a genuine cross-visitor number rather than a per-browser one.
 *
 * That route only exists under `wrangler dev` or in production. In plain
 * `vite dev` the fetch fails and a dev-only placeholder is substituted so
 * the cards and animation stay workable; in a production build the
 * placeholder is compiled out and an unreachable API renders nothing at
 * all rather than a fabricated number.
 */
export function VisitorTicker() {
  const reduced = useReducedMotion();
  const [targetCount, setTargetCount] = useState<number | null>(null);
  const [runId, setRunId] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/visitors')
      .then((res) => {
        if (!res.ok) throw new Error(`unexpected status ${res.status}`);
        return res.json() as Promise<{ count: number }>;
      })
      .then(({ count }) => {
        if (!cancelled && Number.isFinite(count)) setTargetCount(count);
      })
      .catch(() => {
        if (!cancelled && import.meta.env.DEV) setTargetCount(DEV_PLACEHOLDER_COUNT);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Re-arming observer: the ticker replays every time it scrolls back into
  // view, not just on first load. Two thresholds give it hysteresis — the
  // run is triggered at 40% visible and only re-armed once the element has
  // fully left the viewport, so drifting around the boundary cannot
  // retrigger it repeatedly mid-sequence.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || targetCount === null) return;

    let armed = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;

        if (armed && entry.isIntersecting && entry.intersectionRatio >= VISIBLE_RATIO) {
          armed = false;
          setRunId((n) => n + 1);
        } else if (!entry.isIntersecting) {
          armed = true;
        }
      },
      { threshold: [0, VISIBLE_RATIO] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [targetCount]);

  if (targetCount === null) return null;

  const digits = String(targetCount).padStart(DIGIT_COUNT, '0').slice(-DIGIT_COUNT).split('');

  return (
    <div
      ref={rootRef}
      aria-label={`${targetCount} minds stopped by`}
      className="mt-8 inline-flex items-center gap-3 select-none"
    >
      <div className="flex gap-1">
        {digits.map((digit, i) => (
          <FlipTile
            key={i}
            finalDigit={digit}
            startDelay={i * TILE_STAGGER_MS}
            runId={runId}
            reduced={reduced}
          />
        ))}
      </div>

      <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-dim uppercase">
        <span className="size-1.5 flex-none rounded-full bg-emerald-400" aria-hidden="true" />
        <span>
          <strong className="font-medium text-text">minds</strong> stopped by
        </span>
      </span>
    </div>
  );
}
