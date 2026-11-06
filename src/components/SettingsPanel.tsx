import { useState } from 'react'
import type { Settings } from '../lib/settings'

export default function SettingsPanel({
  initial,
  onSave,
  onClose,
}: {
  initial: Settings
  onSave: (s: Settings) => void
  onClose: () => void
}) {
  const [email, setEmail] = useState(initial.contactEmail)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <form
        className="panel"
        onSubmit={(e) => {
          e.preventDefault()
          if (valid) onSave({ contactEmail: email })
        }}
      >
        <h2 id="settings-title">Settings</h2>
        <label htmlFor="email">Contact email for the SEC</label>
        <p className="muted small">
          The SEC asks every tool that reads its data to include a contact email. It’s sent only to sec.gov and saved on
          this computer.
        </p>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />
        <div className="actions">
          {initial.contactEmail && (
            <button type="button" className="link" onClick={onClose}>
              Cancel
            </button>
          )}
          <button type="submit" disabled={!valid}>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
