# Eduboat engineering charter

**Version 1.0.0** · 23 August 2026

**What this is.** The rules every contributor to this repository works under — agents and humans
alike. Every rule carries the reason it exists, because a rule whose rationale is unknown gets
misapplied at the edges.

**Where it comes from.** This charter is generalised from the `manifest` repository's charter,
version 1.9.0, which was derived from a named source harvest and a study of four production
codebases, and hardened by a red-team pass and by real incidents on that project. The rules kept
here are kept with their rationale. The rules dropped were dropped because they governed a
confidential multi-tenant insurance platform and have no counterpart in a single-learner teaching
site; none was reworded into a weaker version of itself.

**What is genuinely new here** is directive 1. Manifest's first directive is confidentiality,
because its central promise is that a server cannot read a broker's book. Eduboat has no such
promise and inventing one would be theatre. Its central promise is instead that **what it teaches
is true**, and the whole of §4.9 exists to serve it.

---

## 1. Prime directives

Five, in strict priority order. **When two conflict, the lower number wins.** This ordering is
the charter's only tie-breaker, and it is not advisory.

1. **Truthfulness of the material.** Everything the site teaches is verified against a source, and
   everything uncertain is marked uncertain on the page. A wrong definition delivered confidently
   is the failure this project exists to prevent, because the learner will repeat it to
   professionals who know better and will not know why they were wrong.
2. **Correctness of the code, and honesty about it.** Everything is complete or says so; nothing
   fails silently. A partial syllabus rendered as a whole one teaches a gap the learner cannot see.
3. **Simplicity.** The simplest design that satisfies 1 and 2. Complexity is the thing being
   managed, and it accumulates in increments nobody objects to individually.
4. **Performance.** Meet the stated targets; buy speed with design, not with assertions removed or
   checks skipped.
5. **Velocity.** Ship. Last, but present: a charter that makes nothing shippable has failed
   differently.

**Accountability is a precondition, not a directive.** A named human is answerable for every change
merged here, and must be able to explain it without the agent that wrote it. This is not in the
ordering because it never trades against anything — it is the condition under which the ordering
means anything at all.

### Worked example — a real conflict, resolved by the ordering

**The situation.** The learner asks for a lesson on demurrage. Directive 5 says ship it. The
supplied term list gives despatch as "conventionally half demurrage", and the drafting agent knows
this is the common convention but also knows some charterparties set it otherwise.

**The conflict.** Directive 1 requires the claim be verified and its variation stated. Directive 5
wants the lesson out. Writing "despatch is half demurrage" is faster, reads better, and is what the
learner asked for.

**The resolution.** Directive 1 outranks directive 5, so **the lesson states the convention as a
convention and names what overrides it** — the charterparty. The learner learns the default and
learns that it is a default, which is what a broker actually needs, because the one fixture where
it is not half is the one where being wrong costs money.

**What the ordering forbids.** Shipping the flat claim now and adding the qualification later. A
learner does not re-read a lesson they believe they have finished.

**What it does not mean.** It does not mean every lesson must exhaust every variation. It means the
lesson may not present a default as a rule. Saying less is always available; saying it wrongly is
not.

---

## 2. Tier 0 core

The invariants that must fit in every context window. Self-contained. If you have read nothing
else, follow these.

> **Priority order.** Truthfulness of the material, then correctness of the code and honesty about
> it, then simplicity, then performance, then velocity. When two conflict, the earlier one wins.
>
> **A human is answerable for every change.** Write so that a person who did not produce it can
> explain it. State what you did in your own words.
>
> **Never teach something you have not verified.** Every definition, figure, market convention and
> worked example carries a source the learner can check. A term explained from memory and presented
> as settled is the worst defect this project can produce, because the learner will repeat it to a
> professional who knows better.
>
> **Where the market disagrees with itself, say so.** Some terms differ by trade, by desk and by
> charterparty form. Teach the disagreement as the fact it is; never flatten it into one confident
> answer.
>
> **Mark what is uncertain, in the material itself.** A definition the source does not settle says
> so on the page, not in a comment. Confidence is content.
>
> **Never read "everything" without proving you read all of it.** Any query, scan, import or
> listing that a limit could truncate must detect truncation and fail loudly. A partial syllabus
> rendered as complete teaches a gap the learner cannot see.
>
> **"Loudly" means the operation fails**, the caller cannot proceed on partial data, and a person
> sees it. Writing a log line and carrying on is not loud.
>
> **Never fail silently.** No empty `catch`. No swallowed rejection. No default that hides a
> missing value. Every error is handled, rethrown with context, or recorded.
>
> **Some failures may never become a result.** Incompleteness, a failed integrity check and a
> missing source may be caught only to log, clean up, or show a refusal. Catching one and returning
> something a caller could mistake for success is prohibited, at every layer, including the last
> one.
>
> **Bind every limit before the expensive work, never after.** Check declared size, row count and
> page count before allocating or parsing. A cap applied after the allocation is not a cap.
>
> **Assert what you believe.** Assert arguments, returns, preconditions, postconditions and
> invariants — including the negative space you expect never to occur. Assertions are side-effect
> free. Split compound assertions into separate statements.
>
> **Treat all external input as hostile**: content files, feeds, query parameters, file names.
> Parse it at the ingest layer, bound it, and never run an unbounded regex over it.
>
> **Never use a plain object as a lookup keyed by outside data.** Use `Map`. A term slug of
> `constructor` is a crash, and a prototype key is a wrong answer that fails open.
>
> **Own state singly.** Do not share mutable state across an `await`. Every invariant asserted
> before a suspension point is re-asserted after it, because the world moved while you waited.
>
> **Put a limit on everything**: loops, queues, batches, retries, concurrency, cache size, input
> length. Where a loop must not terminate, assert that.
>
> **Name the unit.** Money, tonnage, distance, time and counts carry their unit in the identifier
> or the type. Index, count and size are different things. This binds twice here, because the
> subject being taught is itself made of units.
>
> **Say why, not what.** Comments explain rationale, invariants and units. If you cannot describe
> an interface briefly, the design is wrong — fix the design, not the comment.
>
> **No new dependency without approval.** Ask before adding one. Prefer the platform.
>
> **Documentation never claims a control the code does not implement**, and the site never claims
> coverage the syllabus does not have. If it is designed but not built, the sentence describing it
> says so.
>
> **Stay in scope.** One ledger item per change. If you find an unrelated defect, record it and
> leave it. Do not refactor code you were not sent to change.
>
> **Unpushed work does not exist.** This environment is remote and resets without warning, taking
> everything local with it. Pull before you start, commit and push each finished increment as it
> lands, and pull again often — `origin/main` is the only durable state.
>
> **When you are unsure, stop and ask.** An unasked question costs a message; a guessed definition
> costs the learner's trust in everything beside it.

