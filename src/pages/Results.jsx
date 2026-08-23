// The results screen: the score, then every question with the terms it moved.

import { TERM_BY_ID } from '../data/terms.js'

export default function Results({ outcomes, onHome }) {
  const total = outcomes.length
  const right = outcomes.filter((o) => o.correct).length
  const pct = total ? Math.round((right / total) * 100) : 0

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <div className="text-5xl font-mono text-bone-50">{pct}%</div>
        <p className="mt-2 text-bone-100/60 font-body">
          {right} of {total} correct
        </p>
      </header>

      <div className="rounded-xl border border-neural-700 bg-neural-800 divide-y divide-neural-700 mb-8">
        {outcomes.map((o, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <span className={`font-mono text-sm pt-0.5 ${o.correct ? 'text-axon' : 'text-myelin'}`}>
              {o.correct ? '✓' : '✗'}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-body text-bone-100/85">
                {(o.termIds || [])
                  .map((id) => TERM_BY_ID.get(id)?.term)
                  .filter(Boolean)
                  .join(' · ')}
              </div>
              {o.total > 1 && (
                <div className="text-xs font-mono text-bone-100/40 mt-0.5">
                  {o.earned} / {o.total} marks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onHome}
        className="w-full py-3 rounded-lg bg-synapse text-neural-900 font-semibold hover:bg-synapse/90 transition-colors"
      >
        Back to start
      </button>
    </div>
  )
}
