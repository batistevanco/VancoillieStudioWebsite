# Security Principles

Security is a primary product feature.

## Baseline Rules

- Use OAuth where providers support it.
- Never store OAuth tokens, refresh tokens, IMAP passwords, or SMTP passwords in plaintext.
- Never commit database credentials, API keys, OAuth client secrets, encryption keys, or session secrets.
- Use secure, HTTP-only cookies for sessions.
- Validate all input at API boundaries.
- Apply rate limiting to auth and provider connection flows.
- Keep audit logs for sensitive account events.
- Avoid logging secrets, tokens, message bodies, or private headers.
- Use least privilege provider scopes.
- Design MFA and device management from the start.

## Threats To Design For

- account takeover
- stolen sessions
- malicious provider callbacks
- token leakage
- SQL injection
- XSS
- CSRF
- brute-force login attempts
- mailbox sync abuse
- unsafe attachment handling
- over-permissive OAuth scopes

## Principle

Every feature must have a clear answer to: what happens if this input, token, session, provider response, or user action is malicious?

## Local Secret Handling

Real credentials belong in local environment files or a production secret manager, never in source control.

Use `mailbox-platform/.env.example` as the template and keep real values in `.env.local` or the deployment provider's secret store.

If a password or token is shared in chat, screenshots, logs, Git history, or issue trackers, treat it as compromised and rotate it.

See `docs/security/secret-management.md` for the project secret policy.