---

## 3. Mechanical rules

**The configuration is the authority. This section is a summary and may not be read as permission
for anything the configs refuse.**

**Nothing in this table is enforced yet, and the table says so rather than implying otherwise.**
No stack has been chosen (E004) and no scaffold exists (E005), so there is no config to be the
authority. The rows below are the obligations E005 must create, listed here so that the scaffold is
built against a stated target rather than assembled by taste. A row moves out of "not yet enforced"
only when the check has been pointed at a deliberate violation and observed to fail.

| Concern                 | Intended authority           | Must fail the build on                                                                        | Status         |
| ----------------------- | ---------------------------- | --------------------------------------------------------------------------------------------- | -------------- |
| Formatting              | formatter config             | any file not formatted                                                                        | not yet enforced |
| Lint, type-aware        | lint config                  | any rule; warnings are errors                                                                 | not yet enforced |
| Types                   | type-checker config          | strictest available setting; no `any`, no non-null assertion, no unchecked cast                | not yet enforced |
| Layering                | lint import rules            | any import that crosses a layer boundary the wrong way                                        | not yet enforced |
| Outside-data lookups    | lint                         | a string-keyed record type in application source — the shape a prototype key walks into        | not yet enforced |
| Dependencies            | manifest, lockfile, audit    | an unapproved addition, an integrity mismatch, a known advisory                                | not yet enforced |
| Dependency register     | CI check                     | a dependency with no row in `docs/architecture/dependencies.md`, or a row with no dependency (DP2) | not yet enforced |
| Secrets                 | CI check                     | a key block, cloud key, token or password-bearing URL in the working tree. A floor, not a scanner | not yet enforced |
| Tests                   | test runner config           | any failure; any test skipped without an exception ID                                          | not yet enforced |
| Sourcing                | CI check                     | a taught claim in the content tree with no source field (§4.9)                                | not yet enforced |
| Interface comments      | CI check                     | an exported symbol in the platform or domain layer with no interface comment                   | not yet enforced |
| `TODO` markers          | CI check                     | a `TODO`, `FIXME`, `XXX` or `HACK` with no ledger id, or an id with no row in `plans.csv`      | not yet enforced |
| Exception expiry        | CI check                     | an entry in `EXCEPTIONS.md` past its expiry date                                              | not yet enforced |
| Commit authorship       | CI check                     | a configured `user.email` belonging to an agent rather than the answerable human (§6.5)        | not yet enforced |
| No emojis               | CI check                     | an emoji anywhere in the source, content or test trees                                        | not yet enforced |

Three lessons carried over with this section:

- **Formatting is never a review topic.** If a reviewer is discussing whitespace, a config is
  missing.
- **A rule stated here that has never been seen to fail is a rule nobody has tested.** On the source
  project, a layering rule was found to be silently matching nothing, months after it was written
  down as enforced. Every row above is written as an obligation precisely so that it cannot be
  quoted as a control that exists.
- **Every mechanical rule names the tool that enforces it and what that tool cannot see.** A rule
  with no tool behind it decays, in disciplined codebases, silently. Where this charter states a
  rule no tool can check, it says so in the rule.

---

## 4. Design rules

Each carries a rationale, an example and a counterexample. Rules a tool can check appear here only
where the _judgement_ is reviewable and the tool catches merely the syntax. Code examples are given
in TypeScript, which the source project used and which E004 may or may not confirm; the rules are
about shape, not syntax.

### 4.1 Module boundaries

**MB1 — Dependencies point downward only:** `apps` → `domain` → `platform` → `platform/core`.
Nothing imports upward, and `platform/core` imports nothing of ours.

