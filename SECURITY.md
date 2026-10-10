# Security Policy

## Scope

This project is a **static, read-only website**. It has no authentication, no
database, no user accounts, no server-side state, and no API keys. There is no
attack surface for a traditional data breach.

The site renders a curated, hard-coded dataset (`src/data/content.ts`) and links
out to third-party sites (arXiv, YouTube, company blogs).

## Supported versions

| Version | Supported |
|---|---|
| `main` | ✅ |

## Reporting a vulnerability

If you believe you've found a genuine security issue, please report it privately
rather than opening a public issue:

👉
[**Report a vulnerability**](https://github.com/aniruddhaadak80/ai-journey/security/advisories/new)

Please include:

- a description of the issue and its impact
- steps to reproduce
- the affected route or file
- any suggested remediation

I'll aim to acknowledge within 72 hours and to provide a fix or mitigation plan
within 14 days.

## Non-vulnerabilities

These are **not** security issues and will be handled as normal issues:

- **Dead external links.** Sources are curated by hand and rot over time. Please
  report via the [Content correction template](.github/ISSUE_TEMPLATE/content_issue.md).
- **Content you disagree with.** This project makes claims about AI history that
  are cited to primary sources. Disagreement is handled through the content-issue
  process.
- **Missing API keys / needing login.** By design the site requires zero
  configuration and zero credentials.
- **Rate limiting or DoS.** There is no server-side computation to abuse; all
  routes are prerendered static HTML on a CDN.

## Dependency issues

Automated dependency scanning is configured via GitHub's CodeQL workflow and
Dependabot. To report a vulnerability in a dependency, please follow the
upstream project's disclosure process first, then let us know privately so we can
pin or patch.
