import { ROSTER } from '../lib/roster'
import { FINDINGS, MOMENTUM, type Finding } from '../data/sample'
import type { View } from './Sidebar'

const WEEKS = 8
const KIND_WORD = { signal: 'Signal', challenge: 'Challenge', opportunity: 'Opportunity' }

// Lanes, one per brand, ordered by momentum. Marks sit at the week the finding
// happened, finish line on the right is this week.
export default function Field({ go }: { go: (v: View) => void }) {
  const lanes = [...ROSTER].sort((a, b) => MOMENTUM[b.id].score - MOMENTUM[a.id].score)
  const byBrand = (id: string) => FINDINGS.filter((f) => f.brand === id)

  return (
    <figure className="field" aria-label="Eight weeks of findings by brand">
      <div className="field-axis" aria-hidden="true">
        <span className="lane-label" />
        <div className="axis-track">
          {Array.from({ length: WEEKS }, (_, i) => (
            <span key={i}>{i === WEEKS - 1 ? 'This week' : `${WEEKS - 1 - i}w ago`}</span>
          ))}
        </div>
      </div>
      {lanes.map((b) => (
        <div className="lane" key={b.id}>
          <button type="button" className="lane-label" onClick={() => go({ type: 'brand', id: b.id })}>
            {b.name}
          </button>
          <div className="lane-track">
            {byBrand(b.id).map((f: Finding, _i, all) => {
              const same = all.filter((x) => x.week === f.week)
              const offset = (same.indexOf(f) - (same.length - 1) / 2) * 16
              return (
              <button
                type="button"
                key={f.id}
                className={`mark ${f.kind} s${f.strength}${f.isNew ? ' fresh' : ''}`}
                style={{ left: `calc(${((WEEKS - 1 - f.week) / (WEEKS - 1)) * 100}% + ${offset}px)` }}
                onClick={() => go({ type: 'brand', id: b.id })}
                aria-label={`${b.name}, ${KIND_WORD[f.kind]}: ${f.title}`}
              >
                <span className="tip" role="tooltip">
                  <strong>{KIND_WORD[f.kind]}</strong>
                  {f.title}
                </span>
              </button>
              )
            })}
          </div>
        </div>
      ))}
      <figcaption className="legend">
        <span className="key signal">Signal</span>
        <span className="key challenge">Challenge</span>
        <span className="key opportunity">Opportunity</span>
        <span className="key-note">Bigger marks are stronger evidence. Ringed marks are new since you last looked.</span>
      </figcaption>
    </figure>
  )
}
