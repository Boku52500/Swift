import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  let locale = 'ka'
  let contentLang = 'ka-GE'
  if (pathname.startsWith('/en')) { locale = 'en'; contentLang = 'en-US' }
  else if (pathname.startsWith('/ru')) { locale = 'ru'; contentLang = 'ru-RU' }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-locale', locale)

  const res = NextResponse.next({ request: { headers: requestHeaders } })
  res.headers.set('Content-Language', contentLang)
  try {
    res.cookies.set('locale', locale, { path: '/' })
  } catch {}
  return res
}

export const config = {
  matcher: ['/((?!_next|images|fonts|.*\.(?:svg|jpg|jpeg|png|webp|avif|gif)|favicon.ico|manifest.json|robots.txt|sitemap.xml|api).*)'],
}
