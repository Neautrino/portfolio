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
    </Section>
  );
}
