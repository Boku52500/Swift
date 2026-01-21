export function isDev() {
  return process.env.NODE_ENV !== 'production'
}

export function sameOriginAllowed(req: Request, allowedBaseUrl?: string): boolean {
  try {
    const origin = req.headers.get('origin') || ''
    const referer = req.headers.get('referer') || ''
    const host = (req.headers.get('host') || '').toLowerCase()

    const allow = (u: string) => {
      if (!u) return true // permit non-browser clients
      try {
        if (allowedBaseUrl && u.startsWith(allowedBaseUrl)) return true
        const uh = new URL(u).hostname.toLowerCase()
        const hostH = (host.split(':')[0] || '').toLowerCase()
        if (!uh || !hostH) return false
        if (uh === hostH) return true
        const dev = new Set(['localhost','127.0.0.1'])
        if (dev.has(uh) && dev.has(hostH)) return true
        return false
      } catch {
        return false
      }
    }

    if (!isDev()) {
      if ((origin && !allow(origin)) || (referer && !allow(referer))) return false
    }
    return true
  } catch {
    return false
  }
}

export function redactError(e: unknown) {
  if (isDev()) {
    return (e instanceof Error ? e.message : String(e || 'unknown'))
  }
  return undefined
}
