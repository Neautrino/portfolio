import { useEffect, useState } from 'react';
import { profile } from '../content/profile';

const HOST = 'neautrino@localhost';
const TYPE_MS = 60;

const CLOCK = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function RegMark({ keyPlate = false }: { keyPlate?: boolean }) {
  const ink = keyPlate ? 'border-accent' : 'border-border-strong';
  const bar = keyPlate ? 'bg-accent/70' : 'bg-border-strong/70';
  return (
    <span className={`relative flex size-2.5 items-center justify-center rounded-full border ${ink}`}>
      <span className={`absolute h-px w-3.5 ${bar}`} />
      <span className={`absolute h-3.5 w-px ${bar}`} />
    </span>
  );
}

export function Hero() {
  const [clock, setClock] = useState(() => CLOCK.format(new Date()));
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setClock(CLOCK.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typed >= profile.name.length) return;
    const id = setTimeout(() => setTyped(typed + 1), TYPE_MS);
    return () => clearTimeout(id);
  }, [typed]);

  return (
    <section id="top" className="dot-grid scroll-mt-24 pt-[136px] pb-[76px]">
      <div className="relative z-1 mx-auto max-w-measure text-center">
        <p className="mb-[18px] pl-[19px] text-left font-mono text-xs tracking-[0.14em] text-accent sm:pl-[27px]">
          Hi, my name is
        </p>

        <div className="overflow-clip rounded-sm border border-border-strong bg-surface text-left">
          <div className="flex items-center gap-3.5 border-b border-border-strong bg-surface-2 px-4 py-2.5">
            <div className="flex flex-none items-center gap-3.5" aria-hidden="true">
              <RegMark keyPlate />
              <RegMark />
              <RegMark />
            </div>
            <span className="truncate font-mono text-[11px] tracking-[0.08em] text-muted">
              {HOST}:~
            </span>
            <span className="ml-auto font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-muted tabular-nums">
              {clock} · zsh
            </span>
          </div>

          <div className="min-h-48 p-5 sm:min-h-62 sm:px-[26px] sm:pt-[26px] sm:pb-[18px]">
            <p className="flex flex-wrap gap-x-2 font-mono text-xs tracking-[0.02em]">
              <span>
                <span className="text-accent">{HOST}</span>
                <span className="text-accent-2">:~/desk</span>
                <span className="text-dim">$</span>
              </span>
              <span className="text-text">whoami</span>
            </p>

            <h1
              className="relative my-[10px] mt-4 w-max max-w-full font-display text-[clamp(2.1rem,6vw,3.5rem)] leading-[1.06] font-normal tracking-[-0.028em]"
              aria-label={profile.name}
            >
              {/* sizes the box to the finished name so typing never shifts layout */}
              <span className="invisible block whitespace-pre" aria-hidden="true">
                {profile.name}
                <span className="inline-block h-[0.7em] w-[0.4em]" />
              </span>
              <span className="absolute top-0 left-0 whitespace-pre" aria-hidden="true">
                {profile.name.slice(0, typed)}
                <span className="inline-block h-[0.7em] w-[0.4em] animate-pulse bg-accent" />
              </span>
            </h1>

            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              {profile.role} · {profile.location}
            </p>

            <p className="mt-5 border-t border-border pt-[13px] font-mono text-[10.5px] tracking-[0.1em] text-muted tabular-nums">
              <span className="text-accent-2">exit: 0</span> · 4 projects · 0 posts
            </p>
          </div>
        </div>

        <p className="mx-auto mt-9 max-w-[60ch] font-display text-[clamp(1.2rem,2.4vw,1.45rem)] leading-[1.56] font-normal text-pretty text-muted">
          {profile.heroLede}
        </p>

        <div className="mt-[30px] flex flex-wrap justify-center gap-3">
          <a
            href="#work"
            className="rounded-sm border border-accent bg-accent px-5 py-[13px] font-mono text-[11px] tracking-[0.08em] text-accent-contrast transition-colors hover:opacity-90"
          >
            cat ./work
          </a>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              className="rounded-sm border border-border-strong px-5 py-[13px] font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-accent-2 hover:text-text"
            >
              open résumé
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
