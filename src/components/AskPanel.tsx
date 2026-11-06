import { useEffect, useRef, useState } from 'react'
import { ASK_SUGGESTIONS, FINDINGS, SAMPLE_ANSWER } from '../data/sample'
import type { View } from './Sidebar'

type Turn = { q: string; answered: boolean }

export default function AskPanel({ context, onClose, go }: { context: string | null; onClose: () => void; go: (v: View) => void }) {
  const [input, setInput] = useState(context ? `What does this mean for the category: ${context}?` : '')
  const [turns, setTurns] = useState<Turn[]>([])
  const field = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setInput(context ? `What does this mean for the category: ${context}?` : '')
    field.current?.focus()
  }, [context])

  function send(q: string) {
    if (!q.trim()) return
    setTurns((t) => [...t, { q: q.trim(), answered: false }])
    setInput('')
    setTimeout(() => setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, answered: true } : x))), 700)
  }

  return (
    <aside className="ask" aria-label="Ask about the category">
      <header className="ask-head">
        <h2>Ask</h2>
        <button type="button" className="ghost" onClick={onClose}>
          Close
        </button>
      </header>

      <div className="ask-body" aria-live="polite">
        {turns.length === 0 && (
          <>
            <p className="ask-intro">Questions are answered from the findings on this desk, with links to each one.</p>
            <ul className="suggest">
              {ASK_SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => setInput(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {turns.map((t, i) => (
          <div key={i} className="turn">
            <p className="q">{t.q}</p>
            {t.answered ? (
              <div className="a">
                {SAMPLE_ANSWER.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="cite-head">From</p>
                <ul className="cites">
                  {SAMPLE_ANSWER.cites.map((id) => {
                    const f = FINDINGS.find((x) => x.id === id)!
                    return (
                      <li key={id}>
                        <button type="button" onClick={() => go({ type: 'brand', id: f.brand })}>
                          {f.title}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <p className="sample-note">Sample answer for design.</p>
              </div>
            ) : (
              <p className="thinking">Reading the findings…</p>
            )}
          </div>
        ))}
      </div>

      <form
        className="ask-input"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <label htmlFor="ask-q" className="sr-only">
          Your question
        </label>
        <textarea
          id="ask-q"
          ref={field}
          rows={2}
          value={input}
          placeholder="Ask about brands, themes or what changed"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send(input)
            }
          }}
        />
        <button type="submit" disabled={!input.trim()}>
          Ask
        </button>
      </form>
    </aside>
  )
}
