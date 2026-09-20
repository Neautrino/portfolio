# Portfolio

Personal portfolio for Subhendu Singh — Vite + React + TypeScript + Tailwind CSS v4, deployed on Cloudflare Workers.

## Stack

- **Vite + React 19 + TypeScript** — static SPA, no SSR
- **Tailwind CSS v4** — theme tokens in `src/index.css` (`@theme`)
- **react-router-dom** — client-side routing (`/`, `/projects`, `/projects/:slug`, `/blog`)
- **Markdown-driven projects** — `src/content/projects/*.md`, parsed at build time via a custom Vite plugin (`vite-plugins/markdown-content.ts`) into typed `Project` objects; no markdown parser ships to the browser
- **Cloudflare Workers** — static assets (`dist/`) plus one small Worker route (`src/worker.ts`) backing a real, KV-based unique-visitor counter at `/api/visitors`

## Development

```bash
bun install
bun run dev       # Vite dev server
bun run build     # typecheck + production build to dist/
bun run lint      # eslint
```

To test the `/api/visitors` Worker route locally (needs a real KV namespace bound in `wrangler.toml`):

```bash
npx wrangler dev --remote --port 8787
```

`--remote` runs against your real Cloudflare KV namespace instead of a local simulation — use `--local` instead if you want to test the increment/dedup logic without touching real data.

## Adding a project

Drop a new markdown file in `src/content/projects/`, e.g. `my-project.md`:

```markdown
---
title: "My Project"
tagline: "One line describing what it does."
date: "Jan 2026"
status: shipped        # shipped | building | archived
highlights:
  - "A notable technical detail"
stack: [TypeScript, Postgres]
liveUrl: "https://example.com"    # optional
repoUrl: "https://github.com/..." # optional
image: "/projects/my-project.png" # optional, put the file in public/projects/
imageAlt: "..."                   # required if image is set
featured: true
order: 3
---

## The problem
...

## What I built
...
```

Frontmatter is validated at build time — a missing/malformed field fails the build with a clear error instead of shipping a broken card.

## Deployment

Deployed via Cloudflare Workers (Git integration — push to `main`, Cloudflare builds and deploys automatically). Config lives in `wrangler.toml`:

- `[assets]` serves `dist/` as static files, with `not_found_handling = "single-page-application"` so client-side routes work on direct load/refresh.
- `run_worker_first = ["/api/*"]` means only requests to `/api/*` invoke the Worker script; everything else is served directly from the edge with zero compute cost.
- `[[kv_namespaces]]` binds the `PORTFOLIO_VISITORS_KV` namespace for the visitor counter.
