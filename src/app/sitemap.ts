import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  
  // Define all routes
  const routes = [
    '', // home page
    // Add more routes as your app grows
    // '/about',
    // '/contact',
    // '/privacy',
    // '/terms'
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // Add main pages for each locale
  routing.locales.forEach(locale => {
    routes.forEach(route => {
      const isHomePage = route === ''
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: isHomePage ? 'daily' : 'weekly',
        priority: isHomePage ? 1.0 : 0.8,
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
  
  // Add default locale redirect (higher priority)
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })
  
  // Add additional SEO-friendly URLs
  routing.locales.forEach(locale => {
    // Tarot spread specific pages could be added here in the future
    const tarotSpreads = [
      'past-present-future',
      'celtic-cross', 
      'three-cards',
      'single-card'
    ]
    
    tarotSpreads.forEach(spread => {
      sitemap.push({
        url: `${baseUrl}/${locale}?spread=${spread}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(altLocale => [
              altLocale,
              `${baseUrl}/${altLocale}?spread=${spread}`
            ])
          ),
        },
      })
    })
  })
  
  return sitemap.sort((a, b) => {
    // Sort by priority (highest first)
    return (b.priority || 0) - (a.priority || 0)
  })
} 