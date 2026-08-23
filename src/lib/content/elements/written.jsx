// <written sub-id="…" marks="…" multiline="true" placeholder="…"/> — interactive
// free-text. A textarea (or single-line). Accepted answers + match mode live in
// the <key>; optional `model` is a sample/best answer (shown in review). Exact /
// fuzzy now; `match="ai"` marking (default-on for open answers) is wired at G5/G8.

import { matchAnswer } from '../match.js'

export const name = 'written'
export const structural = false

export function blankValue() { return '' }

export function Renderer({ node, value, onChange, disabled, review, reviewCorrect }) {
  const multiline = node.attrs.multiline !== 'false'   // default multiline
  const placeholder = node.attrs.placeholder || 'Type your answer…'
  // In review, tint the field green/red from the server's per-field result (#review).
  const reviewCls = review && reviewCorrect != null
    ? (reviewCorrect ? 'bg-axon/10 border-axon' : 'bg-myelin/10 border-myelin')
    : 'bg-neural-900 border-neural-600 focus:border-synapse'
  const common =
    `w-full mt-1 px-3 py-2 border rounded-lg text-bone-50 font-body outline-none disabled:opacity-100 ${reviewCls}`
  if (!multiline) {
    return (
      <input
        type="text"
        value={value ?? ''}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={common}
      />
    )
  }
  return (
    <textarea
      value={value ?? ''}
      disabled={disabled}
      placeholder={placeholder}
      rows={4}
      onChange={(e) => onChange(e.target.value)}
      className={`${common} resize-y`}
    />
  )
}

export function score(node, value, keyEntry) {
  // `match="ai"` (or manual) can't be auto-scored — flag for the marking workflow.
  if (keyEntry && (keyEntry.match === 'ai' || keyEntry.match === 'manual')) {
    return { correct: false, needsMarking: true }
  }
  const accepted = [node.attrs.model, ...((keyEntry && keyEntry.accepted) || [])]
  const mode = (keyEntry && keyEntry.match) || 'exact'
  return { correct: matchAnswer(value, accepted, mode) }
}

// Sample / accepted answer(s), for review. AI/manual often has no single answer.
export function solution(node, keyEntry) {
  const accepted = [node.attrs.model, ...((keyEntry && keyEntry.accepted) || [])].filter(Boolean)
  return accepted.length ? accepted.join(' / ') : null
}
