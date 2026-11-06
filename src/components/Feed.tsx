import { useState } from 'react'
import { ROSTER } from '../lib/roster'
import { FINDINGS, THEMES, type Finding } from '../data/sample'
import type { KindFilter } from '../App'
import type { View } from './Sidebar'

const KIND_WORD = { signal: 'Signal', challenge: 'Challenge', opportunity: 'Opportunity' }
const brandName = (id: string) => ROSTER.find((b) => b.id === id)?.name ?? id
const themeName = (id: string) => THEMES.find((t) => t.id === id)?.name ?? id
const when = (w: number) => (w === 0 ? 'This week' : w === 1 ? 'Last week' : `${w} weeks ago`)

export default function Feed(props: {
  findings: Finding[]
  kind: KindFilter
  setKind: (k: KindFilter) => void
  saved: Set<string>
  toggleSave: (id: string) => void
  onAsk: (f: Finding) => void
  go: (v: View) => void
  showBrand: boolean
  emptyText: string
}) {
  const { findings, kind, setKind } = props
  const filters: { id: KindFilter; label: string }[] = [
    { id: 'all', label: 'Everything' },
    { id: 'signal', label: 'Signals' },
    { id: 'challenge', label: 'Challenges' },
    { id: 'opportunity', label: 'Opportunities' },
  ]

  return (
    <section className="feed" aria-label="Findings">
      <div className="chips" role="tablist" aria-label="Filter findings">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={kind === f.id}
            className={kind === f.id ? `chip on ${f.id}` : `chip ${f.id}`}
            onClick={() => setKind(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {findings.length === 0 ? (
        <p className="empty">{props.emptyText}</p>
      ) : (
        <ol className="cards">
          {findings.map((f) => (
            <Card key={f.id} f={f} {...props} />
          ))}
        </ol>
      )}
    </section>
  )
}

function Card({
  f,
  saved,
  toggleSave,
  onAsk,
  go,
  showBrand,
}: {
  f: Finding
  saved: Set<string>
  toggleSave: (id: string) => void
  onAsk: (f: Finding) => void
  go: (v: View) => void
  showBrand: boolean
}) {
  const [open, setOpen] = useState(false)
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const related = FINDINGS.filter((r) => r.theme === f.theme && r.id !== f.id).slice(0, 3)

  return (
    <li className={`card ${f.kind}${open ? ' open' : ''}`}>
      <div className="card-meta">
        {showBrand && (
          <button type="button" className="brand-link" onClick={() => go({ type: 'brand', id: f.brand })}>
            {brandName(f.brand)}
          </button>
        )}
        <span className={`kind ${f.kind}`}>{KIND_WORD[f.kind]}</span>
        <button type="button" className="theme-link" onClick={() => go({ type: 'theme', id: f.theme })}>
          #{themeName(f.theme)}
        </button>
        <span className="when">{when(f.week)}</span>
        {f.isNew && <span className="new">New</span>}
      </div>

      <h3 className="card-title">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {f.title}
        </button>
      </h3>
      <p className="card-summary">{f.summary}</p>

      {open && (
        <div className="card-detail">
          <h4>Why it matters</h4>
          <p>{f.why}</p>
          <h4>Sources</h4>
          <ul className="sources">
            {f.sources.map((s) => (
              <li key={s.label}>
                <span className="src-type">{s.type}</span>
                <span>{s.label}</span>
                <span className="src-date">{s.date}</span>
              </li>
            ))}
          </ul>
          {related.length > 0 && (
            <>
              <h4>Elsewhere in #{themeName(f.theme)}</h4>
              <ul className="related">
                {related.map((r) => (
                  <li key={r.id}>
                    <button type="button" onClick={() => go({ type: 'brand', id: r.brand })}>
                      {r.title}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="card-actions">
        <button type="button" onClick={() => setOpen((o) => !o)}>
          {open ? 'Show less' : 'Why it matters'}
        </button>
        <button type="button" className={saved.has(f.id) ? 'on' : ''} onClick={() => toggleSave(f.id)} aria-pressed={saved.has(f.id)}>
          {saved.has(f.id) ? 'Saved' : 'Save'}
        </button>
        <button type="button" onClick={() => onAsk(f)}>
          Ask about this
        </button>
        <span className="vote" role="group" aria-label="Was this useful?">
          <button type="button" className={vote === 'up' ? 'on' : ''} aria-pressed={vote === 'up'} onClick={() => setVote(vote === 'up' ? null : 'up')}>
            Useful
          </button>
          <button type="button" className={vote === 'down' ? 'on' : ''} aria-pressed={vote === 'down'} onClick={() => setVote(vote === 'down' ? null : 'down')}>
            Not useful
          </button>
        </span>
      </div>
    </li>
  )
}
