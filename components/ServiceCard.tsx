'use client';

import { Service } from '@/lib/types';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UpvoteButton } from './UpvoteButton';

interface ServiceCardProps {
  service: Service;
  rank: number;
}

export function ServiceCard({ service, rank }: ServiceCardProps) {
  return (
    <Card className="bg-white/5 border border-white/10 hover:border-muted-foreground/30 transition-colors md:border-none">
      <CardContent className="py-3 px-0 md:px-4">
        <div className="flex items-start gap-3 md:gap-4">
          {/* LEFT: Rank number */}
          <div className="flex-shrink-0 hidden md:block">
            <span className="text-lg font-bold text-white">#{rank}</span>
          </div>

          {/* CENTER: Service info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
              {service.verified && (
                <span className="inline-flex items-center gap-1 text-green-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Verified</span>
                </span>
              )}
            </div>
            <Link
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-base font-semibold text-white hover:text-orange-400 transition-colors truncate"
            >
              {service.name}
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1 md:line-clamp-2 mt-1">
              {service.description}
            </p>
          </div>

          {/* RIGHT: Upvote button */}
          <div className="flex-shrink-0 w-14 hidden md:block">
            <UpvoteButton
              serviceId={service.id}
              agentUpvotes={service.agentUpvotes}
              humanUpvotes={service.humanUpvotes}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="py-3 px-0 md:px-4 border-t border-white/5 mt-2 gap-4 md:gap-0">
        <div className="text-sm text-white font-medium">
          {service.priceText}
        </div>
        <div className="text-xs text-gray-400 ml-auto hidden md:block">
          {service.network}
        </div>
      </CardFooter>
    </Card>
  );
}
