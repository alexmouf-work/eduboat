// Auto-generated questions, built from src/data/terms.js at load time. Three shapes:
//   t2d  — "What does {term} mean?"        choice over 4 definitions
//   d2t  — "Which term matches: {def}?"    choice over 4 term names
//   abbr — "Write {term} out in full."     written, fuzzy-matched (abbreviations only)
// Every generated item carries the term's photo when it has one, and an explanation
// ("{term} — {def}") so review always restates the whole card. Distractors are drawn
// from the SAME module first (the confusable neighbours), topped up from the full list.
//
// Output shape matches the hand bank: { id, termIds, xml, weight }.

import { TERMS } from './terms.js'

// XML-escape plain text (the engine parses real XML; definitions carry & and quotes).
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function shuffle(a) {
  const out = [...a]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const DISTRACTOR_COUNT = 3

// Distractors for a term: same-module first, topped up from everywhere else.
function distractorsFor(term) {
  const sameModule = TERMS.filter((t) => t.id !== term.id && t.mod === term.mod)
  const rest = TERMS.filter((t) => t.id !== term.id && t.mod !== term.mod)
  const pool = [...shuffle(sameModule), ...shuffle(rest)]
  return pool.slice(0, DISTRACTOR_COUNT)
}

function imageXml(term) {
  if (!term.img) return ''
  return `<image src="${esc(term.img)}" alt="${esc(term.imgAlt || '')}" width="420"/>`
}

function choiceXml({ id, prompt, img, options, explanation, termIds }) {
  const opts = options
    .map((o) => `<option${o.correct ? ' correct="true"' : ''}>${esc(o.text)}</option>`)
    .join('')
  const xml =
    `<question id="${esc(id)}">` +
    `<body>${img}<p>${esc(prompt)}</p><choice sub-id="a">${opts}</choice></body>` +
    `<explanation>${esc(explanation)}</explanation>` +
    `</question>`
  return { id, termIds, xml, weight: 1 }
}

function termToDef(term) {
  const wrong = distractorsFor(term)
  const options = shuffle([
    { text: term.def, correct: true },
    ...wrong.map((t) => ({ text: t.def, correct: false })),
  ])
  return choiceXml({
    id: `t2d-${term.id}`,
    prompt: `What does “${term.term}” mean?`,
    img: imageXml(term),
    options,
    explanation: `${term.term} — ${term.def}`,
    termIds: [term.id],
  })
}

function defToTerm(term) {
  const wrong = distractorsFor(term)
  const options = shuffle([
    { text: term.term, correct: true },
    ...wrong.map((t) => ({ text: t.term, correct: false })),
  ])
  return choiceXml({
    id: `d2t-${term.id}`,
    prompt: `Which term is this? “${term.def}”`,
    img: imageXml(term),
    options,
    explanation: `${term.term} — ${term.def}`,
    termIds: [term.id],
  })
}

// "Write it out in full" for abbreviation terms. Fuzzy match tolerates small typos;
// extra accepted spellings can be added per-term here if one turns out too strict.
function abbrWritten(term) {
  const xml =
    `<question id="abbr-${esc(term.id)}">` +
    `<body>${imageXml(term)}<p>Write out in full: what does “${esc(term.term)}” stand for?</p>` +
    `<written sub-id="a" multiline="false" placeholder="Write the full form…"/></body>` +
    `<key><answer sub-id="a" match="fuzzy"><accept>${esc(term.expand)}</accept></answer></key>` +
    `<explanation>${esc(`${term.term} — ${term.expand}. ${term.def}`)}</explanation>` +
    `</question>`
  return { id: `abbr-${term.id}`, termIds: [term.id], xml, weight: 1 }
}

/** Build the full auto-generated pool (fresh shuffles each call). */
export function generatedQuestions() {
  const out = []
  for (const term of TERMS) {
    out.push(termToDef(term))
    out.push(defToTerm(term))
    if (term.expand) out.push(abbrWritten(term))
  }
  return out
}
