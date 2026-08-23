// Runtime helpers for inline node trees (option/item labels). `inlineMarkupOf`
// serialises children back to authoring markup ($…$ for maths, text otherwise) so a
// review string (an answer key / solution) can be re-rendered with InlineMarkup —
// keeping inline KaTeX intact instead of dropping it the way a text-only join would.
// `hasInlineContent` is the empty-check the authoring placeholders use.

export function inlineMarkupOf(nodes) {
  return (nodes || []).map((c) => {
    if (c.type === 'text') return c.text || ''
    if (c.name === 'katex' || c.name === 'm') {
      const tex = (c.children || []).map((x) => (x.type === 'text' ? x.text : '')).join('')
      return tex ? `$${tex}$` : ''
    }
    return inlineMarkupOf(c.children)   // unwrap format tags (b/i/u/…) to their inner markup
  }).join('')
}

export function hasInlineContent(nodes) {
  return (nodes || []).some((c) => (c.type === 'text' ? !!c.text.trim() : true))
}
