// <note> — a per-part explanation/feedback note (#15). Authored at the bottom of an
// interactive element; shown in the live preview (authoring) and in review/feedback,
// but hidden during the attempt so it doesn't give the answer away.

export const name = 'note'
export const structural = true

export function Renderer({ node, renderChildren, authoring, review }) {
  if (!(authoring || review)) return null
  return (
    <div className="mt-2 rounded border-l-2 border-axon/50 bg-axon/5 px-3 py-2 font-body text-sm text-bone-100/75">
      <span className="font-mono text-xs uppercase tracking-widest text-axon/70 mr-2">Explanation</span>
      {renderChildren(node.children)}
    </div>
  )
}
