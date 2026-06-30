ALTER TABLE mailbox_accounts
  ADD COLUMN imap_host VARCHAR(255) NULL AFTER scopes,
  ADD COLUMN imap_port SMALLINT UNSIGNED NULL AFTER imap_host,
  ADD COLUMN smtp_host VARCHAR(255) NULL AFTER imap_port,
  ADD COLUMN smtp_port SMALLINT UNSIGNED NULL AFTER smtp_host;
