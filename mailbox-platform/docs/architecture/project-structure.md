# Project Structure

The mailbox platform starts as a separated product folder inside the existing repository.

```txt
mailbox-platform/
  apps/
    web/
    api/
  packages/
    ui/
    auth/
    database/
    mail-core/
    mail-providers/
    security/
  docs/
    product/
    architecture/
    security/
```

## Boundary Rule

The existing Vancoillie Studio website should not import mailbox platform internals.

The mailbox platform may later become its own repository or monorepo without needing a large rewrite.
