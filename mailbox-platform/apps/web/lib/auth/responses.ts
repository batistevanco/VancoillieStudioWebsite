import { NextResponse } from "next/server";

export const jsonError = (message: string, status: number) =>
  NextResponse.json({ ok: false, message }, { status });

export const jsonOk = <T extends Record<string, unknown>>(body: T) =>
  NextResponse.json({ ok: true, ...body });
