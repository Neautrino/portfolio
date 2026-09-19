---
title: "Ledger Lite"
tagline: "A double-entry ledger you can actually reason about."
date: "Aug 2025"
status: building
highlights:
  - "Append-only journal, balances derived not stored"
  - "Every posting balances or the transaction rejects"
stack: [Go, Postgres, gRPC]
repoUrl: "https://github.com/Neautrino"
featured: true
order: 3
---

## The problem

DUMMY CONTENT — placeholder for layout testing.

Most hobby ledgers store a balance column and update it in place. The moment two writes race, the number is wrong and there is no way to find out when it went wrong, because the history that would tell you was overwritten.

## What I built

DUMMY CONTENT — placeholder for layout testing.

An append-only journal where a balance is a fold over postings rather than a column. Nothing mutates; a correction is a new entry that references the one it corrects. The invariant is checked at write time: the sum of every posting in a transaction must be zero, or the whole transaction is refused.

That makes the audit trail free. You do not reconstruct history because you never destroyed it.

## What it cost

DUMMY CONTENT — placeholder for layout testing.

Reads are more expensive than a stored column, so balances are snapshotted on a schedule and the fold only replays from the last snapshot. That reintroduces a cache, which reintroduces staleness, which is the tradeoff the whole design was trying to avoid. It is bounded, but it is not free.
