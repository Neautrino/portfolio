import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="flex min-h-[60vh] scroll-mt-24 flex-col items-start justify-center pt-[136px] pb-18">
      <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-text sm:text-5xl">
        Nothing here yet.
      </h1>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-dim uppercase transition-colors hover:text-accent"
      >
        ← Back home
      </Link>
    </section>
  );
}
