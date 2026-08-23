# Charter exceptions

**Empty. There are no exceptions in force.**

This is the only place an exception to [`CHARTER.md`](CHARTER.md) may be recorded. Not a code
comment, not a commit message, not a pull request thread. An exception that is not in this table
does not exist, and the rule it claims to suspend still applies.

## Format

One row per exception. A CI check parses this table and **fails the build when an exception is past
its expiry**, so the columns are load-bearing and the date format is fixed. That check does not
exist yet; it lands with the scaffold (E005), and until it does this table is enforced by review
alone, which is exactly the decay the charter's §3 warns about.

| ID  | Rule | Scope | Justification | Expires | Approved by |
| --- | ---- | ----- | ------------- | ------- | ----------- |

- **ID** — `X-001`, `X-002`, … Sequential, never reused. A removed exception keeps its number.
- **Rule** — the charter rule suspended, by its identifier: `EH3`, `AS1`, `MT1`, `§5.3`.
- **Scope** — the narrowest true scope: one file, or one directory. Never "the codebase".
- **Justification** — why, in one sentence.
- **Expires** — `YYYY-MM-DD`. Required. CI fails the day after.
- **Approved by** — the human who approved it. Not an agent.

A worked example of the shape, which is **not in force** and is not parsed, because the ID column of
a live row must match `X-<digits>` at the start of the line:

> `| X-001 | RM4 | src/ingest/content/tables.ts | The table grammar needs a backtracking pass; input is capped at 256 KB | 2026-11-30 | A. Moufarrige |`

## What justifies one

Only these:

- A platform or dependency limitation with no workaround.
- A measured performance requirement the rule makes unachievable — measured, not anticipated.

**Not** deadline pressure, not inconvenience, not unfamiliarity with the rule.

**And never MT1 or MT2.** An exception suspending the sourcing rule or the confidence rule is an
exception against directive 1, which is the promise the project exists to keep. Material that cannot
be sourced is not published; that is the whole of the remedy.

## What an exception is not

**Exceptions expire by construction.** One that needs to be permanent is an amendment request under
charter §7.2, not an exception — a permanent exception is a rule the charter will not admit it has,
and that is how a document starts lying about what the code does.

**Two exceptions against the same rule are evidence the rule is wrong.** The third is not granted;
the rule is re-examined instead.
