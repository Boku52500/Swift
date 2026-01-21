import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Swift Auto',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ef4444',
    icons: [
      {
        src: '/images/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
