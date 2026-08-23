// Inline text-formatting elements (#26) — usable anywhere inline text appears
// (paragraphs, FITG sentences, option/item labels). They're structural: each renders
// its children with a style applied. Defaults match the surrounding text when an
// attribute is omitted. The author inserts them via the format toolbar, and the
// serializer (xml.js `escInline`) preserves this whitelist while escaping everything
// else, so stray `<`/`>` in prose stay safe.
//
//   <b>…</b> <i>…</i> <u>…</u>
//   <highlight color="#FFFF00">…</highlight>   (background)
//   <color value="#ff0000">…</color>           (text colour)
//   <size value="1.25em">…</size>              (font size)

const wrap = (name, render) => ({ name, structural: true, Renderer: ({ node, renderChildren }) => render(renderChildren(node.children), node.attrs) })

export const b = wrap('b', (kids) => <strong className="font-semibold">{kids}</strong>)
export const i = wrap('i', (kids) => <em className="italic">{kids}</em>)
export const u = wrap('u', (kids) => <span className="underline">{kids}</span>)
export const highlight = wrap('highlight', (kids, attrs) => (
  <mark className="rounded px-0.5" style={{ backgroundColor: attrs.color || '#fde68a', color: '#1a1a1a' }}>{kids}</mark>
))
export const color = wrap('color', (kids, attrs) => <span style={{ color: attrs.value || 'inherit' }}>{kids}</span>)
export const size = wrap('size', (kids, attrs) => <span style={{ fontSize: attrs.value || 'inherit' }}>{kids}</span>)
