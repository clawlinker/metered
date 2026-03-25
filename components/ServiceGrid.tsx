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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-gray-400">No services found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
