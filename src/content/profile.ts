import type { Profile } from './types';

export const profile: Profile = {
  name: 'Subhendu Singh',
  role: 'Software Engineer',
  location: 'Kolkata, India',
  email: 'ssubhendu988@gmail.com',
  resumeUrl: '/resume.pdf',
  availability: 'Open to interesting backend, systems, full-stack, web3, and AI conversations.',

  heroLede:
    'I build systems from zero — backend architecture, full-stack apps, and performance-critical infrastructure. I care about shipping reliable things people actually use.',

  bio: [
    'I’m a software developer with a backend focus and a strong interest for problem-solving and fundamentals. I enjoy designing clean systems that are correct, understandable, and built to last.',
    'I prefer building from scratch and owning the full lifecycle of a project, not just writing features, but understanding the architecture, data flow, and decisions behind them. I care less about hype and more about doing things the right way.',
    'I especially love building fintech systems — where real money moves, and if something breaks, it directly hits a user’s balance. That kind of stake keeps me honest about correctness; it’s the environment I do my best work in.',
    'I’m constantly learning, questioning, and refining my approach, with one goal in mind: becoming a better engineer and building meaningful solutions that people enjoy using.',
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/neautrino' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/subhendu-singh' },
    { label: 'Email', href: 'mailto:ssubhendu988@gmail.com' },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'Python', 'C++', 'Go (familiar)'],
    },
    {
      category: 'Backend',
      items: [
        'Node.js',
        'Bun.js',
        'Hono',
        'Express',
        'Django',
        'FastAPI',
        'Postgres',
        'Redis',
        'Prisma (ORM)',
        'REST API Design',
        'Async/Concurrency',
        'Task Queues',
        'Idempotency & Reconciliation',
        'System Architecture',
      ],
    },
    {
      category: 'Applied AI',
      items: [
        'LLM-as-Judge',
        'Golden Sets',
        'Agent Observability',
        'RAG on pgvector',
        'Vercel AI SDK',
        'Langfuse',
      ],
    },
    {
      category: 'Infrastructure',
      items: [
        'AWS (EC2, Lambda, S3, SQS, Auto Scaling Groups)',
        'GCP (Artifact Registry, Cloud Storage)',
        'CI/CD (GitHub Actions, Jenkins)',
        'Docker',
        'VPC',
        'Nginx',
      ],
    },
  ],
};
