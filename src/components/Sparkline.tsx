export default function Sparkline({ values, up }: { values: number[]; up: boolean }) {
  const w = 44
  const h = 16
  const max = Math.max(...values)
  const min = Math.min(...values)
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * w},${h - 2 - ((v - min) / (max - min || 1)) * (h - 4)}`)
    .join(' ')
  return (
    <svg className={up ? 'spark up' : 'spark down'} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={pts} fill="none" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
