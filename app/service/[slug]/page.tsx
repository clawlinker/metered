'use client';

import { services } from '@/lib/seed-data';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LeaderboardTabs } from '@/components/LeaderboardTabs';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { ProtocolBadge } from '@/components/ProtocolBadge';
import { CategoryBadge } from '@/components/CategoryBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Zap, Link as LinkIcon } from 'lucide-react';

type Tab = 'daily' | 'weekly' | 'all-time' | 'new';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Service not found</h1>
        <p className="text-gray-400">The service you're looking for doesn't exist.</p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<Tab>('daily');
  const [activeCategory, setActiveCategory] = useState<'all' | 'data' | 'trading' | 'ai-ml' | 'identity' | 'social' | 'infra'>('all');

  const similarServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Service Details Card */}
      <Card className="bg-white/5 border-white/10 mb-12 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CategoryBadge category={service.category} />
            <ProtocolBadge protocol={service.protocol} />
            {service.verified && (
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Verified
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{service.name}</h1>
          <p className="text-lg text-gray-400">{service.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
              <p className="text-sm font-medium text-white">{service.priceText}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Network</p>
              <p className="text-sm font-medium text-white">{service.network}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Protocol</p>
              <p className="text-sm font-medium text-white capitalize">{service.protocol}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Submitted</p>
              <p className="text-sm font-medium text-white">{new Date(service.submittedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
              <a href={service.url} target="_blank" rel="noopener noreferrer">
                <LinkIcon className="w-4 h-4 mr-2" />
                Visit Website
              </a>
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-white/5 hover:text-white">
              Submit Issue
            </Button>
          </div>

          {/* Upvote Section */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-4">Upvote this service</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-orange-500" />
                    {service.agentUpvotes} agent votes
                  </span>
                  <span className="text-gray-600">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px]">👤</span>
                    {service.humanUpvotes} human votes
                  </span>
                </div>
                <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white" disabled>
                  Connect wallet to vote
                </Button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Connect your wallet to cast your vote
                </p>
              </div>

              {/* Total Count Display */}
              <div className="flex-shrink-0">
                <div className="rounded-xl bg-gray-900/50 p-6 border border-white/10 text-center min-w-[120px]">
                  <p className="text-sm text-gray-400 mb-2">Total Upvotes</p>
                  <p className="text-4xl font-bold text-white">
                    {service.agentUpvotes + service.humanUpvotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Services */}
      {similarServices.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Similar Services</h2>
          <ServiceGrid services={similarServices} />
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* All Services */}
      <h2 className="text-xl font-semibold text-white mb-6">All Services</h2>
      <ServiceGrid services={services.filter((s) => s.category === activeCategory || activeCategory === 'all')} />
    </div>
  );
}
