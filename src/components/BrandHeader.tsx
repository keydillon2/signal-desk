import { SOURCE_LABEL, type Brand } from '../lib/roster'
import { FINDINGS, MOMENTUM } from '../data/sample'
import Sparkline from './Sparkline'

export default function BrandHeader({ brand, onAsk }: { brand: Brand; onAsk: () => void }) {
  const m = MOMENTUM[brand.id]
  const mine = FINDINGS.filter((f) => f.brand === brand.id)
  const count = (k: string) => mine.filter((f) => f.kind === k).length
  const n = (k: string, one: string, many: string) => `${count(k)} ${count(k) === 1 ? one : many}`
  const facts = [brand.parent && `Part of ${brand.parent}`, brand.ticker, SOURCE_LABEL[brand.kind]].filter(Boolean)

  return (
    <header className="brand-head">
      <div>
        <h1 className="display">{brand.name}</h1>
        <ul className="facts">
          {facts.map((f) => (
            <li key={f as string}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="momentum">
        <div className="momentum-score">
          <span className="big">{m.score}</span>
          <span className={m.change > 0 ? 'delta up' : m.change < 0 ? 'delta down' : 'delta'}>
            {m.change > 0 ? `+${m.change}` : m.change} this week
          </span>
        </div>
        <Sparkline values={m.weeks} up={m.change >= 0} />
        <p className="momentum-note">Momentum, based on eight weeks of findings</p>
      </div>
      <div className="brand-tally">
        <span className="tally signal">{n('signal', 'signal', 'signals')}</span>
        <span className="tally challenge">{n('challenge', 'challenge', 'challenges')}</span>
        <span className="tally opportunity">{n('opportunity', 'opportunity', 'opportunities')}</span>
        <button type="button" className="ghost" onClick={onAsk}>
          Ask about {brand.name}
        </button>
      </div>
    </header>
  )
}
