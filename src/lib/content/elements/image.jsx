// <image src alt width height/> — structural. A per-question image. `width`/`height`
// (px, set by the scale handles/fields — #6) size it; until a real image is added a
// placeholder box shows in the authoring preview (#5).

import { alignClass, normAlign } from '../align'

export const name = 'image'
export const structural = true

const dim = (v) => (v == null || v === '' ? undefined : (/^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v)))

export function Renderer({ node, authoring }) {
  const { src, alt, width, height } = node.attrs
  const wrap = `my-3 flex ${alignClass(normAlign(node.attrs.align))}`
  if (!src) {
    if (!authoring) return null
    return (
      <div className={wrap}>
        <div
          className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neural-600 bg-neural-800/40 text-bone-100/40"
          style={{ width: dim(width) || '14rem', height: dim(height) || '9rem' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-widest">image placeholder</span>
        </div>
      </div>
    )
  }
  // NB: no `object-contain` — with explicit width/height the image should stretch to
  // exactly the authored x-/y-scale (matching the builder block), not letterbox to its
  // intrinsic aspect ratio (#7). `maxWidth:100%` keeps it responsive.
  return (
    <div className={wrap}>
      <img
        src={src}
        alt={alt || ''}
        style={{ width: dim(width), height: dim(height), maxWidth: '100%' }}
        className="rounded-lg block"
      />
    </div>
  )
}
