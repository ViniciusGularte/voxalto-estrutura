import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveByHost } from "@/lib/sites";

export function middleware(req: NextRequest) {
  const site = resolveByHost(req.headers.get("host"));

  if (!site) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/t/${site.slug}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|t|api|favicon.ico|robots.txt|sitemap.xml|assets).*)"],
};
