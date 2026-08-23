// <numeric model="…" sub-id="…" marks="…" tolerance="…" unit="…"/> — interactive.
// A number input. `model` is the correct value; optional absolute `tolerance` and
// display `unit`. (The full maths engine — random variables, expression equality,
// KaTeX — is G7; this is the plain-number case.)

export const name = 'numeric'
export const structural = false

export function blankValue() { return '' }

export function Renderer({ node, value, onChange, disabled }) {
  const unit = node.attrs.unit
  return (
    <span className="inline-flex items-center gap-2 mt-1">
      <input
        type="text"
        inputMode="decimal"
        value={value ?? ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        size={10}
        aria-label="numeric answer"
        className="px-2 py-1 bg-neural-900 border-b-2 border-synapse/40 focus:border-synapse text-bone-50 font-mono text-sm rounded-sm outline-none disabled:opacity-60"
        placeholder="0"
      />
      {unit && <span className="font-mono text-sm text-bone-100/50">{unit}</span>}
    </span>
  )
}

export function score(node, value, keyEntry) {
  const model = Number(node.attrs.model)
  const tol = Number(node.attrs.tolerance ?? (keyEntry && keyEntry.tolerance) ?? 0)
  const got = Number(value)
  if (!Number.isFinite(got) || !Number.isFinite(model)) return { correct: false }
  return { correct: Math.abs(got - model) <= tol }
}

// The model value with unit + tolerance, for review.
export function solution(node, keyEntry) {
  const model = node.attrs.model
  if (model == null || model === '') return null
  const unit = node.attrs.unit ? ` ${node.attrs.unit}` : ''
  const tol = node.attrs.tolerance ?? (keyEntry && keyEntry.tolerance)
  return `${model}${unit}${tol ? ` (±${tol})` : ''}`
}
