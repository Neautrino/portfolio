import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../content/load';

export function Projects() {
  return (
    <section className="scroll-mt-24 pt-[136px] pb-18">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.14em] text-dim uppercase transition-colors hover:text-accent"
      >
        ← Home
      </Link>

      <div className="mb-12 flex items-baseline gap-4">
        <h1 className="font-display text-4xl font-normal tracking-tight text-text sm:text-5xl">
          All Projects
        </h1>
        <span className="font-mono text-xs tracking-[0.12em] text-dim uppercase">
          {projects.length} shipped, building, and archived
        </span>
      </div>

      <ul className="grid list-none grid-cols-1 gap-x-[22px] gap-y-[26px] sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}
