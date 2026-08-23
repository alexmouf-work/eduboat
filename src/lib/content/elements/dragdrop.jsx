// <dragdrop sub-id="…" marks="…"> — interactive fill-in-the-gap from a chip bank
// (the plan's draggable/dropzone, consolidated into one self-contained element).
// Children:
//   <segment>text</segment>  literal text in the flow
//   <drop id="g1" answer="o1"/>  a gap (answer = the correct chip id; redacted for summative)
//   <bank><chip id="o1">label</chip>…</bank>  the pool
// Value = { [dropId]: chipId } under the element's single sub-id. Per-gap credit.
//
// True drag-and-drop (HTML5 DnD): drag a chip from the bank into a gap; drag a placed
// chip to another gap or back to the bank; click a placed chip to remove it.
//
// Tap-to-place (the touch path): HTML5 DnD does not fire on touchscreens, so the same
// moves are also reachable by taps — tap a bank chip to pick it up (tap again to put it
// down), tap a gap to place it; tapping a filled gap still clears it.

import { useState } from 'react'
import InlineMarkup from '../InlineMarkup'
import { inlineMarkupOf } from '../inline'

// Segments + chip labels are kept as INLINE MARKUP ($…$ for maths), not flattened to plain text,
// so inline KaTeX (e.g. ion notation Na⁺ / Ca²⁺) renders inside the gaps + chips via InlineMarkup
// instead of being dropped (a text-only join discards <katex> element children).
function parse(node) {
  const flow = []   // [{ kind:'text', text } | { kind:'drop', id }]
  let chips = []
  const drops = []  // [{ id, answer }]
  for (const c of node.children) {
    if (c.type !== 'element') continue
    if (c.name === 'segment') flow.push({ kind: 'text', text: inlineMarkupOf(c.children) })
    else if (c.name === 'drop') {
      drops.push({ id: c.attrs.id, answer: c.attrs.answer })
      flow.push({ kind: 'drop', id: c.attrs.id })
    } else if (c.name === 'bank') {
      chips = c.children
        .filter((x) => x.type === 'element' && x.name === 'chip')
        .map((x) => ({ id: x.attrs.id, label: inlineMarkupOf(x.children) }))
    }
  }
  return { flow, chips, drops }
}

export const name = 'dragdrop'
export const structural = false

export function blankValue() { return {} }

