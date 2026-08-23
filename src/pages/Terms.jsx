// The term tracker: every term, by module, with its definition and its strength.
// This is the "which terms do I know" view — and the revision read-through.

import { useState } from 'react'
import { bucketOf, strengthOf, seenOf, STRENGTH_MAX, clearProgress } from '../lib/progress.js'

const BUCKET_STYLE = {
  new: 'text-bone-100/40 border-neural-600',
  learning: 'text-synapse border-synapse/60',
  known: 'text-axon border-axon/60',
  strong: 'text-axon border-axon',
}
const BUCKET_LABEL = { new: 'new', learning: 'learning', known: 'known', strong: 'strong' }

export default function Terms({ progress, modules, terms, onHome, onProgressCleared }) {
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <button
          type="button"
          onClick={onHome}
          className="text-sm font-mono text-bone-100/40 hover:text-bone-100/70 transition-colors"
        >
          ← home
        </button>
        <h1 className="text-xl font-bold text-bone-50">Term tracker</h1>
        <span className="w-14" />
      </div>

      {modules.map((m) => {
        const list = terms.filter((t) => t.mod === m.id)
        return (
          <section key={m.id} className="mb-8">
            <h2 className="text-sm font-mono uppercase tracking-widest text-bone-100/50 mb-3">
              {m.n}. {m.name}
            </h2>
            <div className="rounded-xl border border-neural-700 bg-neural-800 divide-y divide-neural-700">
              {list.map((t) => {
                const bucket = bucketOf(progress, t.id)
                return (
                  <div key={t.id} className="px-4 py-3 flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-body text-bone-50">{t.term}</div>
                      <div className="text-sm text-bone-100/55 font-body leading-snug mt-0.5">{t.def}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded border ${BUCKET_STYLE[bucket]}`}>
                        {BUCKET_LABEL[bucket]}
                      </span>
                      {seenOf(progress, t.id) > 0 && (
                        <Meter value={strengthOf(progress, t.id)} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      <div className="mt-4 mb-10 text-right">
        {confirmReset ? (
          <span className="text-sm font-body text-bone-100/70">
            Wipe all progress?{' '}
            <button
              type="button"
              className="text-myelin font-semibold"
              onClick={() => {
                clearProgress()
                onProgressCleared()
                setConfirmReset(false)
              }}
            >
              Yes, wipe it
            </button>{' '}
            ·{' '}
            <button type="button" className="text-bone-100/60" onClick={() => setConfirmReset(false)}>
              Keep it
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-xs font-mono text-bone-100/30 hover:text-myelin transition-colors"
          >
            reset progress
          </button>
        )}
      </div>
    </div>
  )
}

function Meter({ value }) {
  return (
    <div className="flex gap-0.5" aria-label={`strength ${value} of ${STRENGTH_MAX}`}>
      {Array.from({ length: STRENGTH_MAX }, (_, i) => (
        <span
          key={i}
          className={`inline-block w-2 h-1.5 rounded-sm ${i < value ? 'bg-axon' : 'bg-neural-600'}`}
        />
      ))}
    </div>
  )
}
