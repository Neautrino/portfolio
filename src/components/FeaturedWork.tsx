import { Link } from 'react-router-dom';
import { projects } from '../content/load';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

export function FeaturedWork() {
  const shown = projects.filter((p) => p.featured);

  return (
    <Section id="work" num="01" title="Featured Work">
      <ul className="grid list-none grid-cols-1 gap-x-[22px] gap-y-[26px] sm:grid-cols-2">
        {shown.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Link
          to="/projects"
          className="rounded-sm border border-border-strong px-5 py-[13px] font-mono text-[11px] tracking-[0.08em] text-muted transition-colors hover:border-accent-2 hover:text-text"
        >
          View Projects
        </Link>
      </div>
    </Section>
  );
}
