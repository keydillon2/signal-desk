// All network access goes through here. Inside the desktop app we use Tauri's
// HTTP plugin, which is limited to the hosts allowed in
// src-tauri/capabilities/default.json. In a plain browser (vite dev) we fall
// back to fetch, which most of these sources block with CORS.
import { fetch as tauriFetch } from '@tauri-apps/plugin-http'

const inTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

export async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  const doFetch = inTauri ? tauriFetch : window.fetch.bind(window)
  const res = await doFetch(url, { method: 'GET', headers })
  if (!res.ok) throw new Error(`${new URL(url).host} answered ${res.status}`)
  return (await res.json()) as T
}

/** Runs tasks one at a time with a minimum gap, to stay inside rate limits. */
export function paced(minGapMs: number) {
  let last = 0
  let chain: Promise<unknown> = Promise.resolve()
  return <T>(task: () => Promise<T>): Promise<T> => {
    const run = chain.then(async () => {
      const wait = last + minGapMs - Date.now()
      if (wait > 0) await new Promise((r) => setTimeout(r, wait))
      last = Date.now()
      return task()
    })
    chain = run.catch(() => undefined)
    return run
  }
}
