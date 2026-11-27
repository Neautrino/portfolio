export interface Social {
  label: string;
  href: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceProject {
  name: string;
  /** one-line description shown above the bullets, e.g. "Fintech payments platform" */
  summary: string;
  status: 'production' | 'development';
  stack: string[];
  highlights: string[];
}

interface ExperienceBase {
  company: string;
  role: string;
  period: string;
  location: string;
  engagement: string;
  stack: string[];
}

/** A job lists its bullets directly, or groups them per product (rendered as tabs). */
export type ExperienceEntry =
  | (ExperienceBase & { highlights: string[] })
  | (ExperienceBase & { projects: ExperienceProject[] });

export type ProjectStatus = 'shipped' | 'building' | 'archived';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  status: ProjectStatus;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** hero banner shown on the project detail page, e.g. "/projects/cerebro.png" */
  image?: string;
  /** required alongside `image`; describes the screenshot for assistive tech */
  imageAlt?: string;
  featured: boolean;
  order: number;
  /** markdown body, already rendered to HTML at build time */
  body: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  resumeUrl?: string;
  availability?: string;
  heroLede: string;
  bio: string[];
  socials: Social[];
  skills: SkillGroup[];
}
