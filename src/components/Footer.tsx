export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-bg px-6 pt-4 sm:px-12">
      {/* Top Metadata Row: Copyright, Visitor Badge, Back to Top */}
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted">
        <span>© {currentYear} neautrino. All rights reserved.</span>

        <img
          src="https://hits.sh/github.com/neautrino.svg?style=flat-square&label=visitors&color=6b7280&labelColor=44403c"
          alt="Unique visitors counter"
          width={68}
          height={20}
          className="opacity-80"
        />

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-muted transition-colors hover:text-accent"
        >
          Back to top ↑
        </a>
      </div>

      {/* Giant Ghost Outline Wordmark */}
      <div className="pointer-events-none -mb-[2.2vw] mt-2 flex select-none justify-center leading-[0.72]">
        <span className="font-body text-[clamp(5.5rem,18vw,22rem)] font-bold tracking-[-0.045em] text-transparent whitespace-nowrap [-webkit-text-stroke:1.5px_var(--color-border)]">
          neautrino
        </span>
      </div>
    </footer>
  );
}
