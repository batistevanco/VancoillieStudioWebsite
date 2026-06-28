CREATE TABLE IF NOT EXISTS mailbox_accounts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  provider VARCHAR(40) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  display_name VARCHAR(160) NULL,
  avatar_url VARCHAR(1024) NULL,
  encrypted_access_token TEXT NOT NULL,
  encrypted_refresh_token TEXT NULL,
  token_expires_at DATETIME NULL,
  scopes TEXT NULL,
  sync_status VARCHAR(40) NOT NULL DEFAULT 'connected',
  connected_at DATETIME NOT NULL,
  disconnected_at DATETIME NULL,
  last_sync_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY mailbox_accounts_provider_account_unique (provider, provider_account_id),
  KEY mailbox_accounts_user_id_index (user_id),
  KEY mailbox_accounts_email_index (email),
  KEY mailbox_accounts_sync_status_index (sync_status),
  CONSTRAINT mailbox_accounts_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
