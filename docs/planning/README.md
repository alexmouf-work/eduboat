# docs/planning

Plans, written before the work they describe, and the documents that track them.

## The standing documents

| Document                                                 | What it is                                                                                                                       |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`OVERVIEW.md`](OVERVIEW.md)                             | The consolidated orientation: what Eduboat is, the requirements, the promises, the defect classes, scale, and the open decisions. Read it first. |
| [`ROADMAP.md`](ROADMAP.md)                               | The work, sequenced into phases, with a tickable entry per item.                                                                  |
| [`plans.csv`](plans.csv)                                 | The ledger: one row per work item, carrying status, priority, dependencies and what it serves.                                    |
| [`repository-structure.md`](repository-structure.md)     | Where things live, and the rules the tree encodes.                                                                               |

### The ledger's shape

`id, title, phase, status, priority, depends_on, gated_on, serves, plan_doc, created, updated, notes`

- **`status`** — `OPEN` to `IN PROGRESS` to `DONE`, plus `BLOCKED` (started and cannot continue) and
  `SUPERSEDED` (dropped or replaced; the note says by what). A row is never deleted.
- **`depends_on`** — other item IDs, space separated. Work that must be right first.
- **`gated_on`** — an external input or a decision the item cannot start without. Not the same as a
  dependency: a gate is owed by the principal, not by the build.
- **`serves`** — traceability to [`OVERVIEW.md`](OVERVIEW.md): `R` a numbered requirement (§4), `PR` a
  promise (§5), `DC` a defect class not to reintroduce (§6).
- **`plan_doc`** — the plan for this item once one exists, empty until then.
- **`notes`** — one line, and no commas, because the file is parsed. Anything longer belongs in the
  plan document or the roadmap entry.

**The roadmap and the ledger move together.** Starting or finishing an item updates its `plans.csv`
row and ticks or unticks its roadmap entry **in the same change** — never batched, never left stale.
Where the two disagree, `plans.csv` is right. Both are keyed by the same ID.

## Plan documents

One document per piece of work, named for the work: `content-format.md`, `progress-tracking.md`. A
plan sets out the problem, the approach and the reasoning behind it, what it depends on and what
depends on it, how it will be verified, and **what was deliberately rejected**. That last part is the
most valuable and the most often skipped: the next reader needs to know which alternatives were
already considered.

A plan is registered in `plans.csv` and named in its roadmap entry, so nothing is planned without
being tracked.

### "Full technical detail" — the standing definition

A plan in **full technical detail** can be followed **literally** by someone holding none of the
author's context, with no further judgement calls referred back:

- Every task names its **exact inputs** (file paths, sections, commands), its **procedure**, the
  **shape of its output**, and its **done-criteria**.
- Every term a task relies on is **defined in the plan itself**.
- Tasks state what runs **in parallel** and what must be **serial**.
- Judgement that cannot be eliminated is **named as a decision point with its options and its
  decider**, never left implicit for the executor to discover mid-task.

A plan that requires its author standing next to it is not in full technical detail.

## What does not belong here

- **Descriptions of what has been built** — once something exists, how it works is described in
  `docs/architecture/`. A plan is not updated to match the built system; it is marked implemented and
  left as the record of the intent.
- **What the site teaches** — that is `docs/curriculum/`, and its scope is the principal's.
- **Context and briefs for agents** — `docs/agents/`.

## The rules this directory is held to

1. **A plan carries its status at the top**: proposed, agreed, in progress, implemented, or
   superseded, and if superseded, by what. A stale plan read as a current one is worse than no plan.
2. **A plan is a strong recommendation to be tested, not a specification to be followed.** Plan on
   paper; verify by execution. The most expensive errors on the project these standards came from
   were all confidently reasoned, all wrong, and all caught only by building the thing and running it.
3. **Every plan states how it will be proved to work**, and what result would show it does not.
4. **No time-to-build figures, anywhere.** Sequence, dependencies and what an item is gated on are the
   useful facts.

## The order the work goes in

Foundations first: the standards, then the syllabus, then the stack and the scaffold that can carry
it. The material's rules came before the material, and the material before the machine, because the
site is a delivery mechanism for something that has to be right before anything renders it.
[`ROADMAP.md`](ROADMAP.md) carries the full sequence and the reasoning behind it.
