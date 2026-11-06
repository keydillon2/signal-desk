// SEC EDGAR. Fair-access rules: identify the client in the User-Agent with a
// contact email, and stay under 10 requests per second.
// https://www.sec.gov/os/accessing-edgar-data
import { getJson, paced } from './net'

export interface Filing {
  form: string
  filed: string
  description: string
  url: string
}

interface Submissions {
  name: string
  filings: {
    recent: {
      form: string[]
      filingDate: string[]
      accessionNumber: string[]
      primaryDocument: string[]
      primaryDocDescription: string[]
    }
  }
}

const FORMS = new Set(['10-K', '10-Q', '8-K', '20-F', '6-K', '10-K/A', '20-F/A'])
const secQueue = paced(150) // ~6 requests per second, under the SEC's 10

export function userAgent(contactEmail: string) {
  return `SignalDesk/0.1 (open-source research tool; ${contactEmail})`
}

export async function recentFilings(cik: number, contactEmail: string, limit = 12): Promise<Filing[]> {
  if (!contactEmail) throw new Error('Add a contact email in Settings. The SEC requires one.')
  const padded = String(cik).padStart(10, '0')
  const data = await secQueue(() =>
    getJson<Submissions>(`https://data.sec.gov/submissions/CIK${padded}.json`, { 'User-Agent': userAgent(contactEmail) }),
  )
  const r = data.filings.recent
  const out: Filing[] = []
  for (let i = 0; i < r.form.length && out.length < limit; i++) {
    if (!FORMS.has(r.form[i])) continue
    const accession = r.accessionNumber[i].replace(/-/g, '')
    out.push({
      form: r.form[i],
      filed: r.filingDate[i],
      description: r.primaryDocDescription[i] || r.form[i],
      url: `https://www.sec.gov/Archives/edgar/data/${cik}/${accession}/${r.primaryDocument[i]}`,
    })
  }
  return out
}
