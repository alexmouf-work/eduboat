// LEMMA document renderer (G3). Walks a parsed content body (Node[] from
// parse.js) and renders it: text nodes as text, structural elements via their
// Renderer (recursing children), interactive elements via their Renderer wired to
// the per-`sub-id` answer. The caller stores answers as a { [subId]: value } map
// per item (the quiz runner holds one such map per question).
//
// This is the constant consumer-agnostic renderer — the quiz runner and (later)
// learn mode both mount it; only the surrounding behaviour differs.

import { getElement } from './registry'

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

// An "interactive part" at the top level is either a block-level interactive
// element (choice, numeric, …) or a paragraph carrying inline gaps (FITG). These
// are exactly the blocks that get an auto sub-id, so the part letters line up with
// the sub-id scheme (a, b, c, …).
function isInteractivePart(n) {
  if (!n || n.type !== 'element') return false
  const el = getElement(n.name)
  if (el && !el.structural) return true
  return (n.children || []).some((c) => c.type === 'element' && c.name === 'text-gap')
}

// `authoring` (editor preview only) lets structural renderers show muted filler
// for empty fields — the filler is a *placeholder*, never stored in the XML.
export default function ContentBody({ body, answers, onAnswer, disabled, authoring, review, reviewResults }) {
  const nodes = body || []
  // Top level is block elements (real text lives inside <p>); space them out so
  // consecutive elements never crowd. Whitespace text between blocks is dropped; a
  // rare text-only body falls back to rendering its nodes as-is.
  const hasBlocks = nodes.some((n) => n.type === 'element')
  const shown = hasBlocks ? nodes.filter((n) => n.type === 'element') : nodes

  // When a question has more than one interactive part, prefix each with a part
  // label (a, b, c, …) so multi-part questions read as "a) … b) …". Single-part
  // questions (the encouraged shape) are unlabelled.
  const partCount = shown.filter(isInteractivePart).length
  let part = 0

  return (
    <div className="space-y-4">
      {shown.map((node, i) => {
        const child = <ContentNode node={node} answers={answers} onAnswer={onAnswer} disabled={disabled} authoring={authoring} review={review} reviewResults={reviewResults} />
        if (partCount > 1 && isInteractivePart(node)) {
          const label = ALPHA[part++] || String(part)
          return (
            <div key={i} className="flex gap-2.5">
              <span className="font-mono text-sm font-semibold text-synapse/80 select-none pt-0.5 flex-shrink-0">{label})</span>
              <div className="flex-1 min-w-0">{child}</div>
            </div>
          )
        }
        return <div key={i}>{child}</div>
      })}
    </div>
  )
}

function ContentNode({ node, answers, onAnswer, disabled, authoring, review, reviewResults }) {
  if (node.type === 'text') return node.text

  const el = getElement(node.name)
  if (!el) {
    // The AUTHORING editor surfaces the diagnostic so authors catch a bad tag; everywhere else
    // (live / review) a malformed atom degrades to its inner content (e.g. a loose <option> shows
    // its text) rather than a jarring "[unknown element: …]" error.
    if (authoring) return <span className="font-mono text-xs text-myelin/70">[unknown element: {node.name}]</span>
    return (node.children || []).map((c, i) => (
      <ContentNode key={i} node={c} answers={answers} onAnswer={onAnswer} disabled={disabled} authoring={authoring} review={review} reviewResults={reviewResults} />
    ))
  }

  const subId = node.attrs['sub-id']
  const renderChildren = (children) =>
    (children || []).map((c, i) => (
      <ContentNode key={i} node={c} answers={answers} onAnswer={onAnswer} disabled={disabled} authoring={authoring} review={review} reviewResults={reviewResults} />
    ))

  const Renderer = el.Renderer
  // The authoritative server per-field correctness (when present) — text-gap / written colour the
  // field green/red from it in review; elements that derive their own (choice/dragdrop) ignore it.
  const reviewCorrect = review && reviewResults && subId != null ? reviewResults[subId] : undefined
  return (
    <Renderer
      node={node}
      renderChildren={renderChildren}
      value={subId != null ? (answers ? answers[subId] : undefined) : undefined}
      onChange={subId != null ? (v) => onAnswer(subId, v) : undefined}
      disabled={disabled}
      authoring={authoring}
      review={review}
      reviewCorrect={reviewCorrect}
    />
  )
}
