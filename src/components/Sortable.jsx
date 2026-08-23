// Custom pointer-based vertical sortable (§6.4 "shared drag primitive") — no
// dependency, so it can also back the runtime reorder/dragdrop elements later
// without bloating the student bundle. Drag a grip; a drop-line shows where the item
// will land (target computed from sibling midpoints via getBoundingClientRect, so
// it's screen-size-robust); release to reorder. The dragged row dims in place.
// Keyboard reorder stays the consumer's job (▲▼ / arrows) for accessibility (§9).
//
// Usage:
//   <Sortable ids={items.map(i => i.uid)} onReorder={(from, to) => …} className="space-y-2">
//     {(id, index, { handleProps, dragging }) => <Row …><Grip {...handleProps}/>…</Row>}
//   </Sortable>

import { Fragment, useRef, useState } from 'react'

function indexAtY(container, y) {
  if (!container) return null
  const rows = [...container.querySelectorAll(':scope > [data-sortable-item]')]
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i].getBoundingClientRect()
    if (y < r.top + r.height / 2) return i
  }
  return rows.length
}

export default function Sortable({ ids, onReorder, children, className = '' }) {
  const ref = useRef(null)
  const [drag, setDrag] = useState(null)   // { from, over }

  const handleProps = (from) => ({
    onPointerDown: (e) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture?.(e.pointerId)
      setDrag({ from, over: from })
    },
    onPointerMove: (e) => {
      if (!drag) return
      const over = indexAtY(ref.current, e.clientY)
      if (over != null) setDrag((d) => (d ? { ...d, over } : d))
    },
    onPointerUp: (e) => {
      e.currentTarget.releasePointerCapture?.(e.pointerId)
      setDrag((d) => {
        if (d) {
          // `over` is an insert-before index (0..n); convert to a move target.
          const to = d.over > d.from ? d.over - 1 : d.over
          if (to !== d.from) onReorder(d.from, to)
        }
        return null
      })
    },
  })

  return (
    <div ref={ref} className={className}>
      {ids.map((id, i) => (
        <Fragment key={id}>
          {drag && drag.over === i && <DropLine />}
          <div data-sortable-item style={{ opacity: drag && drag.from === i ? 0.4 : 1 }}>
            {children(id, i, { handleProps: handleProps(i), dragging: drag?.from === i })}
          </div>
        </Fragment>
      ))}
      {drag && drag.over === ids.length && <DropLine />}
    </div>
  )
}

function DropLine() {
  return <div className="h-0.5 -my-0.5 bg-synapse rounded-full" />
}
