// <choice sub-id="…" marks="…"> — interactive single-select (MCQ). Options are
// <option> children; the correct one is marked inline (correct="true") — or, for
// summative, redacted out and held in the <key>. Answer value = selected index.
//
// (Multi-select → `tickbox` with negative-marking-floored-at-0 is a later element.)

import { inlineMarkupOf, hasInlineContent } from '../inline'

function options(node) {
  return node.children.filter(c => c.type === 'element' && c.name === 'option')
}

export const name = 'choice'
export const structural = false

export function blankValue() { return null }

export function Renderer({ node, value, onChange, disabled, authoring, review, renderChildren }) {
  const opts = options(node)
  return (
    <div className="space-y-2 mt-1" role="radiogroup">
      {opts.map((opt, i) => {
        const selected = value === i
        const correct = opt.attrs.correct === 'true'
        const empty = !hasInlineContent(opt.children)
        // In review (#20): correct option green, the student's wrong pick red.
        const cls = review
          ? (correct ? 'bg-axon/15 border-axon text-bone-50'
            : selected ? 'bg-myelin/15 border-myelin text-bone-50'
            : 'bg-neural-800 border-neural-700 text-bone-100/55')
          : (selected ? 'bg-synapse/15 border-synapse text-bone-50'
            : 'bg-neural-800 border-neural-600 text-bone-100/70 hover:border-neural-500')
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border font-body transition-colors disabled:cursor-not-allowed flex items-center gap-2 ${cls}`}
          >
            {review && <span className="font-mono text-sm flex-shrink-0" style={{ color: correct ? '#5fb37a' : selected ? '#e07a5f' : 'transparent' }}>{correct ? '✓' : selected ? '✗' : '·'}</span>}
            <span className="flex-1">{empty && authoring ? <span className="italic text-bone-100/30">{correct ? 'Correct answer' : 'Answer option'}</span> : renderChildren(opt.children)}</span>
          </button>
        )
      })}
    </div>
  )
}

// Pure scorer (used once grading lands, G5/G8). Correct index = the option marked
// correct inline, or — when redacted for summative — from the key entry.
export function score(node, value, keyEntry) {
  const opts = options(node)
  let correctIdx = opts.findIndex(o => o.attrs.correct === 'true')
  if (correctIdx < 0 && keyEntry && Number.isInteger(keyEntry.correct)) correctIdx = keyEntry.correct
  return { correct: value === correctIdx }
}

// The correct option's label (for review) — inline correct, or key-supplied index.
export function solution(node, keyEntry) {
  const opts = options(node)
  let idx = opts.findIndex((o) => o.attrs.correct === 'true')
  if (idx < 0 && keyEntry && Number.isInteger(keyEntry.correct)) idx = keyEntry.correct
  return idx >= 0 ? inlineMarkupOf(opts[idx].children) : null
}
