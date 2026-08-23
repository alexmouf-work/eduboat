# AGENTS.md

**Read this before touching anything in this repository.** It is the entry point for every
contributor, agent or human. `CLAUDE.md` points here; it holds no rules of its own.

## What this project is

**Eduboat** — a private teaching website with exactly one learner: the principal. Its subject is
the shipping and shipbroking vocabulary needed for an internship at **Braemar**, a London
shipbroker. It teaches terminology, the mechanics behind each term, and the market context that
makes the terminology mean something.

One learner is a requirement, not a stage. There are no accounts, no sharing, no cohorts and no
analytics, and anything that assumes a second user is out of scope until the principal says
otherwise.

The syllabus — what has to be learned, in what order — is
[`docs/curriculum/syllabus.md`](docs/curriculum/syllabus.md). It is the specification the site is
built to deliver.

**Origin.** The charter, the writing standards and the repository structure here are generalised
from the `manifest` repository, where they were derived from named sources and hardened against
real incidents. Where a rule survives, its rationale survives with it; where a rule was dropped as
specific to that project, it is simply absent rather than reworded into something weaker.

---

## Tier 0 — the core, verbatim from the charter

Reproduced from [`docs/charter/CHARTER.md`](docs/charter/CHARTER.md) §2. If you have read
nothing else, follow these. Where this text and the charter differ, **the charter is right and
this copy is stale** — say so rather than following the stale copy.

**Priority order.** Truthfulness of the material, then correctness of the code and honesty about
it, then simplicity, then performance, then velocity. When two conflict, the earlier one wins.

**A human is answerable for every change.** Write so that a person who did not produce it can
explain it. State what you did in your own words.

**Never teach something you have not verified.** Every definition, figure, market convention and
worked example carries a source the learner can check. A term explained from memory and presented
as settled is the worst defect this project can produce, because the learner will repeat it to a
professional who knows better.

**Where the market disagrees with itself, say so.** Some terms differ by trade, by desk and by
charterparty form. Teach the disagreement as the fact it is; never flatten it into one confident
answer.

**Mark what is uncertain, in the material itself.** A definition the source does not settle says
so on the page, not in a comment. Confidence is content.

**Never read "everything" without proving you read all of it.** Any query, scan, import or
listing that a limit could truncate must detect truncation and fail loudly. A partial syllabus
rendered as complete teaches a gap the learner cannot see.

**"Loudly" means the operation fails**, the caller cannot proceed on partial data, and a person
sees it. Writing a log line and carrying on is not loud.

**Never fail silently.** No empty `catch`. No swallowed rejection. No default that hides a
missing value. Every error is handled, rethrown with context, or recorded.

**Some failures may never become a result.** Incompleteness, a failed integrity check and a
missing source may be caught only to log, clean up, or show a refusal. Catching one and returning
something a caller could mistake for success is prohibited, at every layer, including the last
one.

**Bind every limit before the expensive work, never after.** Check declared size, row count and
page count before allocating or parsing. A cap applied after the allocation is not a cap.

**Assert what you believe.** Assert arguments, returns, preconditions, postconditions and
invariants — including the negative space you expect never to occur. Assertions are side-effect
free. Split compound assertions into separate statements.

**Treat all external input as hostile**: content files, feeds, query parameters, file names.
Parse it at the ingest layer, bound it, and never run an unbounded regex over it.

**Never use a plain object as a lookup keyed by outside data.** Use `Map`. A term slug of
`constructor` is a crash, and a prototype key is a wrong answer that fails open.

**Own state singly.** Do not share mutable state across an `await`. Every invariant asserted
before a suspension point is re-asserted after it, because the world moved while you waited.

**Put a limit on everything**: loops, queues, batches, retries, concurrency, cache size, input
length. Where a loop must not terminate, assert that.

**Name the unit.** Money, tonnage, distance, time and counts carry their unit in the identifier
or the type. Index, count and size are different things. This binds twice here, because the
subject being taught is itself made of units.

**Say why, not what.** Comments explain rationale, invariants and units. If you cannot describe
an interface briefly, the design is wrong — fix the design, not the comment.

**No new dependency without approval.** Ask before adding one. Prefer the platform.

