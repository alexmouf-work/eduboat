// Learn mode: flip cards over the terms themselves. Front — the term (and its
// photo, so the visual association forms before the answer appears). Flip — the
// definition, plus the full form for abbreviations. Then self-mark: "Knew it"
// moves the term up the same Leitner strength the quiz feeds, "Still learning"
// moves it down, so the tracker and quiz selection see learn sessions too.
//
// The flip is a real 3D card turn. The two faces are stacked in one grid cell
// (not absolutely positioned) so the card takes the natural height of its taller
// face and never clips a long definition.

import { useState } from 'react'
import { MODULES } from '../data/terms.js'

const MODULE_NAME = new Map(MODULES.map((m) => [m.id, m.name]))

export default function Learn({ cards, onMark, onFinish, onAbort }) {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const term = cards[idx]
  if (!term) return null
  const last = idx === cards.length - 1

  function mark(knewIt) {
    onMark(term, knewIt)
    if (last) {
      onFinish()
      return
    }
    setIdx(idx + 1)
    setFlipped(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onAbort}
          className="text-sm font-mono text-bone-100/40 hover:text-bone-100/70 transition-colors"
        >
          ← quit
        </button>
        <div className="font-mono text-sm text-bone-100/50">
          {idx + 1} / {cards.length}
        </div>
      </div>

      <div className="h-1 rounded bg-neural-700 mb-8">
        <div
          className="h-1 rounded bg-synapse transition-all"
          style={{ width: `${((idx + (flipped ? 1 : 0)) / cards.length) * 100}%` }}
        />
      </div>

      <div style={{ perspective: '1200px' }}>
        <div
          className="grid transition-transform duration-300 [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
        >
          {/* Front: the term. Tap anywhere on it to flip. */}
          <button
            type="button"
            onClick={() => setFlipped(true)}
            disabled={flipped}
            className="[grid-area:1/1] [backface-visibility:hidden] w-full rounded-xl border border-neural-700 bg-neural-800 p-6 sm:p-8 min-h-[16rem] flex flex-col items-center justify-center gap-4 cursor-pointer"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-bone-100/40">
              {MODULE_NAME.get(term.mod)}
            </span>
            {term.img && (
              <img
                src={term.img}
                alt={term.imgAlt || ''}
                className="rounded-lg max-h-48 w-auto max-w-full"
              />
            )}
            <span className="text-2xl sm:text-3xl font-bold text-bone-50 text-center leading-tight">
              {term.term}
            </span>
            <span className="font-mono text-xs text-bone-100/35">tap to flip</span>
          </button>

          {/* Back: the definition. */}
          <div
            className="[grid-area:1/1] [backface-visibility:hidden] rounded-xl border border-synapse/50 bg-neural-800 p-6 sm:p-8 min-h-[16rem] flex flex-col items-center justify-center gap-3 text-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <span className="text-lg font-bold text-bone-50">{term.term}</span>
            {term.expand && (
              <span className="font-mono text-sm text-synapse">{term.expand}</span>
            )}
            <p className="font-body text-bone-100/85 leading-relaxed max-w-prose">{term.def}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {flipped ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => mark(false)}
              className="flex-1 py-3 rounded-lg border border-myelin/60 text-myelin font-semibold hover:bg-myelin/10 transition-colors"
            >
              Still learning
            </button>
            <button
              type="button"
              onClick={() => mark(true)}
              className="flex-1 py-3 rounded-lg border border-axon/60 text-axon font-semibold hover:bg-axon/10 transition-colors"
            >
              Knew it
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="w-full py-3 rounded-lg border border-synapse text-synapse font-semibold hover:bg-synapse/10 transition-colors"
          >
            Flip
          </button>
        )}
      </div>
    </div>
  )
}
