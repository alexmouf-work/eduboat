// Question-bank selfcheck: parse EVERY question (hand bank + generated) in Node
// and lint its structure. Run by `npm run selfcheck`; any defect exits non-zero.
// Checks per question:
//   - XML parses through the same parser the app uses
//   - at least one interactive element with a sub-id
//   - choice: exactly one correct option, >= 3 options
//   - tickbox: at least one correct option
//   - written / text-gap: a model or an accepted answer exists to grade against
//   - numeric: a finite model
//   - dragdrop: every drop's answer names a chip in the bank
//   - every <image src> exists under public/
//   - an explanation is present (review must always teach)

import { DOMParser } from 'linkedom'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { parseItem } from '../src/lib/content/parse.js'
import { BANK } from '../src/data/bank.js'
import { generatedQuestions } from '../src/data/autogen.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const INTERACTIVE = new Set([
  'choice', 'tickbox', 'text-gap', 'true-false', 'numeric', 'written', 'reorder', 'dragdrop',
])

const problems = []
const flag = (id, msg) => problems.push(`${id}: ${msg}`)

function walk(nodes, fn) {
  for (const n of nodes || []) {
    if (n.type === 'element') {
      fn(n)
      walk(n.children, fn)
    }
  }
}

function checkQuestion(q) {
  let item
  try {
    item = parseItem(q.xml, { DOMParser })
  } catch (err) {
    flag(q.id, `does not parse — ${err.message}`)
    return
  }
  if (!Array.isArray(q.termIds) || q.termIds.length === 0) flag(q.id, 'no termIds')
  if (!item.explanation) flag(q.id, 'no explanation')

  let interactive = 0
  walk(item.body, (n) => {
    if (!INTERACTIVE.has(n.name)) return
    interactive += 1
    const subId = n.attrs['sub-id']
    if (subId == null) flag(q.id, `<${n.name}> has no sub-id`)

    if (n.name === 'choice') {
      const opts = n.children.filter((c) => c.type === 'element' && c.name === 'option')
      const correct = opts.filter((o) => o.attrs.correct === 'true')
      if (opts.length < 3) flag(q.id, `choice has only ${opts.length} options`)
      if (correct.length !== 1) flag(q.id, `choice has ${correct.length} correct options`)
    }
    if (n.name === 'tickbox') {
      const opts = n.children.filter((c) => c.type === 'element' && c.name === 'option')
      if (!opts.some((o) => o.attrs.correct === 'true')) flag(q.id, 'tickbox has no correct option')
    }
    if (n.name === 'numeric') {
      if (!Number.isFinite(Number(n.attrs.model))) flag(q.id, 'numeric model is not a number')
    }
    if (n.name === 'text-gap' || n.name === 'written') {
      const key = item.key[subId]
      const graded = n.attrs.model || (key && key.accepted && key.accepted.length)
      if (!graded) flag(q.id, `<${n.name}> has neither model nor accepted answers`)
    }
    if (n.name === 'reorder') {
      const its = n.children.filter((c) => c.type === 'element' && c.name === 'item')
      if (its.length < 3) flag(q.id, `reorder has only ${its.length} items`)
    }
    if (n.name === 'dragdrop') {
      const chips = []
      const drops = []
      walk([n], (m) => {
        if (m.name === 'chip') chips.push(m.attrs.id)
        if (m.name === 'drop') drops.push(m.attrs.answer)
      })
      for (const a of drops) if (!chips.includes(a)) flag(q.id, `drop answer "${a}" has no chip`)
      if (drops.length === 0) flag(q.id, 'dragdrop has no drops')
    }
    if (n.name === 'image') flag(q.id, 'image is inside an interactive element')
  })
  walk(item.body, (n) => {
    if (n.name === 'image') {
      const src = n.attrs.src || ''
      if (!existsSync(join(root, 'public', src))) flag(q.id, `image missing: ${src}`)
    }
  })
  if (interactive === 0) flag(q.id, 'no interactive element — the question bears no marks')
}

const bank = BANK
const generated = generatedQuestions()
const all = [...bank, ...generated]

const ids = new Set()
for (const q of all) {
  if (ids.has(q.id)) flag(q.id, 'duplicate question id')
  ids.add(q.id)
  checkQuestion(q)
}

console.log(`checked ${all.length} questions (${bank.length} hand-authored, ${generated.length} generated)`)
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`)
  for (const p of problems) console.error('  - ' + p)
  process.exit(1)
}
console.log('all clean')
