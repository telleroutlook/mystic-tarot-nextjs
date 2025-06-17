interface StructuredDataProps {
  type?: 'website' | 'application';
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  locale: string;
}

export default function StructuredData({ 
  type = 'website',
  name = 'Mystic Tarot Reading',
  description = 'Professional tarot card divination and fortune telling platform',
  url,
  image,
  locale
}: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: name,
    description: description,
    url: url || `${baseUrl}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Mystic Tarot Reading',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
        width: 512,
        height: 512
      }
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Mystic Tarot Reading',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo.png`,
      width: 512,
      height: 512
    },
    description: 'Professional tarot card divination and fortune telling platform with multiple spreads and multilingual support',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Chinese', 'French', 'Arabic', 'Hindi']
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/mystictarot',
      // 'https://facebook.com/mystictarot'
    ]
  };

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mystic Tarot Reading',
    description: 'Professional tarot card divination and fortune telling platform',
    applicationCategory: 'Entertainment',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'Mystic Tarot Reading'
    },
    inLanguage: ['en', 'zh', 'fr', 'ar', 'hi'],
    isAccessibleForFree: true
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${locale}`
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does tarot card reading work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tarot card reading involves drawing cards from a deck and interpreting their meanings based on their position in a spread. Each card has symbolic meanings that can provide insights into different aspects of life.'
        }
      },
      {
        '@type': 'Question',
        name: 'What types of tarot spreads are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer several tarot spreads including Past-Present-Future, Celtic Cross, Three Cards, and Single Card readings. Each spread provides different levels of detail and focuses on various aspects of your question.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this tarot reading free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our tarot reading platform is completely free to use. You can draw cards and get readings in multiple languages without any cost.'
        }
      }
    ]
  };

  const schemas = [
    websiteSchema,
    organizationSchema,
    ...(type === 'application' ? [applicationSchema] : []),
    breadcrumbSchema,
    faqSchema
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
} 