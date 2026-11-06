# Product brief (draft)

Status: draft for Dillon's review. Open questions are marked **Decide**.

## Why
A working proof that Dillon uses AI to build tools for his own strategy work, visible on dillonkey.com and usable by others.

## Who it's for
Brand strategists, marketers, and individual investors who need a fast read on a category.

## v1 job
Pick a category and 5 to 8 public companies. Signal Desk:
1. Pulls each company's latest 10-K, 10-Q and 8-K filings from SEC EDGAR, focusing on risk factors and management discussion.
2. Pulls recent news (GDELT and company newsroom/RSS feeds).
3. Uses an AI model to sort findings into **signals, challenges and opportunities**, each with a link to its source.
4. Shows what changed since the last run.

## Non-goals for v1
- X/Twitter data (no free API; scraping breaks its terms). Possible later as "bring your own X key".
- Trading, alerts, or any action outside the app.
- Deep analysis of non-US annual reports in the first build (linked, read later).
- Investment advice.

## How it ships
- **v0:** this open-source repo, runnable with one command, plus a page on dillonkey.com showing a real report for the demo category.
- **v1:** a desktop app (Tauri) with installers built in CI and published on GitHub Releases. Mac builds notarized (Apple Developer account, $99/yr).

## AI
Users bring their own key (OpenAI-compatible, e.g. Groq free tier) stored in the OS keychain, or run a local model. No shared key.

## Demo category (decided Nov 6, 2026)
Running brands, after the NYC Marathon and ahead of next year's majors: Nike, Adidas, On, Hoka (Deckers), Asics, Brooks (Berkshire Hathaway), New Balance, Saucony (Wolverine World Wide), Puma, Bandit. SEC filers get filings; Adidas, Asics and Puma publish annual reports on their investor sites; Brooks, New Balance and Bandit are private, so news and newsrooms only.

## Decide
- **Order:** website demo first, or desktop download first?
- **Name:** keep "Signal Desk"?
- **Employer check:** any Prosek policy on public tools covering client categories?
