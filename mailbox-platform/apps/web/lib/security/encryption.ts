import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { env } from "@/lib/config/env";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

const getKey = () => {
  const raw = Buffer.from(env.security.appEncryptionKey(), "base64");

  if (raw.length !== 32) {
    throw new Error("APP_ENCRYPTION_KEY must be a base64 encoded 32-byte key.");
  }

  return raw;
};

export const encryptSecret = (value: string) => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    "v1",
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
};

export const decryptSecret = (sealedValue: string) => {
  const [version, iv, authTag, encrypted] = sealedValue.split(".");

  if (version !== "v1" || !iv || !authTag || !encrypted) {
    throw new Error("Unsupported encrypted secret format.");
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    getKey(),
    Buffer.from(iv, "base64url"),
  );

  decipher.setAuthTag(Buffer.from(authTag, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, "base64url")),
    decipher.final(),
  ]).toString("utf8");
};
