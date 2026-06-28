# Mail Providers Package

Provider adapters for external mail systems.

Each provider must be isolated behind a consistent interface:

- Gmail OAuth
- Microsoft OAuth
- iCloud IMAP/SMTP
- Yahoo OAuth or IMAP/SMTP
- custom IMAP/SMTP

Adapters must never leak provider-specific token handling into UI or product logic.
