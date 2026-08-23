# Repository structure

**Status: in effect for `docs/`; proposed for everything else.** Ledger item **E003**. Issued 23
August 2026.

**The tree below is the target, not an inventory.** §2 marks what exists today with `*`; anything
unmarked does not exist. A structure document that reads as a description of the repository is how
the two quietly diverge, and §7 records what that cost on the project this was generalised from.

The exact packaging tooling waits on the stack choice (E004). **Only the tooling**: the shape of the
tree is independent of the language, which is what lets it be settled now.

**What this is.** Where things live, and more to the point how the tree is arranged so that the
charter's rules are visible in an import statement rather than remembered by a reviewer.

---

## 1. The principle

Organise by **dependency direction and trust boundary**, not by feature.

Eduboat has one boundary that matters, and it is not a security boundary. It is the line between
**the material and the machine**. The material is what the project promises to get right; the machine
is a delivery mechanism for it. Charter MB2 states the rule — content is data, never code — and this
tree is what makes it structural: the taught material lives in its own root directory, is parsed at an
ingest boundary, and reaches the rest of the system as validated typed values.

A promise of that kind is kept by structure or not at all. If the lessons are data in a directory,
then "every claim has a source" is a test that walks a tree and fails. If they are strings inside
components, it is a rule that can only be checked by reading every component, which means it will be
checked once.

---

## 2. The tree

`*` marks what exists today; everything else is the target.

```
eduboat/
├── AGENTS.md               *  the entry point for every contributor, agent or human
├── CLAUDE.md               *  a pointer to AGENTS.md, and nothing else
├── docs/                   *  all documentation
│   ├── agents/             *  briefs, findings, hand-offs
│   ├── architecture/       *  how the built system works, and the dependency register
│   ├── charter/            *  the engineering charter, its exceptions, the teaching copy style
│   ├── curriculum/         *  the syllabus: what must be taught, in what order
│   └── planning/           *  the orientation, the roadmap, the ledger, this document
├── content/                   the taught material. Data, never code
│   └── modules/               one directory per syllabus module
├── src/                       the product
│   ├── apps/                  deployables. Thin: routing, wiring, composition
│   │   └── site/              the one web app
│   ├── domain/                what the project is about
│   │   ├── curriculum/        terms, modules, ordering, coverage
│   │   └── progress/          what the learner has covered
│   ├── ingest/                all untrusted input: the content parser and its validators
│   └── platform/              foundations. Everything above may use these
│       ├── core/              types, errors, results. Depends on nothing
│       └── ui/                the design system
├── tests/                     cross-cutting suites (unit tests sit beside their code)
│   ├── charter/               one test per defect class; the permanent tripwires
│   ├── content/               sourcing, confidence and coverage over the real content tree
│   └── integration/           suites that exercise the tooling and, later, the system
└── ops/                       building, running and operating it
    └── ci/                    the checks that run on every change
```

**Five directories in the root**, answering five questions: what we know, what we teach, what we
ship, what proves it, and how it runs.

`content/` is the one that would not appear in a general-purpose project, and it is the whole reason
this document is not simply the source project's structure with the names changed. The material is
the deliverable. Putting it inside `src/` would make it a detail of the application; putting it inside
`docs/` would make it documentation about the project rather than the project. It is neither, so it is
its own root.

**Two documents in the root**, alongside the configuration files that must sit there to be found.
Those configuration files do not exist yet, because no stack is chosen.

---

## 3. The rules the tree encodes

### 3.1 Dependency direction

| Layer            | May depend on            | Never depends on                             |
| ---------------- | ------------------------ | -------------------------------------------- |
| `src/apps/`      | domain, ingest, platform | nothing above it — there is nothing above it |
| `src/ingest/`    | domain, platform         | apps                                         |
| `src/domain/`    | platform                 | apps, ingest                                 |
| `src/platform/`  | `platform/core` only     | apps, ingest, domain                         |
| `platform/core/` | —                        | everything                                   |

The rule that matters most: **the domain never reaches up.** A term does not know it is being
rendered. That is what keeps the curriculum model testable with no browser, which is what makes
verification by execution affordable enough to actually do.

### 3.2 The content rule

**`content/` is read by `src/ingest/` and by nothing else.** No other directory opens a content file,
and `content/` contains no executable code at all.

