import { experiences } from '../content/experience';
import { Section } from './Section';

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 text-accent-2 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 text-accent-2 shrink-0"
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function Experience() {
  return (
    <Section id="experience" num="02" title="Experience">
      <div className="flex flex-col">
        {experiences.map((job) => (
          <article
            key={`${job.company}-${job.period}`}
            className="grid grid-cols-1 gap-6 not-first:mt-11 not-first:border-t not-first:border-dashed not-first:border-border not-first:pt-11 md:grid-cols-[240px_1fr] md:gap-10"
          >
            {/* Left Column: Company & Metadata (Sticky) */}
            <div className="flex flex-col gap-2.5 md:sticky md:top-24 md:self-start">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim">
                {job.period}
              </span>

              <h4 className="font-display text-[1.45rem] font-normal leading-tight text-text">
                {job.company}
              </h4>

              <div className="mt-1 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 font-mono text-[11.5px] text-dim">
                  <PinIcon />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11.5px] text-dim">
                  <BriefcaseIcon />
                  <span>{job.engagement}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Role Title, Highlighted Bullets & Stack */}
            <div className="flex flex-col min-w-0">
              <h3 className="font-body text-[1.15rem] font-semibold tracking-[-0.01em] text-text leading-snug">
                {job.role}
              </h3>

              <ul className="mt-3.5 space-y-2.5 list-none p-0 m-0">
                {job.highlights.map((point, i) => (
                  <li
                    key={i}
                    className="relative pl-4 text-[13px] leading-[20px] text-muted before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-accent-2 [&_strong]:font-semibold [&_strong]:text-text"
                    dangerouslySetInnerHTML={{ __html: point }}
                  />
                ))}
              </ul>

              <ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
                {job.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-surface-2/65 px-2.5 py-0.5 font-mono text-[10.5px] text-accent-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
