import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';

const SECTIONS = [
  { id: 'work', num: '01', label: 'Projects' },
  { id: 'experience', num: '02', label: 'Experience' },
  { id: 'about', num: '03', label: 'About' },
  { id: 'contact', num: '04', label: 'Contact' },
] as const;

const ROUTES = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
] as const;

const SWAP_PX = 50;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const path = useLocation().pathname;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SWAP_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // entries only report sections that crossed a threshold, so keep the last
    // ratio of each and recompute the winner across all of them
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) [best, bestRatio] = [id, ratio];
        }
        if (best) setActive(best);
      },
      { rootMargin: '-96px 0px -35% 0px', threshold: [0, 0.08, 0.2, 0.4, 0.6, 0.85] },
    );
    for (const { id } of SECTIONS) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    event.preventDefault();
    node.scrollIntoView({ behavior: 'auto', block: 'start' });
    setActive(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b py-[15px] transition-[background-color,border-color] duration-[260ms] ease-fluid ${
        solid ? 'border-border bg-bg' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-6 max-[639px]:flex max-[639px]:justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          className="col-start-1 flex items-center gap-[9px] justify-self-start text-text transition-colors hover:text-accent"
          aria-label={`${profile.name} — home`}
        >
          <span className="size-2.5 flex-none rounded-full border border-accent" aria-hidden="true" />
          <span className="font-mono text-base font-medium whitespace-nowrap">
            <span className="text-accent">~/</span>neautrino
          </span>
        </Link>

        <nav className="col-start-2 justify-self-center max-[639px]:hidden" aria-label="Sections">
          <ul className="flex items-center gap-4 min-[1200px]:gap-5">
            {SECTIONS.map(({ id, num, label }) => {
              const here = active === id;
              return (
                <li key={id}>
                  <a
                    href={path === '/' ? `#${id}` : `/#${id}`}
                    onClick={(e) => onNavClick(e, id)}
                    aria-current={here ? 'true' : undefined}
                    className={`flex items-baseline font-mono text-[11px] tracking-[0.06em] uppercase transition-colors hover:text-accent min-[1200px]:gap-[7px] min-[1200px]:text-[10.5px] min-[1200px]:tracking-[0.16em] ${
                      here ? 'text-accent' : 'text-text'
                    }`}
                  >
                    <span className="text-accent tabular-nums">{num}</span>
                    <span
                      className={`hidden min-[1200px]:inline ${here ? 'border-b border-accent pb-[3px]' : ''}`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-3.5 justify-self-end">
          <nav aria-label="Pages">
            <ul className="flex items-baseline gap-2.5 text-[13px]">
              {ROUTES.map(({ href, label }, i) => {
                const here = href === '/' ? path === '/' : path.startsWith(href);
                return (
                  <li
                    key={href}
                    className={i > 0 ? "before:mr-2.5 before:text-dim before:content-['·']" : ''}
                  >
                    <Link
                      to={href}
                      aria-current={here ? 'page' : undefined}
                      className={`border-b whitespace-nowrap text-text transition-colors hover:border-accent hover:text-accent ${
                        here ? 'border-border-strong' : 'border-transparent'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              className="hidden rounded-sm border border-border-strong px-3 py-[7px] font-mono text-[10.5px] tracking-[0.14em] whitespace-nowrap text-accent uppercase transition-colors hover:border-accent hover:bg-surface-2 min-[1200px]:inline-block"
            >
              résumé
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
