# Vancoillie Mailbox Platform

This folder contains the new mailbox product. It is intentionally separated from the existing Vancoillie Studio website so the platform can evolve into a secure, scalable product without mixing concerns.

## Product Direction

The goal is to build a premium, extremely simple, fast, and secure mailbox experience that can unify multiple providers:

- Gmail and Google Workspace
- Outlook, Microsoft 365, Hotmail, and Live
- iCloud
- Yahoo
- Custom IMAP and SMTP providers

## Initial Structure

- `apps/web`: web application and product UI
- `apps/api`: backend API surface when split from the web app
- `packages/ui`: shared design system
- `packages/auth`: authentication and session domain
- `packages/database`: database schema, migrations, and data access
- `packages/mail-core`: provider-independent mailbox domain logic
- `packages/mail-providers`: provider adapters for OAuth, IMAP, and SMTP
- `packages/security`: encryption, rate limiting, audit helpers, and security primitives
- `docs`: product, architecture, and security decisions

## Engineering Principles

- Security decisions come before convenience.
- Provider credentials and tokens are never stored in plaintext.
- Real secrets are stored only in local env files or production secret managers, never in Git.
- Mail provider logic stays isolated behind adapters.
- The UI must feel intentionally designed, not template-driven.
- Every production feature needs a clear failure mode, loading state, and audit trail where relevant.
