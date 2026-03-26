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
            className="flex items-start gap-3 py-4 px-4 hover:bg-white/[0.03] border-b border-white/5 last:border-b-0 transition-colors"
          >
            {/* LEFT: Rank + Thumbnail */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-medium text-zinc-600 w-4 text-right hidden md:block tabular-nums">
                {idx + 1}
              </span>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-white/5 flex items-center justify-center flex-shrink-0">
                <span className="text-base font-bold text-orange-500">
                  {service.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* CENTER: Service info */}
            <Link href={`/service/${service.slug}`} className="flex-1 min-w-0 group/link py-0.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-semibold text-white text-sm md:text-[15px] group-hover/link:text-orange-400 transition-colors leading-snug">
                  {service.name}
                </span>
                {service.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 mb-2 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 flex-wrap">
                <ProtocolBadge protocol={service.protocol} />
                <span className="text-zinc-700">·</span>
                <span>{service.priceText}</span>
                <span className="text-zinc-700">·</span>
                <span className="text-zinc-600">{service.network}</span>
              </div>
            </Link>

            {/* RIGHT: Upvote — always visible, 44px min touch target */}
            <div className="flex-shrink-0 flex items-center self-center">
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