_Rationale:_ the domain must not know it is being rendered. That is what keeps pure cores testable
with no browser and no database, which is what makes verification by execution affordable. Here the
domain is the curriculum itself — terms, modules, progress — and a term must not know what a page
looks like.

```ts
// src/domain/curriculum/term.ts — allowed: nothing above it imported
import { type Slug } from "../../platform/core/slug.js";
```

```ts
// src/platform/core/slug.ts — FORBIDDEN
import { renderTermCard } from "../../apps/site/cards.js"; // the core now depends on a screen
```

**MB2 — Content is data, never code.** The taught material lives in a content tree, is parsed at an
ingest boundary, and reaches the domain as validated typed values. A lesson is never a source file
that executes.

_Rationale:_ this is directive 1 made structural. Material that is data can be checked, sourced,
diffed and counted by a tool; material embedded in components can only be reviewed by reading every
component. It is also what makes §4.9's sourcing check possible at all.

```ts
const module = parseModule(await readContent("modules/laytime.md")); // validated, then used
```

```tsx
<p>Demurrage is the daily rate the charterer pays for exceeding laytime.</p> // unsourceable, uncountable
```

**MB3 — Prefer deep modules: a small interface hiding substantial work.** Two reviewable triggers,
either of which means the module is too shallow: its exported surface is as large as its
implementation, or a caller must call three exports in a fixed order to obtain one outcome.

_Rationale:_ interface cost is paid by every caller; implementation cost is paid once. Depth is not
measurable at review time, so the rule is stated as the two symptoms that are.

```ts
export async function loadSyllabus(): Promise<Syllabus>; // throws SyllabusIncomplete
```

```ts
export async function readModuleFiles(): Promise<string[]>;
export function parseEach(files: string[]): Module[];
export function checkAllPresent(mods: Module[]): boolean; // every caller must now know the protocol
```

**MB4 — A module that only forwards is deleted.** If a file's exports call one other module and add
no invariant, remove the file.

_Rationale:_ pass-through layers add reading cost and hide nothing.

### 4.2 Naming

**N1 — Units and qualifiers come last, most significant word first.** `freightUsdPerTonne`, not
`perTonneFreightUsd`; `laytimeHoursAllowed`, not `allowedLaytimeHours`.

_Rationale:_ related identifiers sort and align together, so the odd one out is visible.

**N2 — Every quantity names its unit, in the identifier or in the type.** Money, tonnage, distance,
speed, durations, dates and counts.

_Rationale:_ directive 1, arriving through the code. This subject is made of units, and a unit error
in a worked example is a wrong answer taught as a right one.

```ts
type Deadweight = number & { readonly __unit: "dwt" };
function tceUsdPerDay(freightUsd: number, voyageCostsUsd: number, voyageDays: number): number;
```

```ts
function tce(freight: number, costs: number, days: number): number; // which currency? which days?
```

**N3 — Index, count and size are distinct concepts; converting between them is explicit.**

_Rationale:_ the usual off-by-one is a casual interaction between them.

**N4 — Use the market's word, exactly, and never overload it.** Laycan, laytime, demurrage,
despatch, hire, freight, ballast. Do not invent a synonym, and do not give an existing term a second
meaning.

_Rationale:_ this is the strongest rule in the whole charter for this project, because the market's
vocabulary is the product. `freight` and `hire` are different payments under different contracts;
using either loosely in code is the same defect as teaching them loosely on the page. The
vocabulary is fixed by [`../curriculum/syllabus.md`](../curriculum/syllabus.md).

```ts
type VoyageCharter = { freightUsdPerTonne: number };
type TimeCharter = { hireUsdPerDay: number };
```

```ts
type Charter = { rate: number }; // "rate" now means freight, hire, and the Baltic index
```

### 4.3 Error handling

**EH0 — One signalling mechanism per situation, chosen by this rule and not by taste.**

- **Throw** for programmer errors (§4.4) and for non-recoverable failures (EH5).
- **Return a discriminated result** for an expected operating outcome at a boundary — a lookup that
  finds nothing, a validation that fails.
- **Never** signal with a bare `undefined`, `null`, `-1`, `""` or an empty array (EH2).

_Rationale:_ a codebase with three interchangeable error mechanisms grows two answers to one
question inside a single module, and the weaker answer is the one that gets relied on.

**EH1 — Truncation is an error, not a result.** Any read that a limit could cut short detects it and
throws. This includes directory listings, content scans, feed pages and search results.

_Rationale:_ directive 2. **No tool can check this completely** — a lint can require a limit
argument, but only review can confirm the completeness proof is real.

```ts
const files = await listContent(dir, { limit: MODULE_FILES_MAX + 1 });
if (files.length > MODULE_FILES_MAX) throw new SyllabusIncomplete({ dir, reason: "listing-truncated" });
```

```ts
const files = await listContent(dir); // the driver's cap silently returns a partial syllabus
```

**EH2 — No in-band error values.** Never signal failure with `null`, `undefined`, `-1`, `""`, `0`,
`NaN` or an empty array where a caller could mistake it for data.

_Rationale:_ a sentinel is silently ignorable; a separate channel forces the check.

```ts
type TermLookup = { found: true; term: Term } | { found: false };
```

```ts
function findTerm(slug: string): Term | undefined; // "no such term" and "we failed" are one value
```

