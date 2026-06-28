import { query } from "@/lib/db/mysql";

type AuditEvent =
  | "auth.signup.created"
  | "auth.signup.duplicate"
  | "auth.login.succeeded"
  | "auth.login.failed"
  | "auth.logout.succeeded"
  | "provider.google.connected"
  | "provider.microsoft.connected";

export const writeAuditEvent = async ({
  userId,
  event,
  ipAddress,
  userAgent,
  metadata,
}: {
  userId?: string | null;
  event: AuditEvent;
  ipAddress: string | null;
  userAgent: string | null;
  metadata?: Record<string, string | number | boolean | null>;
}) => {
  try {
    await query(
      `INSERT INTO audit_events
        (id, user_id, event, ip_address, user_agent, metadata)
       VALUES
        (UUID(), ?, ?, ?, ?, ?)`,
      [
        userId ?? null,
        event,
        ipAddress,
        userAgent,
        metadata ? JSON.stringify(metadata) : null,
      ],
    );
  } catch {
    // Auth must not leak audit persistence failures to users.
  }
};
