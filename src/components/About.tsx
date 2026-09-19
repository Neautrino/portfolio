import { profile } from '../content/profile';
import { Section } from './Section';

export function About() {
  return (
    <Section id="about" num="03" title="About">
      <div className="flex w-full flex-col">
        {/* Editorial Bio — Clean full-width paragraphs without drop-cap */}
        <div className="space-y-5 font-body text-[15.5px] leading-[1.75] text-muted">
          {profile.bio.map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>

        {/* Technical Skills Grid — Spans full width */}
        <div className="mt-12 flex w-full flex-col gap-4.5 border-t border-dashed border-border pt-8">
          {profile.skills.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[168px_1fr] sm:gap-4"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent-2 pt-1">
                {group.category}
              </span>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-sm border border-border bg-surface-2/65 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