This is charter MB2 made checkable. It gives the sourcing rule (MT1) and the confidence rule (MT2) a
single place to be enforced, and it means adding a term is a change to one directory that no code
change accompanies, which is requirement 8.

### 3.3 Untrusted input is quarantined

Every parser lives in `src/ingest/`. Two of the ten defect classes in `OVERVIEW.md` §6 live entirely
in that directory: caps must bind before the expensive work rather than after, and no regex runs over
untrusted text without a linear-time guarantee. Content files are untrusted input, and they are
untrusted input even though we wrote them, because a rule that applies only to input from strangers
is a rule with an exception nobody remembers.

### 3.4 Apps are thin

An app composes; it does not decide. Which term belongs to which module, whether the syllabus is
complete, and what order the modules go in are domain questions and are answered in `src/domain/`.
The app renders the answer.

### 3.5 No per-module directories in `src/`

`content/modules/` has one directory per syllabus module. `src/` has none, ever. The moment a module
is structural in the code, someone gives one of them a special case, and the twelfth module is
rendered by a different path from the first. Modules are data.

---

## 4. How the rules are enforced

Structure that is not checked is decoration. **None of the following exists yet**; all of it lands
with the scaffold (E005), and this section is written as the obligation that item is built against.

1. **Import boundaries are linted**, and the lint runs in `ops/ci/` on every change. A forbidden
   import fails the build, and the failure names the rule it broke.
2. **The content rule has its own check**, separate from the general layering rule, so that a loosened
   layering config cannot quietly take it too.
3. **One test per defect class** in `tests/charter/`: each of the ten classes in `OVERVIEW.md` §6 gets
   a test that fails if the class is reintroduced. That converts a list of lessons into a build
   failure, which is the only form of advice that survives.
4. **The content tests** in `tests/content/` walk the real tree and fail on the first item missing a
   source or a confidence mark, and on any drift between the syllabus and the content tree.

---

## 5. Naming

Lowercase, hyphenated, no capitals. Directories are named for what they hold, not for the phase that
produced them. A directory name that needs a comment is the wrong name.

Content files are named for the term or module they carry, using the market's word: `laytime.md`,
`worldscale.md`, `stowage-factor.md`. Charter N4 binds here as much as in code, because a file named
`port-time-allowance.md` has quietly invented a synonym for laytime.

---

## 6. What was rejected, and why

- **Content inside `src/`.** It makes the material a detail of the application, and the application a
  peer of the thing it exists to deliver. It also puts the taught claims where the layering lint has
  no opinion about who reads them.
- **Content inside `docs/`.** `docs/` is documentation about the project. The lessons are the
  project. `docs/curriculum/syllabus.md` is correctly in `docs/` because it is a specification of the
  material and not the material itself, and that distinction is the whole reason both directories
  exist.
- **A top-level directory per module** (`laytime/`, `vessel-classes/`). Reads well for twelve modules
  and rots at the first term that belongs to two of them. Modules are an ordering of terms, which is
  data.
- **A flat root.** There are five genuinely different kinds of thing here and flattening them buries
  the distinction, particularly the one between the material and the machine.
- **A `shared/` or `common/` directory.** It has no dependency rule, so everything ends up in it.
  `platform/core/` is the same idea with a rule attached: it may depend on nothing.
- **A `lib/` for the curriculum model.** The curriculum is the domain, not a library. Naming it a
  library invites treating it as reusable, and there is nothing to reuse it in.

---

## 7. The drift this document is designed against

Recorded because the lesson is borrowed rather than earned, and borrowing it is cheaper than
repeating it.

On the project this structure was generalised from, the repository grew and its structure document
did not, so within two days that document was false in four ways: it named the wrong entry point,
counted the wrong number of root directories, listed three documentation subdirectories when five
existed, and put the cross-cutting tests in a directory three configuration files were not keyed to.

None of it broke a build, which is the point. A structure document is read by whoever is deciding
where a new file goes, and a wrong one sends them somewhere the tooling does not expect: the same
failure as a rule with no tool behind it, arriving from the opposite direction.

The countermeasure is the status block at the top and the `*` marks in §2. **This is the target, `*`
marks what exists, and the two claims are not allowed to be made by the same sentence.**

---

## 8. Done when

The scaffold exists, a deliberate violation of the layering rule fails the build, a deliberate
violation of the content rule fails a different check, and a content file with no source field fails
a third.
