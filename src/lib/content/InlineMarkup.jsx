// Render an inline-markup STRING — explanations, per-answer notes, answer-key
// solutions — with inline KaTeX (`$…$`) and the text-format tags (`<b>`, `<highlight>`,
// …). These are stored as the author's markup string (not a parsed tree), so we run
// the same `escInline` conversion the body uses (`$…$`→`<m>`, format tags preserved,
// everything else escaped), parse the result, and render each node through its element
// Renderer. Plain prose with no markup just renders as text; bad markup degrades to the
// raw string. Non-interactive, so no answer wiring.

import { useMemo } from 'react'
import { escInline } from './authoring/xml'
import { domToNode } from './parse'
import { getElement } from './registry'

function parseInline(markup) {
  if (markup == null || markup === '') return []
  const xml = `<x>${escInline(String(markup))}</x>`
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  if (doc.querySelector('parsererror')) return [{ type: 'text', text: String(markup) }]
  return Array.from(doc.documentElement.childNodes).map(domToNode).filter(Boolean)
}

function Node({ node }) {
  if (node.type === 'text') return node.text
  const el = getElement(node.name)
  const renderChildren = (children) => (children || []).map((c, i) => <Node key={i} node={c} />)
  if (!el || !el.Renderer) return renderChildren(node.children)   // unknown tag → just its text
  const R = el.Renderer
  return <R node={node} renderChildren={renderChildren} review authoring={false} />
}

export default function InlineMarkup({ text, className }) {
  const nodes = useMemo(() => parseInline(text), [text])
  if (!nodes.length) return null
  return <span className={className}>{nodes.map((n, i) => <Node key={i} node={n} />)}</span>
}
