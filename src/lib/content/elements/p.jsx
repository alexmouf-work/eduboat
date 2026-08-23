// <p> — structural paragraph. Renders its children (text + inline interactive
// elements like <text-gap>) inline, in reading flow.

export const name = 'p'
export const structural = true

// Editor-preview placeholder for an empty paragraph (never stored in the XML; see
// ContentBody's `authoring` flag). Lets the author see a paragraph slot without
// typed text — matching the form-field placeholder.
const PLACEHOLDER = 'Type your question or prompt here…'

export function Renderer({ node, renderChildren, authoring }) {
  const empty = !(node.children || []).some(
    (c) => (c.type === 'text' && c.text.trim()) || c.type === 'element'
  )
  if (authoring && empty) {
    return <p className="font-body italic text-bone-100/25 leading-relaxed mb-3">{PLACEHOLDER}</p>
  }
  return (
    <p className="font-body text-bone-100/90 leading-relaxed mb-3">
      {renderChildren(node.children)}
    </p>
  )
}
