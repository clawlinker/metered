'use client';

import { Service } from '@/lib/types';
import { CheckCircle } from 'lucide-react';
import { ProtocolBadge } from './ProtocolBadge';
import { UpvoteButton } from './UpvoteButton';
import Link from 'next/link';

interface ServiceGridProps {
  services: Service[];
  title?: string;
}

export function ServiceGrid({ services, title }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-zinc-400">No services found</p>
        <p className="text-sm text-zinc-600 mt-1">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {title && (
        <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      )}
      <div className="flex flex-col rounded-xl overflow-hidden border border-white/5">
        {services.map((service, idx) => (
          <div
            key={service.id}
            className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 py-3 px-4 hover:bg-white/[0.03] border-b border-white/5 last:border-b-0 transition-colors group"
          >
            {/* LEFT: Rank + Thumbnail */}
            <div className="flex items-center gap-3 md:gap-2 flex-shrink-0">
              <span className="text-xs font-medium text-zinc-600 w-5 text-right hidden md:block">
                {idx + 1}
              </span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-white/5 flex items-center justify-center flex-shrink-0">
                <span className="text-lg md:text-xl font-bold text-orange-500">
                  {service.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* CENTER: Service info — links to detail page */}
            <Link href={`/service/${service.slug}`} className="flex-1 min-w-0 group/link">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-white text-sm md:text-base group-hover/link:text-orange-400 transition-colors truncate">
                  {service.name}
                </span>
                {service.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs md:text-sm text-zinc-400 line-clamp-1 md:line-clamp-2 mb-1.5">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-zinc-500">
                <ProtocolBadge protocol={service.protocol} />
                <span>·</span>
                <span>{service.priceText}</span>
                <span>·</span>
                <span className="text-zinc-600">{service.network}</span>
              </div>
            </Link>

            {/* RIGHT: Upvote button */}
            <div className="flex-shrink-0 flex items-start md:items-center self-start md:self-auto">
              <UpvoteButton
                serviceId={service.id}
                agentUpvotes={service.agentUpvotes}
                humanUpvotes={service.humanUpvotes}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
