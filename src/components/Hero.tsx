import { useEffect, useState } from 'react';
import { profile } from '../content/profile';

const HOST = 'neautrino@localhost';

export function Hero() {
  const [clock, setClock] = useState('');
  const [typed, setTyped] = useState('');

  // Live ticking clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for name
  useEffect(() => {
    const full = profile.name;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative dot-grid px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-225">
        {/* Eyebrow above terminal, flush left with what the card prints */}
        <p className="mb-4.5 pl-4.75 sm:pl-6.75 text-left font-mono text-xs tracking-[0.14em] text-accent">
          Hi, my name is
        </p>
        <div className="overflow-hidden rounded-sm border border-border-strong bg-surface text-left">
          {/* Titlebar */}
          <div className="flex items-center gap-3.5 border-b border-border-strong bg-surface-2 px-4 py-2.5">
            {/* Registration marks (printer crosshairs) */}
            <div className="flex items-center gap-3.5" aria-hidden="true">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full border border-accent">
                <span className="absolute h-px w-3.5 bg-accent/70" />
                <span className="absolute h-3.5 w-px bg-accent/70" />
              </span>
              <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full border border-border-strong">
                <span className="absolute h-px w-3.5 bg-border-strong/70" />
                <span className="absolute h-3.5 w-px bg-border-strong/70" />
              </span>
              <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full border border-border-strong">
                <span className="absolute h-px w-3.5 bg-border-strong/70" />
                <span className="absolute h-3.5 w-px bg-border-strong/70" />
              </span>
            </div>

            {/* Title */}
            <span className="font-mono text-xs tracking-wider text-muted">
              {HOST}:~
            </span>

            {/* Live Clock & shell */}
            <span className="ml-auto font-mono text-xs tabular-nums tracking-wider text-muted">
              {clock ? `${clock} · zsh` : 'zsh'}
            </span>
          </div>

          {/* Terminal Body */}
          <div className="min-h-47.5 p-5 sm:min-h-55 sm:p-7">
            {/* Prompt line */}
            <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-xs tracking-wide">
              <span>
                <span className="text-accent">{HOST}</span>
                <span className="text-accent-2">:~/desk</span>
                <span className="text-dim">$</span>
              </span>
              <span className="text-text">whoami</span>
            </div>

            {/* Big typed display name with block cursor */}
            <h1
              className="relative my-3 font-display text-4xl sm:text-6xl font-normal tracking-tight text-text"
              aria-label={profile.name}
            >
              {/* Ghost text sizes the container so layout never shifts while typing */}
              <span className="invisible select-none" aria-hidden="true">
                {profile.name}
                <span className="inline-block w-[0.4em] h-[0.7em]" />
              </span>
              <span className="absolute left-0 top-0 flex items-baseline">
                {typed}
                <span
                  className="ml-1 inline-block h-[0.7em] w-[0.4em] bg-accent align-baseline animate-pulse"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Role & Location */}
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {profile.role} · {profile.location}
            </p>

            {/* Terminal Foot */}
            <div className="mt-5 border-t border-border pt-3 font-mono text-[11px] tracking-wider text-muted">
              <span className="text-accent-2">exit: 0</span> · 4 projects · 0 posts
            </div>
          </div>
        </div>
        {/* Editorial lede — the voice takes over the moment the card ends */}
        <p className="mx-auto mt-9 max-w-[60ch] text-center font-display text-[clamp(1.2rem,2.4vw,1.45rem)] font-normal leading-[1.56] text-muted text-pretty">
          {profile.heroLede}
        </p>

        {/* CTA Buttons */}
        <div className="mt-7.5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="inline-block rounded-sm border border-accent bg-accent px-5 py-3.25 font-mono text-[11px] tracking-[0.08em] text-accent-contrast transition-colors hover:opacity-90"
          >
            cat ./work
          </a>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              className="inline-block rounded-sm border border-border-strong bg-transparent px-5 py-3.25 font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-accent-2 hover:text-text"
            >
              open résumé
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
