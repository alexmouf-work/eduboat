// <reorder sub-id="…" marks="…"> with <item> children — interactive. The items
// are authored in the CORRECT order and shuffled for display; the user arranges
// them. Value = an array of original indices in the user's current order.
// Per-position credit (§2.4): partial = fraction of items in their right place.
//
// v1 uses up/down controls (reliable + keyboard-accessible). Pointer-drag is a
// polish pass via the shared drag primitive (with this as one consumer) — G4/G5.

import { useEffect, useState } from 'react'
import Sortable from '../../../components/Sortable'
import { inlineMarkupOf } from '../inline'

function items(node) {
  return node.children.filter((c) => c.type === 'element' && c.name === 'item')
}
function shuffled(n) {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  // Avoid handing back the already-correct order for small lists.
  if (n > 1 && a.every((v, i) => v === i)) return shuffled(n)
  return a
}

export const name = 'reorder'
export const structural = false

export function blankValue() { return null }   // order is set on mount

export function Renderer({ node, value, onChange, disabled, renderChildren }) {
  const its = items(node)
  const n = its.length
  // Local order, initialised shuffled synchronously (no flash of the answer);
  // synced up to the parent on mount + every move.
  const [order, setOrder] = useState(() =>
    Array.isArray(value) && value.length === n ? value : shuffled(n)
  )
  useEffect(() => {
    if (!Array.isArray(value) || value.length !== n) onChange(order)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function reorderTo(from, to) {
    if (disabled) return
    const next = [...order]
    const [x] = next.splice(from, 1)
    next.splice(to, 0, x)
    setOrder(next)
    onChange(next)
  }

  const row = (origIdx, pos) => (
    <>
      <span className="font-mono text-xs text-bone-100/30 w-5 text-right">{pos + 1}.</span>
      <span className="flex-1 font-body text-bone-100/85">{renderChildren(its[origIdx].children)}</span>
    </>
  )

  if (disabled) {
    return (
      <div className="space-y-2 mt-1">
        {order.map((origIdx, pos) => (
          <div key={origIdx} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-neural-600 bg-neural-800">{row(origIdx, pos)}</div>
        ))}
      </div>
    )
  }
  // Drag to reorder (#3) — the whole row is the handle (touch-friendly via Sortable).
  return (
    <Sortable ids={order.map(String)} onReorder={reorderTo} className="space-y-2 mt-1">
      {(id, pos, { handleProps, dragging }) => (
        <div {...handleProps} className={`flex items-center gap-3 px-3 py-2 rounded-lg border bg-neural-800 cursor-grab active:cursor-grabbing touch-none select-none transition-colors ${dragging ? 'border-synapse' : 'border-neural-600 hover:border-neural-500'}`}>
          <span className="text-bone-100/40 leading-none" aria-hidden="true">⠿</span>
          {row(order[pos], pos)}
        </div>
      )}
    </Sortable>
  )
}

export function score(node, value) {
  const n = items(node).length
  if (!Array.isArray(value)) return { correct: false, partial: 0 }
  let right = 0
  for (let pos = 0; pos < n; pos++) if (value[pos] === pos) right++   // correct order = [0..n-1]
  return { correct: right === n, partial: n ? right / n : 0 }
}

// The authored (correct) order's labels, for review.
export function solution(node) {
  const its = items(node)
  return its.length ? its.map((it) => inlineMarkupOf(it.children)).join(' → ') : null
}
