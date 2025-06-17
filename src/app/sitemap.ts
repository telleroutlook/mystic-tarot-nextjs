import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  
  // Generate URLs for all supported locales
  const routes = ['']
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // Add main pages for each locale
  routing.locales.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(altLocale => [
              altLocale,
              `${baseUrl}/${altLocale}${route}`
            ])
          ),
        },
      })
    })
  })
  
  // Add default locale redirect
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })
  
  return sitemap
} 