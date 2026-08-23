// <tickbox sub-id="…" marks="…"> — interactive multi-select. Like `choice` but any
// number of <option> children may be correct (correct="true"), and the student may
// tick several. Answer value = array of selected indices.
//
// Marking (§2.2 "negative per wrong tick, floored at 0"): each correct tick earns,
// each wrong tick subtracts, then the per-question total is floored at 0 —
// raw = (correctTicked − wrongTicked) / totalCorrect, clamped to [0, 1]. This
// stops "tick everything" from scoring. Formula is centralised here; adjust freely.

import { inlineMarkupOf, hasInlineContent } from '../inline'

function options(node) {
  return node.children.filter((c) => c.type === 'element' && c.name === 'option')
}

export const name = 'tickbox'
export const structural = false

export function blankValue() { return [] }

export function Renderer({ node, value, onChange, disabled, authoring, review, renderChildren }) {
  const opts = options(node)
  const sel = Array.isArray(value) ? value : []
  const toggle = (i) => {
    onChange(sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i].sort((a, b) => a - b))
  }
  return (
    <div className="space-y-2 mt-1" role="group">
      {opts.map((opt, i) => {
        const checked = sel.includes(i)
        const correct = opt.attrs.correct === 'true'
        // In review (#20): correct options green; a wrongly-ticked option red.
        const cls = review
          ? (correct ? 'bg-axon/15 border-axon text-bone-50'
            : checked ? 'bg-myelin/15 border-myelin text-bone-50'
            : 'bg-neural-800 border-neural-700 text-bone-100/55')
          : (checked ? 'bg-synapse/15 border-synapse text-bone-50'
            : 'bg-neural-800 border-neural-600 text-bone-100/70 hover:border-neural-500')
        const boxCls = review
          ? (correct ? 'bg-axon border-axon text-neural-900' : checked ? 'bg-myelin border-myelin text-neural-900' : 'border-neural-500')
          : (checked ? 'bg-synapse border-synapse text-neural-900' : 'border-neural-500')
        return (
          <button
            key={i}
            type="button"
            role="checkbox"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => toggle(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border font-body transition-colors disabled:cursor-not-allowed flex items-center gap-3 ${cls}`}
          >
            <span className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border text-xs shrink-0 ${boxCls}`} aria-hidden="true">
              {review ? (correct ? '✓' : checked ? '✗' : '') : (checked ? '✓' : '')}
            </span>
            {!hasInlineContent(opt.children) && authoring ? <span className="italic text-bone-100/30">{correct ? 'A correct option' : 'A distractor'}</span> : <span className="flex-1">{renderChildren(opt.children)}</span>}
          </button>
        )
      })}
    </div>
  )
}

// Pure scorer. Correct set = options marked correct inline, or — when redacted for
// summative — `keyEntry.correct` (array of indices). Returns fractional `partial`.
export function score(node, value, keyEntry) {
  const opts = options(node)
  let correctSet = opts.map((o, i) => (o.attrs.correct === 'true' ? i : -1)).filter((i) => i >= 0)
  if (correctSet.length === 0 && keyEntry && Array.isArray(keyEntry.correct)) correctSet = keyEntry.correct
  const sel = Array.isArray(value) ? value : []
  const total = correctSet.length
  if (total === 0) return { correct: false }
  const right = sel.filter((i) => correctSet.includes(i)).length
  const wrong = sel.filter((i) => !correctSet.includes(i)).length
  const partial = Math.max(0, Math.min(1, (right - wrong) / total))
  return { correct: right === total && wrong === 0, partial }
}

// The correct options' labels, joined (for review).
export function solution(node, keyEntry) {
  const opts = options(node)
  let set = opts.map((o, i) => (o.attrs.correct === 'true' ? i : -1)).filter((i) => i >= 0)
  if (set.length === 0 && keyEntry && Array.isArray(keyEntry.correct)) set = keyEntry.correct
  const labels = set.map((i) => inlineMarkupOf(opts[i].children)).filter(Boolean)
  return labels.length ? labels.join(', ') : null
}
