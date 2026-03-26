'use client';

import { Service } from '@/lib/types';

interface StructuredDataProps {
  service: Service;
}

export function StructuredData({ service }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: service.name,
    description: service.description,
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: service.priceText,
      priceCurrency: 'USD',
    },
    url: service.url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
