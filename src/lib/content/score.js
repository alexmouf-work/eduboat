// LEMMA content scorer (a slice of G5). Walks a parsed item's body, finds the
// interactive elements (a `sub-id` + a `score` export), calls each element's pure
// scorer against the student's answer + that sub-id's <key> entry, and aggregates
// marks. `needsMarking` propagates for open answers (match="ai"/"manual").
//
// Used BOTH client-side (casual/practice review display) AND server-side: the
// authoritative grader (api/grade.js) calls the SAME functions — so the integrity grade
// is the same code, never a re-implementation. The element registry is ALWAYS injected
// via `getEl` (the browser passes the full React registry; the server a pure-scorer
// lookup) — score.js does NOT statically import ./registry, so it never drags the
// browser-coupled renderers (mathlive touches `window` at import, katex pulls fonts,
// openchemlib is a heavy WASM bundle) into the Node grade function's bundle. That static
// import previously crashed api/grade.js at load → FUNCTION_INVOCATION_FAILED.

function walk(nodes, fn) {
  for (const n of nodes || []) {
    if (n.type === 'element') { fn(n); walk(n.children, fn) }
  }
}

/** Score one parsed item against its answer map { [subId]: value }.
 *  @param {Function} getEl element lookup (name → module with `score`/`solution`),
 *    INJECTED by the caller (browser: full registry; server: pure-scorer lookup). */
export function scoreItem(item, answers, getEl) {
  const a = answers || {}
  const key = item.key || {}
  const results = []
  let earned = 0
  let total = 0
  walk(item.body, (node) => {
    const el = getEl(node.name)
    const subId = node.attrs['sub-id']
    if (!el || !el.score || subId == null) return
    const marks = Number(node.attrs.marks) || 1
    const keyEntry = key[subId]
    const r = el.score(node, a[subId], keyEntry) || {}
    const got = r.correct ? marks : (typeof r.partial === 'number' ? r.partial * marks : 0)
    earned += got
    total += marks
    results.push({
      subId, name: node.name, marks, earned: got,
      correct: !!r.correct, partial: r.partial, needsMarking: !!r.needsMarking,
      // For review (client-side / casual; redacted server-side for summative, §8):
      solution: el.solution ? el.solution(node, keyEntry) : undefined,
      explanation: keyEntry?.explanation,
    })
  })
  return {
    earned,
    total,
    correct: total > 0 && earned === total,
    needsMarking: results.some((r) => r.needsMarking),
    results,
    explanation: item.explanation,
  }
}

/** Score a whole quiz: items[] against { [itemId]: answerMap }.
 *  @param {Function} getEl element lookup, injected by the caller (see scoreItem). */
export function scoreQuiz(items, answersByItem, getEl) {
  const by = answersByItem || {}
  let earned = 0
  let total = 0
  // F16: a question with NO interactive elements bears no marks (total 0). Omit it from
  // the graded set entirely — never show a misleading "0/0 ✗", and don't let a content /
  // instruction item dilute the score. The runner's per-item review is keyed by id, so a
  // dropped item simply renders without a mark badge; the server grader shares this code,
  // so client + server stay consistent (analytics already drops 0-total items).
  const perItem = []
  for (const item of (items || [])) {
    const s = scoreItem(item, by[item.id], getEl)
    if (s.total <= 0) continue
    earned += s.earned
    total += s.total
    perItem.push({
      id: item.id, earned: s.earned, total: s.total, correct: s.correct,
      needsMarking: s.needsMarking, results: s.results, explanation: s.explanation,
    })
  }
  return { earned, total, perItem }
}
