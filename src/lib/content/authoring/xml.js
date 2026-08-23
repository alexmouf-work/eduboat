// XML serialization helpers for the form-builder (authoring → XML). The form edits
// a semantic block model; on save it serializes back to the same XML the content
// engine parses, so authored questions round-trip through one format (§6.4).

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Escape inline text while PRESERVING a whitelist of formatting tags (#26) and
// converting INLINE-MATHS delimiters (G7): <b> <i> <u> <highlight color> <color value>
// <size value> survive as tags; `$…$` becomes <m>…</m> (inline KaTeX); `\$` is a
// literal dollar. Everything else — stray < / > / & and any non-whitelisted tag — is
// escaped, so authored prose stays safe XML. Used by the text blocks instead of esc().
// `m` (inline maths) is whitelisted so a paragraph/option carrying maths stays form-
// representable; in the authoring *markup* it lives as `$…$`, never as a literal <m>.
export const FMT_TAGS = new Set(['b', 'i', 'u', 'highlight', 'color', 'size', 'katex', 'm'])
const FMT_ATTRS = new Set(['color', 'value'])
const TAG_RE = /^<(\/?)([a-zA-Z]+)((?:\s+[\w-]+="[^"]*")*)\s*>/

// Inverse of escInline for loading XML back into the markup string (fromNode): a parsed
// inline tree → markup. <katex> (or legacy <m>) → `$…$` (inline maths); a literal `$` in
// text → `\$` so it won't re-parse as a delimiter; format elements round-trip as tags.
export function inlineToText(children) {
  return (children || []).map((c) => {
    if (c.type === 'text') return (c.text || '').replace(/\$/g, '\\$')
    if (c.type === 'element' && (c.name === 'katex' || c.name === 'm')) {
      const tex = (c.children || []).map((x) => (x.type === 'text' ? x.text : '')).join('')
      return `$${tex}$`
    }
    if (c.type === 'element' && FMT_TAGS.has(c.name)) {
      const attrs = Object.entries(c.attrs || {}).map(([k, v]) => ` ${k}="${v}"`).join('')
      return `<${c.name}${attrs}>${inlineToText(c.children)}</${c.name}>`
    }
    return ''
  }).join('')
}

export function escInline(s) {
  const src = String(s ?? '')
  let out = ''
  let i = 0
  while (i < src.length) {
    const c = src[i]
    if (c === '\\' && src[i + 1] === '$') { out += '$'; i += 2; continue }   // \$ → literal dollar
    if (c === '$') {
      // Scan to the next unescaped $ — the content between is inline LaTeX.
      let j = i + 1, tex = ''
      while (j < src.length) {
        if (src[j] === '\\' && src[j + 1] === '$') { tex += '$'; j += 2; continue }
        if (src[j] === '$') break
        tex += src[j]; j += 1
      }
      if (j < src.length && tex.trim()) { out += `<katex>${esc(tex)}</katex>`; i = j + 1; continue }
      out += '$'; i += 1; continue                                          // lone/empty $ → literal
    }
    if (c === '<') {
      const tm = src.slice(i).match(TAG_RE)
      if (tm && FMT_TAGS.has(tm[2].toLowerCase())) {
        let attrs = ''
        if (!tm[1]) { const ar = /([\w-]+)="([^"]*)"/g; let a; while ((a = ar.exec(tm[3])) !== null) if (FMT_ATTRS.has(a[1].toLowerCase())) attrs += ` ${a[1].toLowerCase()}="${esc(a[2])}"` }
        out += `<${tm[1]}${tm[2].toLowerCase()}${attrs}>`
        i += tm[0].length; continue
      }
      out += '&lt;'; i += 1; continue                                       // stray < → escape
    }
    if (c === '&') { out += '&amp;'; i += 1; continue }
    if (c === '>') { out += '&gt;'; i += 1; continue }
    if (c === '"') { out += '&quot;'; i += 1; continue }
    out += c; i += 1
  }
  return out
}

/** Build an attribute string from a map, skipping null/undefined/'' values. */
export function attrStr(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(' ')
}

// Local React-key id for blocks (not persisted — the XML carries the real ids).
let _n = 0
export function uid() {
  return `b${Date.now().toString(36)}${(_n++).toString(36)}`
}

/** Move element `from` → `to` in a copy of `arr` (for drag-reorder of options/items). */
export function reorder(arr, from, to) {
  const a = [...(arr || [])]
  const [x] = a.splice(from, 1)
  a.splice(to, 0, x)
  return a
}
