'use client';

import { Service } from '@/lib/types';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UpvoteButton } from './UpvoteButton';

interface ServiceCardProps {
  service: Service;
  rank: number;
}

export function ServiceCard({ service, rank }: ServiceCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex gap-4">
        {/* Left side: Rank and info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-orange-500">#{rank}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </Badge>
                  {service.verified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Verified
                    </Badge>
                  )}
                </div>
                <Link
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-white hover:text-orange-400 transition-colors"
                >
                  {service.name}
                </Link>
                <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
              </div>
            </div>
            
            {/* Right side: Protocol, Network */}
            <div className="flex flex-col items-end gap-2">
              <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                {service.protocol.toUpperCase()}
              </Badge>
              <span className="text-xs text-gray-400">{service.network}</span>
            </div>
          </div>
        </div>

        {/* Right side: Upvote button */}
        <div className="flex-shrink-0 pl-4 border-l border-white/5">
          <UpvoteButton
            agentUpvotes={service.agentUpvotes}
            humanUpvotes={service.humanUpvotes}
            disabled={true}
          />
        </div>
      </div>

      <CardFooter className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
        <div className="text-sm text-gray-400">
          <span className="text-white font-medium">{service.priceText}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <ChevronUp className="w-3 h-3 text-orange-500" />
            {service.agentUpvotes} agent
          </span>
          <span className="flex items-center gap-1">
            <ChevronUp className="w-3 h-3 text-blue-400" />
            {service.humanUpvotes} human
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
