// Quiz assembly: pool the hand bank + generated questions, weight them by how
// weak their terms are, and draw a quiz of the requested length.
//
// Weighting: a question's urgency is driven by its WEAKEST term (min strength),
// so anything untouched or recently missed comes up first; its authored `weight`
// (hand questions carry 2, generated 1) multiplies in. One question per term per
// quiz where the pool allows it, so a 10-question quiz touches ~10 terms rather
// than drilling one.

import { parseItem } from './content/parse.js'
import { generatedQuestions } from '../data/autogen.js'
import { BANK } from '../data/bank.js'
import { strengthOf, STRENGTH_MAX } from './progress.js'

export const QUIZ_LENGTHS = [10, 15, 25]
const POOL_DRAW_MAX = 10_000 // hard bound on selection loop iterations

/** The full question pool (fresh generation each call — option order reshuffles). */
export function buildPool(moduleFilter) {
  const all = [...BANK, ...generatedQuestions()]
  if (!moduleFilter) return all
  return all.filter((q) => q.termIds.some((id) => moduleFilter.has(id)))
}

function urgency(q, progress) {
  const weakest = Math.min(...q.termIds.map((id) => strengthOf(progress, id)))
  // Strength 0 → 6 … strength 5 → 1: everything stays drawable, weak dominates.
  return (STRENGTH_MAX + 1 - weakest) * (q.weight || 1)
}

/** Weighted draw of `count` questions from the pool, soft-deduplicated by term. */
export function drawQuiz(pool, progress, count) {
  const candidates = pool.map((q) => ({ q, w: urgency(q, progress) }))
  const picked = []
  const usedTerms = new Set()
  const usedIds = new Set()
  let guard = 0

  while (picked.length < count && guard < POOL_DRAW_MAX) {
    guard += 1
    // Prefer questions whose terms are all unseen this quiz; relax if exhausted.
    let live = candidates.filter(
      (c) => !usedIds.has(c.q.id) && !c.q.termIds.some((id) => usedTerms.has(id)),
    )
    if (live.length === 0) live = candidates.filter((c) => !usedIds.has(c.q.id))
    if (live.length === 0) break

    const total = live.reduce((s, c) => s + c.w, 0)
    let roll = Math.random() * total
    let chosen = live[live.length - 1]
    for (const c of live) {
      roll -= c.w
      if (roll <= 0) {
        chosen = c
        break
      }
    }
    picked.push(chosen.q)
    usedIds.add(chosen.q.id)
    for (const id of chosen.q.termIds) usedTerms.add(id)
  }
  return picked
}

/** Parse a drawn question into a runtime item. Throws on malformed XML —
 *  a bad question must fail loudly at assembly, not render half a quiz. */
export function toItem(question) {
  const item = parseItem(question.xml)
  return { ...item, id: question.id, termIds: question.termIds }
}

/** Weighted draw of `count` TERMS for learn mode (flip cards) — same weakest-first
 *  weighting as the quiz, sampling terms directly rather than questions. */
export function drawLearnTerms(terms, progress, count) {
  const candidates = terms.map((t) => ({ t, w: STRENGTH_MAX + 1 - strengthOf(progress, t.id) }))
  const picked = []
  let guard = 0
  while (picked.length < count && candidates.length > 0 && guard < POOL_DRAW_MAX) {
    guard += 1
    const total = candidates.reduce((s, c) => s + c.w, 0)
    let roll = Math.random() * total
    let at = candidates.length - 1
    for (let i = 0; i < candidates.length; i++) {
      roll -= candidates[i].w
      if (roll <= 0) {
        at = i
        break
      }
    }
    picked.push(candidates[at].t)
    candidates.splice(at, 1)
  }
  return picked
}
