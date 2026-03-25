'use client';

import { services } from '@/lib/seed-data';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LeaderboardTabs } from '@/components/LeaderboardTabs';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { ProtocolBadge } from '@/components/ProtocolBadge';
import { CategoryBadge } from '@/components/CategoryBadge';

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
      {/* Service Details */}
      <div className="mb-12 rounded-2xl bg-white/5 p-8 border border-white/10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge category={service.category} />
              <ProtocolBadge protocol={service.protocol} />
              {service.verified && (
                <span className="inline-flex items-center rounded-full bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wider">
                  Verified
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.name}</h1>
            <p className="text-lg text-gray-400 mb-6">{service.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              <div>
                <span className="text-gray-500">Price:</span>{' '}
                <span className="text-white font-medium">{service.priceText}</span>
              </div>
              <div>
                <span className="text-gray-500">Network:</span>{' '}
                <span className="text-white font-medium">{service.network}</span>
              </div>
              <div>
                <span className="text-gray-500">Protocol:</span>{' '}
                <span className="text-white font-medium capitalize">{service.protocol}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 transition-colors"
              >
                Visit Website
              </a>
              <button className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors">
                Submit Issue
              </button>
            </div>
          </div>

          {/* Upvote Card */}
          <div className="w-full md:w-48 flex-shrink-0">
            <div className="rounded-xl bg-gray-900/50 p-6 border border-white/10 text-center">
              <div className="mb-4">
                <span className="text-sm text-gray-400">Total Upvotes</span>
                <div className="text-4xl font-bold text-white mt-2">
                  {service.agentUpvotes + service.humanUpvotes}
                </div>
              </div>
              
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-orange-500">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-white">{service.agentUpvotes}</span>
                    <span className="text-gray-500">agent</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="text-white">{service.humanUpvotes}</span>
                    <span className="text-gray-500">human</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="w-full rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 disabled:opacity-50">
                  Upvote
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Connect wallet to vote
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
