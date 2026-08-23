# docs/agents

Context for agents working on Eduboat — the material an agent should be able to read itself into
before touching anything, plus the record of what has been handed between them.

**Start outside this directory.** [`../../AGENTS.md`](../../AGENTS.md) is the entry point,
[`../planning/OVERVIEW.md`](../planning/OVERVIEW.md) is the orientation, and
[`../curriculum/syllabus.md`](../curriculum/syllabus.md) is the subject. This directory holds what
those three are deliberately too short to carry.

## What belongs here

- **Domain notes** — what an agent learned about the shipping market while writing a lesson, that the
  next agent would otherwise rediscover. Where a source turned out to disagree with another source,
  and how it was resolved.
- **Briefs and hand-offs** — a piece of work described well enough for another agent to pick up cold,
  and the record of what was concluded.
- **Findings** — anything discovered while working that the next agent would want to know, including
  things that turned out to be wrong.
- **Working conventions** that are too detailed for `AGENTS.md`.

## What does not

- **Plans for work not yet done** — `docs/planning/`.
- **What the site teaches** — `docs/curriculum/`.
- **Descriptions of how the system is built** — `docs/architecture/`.
- **A taught claim.** A definition an agent worked out belongs in the content tree with a source and a
  confidence mark, not in a note here where nothing checks it. A finding about where to look for a
  source belongs here; the source itself belongs in the material.

## Conventions

Name a document for its subject, not its author or its date: `laytime-source-notes.md`,
`worldscale-findings.md`. Where a document records a hand-off or a finding at a point in time, put the
date and the context inside it, at the top.
