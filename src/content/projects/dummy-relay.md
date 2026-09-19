---
title: "Relay"
tagline: "Webhook delivery with retries that give up at the right time."
date: "May 2025"
status: shipped
highlights:
  - "Exponential backoff with jitter, capped at 24h"
  - "Dead-letter queue with one-click replay"
  - "Signature verification on every inbound hook"
stack: [TypeScript, Redis, BullMQ, Fastify]
liveUrl: "https://example.com"
repoUrl: "https://github.com/Neautrino"
featured: true
order: 4
---

## The problem

DUMMY CONTENT — placeholder for layout testing.

A webhook that fails once is normal. A webhook that retries forever is an outage you inflicted on someone else. Most naive implementations pick one of those two failure modes and commit to it.

## What I built

DUMMY CONTENT — placeholder for layout testing.

Delivery attempts back off exponentially with jitter so a downstream recovery does not get thundering-herded, and the schedule caps at twenty-four hours before the job moves to a dead-letter queue. Replay is explicit and manual, because automatic replay of a day-old event is usually worse than not delivering it.
