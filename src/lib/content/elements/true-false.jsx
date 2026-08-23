// <true-false sub-id="…" marks="…" answer="true|false"/> — interactive. Two
// buttons; value = boolean. Correct value is `answer` inline (or in the key,
// redacted for summative).

export const name = 'true-false'
export const structural = false

export function blankValue() { return null }

export function Renderer({ node, value, onChange, disabled, review }) {
  const answer = node.attrs.answer === 'true' || node.attrs.answer === true
  const opts = [{ label: 'True', val: true }, { label: 'False', val: false }]
  return (
    <div className="flex gap-3 mt-1" role="radiogroup">
      {opts.map((o) => {
        const selected = value === o.val
        const correct = o.val === answer
        // In review (#20): the correct value green, a wrong pick red.
        const cls = review
          ? (correct ? 'bg-axon/15 border-axon text-bone-50'
            : selected ? 'bg-myelin/15 border-myelin text-bone-50'
            : 'bg-neural-800 border-neural-700 text-bone-100/55')
          : (selected ? 'bg-synapse/15 border-synapse text-bone-50'
            : 'bg-neural-800 border-neural-600 text-bone-100/70 hover:border-neural-500')
        return (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(o.val)}
            className={`px-6 py-3 rounded-lg border font-mono text-sm uppercase tracking-widest transition-colors disabled:cursor-not-allowed ${cls}`}
          >
            {review && (correct ? '✓ ' : selected ? '✗ ' : '')}{o.label}
          </button>
        )
      })}
    </div>
  )
}

export function score(node, value, keyEntry) {
  let correct = node.attrs.answer
  if (correct == null && keyEntry) correct = keyEntry.answer
  return { correct: value === (correct === 'true' || correct === true) }
}

// 'True' / 'False' for review.
export function solution(node, keyEntry) {
  let c = node.attrs.answer
  if (c == null && keyEntry) c = keyEntry.answer
  if (c == null) return null
  return c === 'true' || c === true ? 'True' : 'False'
}
