import { profile } from '../content/profile';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

export function SideRails() {
  return (
    <>
      {/* Bottom-Left Rail: GitHub, LinkedIn, X, Mail + vertical line to bottom */}
      <aside
        aria-label="Social links"
        className="fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-[18px] xl:flex"
      >
        <ul className="m-0 flex list-none flex-col items-center gap-4 p-0">
          {profile.socials.map((social) => {
            const label = social.label.toLowerCase();
            return (
              <li key={social.href}>
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={social.label}
                  className="flex items-center justify-center text-muted no-underline transition-[transform,color] duration-200 ease-fluid hover:-translate-y-[3px] hover:text-accent [&_svg]:h-[18px] [&_svg]:w-[18px]"
                >
                  {label === 'github' && <GitHubIcon />}
                  {label === 'linkedin' && <LinkedInIcon />}
                  {label === 'x' && <XIcon />}
                  {label === 'email' && <MailIcon />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="h-40 w-px bg-border" />
      </aside>

      {/* Bottom-Right Rail: Rotated email text + vertical line to bottom */}
      <aside
        aria-label="Direct contact email"
        className="fixed bottom-0 right-8 z-40 hidden flex-col items-center gap-5 xl:flex"
      >
        <a
          href={`mailto:${profile.email}`}
          className="[writing-mode:vertical-rl] font-mono text-[15px] tracking-[0.14em] text-muted no-underline transition-[transform,color] duration-200 ease-fluid hover:-translate-y-[3px] hover:text-accent"
        >
          {profile.email}
        </a>
        <div className="h-40 w-px bg-border" />
      </aside>
    </>
  );
}
