# Teaching copy style

**Status: in force, 23 August 2026.** The house standard for every word the site shows the learner:
lesson text, definitions, worked examples, navigation, headings, and the site's own error messages.

**Where it comes from.** Generalised from the `manifest` repository's public copy style, which was
derived from Gallagher Specialty's own _P&I Pre-Renewal Review 2025_ rather than invented. The
register survives the move intact, because both documents are addressed to the same industry.

**What changes, and it is the one thing that matters.** The source document forbids explaining
anything a broker would find obvious, on the reasoning that its reader is a professional peer. This
document is written for someone about to become that peer and who is not one yet. So the rule
inverts: **explain what a broker takes for granted, and never explain the language away.** The
learner is taught the assumption, in the words the desk uses, so that the next time they meet those
words without an explanation they understand them.

**This is not the charter's writing rules.** [`CHARTER.md`](CHARTER.md) §6.5 governs what an agent
writes back to the principal — reviews, findings, commit messages. This governs what the site says
to the learner. An agent drafting a lesson follows this document; the same agent reporting on that
work follows §6.5.

---

## 1. Voice

**Write as the desk, in the first person plural, where a voice is needed at all.** "We would call
that a firm offer." Most teaching copy needs no voice: it states what a term means and how it works,
and the sentence carries itself.

**State the position, then the reasoning.** A lesson opens with what the thing is and then earns it.
It never builds to a definition.

**Own a judgement as a judgement.** "Most dry cargo desks treat it this way" is a view, marked as a
view, and stronger for it than a hedge pretending to be a fact. Charter MT2 requires the mark; this
is what it sounds like in prose.

**Address the learner as a competent adult who does not yet have the vocabulary.** Nothing is
dumbed down, nothing is dressed up as simpler than it is, and nothing is withheld because it is
technical. The subject is technical.

---

## 2. Register

**Corporate, plain, unhurried.** Full sentences and real paragraphs. The reader is giving this their
attention, and copy that fidgets for it reads as though it has less to say.

**British English throughout:** organised, recognised, centre, licence as the noun. Draft and draught
both appear in the market; the site uses **draft** for the vessel measurement, consistently, and says
so once.

**No exclamation marks. No slang. No jokes.**

**Contractions are avoided.** Write "does not", not "doesn't".

**Never use an em dash. Not once, anywhere in the taught copy.** Where one is tempting, the sentence
wants a comma, a colon, a semicolon, a pair of brackets, or a full stop and a second sentence. This
is absolute, and it is the fastest single tell that copy was not written by a person at a firm like
this one. It binds the site's copy only; the repository's own documents, including this one, are
governed by charter §6.5 and use them freely.

**Market terms are used, not glossed away.** Laycan, ballast, subs, addcomm, deadfreight. A term is
introduced with its full form once, defined properly, and then used normally for the rest of the
site. Writing "the window during which the ship must arrive" every time instead of "laycan" teaches
the concept and withholds the word, which is the opposite of the point.

**Abbreviations expand on first use in a lesson, then stand alone.** "Notice of readiness (NOR)",
then NOR. The full form is repeated in each lesson that uses it, because lessons are read out of
order.

---

## 3. Structure

**Headings are short and set in capitals.** Two to four words: `LAYTIME AND DEMURRAGE`, `VOYAGE
CHARTER ECONOMICS`, `HOW A FIXTURE HAPPENS`. Capitals are applied by the stylesheet, so the
underlying text stays sentence case and remains searchable and screen-readable.

**Titles are plain noun phrases.** No leading article, no comma inversion, no participle doing the
work of a verb. "Laytime and demurrage", not "Understanding laytime". "Charter contract types", not
"The charter contracts, explained".

**Every lesson opens with a standfirst:** one sentence, before the body, saying what the lesson
concludes rather than what it will cover. "Laytime is the charterer's time allowance in port, and
demurrage is what they pay when it runs out."

**Teach in this order: what it is, who pays whom, what changes if it is wrong.** Charter MT3 requires
the mechanism; this is the shape it takes. The third part is what makes a term stick, because it is
the part that has consequences.

**Bullets carry terms, figures and enumerable facts, never argument.** A vessel class ladder, a set
of load line marks and a list of standard charterparty forms are bullets. Why a Capesize cannot
transit Panama is a paragraph.

**A worked example is set out in full and arrives at a number.** Every quantity carries its unit and
the arithmetic is shown, so the learner can reproduce it on paper. Charter MT4.

**Confidence is shown, not hidden.** Where a term varies, the lesson says what it varies with, in the
body text and not in a footnote.

---

## 4. Formatting

**Use only what a corporate Microsoft Word user uses, and uses often.** Headings, paragraphs, bold,
italic, bullet points, numbered lists and tables. That is the whole set.

**Do not use:** em dashes, code formatting, block quotations, horizontal rules inside a lesson,
nested bullets below one level, or any character a person cannot type without looking it up.

**A term, a figure or a vessel class is written plainly or in bold**, never in a monospaced box.
**WS 47.5** tells the learner they are looking at a rate they will quote. `WS 47.5` tells them they
are looking at a developer's artefact.

**Tables carry comparisons, not prose.** Vessel classes against deadweight ranges, load line marks
against their zones, charter types against who pays for what. A table with a paragraph in a cell is a
list of paragraphs wearing a grid.

