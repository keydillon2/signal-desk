import { useEffect, useMemo, useState } from 'react'
import { ROSTER } from './lib/roster'
import { FINDINGS, type Kind } from './data/sample'
import Sidebar, { type View } from './components/Sidebar'
import Field from './components/Field'
import Feed from './components/Feed'
import BrandHeader from './components/BrandHeader'
import AskPanel from './components/AskPanel'
import CommandPalette from './components/CommandPalette'
import { THEMES } from './data/sample'

export type KindFilter = Kind | 'all'

export default function App() {
  const [view, setView] = useState<View>({ type: 'home' })
  const [kind, setKind] = useState<KindFilter>('all')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [askOpen, setAskOpen] = useState(false)
  const [askContext, setAskContext] = useState<string | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
      if (e.key === 'Escape') setPaletteOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const findings = useMemo(() => {
    let list = FINDINGS
    if (view.type === 'brand') list = list.filter((f) => f.brand === view.id)
    if (view.type === 'theme') list = list.filter((f) => f.theme === view.id)
    if (view.type === 'saved') list = list.filter((f) => saved.has(f.id))
    if (kind !== 'all') list = list.filter((f) => f.kind === kind)
    return [...list].sort((a, b) => a.week - b.week || b.strength - a.strength)
  }, [view, kind, saved])

  const toggleSave = (id: string) =>
    setSaved((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const ask = (context: string | null) => {
    setAskContext(context)
    setAskOpen(true)
  }

  const go = (v: View) => {
    setView(v)
    setKind('all')
    document.querySelector('.main')?.scrollTo({ top: 0 })
  }

  const theme = view.type === 'theme' ? THEMES.find((t) => t.id === view.id) : undefined
  const brand = view.type === 'brand' ? ROSTER.find((b) => b.id === view.id) : undefined

  return (
    <div className={askOpen ? 'app with-ask' : 'app'}>
      <div className="sample-banner" role="note">
        Sample data. Made-up findings for designing the interface, not real analysis.
      </div>
      <Sidebar view={view} go={go} savedCount={saved.size} openPalette={() => setPaletteOpen(true)} onAsk={() => ask(null)} />

      <main className="main">
        <div className="main-inner">
          {view.type === 'home' && (
            <>
              <header className="page-head">
                <h1 className="display">The field this week</h1>
                <p className="lede">
                  Running brands after the NYC Marathon, eight weeks of moves. Each lane is a brand; each mark is
                  something it did.
                </p>
              </header>
              <Field go={go} />
            </>
          )}
          {brand && <BrandHeader brand={brand} onAsk={() => ask(`${brand.name}`)} />}
          {theme && (
            <header className="page-head">
              <h1 className="display">{theme.name}</h1>
              <p className="lede">{theme.blurb}</p>
            </header>
          )}
          {view.type === 'saved' && (
            <header className="page-head">
              <h1 className="display">Saved</h1>
              <p className="lede">Findings you’ve kept for later.</p>
            </header>
          )}

          <Feed
            findings={findings}
            kind={kind}
            setKind={setKind}
            saved={saved}
            toggleSave={toggleSave}
            onAsk={(f) => ask(f.title)}
            go={go}
            showBrand={view.type !== 'brand'}
            emptyText={view.type === 'saved' ? 'Nothing saved yet. Use Save on any finding to keep it here.' : 'No findings match this filter.'}
          />
        </div>
      </main>

      {askOpen && <AskPanel context={askContext} onClose={() => setAskOpen(false)} go={go} />}

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} go={go} onAsk={(q) => ask(q)} />}
    </div>
  )
}
