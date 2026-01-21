import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      // Only protect /dealer and /swift-admin routes
      const protectedPaths = ["/dealer", "/swift-admin"]
      const isProtectedPath = protectedPaths.some(path => 
        req.nextUrl.pathname.startsWith(path)
      )

      // If not a protected path, allow access
      if (!isProtectedPath) return true

      // Allow access to login pages
      if (req.nextUrl.pathname === "/dealer/login" || 
          req.nextUrl.pathname === "/swift-admin-login") {
        return true
      }

      // Require auth for protected routes
      if (!token) return false

      // Check role-based access
      if (req.nextUrl.pathname.startsWith("/swift-admin")) {
        return token.role === "ADMIN"
      }

      if (req.nextUrl.pathname.startsWith("/dealer")) {
        return token.role === "DEALER"
      }

      return false
    }
  }
})

export const config = {
  matcher: [
    "/dealer/:path*",
    "/swift-admin/:path*",
    "/swift-admin-login"
  ]
}
