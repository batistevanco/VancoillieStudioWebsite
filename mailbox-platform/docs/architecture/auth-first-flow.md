# Auth First Flow

The mailbox platform starts with first-party platform accounts before provider connections.

## Why

Provider integrations depend on a trusted internal account boundary. Users must first have a secure Vancoillie Mailbox account before they can connect Gmail, Microsoft, iCloud, Yahoo, or IMAP accounts.

## Initial Screens

- `/signup`: create a first-party platform account
- `/login`: access an existing account
- `/forgot-password`: reserved recovery flow

## Explicitly Excluded From This Step

- Google sign-in
- Microsoft sign-in
- mailbox provider OAuth
- database writes
- production sessions

Those belong after the account schema, password hashing, rate limiting, and session model are designed.
