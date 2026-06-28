import { NextRequest } from "next/server";

export const getRequestContext = (request: NextRequest) => ({
  ipAddress:
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip"),
  userAgent: request.headers.get("user-agent"),
});

export const normalizeEmail = (email: string) =>
  email.trim().toLowerCase();

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
