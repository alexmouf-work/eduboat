// The homepage: what you know so far, and the start-quiz controls
// (length + optional module focus).

import { useState } from 'react'
import { QUIZ_LENGTHS } from '../lib/quiz.js'
import { bucketCounts } from '../lib/progress.js'

export default function Home({ progress, modules, terms, onStart, onTerms, error }) {
  const [length, setLength] = useState(QUIZ_LENGTHS[1])
  const [moduleId, setModuleId] = useState('')
  const counts = bucketCounts(progress, terms)
  const knownTotal = counts.known + counts.strong

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-bone-50">Eduboat</h1>
        <p className="mt-2 text-bone-100/60 font-body">
          Shipping vocabulary for the Braemar desk — {terms.length} terms across {modules.length} modules.
        </p>
      </header>

      <section className="grid grid-cols-4 gap-3 mb-10">
        <Stat label="New" value={counts.new} tone="text-bone-100/60" />
        <Stat label="Learning" value={counts.learning} tone="text-synapse" />
        <Stat label="Known" value={counts.known} tone="text-axon" />
        <Stat label="Strong" value={counts.strong} tone="text-axon" />
      </section>

      <section className="rounded-xl border border-neural-700 bg-neural-800 p-6 mb-6">
        <h2 className="text-sm font-mono uppercase tracking-widest text-bone-100/50 mb-4">Start a quiz</h2>

        <div className="mb-4">
          <div className="text-sm text-bone-100/60 mb-2 font-body">Length</div>
          <div className="flex gap-2">
            {QUIZ_LENGTHS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setLength(n)}
                className={`px-5 py-2 rounded-lg border font-mono text-sm transition-colors ${
                  length === n
                    ? 'bg-synapse/15 border-synapse text-bone-50'
                    : 'bg-neural-900 border-neural-600 text-bone-100/70 hover:border-neural-500'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-bone-100/60 mb-2 font-body">Focus</div>
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-neural-900 border border-neural-600 text-bone-50 font-body outline-none focus:border-synapse"
          >
            <option value="">All modules</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.n}. {m.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => onStart(length, moduleId || null)}
          className="w-full py-3 rounded-lg bg-synapse text-neural-900 font-semibold hover:bg-synapse/90 transition-colors"
        >
          Start quiz
        </button>
        {error && (
          <p className="mt-3 text-sm text-myelin font-body">Could not start the quiz: {error}</p>
        )}
      </section>

      <button
        type="button"
        onClick={onTerms}
        className="w-full py-3 rounded-lg border border-neural-600 text-bone-100/80 hover:border-neural-500 font-body transition-colors"
      >
        Term tracker — {knownTotal} of {terms.length} known
      </button>
    </div>
  )
}

function Stat({ label, value, tone }) {
  return (
    <div className="rounded-lg border border-neural-700 bg-neural-800 px-3 py-3 text-center">
      <div className={`text-2xl font-mono ${tone}`}>{value}</div>
      <div className="text-xs uppercase tracking-widest text-bone-100/40 mt-1">{label}</div>
    </div>
  )
}