export function Renderer({ node, value, onChange, disabled, review }) {
  const { flow, chips, drops } = parse(node)
  const placements = value || {}
  const chipById = Object.fromEntries(chips.map((c) => [c.id, c]))
  const labelOf = (id) => (chipById[id]?.label || '').trim()
  const answerByDrop = Object.fromEntries(drops.map((d) => [d.id, d.answer]))
  // A chip can fill many gaps (#reuse) when the author marks it so OR — and this is the auto case —
  // when some answer LABEL is needed by more gaps than there are chips carrying it (otherwise those
  // gaps could never all be filled, which read as "can't use the same chip twice").
  const chipsPerLabel = {}
  for (const c of chips) { const L = (c.label || '').trim(); chipsPerLabel[L] = (chipsPerLabel[L] || 0) + 1 }
  const needPerLabel = {}
  for (const d of drops) { const L = labelOf(d.answer); needPerLabel[L] = (needPerLabel[L] || 0) + 1 }
  const reuse = node.attrs.reuse === 'true' || Object.keys(needPerLabel).some((L) => needPerLabel[L] > (chipsPerLabel[L] || 0))
  const placedIds = new Set(Object.values(placements))
  const bank = reuse ? chips : chips.filter((c) => !placedIds.has(c.id))
  const [overGap, setOverGap] = useState(null)
  const [heldChip, setHeldChip] = useState(null) // tap-to-place: the picked-up bank chip id

  // A bank chip carries `chip:<id>`; a placed chip carries `gap:<dropId>` so it can be
  // moved between gaps or back to the bank without affecting other gaps (matters in
  // reuse mode, where the same chip id sits in several gaps).
  const placeChip = (dropId, chipId) => {
    if (disabled || !chipId) return
    const next = { ...placements }
    if (!reuse) for (const k of Object.keys(next)) if (next[k] === chipId) delete next[k]   // one gap per chip
    next[dropId] = chipId
    setHeldChip(null)
    onChange(next)
  }
  const moveGap = (dropId, fromGap) => {
    if (disabled || fromGap === dropId) return
    const next = { ...placements }
    const chipId = next[fromGap]
    if (chipId == null) return
    delete next[fromGap]
    next[dropId] = chipId
    onChange(next)
  }
  const clearGap = (dropId) => { if (!disabled) { const next = { ...placements }; delete next[dropId]; onChange(next) } }

  // Gap colour: in review, green if the placed chip's text matches the answer, red if
  // wrong (#review — not all in synapse/yellow); otherwise the normal filled/empty look.
  const gapClass = (id) => {
    const placed = placements[id]
    if (review && placed != null) {
      return labelOf(placed) === labelOf(answerByDrop[id])
        ? 'bg-axon/15 border-axon text-bone-50'
        : 'bg-myelin/15 border-myelin text-bone-50'
    }
    if (placed != null) return 'bg-synapse/15 border-synapse text-bone-50'
    if (overGap === id) return 'bg-synapse/10 border-synapse'
    return 'bg-neural-900 border-dashed border-synapse/40 text-bone-100/30'
  }

  return (
    <div className="mt-1">
      <p className="font-body text-bone-100/85 leading-loose">
        {flow.map((f, i) =>
          f.kind === 'text' ? (
            <span key={i}><InlineMarkup text={f.text} /></span>
          ) : (
            <span
              key={i}
              onDragOver={(e) => { if (!disabled) { e.preventDefault(); setOverGap(f.id) } }}
              onDragLeave={() => setOverGap((g) => (g === f.id ? null : g))}
              onDrop={(e) => {
                e.preventDefault(); setOverGap(null)
                const d = e.dataTransfer.getData('text/plain')
                if (d.startsWith('gap:')) moveGap(f.id, d.slice(4))
                else if (d.startsWith('chip:')) placeChip(f.id, d.slice(5))
              }}
              onClick={() => { if (heldChip != null && !placements[f.id]) placeChip(f.id, heldChip) }}
              className={`inline-flex items-center justify-center align-middle mx-1 px-2 py-1.5 rounded border-b-2 font-mono text-sm min-w-[4rem] min-h-[2.5rem] transition-colors ${heldChip != null && !placements[f.id] && !disabled ? 'cursor-pointer' : ''} ${gapClass(f.id)}`}
            >
              {placements[f.id] ? (
                <span
                  draggable={!disabled}
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', 'gap:' + f.id)}
                  onClick={() => clearGap(f.id)}
                  title={disabled ? undefined : 'Drag to move, or tap to remove'}
                  className={disabled ? '' : 'cursor-grab active:cursor-grabbing'}
                >
                  <InlineMarkup text={chipById[placements[f.id]]?.label ?? '?'} />
                </span>
              ) : ' '}
            </span>
          )
        )}
      </p>
      <div
        className="flex flex-wrap gap-2 mt-3 min-h-[2.75rem] rounded-lg border border-dashed border-neural-700 p-2"
        onDragOver={(e) => { if (!disabled) e.preventDefault() }}
        onDrop={(e) => { e.preventDefault(); if (disabled) return; const d = e.dataTransfer.getData('text/plain'); if (d.startsWith('gap:')) clearGap(d.slice(4)) }}
      >
        {bank.length === 0 ? (
          <span className="font-mono text-xs text-bone-100/30">drag a chip into a gap above</span>
        ) : (
          bank.map((c) => (
            <button
              key={c.id}
              type="button"
              draggable={!disabled}
              disabled={disabled}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', 'chip:' + c.id)}
              onClick={() => setHeldChip((h) => (h === c.id ? null : c.id))}
              className={`px-3 py-1.5 rounded-lg border font-mono text-sm transition-colors ${
                heldChip === c.id
                  ? 'bg-synapse/15 border-synapse text-bone-50'
                  : 'bg-neural-800 border-neural-600 text-bone-100/70 hover:border-neural-500'
              } ${disabled ? '' : 'cursor-grab active:cursor-grabbing'}`}
            >
              <InlineMarkup text={c.label} />
            </button>
          ))
        )}
        {heldChip != null && !disabled && (
          <span className="font-mono text-xs text-bone-100/40 self-center">now tap a gap</span>
        )}
      </div>
    </div>
  )
}

export function score(node, value) {
  const { drops, chips } = parse(node)
  // Match by LABEL, not chip id, so that when several chips share the same text any
  // of them counts as the correct fill for a gap that expects that text.
  const labelOf = Object.fromEntries(chips.map((c) => [c.id, (c.label || '').trim()]))
  const v = value || {}
  let right = 0
  for (const d of drops) {
    const placed = v[d.id]
    if (placed != null && labelOf[placed] != null && labelOf[placed] === labelOf[d.answer]) right++
  }
  return {
    correct: drops.length > 0 && right === drops.length,
    partial: drops.length ? right / drops.length : 0,
  }
}

// The flow with each gap filled by its correct chip label, for review.
export function solution(node) {
  const { flow, chips, drops } = parse(node)
  const chipById = Object.fromEntries(chips.map((c) => [c.id, c]))
  const byDrop = Object.fromEntries(drops.map((d) => [d.id, d.answer]))
  const filled = flow
    .map((f) => (f.kind === 'text' ? f.text : `[${chipById[byDrop[f.id]]?.label ?? '?'}]`))
    .join('')
  return filled.trim() || null
}
