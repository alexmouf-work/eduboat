// Horizontal alignment for "image-like" block elements (image, chem-display, …). Stored as
// an `align` attribute — left | center | right — with center the default. Shared so every
// such element aligns identically.

export const ALIGN = ['left', 'center', 'right']

/** Normalise an attribute value to a valid alignment (default center). */
export function normAlign(a) {
  return ALIGN.includes(a) ? a : 'center'
}

/** Flexbox justify class for an alignment (the element wraps its content in a flex row). */
export function alignClass(a) {
  return a === 'left' ? 'justify-start' : a === 'right' ? 'justify-end' : 'justify-center'
}
