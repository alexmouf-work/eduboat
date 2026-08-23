// Eduboat — one screen at a time: home → quiz → results, plus the term tracker.
// A view-state machine, no router: three views and no URLs anyone needs to share.
// Progress lives here (loaded once from localStorage, written through on change)
// so every view reads one source of truth.

import { useMemo, useState } from 'react'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import Learn from './pages/Learn.jsx'
import Results from './pages/Results.jsx'
import Terms from './pages/Terms.jsx'
import { buildPool, drawQuiz, drawLearnTerms, toItem } from './lib/quiz.js'
import { loadProgress, saveProgress, recordAnswer } from './lib/progress.js'
import { MODULES, TERMS } from './data/terms.js'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'quiz' | 'learn' | 'results' | 'terms'
  const [progress, setProgress] = useState(loadProgress)
  const [quizItems, setQuizItems] = useState([])
  const [learnCards, setLearnCards] = useState([])
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

  // Learn mode draws terms, not questions — same length and module controls.
  function startLearn(length, moduleId) {
    const list = moduleId ? TERMS.filter((t) => t.mod === moduleId) : TERMS
    const drawn = drawLearnTerms(list, progress, length)
    if (drawn.length === 0) {
      setQuizError('no terms matched the selection')
      return
    }
    setLearnCards(drawn)
    setOutcomes([])
    setQuizError(null)
    setView('learn')
  }

  // One flip card self-marked: same strength move as a graded question.
  function handleMarked(term, knewIt) {
    const next = recordAnswer(progress, [term.id], knewIt)
    setProgress(next)
    saveProgress(next)
    setOutcomes((o) => [
      ...o,
      { id: `card-${term.id}`, termIds: [term.id], correct: knewIt, earned: knewIt ? 1 : 0, total: 1 },
    ])
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
    if (view === 'learn') {
      return (
        <Learn
          cards={learnCards}
          onMark={handleMarked}
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
    return <Home {...shared} onStart={startQuiz} onLearn={startLearn} onTerms={() => setView('terms')} error={quizError} />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, quizItems, learnCards, outcomes, progress, quizError])

  return <div className="min-h-full bg-neural-900">{body}</div>
}
