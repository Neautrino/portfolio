import type { Profile } from './types';

export const profile: Profile = {
  name: 'Subhendu Singh',
  role: 'Software Engineer',
  location: 'India',
  email: 'hello@neautrino.dev',
  resumeUrl: 'https://drive.google.com/file/d/12KXbt6daNOQtzhTqZVzbTZTJW3mUc8ne/view?usp=sharing',
  availability: 'Open to interesting backend, systems, full-stack, web3, and AI conversations.',

  heroLede:
    'I enjoy exploring how technology works, building systems, and figuring out problems across different areas of engineering. I’m particularly interested in understanding things from the ground up and turning what I learn into something useful.',

  bio: [
    'I’m a software developer with a backend focus and a strong interest for problem-solving and fundamentals. I enjoy designing clean systems that are correct, understandable, and built to last.',
    'I prefer building from scratch and owning the full lifecycle of a project, not just writing features, but understanding the architecture, data flow, and decisions behind them. I care less about hype and more about doing things the right way.',
    'I especially love building fintech systems — where real money moves, and if something breaks, it directly hits a user’s balance. That kind of stake keeps me honest about correctness; it’s the environment I do my best work in.',
    'I’m constantly learning, questioning, and refining my approach, with one goal in mind: becoming a better engineer and building meaningful solutions that people enjoy using.',
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/neautrino' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/isubhendu/' },
    { label: 'X', href: 'https://x.com/Neautrino_08' },
    { label: 'Email', href: 'mailto:hello@neautrino.dev' },
  ],

  skills: [
    {
      category: 'Languages',
      items: [
        'Python',
        'TypeScript',
        'JavaScript',
        'SQL',
        'C++',
        'Go (familiar)',
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        'REST APIs',
        'gRPC',
        'Webhooks',
        'Authentication',
        'Session Management',
        'Event-Driven Architecture',
        'Transactional Outbox',
        'Async/Concurrency',
        'Task Queues',
        'System Architecture',
      ],
    },
    {
      category: 'Frameworks & Libraries',
      items: [
        'Django',
        'DRF',
        'FastAPI',
        'Node.js',
        'Bun',
        'Hono',
        'Express',
        'React',
        'Next.js',
      ],
    },
    {
      category: 'Data & Infrastructure',
      items: [
        'PostgreSQL',
        'Redis',
        'MongoDB',
        'Supabase',
        'Kafka',
        'Docker',
        'GitHub Actions',
        'Nginx',
        'Linux',
        'GCP',
        'Cloudflare',
        'Blue-Green Deployment',
      ],
    },
    {
      category: 'Payments & Fintech',
      items: [
        'Razorpay',
        'Plaid',
        'Payment Flows',
        'Ledgers (double-entry)',
        'Idempotency & Reconciliation',
        'KYC (DigiLocker)',
        'Fee & Tax Computation',
      ],
    },
    {
      category: 'AI & Agents',
      items: [
        'LangChain',
        'Vercel AI SDK',
        'LLM Evals',
        'Agent Orchestration',
        'Claude Code',
        'Codex',
        'omp',
        'OpenViking',
      ],
    },
    {
      category: 'Observability & Tools',
      items: [
        'OpenTelemetry',
        'SigNoz',
        'Sentry',
        'Git',
        'Clerk',
      ],
    },
  ],
};
