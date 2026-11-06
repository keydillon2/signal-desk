// Open source links in the user's browser instead of inside the app window.
import { openUrl } from '@tauri-apps/plugin-opener'

const inTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

export function routeExternalLinks() {
  if (!inTauri) return
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a')
    if (!a) return
    const href = a.getAttribute('href') ?? ''
    if (!/^https:\/\//i.test(href)) return
    e.preventDefault()
    void openUrl(href)
  })
}