**EH3 — Never swallow.** Every `catch` handles, rethrows with context, or records to an audited
channel. An empty catch block, a bare `.catch(() => {})`, and a `?? defaultValue` covering a thrown
failure are all prohibited. **Recording is not handling**: if the caller still receives a value, the
error was handled, and EH5 governs whether it was allowed to be. **Wrapping preserves class** — an
assertion failure stays recognisable as one after it is rethrown with context, or the wrap has
laundered it.

_Rationale:_ an analysis of production failures in distributed data-intensive systems found the
majority of catastrophic failures came from mishandling non-fatal errors that were explicitly
signalled.

```ts
try {
  await writeProgress(entry);
} catch (cause) {
  throw new ProgressWriteFailed({ termSlug: entry.termSlug }, { cause });
}
```

```ts
try {
  await writeProgress(entry);
} catch {
  /* best effort */
}
```

**EH4 — Distinguish operating errors from programmer errors.** An operating error is expected and
handled: a malformed content file, a network failure. A programmer error is a violated invariant and
is asserted, never caught and continued from.

_Rationale:_ the two need opposite treatment, and conflating them produces code that retries a logic
bug.

**EH5 — Some failures may never become a result.** Three classes are **non-recoverable**:
incompleteness, a failed integrity check, and a taught claim whose source is missing. They may be
caught to log, to release a resource, or to present a refusal. They may never be converted into a
value a caller could mistake for a successful one — **at any layer, including the outermost one**.

_Rationale:_ this rule exists because the source charter's first draft did not have it, and a sample
obeying every other rule still rendered a partial book as complete. EH1 obliges the producer to fail
loudly; without EH5 the obligation stops at the throw and the consumer is free to undo it. The
failure follows the error to its final handler.

```ts
catch (cause) {
  if (cause instanceof SyllabusIncomplete) {
    recordFault({ reason: "syllabus-incomplete" });
    return renderRefusal(cause);       // a refusal is not a syllabus
  }
  throw cause;
}
```

```ts
catch (cause) {
  if (cause instanceof SyllabusIncomplete) {
    recordFault({ reason: "syllabus-incomplete" });
    return render(cause.partial);      // FORBIDDEN, in full compliance with everything else
  }
  throw cause;
}
```

**EH6 — Untrusted input enters as `unknown` and leaves a validator as a domain type.** The validator
is the only place a cast is permitted, and it is tested against hostile input.

_Rationale:_ the type configuration forbids unchecked casts — correctly, but every parse boundary is
exactly where they are reached for. Without a sanctioned path the rule breaks at the first content
file. Concentrating the casts in validators also concentrates the tests.

### 4.4 Assertions

**AS1 — Assert arguments, returns, preconditions, postconditions and invariants, including the
negative space.** Assertion density **averages** at least two per function across each module in the
platform and domain layers.

Two clauses that are part of the rule, not softenings of it: a function with no precondition to
state needs no assertion, and **padding is prohibited**. An assertion a type or a static check can
prove will never fail does not count toward the average and must be deleted.

_Rationale:_ defect-interception odds rise with assertion density. The sources specify an _average_
and explicitly disallow statically-provable assertions, because a per-function quota is met most
cheaply by asserting nothing twice.

```ts
export function tceUsdPerDay(freightUsd: number, voyageCostsUsd: number, voyageDays: number): number {
  assert(voyageDays > 0, "tceUsdPerDay: zero or negative voyage days");
  assert(Number.isFinite(freightUsd), "tceUsdPerDay: non-finite freight");
  const tce = (freightUsd - voyageCostsUsd) / voyageDays;
  assert(Number.isFinite(tce), "tceUsdPerDay: non-finite result");
  return tce;
}
```

**AS2 — An assertion failure fails the request loudly; it is never downgraded to a partial answer.**
It is not caught by a general handler, not retried, and not converted into a user-facing default.

_Rationale:_ this resolves the one head-on conflict between the source charter's sources. "Crash"
means the smallest blast radius that cannot produce a wrong answer: abort this request, record it,
return a failure. Never continue.

**AS3 — Assertions are side-effect free.** Removing every assertion must not change behaviour.

**AS4 — One condition per assertion.** Prefer `assert(a); assert(b);` to `assert(a && b)`, so the
failure names which half broke.

### 4.5 Comments

**CM1 — Comments say why, not what.** Rationale, invariants, units, and the alternative that was
rejected.

**CM2 — Every exported symbol in the platform and domain layers carries an interface comment**
stating its purpose, its invariants and its units. If the interface cannot be described briefly and
completely, the design is wrong — change the design, not the comment.

**CM3 — A surprising invariant gets an assertion as well as a comment.** A comment goes stale
silently; an assertion fails loudly.

**CM4 — No commented-out code.** Git remembers it; the file does not need to. The `TODO` half of
this rule is mechanical and lives in §3, where a check enforces `TODO(E031)` over `TODO: fix this`.

### 4.6 Dependencies

**DP1 — A new runtime dependency requires the principal's approval before it is added.** Ask first;
do not add it and explain afterwards.

_Rationale:_ dependencies bring supply-chain risk and an upgrade treadmill. Dependency minimalism as
a defended position is the convention at three of the four codebases the source charter studied.

