---
title: "Cerebro"
tagline: "An AI second brain with semantic search across everything you save."
date: "Feb 2025"
status: shipped
highlights:
  - "768-dim vector index across 4 content types"
  - "Tenant-scoped retrieval via per-index userId filter"
  - "Embedding provider swappable behind one function"
stack: [Next.js, TypeScript, Convex, Clerk, Gemini, Tailwind]
liveUrl: "https://cerebro-theta.vercel.app"
repoUrl: "https://github.com/Neautrino/Cerebro"
featured: true
order: 1
---

## The problem

Saved things scatter. A link goes to the browser, a thought goes to a notes app, a paper goes to downloads, and none of them know the others exist. Keyword search only finds what you can already name — it cannot answer "that thing about retry storms" when the note never used those words.

## What I built

One store for notes, documents, links, tweets and tasks, with retrieval that works on meaning rather than exact tokens.

Every item is embedded on write with Gemini `text-embedding-004` and indexed for vector search. Four tables carry their own 768-dimension index, each filtered by `userId`, so a query can never reach across accounts.

Search fans out across all four indexes and merges the results by score, so one query returns the relevant note, the saved link and the PDF together instead of making you pick a category first.

Convex handles realtime sync, so an item saved on one device appears on the others without a refresh. Clerk handles auth.

## What I would change

The embedding provider is swapped behind a single `embed()` function — the repo still carries the OpenAI implementation it started on, commented out. That boundary was worth keeping: moving to Gemini touched one function, not the schema.
