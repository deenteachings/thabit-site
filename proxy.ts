import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Everything under /aso/ is rewritten to the asokit engine (next.config.ts).
// Before it leaves, name the visitor for the engine's per-visitor quota and
// prove the header came from us with ASO_PROXY_SECRET. Any client-sent copy
// of these headers is dropped first, so they cannot be forged.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.delete("x-aso-client-ip");
  headers.delete("x-aso-proxy-secret");

  const secret = process.env.ASO_PROXY_SECRET;
  // Vercel sets x-real-ip / x-forwarded-for to the visitor's address itself.
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (secret && ip) {
    headers.set("x-aso-client-ip", ip);
    headers.set("x-aso-proxy-secret", secret);
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/aso/:path+",
};
