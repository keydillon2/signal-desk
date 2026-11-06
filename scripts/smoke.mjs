// Live check of the data sources, run in CI (my dev sandboxes can't reach them).
// Mirrors the app's parsing in src/lib/sec.ts and src/lib/news.ts.
const contact = process.env.SEC_CONTACT_EMAIL || 'keydillon2@users.noreply.github.com'
const ua = `SignalDesk/0.1 (open-source research tool; ${contact})`

async function json(url, headers = {}) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${url} -> ${res.status}: ${(await res.text()).replace(/\s+/g, ' ').slice(0, 160)}`)
  return res.json()
}

let failed = false
const check = async (label, fn) => {
  try {
    console.log(`ok   ${label}: ${await fn()}`)
  } catch (e) {
    failed = true
    console.log(`FAIL ${label}: ${e.message}`)
  }
}

// Also try the SEC's own sample User-Agent format, to tell a format problem from an IP block.
await check('SEC Nike (plain User-Agent)', async () => {
  const d = await json('https://data.sec.gov/submissions/CIK0000320187.json', { 'User-Agent': `Signal Desk ${contact}` })
  return d.name
})

const sec = [['Nike', 320187], ['On', 1858985], ['Deckers (Hoka)', 910521], ['Wolverine (Saucony)', 110471]]
for (const [name, cik] of sec) {
  await check(`SEC ${name}`, async () => {
    const d = await json(`https://data.sec.gov/submissions/CIK${String(cik).padStart(10, '0')}.json`, { 'User-Agent': ua })
    const r = d.filings.recent
    const i = r.form.findIndex((f) => ['10-K', '10-Q', '8-K', '20-F', '6-K'].includes(f))
    return `${d.name}; latest ${r.form[i]} filed ${r.filingDate[i]}`
  })
  await new Promise((r) => setTimeout(r, 200))
}

await check('GDELT news "Nike running"', async () => {
  const q = new URLSearchParams({ query: 'Nike running sourcelang:english', mode: 'artlist', format: 'json', maxrecords: '5', sort: 'datedesc', timespan: '1month' })
  const res = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?${q}`).catch((e) => {
    throw new Error(`${e.message} (${e.cause?.code ?? e.cause?.message ?? 'no cause'})`)
  })
  const text = await res.text()
  let d
  try { d = JSON.parse(text) } catch { throw new Error(`not JSON (${res.status}): ${text.slice(0, 120)}`) }
  const a = d.articles ?? []
  return `${a.length} articles; newest: ${a[0]?.title ?? 'none'}`
})

process.exit(failed ? 1 : 0)
