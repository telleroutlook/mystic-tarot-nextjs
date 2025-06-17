import { Metadata } from 'next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  image,
  type = 'website',
  locale = 'en',
  publishedTime,
  modifiedTime,
  author,
  section
}: SEOHeadProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  const defaultKeywords = [
    'tarot',
    'divination',
    'fortune telling',
    'mystic',
    'cards',
    'reading',
    'destiny',
    'spiritual'
  ];

  const fullTitle = title 
    ? `${title} | Mystic Tarot Reading`
    : 'Mystic Tarot Reading - Unveil Your Destiny';

  const ogImage = image || `${baseUrl}/images/og-image.png`;
  const pageUrl = canonical || `${baseUrl}/${locale}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: description || 'Unveil your destiny with the ancient wisdom of the cards. Professional tarot card divination and fortune telling platform.',
    keywords: [...defaultKeywords, ...keywords],
    
    openGraph: {
      title: fullTitle,
      description: description || 'Unveil your destiny with the ancient wisdom of the cards.',
      type: type,
      url: pageUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || 'Mystic Tarot Reading',
        }
      ],
      locale: locale,
      siteName: 'Mystic Tarot Reading',
      ...(type === 'article' && {
        article: {
          publishedTime,
          modifiedTime,
          author: author ? [author] : undefined,
          section,
        }
      })
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || 'Unveil your destiny with the ancient wisdom of the cards.',
      images: [ogImage],
      creator: '@mystictarot',
      site: '@mystictarot',
    },

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

// Helper function for common tarot reading pages
export function generateTarotReadingMetadata(
  spread: string,
  locale: string = 'en'
): Metadata {
  const spreadTitles: Record<string, Record<string, string>> = {
    'past-present-future': {
      en: 'Past Present Future Tarot Reading',
      zh: '过去现在未来塔罗牌占卜',
      fr: 'Lecture Tarot Passé Présent Futur',
      ar: 'قراءة التاروت الماضي الحاضر المستقبل',
      hi: 'भूत वर्तमान भविष्य टैरो रीडिंग'
    },
    'celtic-cross': {
      en: 'Celtic Cross Tarot Reading',
      zh: '凯尔特十字塔罗牌占卜',
      fr: 'Lecture Tarot Croix Celtique',
      ar: 'قراءة التاروت الصليب السلتي',
      hi: 'सेल्टिक क्रॉस टैरो रीडिंग'
    },
    'three-cards': {
      en: 'Three Cards Tarot Reading',
      zh: '三张牌塔罗占卜',
      fr: 'Lecture Tarot Trois Cartes',
      ar: 'قراءة التاروت بثلاث بطاقات',
      hi: 'तीन कार्ड टैरो रीडिंग'
    },
    'single-card': {
      en: 'Single Card Tarot Reading',
      zh: '单张牌塔罗占卜',
      fr: 'Lecture Tarot Carte Unique',
      ar: 'قراءة التاروت بطاقة واحدة',
      hi: 'एकल कार्ड टैरो रीडिंग'
    }
  };

  const spreadDescriptions: Record<string, Record<string, string>> = {
    'past-present-future': {
      en: 'Discover how your past influences present and shapes your future with our Past Present Future tarot spread.',
      zh: '通过我们的过去现在未来塔罗牌占卜，了解过去如何影响现在并塑造未来。',
      fr: 'Découvrez comment votre passé influence le présent et façonne votre avenir avec notre tirage tarot Passé Présent Futur.',
      ar: 'اكتشف كيف يؤثر ماضيك على الحاضر ويشكل مستقبلك مع قراءة التاروت الماضي الحاضر المستقبل.',
      hi: 'हमारे भूत वर्तमान भविष्य टैरो स्प्रेड के साथ जानें कि आपका अतीत वर्तमान को कैसे प्रभावित करता है और भविष्य को आकार देता है।'
    },
    'celtic-cross': {
      en: 'Get deep insights into your situation with the comprehensive Celtic Cross tarot spread.',
      zh: '通过全面的凯尔特十字塔罗牌占卜，深入了解您的情况。',
      fr: 'Obtenez des insights profonds sur votre situation avec le tirage tarot complet de la Croix Celtique.',
      ar: 'احصل على رؤى عميقة في وضعك مع قراءة التاروت الشاملة للصليب السلتي.',
      hi: 'व्यापक सेल्टिक क्रॉस टैरो स्प्रेड के साथ अपनी स्थिति में गहरी अंतर्दृष्टि प्राप्त करें।'
    },
    'three-cards': {
      en: 'Explore three key aspects of your question with our Three Cards tarot reading.',
      zh: '通过我们的三张牌塔罗占卜，探索您问题的三个关键方面。',
      fr: 'Explorez trois aspects clés de votre question avec notre lecture tarot Trois Cartes.',
      ar: 'استكشف ثلاثة جوانب رئيسية لسؤالك مع قراءة التاروت بثلاث بطاقات.',
      hi: 'हमारे तीन कार्ड टैरो रीडिंग के साथ अपने प्रश्न के तीन मुख्य पहलुओं का अन्वेषण करें।'
    },
    'single-card': {
      en: 'Get direct guidance with a focused Single Card tarot reading.',
      zh: '通过专注的单张牌塔罗占卜获得直接指导。',
      fr: 'Obtenez des conseils directs avec une lecture tarot focalisée Carte Unique.',
      ar: 'احصل على إرشاد مباشر مع قراءة التاروت المركزة بطاقة واحدة.',
      hi: 'केंद्रित एकल कार्ड टैरो रीडिंग के साथ प्रत्यक्ष मार्गदर्शन प्राप्त करें।'
    }
  };

  const title = spreadTitles[spread]?.[locale] || spreadTitles[spread]?.['en'] || 'Tarot Reading';
  const description = spreadDescriptions[spread]?.[locale] || spreadDescriptions[spread]?.['en'] || 'Professional tarot card reading';

  return generateSEOMetadata({
    title,
    description,
    keywords: [spread.replace('-', ' '), 'tarot spread', 'online tarot', 'free tarot'],
    locale,
    type: 'website'
  });
} 