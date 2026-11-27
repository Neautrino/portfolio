import type { ExperienceEntry } from './types';

export const experiences: ExperienceEntry[] = [
  {
    company: 'Quantumcona LLP',
    role: 'Software Development Engineer I',
    period: 'Sep 2025 — Present',
    location: 'Hyderabad, India',
    engagement: 'Full-time',
    projects: [
      {
        name: 'Paymorz',
        summary: 'Fintech payments platform',
        status: 'production',
        stack: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Razorpay'],
        highlights: [
          '<strong>Sole backend engineer</strong>; author and owner of the backend, product, deployment and operations.',
          'Re-architected a failure-prone codebase into an <strong>event-driven modular monolith</strong>, reducing system errors by <strong>~60%</strong>, with a <strong>transactional outbox</strong> and DLQ, a Redis-shared <strong>circuit breaker</strong>, feature-flag kill switches and DB-configurable <strong>rate limits</strong>.',
          'Payment flows on <strong>Razorpay Route</strong> and RazorpayX; capture runs as one <strong>atomic transaction</strong> (row-locked invoice, ledger write, outbox event, post-commit receipts) with HMAC-verified, deduplicated <strong>webhooks</strong> and <strong>Apple IAP</strong> receipt verification.',
          'Financial correctness: <strong>idempotent payment APIs</strong>, an atomic <strong>debit/credit ledger</strong>, and automated <strong>daily settlement reconciliation</strong> across Razorpay and Apple IAP.',
          '<strong>Slab-based fee engine</strong> with sender-/receiver-pays gross-up and CGST/SGST rounding matched to Razorpay billing; golden-master tested, fee queries cut from <strong>4–12 to 2–6</strong>.',
          '<strong>16+ third-party integrations</strong> behind a provider-adapter registry with per-environment sandbox/live switching; provider-agnostic <strong>KYC</strong> with a <strong>DigiLocker</strong> state machine, Aadhaar migrated within a week of the UIDAI OKYC shutdown.',
          'Root-caused production queue failures (Redis key eviction, OOM-killed workers); fixed with result TTLs, worker recycling and a dedicated KYC cluster.',
          'Replaced Jenkins with <strong>zero-downtime blue-green deploys</strong> on GitHub Actions across four environments behind <strong>Nginx</strong>, monitored with <strong>OpenTelemetry</strong>, SigNoz and Sentry.',
        ],
      },
      {
        name: 'Propwave',
        summary: 'Trading simulation platform',
        status: 'development',
        stack: ['Go', 'TypeScript', 'PostgreSQL', 'Kafka', 'gRPC'],
        highlights: [
          '<strong>Go simulation engine</strong> separate from the backend API, connected over <strong>gRPC</strong> and <strong>Kafka</strong> (Redpanda), with a <strong>hash-chained, append-only event log</strong> so any account can be replayed and audited.',
          '<strong>Exactly-once order handling</strong> (Redis fast path, dedupe on account + client order ID, DB unique constraint) and per-account ordering via a <strong>Postgres outbox</strong> and Go relay.',
          'Market orders and fills, portfolios, an India cost model, virtual ledger and margin; limit orders, order books and F&amp;O in design.',
        ],
      },
    ],
    stack: [
      'Python',
      'Django',
      'DRF',
      'PostgreSQL',
      'Redis',
      'Razorpay',
      'Go',
      'Kafka',
      'gRPC',
      'Docker',
      'GitHub Actions',
      'Nginx',
      'OpenTelemetry',
    ],
  },
  {
    company: 'NexisLabs',
    role: 'Fullstack Developer Intern',
    period: 'Jun 2025 — Aug 2025',
    location: 'Remote',
    engagement: 'Internship',
    highlights: [
      'Built most of the core of a <strong>multi-tenant local-business marketplace</strong>, now live in the UAE, on <strong>Next.js, Node.js and MongoDB</strong>, with <strong>geo-search</strong> on a 2dsphere index.',
      '<strong>Hierarchical access model</strong> (regions, managers, state/city supervisors) scoping data by role and territory across five roles; <strong>dynamic schema system</strong> for listing forms, reviews and ratings.',
      '<strong>REST APIs</strong> shared by the web and Android clients, contracts kept consistent across sprints.',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs', 'Cloudinary'],
  },
];
