---
title: "punk0"
tagline: "Run coding agents side by side, each in its own git worktree, and review their work in one browser tab."
date: "Oct 2026"
status: shipped
highlights:
  - "Single 17 MB Go binary, ~30 MB RAM at idle"
  - "14 coding-agent CLIs in real PTY tabs beside the code"
  - "Terminals survive browser reloads"
stack: [Go, TypeScript, PTY/ConPTY, Git worktrees, LSP]
liveUrl: "https://punk0.neautrino.dev"
repoUrl: "https://github.com/Neautrino/punk0"
featured: true
image: "/projects/punk0.png"
imageAlt: "punk0's landing page: 'Every agent its own workspace. Review the work in one place.' above a workbench with projects, worktrees and a Claude Code tab"
order: 1
---

## The problem

Coding agents work best in parallel, each on its own branch. In practice that means a terminal per agent, a worktree per branch, an editor to read what changed and a browser tab to review the pull request: four tools that know nothing about each other.

## What I built

punk0 is a fork of [px0](https://github.com/px0-ai/px0), Arpit Bhayani's MIT-licensed code-review IDE. px0 already had a fast viewer, search, git and pull-request review. I added the part it leaves out: running the agents.

Projects hold workspaces, and a workspace is the main checkout, a git worktree on its own branch or a scratch folder. Each workspace gets terminal tabs: real PTYs (ConPTY on Windows) running your shell or one of 14 unmodified agent CLIs, including Claude Code, Codex, OpenCode and Gemini CLI.

Shells outlive the browser. The server emulates each screen, so reloading the page keeps every tab running and reconnecting redraws the screen and scrollback. Past chats are listed per workspace and resumed by ID through each agent's own flag, and each tab reports its agent's status and chat title through a hook endpoint, using a different mechanism per agent.

It is built to stay small: one 17 MB Go binary serving a browser UI instead of an Electron app, with the server idling at about 30 MB of RAM. Idle-stop shuts down unused agents and language servers, and a per-process memory panel shows where the rest goes.

A parent process owns all projects, workspaces and terminals, and each folder is served by an isolated child process behind a reverse proxy. Quick Edit writes are atomic and conflict-checked, requests are guarded against cross-origin and DNS-rebinding attacks, and terminal tabs are refused unless punk0 listens on loopback.
