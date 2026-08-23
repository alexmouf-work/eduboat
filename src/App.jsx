// Eduboat — one screen at a time: home → quiz → results, plus the term tracker.
// A view-state machine, no router: three views and no URLs anyone needs to share.
// Progress lives here (loaded once from localStorage, written through on change)
// so every view reads one source of truth.

import { useMemo, useState } from 'react'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import Terms from './pages/Terms.jsx'
import { buildPool, drawQuiz, toItem } from './lib/quiz.js'
import { loadProgress, saveProgress, recordAnswer } from './lib/progress.js'
import { MODULES, TERMS } from './data/terms.js'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'quiz' | 'results' | 'terms'
  const [progress, setProgress] = useState(loadProgress)
  const [quizItems, setQuizItems] = useState([])
  const [outcomes, setOutcomes] = useState([]) // per answered question: { id, termIds, correct, earned, total }
  const [quizError, setQuizError] = useState(null)

  function startQuiz(length, moduleId) {
    const filter = moduleId
      ? new Set(TERMS.filter((t) => t.mod === moduleId).map((t) => t.id))
      : null
    try {
      const drawn = drawQuiz(buildPool(filter), progress, length)
      if (drawn.length === 0) throw new Error('no questions matched the selection')
      setQuizItems(drawn.map(toItem)) // throws on malformed XML: fail loudly, start nothing
      setOutcomes([])
      setQuizError(null)
      setView('quiz')
    } catch (err) {
      setQuizError(String(err && err.message ? err.message : err))
    }
  }

  // One question graded: move the trained terms, persist, and log the outcome.
  function handleGraded(item, score) {
    const next = recordAnswer(progress, item.termIds, score.correct)
    setProgress(next)
    saveProgress(next)
    setOutcomes((o) => [
      ...o,
      { id: item.id, termIds: item.termIds, correct: score.correct, earned: score.earned, total: score.total },
    ])
  }

  const shared = { progress, modules: MODULES, terms: TERMS }
  const body = useMemo(() => {
    if (view === 'quiz') {
      return (
        <Quiz
          items={quizItems}
          onGraded={handleGraded}
          onFinish={() => setView('results')}
          onAbort={() => setView('home')}
        />
      )
    }
    if (view === 'results') {
      return <Results outcomes={outcomes} {...shared} onHome={() => setView('home')} onAgain={() => setView('home')} />
    }
    if (view === 'terms') {
      return <Terms {...shared} onHome={() => setView('home')} onProgressCleared={() => setProgress({})} />
    }
    return <Home {...shared} onStart={startQuiz} onTerms={() => setView('terms')} error={quizError} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, quizItems, outcomes, progress, quizError])

  return <div className="min-h-full bg-neural-900">{body}</div>
}
