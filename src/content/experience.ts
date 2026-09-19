import type { ExperienceEntry } from './types';

export const experiences: ExperienceEntry[] = [
  {
    company: 'Quantumcona LLP',
    role: 'Software Engineer',
    period: 'Sep 2025 — Present',
    location: 'Hyderabad, India',
    engagement: 'Full-time',
    highlights: [
      'Sole backend engineer building and scaling the core <strong>real-money fintech payment platform</strong> on <strong>Django and Supabase</strong>.',
      'Re-architected a failure-prone codebase into an <strong>event-driven modular monolith</strong>, reducing system errors by <strong>~60%</strong>.',
      'Engineered the financial correctness layer with a <strong>double-entry debit/credit ledger</strong>, <strong>idempotent APIs</strong> (exactly-once), and automated <strong>daily settlement reconciliation</strong> across <strong>Razorpay & Apple IAP</strong>.',
      'Hardened reliability across <strong>20+ third-party integrations</strong> with a <strong>ports-and-adapters architecture</strong>, <strong>transactional outbox (DLQ)</strong>, and circuit-breaker kill switches.',
      'Offloaded async workloads to a <strong>Redis-backed Django-Q queue</strong> with distributed caching, significantly reducing API p99 latency.',
      'Modernized deployment and observability: migrated CI/CD to <strong>Docker + GitHub Actions</strong> with zero-downtime blue-green deploys, instrumenting tracing via <strong>OpenTelemetry, SigNoz, and Sentry</strong>.',
    ],
    stack: [
      'Django',
      'Python',
      'Supabase',
      'PostgreSQL',
      'Redis',
      'Docker',
      'OpenTelemetry',
      'SigNoz',
      'Nginx',
      'Razorpay',
    ],
  },
  {
    company: 'NexisLabs',
    role: 'Fullstack Developer Intern',
    period: 'Jun 2025 — Aug 2025',
    location: 'Remote',
    engagement: 'Internship',
    highlights: [
      'Owned product architecture for a <strong>multi-tenant local-business discovery and lead marketplace</strong> with <strong>Next.js, Node.js, and MongoDB</strong>.',
      'Designed a <strong>territory-based hierarchical access control</strong> model enforcing role-scoped permissions across <strong>5 distinct user tiers</strong>.',
      'Built a <strong>dynamic form schema engine</strong> supporting custom category attributes, client-side validation, and multipart media uploads.',
      'Designed production <strong>REST APIs</strong> powering web and Android client applications with strict schema contract guarantees.',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
  },
];
