import { useEffect, useState } from 'react'
import { CATEGORY, ROSTER, SOURCE_LABEL, type Brand } from './lib/roster'
import { readSettings, saveSettings, type Settings } from './lib/settings'
import BrandView from './components/BrandView'
import SettingsPanel from './components/SettingsPanel'

export default function App() {
  const [selected, setSelected] = useState<Brand>(ROSTER[0])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    readSettings().then((s) => {
      setSettings(s)
      if (!s.contactEmail) setShowSettings(true)
    })
  }, [])

  async function onSave(s: Settings) {
    await saveSettings(s)
    setSettings(s)
    setShowSettings(false)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand-mark">
          <h1>Signal Desk</h1>
          <p className="muted small">{CATEGORY.name}</p>
        </div>
        <nav aria-label="Brands">
          <ul>
            {ROSTER.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  className={b.id === selected.id ? 'brand active' : 'brand'}
                  onClick={() => setSelected(b)}
                >
                  <span className="brand-name">{b.name}</span>
                  <span className={`badge ${b.kind}`}>{SOURCE_LABEL[b.kind].split(' (')[0]}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="link settings-link" onClick={() => setShowSettings(true)}>
          Settings
        </button>
      </aside>

      <main className="main">
        <p className="context muted small">{CATEGORY.context}</p>
        {settings && <BrandView key={selected.id} brand={selected} settings={settings} />}
        <footer className="muted small disclaimer">
          Sources are linked; findings are not investment advice.
        </footer>
      </main>

      {showSettings && settings && (
        <SettingsPanel initial={settings} onSave={onSave} onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
