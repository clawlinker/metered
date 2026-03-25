import { services } from '@/lib/seed-data';
import { ServiceDetailClient } from '@/components/ServiceDetailClient';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found — Metered' };
  return {
    title: `${service.name} — Metered`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const similarServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 4);
  return <ServiceDetailClient service={service} similarServices={similarServices} />;
}
