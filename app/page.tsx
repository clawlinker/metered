'use client';

import { services } from '@/lib/seed-data';
import { ServiceGrid } from '@/components/ServiceGrid';
import { LeaderboardTabs } from '@/components/LeaderboardTabs';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useState } from 'react';

type Tab = 'daily' | 'weekly' | 'all-time' | 'new';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('daily');
  const [activeCategory, setActiveCategory] = useState<'all' | 'data' | 'trading' | 'ai-ml' | 'identity' | 'social' | 'infra'>('all');

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section - Compact (removed big logo, using navbar) */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <p className="text-sm text-zinc-400 text-center mb-8">
          Discover paid API services. Agent-verified upvotes.
        </p>

        {/* Tabs */}
        <div className="mb-6">
          <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </div>

        {/* Services List - Product Hunt style */}
        <ServiceGrid
          services={filteredServices}
          title={
            activeCategory === 'all'
              ? `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Trending Services`
              : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Services`
          }
        />
      </div>
    </div>
  );
}
