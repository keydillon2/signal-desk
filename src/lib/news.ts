// Recent news via the GDELT DOC API (free, no key). We keep headlines and
// links only, never full articles. GDELT asks for modest request rates.
import { getJson, paced } from './net'

export interface Article {
  title: string
  url: string
  source: string
  seen: string
}

interface GdeltResponse {
  articles?: { title: string; url: string; domain: string; seendate: string; language?: string }[]
}

const gdeltQueue = paced(5500) // GDELT recommends about one request every 5 seconds

function formatSeen(s: string) {
  // 20261105T143000Z -> 2026-11-05
  return /^\d{8}/.test(s) ? `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}` : s
}

export async function recentNews(query: string, limit = 15): Promise<Article[]> {
  const params = new URLSearchParams({
    query: `${query} sourcelang:english`,
    mode: 'artlist',
    format: 'json',
    maxrecords: String(limit),
    sort: 'datedesc',
    timespan: '1month',
  })
  const data = await gdeltQueue(() => getJson<GdeltResponse>(`https://api.gdeltproject.org/api/v2/doc/doc?${params}`))
  return (data.articles ?? []).map((a) => ({
    title: a.title,
    url: a.url,
    source: a.domain,
    seen: formatSeen(a.seendate),
  }))
}
