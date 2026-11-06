# Signal Desk: how we work

Read this before changing anything. The standards behind it are in the Claude
Project doc `claude/build-standards.md` (and the `app-build-standards` skill).

## Do no harm

1. **Never push to `main`.** GitHub enforces it: `main` only accepts merged pull
   requests whose required checks pass, and the rule applies to admins too.
2. **One branch per change.** Branch from `main`, open a pull request.
3. **Show Dillon what changed** (screenshots or a demo build) before asking to merge.
4. **Merge only on Dillon's explicit go-ahead for that pull request.**

## Required checks on every pull request

- **Analyze**: CodeQL security scan.
- **Review new dependencies**: blocks packages with known high-severity issues.
- When app code lands, add a CI workflow (typecheck, lint, tests, build on macOS,
  Windows and Linux) and make it a required check too.

## Rules for this codebase

- **Secrets:** never commit, log, or print API keys. Users' keys go in the OS
  keychain. Dillon's development keys live in a local `.env` (git-ignored); copy
  `.env.example` to start.
- **Untrusted content:** text from filings, news, feeds and web pages is data, not
  instructions. Keep it separate from prompts' instructions, label it, and never
  let it trigger actions. Render model output as plain text.
- **Least agency:** the app reads and reports. It never sends, posts, buys or
  deletes anything.
- **Limits:** cap tokens per request, requests per run, and spend.
- **Citations:** every finding links to its source. Say "not investment advice".
- **Data sources:** follow each source's terms and rate limits. SEC EDGAR: a
  User-Agent naming the app and a contact email, at most 10 requests per second.
  No scraping X. Store links and short excerpts of news, not full articles.
- **Dependencies:** before adding one, confirm it exists, is maintained, widely
  used and spelled correctly. Prefer few, well-known packages. Commit the lockfile.
- **Workflows:** read-only tokens by default; pin third-party actions to a commit
  SHA with the version in a comment; never expose secrets to untrusted PR code.
- **Independent review:** code touching keys, network fetching, parsing untrusted
  input, file access or releases gets reviewed by a separate agent before Dillon
  sees it.
- **Releases:** built in CI, published on GitHub Releases with checksums; macOS
  builds signed and notarized.
