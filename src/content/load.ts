import type { Project } from './types';

const modules = import.meta.glob<{ default: Project }>('./projects/*.md', { eager: true });

export const projects: Project[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);
