---
title: "Code Craft"
tagline: "A browser code editor that runs ten languages and lets you share the result."
date: "Jan 2025"
status: shipped
highlights:
  - "10 languages on pinned Piston runtimes"
  - "Shareable snippets with comments and stars"
  - "Svix-verified webhooks gate pro entitlement"
stack: [Next.js, TypeScript, Convex, Monaco, Zustand, LemonSqueezy]
liveUrl: "https://code-craft-kohl.vercel.app"
repoUrl: "https://github.com/Neautrino/Code-Craft"
featured: true
order: 2
---

## The problem

Trying a language usually means installing it first. Most browser playgrounds solve that for one language, then stop — and what you write there disappears when the tab closes.

## What I built

An editor that runs ten languages and keeps what you write.

Monaco handles editing, with per-language defaults and five themes. Execution goes to the Piston API against **pinned runtime versions**, so a snippet that ran last month still runs the same way.

JavaScript, TypeScript, Python, Java, Go, Rust, C++, C#, Ruby and Swift.

Runs persist as `codeExecutions`, and anything worth keeping becomes a `snippet` — which is where it stops being a scratchpad. Snippets are shareable, and carry comments and stars, so the editor doubles as a small public library rather than a private buffer.

The pro tier runs on LemonSqueezy. Webhooks are verified with Svix before they touch the user record, so entitlement only ever changes on a signature that checks out.

## What I would change

Execution trusts Piston entirely — there is no queue, no timeout budget of my own, and no backpressure if the upstream slows down. It holds at this scale and would not at a larger one.
