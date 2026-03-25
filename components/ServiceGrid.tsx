'use client';

import { Service } from '@/lib/types';
import { ServiceCard } from './ServiceCard';

interface ServiceGridProps {
  services: Service[];
  title?: string;
}

export function ServiceGrid({ services, title }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-gray-400">No services found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      )}
      <div className="flex flex-col space-y-4">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
