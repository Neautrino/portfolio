declare module '*.md' {
  import type { Project } from './types';

  const project: Project;
  export default project;
}
