import { Link, Navigate, useParams } from 'react-router-dom';
import type { ProjectStatus } from '../content/types';
import { projects } from '../content/load';

const STATUS_TONE: Record<ProjectStatus, string> = {
  shipped: 'text-accent',
  building: 'text-muted',
  archived: 'text-dim',
};

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <article className="scroll-mt-24 pt-[136px] pb-18">
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-dim uppercase transition-colors hover:text-accent"
      >
        ← All Projects
      </Link>

      <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-dim uppercase">
        <span className={`inline-flex items-center gap-1.5 ${STATUS_TONE[project.status]}`}>
          <span className="size-[5px] rounded-full bg-current" aria-hidden="true" />
          {project.status}
        </span>
        <span aria-hidden="true">·</span>
        <span className="tabular-nums">{project.date}</span>
      </div>

      <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-text sm:text-5xl">
        {project.title}
      </h1>

      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted">{project.tagline}</p>

      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          className="mt-8 w-full rounded-sm border border-border-strong"
          loading="lazy"
        />
      ) : null}

      <ul className="mt-6 flex list-none flex-wrap gap-1.5">
        {project.stack.map((tool) => (
          <li
            key={tool}
            className="rounded-full border border-border/65 bg-surface-2/55 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-muted"
          >
            {tool}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-accent bg-accent px-5 py-[13px] font-mono text-[11px] tracking-[0.08em] text-accent-contrast transition-colors hover:opacity-90"
          >
            live ↗
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-border-strong px-5 py-[13px] font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-accent-2 hover:text-text"
          >
            source ↗
          </a>
        ) : null}
      </div>

      <ul className="mt-10 list-none space-y-2 border-t border-border pt-6">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="font-mono text-[13px] leading-relaxed tracking-[0.02em] text-accent-2 before:content-['→_']"
          >
            {highlight}
          </li>
        ))}
      </ul>

      {/* body is rendered from trusted developer-authored markdown at build time, not user input */}
      <div className="project-prose mt-12" dangerouslySetInnerHTML={{ __html: project.body }} />
    </article>
  );
}
