import { useMemo, useState } from 'react'
import { ROSTER } from '../lib/roster'
import { ASK_SUGGESTIONS, THEMES } from '../data/sample'
import type { View } from './Sidebar'

type Item = { label: string; group: string; run: () => void }

export default function CommandPalette({ onClose, go, onAsk }: { onClose: () => void; go: (v: View) => void; onAsk: (q: string) => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [
      { label: 'The field', group: 'Go to', run: () => go({ type: 'home' }) },
      { label: 'Saved', group: 'Go to', run: () => go({ type: 'saved' }) },
      ...ROSTER.map((b) => ({ label: b.name, group: 'Brands', run: () => go({ type: 'brand', id: b.id }) })),
      ...THEMES.map((t) => ({ label: `#${t.name}`, group: 'Themes', run: () => go({ type: 'theme', id: t.id }) })),
      ...ASK_SUGGESTIONS.map((s) => ({ label: s, group: 'Ask', run: () => onAsk(s) })),
    ]
    const needle = q.trim().toLowerCase()
    const hits = needle ? all.filter((i) => i.label.toLowerCase().includes(needle)) : all
    if (needle) hits.push({ label: `Ask: “${q.trim()}”`, group: 'Ask', run: () => onAsk(q.trim()) })
    return hits
  }, [q, go, onAsk])

  const choose = (i: Item | undefined) => {
    if (!i) return
    i.run()
    onClose()
  }

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          placeholder="Jump to a brand or theme, or ask a question"
          onChange={(e) => {
            setQ(e.target.value)
            setActive(0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, items.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, 0))
            } else if (e.key === 'Enter') {
              e.preventDefault()
              choose(items[active])
            }
          }}
          aria-label="Search"
        />
        <ul className="palette-list" role="listbox">
          {items.map((i, n) => (
            <li key={i.group + i.label} role="option" aria-selected={n === active}>
              <button type="button" className={n === active ? 'on' : ''} onMouseEnter={() => setActive(n)} onClick={() => choose(i)}>
                <span>{i.label}</span>
                <span className="group">{i.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
