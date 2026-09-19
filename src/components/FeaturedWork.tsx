import { projects } from '../content/load';
import type { ProjectStatus } from '../content/types';
import { Section } from './Section';

const STATUS_TONE: Record<ProjectStatus, string> = {
  shipped: 'text-accent',
  building: 'text-muted',
  archived: 'text-dim',
};

export function FeaturedWork() {
  const shown = projects.filter((p) => p.featured);

  return (
    <Section id="work" num="01" title="Featured Work">
      <ul className="grid list-none grid-cols-1 gap-x-[22px] gap-y-[26px] sm:grid-cols-2">
        {shown.map((project, i) => (
          <li key={project.slug} className="flex">
            <article className="group relative flex h-full w-full flex-col gap-3 rounded-tl-[10px] border-t-2 border-l-2 border-border bg-surface/72 px-5 pt-5 pb-[22px] shadow-[9px_9px_0_-2px_--alpha(var(--color-accent)/16%)] transition-[transform,border-color,box-shadow] duration-[260ms] ease-fluid hover:-translate-x-[3px] hover:-translate-y-[3px] hover:border-accent/70 hover:shadow-[13px_13px_0_-2px_--alpha(var(--color-accent)/34%)]">
              <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className={`inline-flex items-center gap-1.5 ${STATUS_TONE[project.status]}`}>
                  <span className="size-[5px] rounded-full bg-current" aria-hidden="true" />
                  {project.status}
                </span>
                <span className="ml-auto tabular-nums">{project.date}</span>
              </div>

              <h3 className="font-display text-[1.22rem] leading-tight font-semibold tracking-[-0.02em] text-text">
                <a
                  href={`/projects/${project.slug}`}
                  className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
                >
                  {project.title}
                </a>
              </h3>

              <p className="text-[0.94rem] leading-relaxed text-muted">{project.tagline}</p>

              <p className="font-mono text-[10.5px] leading-relaxed tracking-[0.12em] text-accent-2 uppercase before:content-['→_']">
                {project.highlights[0]}
              </p>

              <ul className="mt-auto flex list-none flex-wrap gap-1.5 pt-1">
                {project.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border/65 bg-surface-2/55 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-muted"
                  >
                    {tool}
                  </li>
                ))}
              </ul>

              <div className="relative z-1 flex flex-wrap gap-3.5">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10.5px] tracking-[0.12em] text-dim transition-colors hover:text-accent"
                  >
                    live ↗
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10.5px] tracking-[0.12em] text-dim transition-colors hover:text-accent"
                  >
                    source ↗
                  </a>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
