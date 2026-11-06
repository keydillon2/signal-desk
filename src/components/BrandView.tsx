import { useEffect, useState } from 'react'
import { SOURCE_LABEL, type Brand } from '../lib/roster'
import { recentFilings, type Filing } from '../lib/sec'
import { recentNews, type Article } from '../lib/news'
import type { Settings } from '../lib/settings'

type Load<T> = { status: 'idle' | 'loading' | 'done' | 'error'; data: T; error?: string }

function useLoad<T>(fn: (() => Promise<T>) | null, empty: T, deps: unknown[]): Load<T> {
  const [state, setState] = useState<Load<T>>({ status: 'idle', data: empty })
  useEffect(() => {
    if (!fn) return
    let live = true
    setState({ status: 'loading', data: empty })
    fn()
      .then((data) => live && setState({ status: 'done', data }))
      .catch((e: unknown) => live && setState({ status: 'error', data: empty, error: e instanceof Error ? e.message : String(e) }))
    return () => {
      live = false
    }
  }, deps)
  return state
}

export default function BrandView({ brand, settings }: { brand: Brand; settings: Settings }) {
  const filings = useLoad<Filing[]>(
    brand.cik ? () => recentFilings(brand.cik!, settings.contactEmail) : null,
    [],
    [brand.id, settings.contactEmail],
  )
  const news = useLoad<Article[]>(() => recentNews(brand.newsQuery), [], [brand.id])

  return (
    <article className="brand-view">
      <header>
        <h2>{brand.name}</h2>
        <p className="muted">
          {[brand.parent && `Part of ${brand.parent}`, brand.ticker, SOURCE_LABEL[brand.kind]].filter(Boolean).join(' · ')}
        </p>
        {brand.note && <p className="muted small">{brand.note}</p>}
      </header>

      <section>
        <h3>Filings and reports</h3>
        {brand.cik ? (
          <Status state={filings} empty="No recent filings found.">
            <ul className="rows">
              {filings.data.map((f) => (
                <li key={f.url}>
                  <span className="tag">{f.form}</span>
                  <a href={f.url} target="_blank" rel="noreferrer">
                    {f.description}
                  </a>
                  <span className="muted small">{f.filed}</span>
                </li>
              ))}
            </ul>
          </Status>
        ) : brand.irUrl ? (
          <p className="muted">
            Doesn’t file with the SEC. Annual and quarterly reports are on its{' '}
            <a href={brand.irUrl} target="_blank" rel="noreferrer">
              investor-relations site
            </a>
            . Reading those PDFs comes in a later step.
          </p>
        ) : (
          <p className="muted">
            Private company, so no public filings.
            {brand.newsroomUrl && (
              <>
                {' '}See its{' '}
                <a href={brand.newsroomUrl} target="_blank" rel="noreferrer">
                  newsroom
                </a>
                .
              </>
            )}
          </p>
        )}
      </section>

      <section>
        <h3>News, last 30 days</h3>
        <Status state={news} empty="No recent coverage found.">
          <ul className="rows">
            {news.data.map((a) => (
              <li key={a.url}>
                <a href={a.url} target="_blank" rel="noreferrer">
                  {a.title}
                </a>
                <span className="muted small">
                  {a.source} · {a.seen}
                </span>
              </li>
            ))}
          </ul>
        </Status>
      </section>
    </article>
  )
}

function Status<T>({ state, empty, children }: { state: Load<T[]>; empty: string; children: React.ReactNode }) {
  if (state.status === 'loading' || state.status === 'idle') return <p className="muted">Loading…</p>
  if (state.status === 'error') return <p className="error">Couldn’t load: {state.error}</p>
  if (state.data.length === 0) return <p className="muted">{empty}</p>
  return <>{children}</>
}