**Documentation never claims a control the code does not implement**, and the site never claims
coverage the syllabus does not have. If it is designed but not built, the sentence describing it
says so.

**Stay in scope.** One ledger item per change. If you find an unrelated defect, record it and
leave it. Do not refactor code you were not sent to change.

**Unpushed work does not exist.** This environment is remote and resets without warning, taking
everything local with it. Pull before you start, commit and push each finished increment as it
lands, and pull again often — `origin/main` is the only durable state.

**When you are unsure, stop and ask.** An unasked question costs a message; a guessed definition
costs the learner's trust in everything beside it.

---

## Where work happens

- **Build on `main`.** No permission needed for ordinary work.
- **Ask before branching off `main` at all.**
- **Do not open a pull request unless asked.**

## House style

- **Never use emojis** — not in UI, code, comments, commit messages, documents or replies. Icons
  are inline SVG.
- **Everything the learner reads follows the teaching copy style.** Lesson text, definitions,
  worked examples, navigation, error messages on the site — all of it is governed by
  [`docs/charter/teaching-copy-style.md`](docs/charter/teaching-copy-style.md). Read it before
  writing a word the learner will see.
- **Sentence case in prose.** Headings may be set in capitals by the stylesheet; the underlying
  text stays sentence case so it remains searchable and screen-readable.
- **Never quote time-to-build figures.** No durations, no effort estimates, no "quick", "just" or
  "should be straightforward". State sequence, dependencies and what work is gated on.
- **Writing back to the principal: the line is the whole item.** A bold lead and a clause. No
  second sentence under it, no supporting quotation, no connective prose between items. Cut items
  as well as words. Full rules, with examples, in [`docs/charter/CHARTER.md`](docs/charter/CHARTER.md) §6.5.
- **Never commit secrets.**
- Commit subjects: lowercase, imperative, area-scoped, under 60 characters —
  `syllabus: split laytime out of voyage terms`. The body says why.
- **Commits are authored by the principal, never by you.** Set `user.name` and `user.email` to the
  answerable human before your first commit. No agent name in the author line and no
  `Co-Authored-By` trailer naming a model. This takes nothing out of the record: the commit body
  still says what you did in your own words, and the ledger carries the rest. Charter §6.5.

## Before you submit

Work through the checklist in [`docs/charter/CHARTER.md`](docs/charter/CHARTER.md) §6.6. An
unticked box is a stop-and-ask, not a footnote.

## Stop and ask

The full list is charter §6.3. In short: a new dependency of any kind, a claim you cannot source,
a change to what the syllabus covers, a structural decision the charter is silent on, weakening or
skipping a test, two charter rules in conflict, or anything outward-facing.

## Where everything is

| What                                       | Where                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| The engineering charter                    | [`docs/charter/CHARTER.md`](docs/charter/CHARTER.md)                             |
| Exceptions to the charter                  | [`docs/charter/EXCEPTIONS.md`](docs/charter/EXCEPTIONS.md)                       |
| The voice everything taught is written in  | [`docs/charter/teaching-copy-style.md`](docs/charter/teaching-copy-style.md)     |
| What has to be learned, and in what order  | [`docs/curriculum/syllabus.md`](docs/curriculum/syllabus.md)                     |
| Project orientation — what this is and why | [`docs/planning/OVERVIEW.md`](docs/planning/OVERVIEW.md)                         |
| The work, sequenced and tickable           | [`docs/planning/ROADMAP.md`](docs/planning/ROADMAP.md)                           |
| The ledger — one row per work item         | [`docs/planning/plans.csv`](docs/planning/plans.csv)                             |
| Repository structure and its rules         | [`docs/planning/repository-structure.md`](docs/planning/repository-structure.md) |
| How the built system works                 | [`docs/architecture/`](docs/architecture/)                                       |
| Context, briefs and findings               | [`docs/agents/`](docs/agents/)                                                   |

## Build and run

**No application code exists yet, and no stack has been chosen.** The syllabus and the standards
came first deliberately: the site is a delivery mechanism for material that has to be right before
anything renders it. The stack decision and the scaffold are ledger items E004 and E005.
