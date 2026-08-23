# docs/architecture

**What this is.** How the built system works: its structure, its content pipeline, and the register of
every dependency it carries.

**Status: empty, and honestly so.** Nothing has been built. No stack is chosen (E004) and no scaffold
exists (E005), so there is no architecture to describe. This README exists to state that rather than
to leave a directory whose emptiness reads as an oversight.

**Who it is for.** Anyone joining the build, and the principal when a decision made months earlier
needs recovering.

## What will belong here

- **The content pipeline** — how a file in `content/` becomes a validated term in the domain, where
  the sourcing and confidence fields are enforced, and what happens when one is missing.
- **The layering and its enforcement** — the import rules, the checks that hold them, and what those
  checks cannot see.
- **`dependencies.md`** — one row per dependency, naming what it does, why the platform cannot, who
  approved it and when. Charter DP2 makes CI fail if a dependency has no row or a row has no
  dependency.

## What does not

- **What the site teaches** — `docs/curriculum/`, and the material itself in `content/`.
- **Plans for work not yet done** — `docs/planning/`. A plan describes intent; this describes what
  exists.

## The rule this directory is held to

**It never claims a control the code does not implement.** Charter Tier 0, and `OVERVIEW.md` §6
defect class 10. This is the failure that stops anyone looking, so where something is designed but not
built, the sentence describing it says so.

**It is never behind the code.** Charter §5.3: a change that moves the architecture updates this
directory in the same commit.