**DP2 — Every dependency has a row in `docs/architecture/dependencies.md`** naming what it does, why
the platform cannot, who approved it and when. CI fails if a dependency has no row or a row has no
dependency.

_Rationale:_ a package manifest cannot carry comments, so the CI check stands in for one: it fails at
the moment of addition, which is the moment the justification is owed.

**DP3 — Prefer the platform.** The standard library over a package; a package over a framework. A
framework is the most expensive form of dependency, because it dictates the shape of code that has
to outlive it.

**DP4 — Anything that parses untrusted input is held to a higher bar**: pinned by integrity hash,
read before adoption, and re-reviewed on upgrade.

### 4.7 Concurrency

**CN1 — Every `await` is a suspension point; re-establish invariants after it.** A check made before
an `await` is a check about a world that has since moved.

**CN2 — One owner per mutable value, and no global mutable state.** A cache is permitted, and
required to be bounded by RM3, but it is constructed within a scope rather than declared at module
level.

**CN3 — Fan-out is bounded, always.** Every concurrent batch has an explicit maximum.

```ts
await mapWithConcurrency(files, PARSE_CONCURRENCY_MAX, parseOne);
```

```ts
await Promise.all(files.map(parseOne)); // every content file at once, one process
```

### 4.8 Resource management

**RM1 — Limits bind before the expensive work.** Check declared size, row count, page count and
content length before allocating, parsing or decoding. A cap checked after the allocation is not a
cap.

**RM2 — Every loop over external data has a bound, and exceeding it is an error.** Where a loop must
not terminate, assert that.

**RM3 — No unbounded cache, queue or buffer.** Each has a maximum and a stated eviction rule. An
unbounded cache is a memory leak with a business justification.

**RM4 — No regex over untrusted text without a linear-time guarantee.** Anchor it, bound the input
first, and prefer a hand-written scanner for anything a document supplies.

_Rationale:_ on the source project two extractor expressions took 17 and 23 seconds on crafted
input, and were safe only by accident of an unrelated line elsewhere. Content parsing here is the
same shape of work.

**RM5 — Acquire and release in the same function, with `finally`.** File handles, transactions,
streams.

### 4.9 The material

**The rules directive 1 is made of.** These govern the taught content rather than the code, and they
are the reason this charter is not simply the source charter with the confidentiality apparatus
deleted.

**MT1 — Every taught claim carries a source.** A definition, a figure, a dimension, a convention, a
percentage and a worked example each name where they came from, in a field the content format
requires and a check enforces (§3). "The principal's supplied term list" is a valid source and is
recorded as such.

_Rationale:_ directive 1. A source is what makes a claim checkable by someone who was not there when
it was written, which is the same standard §1 sets for a code change. It is also the only mechanism
that makes a later correction possible: a wrong claim with a source is traceable to everything else
that source produced, and a wrong claim without one is not.

```yaml
term: demurrage
definition: The daily rate a charterer pays the owner for time used beyond the agreed laytime.
character: liquidated damages, not a penalty
source: principal's supplied term list, 23 August 2026
confidence: settled
```

```yaml
term: demurrage
definition: What you pay when you are late.
```

**MT2 — Confidence is stated, and "settled" is a claim like any other.** Every taught item is marked
`settled`, `varies` or `unverified`, and the mark is shown to the learner rather than kept in the
file. `varies` names what it varies with. `unverified` may be published, and says on the page that
it is unverified.

_Rationale:_ directive 1's second and third Tier 0 clauses. The alternative to publishing an
unverified item with a mark is publishing it without one, because the pressure to ship does not go
away by being disapproved of. Making uncertainty a first-class field is what stops it being resolved
silently in the drafting agent's favour.

```yaml
term: despatch
definition: A payment from owner to charterer for completing cargo operations inside the laytime.
rate: conventionally half the demurrage rate
confidence: varies
varies_with: the charterparty, which sets the rate and may exclude despatch entirely
```

```yaml
term: despatch
rate: half demurrage
confidence: settled # it is not, and the learner will find out at the worst moment
```

**MT3 — Teach the mechanism, not the gloss.** A term is explained by what it does in a deal: who
pays, to whom, under which contract, and what changes if it is wrong. A one-line gloss is an index
entry, not a lesson.

_Rationale:_ the learner is going to a broking desk, where the test of knowing a term is using it in
a live negotiation. A definition that cannot be acted on has taught recognition and called it
understanding.

> **Example.** Laytime is the time the charterer is allowed for loading and discharging. It starts
> when notice of readiness is tendered and the turn time expires. Time used beyond it is demurrage,
> paid by the charterer at a daily rate agreed in the fixture. Time saved is despatch, paid by the
> owner, conventionally at half the demurrage rate.
>
> **Counterexample.** Laytime is the time allowed for cargo operations.

**MT4 — A worked example carries real units and arrives at a number.** Every calculation taught — a
time charter equivalent, a laytime statement, a stowage factor, a demurrage claim — is shown end to
end with units on every quantity and an arithmetic result the learner can reproduce.

_Rationale:_ N2 and directive 1 meeting on the page. The units are the subject; an example that
elides them teaches the shape of a calculation and not the calculation.

**MT5 — A correction is a first-class change.** When something taught is found to be wrong, the fix
is its own commit, names what was wrong and what is now claimed, and updates every other item that
rested on it. It is never a silent edit.

