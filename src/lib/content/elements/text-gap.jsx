// <text-gap model="…" sub-id="…" marks="…"/> — interactive, inline. A typed blank
// in the reading flow. `model` is the canonical/best answer and also sizes the
// field (model length + 2; overridable via `width`). Summative redaction strips
// the model text and normalises width so length doesn't leak (§8). Extra accepted
// answers + match mode live in the <key> (§2.3).

import { matchAnswer } from '../match.js'

export const name = 'text-gap'
export const structural = false

export function blankValue() { return '' }

export function Renderer({ node, value, onChange, disabled, review, reviewCorrect }) {
  const model = node.attrs.model || ''
  const width = Number(node.attrs.width) || Math.max(4, model.length + 2)
  // In review, colour the gap itself green/red (#review) from the server's per-field result, with a
  // local exact-match fallback when no server result was supplied.
  const ok = review
    ? (reviewCorrect != null ? reviewCorrect : (model && String(value ?? '').trim().toLowerCase() === model.trim().toLowerCase()))
    : null
  const reviewCls = review
    ? (ok ? 'bg-axon/15 border-axon text-bone-50' : 'bg-myelin/15 border-myelin text-bone-50')
    : 'bg-neural-900 border-synapse/40 focus:border-synapse text-bone-50'
  return (
    <input
      type="text"
      value={value ?? ''}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      size={width}
      aria-label="fill in the blank"
      className={`inline-block mx-1 px-2 py-0.5 align-baseline border-b-2 font-mono text-sm rounded-sm outline-none disabled:opacity-100 ${reviewCls}`}
      placeholder="…"
    />
  )
}

// Pure scorer. Accepts the inline `model` plus any extra accepted answers from the
// key entry; match mode ('exact' | 'fuzzy') comes from the key (default exact).
export function score(node, value, keyEntry) {
  const accepted = [node.attrs.model, ...((keyEntry && keyEntry.accepted) || [])]
  const mode = (keyEntry && keyEntry.match) || 'exact'
  return { correct: matchAnswer(value, accepted, mode) }
}

// The model answer (+ any extra accepted), for review.
export function solution(node, keyEntry) {
  const accepted = [node.attrs.model, ...((keyEntry && keyEntry.accepted) || [])].filter(Boolean)
  if (!accepted.length) return null
  return accepted.length > 1 ? `${accepted[0]} (also: ${accepted.slice(1).join(', ')})` : accepted[0]
}
