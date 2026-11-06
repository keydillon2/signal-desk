// Settings saved on this computer. The contact email isn't a secret; API keys
// will go in the OS keychain when the AI step arrives, not here.
import { load } from '@tauri-apps/plugin-store'

const inTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window

export interface Settings {
  contactEmail: string
}

const DEFAULTS: Settings = { contactEmail: '' }

export async function readSettings(): Promise<Settings> {
  if (!inTauri) return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('settings') || '{}') }
  const store = await load('settings.json', { defaults: {}, autoSave: true })
  return { contactEmail: ((await store.get<string>('contactEmail')) ?? '').trim() }
}

export async function saveSettings(s: Settings) {
  if (!inTauri) return localStorage.setItem('settings', JSON.stringify(s))
  const store = await load('settings.json', { defaults: {}, autoSave: true })
  await store.set('contactEmail', s.contactEmail.trim())
  await store.save()
}