_Rationale:_ directive 1 applied backwards in time. The learner has already read the wrong version;
a silent edit leaves them holding it. The commit is what makes it possible to tell them.

---

## 5. Test doctrine

### 5.1 Taxonomy

| Tier                 | Location                | Naming                      | Determinism                                              |
| -------------------- | ----------------------- | --------------------------- | -------------------------------------------------------- |
| Unit                 | beside the code         | `<module>.test.ts`          | pure; no clock, no network, no filesystem, no randomness |
| Known-answer vectors | beside the code         | `<module>.vectors.test.ts`  | fixed inputs and expected outputs, committed             |
| Content              | `tests/content/`        | `<obligation>.test.ts`      | runs over the real content tree                          |
| Charter              | `tests/charter/`        | `<rule>.test.ts`            | one per rule that has a permanent tripwire               |
| Integration          | `tests/integration/`    | `<subsystem>.test.ts`       | seeded, torn down per test                               |
| System               | `tests/system/`         | by user-visible behaviour   | may use the network                                      |

The content tier is this project's own. It exists because directive 1 is a property of data rather
than of code, and a rule about data that is only reviewed is a rule that decays.

### 5.2 What must be tested

Not a coverage percentage — a list of obligations.

1. **Every taught claim has a source and a confidence mark.** A content test walks the whole tree
   and fails on the first item missing either. This is directive 1's mechanical half.
2. **Every syllabus module named in `docs/curriculum/syllabus.md` exists in the content tree, and
   every content module appears in the syllabus.** Drift in either direction is a failure.
3. **Every worked example's arithmetic is checked**, by computing it in the test rather than
   asserting the published figure against itself.
4. **Every error path a user or hostile input can reach.** The error branch is the path never
   exercised by ordinary use and always exercised in production. A path that only re-wraps another
   error with context is excluded.
5. **Every limit, at the boundary**: one under, exactly at, one over.
6. **Every completeness check, against a truncated response — at the outermost layer.** Simulate the
   cap and assert that what reaches the learner is a refusal, not a shorter syllabus. Asserting only
   that the query throws proves the producer complied and says nothing about the route that catches
   it (EH5).
7. **Every assertion's negative space** — the invalid input that must trip it.
8. **Every parser, against hostile input**: malformed, truncated, oversized, adversarially nested,
   wrong encoding.

### 5.3 What "done" means

A change is done when **all** of the following hold. Not most.

- A test exists that fails without the change and passes with it.
- Every obligation in §5.2 touched by the change has a test.
- CI is green with no skipped tests, unless a skip carries an exception ID.
- The `plans.csv` row and the roadmap entry are updated in the same commit.
- If the change altered what is taught, the syllabus is updated in the same commit.
- If the change touched the architecture, `docs/architecture/` is updated in the same commit — it is
  never behind the code, and never claims a control the code does not implement.

### 5.4 Determinism

- **No wall clock.** Time is injected.
- **No ambient randomness.** Seeds are explicit and printed on failure.
- **A failing test reproduces from its seed alone**, on another machine.
- **Failure messages name the input, what was got and what was expected**, on the assumption that
  the person debugging is neither you nor the person who wrote it.

### 5.5 What CI hard-fails on

Format · lint · type check · unit, content, charter, integration and system tests · layering import
rules · dependency audit and lockfile integrity · secret scan · unapproved dependency additions ·
any skipped test without an exception ID · any taught claim without a source.

CI uses **one aggregating required check** that depends on every job and inspects their statuses
explicitly, so that a skipped job cannot pass silently and the job list can grow without
reconfiguring branch protection. **One command runs locally what CI runs.**

---

## 6. Contributor protocol for agents

The governing rule is the precondition in §1: **a named human is answerable for every change, and
must be able to explain it without you.** Everything below serves that.

### 6.1 Read before write

Before editing, read [`../planning/OVERVIEW.md`](../planning/OVERVIEW.md), the `plans.csv` row for
the item, and the plan document if one exists. Before editing content, read
[`../curriculum/syllabus.md`](../curriculum/syllabus.md) and
[`teaching-copy-style.md`](teaching-copy-style.md). Then read what you are about to change:

- **A file under 500 lines: in full**, not the region you are editing.
- **A file above 500 lines:** its exported interface, the region you are changing, and every call
  site of what you are changing.

State in the change description which files you read in full.

_Rationale:_ the source project's most expensive errors were confidently reasoned from partial
context and were wrong. The bound exists because the unbounded version is untrue the first time a
file is four thousand lines long, and a checklist carrying one box everyone ticks falsely is a
checklist that gets skimmed.

### 6.2 Scope discipline

One ledger item per change. No drive-by refactors, no opportunistic renames, no reformatting of
untouched files. If you find an unrelated defect, **record it in the ledger and leave it**.

_Rationale:_ a diff that does two things cannot be reviewed for either, and the human who is
answerable is reviewing on a budget.

### 6.3 Stop and ask — mandatory triggers

Stop and ask the principal, in every one of these cases. Do not proceed on a best guess.

- **A new dependency** of any kind, including a development dependency.
- **A claim you cannot source**, where the alternative is to publish it unsourced.
- **A conflict between two sources** on a taught term, where the resolution is a judgement about the
  market rather than about the code.
