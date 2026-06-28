# Auth Implementation

The first authentication implementation uses first-party platform accounts.

## Implemented

- Email and password signup
- Email and password login
- HTTP-only session cookie
- Database-backed sessions
- Session tokens stored as hashes only
- scrypt password hashing
- Basic in-process rate limiting
- Audit events for signup, login, and logout

## Required Database Migration

Run:

```txt
mailbox-platform/packages/database/migrations/001_auth_foundation.sql
```

against the Hostinger MySQL database before using the auth endpoints.

## Production Notes

The current in-process rate limiter is acceptable for local development and a single server preview, but production must use shared storage such as Redis or a managed edge rate limiter. Otherwise multiple app instances will not share attempt counters.

Account recovery, email verification, MFA, device management, and provider OAuth are intentionally separate next steps.

## Provider Connections

Provider OAuth is implemented through dedicated start and callback routes:

- `/api/providers/google/start`
- `/api/providers/google/callback`
- `/api/providers/microsoft/start`
- `/api/providers/microsoft/callback`

Run:

```txt
mailbox-platform/packages/database/migrations/002_mailbox_accounts.sql
```

before testing provider connections.

Required environment variables:

```txt
APP_BASE_URL=http://127.0.0.1:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_TENANT_ID=common
```

OAuth tokens are encrypted before storage. Refresh tokens are only updated when providers return a new one.
