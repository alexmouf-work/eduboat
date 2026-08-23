# Roadmap

**Status: in force, 23 August 2026.** The work, sequenced into phases, one tickable entry per ledger
item. Keyed by the same IDs as [`plans.csv`](plans.csv), which is the ledger and is right where the
two disagree.

**The roadmap and the ledger move together.** Starting or finishing an item updates its `plans.csv`
row and ticks its entry here **in the same change**. Never batched, never left stale.

**No durations anywhere.** Sequence, dependency and what an item is gated on are the useful facts.
Charter §6.5 and the docs conventions both forbid the rest.

---

## Phase 0 — foundations

The standards and the specification, before anything renders either. Deliberately in this order: the
site is a delivery mechanism for material that has to be right, so the material's rules came before
the material, and the material before the machine.

- [x] **E001 — Bring the charter and writing standards across, generalised.** The engineering
      charter, the exceptions register and the teaching copy style, generalised from `manifest`.
      Directive 1 changed from confidentiality to truthfulness of the material, and §4.9 added to
      give that directive mechanical force.
- [x] **E002 — Write the syllabus from the supplied term list.** 106 terms across 12 modules, in a
      stated teaching order with the dependency between modules made explicit. Ten gaps proposed and
      none taken into scope.
- [x] **E003 — Consolidate the project orientation.** Requirements, promises, defect classes, scale
      and the open decisions, in one document.
- [x] **E004 — Choose the stack.** Decided by the principal with the build instruction of 23 August
      2026: React + Vite + Tailwind, with the quiz engine harvested from the `lemma` repository.
- [x] **E007 — Decide the content format.** Decided by the principal the same day: hardcoded data
      files — `src/data/terms.js` for the terms, LEMMA-XML strings for the question bank — with
      progress in browser localStorage.
- [ ] **E005 — Scaffold and the mechanical checks.** The app scaffold and the question selfcheck
      exist; the lint, format and CI rows of charter §3 are still outstanding, and each must be
      pointed at a deliberate violation and observed to fail before its row counts.
- [ ] **E006 — Design system and visual tokens.** A first dark navy palette exists in
      `tailwind.config.js`; not yet ratified by the principal.
- [x] **E008 — Decide how learner progress is recorded.** localStorage, Leitner-light: strength 0–5
      per term, no account, and a reset control in the term tracker.
- [ ] **E009 — Decide the syllabus proposals.** Ten gaps in syllabus §15, accepted or rejected item by
      item. Sale and purchase mechanics is the largest: module 12 names a Braemar desk the syllabus
      never teaches.
- [x] **E026 — Build the quiz app v0.1.** Directed by the principal on 23 August 2026: barebones and
      quiz-first. A home page with quiz length and module focus, a one-question-at-a-time runner on
      the harvested engine (choice, tickbox, true-false, numeric, text-gap, written, reorder,
      dragdrop), photos from the manifest library in the questions, a term tracker, and progress in
      localStorage. 66 hand-authored questions plus two generated questions per term and a written
      full-form question per abbreviation — every one of the 106 terms is trained. `npm run
      selfcheck` lints the whole bank; the browser smoke test passed clean.

## Phase 1 — the commercial track

Who the parties are, how a deal is struck, and how the money works. Modules 1 to 6 and 11 of the
syllabus.

- [ ] **E010 — Module 1, the parties.** Owner, operator, technical manager, charterer. Everything
      else says "the owner pays" or "the charterer directs", so this settles first.
- [ ] **E011 — Module 2, the desk.** The fixture sequence from order to charterparty. The learner
      must be able to say at any point in it whether a binding contract exists.
- [ ] **E012 — Module 3, charter contract types.** Voyage, time, trip, bareboat, contract of
      affreightment, spot, period, disponent owner. The who-pays-what table is the thing to memorise.
- [ ] **E013 — Module 4, voyage charter economics.** Laytime, demurrage, despatch, Worldscale. Two
      worked examples: a laytime statement from a statement of facts, and a Worldscale conversion.
- [ ] **E014 — Module 5, time charter mechanics.** Hire, off-hire, warranties, delivery. One worked
      example: a speed and consumption performance claim in USD.
- [ ] **E015 — Module 6, money and measures.** The keystone. Time charter equivalent worked end to
      end and compared against a Baltic index on a stated date. Waits on the ballast leg from
      module 10.
- [ ] **E016 — Module 11, paper, insurance and compliance.** Bill of lading, P&I, hull and machinery,
      class, port state control, the standard charterparty forms.

## Phase 2 — the physical track

What a ship is, what constrains it, and what happens alongside. Modules 7 to 10. Independent of
phase 1 until module 6 needs the ballast leg, so the two tracks can run in parallel.

- [ ] **E017 — Module 7, dimensions and loading.** Two worked examples: a stowage factor calculation
      cubing out against weighing out, and the load line marks applied to a real routing.
- [ ] **E018 — Module 8, vessel classes.** The ladders, taught as constraints rather than tonnage
      bands: Panamax is a lock, Suezmax is a cross-section, Kamsarmax is a berth.
- [ ] **E019 — Module 9, canals and chokepoints.** Every figure carries the date it was true. The
      Panama draft limit moves with rainfall and is marked `varies` by construction.
- [ ] **E020 — Module 10, ballast and cargo operations.** The ballast leg is what connects this
      module to the time charter equivalent, which is why E015 waits on it.

## Phase 3 — the desk

- [ ] **E021 — Module 12, Braemar.** Which module each desk lives in, and which one the syllabus does
      not yet cover. Gated on the principal, because it describes a real firm and charter MT1 binds
      without exception: nothing about its structure, offices or desks is published from memory.

## Phase 4 — proving it

Not a phase that happens last. Each item lands with the code and content it guards; it is grouped
here because the obligations are one subject.

- [ ] **E022 — Content tests for sourcing, confidence and coverage.** Charter §5.2 obligations 1 and
      2. Every module in the syllabus exists in the content tree and every content module appears in
      the syllabus; drift in either direction fails.
- [ ] **E023 — Worked example arithmetic tests.** Every example named in the syllabus is computed in
      the test, never asserted against its own published figure.
- [ ] **E024 — Charter tripwires, one per defect class.** Ten classes in `OVERVIEW.md` §6, each
      getting a test that fails if the class returns. **None exists yet**, and the charter's §3 says
      so rather than implying the set is complete.
- [ ] **E025 — Offline reading.** Requirement 6. It will be read on a phone and on the underground.

---

## What the sequence rests on

**Phase 0 blocks almost everything, and E004 blocks phase 0.** No stack means no content format,
which means no content tree, which means no lesson can be written and no content test can exist. The
one thing that did not wait was the material's specification, which is why the syllabus is finished
while the site does not exist.

**The two tracks are genuinely parallel.** Nothing in modules 7 to 10 depends on modules 1 to 5, and
nothing in 1 to 5 depends on 7 to 10. They meet once, at module 6, where the physical facts become a
comparable daily number.

**Module 6 is the item to protect.** If the schedule compresses, it is the one that must still get its
full treatment, because the time charter equivalent is the number every desk argues about and it is
the only place the whole syllabus comes together.