- **Adding to or removing from the syllabus.** Its scope is the principal's, not yours.
- **Deleting, skipping or weakening a test**, or lowering a limit's strictness.
- **A change that would need an exception** under §7.3.
- **Two charter rules conflict and the §1 ordering does not settle it.**
- **The charter is silent and the decision is structural** — a boundary, a data shape, a content
  format, anything a later change would have to live with.
- **You are about to write documentation asserting a control**, and you have not verified the code
  implements it.
- **Anything outward-facing**: opening a pull request, posting a comment, sending anything to a
  third party.

### 6.4 When the charter is silent

In order: choose the most reversible option — judged by three proxies, in order: **fewest call
sites**, **no content-format change**, **no new file in the platform layer**; then record the
decision and its reasoning in the change description. If the decision is structural, §6.3 applies
instead — stop and ask.

The proxies exist because "easiest to delete later" is not decidable by two people who disagree, and
a tie-breaker that does not break ties is not one.

Never invent a rule and present it as the charter's. If you believe a rule is missing, propose an
amendment under §7.2.

### 6.5 Writing

Describe your change in your own words, plainly, and do not paste unreviewed generated prose into a
commit message or a pull request body. Commit subjects are lowercase, imperative, scoped to an area,
and under 60 characters: `syllabus: split laytime out of voyage terms`. The body says why. A pull
request description is not a substitute for a commit message, because it is not stored in the
repository and is invisible to `git blame`.

**Reviews, reports and findings: one line each.** A review, an audit, a status report or any list of
findings gives every item **one line** — the claim, where it lives, what it costs. Never a paragraph
each. The reasoning goes in the artefact the line points at; the line points. A reader holding twelve
findings must be able to see all twelve at once, because the value of a review is the shape of the
whole list, and prose destroys it.

**Open a review with a horizontal rule.** Any review, report or set of findings is preceded by a
`---`, so it is visibly separated from the work that produced it. The rule is where the doing stops
and the reporting starts.

**Name things by their name.** Ledger items, plans and documents are referred to in prose by name,
with the identifier in brackets on **first mention only** and the name alone thereafter: "the
syllabus (E002) … the syllabus". Structured trackers are exempt — `plans.csv` is keyed by ID by
design — but the moment you are writing sentences, an ID is an index, not a word.

**A reference carries its own meaning.** If the reader would have to open another document to know
what a line is asking of them, the line is unfinished. Write out the substance in the line itself.
This binds hardest in a next-steps section, where the reader is being asked to act.

> **Example.** "Decide whether lessons are authored as one file per term or one per module — it sets
> the content format and everything that parses it."
>
> **Counterexample.** "Answer the content format decision point." Correctly named, and still useless:
> the reader cannot act without fetching the document.

**Close a review with what to do next.** Every review, report or findings list ends with its own
clearly headed section naming the work that follows, in the order it should be taken, one line each,
each carrying a **very short** justification — a clause, not a sentence, never a paragraph.

**The line is the whole item.** One line per item means the line is all there is: a bold lead and a
clause, with no second sentence under it, no supporting quotation, no worked explanation, and no
connective prose between items. Cut items as well as words — an item earns its line only if it
changes what the reader does. This governs **everything written back to the principal**: reviews,
audits, proposals, plans, recommendations and answers alike.

> **Example.**
>
> **Brought the charter across, generalised** — confidentiality apparatus dropped, sourcing rules added.
>
> **Syllabus built from the supplied list** — nothing added to its scope without asking.
>
> **Counterexample.**
>
> **Finding 1 — I brought the charter across and generalised it.** The confidentiality directive had
> no counterpart here, so directive 1 became truthfulness of the material instead, which then required
> a new §4.9 to give it mechanical force, and…
>
> Bold lead, then a second sentence, then a third clause developing it.

**Where it yields.** When the principal asks for full detail, or the artefact is a document rather
than a reply, write the document properly. The rule binds the reply, not the repository.

**Commits are authored by the principal, not by the agent.** `user.name` and `user.email` name the
answerable human, and every commit made in this repository carries that name in its author line. No
agent name, no agent address, and no `Co-Authored-By` trailer naming a model.

> **Example.** `Author: Alexander Moufarrige <alexmouf.work@gmail.com>`
>
> **Counterexample.** `Author: Claude <noreply@anthropic.com>`

**This is not a claim that an agent did no work, and it removes nothing from the record.** The commit
body still says what changed and why, in the agent's own words. What produced a change and who
directed it are recorded in the ledger and in `docs/agents/`, at a level of detail an author line
could never carry. The author line records the person answerable for the change, which is a different
question from who typed it.

**Everything the learner reads follows the teaching copy style.** The whole of this section governs
what an agent writes _back to the principal_. What the site says to the learner — lesson text,
definitions, worked examples, navigation, its own error messages — follows
[`teaching-copy-style.md`](teaching-copy-style.md) instead. The two never apply to the same words: an
agent drafting a lesson follows that document, and the same agent reporting on the work follows this
section.

### 6.6 Pre-submit self-review checklist

Copy this into the change description and tick it honestly. An unticked box is a stop-and-ask, not a
footnote.

