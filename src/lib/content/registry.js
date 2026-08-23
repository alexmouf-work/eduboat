// LEMMA content-element registry. Maps an element name → its module.
//
// Per-element contract:
//   { name, structural, Renderer, score?(node,value,keyEntry), solution?, blankValue? }
// Structural elements render their children; interactive ones carry a `sub-id` and
// collect/score an answer. Adding a new element = drop a module in ./elements and
// register it here — no other file changes (the "any type in any quiz" property).
//
// Harvested from lemma-legacy (the mature content engine). This is the CORE
// vocabulary — the text/MCQ set that grades cleanly in Node. Heavier elements
// (maths · chemistry · graph · spatial · simulation · diagram) accrete later, each
// with its own lazy-loaded deps; they are deliberately absent here.

import * as p from './elements/p.jsx'
import * as image from './elements/image.jsx'
import * as choice from './elements/choice.jsx'
import * as tickbox from './elements/tickbox.jsx'
import * as textGap from './elements/text-gap.jsx'
import * as trueFalse from './elements/true-false.jsx'
import * as numeric from './elements/numeric.jsx'
import * as written from './elements/written.jsx'
import * as reorder from './elements/reorder.jsx'
import * as dragdrop from './elements/dragdrop.jsx'
import * as note from './elements/note.jsx'
import { b, i, u, highlight, color, size } from './elements/format.jsx'

export const ELEMENTS = {
  p,
  image,
  choice,
  tickbox,
  'text-gap': textGap,
  'true-false': trueFalse,
  numeric,
  written,
  reorder,
  dragdrop,
  note,
  // Inline text formatting.
  b, i, u, highlight, color, size,
}

/** Look up an element module by tag name, or null if unregistered. */
export function getElement(name) {
  return ELEMENTS[name] || null
}
