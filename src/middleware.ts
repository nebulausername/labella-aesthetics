import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Demo-Deployment unter demo.kaufmeinewebsite.de/labella (Next basePath).
const BP = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function middleware(request: NextRequest) {
  // Verkaufter ZIP-Build (Root-Domain, kein basePath): normales next-intl-Routing.
  if (!BP) return intlMiddleware(request);

  // Demo unter Next-basePath: next-intls Locale-Routing ist mit basePath
  // inkompatibel (interner Rewrite verliert den basePath → Loop/404). Für die
  // (deutschsprachige) Demo daher hart auf die Default-Locale `/de` rewriten;
  // explizit prefixte Pfade (/de, /en) bleiben unangetastet.
  const { pathname } = request.nextUrl; // basePath ist hier bereits entfernt
  if (/^\/(de|en)(\/|$)/.test(pathname)) {
    return NextResponse.next();
  }
  // Auf die /de-Variante per terminalem Redirect umleiten. Die Ziel-URL aus dem
  // ECHTEN Host/Proto-Header bauen (Caddy: header_up Host {host}) — `nextUrl.host`
  // wäre hier der interne Bind-Host (localhost:3015) und ein Rewrite würde absolut
  // auf den internen Host proxien (→ EPROTO/500). Der absolute Pfad enthält schon
  // den basePath, daher hängt Next ihn nicht erneut an.
  const host = request.headers.get('host') ?? request.nextUrl.host;
  const proto = request.headers.get('x-forwarded-proto') ?? 'https';
  const target = `${BP}/de${pathname === '/' ? '' : pathname}${request.nextUrl.search}`;
  return NextResponse.redirect(new URL(target, `${proto}://${host}`));
}

export const config = {
  // '/' explizit, weil das „alles außer …"-Pattern den exakten Root nicht matcht
  // (sonst rewrited die Middleware den basePath-Root nicht → 404).
  // Skip API routes, Next internals and files with an extension (e.g. /favicon.ico).
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
