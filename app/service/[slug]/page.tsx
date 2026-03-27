import { services } from '@/lib/seed-data';
import { getServiceBySlug } from '@/lib/actions';
import { Service } from '@/lib/types';
import { ServiceDetailClient } from '@/components/ServiceDetailClient';
import { StructuredData } from '@/components/StructuredData';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // This will be called at build time with the seed data
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found — Metered' };
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    title: `${service.name} — Metered`,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      type: 'article',
      url: `${baseUrl}/service/${slug}`,
      images: [
        {
          url: `${baseUrl}/api/og/${service.slug}`,
          width: 1200,
          height: 630,
          alt: `${service.name} OG Image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.name,
      description: service.description,
      images: [`${baseUrl}/api/og/${service.slug}`],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  
  // Get similar services from seed data
  const similarServices = [
    { slug: 'pawr-link', category: 'identity' },
    { slug: 'checkr', category: 'data' },
    { slug: 'bazaar', category: 'infra' },
  ].filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 4);
  
  // Get full service details for similar services
  const similar = await Promise.all(
    similarServices.map(async (s) => {
      const svc = await getServiceBySlug(s.slug);
      return svc ? svc : null;
    })
  );
  
  return (
    <>
      <StructuredData service={service} />
      <ServiceDetailClient service={service} similarServices={similar.filter(Boolean) as Service[]} />
    </>
  );
}
