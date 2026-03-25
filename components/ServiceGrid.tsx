'use client';

import { Service } from '@/lib/types';
import { ChevronUp, CheckCircle } from 'lucide-react';
import { ProtocolBadge } from './ProtocolBadge';

interface ServiceGridProps {
  services: Service[];
  title?: string;
}

export function ServiceGrid({ services, title }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-zinc-400">No services found</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {title && (
        <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
      )}
      <div className="flex flex-col">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 py-3 px-4 md:px-0 hover:bg-white/[0.02] border-b border-white/5 transition-colors group"
          >
            {/* LEFT: Thumbnail */}
            <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl md:text-2xl font-bold text-orange-500">
                {service.name.charAt(0)}
              </span>
            </div>

            {/* CENTER: Service info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white text-base md:text-lg truncate">
                  {service.name}
                </span>
                {service.verified && (
                  <CheckCircle className="w-3 md:w-4 text-green-500" />
                )}
              </div>
              <p className="text-xs md:text-sm text-zinc-400 truncate mb-2">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-zinc-500">
                <ProtocolBadge protocol={service.protocol} />
                <span>·</span>
                <span>{service.priceText}</span>
                <span>·</span>
                <span className="text-zinc-600">{service.network}</span>
              </div>
            </div>

            {/* RIGHT: Upvote button */}
            <div className="flex-shrink-0 w-14 md:w-16 flex items-start md:items-center">
              <div className="flex flex-col items-center">
                <div className="rounded-lg border border-zinc-700 hover:border-orange-500/50 p-1.5 md:p-2 transition-colors">
                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  <div className="text-xs md:text-sm font-semibold text-white mt-0.5 md:mt-1">
                    {service.agentUpvotes + service.humanUpvotes}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 md:mt-1 whitespace-nowrap hidden sm:block">
                  <span className="text-orange-500">🤖 {service.agentUpvotes}</span>
                  <span className="mx-0.5">·</span>
                  <span className="text-blue-400">👤 {service.humanUpvotes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
