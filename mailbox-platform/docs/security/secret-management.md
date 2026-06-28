# Secret Management

Real secrets must never be committed to Git.

This includes:

- database passwords
- OAuth client secrets
- session secrets
- encryption keys
- SMTP and IMAP passwords
- API keys
- webhook signing secrets

## Local Development

Use a local `.env.local` file. It is ignored by Git.

Start from:

```txt
mailbox-platform/.env.example
```

## Production

Production values belong in the hosting platform's secret manager or environment variable settings.

Start from:

```txt
mailbox-platform/.env.production.example
```

Do not rename this example file into a committed production env file.

## Current Hostinger Database Values

The non-secret database identifiers are:

```txt
DATABASE_NAME=u104619329_MailBoxProvid
DATABASE_USER=u104619329_adminMailBox
DATABASE_PORT=3306
```

The database host and password must be supplied through environment variables.

## Rotation Rule

If a credential appears in a screenshot, chat message, terminal output, Git commit, ticket, or log file, treat it as compromised and rotate it immediately.
