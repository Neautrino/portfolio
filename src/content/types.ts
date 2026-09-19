export interface Social {
  label: string;
  href: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
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
  experience?: ExperienceEntry[];
}
