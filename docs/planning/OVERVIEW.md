# Overview

**Status: agreed, 23 August 2026.** The consolidated orientation for the project. Read this before
anything except [`../../AGENTS.md`](../../AGENTS.md). Ledger item **E003**.

---

## 1. What Eduboat is

A private teaching website with exactly one learner: the principal. Its subject is the shipping and
shipbroking vocabulary needed for an internship at **Braemar**, a London shipbroker. It teaches
terminology, the mechanism behind each term, and the market context that makes the terminology mean
something.

The material is specified by [`../curriculum/syllabus.md`](../curriculum/syllabus.md): 106 terms
across 12 modules, supplied by the principal on 23 August 2026.

## 2. What it is not

- **Not a course for a cohort.** One learner is a requirement, not a stage. No accounts, no sharing,
  no analytics, no progress leaderboards, no second user.
- **Not a glossary.** A term with a one-line definition is an index entry. Charter MT3 requires the
  mechanism: who pays, to whom, under which contract, and what changes if it is wrong.
- **Not a reference the learner consults.** It is a site the learner works through, and finishes.
- **Not a product.** Nothing here is built to be sold, shared or shown to Braemar.

## 3. Why it exists

The learner is going to a broking desk, where the test of knowing a term is using it in a live
negotiation with someone who has used it for twenty years. Reading a glossary produces recognition
and feels like understanding. The gap between the two is what this site exists to close, and it is
why the charter's first directive is the truthfulness of the material rather than anything about the
code.

---

## 4. Requirements

Numbered, so the ledger's `serves` column can point at them.

1. **The site teaches all 106 supplied terms**, and its coverage is checkable against the syllabus by
   a test rather than by reading.
2. **Every taught claim carries a source and a confidence mark**, shown on the page.
3. **Every calculation on the syllabus is taught as a worked example** with units on every quantity
   and a reproducible number at the end.
4. **The learner can work through the site in the syllabus's order**, and can tell at any point what
   they have covered and what remains.
5. **Nothing on the site assumes a second user.** No account, no sign-in, no sharing, no analytics.
6. **The site works offline once loaded**, because it will be read on a phone and on the underground.
7. **The material is editable by the principal without an agent**, because a correction found on the
   desk should take a minute and not a session.
8. **Adding a term is a content change, never a code change.**
9. **The site is legible on a phone**, since that is where most of the reading will happen.
10. **Nothing about Braemar is published from memory.** Charter MT1 without exception.

## 5. Promises

What the site guarantees, as distinct from what it does.

1. **What it teaches is true**, or is marked as uncertain where it is not settled.
2. **Where the market disagrees with itself, the site says so** rather than picking a side silently.
3. **A convention is never presented as a rule.** Turn time, despatch rates and commission levels are
   conventions and are marked as such.
4. **Coverage is never overstated.** A module listed but not written says so on the page.
5. **A correction is visible.** When something taught is found to be wrong, the page says what it
   previously said.
6. **A figure that moves carries the date it was true.** Canal drafts, index levels, bunker prices.

## 6. Defect classes

The failures this project must not produce. Charter §5.2 gives each one a test obligation, and each
gets a permanent tripwire in `tests/charter/` as the code that could reintroduce it is written.

1. **A confident wrong definition.** The worst one, and the reason directive 1 exists. The learner
   repeats it to a professional and does not know why they were wrong.
2. **A convention taught as a rule.** Half demurrage, six hours turn time, 1.25% commission. Correct
   most of the time, and the exception is where the money is.
3. **A partial syllabus rendered as complete.** A truncated content listing that renders as the whole
   site, teaching a gap the learner cannot see.
4. **A worked example with a unit error.** The subject is made of units; an example that gets one
   wrong teaches the error along with the method.
5. **A stale figure with no date.** A canal draft or an index level that was true once and reads as
   true now.
6. **An unsourced claim.** Untraceable, and therefore uncorrectable when the source it came from
   turns out to have been wrong about other things too.
7. **Silent failure.** An empty catch, a swallowed rejection, a default that hides a missing value.
8. **An unbounded parse.** Content ingestion with no cap, or a regex over document text with no
   linear-time guarantee.
9. **A prototype-key lookup.** A plain object keyed by a term slug, where `constructor` is a crash and
   a prototype key is a wrong answer that fails open.
10. **Documentation claiming a control that does not exist.** The failure that stops anyone looking.

## 7. Scale

Deliberately small, and stated so that nobody builds for a scale that is not coming.

| Quantity                | Target                              |
| ----------------------- | ----------------------------------- |
| Learners                | 1                                   |
| Terms                   | 106, plus whatever §15 proposals are accepted |
| Modules                 | 12                                  |
| Worked examples         | at least 8, named in the syllabus   |
| Concurrent sessions     | 1                                   |
| Content tree size       | measured in hundreds of kilobytes   |

**Nothing here justifies a database, a server, an account system or a framework.** If a design
requires one, the design is wrong before the dependency question is even asked.

## 8. What has been decided

| Decision                                        | Date       | By            |
| ----------------------------------------------- | ---------- | ------------- |
| The project exists, and its subject             | 2026-08-23 | the principal |
| One learner, no second user                     | 2026-08-23 | the principal |
| The 106-term scope, as supplied                 | 2026-08-23 | the principal |
| The charter, generalised from `manifest`        | 2026-08-23 | the principal |
| Commits authored by the principal               | 2026-08-23 | the principal |
| First commit to `main`, and no other branch     | 2026-08-23 | the principal |

## 9. What is open

Each of these is a ledger item, and each is a decision the principal owns.

**The stack (E004)** — no language, runtime or build tool is chosen; the charter's §3 mechanical table is written as obligations rather than controls because of it.

**The content format (E007)** — one file per term or one per module, and what carries the source and confidence fields that charter MT1 and MT2 require.

**The syllabus proposals (E002 follow-up)** — ten gaps are listed in the syllabus §15 and none is in scope until accepted or rejected.

**The design system (E006)** — no tokens, no typography, no palette; the teaching copy style fixes only that it is flat and that headings are capitalised by the stylesheet.

**How progress is recorded (E008)** — requirement 4 needs the learner to know what they have covered, and requirement 5 forbids an account to store it in.

## 10. Where the standards came from

The charter, the writing standards and the repository structure are generalised from the `manifest`
repository, where they were derived from a named source harvest and a study of four production
codebases, then hardened by a red-team pass and by real incidents.

**What survived**: the priority ordering, the Tier 0 core, the error-handling and assertion rules,
the naming rules, the test doctrine, the contributor protocol, the writing rules, and the durable
state rules.

**What was dropped**: the plane boundary, the tenancy rules and the server-side authority rules.
They govern a confidential multi-tenant platform with two trust domains. Eduboat has one learner and
no server-held secret, so keeping them would have been decoration, and decoration in a charter is
worse than absence because it teaches that the rules are aspirational.

**What is new**: charter §4.9, the rules governing the material itself. Directive 1 changed from
confidentiality to truthfulness of the material, and a directive with no mechanical force is a
preference, so §4.9 gives it sourcing, stated confidence, mechanism over gloss, worked examples with
units, and corrections as first-class changes.
