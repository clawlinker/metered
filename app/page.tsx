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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Metered
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover and upvote the best paid API services. Protocol-agnostic. Agent-verified.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Services Grid */}
      <ServiceGrid
        services={filteredServices}
        title={
          activeCategory === 'all'
            ? `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Trending Services`
            : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Services`
        }
      />
    </div>
  );
}
