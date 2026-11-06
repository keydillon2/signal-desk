# Security policy

## Reporting a vulnerability

Please report security issues privately, not in a public issue:

- Use GitHub's **"Report a vulnerability"** button on this repository's Security tab, or
- Email dillon.key@gmail.com with "Security" in the subject.

Include what you found, how to reproduce it, and the impact. You'll get a reply within a week.

## Supported versions

Until version 1.0, only the latest release gets security fixes.

## Things we treat as security issues

- API keys or other secrets exposed in files, logs, or network traffic.
- Content from filings, news, or web pages that can change the tool's instructions or make it take actions (prompt injection).
- Model output that gets executed or rendered as code or HTML.
- Downloads or releases that could be tampered with.
