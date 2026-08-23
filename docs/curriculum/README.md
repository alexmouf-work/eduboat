# docs/curriculum

**What this is.** The specification of what Eduboat teaches: which terms, in what order, to what
standard, and how coverage is proved. It is the brief every lesson is written against.

**Who it is for.** The principal, who owns its scope, and any agent about to write a lesson.

## The standing document

[`syllabus.md`](syllabus.md) is the whole specification: 106 terms across 12 modules, supplied by the
principal on 23 August 2026, with the dependency between modules made explicit and the worked
examples each module owes named individually.

## What belongs here

- **The syllabus**, and any future revision of it.
- **Scope decisions** — what was proposed, what was accepted, what was rejected and why. The ten
  proposals in `syllabus.md` §15 are the current open set.
- **Teaching-order reasoning** — why a module sits where it does, when the answer is not obvious from
  the dependency table.

## What does not

- **The lessons themselves.** They are the taught material and live in `content/`, which does not
  exist yet. This directory specifies them; it does not contain them.
- **How the site renders a lesson** — `docs/architecture/`.
- **The voice a lesson is written in** — [`../charter/teaching-copy-style.md`](../charter/teaching-copy-style.md).
- **The rules a taught claim is held to** — [`../charter/CHARTER.md`](../charter/CHARTER.md) §4.9.

## The rules this directory is held to

1. **Scope is the principal's, never an agent's.** Charter §6.3 makes adding to or removing from the
   syllabus a mandatory stop-and-ask. An agent that notices a gap writes it into the proposals
   section and stops.
2. **The syllabus is a specification, and it is tested as one.** Every module named here exists in the
   content tree and every content module appears here; drift in either direction fails a content
   test. That test does not exist yet, and charter §5.2 records the obligation rather than implying
   the control.
3. **Every worked example a module owes is named here individually.** A lesson that quietly ships
   without its calculation has failed an obligation someone can point at.
4. **No time-to-build figures.** Sequence and dependency are the useful facts.
