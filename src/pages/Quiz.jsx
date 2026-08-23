// The quiz runner: one question at a time. Answer → Check (grades client-side,
// shows the review colours + explanation, moves term strength) → Next.
// Grading reuses the harvested engine's scoreItem with the full element registry.

import { useState } from 'react'
import ContentBody from '../lib/content/ContentBody.jsx'
import { getElement } from '../lib/content/registry.js'
import { scoreItem } from '../lib/content/score.js'
import { TERM_BY_ID } from '../data/terms.js'

export default function Quiz({ items, onGraded, onFinish, onAbort }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null) // scoreItem result once checked

  const item = items[idx]
  if (!item) return null
  const last = idx === items.length - 1

  function check() {
    const score = scoreItem(item, answers, getElement)
    setResult(score)
    onGraded(item, score)
  }

  function next() {
    if (last) {
      onFinish()
      return
    }
    setIdx(idx + 1)
    setAnswers({})
    setResult(null)
  }

  // Per-sub-id correctness for the review tinting of text fields.
  const reviewResults = result
    ? Object.fromEntries(result.results.map((r) => [r.subId, r.correct]))
    : undefined

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onAbort}
          className="text-sm font-mono text-bone-100/40 hover:text-bone-100/70 transition-colors"
        >
          ← quit
        </button>
        <div className="font-mono text-sm text-bone-100/50">
          {idx + 1} / {items.length}
        </div>
      </div>

      <div className="h-1 rounded bg-neural-700 mb-8">
        <div
          className="h-1 rounded bg-synapse transition-all"
          style={{ width: `${((idx + (result ? 1 : 0)) / items.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-neural-700 bg-neural-800 p-6">
        <ContentBody
          body={item.body}
          answers={answers}
          onAnswer={(subId, v) => setAnswers((a) => ({ ...a, [subId]: v }))}
          disabled={!!result}
          review={!!result}
          reviewResults={reviewResults}
        />

        {result && (
          <div className="mt-5 border-t border-neural-700 pt-4">
            <div className={`font-mono text-sm mb-2 ${result.correct ? 'text-axon' : 'text-myelin'}`}>
              {result.correct
                ? 'Correct'
                : result.earned > 0
                  ? `Partly right — ${result.earned} of ${result.total}`
                  : 'Not this time'}
            </div>
            {!result.correct && <Solutions results={result.results} />}
            {result.explanation && (
              <p className="text-sm text-bone-100/75 font-body leading-relaxed">{result.explanation}</p>
            )}
            <TermsTouched termIds={item.termIds} />
          </div>
        )}
      </div>

      <div className="mt-6">
        {result ? (
          <button
            type="button"
            onClick={next}
            className="w-full py-3 rounded-lg bg-synapse text-neural-900 font-semibold hover:bg-synapse/90 transition-colors"
          >
            {last ? 'Finish' : 'Next'}
          </button>
        ) : (
          <button
            type="button"
            onClick={check}
            className="w-full py-3 rounded-lg border border-synapse text-synapse font-semibold hover:bg-synapse/10 transition-colors"
          >
            Check
          </button>
        )}
      </div>
    </div>
  )
}

// The correct answer(s) for the parts got wrong, from each element's own solution().
function Solutions({ results }) {
  const wrong = results.filter((r) => !r.correct && r.solution)
  if (wrong.length === 0) return null
  return (
    <div className="mb-2">
      {wrong.map((r) => (
        <div key={r.subId} className="text-sm font-body text-bone-100/75">
          <span className="text-bone-100/45">Answer: </span>
          <span className="text-axon">{r.solution}</span>
        </div>
      ))}
    </div>
  )
}

function TermsTouched({ termIds }) {
  const names = (termIds || []).map((id) => TERM_BY_ID.get(id)?.term).filter(Boolean)
  if (names.length === 0) return null
  return (
    <div className="mt-3 text-xs font-mono text-bone-100/35">trains: {names.join(' · ')}</div>
  )
}
