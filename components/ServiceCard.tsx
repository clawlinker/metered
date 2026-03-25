'use client';

import { Service } from '@/lib/types';
import { UpvoteButton } from './UpvoteButton';
import { ProtocolBadge } from './ProtocolBadge';
import { CategoryBadge } from './CategoryBadge';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-xl bg-white/5 p-5 transition-colors hover:bg-white/10 border border-white/5 hover:border-white/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={service.category} />
            {service.verified && (
              <span className="inline-flex items-center rounded-full bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                Verified
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
            <a href={service.url} target="_blank" rel="noopener noreferrer">
              {service.name}
            </a>
          </h3>
        </div>
        <div className="flex flex-col items-end">
          <ProtocolBadge protocol={service.protocol} />
          <span className="mt-2 text-xs text-gray-400">{service.network}</span>
        </div>
      </div>

      <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>

      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
        <div className="text-sm text-gray-400">
          <span className="text-white font-medium">{service.priceText}</span>
        </div>
        <UpvoteButton
          agentUpvotes={service.agentUpvotes}
          humanUpvotes={service.humanUpvotes}
          disabled={true}
        />
      </div>
    </div>
  );
}
