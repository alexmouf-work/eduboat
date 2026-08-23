// Per-term progress, kept in localStorage — the app's only durable state.
// Leitner-light: strength 0–5 per term; a correct answer moves every term the
// question trains up one, a wrong answer moves them down one. Buckets:
//   new       never answered
//   learning  strength 0–2 (answered, not yet reliable)
//   known     strength 3–4
//   strong    strength 5
//
// Every read/write is wrapped: storage can be absent or full, and the app must
// still run (with progress simply not persisting) rather than crash.

const KEY = 'eduboat.progress.v1'
export const STRENGTH_MAX = 5
const KNOWN_AT = 3

/** Load the progress map { [termId]: { s, seen, right } }. Never throws. */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/** Persist the map. Never throws; a failed write just means no persistence. */
export function saveProgress(progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    // Storage unavailable (private mode, quota) — the session still works in memory.
  }
}

/** Record one answered question: move each trained term up or down one step.
 *  Returns a NEW map (the caller owns state). */
export function recordAnswer(progress, termIds, correct) {
  const next = { ...progress }
  for (const id of termIds || []) {
    const cur = next[id] || { s: 0, seen: 0, right: 0 }
    next[id] = {
      s: Math.max(0, Math.min(STRENGTH_MAX, cur.s + (correct ? 1 : -1))),
      seen: cur.seen + 1,
      right: cur.right + (correct ? 1 : 0),
    }
  }
  return next
}

export function strengthOf(progress, termId) {
  return progress[termId] ? progress[termId].s : 0
}

export function seenOf(progress, termId) {
  return progress[termId] ? progress[termId].seen : 0
}

/** Bucket name for one term. */
export function bucketOf(progress, termId) {
  const p = progress[termId]
  if (!p || p.seen === 0) return 'new'
  if (p.s >= STRENGTH_MAX) return 'strong'
  if (p.s >= KNOWN_AT) return 'known'
  return 'learning'
}

/** Tallies across a term list: { new, learning, known, strong }. */
export function bucketCounts(progress, terms) {
  const counts = { new: 0, learning: 0, known: 0, strong: 0 }
  for (const t of terms) counts[bucketOf(progress, t.id)] += 1
  return counts
}

/** Wipe stored progress (the reset control). */
export function clearProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to do — absent storage means nothing stored.
  }
}
