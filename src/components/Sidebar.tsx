import { ROSTER } from '../lib/roster'
import { MOMENTUM, THEMES, FINDINGS } from '../data/sample'
import Sparkline from './Sparkline'

export type View = { type: 'home' } | { type: 'brand'; id: string } | { type: 'theme'; id: string } | { type: 'saved' }

const newCount = (pred: (f: (typeof FINDINGS)[number]) => boolean) => FINDINGS.filter((f) => f.isNew && pred(f)).length

export default function Sidebar({
  view,
  go,
  savedCount,
  openPalette,
  onAsk,
}: {
  view: View
  go: (v: View) => void
  savedCount: number
  openPalette: () => void
  onAsk: () => void
}) {
  const is = (v: View) => JSON.stringify(v) === JSON.stringify(view)
  const watchlist = [...ROSTER].sort((a, b) => MOMENTUM[b.id].score - MOMENTUM[a.id].score)

  return (
    <aside className="sidebar">
      <div className="wordmark">Signal Desk</div>
      <button type="button" className="search" onClick={openPalette}>
        <span>Search or jump to</span>
        <kbd>⌘K</kbd>
      </button>
      <button type="button" className="ask-button" onClick={onAsk}>
        Ask about the category
      </button>

      <nav aria-label="Main">
        <button type="button" className={is({ type: 'home' }) ? 'nav-item on' : 'nav-item'} onClick={() => go({ type: 'home' })}>
          <span>The field</span>
          {newCount(() => true) > 0 && <span className="count">{newCount(() => true)} new</span>}
        </button>
        <button type="button" className={is({ type: 'saved' }) ? 'nav-item on' : 'nav-item'} onClick={() => go({ type: 'saved' })}>
          <span>Saved</span>
          {savedCount > 0 && <span className="count quiet">{savedCount}</span>}
        </button>
      </nav>

      <section aria-labelledby="wl">
        <h2 id="wl" className="side-head">
          Watchlist <span className="hint">momentum</span>
        </h2>
        <ul className="watchlist">
          {watchlist.map((b) => {
            const m = MOMENTUM[b.id]
            return (
              <li key={b.id}>
                <button
                  type="button"
                  className={is({ type: 'brand', id: b.id }) ? 'wl-row on' : 'wl-row'}
                  onClick={() => go({ type: 'brand', id: b.id })}
                >
                  <span className="wl-name">{b.name}</span>
                  <Sparkline values={m.weeks} up={m.change >= 0} />
                  <span className="wl-score">{m.score}</span>
                  <span className={m.change > 0 ? 'delta up' : m.change < 0 ? 'delta down' : 'delta'}>
                    {m.change > 0 ? `+${m.change}` : m.change === 0 ? '0' : m.change}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="th">
        <h2 id="th" className="side-head">Themes</h2>
        <ul className="themes">
          {THEMES.map((t) => {
            const n = newCount((f) => f.theme === t.id)
            return (
              <li key={t.id}>
                <button
                  type="button"
                  className={is({ type: 'theme', id: t.id }) ? 'nav-item on' : 'nav-item'}
                  onClick={() => go({ type: 'theme', id: t.id })}
                >
                  <span className={n ? 'theme-name unread' : 'theme-name'}># {t.name}</span>
                  {n > 0 && <span className="dot" aria-label={`${n} new`} />}
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}