- [ ] I read what §6.1 requires, and the change description names the files I read in full.
- [ ] This change does one thing, and it is the ledger item it claims.
- [ ] Every claim this change teaches carries a source and a confidence mark.
- [ ] Nothing marked `settled` is actually a convention that varies.
- [ ] Every worked example carries its units and arrives at a reproducible number.
- [ ] Nothing was added to or removed from the syllabus without the principal's decision.
- [ ] No import crosses a layer boundary the wrong way.
- [ ] Every read that could be truncated detects truncation and fails loudly.
- [ ] No incompleteness or integrity failure is caught and turned into a value a caller could
      mistake for success — at any layer, including the outermost.
- [ ] Untrusted input enters as `unknown` and leaves a validator; casts appear only inside one.
- [ ] Every limit binds before the expensive work, not after.
- [ ] No `catch` is empty; every error is handled, rethrown with context, or recorded.
- [ ] Exported functions in the platform and domain layers assert their arguments and invariants.
- [ ] Every `await` that follows a check re-establishes what the check proved.
- [ ] No plain object is used as a lookup keyed by outside data.
- [ ] No new dependency, or the principal approved it explicitly.
- [ ] A test fails without this change and passes with it.
- [ ] Every §5.2 obligation this change touches has a test.
- [ ] No test is skipped, or the skip carries an exception ID.
- [ ] `plans.csv` and the roadmap are updated in this commit.
- [ ] No documentation in this change claims a control the code does not implement.
- [ ] The commit message is in my own words, and the change description lists anything I could not
      fully justify, for the human who is answerable for it.

### 6.7 Durable state — pushed work is the only work

The environment this repository is built from is **remote and ephemeral: it resets without warning**,
and when it does, the working tree, local commits and everything else that lives only on the machine
are gone.

Four habits follow, and they are obligations, not preferences:

1. **Pull before every session**, before reading and before writing. A stale clone is a wrong clone,
   and §6.1's read-before-write is worthless if what was read is not what is there.
2. **Commit and push in small, complete increments, as each one lands.** A finished piece of work
   sits unpushed for exactly as long as it takes to verify it, never until "the end of the session",
   because the session is not guaranteed to have an end you choose.
3. **Pull frequently during long work**, and always before starting a new piece.
4. **When a push is refused, integrate and re-verify before pushing again.** Pull, resolve, run the
   checks, then push. Never force-push over another session's work.

The test of compliance is blunt: **if the environment vanished right now, what would be lost?** If
the answer is more than the piece currently in progress, the rules above are not being followed.

_Rationale:_ every other rule in this charter assumes the work survives to be reviewed. On an
ephemeral machine, git is not a history mechanism but the storage layer itself — the remote is the
disk, and the local clone is a cache.

---

## 7. Meta

### 7.1 Version and changelog

**Current version: 1.0.0.** Semantic: major for a changed prime directive or priority order, minor
for a new or removed rule, patch for wording that does not change meaning.

| Version | Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-08-23 | First issue. Generalised from the `manifest` charter 1.9.0 at the principal's direction. Directive 1 replaced: confidentiality has no counterpart in a single-learner teaching site, and truthfulness of the material takes its place as the project's central promise. §4.9 added to give that directive mechanical force — sourcing, stated confidence, mechanism over gloss, worked examples with units, corrections as first-class changes. The plane-boundary rules, the tenancy rules and the server-side authority rules are dropped rather than reworded, since nothing here has two trust domains. §3 rewritten as an obligation table marked not-yet-enforced, because no stack is chosen and a summary table that implies controls exist is the failure mode the source charter records twice. |

### 7.2 Amendment process

1. An amendment is its own commit, touching this file and the changelog above, and nothing else.
2. It cites a source or a specific incident. **"It seems better" is not grounds** — the rule that
   keeps mistakes out is never the one someone preferred, it is the one someone had already been
   burned by.
3. It states the rule's class: mechanical, reviewable, or a prime directive. **A mechanical rule is
   not added here** — it is added to a config, and summarised in §3.
4. It carries an example and a counterexample **in the medium the rule governs** — code for a rule
   about code, the prose form itself for a rule about writing, a content fragment for a rule about
   the material. A writing rule demonstrated in TypeScript demonstrates nothing.
5. A new rule gets a red-team pass before it lands: how would two competent agents read this
   differently, and would it be routinely violated? A rule that will be routinely violated is
   corrosive to every rule around it, and is deleted rather than weakened.
6. The principal approves. Agents propose; they do not amend.

### 7.3 Exceptions

Recorded in [`EXCEPTIONS.md`](EXCEPTIONS.md). Nowhere else — not in a code comment, not in a commit
message, not in a pull request thread.

An exception is justified only by: a platform or dependency limitation with no workaround; or a
measured performance requirement that the rule makes unachievable. It is **not** justified by
deadline pressure, by inconvenience, or by a rule being unfamiliar.

Every exception carries an ID, the rule it suspends, its exact scope, the justification, an expiry
date, and the approving human. **Exceptions expire, and CI enforces it.** One that needs to be
permanent is an amendment request under §7.2, not an exception, because a permanent exception is a
rule the charter does not admit it has.

Two exceptions against the same rule are evidence the rule is wrong. The third is not granted; the
rule is re-examined.
