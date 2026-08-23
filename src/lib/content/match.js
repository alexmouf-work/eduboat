// Text-answer matching for text elements (text-gap / written). Self-contained
// (the content engine doesn't depend on the legacy anatomy quizEngine).
//   'exact' — normalise (trim, lowercase, collapse whitespace) then compare.
//   'fuzzy' — allow small typos via Levenshtein (≤ 2 edits, or ≤ 20% of length).
//   'ai' / 'manual' — not matched here; handled by the marking workflow (G8).

export function normalize(s) {
  return (s || '').trim().toLowerCase().replace(/\s+/g, ' ')
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const cur = [i]
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[n]
}

export function fuzzyEqual(a, b) {
  const x = normalize(a)
  const y = normalize(b)
  if (x === y) return true
  if (!x || !y) return false
  const d = levenshtein(x, y)
  return d <= 2 || d <= Math.floor(Math.max(x.length, y.length) * 0.2)
}

/** Does `value` match any of `accepted` under `mode` ('exact' | 'fuzzy')? */
export function matchAnswer(value, accepted, mode = 'exact') {
  const acc = (accepted || []).filter(Boolean)
  if (mode === 'fuzzy') return acc.some((a) => fuzzyEqual(value, a))
  const v = normalize(value)
  return acc.some((a) => normalize(a) === v)
}
