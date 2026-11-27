---
title: "Fluide"
tagline: "A self-hosted, read-only finance app: your bank accounts in one ledger, on your machine."
date: "Oct 2026"
status: shipped
highlights:
  - "Plaid sync into a double-entry Postgres ledger"
  - "Rules, then LLM, then a confidence gate, with a review queue"
  - "Chat agent that queries the ledger, never computes the numbers"
stack: [Bun, Hono, React, PostgreSQL, Plaid, Docker]
liveUrl: "https://fluide.neautrino.dev"
repoUrl: "https://github.com/Neautrino/fluide"
featured: true
image: "/projects/fluide.png"
imageAlt: "Fluide's landing page: 'Your bank accounts in one ledger, on your machine' surrounded by spending, transaction and net-worth cards"
order: 2
---

## The problem

Hosted finance apps keep your whole transaction history on their servers. I wanted my accounts in one ledger that I own, linked with access that cannot move money.

## What I built

Fluide is read-only by design: the only Plaid product it requests is Transactions. It imports accounts, balances, 730 days of history and pending/posted status into a double-entry Postgres ledger.

Sync has to be correct, not just fast. It is cursor-based and incremental, retries when Plaid's data changes mid-pagination, and handles a pending transaction turning into a posted one with reversing entries that carry its category over. Checked against Plaid's sandbox: balances stay unchanged and replaying a sync changes nothing.

Categorization runs rules first, then an LLM, then a configurable confidence gate; anything below it lands in a human review queue. Learned rules stay proposed until you activate them, and a Postgres constraint trigger rejects any category change that has no audit row in the same transaction.

The chat assistant is a tool-calling agent over read-only ledger queries, so the model never does the arithmetic itself. It works with OpenAI, Claude, Gemini, OpenRouter or a local Ollama, keeps 30 days of encrypted history and stores provider keys in an AES-256-GCM vault.

Installing is one compose file from multi-arch GHCR releases. On first start it generates the database passwords and a 32-byte vault key into separate volumes, runs migrations before the app starts and connects as a non-superuser role. AGPL-3.0.
