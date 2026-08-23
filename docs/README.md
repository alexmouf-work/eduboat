# docs

All project documentation lives here. Five purposes, one directory each.

| Directory                        | Purpose                                                                                                                | Written for                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| [`agents/`](agents/)             | Context an agent needs to work on this project: briefs, orientation notes, hand-offs, findings                          | Agents, and whoever directs them                 |
| [`architecture/`](architecture/) | How the built system works, and the dependency register                                                                | Anyone joining the build                         |
| [`charter/`](charter/)           | The engineering charter every contributor works under, its exceptions, and the voice everything taught is written in    | Everyone who writes here, agent or human         |
| [`curriculum/`](curriculum/)     | The syllabus: what has to be taught, in what order, and to what standard                                               | The principal, and any agent writing a lesson    |
| [`planning/`](planning/)         | Plans written before the work they describe, plus the project's orientation, roadmap and ledger                        | The principal and the agents doing the work      |

**Start with [`planning/OVERVIEW.md`](planning/OVERVIEW.md)** — the consolidated orientation.
Alongside it, [`planning/ROADMAP.md`](planning/ROADMAP.md) is the sequenced work and
[`planning/plans.csv`](planning/plans.csv) is the ledger that tracks it. The subject itself is
[`curriculum/syllabus.md`](curriculum/syllabus.md).

Two documents sit in the repository root: [`AGENTS.md`](../AGENTS.md), the entry point for every
contributor, which carries the charter's Tier 0 core verbatim; and `CLAUDE.md`, which points at it and
holds no rules of its own.

**The taught material is not here.** It lives in `content/`, which does not exist yet. This
directory holds documentation about the project; the lessons are the project. That distinction is why
`curriculum/syllabus.md` is correctly a document while a lesson on laytime is correctly not.

## Conventions

- **Lowercase, hyphenated file names** — `teaching-copy-style.md`, not `TeachingCopyStyle.md`. The
  standing documents keep upper-case names (`OVERVIEW.md`, `ROADMAP.md`, `CHARTER.md`, `README.md`);
  nothing else needs one.
- **Every document opens with what it is, who it is for, and its status** — proposed, agreed, in
  force, implemented, or superseded. A reader must never have to guess which.
- **Say the date of a decision** and who made it.
- **Never quote time-to-build figures** — no durations, no effort estimates, no "quick" or "just".
  State sequence, dependencies and what a piece of work is gated on instead.
- **Documentation never claims a control the code does not implement.** Where something is designed
  but not built, the document says so in the same breath. Nothing here has been built yet, so this
  binds every document in the directory today.
- **Never use emojis.** Sentence case throughout.
- **Never commit secrets or credentials** — including in examples.
