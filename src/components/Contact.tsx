import { profile } from '../content/profile';
import { Section } from './Section';


function GitBranchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12.59 2.59a2 2 0 0 0-1.42-.59H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.41l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </svg>
  );
}

export function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <Section id="contact" num="04" title="Contact">
      <div className="flex w-full flex-col">
        {/* Closing Headline */}
        <h3 className="font-display text-4xl font-normal leading-[1.12] tracking-tight text-text sm:text-5xl">
          Have something amazing on mind!
        </h3>

        {/* Primary Actions: Let's Connect + Divider + Email */}
        <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
          <a
            href="https://cal.com/neautrino"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-5 py-2.5 font-mono text-xs tracking-wider text-accent-contrast no-underline transition-opacity hover:opacity-90"
          >
            <span>Let’s connect</span>
            <span aria-hidden="true">↗</span>
          </a>

          <span className="select-none font-mono text-lg text-border-strong" aria-hidden="true">
            |
          </span>

          <a
            href={`mailto:${profile.email}`}
            className="border-b border-border-strong font-display text-xl font-normal italic text-text no-underline transition-colors hover:border-accent hover:text-accent sm:text-2xl"
          >
            {profile.email}
          </a>
        </div>

        {/* Channels Row: GitHub, LinkedIn, Technical Blog */}
        <ul className="mt-8 flex flex-wrap items-center gap-6 list-none m-0 p-0 sm:gap-8">
          {profile.socials
            .filter((s) => s.label === 'GitHub' || s.label === 'LinkedIn')
            .map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted no-underline transition-colors hover:text-accent"
                >
                  {social.label === 'GitHub' ? <GitBranchIcon /> : <ExternalLinkIcon />}
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          <li>
            <a
              href="#blog"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted no-underline transition-colors hover:text-accent"
            >
              <TagIcon />
              <span>Technical Blog</span>
            </a>
          </li>
        </ul>

      </div>
    </Section>
  );
}
