# System Architecture

The mailbox platform should be designed as a modular product inside this repository first, with a clear path to split into independent apps and packages later.

## Recommended Direction

Start with a separated product folder:

- existing Studio website remains untouched
- mailbox product lives under `mailbox-platform`
- domain logic is organized as packages from day one
- web and API boundaries are explicit

## Why

Mailbox products become complex quickly because authentication, provider sync, secrets, search, attachments, and UI state all evolve at different speeds.

A separated architecture keeps those concerns from becoming tangled.

## Initial Runtime Choice

The first web version can use Next.js, but business logic should not be trapped inside page components.

Domain code belongs in packages so it can later move behind a dedicated API service.