---

## 5. Numbers

**Say the figure.** "82,000 dwt", "294.13 m by 32.31 m", "roughly 1.25%". Never "large", "typical" or
"about right" where a number exists.

**Carry the unit, in the form the market uses:** `dwt`, `cbm`, `TEU`, `m`, `kts`, `mt/day`, `USD/day`,
`USD/tonne`, `WS 47.5`, `1.25%`. The unit is not decoration here; it is half the lesson.

**Keep precision consistent within a table or a series**, and do not round one figure and not its
neighbour.

**Date a figure that moves.** Panama's draft limit, a Baltic index level and a bunker price are true
on a date and not otherwise. The sentence carries the date, or it does not carry the figure.

**Never quote a duration for work not yet done.** No timescales, no effort estimates, no "quick" or
"straightforward".

---

## 6. Honesty

**Never claim a control the system does not implement**, and never claim coverage the syllabus does
not have. Where a topic is listed but not yet written, the page says so.

**Say what a term does not mean, in the same breath as what it does.** Freight is not hire. Demurrage
is liquidated damages and not a penalty, which is why it is enforceable. A definition given without
its boundary is a definition the learner will over-apply.

**Attribute what is not ours.** Index definitions, charterparty forms, canal dimensions and
convention names carry their source, per charter MT1.

**A correction is visible.** When something taught is found to be wrong, the page says what it
previously said. Charter MT5.

---

## 7. What not to write

**No decorative metadata line under a title.** Three facts arranged to look considered. Put the date
where dates go.

**No sequence numbering as decoration** down the side of sections that have names already.

**No status chips or pills for words that belong in a sentence.** A small rounded badge reading
"Beginner" is interface jewellery.

**No breezy headings.** "Let us talk about laytime" is a blog talking to itself. `LAYTIME AND
DEMURRAGE` is what the thing is.

**No claim of ease.** "Simply", "just", "all you need to do", "it is really quite straightforward".
Nothing on this syllabus is straightforward, and telling the learner it is makes the moment they
struggle feel like their fault.

**No accounting headings over prose.** "What it buys" and "What it costs" set a ledger over a
paragraph and read as a pitch. Name the subject: "Who pays demurrage", "When laytime starts".

**No survival, battle or journey metaphors.** A learner is not "on a journey" and a concept is not
"unlocked". They are taught it, or they are not.

**No mnemonic that replaces the mechanism.** A rhyme for the load line marks is a way of remembering
an order the learner should understand instead. Where a mnemonic genuinely helps, it comes after the
explanation and never in place of it.

**No sentence built on an abstraction the reader has to unpack.** "Ton-mile demand is the true
measure of the market because it integrates distance into volume" asks the learner to hold three
ideas to reach one. "One tonne carried one mile is a ton-mile. If the same cargo has to go further,
the market needs more ships to move it, even though the tonnage has not changed."

**A rejected phrase stays rejected.** This list grows as corrections are made, and nothing on it
returns in a synonym.

---

## 8. Worked example

**Rejected.**

> ## Let us talk about demurrage
>
> **Eduboat · chartering · module 3**
>
> Demurrage is basically just a fine the charterer pays when they take too long in port! It is
> pretty straightforward once you get your head around it, and it is one of those things you will
> pick up quickly on the desk.

**In house style.**

> ## LAYTIME AND DEMURRAGE
>
> Laytime is the charterer's time allowance in port, and demurrage is what they pay when it runs
> out.
>
> ### THE TIME ALLOWANCE
>
> Under a voyage charter the owner is paid freight for carrying the cargo, and that freight assumes a
> certain amount of time in port for loading and discharging. That allowance is the laytime, and it
> is agreed in the fixture, in hours or in days, or as a rate of tonnes per day.
>
> The clock starts when the master tenders notice of readiness (NOR) and the turn time expires. Turn
> time is a grace period between the notice and the start of laytime, commonly six hours.
>
> ### WHO PAYS WHEN IT RUNS OUT
>
> Time used beyond the laytime is demurrage, paid by the charterer to the owner at a daily rate
> agreed in the fixture. It is liquidated damages rather than a penalty, which is what makes it
> enforceable: the parties agreed in advance what the owner's lost time is worth, so nobody has to
> prove the loss afterwards.
>
> Time saved is despatch, paid by the owner to the charterer. It is conventionally half the demurrage
> rate, though the charterparty sets it and some fixtures exclude despatch entirely.
>
> ### WHY THE ORDER MATTERS
>
> Once a ship is on demurrage she stays on demurrage. The exceptions that stop laytime running, such
> as bad weather or a holiday, no longer apply once the allowance is exhausted. This is the phrase
> you will hear on the desk: once on demurrage, always on demurrage.

**What the second one does that the first does not:** it defines the term before using it, names who
pays whom, gives the mechanism rather than a gloss, states the convention as a convention and names
what overrides it, and ends on the consequence. Every heading names its subject. There is no em dash
in it, and no sentence tells the learner it is easy.

---

## 9. The visual language this sits inside

**Not yet decided.** The design system is a ledger item (E006) and no tokens exist. Two constraints
are already set by this document and are not open:

**Flat.** No rounded corners, no drop shadows, no cards. Rules and whitespace separate things.

**Set in capitals by the stylesheet, never in the source text**, so headings stay searchable and
readable by a screen reader.
