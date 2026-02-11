const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const config = {
  turbopack: {
    // Ensure Next.js uses this project as the workspace root
    root: __dirname,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'swiftauto.ge',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000
  },
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/blog/romeli-manqanebi-aris-qvelaze-momgebiani-sakartveloshi',
        destination: '/blog/romeli-manqanebi-aris-kvelaze-momgebiani-sakartveloshi',
        permanent: true,
      },
      {
        source: '/blog/copart-tu-iaai-romeli-auqcioni-sjobs-manqanis-chamosaqvanad',
        destination: '/blog/copart-tu-iaai-romeli-auqcioni-sjobs-manqanis-chamosakvanad',
        permanent: true,
      },
      {
        source: '/blog/qvelaze-khshiri-shetsdomebi-manqanis-chamoyvanisas-amerikidan',
        destination: '/blog/kvelaze-khshiri-shetsdomebi-manqanis-chamoyvanisas-amerikidan',
        permanent: true,
      },
      // Remove soft duplicate KA fallback routes
      {
        source: '/popular-cars/under-5000',
        destination: '/popularuli-manqanebi/5000-mde',
        permanent: true,
      },
      {
        source: '/popular-cars/under-10000',
        destination: '/popularuli-manqanebi/10000-mde',
        permanent: true,
      },
      {
        source: '/popular-cars/under-15000',
        destination: '/popularuli-manqanebi/15000-mde',
        permanent: true,
      },
      {
        source: '/popular-cars/under-20000',
        destination: '/popularuli-manqanebi/20000-mde',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // Ensure Google and browsers can fetch /favicon.ico even if we store it under /images
      {
        source: '/favicon.ico',
        destination: '/images/favicon.ico',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          // Allow cross-origin consumption by crawlers/browsers rendering in different origins
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "form-action 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://swiftauto.ge https://res.cloudinary.com",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          }
        ],
      },
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          }
        ]
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          }
        ]
      },
      {
        source: '/fonts/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = withPWA(config)
