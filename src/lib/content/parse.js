// LEMMA content parser (G3) — XML item → runtime tree.
//
// Parses one content item's XML (docs/LEMMA_STRUCTURE_PLAN.md §2) into a plain
// object the document renderer (ContentBody) walks:
//   { id, marks, lang, feedback_enabled, title, body: Node[], key: { [subId]: {...} } }
//   Node = { type:'text', text } | { type:'element', name, attrs, children: Node[] }
//
// Uses the browser-native DOMParser (XML mode) — no dependency in the browser. The
// server grader (api/grade.js) runs the SAME parser in Node by INJECTING a DOMParser
// (from linkedom) via the optional 2nd arg, so the one scorer is reused server-side
// with no duplicate logic. The <key> block is parsed for grading (G5/G8); rendering
// doesn't need it.

function num(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

// Numeric attribute that is genuinely ABSENT → undefined (num(null) would be 0,
// which matters for variable min/max where "unset" must differ from 0).
function attrNum(el, name) {
  return el.hasAttribute(name) ? num(el.getAttribute(name)) : undefined
}

// Parse a <variables> block (§4): each <var> is a constrained random value, or a
// derived value via `expr`. Drawing/substitution happens per attempt (variables.js).
function parseVariables(varsEl) {
  if (!varsEl) return undefined
  const specs = Array.from(varsEl.querySelectorAll(':scope > var')).map((v) => ({
    name: v.getAttribute('name') || '',
    domain: v.getAttribute('domain') || 'integer',
    min: attrNum(v, 'min'),
    max: attrNum(v, 'max'),
    step: attrNum(v, 'step'),
    precision: attrNum(v, 'precision'),
    expr: v.getAttribute('expr') || undefined,
  })).filter((s) => s.name)
  return specs.length ? specs : undefined
}

export function domToNode(node) {
  if (node.nodeType === 3) {            // text
    return { type: 'text', text: node.textContent }
  }
  if (node.nodeType === 1) {            // element
    const attrs = {}
    for (const a of node.attributes) attrs[a.name] = a.value
    return {
      type: 'element',
      name: node.nodeName,
      attrs,
      children: Array.from(node.childNodes).map(domToNode).filter(Boolean),
    }
  }
  return null                           // comments etc.
}

function parseAnswer(answerEl) {
  const exp = answerEl.querySelector(':scope > explanation')
  return {
    match: answerEl.getAttribute('match') || 'exact',
    accepted: Array.from(answerEl.querySelectorAll(':scope > accept')).map(e => e.textContent),
    explanation: exp ? exp.textContent.trim() : undefined,
  }
}

/**
 * Parse one content-item XML string into a runtime item object.
 * @param {string} xml
 * @param {{ DOMParser?: typeof DOMParser }} [opts] inject a DOMParser implementation
 *   (e.g. linkedom's) when running outside the browser; defaults to the global one.
 */
export function parseItem(xml, opts = {}) {
  const Parser = opts.DOMParser || (typeof DOMParser !== 'undefined' ? DOMParser : undefined)
  if (!Parser) throw new Error('LEMMA content parse error: no DOMParser available (inject one via opts.DOMParser when running in Node)')
  const doc = new Parser().parseFromString(xml, 'application/xml')
  const err = doc.querySelector('parsererror')
  if (err) throw new Error('LEMMA content parse error: ' + err.textContent.trim())

  const root = doc.documentElement     // <question> / <content>
  const titleEl = root.querySelector(':scope > title')
  const bodyEl = root.querySelector(':scope > body')
  const keyEl = root.querySelector(':scope > key')
  const variablesEl = root.querySelector(':scope > variables')
  const explanationEl = root.querySelector(':scope > explanation')   // item-level (shown in review)

  const key = {}
  if (keyEl) {
    keyEl.querySelectorAll(':scope > answer').forEach(a => {
      const sid = a.getAttribute('sub-id')
      if (sid != null) key[sid] = parseAnswer(a)
    })
  }

  return {
    id: root.getAttribute('id') || undefined,
    marks: num(root.getAttribute('marks')),
    // Per-question time limit in seconds (linear mode only; the runner auto-advances
    // on expiry). Quiz-wide timing lives in behaviour.timing instead (§3.3).
    time: num(root.getAttribute('time')),
    lang: root.getAttribute('lang') || 'en-GB',
    // `feedback` attr gates the report/feedback control; default on.
    feedback_enabled: root.getAttribute('feedback') !== 'off',
    title: titleEl ? titleEl.textContent : undefined,
    body: bodyEl ? Array.from(bodyEl.childNodes).map(domToNode).filter(Boolean) : [],
    explanation: explanationEl ? explanationEl.textContent.trim() : undefined,
    variables: parseVariables(variablesEl),
    key,
  }
}
