import { Link } from 'react-router-dom';
import type { Project, ProjectStatus } from '../content/types';

const STATUS_TONE: Record<ProjectStatus, string> = {
  shipped: 'text-accent',
  building: 'text-muted',
  archived: 'text-dim',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <li className="flex">
      <article className="group relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-tl-[10px] border-t-2 border-l-2 border-border bg-surface/72 px-5 pt-5 pb-[22px] shadow-[9px_9px_0_-2px_--alpha(var(--color-accent)/16%)] transition-[transform,border-color,box-shadow] duration-[260ms] ease-fluid hover:-translate-x-[3px] hover:-translate-y-[3px] hover:border-accent/70 hover:shadow-[13px_13px_0_-2px_--alpha(var(--color-accent)/34%)]">
        {project.image ? (
          // decorative here: the title link names the card, the detail page carries imageAlt
          <div className="-mx-5 -mt-5 mb-2 aspect-[16/9] overflow-hidden border-b border-border">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="block size-full object-cover object-top opacity-80 saturate-[0.85] transition-[opacity,transform,filter] duration-[400ms] ease-fluid group-hover:scale-[1.025] group-hover:opacity-100 group-hover:saturate-100"
            />
          </div>
        ) : null}

        <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className={`inline-flex items-center gap-1.5 ${STATUS_TONE[project.status]}`}>
            <span className="size-[5px] rounded-full bg-current" aria-hidden="true" />
            {project.status}
          </span>
          <span className="ml-auto tabular-nums">{project.date}</span>
        </div>

        <h3 className="font-display text-[1.22rem] leading-tight font-semibold tracking-[-0.02em] text-text">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
          >
            {project.title}
          </Link>
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
  );
}
