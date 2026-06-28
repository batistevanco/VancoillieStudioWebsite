# Mail Provider Strategy

The platform should treat every external mailbox as a provider connection.

## Provider Types

- OAuth providers: Gmail, Google Workspace, Outlook, Microsoft 365, Hotmail, Live
- IMAP/SMTP providers: iCloud, custom domains, legacy providers
- Hybrid providers: Yahoo and others depending on available capabilities

## Adapter Boundary

Provider-specific code should live behind adapters. Product code should request mailbox operations through a shared interface.

Examples:

- list folders
- list messages
- fetch message body
- send message
- create draft
- archive message
- mark as read
- sync changes

## Storage Principle

Store only what the product needs. In early phases, prefer metadata and sync state over full raw mailbox duplication.

Message body caching should be deliberate, encrypted where needed, and justified by product performance requirements.
